import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import { useTranslation } from '@/hooks/useTranslation';

const InputField = ({ label, id, type = 'text', value, onChange, error, ...props }) => (
  <div style={{ width: '100%', position: 'relative' }}>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="custom-contact-input"
      style={{
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        color: '#ffffff',
        fontFamily: 'Space Mono, monospace',
        fontSize: '14px',
        padding: '14px 0',
        width: '100%',
        outline: 'none',
        display: 'block',
        marginBottom: '32px',
      }}
      onFocus={e => e.target.style.borderBottomColor = '#FF4500'}
      onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
      {...props}
    />
    {error && <span style={{ position: 'absolute', bottom: '-20px', left: 0, color: '#FF4500', fontSize: '11px', fontFamily: 'Space Mono' }}>{error}</span>}
  </div>
);

const TextareaField = ({ label, id, value, onChange, error, ...props }) => (
  <div style={{ width: '100%', position: 'relative' }}>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="custom-contact-input"
      style={{
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border)',
        color: '#ffffff',
        fontFamily: 'Space Mono, monospace',
        fontSize: '14px',
        padding: '14px 0',
        width: '100%',
        outline: 'none',
        display: 'block',
        marginBottom: '32px',
      }}
      onFocus={e => e.target.style.borderBottomColor = '#FF4500'}
      onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
      {...props}
    />
    {error && <span style={{ position: 'absolute', bottom: '-20px', left: 0, color: '#FF4500', fontSize: '11px', fontFamily: 'Space Mono' }}>{error}</span>}
  </div>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const t = useTranslation();

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Valid email required.";
    if (formData.message.length <= 10) newErrors.message = "Message must be > 10 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    try {
      await api.post('/contact/', formData);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <section id="contact" style={{ position: 'relative', width: '100%', padding: '96px 0', backgroundColor: 'var(--void)', borderTop: '1px solid rgba(139,143,168,0.2)', overflow: 'hidden' }}>
      
      {/* Placeholder styles moved to globals.css */}
      
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '0 32px', display: 'flex', gap: '96px', flexWrap: 'wrap' }}>
        
        {/* LEFT PANEL */}
        <div style={{ flex: '1 1 40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-chrome mb-4 leading-[1.0] tracking-tighter mix-blend-difference">
              {t.contact.heading}
            </h2>
            <p className="text-xl font-mono text-starDust mb-12">
              {t.contact.subheading}
            </p>

            <ul className="flex flex-col gap-6 font-mono text-chrome tracking-wide mb-16">
              <li className="flex items-center gap-4">
                <span className="text-ember text-xl">◉</span> study.orosmit21@gmail.com
              </li>
              <li className="flex items-center gap-4">
                <span className="text-ember text-xl">◉</span> India · Available Worldwide
              </li>
              <li className="flex items-center gap-4">
                <span className="text-ember text-xl">◉</span> Open to freelance · teaching · collabs
              </li>
            </ul>

            <div className="flex gap-8 font-mono text-sm tracking-widest uppercase flex-wrap">
              {['GitHub', 'Instagram (vexx.tm)', 'LinkedIn'].map((link) => {
                const getHref = () => {
                  if (link === 'GitHub') return 'https://github.com/orosmit'
                  if (link === 'Instagram (vexx.tm)') return 'https://instagram.com/vexx.tm'
                  return 'https://linkedin.com/in/orosmit'
                }
                return (
                <button 
                  key={link} 
                  onClick={() => window.open(getHref(), '_blank')}
                  className="relative text-chrome group overflow-hidden pb-2 cursor-none border-none bg-transparent"
                  style={{ textAlign: 'left', padding: 0 }}
                >
                  <span className="relative z-10 group-hover:-translate-y-[120%] block transition-transform duration-300 ease-in-out">{link}</span>
                  <span className="absolute left-0 top-full block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%] text-ember">{link}</span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-ember scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out" />
                </button>
              )})}
            </div>
          </motion.div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.4 } }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                onSubmit={handleSubmit}
                style={{ width:'100%', padding:'0' }}
                noValidate
              >
                <InputField label={t.contact.name} id="name" value={formData.name} onChange={handleChange} error={errors.name} />
                <InputField label={t.contact.email} id="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <TextareaField label={t.contact.message} id="message" rows="5" value={formData.message} onChange={handleChange} error={errors.message} />

                {/* Honeypot Field */}
                <input type="text" id="website" style={{ display: 'none' }} value={formData.website} onChange={handleChange} tabIndex="-1" autoComplete="off" />

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-ember text-void py-5 mt-6 font-display font-bold text-xl tracking-widest uppercase hover:bg-chrome hover:text-void transition-colors relative overflow-hidden group disabled:opacity-70 cursor-none"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {status === 'loading' ? (
                       <>{t.contact.sending}<div className="w-5 h-5 border-2 border-void border-t-transparent rounded-full animate-spin" /></>
                    ) : (
                      <>{t.contact.send} <span className="text-2xl leading-none font-normal"></span></>
                    )}
                  </span>
                </button>

                {status === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-ember font-mono text-sm text-center mt-4">
                    Something went wrong. Try emailing directly.
                  </motion.p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full h-full min-h-[400px] flex items-center justify-center border border-[rgba(139,143,168,0.2)] rounded-2xl bg-void shadow-[0_0_40px_rgba(255,69,0,0.1)] py-16"
              >
                <div className="text-center px-8">
                  <span className="text-ember text-4xl mb-6 block drop-shadow-[0_0_10px_rgba(255,69,0,0.8)]">✦</span>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-chrome mb-6">{t.contact.success_heading}</h3>
                  <p className="font-mono text-[rgba(139,143,168,1)] text-lg">{t.contact.success_body}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
