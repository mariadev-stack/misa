"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import { projects } from "../data/projects";

type View = "list" | "grid";

const STAGGER_MS = 60;

export default function WorksPage() {
  const [view, setView] = useState<View>("grid");
  const [hovered, setHovered] = useState<number | null>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const rowRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const listRef = useRef<HTMLDivElement>(null);

  function handleEnter(index: number) {
    setHovered(index);
    const row = rowRefs.current[index];
    const container = listRef.current;
    if (row && container) {
      const rowRect = row.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setThumbTop(rowRect.top - containerRect.top + rowRect.height / 2);
    }
  }

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

      <Navbar variant="home" mobileCategories={false} />

      <div className="absolute top-28.5 left-4 z-20 flex items-center gap-1 p-1 text-sm md:top-37.5 md:left-auto md:right-10 md:text-base">
        <button
          type="button"
          onClick={() => setView("grid")}
          className={`px-2 py-1 ${
            view === "grid" ? "bg-white text-[#080808]" : "text-white"
          }`}
        >
          Grid
        </button>
        <button
          type="button"
          onClick={() => setView("list")}
          className={`px-2 py-1 ${
            view === "list" ? "bg-white text-[#080808]" : "text-white"
          }`}
        >
          List
        </button>
      </div>

      <main className="scrollbar-none relative z-10 mt-0 min-h-0 flex-1 overflow-y-auto px-4 pt-24 pb-6 md:mt-10 md:px-10 md:pt-16 md:pb-32">
        {view === "list" ? (
          <div
            ref={listRef}
            className="relative flex flex-col"
            onMouseLeave={() => setHovered(null)}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="entrance-fade"
                style={{ animationDelay: `${index * STAGGER_MS}ms` }}
              >
                <Link
                  href={project.href}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  onMouseEnter={() => handleEnter(index)}
                  aria-label={project.title}
                  className={`flex items-center justify-between border-b border-white/30 py-4 opacity-100 transition-opacity duration-300 md:${
                    hovered === index ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="text-base">{project.title}</span>
                  <Image
                    src="/images/arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="-scale-x-100"
                  />
                </Link>
              </div>
            ))}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute hidden h-41.75 w-62.5 -translate-y-1/2 transition-[opacity,top] duration-300 ease-out md:block"
              style={{
                top: thumbTop,
                left: "53%",
                opacity: hovered !== null ? 1 : 0,
              }}
            >
              {hovered !== null &&
                (() => {
                  const thumbSrc =
                    projects[hovered].listCover ??
                    projects[hovered].gridCover ??
                    projects[hovered].mobileCover ??
                    projects[hovered].cover;
                  return thumbSrc ? (
                    <div key={hovered} className="grow-from-zero relative h-full w-full overflow-hidden">
                      <ImageWithSkeleton src={thumbSrc} alt="" className="object-cover" />
                    </div>
                  ) : (
                    <div key={hovered} className="grow-from-zero h-full w-full bg-white" />
                  );
                })()}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="entrance-fade"
                style={{ animationDelay: `${index * STAGGER_MS}ms` }}
              >
                <Link
                  href={project.href}
                  aria-label={project.title}
                  className="group flex flex-col gap-4 md:h-56.75"
                >
                  <div className="relative h-30.75 w-full shrink-0 overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] md:h-41.75 md:group-hover:h-46.75">
                    {(() => {
                      if (project.gridCover) {
                        return (
                          <ImageWithSkeleton
                            src={project.gridCover}
                            alt=""
                            className="object-cover"
                          />
                        );
                      }
                      const gridMobileCover = project.mobileGridCover ?? project.mobileCover;
                      if (!project.cover) {
                        return <div className="h-full w-full bg-white" />;
                      }
                      return (
                        <>
                          {gridMobileCover && (
                            <ImageWithSkeleton
                              src={gridMobileCover}
                              alt=""
                              className="object-cover"
                              wrapperClassName="md:hidden"
                            />
                          )}
                          <ImageWithSkeleton
                            src={project.cover}
                            alt=""
                            className="object-cover"
                            wrapperClassName={gridMobileCover ? "hidden md:block" : ""}
                          />
                        </>
                      );
                    })()}
                  </div>
                  <span className="flex items-center justify-between text-base opacity-100 transition-opacity duration-300 md:opacity-50 md:group-hover:opacity-100">
                    {project.title}
                    <Image
                      src="/images/arrow.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="-scale-x-100"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
