import { Link } from "react-router-dom";
import { ArrowRight, MapPin, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "../components/SEO";
import photos from "../data/photos.json";
import { useState, useEffect } from "react";
import img2 from "../assets/images/regenerated_image_1778567221004.jpg";
import img3 from "../assets/images/regenerated_image_1778567222303.jpg";
import img4 from "../assets/images/regenerated_image_1778567223387.jpg";
import page4Img from "../assets/images/page-4.jpg";
import img1Img from "../assets/images/img1.jpg";
import img2Img from "../assets/images/img2.jpg";
import uraMuseumImg from "../assets/images/ura-museum.jpg";
import uppcImg from "../assets/images/uppc.jpg";
import { ChatFeedback } from "../components/ChatFeedback";
import { MUSEUMS_DATA } from "../data/museums";
import { UPLOADED_IMAGES } from "../data/uploadedImages";
import { HeroDefi } from "../components/HeroDefi";

export function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "ICOM Uganda",
        "description": "Uganda’s leading digital infrastructure for museums and cultural heritage.",
        "url": typeof window !== 'undefined' ? window.location.origin : '',
      },
      {
        "@type": "WebSite",
        "name": "ICOM Uganda Digital Platform",
        "url": typeof window !== 'undefined' ? window.location.origin : '',
      }
    ]
  };

  return (
    <div className="flex flex-col">
      <SEO 
        title="Home | ICOM Uganda Digital Platform" 
        description="Uganda’s leading digital infrastructure for museums and cultural heritage. Explore the largest digital repository of Ugandan artifacts, virtual exhibitions, and cultural knowledge." 
        schema={organizationSchema}
      />
      
      {/* Hero Section */}
      <HeroDefi />

      {/* Exhibitor's Message - Woven in Time */}
      <section className="py-24 bg-earth-dark text-warm-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-earth-accent font-semibold tracking-widest uppercase text-sm mb-4">Exhibitor's Message</h3>
              <h2 className="font-serif text-5xl md:text-6xl font-medium mb-8">Woven in Time</h2>
              <div className="space-y-6 text-lg text-white/80 font-light leading-relaxed">
                <p>
                  "Woven in Time represents our collective journey as a nation. These pieces highlight the intricate threads of our cultural fabric, bridging the ancestral with the contemporary."
                </p>
                <p>
                  Every piece tells a story of resilience, artistry, and tradition. We invite you to explore this thematic collection, curated exclusively for our digital explorers to celebrate Uganda's enduring legacy.
                </p>
              </div>
              <div className="mt-10">
                 <Link to="/media" className="inline-flex flex-row items-center gap-3 text-white uppercase tracking-widest text-sm font-semibold hover:text-earth-accent transition-colors border-b border-white/30 hover:border-earth-accent pb-1">
                    Explore Theme <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4 h-[500px]">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="col-span-1 row-span-2 rounded-[2rem] overflow-hidden shadow-2xl relative group"
               >
                 <img src={UPLOADED_IMAGES[10]} alt="Woven in Time Exhibition 1" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="col-span-1 rounded-[2rem] overflow-hidden shadow-2xl relative group bg-stone"
               >
                 <img src={UPLOADED_IMAGES[11]} alt="Woven in Time Exhibition 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </motion.div>
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 }}
                 className="col-span-1 rounded-[2rem] overflow-hidden shadow-2xl relative group bg-stone"
               >
                 <img src={UPLOADED_IMAGES[12]} alt="Woven in Time Exhibition 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions & Events - Rijksmuseum What's On Style */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-12 border-b border-earth-dark/10 pb-6">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-earth-dark">What's On</h2>
            <Link to="/events" className="hidden md:flex items-center gap-2 text-earth-dark uppercase tracking-widest text-sm font-semibold hover:text-earth-accent transition-colors">
              All events & exhibitions <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
            <div className="md:col-span-7 group cursor-pointer" onClick={() => window.location.href = '/events'}>
              <div className="aspect-[4/3] overflow-hidden rounded-[32px] mb-8 bg-stone">
                <img src="/imd-poster.jpg" alt="International Museum Day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-earth-accent font-semibold mb-3 tracking-widest uppercase text-sm">Exhibition</h3>
              <h4 className="font-serif text-3xl md:text-5xl text-earth-dark mb-4 group-hover:text-woven-teal transition-colors leading-tight">Museums Uniting a Divided World</h4>
              <p className="text-earth-muted text-lg lg:text-xl leading-relaxed max-w-2xl">Join us on May 18, 2026, as we celebrate International Museum Day. Experience a series of exhibitions, workshops, and cultural performances designed to foster dialogue.</p>
            </div>
            
            <div className="md:col-span-5 flex flex-col gap-12">
              <div className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden rounded-[24px] mb-6 bg-stone">
                    <img src={page4Img} alt="Families and children" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-earth-muted font-semibold mb-2 tracking-widest uppercase text-xs">Activities</h3>
                <h4 className="font-serif text-2xl md:text-3xl text-earth-dark mb-3 group-hover:text-woven-teal transition-colors">Families & Children</h4>
                <p className="text-earth-muted text-base leading-relaxed">Interactive tours, creative workshops, and heritage games tailored for the young explorers.</p>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden rounded-[24px] mb-6 bg-stone">
                  <img src={uraMuseumImg} alt="Collection Highlights" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-earth-muted font-semibold mb-2 tracking-widest uppercase text-xs">Guided Tours</h3>
                <h4 className="font-serif text-2xl md:text-3xl text-earth-dark mb-3 group-hover:text-woven-teal transition-colors">Masterpieces of Uganda</h4>
                <p className="text-earth-muted text-base leading-relaxed">Discover the highlights of our cultural heritage in an expert-led guided journey.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center md:hidden border-t border-earth-dark/10 pt-8">
            <Link to="/events" className="flex items-center gap-2 text-earth-dark border border-earth-dark/20 px-6 py-3 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-earth-dark hover:text-white transition-colors">
              All events & exhibitions
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Museums */}
      <section className="py-24 bg-warm-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8 md:mb-16">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-earth-dark mb-4">Featured Institutions</h2>
              <p className="text-earth-muted text-lg max-w-xl">Curated collections exploring the heart and history of our nation.</p>
            </div>
            <Link to="/museums" className="hidden md:flex items-center gap-2 text-earth-accent uppercase tracking-widest text-sm font-semibold hover:opacity-80 transition-opacity">
              View Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative flex justify-center items-center py-20 min-h-[500px] md:min-h-[700px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="relative w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border border-earth-dark/10 shadow-sm"
            >
              {MUSEUMS_DATA.map((museum, i, arr) => {
                const angle = (i / arr.length) * 360;
                return (
                  <div
                    key={museum.id}
                    className="absolute top-1/2 left-1/2 w-16 h-16 md:w-24 md:h-24 -mt-8 -ml-8 md:-mt-12 md:-ml-12"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-220%) rotate(-${angle}deg)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md bg-white flex flex-col items-center justify-center p-1 group cursor-pointer"
                      onClick={() => window.location.href = `/museums/${museum.id}`}
                    >
                      <img src={museum.img} alt={museum.name} className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none flex flex-col items-center">
                <span className="font-serif text-2xl md:text-4xl text-earth-dark/40 font-black tracking-widest uppercase mb-1 md:mb-2">Network</span>
                <span className="text-earth-muted/50 text-xs md:text-sm tracking-widest uppercase">Explore</span>
            </div>
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/museums" className="flex items-center gap-2 text-earth-accent uppercase tracking-widest text-xs font-semibold">
              View Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Participating Museums & Partners */}
      <section className="py-16 md:py-24 bg-white border-b border-earth-dark/10 overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-earth-dark mb-4 drop-shadow-sm">Participating Museums & Partners</h2>
            <p className="text-earth-muted max-w-2xl mx-auto font-light">Proudly collaborating with cultural institutions, digital innovators, and international bodies to unify Uganda's heritage.</p>
          </div>
        </div>
        
        {/* Infinite Sliding Track */}
        <div className="relative w-full overflow-hidden flex items-center py-10">
          {/* Gradient masks for smooth fading at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          <motion.div 
            className="flex items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          >
            {[...Array(2)].map((_, arrayIndex) => (
              <div key={arrayIndex} className="flex shrink-0 items-center gap-24 md:gap-40 px-12 md:px-20">
                {MUSEUMS_DATA.map((museum, i) => (
                  <motion.div
                    key={`${arrayIndex}-${i}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1.5, opacity: 1 }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex-shrink-0"
                  >
                    <img 
                      src={museum.logo || museum.img} 
                      alt={museum.name} 
                      className="h-24 md:h-32 w-auto object-contain mix-blend-multiply opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" 
                    />
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Virtual Tours Spotlight */}
      <section className="py-24 bg-stone relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-5xl font-medium text-earth-dark mb-6">Immersive <br /> Heritage</h2>
              <p className="text-earth-dark/70 text-lg mb-8 leading-relaxed">
                Step inside Uganda's most prominent heritage sites from anywhere in the world. Our 360° VR experiences bring artifacts, architecture, and history to life with curated audio guides and interpretative overlays.
              </p>
              <ul className="space-y-4 mb-10 text-earth-dark/80 font-medium">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-earth-accent/20 flex items-center justify-center text-earth-accent">01</div>
                  High-Fidelity 360° Visuals
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-earth-accent/20 flex items-center justify-center text-earth-accent">02</div>
                  Curator Audio Narrations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-earth-accent/20 flex items-center justify-center text-earth-accent">03</div>
                  Interactive Artifact Hotspots
                </li>
              </ul>
              <Link
                to="/virtual-tours"
                className="bg-earth-dark text-warm-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-earth-dark/90 transition-all inline-flex items-center gap-2"
              >
                Browse All Tours
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden relative shadow-2xl group cursor-pointer block" onClick={() => window.location.href = '/virtual-tours'}>
                <iframe 
                  src="https://realevr.com/MUSEUM%20FAIR/" 
                  className="w-full h-full border-0 absolute pointer-events-none"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  tabIndex={-1}
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-20 h-20 rounded-full bg-earth-accent/80 backdrop-blur-md flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg cursor-pointer pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                    <PlayCircle className="w-10 h-10" />
                  </span>
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-earth-accent/30 -z-10" />
              <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-earth-dark/10 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-24 bg-warm-white border-t border-earth-dark/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-earth-dark mb-4">Captured Moments</h2>
              <p className="text-earth-muted text-lg max-w-xl">A glimpse into the diverse collections and events across our network.</p>
            </div>
            <Link to="/media" className="hidden md:flex items-center gap-2 text-earth-accent uppercase tracking-widest text-sm font-semibold hover:opacity-80 transition-opacity">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/media" 
              className="block relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all col-span-2 lg:col-span-2 aspect-video"
            >
              <video src="/museumfair-2026.mp4.36.27 PM.mp4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" autoPlay muted loop playsInline />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  Watch Video <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link 
              to="/media" 
              className="block relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all col-span-1 lg:col-span-1 aspect-square lg:aspect-video"
            >
              <img src={img1Img} alt="Featured gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  View Image <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link 
              to="/media" 
              className="block relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all col-span-1 lg:col-span-1 aspect-square lg:aspect-video"
            >
              <img src={img2Img} alt="Featured gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  View Image <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
            <Link 
              to="/media" 
              className="block relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all col-span-2 lg:col-span-2 aspect-video"
            >
              <img src={uppcImg} alt="Featured gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  View Image <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/media" className="flex items-center gap-2 text-earth-dark border border-stone px-6 py-3 rounded-xl uppercase tracking-widest text-xs font-semibold hover:bg-stone transition-colors">
              Browse Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Uganda Videos Spotlight */}
      <section className="py-24 bg-white border-t border-earth-dark/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-earth-dark mb-4">Discover Uganda</h2>
            <p className="text-earth-muted text-lg max-w-xl mx-auto">Explore our rich heritage and breathtaking culture through video.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-video lg:aspect-auto lg:row-span-2 rounded-3xl overflow-hidden shadow-lg border border-stone relative group bg-black">
              <video 
                src="/museumfair-2026.mp4.36.27 PM.mp4" 
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
              <div className="absolute top-4 left-4 bg-earth-accent text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow z-10">
                Featured
              </div>
            </div>
            <div className="aspect-video lg:aspect-auto lg:row-span-2 rounded-3xl overflow-hidden shadow-lg border border-stone">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/fRePmHNqVRE?si=eoQVqXI9AT3AIutR" 
                title="Discover Uganda Short" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="w-full h-full min-h-[400px]"
              ></iframe>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-stone">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9dLw9aRa40c?si=V8Ggw9j54q5wxOuc" 
                title="Uganda Museum" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-stone">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/6zhIdzbLjhA?si=8afMIsKwbtzmoO8I" 
                title="Visit Uganda" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-stone">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/1SthF3CdsEI?si=NxeAeE5Geqs7ot0F" 
                title="Uganda Museum Tour" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Community Feedback */}
      <section className="py-24 bg-stone border-t border-earth-dark/10">
        <div className="container mx-auto px-6">
          <ChatFeedback />
        </div>
      </section>

      {/* Support / Donate CTA */}
      <section className="py-32 bg-earth-accent text-warm-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl font-medium mb-6">Support Uganda's Legacy</h2>
            <p className="text-xl text-warm-white/90 font-light mb-10 max-w-2xl mx-auto">
              Your contributions enable vital digitization efforts, conservation projects, and educational outreach accessible to all.
            </p>
            <Link
              to="/donate"
              className="bg-warm-white text-earth-accent px-10 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white transition-all inline-block shadow-xl"
            >
              Make a Donation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
