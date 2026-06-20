'use client'

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { type LinkItem } from "@/components/link-card";

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  deleteLink: (id: number) => Promise<void>;
  editLink: (id: number, patch: Pick<LinkItem, "title" | "description" | "folderId">) => Promise<void>;
};

const LinkContext = createContext<LinkContextType>({
  links: [],
  addLink: async () => {},
  deleteLink: async () => {},
  editLink: async () => {},
});

function mapLink(data: Record<string, unknown>): LinkItem {
  return {
    id: data.id as number,
    url: data.url as string,
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    thumbnail: (data.thumbnail_url as string) || "",
    folderId: data.folder_id != null ? String(data.folder_id) : "",
  };
}

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const currentUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchLinks(userId: string) {
      const { data } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (data) setLinks(data.map(mapLink));
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUserId = session?.user?.id ?? null;
      if (newUserId === currentUserIdRef.current) return;

      currentUserIdRef.current = newUserId;
      setLinks([]);
      if (newUserId) fetchLinks(newUserId);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function addLink(link: Omit<LinkItem, "id">) {
    const supabase = createClient();
    const { data } = await supabase
      .from("links")
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail || null,
        folder_id: link.folderId ? Number(link.folderId) : null,
      })
      .select()
      .single();
    if (data) {
      setLinks((prev) => [mapLink(data), ...prev]);
    }
  }

  async function deleteLink(id: number) {
    const supabase = createClient();
    await supabase.from("links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function editLink(id: number, patch: Pick<LinkItem, "title" | "description" | "folderId">) {
    const supabase = createClient();
    await supabase
      .from("links")
      .update({
        title: patch.title,
        description: patch.description,
        folder_id: patch.folderId ? Number(patch.folderId) : null,
      })
      .eq("id", id);
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, editLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
