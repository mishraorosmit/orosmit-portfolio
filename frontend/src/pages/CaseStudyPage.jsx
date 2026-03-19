import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStore from '@/store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function CaseStudyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const setCursorVariant = useStore(state => state.setCursorVariant);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_URL}/api/v1/portfolio/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error('Project not found (or backend DB is empty)');
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-primary flex items-center justify-center text-chrome font-mono">LOADING...</div>;
  if (error) return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-chrome font-mono text-center px-4">
      <p className="mb-4 text-ember text-xl">ERROR: {error}</p>
      <p className="mb-8 max-w-lg text-textSec text-sm">Make sure you have created this project in the Django Admin so its API endpoint returns data.</p>
      <button onClick={() => navigate('/portfolio')} className="text-chrome hover:text-ember cursor-none px-6 py-3 border border-border rounded" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>← BACK TO WORK</button>
    </div>
  );
  if (!project) return null;

  const bgGradient = `linear-gradient(135deg, rgba(255,69,0,0.1) 0%, var(--bg-primary) 100%)`;

  const nextId = parseInt(id, 10) + 1;

  return (
    <motion.div 
      initial={{ y: 60, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-primary min-h-screen w-full relative z-10"
    >
      {/* Navigation */}
      <button 
        onClick={() => navigate('/portfolio')}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className="absolute top-8 left-8 z-50 text-chrome font-mono text-xs tracking-widest uppercase hover:text-ember transition-colors cursor-none bg-transparent"
      >
        ← BACK TO WORK
      </button>

      {/* 1. HERO */}
      <section 
        className="w-full h-[50vh] relative flex flex-col items-center justify-center pt-16 px-6 overflow-hidden"
        style={{ background: bgGradient }}
      >
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="font-mono text-xs tracking-widest mb-6 py-1.5 px-4 rounded-full border border-borderMain text-ember bg-[rgba(255,69,0,0.05)]">
            {project.category.toUpperCase()} · {project.year}
          </div>
          <h1 className="font-display font-bold text-5xl md:text-[72px] text-chrome tracking-tighter max-w-4xl leading-[1.1] m-0">
            {project.title}
          </h1>
        </div>
      </section>

      {/* 2. QUICK STATS BAR */}
      <div className="w-full border-y border-borderMain bg-secondary flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-borderMain">
        <div className="flex-1 py-6 px-8 flex flex-col justify-center">
          <span className="font-mono text-[10px] text-textMut tracking-widest mb-1">CLIENT</span>
          <span className="font-mono text-sm text-chrome tracking-wider uppercase">Personal Project</span>
        </div>
        <div className="flex-1 py-6 px-8 flex flex-col justify-center">
          <span className="font-mono text-[10px] text-textMut tracking-widest mb-1">YEAR</span>
          <span className="font-mono text-sm text-chrome tracking-wider uppercase">{project.year}</span>
        </div>
        <div className="flex-1 py-6 px-8 flex flex-col justify-center">
          <span className="font-mono text-[10px] text-textMut tracking-widest mb-1">TYPE</span>
          <span className="font-mono text-sm text-chrome tracking-wider uppercase">{project.category}</span>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="max-w-[1200px] mx-auto px-6 py-24 flex flex-col gap-32">
        
        {/* 3. OVERVIEW SECTION */}
        {project.problem && (
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden">
            <div className="w-full md:w-[40%] relative">
              <h2 className="font-display font-extrabold text-[80px] md:text-[120px] text-transparent leading-none select-none pointer-events-none origin-top-left md:-rotate-90 md:absolute md:top-full md:left-0 md:-translate-y-full opacity-30" style={{ WebkitTextStroke: '1px var(--text-muted)' }}>
                THE PROBLEM
              </h2>
            </div>
            <div className="w-full md:w-[60%] pt-2 md:pt-12 z-10">
              <div 
                className="font-display text-lg md:text-2xl leading-relaxed text-chrome whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: project.problem }}
              />
            </div>
          </section>
        )}

        {/* 4. PROCESS SECTION */}
        {project.process && (
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden">
            <div className="w-full md:w-[40%] relative">
              <h2 className="font-display font-extrabold text-[80px] md:text-[120px] text-transparent leading-none select-none pointer-events-none origin-top-left md:-rotate-90 md:absolute md:top-full md:left-0 md:-translate-y-full opacity-30" style={{ WebkitTextStroke: '1px var(--text-muted)' }}>
                THE PROCESS
              </h2>
            </div>
            <div className="w-full md:w-[60%] pt-2 md:pt-12 z-10">
              <div 
                className="font-display text-lg md:text-2xl leading-relaxed text-chrome whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: project.process }}
              />
            </div>
          </section>
        )}

        {/* 5. SOLUTION SECTION */}
        {project.solution && (
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden">
            <div className="w-full md:w-[40%] relative">
              <h2 className="font-display font-extrabold text-[80px] md:text-[120px] text-transparent leading-none select-none pointer-events-none origin-top-left md:-rotate-90 md:absolute md:top-full md:left-0 md:-translate-y-full opacity-30" style={{ WebkitTextStroke: '1px var(--text-muted)' }}>
                THE SOLUTION
              </h2>
            </div>
            <div className="w-full md:w-[60%] pt-2 md:pt-12 flex flex-col gap-16 z-10">
              <div 
                className="font-display text-lg md:text-2xl leading-relaxed text-chrome whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: project.solution }}
              />
              <div className="w-full aspect-video bg-secondary rounded-xl border border-borderMain flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
                 {project.images && project.images.length > 0 ? (
                    <img src={project.images[0]} alt="Project preview" className="w-full h-full object-cover" />
                 ) : (
                    <span className="font-mono text-sm text-textMut">IMAGE PLACEHOLDER</span>
                 )}
              </div>
            </div>
          </section>
        )}

        {/* 6. RESULT SECTION */}
        {(project.result || project.live_url || project.github_url) && (
          <section className="flex flex-col md:flex-row gap-12 md:gap-24 relative overflow-hidden">
            <div className="w-full md:w-[40%] relative">
              <h2 className="font-display font-extrabold text-[80px] md:text-[120px] text-transparent leading-none select-none pointer-events-none origin-top-left md:-rotate-90 md:absolute md:top-full md:left-0 md:-translate-y-full opacity-30" style={{ WebkitTextStroke: '1px var(--text-muted)' }}>
                THE RESULT
              </h2>
            </div>
            <div className="w-full md:w-[60%] pt-2 md:pt-12 flex flex-col items-start gap-12 z-10">
              {project.result && (
                <div 
                  className="font-display text-lg md:text-2xl leading-relaxed text-chrome whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: project.result }}
                />
              )}
              <div className="flex flex-wrap gap-6">
                {project.live_url && (
                  <a 
                    href={project.live_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="inline-block bg-ember text-void hover:bg-chrome hover:text-void transition-colors font-bold uppercase tracking-widest text-sm px-8 py-4 rounded cursor-none shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                  >
                    VIEW LIVE →
                  </a>
                )}
                {project.github_url && (
                  <a 
                    href={project.github_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="inline-block bg-transparent border border-chrome text-chrome hover:bg-chrome hover:text-void transition-colors font-bold uppercase tracking-widest text-sm px-8 py-4 rounded cursor-none"
                  >
                    VIEW CODE →
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

      </div>

      {/* 7. NEXT PROJECT */}
      <button 
        onClick={() => navigate(`/portfolio/${nextId}`)}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className="w-full py-24 border-t border-borderMain bg-secondary hover:bg-primary transition-colors flex flex-col items-center justify-center gap-4 cursor-none group"
      >
        <span className="font-mono text-sm tracking-widest text-textMut group-hover:text-ember transition-colors">NEXT PROJECT →</span>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-chrome group-hover:scale-105 transition-transform duration-500">
          Continue Exploring
        </h2>
      </button>

    </motion.div>
  );
}
