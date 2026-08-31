"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

type FormDropdownProps = {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  /** Opens the panel above the trigger instead of below — for a field near the bottom of the viewport, so opening it doesn't push the page into scroll. */
  openUpward?: boolean;
};

// Accessible custom select (WAI-ARIA combobox/listbox pattern: trigger
// button + popup listbox, roving highlight via aria-activedescendant, full
// keyboard support) styled to match the Figma spec: a black bar slides
// beneath whichever option is highlighted, its text flipping to white.
export default function FormDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  openUpward = false,
}: FormDropdownProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const hasPositionedRef = useRef(false);
  const triggerId = useId();
  const listboxId = useId();
  const labelId = useId();

  // Accordion open/close: animate height 0 -> auto -> 0, clipped while
  // transitioning, eased rather than a linear/instant toggle.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.killTweensOf(panel);
    if (open) {
      gsap.set(panel, { height: 0 });
      gsap.to(panel, { height: "auto", duration: 0.35, ease: "power3.out" });
    } else {
      gsap.to(panel, { height: 0, duration: 0.3, ease: "power3.out" });
      hasPositionedRef.current = false;
    }
  }, [open]);

  // Slide the highlight bar to the highlighted option; snap into place the
  // first time a panel opens, then ease smoothly between options after that.
  useLayoutEffect(() => {
    if (!open) return;
    const el = optionRefs.current[highlighted];
    const bar = highlightRef.current;
    if (!el || !bar) return;
    const vars = { y: el.offsetTop, height: el.offsetHeight };
    if (!hasPositionedRef.current) {
      gsap.set(bar, vars);
      hasPositionedRef.current = true;
    } else {
      gsap.to(bar, { ...vars, duration: 0.18, ease: "power2.out" });
    }
  }, [highlighted, open]);

  useEffect(() => {
    if (!open) return;
    function onDocPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, [open]);

  function openList() {
    const currentIndex = options.indexOf(value);
    setHighlighted(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
  }

  function selectOption(index: number) {
    onChange(options[index]);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlighted((h) => Math.min(options.length - 1, h + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlighted((h) => Math.max(0, h - 1));
        break;
      case "Home":
        e.preventDefault();
        setHighlighted(0);
        break;
      case "End":
        e.preventDefault();
        setHighlighted(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectOption(highlighted);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="flex w-full flex-col gap-1">
      <label id={labelId} htmlFor={triggerId} className="w-full text-[14px] text-white opacity-50">
        {label}
      </label>
      <div className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          id={triggerId}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open ? `${listboxId}-option-${highlighted}` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onTriggerKeyDown}
          className="flex h-10 w-full items-center justify-between gap-2.5 border-b border-white py-2 text-left text-[14px] text-white"
        >
          <span className={value ? "" : "opacity-20"}>{value || placeholder}</span>
          <Image
            src="/images/chevron.svg"
            alt=""
            width={24}
            height={24}
            className={`shrink-0 transition-transform duration-200 ease-out ${open ? "-rotate-90" : "rotate-90"}`}
          />
        </button>

        <div
          ref={panelRef}
          className={`absolute left-0 z-20 w-full overflow-hidden ${openUpward ? "bottom-full" : "top-full"}`}
          style={{ height: 0 }}
        >
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="relative flex w-full flex-col gap-2.75 bg-white p-4"
          >
            <div ref={highlightRef} className="pointer-events-none absolute left-0 top-0 h-6 w-full bg-black" />
            {options.map((option, index) => (
              <li
                key={option}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={value === option}
                onMouseEnter={() => setHighlighted(index)}
                onClick={() => selectOption(index)}
                className={`relative z-10 cursor-pointer text-[14px] transition-colors duration-150 ease-out ${
                  highlighted === index ? "text-white" : "text-[#080808]"
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
