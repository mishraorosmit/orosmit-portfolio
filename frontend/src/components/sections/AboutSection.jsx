import { motion } from 'framer-motion';

const timelineNodes = [
  { year: "2021", label: "Started coding" },
  { year: "2022", label: "First freelance client" },
  { year: "2023", label: "Launched vexx.tm" },
  { year: "2024", label: "Teaching 100+ students" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-void flex items-center overflow-hidden z-10">
      
      {/* Massive Rotated Watermark */}
      <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none select-none mix-blend-difference z-0">
        <h1 className="text-[20rem] md:text-[30rem] font-display font-extrabold text-chrome opacity-[0.03] leading-none m-0 p-0">
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
            <h3 className="text-3xl md:text-5xl font-display font-bold text-chrome leading-[1.2] mb-6 mix-blend-difference">
              "I build things that look impossible and teach things that feel inevitable."
            </h3>
            
            <p className="font-mono text-starDust text-sm md:text-base leading-relaxed max-w-2xl text-justify group">
              My name is Orosmit Mishra. Based in India, I am a multidisciplinary creator bridging the gap between logic and aesthetics. By day, I engineer robust web systems and craft immersive visuals. By night, I break down complex physics concepts for the next generation of thinkers.
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/resume/download/`, '_blank')}
            className="bg-transparent border border-starDust/40 text-chrome px-8 py-3 font-mono text-xs uppercase tracking-widest hover:bg-ember hover:border-ember hover:text-void transition-colors duration-300 w-fit cursor-none"
          >
            DOWNLOAD RESUME ↓
          </motion.button>

          {/* Minimal Horizontal Timeline */}
          <div className="mt-8 pt-12 border-t border-[rgba(192,192,192,0.1)] w-full">
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative">
              
              {/* Background line for timeline connected dots (desktop only) */}
              <div className="hidden md:block absolute top-[7px] left-0 w-full h-[1px] bg-[rgba(192,192,192,0.1)] -z-10" />

              {timelineNodes.map((node, i) => (
                <motion.div
                  key={node.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex md:flex-col items-center md:items-start gap-4 cursor-none group"
                >
                  <div className="w-[15px] h-[15px] rounded-full bg-void border border-starDust/40 flex items-center justify-center shrink-0 group-hover:border-ember transition-colors duration-300">
                    <div className="w-[5px] h-[5px] rounded-full bg-ember shadow-[0_0_10px_rgba(255,69,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-ember font-bold tracking-widest mb-1">{node.year}</span>
                    <span className="font-mono text-sm text-starDust opacity-60 group-hover:opacity-100 transition-opacity duration-300">{node.label}</span>
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
