import { motion } from "motion/react";
import { ArrowRight, Globe, Target, MapPin, Mail, Shield, Handshake, Calendar, Users, Award, Ticket } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-earth-dark/90 to-earth-dark/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80" 
            alt="ICOM Uganda Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative z-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="eyebrow py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white mb-6">
              Who We Are
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Preserving Our Heritage. <br /><span className="text-earth-accent-bright">Uniting Our World.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
              The International Council of Museums (ICOM) Uganda is the official National Committee dedicated to advancing the mission of preserving, protecting, and promoting both tangible and intangible cultural heritage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global & Local Mission Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-earth-dark mb-6">Our Mission & Vision</h2>
              <p className="text-earth-muted text-lg leading-relaxed mb-6">
                <strong>ICOM Global</strong> is the leading organisation of museum professionals worldwide, establishing benchmarks for ethics, advocating for heritage protection, and fostering international knowledge exchange.
              </p>
              <p className="text-earth-muted text-lg leading-relaxed mb-8">
                <strong>ICOM Uganda</strong> serves as the collective voice of museum professionals in the nation. We promote cultural awareness, professional development, and international collaboration within Uganda's unique heritage ecosystem.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-earth-accent/10 flex items-center justify-center shrink-0">
                    <Target className="text-earth-accent w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-earth-dark mb-2">Set Standards</h4>
                    <p className="text-sm text-earth-muted">Establishing benchmarks for museum ethics, conservation, and education.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-earth-accent/10 flex items-center justify-center shrink-0">
                    <Handshake className="text-earth-accent w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-earth-dark mb-2">Foster Collaboration</h4>
                    <p className="text-sm text-earth-muted">Organising training, supporting projects, and promoting Ugandan museums globally.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4 pt-12">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-stone">
                  <img src="https://images.unsplash.com/photo-1574872937746-81cf4148e67a?auto=format&fit=crop&q=80" alt="Cultural Exhibit" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 bg-earth-dark text-white rounded-3xl shadow-xl">
                  <h4 className="font-serif text-2xl mb-2">Advocacy</h4>
                  <p className="text-white/70 text-sm">Championing the safeguarding of cultural heritage worldwide.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-6 bg-earth-accent text-white rounded-3xl shadow-xl">
                  <h4 className="font-serif text-2xl mb-2">Growth</h4>
                  <p className="text-white/80 text-sm">Access to training, workshops, and continuous development.</p>
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-stone">
                  <img src="https://images.unsplash.com/photo-1566442646698-db62e1ce99ad?auto=format&fit=crop&q=80" alt="Museum Hall" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Brand Values Section as per Page 2 of ICOM Brand Guide */}
      <section className="py-24 bg-stone relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow py-1.5 px-4 rounded-full bg-earth-dark/10 border border-earth-dark/20 text-earth-dark mb-4">
              Our Foundations
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-earth-dark mb-6">ICOM Core Values</h2>
            <p className="text-earth-muted text-lg">
              As defined in the ICOM Strategic Plan, these three core principles guide all our activities, standard-setting, and advocacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-earth-accent/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-earth-accent text-xs font-bold tracking-widest uppercase mb-4 block">VALUE 01</span>
                <h3 className="font-serif text-3xl font-semibold text-earth-dark mb-6">Independence</h3>
                <p className="text-earth-muted text-base leading-relaxed mb-6">
                  ICOM is an independent worldwide membership organization comprised of individual and institutional members. As a non-governmental body (NGO), we work autonomously, free from biased political, financial, or other interests. This independence is a fundamental principle and our most valuable asset.
                </p>
              </div>
              <div className="pt-6 border-t border-earth-accent/10 text-xs text-earth-accent font-bold tracking-widest uppercase mt-4">
                Autonomy & Advocacy
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-earth-accent/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-earth-accent text-xs font-bold tracking-widest uppercase mb-4 block">VALUE 02</span>
                <h3 className="font-serif text-3xl font-semibold text-earth-dark mb-6">Integrity</h3>
                <p className="text-earth-muted text-base leading-relaxed mb-6">
                  ICOM conducts its business in accordance with its strict Code of Ethics. Our code represents our most influential and lasting contribution to regional and global museum professionalism, training, and practice, guiding cultural stewards in preserving tangible and intangible heritage.
                </p>
              </div>
              <div className="pt-6 border-t border-earth-accent/10 text-xs text-earth-accent font-bold tracking-widest uppercase mt-4">
                Ethical Standards
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-earth-accent/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-earth-accent text-xs font-bold tracking-widest uppercase mb-4 block">VALUE 03</span>
                <h3 className="font-serif text-3xl font-semibold text-earth-dark mb-6">Professionalism</h3>
                <p className="text-earth-muted text-base leading-relaxed mb-6">
                  Through national and international committees, our Code of Ethics, and dedicated professional development, publications, and global conferences, ICOM supports museum professionalism in all its aspects, recognizing the growing practical scope of of cultural work.
                </p>
              </div>
              <div className="pt-6 border-t border-earth-accent/10 text-xs text-earth-accent font-bold tracking-widest uppercase mt-4">
                Development & Expertise
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our History, Significance & Digital Platform Section */}
      <section className="py-20 md:py-32 bg-white border-t border-earth-dark/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-20">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl text-earth-dark mb-6">Our History & Legacy</h2>
              <p className="text-earth-muted text-lg leading-relaxed mb-6">
                ICOM Uganda was established as a National Committee of the International Council of Museums to represent the interests of museum and heritage professionals across the country. Over the years, we have grown into a central pillar for Uganda’s cultural sector, creating platforms for dialogue, professional development, and advocacy. From our early days supporting local community museums to organizing flagship national events, ICOM Uganda has remained steadfast in its commitment to elevating the role of museums in society.
              </p>
              <p className="text-earth-muted text-lg leading-relaxed">
                By serving as the vital link between Uganda's rich local heritage and the global ICOM network, we have successfully facilitated international partnerships, championed ethical museum practices, and spearheaded initiatives that combat the illicit trafficking of cultural objects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-serif text-4xl text-earth-dark mb-6">The Significance of Our Work</h2>
              <p className="text-earth-muted text-lg leading-relaxed mb-8">
                Cultural heritage is more than a collection of artifacts; it is the fabric of our identity, memory, and shared humanity. In a rapidly changing world, ICOM Uganda plays a critical role in <strong>safeguarding both tangible and intangible heritage</strong> for future generations.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <li className="bg-stone p-8 rounded-3xl border border-earth-dark/5 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-earth-dark mb-3 flex items-center gap-3"><Target className="w-6 h-6 text-earth-accent" /> Cultural Preservation</h4>
                  <p className="text-sm text-earth-muted leading-relaxed">Protecting endangered artifacts and documenting oral histories, traditions, and indigenous knowledge to prevent their loss over time.</p>
                </li>
                <li className="bg-stone p-8 rounded-3xl border border-earth-dark/5 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-earth-dark mb-3 flex items-center gap-3"><Users className="w-6 h-6 text-earth-accent" /> Community Empowerment</h4>
                  <p className="text-sm text-earth-muted leading-relaxed">Transforming museums into vibrant community hubs that educate, inspire, and drive social cohesion among local populations.</p>
                </li>
                <li className="bg-stone p-8 rounded-3xl border border-earth-dark/5 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-earth-dark mb-3 flex items-center gap-3"><Globe className="w-6 h-6 text-earth-accent" /> Global Dialogue</h4>
                  <p className="text-sm text-earth-muted leading-relaxed">Bridging local Ugandan narratives with international audiences to foster mutual understanding, respect, and cross-cultural exchange.</p>
                </li>
                <li className="bg-stone p-8 rounded-3xl border border-earth-dark/5 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-earth-dark mb-3 flex items-center gap-3"><Shield className="w-6 h-6 text-earth-accent" /> Advocacy</h4>
                  <p className="text-sm text-earth-muted leading-relaxed">Advising policymakers on heritage laws, championing ethical standards, and advocating for vital museum funding and infrastructure.</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-earth-dark text-white rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-woven-teal) 0, var(--color-woven-teal) 2px, transparent 2px, transparent 10px), repeating-linear-gradient(-45deg, var(--color-woven-peach) 0, var(--color-woven-peach) 2px, transparent 2px, transparent 10px)' }}></div>
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-woven-teal/30 rounded-full filter blur-[80px]"></div>
              
              <div className="relative z-10">
                <span className="eyebrow py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white mb-6 backdrop-blur-md">
                  Our Digital Presence
                </span>
                <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight">The ICOM Uganda <br className="hidden md:block"/>Digital Platform</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6 font-light">
                  The ICOM Uganda Digital Platform is a transformative step towards modernizing how we interact with our cultural heritage. It serves as a comprehensive, accessible hub that weaves together our vibrant collections, professional networks, and educational resources.
                </p>
                <p className="text-white/90 text-lg leading-relaxed font-light">
                  By offering immersive virtual tours, real-time updates on exhibitions, and a collaborative network for museum professionals, the platform ensures that Uganda's rich legacy is not only preserved but actively lives on in the digital age—connecting diverse audiences and uniting our world through shared history and innovative technology.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Museum Fair 2026 - Woven In Time */}
      <section className="py-24 bg-stone/30 border-y border-stone relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow py-1.5 px-4 rounded-full bg-earth-accent/10 border border-earth-accent/20 text-earth-accent mb-4">
              The Flagship Event
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-earth-dark mb-6">Museum Fair 2026</h2>
            <p className="text-earth-muted text-lg">
              Launched in 2025 as a pre-event to International Museum Day (IMD), the Museum Fair brings museums, professionals, and creatives together in one shared space to showcase collections and stories.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone">
              <h3 className="font-serif text-3xl text-earth-dark mb-4">Exhibition: "WOVEN in Time"</h3>
              <p className="text-earth-muted mb-6 leading-relaxed">
                In commemoration of International Museum Day 2026, ICOM Uganda will host the 2nd Edition of the Museum Fair at <strong>Emin Pasha Hotel, Nakasero, Kampala</strong>, from <strong>12th–14th May 2026</strong>.
              </p>
              <p className="text-earth-muted mb-8 leading-relaxed">
                Aligned with the IMD 2026 theme, <em>"Museums Uniting a Divided World"</em>, each participating museum contributes a thread—an artefact, narrative, or creative expression reflecting memory, identity, unity, and connection. Together, these threads form an immersive exhibition encouraging visitors to reflect on shared humanity.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-earth-dark/5 flex items-center justify-center shrink-0">
                    <Calendar className="text-earth-dark w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-earth-dark">Key Dates</h5>
                    <p className="text-sm text-earth-muted mt-1">Fair: 12-14 May 2026<br/>D-Day Pop-Up: 18 May 2026, Jinja</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-earth-dark/5 flex items-center justify-center shrink-0">
                    <MapPin className="text-earth-dark w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-earth-dark">Location</h5>
                    <p className="text-sm text-earth-muted mt-1">Emin Pasha Hotel<br/>Nakasero, Kampala</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-earth-dark text-white rounded-3xl p-8 shadow-xl">
                <h4 className="font-bold text-xl mb-4">IMD 2026 Theme</h4>
                <blockquote className="font-serif text-2xl italic text-earth-accent-bright mb-4">
                  "Museums Uniting a Divided World"
                </blockquote>
                <p className="text-white/80 text-sm">
                  Highlighting the role of museums as bridges across cultural, social, and geopolitical divides. <br/>
                  <br/>
                  <strong>SDG Goals Supported:</strong><br/>
                  • SDG 10: Reduced Inequalities<br/>
                  • SDG 16: Peace & Justice<br/>
                  • SDG 17: Partnerships
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Membership */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Membership */}
            <div>
              <h2 className="font-serif text-4xl text-earth-dark mb-6">Join ICOM Uganda</h2>
              <p className="text-earth-muted mb-8 leading-relaxed">
                Connect with over 50,000 museum professionals across 130+ countries. Open to active/retired professionals, students in heritage studies, and institutions.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: Globe, title: "Global Networking", text: "Join an international community of professionals." },
                  { icon: Award, title: "Professional Growth", text: "Access training, literature, and events." },
                  { icon: Shield, title: "Advocacy", text: "Support museums at risk and combat illicit trafficking." },
                  { icon: Ticket, title: "Global Access", text: "Free or discounted entry to global museums via the ICOM Card." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-earth-accent/10 flex items-center justify-center shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-earth-accent" />
                    </div>
                    <div>
                      <h5 className="font-bold text-earth-dark">{item.title}</h5>
                      <p className="text-sm text-earth-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-stone rounded-2xl">
                <h5 className="font-bold text-earth-dark mb-2">How to Apply</h5>
                <ol className="list-decimal list-inside text-sm text-earth-muted space-y-2">
                  <li>Download the membership application form.</li>
                  <li>Submit to <a href="mailto:icomuganda@gmail.com" className="text-earth-accent hover:underline">icomuganda@gmail.com</a> with your museum ID and CV.</li>
                  <li>Await Board review and fee payment guidance.</li>
                  <li>Receive your official ICOM Membership Card!</li>
                </ol>
              </div>
            </div>

            {/* Partnerships */}
            <div>
              <h2 className="font-serif text-4xl text-earth-dark mb-6">Partnership Opportunities</h2>
              <p className="text-earth-muted mb-8 leading-relaxed">
                ICOM Uganda welcomes collaboration from government agencies, development partners, the private sector, and media houses.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="border border-stone rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-earth-dark mb-2">Areas of Collaboration</h5>
                  <ul className="list-disc list-inside text-sm text-earth-muted space-y-1">
                    <li>Co-creation of programmes</li>
                    <li>Technical & institutional support</li>
                    <li>Media partnerships</li>
                    <li>Knowledge-sharing</li>
                  </ul>
                </div>
                <div className="border border-stone rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-earth-dark mb-2">Partner Benefits</h5>
                  <ul className="list-disc list-inside text-sm text-earth-muted space-y-1">
                    <li>Brand visibility at IMD 2026</li>
                    <li>Direct audience engagement</li>
                    <li>Align with global heritage</li>
                    <li>Support social impact</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-earth-dark text-white rounded-3xl p-8">
                <h3 className="font-serif text-2xl mb-4">Contact ICOM Uganda</h3>
                <div className="space-y-4">
                  <a href="mailto:icomuganda@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-earth-accent" />
                    icomuganda@gmail.com
                  </a>
                  <div className="flex items-start gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-earth-accent shrink-0 mt-1" />
                    <p>P.O. Box 16708, Wandegeya,<br />Kampala, Uganda</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-4">Connect with us</p>
                  <div className="flex gap-4">
                    {['LinkedIn', 'Facebook', 'Instagram', 'X', 'TikTok'].map((social) => (
                      <a key={social} href="#" className="text-sm font-medium hover:text-earth-accent transition-colors">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
