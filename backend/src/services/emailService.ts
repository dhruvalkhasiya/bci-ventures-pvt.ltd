// Stub email service. Wire this up to a real provider (Nodemailer + SMTP,
// SendGrid, Resend, etc.) before going to production. Kept as a no-op so
// the rest of the app (registration/enquiry flows) can call it safely.

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  console.log(`[emailService] Would send email to ${to}: ${subject}\n${body}`);
  // TODO: integrate a real provider, e.g.:
  // await transporter.sendMail({ from: '"BCI Ventures" <no-reply@bciventures.in>', to, subject, html: body });
}
