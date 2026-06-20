import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const PROTECTED_PATHS = ["/", "/new"];
const AUTH_PATHS = ["/login", "/signup", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const code = request.nextUrl.searchParams.get("code");

  // code가 /auth/callback 이외의 경로에 도착하면 /auth/callback으로 전달
  // (비밀번호 재설정 코드, OAuth 코드 모두 /auth/callback에서 처리)
  if (code && !user && !pathname.startsWith("/auth/")) {
    const url = new URL("/auth/callback", request.url);
    url.searchParams.set("code", code);
    return NextResponse.redirect(url);
  }

  const isProtected =
    PROTECTED_PATHS.includes(pathname) ||
    pathname.startsWith("/folder/") ||
    pathname === "/update-password";

  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
