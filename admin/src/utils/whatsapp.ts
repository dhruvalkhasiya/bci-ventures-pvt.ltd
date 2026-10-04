const OFFICIAL_WHATSAPP_NUMBER = "918000414111";

export function getWhatsAppUrl(params: {
  type: "general" | "course" | "registration" | "referral";
  studentName?: string;
  courseName?: string;
}): string {
  let message = "";
  switch (params.type) {
    case "course":
      message = `Hello BCI Team, I want more information about the ${params.courseName || "AI"} course batches.`;
      break;
    case "registration":
      message = `Hello BCI Team, I registered for ${params.courseName || "a course"}. My name is ${params.studentName || "Student"}.`;
      break;
    case "referral":
      message = "Hello BCI Team, I would like to refer a student for the ₹299 Referral Reward.";
      break;
    default:
      message = "Hello BCI Team, I would like more information about your courses and batches.";
      break;
  }
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
