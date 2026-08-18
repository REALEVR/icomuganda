import { User } from "firebase/auth";

/**
 * Network administrators who can review museum applications and approve or
 * reject new member institutions. Matched against the signed-in Firebase
 * user's verified email. Keep this list in sync with `firestore.rules`
 * (the `isNetworkAdmin()` helper there enforces the same allowlist
 * server-side, so this client-side check is only a UX convenience).
 */
export const NETWORK_ADMIN_EMAILS = [
  "icomuganda@gmail.com",
];

export function isNetworkAdmin(user: User | null | undefined): boolean {
  if (!user?.email) return false;
  return NETWORK_ADMIN_EMAILS.includes(user.email.toLowerCase());
}
