/**
 * Utility for generating professional automated WhatsApp contact links.
 * WhatsApp Number: +91 99792 06007
 */

export const WHATSAPP_NUMBER = "919979206007";
export const WHATSAPP_DISPLAY_PHONE = "+91 99792 06007";

export interface WhatsAppOptions {
  type?: "general" | "course" | "registration" | "referral";
  courseName?: string;
  studentName?: string;
}

export function buildWhatsAppMessage(options: WhatsAppOptions = {}): string {
  const { type = "general", courseName, studentName } = options;

  switch (type) {
    case "course":
      return `Hello BCI Team! 👋\n\nI am interested in enrolling in the *${courseName || "AI Program"}*.\n\nCould you please share details regarding:\n- Batch Timings (Daily / Weekend)\n- Course Fee & Syllabus\n- Next Upcoming Batch Date\n\nThank you!`;

    case "registration":
      return `Hello BCI Team! 👋\n\nMy name is *${studentName || "a student"}* and I have submitted my registration form on the BCI website${courseName ? ` for *${courseName}*` : ""}.\n\nCould you please confirm my seat and share the onboarding details?\n\nThank you!`;

    case "referral":
      return `Hello BCI Team! 👋\n\nI want to refer a student to BCI's AI Programs and earn the *₹299 Referral Reward*.\n\nPlease share the referral procedure and details.\n\nThank you!`;

    case "general":
    default:
      return `Hello BCI Team! 👋\n\nI am visiting your website and would like to get more information about BCI's AI Training Programs.\n\nCould you please guide me on available courses and batch timings?\n\nThank you!`;
  }
}

export function getWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const message = buildWhatsAppMessage(options);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
