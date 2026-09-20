import ProjectDetail from "../../components/ProjectDetail";

const meta = "DiBruno / Website Design / 2026";
const coverImage = "/images/work/dibruno/cover-projectdetail-dibruno.jpg";
const images = [
  "/images/work/dibruno/image-1-dibruno.jpg",
  "/images/work/dibruno/image-2-dibruno.jpg",
  "/images/work/dibruno/image-3-dibruno.jpg",
  "/images/work/dibruno/image-4-dibruno.jpg",
  "/images/work/dibruno/image-5-dibruno.jpg",
  "/images/work/dibruno/image-6-dibruno.jpg",
  "/images/work/dibruno/image-7-dibruno.jpg",
];

const sections = [
  {
    label: "CHALLENGE",
    text: "DiBruno Lab needed a Shopify e-commerce site that could sell a science-backed, vegan hair-regrowth and anti-hair-loss line with enough credibility to compete with clinical, dermatologist-driven competitors, while still feeling clean, warm, and consumer-friendly. On top of the usual e-commerce needs (product pages, cart, checkout), the site also had to support real customer transformation stories and a custom-formula consultation flow, all within Shopify's platform constraints.",
  },
  {
    label: "APPROACH",
    text: "I designed the site around a simple idea: trust through evidence. The homepage and product pages lead with real before/after results and testimonials rather than just claims, paired with clear ingredient education so customers understand why the formulas work, not just that they're \"natural.\" Since this is a Shopify store, every design decision was made with implementation in mind from the start, working closely with the theme's real capabilities so the visual direction could actually ship without compromise.",
  },
  {
    label: "BUILD",
    text: "As the sole designer on this project, I owned UX and UI end to end: the homepage, product and collection pages, the ingredients and about sections, testimonials, FAQs, and the custom-formula consultation flow. Because this was a Shopify build, I worked hand-in-hand with the development team throughout, validating that design decisions were achievable within Shopify's theme and app restrictions, and adjusting the design where platform limitations required it, rather than handing off a design in isolation and hoping it translated.",
  },
  {
    label: "RESULT",
    text: "The result is a Shopify store that balances clinical credibility with an approachable, human feel, using real transformation stories and clear product education to build trust with customers dealing with hair loss, backed by a design that was validated against platform constraints throughout the process rather than after the fact.",
  },
];

export default function DiBrunoProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="dibruno-right-panel"
      coverImage={coverImage}
      images={images}
    />
  );
}
