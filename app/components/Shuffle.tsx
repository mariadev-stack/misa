"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./Shuffle.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type ShuffleDirection = "left" | "right" | "up" | "down";

type ShuffleProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: ShuffleDirection;
  duration?: number;
  ease?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  textAlign?: React.CSSProperties["textAlign"];
  shuffleTimes?: number;
  stagger?: number;
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  scroller?: string | Element;
  /** Replay the shuffle on a timer (ms) after it first plays, to draw the eye back to it periodically. */
  repeatIntervalMs?: number;
  /** Fired every time a shuffle animation starts (initial play, hover replay, and each repeat), so a sibling element can stay in sync. */
  onPlay?: () => void;
};

export default function Shuffle({
  text,
  className = "",
  style = {},
  shuffleDirection = "right",
  duration = 0.35,
  ease = "power3.out",
  tag = "p",
  textAlign = "left",
  shuffleTimes = 1,
  stagger = 0.03,
  triggerOnce = true,
  triggerOnHover = true,
  scroller,
  repeatIntervalMs,
  onPlay,
}: ShuffleProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<InstanceType<typeof GSAPSplitText> | null>(null);
  const wrappersRef = useRef<HTMLSpanElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<(() => void) | null>(null);
  const repeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if ("fonts" in document) {
      if (document.fonts.status === "loaded") setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;

      const el = ref.current;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener("mouseenter", hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild;
            const orig = inner?.querySelector('[data-orig="1"]');
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
          });
          wrappersRef.current = [];
        }
        try {
          splitRef.current?.revert();
        } catch {
          /* noop */
        }
        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();

        splitRef.current = new GSAPSplitText(el, {
          type: "chars",
          charsClass: "shuffle-char",
          wordsClass: "shuffle-word",
          linesClass: "shuffle-line",
          smartWrap: true,
          reduceWhiteSpace: false,
        });

        const chars = splitRef.current.chars || [];
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

        chars.forEach((ch) => {
          const parent = ch.parentElement;
          if (!parent) return;

          const w = ch.getBoundingClientRect().width;
          const h = ch.getBoundingClientRect().height;
          if (!w) return;

          const wrap = document.createElement("span");
          Object.assign(wrap.style, {
            display: "inline-block",
            overflow: "hidden",
            width: w + "px",
            height: isVertical ? h + "px" : "auto",
            verticalAlign: "bottom",
          });

          const inner = document.createElement("span");
          Object.assign(inner.style, {
            display: "inline-block",
            whiteSpace: isVertical ? "normal" : "nowrap",
            willChange: "transform",
          });

          parent.insertBefore(wrap, ch);
          wrap.appendChild(inner);

          const firstOrig = ch.cloneNode(true) as HTMLElement;
          Object.assign(firstOrig.style, {
            display: isVertical ? "block" : "inline-block",
            width: w + "px",
            textAlign: "center",
          });

          ch.setAttribute("data-orig", "1");
          Object.assign((ch as HTMLElement).style, {
            display: isVertical ? "block" : "inline-block",
            width: w + "px",
            textAlign: "center",
          });

          inner.appendChild(firstOrig);
          for (let k = 0; k < rolls; k++) {
            const c = ch.cloneNode(true) as HTMLElement;
            Object.assign(c.style, {
              display: isVertical ? "block" : "inline-block",
              width: w + "px",
              textAlign: "center",
            });
            inner.appendChild(c);
          }
          inner.appendChild(ch);

          const steps = rolls + 1;

          if (shuffleDirection === "right" || shuffleDirection === "down") {
            const firstCopy = inner.firstElementChild;
            const real = inner.lastElementChild;
            if (real) inner.insertBefore(real, inner.firstChild);
            if (firstCopy) inner.appendChild(firstCopy);
          }

          let startX = 0;
          let finalX = 0;
          let startY = 0;
          let finalY = 0;

          if (shuffleDirection === "right") {
            startX = -steps * w;
            finalX = 0;
          } else if (shuffleDirection === "left") {
            startX = 0;
            finalX = -steps * w;
          } else if (shuffleDirection === "down") {
            startY = -steps * h;
            finalY = 0;
          } else if (shuffleDirection === "up") {
            startY = 0;
            finalY = -steps * h;
          }

          if (shuffleDirection === "left" || shuffleDirection === "right") {
            gsap.set(inner, { x: startX, y: 0, force3D: true });
            inner.setAttribute("data-start-x", String(startX));
            inner.setAttribute("data-final-x", String(finalX));
          } else {
            gsap.set(inner, { x: 0, y: startY, force3D: true });
            inner.setAttribute("data-start-y", String(startY));
            inner.setAttribute("data-final-y", String(finalY));
          }

          wrappersRef.current.push(wrap);
        });
      };

      const inners = () =>
        wrappersRef.current.map((w) => w.firstElementChild as HTMLElement);

      const cleanupToStill = () => {
        wrappersRef.current.forEach((w) => {
          const strip = w.firstElementChild;
          if (!strip) return;
          const real = strip.querySelector('[data-orig="1"]');
          if (!real) return;
          strip.replaceChildren(real);
          (strip as HTMLElement).style.transform = "none";
          (strip as HTMLElement).style.willChange = "auto";
        });
      };

      const play = () => {
        const strips = inners();
        if (!strips.length) return;

        playingRef.current = true;
        onPlay?.();
        const isVertical = shuffleDirection === "up" || shuffleDirection === "down";

        const tl = gsap.timeline({
          smoothChildTiming: true,
          onComplete: () => {
            playingRef.current = false;
            cleanupToStill();
            armHover();
          },
        });

        const odd = strips.filter((_, i) => i % 2 === 1);
        const even = strips.filter((_, i) => i % 2 === 0);

        const addTween = (targets: HTMLElement[], at: number) => {
          const vars: gsap.TweenVars = {
            duration,
            ease,
            force3D: true,
            stagger,
          };
          if (isVertical) {
            vars.y = (_i: number, t: Element) =>
              parseFloat(t.getAttribute("data-final-y") || "0");
          } else {
            vars.x = (_i: number, t: Element) =>
              parseFloat(t.getAttribute("data-final-x") || "0");
          }
          tl.to(targets, vars, at);
        };

        const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
        const evenStart = odd.length ? oddTotal * 0.7 : 0;
        if (odd.length) addTween(odd, 0);
        if (even.length) addTween(even, evenStart);

        tlRef.current = tl;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) return;
        removeHover();
        const handler = () => {
          if (playingRef.current) return;
          build();
          play();
        };
        hoverHandlerRef.current = handler;
        ref.current.addEventListener("mouseenter", handler);
      };

      const create = () => {
        build();
        play();
        armHover();
        setReady(true);

        if (repeatIntervalMs) {
          repeatTimerRef.current = setInterval(() => {
            if (playingRef.current) return;
            build();
            play();
          }, repeatIntervalMs);
        }
      };

      // Resolve a string scroller ourselves via a plain document query:
      // useGSAP's `scope` makes gsap's own string-selector resolution
      // search only inside `ref` (a leaf node here), so it can never find
      // an ancestor scroll container passed by id.
      const resolvedScroller =
        typeof scroller === "string" ? (document.querySelector(scroller) ?? window) : (scroller ?? window);

      const st = ScrollTrigger.create({
        trigger: el,
        scroller: resolvedScroller,
        start: "top 90%",
        once: triggerOnce,
        onEnter: create,
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        setReady(false);
        if (repeatTimerRef.current) {
          clearInterval(repeatTimerRef.current);
          repeatTimerRef.current = null;
        }
      };
    },
    {
      dependencies: [text, duration, ease, fontsLoaded, shuffleDirection, shuffleTimes, stagger, triggerOnce, triggerOnHover, scroller, repeatIntervalMs, onPlay],
      scope: ref as React.RefObject<HTMLElement>,
    }
  );

  const commonStyle = useMemo(() => ({ textAlign, ...style }), [textAlign, style]);
  const classes = useMemo(
    () => `shuffle-parent ${ready ? "is-ready" : ""} ${className}`,
    [ready, className]
  );

  const Tag = tag as React.ElementType;
  return (
    <Tag ref={ref} className={classes} style={commonStyle}>
      {text}
    </Tag>
  );
}
