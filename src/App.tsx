/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "motion/react";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";

// Home stays in the entry bundle so the landing page paints without an extra
// round-trip. Every other page is split into its own chunk and fetched on
// first navigation; the <Suspense> boundary in Layout shows RouteFallback
// meanwhile. Pages use named exports, hence the .then() remap to `default`.
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Museums = lazy(() => import("./pages/Museums").then((m) => ({ default: m.Museums })));
const MuseumDetail = lazy(() => import("./pages/MuseumDetail").then((m) => ({ default: m.MuseumDetail })));
const JoinNetwork = lazy(() => import("./pages/JoinNetwork").then((m) => ({ default: m.JoinNetwork })));
const AdminMuseums = lazy(() => import("./pages/AdminMuseums").then((m) => ({ default: m.AdminMuseums })));
const VirtualTours = lazy(() => import("./pages/VirtualTours").then((m) => ({ default: m.VirtualTours })));
const News = lazy(() => import("./pages/News").then((m) => ({ default: m.News })));
const Events = lazy(() => import("./pages/Events").then((m) => ({ default: m.Events })));
const Membership = lazy(() => import("./pages/Membership").then((m) => ({ default: m.Membership })));
const Donate = lazy(() => import("./pages/Donate").then((m) => ({ default: m.Donate })));
const MediaGallery = lazy(() => import("./pages/MediaGallery").then((m) => ({ default: m.MediaGallery })));
const Shop = lazy(() => import("./pages/Shop").then((m) => ({ default: m.Shop })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const Game = lazy(() => import("./pages/Game").then((m) => ({ default: m.Game })));

export default function App() {
  return (
    <HelmetProvider>
      {/* reducedMotion="user" makes every motion/react animation on the site
          (scroll reveals, the orbiting museum ring, marquees) honor the
          OS-level "reduce motion" setting automatically — content still
          renders in its end state, just without the transform/opacity
          interpolation. This is the JS-driven counterpart to the
          prefers-reduced-motion CSS block in index.css, which only covers
          plain CSS transitions/animations. */}
      <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="museums" element={<Museums />} />
            <Route path="museums/:id" element={<MuseumDetail />} />
            <Route path="join-network" element={<JoinNetwork />} />
            <Route path="admin/museums" element={<AdminMuseums />} />
            <Route path="virtual-tours" element={<VirtualTours />} />
            <Route path="events" element={<Events />} />
            <Route path="news" element={<News />} />
            <Route path="media" element={<MediaGallery />} />
            <Route path="membership" element={<Membership />} />
            <Route path="donate" element={<Donate />} />
            <Route path="shop" element={<Shop />} />
            <Route path="contact" element={<Contact />} />
            <Route path="game" element={<Game />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
