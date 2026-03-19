import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

const writings = [
  { id:1, type:"POEM", title:"Static Between Stars", excerpt:"There is a frequency the universe forgot to name — I live there, between the signal and the silence.", year:"2024" },
  { id:2, type:"STORY", title:"The Last Debug", excerpt:"He stared at the screen for six hours. The bug wasn't in the code. It never was.", year:"2023" },
  { id:3, type:"SCRIPT", title:"Frame Zero", excerpt:"FADE IN: A room with no walls. A man with no shadow. A clock with no hands.", year:"2024" },
]

export default function WritingSection() {
  const navigate = useNavigate()
  const t = useTranslation()

  return (
    <section id="writing" style={{ padding:'96px 60px', background:'#07070f' }}>
      
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:'60px' }}>
        <p style={{ fontFamily:'Space Mono', fontSize:'11px', color:'var(--text-muted)', letterSpacing:'0.2em', marginBottom:'12px' }}>
          {t.writing.eyebrow}
        </p>
        <h2 style={{ fontFamily:'Syne', fontSize:'72px', fontWeight:'800', color:'#fff', margin:0, lineHeight:1 }}>
          {t.writing.heading}
        </h2>
      </div>

      {/* Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px', maxWidth:'1200px', margin:'0 auto' }}>
        {writings.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.5, delay: i * 0.12 }}
            style={{
              background:'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
              border:'1px solid var(--border)',
              borderRadius:'12px',
              padding:'28px',
              minHeight:'260px',
              display:'flex',
              flexDirection:'column',
              justifyContent:'space-between',
              cursor:'none',
              transition:'all 0.35s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(255,69,0,0.35)'
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = '-3px 0 0 #FF4500'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div>
              <span style={{
                fontFamily:'Space Mono', fontSize:'10px', letterSpacing:'0.12em',
                color:'#FF4500', background:'rgba(255,69,0,0.08)',
                padding:'3px 10px', borderRadius:'3px',
                border:'1px solid rgba(255,69,0,0.2)'
              }}>
                {w.type}
              </span>
              <h3 style={{ fontFamily:'Syne', fontSize:'20px', fontWeight:'700', color:'#fff', margin:'16px 0 10px', lineHeight:1.3 }}>
                {w.title}
              </h3>
              <p style={{ fontFamily:'Space Mono', fontSize:'12px', color:'rgba(255,255,255,0.38)', fontStyle:'italic', lineHeight:1.8, margin:0 }}>
                "{w.excerpt}"
              </p>
            </div>
            <p style={{ fontFamily:'Space Mono', fontSize:'11px', color:'rgba(255,255,255,0.2)', textAlign:'right', margin:'16px 0 0' }}>
              {w.year}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign:'center', marginTop:'48px' }}>
        <button
          onClick={() => navigate('/writing')}
          style={{
            fontFamily:'Space Mono', fontSize:'12px', letterSpacing:'0.15em',
            color:'#FF4500', background:'none',
            border:'1px solid rgba(255,69,0,0.3)',
            padding:'12px 32px', borderRadius:'4px', cursor:'none',
            transition:'all 0.2s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,69,0,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
        >
          {t.writing.read_more}
        </button>
      </div>

    </section>
  )
}
