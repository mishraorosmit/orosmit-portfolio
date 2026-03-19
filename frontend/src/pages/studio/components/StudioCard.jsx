export default function StudioCard({ title, children, action }) {
  return (
    <div className="bg-[#07070f] border border-[rgba(255,69,0,0.08)] rounded-[10px] p-6 mb-6">
      {(title || action) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h3 className="font-mono text-[13px] tracking-widest text-[#FF4500] uppercase opacity-80 m-0">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
