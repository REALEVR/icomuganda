import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Medal, FileText, Calendar, BookOpen, ChevronRight, LogOut } from 'lucide-react';
import { useState } from 'react';
import { logout } from '../lib/auth';

export function MemberDashboard({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-earth-dark text-white p-1 rounded-full shadow-2xl border-4 border-earth-accent-bright flex items-center gap-3 pr-4 group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden bg-earth flex items-center justify-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'Member'} className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="w-5 h-5 text-white/70" />
            )}
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">ICOM Member</span>
            <span className="text-sm font-medium leading-none">{user.displayName?.split(' ')[0] || 'Dashboard'}</span>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm sm:max-w-md bg-stone h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 bg-earth-dark text-white flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-earth-accent-bright bg-earth shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'Member'} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-8 h-8 text-white/50" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold line-clamp-1">{user.displayName || 'ICOM Member'}</h2>
                    <div className="flex items-center gap-1.5 mt-1 text-earth-accent-bright text-sm">
                      <Medal className="w-4 h-4 shrink-0" />
                      <span>Professional Member</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-earth-dark/80 uppercase tracking-widest mb-4">Membership Status</h3>
                  <div className="bg-white p-4 rounded-2xl border border-black/5 flex justify-between items-center sm:text-base text-sm">
                    <div>
                      <div className="text-sm text-earth-dark/80 mb-1">Status</div>
                      <div className="text-green-600 font-semibold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" /> Active
                      </div>
                    </div>
                    <div className="w-px h-8 bg-black/10" />
                    <div className="text-right">
                      <div className="text-sm text-earth-dark/80 mb-1">Valid Until</div>
                      <div className="font-semibold text-earth-dark">Dec 2026</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-earth-dark/80 uppercase tracking-widest mb-4">Exclusive Content</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-earth-accent/10 transition-colors rounded-2xl border border-black/5 group text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 bg-earth-dark/5 text-earth-dark rounded-full flex items-center justify-center">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-earth-dark group-hover:text-earth text-sm sm:text-base">ICOM Code of Ethics PDF</div>
                          <div className="text-xs text-earth-dark/75 mt-0.5">Updated 2025 Edition</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-earth-dark/30 group-hover:text-earth-dark transition-colors shrink-0" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-earth-accent/10 transition-colors rounded-2xl border border-black/5 group text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 bg-earth-dark/5 text-earth-dark rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-earth-dark group-hover:text-earth text-sm sm:text-base">Member Assembly '26</div>
                          <div className="text-xs text-earth-dark/75 mt-0.5">Register for VIP access</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-earth-dark/30 group-hover:text-earth-dark transition-colors shrink-0" />
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-earth-accent/10 transition-colors rounded-2xl border border-black/5 group text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 bg-earth-dark/5 text-earth-dark rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-earth-dark group-hover:text-earth text-sm sm:text-base">Grant Applications</div>
                          <div className="text-xs text-earth-dark/75 mt-0.5">Download form templates</div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-earth-dark/30 group-hover:text-earth-dark transition-colors shrink-0" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-white border-t border-black/5">
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 flex items-center justify-center gap-2 text-earth-dark hover:bg-earth-dark/5 rounded-xl transition-colors font-semibold shadow-sm border border-earth-dark/10"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
