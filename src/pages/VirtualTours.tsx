import { PlayCircle, Globe, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

export function VirtualTours() {
  const toursSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Virtual Tours | ICOM Uganda",
    "description": "Step into environments reconstructed in high-fidelity 360-degree vision. Experience the atmosphere, artifacts, and stories from the comfort of your home.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "VisualArtwork",
            "name": "Pre-Colonial History Exhibition",
            "image": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80"
          }
        },
        ...[
          { title: "Independence Monument Pavilion", img: "https://images.unsplash.com/photo-1566127444941-8e12530db1ca?auto=format&fit=crop&q=80" },
          { title: "Kasubi Tombs Virtual Reconstruction", img: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&q=80" },
          { title: "Contemporary Ugandan Art", img: "https://images.unsplash.com/photo-1627885721387-9bc906d2e858?auto=format&fit=crop&q=80" },
          { title: "Wildlife & Ethnology Hall", img: "https://images.unsplash.com/photo-1518998053901-5362df5b91ce?auto=format&fit=crop&q=80" }
        ].map((tour, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "item": {
            "@type": "VisualArtwork",
            "name": tour.title,
            "image": tour.img
          }
        }))
      ]
    }
  };

  return (
    <div className="bg-stone min-h-screen">
      <SEO 
        title="Virtual Tours | ICOM Uganda" 
        description="Step into environments reconstructed in high-fidelity 360-degree vision. Experience the atmosphere, artifacts, and stories from the comfort of your home." 
        schema={toursSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Virtual Tours", url: typeof window !== 'undefined' ? `${window.location.origin}/virtual-tours` : '' }
        ]}
      />
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 text-earth-accent">Immersive Heritage</p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-earth-dark mb-6">Virtual Tours</h1>
          <p className="text-lg text-earth-dark/70">
            Step into environments reconstructed in high-fidelity 360-degree vision. Experience the atmosphere, artifacts, and stories from the comfort of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Featured Tour */}
          <div className="lg:col-span-2 group relative rounded-[40px] overflow-hidden aspect-[16/9] lg:aspect-[21/9] bg-black shadow-2xl flex flex-col">
            <iframe 
              src="https://realevr.com/MUSEUM%20FAIR/" 
              title="Museum Fair Virtual Tour"
              className="w-full h-full border-0 absolute inset-0 z-10"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking" 
              allowFullScreen
            ></iframe>
            {/* Overlay that lets user click to start interaction (avoids scroll stealing when embedded) */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/90 via-earth-dark/20 to-transparent p-10 flex flex-col justify-end text-warm-white pointer-events-none z-20 transition-opacity duration-500 hover:opacity-0">
              <div className="flex gap-4 mb-4">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-earth-accent/80 backdrop-blur px-3 py-1.5 rounded-full">
                  <Globe className="w-3 h-3" /> 360° VR
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest bg-white/20 backdrop-blur px-3 py-1.5 rounded-full">
                  <Headphones className="w-3 h-3" /> Immersive Mode
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-3">Museum Fair Virtual Tour</h2>
              <p className="max-w-2xl text-warm-white/80 line-clamp-2">Explore the digital exhibition seamlessly right from your browser.</p>
            </div>
          </div>

          {/* Standard Tours */}
          {[
            { title: "Independence Monument Pavilion", access: "Free", img: "https://images.unsplash.com/photo-1566127444941-8e12530db1ca?auto=format&fit=crop&q=80" },
            { title: "Kasubi Tombs Virtual Reconstruction", access: "Members Only", img: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&q=80" },
            { title: "Contemporary Ugandan Art", access: "Free", img: "https://images.unsplash.com/photo-1627885721387-9bc906d2e858?auto=format&fit=crop&q=80" },
            { title: "Wildlife & Ethnology Hall", access: "Free", img: "https://images.unsplash.com/photo-1518998053901-5362df5b91ce?auto=format&fit=crop&q=80" }
          ].map((tour, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col md:flex-row gap-6 bg-white rounded-3xl p-4 border border-stone hover:shadow-xl transition-all">
              <div className="w-full md:w-48 aspect-square rounded-2xl overflow-hidden relative flex-shrink-0">
                <img src={tour.img} alt={tour.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex flex-col justify-center py-4 pr-6 flex-1">
                <span className={`text-xs font-bold uppercase tracking-widest mb-2 ${tour.access === "Members Only" ? 'text-earth-accent' : 'text-earth-muted'}`}>
                  {tour.access}
                </span>
                <h3 className="font-serif text-2xl font-medium text-earth-dark mb-3">{tour.title}</h3>
                <Link to="#" className="mt-auto font-medium text-sm border-b border-earth-dark pb-1 inline-flex w-fit hover:text-earth-accent hover:border-earth-accent transition-colors">
                  Start Experience
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
