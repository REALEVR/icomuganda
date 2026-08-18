import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * The East African Museum Network data layer.
 *
 * Flow: a museum submits an application (`museumApplications`, public
 * create only) -> a signed-in network admin (see lib/admin.ts) reviews it
 * in /admin/museums -> on approval a public record is published to
 * `museums` (public read-only) which immediately appears, categorised by
 * country / region / culture, in the public Directory at /museums and
 * links straight out to the museum's own website.
 */

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface MuseumApplication {
  id: string;
  museumName: string;
  country: string;
  region: string;
  culture: string;
  type: string;
  description: string;
  website?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  logoUrl?: string;
  imageUrl?: string;
  status: ApplicationStatus;
  submittedAt?: Timestamp;
  reviewedAt?: Timestamp;
  rejectionReason?: string;
}

export interface NetworkMuseumRecord {
  id: string;
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
  foundingMember: false;
  publishedAt?: Timestamp;
}

const APPLICATIONS_COLLECTION = "museumApplications";
const MUSEUMS_COLLECTION = "museums";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&q=80&w=1200";

export interface MuseumApplicationInput {
  museumName: string;
  country: string;
  region: string;
  culture: string;
  type: string;
  description: string;
  website?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  logoUrl?: string;
  imageUrl?: string;
}

export async function submitMuseumApplication(input: MuseumApplicationInput): Promise<string> {
  const ref = await addDoc(collection(db, APPLICATIONS_COLLECTION), {
    ...input,
    status: "pending" as ApplicationStatus,
    submittedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function listApplications(): Promise<MuseumApplication[]> {
  const snap = await getDocs(
    query(collection(db, APPLICATIONS_COLLECTION), orderBy("submittedAt", "desc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as MuseumApplication[];
}

export async function listPendingApplications(): Promise<MuseumApplication[]> {
  const all = await listApplications();
  return all.filter((a) => a.status === "pending");
}

export async function listApprovedMuseums(): Promise<NetworkMuseumRecord[]> {
  const snap = await getDocs(collection(db, MUSEUMS_COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as NetworkMuseumRecord[];
}

/** Approve an application: publish it to the public directory and mark it reviewed. */
export async function approveApplication(app: MuseumApplication): Promise<void> {
  const record: Omit<NetworkMuseumRecord, "id"> = {
    name: app.museumName,
    region: app.region,
    country: app.country,
    culture: app.culture,
    type: app.type || "Community",
    img: app.imageUrl || app.logoUrl || FALLBACK_IMAGE,
    logo: app.logoUrl,
    gallery: [app.imageUrl || app.logoUrl || FALLBACK_IMAGE],
    tags: [app.culture, app.country].filter(Boolean),
    description: app.description,
    detailedDescription: app.description,
    operatingHours: [{ day: "Contact museum", hours: "See official website" }],
    mapEmbed: "",
    location: `${app.region}, ${app.country}`,
    admission: "Contact museum for details",
    website: app.website,
    foundingMember: false,
    publishedAt: serverTimestamp() as unknown as Timestamp,
  };
  await addDoc(collection(db, MUSEUMS_COLLECTION), record);
  await updateDoc(doc(db, APPLICATIONS_COLLECTION, app.id), {
    status: "approved",
    reviewedAt: serverTimestamp(),
  });
}

export async function rejectApplication(id: string, reason?: string): Promise<void> {
  await updateDoc(doc(db, APPLICATIONS_COLLECTION, id), {
    status: "rejected",
    reviewedAt: serverTimestamp(),
    ...(reason ? { rejectionReason: reason } : {}),
  });
}

export async function removeMuseumFromDirectory(id: string): Promise<void> {
  await deleteDoc(doc(db, MUSEUMS_COLLECTION, id));
}
