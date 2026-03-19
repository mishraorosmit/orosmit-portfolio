import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

const timelineNodes = [
  { year: "2021", label: "Started coding" },
  { year: "2022", label: "First freelance client" },
  { year: "2023", label: "Launched vexx.tm" },
  { year: "2024", label: "Teaching 100+ students" },
];

export default function AboutSection() {
  const t = useTranslation();
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] flex items-center overflow-hidden z-10">

      
      {/* Massive Rotated Watermark */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none select-none mix-blend-difference z-0">
        <h1 className="text-[20rem] md:text-[30rem] font-display font-extrabold text-[var(--text-primary)] opacity-[0.02] leading-none m-0 p-0">
          ABOUT
        </h1>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col lg:flex-row items-center gap-16 lg:justify-end">
        
        {/* Empty left column for asymmetric layout on desktop */}
        <div className="hidden lg:block lg:w-1/3" />

        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-l-4 border-ember pl-6 md:pl-10 relative cursor-none"
          >
            {/* Brutalist pull quote */}
            <h3 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-primary)] leading-[1.2] mb-6 mix-blend-difference">
              "{t.about.quote}"
            </h3>
            
            <p className="font-mono text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-2xl text-justify group">
              {t.about.body}
            </p>

          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/resume/download/`, '_blank')}
            className="bg-transparent border border-[var(--border-strong)] text-[var(--text-primary)] px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--bg-primary)] transition-colors duration-300 w-fit cursor-none"

          >
            DOWNLOAD RESUME ↓
          </motion.button>

          {/* Minimal Horizontal Timeline */}
          <div className="mt-8 pt-12 border-t border-[var(--border)] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative">
              
              {/* Background line for timeline connected dots (desktop only) */}
              <div className="hidden md:block absolute top-[7px] left-0 w-full h-[1px] bg-[var(--border-default)] -z-10" />


              {timelineNodes.map((node, i) => (
                <motion.div
                  key={node.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex md:flex-col items-center md:items-start gap-4 cursor-none group"
                >
                  <div className="w-[15px] h-[15px] rounded-full bg-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center shrink-0 group-hover:border-[var(--accent)] transition-colors duration-300">
                    <div className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-[var(--accent)] font-bold tracking-widest mb-1">{node.year}</span>
                    <span className="font-mono text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-300">{node.label}</span>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
