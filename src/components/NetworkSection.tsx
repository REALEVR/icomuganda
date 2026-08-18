import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Building2, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { EAST_AFRICAN_COUNTRIES, MUSEUMS_DATA } from "../data/museums";

const STEPS = [
  {
    icon: Building2,
    title: "Register",
    copy: "Any museum in East Africa submits its profile — country, region, culture, and official website.",
  },
  {
    icon: ShieldCheck,
    title: "Get Verified",
    copy: "ICOM Uganda network admins review each application before it goes public.",
  },
  {
    icon: Globe2,
    title: "Go Live",
    copy: "The museum is published to the shared directory, linking visitors straight to its own website.",
  },
];

export function NetworkSection() {
  const memberCount = MUSEUMS_DATA.length;
  const countryCount = EAST_AFRICAN_COUNTRIES.length;

  return (
    <section className="py-24 bg-earth-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 2px, transparent 16px)' }} />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-earth-accent" />
            <span className="text-xs font-bold uppercase tracking-widest">One Network, Every Museum</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-semibold mb-6">
            The East African Museum Network
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            A shared, member-only directory where museums across Uganda, Kenya, Tanzania, Rwanda and beyond are
            discovered by country, region, and culture — each listing linking straight through to the museum's own
            website. Membership is reviewed by ICOM Uganda, so only verified institutions ever go live.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl font-bold text-earth-accent mb-1">{memberCount}+</div>
            <div className="text-xs uppercase tracking-widest text-white/60">Member Museums</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-4xl md:text-5xl font-bold text-earth-accent mb-1">{countryCount}</div>
            <div className="text-xs uppercase tracking-widest text-white/60">Countries Open to Join</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="font-serif text-4xl md:text-5xl font-bold text-earth-accent mb-1">100%</div>
            <div className="text-xs uppercase tracking-widest text-white/60">Admin-Verified Listings</div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-earth-accent/20 text-earth-accent flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Step {i + 1}</div>
              <h3 className="font-serif text-xl mb-2">{step.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{step.copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/join-network"
            className="bg-earth-accent text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white hover:text-earth-dark transition-all inline-flex items-center gap-2 shadow-xl"
          >
            Register Your Museum <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/museums"
            className="inline-flex items-center gap-2 text-white uppercase tracking-widest text-sm font-semibold hover:text-earth-accent transition-colors border-b border-white/30 hover:border-earth-accent pb-1"
          >
            Browse the Directory
          </Link>
        </div>
      </div>
    </section>
  );
}
