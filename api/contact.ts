import { Resend } from "resend";

import {
  CONTACT_EMAIL_FALLBACK,
  validateContactForm,
} from "../src/lib/contact";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  let payload: ContactRequestBody;
  try {
    payload = (await request.json()) as ContactRequestBody;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = typeof payload.name === "string" ? payload.name : "";
  const email = typeof payload.email === "string" ? payload.email : "";
  const message = typeof payload.message === "string" ? payload.message : "";

  const validationError = validateContactForm({ name, email, message });
  if (validationError) {
    return json({ error: validationError }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const userTemplateId = process.env.RESEND_TEMPLATE_CONTACT_USER;
  const adminTemplateId = process.env.RESEND_TEMPLATE_CONTACT_ADMIN;
  const adminEmail = process.env.CONTACT_TO_EMAIL ?? CONTACT_EMAIL_FALLBACK;
  const siteUrl = (process.env.CONTACT_SITE_URL ?? "").replace(/\/$/, "");

  if (!apiKey || !from || !userTemplateId || !adminTemplateId || !siteUrl) {
    console.error("Missing Resend environment variables.");
    return json({ error: "Server configuration error." }, 500);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.batch.send([
      {
        from,
        to: trimmedEmail,
        replyTo: adminEmail,
        template: {
          id: userTemplateId,
          variables: {
            USER_NAME: trimmedName,
            USER_MESSAGE: trimmedMessage,
            SITE_URL: siteUrl,
          },
        },
      },
      {
        from,
        to: adminEmail,
        replyTo: trimmedEmail,
        template: {
          id: adminTemplateId,
          variables: {
            USER_NAME: trimmedName,
            USER_EMAIL: trimmedEmail,
            USER_MESSAGE: trimmedMessage,
            SITE_URL: siteUrl,
          },
        },
      },
    ]);

    if (error) {
      console.error("Resend batch send failed:", error);
      return json({ error: "Failed to send message. Please try again." }, 502);
    }
  } catch (error) {
    console.error("Unexpected error while sending email:", error);
    return json({ error: "Failed to send message. Please try again." }, 500);
  }

  return json({ ok: true });
}
