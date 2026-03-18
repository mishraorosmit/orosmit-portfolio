import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';

export default function LoadingScreen() {
  const hasLoaded = useStore(state => state.hasLoaded);
  const setHasLoaded = useStore(state => state.setHasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded, setHasLoaded]);

  return (
    <AnimatePresence>
      {!hasLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-void flex items-center justify-center cursor-none"
        >
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M30 20 C10 20 10 80 30 80 C50 80 50 20 30 20 Z"
              stroke="#C0C0C0"
              strokeWidth="2"
              transition={{ duration: 1.2, ease: "easeInOut" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
            <motion.path
              d="M50 80 L50 20 L75 50 L100 20 L100 80"
              stroke="#FF4500"
              strokeWidth="2"
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
