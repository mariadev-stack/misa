import ProjectDetail from "../../components/ProjectDetail";

const meta = "The Somos Hotel / Website Design / 2023";

const sections = [
  {
    label: "CHALLENGE",
    text: "The Somos Hotels needed a digital presence that matched the caliber of its physical spaces, multiple boutique hotel properties across Medellín, each with its own identity (Central, Bold, Beats, Loho) but united under one brand built on design, art, and Colombian culture. The site needed to let each property feel distinct while giving travelers a cohesive, premium browsing and booking experience across the whole portfolio.",
  },
  {
    label: "APPROACH",
    text: "I designed the experience around the idea that the site should feel like an extension of staying at one of the hotels: refined, visual, and detail-oriented, rather than a generic booking template. This meant building a flexible design system that could showcase each property's individual personality (rooftop bars, architecture, neighborhood) while keeping shared patterns for browsing rooms, exploring experiences, and completing a booking. Photography, layout rhythm, and typography were treated as core to the brand experience, not decoration on top of a booking engine.",
  },
  {
    label: "BUILD",
    text: "As lead designer, I owned the full UX and UI design across the site, from information architecture and the multi-property navigation to the individual hotel pages, room and rate presentation, and the booking flow. I delivered complete design specs and assets to the development team for implementation.",
  },
  {
    label: "RESULT",
    text: "The design established a strong, cohesive visual identity for The Somos Hotels across its properties, translating the brand's emphasis on design and Colombian culture into a premium digital experience. As with any handoff, some fidelity between the original design and the live implementation can shift once a project moves into development; the case study reflects the design direction and intent as delivered.",
  },
];

export default function TheSomosHotelProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="the-somos-hotel-right-panel"
    />
  );
}
