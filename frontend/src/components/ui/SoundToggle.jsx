import { useState, useRef } from 'react';

function createAmbientSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create layered oscillators for space ambience
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(55, ctx.currentTime); // deep bass hum
  
  osc2.type = 'sine';  
  osc2.frequency.setValueAtTime(110, ctx.currentTime);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
  
  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc1.start();
  osc2.start();
  
  return { ctx, gainNode, osc1, osc2 };
}

export default function SoundToggle() {
  const [isOn, setIsOn] = useState(false);
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleSound = () => {
    if (!isOn) {
      if (!audioRef.current) {
        // Attempt to play external stream first
        const audio = new Audio('https://www.soundjay.com/misc/sounds/ambience-space-1.mp3');
        audio.loop = true;
        audio.volume = 0;
        
        audio.play().then(() => {
          audioRef.current = { type: 'stream', audio };
          let vol = 0;
          const fade = setInterval(() => {
            vol += 0.05;
            if (vol >= 0.5) {
              clearInterval(fade);
              audio.volume = 0.5;
            } else {
              if (audio.volume <= 0.95) audio.volume = vol;
            }
          }, 200);
        }).catch(err => {
          console.warn('Audio stream failed, using synthesis fallback', err);
          audioRef.current = { type: 'synth', ...createAmbientSound() };
        });
      } else {
        if (audioRef.current.type === 'stream') {
          const audio = audioRef.current.audio;
          audio.play();
          let vol = 0;
          const fade = setInterval(() => {
            vol += 0.05;
            if (vol >= 0.5) {
              clearInterval(fade);
              audio.volume = 0.5;
            } else {
              if (audio.volume <= 0.95) audio.volume = vol;
            }
          }, 200);
        } else {
          const { ctx, gainNode } = audioRef.current;
          if (ctx.state === 'suspended') ctx.resume();
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2);
        }
      }
      setIsOn(true);
    } else {
      if (audioRef.current) {
        if (audioRef.current.type === 'stream') {
          const audio = audioRef.current.audio;
          let vol = audio.volume;
          const fade = setInterval(() => {
            vol -= 0.05;
            if (vol <= 0) {
              clearInterval(fade);
              audio.pause();
              audio.volume = 0;
            } else {
              if (audio.volume >= 0.05) audio.volume = vol;
            }
          }, 100);
        } else {
          const { ctx, gainNode } = audioRef.current;
          gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
          setTimeout(() => {
            if (ctx.state === 'running') ctx.suspend();
          }, 1000);
        }
      }
      setIsOn(false);
    }
  };

  return (
    <div 
      className="fixed bottom-6 left-6 z-[9999] flex items-center justify-center cursor-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={toggleSound}
        className="relative flex items-center justify-center w-[44px] h-[44px] rounded-full cursor-none transition-all duration-300"
        style={{
          background: 'var(--bg-overlay)',
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
        {isOn ? (
          <div className="flex items-end justify-center gap-[3px] h-[12px]">
            <div className="w-[3px] bg-[#FF4500] rounded-full animate-wave-1"></div>
            <div className="w-[3px] bg-[#FF4500] rounded-full animate-wave-2"></div>
            <div className="w-[3px] bg-[#FF4500] rounded-full animate-wave-3"></div>
          </div>
        ) : (
          <div className="flex items-end justify-center gap-[3px] h-[12px]">
            <div className="w-[3px] h-[4px] bg-[var(--text-secondary)] rounded-full opacity-60"></div>
            <div className="w-[3px] h-[4px] bg-[var(--text-secondary)] rounded-full opacity-60"></div>
            <div className="w-[3px] h-[4px] bg-[var(--text-secondary)] rounded-full opacity-60"></div>
          </div>
        )}
      </button>

      {showTooltip && (
        <div 
          className="absolute left-[calc(100%+16px)] px-3 py-2 rounded text-[var(--text-primary)] text-[11px] font-mono tracking-widest whitespace-nowrap pointer-events-none"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)'
          }}

        >
          Ambient Sound
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
        .animate-wave-1 { animation: wave 0.8s ease-in-out infinite; }
        .animate-wave-2 { animation: wave 0.8s ease-in-out 0.15s infinite; }
        .animate-wave-3 { animation: wave 0.8s ease-in-out 0.3s infinite; }
      `}} />
    </div>
  );
}
