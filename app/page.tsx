import Image from "next/image";
import ProjectsCarousel from "./components/ProjectsCarousel";

const navLinks = ["Web Design", "Design Consultancy", "Art Direction"];

const menuLinks = [
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <header className="relative z-10 flex shrink-0 items-start justify-between px-10 py-6">
        <p className="text-[32px] leading-none">MISA.</p>

        <nav className="flex w-43.25 flex-col gap-1 text-base">
          {navLinks.map((link) => (
            <p key={link}>{link}</p>
          ))}
        </nav>

        <p className="text-base">Email me</p>

        <div className="absolute top-24.5 left-22.5 flex w-43.25 flex-col gap-1">
          {menuLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-center gap-2.5 text-base"
            >
              <span className="flex-1">{link.label}</span>
              <Image
                alt=""
                src="/images/arrow.svg"
                width={24}
                height={24}
                className="-scale-x-100"
              />
            </a>
          ))}
        </div>
      </header>

      <main className="relative z-10 mt-10 flex h-full flex-1 flex-col items-end justify-end gap-2 px-10 pb-20.5">
        <a
          href="#works"
          className="flex items-center justify-center gap-2.5 text-base"
        >
          See All Works
          <Image
            alt=""
            src="/images/arrow.svg"
            width={24}
            height={24}
            className="-scale-x-100"
          />
        </a>
        <ProjectsCarousel />
      </main>
    </div>
  );
}
