import { motion } from "motion/react";
import { Sparkles, ArrowUpRight, ChevronRight, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-10 w-full relative z-10">
      <div className="flex-1 flex md:hidden items-center">
         <span className="font-regular text-xl font-bold text-white tracking-widest cursor-pointer" onClick={() => navigate('/')}>ICOM Uganda</span>
      </div>
      <div className="flex-1 hidden md:block" />
      <ul className="hidden md:flex items-center gap-8 text-[rgb(240,240,240)] font-normal text-sm drop-shadow-md">
        <li className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group" onClick={() => navigate('/museums')}>
          Museums
        </li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group" onClick={() => navigate('/events')}>
          Events <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group" onClick={() => navigate('/media')}>
          Gallery
        </li>
        <li className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-1 group" onClick={() => navigate('/virtual-tours')}>
          Tours <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </li>
      </ul>
      <div className="flex-1 hidden md:flex" />
      <div className="flex-1 flex justify-end">
        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/game')}
          className="flex items-center bg-[rgba(255,255,255,0.15)] backdrop-blur-md border border-white/20 text-white rounded-full pl-2 pr-4 md:pr-6 py-1.5 md:py-2 gap-2 md:gap-3 hover:bg-[rgba(255,255,255,0.25)] transition-colors group"
        >
          <div className="bg-white/20 p-1 md:p-1.5 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-xs md:text-sm font-normal">Play Game</span>
        </motion.button>
      </div>
    </nav>
  );
}

export function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 mx-auto mb-3 w-fit"
    >
      <Sparkles className="w-4 h-4 text-white" />
      <span className="text-[14px] font-normal text-white drop-shadow-sm">Uganda's Heritage</span>
    </motion.div>
  );
}

export function BottomLeftCard() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="absolute bottom-28 right-4 left-auto md:left-6 md:right-auto md:bottom-6 lg:bottom-10 lg:left-10 p-3 md:p-4 lg:p-5 rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[2.2rem] bg-white/30 backdrop-blur-xl flex flex-col gap-2 lg:gap-3 min-w-[140px] md:min-w-[150px] lg:min-w-[180px] w-fit border border-white/20"
    >
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">5.2K</span>
        <span className="text-[10px] md:text-[12px] font-semibold text-white/90 uppercase tracking-wider">Active Visitors</span>
      </div>
      <motion.button 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/events')}
        className="flex items-center bg-white rounded-full pl-1.5 pr-5 py-1.5 gap-2 hover:bg-white/90 transition-colors self-start group mt-1 shadow-lg"
      >
        <div className="bg-[rgba(30,50,90,0.1)] p-1 rounded-full flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-[rgba(30,50,90,0.9)]" />
        </div>
        <span className="text-[14px] font-medium text-[rgba(30,50,90,0.9)]">Plan Visit</span>
      </motion.button>
    </motion.div>
  );
}

export function BottomRightCorner() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="absolute bottom-0 right-0 p-3 pt-5 pl-8 sm:p-4 sm:pt-6 sm:pl-10 md:p-6 md:pt-8 md:pl-14 bg-[#f0f0f0] rounded-tl-[1.5rem] sm:rounded-tl-[2rem] md:rounded-tl-[3.5rem] flex items-center gap-3 sm:gap-4 md:gap-6 z-10"
    >
      <div className="absolute -top-[1.5rem] sm:-top-[2rem] md:-top-[3.5rem] right-0 w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56V0C56 30.9279 30.9279 56 0 56H56Z" fill="#f0f0f0"/>
        </svg>
      </div>
      <div className="absolute bottom-0 -left-[1.5rem] sm:-left-[2rem] md:-left-[3.5rem] w-[1.5rem] sm:w-[2rem] md:w-[3.5rem] h-[1.5rem] sm:h-[2rem] md:h-[3.5rem] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56 56H0C30.9279 56 56 30.9279 56 0V56Z" fill="#f0f0f0"/>
        </svg>
      </div>
      
      <div className="bg-[rgba(30,50,90,0.05)] w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border border-[rgba(30,50,90,0.1)]">
        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-[rgba(30,50,90,0.8)]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[16px] md:text-[20px] font-bold text-[rgba(30,50,90,0.95)]">Exhibitions</span>
        <div className="flex items-center gap-1 text-[rgba(30,50,90,0.6)] cursor-pointer hover:text-[rgba(30,50,90,0.8)] transition-colors" onClick={() => navigate('/media')}>
          <span className="text-[12px] md:text-[15px] font-medium">Gallery</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
    </motion.div>
  );
}

export function HeroDefi() {
  return (
    <div className="w-full h-[90vh] md:h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
      <section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center bg-black/40 group">
        <img 
          src="/hero-background.jpg" 
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0 opacity-80 mix-blend-overlay"
        />
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between pb-24 md:pb-0">
          <Navbar />
          
          <div className="w-full flex flex-col items-center text-center max-w-4xl px-6 -mt-16 md:mt-0">
            <HeroBadge />
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-white mb-4 tracking-tight leading-[1.05] drop-shadow-xl"
            >
              Discover Uganda's Heritage
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-md"
            >
              Explore rich cultural exhibitions, discover ancient artifacts, and connect with our vibrant history through our digital repository.
            </motion.p>
          </div>
          
          <div className="hidden md:block h-[10vh]" />
        </div>
        
        <BottomLeftCard />
        <BottomRightCorner />
      </section>
    </div>
  );
}
