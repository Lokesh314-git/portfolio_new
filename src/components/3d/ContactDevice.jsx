import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';

export default function ContactDevice({ onClick }) {
  const deviceRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (deviceRef.current) {
      if (hovered) {
        deviceRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 3) * 0.02;
      } else {
        deviceRef.current.position.y = 0.5;
      }
    }
  });

  return (
    <group
      ref={deviceRef}
      position={[1.9, 0.5, 0.2]}
      rotation={[0, -0.4, 0]}
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
        if (onClick) onClick();
      }}
    >
      {/* Device Metallic Base */}
      <mesh castShadow>
        <boxGeometry args={[0.45, 0.08, 0.35]} />
        <meshStandardMaterial
          color={hovered ? '#0284c7' : '#0f172a'}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Holographic Projection Panel Screen */}
      <mesh position={[0, 0.22, 0]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.42, 0.32]} />
        <meshStandardMaterial
          color="#090d16"
          emissive={hovered ? '#00f0ff' : '#0284c7'}
          emissiveIntensity={hovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Screen Text: COMMUNICATION ● ONLINE */}
      <Text
        position={[0, 0.3, 0.02]}
        rotation={[-0.2, 0, 0]}
        fontSize={0.032}
        color="#00f0ff"
        anchorX="center"
        anchorY="middle"
      >
        COMMUNICATION
      </Text>
      <Text
        position={[0, 0.22, 0.02]}
        rotation={[-0.2, 0, 0]}
        fontSize={0.028}
        color="#22c55e"
        anchorX="center"
        anchorY="middle"
      >
        ● ONLINE
      </Text>
      <Text
        position={[0, 0.14, 0.02]}
        rotation={[-0.2, 0, 0]}
        fontSize={0.025}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        [ CLICK TO CONTACT ]
      </Text>

      {/* Holographic Hover Tooltip */}
      {hovered && (
        <Html position={[0, 0.5, 0]} center pointerEvents="none">
          <div className="px-3 py-1.5 rounded-lg bg-dark-900/90 border border-cyan-400 text-cyan-300 font-mono text-xs shadow-neon-cyan whitespace-nowrap animate-bounce">
            CONTACT ME
          </div>
        </Html>
      )}
    </group>
  );
}
