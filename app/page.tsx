import Image from "next/image";
import ProjectsCarousel from "./components/ProjectsCarousel";
import Navbar, { HOVER_STAGGER_MS } from "./components/Navbar";
import HoverLetters from "./components/HoverLetters";
import HoverIcon from "./components/HoverIcon";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <Navbar variant="home" />

      <main className="relative z-10 mt-10 flex h-full flex-1 flex-col items-end justify-end gap-2 px-10 pb-20.5">
        <a
          href="/works"
          aria-label="See All Works"
          className="group flex items-center justify-center gap-2.5 text-base"
        >
          <HoverLetters text="See All Works" />
          <HoverIcon
            src="/images/arrow.svg"
            width={24}
            height={24}
            className="-scale-x-100"
            delayMs={"See All Works".length * HOVER_STAGGER_MS}
          />
        </a>
        <ProjectsCarousel />
      </main>
    </div>
  );
}
