import useStore from '@/store/useStore';

export default function StudioToggle({ label, checked, onChange }) {
  const setCursorVariant = useStore(state => state.setCursorVariant);

  return (
    <label 
      className="flex items-center gap-3 cursor-none group w-fit"
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      <div className="relative">
        <input 
          type="checkbox" 
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div 
          className={`block w-10 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#FF4500]' : 'bg-[#1a1a2e]'}`}
        ></div>
        <div 
          className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-200 shadow-sm ${checked ? 'transform translate-x-4 bg-white' : 'bg-[#404040]'}`}
        ></div>
      </div>
      {label && <span className="font-mono text-[12px] text-white opacity-80 group-hover:opacity-100 transition-opacity">{label}</span>}
    </label>
  );
}
