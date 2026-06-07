'use client'

import { createContext, useContext, useState } from "react";
import { mockLinks } from "@/lib/mock-data";
import { type LinkItem } from "@/components/link-card";

type LinkContextType = {
  links: LinkItem[];
  addLink: (link: Omit<LinkItem, "id">) => void;
};

const LinkContext = createContext<LinkContextType>({
  links: mockLinks,
  addLink: () => {},
});

export function LinkProvider({ children }: { children: React.ReactNode }) {
  const [links, setLinks] = useState<LinkItem[]>(mockLinks);

  function addLink(link: Omit<LinkItem, "id">) {
    setLinks((prev) => [
      { ...link, id: Date.now() },
      ...prev,
    ]);
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  return useContext(LinkContext);
}
