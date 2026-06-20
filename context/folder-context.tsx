'use client'

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { type Folder } from "@/lib/mock-data";

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  editFolder: (id: number, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextType>({
  folders: [],
  addFolder: async () => {},
  deleteFolder: async () => {},
  editFolder: async () => {},
});

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const currentUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchFolders(userId: string) {
      const { data } = await supabase
        .from("folders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });
      if (data) setFolders(data);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUserId = session?.user?.id ?? null;
      if (newUserId === currentUserIdRef.current) return;

      currentUserIdRef.current = newUserId;
      setFolders([]);
      if (newUserId) fetchFolders(newUserId);
    });

    return () => subscription.unsubscribe();
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

  async function deleteFolder(id: number) {
    const supabase = createClient();
    await supabase.from("folders").delete().eq("id", id);
    setFolders((prev) => prev.filter((f) => f.id !== id));
  }

  async function editFolder(id: number, name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const supabase = createClient();
    await supabase.from("folders").update({ name: trimmed }).eq("id", id);
    setFolders((prev) => prev.map((f) => (f.id === id ? { ...f, name: trimmed } : f)));
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
