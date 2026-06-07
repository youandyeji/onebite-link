import LinkCard, { LinkItem } from "./link-card";

export default function LinkGrid({ links }: { links: LinkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
