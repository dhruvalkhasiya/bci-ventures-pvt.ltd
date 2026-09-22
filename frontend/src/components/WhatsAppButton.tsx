import { MessageCircle } from "lucide-react";
import { company } from "../data/company";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-lg transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
