import useStore from '@/store/useStore';

export default function StudioInput({ label, id, type = 'text', value, onChange, placeholder, ...props }) {
  const setCursorVariant = useStore(state => state.setCursorVariant);

  const handleFocus = (e) => {
    e.target.style.borderColor = 'rgba(255,69,0,0.5)';
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label htmlFor={id} className="font-mono text-[10px] opacity-50 mb-[6px] text-white uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        className="bg-[#0d0d18] border border-[rgba(255,255,255,0.08)] rounded-[6px] px-[14px] py-[10px] text-white font-mono text-[13px] w-full outline-none transition-colors duration-200 cursor-none placeholder:opacity-20 focus:ring-0"
        {...props}
      />
    </div>
  );
}
