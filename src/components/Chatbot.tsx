import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Volume2, Loader2, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface ChatMessage {
  role: "user" | "model";
  text: string;
  audio?: string; // base64
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: "model", text: "Hello! I'm the ICOM Uganda assistant. How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setChatHistory(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send recent history context
        body: JSON.stringify({ 
          message: userMessage, 
          history: chatHistory.slice(-5).map(m => ({ role: m.role, text: m.text })) 
        })
      });
      
      const data = await response.json();
      if (data.error) {
        setChatHistory(prev => [...prev, { role: "model", text: "Sorry, I am facing some technical difficulties." }]);
      } else {
        setChatHistory(prev => [...prev, { role: "model", text: data.text, audio: data.audio }]);
        
        // Auto-play audio if generated
        if (data.audio) {
          playAudioBase64(data.audio);
        }
      }
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { role: "model", text: "Sorry, I am facing some connection issues." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudioBase64 = (base64Str: string) => {
    try {
      const audioUrl = `data:audio/wav;base64,${base64Str}`;
      const audio = new window.Audio(audioUrl);
      audio.play();
    } catch(e) {
      console.error("Audio playback error", e);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 bg-earth-dark text-white rounded-full shadow-lg hover:bg-earth-accent hover:scale-105 transition-all text-sm font-bold uppercase tracking-widest flex items-center gap-2"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" /> Assistant
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-48px)] h-[500px] max-h-[70vh] bg-white rounded-3xl shadow-2xl border border-earth-dark/10 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-earth-dark p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold tracking-widest uppercase text-sm">Museum Guide</h3>
                  <p className="text-xs text-white/70">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone/30">
              {chatHistory.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex shrink-0 items-center justify-center",
                    msg.role === "user" ? "bg-earth-accent text-white" : "bg-earth-dark text-white"
                  )}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap flex flex-col gap-2 shadow-sm",
                    msg.role === "user" 
                      ? "bg-earth-dark text-white rounded-tr-sm" 
                      : "bg-white text-earth-dark border border-stone rounded-tl-sm"
                  )}>
                    <span>{msg.text}</span>
                    {msg.audio && (
                      <button 
                        onClick={() => playAudioBase64(msg.audio!)}
                        className="self-start text-earth-accent hover:text-earth-dark transition-colors"
                        title="Play audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-full flex shrink-0 items-center justify-center bg-earth-dark text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white text-earth-dark border border-stone rounded-tl-sm shadow-sm flex items-center justify-center w-max">
                    <Loader2 className="w-4 h-4 animate-spin text-earth-accent" />
                  </div>
                </div>
              )}
              
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-earth-dark/10">
              <form 
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-stone rounded-full px-4 py-3 text-sm text-earth-dark border-none focus:ring-2 focus:ring-earth-dark/20 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="bg-earth-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-earth-accent transition-colors disabled:opacity-50 disabled:hover:bg-earth-dark shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
