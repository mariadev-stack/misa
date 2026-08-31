import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZEPTOMAIL_URL = "https://api.zeptomail.com/v1.1/email";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  // Honeypot: real visitors never see this field, so a filled-in value
  // means a bot filled out every input blindly.
  company?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strip newlines so nothing from a submitted field can inject extra
// headers/lines into the outgoing subject or address fields.
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

// Next.js route handlers only respond to the HTTP methods they export, so
// POST-only (and the automatic 405 on everything else) is inherent here —
// no manual method check needed.
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = singleLine(body.name ?? "");
  const email = singleLine(body.email ?? "");
  const message = (body.message ?? "").trim();
  const projectType = singleLine(body.projectType ?? "");
  const budget = singleLine(body.budget ?? "");
  const timeline = singleLine(body.timeline ?? "");
  const honeypot = (body.company ?? "").trim();

  // Pretend success for bots that filled the honeypot, so they don't learn
  // to leave it empty — but skip actually sending the email.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const apiKey = process.env.ZEPTOMAIL_API_KEY;
  const fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL;
  const toEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing ZeptoMail environment variables (ZEPTOMAIL_API_KEY / ZEPTOMAIL_FROM_EMAIL / CONTACT_EMAIL).");
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }

  const fields: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType || "—"],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
  ];

  const htmlbody = `
    <div style="font-family: monospace; font-size: 14px; color: #080808;">
      <h2 style="margin: 0 0 16px;">New inquiry from ${escapeHtml(name)}</h2>
      <table style="border-collapse: collapse; margin-bottom: 16px;">
        ${fields
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 4px 12px 4px 0; opacity: 0.6; vertical-align: top; white-space: nowrap;">${escapeHtml(label)}</td>
            <td style="padding: 4px 0;">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <p style="opacity: 0.6; margin: 0 0 4px;">Message</p>
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `.trim();

  const textbody = [
    `New inquiry from ${name}`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType || "—"}`,
    `Budget: ${budget || "—"}`,
    `Timeline: ${timeline || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch(ZEPTOMAIL_URL, {
      method: "POST",
      headers: {
        Authorization: `Zoho-enczapikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: fromEmail },
        to: [{ email_address: { address: toEmail } }],
        reply_to: [{ address: email }],
        subject: `New inquiry from ${name} — MISA contact form`,
        htmlbody,
        textbody,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("ZeptoMail request failed:", response.status, errorBody);
      return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ZeptoMail request threw:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }
}
