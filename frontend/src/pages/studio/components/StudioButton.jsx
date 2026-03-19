import useStore from '@/store/useStore';

export default function StudioButton({ variant = 'primary', children, onClick, className = '' }) {
  const setCursorVariant = useStore(state => state.setCursorVariant);

  let styles = "font-mono text-[11px] tracking-[0.08em] px-[20px] py-[8px] rounded-[4px] cursor-none uppercase transition-colors duration-200 border border-transparent";
  
  if (variant === 'primary') {
    styles += " bg-[#FF4500] text-black hover:bg-white inset-ring";
  } else if (variant === 'secondary') {
    styles += " bg-transparent text-[#FF4500] border-[#FF4500] hover:bg-[rgba(255,69,0,0.1)]";
  } else if (variant === 'danger') {
    styles += " bg-[#ef4444] text-white hover:bg-red-600";
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      className={`${styles} ${className}`}
    >
      {children}
    </button>
  );
}
