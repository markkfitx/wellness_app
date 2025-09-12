// utils/uploadProfileImage.ts
import { createClient } from '@/utils/supabase/client';

export type UploadResult = {
  path: string;       // e.g. "userId/avatar.jpg"
  publicUrl: string;  // cache-busted URL safe to render in <img src/>
};

export async function uploadProfileImage(file: File, userID: string): Promise<UploadResult> {
  const supabase = createClient();

  if (!file || !userID) {
    throw new Error('Missing file or userID');
  }

  // Derive extension safely
  const fromName = file.name.split('.').pop()?.toLowerCase();
  const fromMime = file.type.split('/').pop()?.toLowerCase();
  const ext = (fromName || fromMime || 'jpg').replace(/[^a-z0-9]/g, '');

  // Keep a stable key so profile updates overwrite the same object
  const path = `${userID}/avatar.${ext}`;

  const { error: uploadErr } = await supabase.storage
    .from('user_profile_images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,               // overwrite if exists
      contentType: file.type || 'image/jpeg',
    });

  if (uploadErr) {
    throw new Error(uploadErr.message);
  }
  else{
    // SAVE TO PROFILES table to reference for session Storage.
    const { data: old, error: signedError } = await supabase
    .from('profiles')
    .select('avatar_version')
    .eq('id', userID)
    .single();
    const newVersion = (old?.avatar_version ?? 0) + 1;

    await supabase
        .from('profiles')
        .update({ avatar_path: path, avatar_version: newVersion })
        .eq('id', userID);
  }

  // PUBLIC bucket: get a public URL
  const { data: signed, error: signedErr } = await supabase.storage
  .from('user_profile_images')
  .createSignedUrl(path, 60 * 60); // 1 hour

    if (signedErr) throw new Error(signedErr.message);

    const publicUrl = `${signed.signedUrl}&v=${Date.now()}`; // optional cache-bust for clients
    return { path, publicUrl };
}

export async function deleteAvatarAction() {
  const supabase = createClient();

  // Get the signed-in user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user) {
    return { error: 'Not signed in' };
  }

  const bucket = 'user_profile_images';

  // List all objects in the user’s folder
  const { data: files, error: listErr } = await supabase.storage
    .from(bucket)
    .list(user.id, { limit: 100 });

  if (listErr) return { error: listErr.message };

  // Find the first file whose name starts with "avatar."
  const avatarObj = files?.find((f) =>
    f.name.toLowerCase().startsWith('avatar.')
  );

  if (!avatarObj) {
    return { ok: false, reason: 'not_found' as const };
  }

  const path = `${user.id}/${avatarObj.name}`;

  // Delete the object
  const { error: delErr } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (delErr) return { error: delErr.message };

  // (Optional) also clear the DB profile record
  await supabase.from('profiles').update({ avatar_url: null }).eq('id', user.id);

  return { ok: true as const, path };
}
