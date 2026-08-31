"use client";

import { useRef, useState } from "react";
import HoverLetters from "./HoverLetters";
import HoverIcon from "./HoverIcon";
import FormDropdown from "./FormDropdown";

const PROJECT_TYPE_OPTIONS = ["Website", "App", "Product", "Not sure yet"];
const BUDGET_OPTIONS = [
  "Let's chat first",
  "$2k–$8k",
  "$8k–$20k",
  "$20k+",
  "I have no idea, help me figure it out",
];
const TIMELINE_OPTIONS = [
  "Yesterday (I know, I know)",
  "1–3 months",
  "3–6 months",
  "Not sure, let's figure it out together",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FALLBACK_EMAIL = "hello@misa.studio";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  // Honeypot — left blank by real visitors, invisible on screen. Any bot
  // that fills every input blindly trips it.
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function autoResizeMessage(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Tell me your name.";
    if (!email.trim()) nextErrors.email = "Tell me where to reply.";
    else if (!EMAIL_RE.test(email.trim())) nextErrors.email = "That doesn't look like a valid email.";
    if (!message.trim()) nextErrors.message = "Tell me a little about it.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType,
          budget,
          timeline,
          message: message.trim(),
          company,
        }),
      });

      if (!res.ok) throw new Error("submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex w-full flex-col items-start gap-2">
        <p className="text-[24px] leading-none text-white uppercase">Message sent. Talk soon.</p>
        <p className="text-[14px] text-white opacity-50">I&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col items-start gap-6"
    >
      {/* Honeypot: hidden from sighted and screen-reader users alike, but
          still a normal input a bot's form-filler will happily fill in.
          Name/id deliberately avoid recognized autofill tokens (e.g. "company")
          — browsers ignore autoComplete="off" for those and will silently
          fill them from a saved address profile, tripping this for real users. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-hp-field">Leave this field blank</label>
        <input
          id="contact-hp-field"
          name="contact-hp-field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <label htmlFor="contact-name" className="w-full text-[14px] text-white opacity-50">
          Who am I talking to?
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Write your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="h-10 w-full border-b border-white py-2 text-[14px] text-white placeholder:text-white placeholder:opacity-20 focus:outline-none"
        />
        {errors.name && (
          <p id="contact-name-error" className="text-[12px] text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <label htmlFor="contact-email" className="w-full text-[14px] text-white opacity-50">
          Where do I reply?
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Write your email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="h-10 w-full border-b border-white py-2 text-[14px] text-white placeholder:text-white placeholder:opacity-20 focus:outline-none"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-[12px] text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <FormDropdown
        label="What are we building?"
        placeholder="Pick one"
        options={PROJECT_TYPE_OPTIONS}
        value={projectType}
        onChange={setProjectType}
      />

      <div className="flex w-full flex-col items-start gap-1">
        <label htmlFor="contact-message" className="w-full text-[14px] text-white opacity-50">
          Tell me about it.
        </label>
        <textarea
          ref={messageRef}
          id="contact-message"
          name="message"
          rows={1}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            autoResizeMessage(e.target);
          }}
          placeholder="What's the dream?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="max-h-60 min-h-10 w-full resize-none border-b border-white py-2 text-[14px] text-white placeholder:text-white placeholder:opacity-20 focus:outline-none"
        />
        {errors.message && (
          <p id="contact-message-error" className="text-[12px] text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <FormDropdown
        label="What's the budget looking like?"
        placeholder="Pick a range"
        options={BUDGET_OPTIONS}
        value={budget}
        onChange={setBudget}
      />

      <FormDropdown
        label="When do you need this live?"
        placeholder="Pick a timeframe"
        options={TIMELINE_OPTIONS}
        value={timeline}
        onChange={setTimeline}
        openUpward
      />

      {status === "error" && (
        <p role="alert" className="text-[12px] text-red-400">
          Something went wrong — try again or email me directly at {FALLBACK_EMAIL}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        aria-label={status === "submitting" ? "Sending" : "Send it"}
        className="group mt-2 flex shrink-0 items-center gap-2 text-base uppercase disabled:opacity-50"
      >
        <HoverLetters text={status === "submitting" ? "Sending..." : "Send it"} />
        <HoverIcon src="/images/arrow.svg" width={24} height={24} className="-scale-x-100" />
      </button>
    </form>
  );
}
