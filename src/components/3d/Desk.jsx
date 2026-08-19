import React from 'react';
import { Text } from '@react-three/drei';

export default function Desk() {
  // Keycap Rows for realistic mechanical keyboard layout
  const keyRows = [
    { count: 14, y: 0.12, width: 0.05 },
    { count: 14, y: 0.06, width: 0.05 },
    { count: 13, y: 0.00, width: 0.055 },
    { count: 12, y: -0.06, width: 0.06 },
    { count: 11, y: -0.12, width: 0.065 }
  ];

  return (
    <group position={[-1.2, -0.4, -1.8]}>
      {/* 1. REALISTIC MINIMAL WORKSTATION DESK TABLETOP */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.12, 2.2]} />
        <meshStandardMaterial
          color="#273244"
          roughness={0.35}
          metalness={0.08}
        />
      </mesh>

      {/* Front Edge Soft Neutral Aluminum Bevel Strip */}
      <mesh position={[0, 0.45, 1.09]}>
        <boxGeometry args={[4.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Cable Pass-Through Grommet */}
      <group position={[1.2, 0.46, -0.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
          <meshBasicMaterial color="#090d16" />
        </mesh>
      </group>

      {/* Under-Desk Cable Management Tray */}
      <mesh position={[0, 0.28, -0.7]} castShadow>
        <boxGeometry args={[3.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* 2. OVERSIZED NEUTRAL DESK MAT */}
      <group position={[-0.2, 0.465, 0.1]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.5, 0.008, 1.1]} />
          <meshStandardMaterial color="#0f172a" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.002, 0]}>
          <boxGeometry args={[2.52, 0.002, 1.12]} />
          <meshBasicMaterial color="#06b6d4" opacity={0.6} transparent />
        </mesh>
      </group>

      {/* 3. MECHANICAL KEYBOARD */}
      <group position={[-0.4, 0.48, 0.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.03, 0.34]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.016, 0]}>
          <boxGeometry args={[0.91, 0.005, 0.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
        <group position={[-0.41, 0.025, -0.12]}>
          {keyRows.map((row, rIdx) => (
            <group key={rIdx} position={[0, 0, row.y]}>
              {Array.from({ length: row.count }).map((_, cIdx) => (
                <mesh
                  key={cIdx}
                  position={[(cIdx - row.count / 2) * 0.063 + 0.03, 0, 0]}
                  castShadow
                >
                  <boxGeometry args={[row.width, 0.018, 0.048]} />
                  <meshStandardMaterial
                    color={rIdx === 0 ? '#334155' : cIdx === 0 || cIdx === row.count - 1 ? '#0284c7' : '#0f172a'}
                    roughness={0.6}
                  />
                </mesh>
              ))}
            </group>
          ))}
          <group position={[0, 0, -0.18]}>
            <mesh position={[-0.32, 0, 0]} castShadow>
              <boxGeometry args={[0.07, 0.018, 0.048]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.38, 0.018, 0.048]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.5} />
            </mesh>
            <mesh position={[0.32, 0, 0]} castShadow>
              <boxGeometry args={[0.07, 0.018, 0.048]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>
          </group>
        </group>
      </group>

      {/* 4. LOGITECH MX MASTER STYLE PRODUCTIVITY WIRELESS MOUSE */}
      <group position={[0.55, 0.48, 0.2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.15, 0.045, 0.24]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[-0.035, 0.024, -0.06]}>
          <boxGeometry args={[0.065, 0.005, 0.09]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.035, 0.024, -0.06]}>
          <boxGeometry args={[0.065, 0.005, 0.09]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.026, -0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.018, 16]} />
          <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* 5. CERAMIC COFFEE MUG */}
      <group position={[-1.6, 0.52, 0.4]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.1, 0.09, 0.22, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
        <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.02, 12, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} />
        </mesh>
      </group>

      {/* 6. LEFT DRAWERS CABINET */}
      <group position={[-1.5, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.1, 1.1, 2.0]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.3, 1.01]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.0, 1.01]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.3, 1.01]} castShadow>
          <boxGeometry args={[0.45, 0.04, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>
      </group>

      {/* 7. RIGHT MOTORIZED DESK ALUMINUM LEGS */}
      <group position={[1.8, -0.2, 0]}>
        <mesh position={[0, 0, 0.8]} castShadow>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0, -0.8]} castShadow>
          <boxGeometry args={[0.1, 1.1, 0.1]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.52, 0]} castShadow>
          <boxGeometry args={[0.16, 0.08, 1.8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
      </group>

      {/* 8. PROFESSIONAL MINIMAL DEVELOPER PC TOWER (NO RGB) */}
      <group position={[1.4, 0.96, -0.2]}>
        {/* Matte Slate Chassis Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.55, 1.0, 0.95]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.6} />
        </mesh>
        {/* Front Anodized Ventilation Panel */}
        <mesh position={[-0.28, 0, 0]}>
          <planeGeometry args={[0.92, 0.96]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.4} />
        </mesh>
        {/* Power Button */}
        <mesh position={[-0.285, 0.4, 0.35]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* USB-C Ports */}
        <mesh position={[-0.285, 0.35, 0.35]}>
          <boxGeometry args={[0.005, 0.012, 0.025]} />
          <meshStandardMaterial color="#090d16" />
        </mesh>
        <mesh position={[-0.285, 0.3, 0.35]}>
          <boxGeometry args={[0.005, 0.012, 0.025]} />
          <meshStandardMaterial color="#090d16" />
        </mesh>
      </group>

      {/* 9. REALISTIC PRODUCTIVITY MONITOR & STAND */}
      <group position={[-0.2, 0.98, -0.3]}>
        {/* Monitor Frame Chassis */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.82, 0.96, 0.06]} />
          <meshStandardMaterial color="#1e293b" roughness={0.25} metalness={0.7} />
        </mesh>

        {/* Thin Bezel Frame */}
        <mesh position={[0, 0, 0.031]}>
          <planeGeometry args={[1.78, 0.92]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} />
        </mesh>

        {/* Display Glass Panel */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.74, 0.88]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>

        {/* Screen Default Text Layout */}
        <Text
          position={[0, 0.28, 0.035]}
          fontSize={0.08}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          LOKI.DEV
        </Text>
        <Text
          position={[0, 0.14, 0.035]}
          fontSize={0.046}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          WEB DEVELOPER
        </Text>
        <Text
          position={[0, 0.06, 0.035]}
          fontSize={0.042}
          color="#fb923c"
          anchorX="center"
          anchorY="middle"
        >
          AI / ML STUDENT
        </Text>
        <Text
          position={[0, -0.06, 0.035]}
          fontSize={0.034}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          BUILDING DIGITAL EXPERIENCES
        </Text>

        {/* Monitor Stand Neck */}
        <mesh position={[0, -0.52, -0.1]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>

        {/* Monitor Stand Base Resting on Desk Surface */}
        <mesh position={[0, -0.62, 0.05]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.04, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
      </group>

      {/* 10. HERMAN MILLER STYLE ERGONOMIC OFFICE CHAIR */}
      <group position={[-1.4, -0.2, 1.8]} rotation={[0, 0.5, 0]}>
        {/* Padded Seat Cushion */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.12, 0.9]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* Contoured Mesh Backrest */}
        <mesh position={[0, 1.15, -0.4]} castShadow>
          <boxGeometry args={[0.84, 1.4, 0.08]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {/* Lumbar Support Pillow */}
        <mesh position={[0, 0.85, -0.34]}>
          <boxGeometry args={[0.6, 0.24, 0.06]} />
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </mesh>
        {/* Headrest */}
        <mesh position={[0, 1.6, -0.32]} castShadow>
          <boxGeometry args={[0.42, 0.22, 0.06]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>
        {/* 3D Adjustable Armrests */}
        <mesh position={[-0.46, 0.75, 0]} castShadow>
          <boxGeometry args={[0.1, 0.35, 0.55]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[0.46, 0.75, 0]} castShadow>
          <boxGeometry args={[0.1, 0.35, 0.55]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Central Gas-Lift Column */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* 5-Wheel Star Caster Base */}
        <group position={[0, -0.02, 0]}>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2;
            const x = Math.cos(angle) * 0.42;
            const z = Math.sin(angle) * 0.42;
            return (
              <mesh key={i} position={[x / 2, 0, z / 2]} rotation={[0, -angle, 0]} castShadow>
                <boxGeometry args={[0.06, 0.04, 0.42]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}
