/**
 * Shown inside <main> while a lazily-loaded page chunk downloads.
 *
 * - Keeps the Navbar/Footer on screen (the Suspense boundary wraps only the
 *   <Outlet/>), so navigation never blanks the whole site.
 * - role="status" + visually-hidden text announces "Loading page…" to screen
 *   reader users instead of silence.
 * - The spinner only animates under motion-safe, matching the site's
 *   reduced-motion handling in index.css / MotionConfig.
 * - min-h keeps the footer from jumping up and back down while loading.
 */
export function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span
        aria-hidden="true"
        className="h-10 w-10 rounded-full border-4 border-earth-dark/20 border-t-earth-dark motion-safe:animate-spin"
      />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
