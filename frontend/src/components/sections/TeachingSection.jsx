import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const TEACHING_ITEMS = [
  { id: 1, icon: '⚡', title: 'Physics (Class 11–12)', tagline: 'Concepts over formulas. Intuition over memorization.' },
  { id: 2, icon: '🔢', title: 'Mathematics', tagline: 'From limits to infinity. Rigorously beautiful.' },
  { id: 3, icon: '🌳', title: 'DSA in Java', tagline: "Algorithms aren't scary. Let me prove it." },
  { id: 4, icon: '🐍', title: 'Python', tagline: 'Beginner to builder. Zero to deployed.' },
];

function TeachingCard({ item, index }) {
  const cardRef = useRef(null);
  const t = useTranslation();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const x = (e.clientX - cx) / (width / 2);
    const y = (e.clientY - cy) / (height / 2);
    const rotateX = -y * 12;
    const rotateY = x * 12;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.transition = 'none';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    cardRef.current.style.transition = 'transform 0.5s ease-out';
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full perspective-[1000px]"
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={scrollToContact}
        className="w-full bg-card border border-[var(--border)] rounded-2xl p-8 min-h-[260px] flex flex-col hover:border-ember/50 hover:shadow-[0_0_20px_rgba(255,69,0,0.15)] transition-all duration-300 relative overflow-hidden group cursor-none"
      >
        <div className="text-[48px] text-ember mb-auto drop-shadow-[0_0_10px_rgba(255,69,0,0.5)] leading-none select-none">
          {item.icon}
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-display font-bold text-chrome mb-2 group-hover:text-ember transition-colors">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-starDust opacity-50 mb-6 group-hover:opacity-80 transition-opacity">
            {item.tagline}
          </p>
          <div className="border-t border-starDust/20 pt-4 flex items-center font-mono text-xs text-chrome group/link transition-colors duration-300 group-hover:border-ember/30">
             {t.teaching.book}
             <span className="transform ml-2 group-hover/link:translate-x-2 transition-transform text-ember"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeachingSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const t = useTranslation();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="teaching"  className="w-full pt-32 bg-void overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 mb-32">
        
        <div className="mb-20 text-center md:text-left" ref={headerRef}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-chrome tracking-tight relative inline-block">
            {t.teaching.heading}
            <div 
              className="absolute -bottom-4 left-0 h-[2px] bg-ember transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{ width: isHeaderInView ? '100%' : '0%' }}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 max-w-5xl mx-auto md:mr-0 md:ml-auto">
          {TEACHING_ITEMS.map((item, i) => (
            <TeachingCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* CTA STRIP */}
      <div 
        onClick={scrollToContact}
        className="w-full bg-ember py-10 px-8 cursor-none relative group overflow-hidden border-y border-[#ff5511] hover:bg-[#ff5511] transition-colors duration-300"
      >
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px)' }}
        />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
           <h3 className="text-void font-display font-bold text-2xl md:text-3xl tracking-tight m-0">
             {t.teaching.cta}
           </h3>
           <div className="text-void font-display font-bold text-lg md:text-xl tracking-widest uppercase flex items-center gap-2 group/btn">
             {t.teaching.get_in_touch}
             <span className="transform group-hover/btn:translate-x-2 transition-transform"></span>
           </div>
        </div>
      </div>
    </section>
  );
}
