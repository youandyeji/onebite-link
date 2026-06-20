'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { type Folder } from "@/lib/mock-data";

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => void;
  editFolder: (id: number, name: string) => void;
};

const FolderContext = createContext<FolderContextType>({
  folders: [],
  addFolder: async () => {},
  deleteFolder: () => {},
  editFolder: () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("folders")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data);
      });
  }, []);

  async function addFolder(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("folders")
      .insert({ name: trimmed })
      .select()
      .single();
    if (data) {
      setFolders((prev) => [...prev, data]);
    }
  }

  function deleteFolder(id: number) {
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  function editFolder(id: number, name: string) {
    const trimmed = name.trim();
    if (trimmed) {
      setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name: trimmed } : f)));
    }
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder, editFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  return useContext(FolderContext);
}
