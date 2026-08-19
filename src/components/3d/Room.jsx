import React from 'react';
import { Text } from '@react-three/drei';

export default function Room() {
  return (
    <group>
      {/* Floor - Black Tiled Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#121620" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Floor Tile Grid Lines */}
      <gridHelper args={[16, 16, '#00f0ff', '#1e293b']} position={[0, -0.99, 0]} />

      {/* Back Wall - Charcoal Black */}
      <mesh position={[0, 3.5, -6]} receiveShadow>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="#111722" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Back Wall: Floating Wall Shelves with Indoor Plant */}
      <group position={[-4.5, 4.8, -5.92]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.08, 0.35]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        {/* White Ceramic Pot */}
        <mesh position={[-0.6, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.1, 0.22, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        {/* Lush Green Plant Leaves */}
        <mesh position={[-0.6, 0.34, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
        {/* Stack of Tech Books */}
        <mesh position={[0.4, 0.1, 0]} castShadow>
          <boxGeometry args={[0.4, 0.14, 0.28]} />
          <meshStandardMaterial color="#0284c7" roughness={0.5} />
        </mesh>
      </group>

      {/* Left Wall - Pure Charcoal Black with Orange Circuit Lines */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-7.5, 3.5, 0]} receiveShadow>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="#111722" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Branching Orange Circuit Lines on Left Wall */}
      <group position={[-7.45, 3.5, -1]}>
        {/* Horizontal main trunk */}
        <mesh position={[0, 0.8, -2.5]}>
          <boxGeometry args={[0.04, 0.08, 4.5]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, 0.0, -0.5]}>
          <boxGeometry args={[0.04, 0.08, 7.0]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, -0.8, -1.8]}>
          <boxGeometry args={[0.04, 0.08, 5.5]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, -1.6, 1.0]}>
          <boxGeometry args={[0.04, 0.08, 4.5]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>

        {/* Diagonal Branches */}
        <mesh position={[0, 0.4, -4.5]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.8]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, -0.4, -1.0]} rotation={[-0.6, 0, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.8]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, -1.2, -0.2]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.04, 0.08, 0.8]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
      </group>

      {/* Far Left Wall Section - White Wall with Wall Clock & Pegboard */}
      <group position={[-7.5, 3.5, 4.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[6, 9]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
        </mesh>
        {/* Round Wall Clock */}
        <mesh position={[-1.8, 2.5, 0.05]}>
          <circleGeometry args={[0.65, 32]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[-1.8, 2.5, 0.06]}>
          <ringGeometry args={[0.6, 0.64, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>

      {/* Right Wall - Pure White Studio Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[7.5, 3.5, 0]} receiveShadow>
        <planeGeometry args={[16, 9]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* "MY WORKS" Header Badge on Right Wall */}
      <group position={[7.45, 6.8, 2.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Dark Frame */}
        <mesh>
          <boxGeometry args={[4.2, 0.85, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Cyan Inner Face */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[4.0, 0.75]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        {/* Orange Corner Accents */}
        <mesh position={[-1.9, 0, 0.035]}>
          <boxGeometry args={[0.15, 0.75, 0.02]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[1.9, 0, 0.035]}>
          <boxGeometry args={[0.15, 0.75, 0.02]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <Text
          position={[0, 0, 0.04]}
          fontSize={0.44}
          color="#090d16"
          anchorX="center"
          anchorY="middle"
        >
          MY WORKS
        </Text>
      </group>

      {/* Right Wall: Framed Developer Quote Poster */}
      <group position={[7.45, 4.2, -2.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 2.4, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[1.6, 2.2]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <Text position={[0, 0.5, 0.032]} fontSize={0.14} color="#38bdf8" anchorX="center" anchorY="middle">
          DEV PHILOSOPHY
        </Text>
        <Text position={[0, 0.0, 0.032]} fontSize={0.10} color="#ffffff" anchorX="center" anchorY="middle">
          &quot;Talk is cheap.
        </Text>
        <Text position={[0, -0.25, 0.032]} fontSize={0.10} color="#f59e0b" anchorX="center" anchorY="middle">
          Show me the code.&quot;
        </Text>
      </group>

      {/* Ceiling - Dark Recessed Ceiling with Cyan LED Strips */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#090d16" roughness={0.8} />
      </mesh>
      {/* Recessed Ceiling Center Tray */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 7.9, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#111722" roughness={0.6} />
      </mesh>
      {/* Cyan LED Ceiling Light Strips */}
      <mesh position={[-2.5, 7.85, 0]}>
        <boxGeometry args={[0.15, 0.04, 8]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, 7.85, 0]}>
        <boxGeometry args={[0.15, 0.04, 9]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[2.5, 7.85, 0]}>
        <boxGeometry args={[0.15, 0.04, 8]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      {/* Outer Cyan Perimeter Border */}
      <mesh position={[0, 7.95, -5.9]}>
        <boxGeometry args={[15.8, 0.05, 0.05]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh position={[0, 7.95, 5.9]}>
        <boxGeometry args={[15.8, 0.05, 0.05]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Back Wall AC Unit */}
      <group position={[-1.2, 5.8, -5.9]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.55, 0.35]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.18, 0.18]}>
          <boxGeometry args={[2.0, 0.03, 0.02]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
      </group>

      {/* Back Wall Posters (Batman, Spider-Man, Anime / Movie Posters) */}
      <group position={[1.2, 3.8, -5.92]}>
        <mesh position={[-0.8, 0.4, 0]}>
          <planeGeometry args={[0.6, 0.9]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <planeGeometry args={[0.6, 0.9]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0.8, 0.4, 0]}>
          <planeGeometry args={[0.6, 0.9]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
      </group>

      {/* Back Wall Whiteboard with Sticky Notes */}
      <group position={[2.6, 1.6, -5.9]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 1.6, 0.06]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[1.9, 1.7, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
        <mesh position={[-0.8, -1.2, 0]}>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[0.8, -1.2, 0]}>
          <boxGeometry args={[0.06, 1.0, 0.06]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        <mesh position={[-0.5, 0.4, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
        <mesh position={[-0.2, 0.4, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
        <mesh position={[0.2, 0.3, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.5, 0.4, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#4ade80" />
        </mesh>
        <mesh position={[-0.4, -0.2, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#fb923c" />
        </mesh>
        <mesh position={[0.1, -0.3, 0.035]}>
          <planeGeometry args={[0.24, 0.24]} />
          <meshBasicMaterial color="#e879f9" />
        </mesh>
      </group>

      {/* Back Wall Corner Display Shelf */}
      <group position={[3.6, 3.2, -5.8]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 2.4, 0.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.8, 0.16]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, 0.0, 0.16]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshBasicMaterial color="#ff5500" />
        </mesh>
        <mesh position={[0, -0.8, 0.16]}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
      </group>
    </group>
  );
}
