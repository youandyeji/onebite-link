'use client'

import { createContext, useContext, useState } from "react";
import { mockLinks } from "@/lib/mock-data";
import { type LinkItem } from "@/components/link-card";

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
  deleteLink: (id: number) => void;
};

const LinkContext = createContext<LinkContextType>({
  links: mockLinks,
  addLink: () => {},
  deleteLink: () => {},
});

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);

  function addLink(link: Omit<LinkItem, "id">) {
    setLinks((prev) => [{ ...link, id: Date.now() }, ...prev]);
  }

  function deleteLink(id: number) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
