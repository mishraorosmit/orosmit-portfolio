import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioButton from '../components/StudioButton';
import StudioToggle from '../components/StudioToggle';
import StudioInput from '../components/StudioInput';
import studioApi from '@/lib/studioApi';
import api from '@/lib/api';

const COLORS = [
  { id: '#FF4500', name: 'Ember Orange' },
  { id: '#FF0033', name: 'Crimson' },
  { id: '#00ff88', name: 'Neon Green' },
  { id: '#38bdf8', name: 'Ice Blue' },
  { id: '#c084fc', name: 'Violet' }
];

export default function AppearancePanel() {
  const [badgePos, setBadgePos] = useState('navbar');
  const [taglines, setTaglines] = useState([]);
  const [soundDefault, setSoundDefault] = useState(false);
  const [accentColor, setAccentColor] = useState('#FF4500');
  const [cursorStyle, setCursorStyle] = useState('diamond');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load local storage
    setBadgePos(localStorage.getItem('badge-position') || 'navbar');
    setSoundDefault(localStorage.getItem('sound-default') === 'true');
    setAccentColor(localStorage.getItem('accent-color') || '#FF4500');
    setCursorStyle(localStorage.getItem('cursor-style') || 'diamond');

    // Load taglines from backend
    api.get('/settings/').then(res => {
      if (res.data && res.data.taglines) {
        setTaglines(res.data.taglines);
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSaveBadge = (val) => {
    setBadgePos(val);
    localStorage.setItem('badge-position', val);
  };

  const handleSaveSound = (val) => {
    setSoundDefault(val);
    localStorage.setItem('sound-default', val.toString());
  };

  const handleSaveAccent = (val) => {
    setAccentColor(val);
    localStorage.setItem('accent-color', val);
    document.documentElement.style.setProperty('--accent', val);
  };

  const handleSaveCursor = (val) => {
    setCursorStyle(val);
    localStorage.setItem('cursor-style', val);
  };

  const updateTagline = (index, value) => {
    const newTags = [...taglines];
    newTags[index] = value;
    setTaglines(newTags);
  };

  const removeTagline = (index) => {
    if (taglines.length <= 1) return;
    const newTags = taglines.filter((_, i) => i !== index);
    setTaglines(newTags);
  };

  const addTagline = () => {
    if (taglines.length >= 8) return;
    setTaglines([...taglines, 'New Tagline']);
  };

  const saveTaglinesToBackend = async () => {
    try {
      await studioApi.patch('/settings/', { taglines });
      const btn = document.getElementById('save-taglines-btn');
      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = 'SAVED ✓';
        setTimeout(() => btn.innerText = originalText, 2000);
      }
    } catch(e) {
      console.error(e);
    }
  };

  if (loading) return null;

  return (
    <div className="pb-20 max-w-4xl">
      <h2 className="text-2xl font-display font-bold text-white mb-8 tracking-wider">APPEARANCE</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* AVAILABILITY BADGE */}
        <StudioCard title="BADGE POSITION">
          <div className="flex flex-col gap-4">
            {['navbar', 'hero', 'both'].map(pos => (
              <label key={pos} className="flex items-center gap-3 cursor-none opacity-80 hover:opacity-100">
                <input 
                  type="radio" 
                  name="badge-pos" 
                  checked={badgePos === pos}
                  onChange={() => handleSaveBadge(pos)}
                  className="accent-[#FF4500]"
                />
                <span className="font-mono text-sm capitalize">{pos === 'both' ? 'Both Locations' : `In ${pos === 'hero' ? 'Hero Section' : 'Navbar'}`}</span>
              </label>
            ))}
          </div>
        </StudioCard>

        {/* AMBIENT SOUND */}
        <StudioCard title="AMBIENT SOUND">
          <StudioToggle 
            label="Start with sound ON by default" 
            checked={soundDefault}
            onChange={handleSaveSound}
          />
        </StudioCard>
      </div>

      {/* ROTATING TAGLINES */}
      <StudioCard>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-mono text-[13px] tracking-widest text-[#FF4500] uppercase opacity-80 m-0">ROTATING TAGLINES</h3>
          <StudioButton id="save-taglines-btn" onClick={saveTaglinesToBackend}>SAVE TAGLINES</StudioButton>
        </div>
        
        <div className="flex flex-col gap-3 mb-4">
          {taglines.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <input 
                value={t}
                onChange={e => updateTagline(i, e.target.value)}
                className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none focus:border-[#FF4500] transition-colors cursor-none"
              />
              <button 
                onClick={() => removeTagline(i)}
                className="w-10 h-10 flex items-center justify-center text-[#ef4444] hover:bg-[rgba(239,68,68,0.1)] rounded cursor-none"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {taglines.length < 8 && (
          <StudioButton variant="secondary" onClick={addTagline}>ADD TAGLINE +</StudioButton>
        )}
      </StudioCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ACCENT COLOR */}
        <StudioCard title="ACCENT COLOR">
          <div className="flex flex-wrap gap-4 mt-4">
            {COLORS.map(color => (
              <div 
                key={color.id}
                onClick={() => handleSaveAccent(color.id)}
                className="w-10 h-10 rounded-full cursor-none transition-transform flex items-center justify-center hover:scale-110"
                style={{ 
                  backgroundColor: color.id,
                  boxShadow: accentColor === color.id ? `0 0 0 2px #020205, 0 0 0 4px ${color.id}` : 'none'
                }}
                title={color.name}
              />
            ))}
          </div>
          <div className="mt-6 font-mono text-[11px] opacity-40">
            Selected: <span className="uppercase text-white">{COLORS.find(c => c.id === accentColor)?.name || accentColor}</span>
          </div>
        </StudioCard>

        {/* CURSOR STYLE */}
        <StudioCard title="CURSOR STYLE">
          <div className="flex flex-col gap-5 mt-4">
            {[
              { id: 'diamond', label: 'Diamond (Default)' },
              { id: 'crosshair', label: 'Crosshair' },
              { id: 'dot', label: 'Dot + Ring' },
              { id: 'none', label: 'None (OS Default)' }
            ].map(type => (
              <label key={type.id} className="flex items-center gap-3 cursor-none opacity-80 hover:opacity-100">
                <input 
                  type="radio" 
                  name="cursor-style" 
                  checked={cursorStyle === type.id}
                  onChange={() => handleSaveCursor(type.id)}
                  className="accent-[#FF4500]"
                />
                <span className="font-mono text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </StudioCard>
      </div>

    </div>
  );
}
