import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEACHING_ITEMS = [
  { id: 1, icon: '⚡', title: 'Physics (Class 11–12)', tagline: 'Concepts over formulas. Intuition over memorization.' },
  { id: 2, icon: '🔢', title: 'Mathematics', tagline: 'From limits to infinity. Rigorously beautiful.' },
  { id: 3, icon: '🌳', title: 'DSA in Java', tagline: "Algorithms aren't scary. Let me prove it." },
  { id: 4, icon: '🐍', title: 'Python', tagline: 'Beginner to builder. Zero to deployed.' },
];

const FAQS = [
  { q: "What's your teaching style?", a: "Conceptual first. I explain the why before the how." },
  { q: "Do you teach online?", a: "Yes — Google Meet, fully flexible scheduling." },
  { q: "What's the fee structure?", a: "Contact me directly for current rates." },
  { q: "Do you give notes/materials?", a: "Yes, custom notes for every student." },
];

export default function TeachingPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--void)', paddingTop: '120px', paddingBottom: '96px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: '64px', fontWeight: '800', color: '#fff', margin: 0, lineHeight: 1.1 }}>
            I TEACH THINGS THAT MATTER
          </h1>
          <div style={{ width: '100px', height: '4px', background: '#FF4500', margin: '24px auto 0' }} />
        </div>

        {/* subjects grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '96px' }}>
          {TEACHING_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={scrollToContact}
              style={{
                background: '#080812',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                cursor: 'none',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,69,0,0.5)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255,69,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '48px', color: '#FF4500', marginBottom: '32px', filter: 'drop-shadow(0 0 10px rgba(255,69,0,0.5))' }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: 'Syne', fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontFamily: 'Space Mono', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>{item.tagline}</p>
              
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px', color: '#fff', fontFamily: 'Space Mono', fontSize: '12px' }}>
                 Book a Session <span style={{ color: '#FF4500', marginLeft: '8px' }}>→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '96px' }}>
          <h2 style={{ fontFamily: 'Syne', fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>FAQ</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, index) => (
              <div key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'none', border: 'none', padding: '24px 0', cursor: 'none',
                    textAlign: 'left', fontFamily: 'Syne', fontSize: '20px', fontWeight: '700', color: '#fff'
                  }}
                >
                  {faq.q}
                  <span style={{ color: '#FF4500', fontSize: '24px', transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>+</span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontFamily: 'Space Mono', fontSize: '14px', color: 'var(--text-secondary)', paddingBottom: '24px', margin: 0, lineHeight: 1.6 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA STRIP */}
      <div 
        onClick={scrollToContact}
        style={{ width: '100%', background: '#FF4500', padding: '40px 32px', cursor: 'none', position: 'relative', borderTop: '1px solid #ff5511', borderBottom: '1px solid #ff5511' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
           <h3 style={{ color: 'var(--void)', fontFamily: 'Syne', fontWeight: '800', fontSize: '32px', margin: 0 }}>
             CURRENTLY TAKING NEW STUDENTS
           </h3>
           <div style={{ color: 'var(--void)', fontFamily: 'Syne', fontWeight: '800', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
             GET IN TOUCH 
             <span>→</span>
           </div>
        </div>
      </div>

    </div>
  )
}
