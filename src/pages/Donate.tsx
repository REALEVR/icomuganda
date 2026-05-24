import { Heart } from "lucide-react";
import { SEO } from "../components/SEO";

export function Donate() {
  const donateSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Donate & Support | ICOM Uganda",
    "description": "Your donation directly enables the digitization of artifacts, support for regional museums, and continuous educational programs.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "potentialAction": {
      "@type": "DonateAction",
      "recipient": {
        "@type": "Organization",
        "name": "ICOM Uganda"
      }
    }
  };

  return (
    <div className="bg-warm-white min-h-screen text-earth-dark py-20 px-6">
      <SEO 
        title="Donate & Support | ICOM Uganda" 
        description="Your donation directly enables the digitization of artifacts, support for regional museums, and continuous educational programs." 
        schema={donateSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Donate", url: typeof window !== 'undefined' ? `${window.location.origin}/donate` : '' }
        ]}
      />
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 text-earth-accent">Make an Impact</p>
            <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-8">Support Our <br /> Heritage</h1>
            <p className="text-lg text-earth-dark/70 mb-10 max-w-lg leading-relaxed">
              Your donation directly enables the digitization of artifacts, support for regional museums, and continuous educational programs reaching communities across the globe.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-earth-accent/20 flex items-center justify-center text-earth-accent flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-earth-dark">Preservation</h3>
                  <p className="text-earth-dark/60 text-sm">Funding tools and tech to digitize vulnerable archives.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-earth-accent/20 flex items-center justify-center text-earth-accent flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-earth-dark">Education</h3>
                  <p className="text-earth-dark/60 text-sm">Building e-learning resources for Uganda's youth.</p>
                </div>
              </div>
            </div>
          </div>

          <form action="https://formsubmit.co/icomuganda@gmail.com" method="POST" className="bg-stone/30 rounded-[40px] border border-earth-dark/10 text-earth-dark p-8 md:p-12">
            <input type="hidden" name="_subject" value="New Donation Pledge (ICOM Uganda)" />
            <input type="hidden" name="_autoresponse" value="Thank you for your pledge to ICOM Uganda. Please send your donation to the following bank account: Bank Name: Standard Chartered Uganda, Account Name: ICOM Uganda, Account Number: 0100200300400. Once the transfer is complete, our team will confirm receipt." />
            
            <h2 className="font-serif text-3xl font-medium mb-8">Pledge a Donation</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-widest text-earth-muted font-bold mb-2">Amount (USD/UGX)</label>
                <input type="text" name="Amount" placeholder="e.g. 50 USD" required className="w-full bg-white border border-stone rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-accent/50" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-earth-muted font-bold mb-2">Your Name</label>
                <input type="text" name="Name" placeholder="Full Name" required className="w-full bg-white border border-stone rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-accent/50" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-earth-muted font-bold mb-2">Your Email <span className="normal-case font-normal text-stone-500">(To receive bank details)</span></label>
                <input type="email" name="email" placeholder="example@email.com" required className="w-full bg-white border border-stone rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-accent/50" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-earth-muted font-bold mb-2">Date to Donate</label>
                <input type="date" name="Date to Donate" required className="w-full bg-white border border-stone rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-accent/50" />
              </div>
            
              <div>
                <label className="block text-xs uppercase tracking-widest text-earth-muted font-bold mb-2">Fund Designation</label>
                <select name="Fund Designation" className="w-full bg-white border border-stone rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-accent/50">
                  <option>General Fund</option>
                  <option>Digitization Project</option>
                  <option>Community Grants</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="w-full py-4 bg-earth-dark text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-earth-accent transition-colors shadow-lg">
              Pledge Donation
            </button>
            
            <p className="text-xs text-center text-earth-muted mt-6">ICOM Uganda is a registered non-profit. You will be emailed the bank details to complete this pledge.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
