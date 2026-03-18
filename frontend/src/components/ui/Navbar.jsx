import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { name: 'WORK', href: '/portfolio', isPage: true },
  { name: 'ABOUT', href: '#about' },
  { name: 'TEACHING', href: '/teaching', isPage: true },
  { name: 'WRITING', href: '/writing', isPage: true },
  { name: 'VEXX.TM', href: '#brand' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const setCursorVariant = useStore((state) => state.setCursorVariant);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observers = NAV_LINKS.map(link => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => obs && obs.observer.unobserve(obs.el));
    };
  }, [location.pathname]);

  const scrollToContact = () => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateTo = (link) => {
    setMenuOpen(false);
    if (link.isPage) {
      navigate(link.href);
    } else {
      if (location.pathname !== '/') {
        navigate(`/${link.href}`);
      } else {
        document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-8 py-5 transition-all duration-300 ${
          scrolled ? 'bg-[rgba(5,5,8,0.85)] backdrop-blur-[20px] border-b border-[rgba(192,192,192,0.08)] py-4' : 'bg-transparent'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-display font-extrabold tracking-tighter flex items-center cursor-none hover:scale-105 transition-transform"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-chrome">O</span><span className="text-ember">M</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest uppercase items-center">
            {NAV_LINKS.map((item) => {
              const itemId = item.href.replace('#', '');
              const isActive = activeId === itemId;
              return (
                <button 
                  key={item.name} 
                  onClick={() => navigateTo(item)}
                  className={`relative flex flex-col items-center group cursor-none transition-opacity duration-300 ${isActive ? 'opacity-100 text-chrome' : 'opacity-50 text-chrome hover:opacity-100'}`}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  {item.name}
                  <span className={`absolute -bottom-3 w-[4px] h-[4px] rounded-full bg-ember origin-center transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'}`} />
                </button>
              );
            })}
          </div>

          {/* Hire Me CTA & Hamburger */}
          <div className="flex items-center gap-6">
            <div 
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="hidden md:block"
            >
              <MagneticButton 
                onClick={scrollToContact}
                className="bg-ember text-void font-bold text-xs uppercase px-4 py-1.5 shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] cursor-none hover:bg-chrome transition-colors"
                style={{ borderRadius: '9999px' }}
              >
                HIRE ME
              </MagneticButton>
            </div>

            {/* Hamburger Mobile */}
            <button 
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[60] cursor-none relative"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span 
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
                className="w-full h-[2px] bg-chrome block" 
              />
              <motion.span 
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-[80%] h-[2px] bg-chrome block ml-auto" 
              />
              <motion.span 
                animate={menuOpen ? { rotate: -45, y: -7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }} 
                className="w-full h-[2px] bg-chrome block" 
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((item, i) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                key={item.name}
                onClick={() => navigateTo(item)}
                className="text-chrome font-mono text-xl tracking-widest uppercase cursor-none"
              >
                {item.name}
              </motion.button>
            ))}
            <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.3 }}
                onClick={scrollToContact}
                className="bg-ember text-void font-bold text-sm tracking-widest uppercase px-8 py-3 mt-4 rounded-full shadow-[0_0_15px_rgba(255,69,0,0.3)] cursor-none"
              >
                HIRE ME
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
