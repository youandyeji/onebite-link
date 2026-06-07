import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
      <Link href="/" className="text-xl font-bold text-blue-600">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        + 새 링크
      </Link>
    </header>
  );
}
