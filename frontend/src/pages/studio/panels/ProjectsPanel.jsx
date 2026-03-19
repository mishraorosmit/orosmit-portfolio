import { useState, useEffect } from 'react'
import api from '../../../lib/api'

const EMPTY = { title: '', category: 'design', year: new Date().getFullYear(), description: '', problem: '', process: '', solution: '', result: '', live_url: '', github_url: '', is_featured: false }

const inputStyle = { width: '100%', background: '#07070f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', fontFamily: 'Space Mono, monospace', fontSize: '12px', outline: 'none', boxSizing: 'border-box', marginBottom: '16px' }
const labelStyle = { display: 'block', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '6px' }
const cardStyle = { background: '#0d0d18', border: '1px solid rgba(255,69,0,0.08)', borderRadius: '10px', padding: '24px' }
const btnPrimary = { padding: '10px 20px', background: '#FF4500', border: '1px solid #FF4500', color: '#000', fontFamily: 'Space Mono, monospace', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s', letterSpacing: '0.08em' }
const btnSecondary = { padding: '10px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '11px', cursor: 'pointer', borderRadius: '4px', transition: 'all 0.2s', letterSpacing: '0.08em' }
const btnDanger = { padding: '4px 10px', background: 'transparent', border: '1px solid rgba(255,68,68,0.3)', color: '#ff6666', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }

export default function ProjectsPanel() {
  const [view, setView] = useState('list')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const r = await api.get('/portfolio/')
      setProjects(Array.isArray(r.data) ? r.data : r.data.results || [])
    } catch (e) { setError('Could not load projects') }
    setLoading(false)
  }

  const handleEdit = (p) => { setForm({ ...EMPTY, ...p }); setEditId(p.id); setView('form'); setError('') }
  const handleNew = () => { setForm(EMPTY); setEditId(null); setView('form'); setError('') }

  const handleSave = async () => {
    if (!form.title.trim()) { setError('Title is required'); return }
    setSaving(true); setError('')
    try {
      if (editId) { await api.put(`/portfolio/${editId}/update/`, form) }
      else { await api.post('/portfolio/create/', form) }
      setSaved(true); setTimeout(() => setSaved(false), 2000)
      await fetchProjects(); setView('list')
    } catch (e) { setError(e.response?.data?.detail || JSON.stringify(e.response?.data) || 'Save failed. Check API.') }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    try { await api.delete(`/portfolio/${id}/delete/`); setDeleteConfirm(null); await fetchProjects() }
    catch (e) { setError('Delete failed') }
  }

  const handleToggleFeatured = async (p) => {
    try { await api.patch(`/portfolio/${p.id}/update/`, { is_featured: !p.is_featured }); await fetchProjects() }
    catch (e) {}
  }

  const Toggle = ({ value, onChange }) => (
    <div onClick={onChange} style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? '#FF4500' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '4px', left: value ? '24px' : '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
    </div>
  )

  if (view === 'list') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 }}>PROJECTS</h1>
        <button onClick={handleNew} style={btnPrimary}>+ ADD PROJECT</button>
      </div>
      {error && <div style={{ color: '#ff4444', fontSize: '12px', marginBottom: '16px', fontFamily: 'Space Mono, monospace', background: 'rgba(255,68,68,0.08)', padding: '12px', borderRadius: '6px' }}>{error}</div>}
      <div style={cardStyle}>
        {loading ? <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>LOADING...</div>
        : projects.length === 0 ? <div style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>NO PROJECTS YET. ADD YOUR FIRST ONE.</div>
        : <>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 80px 140px', gap: '16px', padding: '0 0 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
            <span>TITLE</span><span>CATEGORY</span><span>YEAR</span><span>FEATURED</span><span>ACTIONS</span>
          </div>
          {projects.map(p => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 80px 140px', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', alignItems: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>{p.title}</span>
              <span style={{ display: 'inline-block', padding: '2px 8px', background: 'rgba(255,69,0,0.08)', border: '1px solid rgba(255,69,0,0.2)', borderRadius: '3px', color: '#FF4500', fontSize: '10px', width: 'fit-content' }}>{p.category?.toUpperCase()}</span>
              <span>{p.year}</span>
              <Toggle value={p.is_featured} onChange={() => handleToggleFeatured(p)} />
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(p)} style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }} onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF4500'; e.currentTarget.style.color = '#FF4500' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff' }}>EDIT</button>
                {deleteConfirm === p.id ? (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleDelete(p.id)} style={{ padding: '4px 8px', background: '#ff4444', border: 'none', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }}>YES</button>
                    <button onClick={() => setDeleteConfirm(null)} style={{ padding: '4px 8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Space Mono, monospace', fontSize: '10px', cursor: 'pointer', borderRadius: '3px' }}>NO</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(p.id)} style={btnDanger} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>DEL</button>
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
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 }}>{editId ? 'EDIT PROJECT' : 'NEW PROJECT'}</h1>
        <button onClick={() => setView('list')} style={btnSecondary}>← BACK</button>
      </div>
      {error && <div style={{ color: '#ff4444', fontSize: '12px', marginBottom: '16px', fontFamily: 'Space Mono, monospace', background: 'rgba(255,68,68,0.08)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(255,68,68,0.2)' }}>{error}</div>}
      <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>PROJECT TITLE *</label>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="My Awesome Project" style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div>
          <label style={labelStyle}>CATEGORY</label>
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="design">Design</option>
            <option value="web">Web</option>
            <option value="brand">Brand</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>YEAR</label>
          <input type="number" value={form.year} onChange={e => setForm({...form, year: e.target.value})} style={inputStyle} min="2020" max="2030" onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        {['description','problem','process','solution','result'].map(field => (
          <div key={field} style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>{field.toUpperCase()}</label>
            <textarea value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} placeholder={`Describe the ${field}...`} rows={field === 'description' ? 3 : 3} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>
        ))}
        <div>
          <label style={labelStyle}>LIVE URL</label>
          <input value={form.live_url} onChange={e => setForm({...form, live_url: e.target.value})} placeholder="https://..." style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div>
          <label style={labelStyle}>GITHUB URL</label>
          <input value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})} placeholder="https://github.com/..." style={inputStyle} onFocus={e => e.target.style.borderColor = 'rgba(255,69,0,0.5)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div onClick={() => setForm({...form, is_featured: !form.is_featured})} style={{ width: '44px', height: '24px', borderRadius: '12px', background: form.is_featured ? '#FF4500' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '4px', left: form.is_featured ? '24px' : '4px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
          </div>
          <label style={{ ...labelStyle, margin: 0, cursor: 'pointer' }} onClick={() => setForm({...form, is_featured: !form.is_featured})}>FEATURED ON HOMEPAGE</label>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button onClick={handleSave} disabled={saving} style={{ padding: '14px 32px', background: saved ? '#00ff88' : '#FF4500', border: 'none', borderRadius: '4px', color: '#000', fontFamily: 'Space Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: saving ? 0.7 : 1 }}>
          {saving ? 'SAVING...' : saved ? '✓ SAVED' : editId ? 'UPDATE PROJECT →' : 'CREATE PROJECT →'}
        </button>
        <button onClick={() => setView('list')} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontFamily: 'Space Mono, monospace', fontSize: '12px', cursor: 'pointer', borderRadius: '4px' }}>CANCEL</button>
      </div>
    </div>
  )
}
