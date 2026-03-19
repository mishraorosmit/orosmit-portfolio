import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../../store/useStore'
import OverviewPanel from './panels/OverviewPanel'
import AvailabilityPanel from './panels/AvailabilityPanel'
import ProjectsPanel from './panels/ProjectsPanel'
import WritingPanel from './panels/WritingPanel'
import CalendarPanel from './panels/CalendarPanel'
import AppearancePanel from './panels/AppearancePanel'
import AnalyticsPanel from './panels/AnalyticsPanel'
import SettingsPanel from './panels/SettingsPanel'

const PANELS = {
  overview: OverviewPanel,
  availability: AvailabilityPanel,
  projects: ProjectsPanel,
  writing: WritingPanel,
  calendar: CalendarPanel,
  appearance: AppearancePanel,
  analytics: AnalyticsPanel,
  settings: SettingsPanel,
}

const NAV_ITEMS = [
  { id: 'overview', label: 'OVERVIEW', icon: '⚡' },
  { id: 'availability', label: 'AVAILABILITY', icon: '◉' },
  { id: 'projects', label: 'PROJECTS', icon: '📁' },
  { id: 'writing', label: 'WRITING', icon: '✍' },
  { id: 'calendar', label: 'CALENDAR', icon: '📅' },
  { id: 'appearance', label: 'APPEARANCE', icon: '🎨' },
  { id: 'analytics', label: 'ANALYTICS', icon: '📊' },
  { id: 'settings', label: 'SETTINGS', icon: '⚙' },
]

export default function StudioDashboard() {
  const [activePanel, setActivePanel] = useState('overview')
  const navigate = useNavigate()
  const { studioAuth, studioLogout } = useStore()

  // Auth guard
  useEffect(() => {
    if (!studioAuth) navigate('/om-studio')
  }, [studioAuth, navigate])

  // Live clock
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const ActivePanel = PANELS[activePanel] || OverviewPanel

  const handleLogout = () => {
    studioLogout()
    navigate('/')
  }

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      background: '#020205',
      color: '#ffffff',
      fontFamily: 'Space Mono, monospace',
      overflow: 'hidden',
      // Force dark theme in studio always
      '--bg-primary': '#020205',
      '--bg-secondary': '#07070f',
      '--bg-card': '#0d0d18',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(255,255,255,0.6)',
      '--text-muted': 'rgba(255,255,255,0.3)',
      '--accent': '#FF4500',
      '--border-subtle': 'rgba(255,69,0,0.08)',
      '--border-default': 'rgba(255,255,255,0.08)',
    }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: '220px',
        minWidth: '220px',
        height: '100vh',
        background: '#020205',
        borderRight: '1px solid rgba(255,69,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 0',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Logo */}
        <div>
          <div style={{ padding: '0 20px 24px' }}>
            <div style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: '22px',
              fontWeight: '800',
            }}>
              <span style={{ color: '#ffffff' }}>O</span>
              <span style={{ color: '#FF4500' }}>M</span>
            </div>
            <div style={{
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(255,69,0,0.5)',
              marginTop: '2px',
            }}>STUDIO</div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            background: 'rgba(255,69,0,0.1)',
            margin: '0 0 16px',
          }} />

          {/* Nav Items */}
          <nav>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => setActivePanel(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '12px 20px',
                  background: activePanel === item.id
                    ? 'rgba(255,69,0,0.08)'
                    : 'transparent',
                  border: 'none',
                  borderLeft: activePanel === item.id
                    ? '2px solid #FF4500'
                    : '2px solid transparent',
                  color: activePanel === item.id
                    ? '#FF4500'
                    : 'rgba(255,255,255,0.4)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (activePanel !== item.id) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  }
                }}
                onMouseLeave={e => {
                  if (activePanel !== item.id) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            marginBottom: '16px',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {time.toLocaleTimeString()}
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              background: 'transparent',
              border: '1px solid rgba(255,69,0,0.3)',
              color: '#FF4500',
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,69,0,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            EXIT STUDIO
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: '#030308',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top Bar */}
        <div style={{
          height: '52px',
          minHeight: '52px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          background: '#020205',
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}>
          <span style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
          }}>
            {NAV_ITEMS.find(n => n.id === activePanel)?.icon}{' '}
            {NAV_ITEMS.find(n => n.id === activePanel)?.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.3)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {time.toLocaleTimeString()}
            </span>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid #FF4500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: '700',
              color: '#FF4500',
            }}>OM</div>
          </div>
        </div>

        {/* Panel Content */}
        <div style={{ padding: '32px', flex: 1 }}>
          <ActivePanel 
            onNavigate={setActivePanel}
          />
        </div>
      </main>
    </div>
  )
}

