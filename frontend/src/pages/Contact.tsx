import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { company } from "../data/company";

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
            <Phone className="text-gold-500" />
            <div>
              <p className="text-sm text-ink/50">Phone</p>
              <p className="font-medium">{company.contact.phone}</p>
            </div>
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
