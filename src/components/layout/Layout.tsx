import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RegistrationPopup } from "../RegistrationPopup";
import { Chatbot } from "../Chatbot";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[90px]">
        <Outlet />
      </main>
      <Chatbot />
      <RegistrationPopup />
      <Footer />
    </div>
  );
}
