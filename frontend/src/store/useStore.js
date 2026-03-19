import { create } from 'zustand'

const useStore = create((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  hoveredSkill: null,
  setHoveredSkill: (idx) => set({ hoveredSkill: idx }),
  hasLoaded: false,
  setHasLoaded: (val) => set({ hasLoaded: val }),
  theme: 'dark',
  toggleTheme: () => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  studioAuth: false,
  studioLogin: (password) => {
    const SECRET = import.meta.env.VITE_STUDIO_PASSWORD || 'om-studio-2024';
    if (password === SECRET) {
      sessionStorage.setItem('om-studio-auth', 'true');
      set({ studioAuth: true });
      return true;
    }
    return false;
  },
  studioLogout: () => {
    sessionStorage.removeItem('om-studio-auth');
    set({ studioAuth: false });
  },
  initStudioAuth: () => {
    const saved = sessionStorage.getItem('om-studio-auth');
    if (saved === 'true') set({ studioAuth: true });
  }
}))

export default useStore
