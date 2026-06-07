'use client'

import { use } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { useLinks } from "@/context/link-context";
import { useFolders } from "@/context/folder-context";

export default function FolderPage(props: { params: Promise<{ folderId: string }> }) {
  const { folderId } = use(props.params);
  const { links } = useLinks();
  const { folders } = useFolders();

  const folder = folders.find((f) => f.id === folderId);
  const filteredLinks = links
    .filter((link) => link.folderId === folderId)
    .map((link) => ({ ...link, folderName: folder?.name }));

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)]">
          <LinkGrid links={filteredLinks} />
        </main>
      </div>
    </div>
  );
}
