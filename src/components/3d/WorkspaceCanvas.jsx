import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import Lighting from './Lighting';
import Room360 from './Room360';
import ProjectsWall from './ProjectsWall';
import CertificatesWall from './CertificatesWall';
import TimelineWall from './TimelineWall';
import ContactWall from './ContactWall';
import DeskCenter from './DeskCenter';
import CameraController360 from './CameraController360';

export default function WorkspaceCanvas({
  targetYaw,
  isMobile,
  pixelRatio,
  onSelectProject,
  onSelectCertificate,
  onSelectTimeline,
  onOpenBook,
  onOpenContact,
  onOpenIdentity
}) {
  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-dark-900 pointer-events-auto">
      <Canvas
        shadows={!isMobile}
        dpr={pixelRatio}
        camera={{ position: [0, 1.4, 0.1], fov: isMobile ? 65 : 55 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
      >
        <Suspense fallback={null}>
          <Lighting />

          {/* 360° Four-Wall Room Architecture */}
          <Room360 />

          {/* Center Workspace Desk Setup */}
          <DeskCenter
            onOpenBook={onOpenBook}
            onOpenIdentity={onOpenIdentity}
          />

          {/* Front Wall (0°): Projects Wall */}
          <ProjectsWall onSelectProject={onSelectProject} />

          {/* Right Wall (90°): Certificates Wall */}
          <CertificatesWall onSelectCertificate={onSelectCertificate} />

          {/* Back Wall (180°): Timeline Wall */}
          <TimelineWall onSelectTimeline={onSelectTimeline} />

          {/* Left Wall (270°): Contact Wall */}
          <ContactWall onOpenContact={onOpenContact} />

          {/* Ground Contact Shadows */}
          <ContactShadows
            position={[0, -0.98, 0]}
            opacity={0.65}
            scale={20}
            blur={1.8}
            far={5}
            color="#000000"
          />

          {/* 360° Camera Controller */}
          <CameraController360 targetYaw={targetYaw} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
