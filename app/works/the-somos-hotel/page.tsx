import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "The Somos Hotel / Website Design / 2023";

const sections = [
  {
    label: "CHALLENGE",
    text: "The Somos Hotels needed a digital presence that matched the caliber of its physical spaces, multiple boutique hotel properties across Medellín, each with its own identity (Central, Bold, Beats, Loho) but united under one brand built on design, art, and Colombian culture. The site needed to let each property feel distinct while giving travelers a cohesive, premium browsing and booking experience across the whole portfolio.",
  },
  {
    label: "APPROACH",
    text: "I designed the experience around the idea that the site should feel like an extension of staying at one of the hotels: refined, visual, and detail-oriented, rather than a generic booking template. This meant building a flexible design system that could showcase each property's individual personality (rooftop bars, architecture, neighborhood) while keeping shared patterns for browsing rooms, exploring experiences, and completing a booking. Photography, layout rhythm, and typography were treated as core to the brand experience, not decoration on top of a booking engine.",
  },
  {
    label: "BUILD",
    text: "As lead designer, I owned the full UX and UI design across the site, from information architecture and the multi-property navigation to the individual hotel pages, room and rate presentation, and the booking flow. I delivered complete design specs and assets to the development team for implementation.",
  },
  {
    label: "RESULT",
    text: "The design established a strong, cohesive visual identity for The Somos Hotels across its properties, translating the brand's emphasis on design and Colombian culture into a premium digital experience. As with any handoff, some fidelity between the original design and the live implementation can shift once a project moves into development; the case study reflects the design direction and intent as delivered.",
  },
];

export default function TheSomosHotelProject() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <Navbar variant="simple" />

      <a
        href="/"
        aria-label="Back to Works"
        className="relative z-10 flex shrink-0 items-center border-y border-white/15 px-10 py-4 text-base"
      >
        <span className="group inline-flex items-center gap-2.5">
          <HoverIcon src="/images/arrow.svg" width={24} height={24} delayMs={0} />
          <HoverLetters text="Back to Works" staggerMs={HOVER_STAGGER_MS} />
        </span>
      </a>

      <div className="relative z-10 flex min-h-0 flex-1">
        <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-r border-white/15 p-4">
          <div className="h-110.5 w-full shrink-0 rounded-sm bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 rounded-sm bg-white" />
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
          </div>
          <div className="h-110.5 w-full shrink-0 rounded-sm bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 rounded-sm bg-white" />
            <div className="h-110.5 min-w-px flex-1 rounded-sm bg-white" />
          </div>
        </div>

        <div className="relative flex w-123.5 shrink-0 flex-col border-b border-white/15">
          <div className="flex shrink-0 flex-col items-end border-b border-white/15 p-4">
            <div className="flex w-full items-center justify-end py-1 text-sm">
              <p className="text-right">{meta}</p>
            </div>
          </div>

          <div
            id="the-somos-hotel-right-panel"
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
              scroller="#the-somos-hotel-right-panel"
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
