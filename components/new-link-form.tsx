"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/context/folder-context";
import { useLinks } from "@/context/link-context";

export default function NewLinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || !folderId) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url.trim())}`);
      const og = await res.json();

      addLink({
        title: og.title || url.trim(),
        url: og.url || url.trim(),
        description: og.description || "",
        thumbnail: og.image || "",
        folderId,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card)] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-5 max-w-lg w-full"
    >
      <h2 className="text-xl font-bold text-[var(--text)]">새 링크 추가</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[17px] font-bold text-[var(--text)]" htmlFor="url">
          링크 URL
        </label>
        <input
          id="url"
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="px-4 py-3.5 bg-[var(--input-bg)] rounded-xl text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[17px] font-bold text-[var(--text)]" htmlFor="folder">
          폴더
        </label>
        <select
          id="folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          required
          className="px-4 py-3.5 bg-[var(--input-bg)] rounded-xl text-[17px] text-[var(--text)] focus:outline-none focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !url.trim() || !folderId}
        className="px-5 py-3.5 bg-[var(--accent)] text-white text-[17px] font-bold rounded-xl hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200 mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        {loading ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
