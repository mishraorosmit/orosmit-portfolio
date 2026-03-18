import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const setCursorVariant = useStore(state => state.setCursorVariant);

  useEffect(() => {
    const checkScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-ember text-void flex items-center justify-center shadow-[0_0_15px_rgba(255,69,0,0.4)] hover:bg-chrome transition-colors duration-300 font-bold cursor-none"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
