"use client";

const folders = ["개발", "디자인", "비즈니스", "기타"];

export default function NewLinkForm() {
  return (
    <form className="bg-[var(--card)] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col gap-5 max-w-lg w-full">
      <h2 className="text-xl font-bold text-[var(--text)]">새 링크 추가</h2>

      <div className="flex flex-col gap-2">
        <label className="text-[17px] font-bold text-[var(--text)]" htmlFor="url">
          링크 URL
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          className="px-4 py-3.5 bg-[var(--input-bg)] rounded-xl text-[17px] text-[var(--text)] placeholder:text-[var(--placeholder)] focus:outline-none focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[17px] font-bold text-[var(--text)]" htmlFor="folder">
          폴더
        </label>
        <select
          id="folder"
          defaultValue=""
          className="px-4 py-3.5 bg-[var(--input-bg)] rounded-xl text-[17px] text-[var(--text)] focus:outline-none focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] transition-all duration-200"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-5 py-3.5 bg-[var(--accent)] text-white text-[17px] font-bold rounded-xl hover:bg-[var(--accent-hover)] active:scale-[0.98] transition-all duration-200 mt-1"
      >
        저장
      </button>
    </form>
  );
}
