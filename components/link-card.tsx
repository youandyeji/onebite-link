export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
};

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <div className="bg-[var(--card)] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] flex items-center justify-center shrink-0 text-lg">
          🔗
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[var(--text)] text-[17px] truncate">{link.title}</h3>
          <p className="text-sm text-[var(--accent)] truncate mt-0.5">{link.url}</p>
          <p className="text-sm text-[var(--text-sub)] mt-1 line-clamp-2 leading-relaxed">{link.description}</p>
          <span className="inline-block mt-3 px-2.5 py-1 bg-[var(--badge-bg)] text-[var(--accent)] text-xs font-medium rounded-lg">
            {link.folder}
          </span>
        </div>
      </div>
    </div>
  );
}
