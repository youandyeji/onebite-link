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

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <div className="bg-[var(--card)] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-shadow duration-200 overflow-hidden flex flex-col">
      <Thumbnail src={link.thumbnail} alt={link.title} />
      {link.thumbnail && (
        <div className="w-full h-36 bg-[var(--badge-bg)] items-center justify-center text-4xl shrink-0 hidden">
          🔗
        </div>
      )}
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
  );
}
