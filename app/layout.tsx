import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FolderProvider } from "@/context/folder-context";
import { LinkProvider } from "@/context/link-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 한입 링크",
    default: "한입 링크",
  },
  description: "링크를 폴더별로 깔끔하게 정리하세요",
  openGraph: {
    title: "한입 링크",
    description: "링크를 폴더별로 깔끔하게 정리하세요",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description: "링크를 폴더별로 깔끔하게 정리하세요",
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <LinkProvider>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
