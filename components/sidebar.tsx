import Link from "next/link";
import { folders } from "@/lib/mock-data";

export default function Sidebar() {
  return (
    <aside className="w-52 shrink-0 border-r border-gray-200 bg-gray-50 p-4 flex flex-col gap-1">
      <Link
        href="/"
        className="w-full text-left px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium mb-2 block"
      >
        ALL
      </Link>
      {folders.map((folder) => (
        <Link
          key={folder}
          href={`/folder/${encodeURIComponent(folder)}`}
          className="w-full text-left px-3 py-2 rounded-lg text-gray-700 text-sm hover:bg-gray-200 transition-colors block"
        >
          📁 {folder}
        </Link>
      ))}
    </aside>
  );
}
