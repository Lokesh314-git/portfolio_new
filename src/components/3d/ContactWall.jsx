import React, { useState } from 'react';
import { Text, Html } from '@react-three/drei';
import { personalData } from '../../data/personal';

export default function ContactWall({ onOpenContact }) {
  const [hovered, setHovered] = useState(false);

  const currentZ = hovered ? 0.14 : 0.06;

  return (
    // LEFT WALL (-X = -9.4), facing +X into room
    <group position={[-9.4, 3.5, 0]} rotation={[0, Math.PI / 2, 0]}>
      <group
        position={[0, 0, currentZ]}
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
          if (onOpenContact) onOpenContact();
        }}
      >
        {/* Wall Shadow */}
        <mesh position={[0, -0.06, -0.04]}>
          <boxGeometry args={[4.5, 2.9, 0.04]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>

        {/* Neumorphic Chassis Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.4, 2.8, 0.12]} />
          <meshStandardMaterial
            color={hovered ? '#ffffff' : '#f1f5f9'}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Bevel Border Accent */}
        <mesh position={[0, 0, 0.065]}>
          <planeGeometry args={[4.28, 2.68]} />
          <meshStandardMaterial color={hovered ? '#ff6b00' : '#cbd5e1'} roughness={0.3} />
        </mesh>

        {/* Display Surface */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[4.16, 2.56]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Console Header */}
        <Text
          position={[0, 0.9, 0.075]}
          fontSize={0.13}
          color="#ff6b00"
          anchorX="center"
          anchorY="middle"
        >
          COMMUNICATION CONSOLE
        </Text>

        <Text
          position={[0, 0.55, 0.075]}
          fontSize={0.08}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          ● SYSTEM ONLINE • CHENNAI, INDIA
        </Text>

        {/* Email */}
        <Text
          position={[0, 0.15, 0.075]}
          fontSize={0.078}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {`EMAIL: ${personalData.email}`}
        </Text>

        {/* Phone */}
        <Text
          position={[0, -0.2, 0.075]}
          fontSize={0.078}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {`PHONE: ${personalData.phone}`}
        </Text>

        {/* Click Prompt */}
        <Text
          position={[0, -0.7, 0.075]}
          fontSize={0.07}
          color={hovered ? '#ffffff' : '#fb923c'}
          anchorX="center"
          anchorY="middle"
        >
          {hovered ? 'CLICK TO OPEN CONTACT FORM' : 'CONNECT WITH LOKI'}
        </Text>

        {/* Hover Tooltip */}
        {hovered && (
          <Html position={[0, 1.65, 0]} center pointerEvents="none">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-orange-500/40 text-orange-300 font-mono text-xs shadow-neu-flat whitespace-nowrap animate-bounce">
              Connect with Loki
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}
