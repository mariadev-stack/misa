export type Project = {
  title: string;
  year: string;
  tags: string[];
  href: string;
  cover?: string;
  mobileCover?: string;
};

export const projects: Project[] = [
  {
    title: "SUNO",
    year: "2025",
    tags: ["Product Design"],
    href: "/works/suno",
    cover: "/images/work/suno/cover-suno.jpg",
    mobileCover: "/images/work/suno/mobile-cover-suno.jpg",
  },
  {
    title: "Connect IoT",
    year: "2024",
    tags: ["Product Design"],
    href: "/works/connect-iot",
    cover: "/images/work/connect-iot/cover-connect.jpg",
    mobileCover: "/images/work/connect-iot/mobile-cover-connect.jpg",
  },
  { title: "Be!", year: "2025", tags: ["Product Design"], href: "/works/be" },
  { title: "TARQ", year: "2026", tags: ["Website Design"], href: "/works/tarq" },
  { title: "The Somos", year: "2023", tags: ["Website Design"], href: "/works/the-somos-hotel" },
  { title: "ONX", year: "2026", tags: ["Website Design"], href: "/works/onx" },
  { title: "Hidroituango", year: "2025", tags: ["Website Design"], href: "/works/hidroituango" },
  { title: "Yachtcat", year: "2026", tags: ["Website Design"], href: "/works/yachtcat" },
];
