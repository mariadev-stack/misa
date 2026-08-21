import Image from "next/image";
import ProjectsCarousel from "./components/ProjectsCarousel";
import Shuffle from "./components/Shuffle";
import HoverLetters from "./components/HoverLetters";
import HoverIcon from "./components/HoverIcon";

const HOVER_STAGGER_MS = 25;

const navLinks = ["Web Design", "Design Consultancy", "Art Direction"];

const menuLinks = [
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <header className="relative z-10 flex shrink-0 items-start justify-between px-10 py-6">
        <Shuffle
          text="MISA."
          tag="p"
          className="text-[32px] leading-none"
          shuffleDirection="right"
          duration={0.35}
        />

        <nav className="flex w-43.25 flex-col gap-1 text-base">
          {navLinks.map((link) => (
            <Shuffle
              key={link}
              text={link}
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
            />
          ))}
        </nav>

        <p className="group cursor-pointer text-base" aria-label="Email me">
          <HoverLetters text="Email me" />
        </p>

        <div className="absolute top-24.5 left-22.5 flex w-43.25 flex-col gap-1">
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="group flex items-center justify-center gap-2.5 text-base"
            >
              <span className="flex-1">
                <HoverLetters text={link.label} />
              </span>
              <HoverIcon
                src="/images/arrow.svg"
                width={24}
                height={24}
                className="-scale-x-100"
                delayMs={link.label.length * HOVER_STAGGER_MS}
              />
            </a>
          ))}
        </div>
      </header>

      <main className="relative z-10 mt-10 flex h-full flex-1 flex-col items-end justify-end gap-2 px-10 pb-20.5">
        <a
          href="#works"
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
