import React, { useEffect, useState } from "react";
import { MessageSquare, Send, CheckCircle2, ChevronRight } from "lucide-react";
import { initAuth, googleSignIn, getAccessToken } from "../lib/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { User } from "firebase/auth";

export function ChatFeedback() {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        setNeedsAuth(false);
        fetchSpaces(token);
      },
      () => {
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        fetchSpaces(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchSpaces = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://chat.googleapis.com/v1/spaces", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to load spaces.");
      
      const data = await response.json();
      setSpaces(data.spaces || []);
      if (data.spaces?.length > 0) {
        setSelectedSpace(data.spaces[0].name);
      }
    } catch (err) {
      console.error("Fetch spaces error:", err);
      setError("Failed to fetch Google Chat spaces.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedSpace) return;
    
    // Explicit user confirmation for sending a message
    const confirmed = window.confirm(`Send this feedback to the selected Google Chat space?`);
    if (!confirmed) return;

    setSending(true);
    setError(null);
    try {
      const token = await getAccessToken();
      const response = await fetch(`https://chat.googleapis.com/v1/${selectedSpace}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
      });

      if (!response.ok) {
        throw new Error("Failed to send message to Google Chat.");
      }

      setSuccess(true);
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError("Could not send feedback to Google Chat. Make sure the app has access down to that space.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-stone shadow-lg w-full max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-8 h-8 text-earth-accent" />
        <h3 className="text-2xl font-serif font-medium text-earth-dark">Share Feedback</h3>
      </div>
      
      <p className="text-earth-muted mb-8 text-sm">Have ideas or comments? Send them directly to our community spaces via Google Chat.</p>

      {needsAuth ? (
        <div className="text-center py-6">
          <p className="text-sm font-medium text-earth-dark mb-4">Sign in to connect Google Chat</p>
          <GoogleSignInButton onClick={handleLogin} isLoading={isLoggingIn} />
          {error && <p className="text-red-500 mt-4 text-xs">{error}</p>}
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center py-8">
          <div className="w-8 h-8 border-4 border-earth-accent/20 border-t-earth-accent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-earth-muted">Loading your spaces...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-earth-dark">Select Space</label>
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="px-4 py-3 bg-stone border-transparent rounded-xl focus:border-earth-accent focus:ring-EARTH-accent focus:bg-white transition-all text-sm text-earth-dark disabled:opacity-50"
              disabled={spaces.length === 0}
            >
              <option value="" disabled>Select a Google Chat Space...</option>
              {spaces.map(space => (
                <option key={space.name} value={space.name}>
                  {space.displayName || "Unnamed Space"} {space.spaceDetails?.description ? `- ${space.spaceDetails.description}` : ''}
                </option>
              ))}
            </select>
            {spaces.length === 0 && !error && (
              <p className="text-xs text-earth-muted mt-1">No spaces found. You need to be a member of at least one space.</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-earth-dark">Your Comment</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your feedback here..."
              rows={4}
              className="px-4 py-3 bg-stone border-transparent rounded-xl focus:border-earth-accent focus:ring-EARTH-accent focus:bg-white transition-all text-sm text-earth-dark resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!message.trim() || !selectedSpace || sending}
            className="mt-2 bg-earth-dark text-white px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-earth-dark/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <span className="flex items-center gap-2">Sending...</span>
            ) : success ? (
              <span className="flex items-center gap-2 text-green-400"><CheckCircle2 className="w-5 h-5"/> Sent!</span>
            ) : (
              <span className="flex items-center gap-2">Send to Chat <Send className="w-4 h-4" /></span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
