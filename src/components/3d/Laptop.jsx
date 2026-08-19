import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';

export default function Laptop({ onClick }) {
  const laptopRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (laptopRef.current) {
      if (hovered) {
        laptopRef.current.position.y = 0.47 + Math.sin(state.clock.getElapsedTime() * 3) * 0.015;
      } else {
        laptopRef.current.position.y = 0.46;
      }
    }
  });

  return (
    <group
      ref={laptopRef}
      position={[0, 0.46, 0.1]}
      rotation={[0, 0, 0]}
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
      {/* Laptop Base Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.6]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#e2e8f0'}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Keyboard Recess */}
      <mesh position={[0, 0.012, -0.05]}>
        <boxGeometry args={[0.78, 0.005, 0.32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.012, 0.18]}>
        <boxGeometry args={[0.26, 0.002, 0.16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Screen Hinge & Lid Panel */}
      <group position={[0, 0.01, -0.28]} rotation={[-1.25, 0, 0]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.015]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0.3, 0.009]}>
          <planeGeometry args={[0.84, 0.54]} />
          <meshBasicMaterial color="#090d16" />
        </mesh>

        <mesh position={[0, 0.3, 0.01]}>
          <planeGeometry args={[0.82, 0.52]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#06b6d4"
            emissiveIntensity={hovered ? 0.7 : 0.3}
          />
        </mesh>

        {/* Screen Text: LOKI / WEB DEVELOPER / AI/ML STUDENT */}
        <Text
          position={[0, 0.45, 0.012]}
          fontSize={0.065}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          LOKI
        </Text>
        <Text
          position={[0, 0.36, 0.012]}
          fontSize={0.038}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          WEB DEVELOPER
        </Text>
        <Text
          position={[0, 0.30, 0.012]}
          fontSize={0.032}
          color="#fb923c"
          anchorX="center"
          anchorY="middle"
        >
          AI / ML STUDENT
        </Text>
        <Text
          position={[0, 0.22, 0.012]}
          fontSize={0.024}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          BUILDING DIGITAL EXPERIENCES
        </Text>
        <Text
          position={[0, 0.12, 0.012]}
          fontSize={0.03}
          color={hovered ? '#ffffff' : '#38bdf8'}
          anchorX="center"
          anchorY="middle"
        >
          [ EXPLORE ]
        </Text>
      </group>

      {/* Hover Tooltip */}
      {hovered && (
        <Html position={[0, 0.8, 0]} center pointerEvents="none">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-mono text-xs shadow-neu-flat whitespace-nowrap animate-bounce">
            ENTER MY WORKSPACE
          </div>
        </Html>
      )}
    </group>
  );
}
