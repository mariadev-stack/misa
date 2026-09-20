import ProjectDetail from "../../components/ProjectDetail";

const meta = "UMA / Product Design / 2026";
const coverImage = "/images/work/uma/cover-projectdetail-uma.jpg";
const images = [
  "/images/work/uma/image-1-uma.jpg",
  "/images/work/uma/image-2-uma.jpg",
  "/images/work/uma/image-3-uma.jpg",
  "/images/work/uma/image-4-uma.jpg",
  "/images/work/uma/image-5-uma.jpg",
  "/images/work/uma/image-6-uma.jpg",
  "/images/work/uma/image-7-uma.jpg",
];

const sections = [
  {
    label: "CHALLENGE",
    text: 'Uma needed an experience for "Feria Sobre Ruedas," a traveling fair activation, that went beyond a typical digital product. Rather than designing a standalone app or website, the brief called for a physical, in-person journey where attendees would move through a real space, interacting with digital touchpoints along the way. The challenge was designing for a moment that lived at the intersection of physical space and digital interaction, where every screen had to make sense in the context of where the user was actually standing.',
  },
  {
    label: "APPROACH",
    text: "I approached this as an experience map first, a product second. Before designing a single screen, the process focused on the physical journey itself: how a user enters the experience, what happens at each stop along the route, and how each digital moment hands off to the next physical one. Once that journey was defined end to end, I translated it into UX flows and, from there, into the actual screens needed to support each step, ensuring the digital experience felt like a natural extension of moving through the fair rather than an app bolted onto an event.",
  },
  {
    label: "BUILD",
    text: "As design lead on this project, I owned the experience from first contact to closing moment: auditing and building the UX flows, designing the complete end-to-end user journey, and designing every screen required to support the experience across the full route through the fair.",
  },
  {
    label: "RESULT",
    text: "The result was an immersive, physical-digital experience that let Feria Sobre Ruedas attendees move through Uma's activation as a connected journey rather than a series of disconnected stops, with each screen and interaction grounded in exactly where the user was in the real-world experience.",
  },
];

export default function UmaProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="uma-right-panel"
      coverImage={coverImage}
      images={images}
    />
  );
}
