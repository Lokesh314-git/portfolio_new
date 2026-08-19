import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({ scrollProgress, mouse, isMobile }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 1.4, 3.8));
  const currentLook = useRef(new THREE.Vector3(0, 1.0, -1.0));

  // Cinematic 5-Zone Studio Camera Stations
  const stations = [
    // Station 0: Eye-Level Desk View (Initial Focal Position)
    { pos: [0, 1.4, isMobile ? 4.6 : 3.8], look: [0, 1.0, -1.0] },
    // Station 1: Zone 1 Laptop & Desktop Monitor Zoom
    { pos: [0, 1.1, 1.2], look: [0, 0.9, -0.3] },
    // Station 2: Zone 2 Project Wall Screens
    { pos: [4.5, 3.2, 0.2], look: [7.4, 3.5, 0.2] },
    // Station 3: Zone 3 Portfolio Book
    { pos: [-1.6, 0.8, 0.2], look: [-2.3, 0.0, -1.2] },
    // Station 4: Zone 4 AI/ML Neural Node Pedestal
    { pos: [-2.2, 1.6, 0.5], look: [-2.8, 1.4, -1.5] },
    // Station 5: Zone 5 Contact Device Station
    { pos: [1.4, 1.0, 1.2], look: [1.9, 0.5, 0.2] }
  ];

  useFrame(() => {
    // Interpolate station based on scrollProgress (0 to 1)
    const progress = Math.min(Math.max(scrollProgress, 0), 1);
    const totalSegments = stations.length - 1;
    const scaledProgress = progress * totalSegments;
    const index = Math.floor(scaledProgress);
    const fraction = scaledProgress - index;

    const currentStation = stations[Math.min(index, totalSegments)];
    const nextStation = stations[Math.min(index + 1, totalSegments)];

    // Target Camera Position with subtle mouse parallax (eye-level movement)
    const targetX = THREE.MathUtils.lerp(currentStation.pos[0], nextStation.pos[0], fraction) + (mouse ? mouse.x * 0.15 : 0);
    const targetY = THREE.MathUtils.lerp(currentStation.pos[1], nextStation.pos[1], fraction) + (mouse ? mouse.y * 0.15 : 0);
    const targetZ = THREE.MathUtils.lerp(currentStation.pos[2], nextStation.pos[2], fraction);

    // Target LookAt
    const lookX = THREE.MathUtils.lerp(currentStation.look[0], nextStation.look[0], fraction);
    const lookY = THREE.MathUtils.lerp(currentStation.look[1], nextStation.look[1], fraction);
    const lookZ = THREE.MathUtils.lerp(currentStation.look[2], nextStation.look[2], fraction);

    // Smooth lerp easing
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.05);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.05);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.05);

    currentLook.current.x = THREE.MathUtils.lerp(currentLook.current.x, lookX, 0.05);
    currentLook.current.y = THREE.MathUtils.lerp(currentLook.current.y, lookY, 0.05);
    currentLook.current.z = THREE.MathUtils.lerp(currentLook.current.z, lookZ, 0.05);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
