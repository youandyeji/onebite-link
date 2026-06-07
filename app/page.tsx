import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockLinks } from "@/lib/mock-data";
import { FolderProvider } from "@/context/folder-context";

export default function Home() {
  return (
    <FolderProvider>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
            <LinkGrid links={mockLinks} />
          </main>
        </div>
      </div>
    </FolderProvider>
  );
}
