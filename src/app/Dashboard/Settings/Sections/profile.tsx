"use client";

import { useRef, ChangeEvent, useEffect, useState, useTransition } from "react";
import BioMarkdown from "@/components/ui/bioMarkdown";
import { createClient } from "@/utils/supabase/client";
import { uploadProfileImage, deleteAvatarAction } from "@/utils/avatarUpdate"; // expects (file: File, userID: string) -> { publicUrl } or similar

export default function Profile() {
  const supabase = createClient();

  // Final avatar URL from Supabase (public or signed)
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  // Local preview (object URL) while uploading
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isRemoving, startRemoving] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    // 1) Show a local preview
    const local = URL.createObjectURL(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return local;
    });

    // 2) Upload the actual File with your helper
    setIsUploading(true);
    try {
      const { data: usr, error: userErr } = await supabase.auth.getUser();
      if (userErr || !usr.user) throw new Error("You must be signed in.");
      const userID = usr.user.id;

      // Your helper should return something like { publicUrl } or { path, publicUrl }
      const result: any = await uploadProfileImage(file, userID);

      // Cope with either { publicUrl } or { publicURL: { publicUrl: string } }
      const publicUrl =
        result?.publicUrl ??
        result?.publicURL?.publicUrl ??
        (typeof result === "string" ? result : "");

      if (!publicUrl) throw new Error("No URL returned from upload.");

      // Cache-bust if you overwrite the same key in Storage
      setAvatarUrl(`${publicUrl}?v=${Date.now()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      // allow reselecting the same file
      e.target.value = "";
    }
  };

  const triggerFileDialog = () => fileInputRef.current?.click();
  const removeAvatar = () => {
  setError(null);

  // Optimistic UI: clear immediately
  const prev = { avatarUrl, previewUrl };
  setAvatarUrl('');
  if (previewUrl) { URL.revokeObjectURL(previewUrl); setPreviewUrl(''); }

  startRemoving(async () => {
    const res = await deleteAvatarAction();
    if (res?.error) {
      // Roll back UI if delete failed
      setAvatarUrl(prev.avatarUrl);
      setPreviewUrl(prev.previewUrl);
      //setAvatarUrl(prev.avatarPath);
      setError(res.error);
      return;
    }
    // Success: forget the path
    setAvatarUrl('');
  });
};

  return (
    <form className="mt-5 px3">
      <div className="grid grid-cols-12 gap-6">
        {/* Section Title */}
        <div className="md:col-span-4 col-span-12">
          <h1 className="text-md font-bold">Profile</h1>
          <p className="text-xs text-gray-700">
            Update your photo and personal details here.
          </p>
        </div>
        <div className="md:col-span-8 col-span-12" />
        <div className="col-span-12">
          <hr />
        </div>

        {/* Email */}
        <div className="md:col-span-4 col-span-12 flex items-center">
          <label className="text-sm font-semibold">Email Address</label>
        </div>
        <div className="md:col-span-8 col-span-12">
          <input
            type="email"
            name="userEmail"
            placeholder="Email..."
            className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

        <div className="col-span-12">
          <hr />
        </div>

        {/* Profile Image */}
        <div className="md:col-span-4 col-span-12 flex flex-col">
          <label className="text-sm font-semibold">Profile Image</label>
          <p className="text-xs text-gray-700">
            This will be displayed on your profile
          </p>
        </div>

        <div className="md:col-span-8 col-span-12 flex items-center justify-start gap-4">
          <div className="flex items-center gap-6">
            <img
              src={avatarUrl || previewUrl || "/placeholder-avatar.png"}
              alt="Profile"
              className="h-[4rem] w-[4rem] rounded-full border object-cover"
            />
          </div>

          <div className="flex gap-3 text-xs">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            {/* Use buttons for actions, not Link */}
            <button
              type="button"
              onClick={triggerFileDialog}
              disabled={isUploading}
              className="underline"
            >
              {isUploading ? "Uploading…" : "Update"}
            </button>
            <button type="button" onClick={removeAvatar} className="underline" disabled={isRemoving || !avatarUrl}>
              {isRemoving ? 'Removing…' : 'Remove'}
            </button>
          </div>
        </div>

        <div className="col-span-12">
          <hr />
        </div>

        {/* Bio */}
        <div className="md:col-span-4 col-span-12">
          <label className="text-sm font-semibold">Bio</label>
          <p className="text-xs text-gray-700">
            Write a short introduction about yourself
          </p>
        </div>
        <div className="md:col-span-8 col-span-12">
          <BioMarkdown />
        </div>

        <div className="col-span-12">
          <hr />
        </div>

        {/* Errors */}
        {error && (
          <div className="col-span-12 text-xs text-red-600">{error}</div>
        )}
      </div>
    </form>
  );
}
