import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroScene from '@/components/three/HeroScene';
import MagneticButton from '@/components/ui/MagneticButton';
import useStore from '@/store/useStore';
import { useTranslation } from '@/hooks/useTranslation';

const TITLES = [
  "Graphic Designer",
  "Web Developer",
  "Physics Teacher",
  "Poet",
  "Brand Builder"
];

export default function HeroSection() {
  const containerRef = useRef();
  const [titleIndex, setTitleIndex] = useState(0);
  const setCursorVariant = useStore(state => state.setCursorVariant);
  const t = useTranslation();
  const TITLES = t.hero.taglines;

  // Tagline cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance animation
  useGSAP(() => {
    gsap.from(".hero-char", {
      y: -150,
      opacity: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });
  }, { scope: containerRef });

  const word1 = "OROSMIT".split("");
  const word2 = "MISHRA".split("");

  return (
    <section id="hero"  ref={containerRef} className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-8 max-w-[1440px] mx-auto overflow-hidden text-[var(--text-primary)]">

      
      {/* LEFT SIDE (60%) */}
      <div className="w-full md:w-[60%] flex flex-col z-10 pt-32 md:pt-0">
        <p className="font-mono text-sm tracking-widest text-[var(--text-muted)] mb-6">{t.hero.available}</p>

        
        <h1 className="text-7xl md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter mix-blend-difference mb-6">
          <div className="overflow-hidden flex">
            {word1.map((char, i) => (
              <span key={`1-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
          <div className="overflow-hidden flex">
            {word2.map((char, i) => (
              <span key={`2-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
        </h1>

        <div style={{ height: '32px', overflow: 'hidden', position: 'relative', marginBottom: '48px' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ 
                position: 'absolute',
                fontFamily: 'Space Mono',
                fontSize: '16px',
                color: 'var(--text-secondary)'
              }}
            >
              {TITLES[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex gap-6 items-center">
          <div onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
            <MagneticButton 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[var(--accent)] text-[var(--bg-primary)] font-bold uppercase py-4 px-8 border border-[var(--accent)] border-solid shadow-[0_0_20px_var(--accent-glow)] hover:shadow-[0_0_30px_var(--accent-glow)]"
            >
              {t.hero.cta_work}
            </MagneticButton>

          </div>
          <div onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>
            <MagneticButton 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent text-[var(--text-primary)] font-bold uppercase py-4 px-8 border border-[var(--text-primary)] border-solid hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]"
            >
              {t.hero.cta_hire}
            </MagneticButton>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE (40%) */}
      <div className="absolute top-0 right-0 w-full h-full md:w-[45%] md:h-screen z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember opacity-15 blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
        <HeroScene />
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="absolute bottom-12 left-8 md:left-auto md:right-8 flex flex-col items-center gap-4 text-[var(--text-muted)] opacity-70">
        <span className="font-mono text-xs tracking-[0.2em] transform rotate-90 translate-y-[-20px] origin-bottom mb-4">SCROLL</span>
        <div className="w-[1px] h-10 bg-[var(--border-default)] relative overflow-hidden">
          <div className="absolute top-0 w-full bg-[var(--text-primary)] animate-drop-line" />
        </div>
      </div>

    </section>
  );
}
