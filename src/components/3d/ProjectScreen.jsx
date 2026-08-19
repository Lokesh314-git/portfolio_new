import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';

export default function ProjectScreen({ project, position, rotation, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Subtle 3D floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 1.5 + position[2]) * 0.04;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation || [0, 0, 0]}
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
        onClick(project);
      }}
    >
      {/* Wall Shadow Mesh */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.5, 1.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>

      {/* Outer Monitor Frame Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.4, 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#0284c7' : '#0f172a'}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Frame Glowing Accent Border */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.32, 1.32]} />
        <meshStandardMaterial
          color={hovered ? '#00f0ff' : '#0ea5e9'}
          emissive={hovered ? '#00f0ff' : '#0284c7'}
          emissiveIntensity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Screen Display Face */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.24, 1.24]} />
        <meshBasicMaterial color="#090d16" />
      </mesh>

      {/* Project Header Number & Title */}
      <Text
        position={[0, 0.42, 0.055]}
        fontSize={0.09}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
      >
        {`PROJ ${project.number} • ${project.title}`}
      </Text>

      {/* Project Subtitle */}
      <Text
        position={[0, 0.26, 0.055]}
        fontSize={0.065}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {project.subtitle}
      </Text>

      {/* Tech Stack Badges */}
      <Text
        position={[0, -0.28, 0.055]}
        fontSize={0.055}
        color="#ff6b00"
        anchorX="center"
        anchorY="middle"
      >
        {`[ ${project.technologies.join(' | ')} ]`}
      </Text>

      {/* Click Invitation */}
      <Text
        position={[0, -0.44, 0.055]}
        fontSize={0.05}
        color={hovered ? '#ffffff' : '#38bdf8'}
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? 'CLICK TO OPEN FULL SPECS' : 'INSPECT SCREEN'}
      </Text>

      {/* Floating 3D Tooltip */}
      {hovered && (
        <Html position={[0, 0.85, 0]} center pointerEvents="none">
          <div className="px-3 py-1.5 rounded-lg bg-dark-900/90 border border-cyan-400 text-cyan-300 font-mono text-xs shadow-neon-cyan whitespace-nowrap animate-bounce">
            Inspect {project.title}
          </div>
        </Html>
      )}
    </group>
  );
}
