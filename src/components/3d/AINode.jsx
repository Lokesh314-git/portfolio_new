import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';

export default function AINode({ onClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      if (hovered) {
        groupRef.current.position.y = 1.4 + Math.sin(state.clock.getElapsedTime() * 3) * 0.04;
      } else {
        groupRef.current.position.y = 1.4;
      }
    }
  });

  return (
    <group
      position={[-2.8, 0, -1.5]}
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
      {/* Sleek Dark Pedestal Base */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 24]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Pedestal Top Glowing Cyan Ring */}
      <mesh position={[0, 0.81, 0]}>
        <ringGeometry args={[0.22, 0.28, 32]} />
        <meshBasicMaterial color={hovered ? '#00f0ff' : '#0ea5e9'} />
      </mesh>

      {/* Floating Holographic Neural Network Structure (Zone 4) */}
      <group ref={groupRef} position={[0, 1.4, 0]}>
        {/* Central Core Octahedron */}
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={hovered ? '#00f0ff' : '#38bdf8'}
            emissive={hovered ? '#00f0ff' : '#0284c7'}
            emissiveIntensity={hovered ? 0.9 : 0.4}
            wireframe
          />
        </mesh>

        {/* Inner Solid Glowing Node */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Outer Orbiting Neural Particles */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 0.55;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, (i % 2 === 0 ? 0.15 : -0.15), z]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#ff5500'} />
            </mesh>
          );
        })}

        {/* Holographic Label */}
        <Text
          position={[0, -0.55, 0]}
          fontSize={0.11}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          AI / ML
        </Text>
      </group>

      {/* Holographic Hover Tooltip */}
      {hovered && (
        <Html position={[0, 2.2, 0]} center pointerEvents="none">
          <div className="px-3 py-1.5 rounded-lg bg-dark-900/90 border border-cyan-400 text-cyan-300 font-mono text-xs shadow-neon-cyan whitespace-nowrap animate-bounce">
            AI / ML SPECIALIZATION
          </div>
        </Html>
      )}
    </group>
  );
}
