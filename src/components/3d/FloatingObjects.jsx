import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

export default function FloatingObjects() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  const skillsBadges = [
    { label: "PYTHON", pos: [-4.2, 3.8, -3.5], color: "#38bdf8" },
    { label: "AI/ML", pos: [4.2, 4.0, -3.5], color: "#ff6b00" },
    { label: "REACT", pos: [-5.0, 1.8, -2.5], color: "#00f0ff" },
    { label: "JAVA", pos: [5.0, 2.0, -2.5], color: "#a855f7" },
    { label: "AUTOMATION", pos: [0.0, 5.0, -4.5], color: "#22c55e" }
  ];

  return (
    <group ref={groupRef}>
      {skillsBadges.map((badge, idx) => (
        <Float key={idx} speed={2} rotationIntensity={0.5} floatIntensity={1} position={badge.pos}>
          <mesh>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color={badge.color} wireframe />
          </mesh>
          <Text
            position={[0, 0.45, 0]}
            fontSize={0.16}
            color={badge.color}
            anchorX="center"
            anchorY="middle"
          >
            {badge.label}
          </Text>
        </Float>
      ))}

      {Array.from({ length: 18 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 16;
        const y = Math.random() * 6 + 0.5;
        const z = (Math.random() - 0.5) * 10 - 2;
        const scale = Math.random() * 0.06 + 0.02;
        const color = i % 2 === 0 ? "#00f0ff" : "#ff6b00";

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[scale, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
