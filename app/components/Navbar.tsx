import Image from "next/image";
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
  mobileCategories?: boolean;
};

export default function Navbar({
  variant = "simple",
  mobileCategories = true,
}: NavbarProps) {
  return (
    <header className="relative z-10">
      {/* Mobile: both variants share this layout — MISA plus a stacked
          Works/Contact/Email me column — since the "Back to Works" bar
          the desktop "simple" variant relies on doesn't exist on mobile;
          the header's own Works link takes over that job. Nav categories
          only show for the home variant (and only when explicitly asked
          for), moved into their own row below the header since there's no
          room to keep them inline. Hover-swap letters/icons are skipped
          here since touch has no hover to trigger them; the Shuffle
          entrance animation is kept since that's not hover-driven. */}
      <div className="flex flex-col gap-4 px-4 pt-4 md:hidden">
        <div className="flex items-start justify-between">
          <Link href="/" aria-label="MISA. home">
            <Shuffle
              text="MISA."
              tag="p"
              className="text-[32px] leading-none"
              shuffleDirection="right"
              duration={0.35}
            />
          </Link>

          <div className="flex w-30 flex-col gap-1 text-sm">
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="flex items-center justify-between gap-2.5"
              >
                <span>{link.label}</span>
                <Image
                  src="/images/arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="-scale-x-100"
                />
              </a>
            ))}
            <p
              aria-label="Email me"
              className="flex items-center justify-between gap-2.5"
            >
              <span>Email me</span>
              <Image
                src="/images/arrow.svg"
                alt=""
                width={16}
                height={16}
                className="-scale-x-100"
              />
            </p>
          </div>
        </div>

        {variant === "home" && mobileCategories && (
          <nav className="flex w-43.25 flex-col gap-1 text-sm">
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
      </div>

      {/* Desktop: unchanged from before. */}
      {variant === "home" ? (
        <div className="hidden shrink-0 items-start justify-between px-10 py-6 md:flex">
          <Link href="/" aria-label="MISA. home">
            <Shuffle
              text="MISA."
              tag="p"
              className="text-[32px] leading-none"
              shuffleDirection="right"
              duration={0.35}
            />
          </Link>

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

          <p className="group cursor-pointer text-base" aria-label="Email me">
            <HoverLetters text="Email me" />
          </p>

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
        </div>
      ) : (
        <div className="hidden shrink-0 items-start justify-between px-10 py-6 md:flex">
          <Link href="/" aria-label="MISA. home">
            <Shuffle
              text="MISA."
              tag="p"
              className="text-[32px] leading-none"
              shuffleDirection="right"
              duration={0.35}
            />
          </Link>

          <p className="group cursor-pointer text-base" aria-label="Email me">
            <HoverLetters text="Email me" />
          </p>
        </div>
      )}
    </header>
  );
}
