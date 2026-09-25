import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LabSection from '@/components/LabSection';
import Navbar from '@/components/Navbar';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import TechMarquee from '@/components/TechMarquee';
import WritingSection from '@/components/WritingSection';
import { formatPostDate, getAllPosts } from '@/lib/blog';

export default function Home() {
  const posts = getAllPosts().map((post) => ({ ...post, dateLabel: formatPostDate(post.date) }));

  return (
    <>
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <TechMarquee />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <LabSection />
        <WritingSection posts={posts} />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
