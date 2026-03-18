export default function ContactPage() {
  useSmoothScroll()

  return (
    <div className="pt-32 px-8 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">CONTACT</h1>
      <form className="flex flex-col gap-6 font-mono">
        <input type="text" placeholder="Name" className="bg-transparent border-b border-starDust py-4 text-chrome focus:outline-none focus:border-ember transition-colors" />
        <input type="email" placeholder="Email" className="bg-transparent border-b border-starDust py-4 text-chrome focus:outline-none focus:border-ember transition-colors" />
        <textarea rows="4" placeholder="Message" className="bg-transparent border-b border-starDust py-4 text-chrome focus:outline-none focus:border-ember transition-colors resize-none"></textarea>
        {/* Honeypot field - hidden */}
        <input type="text" name="website" className="hidden" />
        <button type="button" className="bg-chrome text-void py-4 px-8 mt-4 hover:bg-ember transition-colors font-bold uppercase">Send Message</button>
      </form>
    </div>
  )
}
