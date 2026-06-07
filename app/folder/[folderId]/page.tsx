'use client'

import { use } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import LinkGrid from "@/components/link-grid";
import { mockLinks } from "@/lib/mock-data";
import { useFolders } from "@/context/folder-context";

export default function FolderPage(props: { params: Promise<{ folderId: string }> }) {
  const { folderId } = use(props.params);
  const { folders } = useFolders();

  const folder = folders.find((f) => f.id === folderId);
  const links = mockLinks
    .filter((link) => link.folderId === folderId)
    .map((link) => ({ ...link, folderName: folder?.name }));

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
