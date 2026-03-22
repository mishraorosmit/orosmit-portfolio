import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ComingSoonNotification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen and closed the notification in this session
    const hasSeenNotification = sessionStorage.getItem('hasSeenComingSoonNotification');
    
    if (!hasSeenNotification) {
      // Small delay for better UX after initial load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenComingSoonNotification', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop with heavy blur for a premium glass/void feel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-void/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className="relative w-full max-w-[420px] bg-void border border-ember/20 p-10 md:p-12 shadow-[0_0_80px_rgba(255,107,0,0.1)] group overflow-hidden"
          >
            {/* Animated Glow Effect Background */}
            <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.03)_0%,transparent_50%)] pointer-events-none" />
            
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-12 h-[1px] bg-ember/40" />
            <div className="absolute top-0 left-0 w-[1px] h-12 bg-ember/40" />
            <div className="absolute bottom-0 right-0 w-12 h-[1px] bg-ember/40" />
            <div className="absolute bottom-0 right-0 w-[1px] h-12 bg-ember/40" />

            {/* Close button with hover animation */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-chrome/30 hover:text-ember transition-all duration-300 hover:rotate-90 group/close"
              aria-label="Close notification"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="relative z-10 text-center">
              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-ember/5 border border-ember/10 rounded-full mb-8"
              >
                <span className="w-1.5 h-1.5 bg-ember rounded-full animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-ember/80">SYSTEM DEPLOYMENT</span>
              </motion.div>

              <h2 className="font-display text-4xl font-bold text-chrome mb-6 tracking-tight uppercase leading-none">
                COMING<br/><span className="text-ember">SOON</span>
              </h2>

              <div className="w-16 h-[2px] bg-ember/30 mx-auto mb-8" />

              <p className="font-sans text-chrome/60 text-sm leading-relaxed mb-10 tracking-wide uppercase-style">
                The full portal is under orchestration. 
                <span className="block mt-2 font-medium text-chrome">Web page will be available soon.</span>
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="w-full relative group/btn"
              >
                <div className="absolute inset-0 bg-ember blur-sm opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" />
                <div className="relative z-10 py-5 bg-void border border-ember/40 text-ember hover:bg-ember hover:text-void transition-all duration-500 font-bold text-[10px] tracking-[0.4em] uppercase">
                  ENTER PREVIEW
                </div>
              </motion.button>
              
              <div className="mt-6 text-[9px] font-mono text-chrome/20 tracking-[0.1em] uppercase">
                &copy; OROSMIT MISHRA {new Date().getFullYear()} — INTEGRITY VERIFIED
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonNotification;
