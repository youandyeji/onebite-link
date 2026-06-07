import Link from "next/link";
import { folders } from "@/lib/mock-data";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-[var(--card)] shadow-[1px_0_0_rgba(0,0,0,0.06)] p-4 flex flex-col gap-1">
      <Link
        href="/"
        className="w-full px-3 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-bold mb-2 block text-center active:scale-[0.98] transition-all duration-200"
      >
        전체
      </Link>
      {folders.map((folder) => (
        <Link
          key={folder}
          href={`/folder/${encodeURIComponent(folder)}`}
          className="w-full px-3 py-2.5 rounded-xl text-[var(--text)] text-sm hover:bg-[var(--badge-bg)] hover:text-[var(--accent)] transition-all duration-200 block"
        >
          📁 {folder}
        </Link>
      ))}
    </aside>
  );
}
