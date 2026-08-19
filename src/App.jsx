import React, { useState } from 'react';
import Navbar from './components/navigation/Navbar';
import WorkspaceCanvas from './components/3d/WorkspaceCanvas';
import LoadingScreen from './components/ui/LoadingScreen';
import Cursor from './components/ui/Cursor';
import StudioHUD from './components/ui/StudioHUD';
import ProjectModal from './components/projects/ProjectModal';
import CertificateModal from './components/certificates/CertificateModal';
import BookOverlay from './components/portfolio/BookOverlay';

import QuickMode from './sections/QuickMode';
import ContactSection from './sections/ContactSection';
import { useMode } from './hooks/useMode';
import { useDevice } from './hooks/useDevice';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { mode, setMode, isExplore } = useMode();
  const deviceInfo = useDevice();

  // 360° Camera Directional Target Yaw Angle (0 = Front Projects, 90 = Right Certs, 180 = Back Timeline, 270 = Left Contact)
  const [targetYaw, setTargetYaw] = useState(0);

  const [activeProject, setActiveProject] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeTimeline, setActiveTimeline] = useState(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Fallback to Quick mode if WebGL fails
  const use3D = isExplore && deviceInfo.hasWebGL;

  const handleSelectWall = (yawAngle) => {
    setTargetYaw(yawAngle);
  };

  return (
    <div className="relative min-h-screen bg-dark-900 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      {/* Cinematic Loading Boot Screen */}
      {isLoading && (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      )}

      {/* Custom Desktop Glowing Cursor */}
      <Cursor isTouch={deviceInfo.isTouch} />

      {/* Header Bar for Quick Mode */}
      <Navbar
        mode={mode}
        setMode={setMode}
        onNavigateStation={(idx) => {
          const yawMap = [0, 0, 90, 180, 270];
          setTargetYaw(yawMap[idx] || 0);
        }}
      />

      {/* 360° INTERACTIVE WORKSPACE HOMEPAGE */}
      {use3D ? (
        <>
          {/* Full-Screen 360° Workspace Environment Canvas */}
          <WorkspaceCanvas
            targetYaw={targetYaw}
            isMobile={deviceInfo.isMobile}
            pixelRatio={deviceInfo.pixelRatio}
            onSelectProject={(proj) => setActiveProject(proj)}
            onSelectCertificate={(cert) => setActiveCertificate(cert)}
            onSelectTimeline={(timelineItem) => setActiveTimeline(timelineItem)}
            onOpenBook={() => setIsBookOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenIdentity={() => setIsBookOpen(true)}
          />

          {/* 360° Top HUD Overlay & Directional Quick Nav */}
          <StudioHUD
            isMobile={deviceInfo.isMobile}
            targetYaw={targetYaw}
            onSelectWall={handleSelectWall}
            mode={mode}
            setMode={setMode}
          />
        </>
      ) : (
        /* RECRUITER QUICK MODE VIEW */
        <QuickMode mode={mode} setMode={setMode} />
      )}

      {/* Project Detail Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Certificate Viewer Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Physical Portfolio Book Dossier Overlay */}
      <BookOverlay
        isOpen={isBookOpen}
        onClose={() => setIsBookOpen(false)}
      />

      {/* Contact Station Modal */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-xl animate-modal"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-slate-700 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactSection />
          </div>
        </div>
      )}

      {/* Timeline Milestone Modal */}
      {activeTimeline && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-900/90 backdrop-blur-xl animate-modal"
          onClick={() => setActiveTimeline(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-dark-800 border border-purple-500/40 rounded-2xl shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-purple-400 font-display mb-2">{activeTimeline.title}</h3>
            <p className="text-xs font-mono text-slate-400 mb-4">{activeTimeline.year} • {activeTimeline.institution}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">{activeTimeline.description}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTimeline(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
