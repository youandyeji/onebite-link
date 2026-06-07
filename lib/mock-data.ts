import { LinkItem } from "@/components/link-card";

export type Folder = { id: string; name: string };

export const folders: Folder[] = [
  { id: "10293847", name: "개발" },
  { id: "28374615", name: "디자인" },
  { id: "37261948", name: "비즈니스" },
  { id: "46182736", name: "기타" },
];

export const mockLinks: LinkItem[] = [
  {
    id: 1,
    title: "Next.js 공식 문서",
    url: "nextjs.org/docs",
    description: "Next.js 공식 문서 페이지입니다. 최신 버전의 기능과 API를 확인할 수 있습니다.",
    folderId: "10293847",
  },
  {
    id: 2,
    title: "Tailwind CSS",
    url: "tailwindcss.com",
    description: "유틸리티 퍼스트 CSS 프레임워크로 빠르게 UI를 구성할 수 있습니다.",
    folderId: "10293847",
  },
  {
    id: 3,
    title: "Figma",
    url: "figma.com",
    description: "협업 기반의 UI/UX 디자인 툴입니다. 팀원과 실시간으로 작업할 수 있습니다.",
    folderId: "28374615",
  },
  {
    id: 4,
    title: "Dribbble",
    url: "dribbble.com",
    description: "디자이너들이 작업물을 공유하는 커뮤니티 플랫폼입니다.",
    folderId: "28374615",
  },
  {
    id: 5,
    title: "Y Combinator",
    url: "ycombinator.com",
    description: "세계 최고의 스타트업 액셀러레이터로, 매달 다양한 스타트업 소식을 전합니다.",
    folderId: "37261948",
  },
  {
    id: 6,
    title: "GitHub",
    url: "github.com",
    description: "소스 코드를 호스팅하고 협업할 수 있는 개발자 플랫폼입니다.",
    folderId: "10293847",
  },
  {
    id: 7,
    title: "Notion",
    url: "notion.so",
    description: "문서, 데이터베이스, 할 일 관리를 한 곳에서 할 수 있는 올인원 워크스페이스입니다.",
    folderId: "46182736",
  },
  {
    id: 8,
    title: "Linear",
    url: "linear.app",
    description: "이슈 트래킹과 프로젝트 관리를 위한 빠르고 직관적인 툴입니다.",
    folderId: "37261948",
  },
];
