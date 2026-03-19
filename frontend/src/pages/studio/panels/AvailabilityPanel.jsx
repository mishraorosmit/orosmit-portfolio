import { useState, useEffect } from 'react'
import api from '../../../lib/api'



const STATUS_OPTIONS = [
  { id: 'available', label: 'AVAILABLE', sub: 'Open for new work', color: '#00ff88' },
  { id: 'busy', label: 'BUSY', sub: 'Not taking new projects', color: '#ff4444' },
  { id: 'partial', label: 'LIMITED', sub: 'Selective projects only', color: '#ffaa00' },
]

export default function AvailabilityPanel() {
  const [current, setCurrent] = useState('available')
  const [message, setMessage] = useState('')
  const [selected, setSelected] = useState('available')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/status/').then(r => { setCurrent(r.data.status); setSelected(r.data.status); setMessage(r.data.message || '') }).catch(() => {})
  }, [])



  const handleSave = async () => {
    setSaving(true); setError('')
    try {
      await api.patch('/status/', { status: selected, message })
      setCurrent(selected); setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e) { setError('Failed to update. Check API connection.') }


    setSaving(false)
  }

  const cardStyle = { background: '#0d0d18', border: '1px solid rgba(255,69,0,0.08)', borderRadius: '10px', padding: '24px', marginBottom: '20px' }

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#ffffff', marginBottom: '32px' }}>AVAILABILITY</h1>

      <div style={cardStyle}>
        <div style={{ fontSize: '10px', color: '#FF4500', letterSpacing: '0.15em', marginBottom: '12px' }}>CURRENT STATUS</div>
        {STATUS_OPTIONS.filter(s => s.id === current).map(s => (
          <div key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '24px', background: `${s.color}12`, border: `1px solid ${s.color}40` }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: s.color, fontWeight: '700' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={cardStyle}>
        <div style={{ fontSize: '10px', color: '#FF4500', letterSpacing: '0.15em', marginBottom: '16px' }}>SELECT NEW STATUS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {STATUS_OPTIONS.map(s => (
            <div key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '20px 16px', borderRadius: '8px', border: selected === s.id ? `2px solid ${s.color}` : '2px solid rgba(255,255,255,0.06)', background: selected === s.id ? `${s.color}08` : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }} onMouseEnter={e => { if (selected !== s.id) e.currentTarget.style.borderColor = `${s.color}60` }} onMouseLeave={e => { if (selected !== s.id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: s.color, margin: '0 auto 10px', boxShadow: selected === s.id ? `0 0 12px ${s.color}` : 'none' }} />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: selected === s.id ? s.color : '#fff', fontWeight: '700', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ fontSize: '10px', color: '#FF4500', letterSpacing: '0.15em', marginBottom: '12px' }}>STATUS MESSAGE <span style={{ color: 'rgba(255,255,255,0.2)', marginLeft: '8px' }}>{message.length}/100</span></div>
        <input value={message} onChange={e => setMessage(e.target.value.slice(0, 100))} placeholder="Open to freelance, teaching & collabs" style={{ width: '100%', background: '#07070f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '12px 14px', color: '#ffffff', fontFamily: 'Space Mono, monospace', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
      </div>

      {error && <div style={{ color: '#ff4444', fontSize: '12px', marginBottom: '12px', fontFamily: 'Space Mono, monospace' }}>{error}</div>}

      <button onClick={handleSave} disabled={saving} style={{ padding: '14px 32px', background: saved ? '#00ff88' : '#FF4500', border: 'none', borderRadius: '4px', color: '#000', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: saving ? 0.7 : 1 }}>
        {saving ? 'UPDATING...' : saved ? '✓ STATUS UPDATED LIVE' : 'UPDATE STATUS →'}
      </button>
    </div>
  )
}
