"use client";

const folders = ["개발", "디자인", "비즈니스", "기타"];

export default function NewLinkForm() {
  return (
    <form className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5 max-w-lg w-full">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="url">
          링크 URL
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700" htmlFor="folder">
          폴더
        </label>
        <select
          id="folder"
          defaultValue=""
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        저장
      </button>
    </form>
  );
}
