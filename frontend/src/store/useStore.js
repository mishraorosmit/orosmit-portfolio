import { create } from 'zustand'

const useStore = create((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
  hoveredSkill: null,
  setHoveredSkill: (idx) => set({ hoveredSkill: idx }),
  hasLoaded: false,
  setHasLoaded: (val) => set({ hasLoaded: val })
}))

export default useStore
