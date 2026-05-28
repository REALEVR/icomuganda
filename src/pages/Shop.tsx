import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";

export function Shop() {
  const shopItems = [
    {
      id: 1,
      name: "#MUSEUMFAIR2026 White T-Shirt",
      type: "Apparel",
      img: "/regenerated_image_1779968683074.jpg",
      description: "Premium white cotton t-shirt featuring the #MUSEUMFAIR2026 and ICOM Uganda branding."
    },
    {
      id: 2,
      name: "#MUSEUMFAIR2026 Black T-Shirt",
      type: "Apparel",
      img: "/regenerated_image_1779968684237.jpg",
      description: "Elegant black cotton t-shirt featuring the #MUSEUMFAIR2026 and ICOM Uganda branding."
    },
    {
      id: 3,
      name: "ICOM Uganda Wooden Keychain",
      type: "Accessories",
      img: "/regenerated_image_1779968685565.jpg",
      description: "Beautiful silver metallic keychain featuring an engraved wooden insert."
    },
    {
      id: 4,
      name: "ICOM Uganda Metallic Keychain",
      type: "Accessories",
      img: "/regenerated_image_1779968691127.jpg",
      description: "Sleek metallic keychain engraved with the official ICOM Uganda letters."
    },
    {
      id: 5,
      name: "ICOM Thermoflask Water Bottle",
      type: "Drinkware",
      img: "/regenerated_image_1779968692113.jpg",
      description: "Blue metallic thermoflask water bottle printed with ICOM Uganda and international council of museums."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-warm-white">
      <SEO 
        title="Curator's Shop | ICOM Uganda" 
        description="Shop official ICOM Uganda merchandise, curator tools, and exhibition memorabilia." 
      />
      
      {/* Header */}
      <section className="bg-earth-dark text-warm-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-woven-teal) 0, var(--color-woven-teal) 2px, transparent 2px, transparent 10px)' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-medium mb-6">Curator's Shop</h1>
          <p className="text-xl md:text-2xl font-light text-warm-white/80 max-w-2xl mx-auto">
            Bring home a piece of history. Shop official ICOM merchandise, exhibition catalogs, and exclusive memorabilia.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-serif text-earth-dark">All Items ({shopItems.length})</h2>
            <div className="flex gap-4">
              <span className="text-sm font-semibold tracking-widest uppercase text-earth-muted">Filter: All</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {shopItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl p-6 shadow-sm border border-stone hover:shadow-xl transition-all flex flex-col h-full cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden bg-stone mb-6 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-earth-dark">
                    {item.type}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-xl font-medium text-earth-dark pr-4">{item.name}</h3>
                  </div>
                  <p className="text-earth-muted text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <a 
                    href={`https://wa.me/256704879520?text=${encodeURIComponent("I'm interested in purchasing the " + item.name + " from the Curator's Shop.")}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3 md:py-4 rounded-xl border border-earth-dark text-earth-dark font-bold uppercase tracking-widest text-xs hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Inquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Support Banner */}
      <section className="py-20 bg-earth-muted text-warm-white">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">Every Purchase Supports Our Mission</h2>
          <p className="text-lg text-warm-white/80 mb-10">
            100% of the proceeds from the Curator's Shop go directly towards digitizing Uganda's vulnerable cultural artifacts and funding community museum grants.
          </p>
          <Link to="/about" className="text-white border-b border-white pb-1 font-semibold hover:text-earth-dark hover:border-earth-dark transition-colors inline-flex items-center gap-2 uppercase tracking-widest text-sm">
            Learn About Our Mission <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
