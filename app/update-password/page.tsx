"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const isFormFilled = password !== "" && confirmPassword !== "";

  // URL의 code를 세션으로 교환
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
      setIsReady(true);
      return;
    }
    const supabase = createClient();
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setToast("유효하지 않거나 만료된 링크입니다. 비밀번호 찾기를 다시 시도해주세요.");
      }
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleUpdate() {
    if (password !== confirmPassword) {
      setToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      setToast("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
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
          <div className="flex flex-col gap-1">
            <p className="text-[17px] font-bold text-[var(--text)]">새 비밀번호 설정</p>
            <p className="text-[14px] text-[var(--text-sub)]">
              사용할 새 비밀번호를 입력해주세요.
            </p>
          </div>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isReady}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200 disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={!isReady}
            onKeyDown={(e) => e.key === "Enter" && isFormFilled && !isLoading && handleUpdate()}
            className="w-full px-4 py-[14px] rounded-xl bg-[var(--input-bg)] text-[var(--text)] placeholder-[var(--placeholder)] text-[17px] outline-none focus:bg-white focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200 disabled:opacity-50"
          />
          <button
            onClick={handleUpdate}
            disabled={!isFormFilled || isLoading || !isReady}
            className="w-full py-[14px] mt-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[17px] font-bold rounded-xl active:scale-[0.98] transition-all duration-200 disabled:bg-[var(--inactive)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isLoading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </div>
      </div>
    </div>
  );
}
