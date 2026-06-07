'use client'

import { useState } from "react";
import { useLinks } from "@/context/link-context";
import { useFolders } from "@/context/folder-context";

export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folderId: string;
  folderName?: string;
  thumbnail?: string;
};

function Thumbnail({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="w-full h-36 bg-[var(--badge-bg)] flex items-center justify-center text-4xl shrink-0">
        🔗
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full h-36 object-cover shrink-0"
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        img.style.display = "none";
        const fallback = img.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = "flex";
      }}
    />
  );
}

function DeleteModal({
  title,
  onConfirm,
  onClose,
}: {
  title: string;
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
          <h2 className="text-lg font-bold text-[var(--text)]">링크 삭제</h2>
          <p className="text-sm text-[var(--text-sub)]">
            <span className="font-semibold text-[var(--text)]">"{title}"</span>을 삭제할까요?
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

function EditModal({
  link,
  onClose,
}: {
  link: LinkItem;
  onClose: () => void;
}) {
  const { editLink } = useLinks();
  const { folders } = useFolders();
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [folderId, setFolderId] = useState(link.folderId);

  function handleSave() {
    editLink(link.id, { title, description, folderId });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-2xl p-6 w-96 shadow-xl flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-title" className="text-sm font-bold text-[var(--text)]">제목</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] text-[var(--text)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-description" className="text-sm font-bold text-[var(--text)]">설명</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] text-[var(--text)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-folder" className="text-sm font-bold text-[var(--text)]">폴더</label>
          <select
            id="edit-folder"
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] text-[var(--text)] text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-[var(--text-sub)] text-sm font-bold bg-[var(--input-bg)] hover:bg-[var(--inactive)] transition-all duration-200 active:scale-[0.98]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const { deleteLink } = useLinks();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="group relative bg-[var(--card)] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200 overflow-hidden flex flex-col">
        <Thumbnail src={link.thumbnail} alt={link.title} />
        {link.thumbnail && (
          <div className="w-full h-36 bg-[var(--badge-bg)] items-center justify-center text-4xl shrink-0 hidden">
            🔗
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-xl bg-white/80 backdrop-blur-sm text-[var(--text-sub)] hover:text-[var(--accent)] hover:bg-white transition-all duration-200 shadow-sm"
            aria-label="링크 수정"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 rounded-xl bg-white/80 backdrop-blur-sm text-[var(--text-sub)] hover:text-[var(--error)] hover:bg-white transition-all duration-200 shadow-sm"
            aria-label="링크 삭제"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-[var(--text)] text-[17px] truncate">{link.title || link.url}</h3>
          <p className="text-sm text-[var(--accent)] truncate mt-0.5">{link.url}</p>
          <p className="text-sm text-[var(--text-sub)] mt-1 line-clamp-2 leading-relaxed">{link.description}</p>
          {link.folderName && (
            <span className="inline-block mt-3 px-2.5 py-1 bg-[var(--badge-bg)] text-[var(--accent)] text-xs font-medium rounded-lg self-start">
              {link.folderName}
            </span>
          )}
        </div>
      </div>

      {showModal && (
        <DeleteModal
          title={link.title || link.url}
          onConfirm={() => {
            deleteLink(link.id);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
      {showEditModal && (
        <EditModal link={link} onClose={() => setShowEditModal(false)} />
      )}
    </>
  );
}
