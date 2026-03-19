import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import useStore from '@/store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CATEGORY_COLORS = {
  design: 'var(--accent)',
  tech: '#38bdf8',
  teaching: '#4ade80',
  life: '#c084fc'
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const setCursorVariant = useStore(state => state.setCursorVariant);
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    fetch(`${API_URL}/api/v1/blog/${slug}/`)
      .then(res => {
         if (!res.ok) throw new Error('Not found');
         return res.json();
      })
      .then(data => {
         setPost(data);
         return fetch(`${API_URL}/api/v1/blog/`);
      })
      .then(res => res.json())
      .then(all => {
         const others = all.filter(p => p.slug !== slug).slice(0, 2);
         setRelated(others);
         setLoading(false);
      })
      .catch(err => {
         console.error(err);
         setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-mono" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>LOADING...</div>;
  if (!post) return <div className="min-h-screen flex flex-col items-center justify-center font-mono" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}><p className="mb-4">POST NOT FOUND</p><button onClick={() => navigate('/blog')} className="hover:text-[var(--accent)] cursor-none" onMouseEnter={() => setCursorVariant('hover')} onMouseLeave={() => setCursorVariant('default')}>← BACK TO BLOG</button></div>;

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{ scaleX, background: CATEGORY_COLORS[post.category] || 'var(--accent)' }}
      />
      
      {/* Nav back */}
      <button 
        onClick={() => navigate('/blog')}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className="fixed top-8 left-8 z-50 font-mono text-xs tracking-widest uppercase transition-colors cursor-none bg-transparent"
        style={{ color: 'var(--text-primary)' }}
        onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}
      >
        ← ALL POSTS
      </button>

      {/* Hero */}
      <header className="pt-32 pb-16 px-6 md:px-8 max-w-4xl mx-auto flex flex-col items-center text-center">
        <div 
          className="inline-block px-3 py-1 border rounded font-mono text-xs tracking-widest uppercase mb-8 font-bold"
          style={{ backgroundColor: CATEGORY_COLORS[post.category] || 'var(--text-primary)', borderColor: CATEGORY_COLORS[post.category] || 'var(--text-primary)', color: 'var(--bg-primary)' }}
        >
          {post.category}
        </div>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tighter leading-[1.1] mb-8" style={{ color: 'var(--text-primary)' }}>
          {post.title}
        </h1>
        <div className="font-mono text-sm tracking-widest flex items-center justify-center gap-4" style={{ color: 'var(--text-secondary)' }}>
          <span>{post.reading_time} MIN READ</span>
          <span>·</span>
          <span>{(new Date(post.created_at)).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})}</span>
        </div>
      </header>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 pb-32">
        <div 
          className="font-display text-xl md:text-2xl leading-relaxed whitespace-pre-wrap py-8 border-t border-[var(--border)]"
          style={{ color: 'var(--text-primary)' }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full py-24 px-6 md:px-8 border-t border-[var(--border)]" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h3 className="font-mono text-sm tracking-[0.2em] uppercase mb-12" style={{ color: 'var(--text-secondary)' }}>
              MORE THOUGHTS →
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(r => (
                <motion.div 
                  key={r.id}
                  onClick={() => navigate(`/blog/${r.slug}`)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-full p-8 rounded-xl cursor-none flex flex-col justify-between min-h-[220px] group transition-transform hover:-translate-y-1 duration-300"
                  style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
                >
                  <div>
                     <div 
                        className="inline-block px-3 py-1 border rounded font-mono text-[10px] tracking-widest uppercase mb-4 font-bold"
                        style={{ backgroundColor: CATEGORY_COLORS[r.category] || 'var(--text-primary)', borderColor: CATEGORY_COLORS[r.category] || 'var(--text-primary)', color: 'var(--bg-primary)' }}
                     >
                       {r.category}
                     </div>
                     <h4 className="font-display font-bold text-xl transition-colors leading-tight tracking-tight mb-3 group-hover:text-ember" style={{ color: 'var(--text-primary)' }}>
                       {r.title}
                     </h4>
                  </div>
                  <div className="font-mono text-xs mt-6 tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    {r.reading_time} MIN READ
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
