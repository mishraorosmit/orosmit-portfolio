export default function CalendarPanel({ onNavigate }) {
  return (
    <div>
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '32px',
      }}>CALENDAR</h1>
      
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        padding: '32px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
        <p style={{ fontMono: 'Space Mono', opacity: 0.5 }}>Studio Calendar integration coming soon.</p>
        <button 
          onClick={() => onNavigate('overview')}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '8px 24px',
            borderRadius: '4px',
            marginTop: '24px',
            cursor: 'pointer'
          }}
        >
          BACK TO OVERVIEW
        </button>
      </div>
    </div>
  );
}

