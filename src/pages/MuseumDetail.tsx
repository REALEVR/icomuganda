import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, ExternalLink, Ticket } from "lucide-react";
import { SEO } from "../components/SEO";
import { MUSEUMS_DATA } from "../data/museums";
import { motion } from "framer-motion";

export function MuseumDetail() {
  const { id } = useParams<{ id: string }>();
  const museum = MUSEUMS_DATA.find((m) => m.id === Number(id));

  if (!museum) {
    return (
      <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-serif text-5xl text-earth-dark mb-4">Museum Not Found</h1>
        <p className="text-earth-muted mb-8">The museum you are looking for does not exist or has been removed.</p>
        <Link to="/museums" className="px-8 py-4 rounded-full bg-earth-accent text-white font-semibold hover:bg-earth-dark transition-colors">
          Return to Directory
        </Link>
      </div>
    );
  }

  const museumSchema = {
    "@context": "https://schema.org",
    "@type": "Museum",
    "name": museum.name,
    "description": museum.detailedDescription,
    "image": museum.img,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": museum.region,
      "addressCountry": "UG"
    },
    ...((museum as any).website && { "url": (museum as any).website })
  };

  return (
    <div className="bg-warm-white min-h-screen">
      <SEO 
        title={`${museum.name} | ICOM Uganda`} 
        description={museum.description} 
        schema={museumSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Museums", url: typeof window !== 'undefined' ? `${window.location.origin}/museums` : '' },
          { name: museum.name, url: typeof window !== 'undefined' ? window.location.href : '' }
        ]}
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={museum.img} alt={museum.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-earth-dark/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-16">
          <Link to="/museums" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-8 transition-colors uppercase tracking-widest text-xs w-max bg-earth-dark/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 bg-white text-earth-dark rounded-full uppercase tracking-wider">
              {museum.type}
            </span>
            {museum.tags.map(tag => (
              <span key={tag} className="text-xs font-medium bg-earth-dark/40 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20 hidden sm:inline-block">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">{museum.name}</h1>
          <div className="flex items-center gap-2 text-lg text-white/90 font-medium">
            <MapPin className="w-5 h-5" /> {museum.region}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <h2 className="font-serif text-4xl text-earth-dark mb-6">About the Museum</h2>
            <div className="prose prose-lg prose-earth mb-12">
              <p className="text-earth-muted leading-relaxed whitespace-pre-line text-lg">
                {museum.detailedDescription}
              </p>
            </div>

            <h3 className="font-serif text-3xl text-earth-dark mb-8">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {museum.gallery.map((img, i) => (
                <div key={i} className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${i === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square'}`}>
                  <img src={img} alt={`${museum.name} gallery image ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-3xl border border-stone shadow-sm"
            >
              <h3 className="font-serif text-2xl text-earth-dark mb-6 border-b border-earth-dark/10 pb-4">Visitor Information</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-earth-dark font-bold mb-3 uppercase tracking-widest text-xs">
                    <Clock className="w-4 h-4 text-earth-accent" /> Operating Hours
                  </div>
                  <ul className="space-y-2">
                    {museum.operatingHours.map((hours, i) => (
                      <li key={i} className="flex justify-between text-sm text-earth-muted">
                        <span className="font-medium">{hours.day}</span>
                        <span>{hours.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {museum.admission && (
                  <div>
                    <div className="flex items-center gap-2 text-earth-dark font-bold mb-3 uppercase tracking-widest text-xs pt-4 border-t border-earth-dark/10">
                      <Ticket className="w-4 h-4 text-earth-accent" /> Admission
                    </div>
                    <p className="text-sm text-earth-muted">{museum.admission}</p>
                  </div>
                )}
                
                {(museum as any).website && (
                  <div className="pt-4 border-t border-earth-dark/10">
                    <a 
                      href={(museum as any).website}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-xl flex justify-center items-center gap-2 bg-earth-accent text-white font-semibold hover:bg-earth-dark transition-colors"
                    >
                      Visit Official Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl border border-stone shadow-sm"
            >
              <h3 className="font-serif text-2xl text-earth-dark mb-6 border-b border-earth-dark/10 pb-4">Location</h3>
              <p className="text-earth-muted text-sm mb-4 leading-relaxed">{museum.location}</p>
              
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone">
                <iframe 
                  src={museum.mapEmbed}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${museum.name} Location`}
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
