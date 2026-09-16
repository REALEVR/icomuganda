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
      <Navbar user={user} isAdmin={isNetworkAdmin(user)} />
      <main className="flex-1 pt-[90px]">
        <Outlet />
      </main>
      <Chatbot />
      {user && <MemberDashboard user={user} />}
      <Footer />
    </div>
  );
}
