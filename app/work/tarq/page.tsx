import ProjectDetail from "../../components/ProjectDetail";

const meta = "TARQ / Website Design / 2026";
const externalUrl = "https://www.tarqstudio.com/en";
const coverImage = "/images/work/tarq/cover-projectdetail-tarq.png";
// image-1, image-4, image-5, and image-7 are Vimeo clips instead of stills.
const images = [
  { vimeoId: "1222879170" }, // image-1
  "/images/work/tarq/image-2-tarq.png",
  "/images/work/tarq/image-3-tarq.png",
  { vimeoId: "1222879698" }, // image-4
  { vimeoId: "1222881127" }, // image-5
  "/images/work/tarq/image-6-tarq.png",
  { vimeoId: "1222881211" }, // image-7
];

const sections = [
  {
    label: "CHALLENGE",
    text: "TARQ is an architecture and interior design studio with projects spanning Bogotá, Madrid, and Miami, and their online presence needed to match the caliber of that work. The site had to present highly visual, detail-driven architectural projects in a way that felt as considered and refined as the spaces TARQ designs, while staying easy to navigate for prospective clients and press.",
  },
  {
    label: "APPROACH",
    text: "I approached the site as an extension of TARQ's architectural language: clean, structured, and image-led, giving the projects room to breathe without competing with them. I designed a flexible project showcase that could hold everything from full architectural builds to interior design work, structured around TARQ's own process (architectural design, interior architecture, rendering, and technical definition) so visitors understand not just what TARQ makes, but how they work. Bilingual support (Spanish and English) was built into the experience from the start, reflecting the studio's international footprint.",
  },
  {
    label: "BUILD",
    text: "As the sole designer on this project, I owned the full process end to end: user experience, UI design, and QA. This included the site architecture, the homepage and studio/about sections, the projects showcase and individual project pages, the services and press sections, and the contact flow. I handed off detailed specs and assets to the development team and worked through QA to make sure the final build matched the design intent across breakpoints and both languages.",
  },
  {
    label: "RESULT",
    text: "The result is a polished, image-forward site that gives TARQ's architecture and interior design work the presentation it deserves, structured clearly enough for clients to understand the studio's process and portfolio at a glance, across its three markets.",
  },
];

export default function TarqProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="tarq-right-panel"
      externalUrl={externalUrl}
      coverImage={coverImage}
      images={images}
    />
  );
}
