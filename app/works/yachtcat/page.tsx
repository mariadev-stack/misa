import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "Yachtcat / Website Design / 2026";

const sections = [
  {
    label: "CHALLENGE",
    text: "Yachtcat builds high-performance catamarans, and the brand needed a digital presence that could carry the same sense of precision, luxury, and craftsmanship as the vessels themselves. The site had to sell an experience as much as a product, communicating naval engineering credibility to a discerning, high-end audience while making the emotional case for life on the water.",
  },
  {
    label: "APPROACH",
    text: "I built the design from the ground up, starting with visual identity before touching layout. The direction centered on restraint: generous negative space, cinematic full-bleed imagery and video, and a quiet, confident typographic system, letting the yachts themselves carry the weight of the story rather than dense copy or decoration. I also directed the photography approach used across the site, making sure every image reinforced the same mood of precision and freedom that defines the brand line, \"designed to sail beyond.\"",
  },
  {
    label: "BUILD",
    text: "As the sole designer on this project, I owned the process end to end: visual identity, design system, photography direction, and full UI/UX across the site, from the homepage and fleet pages to about, blog, FAQ, and contact. I delivered a complete design system and specs to the development team for handoff and implementation.",
  },
  {
    label: "RESULT",
    text: "The result is a site that feels less like a product catalog and more like a preview of the lifestyle Yachtcat sells: precise, spacious, and unmistakably premium, positioning the brand alongside the naval architecture and luxury craft it's built to compete with.",
  },
];

export default function YachtcatProject() {
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
            id="yachtcat-right-panel"
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
              scroller="#yachtcat-right-panel"
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
