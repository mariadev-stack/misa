import ProjectDetail from "../../components/ProjectDetail";

const meta = "ONX / Website Design / 2026";
const coverImage = "/images/work/onx/cover-projectdetail-onx.jpg";
const images = Array.from(
  { length: 5 },
  (_, i) => `/images/work/onx/image-${i + 1}-onx.jpg`,
);

const sections = [
  {
    label: "CHALLENGE",
    text: 'ONX Sports needed a dedicated page to spotlight Justin Gaethje within their "Champions" lineup, giving fans and prospective customers a way to see exactly which ONX gear a UFC-level competitor trains and fights with. The page needed to work as both a credibility piece for the brand (gear tested by real champions) and a functional product showcase that drives people toward the items featured.',
  },
  {
    label: "APPROACH",
    text: "I designed the page to center the athlete first and the product second: leading with imagery and context around Justin's training, then connecting that directly to the specific gear he uses, so the product recommendations feel earned rather than like a standard upsell. The layout needed to slot naturally into ONX's existing site structure and visual identity (the bold, coach-built, performance-driven brand language already established across the store) while giving this page its own moment as part of the Champions series.",
  },
  {
    label: "BUILD",
    text: "I designed the full page: layout, content structure, and the connective flow between athlete storytelling and shoppable product sections, tying his training gear directly to the corresponding ONX product pages. The design has been fully handed off to the development team and is currently in build; the page is not yet live on the site.",
  },
  {
    label: "RESULT",
    text: "Since the page is still in development, the case study reflects the design direction and intent as delivered. Once live, it will give ONX a template for showcasing future athletes in the Champions series in a way that connects storytelling directly to product discovery.",
  },
];

export default function OnxProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="onx-right-panel"
      coverImage={coverImage}
      images={images}
    />
  );
}
