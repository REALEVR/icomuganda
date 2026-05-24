import { useState } from "react";
import { SEO } from "../components/SEO";
import photos from "../data/photos.json";
import { UPLOADED_IMAGES } from "../data/uploadedImages";

export function MediaGallery() {
  const [activeYear, setActiveYear] = useState<string>("2026");

  const images2025 = [
    ...UPLOADED_IMAGES,
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/The_Uganda_Museum_Main_Entrance.JPG/1280px-The_Uganda_Museum_Main_Entrance.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Igongo_Cultural_Centre%2C_Biharwe_Mbarara.jpg/1024px-Igongo_Cultural_Centre%2C_Biharwe_Mbarara.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/50/Uganda_Museum_Artefacts.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Kasubi_Tombs_in_2017.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/International_Council_of_Museums_%28ICOM%29_-_Flickr_-_Al_Jazeera_English.jpg",
    "/icom-logo.png",
    ...photos
  ];

  const importedImages = import.meta.glob('../assets/images/*.{jpeg,jpg,png,webp}', { eager: true, as: 'url' });
  const assetImages = Object.values(importedImages);

  const galleryData = {
    "2026": [
      "/museumfair-2026.mp4.36.27 PM.mp4",
      ...assetImages
    ],
    "2025": images2025,
    "2024": [],
  };

  const years = Object.keys(galleryData).sort((a, b) => Number(b) - Number(a));

  const currentGalleryImages = galleryData[activeYear as keyof typeof galleryData];

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Media Gallery | ICOM Uganda",
    "description": "Browse an extensive visual archive from Uganda's museums, cultural centers, and heritage sites.",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "image": currentGalleryImages.map((img: string) => ({
      "@type": "ImageObject",
      "contentUrl": img
    }))
  };

  return (
    <div className="bg-stone min-h-screen py-20 px-6">
      <SEO 
        title="Media Gallery | ICOM Uganda" 
        description="Browse an extensive visual archive from Uganda's museums, cultural centers, and heritage sites." 
        schema={gallerySchema}
        breadcrumbs={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : '' },
          { name: "Media Gallery", url: typeof window !== 'undefined' ? `${window.location.origin}/media` : '' }
        ]}
      />
      <div className="container mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-earth-dark mb-12 text-center">Media Gallery</h1>
        
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-8 py-3 rounded-full font-serif text-lg transition-all duration-300 ${
                activeYear === year 
                  ? "bg-earth-dark text-warm-white shadow-md transform scale-105" 
                  : "bg-white text-earth-muted border border-earth-dark/10 hover:border-earth-dark/30 hover:text-earth-dark"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {currentGalleryImages.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-earth-muted italic">No images currently available for {activeYear}.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {currentGalleryImages.map((img: string, i: number) => (
              <div key={`gallery-item-${i}`} className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500">
                {img.endsWith('.mp4') ? (
                  <video src={img} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" autoPlay muted loop playsInline controls />
                ) : (
                  <img src={img} alt={`${activeYear} Gallery item`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white font-serif italic text-xl">View Details</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
