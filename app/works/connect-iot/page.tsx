import Image from "next/image";
import Navbar, { HOVER_STAGGER_MS } from "../../components/Navbar";
import Shuffle from "../../components/Shuffle";
import HoverLetters from "../../components/HoverLetters";
import HoverIcon from "../../components/HoverIcon";

const meta = "Connect IoT / Product Design / 2024";
const externalUrl = "https://apps.apple.com/us/app/smartlink-professional/id6737324185";

const sections = [
  {
    label: "CHALLENGE",
    text: "Property teams were managing water, HVAC, energy, access, and security through disconnected devices and vendor portals, with no single view of what was happening across a building or portfolio. On top of that, the platform had to serve two very different audiences at once: property managers who need operational depth and control, and residents who just need a simple, reliable way to interact with their unit and building.",
  },
  {
    label: "APPROACH",
    text: "I approached this as designing two products under one system. For managers, the priority was visibility and speed, surfacing device status, alerts, and reports in a way that lets teams catch problems (a leak, an HVAC failure, an access issue) before they become costly. For residents, the priority was simplicity, reducing water, energy, and access management down to a handful of clear, everyday actions like unlocking a door or checking usage. Both experiences needed to share a consistent visual language and platform logic, even though the depth of information and the actions available were very different.",
  },
  {
    label: "BUILD",
    text: "Working within the team, I designed the UI/UX for the web management platform and the mobile apps for both residents and property managers/staff. This covered the manager-facing dashboards for water, HVAC, energy, access, and security monitoring, the alert and automation flows that guide staff from detection to response, and the resident-facing app for smart lock access, guest permissions, and usage insights. I also worked on the admin mobile tools used by staff in the field to respond to alerts in real time. Development was carried out by the broader engineering team, building from the interface designs and interaction specs.",
  },
  {
    label: "RESULT",
    text: "The platform now connects thousands of units and devices into a single operating layer, giving managers earlier visibility into avoidable losses (water waste, HVAC inefficiencies, access issues) while giving residents a straightforward, self-service experience for the parts of the building that affect them directly.",
  },
];

export default function ConnectIotProject() {
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

      <Navbar variant="simple" />

      <a
        href="/works"
        aria-label="Back to Works"
        className="relative z-10 flex shrink-0 items-center border-y border-white/15 px-10 py-4 text-base"
      >
        <span className="group inline-flex items-center gap-2.5">
          <HoverIcon
            src="/images/arrow.svg"
            width={24}
            height={24}
            delayMs={0}
          />
          <HoverLetters text="Back to Works" staggerMs={HOVER_STAGGER_MS} />
        </span>
      </a>

      <div className="relative z-10 flex min-h-0 flex-1">
        <div className="scrollbar-none flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto border-r border-white/15 p-4">
          <div className="h-110.5 w-full shrink-0 bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="h-110.5 w-full shrink-0 bg-white" />
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 min-w-px flex-1 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
          <div className="flex w-full shrink-0 items-center gap-2">
            <div className="h-110.5 w-94.5 shrink-0 bg-white" />
            <div className="h-110.5 min-w-px flex-1 bg-white" />
          </div>
        </div>

        <div className="relative flex w-123.5 shrink-0 flex-col border-b border-white/15">
          <div className="flex shrink-0 flex-col items-end border-b border-white/15 p-4">
            <div className="flex w-full items-center justify-end gap-4 py-1 text-sm">
              <p className="text-right">{meta}</p>
              <a href={externalUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit live site">
                <Image src="/images/external-link.svg" alt="" width={24} height={24} />
              </a>
            </div>
          </div>

          <div
            id="connect-iot-right-panel"
            className="scrollbar-none min-h-0 flex-1 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 p-4 pb-40 text-sm">
              {sections.map((section) => (
                <div key={section.label} className="flex flex-col gap-1">
                  <p className="opacity-50">{section.label}</p>
                  <p>{section.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cues that there's more to read below: a blur that intensifies
              toward the bottom, then a fade into the solid background. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 backdrop-blur-md mask-[linear-gradient(to_bottom,transparent,black_85%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-[#080808] from-35% to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center gap-3 p-6">
            <Shuffle
              text="Need something like this?"
              tag="p"
              className="w-42.5 text-[24px] leading-none uppercase"
              shuffleDirection="right"
              duration={0.35}
              triggerOnHover={false}
              scroller="#connect-iot-right-panel"
              repeatIntervalMs={8000}
            />
            <a
              href="mailto:hello@misa.studio"
              aria-label="Let's talk"
              className="group flex shrink-0 items-center gap-2 text-base uppercase"
            >
              <HoverLetters text="LET'S TALK" staggerMs={HOVER_STAGGER_MS} />
              <HoverIcon
                src="/images/arrow.svg"
                width={24}
                height={24}
                className="-scale-x-100"
                delayMs={"LET'S TALK".length * HOVER_STAGGER_MS}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
