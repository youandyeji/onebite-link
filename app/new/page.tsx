import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = { title: "링크 추가" };
import Sidebar from "@/components/sidebar";
import NewLinkForm from "@/components/new-link-form";

export default function NewPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 bg-[var(--bg)] flex items-start justify-center">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
