import { Gift, Share2, Sparkles, ArrowRight } from "lucide-react";
import { getWhatsAppUrl } from "../utils/whatsapp";

interface ReferralBannerProps {
  compact?: boolean;
}

export default function ReferralBanner({ compact = false }: ReferralBannerProps) {
  const whatsappReferralUrl = getWhatsAppUrl({ type: "referral" });

  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0b1e36] via-[#102a4c] to-[#0b1e36] p-6 text-white shadow-xl border border-gold-500/30">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-[#0b1e36] shadow-md font-bold">
              <Gift size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold-500/20 px-2.5 py-0.5 text-[11px] font-bold text-gold-400 border border-gold-500/30 uppercase tracking-wider">
                  Referral Program
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-white">
                REFER & EARN <span className="text-gold-400 font-extrabold">₹299</span>
              </h3>
              <p className="text-xs text-white/70">₹299 reward for every successful student referral.</p>
            </div>
          </div>
          <a
            href={whatsappReferralUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-bold text-[#0b1e36] shadow-lg transition-all duration-300 hover:bg-gold-400 hover:scale-105 hover:shadow-gold"
          >
            <Share2 size={16} /> REFER A STUDENT
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="section-container py-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1e36] via-[#0f2847] to-[#081526] p-8 md:p-12 text-white shadow-2xl border border-gold-500/30">
        {/* Background Decorative Glows */}
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-brand-700/30 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-400 tracking-wider uppercase backdrop-blur-md">
              <Sparkles size={14} className="text-gold-400" /> BCI Referral Offer
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              REFER & EARN <span className="text-gold-400 underline decoration-gold-500/50">₹299</span>
            </h2>

            <p className="text-base leading-relaxed text-white/80 md:text-lg max-w-2xl">
              Know someone who wants to learn AI? Refer them to BCI and earn{" "}
              <strong className="text-gold-400 font-bold">₹299</strong> for every student who successfully enrolls through your referral.
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-gold-400/90 pt-1">
              <Gift size={15} />
              <span>₹299 reward for every successful student referral.</span>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 p-6 text-center backdrop-blur-md shadow-xl">
              <div className="mb-2 font-display text-4xl font-extrabold text-gold-400">
                ₹299
              </div>
              <p className="mb-5 text-xs font-medium text-white/70">
                Per successful student enrollment
              </p>
              <a
                href={whatsappReferralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 px-6 font-display text-sm font-bold text-[#0b1e36] shadow-lg transition-all duration-300 hover:bg-gold-400 hover:scale-105 hover:shadow-gold"
              >
                <Share2 size={18} /> REFER A STUDENT <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
