'use client'

import { createContext, useContext, useState } from "react";
import { mockLinks } from "@/lib/mock-data";
import { type LinkItem } from "@/components/link-card";

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  deleteLink: (id: number) => void;
  editLink: (id: number, patch: Pick<LinkItem, "title" | "description" | "folderId">) => void;
};

const LinkContext = createContext<LinkContextType>({
  links: mockLinks,
  addLink: () => {},
  deleteLink: () => {},
  editLink: () => {},
});

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);

  function addLink(link: Omit<LinkItem, "id">) {
    setLinks((prev) => [{ ...link, id: Date.now() }, ...prev]);
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
