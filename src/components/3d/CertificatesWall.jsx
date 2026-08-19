import React, { useState } from 'react';
import { Text, Html } from '@react-three/drei';
import { certificatesData } from '../../data/certificates';

export default function CertificatesWall({ onSelectCertificate }) {
  const certLayouts = [
    { pos: [-2.4, 4.8, 0.04] }, // Cert 01
    { pos: [2.4, 4.8, 0.04] },  // Cert 02
    { pos: [-2.4, 2.2, 0.04] }, // Cert 03
    { pos: [2.4, 2.2, 0.04] }   // Cert 04
  ];

  return (
    // RIGHT WALL (+X = +9.4), facing -X into room
    <group position={[9.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {certificatesData.map((cert, idx) => {
        const layout = certLayouts[idx] || { pos: [0, 3, 0.04] };
        return (
          <CertificateFrameDisplay
            key={cert.id}
            certificate={cert}
            position={layout.pos}
            onClick={onSelectCertificate}
          />
        );
      })}
    </group>
  );
}

function CertificateFrameDisplay({ certificate, position, onClick }) {
  const [hovered, setHovered] = useState(false);

  const currentZ = hovered ? position[2] + 0.12 : position[2];

  return (
    <group
      position={[position[0], position[1], currentZ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(certificate);
      }}
    >
      {/* Wall Shadow */}
      <mesh position={[0, -0.05, -0.04]}>
        <boxGeometry args={[2.5, 1.7, 0.04]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>

      {/* Neumorphic Raised Frame Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.6, 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#f1f5f9'}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Bevel Border */}
      <mesh position={[0, 0, 0.042]}>
        <planeGeometry args={[2.32, 1.52]} />
        <meshStandardMaterial color={hovered ? '#0284c7' : '#cbd5e1'} roughness={0.3} />
      </mesh>

      {/* Display Face */}
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[2.24, 1.44]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Issuer & Year */}
      <Text
        position={[0, 0.45, 0.055]}
        fontSize={0.065}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        {`${certificate.issuer} • ${certificate.year}`}
      </Text>

      {/* Title */}
      <Text
        position={[0, 0.22, 0.055]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {certificate.title}
      </Text>

      {/* Click Prompt */}
      <Text
        position={[0, -0.42, 0.055]}
        fontSize={0.05}
        color={hovered ? '#ffffff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? 'CLICK TO VIEW HIGH-RES' : 'INSPECT CERTIFICATE'}
      </Text>

      {/* Hover Tooltip */}
      {hovered && (
        <Html position={[0, 0.95, 0]} center pointerEvents="none">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-sky-500/40 text-sky-300 font-mono text-xs shadow-neu-flat whitespace-nowrap animate-bounce">
            Inspect {certificate.title}
          </div>
        </Html>
      )}
    </group>
  );
}
