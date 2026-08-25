import Link from "next/link";
import Shuffle from "./Shuffle";
import HoverLetters from "./HoverLetters";
import HoverIcon from "./HoverIcon";

export const HOVER_STAGGER_MS = 25;

const navLinks = ["Web Design", "Design Consultancy", "Art Direction"];

const menuLinks = [
  { label: "Works", href: "/works" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  variant?: "home" | "simple";
};

export default function Navbar({ variant = "simple" }: NavbarProps) {
  return (
    <header className="relative z-10 flex shrink-0 items-start justify-between px-10 py-6">
      <Link href="/" aria-label="MISA. home">
        <Shuffle
          text="MISA."
          tag="p"
          className="text-[32px] leading-none"
          shuffleDirection="right"
          duration={0.35}
        />
      </Link>

      {variant === "home" && (
        <nav className="flex w-43.25 flex-col gap-3 text-base">
          {navLinks.map((link) => (
            <Shuffle
              key={link}
              text={link}
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
            />
          ))}
        </nav>
      )}

      <p className="group cursor-pointer text-base" aria-label="Email me">
        <HoverLetters text="Email me" />
      </p>

      {variant === "home" && (
        <div className="absolute top-24.5 left-22.5 flex w-43.25 flex-col gap-1">
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="group flex items-center justify-center gap-2.5 text-base"
            >
              <span className="flex-1">
                <HoverLetters text={link.label} />
              </span>
              <HoverIcon
                src="/images/arrow.svg"
                width={24}
                height={24}
                className="-scale-x-100"
                delayMs={link.label.length * HOVER_STAGGER_MS}
              />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
