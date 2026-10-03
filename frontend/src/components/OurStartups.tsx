import {
  Smartphone,
  Share2,
  Coins,
  Heart,
  Feather,
  Gift,
  Wallet,
  Globe,
  Palette,
  Coffee,
  Camera,
  Crown,
  TrendingUp,
} from "lucide-react";

const startupBrands = [
  {
    name: "businessconceptindia",
    tagline: "Learn • Grow • Succeed",
    category: "EdTech & Learning",
    icon: Smartphone,
    iconBg: "bg-blue-600 text-white",
    description: "Practical skill-building and AI technology learning ecosystem empowering youth and professionals across India.",
  },
  {
    name: "roundsquare",
    tagline: "Connect • Collaborate • Grow",
    category: "Networking Platform",
    icon: Share2,
    iconBg: "bg-amber-500 text-white",
    description: "Collaborative business network and community platform connecting entrepreneurs and innovators.",
  },
  {
    name: "sirf1rupiya",
    tagline: "More Value • More Happiness",
    category: "E-Commerce Deals",
    icon: Coins,
    iconBg: "bg-yellow-500 text-navy font-bold",
    description: "Value-driven digital commerce platform delivering unbeatable deals and everyday consumer savings.",
  },
  {
    name: "lovekoof",
    tagline: "Spread Love • Share Happiness",
    category: "Lifestyle Brand",
    icon: Heart,
    iconBg: "bg-rose-500 text-white",
    description: "Youth lifestyle and apparel brand dedicated to spreading positive energy and creative fashion.",
  },
  {
    name: "lovewinger",
    tagline: "Fly Higher • Together",
    category: "Community Platform",
    icon: Feather,
    iconBg: "bg-sky-500 text-white",
    description: "Social connectivity and partnership platform empowering individuals and communities to grow together.",
  },
  {
    name: "loveprizebasket",
    tagline: "Gifts for Every Emotion",
    category: "Gifting & Celebrations",
    icon: Gift,
    iconBg: "bg-red-500 text-white",
    description: "Curated gift hampers, surprise packages, and personalized gift solutions for every special occasion.",
  },
  {
    name: "digipocket",
    tagline: "Digital Wallet • Smarter You",
    category: "FinTech & Payments",
    icon: Wallet,
    iconBg: "bg-indigo-600 text-white",
    description: "Smart digital wallet and financial management tools for seamless, secure transactions.",
  },
  {
    name: "domainwaala",
    tagline: "Your Domain • Our Priority",
    category: "Domain & Web Services",
    icon: Globe,
    iconBg: "bg-teal-600 text-white",
    description: "Domain name registration, TLD management, and web infrastructure services for growing brands.",
  },
  {
    name: "domainnlogo",
    tagline: "Your Brand • Our Design",
    category: "Branding Studio",
    icon: Palette,
    iconBg: "bg-purple-600 text-white",
    description: "Creative logo design, corporate brand identity, and visual design solutions for businesses.",
  },
  {
    name: "dewakooff",
    tagline: "Coffee • Comfort • Culture",
    category: "Café & Youth Culture",
    icon: Coffee,
    iconBg: "bg-amber-800 text-amber-100",
    description: "Premium coffee, cozy community spaces, and youth culture hubs bringing people together.",
  },
  {
    name: "dkfotografy",
    tagline: "Freeze Moments • Forever",
    category: "Photography & Media",
    icon: Camera,
    iconBg: "bg-gray-900 text-white",
    description: "Professional photography, video production, event coverage, and creative media production.",
  },
  {
    name: "monarchlifespace",
    tagline: "Live Royal • Live Better",
    category: "Real Estate & Living",
    icon: Crown,
    iconBg: "bg-amber-500 text-navy",
    description: "Modern living spaces, luxury real estate development, and residential property solutions.",
  },
  {
    name: "webcome Digital",
    tagline: "Digital Growth • Real Results",
    category: "Digital Growth Agency",
    icon: TrendingUp,
    iconBg: "bg-blue-700 text-white",
    description: "Performance digital marketing, SEO, web strategy, and online brand growth agency.",
  },
];

export default function OurStartups() {
  return (
    <section id="startups" className="bg-gradient-to-b from-white via-brand-700/5 to-white py-20">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-5 py-2 text-xs font-bold text-brand-700 uppercase tracking-widest backdrop-blur-sm">
            Innovative Brands | Digital Ventures | Future Ready
          </div>
          <h2 className="text-3xl font-extrabold md:text-5xl text-brand-700 tracking-tight">
            OUR STARTUP BUSINESS
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base leading-relaxed text-ink/70">
            Under Billionaire Concept Ingenuity Private Limited, we build, incubate, and empower diverse digital brands and commercial ventures.
          </p>
        </div>

        {/* Startup Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {startupBrands.map((brand) => {
            const Icon = brand.icon;
            return (
              <div
                key={brand.name}
                className="glass-card group relative flex flex-col p-6 transition-all duration-300 hover:shadow-gold hover:-translate-y-1 bg-white border border-[#E3EAF0] rounded-2xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-md ${brand.iconBg}`}>
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-brand-700/5 px-2.5 py-1 text-[11px] font-bold text-brand-700 border border-brand-700/15">
                    {brand.category}
                  </span>
                </div>

                <h3 className="mb-1 text-xl font-extrabold text-ink group-hover:text-brand-700 transition-colors">
                  {brand.name}
                </h3>
                <p className="mb-3 text-xs font-bold text-amber-600 dark:text-amber-400">
                  {brand.tagline}
                </p>
                <p className="flex-1 text-xs leading-relaxed text-ink/70">
                  {brand.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
