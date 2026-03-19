import { useState, useEffect } from 'react';
import StudioCard from '../components/StudioCard';
import StudioInput from '../components/StudioInput';
import StudioButton from '../components/StudioButton';
import useStore from '@/store/useStore';
import studioApi from '@/lib/studioApi';
import api from '@/lib/api';

export default function SettingsPanel() {
  const { studioLogout } = useStore();
  const [siteInfo, setSiteInfo] = useState({
    site_name: '',
    contact_email: '',
    github_url: '',
    instagram_url: '',
    linkedin_url: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/settings/').then(res => {
      if (res.data) {
        setSiteInfo({
          site_name: res.data.site_name || '',
          contact_email: res.data.contact_email || '',
          github_url: res.data.github_url || '',
          instagram_url: res.data.instagram_url || '',
          linkedin_url: res.data.linkedin_url || ''
        });
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    try {
      await studioApi.patch('/settings/', siteInfo);
      const btn = document.getElementById('save-info-btn');
      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = 'SAVED ✓';
        setTimeout(() => btn.innerText = originalText, 2000);
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleExportData = async () => {
    try {
      const [projRes, writRes] = await Promise.all([
        studioApi.get('/portfolio/'),
        studioApi.get('/writing/').catch(() => studioApi.get('/blog/'))
      ]);
      const data = {
        projects: projRes.data,
        writings: writRes.data
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portfolio-data.json';
      a.click();
    } catch(e) {
      console.error("Export failed", e);
    }
  };

  if (loading) return null;

  return (
    <div className="pb-20 max-w-4xl">
      <h2 className="text-2xl font-display font-bold text-white mb-8 tracking-wider">SETTINGS</h2>

      {/* STUDIO PASSWORD CHANGE */}
      <StudioCard title="STUDIO PASSWORD">
        <div className="flex flex-col gap-4">
          <StudioInput type="password" label="Current Password" placeholder="········" />
          <div className="flex gap-4">
            <StudioInput type="password" label="New Password" placeholder="········" />
            <StudioInput type="password" label="Confirm Password" placeholder="········" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <StudioButton onClick={() => alert("Please update VITE_STUDIO_PASSWORD in your .env file and redeploy to apply a new password.")}>UPDATE PASSWORD</StudioButton>
            <div className="font-mono text-[10px] opacity-40 uppercase">Update in .env and redeploy</div>
          </div>
        </div>
      </StudioCard>

      {/* SITE INFO */}
      <StudioCard title="SITE INFORMATION">
        <form onSubmit={handleSaveInfo} className="flex flex-col gap-4 mt-2">
          <div className="flex gap-6 mb-2">
            <StudioInput label="Site Name" value={siteInfo.site_name} onChange={e => setSiteInfo({...siteInfo, site_name: e.target.value})} />
            <StudioInput label="Contact Email" type="email" value={siteInfo.contact_email} onChange={e => setSiteInfo({...siteInfo, contact_email: e.target.value})} />
          </div>
          
          <StudioInput label="GitHub URL" type="url" value={siteInfo.github_url} onChange={e => setSiteInfo({...siteInfo, github_url: e.target.value})} />
          <StudioInput label="Instagram URL" type="url" value={siteInfo.instagram_url} onChange={e => setSiteInfo({...siteInfo, instagram_url: e.target.value})} />
          <StudioInput label="LinkedIn URL" type="url" value={siteInfo.linkedin_url} onChange={e => setSiteInfo({...siteInfo, linkedin_url: e.target.value})} />

          <div className="flex justify-end mt-4">
            <StudioButton id="save-info-btn" type="submit">SAVE SITE INFO →</StudioButton>
          </div>
        </form>
      </StudioCard>

      {/* DANGER ZONE */}
      <div className="border border-[#ef4444] rounded-[10px] p-6 mb-6 bg-[rgba(239,68,68,0.02)]">
        <h3 className="font-mono text-[13px] tracking-widest text-[#ef4444] uppercase opacity-80 m-0 mb-6">DANGER ZONE</h3>
        <div className="flex items-center gap-6">
          <StudioButton variant="danger" onClick={() => studioLogout()}>CLEAR ALL SESSIONS</StudioButton>
          <StudioButton variant="secondary" onClick={handleExportData} className="border-opacity-30 text-white">EXPORT DATA TO JSON</StudioButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DEPLOYMENT STATUS */}
        <StudioCard title="DEPLOYMENT STATUS">
          <div className="flex flex-col gap-3 font-mono text-[12px] opacity-60 mt-4 tracking-wide">
            <div>API URL: {import.meta.env.VITE_API_URL || '/api/v1'}</div>
            <div>Environment: {import.meta.env.PROD ? 'Production' : 'Development'}</div>
            <div>Studio Version: v1.0</div>
          </div>
        </StudioCard>

        {/* KEYBOARD SHORTCUTS */}
        <StudioCard title="KEYBOARD SHORTCUTS">
          <div className="flex flex-col gap-3 font-mono text-[12px] text-white mt-4 tracking-wide">
            <div className="flex justify-between items-center opacity-80 border-b border-[rgba(255,255,255,0.05)] pb-2">
              <span>Exit Studio</span>
              <kbd className="opacity-50 tracking-normal px-2 py-0 border border-[rgba(255,255,255,0.2)] rounded text-[10px]">ESC</kbd>
            </div>
            <div className="flex justify-between items-center opacity-80 border-b border-[rgba(255,255,255,0.05)] pb-2">
              <span>Save Panel</span>
              <kbd className="opacity-50 tracking-normal px-2 py-0 border border-[rgba(255,255,255,0.2)] rounded text-[10px]">CTRL + S</kbd>
            </div>
            <div className="flex justify-between items-center opacity-80 border-b border-[rgba(255,255,255,0.05)] pb-2">
              <span>View Site</span>
              <kbd className="opacity-50 tracking-normal px-2 py-0 border border-[rgba(255,255,255,0.2)] rounded text-[10px]">CTRL + E</kbd>
            </div>
          </div>
        </StudioCard>
      </div>

    </div>
  );
}
