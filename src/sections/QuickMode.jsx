import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import CertificatesSection from './CertificatesSection';
import TimelineSection from './TimelineSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

export default function QuickMode({ mode, setMode }) {
  return (
    <div className="w-full min-h-screen bg-dark-900 text-slate-100 font-sans">
      <HeroSection mode={mode} setMode={setMode} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
