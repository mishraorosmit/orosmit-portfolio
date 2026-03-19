import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import useCountUp from '@/hooks/useCountUp';

export default function StatsSection() {
  const [githubData, setGithubData] = useState({ repos: '0', stars: '0', isLive: true });
  const [loading, setLoading] = useState(true);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/orosmit'),
          fetch('https://api.github.com/users/orosmit/repos?per_page=100')
        ]);
        
        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API failed');
        
        const user = await userRes.json();
        const repos = await reposRes.json();
        
        const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        
        setGithubData({ repos: user.public_repos.toString(), stars: stars.toString(), isLive: true });
      } catch (error) {
        console.error('Failed to fetch real-time GitHub stats:', error);
        setGithubData({ repos: '24', stars: '143', isLive: false });
      } finally {
        setLoading(false);
      }
    };
    
    fetchGithubStats();
  }, []);

  const yearsActive = (new Date().getFullYear() - 2021).toString();

  const reposCount = useCountUp(githubData.repos, 2000, isInView && !loading);
  const starsCount = useCountUp(githubData.stars, 2000, isInView && !loading);
  const projectsCount = useCountUp('12', 2000, isInView && !loading);
  const studentsCount = useCountUp('100+', 2000, isInView && !loading);
  const followersCount = useCountUp('500+', 2000, isInView && !loading);
  const yearsCount = useCountUp(yearsActive, 2000, isInView && !loading);

  const stats = [
    { label: 'GITHUB REPOS', value: reposCount, live: githubData.isLive },
    { label: 'GITHUB STARS', value: starsCount, live: githubData.isLive },
    { label: 'PROJECTS COMPLETED', value: projectsCount },
    { label: 'STUDENTS TAUGHT', value: studentsCount },
    { label: 'VEXX.TM FOLLOWERS', value: followersCount },
    { label: 'YEARS ACTIVE', value: yearsCount },
  ];

  if (loading) {
    return (
      <section className="w-full bg-[#030306] border-y border-[rgba(255,255,255,0.04)] py-20 px-6">
        <div className="max-w-[1280px] mx-auto flex justify-center">
           <div className="text-[var(--chrome)] font-mono text-sm opacity-50 tracking-[0.2em] uppercase animate-pulse">Loading live stats...</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="w-full bg-[#030306] border-y border-[rgba(255,255,255,0.04)] py-16 lg:py-0 px-6 lg:px-0">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-6 gap-y-12 lg:gap-y-0 lg:divide-x divide-[rgba(255,255,255,0.06)]">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center text-center lg:py-16">
             <div className="font-display font-extrabold text-[48px] lg:text-[64px] text-white leading-none mb-4 min-h-[64px] flex items-center justify-center">
                {s.value}
             </div>
             <div className="flex flex-col md:flex-row items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                   {s.label}
                </span>
                {s.live && (
                  <div className="flex flex-row items-center gap-[6px] bg-[#1a2f1b] px-[6px] py-[3px] rounded border border-[#2e5932] shrink-0 mt-2 md:mt-0">
                     <div className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse shadow-[0_0_5px_#4ade80]" />
                     <span className="font-mono text-[9px] text-[#4ade80] tracking-widest leading-none">LIVE</span>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
