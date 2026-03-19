import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioButton from '../components/StudioButton';
import api from '@/lib/api';

export default function OverviewPanel() {
  const [stats, setStats] = useState({ projects: 0, writings: 0, messages: 0, status: '...' });
  const [messages, setMessages] = useState([]);
  const [greeting, setGreeting] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting('Good morning, Orosmit.');
    else if (hour >= 12 && hour < 17) setGreeting('Good afternoon, Orosmit.');
    else if (hour >= 17 && hour < 21) setGreeting('Good evening, Orosmit.');
    else setGreeting('Working late, Orosmit.');

    setDateStr(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const fetchData = async () => {
      try {
        const [projRes, writRes, msgRes, statRes] = await Promise.all([
          api.get('/portfolio/')
             .catch(() => ({ data: [] })),
          api.get('/writing/')
             .catch(() => api.get('/blog/')) // Fallback to /blog/ if /writing/ doesn't exist
             .catch(() => ({ data: [] })),
          api.get('/contact/messages/')
             .catch(() => ({ data: [] })),
          api.get('/status/')
             .catch(() => ({ data: { status: 'unknown' } }))
        ]);
        
        setStats({
          projects: projRes.data.length || projRes.data.count || 0,
          writings: writRes.data.length || writRes.data.count || 0,
          messages: msgRes.data.length || msgRes.data.count || 0,
          status: statRes.data.status || 'unknown'
        });
        
        setMessages(Array.isArray(msgRes.data) ? msgRes.data.slice(0, 3) : []);
      } catch (e) {
        console.error("Failed to fetch dashboard data", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-20">
      <div className="mb-12">
        <h1 className="font-display font-bold text-[28px] text-white tracking-tight mb-2">{greeting}</h1>
        <p className="font-mono text-[12px] opacity-40 uppercase tracking-widest">{dateStr}</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <StudioCard title="PROJECTS">
          <div className="text-4xl font-display font-bold text-white">{stats.projects}</div>
        </StudioCard>
        <StudioCard title="WRITINGS">
          <div className="text-4xl font-display font-bold text-white">{stats.writings}</div>
        </StudioCard>
        <StudioCard title="MESSAGES">
          <div className="text-4xl font-display font-bold text-white">{stats.messages}</div>
        </StudioCard>
        <StudioCard title="STATUS">
          <div className="text-lg font-mono tracking-widest uppercase mt-4 text-[#FF4500]">
            {stats.status.replace('_', ' ')}
          </div>
        </StudioCard>
      </div>

      <StudioCard title="RECENT MESSAGES">
        <div className="w-full">
          <div className="flex font-mono text-[11px] opacity-40 uppercase pb-4 border-b border-[rgba(255,255,255,0.05)] mb-4">
            <div className="w-1/4">NAME</div>
            <div className="w-1/4">EMAIL</div>
            <div className="w-1/4">DATE</div>
            <div className="w-1/4">PREVIEW</div>
          </div>
          {messages.map(m => (
            <div key={m.id} className="border-b border-[rgba(255,255,255,0.05)] last:border-0 border-solid pl-2">
              <div 
                className="flex font-mono text-[12px] py-4 cursor-pointer transition-colors cursor-none hover:text-[#FF4500]"
                onClick={() => setExpandedId(expandedId === m.id ? null : m.id)}
              >
                <div className="w-1/4 truncate pr-4">{m.name}</div>
                <div className="w-1/4 truncate pr-4 opacity-80">{m.email}</div>
                <div className="w-1/4 truncate pr-4 opacity-60">{new Date(m.timestamp).toLocaleDateString()}</div>
                <div className="w-1/4 truncate opacity-60">{m.message}</div>
              </div>
              {expandedId === m.id && (
                <div className="p-6 bg-[rgba(255,69,0,0.05)] font-mono text-[13px] leading-relaxed text-[#c0c0c0] border-l-2 border-[#FF4500] mb-4 mt-2">
                  <div className="opacity-40 text-[10px] mb-2 uppercase tracking-widest">FULL MESSAGE</div>
                  {m.message}
                </div>
              )}
            </div>
          ))}
          {messages.length === 0 && <div className="text-center opacity-30 font-mono py-8 text-xs">NO RECENT MESSAGES</div>}
        </div>
      </StudioCard>

      <div className="flex gap-4 mt-8">
        <StudioButton variant="secondary" onClick={() => document.getElementById('nav-projects')?.click()}>
          + ADD PROJECT
        </StudioButton>
        <StudioButton variant="secondary" onClick={() => document.getElementById('nav-availability')?.click()}>
          CHANGE STATUS
        </StudioButton>
        <StudioButton variant="secondary" onClick={() => window.open('/', '_blank')}>
          VIEW LIVE SITE →
        </StudioButton>
      </div>
    </div>
  );
}
