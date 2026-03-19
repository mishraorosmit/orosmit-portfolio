import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import TeachingSection from '@/components/sections/TeachingSection'
import WritingSection from '@/components/sections/WritingSection'
import BlogSection from '@/components/sections/BlogSection'
import BrandSection from '@/components/sections/BrandSection'
import ContactSection from '@/components/sections/ContactSection'
import useSmoothScroll from '@/hooks/useSmoothScroll'

export default function Home() {
  useSmoothScroll()

  return (
    <div className="w-full">
      <HeroSection />
      <StatsSection />
      <BrandSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <TeachingSection />
      <WritingSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}
