import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';

export default function StudioLogin() {
  const [password, setPassword] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);
  
  const navigate = useNavigate();
  const { studioLogin, studioAuth, setCursorVariant } = useStore();

  useEffect(() => {
    if (studioAuth) navigate('/om-studio/dashboard');
  }, [studioAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = studioLogin(password);
    
    if (isValid) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/om-studio/dashboard');
      }, 500);
    } else {
      setErrorVisible(true);
      setPassword('');
      if (inputRef.current) {
        inputRef.current.classList.add('shake-animation');
        inputRef.current.style.borderBottomColor = '#ef4444';
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.classList.remove('shake-animation');
            inputRef.current.style.borderBottomColor = 'rgba(192,192,192,0.15)';
          }
        }, 400);
      }
      setTimeout(() => setErrorVisible(false), 2000);
    }
  };

  if (studioAuth) return null;

  return (
    <div className="min-h-screen bg-[#020205] relative overflow-hidden flex flex-col items-center justify-center cursor-default">
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,69,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,69,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)'
        }}
      />

      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
          75% { transform: translateX(-5px); }
          90% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
        .shake-animation {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
      
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#FF4500] pointer-events-none z-40"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center">
        {!success && (
          <motion.div 
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Monogram */}
            <div className="text-4xl md:text-[48px] font-display font-extrabold tracking-tighter flex items-center mb-6 select-none shadow-[0_0_15px_rgba(255,69,0,0.1)]">
              <span className="text-[#c0c0c0]">O</span><span className="text-[#FF4500]">M</span>
            </div>
            
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-8 text-[#FF4500]/60 select-none">
              STUDIO ACCESS
            </p>
            
            <div className="w-[60px] h-[1px] bg-[#FF4500] mb-12" />

            <form onSubmit={handleSubmit} className="relative">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="· · · · · · · ·"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-[280px] bg-transparent border-none border-b border-[rgba(192,192,192,0.15)] text-center font-mono text-[18px] tracking-[0.4em] text-white py-4 outline-none transition-colors duration-300 placeholder:opacity-30 cursor-none"
                onFocus={(e) => {
                  if (!inputRef.current?.classList.contains('shake-animation')) {
                    e.target.style.borderBottomColor = '#FF4500';
                  }
                }}
                onBlur={(e) => {
                  if (!inputRef.current?.classList.contains('shake-animation')) {
                    e.target.style.borderBottomColor = 'rgba(192,192,192,0.15)';
                  }
                }}
                autoFocus
                autoComplete="off"
              />
              <AnimatePresence>
                {errorVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-[#ef4444] font-mono text-[10px] tracking-widest select-none"
                  >
                    ACCESS DENIED
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none select-none">
        <p className="font-mono text-[9px] tracking-[0.2em] text-white opacity-15">
          OM STUDIO v1.0 · PRIVATE ACCESS
        </p>
      </div>

    </div>
  );
}
