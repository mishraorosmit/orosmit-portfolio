import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '@/store/useStore';
import MagneticButton from './MagneticButton';
import AvailabilityBadge from './AvailabilityBadge';
import { useTranslation } from '@/hooks/useTranslation';

export default function Navbar() {
  const t = useTranslation();
  const NAV_LINKS = [
    { name: t.nav.work, href: '/portfolio', isPage: true },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.teaching, href: '/teaching', isPage: true },
    { name: t.nav.writing, href: '/writing', isPage: true },
    { name: t.nav.thoughts, href: '/blog', isPage: true },
    { name: t.nav.brand, href: '#brand' },
    { name: t.nav.contact, href: '#contact' },
  ];

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
          scrolled ? 'backdrop-blur-[20px] border-b py-4' : 'bg-transparent'
        }`}
        style={{
          background: scrolled ? 'var(--navbar-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none'
        }}

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
            <span className="text-[var(--text-primary)]">O</span><span className="text-[var(--accent)]">M</span>

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
                  className={`relative flex flex-col items-center group cursor-none transition-opacity duration-300 ${isActive ? 'opacity-100 text-[var(--text-primary)]' : 'opacity-50 text-[var(--text-secondary)] hover:opacity-100'}`}

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
            <AvailabilityBadge />
            <div 
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="hidden md:block"
            >
              <MagneticButton 
                onClick={scrollToContact}
                className="bg-[var(--accent)] text-[var(--bg-primary)] font-bold text-xs uppercase px-4 py-1.5 shadow-[0_0_15px_var(--accent-glow)] hover:shadow-[0_0_20px_var(--accent-glow)] cursor-none hover:bg-[var(--text-primary)] transition-colors"

                style={{ borderRadius: '9999px' }}
              >
                {t.nav.hire}
              </MagneticButton>
            </div>

            {/* Hamburger Mobile */}
            <button 
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 z-[60] cursor-none relative"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span 
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
                className="w-full h-[2px] bg-[var(--text-primary)] block" 
              />
              <motion.span 
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} 
                className="w-[80%] h-[2px] bg-[var(--text-primary)] block ml-auto" 
              />
              <motion.span 
                animate={menuOpen ? { rotate: -45, y: -7, width: '100%' } : { rotate: 0, y: 0, width: '100%' }} 
                className="w-full h-[2px] bg-[var(--text-primary)] block" 
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
            className="fixed inset-0 z-40 bg-[var(--bg-overlay)] backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden"

          >
            {NAV_LINKS.map((item, i) => (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05 }}
                key={item.name}
                onClick={() => navigateTo(item)}
                className="text-[var(--text-primary)] font-mono text-xl tracking-widest uppercase cursor-none"

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
                className="bg-[var(--accent)] text-[var(--bg-primary)] font-bold text-sm tracking-widest uppercase px-8 py-3 mt-4 rounded-full shadow-[0_0_15px_var(--accent-glow)] cursor-none"

              >
                {t.nav.hire}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
