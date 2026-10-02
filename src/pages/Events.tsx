import { Calendar, MapPin, ExternalLink, History, Youtube } from "lucide-react";
import { SEO } from "../components/SEO";

export function Events() {
  const eventsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Events | ICOM Uganda",
    "description": "Discover upcoming and past museum events, fairs, and national holidays in Uganda.",
    "url": typeof window !== 'undefined' ? window.location.href : ''
  };

  const pastEvents = [
    {
      id: "poate",
      title: "Pearl of Africa Tourism Expo (POATE)",
      date: "May 2026",
      year: "2026",
      location: "Speke Resort, Kampala",
      description: "The Pearl of Africa Tourism Expo is East Africa's premier tourism exhibition, bringing together domestic, regional, and international tour operators, travel agents, and destination agencies.",
      externalLink: "https://poate.co.ug/",
      source: "Uganda Tourism Board (UTB)"
    },
    {
      id: "imd",
      title: "International Museum Day",
      date: "May 18, 2026",
      year: "2026",
      location: "Global / Uganda",
      description: "Organized globally by the International Council of Museums (ICOM), celebrating the role of museums in cultural exchange, enrichment, and development of mutual understanding.",
      externalLink: "https://icom.museum/en/international-museum-day/",
      source: "International Council of Museums (ICOM)"
    },
    {
      id: "museum-fair",
      title: "2026 Museum Fair",
      date: "Early 2026",
      year: "2026",
      location: "Uganda National Museum",
      description: "An incredible exhibition of Uganda's diverse heritage, featuring collections from regional museums across the country, cultural performances, and traditional crafts.",
      externalLink: "https://x.com/UGMuseum",
      source: "Uganda Department of Museums and Monuments"
    }
  ];

  const upcomingEvents = [
    {
      id: "martyrs-day",
      title: "Uganda Martyrs Day",
      date: "Jun 3, 2026",
      year: "2026",
      location: "Namugongo Martyrs Shrine, Wakiso",
      description: "An annual national holiday commemorating the late 19th-century martyrdom of a group of 45 men at Namugongo. A massive pilgrimage event drawing millions to the shrines.",
      externalLink: "https://ugandatourismboard.com/",
      source: "National Public Holidays / Uganda Tourism Board"
    }
  ];

  return (
    <div className="bg-stone min-h-screen py-20 px-6">
      <SEO 
        title="Events | ICOM Uganda" 
        description="Discover upcoming and past museum events, fairs, and national holidays in Uganda." 
        schema={eventsSchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Events", url: typeof window !== 'undefined' ? `${window.location.origin}/events` : '' }
        ]}
      />
      <div className="container mx-auto max-w-5xl">
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-earth-dark mb-6">Events & Exhibitions</h1>
        <p className="text-xl text-earth-muted mb-16 max-w-2xl">Stay updated on our cultural gatherings, international observances, and museum fairs across Uganda.</p>

        <section className="mb-20">
          <div className="bg-earth-dark rounded-[40px] p-8 md:p-12 shadow-xl border border-white/10 relative overflow-hidden text-warm-white">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Youtube className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Youtube className="w-8 h-8 text-earth-accent-bright" />
                <h2 className="font-serif text-3xl text-warm-white">Digital Showroom & Lives</h2>
              </div>
              <p className="text-warm-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                Join us on YouTube for live events, panel discussions, and digital archives of our cultural showcases. Experience the richness of Uganda's heritage from anywhere in the world.
              </p>
              <a 
                href="https://www.youtube.com/@icomuganda2536" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-earth-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-earth-accent/90 transition-colors"
              >
                Visit Our Channel <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-earth-dark/10">
            <Calendar className="w-8 h-8 text-earth-accent" />
            <h2 className="font-serif text-4xl text-earth-dark">Coming Soon</h2>
          </div>
          
          <div className="bg-warm-white rounded-[40px] p-8 md:p-12 shadow-sm border border-earth-dark/10">
            <div className="flex flex-col gap-0">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="group flex flex-col md:flex-row gap-8 py-10 first:pt-0 last:pb-0 border-b last:border-0 border-earth-dark/10">
                  <div className="md:w-32 flex-shrink-0 relative">
                    <span className="text-earth-accent font-bold uppercase tracking-widest text-sm mb-1 block">
                       {evt.year}
                    </span>
                    <span className="font-serif text-4xl md:text-5xl font-medium text-earth-dark leading-[1.1] block whitespace-pre-line">
                      {evt.date.split(',')[0].replace(' ', '\n')}
                    </span>
                  </div>
                  
                  <div className="flex-1 mt-4 md:mt-0">
                    <h3 className="font-serif text-3xl font-medium text-earth-dark mb-4">{evt.title}</h3>
                    <div className="flex flex-wrap gap-6 text-sm text-earth-muted font-medium mb-4">
                      {evt.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {evt.location}</span>}
                    </div>
                    <p className="text-earth-muted text-sm md:text-base leading-relaxed mb-6">{evt.description}</p>
                    <div className="bg-stone/50 p-4 rounded-xl border border-earth-dark/5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-earth-muted">Source: {evt.source}</span>
                      {evt.externalLink && (
                        <a href={evt.externalLink} target="_blank" rel="noopener noreferrer" className="text-earth-accent hover:text-earth-dark transition-colors flex items-center gap-1 text-sm font-medium whitespace-nowrap">
                          Verify <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10 pb-4 border-b border-earth-dark/10">
            <History className="w-8 h-8 text-earth-muted" />
            <h2 className="font-serif text-4xl text-earth-dark">Past Events</h2>
          </div>
          
          <div className="flex flex-col gap-6">
             {pastEvents.map((evt) => (
               <div key={evt.id} className="bg-warm-white rounded-[40px] p-8 md:p-10 shadow-sm border border-earth-dark/10 hover:border-earth-accent/30 transition-colors group">
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                   <div className="md:w-32 flex-shrink-0">
                     <span className="text-earth-muted font-bold uppercase tracking-widest text-sm mb-1 block">
                        {evt.year}
                     </span>
                     <span className="font-serif text-2xl font-medium text-earth-dark/70 leading-[1.1] block">
                       {evt.date.split(',')[0]}
                     </span>
                   </div>
                   
                   <div className="flex-1 mt-2 md:mt-0">
                     <h3 className="font-serif text-2xl font-medium text-earth-dark mb-3 group-hover:text-earth-accent transition-colors">{evt.title}</h3>
                     <div className="flex flex-wrap gap-6 text-sm text-earth-muted font-medium mb-4">
                       {evt.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {evt.location}</span>}
                     </div>
                     <p className="text-earth-muted text-sm leading-relaxed mb-6">{evt.description}</p>
                     
                     <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-earth-dark/5 pt-4 gap-3">
                       <span className="text-xs font-bold uppercase tracking-wider text-earth-muted">Source: {evt.source}</span>
                       {evt.externalLink && (
                         <a href={evt.externalLink} target="_blank" rel="noopener noreferrer" className="text-earth-muted hover:text-earth-accent transition-colors flex items-center gap-1 text-sm font-medium whitespace-nowrap">
                           More Info <ExternalLink className="w-3 h-3" />
                         </a>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
}
