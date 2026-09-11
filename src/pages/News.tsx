import { useState } from "react";
import { Calendar, User } from "lucide-react";
import { SEO } from "../components/SEO";

const MOCK_NEWS = [
  {
    id: 1,
    title: "ICOM Uganda Launches Digital Heritage Platform",
    date: "Oct 15, 2024",
    author: "Admin",
    category: "Press",
    img: "/icom-logo.png",
    excerpt: "ICOM Uganda unveils a new digital platform bringing member museums, virtual tours, and the national heritage archive together in one place, online and free to access.",
  },
  {
    id: 2,
    title: "Conservation Workshop: Restoring Ancient Bark Cloth",
    date: "Oct 10, 2024",
    author: "Dr. Jane Doe",
    category: "Conservation",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a2/International_Council_of_Museums_%28ICOM%29_-_Flickr_-_Al_Jazeera_English.jpg",
    excerpt: "A three-day hands-on workshop trained regional curators in traditional and modern techniques for stabilising and restoring Uganda's UNESCO-recognised bark cloth artifacts.",
  },
  {
    id: 3,
    title: "New Virtual Exhibit: Museum Fair 2026",
    date: "Oct 05, 2024",
    author: "Tech Team",
    category: "Press",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/The_Uganda_Museum_Main_Entrance.JPG/1280px-The_Uganda_Museum_Main_Entrance.JPG",
    excerpt: "A first look at the immersive 360° exhibit being built for Museum Fair 2026, letting visitors anywhere in the world walk through \"Woven in Time\" before doors open.",
  },
  {
    id: 4,
    title: "Annual General Meeting 2024 Conclusions",
    date: "Sep 28, 2024",
    author: "Secretariat",
    category: "Research",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg",
    excerpt: "Members convened to review the year's conservation grants, elect new committee representatives, and set priorities for the East African Museum Network's launch.",
  }
];

const CATEGORIES = ["All", "Press", "Conservation", "Research"];

export function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredNews = activeCategory === "All" ? MOCK_NEWS : MOCK_NEWS.filter((n) => n.category === activeCategory);

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "News & Publications | ICOM Uganda",
    "description": "Read stories, research, and updates straight from the heart of Uganda's museum institutions.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": MOCK_NEWS.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "NewsArticle",
          "headline": item.title,
          "image": item.img,
          "datePublished": new Date(item.date).toISOString(),
          "author": {
            "@type": "Person",
            "name": item.author
          }
        }
      }))
    }
  };

  return (
    <div className="bg-warm-white min-h-screen py-20 px-6">
      <SEO 
        title="News & Publications | ICOM Uganda" 
        description="Read stories, research, and updates straight from the heart of Uganda's museum institutions." 
        schema={newsSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "News", url: typeof window !== 'undefined' ? `${window.location.origin}/news` : '' }
        ]}
      />
      <div className="container mx-auto max-w-6xl">
        {/* Featured Poster Banner - Woven In Time */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-woven-teal animate-pulse"></span>
            <span className="text-earth-muted font-bold tracking-widest uppercase text-xs">Featured Upcoming Event</span>
          </div>
          <section className="bg-earth-dark p-6 md:p-10 overflow-hidden relative rounded-3xl shadow-xl">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-woven-teal) 0, var(--color-woven-teal) 2px, transparent 2px, transparent 10px), repeating-linear-gradient(-45deg, var(--color-woven-peach) 0, var(--color-woven-peach) 2px, transparent 2px, transparent 10px)' }}></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="block w-full max-w-3xl transform transition-transform hover:scale-[1.01] duration-500 shadow-2xl rounded-lg overflow-hidden group">
                <div className="bg-[#1B2A2F] w-full aspect-[4/5] md:aspect-[3/4] relative p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                  {/* Decorative woven lines */}
                  <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-80 group-hover:scale-105 transition-transform duration-1000">
                    <div className="absolute top-[-20%] right-[10%] w-[150%] h-[20px] bg-[#F6A387] rotate-45 transform origin-right shadow-lg"></div>
                    <div className="absolute top-[-15%] right-[5%] w-[150%] h-[20px] bg-[#0D8C96] rotate-45 transform origin-right shadow-lg"></div>
                    <div className="absolute top-[-10%] right-[0%] w-[150%] h-[20px] bg-[#F8DFCE] rotate-45 transform origin-right shadow-lg"></div>
                    <div className="absolute top-[-5%] right-[-5%] w-[150%] h-[20px] bg-[#ED7154] rotate-45 transform origin-right shadow-lg"></div>
                    
                    <div className="absolute bottom-[-20%] left-[-10%] w-[150%] h-[20px] bg-[#0D8C96] -rotate-45 transform origin-left shadow-lg"></div>
                    <div className="absolute bottom-[-15%] left-[-5%] w-[150%] h-[20px] bg-[#F6A387] -rotate-45 transform origin-left shadow-lg"></div>
                    <div className="absolute bottom-[-10%] left-[0%] w-[150%] h-[20px] bg-[#ED7154] -rotate-45 transform origin-left shadow-lg"></div>
                  </div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="text-[#0D8C96] font-bold text-xl md:text-3xl tracking-tighter">#MUSEUM<br/>FAIR2026</div>
                    <div className="text-right">
                      <div className="text-warm-white font-serif text-2xl md:text-4xl tracking-tight">ICOM</div>
                      <div className="text-warm-white/70 text-[8px] md:text-xs leading-tight uppercase font-medium">international<br/>council<br/>of museums<br/>Uganda</div>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto mb-10 md:mb-16">
                    <h2 className="text-[#0D8C96] font-sans font-black text-6xl md:text-8xl leading-[0.85] tracking-tighter mix-blend-screen">WOVEN<br/>IN TIME</h2>
                    <p className="text-[#0D8C96] mt-6 tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-semibold max-w-sm mix-blend-screen">Museums uniting a divided world</p>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-baseline gap-2 md:gap-4 origin-bottom-left absolute bottom-[10%] left-[10%] md:bottom-[15%] md:left-[15%]" style={{ transform: 'rotate(-45deg)' }}>
                    <span className="text-warm-white font-bold text-3xl md:text-5xl">12-14 MAY</span>
                    <span className="text-[#F6A387] border-l border-[#F6A387] pl-2 md:pl-4 text-sm md:text-xl font-light leading-none">EMIN PASHA<br/>HOTEL<br/>NAKASERO</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-medium text-earth-dark mb-4">News & Publications</h1>
            <p className="text-lg text-earth-muted max-w-2xl">Read stories, research, and updates straight from the heart of Uganda's museum institutions.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full border font-medium text-sm transition-colors ${
                  activeCategory === tab
                    ? "bg-earth-dark border-earth-dark text-white"
                    : "border-earth-dark/10 bg-white text-earth-dark hover:bg-earth-dark/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <p className="text-earth-muted text-center py-16">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {filteredNews.map((item) => (
              <article key={item.id} className="group cursor-pointer">
                <div className="aspect-video w-full overflow-hidden rounded-3xl bg-stone mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-earth-muted mb-4 flex-wrap">
                  <span className="text-earth-accent">{item.category}</span>
                  <span className="w-1 h-1 rounded-full bg-earth-dark/30" />
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
                  <span className="w-1 h-1 rounded-full bg-earth-dark/30" />
                  <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {item.author}</span>
                </div>
                <h2 className="font-serif text-3xl font-medium text-earth-dark mb-3 group-hover:text-earth-accent transition-colors">{item.title}</h2>
                <p className="text-earth-dark/70 mb-4 line-clamp-2">{item.excerpt}</p>
                <span className="inline-flex font-medium text-sm border-b-2 border-transparent hover:border-earth-dark transition-colors">Read Article</span>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
