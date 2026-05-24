import { Check } from "lucide-react";
import { SEO } from "../components/SEO";

export function Membership() {
  const membershipSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Membership Portal | ICOM Uganda",
    "description": "Become a part of the movement to preserve and promote Uganda's rich cultural heritage. Enjoy exclusive benefits and support our mission.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "ICOM Uganda Memberships",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Student Membership",
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Professional Membership",
          "price": "50",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Institutional Membership",
          "price": "500",
          "priceCurrency": "USD"
        }
      ]
    }
  };

  return (
    <div className="bg-warm-white min-h-screen py-20 px-6">
      <SEO 
        title="Membership Portal | ICOM Uganda" 
        description="Become a part of the movement to preserve and promote Uganda's rich cultural heritage. Enjoy exclusive benefits and support our mission." 
        schema={membershipSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Membership", url: typeof window !== 'undefined' ? `${window.location.origin}/membership` : '' }
        ]}
      />
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-earth-dark mb-6">Join Our Community</h1>
          <p className="text-lg text-earth-muted">
            Become a part of the movement to preserve and promote Uganda's rich cultural heritage. Enjoy exclusive benefits and support our mission.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-stone rounded-[32px] p-8 md:p-12 shadow-sm">
          <form action="https://formsubmit.co/icomuganda@gmail.com" method="POST" className="flex flex-col gap-10">
            <input type="hidden" name="_subject" value="New Membership Application (ICOM Uganda)" />
            <input type="hidden" name="_autoresponse" value="Thank you for your application to ICOM Uganda. Our team will review your details and get back to you shortly." />
            
            {/* Personal Information */}
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2">Your personal information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Title <span className="text-earth-accent">*</span></label>
                  <select id="title" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer text-earth-dark">
                    <option value="Ms">Ms</option>
                    <option value="Mr">Mr</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dob" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Date of Birth <span className="text-stone-500 font-normal lowercase">(Optional, DD/MM/YY)</span></label>
                  <input type="text" id="dob" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="DD/MM/YY" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">First Name <span className="text-earth-accent">*</span></label>
                  <input type="text" id="firstName" name="First Name" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Jane" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Last Name <span className="text-earth-accent">*</span></label>
                  <input type="text" id="lastName" name="Last Name" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Doe" required />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2">Your contact information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Address <span className="text-earth-accent">*</span></label>
                  <input type="text" id="address" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Street Address" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">City <span className="text-earth-accent">*</span></label>
                  <input type="text" id="city" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="City" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="postalCode" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Postal Code</label>
                  <input type="text" id="postalCode" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Postal Code" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="country" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Country <span className="text-earth-accent">*</span></label>
                  <input type="text" id="country" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Country" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="telephone" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Telephone <span className="text-stone-500 font-normal lowercase">(incl. code)</span> <span className="text-earth-accent">*</span></label>
                  <input type="tel" id="telephone" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="+256..." required />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="email" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Email <span className="text-earth-accent">*</span></label>
                  <input type="email" id="email" name="email" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="jane.doe@example.com" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-widest text-earth-muted">How may we contact you? <span className="text-earth-accent">*</span></label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer text-earth-dark"><input type="radio" name="contactPreference" className="text-woven-teal focus:ring-woven-teal" defaultChecked /> Personal</label>
                    <label className="flex items-center gap-2 cursor-pointer text-earth-dark"><input type="radio" name="contactPreference" className="text-woven-teal focus:ring-woven-teal" /> Professional</label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Preferred Language <span className="text-earth-accent">*</span></label>
                  <div className="flex gap-4 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer text-earth-dark"><input type="radio" name="language" className="text-woven-teal focus:ring-woven-teal" defaultChecked /> English</label>
                    <label className="flex items-center gap-2 cursor-pointer text-earth-dark"><input type="radio" name="language" className="text-woven-teal focus:ring-woven-teal" /> French</label>
                    <label className="flex items-center gap-2 cursor-pointer text-earth-dark"><input type="radio" name="language" className="text-woven-teal focus:ring-woven-teal" /> Spanish</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2">Your professional information</h2>
              
              <div className="flex flex-col gap-4">
                <label className="flex items-start gap-4 p-4 border border-stone rounded-xl cursor-pointer hover:border-woven-teal/50 transition-colors bg-warm-white relative">
                  <input type="radio" name="proStatus" className="mt-1 text-woven-teal focus:ring-woven-teal peer" defaultChecked />
                  <div className="flex-1">
                    <div className="font-semibold text-earth-dark mb-4">I am an active museum professional <span className="text-sm text-earth-muted font-normal block">(please attach proof of employment)</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Your institution's name" />
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Your title" />
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-stone rounded-xl cursor-pointer hover:border-woven-teal/50 transition-colors bg-warm-white relative">
                  <input type="radio" name="proStatus" className="mt-1 text-woven-teal focus:ring-woven-teal peer" />
                  <div className="flex-1">
                    <div className="font-semibold text-earth-dark mb-4">I am a student enrolled in a museum-related academic programme <span className="text-sm text-earth-muted font-normal block">(please attach valid proof of enrolment)</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Name of your university or school" />
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Degree level and specialisation" />
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-4 p-4 border border-stone rounded-xl cursor-pointer hover:border-woven-teal/50 transition-colors bg-warm-white relative">
                  <input type="radio" name="proStatus" className="mt-1 text-woven-teal focus:ring-woven-teal peer" />
                  <div className="flex-1">
                    <div className="font-semibold text-earth-dark mb-4">I am not a museum professional but am interested in museums and international co-operation <span className="text-sm text-earth-muted font-normal block">(please attach a CV)</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Name of your organisation" />
                      <input type="text" className="bg-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-lg px-3 py-2 outline-none transition-all w-full text-sm" placeholder="Your title or profession" />
                    </div>
                  </div>
                </label>
              </div>
            </div>

             {/* Professional Contact Information */}
             <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2">Your professional contact information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="proAddress" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Address</label>
                  <input type="text" id="proAddress" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Street Address" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proCity" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">City</label>
                  <input type="text" id="proCity" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="City" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proPostalCode" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Postal Code</label>
                  <input type="text" id="proPostalCode" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Postal Code" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proCountry" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Country</label>
                  <input type="text" id="proCountry" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="Country" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proTelephone" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Telephone <span className="text-stone-500 font-normal lowercase">(incl. code)</span></label>
                  <input type="tel" id="proTelephone" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="+256..." />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proEmail" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Email</label>
                  <input type="email" id="proEmail" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="professional@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="proWebsite" className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Website</label>
                  <input type="url" id="proWebsite" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="https://..." />
                </div>
              </div>
            </div>

            {/* ICOM Committees */}
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-medium text-earth-dark border-b border-stone pb-2">International Committees</h2>
              <p className="text-earth-muted text-sm -mt-4">Please specify your preferences for ICOM International Committees.</p>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Voting Committee <span className="text-earth-accent">*</span></label>
                <p className="text-xs text-earth-muted mb-2">Membership giving the right to vote in an ICOM International Committee (select one)</p>
                <select className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all text-earth-dark max-w-full overflow-hidden text-ellipsis">
                  <option value="">Select a committee...</option>
                  <option value="AVICOM">AVICOM (Audiovisual, New Technologies and Social Media)</option>
                  <option value="CAMOC">CAMOC (Museums of Cities)</option>
                  <option value="CECA">CECA (Education and Cultural Action)</option>
                  <option value="CIMUSET">CIMUSET (Science and Technology)</option>
                  <option value="CIPEG">CIPEG (Egyptology)</option>
                  <option value="COMCOL">COMCOL (Collecting)</option>
                  <option value="COSTUME">COSTUME (Costume, Fashion and Textiles)</option>
                  <option value="DEMHIST">DEMHIST (Historic House Museums)</option>
                  <option value="DRMC">DRMC (Disaster Resilient Museums)</option>
                  <option value="GLASS">GLASS (Glass)</option>
                  <option value="ICAMT">ICAMT (Architecture and Museum Techniques)</option>
                  <option value="ICEthics">ICEthics (Ethical Dilemmas)</option>
                  <option value="ICFA">ICFA (Fine Arts)</option>
                  <option value="ICLCM">ICLCM (Literary and Composers' Museums)</option>
                  <option value="ICMAH">ICMAH (Archaeology and History)</option>
                  <option value="ICME">ICME (Ethnography)</option>
                  <option value="ICMEMOHRI">ICMEMOHRI (Memorial and Human Rights Museums)</option>
                  <option value="ICOFOM">ICOFOM (Museology)</option>
                  <option value="ICOM ARMS & MILITARY">ICOM ARMS & MILITARY (Arms and Military History)</option>
                  <option value="ICOM COMMS">ICOM COMMS (Communications, Marketing, and Audience Engagement)</option>
                  <option value="ICOM CONSERVATION">ICOM CONSERVATION (Conservation)</option>
                  <option value="ICOM DESIGN">ICOM DESIGN (Decorative Arts and Design)</option>
                  <option value="ICOM DOCUMENTATION">ICOM DOCUMENTATION (Documentation)</option>
                  <option value="ICOM EXHIBITIONS">ICOM EXHIBITIONS (Exhibition Exchange)</option>
                  <option value="ICOM MUSIC">ICOM MUSIC (Instruments and Music)</option>
                  <option value="ICOM SECURITY">ICOM SECURITY (Museum Security)</option>
                  <option value="ICOM STORAGE">ICOM STORAGE (Collections in Storage)</option>
                  <option value="ICOMON">ICOMON (Money and Banking Museums)</option>
                  <option value="ICR">ICR (Regional Museums)</option>
                  <option value="ICTOP">ICTOP (Training of Personnel)</option>
                  <option value="INTERCOM">INTERCOM (Museum Management)</option>
                  <option value="NATHIST">NATHIST (Natural History)</option>
                  <option value="SOMUS">SOMUS (Social Museology)</option>
                  <option value="SUSTAIN">SUSTAIN (Museums and Sustainable Development)</option>
                  <option value="UMAC">UMAC (University Museums)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-sm font-semibold uppercase tracking-widest text-earth-muted">Committees for Information</label>
                <p className="text-xs text-earth-muted mb-2">Committees of which you wish to receive information without voting rights (3 max, comma separated)</p>
                <input type="text" className="bg-warm-white border border-stone focus:border-woven-teal focus:ring-1 focus:ring-woven-teal rounded-xl px-4 py-3 outline-none transition-all" placeholder="e.g. CECA, ICME, UMAC" />
              </div>
            </div>

            {/* Statement and File Upload */}
            <div className="flex flex-col gap-6 bg-warm-white p-6 rounded-2xl border border-stone">
               <div className="flex gap-4">
                 <input type="checkbox" id="agree" className="mt-1 flex-shrink-0 w-5 h-5 rounded border-stone text-woven-teal focus:ring-woven-teal cursor-pointer" required />
                 <label htmlFor="agree" className="text-sm text-earth-dark cursor-pointer select-none">
                   By ticking this box and submitting my membership application, I acknowledge having read and understood the information provided on this form, as well as the GDPR regulations. I agree not to trade (i.e. buy or sell for profit) in cultural property and to adhere by the <em>Code of Ethics for Museums</em> adopted by ICOM.
                 </label>
               </div>
               
               <div className="border border-stone rounded-xl p-6 border-dashed flex flex-col items-center justify-center bg-white mt-2">
                 <span className="font-semibold text-earth-dark mb-1">Upload Required Documents</span>
                 <span className="text-xs text-earth-muted mb-4 text-center">Please combine your proof of employment, enrolment, or CV into a single PDF or ZIP file.</span>
                 <label className="bg-stone hover:bg-stone/80 text-earth-dark px-6 py-2 rounded-full font-medium text-sm cursor-pointer transition-colors">
                   Choose File
                   <input type="file" className="hidden" accept=".pdf,.doc,.docx,.zip" />
                 </label>
               </div>
            </div>

            <button type="submit" className="w-full bg-earth-dark hover:bg-woven-teal text-warm-white font-bold uppercase tracking-widest py-4 rounded-full transition-colors flex items-center justify-center gap-2 group shadow-xl">
              Submit Membership Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
