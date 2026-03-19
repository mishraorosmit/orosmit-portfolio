import { useState } from 'react';
import useStore from '@/store/useStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 400);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      className="fixed bottom-6 left-[80px] z-[9999] flex items-center justify-center cursor-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center w-[44px] h-[44px] rounded-full cursor-none transition-all duration-300 overflow-hidden"
        style={{
          background: isAnimating ? 'var(--accent)' : 'var(--bg-overlay)',
          border: '1px solid var(--border-default)',
          backdropFilter: 'blur(10px)'
        }}

        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,69,0,0.4)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)';
          e.currentTarget.style.transform = 'scale(1)';
        }}

      >
        <div 
          className="flex items-center justify-center w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ transform: isAnimating ? 'rotate(360deg) scale(0.8)' : 'rotate(0deg) scale(1)' }}
        >
          {isDark ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="#FF4500" strokeWidth="2"/>
              <line x1="12" y1="1" x2="12" y2="3" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="21" x2="12" y2="23" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="1" y1="12" x2="3" y2="12" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="21" y1="12" x2="23" y2="12" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#FF4500" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </button>

      {showTooltip && (
        <div 
          className="absolute left-[calc(100%+16px)] px-3 py-2 rounded text-[var(--text-primary)] text-[11px] font-mono tracking-widest whitespace-nowrap pointer-events-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </div>
      )}
    </div>
  );
}
