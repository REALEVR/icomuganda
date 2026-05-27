import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { RegistrationPopup } from "../RegistrationPopup";
import { Chatbot } from "../Chatbot";
import { MemberDashboard } from "../MemberDashboard";
import { useEffect, useState } from "react";
import { User } from 'firebase/auth';
import { initAuth } from "../../lib/auth";

export function Layout() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth((authedUser) => {
      setUser(authedUser);
    }, () => {
      setUser(null);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[90px]">
        <Outlet />
      </main>
      <Chatbot />
      <RegistrationPopup />
      {user && <MemberDashboard user={user} />}
      <Footer />
    </div>
  );
}
