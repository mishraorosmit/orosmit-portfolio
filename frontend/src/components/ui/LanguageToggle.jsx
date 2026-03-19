import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';

export default function LanguageToggle() {
  const language = useStore(state => state.language);
  const setLanguage = useStore(state => state.setLanguage);
  const setCursorVariant = useStore(state => state.setCursorVariant);

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      onClick={toggleLang}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className="fixed bottom-[24px] left-[136px] w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-none z-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)'
      }}
      onMouseOver={e => e.currentTarget.style.borderColor = 'var(--ember)'}
      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={language}
          initial={{ rotateY: -90 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: 90 }}
          transition={{ duration: 0.3 }}
          className="font-mono font-bold text-xs absolute flex items-center justify-center w-full h-full pb-[2px]"
          style={{ color: 'var(--ember)' }}
        >
          {language === 'en' ? 'EN' : 'हि'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
