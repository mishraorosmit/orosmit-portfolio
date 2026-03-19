import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/useStore';

// Placholder imports for panels
import OverviewPanel from './panels/OverviewPanel';
import AvailabilityPanel from './panels/AvailabilityPanel';
import ProjectsPanel from './panels/ProjectsPanel';
import WritingPanel from './panels/WritingPanel';
import CalendarPanel from './panels/CalendarPanel';
import AppearancePanel from './panels/AppearancePanel';
import AnalyticsPanel from './panels/AnalyticsPanel';
import SettingsPanel from './panels/SettingsPanel';

const NAV_ITEMS = [
  { id: 'overview', icon: '⚡', label: 'OVERVIEW', component: OverviewPanel },
  { id: 'availability', icon: '◉', label: 'AVAILABILITY', component: AvailabilityPanel },
  { id: 'projects', icon: '📁', label: 'PROJECTS', component: ProjectsPanel },
  { id: 'writing', icon: '✍', label: 'WRITING', component: WritingPanel },
  { id: 'calendar', icon: '📅', label: 'CALENDAR', component: CalendarPanel },
  { id: 'appearance', icon: '🎨', label: 'APPEARANCE', component: AppearancePanel },
  { id: 'analytics', icon: '📊', label: 'ANALYTICS', component: AnalyticsPanel },
  { id: 'settings', icon: '⚙', label: 'SETTINGS', component: SettingsPanel },
];

export default function StudioDashboard() {
  const { studioAuth, studioLogout, setCursorVariant } = useStore();
  const navigate = useNavigate();
  const [activePanelId, setActivePanelId] = useState('overview');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!studioAuth) navigate('/om-studio');
  }, [studioAuth, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!studioAuth) return null;

  const handleLogout = () => {
    studioLogout();
    navigate('/');
  };

  const getActivePanel = () => {
    const item = NAV_ITEMS.find(n => n.id === activePanelId);
    if (!item) return <OverviewPanel />;
    const PanelComponent = item.component;
    return <PanelComponent />;
  };

  const activeItem = NAV_ITEMS.find(n => n.id === activePanelId);

  return (
    <div className="w-full h-screen overflow-hidden flex bg-[#030308] text-white cursor-default">
      {/* SIDEBAR */}
      <div className="w-[240px] h-screen shrink-0 bg-[#020205] border-r border-[rgba(255,69,0,0.1)] flex flex-col sticky top-0">
        
        {/* TOP */}
        <div className="p-6 pb-4">
          <div className="text-2xl font-display font-extrabold tracking-tighter flex items-center mb-1 select-none">
            <span className="text-[#c0c0c0]">O</span><span className="text-[#FF4500]">M</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#FF4500] opacity-60 m-0">
            STUDIO
          </p>
        </div>
        <div className="w-full h-[1px] bg-[rgba(255,255,255,0.05)] mb-4" />

        {/* NAV */}
        <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = activePanelId === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActivePanelId(item.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full text-left flex items-center gap-3 px-[20px] py-[12px] font-mono text-[11px] uppercase tracking-widest cursor-none transition-all duration-200"
                style={{
                  color: isActive ? '#FF4500' : 'rgba(255,255,255,0.4)',
                  background: isActive ? 'rgba(255,69,0,0.05)' : 'transparent',
                  borderLeft: isActive ? '2px solid #FF4500' : '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = '0.8';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = '1';
                }}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div className="p-6 pt-4 border-t border-[rgba(255,255,255,0.05)] flex flex-col gap-4">
          <div className="font-mono text-[12px] opacity-30 text-white">
            {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <button
            onClick={handleLogout}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="w-full py-2 px-4 border border-[#FF4500] text-[#FF4500] font-mono text-[10px] tracking-widest uppercase hover:bg-[#ef4444] hover:text-white hover:border-[#ef4444] transition-colors cursor-none rounded"
          >
            EXIT STUDIO
          </button>
        </div>
      </div>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP BAR */}
        <header className="h-[48px] shrink-0 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-8">
          <div className="font-mono text-xs tracking-[0.2em] text-[#FF4500] opacity-80 uppercase flex items-center gap-3">
            <span className="text-white opacity-40">{activeItem?.icon}</span>
            {activeItem?.label}
          </div>
          <div className="flex items-center gap-6">
            <div className="font-mono text-[14px] opacity-50">
              {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="w-[32px] h-[32px] rounded-full border border-[#FF4500] bg-[#1a0808] flex items-center justify-center font-display font-bold text-[10px] text-[#FF4500]">
              OM
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            {getActivePanel()}
          </div>
        </main>

      </div>
    </div>
  );
}
