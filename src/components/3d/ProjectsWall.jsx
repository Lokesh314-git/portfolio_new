import React, { useState } from 'react';
import { Text, Html } from '@react-three/drei';
import { projectsData } from '../../data/projects';

export default function ProjectsWall({ onSelectProject }) {
  const screenPositions = [
    { pos: [-3.6, 4.8, -9.4], size: [2.6, 1.4] }, // Proj 01 - LoanBook AI
    { pos: [0.0, 4.8, -9.4], size: [2.6, 1.4] },  // Proj 02 - KungFu Academy
    { pos: [3.6, 4.8, -9.4], size: [2.6, 1.4] },  // Proj 03 - Real-Time Chat App
    { pos: [-3.6, 2.9, -9.4], size: [2.6, 1.4] }, // Proj 04 - CrackPlace-AI
    { pos: [0.0, 2.9, -9.4], size: [2.6, 1.4] },  // Proj 05 - WhatsApp Prank Automation
    { pos: [3.6, 2.9, -9.4], size: [2.6, 1.4] },  // Proj 06 - Expense Tracker Web App
    { pos: [-3.6, 1.0, -9.4], size: [2.6, 1.4] }, // Proj 07 - Simple Calculator
    { pos: [0.0, 1.0, -9.4], size: [2.6, 1.4] },  // Proj 08 - Python Calculator
    { pos: [3.6, 1.0, -9.4], size: [2.6, 1.4] }   // Proj 09 - Flento 30 Days English
  ];

  return (
    <group>
      {projectsData.map((project, idx) => {
        const layout = screenPositions[idx] || { pos: [0, 3, -9.4], size: [2.6, 1.5] };
        return (
          <ProjectScreenDisplay
            key={project.id}
            project={project}
            position={layout.pos}
            size={layout.size}
            onClick={onSelectProject}
          />
        );
      })}
    </group>
  );
}

function ProjectScreenDisplay({ project, position, size, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Soft Neumorphic elevation position on hover
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
        onClick(project);
      }}
    >
      {/* Soft Recessed Wall Plate Shadow */}
      <mesh position={[0, -0.06, -0.04]}>
        <boxGeometry args={[size[0] + 0.1, size[1] + 0.1, 0.04]} />
        <meshStandardMaterial color="#64748b" roughness={0.9} />
      </mesh>

      {/* Soft Neumorphic Raised Frame Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[size[0], size[1], 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#f1f5f9'}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle Inner Bevel Accent */}
      <mesh position={[0, 0, 0.042]}>
        <planeGeometry args={[size[0] - 0.08, size[1] - 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#06b6d4' : '#cbd5e1'}
          roughness={0.3}
        />
      </mesh>

      {/* Dark Screen Display Surface */}
      <mesh position={[0, 0, 0.048]}>
        <planeGeometry args={[size[0] - 0.16, size[1] - 0.16]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Project Number & Title */}
      <Text
        position={[0, 0.42, 0.055]}
        fontSize={0.095}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        {`PROJ ${project.number} • ${project.title}`}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 0.25, 0.055]}
        fontSize={0.065}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {project.subtitle}
      </Text>

      {/* Tech Tags */}
      <Text
        position={[0, -0.26, 0.055]}
        fontSize={0.055}
        color="#fb923c"
        anchorX="center"
        anchorY="middle"
      >
        {`[ ${project.technologies.join(' | ')} ]`}
      </Text>

      {/* Click Prompt */}
      <Text
        position={[0, -0.45, 0.055]}
        fontSize={0.05}
        color={hovered ? '#ffffff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
      >
        {hovered ? 'CLICK TO VIEW PROJECT SPECS' : 'VIEW PROJECT'}
      </Text>

      {/* Hover Tooltip */}
      {hovered && (
        <Html position={[0, 0.95, 0]} center pointerEvents="none">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-neu-flat whitespace-nowrap animate-bounce">
            Inspect {project.title}
          </div>
        </Html>
      )}
    </group>
  );
}
