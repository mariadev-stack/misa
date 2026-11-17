"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Shuffle from "../components/Shuffle";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden overscroll-none bg-[#080808] font-mono text-white">
      <div className="pointer-events-none absolute inset-x-0 top-[45%] bottom-0 z-0">
        <Image alt="" src="/images/grid.svg" fill priority className="object-cover" />
      </div>

      <Navbar variant="simple" />

      <main
        id="contact-scroll"
        className="scrollbar-none relative z-10 flex min-h-0 flex-1 flex-col items-center justify-start gap-16 overflow-y-auto px-6 pt-8 pb-10 md:flex-row md:justify-center md:gap-16 md:px-20 md:py-10 lg:px-32"
      >
        <div className="flex w-full flex-col items-start gap-1">
          <div className="flex flex-col items-start text-[32px] leading-none uppercase md:text-[64px]">
            <Shuffle
              text="Let's build"
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              repeatIntervalMs={8000}
              scroller="#contact-scroll"
            />
            <Shuffle
              text="something"
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              repeatIntervalMs={8000}
              scroller="#contact-scroll"
            />
            <Shuffle
              text="people"
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              repeatIntervalMs={8000}
              scroller="#contact-scroll"
            />
            <Shuffle
              text="actually"
              tag="p"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              repeatIntervalMs={8000}
              scroller="#contact-scroll"
            />
            <div className="flex items-center gap-2">
              <Shuffle
                text="use"
                tag="p"
                shuffleDirection="right"
                duration={0.35}
                triggerOnHover={false}
                repeatIntervalMs={8000}
                scroller="#contact-scroll"
              />
              <span className="inline-flex size-6.5 items-center justify-center align-middle md:size-25.75">
                <Image
                  src="/images/arrow.svg"
                  alt=""
                  width={103}
                  height={103}
                  className="size-full -scale-x-100"
                />
              </span>
            </div>
          </div>
          <p className="w-full max-w-94 text-[14px] text-white uppercase md:text-[16px]">
            Tell me what you&apos;re working on.
            <br />
            I&apos;ll tell you how to make it better.
          </p>
        </div>

        <div className="w-full max-w-115.5 shrink-0">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
