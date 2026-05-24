import { MapPin, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { MUSEUMS_DATA } from "../data/museums";

export function Museums() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Museums Directory | ICOM Uganda",
    "description": "Discover a comprehensive archive of Uganda’s cultural institutions, exploring national, regional, and privately-owned community museums.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": MUSEUMS_DATA.map((museum, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Museum",
          "name": museum.name,
          "image": museum.img,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": museum.region,
            "addressCountry": "UG"
          }
        }
      }))
    }
  };

  return (
    <div className="bg-warm-white min-h-screen">
      <SEO 
        title="Museums Directory | ICOM Uganda" 
        description="Discover a comprehensive archive of Uganda’s cultural institutions, exploring national, regional, and privately-owned community museums." 
        schema={collectionSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Museums", url: typeof window !== 'undefined' ? `${window.location.origin}/museums` : '' }
        ]}
      />
      {/* Header */}
      <div className="bg-warm-white text-earth-dark py-20 px-6 border-b border-earth-dark/10">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Directory of Museums</h1>
          <p className="text-lg text-earth-dark/70 max-w-2xl mx-auto">
            Discover a comprehensive archive of Uganda’s cultural institutions, exploring national, regional, to privately-owned community museums.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search & Filter Bar - Aesthetic */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search museums by name or keyword..." 
              className="w-full pl-12 pr-4 py-4 rounded-full border border-stone bg-white focus:outline-none focus:ring-2 focus:ring-earth-accent/50 transition-shadow"
            />
          </div>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-stone bg-white font-medium text-earth-dark hover:bg-stone/50 transition-colors">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MUSEUMS_DATA.map((museum) => (
            <Link key={museum.id} to={`/museums/${museum.id}`} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={museum.img} alt={museum.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-earth-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {museum.type}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-earth-muted mb-3">
                  <MapPin className="w-3 h-3" /> {museum.region}
                </div>
                <h3 className="font-serif text-2xl font-medium text-earth-dark mb-2">{museum.name}</h3>
                <p className="text-earth-muted text-sm line-clamp-3 mb-4 flex-1">{museum.description}</p>
                
                <div className="mt-auto flex flex-wrap gap-2 mb-4">
                  {museum.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-stone/50 text-earth-dark px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto text-center w-full py-3 rounded-xl border border-earth-dark text-earth-dark font-bold uppercase tracking-widest text-xs group-hover:bg-earth-dark group-hover:text-white transition-colors">
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
