"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    console.log("Sending email to:", to);
    console.log("Email Subject:", subject);

    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>", // Ensure you have verified this in Resend
      to,
      subject,
      react,
    });

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: error.message || error };
  }
}
