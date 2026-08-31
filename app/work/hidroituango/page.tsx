import ProjectDetail from "../../components/ProjectDetail";

const meta = "Hidroituango / Website Design / 2025";
const externalUrl = "https://www.hidroituango.com.co/es";
const coverImage = "/images/work/hidroituango/cover-projectdetail-hidro.jpg";
// Reordered from the export's numeric order to match each image's native
// aspect to its gallery slot (pair, pair, uneven-narrow, uneven-wide, full).
const images = [
  "/images/work/hidroituango/image-2-hidro.jpg",
  "/images/work/hidroituango/image-3-hidro.jpg",
  "/images/work/hidroituango/image-4-hidro.jpg",
  "/images/work/hidroituango/image-5-hidro.jpg",
  "/images/work/hidroituango/image-6-hidro.jpg",
];

const sections = [
  {
    label: "CHALLENGE",
    text: "Hidroituango is Colombia's largest hydroelectric project, an institutional site that needed to communicate transparency, technical credibility, and social impact to a wide range of audiences: government bodies, the 12 municipalities in its area of direct influence, press, and the general public. The site had to hold together dense, high-stakes content (public accountability reports, contracting, technical project data) alongside a narrative about community investment and national energy impact, without feeling bureaucratic or cold.",
  },
  {
    label: "APPROACH",
    text: "As co-lead on the design, I focused on giving the site a structure that could carry both institutional weight and clarity. That meant a strong visual system built around real project imagery and data (dam height, reservoir volume, generation capacity) to make the scale of the project tangible, paired with clear navigation for the public accountability and community-facing sections that this kind of infrastructure project is required to maintain. Every section needed to serve a very different visitor, from a journalist looking for the latest news to a resident of one of the surrounding municipalities looking for community program information, so legibility and information hierarchy were as important as visual impact.",
  },
  {
    label: "BUILD",
    text: "Working as co-lead designer, I helped shape the UX and UI across the site: the homepage narrative, the project and metrics sections, the sustainability and community pages for each municipality, news, and the public accountability areas. I worked closely with the development team through handoff to make sure the design intent translated correctly into the build. QA was owned by another part of the team.",
  },
  {
    label: "RESULT",
    text: "The result is an institutional site that makes a large, technically complex infrastructure project legible and transparent, giving equal weight to the engineering scale of the dam and the social impact it's meant to represent across Antioquia.",
  },
];

export default function HidroituangoProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="hidroituango-right-panel"
      externalUrl={externalUrl}
      coverImage={coverImage}
      images={images}
    />
  );
}
