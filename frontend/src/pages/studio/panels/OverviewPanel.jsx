import { useState, useEffect } from 'react'
import api from '../../../lib/api'



export default function OverviewPanel({ onNavigate }) {
  const [stats, setStats] = useState({ projects: 0, writings: 0, messages: 0, status: 'available' })
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedMsg, setExpandedMsg] = useState(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Working late'

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [projRes, writeRes, msgRes, statusRes] = await Promise.allSettled([
        api.get('/portfolio/'),
        api.get('/writing/'),
        api.get('/contact/messages/'),
        api.get('/status/'),
      ])


      setStats({
        projects: projRes.status === 'fulfilled' ? (projRes.value.data?.length || 0) : 0,
        writings: writeRes.status === 'fulfilled' ? (writeRes.value.data?.length || 0) : 0,
        messages: msgRes.status === 'fulfilled' ? (msgRes.value.data?.length || 0) : 0,
        status: statusRes.status === 'fulfilled' ? statusRes.value.data?.status : 'available',
      })
      if (msgRes.status === 'fulfilled') setMessages(Array.isArray(msgRes.value.data) ? msgRes.value.data.slice(0, 5) : [])
    } catch (e) { console.error('Overview fetch error:', e) }
    setLoading(false)
  }

  const statusColors = { available: '#00ff88', busy: '#ff4444', partial: '#ffaa00' }
  const cardStyle = { background: '#0d0d18', border: '1px solid rgba(255,69,0,0.08)', borderRadius: '10px', padding: '24px' }

  return (
    <div>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>{greeting}, Orosmit.</h1>
      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '32px' }}>{new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }).toUpperCase()}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'PROJECTS', value: loading ? '...' : stats.projects, action: () => onNavigate('projects') },
          { label: 'WRITINGS', value: loading ? '...' : stats.writings, action: () => onNavigate('writing') },
          { label: 'MESSAGES', value: loading ? '...' : stats.messages, action: null },
          { label: 'STATUS', value: null, status: stats.status, action: () => onNavigate('availability') },
        ].map((s, i) => (
          <div key={i} onClick={s.action} style={{ ...cardStyle, cursor: s.action ? 'pointer' : 'default', transition: 'all 0.2s' }} onMouseEnter={e => { if (s.action) { e.currentTarget.style.borderColor = 'rgba(255,69,0,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' } }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,69,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#FF4500', marginBottom: '12px' }}>{s.label}</div>
            {s.status ? (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', background: `${statusColors[s.status]}15`, border: `1px solid ${statusColors[s.status]}40` }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColors[s.status] }} />
                <span style={{ fontSize: '11px', color: statusColors[s.status], fontFamily: 'Space Mono, monospace' }}>{s.status.toUpperCase()}</span>
              </div>
            ) : (
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '40px', fontWeight: '800', color: '#ffffff', lineHeight: 1 }}>{s.value}</div>
            )}
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#FF4500', marginBottom: '20px' }}>RECENT MESSAGES</div>
        {messages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>{loading ? 'LOADING...' : 'NO MESSAGES YET'}</div>
        ) : (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 1fr', gap: '16px', padding: '0 0 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              <span>NAME</span><span>EMAIL</span><span>DATE</span><span>PREVIEW</span>
            </div>
            {messages.map(msg => (
              <div key={msg.id} onClick={() => setExpandedMsg(expandedMsg === msg.id ? null : msg.id)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 1fr', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '12px', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                <span>{msg.name}</span>
                <span style={{ fontSize: '11px' }}>{msg.email}</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>{new Date(msg.timestamp).toLocaleDateString()}</span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: expandedMsg === msg.id ? 'normal' : 'nowrap', color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{msg.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        {[
          { label: '+ ADD PROJECT', i: 0, action: () => onNavigate('projects') },
          { label: 'CHANGE STATUS', i: 1, action: () => onNavigate('availability') },
          { label: 'VIEW LIVE SITE →', i: 2, action: () => window.open('/', '_blank') },
        ].map((btn) => (
          <button key={btn.label} onClick={btn.action} style={{ padding: '10px 20px', background: btn.i === 0 ? '#FF4500' : 'transparent', border: btn.i === 0 ? '1px solid #FF4500' : '1px solid rgba(255,255,255,0.15)', color: btn.i === 0 ? '#000' : '#fff', fontFamily: 'Space Mono, monospace', fontSize: '11px', letterSpacing: '0.08em', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s' }} onMouseEnter={e => { if (btn.i !== 0) { e.currentTarget.style.borderColor = '#FF4500'; e.currentTarget.style.color = '#FF4500' } }} onMouseLeave={e => { if (btn.i !== 0) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' } }}>{btn.label}</button>
        ))}
      </div>
    </div>
  )
}
