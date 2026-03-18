import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useCountUp from '@/hooks/useCountUp';

const POSTER_BG_COLORS = ['#111111', '#0a0a0a', '#0d0005', '#0a0a0a', '#111111', '#0d0005'];

export default function BrandSection() {
  const stripRef = useRef(null);
  const isStripInView = useInView(stripRef, { once: true, margin: "0px 0px -50px 0px" });

  const num1 = useCountUp('12+', 1500, isStripInView);
  const num2 = useCountUp('500+', 2000, isStripInView);
  const num3 = useCountUp('∞', 1500, isStripInView);

  return (
    <section id="brand"  className="relative w-full py-24 overflow-hidden flex flex-col justify-center">
      {/* Black Curtain Wipe & Fade to Void */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ x: '-100%' }}
        whileInView={{ x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        style={{
          background: 'linear-gradient(to bottom, #000000 85%, var(--void) 100%)'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col mt-16 pb-16">
        
        {/* TOP HALF */}
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 flex flex-col items-start"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-white/40 mb-6 block">
              BRAND
            </span>
            
            <h2 className="font-display font-extrabold text-white text-[5rem] md:text-[6.5rem] lg:text-[7.5rem] leading-none tracking-tighter flex items-start">
              vexx<span className="text-[#FF0033] text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold mt-2 md:mt-4">.tm</span>
            </h2>
            
            <p className="font-mono italic text-xl md:text-2xl text-white/80 mt-6 mb-4">
              "Visual Identity for the Culturally Restless."
            </p>
            
            <p className="font-mono text-sm text-[#FF0033] uppercase tracking-widest max-w-sm mb-12 leading-relaxed">
              Instagram-based poster brand. Every drop is a statement.
            </p>
            
            <a 
              href="https://instagram.com/vexx.tm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white text-white font-mono text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 w-fit cursor-none"
            >
              FOLLOW ON INSTAGRAM →
            </a>
          </motion.div>

          {/* Right Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {POSTER_BG_COLORS.map((bg, i) => (
              <div 
                key={i} 
                className="cursor-none group"
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,0,51,0.15)',
                  aspectRatio: '3/4',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,0,51,0.5)'
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255,0,51,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,0,51,0.15)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={{ fontFamily: 'Space Mono', color: 'rgba(255,0,51,0.2)', fontSize: '18px', letterSpacing: '0.3em', userSelect: 'none', pointerEvents: 'none' }}>
                  vexx.tm
                </span>
              </div>
            ))}
          </motion.div>
          
        </div>

          <motion.div 
          ref={stripRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full border-t border-white/10 pt-16 mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left"
        >
          <div className="flex flex-col gap-2">
            <span className="font-display font-extrabold text-white text-5xl md:text-[64px] leading-none mb-2">
              {num1}
            </span>
            <span className="font-mono text-[11px] text-[#FF0033] uppercase tracking-widest font-bold">
              Poster Drops
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="font-display font-extrabold text-white text-5xl md:text-[64px] leading-none mb-2">
              {num2}
            </span>
            <span className="font-mono text-[11px] text-[#FF0033] uppercase tracking-widest font-bold">
              Followers & Growing
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-display font-extrabold text-white text-5xl md:text-[64px] leading-none mb-2">
              {num3}
            </span>
            <span className="font-mono text-[11px] text-[#FF0033] uppercase tracking-widest font-bold">
              Ideas in the Queue
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
