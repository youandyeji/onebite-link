"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSend() {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setIsLoading(false);

    if (error) {
      setToast({ message: "이메일 발송에 실패했습니다. 다시 시도해주세요.", type: "error" });
      return;
    }

    setToast({ message: "비밀번호 재설정 링크를 이메일로 발송했습니다.", type: "success" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-5">
      {toast && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 text-white text-[15px] font-bold rounded-xl shadow-lg whitespace-nowrap ${
            toast.type === "success" ? "bg-[var(--success)]" : "bg-[var(--error)]"
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-[26px] font-bold text-[var(--accent)] text-center">
          한입 링크
        </h1>
        <div className="bg-[var(--card)] rounded-2xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-bold text-[var(--text)]">비밀번호 찾기</p>
            <p className="text-[14px] text-[var(--text-sub)]">
              가입한 이메일 주소를 입력하면 재설정 링크를 보내드립니다.
            </p>
          </div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && email.trim() && !isLoading && handleSend()}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
          />
          <button
            onClick={handleSend}
            disabled={!email.trim() || isLoading}
            className="w-full py-[14px] mt-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[17px] font-bold rounded-xl active:scale-[0.98] transition-all duration-200 disabled:bg-[var(--inactive)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? "발송 중..." : "재설정 링크 발송"}
          </button>
          <p className="text-center text-[14px] text-[var(--text-sub)]">
            <Link
              href="/login"
              className="text-[var(--accent)] hover:opacity-80 transition-opacity duration-200"
            >
              로그인으로 돌아가기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
