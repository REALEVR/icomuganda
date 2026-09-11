/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Museums } from "./pages/Museums";
import { MuseumDetail } from "./pages/MuseumDetail";
import { JoinNetwork } from "./pages/JoinNetwork";
import { AdminMuseums } from "./pages/AdminMuseums";
import { VirtualTours } from "./pages/VirtualTours";
import { News } from "./pages/News";
import { Events } from "./pages/Events";
import { Membership } from "./pages/Membership";
import { Donate } from "./pages/Donate";
import { MediaGallery } from "./pages/MediaGallery";
import { Shop } from "./pages/Shop";
import { Contact } from "./pages/Contact";
import { Game } from "./pages/Game";

export default function App() {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}
