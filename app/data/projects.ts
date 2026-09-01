export type Project = {
  title: string;
  year: string;
  tags: string[];
  href: string;
  cover?: string;
  mobileCover?: string;
  // Overrides mobileCover for the Work page grid view specifically, for
  // projects that want a different crop there than on the homepage card.
  mobileGridCover?: string;
  // When set, used for the Work grid view thumbnail at every breakpoint
  // (mobile and desktop alike), overriding cover/mobileGridCover there.
  gridCover?: string;
};

export const projects: Project[] = [
  {
    title: "SUNO",
    year: "2025",
    tags: ["Product Design"],
    href: "/work/suno",
    cover: "/images/work/suno/cover-suno.jpg",
    mobileCover: "/images/work/suno/mobile-cover-suno.jpg",
  },
  {
    title: "Connect IoT",
    year: "2024",
    tags: ["Product Design"],
    href: "/work/connect-iot",
    cover: "/images/work/connect-iot/cover-connect.jpg",
    mobileCover: "/images/work/connect-iot/mobile-cover-connect.jpg",
  },
  {
    title: "Be!",
    year: "2025",
    tags: ["Product Design"],
    href: "/work/be",
    cover: "/images/work/be/cover-be.jpg",
    mobileCover: "/images/work/be/mobile-cover-be.jpg",
    mobileGridCover: "/images/work/be/mobile-grid-be.jpg",
  },
  {
    title: "TARQ",
    year: "2026",
    tags: ["Website Design"],
    href: "/work/tarq",
    cover: "/images/work/tarq/cover-tarq.png",
    mobileCover: "/images/work/tarq/mobile-cover-tarq.png",
  },
  {
    title: "The Somos",
    year: "2023",
    tags: ["Website Design"],
    href: "/work/the-somos-hotel",
    cover: "/images/work/the-somos-hotel/cover-thesomos.jpg",
    mobileCover: "/images/work/the-somos-hotel/mobile-cover-thesomos.jpg",
    gridCover: "/images/work/the-somos-hotel/mobile-grid-somos.jpg",
  },
  {
    title: "ONX",
    year: "2026",
    tags: ["Website Design"],
    href: "/work/onx",
    cover: "/images/work/onx/cover-onx.jpg",
    mobileCover: "/images/work/onx/mobile-cover-onx.jpg",
  },
  {
    title: "Hidroituango",
    year: "2025",
    tags: ["Website Design"],
    href: "/work/hidroituango",
    cover: "/images/work/hidroituango/cover-hidro.jpg",
    mobileCover: "/images/work/hidroituango/mobile-cover-hidro.jpg",
  },
  { title: "Yachtcat", year: "2026", tags: ["Website Design"], href: "/work/yachtcat" },
];
