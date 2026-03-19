export default function AnalyticsPanel({ onNavigate }) {
  return (
    <div>
      <h1 style={{
        fontFamily: 'Syne, sans-serif',
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '32px',
      }}>ANALYTICS</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {[
          { label: 'TOTAL VISITS', value: '2.4k', growth: '+12%' },
          { label: 'AVG. SESSION', value: '4:20', growth: '+5%' },
          { label: 'BOUNCE RATE', value: '32%', growth: '-2%' }
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-default)',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <div style={{ fontMono: 'Space Mono', fontSize: '10px', opacity: 0.4, letterSpacing: '0.1em' }}>{stat.label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '8px' }}>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: stat.growth.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.growth}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

