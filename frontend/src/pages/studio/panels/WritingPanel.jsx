import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioButton from '../components/StudioButton';
import StudioInput from '../components/StudioInput';
import studioApi from '@/lib/studioApi';

export default function WritingPanel() {
  const [view, setView] = useState('list');
  const [writings, setWritings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState(getEmptyForm());
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  function getEmptyForm() {
    return {
      id: null,
      title: '',
      category: 'poem',
      year: new Date().getFullYear(),
      excerpt: '',
      body: '',
      is_published: true,
    };
  }

  const fetchWritings = async () => {
    setLoading(true);
    try {
      const res = await studioApi.get('/writing/').catch(() => studioApi.get('/blog/'));
      setWritings(Array.isArray(res.data) ? res.data : []);
    } catch(e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => {
    fetchWritings();
  }, []);

  const handleDelete = async (id) => {
    try {
      let path = '/writing';
      await studioApi.delete(`${path}/${id}/`).catch(() => studioApi.delete(`/blog/${id}/`));
      setDeleteConfirmId(null);
      fetchWritings();
    } catch(e) { console.error(e); }
  };

  const handleEdit = (w) => {
    setFormData({ ...getEmptyForm(), ...w });
    setView('form');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await studioApi.put(`/writing/${formData.id}/`, formData).catch(() => studioApi.put(`/blog/${formData.id}/`, formData));
      } else {
        await studioApi.post('/writing/', formData).catch(() => studioApi.post('/blog/', formData));
      }
      setView('list');
      fetchWritings();
    } catch(e) { console.error(e); }
  };

  if (view === 'form') {
    return (
      <div className="pb-20 max-w-4xl">
        <StudioButton variant="secondary" onClick={() => setView('list')} className="mb-8">
          ← BACK TO LIST
        </StudioButton>
        <StudioCard title={formData.id ? "EDIT WRITING" : "NEW WRITING"}>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <StudioInput label="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col">
                <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider">Type</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none transition-colors duration-200 cursor-none"
                >
                  <option value="poem">Poem</option>
                  <option value="story">Story</option>
                  <option value="script">Script</option>
                  <option value="essay">Essay</option>
                </select>
              </div>
              <div className="flex-1">
                <StudioInput label="Year" type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value) || new Date().getFullYear()})} />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Excerpt</label>
              <textarea 
                value={formData.excerpt || ''} 
                onChange={e => setFormData({...formData, excerpt: e.target.value.substring(0, 200)})} 
                className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-20 cursor-none" 
              />
              <div className="text-right font-mono text-[9px] opacity-40 mt-1">{formData.excerpt?.length || 0} / 200</div>
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Full Body Text</label>
              <textarea 
                value={formData.body || ''} 
                onChange={e => setFormData({...formData, body: e.target.value})} 
                className="bg-[#020205] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[20px] py-[20px] text-[#c0c0c0] font-mono text-[13px] w-full outline-none min-h-[300px] leading-[1.9] cursor-none shadow-inner" 
                placeholder="Paste the full piece here..."
              />
            </div>

            <div className="flex justify-end mt-4">
              <StudioButton variant="primary" type="submit">SAVE PIECE →</StudioButton>
            </div>
          </form>
        </StudioCard>
      </div>
    );
  }

  return (
    <div className="pb-20 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-display font-bold text-white tracking-wider">WRITING</h2>
        <StudioButton onClick={() => { setFormData(getEmptyForm()); setView('form'); }}>ADD NEW PIECE +</StudioButton>
      </div>

      <StudioCard>
        {loading ? <div className="text-white opacity-50 font-mono text-sm py-8 text-center">LOADING...</div> : (
          <div className="w-full">
            <div className="flex font-mono text-[11px] opacity-40 uppercase pb-4 border-b border-[rgba(255,255,255,0.05)] mb-4">
              <div className="w-1/2">TITLE</div>
              <div className="w-1/4">TYPE</div>
              <div className="w-1/4">YEAR</div>
              <div className="w-1/4 text-right">ACTIONS</div>
            </div>
            {writings.map(w => (
              <div key={w.id} className="flex items-center font-mono text-[12px] py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div className="w-1/2 truncate pr-4 text-white">{w.title}</div>
                <div className="w-1/4 uppercase opacity-60">{w.category || w.type || 'poem'}</div>
                <div className="w-1/4 opacity-60">{w.year || new Date().getFullYear()}</div>
                <div className="w-1/4 flex justify-end gap-3 text-[10px] tracking-widest">
                  {deleteConfirmId === w.id ? (
                    <div className="flex items-center gap-2 text-[#ef4444]">
                      DELETE?
                      <button onClick={() => handleDelete(w.id)} className="hover:text-white cursor-none font-bold">YES</button>
                      <button onClick={() => setDeleteConfirmId(null)} className="hover:text-white cursor-none opacity-50">NO</button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(w)} className="text-[#c0c0c0] hover:text-[#FF4500] cursor-none transition-colors">EDIT</button>
                      <button onClick={() => setDeleteConfirmId(w.id)} className="text-[#c0c0c0] hover:text-[#ef4444] cursor-none transition-colors">DELETE</button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {writings.length === 0 && <div className="text-center opacity-30 font-mono py-8 text-xs">NO WRITINGS FOUND</div>}
          </div>
        )}
      </StudioCard>
    </div>
  );
}
