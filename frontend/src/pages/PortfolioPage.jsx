import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useStore from '@/store/useStore'

const projects = [
  { id:1, title:"Brand Identity — vexx.tm", category:"design", tags:["branding","poster"], year:"2024", bg:"#1a0808" },
  { id:2, title:"Django REST Portfolio API", category:"web", tags:["django","python"], year:"2024", bg:"#08081a" },
  { id:3, title:"Physics Notes App", category:"web", tags:["react","education"], year:"2023", bg:"#080d08" },
  { id:4, title:"vexx.tm Poster Drop Vol.2", category:"brand", tags:["vexx","art"], year:"2024", bg:"#1a0808" },
  { id:5, title:"Student Dashboard UI", category:"web", tags:["react","ui"], year:"2023", bg:"#08081a" },
  { id:6, title:"Conceptual Series III", category:"design", tags:["poster","concept"], year:"2023", bg:"#0d0808" },
  { id:7, title:"Next.js E-Commerce", category:"web", tags:["nextjs","stripe"], year:"2022", bg:"#080d1a" },
  { id:8, title:"CivicGuard Dashboard", category:"web", tags:["dashboard","data"], year:"2024", bg:"#1a1a08" },
  { id:9, title:"Exhibition identity", category:"design", tags:["branding","logo"], year:"2022", bg:"#1a081a" },
]

const categories = ['ALL','DESIGN','WEB','BRAND']

export default function PortfolioPage() {
  const [active, setActive] = useState('ALL')
  const navigate = useNavigate()
  const setCursorVariant = useStore(state => state.setCursorVariant)
  
  const filtered = active === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === active.toLowerCase())

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-primary)', paddingTop: '120px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Space Mono', fontSize: '12px', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '16px' }}>CATALOGUE</p>
          <h1 style={{ fontFamily: 'Syne', fontSize: '80px', fontWeight: '800', color: '#fff', margin: 0, lineHeight: 1 }}>ALL WORK</h1>
        </div>

        {/* Filters */}
        <div style={{ display:'flex', gap:'12px', marginBottom:'48px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily:'Space Mono', fontSize:'11px', letterSpacing:'0.1em',
                padding:'8px 20px', borderRadius:'4px', cursor:'none',
                background: active === cat ? '#FF4500' : 'transparent',
                color: active === cat ? '#000' : '#fff',
                border: active === cat ? '1px solid #FF4500' : '1px solid rgba(255,255,255,0.2)',
                transition:'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'20px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(p => (
              <motion.div
                layout
                key={p.id}
                onClick={() => navigate(`/portfolio/${p.id}`)}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, scale:0.95 }}
                transition={{ duration:0.35 }}
                style={{
                  background: p.bg,
                  border:'1px solid var(--border)',
                  borderRadius:'12px',
                  overflow:'hidden',
                  cursor:'none',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.transition = 'all 0.3s ease'
                  setCursorVariant('hover')
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  setCursorVariant('default')
                }}
                className="group"
              >
                <div className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                   <span className="font-display font-bold text-xl tracking-widest uppercase text-ember drop-shadow-[0_0_10px_rgba(255,69,0,0.5)]">
                     VIEW CASE STUDY →
                   </span>
                </div>
                {/* Image placeholder */}
                <div style={{
                  height:'220px',
                  background:`linear-gradient(135deg, rgba(255,69,0,0.12), rgba(0,0,0,0.9))`,
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <span style={{ fontFamily:'Syne', fontSize:'52px', fontWeight:'800', color:'rgba(255,255,255,0.06)' }}>
                    {p.title.split('').slice(0,2).join('')}
                  </span>
                </div>
                {/* Content */}
                <div style={{ padding:'20px' }}>
                  <span style={{
                    fontFamily:'Space Mono', fontSize:'10px', letterSpacing:'0.1em',
                    color:'#FF4500', background:'rgba(255,69,0,0.08)',
                    padding:'3px 8px', borderRadius:'3px',
                    border:'1px solid rgba(255,69,0,0.2)'
                  }}>
                    {p.category.toUpperCase()}
                  </span>
                  <h3 style={{ fontFamily:'Syne', fontSize:'20px', fontWeight:'700', color:'#fff', margin:'12px 0 8px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily:'Space Mono', fontSize:'12px', color:'rgba(255,255,255,0.3)', margin:0 }}>
                    {p.year} · {p.tags.join(' · ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
