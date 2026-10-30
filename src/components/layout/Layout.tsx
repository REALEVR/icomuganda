import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Chatbot } from "../Chatbot";
import { MemberDashboard } from "../MemberDashboard";
import { useEffect, useState } from "react";
import { User } from 'firebase/auth';
import { initAuth } from "../../lib/auth";
import { isNetworkAdmin } from "../../lib/admin";

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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Navbar user={user} isAdmin={isNetworkAdmin(user)} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-[90px] focus:outline-none">
        <Outlet />
      </main>
      <Chatbot />
      {user && <MemberDashboard user={user} />}
      <Footer />
    </div>
  );
}
