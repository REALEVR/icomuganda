import { Link } from "react-router-dom";
import React, { useState } from "react";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";

const SOCIALS = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "X", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    fetch("https://formsubmit.co/ajax/icomuganda@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: "Newsletter Signup | ICOM Uganda", email }),
    }).catch(() => {});
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-earth-dark text-white relative overflow-hidden">
      <div className="kente-border" />

      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <span className="eyebrow text-earth-accent-bright mb-3">Stay Connected</span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium max-w-lg">
                Heritage news, straight to your inbox.
              </h2>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-sm font-medium">
                <Send className="w-4 h-4 text-earth-accent-bright" /> Thank you — you're on the list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-6 py-4 rounded-full bg-white/10 border border-white/20 placeholder:text-white/50 text-white focus:outline-none focus:ring-2 focus:ring-earth-accent transition-all"
                />
                <button
                  type="submit"
                  className="shrink-0 w-14 h-14 rounded-full bg-white text-earth-dark flex items-center justify-center hover:bg-earth-accent hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-bold mb-4">ICOM Uganda</h2>
            <p className="max-w-md text-sm leading-relaxed mb-8 text-white/70">
              The leading digital infrastructure for Uganda's museums and cultural heritage — and home to the East
              African Museum Network, a shared directory of member museums across the region.
            </p>
            <div className="flex gap-3 mb-8">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-earth-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="text-sm text-white/70 space-y-2">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-earth-accent-bright shrink-0" /> P.O. Box 16708, Wandegeya, Kampala, Uganda</p>
              <a href="mailto:icomuganda@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors w-fit">
                <Mail className="w-4 h-4 text-earth-accent-bright shrink-0" /> icomuganda@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-earth-accent-bright mb-6">Museum Network</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white transition-colors">About ICOM Uganda</Link></li>
              <li><Link to="/museums" className="hover:text-white transition-colors">Network Directory</Link></li>
              <li><Link to="/join-network" className="hover:text-white transition-colors">Register Your Museum</Link></li>
              <li><Link to="/virtual-tours" className="hover:text-white transition-colors">Virtual Tours</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">News & Publications</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-earth-accent-bright mb-6">Engagement</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li><Link to="/membership" className="hover:text-white transition-colors">Membership Portal</Link></li>
              <li><Link to="/donate" className="hover:text-white transition-colors">Support & Donate</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} ICOM Uganda Digital Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
