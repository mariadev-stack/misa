import ProjectDetail from "../../components/ProjectDetail";

const meta = "Connect IoT / Product Design / 2024";
const externalUrl =
  "https://apps.apple.com/us/app/smartlink-professional/id6737324185";

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
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="connect-iot-right-panel"
      externalUrl={externalUrl}
    />
  );
}
