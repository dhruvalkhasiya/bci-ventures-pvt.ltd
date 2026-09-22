// Stub WhatsApp notification service. Wire this up to the WhatsApp
// Business Cloud API (or a provider like Twilio/Gupshup) before production.

export async function sendWhatsAppMessage(to: string, message: string): Promise<void> {
  console.log(`[whatsappService] Would send WhatsApp message to ${to}: ${message}`);
  // TODO: integrate WhatsApp Business Cloud API, e.g.:
  // await fetch(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, { ... });
}
