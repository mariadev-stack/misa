export type Project = {
  title: string;
  year: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  { title: "SUNO", year: "2025", tags: ["Product Design"], href: "/works/suno" },
  { title: "Connect IoT", year: "2024", tags: ["Product Design"], href: "/works/connect-iot" },
  { title: "Be!", year: "2025", tags: ["Product Design"], href: "/works/be" },
  { title: "TARQ", year: "2026", tags: ["Website Design"], href: "/works/tarq" },
  { title: "The Somos", year: "2023", tags: ["Website Design"], href: "/works/the-somos-hotel" },
  { title: "ONX", year: "2026", tags: ["Website Design"], href: "/works/onx" },
  { title: "Hidroituango", year: "2025", tags: ["Website Design"], href: "/works/hidroituango" },
  { title: "Yachtcat", year: "2026", tags: ["Website Design"], href: "/works/yachtcat" },
];
