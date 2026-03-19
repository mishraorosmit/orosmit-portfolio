import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/useStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CATEGORY_COLORS = {
  design: 'var(--accent)',
  tech: '#38bdf8',
  teaching: '#4ade80',
  life: '#c084fc'
};

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const setCursorVariant = useStore(state => state.setCursorVariant);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/blog/`)
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="thoughts" className="w-full py-32 px-6 md:px-8 bg-primary relative z-10 border-t border-[var(--border)]" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-start mb-20 text-[var(--text-primary)]">
          <p className="font-mono text-xs tracking-[0.3em] mb-4 uppercase" style={{ color: 'var(--text-secondary)' }}>
            THOUGHTS
          </p>
          <h2 className="font-display font-extrabold text-5xl md:text-[56px] tracking-tighter uppercase leading-[1.1]">
            THINGS I THINK ABOUT
          </h2>
        </div>

        <div className="w-full flex flex-col gap-6">
          {/* Main feature post */}
          {posts[0] && (
            <motion.div 
              onClick={() => navigate(`/blog/${posts[0].slug}`)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="w-full h-auto min-h-[200px] md:h-[200px] rounded-xl cursor-none flex flex-col md:flex-row overflow-hidden group transition-transform hover:-translate-y-1 duration-300"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="w-full md:w-[60%] p-8 flex flex-col justify-between">
                <div>
                   <div 
                      className="inline-block px-3 py-1 border rounded font-mono text-[10px] tracking-widest uppercase mb-4 font-bold"
                      style={{ backgroundColor: CATEGORY_COLORS[posts[0].category] || 'var(--text-primary)', borderColor: CATEGORY_COLORS[posts[0].category] || 'var(--text-primary)', color: 'var(--bg-primary)' }}
                   >
                     {posts[0].category}
                   </div>
                   <h3 className="font-display font-bold text-3xl md:text-4xl transition-colors leading-none tracking-tight mb-3 group-hover:text-ember" style={{ color: 'var(--text-primary)' }}>
                     {posts[0].title}
                   </h3>
                   <p className="font-mono text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                     {posts[0].excerpt}
                   </p>
                </div>
                <div className="font-mono text-xs mt-6 md:mt-0 tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {posts[0].reading_time} MIN READ · {(new Date(posts[0].created_at)).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}
                </div>
              </div>
              <div className="hidden md:block w-[40%] h-full relative" style={{ backgroundColor: CATEGORY_COLORS[posts[0].category] || 'var(--border)' }}>
                 <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px'}}></div>
              </div>
            </motion.div>
          )}

          {/* Secondary posts */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(1, 3).map(post => (
              <motion.div 
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full p-8 rounded-xl cursor-none flex flex-col justify-between min-h-[250px] group transition-transform hover:-translate-y-1 duration-300"
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
          </div>

          <div className="mt-16 w-full flex justify-center">
            <button
               onClick={() => navigate('/blog')}
               onMouseEnter={() => setCursorVariant('hover')}
               onMouseLeave={() => setCursorVariant('default')}
               className="font-mono text-xs tracking-[0.2em] px-8 py-4 uppercase transition-colors cursor-none rounded"
               style={{ color: 'var(--text-primary)', border: '1px solid var(--border)', background: 'transparent' }}
               onMouseOver={(e) => { e.currentTarget.style.background = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
               onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              READ ALL POSTS →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
