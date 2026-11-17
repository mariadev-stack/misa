"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Shuffle from "./Shuffle";

export const EMAIL = "studiomisa.inquiries@gmail.com";

const COPIED_RESET_MS = 1600;
// Inline so it beats .shuffle-parent's `white-space: normal` + break-word,
// which would otherwise wrap text inside its stacked box.
const NOWRAP = { whiteSpace: "nowrap" } as const;

type Label = "none" | "hover" | "copied";

type EmailCopyLinkProps = {
  /**
   * "overlay" (desktop): `text` is always shown; hovering dims it to 15% and
   * shuffles `hoverLabel` in on top of it, which becomes `copiedLabel` on
   * click.
   * "swap" (mobile, no hover): shows `text`; tapping copies the email and
   * swaps the text for `copiedLabel`.
   */
  variant?: "overlay" | "swap";
  /** Resting text. Defaults to the email (overlay) or "Email me" (swap). */
  text?: string;
  hoverLabel?: string;
  copiedLabel?: string;
  /** Extra content after the text, e.g. an arrow icon. Dimmed with the text in overlay mode. */
  after?: ReactNode;
  /** Where the overlay label sits over the text. */
  labelAlign?: "left" | "center";
  /** Overlay only: play the MISA load-in shuffle on the resting text. */
  introShuffle?: boolean;
  /** Extra classes for the hover/copied labels, e.g. a smaller text size. */
  labelClassName?: string;
  className?: string;
};

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

// Stacked texts that crossfade by opacity (nothing slides) while the
// incoming one replays the same shuffle as the MISA logo.
function FadeShuffleStack({
  items,
  active,
  triggers,
  align,
}: {
  items: { key: string; text: string; className?: string }[];
  active: string;
  triggers: Record<string, number>;
  align: "left" | "center";
}) {
  return (
    <>
      {items.map(({ key, text, className = "" }) => (
        <span
          key={key}
          aria-hidden="true"
          className={`absolute inset-0 flex items-center whitespace-nowrap transition-opacity duration-300 ease-out ${
            align === "center" ? "justify-center" : "justify-start"
          } ${key === active ? "opacity-100" : "opacity-0"} ${className}`}
        >
          <Shuffle
            text={text}
            tag="span"
            style={NOWRAP}
            shuffleDirection="right"
            duration={0.35}
            triggerOnHover={false}
            playTrigger={triggers[key] ?? 0}
            immediate
          />
        </span>
      ))}
    </>
  );
}

export default function EmailCopyLink({
  variant = "overlay",
  text = variant === "overlay" ? EMAIL : "Email me",
  hoverLabel = "Click to copy",
  copiedLabel = "Copied",
  after,
  labelAlign = "center",
  labelClassName = "",
  introShuffle = false,
  className = "",
}: EmailCopyLinkProps) {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [triggers, setTriggers] = useState<Record<string, number>>({});
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const label: Label = copied
    ? "copied"
    : hovering && variant === "overlay"
      ? "hover"
      : "none";

  // Replay the shuffle on whichever text just became visible.
  const prevLabelRef = useRef<Label>(label);
  useEffect(() => {
    if (prevLabelRef.current === label) return;
    prevLabelRef.current = label;
    setTriggers((t) => ({ ...t, [label]: (t[label] ?? 0) + 1 }));
  }, [label]);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const handleClick = async () => {
    await copyToClipboard(EMAIL);
    setCopied(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  const hoverProps =
    variant === "overlay"
      ? {
          onPointerEnter: (e: React.PointerEvent) =>
            e.pointerType === "mouse" && setHovering(true),
          onPointerLeave: (e: React.PointerEvent) =>
            e.pointerType === "mouse" && setHovering(false),
          onFocus: () => setHovering(true),
          onBlur: () => setHovering(false),
        }
      : {};

  return (
    <button
      type="button"
      onClick={handleClick}
      {...hoverProps}
      aria-label={`Copy email address ${EMAIL}`}
      className={`relative cursor-pointer whitespace-nowrap ${
        after ? "inline-flex items-center gap-2" : "inline-block leading-6"
      } ${className}`}
    >
      {variant === "overlay" ? (
        <>
          <span
            aria-hidden="true"
            className={`flex items-center gap-2 transition-opacity duration-300 ease-out ${
              label === "none" ? "opacity-100" : "opacity-15"
            }`}
          >
            {introShuffle ? (
              // Same load-in shuffle as the MISA logo.
              <Shuffle
                text={text}
                tag="span"
                style={NOWRAP}
                shuffleDirection="right"
                duration={0.35}
                triggerOnHover={false}
              />
            ) : (
              <span>{text}</span>
            )}
            {after}
          </span>
          <span className="pointer-events-none absolute inset-0">
            <FadeShuffleStack
              items={[
                { key: "hover", text: hoverLabel, className: labelClassName },
                { key: "copied", text: copiedLabel, className: labelClassName },
              ]}
              active={label}
              triggers={triggers}
              align={labelAlign}
            />
          </span>
        </>
      ) : (
        <>
          <span className="relative inline-block">
            {/* Reserves the width of whichever text is wider, at its own size. */}
            <span className="invisible grid" aria-hidden="true">
              <span className="col-start-1 row-start-1">{text}</span>
              <span className={`col-start-1 row-start-1 ${labelClassName}`}>
                {copiedLabel}
              </span>
            </span>
            <FadeShuffleStack
              items={[
                { key: "none", text },
                { key: "copied", text: copiedLabel, className: labelClassName },
              ]}
              active={label}
              triggers={triggers}
              align="left"
            />
          </span>
          {after}
        </>
      )}

      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}
