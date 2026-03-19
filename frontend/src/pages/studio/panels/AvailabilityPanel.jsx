import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioButton from '../components/StudioButton';
import StudioInput from '../components/StudioInput';
import api from '@/lib/api';

const STATUS_OPTIONS = [
  { id: 'available', title: 'Available for Work', desc: 'Visible to all visitors', color: '#10b981' },
  { id: 'busy', title: 'Currently Busy', desc: 'Takes on urgent work only', color: '#ef4444' },
  { id: 'partial', title: 'Limited Availability', desc: 'Selective projects only', color: '#f59e0b' }
];

export default function AvailabilityPanel({ onNavigate }) {

  const [currentStatus, setCurrentStatus] = useState('available');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    api.get('/status/')
      .then(res => {
        if (res.data) {
          setCurrentStatus(res.data.status);
          setMessage(res.data.message || '');
        }
      })
      .catch(console.error);
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.patch('/status/', { status: currentStatus, message });
      setSuccessMsg('Status updated live.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const activeOption = STATUS_OPTIONS.find(o => o.id === currentStatus);

  return (
    <div className="pb-20 max-w-4xl">
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '32px',
      }}>AVAILABILITY & STATUS</h1>


      {/* Current Status Pill */}
      <StudioCard>
        <div className="flex items-center gap-6">
          <div className="w-5 h-5 rounded-full animate-pulse shadow-[0_0_15px_currentColor]" style={{ backgroundColor: activeOption?.color || 'var(--accent)', color: activeOption?.color || 'var(--accent)' }}></div>
          <div>
            <div className="font-mono text-base tracking-widest uppercase text-[var(--text-primary)] mb-2">{activeOption?.title || 'Unknown Status'}</div>
            <div className="font-mono text-xs text-[var(--text-muted)]">{message || activeOption?.desc}</div>
          </div>
        </div>
      </StudioCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {STATUS_OPTIONS.map(opt => (
          <div 
            key={opt.id}
            onClick={() => setCurrentStatus(opt.id)}
            className="bg-[var(--bg-card)] border rounded-[10px] p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            style={{ 
              borderColor: currentStatus === opt.id ? opt.color : 'var(--border-subtle)',
              boxShadow: currentStatus === opt.id ? `0 0 20px ${opt.color}20` : 'none'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: opt.color }}></div>
              <div className="font-mono text-[11px] tracking-widest text-[var(--text-primary)]">{opt.title}</div>
            </div>
            <p className="font-mono text-[10px] text-[var(--text-muted)] leading-relaxed m-0">{opt.desc}</p>
          </div>
        ))}
      </div>

      <StudioCard title="CUSTOM STATUS MESSAGE">
        <StudioInput 
          label="STATUS MESSAGE (shown on hover)"
          placeholder="Open to freelance, teaching & collabs"
          value={message}
          onChange={(e) => setMessage(e.target.value.substring(0, 100))}
        />
        <div className="text-right font-mono text-[10px] opacity-40 -mt-2 mb-6">
          {message.length} / 100
        </div>

        <div className="flex items-center gap-6">
          <StudioButton onClick={handleUpdate} disabled={loading}>
            {loading ? 'UPDATING...' : 'UPDATE STATUS →'}
          </StudioButton>
          {successMsg && (
            <div className="font-mono text-[11px] text-[#10b981] animate-pulse">
              {successMsg}
            </div>
          )}
        </div>
      </StudioCard>
    </div>
  );
}
