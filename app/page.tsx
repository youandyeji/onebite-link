import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockLinks, folders } from "@/lib/mock-data";

export default function Home() {
  const linksWithName = mockLinks.map((link) => ({
    ...link,
    folderName: folders.find((f) => f.id === link.folderId)?.name,
  }));

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
          <LinkGrid links={linksWithName} />
        </main>
      </div>
    </div>
  );
}
