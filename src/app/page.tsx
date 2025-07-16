'use client';

import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <div className="space-y-0">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}
