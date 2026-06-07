import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-5 h-14 bg-[var(--card)] shadow-[0_1px_0_rgba(0,0,0,0.06)] shrink-0">
      <Link href="/" className="text-xl font-bold text-[var(--accent)]">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="px-5 py-3 bg-[var(--accent)] text-white text-[17px] font-bold rounded-xl hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200"
      >
        + 새 링크
      </Link>
    </header>
  );
}
