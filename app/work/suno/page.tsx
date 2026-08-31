import ProjectDetail from "../../components/ProjectDetail";

const meta = "Suno / Product Design / 2026";
const externalUrl = "https://suno.finance/";
const coverImage = "/images/work/suno/cover-projectdetail-suno.jpg";
const images = Array.from(
  { length: 14 },
  (_, i) => `/images/work/suno/image-${i + 1}-suno.jpg`,
);

const sections = [
  {
    label: "CHALLENGE",
    text: "Suno needed a product that could translate infrastructure-grade investment opportunities into something anyone could understand without losing the trust and transparency.",
  },
  {
    label: "APPROACH",
    text: "I started by mapping the investor journey end to end, from discovering a project to tracking its real-world energy output over time. The interface needed to flex between simplicity and depth so I designed a system that leads with clear, visual data so trust is built through transparency.",
  },
  {
    label: "BUILD",
    text: "I designed the full UI/UX across the website, web platform, and mobile app, establishing a shared design language. This included the investment flows for both the diversified Reserve product and single-project stakes, real-time energy monitoring dashboards, transaction and payment screens, and the project detail pages that give investors visibility into the solar installations backing their capital.",
  },
  {
    label: "RESULT",
    text: "The result is a product that makes clean energy investing feel as straightforward as any modern fintech app, while staying grounded in real infrastructure.",
  },
];

export default function SunoProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="suno-right-panel"
      externalUrl={externalUrl}
      coverImage={coverImage}
      images={images}
    />
  );
}
