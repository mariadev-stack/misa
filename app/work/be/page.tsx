import ProjectDetail from "../../components/ProjectDetail";

const meta = "Be / Product Design / 2025";
const coverImage = "/images/work/be/cover-projectdetail-be.jpg";
const images = Array.from(
  { length: 9 },
  (_, i) => `/images/work/be/image-${i + 1}-be.jpg`,
);

const sections = [
  {
    label: "CHALLENGE",
    text: "Across Guyana and the wider Caribbean, a large part of the population remains underserved by traditional banking, facing high fees, limited access, and financial products that weren't built with their day-to-day reality in mind. Be! needed a digital platform that could replace a traditional bank account entirely, covering payments, savings, and card spending, while feeling approachable to people who may be using a financial app like this for the first time.",
  },
  {
    label: "APPROACH",
    text: "As part of the product team, I worked on designing a platform that consolidates several financial services (a digital wallet, a stash/savings account, and a Mastercard debit card) into a single, coherent experience. The focus was on removing the friction and intimidation often associated with financial products: clear balances, simple transfer and payment flows, and straightforward onboarding so users can move away from cash and informal banking with confidence. Every design decision was measured against one question: does this make financial freedom feel more accessible, not less?",
  },
  {
    label: "BUILD",
    text: "I contributed to the platform's product design across core flows including account creation, the digital wallet and stash account, card management, and payments and transfers. Working closely with the broader product team, I helped shape the interface patterns and user flows that hold the different services (payments, savings, card) together as one connected hub, rather than a set of disconnected features.",
  },
  {
    label: "RESULT",
    text: "Be! now operates as a 100% digital financial hub, giving users in Guyana and the Caribbean a single place to transfer, pay, save, and spend, without the fees and friction of traditional banking. The platform reflects Be!'s mission directly: making financial services simple, fast, and genuinely accessible.",
  },
];

export default function BeProject() {
  return (
    <ProjectDetail
      meta={meta}
      sections={sections}
      scrollerId="be-right-panel"
      coverImage={coverImage}
      images={images}
    />
  );
}
