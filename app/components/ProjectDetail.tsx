"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "./Navbar";
import Shuffle from "./Shuffle";
import HoverLetters from "./HoverLetters";
import HoverIcon from "./HoverIcon";
import PlusMinusIcon from "./PlusMinusIcon";

type Section = {
  label: string;
  text: string;
};

type ProjectDetailProps = {
  meta: string;
  sections: Section[];
  scrollerId: string;
  externalUrl?: string;
  coverImage?: string;
  images?: string[];
};

export default function ProjectDetail({
  meta,
  sections,
  scrollerId,
  externalUrl,
  coverImage,
  images,
}: ProjectDetailProps) {
  const [openIndex, setOpenIndex] = useState(0);

  // Renders one gallery box: the real image at `images[index]` when it
  // exists, falling back to the white placeholder otherwise.
  function GallerySlot({ index, className }: { index: number; className: string }) {
    const src = images?.[index];
    return src ? (
      <div className={`relative ${className}`}>
        <Image src={src} alt="" fill className="object-cover" />
      </div>
    ) : (
      <div className={`${className} bg-white`} />
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white md:overflow-hidden">
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

      {/* Mobile: the header's own Works link takes over the "back to
          works" job, the cover image now sits above the meta line instead
          of inside the image stack, and Challenge/Approach/Build/Result
          collapse into a tap-to-expand accordion so the page doesn't open
          on a wall of text. The CTA is no longer pinned to the bottom —
          it just sits at the natural end of the page, appearing once the
          user has actually scrolled through everything. The periodic
          Shuffle replay is kept; this block (not the window) is the real
          scroll container since the root is h-screen/overflow-hidden, so
          it needs its own id passed to Shuffle's scroller prop. */}
      <div
        id={`${scrollerId}-mobile`}
        className="scrollbar-none relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto md:hidden"
      >
        <div className="mt-4 border-t border-white/15 p-4">
          {coverImage ? (
            <div className="relative h-41.5 w-full">
              <Image src={coverImage} alt="" fill priority className="object-cover" />
            </div>
          ) : (
            <div className="h-41.5 w-full bg-white" />
          )}
        </div>

        <div className="flex items-center gap-6 border-t border-b border-white/15 p-4">
          <p className="flex-1 text-sm">{meta}</p>
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit live site"
            >
              <Image
                src="/images/external-link.svg"
                alt=""
                width={24}
                height={24}
              />
            </a>
          )}
        </div>

        <div className="flex flex-col gap-2 p-4 text-sm">
          {sections.map((section, index) => {
            const open = openIndex === index;
            return (
              <div key={section.label} className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-2.5 py-1"
                >
                  <span className="opacity-50">{section.label}</span>
                  <PlusMinusIcon open={open} />
                </button>
                {open && <p>{section.text}</p>}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 p-4">
          <div className="flex h-51.25 items-center gap-2">
            <GallerySlot index={0} className="h-full min-w-px flex-1" />
            <GallerySlot index={1} className="h-full min-w-px flex-1" />
          </div>
          <div className="flex h-51.25 items-center gap-2">
            <GallerySlot index={2} className="h-full w-2/5 shrink-0" />
            <GallerySlot index={3} className="h-full min-w-px flex-1" />
          </div>
          <GallerySlot index={4} className="h-51.25 w-full" />
          <div className="flex h-51.25 items-center gap-2">
            <GallerySlot index={5} className="h-full min-w-px flex-1" />
            <GallerySlot index={6} className="h-full min-w-px flex-1" />
          </div>
          <div className="flex h-51.25 items-center gap-2">
            <GallerySlot index={7} className="h-full w-2/5 shrink-0" />
            <GallerySlot index={8} className="h-full min-w-px flex-1" />
          </div>
        </div>

        <div className="flex items-end justify-center gap-2.5 bg-linear-to-b from-transparent to-[#080808] px-2.5 py-6">
          <Shuffle
            text="Need something like this?"
            tag="p"
            className="w-33 text-[20px] leading-none uppercase"
            shuffleDirection="right"
            duration={0.35}
            triggerOnHover={false}
            scroller={`#${scrollerId}-mobile`}
            repeatIntervalMs={8000}
          />
          <a
            href="mailto:hello@misa.studio"
            aria-label="Let's talk"
            className="flex shrink-0 items-center gap-2 text-sm uppercase"
          >
            <span>LET&apos;S TALK</span>
            <Image src="/images/arrow.svg" alt="" width={16} height={16} />
          </a>
        </div>
      </div>

      {/* Desktop: unchanged from before. */}
      <a
        href="/works"
        aria-label="Back to Works"
        className="relative z-10 hidden shrink-0 items-center border-y border-white/15 px-10 py-4 text-base md:flex"
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

      <div className="relative z-10 hidden min-h-0 flex-1 md:flex">
        <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-r border-white/15 p-4">
          {coverImage ? (
            <div className="relative h-110.5 w-full shrink-0">
              <Image src={coverImage} alt="" fill priority className="object-cover" />
            </div>
          ) : (
            <div className="h-110.5 w-full shrink-0 bg-white" />
          )}
          <div className="flex w-full shrink-0 items-center gap-2">
            <GallerySlot index={0} className="h-110.5 min-w-px flex-1" />
            <GallerySlot index={1} className="h-110.5 min-w-px flex-1" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <GallerySlot index={2} className="h-110.5 w-94.5 shrink-0" />
            <GallerySlot index={3} className="h-110.5 min-w-px flex-1" />
          </div>
          <GallerySlot index={4} className="h-110.5 w-full shrink-0" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <GallerySlot index={5} className="h-110.5 min-w-px flex-1" />
            <GallerySlot index={6} className="h-110.5 min-w-px flex-1" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <GallerySlot index={7} className="h-110.5 w-94.5 shrink-0" />
            <GallerySlot index={8} className="h-110.5 min-w-px flex-1" />
          </div>
        </div>

        <div className="relative flex w-123.5 shrink-0 flex-col border-b border-white/15">
          <div className="flex shrink-0 flex-col items-end border-b border-white/15 p-4">
            <div className="flex w-full items-center justify-end gap-4 py-1 text-sm">
              <p className="text-right">{meta}</p>
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit live site"
                >
                  <Image
                    src="/images/external-link.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </a>
              )}
            </div>
          </div>

          <div
            id={scrollerId}
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
              scroller={`#${scrollerId}`}
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
