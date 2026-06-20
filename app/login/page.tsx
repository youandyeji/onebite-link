"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isFormFilled = email.trim() !== "" && password !== "";

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleKakaoLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({ provider: "kakao" });
  }

  async function handleLogin() {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);

    if (error) {
      setToast("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-5">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[var(--error)] text-white text-[15px] font-bold rounded-xl shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-[26px] font-bold text-[var(--accent)] text-center">
          한입 링크
        </h1>
        <div className="bg-[var(--card)] rounded-2xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-4">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isFormFilled && !isLoading && handleLogin()}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
          />
          <button
            onClick={handleLogin}
            disabled={!isFormFilled || isLoading}
            className="w-full py-[14px] mt-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[17px] font-bold rounded-xl active:scale-[0.98] transition-all duration-200 disabled:bg-[var(--inactive)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[var(--inactive)]" />
            <span className="text-[13px] text-[var(--placeholder)]">또는</span>
            <div className="flex-1 h-px bg-[var(--inactive)]" />
          </div>
          <button
            onClick={handleKakaoLogin}
            className="w-full py-[14px] bg-[#FEE500] hover:bg-[#F0D800] text-[#3C1E1E] text-[17px] font-bold rounded-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C1E1E" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C6.477 3 2 6.582 2 11.008c0 2.836 1.832 5.328 4.594 6.773l-1.17 4.356a.375.375 0 0 0 .547.416l4.93-3.268C11.26 19.43 11.628 19.46 12 19.46c5.523 0 10-3.582 10-8.008S17.523 3 12 3Z" />
            </svg>
            카카오로 로그인
          </button>
          <p className="text-center text-[14px] text-[var(--text-sub)]">
            <Link
              href="/reset-password"
              className="text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
            >
              비밀번호 찾기
            </Link>
          </p>
          <p className="text-center text-[14px] text-[var(--text-sub)]">
            계정이 없으신가요?{" "}
            <Link
              href="/signup"
              className="text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
