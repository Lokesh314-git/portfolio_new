import React, { useState } from 'react';
import { Text, Html } from '@react-three/drei';
import { experienceData } from '../../data/experience';

export default function TimelineWall({ onSelectTimeline }) {
  return (
    // BACK WALL (+Z = +9.4), facing -Z into room
    <group position={[0, 0, 9.4]} rotation={[0, Math.PI, 0]}>
      {/* Recessed Vertical Architectural Channel */}
      <mesh position={[0, 3.25, -0.02]}>
        <boxGeometry args={[0.26, 5.8, 0.04]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Main Vertical Purple Accent Beam */}
      <mesh position={[0, 3.25, 0.01]}>
        <boxGeometry args={[0.08, 5.6, 0.02]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* STAGGERED ALTERNATING TIMELINE MILESTONES */}
      {experienceData.map((item, idx) => {
        // Individual vertical Y position for each milestone (staggered zig-zag layout)
        const yPos = 5.65 - idx * 0.53;
        const isLeft = idx % 2 === 0;
        const xPos = isLeft ? -2.7 : 2.7;
        const cardRotY = isLeft ? 0.08 : -0.08;

        return (
          <TimelineMilestoneDisplay
            key={idx}
            item={item}
            position={[xPos, yPos, 0.04]}
            nodePosition={[0, yPos, 0.04]}
            cardRotation={[0, cardRotY, 0]}
            isLeft={isLeft}
            onClick={onSelectTimeline}
          />
        );
      })}
    </group>
  );
}

function TimelineMilestoneDisplay({ item, position, nodePosition, cardRotation, isLeft, onClick }) {
  const [hovered, setHovered] = useState(false);

  const currentZ = hovered ? position[2] + 0.16 : position[2];

  return (
    <group>
      {/* 1. Individual Central Year Marker Node */}
      <mesh position={nodePosition} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.07, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial
          color={hovered ? '#e879f9' : '#9333ea'}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Node Glowing Core */}
      <mesh position={[nodePosition[0], nodePosition[1], nodePosition[2] + 0.04]}>
        <circleGeometry args={[0.08, 24]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : '#c084fc'} />
      </mesh>

      {/* Year Label next to central node */}
      <Text
        position={[isLeft ? 0.35 : -0.35, nodePosition[1], nodePosition[2] + 0.05]}
        fontSize={0.065}
        color="#c084fc"
        anchorX={isLeft ? 'left' : 'right'}
        anchorY="middle"
      >
        {item.year.split(' ')[0]}
      </Text>

      {/* 2. Connecting Horizontal Structural Arm */}
      <mesh position={[(position[0] + nodePosition[0]) / 2, position[1], position[2] - 0.01]}>
        <boxGeometry args={[Math.abs(position[0]) - 0.2, 0.035, 0.02]} />
        <meshStandardMaterial color={hovered ? '#c084fc' : '#64748b'} roughness={0.4} />
      </mesh>

      {/* 3. Angled Milestone Card */}
      <group
        position={[position[0], position[1], currentZ]}
        rotation={cardRotation}
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
          onClick(item);
        }}
      >
        {/* Wall Recessed Shadow */}
        <mesh position={[0, -0.04, -0.04]}>
          <boxGeometry args={[2.75, 0.88, 0.04]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>

        {/* Chassis Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.68, 0.82, 0.08]} />
          <meshStandardMaterial
            color={hovered ? '#ffffff' : '#f8fafc'}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Bevel Border Accent */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[2.60, 0.74]} />
          <meshStandardMaterial color={hovered ? '#c084fc' : '#cbd5e1'} roughness={0.3} />
        </mesh>

        {/* Display Dark Surface */}
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[2.52, 0.66]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Year & Badge Header */}
        <Text
          position={[0, 0.18, 0.055]}
          fontSize={0.062}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
        >
          {`${item.year} • ${item.badge}`}
        </Text>

        {/* Milestone Title */}
        <Text
          position={[0, 0.02, 0.055]}
          fontSize={0.072}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {item.title}
        </Text>

        {/* Institution / Location */}
        <Text
          position={[0, -0.16, 0.055]}
          fontSize={0.048}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {item.institution}
        </Text>

        {/* Hover Tooltip */}
        {hovered && (
          <Html position={[0, 0.6, 0]} center pointerEvents="none">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-purple-400 text-purple-300 font-mono text-xs shadow-neu-glow whitespace-nowrap animate-bounce backdrop-blur-md">
              Inspect {item.title}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
