import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Compass } from "lucide-react";

/**
 * Shown for any URL that doesn't match a route.
 *
 * Previously the catch-all route rendered <Home />, so a mistyped or stale
 * link silently looked like the homepage: visitors had no idea the page they
 * wanted didn't exist, and search engines indexed duplicate copies of Home
 * under arbitrary paths. This page says what happened, offers the main
 * destinations, and is marked noindex.
 */
const suggestions = [
  { label: "Museum Network", to: "/museums", hint: "Find a museum to visit across Uganda" },
  { label: "What's on", to: "/events", hint: "Exhibitions, talks and events" },
  { label: "Virtual Tours", to: "/virtual-tours", hint: "Explore collections from anywhere" },
  { label: "Contact", to: "/contact", hint: "Ask us where to find something" },
];

export function NotFound() {
  const { pathname } = useLocation();

  return (
    <section
      aria-labelledby="not-found-title"
      className="bg-warm-white min-h-[70vh] text-earth-dark py-20 px-6 flex items-center"
    >
      <Helmet>
        <title>Page not found | ICOM Uganda</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container mx-auto max-w-3xl text-center">
        <div className="w-16 h-16 rounded-full bg-earth-accent/15 text-earth-accent flex items-center justify-center mx-auto mb-8">
          <Compass className="w-7 h-7" aria-hidden="true" />
        </div>
        <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 text-earth-accent">Error 404</p>
        <h1 id="not-found-title" className="font-serif text-4xl md:text-6xl font-semibold mb-6">
          This gallery is closed
        </h1>
        <p className="text-lg text-earth-dark/75 mb-12 leading-relaxed">
          We couldn't find <code className="px-1.5 py-0.5 rounded bg-earth-dark/5 text-base break-all">{pathname}</code>.
          It may have moved, or the link may be mistyped. Try one of these instead:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-12">
          {suggestions.map((s) => (
            <li key={s.to}>
              <Link
                to={s.to}
                className="block h-full rounded-xl border border-earth-dark/15 p-5 transition-colors hover:border-earth-accent hover:bg-earth-accent/5 focus-visible:border-earth-accent"
              >
                <span className="block font-bold text-lg mb-1">{s.label}</span>
                <span className="block text-sm text-earth-dark/70">{s.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="inline-block uppercase tracking-widest text-xs font-bold border-b-2 border-earth-dark pb-1 hover:text-earth-accent hover:border-earth-accent transition-colors"
        >
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
