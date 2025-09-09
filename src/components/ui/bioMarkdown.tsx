"use client"
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";

export default function BioMarkdown() {
   const [value, setValue] = useState("");

  const toggleWrap = (before: string, after: string = before) => {
    const textarea = document.getElementById("bio-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);

    // Check if already wrapped
    if (
      value.slice(start - before.length, start) === before &&
      value.slice(end, end + after.length) === after
    ) {
      // Remove wrapping
      const newValue =
        value.slice(0, start - before.length) +
        selected +
        value.slice(end + after.length);

      setValue(newValue);

      requestAnimationFrame(() => {
        textarea.focus();
        textarea.selectionStart = start - before.length;
        textarea.selectionEnd = end - before.length;
      });
    } else {
      // Add wrapping
      const newValue =
        value.slice(0, start) + before + selected + after + value.slice(end);

      setValue(newValue);

      requestAnimationFrame(() => {
        textarea.focus();
        textarea.selectionStart = start + before.length;
        textarea.selectionEnd = end + before.length;
      });
    }
  };

  return (
    <div className="w-full max-w-md space-y-2">
      {/* Toolbar */}
      <div className="flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => toggleWrap("**")}
          className="px-2 py-1 border rounded hover:bg-gray-100 font-bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => toggleWrap("_")}
          className="px-2 py-1 border rounded hover:bg-gray-100 italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => toggleWrap("<u>", "</u>")}
          className="px-2 py-1 border rounded hover:bg-gray-100 underline"
        >
          U
        </button>
      </div>

      {/* Textarea */}
      <textarea
        id="bio-editor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a short introduction…"
        className="w-full min-h-[120px] rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </div>
  );
}