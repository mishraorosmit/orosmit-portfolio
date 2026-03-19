import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AvailabilityBadge() {
  const [data, setData] = useState({
    status: 'available',
    message: 'Open to freelance, teaching & collabs'
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/status/`)
      .then(res => res.json())
      .then(json => {
        if (json && json.status) {
          setData(json);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching availability status:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  const config = {
    available: {
      dot: '#00ff88',
      background: 'rgba(0,255,136,0.08)',
      border: '1px solid rgba(0,255,136,0.25)',
      text: '● AVAILABLE'
    },
    busy: {
      dot: '#ff4444',
      background: 'rgba(255,68,68,0.08)',
      border: '1px solid rgba(255,68,68,0.25)',
      text: '● BUSY'
    },
    partial: {
      dot: '#ffaa00',
      background: 'rgba(255,170,0,0.08)',
      border: '1px solid rgba(255,170,0,0.25)',
      text: '● LIMITED'
    }
  };

  const currentConfig = config[data.status] || config.available;

  return (
    <div 
      className="relative flex items-center justify-center cursor-none hidden md:flex"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div 
        className="px-3 py-1 rounded-full flex items-center justify-center whitespace-nowrap"
        style={{
          background: currentConfig.background,
          border: currentConfig.border,
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: currentConfig.dot,
        }}
      >
        <span 
          style={{
            display: 'inline-block',
            marginRight: '6px',
            color: currentConfig.dot,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        >
          ●
        </span>
        <span style={{ color: currentConfig.dot }}>
          {currentConfig.text.replace('● ', '')}
        </span>
      </div>

      {showTooltip && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'white',
            borderRadius: '4px',
            padding: '8px 12px',
            whiteSpace: 'nowrap',
            zIndex: 100,
          }}
        >
          {data.message}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1) }
          50% { opacity: 0.4; transform: scale(0.8) }
        }
      `}} />
    </div>
  );
}
