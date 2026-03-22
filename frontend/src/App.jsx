import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import CursorFollower from './components/ui/CursorFollower'
import LoadingScreen from './components/ui/LoadingScreen'
import ScrollToTop from './components/ui/ScrollToTop'
import SoundToggle from './components/ui/SoundToggle'
import ThemeToggle from './components/ui/ThemeToggle'
import LanguageToggle from './components/ui/LanguageToggle'
import ComingSoonNotification from './components/ui/ComingSoonNotification'
import useStore from './store/useStore'

import Home from './pages/Home'
import PortfolioPage from './pages/PortfolioPage'
import CaseStudyPage from './pages/CaseStudyPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import WritingPage from './pages/WritingPage'
import ContactPage from './pages/ContactPage'
import TeachingPage from './pages/TeachingPage'
import StudioLogin from './pages/studio/StudioLogin'
import StudioDashboard from './pages/studio/StudioDashboard'

function App() {
  const location = useLocation();
  const [isRouting, setIsRouting] = useState(false);
  const { theme, language, initStudioAuth } = useStore();

  useEffect(() => {
    initStudioAuth();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', language);
  }, [language]);

  useEffect(() => {
    setIsRouting(true);
    const timeout = setTimeout(() => setIsRouting(false), 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-void text-chrome font-display uppercase-style selection:bg-ember selection:text-void transition-colors duration-500">
      <LoadingScreen />
      <CursorFollower />
      <SoundToggle />
      <ThemeToggle />
      <LanguageToggle />
      <ScrollToTop />
      <ComingSoonNotification />
      
      {/* Route Progress Bar */}
      <AnimatePresence>
        {isRouting && (
          <motion.div
            key="progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 h-[2px] bg-ember z-[2000]"
          />
        )}
      </AnimatePresence>

      {!location.pathname.startsWith('/om-studio') && <Navbar />}
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <Home />
              </motion.div>
            } />
            <Route path="/portfolio" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <PortfolioPage />
              </motion.div>
            } />
            <Route path="/portfolio/:id" element={<CaseStudyPage />} />
            <Route path="/blog" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <BlogPage />
              </motion.div>
            } />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/writing" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <WritingPage />
              </motion.div>
            } />
            <Route path="/contact" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <ContactPage />
              </motion.div>
            } />
            <Route path="/teaching" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <TeachingPage />
              </motion.div>
            } />
            <Route path="/om-studio" element={<StudioLogin />} />
            <Route path="/om-studio/dashboard" element={<StudioDashboard />} />
            <Route path="/om-studio/*" element={<Navigate to="/om-studio" />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {!location.pathname.startsWith('/om-studio') && <Footer />}
    </div>
  )
}

export default App
