import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CATEGORY_COLORS = {
  design: 'var(--accent)',
  tech: '#38bdf8',
  teaching: '#4ade80',
  life: '#c084fc'
};

const CATEGORIES = ['ALL', 'DESIGN', 'TECH', 'TEACHING', 'LIFE'];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState('ALL');
  const navigate = useNavigate();
  const setCursorVariant = useStore(state => state.setCursorVariant);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/v1/blog/`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

  const filtered = active === 'ALL' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === active.toLowerCase());

  return (
    <div className="min-h-screen pt-[120px] pb-24 px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: 'var(--text-secondary)' }}>
            ARCHIVE
          </p>
          <h1 className="font-display font-extrabold text-[80px] m-0 leading-none" style={{ color: 'var(--text-primary)' }}>
            THOUGHTS
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="font-mono text-[11px] tracking-[0.1em] px-5 py-2 rounded transition-all duration-200 cursor-none"
              style={{
                background: active === cat ? 'var(--accent)' : 'transparent',
                color: active === cat ? 'var(--bg-primary)' : 'var(--text-primary)',
                border: active === cat ? '1px solid var(--accent)' : '1px solid var(--border)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(post => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, scale:0.95 }}
                transition={{ duration:0.35 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full p-8 rounded-xl cursor-none flex flex-col justify-between min-h-[280px] group transition-transform hover:-translate-y-1 duration-300"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
              >
                <div>
                   <div 
                      className="inline-block px-3 py-1 border rounded font-mono text-[10px] tracking-widest uppercase mb-6 font-bold"
                      style={{ backgroundColor: CATEGORY_COLORS[post.category] || 'var(--text-primary)', borderColor: CATEGORY_COLORS[post.category] || 'var(--text-primary)', color: 'var(--bg-primary)' }}
                   >
                     {post.category}
                   </div>
                   <h3 className="font-display font-bold text-2xl transition-colors leading-tight tracking-tight mb-4 group-hover:text-ember" style={{ color: 'var(--text-primary)' }}>
                     {post.title}
                   </h3>
                   <p className="font-mono text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                     {post.excerpt}
                   </p>
                </div>
                <div className="font-mono text-xs mt-8 tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {post.reading_time} MIN READ · {(new Date(post.created_at)).toLocaleDateString('en-US', {month:'short', day:'numeric'})}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
