import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/environment";

export interface RegistrationNotificationData {
  fullName: string;
  email: string;
  mobile: string;
  course: string;
  city: string;
  profession?: string;
  preferredBatch?: string;
  message?: string;
  submittedAt?: Date;
}

let etherealTransporterPromise: Promise<Transporter> | null = null;

async function getTransporter(): Promise<{ transporter: Transporter; isEthereal: boolean }> {
  const user = (process.env.SMTP_USER || env.smtpUser || "").trim();
  const pass = (process.env.SMTP_PASS || env.smtpPass || "").trim();

  if (user && pass) {
    return {
      transporter: nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      }),
      isEthereal: false,
    };
  }

  // Fallback: Automatic Ethereal SMTP Test Account
  if (!etherealTransporterPromise) {
    etherealTransporterPromise = nodemailer.createTestAccount().then((acc) => {
      console.log(`[emailService] Automatic Ethereal SMTP created: ${acc.user}`);
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: { user: acc.user, pass: acc.pass },
      });
    });
  }

  const testTransporter = await etherealTransporterPromise;
  return { transporter: testTransporter, isEthereal: true };
}

export async function sendEmail(to: string, subject: string, htmlContent: string): Promise<string | null> {
  try {
    const { transporter, isEthereal } = await getTransporter();
    const senderUser = process.env.SMTP_USER || env.smtpUser || "registrationbci@gmail.com";

    const info = await transporter.sendMail({
      from: `"BCI Ventures Website" <${senderUser}>`,
      to,
      subject,
      html: htmlContent,
    });

    if (isEthereal) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`[emailService] ✉️ LIVE EMAIL SENT TO ${to}!`);
      console.log(`[emailService] 🔗 LIVE EMAIL PREVIEW URL: ${previewUrl}`);
      return (previewUrl as string) || null;
    } else {
      console.log(`[emailService] ✅ LIVE GMAIL DELIVERED TO ${to}! Message ID: ${info.messageId}`);
      return null;
    }
  } catch (err) {
    console.error(`[emailService] Email dispatch failed for ${to}:`, err);
    return null;
  }
}

export async function sendRegistrationNotification(data: RegistrationNotificationData): Promise<string | null> {
  const targetEmail = process.env.NOTIFICATION_EMAIL || env.notificationEmail || "registrationbci@gmail.com";
  const subject = `🎓 New Student Registration: ${data.fullName} - ${data.course}`;
  const formattedDate = (data.submittedAt || new Date()).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Dual Dispatch 1: HTTP Push via FormSubmit direct to target Email
  try {
    void fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Referer": "http://localhost:5173/",
      },
      body: JSON.stringify({
        _subject: subject,
        Student_Name: data.fullName,
        Student_Email: data.email,
        Mobile_Number: data.mobile,
        Enrolled_Course: data.course,
        City: data.city,
        Profession: data.profession || "N/A",
        Preferred_Batch: data.preferredBatch || "N/A",
        Message: data.message || "N/A",
        Submitted_At: formattedDate,
      }),
    }).then(async (res) => {
      const json = await res.json().catch(() => null);
      console.log(`[emailService] FormSubmit HTTP push status for ${targetEmail}:`, json);
    });
  } catch (err) {
    console.error("[emailService] FormSubmit HTTP push failed:", err);
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e3eaf0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #0b1e36; color: #d4af37; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">BCI Ventures</h1>
        <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 14px;">New Student Registration Notification</p>
      </div>
      <div style="padding: 24px; color: #333333;">
        <p style="font-size: 16px; margin-top: 0;">A new student has registered on the website!</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; width: 35%; color: #0b1e36;">Full Name:</td>
            <td style="padding: 10px 0;">${data.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Email Address:</td>
            <td style="padding: 10px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Mobile Number:</td>
            <td style="padding: 10px 0;"><a href="tel:${data.mobile}">${data.mobile}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Enrolled Course:</td>
            <td style="padding: 10px 0; font-weight: bold; color: #d4af37;">${data.course}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">City:</td>
            <td style="padding: 10px 0;">${data.city}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Profession:</td>
            <td style="padding: 10px 0;">${data.profession || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Preferred Batch:</td>
            <td style="padding: 10px 0;">${data.preferredBatch || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eeeeee;">
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36;">Submitted At:</td>
            <td style="padding: 10px 0;">${formattedDate}</td>
          </tr>
          ${
            data.message
              ? `
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #0b1e36; vertical-align: top;">Message:</td>
            <td style="padding: 10px 0;">${data.message}</td>
          </tr>
          `
              : ""
          }
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="http://localhost:5173/admin/registrations" style="background-color: #0b1e36; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">View in Admin Panel</a>
        </div>
      </div>
      <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e3eaf0;">
        BCI Ventures — Billionaire Concept Ingenuity
      </div>
    </div>
  `;

  return sendEmail(targetEmail, subject, html);
}

export async function sendStudentConfirmationEmail(data: RegistrationNotificationData): Promise<string | null> {
  const targetEmail = data.email;
  const subject = `✨ Welcome to BCI Ventures! Your Registration for ${data.course} is Confirmed`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e3eaf0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
      <div style="background-color: #0b1e36; color: #d4af37; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">BCI Ventures</h1>
        <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 14px;">Billionaire Concept Ingenuity</p>
      </div>
      <div style="padding: 28px; color: #333333; line-height: 1.6;">
        <h2 style="color: #0b1e36; margin-top: 0;">Welcome, ${data.fullName}! 🎉</h2>
        <p>Thank you for registering for the <strong>${data.course}</strong> program at BCI Ventures.</p>
        <p>Your registration details have been received and logged in our system. Our academic admissions team will contact you shortly to confirm your batch timing, onboarding details, and class link.</p>

        <div style="background-color: #f8fafc; border-left: 4px solid #d4af37; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <h3 style="margin: 0 0 10px 0; color: #0b1e36; font-size: 15px;">Registration Summary:</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Course:</strong> ${data.course}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Mobile:</strong> ${data.mobile}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>City:</strong> ${data.city}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Preferred Batch:</strong> ${data.preferredBatch || "Standard"}</p>
        </div>

        <p>If you have any urgent questions, feel free to reach out directly to our support team on WhatsApp.</p>
        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/918000414111" style="background-color: #25D366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Connect on WhatsApp</a>
        </div>
      </div>
      <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e3eaf0;">
        © BCI Ventures — Billionaire Concept Ingenuity | Practical AI Education
      </div>
    </div>
  `;

  return sendEmail(targetEmail, subject, html);
}
