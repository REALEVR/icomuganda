import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";

interface LeaderboardProps {
  user: User | null;
}

export function Leaderboard({ user }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const topUsers: any[] = [];
        querySnapshot.forEach((d) => {
          topUsers.push({ id: d.id, ...d.data() });
        });
        setLeaderboard(topUsers);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [user]);

  if (loading) {
    return (
      <div className="mt-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h3 className="text-3xl font-serif text-earth-dark mb-6 text-center">Top Explorers</h3>
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-stone text-center text-earth-muted">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="text-3xl font-serif text-earth-dark mb-6 text-center">Top Explorers</h3>
      <div className="bg-white rounded-3xl shadow-lg border border-stone overflow-hidden">
        <div className="divide-y divide-stone">
          {leaderboard.map((player, index) => (
            <div key={player.id} className={`flex items-center justify-between p-4 px-6 md:px-8 ${user && player.uid === user.uid ? 'bg-stone/50' : ''}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${index === 0 ? 'bg-yellow-400 text-yellow-900' : index === 1 ? 'bg-slate-300 text-slate-800' : index === 2 ? 'bg-amber-600 text-amber-50' : 'bg-stone text-earth-muted'}`}>
                  {index + 1}
                </div>
                <div className="font-semibold text-earth-dark">{player.displayName || "Player"}</div>
              </div>
              <div className="font-black text-earth-accent">{player.score} pts</div>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <div className="p-8 text-center text-earth-muted">No scores yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
