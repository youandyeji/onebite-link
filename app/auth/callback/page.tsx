"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const hasCode = !!new URLSearchParams(window.location.search).get("code");

    if (!hasCode) {
      // code 없이 직접 접근한 경우 — 현재 세션 확인 후 이동
      supabase.auth.getSession().then(({ data: { session } }) => {
        router.replace(session ? "/" : "/login");
      });
      return;
    }

    // code가 있을 때: 교환 완료 이벤트로 목적지 결정
    // SIGNED_IN / PASSWORD_RECOVERY 는 setTimeout(0) 으로 지연되어 INITIAL_SESSION보다 늦게 도착함
    let handled = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (handled) return;

      if (event === "PASSWORD_RECOVERY") {
        handled = true;
        router.replace("/update-password");
      } else if (event === "SIGNED_IN" && session) {
        handled = true;
        const next = new URLSearchParams(window.location.search).get("next") ?? "/";
        router.replace(next);
      } else if (event === "INITIAL_SESSION" && !session) {
        // 코드 교환 실패 (만료·재사용 등)
        handled = true;
        router.replace("/login");
      }
      // INITIAL_SESSION with session → 아직 SIGNED_IN/PASSWORD_RECOVERY 대기
    });

    const timeout = setTimeout(() => {
      if (handled) return;
      handled = true;
      router.replace("/login");
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <p className="text-[17px] text-[var(--text-sub)]">로그인 처리 중...</p>
    </div>
  );
}
