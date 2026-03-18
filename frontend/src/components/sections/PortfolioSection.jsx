import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

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
  
  const filtered = active === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === active.toLowerCase())

  return (
    <section id="portfolio" style={{ padding:'96px 60px', background:'#050508' }}>
      
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'48px' }}>
        <h2 style={{ fontFamily:'Syne', fontSize:'56px', fontWeight:'800', color:'#fff', margin:0 }}>
          SELECTED WORK
        </h2>
        <button
          onClick={() => navigate('/portfolio')}
          style={{ fontFamily:'Space Mono', fontSize:'12px', color:'#FF4500', background:'none', border:'none', cursor:'none', letterSpacing:'0.1em' }}
        >
          SEE ALL WORK →
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
              style={{
                background: p.bg,
                border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:'12px',
                overflow:'hidden',
                cursor:'none',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.transition = 'all 0.3s ease'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Image placeholder */}
              <div style={{
                height:'180px',
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
                <h3 style={{ fontFamily:'Syne', fontSize:'17px', fontWeight:'700', color:'#fff', margin:'10px 0 8px' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily:'Space Mono', fontSize:'11px', color:'rgba(255,255,255,0.3)', margin:0 }}>
                  {p.year} · {p.tags.join(' · ')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  )
}
