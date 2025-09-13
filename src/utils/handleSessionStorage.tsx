import { createClient } from '@/utils/supabase/client';
const BUCKET = 'user_profile_images';
const SIGNED_SECONDS = 60 * 60; // if private

export type SessionProfile = {
  id: string;
  full_name: string | null;
  age: number | null;
  avatar_path: string | null;
  avatar_version: number;
  avatar_url: string | null;   // resolved URL to display
};

// RSC-safe fetcher (runs on server). Keep it small & synchronous for the client.
export async function getUserSession(): Promise<SessionProfile | null> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: p, error } = await supabase
    .from('profiles')
    .select('id, full_name, age, avatar_path, avatar_version')
    .eq('id', user.id)
    .single();
  if (error || !p) return null;

  let avatar_url: string | null = null;

  if (p.avatar_path) {
    // PRIVATE bucket (recommended)
    const { data: signed } = await supabase
      .storage.from(BUCKET)
      .createSignedUrl(p.avatar_path, SIGNED_SECONDS);
    if (signed?.signedUrl) {
      avatar_url = `${signed.signedUrl}&v=${p.avatar_version ?? 0}`;
    }

    // PUBLIC bucket alternative:
    // const { data } = supabase.storage.from(BUCKET).getPublicUrl(p.avatar_path);
    // avatar_url = `${data.publicUrl}?v=${p.avatar_version ?? 0}`;
  }

  return {
    id: p.id,
    full_name: p.full_name,
    age: p.age,
    avatar_path: p.avatar_path,
    avatar_version: p.avatar_version ?? 0,
    avatar_url,
  };
}
