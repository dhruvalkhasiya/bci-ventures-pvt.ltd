import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl({ type: "general" });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      aria-label="Inquire about Batches on WhatsApp"
    >
      <MessageCircle size={24} className="shrink-0" />
      <span className="hidden font-bold text-xs sm:inline-block">
        Batch Info WhatsApp (+91 80004 14111)
      </span>
    </a>
  );
}
