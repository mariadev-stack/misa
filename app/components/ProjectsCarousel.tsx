"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { projects } from "../data/projects";

const track = [...projects, ...projects, ...projects];

export default function ProjectsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;

    // Jump a card container by exactly one set-width without letting
    // scroll-snap or CSS smooth-scrolling animate or fight the change.
    // (Modern browsers animate even a direct `scrollLeft =` assignment
    // when `scroll-behavior: smooth` is set via CSS, so that has to be
    // forced off too, not just scroll-snap.)
    function jump(delta: number) {
      const snapType = el!.style.scrollSnapType;
      const behavior = el!.style.scrollBehavior;
      el!.style.scrollSnapType = "none";
      el!.style.scrollBehavior = "auto";
      el!.scrollLeft += delta;
      void el!.offsetHeight;
      el!.style.scrollSnapType = snapType;
      el!.style.scrollBehavior = behavior;
    }

    // Continuously (every frame) keep the scroll position inside the
    // middle set, with a full set-width of buffer on either side. This
    // never depends on a 'scroll' event firing in time, so it can't miss
    // a wrap: the real content is identical across all three sets, so
    // snapping back by one set-width is always visually a no-op — after
    // the last card (ONX) the very next one is SUNO again, forever.
    function loopWrap() {
      const w = el!.scrollWidth / 3;
      if (el!.scrollLeft < w * 0.5) {
        jump(w);
      } else if (el!.scrollLeft >= w * 2.5) {
        jump(-w);
      }
      raf = requestAnimationFrame(loopWrap);
    }

    // Wait two frames so layout has fully settled (dev-mode hydration can
    // land a frame behind first paint) before measuring real widths.
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => {
        const setWidth = el!.scrollWidth / 3;
        const target = setWidth;
        const start = target + setWidth / (projects.length / 2);
        const duration = 900;
        const introStart = performance.now();

        // Scroll-snap AND CSS smooth-scrolling stay fully disabled for the
        // whole entrance glide — otherwise every per-frame assignment
        // below kicks off its own competing native smooth-scroll and the
        // strip never keeps up with its own animation. Our own easing
        // drives every frame instead.
        el!.style.scrollSnapType = "none";
        el!.style.scrollBehavior = "auto";
        el!.scrollLeft = start;

        function easeOutCubic(t: number) {
          return 1 - Math.pow(1 - t, 3);
        }

        function intro(now: number) {
          const t = Math.min((now - introStart) / duration, 1);
          el!.scrollLeft = start + (target - start) * easeOutCubic(t);
          if (t < 1) {
            raf = requestAnimationFrame(intro);
          } else {
            el!.style.scrollSnapType = "";
            el!.style.scrollBehavior = "";
            raf = requestAnimationFrame(loopWrap);
          }
        }
        raf = requestAnimationFrame(intro);
      });
    });

    // A vertical wheel gesture over the carousel must not move it — only
    // a deliberately horizontal gesture should. Needs a non-passive
    // native listener since React's onWheel can't reliably preventDefault.
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] flex h-full min-h-0 w-screen shrink snap-x snap-mandatory gap-1 overflow-x-auto overscroll-x-contain scroll-smooth scrollbar-none"
    >
      {track.map((project, index) => (
        <article
          key={index}
          className="flex h-full w-screen min-h-0 shrink-0 snap-center flex-col items-start gap-2 px-10"
        >
          <Link
            href={project.href}
            aria-label={project.title}
            className="flex h-full min-h-0 w-full flex-col items-start gap-2"
          >
            <div className="w-full min-h-0 flex-1 bg-white" />

            <div className="flex w-full items-center justify-between">
              <p className="text-[48px] leading-none whitespace-nowrap">
                {project.title}
              </p>
              <div className="flex w-50.5 flex-col items-end gap-1 text-right text-base">
                <p className="w-full">{project.year}</p>
                {project.tags.map((tag) => (
                  <p key={tag} className="w-full">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
