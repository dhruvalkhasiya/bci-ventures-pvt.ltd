import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl({ type: "general" });

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Inquire about Batches on WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:bg-emerald-500 hover:scale-105 hover:shadow-emerald-500/50"
      >
        <MessageCircle size={22} className="animate-bounce" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold transition-all duration-300 group-hover:max-w-xs sm:max-w-none">
          Inquire About Batches
        </span>
      </a>
    </div>
  );
}
