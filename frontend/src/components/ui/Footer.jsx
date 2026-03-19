export default function Footer() {
  return (
    <footer className="py-12 md:py-16 px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] relative z-20 overflow-hidden">

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* ROW 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 font-mono text-sm tracking-widest uppercase text-[var(--text-muted)] cursor-none">
          <div className="font-bold text-[var(--text-primary)]">OROSMIT MISHRA</div>

          
          <div className="flex gap-8">
            <a href="https://github.com/orosmit" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-none">GITHUB</a>
            <a href="https://instagram.com/vexx.tm" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-none">INSTAGRAM</a>
            <a href="https://linkedin.com/in/orosmit" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-none">LINKEDIN</a>
          </div>

          
          <div className="opacity-60">INDIA · {new Date().getFullYear()}</div>
        </div>

        {/* ROW 2 */}
        <div className="text-center font-mono text-[10px] opacity-30 text-[var(--text-muted)] tracking-widest uppercase">
          Built with Django + React · Three.js · Framer Motion
        </div>


      </div>
    </footer>
  );
}
