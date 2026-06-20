import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const PROTECTED_PATHS = ["/", "/new"];
const AUTH_PATHS = ["/login", "/signup", "/reset-password"];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const code = request.nextUrl.searchParams.get("code");

  // 복구 코드가 다른 경로에 도착하면 /update-password로 전달
  if (code && !user && pathname !== "/update-password") {
    const url = new URL("/update-password", request.url);
    url.searchParams.set("code", code);
    return NextResponse.redirect(url);
  }

  // /update-password는 복구 코드가 있을 때만 비로그인 접근 허용
  const isProtected =
    PROTECTED_PATHS.includes(pathname) ||
    pathname.startsWith("/folder/") ||
    (pathname === "/update-password" && !code);

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
