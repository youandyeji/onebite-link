'use client'

import { createContext, useContext, useState } from "react";
import { folders as initialFolders, type Folder } from "@/lib/mock-data";

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextType>({
  folders: initialFolders,
  addFolder: () => {},
  deleteFolder: () => {},
});

function generateId(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  function addFolder(name: string) {
    const trimmed = name.trim();
    if (trimmed && !folders.some((f) => f.name === trimmed)) {
      setFolders((prev) => [...prev, { id: generateId(), name: trimmed }]);
    }
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
