import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "ONX / Website Design / 2026";

const sections = [
  {
    label: "CHALLENGE",
    text: "ONX Sports needed a dedicated page to spotlight Justin Gaethje within their \"Champions\" lineup, giving fans and prospective customers a way to see exactly which ONX gear a UFC-level competitor trains and fights with. The page needed to work as both a credibility piece for the brand (gear tested by real champions) and a functional product showcase that drives people toward the items featured.",
  },
  {
    label: "APPROACH",
    text: "I designed the page to center the athlete first and the product second: leading with imagery and context around Justin's training, then connecting that directly to the specific gear he uses, so the product recommendations feel earned rather than like a standard upsell. The layout needed to slot naturally into ONX's existing site structure and visual identity (the bold, coach-built, performance-driven brand language already established across the store) while giving this page its own moment as part of the Champions series.",
  },
  {
    label: "BUILD",
    text: "I designed the full page: layout, content structure, and the connective flow between athlete storytelling and shoppable product sections, tying his training gear directly to the corresponding ONX product pages. The design has been fully handed off to the development team and is currently in build; the page is not yet live on the site.",
  },
  {
    label: "RESULT",
    text: "Since the page is still in development, the case study reflects the design direction and intent as delivered. Once live, it will give ONX a template for showcasing future athletes in the Champions series in a way that connects storytelling directly to product discovery.",
  },
];

export default function OnxProject() {
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
            id="onx-right-panel"
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
              scroller="#onx-right-panel"
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
