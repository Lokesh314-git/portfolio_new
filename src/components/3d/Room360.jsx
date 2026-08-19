import React from 'react';
import { Text } from '@react-three/drei';

export default function Room360() {
  // Hexagonal acoustic panel coordinates for front wall cluster
  const hexPanels = [
    { x: -7.2, y: 4.2, color: '#334155' },
    { x: -6.6, y: 4.8, color: '#0284c7' },
    { x: -6.6, y: 3.6, color: '#0f172a' },
    { x: -6.0, y: 4.2, color: '#9333ea' },
    { x: -5.4, y: 4.8, color: '#334155' },
    { x: 7.2, y: 4.2, color: '#0f172a' },
    { x: 6.6, y: 4.8, color: '#9333ea' },
    { x: 6.6, y: 3.6, color: '#0284c7' },
    { x: 6.0, y: 4.2, color: '#334155' },
  ];

  return (
    <group>
      {/* Continuous Matte Architectural Stone Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Subtle Floor Grid Lines */}
      <gridHelper args={[20, 20, '#475569', '#334155']} position={[0, -0.99, 0]} />

      {/* =====================================================================
          1. FRONT WALL (-Z = -9.5) - PROJECTS WALL & DECORATIONS
         ===================================================================== */}
      <mesh position={[0, 3.5, -9.5]} receiveShadow>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Front Wall Header Panel */}
      <group position={[0, 7.2, -9.42]}>
        <mesh position={[0, -0.04, -0.02]}>
          <boxGeometry args={[5.2, 0.95, 0.04]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.0, 0.85, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.38, 0.045]}>
          <boxGeometry args={[4.8, 0.04, 0.02]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>
        <Text position={[0, 0.05, 0.05]} fontSize={0.38} color="#0f172a" anchorX="center" anchorY="middle">
          PROJECTS
        </Text>
      </group>

      {/* Front Wall: Neon LED Sign "< CODE & CREATE />" */}
      <group position={[0, 5.8, -9.42]}>
        <mesh>
          <boxGeometry args={[4.2, 0.65, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[4.1, 0.58]} />
          <meshStandardMaterial color="#0284c7" emissive="#00f0ff" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.24} color="#ffffff" anchorX="center" anchorY="middle">
          &lt; CODE &amp; CREATE /&gt;
        </Text>
      </group>

      {/* Front Wall: Hexagonal Acoustic Panel Clusters */}
      {hexPanels.map((p, idx) => (
        <mesh key={idx} position={[p.x, p.y, -9.44]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.38, 0.38, 0.04, 6]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color={p.color} roughness={0.9} />
        </mesh>
      ))}

      {/* Front Wall: Left Floating Wall Shelf with Succulent Plant */}
      <group position={[-5.8, 1.8, -9.3]}>
        {/* Shelf Board */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.35]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        {/* Pot */}
        <mesh position={[-0.4, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 0.2, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        {/* Plant Leaves */}
        <mesh position={[-0.4, 0.32, 0]} castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
        {/* Mini Book Stack */}
        <mesh position={[0.3, 0.1, 0]} castShadow>
          <boxGeometry args={[0.35, 0.12, 0.25]} />
          <meshStandardMaterial color="#9333ea" roughness={0.5} />
        </mesh>
      </group>

      {/* Front Wall: Right Floating Wall Shelf with Dev Trophy */}
      <group position={[5.8, 1.8, -9.3]}>
        {/* Shelf Board */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.08, 0.35]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
        {/* Trophy Base */}
        <mesh position={[0.2, 0.1, 0]} castShadow>
          <boxGeometry args={[0.18, 0.1, 0.18]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Trophy Golden Orb */}
        <mesh position={[0.2, 0.28, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* =====================================================================
          2. RIGHT WALL (+X = +9.5) - CERTIFICATES WALL & DECORATIONS
         ===================================================================== */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[9.5, 3.5, 0]} receiveShadow>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Right Wall Header Panel */}
      <group position={[9.42, 7.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, -0.04, -0.02]}>
          <boxGeometry args={[5.4, 0.95, 0.04]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.85, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.38, 0.045]}>
          <boxGeometry args={[5.0, 0.04, 0.02]} />
          <meshBasicMaterial color="#0284c7" />
        </mesh>
        <Text position={[0, 0.05, 0.05]} fontSize={0.38} color="#0f172a" anchorX="center" anchorY="middle">
          CERTIFICATES
        </Text>
      </group>

      {/* Right Wall: Framed Developer Quote Poster (Left side) */}
      <group position={[9.42, 4.5, -5.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 2.8, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.0, 2.6]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <Text position={[0, 0.6, 0.032]} fontSize={0.18} color="#38bdf8" anchorX="center" anchorY="middle">
          DEV PHILOSOPHY
        </Text>
        <Text position={[0, 0.0, 0.032]} fontSize={0.12} color="#ffffff" anchorX="center" anchorY="middle">
          &quot;Talk is cheap.
        </Text>
        <Text position={[0, -0.3, 0.032]} fontSize={0.12} color="#f59e0b" anchorX="center" anchorY="middle">
          Show me the code.&quot;
        </Text>
        <Text position={[0, -0.8, 0.032]} fontSize={0.09} color="#94a3b8" anchorX="center" anchorY="middle">
          - Linus Torvalds
        </Text>
      </group>

      {/* Right Wall: Framed AI/ML Architecture Poster (Right side) */}
      <group position={[9.42, 4.5, 5.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 2.8, 0.05]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.0, 2.6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.8, 0.032]} fontSize={0.16} color="#c084fc" anchorX="center" anchorY="middle">
          NEURAL NETWORKS
        </Text>
        {/* Schematic Circuit Nodes */}
        <mesh position={[-0.4, 0.1, 0.03]}>
          <circleGeometry args={[0.14, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.4, 0.1, 0.03]}>
          <circleGeometry args={[0.14, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, -0.4, 0.03]}>
          <circleGeometry args={[0.16, 16]} />
          <meshBasicMaterial color="#c084fc" />
        </mesh>
      </group>

      {/* =====================================================================
          3. BACK WALL (+Z = +9.5) - TIMELINE WALL & DECORATIONS
         ===================================================================== */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 3.5, 9.5]} receiveShadow>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Back Wall Header Panel */}
      <group position={[0, 7.2, 9.42]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, -0.04, -0.02]}>
          <boxGeometry args={[5.0, 0.95, 0.04]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.85, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.38, 0.045]}>
          <boxGeometry args={[4.6, 0.04, 0.02]} />
          <meshBasicMaterial color="#9333ea" />
        </mesh>
        <Text position={[0, 0.05, 0.05]} fontSize={0.38} color="#0f172a" anchorX="center" anchorY="middle">
          TIMELINE
        </Text>
      </group>

      {/* Back Wall: Upper Architectural Ambient LED Beam */}
      <mesh position={[0, 6.4, 9.42]}>
        <boxGeometry args={[16, 0.06, 0.02]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* =====================================================================
          4. LEFT WALL (-X = -9.5) - CONTACT WALL & DECORATIONS
         ===================================================================== */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-9.5, 3.5, 0]} receiveShadow>
        <planeGeometry args={[20, 9]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Left Wall Header Panel */}
      <group position={[-9.42, 7.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, -0.04, -0.02]}>
          <boxGeometry args={[5.0, 0.95, 0.04]} />
          <meshStandardMaterial color="#64748b" roughness={0.8} />
        </mesh>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.85, 0.08]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.38, 0.045]}>
          <boxGeometry args={[4.6, 0.04, 0.02]} />
          <meshBasicMaterial color="#ea580c" />
        </mesh>
        <Text position={[0, 0.05, 0.05]} fontSize={0.38} color="#0f172a" anchorX="center" anchorY="middle">
          CONTACT
        </Text>
      </group>

      {/* Left Wall: Modern Sleek Studio Wall Clock */}
      <group position={[-9.42, 5.2, -5.2]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.06, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.032]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.68, 0.73, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Hour & Minute Hands */}
        <mesh position={[0.15, 0.15, 0.038]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.04, 0.35, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.1, 0.22, 0.038]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.03, 0.48, 0.01]} />
          <meshBasicMaterial color="#fb923c" />
        </mesh>
      </group>

      {/* Left Wall: Developer Wooden Pegboard with Headphones & Sticky Notes */}
      <group position={[-9.42, 4.0, 5.0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Main Wooden Board */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 3.2, 0.06]} />
          <meshStandardMaterial color="#f1d3b0" roughness={0.6} />
        </mesh>
        {/* Hanging Studio Headphones */}
        <group position={[-0.4, 0.6, 0.08]}>
          <mesh castShadow>
            <torusGeometry args={[0.22, 0.03, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} />
          </mesh>
          <mesh position={[-0.22, -0.05, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </mesh>
          <mesh position={[0.22, -0.05, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.4} />
          </mesh>
        </group>
        {/* Colorful Sticky Notes */}
        <mesh position={[0.5, 0.8, 0.035]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#facc15" />
        </mesh>
        <mesh position={[0.5, 0.3, 0.035]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#f43f5e" />
        </mesh>
        <mesh position={[-0.4, -0.4, 0.035]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* Continuous Ceiling with Recessed Panels */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
    </group>
  );
}
