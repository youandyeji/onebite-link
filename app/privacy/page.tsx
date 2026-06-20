import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "개인정보 처리방침" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] px-5 py-12">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="text-[var(--accent)] text-[14px] hover:opacity-80 transition-opacity duration-200 w-fit"
          >
            ← 홈으로
          </Link>
          <h1 className="text-[26px] font-bold text-[var(--text)]">개인정보 처리방침</h1>
          <p className="text-[14px] text-[var(--text-sub)]">최종 수정일: 2026년 6월 20일</p>
        </div>

        <div className="bg-[var(--card)] rounded-2xl p-7 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-6 text-[var(--text)]">
          <Section title="1. 수집하는 개인정보 항목">
            <p>한입 링크(이하 "서비스")는 서비스 제공을 위해 다음의 개인정보를 수집합니다.</p>
            <ul>
              <li>회원가입 시: 이메일 주소</li>
              <li>서비스 이용 시: 등록한 링크 URL, 링크 제목, 설명, 폴더 정보</li>
              <li>소셜 로그인 시: OAuth 제공자(카카오 등)로부터 전달받은 식별 정보</li>
            </ul>
          </Section>

          <Section title="2. 개인정보 수집 및 이용 목적">
            <ul>
              <li>회원 식별 및 서비스 제공</li>
              <li>링크 및 폴더 데이터의 저장·관리</li>
              <li>서비스 관련 공지 및 안내 발송</li>
              <li>부정 이용 방지 및 서비스 보안 유지</li>
            </ul>
          </Section>

          <Section title="3. 개인정보 보유 및 이용 기간">
            <p>
              수집된 개인정보는 서비스 이용 계약이 유효한 기간 동안 보유·이용됩니다.
              회원 탈퇴 요청 시 즉시 파기하며, 관계 법령에 의해 보존이 필요한 경우 해당 법령에서
              정한 기간 동안 보관합니다.
            </p>
          </Section>

          <Section title="4. 개인정보의 제3자 제공">
            <p>
              서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의
              경우에는 예외로 합니다.
            </p>
            <ul>
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차에 따라 요청이 있는 경우</li>
            </ul>
          </Section>

          <Section title="5. 개인정보 처리 위탁">
            <p>서비스는 원활한 운영을 위해 아래와 같이 개인정보 처리 업무를 위탁합니다.</p>
            <ul>
              <li>Supabase Inc. — 데이터베이스 및 인증 서비스 운영</li>
            </ul>
          </Section>

          <Section title="6. 이용자 권리 및 행사 방법">
            <p>이용자는 언제든지 다음의 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람 요청</li>
              <li>개인정보 정정·삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>회원 탈퇴(서비스 내 계정 삭제 기능 이용)</li>
            </ul>
          </Section>

          <Section title="7. 쿠키 사용">
            <p>
              서비스는 로그인 세션 유지를 위해 쿠키를 사용합니다. 브라우저 설정을 통해 쿠키 저장을
              거부할 수 있으나, 이 경우 로그인이 필요한 서비스 이용이 제한될 수 있습니다.
            </p>
          </Section>

          <Section title="8. 개인정보 보호책임자">
            <p>개인정보 처리와 관련된 문의는 아래로 연락해주세요.</p>
            <ul>
              <li>담당자: 김예지</li>
              <li>이메일: kaylee_kim@kakao.com</li>
            </ul>
          </Section>

          <Section title="9. 개인정보 처리방침 변경">
            <p>
              이 방침은 법령 또는 서비스 정책 변경에 따라 수정될 수 있습니다. 변경 시 서비스 내
              공지 또는 이메일을 통해 사전 안내합니다.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[17px] font-bold text-[var(--text)]">{title}</h2>
      <div className="text-[15px] text-[var(--text-sub)] leading-relaxed flex flex-col gap-1 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1 [&_ul]:pl-4 [&_li]:list-disc">
        {children}
      </div>
    </div>
  );
}
