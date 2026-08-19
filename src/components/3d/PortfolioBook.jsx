import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export default function PortfolioBook({ onClick }) {
  const bookGroupRef = useRef();
  const coverMeshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!bookGroupRef.current) return;
    
    // Smooth hover levitation & subtle tilt animation
    const targetY = hovered ? 0.12 : 0.08;
    const targetRotX = hovered ? -0.05 : 0;
    
    bookGroupRef.current.position.y = THREE.MathUtils.lerp(bookGroupRef.current.position.y, targetY + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.008, delta * 5);
    bookGroupRef.current.rotation.x = THREE.MathUtils.lerp(bookGroupRef.current.rotation.x, targetRotX, delta * 5);

    // Subtle cover lift when hovered to simulate opening
    if (coverMeshRef.current) {
      const targetCoverRotZ = hovered ? -0.15 : 0;
      coverMeshRef.current.rotation.z = THREE.MathUtils.lerp(coverMeshRef.current.rotation.z, targetCoverRotZ, delta * 6);
    }
  });

  return (
    <group
      ref={bookGroupRef}
      position={[-2.3, 0.08, -1.1]}
      rotation={[0, 0.35, 0]}
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
        onClick();
      }}
    >
      {/* 1. HARDCOVER BOTTOM/BACK BASE */}
      <mesh position={[0, -0.028, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.012, 0.78]} />
        <meshStandardMaterial
          color={hovered ? '#0e7490' : '#0f172a'}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* 2. ROUNDED LEATHER SPINE (LEFT SIDE BINDING) */}
      <mesh position={[-0.29, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.034, 0.034, 0.78, 16, 1, false, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial
          color={hovered ? '#0284c7' : '#1e293b'}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* SPINE METALLIC RIBS (Decorative leatherbound ridges) */}
      {[-0.25, -0.1, 0.05, 0.2].map((zPos, idx) => (
        <mesh key={idx} position={[-0.305, 0, zPos]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.012, 12, 1, false, Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* 3. STACKED PAPER PAGES (BLOCK WITH PAPER RIDGE TEXTURE) */}
      <group position={[0.01, 0, 0]}>
        {/* Main Paper Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.52, 0.048, 0.73]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.95} />
        </mesh>
        
        {/* Visible Page Lines (Simulated Stacked Sheets along front and sides) */}
        <mesh position={[0.261, 0, 0]}>
          <boxGeometry args={[0.002, 0.046, 0.72]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.366]}>
          <boxGeometry args={[0.51, 0.046, 0.002]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, -0.366]}>
          <boxGeometry args={[0.51, 0.046, 0.002]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
        </mesh>
      </group>

      {/* 4. SATIN RIBBON BOOKMARK (Extending out from the bottom edge onto desk) */}
      <group position={[0.05, -0.02, 0.38]}>
        <mesh rotation={[0.2, -0.1, -0.05]} castShadow>
          <boxGeometry args={[0.03, 0.003, 0.22]} />
          <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Metallic ribbon tip */}
        <mesh position={[0.01, -0.02, 0.12]} rotation={[0.2, -0.1, -0.05]}>
          <boxGeometry args={[0.032, 0.005, 0.02]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* 5. TOP HARDCOVER (Animated hinge lid on hover) */}
      <group position={[-0.29, 0.026, 0]}>
        <mesh ref={coverMeshRef} position={[0.29, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.012, 0.78]} />
          <meshStandardMaterial
            color={hovered ? '#0e7490' : '#0f172a'}
            roughness={0.35}
            metalness={0.3}
          />

          {/* EMBOSSED FOIL BORDER ON COVER */}
          <mesh position={[0, 0.007, 0]}>
            <boxGeometry args={[0.50, 0.001, 0.70]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.0075, 0]}>
            <boxGeometry args={[0.48, 0.001, 0.68]} />
            <meshStandardMaterial color={hovered ? '#38bdf8' : '#0f172a'} roughness={0.4} />
          </mesh>

          {/* CORNER BRASS/CYAN PROTECTORS */}
          {[
            [-0.23, -0.33],
            [0.23, -0.33],
            [-0.23, 0.33],
            [0.23, 0.33]
          ].map(([cx, cz], i) => (
            <mesh key={i} position={[cx, 0.008, cz]}>
              <boxGeometry args={[0.05, 0.003, 0.05]} />
              <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}

          {/* COVER EMBOSSED TYPOGRAPHY */}
          <Text
            position={[0, 0.009, -0.18]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.065}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            LOKESH A
          </Text>

          <Text
            position={[0, 0.009, -0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.04}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            OFFICIAL DOSSIER
          </Text>

          <Text
            position={[0, 0.009, 0.08]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.045}
            color="#06b6d4"
            anchorX="center"
            anchorY="middle"
          >
            PORTFOLIO 📖
          </Text>

          <Text
            position={[0, 0.009, 0.20]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.035}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            2026 EDITION
          </Text>
        </mesh>
      </group>

      {/* HOVER TOOLTIP */}
      {hovered && (
        <Html position={[0, 0.45, 0]} center pointerEvents="none">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-400 text-cyan-300 font-mono text-xs shadow-neu-glow whitespace-nowrap animate-bounce flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>OPEN DEVELOPER DOSSIER BOOK 📖</span>
          </div>
        </Html>
      )}
    </group>
  );
}
