import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "TARQ / Website Design / 2026";
const externalUrl = "https://www.tarqstudio.com/en";

const sections = [
  {
    label: "CHALLENGE",
    text: "TARQ is an architecture and interior design studio with projects spanning Bogotá, Madrid, and Miami, and their online presence needed to match the caliber of that work. The site had to present highly visual, detail-driven architectural projects in a way that felt as considered and refined as the spaces TARQ designs, while staying easy to navigate for prospective clients and press.",
  },
  {
    label: "APPROACH",
    text: "I approached the site as an extension of TARQ's architectural language: clean, structured, and image-led, giving the projects room to breathe without competing with them. I designed a flexible project showcase that could hold everything from full architectural builds to interior design work, structured around TARQ's own process (architectural design, interior architecture, rendering, and technical definition) so visitors understand not just what TARQ makes, but how they work. Bilingual support (Spanish and English) was built into the experience from the start, reflecting the studio's international footprint.",
  },
  {
    label: "BUILD",
    text: "As the sole designer on this project, I owned the full process end to end: user experience, UI design, and QA. This included the site architecture, the homepage and studio/about sections, the projects showcase and individual project pages, the services and press sections, and the contact flow. I handed off detailed specs and assets to the development team and worked through QA to make sure the final build matched the design intent across breakpoints and both languages.",
  },
  {
    label: "RESULT",
    text: "The result is a polished, image-forward site that gives TARQ's architecture and interior design work the presentation it deserves, structured clearly enough for clients to understand the studio's process and portfolio at a glance, across its three markets.",
  },
];

export default function TarqProject() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image
          alt=""
          src="/images/grid.svg"
          fill
          priority
          className="object-cover"
        />
      </div>

      <Navbar variant="simple" />

      <a
        href="/works"
        aria-label="Back to Works"
        className="relative z-10 flex shrink-0 items-center border-y border-white/15 px-10 py-4 text-base"
      >
        <span className="group inline-flex items-center gap-2.5">
          <HoverIcon
            src="/images/arrow.svg"
            width={24}
            height={24}
            delayMs={0}
          />
          <HoverLetters text="Back to Works" staggerMs={HOVER_STAGGER_MS} />
        </span>
      </a>

      <div className="relative z-10 flex min-h-0 flex-1">
        <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-r border-white/15 p-4">
          <div className="h-110.5 w-full shrink-0 bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="h-110.5 w-full shrink-0 bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
        </div>

        <div className="relative flex w-123.5 shrink-0 flex-col border-b border-white/15">
          <div className="flex shrink-0 flex-col items-end border-b border-white/15 p-4">
            <div className="flex w-full items-center justify-end gap-4 py-1 text-sm">
              <p className="text-right">{meta}</p>
              <a href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit live site">
                <Image src="/images/external-link.svg" alt="" width={24} height={24} />
              </a>
            </div>
          </div>

          <div
            id="tarq-right-panel"
            className="scrollbar-none min-h-0 flex-1 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 p-4 pb-40 text-sm">
              {sections.map((section) => (
                <div key={section.label} className="flex flex-col gap-1">
                  <p className="opacity-50">{section.label}</p>
                  <p>{section.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cues that there's more to read below: a blur that intensifies
              toward the bottom, then a fade into the solid background. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 backdrop-blur-md mask-[linear-gradient(to_bottom,transparent,black_85%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#080808] from-35% to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center gap-3 p-6">
            <Shuffle
              text="Need something like this?"
              tag="p"
              className="w-42.5 text-[24px] leading-none uppercase"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              scroller="#tarq-right-panel"
              repeatIntervalMs={8000}
            />
            <a
              href="mailto:hello@misa.studio"
              aria-label="Let's talk"
              className="group flex shrink-0 items-center gap-2 text-base uppercase"
            >
              <HoverLetters text="LET'S TALK" staggerMs={HOVER_STAGGER_MS} />
              <HoverIcon
                src="/images/arrow.svg"
                width={24}
                height={24}
                className="-scale-x-100"
                delayMs={"LET'S TALK".length * HOVER_STAGGER_MS}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
