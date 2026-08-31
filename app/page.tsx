import Image from "next/image";
import ProjectsCarousel from "./components/ProjectsCarousel";
import Navbar, { HOVER_STAGGER_MS } from "./components/Navbar";
import HoverLetters from "./components/HoverLetters";
import HoverIcon from "./components/HoverIcon";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <Navbar variant="home" />

      <main className="relative z-10 mt-6 flex h-full min-h-0 flex-1 flex-col items-end justify-end gap-2 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:mt-10 md:px-10 md:pb-20.5">
        <a
          href="/work"
          aria-label="See All Work"
          className="group flex items-center justify-center gap-2.5 text-sm md:text-base"
        >
          <HoverLetters text="See All Work" />
          <HoverIcon
            src="/images/arrow.svg"
            width={24}
            height={24}
            className="-scale-x-100"
            sizeClassName="size-4 md:size-6"
            delayMs={"See All Work".length * HOVER_STAGGER_MS}
          />
        </a>
        <ProjectsCarousel />
      </main>
    </div>
  );
}
