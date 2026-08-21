import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "Hidroituango / Website Design / 2025";

const sections = [
  {
    label: "CHALLENGE",
    text: "Hidroituango is Colombia's largest hydroelectric project, an institutional site that needed to communicate transparency, technical credibility, and social impact to a wide range of audiences: government bodies, the 12 municipalities in its area of direct influence, press, and the general public. The site had to hold together dense, high-stakes content (public accountability reports, contracting, technical project data) alongside a narrative about community investment and national energy impact, without feeling bureaucratic or cold.",
  },
  {
    label: "APPROACH",
    text: "As co-lead on the design, I focused on giving the site a structure that could carry both institutional weight and clarity. That meant a strong visual system built around real project imagery and data (dam height, reservoir volume, generation capacity) to make the scale of the project tangible, paired with clear navigation for the public accountability and community-facing sections that this kind of infrastructure project is required to maintain. Every section needed to serve a very different visitor, from a journalist looking for the latest news to a resident of one of the surrounding municipalities looking for community program information, so legibility and information hierarchy were as important as visual impact.",
  },
  {
    label: "BUILD",
    text: "Working as co-lead designer, I helped shape the UX and UI across the site: the homepage narrative, the project and metrics sections, the sustainability and community pages for each municipality, news, and the public accountability areas. I worked closely with the development team through handoff to make sure the design intent translated correctly into the build. QA was owned by another part of the team.",
  },
  {
    label: "RESULT",
    text: "The result is an institutional site that makes a large, technically complex infrastructure project legible and transparent, giving equal weight to the engineering scale of the dam and the social impact it's meant to represent across Antioquia.",
  },
];

export default function HidroituangoProject() {
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
            id="hidroituango-right-panel"
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
              scroller="#hidroituango-right-panel"
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
