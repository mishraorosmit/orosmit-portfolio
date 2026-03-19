import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const writings = [
  { id:1, type:"POEM", title:"Static Between Stars", excerpt:"There is a frequency the universe forgot to name — I live there, between the signal and the silence.", fullText:"There is a frequency the universe forgot to name — I live there, between the signal and the silence.", year:"2024" },
  { id:2, type:"STORY", title:"The Last Debug", excerpt:"He stared at the screen for six hours. The bug wasn't in the code. It never was.", fullText:"He stared at the screen for six hours. The bug wasn't in the code. It never was. It was in the hardware of his memory.", year:"2023" },
  { id:3, type:"SCRIPT", title:"Frame Zero", excerpt:"FADE IN: A room with no walls. A man with no shadow. A clock with no hands.", fullText:"FADE IN: A room with no walls. A man with no shadow. A clock with no hands.", year:"2024" },
  { id:4, type:"POEM", title:"Silicon Heartbeat", excerpt:"010101 is just a rhythm waiting for a dancer.", fullText:"010101 is just a rhythm waiting for a dancer.", year:"2023" },
  { id:5, type:"STORY", title:"Terminal Ghost", excerpt:"The server stopped responding at 3 AM. Then it started talking.", fullText:"The server stopped responding at 3 AM. Then it started talking.", year:"2022" },
  { id:6, type:"POEM", title:"Event Horizon", excerpt:"Falling into the black hole of infinite scrolling.", fullText:"Falling into the black hole of infinite scrolling.", year:"2022" },
]

export default function WritingPage() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [selectedPiece, setSelectedPiece] = useState(null)

  const tabs = ['ALL', 'POEMS', 'STORIES', 'SCRIPTS']
  
  const filtered = activeTab === 'ALL' 
    ? writings 
    : writings.filter(w => w.type === activeTab.replace(/S$/, '').toUpperCase())

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a10', paddingTop: '120px', paddingBottom: '96px', paddingLeft: '32px', paddingRight: '32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'Space Mono', fontSize: '12px', letterSpacing: '0.3em', color: 'var(--text-secondary)', marginBottom: '16px' }}>ARCHIVE</p>
          <h1 style={{ fontFamily: 'Syne', fontSize: '80px', fontWeight: '800', color: '#fff', margin: 0, lineHeight: 1 }}>WRITING</h1>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '0.1em',
                padding: '8px 24px', borderRadius: '4px', cursor: 'none',
                background: activeTab === tab ? '#FF4500' : 'transparent',
                color: activeTab === tab ? '#000' : '#fff',
                border: activeTab === tab ? '1px solid #FF4500' : '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(w => (
              <motion.div
                layout
                key={w.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedPiece(w)}
                style={{
                  background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '28px',
                  minHeight: '280px',
                  display: 'flex',
                  cursor: 'none',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: '1px solid var(--border)',
                  transition: 'all 0.35s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'
                  e.currentTarget.style.borderLeft = '3px solid #FF4500'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.borderLeft = '1px solid var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div>
                  <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: '#FF4500', background: 'rgba(255,69,0,0.08)', padding: '4px 8px', borderRadius: '2px', border: '1px solid rgba(255,69,0,0.2)' }}>
                    {w.type}
                  </span>
                </div>
                <div style={{ margin: 'auto 0' }}>
                  <h3 style={{ fontFamily: 'Syne', fontSize: '20px', fontWeight: '700', color: '#fff', marginTop: '16px', marginBottom: '12px', lineHeight: 1.3 }}>{w.title}</h3>
                  <p style={{ fontFamily: 'Space Mono', fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.7 }}>{w.excerpt}</p>
                </div>
                <div style={{ textAlign: 'right', marginTop: '16px' }}>
                  <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>{w.year}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(5,5,8,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px'
            }}
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--bg-secondary)', width: '100%', maxWidth: '640px', padding: '48px',
                borderRadius: '16px', border: '1px solid rgba(255,69,0,0.2)', position: 'relative'
              }}
            >
              <button
                onClick={() => setSelectedPiece(null)}
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'none' }}
              >
                ×
              </button>
              <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: '#FF4500' }}>{selectedPiece.type} · {selectedPiece.year}</span>
              <h2 style={{ fontFamily: 'Syne', fontSize: '32px', fontWeight: '800', color: '#fff', margin: '16px 0 32px' }}>{selectedPiece.title}</h2>
              <p style={{ fontFamily: 'Space Mono', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                {selectedPiece.fullText}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
