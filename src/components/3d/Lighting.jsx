import React from 'react';

export default function Lighting() {
  return (
    <group>
      {/* Soft Warm-White Studio Ambient Fill */}
      <ambientLight intensity={0.75} color="#f8fafc" />

      {/* Main Studio Key Directional Light with Soft Shadow Mapping */}
      <directionalLight
        position={[-3, 9, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Soft Neutral Rim Light for Architectural Wall Depth */}
      <directionalLight
        position={[6, 7, -4]}
        intensity={0.7}
        color="#cbd5e1"
      />

      {/* Muted Cyan Accent Fill Light for Subtle Depth */}
      <directionalLight
        position={[-7, 5, -2]}
        intensity={0.5}
        color="#06b6d4"
      />

      {/* Desk Ambient Soft Point Lights */}
      <pointLight position={[0, 1.2, -0.2]} intensity={0.9} distance={3.0} color="#f8fafc" />
      <pointLight position={[1.4, 1.5, -0.2]} intensity={0.8} distance={2.5} color="#06b6d4" />
    </group>
  );
}
