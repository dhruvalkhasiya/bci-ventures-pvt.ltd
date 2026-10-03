import OurStartups from "../components/OurStartups";
import ReferralBanner from "../components/ReferralBanner";

export default function StartupsPage() {
  return (
    <div className="pt-8">
      <div className="bg-hero-gradient py-16 text-center text-white">
        <div className="section-container">
          <span className="mb-3 inline-block rounded-full border border-gold-500/60 bg-brand-700/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-100">
            BCI Ecosystem
          </span>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-gold-500">Our Startups & Ventures</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Building, Incubating & Scaling Innovative Technology Ventures under BCI.
          </p>
        </div>
      </div>

      <OurStartups />

      <ReferralBanner />
    </div>
  );
}
