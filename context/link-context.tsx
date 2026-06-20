'use client'

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { type LinkItem } from "@/components/link-card";

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => Promise<void>;
  deleteLink: (id: number) => void;
  editLink: (id: number, patch: Pick<LinkItem, "title" | "description" | "folderId">) => void;
};

const LinkContext = createContext<LinkContextType>({
  links: [],
  addLink: async () => {},
  deleteLink: () => {},
  editLink: () => {},
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

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("links")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data.map(mapLink));
      });
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

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function editLink(id: number, patch: Pick<LinkItem, "title" | "description" | "folderId">) {
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
