export type LinkItem = {
  id: number;
  title: string;
  url: string;
  description: string;
  folder: string;
};

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-base">
          🔗
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{link.title}</h3>
          <p className="text-xs text-blue-500 truncate mt-0.5">{link.url}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{link.description}</p>
          <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
            {link.folder}
          </span>
        </div>
      </div>
    </div>
  );
}
