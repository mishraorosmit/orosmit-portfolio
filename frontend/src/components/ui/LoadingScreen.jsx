import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';

export default function LoadingScreen() {
  const hasLoaded = useStore(state => state.hasLoaded);
  const setHasLoaded = useStore(state => state.setHasLoaded);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [hasLoaded, setHasLoaded]);

  useEffect(() => {
    // 1.2s path duration + 0.2s delay for the second path
    const drawTimer = setTimeout(() => {
      setIsDrawn(true);
    }, 1400);
    return () => clearTimeout(drawTimer);
  }, []);

  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    })), []);

  const nameWords = ["OROSMIT", "MISHRA"];

  return (
    <AnimatePresence>
      {!hasLoaded && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            clipPath: 'inset(50% 0% 50% 0%)',
            transition: { 
              duration: 0.5, 
              ease: [0.76, 0, 0.24, 1],
              opacity: { duration: 0.3 }
            }
          }}
          className="fixed inset-0 z-[1000] bg-[var(--bg-primary)] flex flex-col items-center justify-center cursor-none overflow-hidden"

        >
          {/* Background Layers */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(255, 69, 0, 0.08) 0%, transparent 60%),
                linear-gradient(rgba(255, 69, 0, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 69, 0, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '100% 100%, 32px 32px, 32px 32px'
            }}
          />

          {/* Particle Field */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0.1, scale: 1 }}
              animate={{ 
                opacity: [0.1, 0.4, 0.1], 
                scale: [1, 1.5, 1] 
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bg-[var(--text-primary)] rounded-full z-10"

              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}

          {/* OM SVG */}
          <div className="relative flex items-center justify-center z-20">
            {/* Burst Effect */}
            <AnimatePresence>
              {isDrawn && (
                <motion.div
                  key="burst"
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute w-[200px] h-[200px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 69, 0, 0.2), transparent)'
                  }}
                />
              )}
            </AnimatePresence>

            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-30">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M30 20 C10 20 10 80 30 80 C50 80 50 20 30 20 Z"
                stroke="#FF4500"
                strokeWidth="2"
                filter="url(#glow)"
                transition={{ duration: 1.2, ease: "easeInOut" }}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  stroke: isDrawn ? ["var(--accent)", "var(--text-primary)", "var(--accent)"] : "var(--accent)"

                }}
              />
              <motion.path
                d="M50 80 L50 20 L75 50 L100 20 L100 80"
                stroke="#C0C0C0"
                strokeWidth="2"
                filter="url(#glow)"
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  stroke: isDrawn ? ["var(--text-secondary)", "var(--text-primary)", "var(--text-secondary)"] : "var(--text-secondary)"

                }}
              />
            </svg>
          </div>

          {/* BELOW THE OM */}
          <div className="mt-8 flex flex-col items-center gap-4 z-20">
            {/* Name Reveal */}
            <div className="flex gap-4 font-['Space_Mono'] text-[11px] tracking-[0.4em] text-[var(--text-muted)] uppercase">
              {nameWords.map((word, wIdx) => (
                <div key={wIdx} className="flex overflow-hidden">
                  {word.split('').map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={isDrawn ? { y: 0, opacity: 1 } : {}}
                      transition={{
                        delay: 0.3 + (wIdx * 7 + cIdx) * 0.03, // 0.3s after draw completes
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </div>

            {/* Loading Bar */}
            <div className="w-[200px] h-[1px] bg-[var(--border-subtle)] overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--text-secondary)]"

              />
            </div>
          </div>

          {/* Bottom Corner Text */}
          <div className="absolute bottom-8 left-8 font-['Space_Mono'] text-[9px] text-[var(--text-muted)] tracking-wider opacity-60">
            V1.0
          </div>
          <div className="absolute bottom-8 right-8 font-['Space_Mono'] text-[9px] text-[var(--text-muted)] tracking-wider opacity-60">
            INDIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
