import { NextRequest } from "next/server";

function getMeta(html: string, property: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].trim();
  }
  return "";
}

function getNameMeta(html: string, name: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].trim();
  }
  return "";
}

function getTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : "";
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return Response.json({ error: "url parameter is required" }, { status: 400 });
  }

  const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; OneBiteLink/1.0)" },
      signal: AbortSignal.timeout(8000),
    });

    const html = await res.text();

    const title =
      getMeta(html, "og:title") ||
      getNameMeta(html, "twitter:title") ||
      getTitle(html);

    const description =
      getMeta(html, "og:description") ||
      getNameMeta(html, "description") ||
      getNameMeta(html, "twitter:description");

    const image =
      getMeta(html, "og:image") ||
      getNameMeta(html, "twitter:image");

    return Response.json({ url, title, description, image });
  } catch {
    return Response.json({ url, title: "", description: "", image: "" });
  }
}
