import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, LogOut, Trophy } from "lucide-react";
import { Leaderboard } from "../components/Leaderboard";

// SEED Questions - Written to Firestore if empty
const SEED_QUESTIONS = [
  {
    originalId: 1,
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1200", 
    correct: "The Louvre",
    options: ["The Louvre", "British Museum", "Metropolitan Museum of Art", "Prado Museum"]
  },
  {
    originalId: 2,
    imageUrl: "https://images.unsplash.com/photo-1541088667606-cbe0395edce1?auto=format&fit=crop&q=80&w=1200", 
    correct: "Metropolitan Museum of Art",
    options: ["Rijksmuseum", "National Gallery", "Metropolitan Museum of Art", "Uffizi Gallery"]
  },
  {
    originalId: 3,
    imageUrl: "https://images.unsplash.com/photo-1545648784-7e78d2b9d562?auto=format&fit=crop&q=80&w=1200", 
    correct: "British Museum",
    options: ["Smithsonian", "Vatican Museums", "State Hermitage Museum", "British Museum"]
  },
  {
    originalId: 4,
    imageUrl: "https://images.unsplash.com/photo-1542820228-097561a34b22?auto=format&fit=crop&q=80&w=1200",
    correct: "Vatican Museums",
    options: ["The Louvre", "Acropolis Museum", "Vatican Museums", "Tate Modern"]
  },
  {
    originalId: 5,
    imageUrl: "https://images.unsplash.com/photo-1579227096696-e260840507ff?auto=format&fit=crop&q=80&w=1200",
    correct: "Rijksmuseum",
    options: ["Van Gogh Museum", "Rijksmuseum", "Musée d'Orsay", "Pergamon Museum"]
  }
];

export function Game() {
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [loadingScore, setLoadingScore] = useState(true);
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const qSnap = await getDocs(collection(db, "questions"));
        let fetchedQuestions: any[] = [];
        if (qSnap.empty) {
          // Seed database
          for (const sq of SEED_QUESTIONS) {
            await setDoc(doc(db, "questions", sq.originalId.toString()), sq);
            fetchedQuestions.push(sq);
          }
        } else {
          qSnap.forEach(doc => {
            fetchedQuestions.push({ id: doc.id, ...doc.data() });
          });
        }
        
        // basic shuffle or order
        fetchedQuestions.sort((a,b) => a.originalId - b.originalId);
        setQuestions(fetchedQuestions);
        setLoadingQuestions(false);
      } catch (err) {
        console.error("Failed to load questions:", err);
        setLoadingQuestions(false);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setLoadingScore(true);
        try {
          const docRef = doc(db, "users", u.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setScore(snap.data().score || 0);
          } else {
            await setDoc(docRef, {
              uid: u.uid,
              email: u.email || "",
              displayName: u.displayName || "Player",
              score: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            });
            setScore(0);
          }
        } catch (e) {
          console.error("Firebase error", e);
        }
        setLoadingScore(false);
      } else {
        setLoadingScore(false);
      }
    });
    return unsub;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const handleGuess = async (guess: string) => {
    if (showResult !== null) return;
    if (questions.length === 0) return;
    
    const isCorrect = guess === questions[currentQuestionIdx].correct;
    setShowResult(isCorrect);
    
    if (isCorrect && user) {
      const newScore = score + 10;
      setScore(newScore);
      try {
        await updateDoc(doc(db, "users", user.uid), {
          score: newScore,
          updatedAt: new Date().toISOString(),
          displayName: user.displayName || "Player"
        });
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      setShowResult(null);
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(idx => idx + 1);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestionIdx(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-[85vh] bg-warm-white py-24 flex flex-col items-center">
      <Helmet>
        <title>Museum Explorer Game | ICOM Uganda</title>
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-medium text-earth-dark mb-6">Museum Explorer Game</h1>
        <p className="text-earth-muted text-lg mb-12">Identify the world's most famous museums. Earn points to climb the leaderboard.</p>

        {!user ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-12 rounded-3xl shadow-lg border border-stone">
            <h2 className="text-2xl font-serif text-earth-dark mb-6">Sign in to start playing</h2>
            <p className="text-earth-muted mb-8">You need a Google account to save your score.</p>
            <button 
              onClick={login}
              className="px-8 py-4 bg-earth-dark text-white rounded-full font-semibold flex items-center gap-3 mx-auto hover:bg-earth-dark/90 transition-all"
            >
              <LogIn className="w-5 h-5" /> Sign in with Google
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full justify-between items-center mb-8 bg-white p-4 px-6 rounded-2xl shadow-sm border border-stone">
              <div className="flex items-center gap-4">
                <img src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`} className="w-12 h-12 rounded-full shadow-sm" alt="Avatar" />
                <div className="text-left">
                  <div className="font-semibold text-earth-dark">{user.displayName}</div>
                  <button onClick={logout} className="text-xs text-earth-muted hover:text-earth-accent flex items-center gap-1">
                    <LogOut className="w-3 h-3" /> Sign Out
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-stone px-6 py-2 rounded-xl">
                <Trophy className="w-6 h-6 text-earth-accent" />
                <div className="text-2xl font-black text-earth-dark">{loadingScore ? "..." : score}</div>
              </div>
            </div>

            {loadingQuestions ? (
              <div className="w-full bg-white p-12 rounded-3xl shadow-xl border border-stone text-center text-earth-muted text-xl flex items-center justify-center min-h-[400px]">
                Loading...
              </div>
            ) : gameOver ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-12 shadow-xl border border-stone w-full">
                 <Trophy className="w-12 h-12 text-earth-accent mx-auto mb-4" />
                 <h2 className="text-4xl font-serif text-earth-dark mb-2">Game Over!</h2>
                 <p className="text-earth-muted text-lg mb-2">You have viewed all the museums. Check back later for new ones!</p>
                 <p className="font-black text-3xl text-earth-dark mb-8">Final Score: <span className="text-earth-accent">{score}</span></p>
                 <button onClick={resetGame} className="px-8 py-4 bg-earth-accent text-white rounded-full font-semibold hover:bg-earth-accent/90 transition-all text-lg">
                   Play Again
                 </button>
              </motion.div>
            ) : (
              <motion.div key={currentQuestionIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone">
                 <div className="flex items-center justify-between mb-2 text-sm font-semibold tracking-widest uppercase text-earth-muted">
                    <span>Museum {currentQuestionIdx + 1} of {questions.length}</span>
                 </div>
                 <div className="w-full h-1.5 bg-stone rounded-full mb-6 overflow-hidden">
                    <motion.div
                      className="h-full bg-earth-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                 </div>

                 <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-stone">
                    <img src={questions[currentQuestionIdx]?.imageUrl} alt="Guess the museum" className="w-full h-full object-cover" />
                    
                    {/* Feedback overlay */}
                    <AnimatePresence>
                      {showResult !== null && (
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 flex items-center justify-center backdrop-blur-md ${showResult ? 'bg-green-500/80' : 'bg-red-500/80'}`}
                        >
                          <span className="text-white text-5xl font-black uppercase tracking-widest">{showResult ? "+10 Points!" : "Incorrect"}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {questions[currentQuestionIdx]?.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => handleGuess(opt)}
                        disabled={showResult !== null}
                        className="p-4 text-lg font-medium border-2 border-stone rounded-xl hover:bg-stone hover:border-earth-dark/20 focus:bg-stone transition-all text-earth-dark disabled:opacity-50"
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
              </motion.div>
            )}

            <Leaderboard user={user} />

          </div>
        )}
      </div>
    </div>
  );
}
