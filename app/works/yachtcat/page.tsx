import ProjectDetail from "../../components/ProjectDetail";

const meta = "Yachtcat / Website Design / 2026";
const externalUrl = "https://yachtcat-production.up.railway.app/en";

const sections = [
  {
    label: "CHALLENGE",
    text: "Yachtcat builds high-performance catamarans, and the brand needed a digital presence that could carry the same sense of precision, luxury, and craftsmanship as the vessels themselves. The site had to sell an experience as much as a product, communicating naval engineering credibility to a discerning, high-end audience while making the emotional case for life on the water.",
  },
  {
    label: "APPROACH",
    text: 'I built the design from the ground up, starting with visual identity before touching layout. The direction centered on restraint: generous negative space, cinematic full-bleed imagery and video, and a quiet, confident typographic system, letting the yachts themselves carry the weight of the story rather than dense copy or decoration. I also directed the photography approach used across the site, making sure every image reinforced the same mood of precision and freedom that defines the brand line, "designed to sail beyond."',
  },
  {
    label: "BUILD",
    text: "As the sole designer on this project, I owned the process end to end: visual identity, design system, photography direction, and full UI/UX across the site, from the homepage and fleet pages to about, blog, FAQ, and contact. I delivered a complete design system and specs to the development team for handoff and implementation.",
  },
  {
    label: "RESULT",
    text: "The result is a site that feels less like a product catalog and more like a preview of the lifestyle Yachtcat sells: precise, spacious, and unmistakably premium, positioning the brand alongside the naval architecture and luxury craft it's built to compete with.",
  },
];

export default function YachtcatProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="yachtcat-right-panel"
      externalUrl={externalUrl}
    />
  );
}
