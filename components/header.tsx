'use client'

import Link from "next/link";
import { useState } from "react";
import { useFolders } from "@/context/folder-context";

function NewFolderModal({ onClose }: { onClose: () => void }) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");

  function handleSave() {
    if (!name.trim()) return;
    addFolder(name);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-2xl p-6 w-80 shadow-xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[var(--text)]">새 폴더</h2>
        <input
          type="text"
          placeholder="폴더 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[var(--text-sub)] text-sm font-bold bg-[var(--input-bg)] hover:bg-[var(--inactive)] transition-all duration-200 active:scale-[0.98]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-5 h-14 bg-[var(--card)] shadow-[0_1px_0_rgba(0,0,0,0.06)] shrink-0">
        <Link href="/" className="text-xl font-bold text-[var(--accent)]">
          한입 링크
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-3 bg-[var(--input-bg)] text-[var(--text)] text-[17px] font-bold rounded-xl hover:bg-[var(--inactive)] active:scale-[0.98] transition-all duration-200"
          >
            + 새 폴더
          </button>
          <Link
            href="/new"
            className="px-5 py-3 bg-[var(--accent)] text-white text-[17px] font-bold rounded-xl hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200"
          >
            + 새 링크
          </Link>
        </div>
      </header>
      {modalOpen && <NewFolderModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
