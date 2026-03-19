import { useRef } from 'react';
import { motion } from 'framer-motion';
import useStore from '@/store/useStore';
import SkillsOrb from '@/components/three/SkillsOrb';
import { useTranslation } from '@/hooks/useTranslation';

const SKILLS = [
  { id: 1, name: 'Graphic Design', desc: 'Visual identity, UI/UX, and brand aesthetics.' },
  { id: 2, name: 'Web Development', desc: 'Full-stack systems using Django and React.' },
  { id: 3, name: 'Physics Teaching', desc: 'Breaking down the fundamental rules of the universe.' },
  { id: 4, name: 'Mathematics', desc: 'Analytical problem solving and algorithmic logic.' },
  { id: 5, name: 'DSA & Python', desc: 'Data structures, algorithms, and backend scripting.' },
  { id: 6, name: 'Creative Writing', desc: 'Poetry, narratives, and compelling copywriting.' },
];

function SkillCard({ skill, index }) {
  const cardRef = useRef(null);
  const setHoveredSkill = useStore(state => state.setHoveredSkill);
  const setCursorVariant = useStore(state => state.setCursorVariant);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    
    // Normalize to [-1, 1]
    const x = (e.clientX - cx) / (width / 2);
    const y = (e.clientY - cy) / (height / 2);

    // Max rotation 12deg -> inverted mapping for 3D feel
    const rotateX = -y * 12;
    const rotateY = x * 12;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.transition = 'none'; // Instant follow
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    cardRef.current.style.transition = 'transform 0.5s ease-out';
    setHoveredSkill(null);
    setCursorVariant('default');
  };

  const handleMouseEnter = () => {
    setHoveredSkill(index);
    setCursorVariant('hover');
  };

  const numberStr = skill.id < 10 ? `0${skill.id}` : skill.id;

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 flex flex-col justify-end min-h-[280px] hover:border-ember hover:shadow-[0_0_20px_rgba(255,69,0,0.3)] transition-colors duration-300 relative overflow-hidden group"
      >
        {/* Background Number */}
        <span className="absolute top-4 right-6 font-mono font-bold text-[96px] text-chrome opacity-[0.06] select-none pointer-events-none transform translate-x-4 -translate-y-4 group-hover:text-ember transition-colors duration-500">
          {numberStr}
        </span>
        
        <div className="relative z-10 pointer-events-none">
          <h3 className="text-2xl font-display font-bold text-chrome mb-4 tracking-tight group-hover:text-ember transition-colors duration-300">
            {skill.name}
          </h3>
          <p className="font-mono text-sm text-starDust leading-relaxed">
            {skill.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const t = useTranslation();

  return (
    <section id="skills"  className="relative w-full py-24 md:py-32 bg-void border-t border-starDust/20 overflow-hidden">
      
      {/* 3D Orb Canvas Wrapper */}
      <div className="absolute top-16 right-8 w-[300px] h-[300px] z-0 pointer-events-none hidden lg:block">
        <SkillsOrb />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 mt-8"
        >
          <h2 className="text-chrome font-display uppercase leading-[0.9]">
            <span className="block text-5xl md:text-7xl font-bold tracking-tighter text-starDust">{t.skills.heading}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
