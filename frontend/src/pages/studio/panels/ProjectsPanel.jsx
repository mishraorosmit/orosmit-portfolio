import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioButton from '../components/StudioButton';
import StudioInput from '../components/StudioInput';
import StudioToggle from '../components/StudioToggle';
import studioApi from '@/lib/studioApi';

export default function ProjectsPanel({ onNavigate }) {

  const [view, setView] = useState('list'); // 'list' | 'form'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState(getEmptyForm());
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  
  function getEmptyForm() {
    return {
      id: null,
      title: '',
      category: 'web',
      year: new Date().getFullYear(),
      excerpt: '',
      problem: '',
      process: '',
      solution: '',
      result: '',
      live_url: '',
      github_url: '',
      is_featured: false,
    };
  }

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await studioApi.get('/portfolio/');
      setProjects(Array.isArray(res.data) ? res.data : (res.data.results || []));
    } catch(e) { console.error(e); }
    setLoading(false);
  };


  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleFeatured = async (id, currentVal) => {
    try {
      await studioApi.patch(`/portfolio/${id}/`, { is_featured: !currentVal });
      fetchProjects();
    } catch(e) { console.error(e); }
  };

  const handleDelete = async (id) => {
    try {
      await studioApi.delete(`/portfolio/${id}/`);
      setDeleteConfirmId(null);
      fetchProjects();
    } catch(e) { console.error(e); }
  };

  const handleEdit = (proj) => {
    setFormData({ ...getEmptyForm(), ...proj });
    setView('form');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await studioApi.put(`/portfolio/${formData.id}/`, formData);
      } else {
        await studioApi.post('/portfolio/', formData);
      }
      setView('list');
      fetchProjects();
    } catch(e) { console.error(e); }
  };

  if (view === 'form') {
    return (
      <div className="pb-20 max-w-4xl">
        <StudioButton variant="secondary" onClick={() => setView('list')} className="mb-8">
          ← BACK TO LIST
        </StudioButton>
        <StudioCard title={formData.id ? "EDIT PROJECT" : "NEW PROJECT"}>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <StudioInput label="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            
            <div className="flex gap-6">
              <div className="flex-1 flex flex-col">
                <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider">Category</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none transition-colors duration-200 cursor-none"
                >
                  <option value="web">Web</option>
                  <option value="design">Design</option>
                  <option value="brand">Brand</option>
                </select>
              </div>
              <div className="flex-1">
                <StudioInput label="Year" type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value) || new Date().getFullYear()})} />
              </div>
            </div>

            <StudioInput label="Live URL" type="url" value={formData.live_url || ''} onChange={e => setFormData({...formData, live_url: e.target.value})} />
            <StudioInput label="GitHub URL" type="url" value={formData.github_url || ''} onChange={e => setFormData({...formData, github_url: e.target.value})} />
            
            <StudioToggle label="Featured Project" checked={formData.is_featured} onChange={val => setFormData({...formData, is_featured: val})} />

            <div className="border-t border-[rgba(255,255,255,0.05)] pt-6 mt-2">
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Short Description</label>
              <textarea value={formData.excerpt || formData.description || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-24 cursor-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Problem</label>
              <textarea value={formData.problem || ''} onChange={e => setFormData({...formData, problem: e.target.value})} className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-24 cursor-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Process</label>
              <textarea value={formData.process || ''} onChange={e => setFormData({...formData, process: e.target.value})} className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-24 cursor-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Solution</label>
              <textarea value={formData.solution || ''} onChange={e => setFormData({...formData, solution: e.target.value})} className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-24 cursor-none" />
            </div>

            <div>
              <label className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider block">Result</label>
              <textarea value={formData.result || ''} onChange={e => setFormData({...formData, result: e.target.value})} className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none h-24 cursor-none" />
            </div>

            <div className="border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-[10px] p-12 text-center mt-4 flex flex-col items-center justify-center cursor-none hover:border-[#FF4500] hover:bg-[rgba(255,69,0,0.02)] transition-colors">
              <span className="font-mono text-[12px] opacity-50 tracking-widest uppercase">DROP IMAGE HERE OR CLICK TO UPLOAD</span>
              <p className="font-mono text-[9px] opacity-30 mt-2">Ready for Django Media integration</p>
            </div>

            <div className="flex justify-end mt-4">
              <StudioButton variant="primary" type="submit">SAVE PROJECT →</StudioButton>
            </div>
          </form>
        </StudioCard>
      </div>
    );
  }

  return (
    <div className="pb-20 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '28px',
          fontWeight: '800',
          color: '#ffffff',
        }}>PROJECTS</h1>
        <StudioButton onClick={() => { setFormData(getEmptyForm()); setView('form'); }}>ADD NEW PROJECT +</StudioButton>
      </div>


      <StudioCard>
        {loading ? <div className="text-white opacity-50 font-mono text-sm py-8 text-center">LOADING...</div> : (
          <div className="w-full">
            <div className="flex font-mono text-[11px] opacity-40 uppercase pb-4 border-b border-[rgba(255,255,255,0.05)] mb-4">
              <div className="w-1/3">TITLE</div>
              <div className="w-1/6">CATEGORY</div>
              <div className="w-1/6">YEAR</div>
              <div className="w-1/6">FEATURED</div>
              <div className="w-1/6 text-right">ACTIONS</div>
            </div>
            {projects.map(p => (
              <div key={p.id} className="flex items-center font-mono text-[12px] py-4 border-b border-[rgba(255,255,255,0.05)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <div className="w-1/3 truncate pr-4 text-white">{p.title}</div>
                <div className="w-1/6 uppercase opacity-60">{p.category}</div>
                <div className="w-1/6 opacity-60">{p.year}</div>
                <div className="w-1/6">
                  <StudioToggle checked={p.is_featured} onChange={() => handleToggleFeatured(p.id, p.is_featured)} />
                </div>
                <div className="w-1/6 flex justify-end gap-3 text-[10px] tracking-widest">
                  {deleteConfirmId === p.id ? (
                    <div className="flex items-center gap-2 text-[#ef4444]">
                      DELETE?
                      <button onClick={() => handleDelete(p.id)} className="hover:text-white cursor-none font-bold">YES</button>
                      <button onClick={() => setDeleteConfirmId(null)} className="hover:text-white cursor-none opacity-50">NO</button>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(p)} className="text-[#c0c0c0] hover:text-[#FF4500] cursor-none transition-colors">EDIT</button>
                      <button onClick={() => setDeleteConfirmId(p.id)} className="text-[#c0c0c0] hover:text-[#ef4444] cursor-none transition-colors">DELETE</button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {projects.length === 0 && <div className="text-center opacity-30 font-mono py-8 text-xs">NO PROJECTS FOUND</div>}
          </div>
        )}
      </StudioCard>
    </div>
  );
}
