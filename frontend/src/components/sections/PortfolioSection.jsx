import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '@/hooks/useTranslation'

const projects = [
  { id:1, title:"Brand Identity — vexx.tm", category:"design", tags:["branding","poster"], year:"2024", bg:"#1a0808" },
  { id:2, title:"Django REST Portfolio API", category:"web", tags:["django","python"], year:"2024", bg:"#08081a" },
  { id:3, title:"Physics Notes App", category:"web", tags:["react","education"], year:"2023", bg:"#080d08" },
  { id:4, title:"vexx.tm Poster Drop Vol.2", category:"brand", tags:["vexx","art"], year:"2024", bg:"#1a0808" },
  { id:5, title:"Student Dashboard UI", category:"web", tags:["react","ui"], year:"2023", bg:"#08081a" },
  { id:6, title:"Conceptual Series III", category:"design", tags:["poster","concept"], year:"2023", bg:"#0d0808" },
]

const categories = ['ALL','DESIGN','WEB','BRAND']

export default function PortfolioSection() {
  const [active, setActive] = useState('ALL')
  const navigate = useNavigate()
  const t = useTranslation()
  
  const filtered = active === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === active.toLowerCase())

  return (
    <section id="portfolio" className="relative w-full py-24 md:py-32 bg-[var(--bg-primary)] overflow-hidden z-20">
      
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'48px' }}>
        <h2 style={{ fontFamily:'Syne', fontSize:'56px', fontWeight:'800', color:'var(--text-primary)', margin:0 }}>

          {t.portfolio.heading}
        </h2>
        <button
          onClick={() => navigate('/portfolio')}
          style={{ fontFamily:'Space Mono', fontSize:'12px', color:'var(--accent)', background:'none', border:'none', cursor:'none', letterSpacing:'0.1em' }}

        >
          {t.portfolio.see_all}
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'12px', marginBottom:'40px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              fontFamily:'Space Mono', fontSize:'11px', letterSpacing:'0.1em',
              padding:'8px 20px', borderRadius:'4px', cursor:'none',
              background: active === cat ? 'var(--accent)' : 'transparent',
              color: active === cat ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: `1px solid ${active === cat ? 'var(--accent)' : 'var(--border-strong)'}`,
              transition:'all 0.2s ease'

            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map(p => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, scale:0.95 }}
              transition={{ duration:0.35 }}
              className="group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl overflow-hidden cursor-none hover:border-[var(--accent)] transition-all duration-500 h-[450px]"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.transition = 'all 0.3s ease'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Image placeholder */}
              <div style={{
                height:'180px',
                background:`linear-gradient(135deg, var(--accent-bg), rgba(0,0,0,0.9))`,
                display:'flex', alignItems:'center', justifyContent:'center'
              }}>
                <span style={{ fontFamily:'Syne', fontSize:'52px', fontWeight:'800', color:'var(--text-muted)', opacity: 0.1 }}>
                  {p.title.split('').slice(0,2).join('')}
                </span>
              </div>
              {/* Content */}
              <div style={{ padding:'20px' }}>
                <span style={{
                  fontFamily:'Space Mono', fontSize:'10px', letterSpacing:'0.1em',
                  color:'var(--accent)', background:'var(--accent-bg)',
                  borderColor:'var(--accent-border)',
                  padding:'3px 8px', borderRadius:'3px',
                  border:'1px solid var(--accent-border)'

                }}>
                  {p.category.toUpperCase()}
                </span>
                <h3 style={{ fontFamily:'Syne', fontSize:'17px', fontWeight:'700', color:'var(--text-primary)', margin:'10px 0 8px' }}>

                  {p.title}
                </h3>
                <div style={{ fontFamily:'Space Mono', fontSize:'10px', color:'var(--text-muted)', display:'flex', gap:'12px' }}>

                  {p.year} · {p.tags.join(' · ')}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  )
}
