'use client'

import Link from "next/link";
import { useState } from "react";
import { useFolders } from "@/context/folder-context";
import { type Folder } from "@/lib/mock-data";

function DeleteConfirmModal({
  folder,
  onConfirm,
  onClose,
}: {
  folder: Folder;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-2xl p-6 w-80 shadow-xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-[var(--text)]">폴더 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-semibold text-[var(--text)]">"{folder.name}"</span> 폴더를 삭제할까요?
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[var(--text-sub)] text-sm font-bold bg-[var(--input-bg)] hover:bg-[var(--inactive)] transition-all duration-200 active:scale-[0.98]"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold bg-[var(--error)] hover:opacity-90 transition-all duration-200 active:scale-[0.98]"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const { folders, deleteFolder } = useFolders();
  const [confirmFolder, setConfirmFolder] = useState<Folder | null>(null);

  function handleConfirmDelete() {
    if (confirmFolder) {
      deleteFolder(confirmFolder.id);
      setConfirmFolder(null);
    }
  }

  return (
    <>
      <aside className="w-56 shrink-0 bg-[var(--card)] shadow-[1px_0_0_rgba(0,0,0,0.06)] p-4 flex flex-col gap-1">
        <Link
          href="/"
          className="w-full px-3 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-bold mb-2 block text-center active:scale-[0.98] transition-all duration-200"
        >
          전체
        </Link>
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="group relative flex items-center rounded-xl hover:bg-[var(--badge-bg)] transition-all duration-200"
          >
            <Link
              href={`/folder/${folder.id}`}
              className="flex-1 px-3 py-2.5 text-[var(--text)] text-sm group-hover:text-[var(--accent)] transition-all duration-200"
            >
              📁 {folder.name}
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                setConfirmFolder(folder);
              }}
              className="opacity-0 group-hover:opacity-100 mr-2 p-1 rounded-lg text-[var(--text-sub)] hover:text-[var(--error)] hover:bg-[var(--badge-bg)] transition-all duration-200"
              aria-label={`${folder.name} 폴더 삭제`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        ))}
      </aside>
      {confirmFolder && (
        <DeleteConfirmModal
          folder={confirmFolder}
          onConfirm={handleConfirmDelete}
          onClose={() => setConfirmFolder(null)}
        />
      )}
    </>
  );
}
