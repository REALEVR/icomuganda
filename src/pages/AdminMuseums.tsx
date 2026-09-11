import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { User } from "firebase/auth";
import {
  Check,
  ExternalLink,
  Loader2,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { GoogleSignInButton } from "../components/GoogleSignInButton";
import { googleSignIn, initAuth, logout } from "../lib/auth";
import { isNetworkAdmin } from "../lib/admin";
import {
  MuseumApplication,
  NetworkMuseumRecord,
  approveApplication,
  listApplications,
  listApprovedMuseums,
  rejectApplication,
  removeMuseumFromDirectory,
} from "../lib/museumNetwork";

export function AdminMuseums() {
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const [applications, setApplications] = useState<MuseumApplication[]>([]);
  const [museums, setMuseums] = useState<NetworkMuseumRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser) => {
        setUser(authedUser);
        setAuthChecked(true);
      },
      () => {
        setUser(null);
        setAuthChecked(true);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const admin = isNetworkAdmin(user);

  const refresh = async () => {
    setLoadingData(true);
    try {
      const [apps, live] = await Promise.all([listApplications(), listApprovedMuseums()]);
      setApplications(apps);
      setMuseums(live);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (admin) refresh();
  }, [admin]);

  const handleApprove = async (app: MuseumApplication) => {
    setBusyId(app.id);
    try {
      await approveApplication(app);
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (app: MuseumApplication) => {
    setBusyId(app.id);
    try {
      await rejectApplication(app.id);
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (id: string) => {
    if (!confirm("Remove this museum from the public directory?")) return;
    setBusyId(id);
    try {
      await removeMuseumFromDirectory(id);
      await refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusyId(null);
    }
  };

  const pending = applications.filter((a) => a.status === "pending");
  const reviewed = applications.filter((a) => a.status !== "pending");

  return (
    <div className="bg-warm-white min-h-screen py-16 px-6">
      <SEO
        title="Network Admin | ICOM Uganda"
        description="Review and approve museum applications to the East African Museum Network."
      />
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-4xl text-earth-dark mb-2">Museum Network — Admin</h1>
            <p className="text-earth-muted">Review applications and manage the public directory.</p>
          </div>
          {user && (
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone text-earth-dark hover:bg-stone/50 transition-colors text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          )}
        </div>

        {!authChecked && (
          <div className="flex items-center justify-center py-24 text-earth-muted">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        )}

        {authChecked && !user && (
          <div className="max-w-md mx-auto bg-white border border-stone rounded-3xl p-10 text-center shadow-sm">
            <ShieldAlert className="w-10 h-10 text-earth-accent mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-earth-dark mb-2">Admin sign-in required</h2>
            <p className="text-earth-muted text-sm mb-6">
              Sign in with your ICOM Uganda network admin Google account to review museum applications.
            </p>
            <GoogleSignInButton
              isLoading={signingIn}
              onClick={async () => {
                setSigningIn(true);
                try {
                  await googleSignIn();
                } catch (err) {
                  console.error(err);
                } finally {
                  setSigningIn(false);
                }
              }}
            />
          </div>
        )}

        {authChecked && user && !admin && (
          <div className="max-w-md mx-auto bg-white border border-stone rounded-3xl p-10 text-center shadow-sm">
            <ShieldAlert className="w-10 h-10 text-red-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-earth-dark mb-2">Not authorized</h2>
            <p className="text-earth-muted text-sm">
              {user.email} does not have network admin access. Contact icomuganda@gmail.com if you believe this is an error.
            </p>
          </div>
        )}

        {authChecked && user && admin && (
          <div className="flex flex-col gap-16">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-serif text-2xl text-earth-dark">Pending Applications</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-earth-accent/15 text-earth-accent">
                  {pending.length}
                </span>
              </div>

              {loadingData ? (
                <div className="flex justify-center py-12 text-earth-muted"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : pending.length === 0 ? (
                <p className="text-earth-muted text-sm bg-white border border-stone rounded-2xl p-8 text-center">
                  No pending applications. New museum submissions will appear here for review.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {pending.map((app) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-stone rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-4 justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-serif text-xl text-earth-dark">{app.museumName}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone text-earth-dark">
                            {app.country}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone text-earth-dark">
                            {app.culture}
                          </span>
                        </div>
                        <p className="text-sm text-earth-muted line-clamp-2 mb-1">{app.description}</p>
                        <div className="text-xs text-earth-muted flex items-center gap-3 flex-wrap">
                          <span>{app.contactName} · {app.contactEmail}</span>
                          {app.website && (
                            <a href={app.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-earth-accent font-semibold">
                              Website <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          disabled={busyId === app.id}
                          onClick={() => handleApprove(app)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-earth-dark text-white text-xs font-bold uppercase tracking-widest hover:bg-woven-teal transition-colors disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" /> Approve
                        </button>
                        <button
                          disabled={busyId === app.id}
                          onClick={() => handleReject(app)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-stone text-earth-dark text-xs font-bold uppercase tracking-widest hover:bg-stone/50 transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-5 h-5 text-earth-accent" />
                <h2 className="font-serif text-2xl text-earth-dark">Live in Directory</h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-earth-accent/15 text-earth-accent">
                  {museums.length}
                </span>
                <Link to="/museums" className="ml-auto text-xs font-semibold text-earth-accent uppercase tracking-widest hover:opacity-80">
                  View public directory →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {museums.map((m) => (
                  <div key={m.id} className="bg-white border border-stone rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-earth-dark truncate">{m.name}</h3>
                      <p className="text-xs text-earth-muted">{m.region}, {m.country} · {m.culture}</p>
                    </div>
                    <button
                      disabled={busyId === m.id}
                      onClick={() => handleRemove(m.id)}
                      className="shrink-0 p-2 rounded-full border border-stone text-earth-muted hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
                      title="Remove from directory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {reviewed.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl text-earth-dark mb-6">Review History</h2>
                <div className="grid grid-cols-1 gap-2">
                  {reviewed.map((app) => (
                    <div key={app.id} className="bg-white/60 border border-stone rounded-xl px-5 py-3 flex items-center justify-between gap-4 text-sm">
                      <span className="text-earth-dark font-medium truncate">{app.museumName}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${app.status === "approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
