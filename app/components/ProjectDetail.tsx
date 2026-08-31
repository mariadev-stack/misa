"use client";

import { useState } from "react";
import Image from "next/image";
import ImageWithSkeleton from "./ImageWithSkeleton";
import Navbar, { HOVER_STAGGER_MS } from "./Navbar";
import Shuffle from "./Shuffle";
import HoverLetters from "./HoverLetters";
import HoverIcon from "./HoverIcon";
import PlusMinusIcon from "./PlusMinusIcon";

type Section = {
  label: string;
  text: string;
};

type GalleryRow = { type: "pair" | "uneven" | "full"; indices: number[] };

// Splits `count` images into rows following a repeating
// [pair, uneven-pair, full-width] cycle — the rhythm every project gallery
// has used so far. A leftover of exactly one image (can't fill a pair or
// uneven-pair) falls back to a full-width row instead of being dropped.
function buildGalleryRows(count: number): GalleryRow[] {
  const cycle: GalleryRow["type"][] = ["pair", "uneven", "full"];
  const rows: GalleryRow[] = [];
  let i = 0;
  let step = 0;
  while (i < count) {
    const type = cycle[step % cycle.length];
    const need = type === "full" ? 1 : 2;
    if (count - i < need) {
      rows.push({ type: "full", indices: [i] });
      break;
    }
    rows.push({ type, indices: Array.from({ length: need }, (_, k) => i + k) });
    i += need;
    step++;
  }
  return rows;
}

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
        <ImageWithSkeleton src={src} alt="" className="object-cover" />
      </div>
    ) : (
      <div className={`${className} bg-white`} />
    );
  }

  // Lays the gallery out as a repeating [pair, uneven-pair, full-width] cycle
  // — the rhythm every project's image set has followed so far — sized to
  // however many images this project actually has, instead of a fixed count.
  const galleryRows = buildGalleryRows(images?.length ?? 0);

  function GalleryGrid({
    heightClass,
    narrowWidthClass,
    shrink0,
  }: {
    heightClass: string;
    narrowWidthClass: string;
    shrink0: boolean;
  }) {
    const rowShrink = shrink0 ? " shrink-0" : "";
    return (
      <>
        {galleryRows.map((row, i) => {
          if (row.type === "full") {
            return (
              <GallerySlot
                key={i}
                index={row.indices[0]}
                className={`${heightClass} w-full${rowShrink}`}
              />
            );
          }
          const isUneven = row.type === "uneven";
          return (
            <div key={i} className={`flex w-full${rowShrink} items-center gap-2`}>
              <GallerySlot
                index={row.indices[0]}
                className={
                  isUneven
                    ? `${heightClass} ${narrowWidthClass} shrink-0`
                    : `${heightClass} min-w-px flex-1`
                }
              />
              <GallerySlot
                index={row.indices[1]}
                className={`${heightClass} min-w-px flex-1`}
              />
            </div>
          );
        })}
      </>
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

      {/* Mobile: the header's own Work link takes over the "back to
          work" job, the cover image now sits above the meta line instead
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
              <ImageWithSkeleton src={coverImage} alt="" priority className="object-cover" />
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
          <GalleryGrid heightClass="h-51.25" narrowWidthClass="w-2/5" shrink0={false} />
        </div>

        <div className="flex items-end justify-center gap-2.5 bg-linear-to-b from-transparent to-[#080808] px-2.5 pt-10 pb-6">
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
            href="mailto:maria@studiomisa.com"
            aria-label="Let's talk"
            className="flex shrink-0 items-center gap-2 text-sm uppercase"
          >
            <span>LET&apos;S TALK</span>
            <Image
              src="/images/arrow.svg"
              alt=""
              width={16}
              height={16}
              className="-scale-x-100"
            />
          </a>
        </div>
      </div>

      {/* Desktop: unchanged from before. */}
      <a
        href="/work"
        aria-label="Back to Work"
        className="relative z-10 hidden shrink-0 items-center border-y border-white/15 px-10 py-4 text-base md:flex"
      >
        <span className="group inline-flex items-center gap-2.5">
          <HoverIcon
            src="/images/arrow.svg"
            width={24}
            height={24}
            delayMs={0}
          />
          <HoverLetters text="Back to Work" staggerMs={HOVER_STAGGER_MS} />
        </span>
      </a>

      <div className="relative z-10 hidden min-h-0 flex-1 md:flex">
        <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-r border-white/15 p-4">
          {coverImage ? (
            <div className="relative h-110.5 w-full shrink-0">
              <ImageWithSkeleton src={coverImage} alt="" priority className="object-cover" />
            </div>
          ) : (
            <div className="h-110.5 w-full shrink-0 bg-white" />
          )}
          <GalleryGrid heightClass="h-110.5" narrowWidthClass="w-94.5" shrink0={true} />
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
              href="mailto:maria@studiomisa.com"
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
