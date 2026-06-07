import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockLinks } from "@/lib/mock-data";

export default async function FolderPage(props: PageProps<"/folder/[folderId]">) {
  const { folderId } = await props.params;
  const folderName = decodeURIComponent(folderId);
  const links = mockLinks.filter((link) => link.folder === folderName);

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
          <LinkGrid links={links} />
        </main>
      </div>
    </div>
  );
}
