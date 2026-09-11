import rwMuseumImg from "../assets/images/regenerated_image_1779527214803.webp";
import emotImg from "../assets/images/regenerated_image_1779527212893.png";

export interface Museum {
  id: number | string;
  name: string;
  region: string;
  country: string;
  culture: string;
  type: string;
  img: string;
  logo?: string;
  gallery: string[];
  tags: string[];
  description: string;
  detailedDescription: string;
  operatingHours: { day: string; hours: string }[];
  mapEmbed: string;
  location: string;
  admission: string;
  website?: string;
  foundingMember?: boolean;
}

// Seed / founding members. New institutions join the network through the
// "Register Your Museum" application, are reviewed by ICOM Uganda admins,
// and — once approved — are published here alongside these founding members,
// filterable by country, region, and culture across East Africa.
export const MUSEUMS_DATA: Museum[] = [
  {
    id: 1,
    name: "URA Museum",
    region: "Kampala",
    country: "Uganda",
    culture: "Economic & Fiscal Heritage",
    type: "National",
    img: "/ura-museum.jpg?v=2",
    gallery: ["/ura-museum.jpg?v=2"],
    tags: ["History", "Taxation", "National"],
    description: "The URA Museum explores Uganda's history of revenue collection, showcasing the evolution of taxation and its role in national development.",
    detailedDescription: "Located at the Uganda Revenue Authority headquarters, this museum presents an educational journey through Uganda's economic history, exhibiting historical currencies, old tax collection tools, and archives detailing the nation's financial evolution.",
    operatingHours: [{ day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" }],
    mapEmbed: "",
    location: "URA Tower, Nakawa, Kampala",
    admission: "Free",
    foundingMember: true
  },
  {
    id: 2,
    name: "UPPC",
    region: "Entebbe",
    country: "Uganda",
    culture: "Print & Media Heritage",
    type: "Corporate",
    img: "/uppc.jpg?v=2",
    gallery: ["/uppc.jpg?v=2"],
    tags: ["Publishing", "History", "Archive"],
    description: "The Uganda Printing and Publishing Corporation archives the historic printing press and national gazettes spanning over a century.",
    detailedDescription: "UPPC holds a rich repository of Uganda's printed history, showcasing vintage printing machinery and historical documents published since colonial times.",
    operatingHours: [{ day: "Weekdays", hours: "9:00 AM - 4:00 PM" }],
    mapEmbed: "",
    location: "Entebbe, Uganda",
    admission: "Free",
    foundingMember: true
  },
  {
    id: 3,
    name: "Keepers XR",
    region: "Virtual",
    country: "Uganda",
    culture: "Digital & Contemporary Heritage",
    type: "Technology",
    img: "/regenerated_image_1779520019250.png",
    logo: "/regenerated_image_1779520026822.png",
    gallery: ["/regenerated_image_1779520019250.png"],
    tags: ["VR/AR", "Innovation", "Digital"],
    description: "Keepers XR merges cultural heritage with immersive technology, bringing history to life through Virtual and Augmented Reality.",
    detailedDescription: "A cutting-edge digital initiative preserving and showcasing African heritage through interactive XR experiences, making museum collections globally accessible.",
    operatingHours: [{ day: "Online", hours: "24/7" }],
    mapEmbed: "",
    location: "Digital Platform",
    admission: "Free",
    foundingMember: true
  },
  {
    id: 4,
    name: "Page 4 Cinema Diary",
    region: "Kampala",
    country: "Uganda",
    culture: "Film & Visual Arts",
    type: "Media",
    img: "/page-4.jpg?v=2",
    gallery: ["/page-4.jpg?v=2"],
    tags: ["Cinema", "Archival", "Film"],
    description: "A specialized archive documenting Uganda's cinematic journey and visual storytelling history.",
    detailedDescription: "Page 4 Cinema Diary preserves the photographic and cinematic memory of Uganda, featuring classic film reels, vintage camera equipment, and photographic archives.",
    operatingHours: [{ day: "Weekdays", hours: "10:00 AM - 5:00 PM" }],
    mapEmbed: "",
    location: "Kampala, Uganda",
    admission: "Standard: UGX 5,000",
    foundingMember: true
  },
  {
    id: 5,
    name: "Uganda Police Museum",
    region: "Kampala",
    country: "Uganda",
    culture: "Law & Governance Heritage",
    type: "National",
    img: "/uganda-police.jpg?v=2",
    gallery: ["/uganda-police.jpg?v=2"],
    tags: ["Law", "History", "Archive"],
    description: "Chronicles the history and evolution of law enforcement in Uganda.",
    detailedDescription: "The Uganda Police Museum displays historical uniforms, old investigation tools, archival photographs, and documents tracing the development of the national police force.",
    operatingHours: [{ day: "Monday - Friday", hours: "9:00 AM - 4:00 PM" }],
    mapEmbed: "",
    location: "Kampala, Uganda",
    admission: "Free",
    foundingMember: true
  },
  {
    id: 6,
    name: "RealVR African Heritage Tours",
    region: "Virtual",
    country: "Uganda",
    culture: "Digital & Contemporary Heritage",
    type: "Technology",
    img: "/regenerated_image_1779520020344.png",
    logo: "/regenerated_image_1779520029728.png",
    gallery: ["/regenerated_image_1779520020344.png"],
    tags: ["VR", "Tours", "Digital"],
    description: "Interactive virtual reality tours of major African heritage sites and monuments.",
    detailedDescription: "RealVR provides state-of-the-art 360-degree immersive virtual tours of Uganda’s and Africa's most significant cultural landmarks and museum exhibits.",
    operatingHours: [{ day: "Online", hours: "24/7" }],
    mapEmbed: "",
    location: "Digital Platform",
    admission: "Free",
    foundingMember: true
  },
  {
    id: 7,
    name: "Uganda Railway Museum",
    region: "Jinja",
    country: "Uganda",
    culture: "Industrial & Transport Heritage",
    type: "History",
    img: rwMuseumImg,
    logo: "/regenerated_image_1779520031117.webp",
    gallery: [rwMuseumImg],
    tags: ["Transport", "History", "Industrial"],
    description: "Preserving the legacy of the historic East African Railways.",
    detailedDescription: "Located at the historic Jinja Railway Station, this museum features restored vintage locomotives, passenger carriages, and railway artifacts that shaped the region's transport history.",
    operatingHours: [{ day: "Tuesday - Sunday", hours: "9:00 AM - 6:00 PM" }],
    mapEmbed: "",
    location: "Jinja Railway Station, Uganda",
    admission: "Standard: UGX 5,000",
    foundingMember: true
  },
  {
    id: 8,
    name: "ICOM Uganda",
    region: "National",
    country: "Uganda",
    culture: "Museum Network & Advocacy",
    type: "Organization",
    img: "/icom-logo.png?v=2",
    gallery: ["/icom-logo.png?v=2", "/imd-poster.jpg?v=2"],
    tags: ["Organization", "Global"],
    description: "The digital platform and network representing museums across Uganda.",
    detailedDescription: "ICOM Uganda represents a global network of museum professionals dedicated to the promotion and protection of cultural heritage in Uganda and beyond.",
    operatingHours: [{ day: "Monday - Friday", hours: "9:00 AM - 5:00 PM" }],
    mapEmbed: "",
    location: "Kampala, Uganda",
    admission: "Members Only",
    foundingMember: true
  },
  {
    id: 9,
    name: "eMoT Museum of Technology",
    region: "Kampala",
    country: "Uganda",
    culture: "Digital & Contemporary Heritage",
    type: "Technology",
    img: "/emot-cover.jpg",
    gallery: ["/emot-cover.jpg", emotImg],
    tags: ["Technology", "Computing"],
    description: "A valuable learning center devoted to Collecting, Documenting, and Archiving computer technology artifacts.",
    detailedDescription: "The eMoT Museum of Technology is dedicated to preserving the history of computing and technology in Uganda and globally. The museum archives technological artifacts.",
    operatingHours: [{ day: "Monday - Saturday", hours: "9:00 AM - 5:00 PM" }],
    mapEmbed: "",
    location: "Kampala, Uganda",
    admission: "Students: UGX 2,000 / Adults: UGX 10,000",
    foundingMember: true
  }
];

// East African countries the network is open to. Used to populate the
// registration form and directory filters — the seed data above is all
// Uganda, but approved network members can come from anywhere in the list.
export const EAST_AFRICAN_COUNTRIES = [
  "Uganda",
  "Kenya",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
  "Ethiopia",
  "Somalia",
  "DR Congo",
];

export const MUSEUM_CULTURES = [
  "National & Political Heritage",
  "Economic & Fiscal Heritage",
  "Print & Media Heritage",
  "Digital & Contemporary Heritage",
  "Film & Visual Arts",
  "Law & Governance Heritage",
  "Industrial & Transport Heritage",
  "Ethnographic & Indigenous Culture",
  "Natural History & Environment",
  "Religious & Spiritual Heritage",
  "Museum Network & Advocacy",
  "Other",
];
