import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-warm-white/50 text-earth-dark/80 py-16 border-t border-earth-dark/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-bold text-earth-dark mb-4">ICOM Uganda</h2>
            <p className="max-w-md text-sm leading-relaxed mb-6">
              The leading digital infrastructure for Uganda's museums and cultural heritage. Integrating information access, virtual engagement, and preservation into one unified ecosystem.
            </p>
            <div className="flex gap-4 mb-4">
              <a href="#" className="w-10 h-10 rounded-full border border-earth-dark/20 flex items-center justify-center hover:bg-earth-dark hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-dark/20 flex items-center justify-center hover:bg-earth-dark hover:text-white transition-colors">
                <span className="sr-only">X</span>
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-dark/20 flex items-center justify-center hover:bg-earth-dark hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-earth-dark/20 flex items-center justify-center hover:bg-earth-dark hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                IN
              </a>
            </div>
            <div className="text-sm">
              <p>P.O. Box 16708, Wandegeya, Kampala, Uganda</p>
              <a href="mailto:icomuganda@gmail.com" className="hover:text-earth-accent transition-colors">icomuganda@gmail.com</a>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-earth-dark mb-6">Museum Network</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/about" className="hover:text-earth-accent transition-colors">About ICOM Uganda</Link></li>
              <li><Link to="/museums" className="hover:text-earth-accent transition-colors">Network Directory</Link></li>
              <li><Link to="/join-network" className="hover:text-earth-accent transition-colors">Register Your Museum</Link></li>
              <li><Link to="/virtual-tours" className="hover:text-earth-accent transition-colors">Virtual Tours</Link></li>
              <li><Link to="/news" className="hover:text-earth-accent transition-colors">News & Publications</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-earth-dark mb-6">Engagement</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link to="/membership" className="hover:text-earth-accent transition-colors">Membership Portal</Link></li>
              <li><Link to="/donate" className="hover:text-earth-accent transition-colors">Support & Donate</Link></li>
              <li><Link to="/contact" className="hover:text-earth-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-earth-dark/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} ICOM Uganda Digital Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-earth-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-earth-dark transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
