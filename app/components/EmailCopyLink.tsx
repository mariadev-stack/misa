"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const EMAIL = "studiomisa.inquiries@gmail.com";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-/#*";
const COPIED_RESET_MS = 1600;

type EmailCopyLinkProps = {
  /** Text shown at rest. On desktop this is "Email me"; on mobile pass the email itself. */
  idleText?: string;
  /** Text revealed on hover (ignored when it equals idleText). */
  hoverText?: string;
  className?: string;
  /** Duration of one decipher pass, in ms. */
  durationMs?: number;
};

const randomChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    // Fallback for non-secure contexts / older browsers.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(ta);
    }
  }
}

// Text-decipher link: scrambles from its current text into the target text,
// resolving left to right. Hover reveals the email, click copies it and
// deciphers into "Copied", then settles back.
export default function EmailCopyLink({
  idleText = "Email me",
  hoverText = EMAIL,
  className = "",
  durationMs = 500,
}: EmailCopyLinkProps) {
  const [display, setDisplay] = useState(idleText);
  const displayRef = useRef(idleText);
  const rafRef = useRef<number | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef = useRef(false);
  const copiedRef = useRef(false);

  const animateTo = useCallback(
    (target: string) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      const from = displayRef.current;
      if (from === target) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) {
        displayRef.current = target;
        setDisplay(target);
        return;
      }

      const length = Math.max(from.length, target.length);
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        // How many characters (from the left) have locked into the target.
        const resolved = Math.floor(progress * length);
        // Length eases from the old text's length to the new one's.
        const currentLength = Math.round(
          from.length + (target.length - from.length) * progress,
        );

        let next = "";
        for (let i = 0; i < currentLength; i++) {
          if (i < resolved) {
            next += target[i] ?? "";
          } else {
            const t = target[i];
            next += t === " " ? " " : randomChar();
          }
        }

        if (progress >= 1) next = target;
        displayRef.current = next;
        setDisplay(next);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    },
    [durationMs],
  );

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const restingText = () => (hoveringRef.current ? hoverText : idleText);

  const handleEnter = () => {
    hoveringRef.current = true;
    if (!copiedRef.current) animateTo(hoverText);
  };

  const handleLeave = () => {
    hoveringRef.current = false;
    if (!copiedRef.current) animateTo(idleText);
  };

  const handleClick = async () => {
    await copyToClipboard(EMAIL);
    copiedRef.current = true;
    animateTo("Copied");
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      copiedRef.current = false;
      animateTo(restingText());
    }, COPIED_RESET_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onPointerEnter={(e) => e.pointerType === "mouse" && handleEnter()}
      onPointerLeave={(e) => e.pointerType === "mouse" && handleLeave()}
      onFocus={handleEnter}
      onBlur={handleLeave}
      aria-label={`Copy email address ${EMAIL}`}
      className={`cursor-pointer whitespace-pre ${className}`}
    >
      <span aria-hidden="true">{display}</span>
      <span className="sr-only" aria-live="polite">
        {display === "Copied" ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
