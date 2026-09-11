import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, MapPin, Plus, Search, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";
import { MUSEUMS_DATA, Museum } from "../data/museums";
import { listApprovedMuseums } from "../lib/museumNetwork";

export function Museums() {
  const [networkMuseums, setNetworkMuseums] = useState<Museum[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [culture, setCulture] = useState("All");

  useEffect(() => {
    let cancelled = false;
    listApprovedMuseums()
      .then((records) => {
        if (cancelled) return;
        setNetworkMuseums(
          records.map((r) => ({ ...r, id: r.id })) as unknown as Museum[]
        );
      })
      .catch((err) => console.error("Failed to load network museums", err))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const allMuseums = useMemo(() => [...MUSEUMS_DATA, ...networkMuseums], [networkMuseums]);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(allMuseums.map((m) => m.country).filter(Boolean)))],
    [allMuseums]
  );
  const cultures = useMemo(
    () => ["All", ...Array.from(new Set(allMuseums.map((m) => m.culture).filter(Boolean)))],
    [allMuseums]
  );

  const filtered = allMuseums.filter((m) => {
    const matchesSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCountry = country === "All" || m.country === country;
    const matchesCulture = culture === "All" || m.culture === culture;
    return matchesSearch && matchesCountry && matchesCulture;
  });

  const hasActiveFilters = search || country !== "All" || culture !== "All";

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Museum Network Directory | ICOM Uganda",
    "description": "The East African Museum Network — member museums categorised by country, region, and culture.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": allMuseums.map((museum, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Museum",
          "name": museum.name,
          "image": museum.img,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": museum.region,
            "addressCountry": museum.country
          }
        }
      }))
    }
  };

  return (
    <div className="bg-warm-white min-h-screen">
      <SEO
        title="Museum Network Directory | ICOM Uganda"
        description="The East African Museum Network — discover member museums across Uganda, Kenya, Tanzania, Rwanda and beyond, categorised by country, region, and culture."
        schema={collectionSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Museums", url: typeof window !== 'undefined' ? `${window.location.origin}/museums` : '' }
        ]}
      />
      {/* Header */}
      <div className="bg-warm-white text-earth-dark py-20 px-6 border-b border-earth-dark/10">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earth-accent/10 text-earth-accent mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">East African Museum Network</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Directory of Member Museums</h1>
          <p className="text-lg text-earth-dark/70 max-w-2xl mx-auto mb-8">
            A shared, member-only directory of museums across East Africa — discover institutions by country, region,
            and culture, each listing linking straight to their own website.
          </p>
          <Link
            to="/join-network"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-earth-dark text-white font-bold uppercase tracking-widest text-sm hover:bg-woven-teal transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Register Your Museum
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-4 mb-12 max-w-5xl mx-auto sticky top-[90px] z-20 bg-warm-white/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-earth-dark/5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-muted w-5 h-5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search museums by name, keyword, or theme..."
                className="w-full pl-12 pr-4 py-4 rounded-full border border-stone bg-white focus:outline-none focus:ring-2 focus:ring-earth-accent/50 transition-shadow"
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-6 py-4 rounded-full border border-stone bg-white font-medium text-earth-dark focus:outline-none focus:ring-2 focus:ring-earth-accent/50 cursor-pointer"
            >
              {countries.map((c) => <option key={c} value={c}>{c === "All" ? "All Countries" : c}</option>)}
            </select>
            <select
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
              className="px-6 py-4 rounded-full border border-stone bg-white font-medium text-earth-dark focus:outline-none focus:ring-2 focus:ring-earth-accent/50 cursor-pointer max-w-full md:max-w-[220px]"
            >
              {cultures.map((c) => <option key={c} value={c}>{c === "All" ? "All Cultures" : c}</option>)}
            </select>
            {hasActiveFilters && (
              <button
                onClick={() => { setSearch(""); setCountry("All"); setCulture("All"); }}
                className="flex items-center gap-2 px-6 py-4 rounded-full text-earth-muted hover:text-earth-dark font-medium transition-colors"
              >
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-earth-muted uppercase tracking-widest font-semibold">
            <span>{filtered.length} museum{filtered.length !== 1 ? "s" : ""} found</span>
            {loading && <span className="flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> Syncing network members...</span>}
          </div>
        </div>

        {/* Directory Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-earth-muted mb-6">No museums match your filters yet.</p>
            <Link to="/join-network" className="text-earth-accent font-semibold underline">
              Be the first to register a museum from this category →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((museum) => (
              <div key={museum.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-stone shadow-sm hover:shadow-xl transition-all duration-300">
                <Link to={`/museums/${museum.id}`} className="aspect-[4/3] overflow-hidden relative block">
                  <img src={museum.img} alt={museum.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-earth-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {museum.type}
                  </div>
                  {!museum.foundingMember && (
                    <div className="absolute top-4 left-4 bg-earth-accent/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Network Member
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-earth-muted mb-3 flex-wrap">
                    <MapPin className="w-3 h-3" /> {museum.region}{museum.country ? `, ${museum.country}` : ""}
                  </div>
                  <Link to={`/museums/${museum.id}`}>
                    <h3 className="font-serif text-2xl font-medium text-earth-dark mb-2 hover:text-earth-accent transition-colors">{museum.name}</h3>
                  </Link>
                  <p className="text-earth-muted text-sm line-clamp-3 mb-4 flex-1">{museum.description}</p>

                  <div className="mt-auto flex flex-wrap gap-2 mb-4">
                    {museum.culture && (
                      <span className="text-xs font-medium bg-earth-accent/10 text-earth-accent px-3 py-1 rounded-full">
                        {museum.culture}
                      </span>
                    )}
                    {museum.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs font-medium bg-stone/50 text-earth-dark px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/museums/${museum.id}`} className="flex-1 text-center py-3 rounded-xl border border-earth-dark text-earth-dark font-bold uppercase tracking-widest text-xs group-hover:bg-earth-dark group-hover:text-white transition-colors">
                      View Details
                    </Link>
                    {museum.website && (
                      <a
                        href={museum.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="Visit official website"
                        className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border border-earth-dark text-earth-dark hover:bg-earth-dark hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
