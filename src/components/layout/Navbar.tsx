import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import icomLogo from "../../assets/images/regenerated_image_1778567215870.jpg";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { name: "Plan your visit", path: "/visit", color: "text-[#0ea5e9]", hoverColor: "hover:text-[#0ea5e9]", borderColor: "border-[#0ea5e9]" },
  { name: "What's on", path: "/whats-on", color: "text-[#0284c7]", hoverColor: "hover:text-[#0284c7]", borderColor: "border-[#0284c7]" },
  { name: "Museums", path: "/museums", color: "text-[#082f49]", hoverColor: "hover:text-[#082f49]", borderColor: "border-[#082f49]" },
  { name: "Virtual Tours", path: "/virtual-tours", color: "text-[#38bdf8]", hoverColor: "hover:text-[#38bdf8]", borderColor: "border-[#38bdf8]" },
  { name: "Play Game", path: "/game", color: "text-[#f59e0b]", hoverColor: "hover:text-[#f59e0b]", borderColor: "border-[#f59e0b]" },
  { name: "Curator's Shop", path: "/shop", color: "text-[#0369a1]", hoverColor: "hover:text-[#0369a1]", borderColor: "border-[#0369a1]" },
  { name: "About", path: "/about", color: "text-[#0369a1]", hoverColor: "hover:text-[#0369a1]", borderColor: "border-[#0369a1]" },
  { name: "Contact", path: "/contact", color: "text-[#082f49]", hoverColor: "hover:text-[#082f49]", borderColor: "border-[#082f49]" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navRef = useRef<HTMLElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLink = navLinks.find(link => location.pathname.startsWith(link.path) && link.path !== '/') 
    || (location.pathname === '/' ? null : navLinks.find(l => l.path === location.pathname));

  const { contextSafe } = useGSAP({ scope: navRef });

  const handleHover = contextSafe((e: React.MouseEvent<HTMLAnchorElement>, color: string) => {
    if (!threadRef.current || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = e.currentTarget.getBoundingClientRect();
    
    // Convert DOM rect to hex color from class name like text-[#FF6B00]
    const hexColorMatch = color.match(/#([0-9a-fA-F]{6})/);
    const hexColor = hexColorMatch ? hexColorMatch[0] : '#050505';
    
    const centerX = navRect.width / 2;
    const linkCenterX = linkRect.left - navRect.left + linkRect.width / 2;
    
    gsap.to(threadRef.current, {
      opacity: 1,
      left: Math.min(centerX, linkCenterX),
      width: Math.abs(linkCenterX - centerX),
      backgroundColor: hexColor,
      duration: 0.4,
      ease: "power2.out"
    });
  });

  const handleLeave = contextSafe(() => {
    if (!threadRef.current || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    
    gsap.to(threadRef.current, {
      opacity: 0,
      left: navRect.width / 2,
      width: 0,
      duration: 0.5,
      ease: "power3.inOut"
    });
  });

  const handleClick = contextSafe((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (!threadRef.current) return;
    
    // Pull-in animation
    gsap.to(threadRef.current, {
      scaleY: 20,
      opacity: 0,
      duration: 0.6,
      ease: "expo.out",
      onComplete: () => {
         gsap.set(threadRef.current, { scaleY: 1 });
         navigate(path);
      }
    });
  });

  return (
    <>
      <header
        className={cn(
          "fixed top-[6px] inset-x-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-sm py-4",
          activeLink ? `border-b-4 ${activeLink.borderColor}` : "border-b border-earth-dark/10"
        )}
      >
      <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center relative z-10">
          <img 
            src={icomLogo} 
            alt="ICOM Uganda" 
            className="h-12 md:h-16 lg:h-20 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Nav */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-8 relative px-4">
          <div 
            ref={threadRef} 
            className="absolute bottom-[-10px] h-[2px] opacity-0 origin-center pointer-events-none rounded-full"
            style={{ left: '50%', width: 0 }}
          />
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={(e) => handleHover(e, link.color)}
              onMouseLeave={handleLeave}
              onClick={(e) => handleClick(e, link.path)}
              className={cn(
                "relative text-[11px] xl:text-xs uppercase tracking-widest font-bold transition-all duration-300 py-2",
                location.pathname.startsWith(link.path) ? link.color : cn("text-earth-dark", link.hoverColor)
              )}
            >
              {link.name}
              {location.pathname.startsWith(link.path) && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className={cn("absolute -bottom-1 left-0 right-0 h-0.5", link.borderColor.replace('border-', 'bg-'))}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>


        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/membership"
            className="text-xs uppercase tracking-widest font-semibold transition-colors hover:text-earth-accent text-earth-dark"
          >
            Membership
          </Link>
          <Link
            to="/donate"
            className="px-6 py-2 bg-earth-accent text-white text-xs font-semibold tracking-widest uppercase rounded-full hover:bg-earth-accent/80 transition-colors shadow-sm"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden transition-colors text-earth-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[80px] md:top-[88px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg lg:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "relative text-xl font-serif font-medium transition-all duration-300 flex items-center justify-between pb-2 border-b border-earth-dark/5",
                    location.pathname.startsWith(link.path) ? link.color : cn("text-earth-dark", link.hoverColor)
                  )}
                >
                  {link.name}
                  {location.pathname.startsWith(link.path) && (
                    <div className={cn("w-2 h-2 rounded-full", link.borderColor.replace('border-', 'bg-'))} />
                  )}
                </Link>
              ))}
              <hr className="border-earth-dark/10 my-4" />
              <Link
                to="/membership"
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif text-earth-dark"
              >
                Membership
              </Link>
              <Link
                to="/donate"
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif text-earth-accent font-semibold"
              >
                Donate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
