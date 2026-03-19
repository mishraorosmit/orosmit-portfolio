import { useState, useEffect } from 'react'
import api from '../../../lib/api'

const EMPTY = { title: '', type: 'poem', excerpt: '', body: '', year: new Date().getFullYear() }
const inputStyle = { width: '100%', background: '#07070f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', fontFamily: 'Space Mono, monospace', fontSize: '12px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }
const labelStyle = { display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '6px' }
const cardStyle = { background: '#0d0d18', border: '1px solid rgba(255,69,0,0.08)', borderRadius: '10px', padding: '24px' }
const TYPE_COLORS = { poem: '#c084fc', story: '#38bdf8', script: '#4ade80' }

export default function WritingPanel() {
  const [view, setView] = useState('list')
  const [writings, setWritings] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchWritings() }, [])

  const fetchWritings = async () => {
    setLoading(true)
    try { const r = await api.get('/writing/'); setWritings(Array.isArray(r.data) ? r.data : r.data.results || []) }
    catch (e) { setError('Could not load writings') }
    setLoading(false)
  }

  const handleEdit = (w) => { setForm({ ...EMPTY, ...w }); setEditId(w.id); setView('form'); setError('') }
  const handleNew = () => { setForm(EMPTY); setEditId(null); setView('form'); setError('') }

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required'); return }
    setSaving(true); setError('')
    try {
      if (editId) { await api.put(`/writing/${editId}/update/`, form) }
      else { await api.post('/writing/create/', form) }
      setSaved(true); setTimeout(() => setSaved(false), 2000)
      await fetchWritings(); setView('list')
    } catch (e) { setError(e.response?.data?.detail || JSON.stringify(e.response?.data) || 'Save failed') }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/writing/${id}/delete/`); setDeleteConfirm(null); await fetchWritings() }
    catch (e) { setError('Delete failed') }
  }

  if (view === 'list') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 }}>WRITING</h1>
        <button onClick={handleNew} style={{ padding: '10px 20px', background: '#FF4500', border: 'none', borderRadius: '4px', color: '#000', fontFamily: 'Space Mono, monospace', fontSize: '11px', cursor: 'pointer', letterSpacing: '0.08em' }}>+ ADD PIECE</button>
      </div>
      {error && <div style={{ color: '#ff4444', fontSize: '12px', marginBottom: '16px', fontFamily: 'Space Mono, monospace', background: 'rgba(255,68,68,0.08)', padding: '12px', borderRadius: '6px' }}>{error}</div>}
      <div style={cardStyle}>
        {loading ? <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>LOADING...</div>
        : writings.length === 0 ? <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>NO WRITINGS YET. ADD YOUR FIRST PIECE.</div>
        : <>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 140px', gap: '16px', padding: '0 0 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            <span>TITLE</span><span>TYPE</span><span>YEAR</span><span>ACTIONS</span>
          </div>
          {writings.map(w => (
            <div key={w.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 140px', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>{w.title}</span>
              <span style={{ display: 'inline-block', padding: '2px 8px', background: `${TYPE_COLORS[w.type]}15`, border: `1px solid ${TYPE_COLORS[w.type]}40`, borderRadius: '3px', color: TYPE_COLORS[w.type], fontSize: '10px', width: 'fit-content' }}>{w.type?.toUpperCase()}</span>
              <span>{w.year}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(w)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF4500'; e.currentTarget.style.color = '#FF4500' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}>EDIT</button>
                {deleteConfirm === w.id ? (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleDelete(w.id)} style={{ padding: '4px 8px', background: '#ff4444', border: 'none', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }}>YES</button>
                    <button onClick={() => setDeleteConfirm(null)} style={{ padding: '4px 8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }}>NO</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(w.id)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', color: '#ff6666', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>DEL</button>
                )}
              </div>
            </div>
          ))}
        </>}
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 }}>{editId ? 'EDIT PIECE' : 'NEW PIECE'}</h1>
        <button onClick={() => setView('list')} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Mono, monospace', fontSize: '11px', cursor: 'pointer', borderRadius: '4px' }}>← BACK</button>
      </div>
      {error && <div style={{ color: '#ff4444', fontSize: '12px', marginBottom: '16px', fontFamily: 'Space Mono, monospace', background: 'rgba(255,68,68,0.08)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,68,68,0.2)' }}>{error}</div>}
      <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>TITLE *</label>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="My Piece Title" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div>
          <label style={labelStyle}>TYPE</label>
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="poem">Poem</option>
            <option value="story">Story</option>
            <option value="script">Script</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>YEAR</label>
          <input type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} style={inputStyle} min="2020" max="2030" onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>EXCERPT <span style={{ color: 'rgba(255,255,255,0.2)' }}>{form.excerpt.length}/200</span></label>
          <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value.slice(0,200)})} placeholder="A short teaser shown on cards..." rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>FULL BODY</label>
          <textarea value={form.body} onChange={e => setForm({...form, body: e.target.value})} placeholder="Write your full piece here..." rows={14} style={{ ...inputStyle, resize: 'vertical', lineHeight: '2', fontFamily: 'Space Mono, monospace', fontSize: '13px', background: '#020205', borderColor: 'rgba(255,255,255,0.06)' }} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button onClick={handleSave} disabled={saving} style={{ padding: '14px 32px', background: saved ? '#00ff88' : '#FF4500', border: 'none', borderRadius: '4px', color: '#000', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'SAVING...' : saved ? '✓ SAVED' : editId ? 'UPDATE PIECE →' : 'PUBLISH PIECE →'}
        </button>
        <button onClick={() => setView('list')} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}>CANCEL</button>
      </div>
    </div>
  )
}
