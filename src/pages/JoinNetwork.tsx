import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Building2,
  CheckCircle2,
  Globe2,
  Landmark,
  Loader2,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { EAST_AFRICAN_COUNTRIES, MUSEUM_CULTURES } from "../data/museums";
import { submitMuseumApplication } from "../lib/museumNetwork";

const INSTITUTION_TYPES = [
  "National Museum",
  "Community / Heritage Site",
  "Corporate Museum",
  "University / Academic Museum",
  "Private Collection",
  "Digital / Virtual Museum",
  "Gallery",
  "Other",
];

const STEPS = [
  {
    icon: Building2,
    title: "Register",
    copy: "Tell us about your museum — country, region, culture, and your official website.",
  },
  {
    icon: ShieldCheck,
    title: "Get Verified",
    copy: "An ICOM Uganda network admin reviews your submission for authenticity.",
  },
  {
    icon: Globe2,
    title: "Go Live",
    copy: "Your museum is published to the East African Museum Network, linking straight to your own website.",
  },
];

export function JoinNetwork() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      museumName: String(data.get("museumName") || "").trim(),
      country: String(data.get("country") || "").trim(),
      region: String(data.get("region") || "").trim(),
      culture: String(data.get("culture") || "").trim(),
      type: String(data.get("type") || "").trim(),
      description: String(data.get("description") || "").trim(),
      website: String(data.get("website") || "").trim(),
      contactName: String(data.get("contactName") || "").trim(),
      contactEmail: String(data.get("contactEmail") || "").trim(),
      contactPhone: String(data.get("contactPhone") || "").trim(),
      logoUrl: String(data.get("logoUrl") || "").trim(),
      imageUrl: String(data.get("imageUrl") || "").trim(),
    };

    try {
      await submitMuseumApplication(payload);

      // Best-effort email notification to the network admin inbox, mirroring
      // the rest of the site's forms. The Firestore write above is the
      // source of truth for the review queue, so a failure here is silent.
      fetch("https://formsubmit.co/ajax/icomuganda@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New Museum Network Application: ${payload.museumName}`,
          ...payload,
        }),
      }).catch(() => {});

      setStatus("done");
      form.reset();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        "We couldn't submit your application right now. Please try again, or email icomuganda@gmail.com directly."
      );
      setStatus("error");
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Register Your Museum | East African Museum Network",
    description:
      "Submit your museum for review to join the East African Museum Network — a shared directory of member museums across Uganda, Kenya, Tanzania, Rwanda, and beyond.",
  };

  return (
    <div className="bg-warm-white min-h-screen">
      <SEO
        title="Register Your Museum | East African Museum Network"
        description="Join the East African Museum Network. Submit your museum for admin review — once approved, your institution is published to the shared directory, categorised by country, region, and culture."
        schema={schema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== "undefined" ? window.location.origin : "" },
          { name: "Museums", url: typeof window !== "undefined" ? `${window.location.origin}/museums` : "" },
          { name: "Register Your Museum", url: typeof window !== "undefined" ? window.location.href : "" },
        ]}
      />

      {/* Header */}
      <div className="bg-earth-dark text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 2px, transparent 14px)' }} />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-earth-accent-bright" />
            <span className="text-xs font-semibold uppercase tracking-widest">East African Museum Network</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-semibold mb-6">Register Your Museum</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Join a shared, member-only directory where museums across East Africa are discovered by country, region, and culture — each listing linking straight through to your own website.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-6 -mt-12 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl border border-stone shadow-lg p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-earth-accent/15 text-earth-accent flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-earth-muted mb-1">Step {i + 1}</div>
              <h3 className="font-serif text-xl text-earth-dark mb-2">{step.title}</h3>
              <p className="text-sm text-earth-muted leading-relaxed">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-white border border-stone rounded-[32px] p-8 md:p-12 shadow-sm">
          {status === "done" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="font-serif text-3xl text-earth-dark mb-3">Application received</h2>
              <p className="text-earth-muted max-w-md mx-auto leading-relaxed mb-8">
                Thank you for applying to join the East African Museum Network. An ICOM Uganda admin will review your
                submission shortly. Once approved, your museum will appear in the{" "}
                <Link to="/museums" className="text-earth-accent font-semibold underline">public directory</Link>{" "}
                linking directly to your website.
              </p>
              <Link
                to="/museums"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-earth-dark text-white font-semibold hover:bg-woven-teal transition-colors"
              >
                Browse the Network
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-earth-accent" /> About your museum
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="museumName" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Museum Name <span className="text-earth-accent">*</span>
                    </label>
                    <input id="museumName" name="museumName" required maxLength={200}
                      placeholder="e.g. National Museum of Kenya"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Country <span className="text-earth-accent">*</span>
                    </label>
                    <select id="country" name="country" required defaultValue=""
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all text-earth-dark">
                      <option value="" disabled>Select country...</option>
                      {EAST_AFRICAN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="region" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Region / City <span className="text-earth-accent">*</span>
                    </label>
                    <input id="region" name="region" required maxLength={100}
                      placeholder="e.g. Nairobi"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="culture" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Culture / Category <span className="text-earth-accent">*</span>
                    </label>
                    <select id="culture" name="culture" required defaultValue=""
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all text-earth-dark">
                      <option value="" disabled>Select category...</option>
                      {MUSEUM_CULTURES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="type" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Institution Type
                    </label>
                    <select id="type" name="type" defaultValue="Community / Heritage Site"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all text-earth-dark">
                      {INSTITUTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="description" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Description <span className="text-earth-accent">*</span>
                    </label>
                    <textarea id="description" name="description" required maxLength={4000} rows={4}
                      placeholder="What should visitors know about your museum and its collection?"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all resize-y" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-earth-accent" /> Your museum online
                </h2>
                <p className="text-xs text-earth-muted -mt-4">
                  Once approved, your Network listing links directly to your official website — this is how visitors will reach you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="website" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Official Website URL <span className="text-earth-accent">*</span>
                    </label>
                    <input id="website" name="website" type="url" required
                      placeholder="https://yourmuseum.org"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="imageUrl" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Cover Image URL <span className="text-stone-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input id="imageUrl" name="imageUrl" type="url"
                      placeholder="https://.../cover.jpg"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="logoUrl" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Logo URL <span className="text-stone-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input id="logoUrl" name="logoUrl" type="url"
                      placeholder="https://.../logo.png"
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-earth-accent" /> Contact person
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contactName" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Full Name <span className="text-earth-accent">*</span>
                    </label>
                    <input id="contactName" name="contactName" required maxLength={200}
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contactEmail" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Email <span className="text-earth-accent">*</span>
                    </label>
                    <input id="contactEmail" name="contactEmail" type="email" required maxLength={256}
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label htmlFor="contactPhone" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">
                      Phone <span className="text-stone-500 font-normal lowercase">(optional, incl. country code)</span>
                    </label>
                    <input id="contactPhone" name="contactPhone" type="tel" placeholder="+256..."
                      className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 bg-warm-white p-6 rounded-2xl border border-stone">
                <div className="flex gap-4">
                  <input type="checkbox" id="agree" required
                    className="mt-1 flex-shrink-0 w-5 h-5 rounded border-stone text-woven-teal focus:ring-woven-teal cursor-pointer" />
                  <label htmlFor="agree" className="text-sm text-earth-dark cursor-pointer select-none">
                    I confirm I am authorised to submit this application on behalf of the museum, and I agree to adhere
                    to the <em>ICOM Code of Ethics for Museums</em> as a member of the Network.
                  </label>
                </div>
              </div>

              {status === "error" && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-earth-dark hover:bg-woven-teal text-warm-white font-bold uppercase tracking-widest py-4 rounded-full transition-colors flex items-center justify-center gap-2 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  "Submit for Review"
                )}
              </button>
              <p className="text-xs text-earth-muted text-center -mt-6 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Your listing will only go live after admin approval.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
