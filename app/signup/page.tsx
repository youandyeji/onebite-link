"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isFormFilled = email.trim() !== "" && password !== "" && confirmPassword !== "";

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSignup() {
    if (password !== confirmPassword) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);

    if (error) {
      const code = (error as any).code ?? "";
      const msg = error.message ?? "";
      if (code === "over_email_send_rate_limit" || msg.includes("rate limit")) {
        setToast("잠시 후 다시 시도해주세요. (이메일 발송 한도 초과)");
      } else if (msg === "User already registered") {
        setToast("이미 가입된 이메일입니다.");
      } else {
        setToast("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
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
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && isFormFilled && !isLoading && handleSignup()}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
          />
          <button
            onClick={handleSignup}
            disabled={!isFormFilled || isLoading}
            className="w-full py-[14px] mt-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[17px] font-bold rounded-xl active:scale-[0.98] transition-all duration-200 disabled:bg-[var(--inactive)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? "처리 중..." : "회원가입"}
          </button>
          <p className="text-center text-[14px] text-[var(--text-sub)]">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
