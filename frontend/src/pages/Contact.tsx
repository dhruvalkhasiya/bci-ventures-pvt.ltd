import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { company } from "../data/company";
import { getWhatsAppUrl } from "../utils/whatsapp";

export default function Contact() {
  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-ink/70">
          Have a question about our courses? Send us a message and our team will respond shortly.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <ContactForm />
        <div className="space-y-6">
          <div className="glass-card flex items-center gap-4 p-6">
            <Mail className="text-gold-500" />
            <div>
              <p className="text-sm text-ink/50">Email</p>
              <p className="font-medium">{company.contact.email}</p>
            </div>
          </div>
          <div className="glass-card flex items-center gap-4 p-6">
            <Phone className="text-gold-500 shrink-0" />
            <div>
              <p className="text-sm text-ink/50">Phone Numbers</p>
              <p className="font-medium">{company.contact.phone}</p>
              <p className="font-medium text-ink/70 text-sm">{company.contact.phoneSecondary}</p>
            </div>
          </div>
          <div className="glass-card flex items-center justify-between gap-4 p-6 border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold">
                WA
              </div>
              <div>
                <p className="text-sm text-ink/50">Instant Support</p>
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">WhatsApp Chat (+91 99792 06007)</p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl({ type: "general" })}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow hover:bg-emerald-700 transition-colors"
            >
              Chat Now
            </a>
          </div>
          <div className="glass-card flex items-center gap-4 p-6">
            <MapPin className="text-gold-500" />
            <div>
              <p className="text-sm text-ink/50">Address</p>
              <p className="font-medium">{company.contact.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
