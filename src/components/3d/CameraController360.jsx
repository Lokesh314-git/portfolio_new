import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController360({ targetYaw = 0, isMobile }) {
  const { camera, gl } = useThree();

  // Current and target camera rotation angles (in radians)
  const currentYaw = useRef(0);      // Horizontal angle around Y axis
  const targetYawRad = useRef(0);
  const currentPitch = useRef(0);    // Vertical angle (-PI/3 to +PI/3)
  const targetPitch = useRef(0);

  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });

  // Sync external targetYaw prop (in degrees: 0, 90, 180, 270) to targetYawRad
  useEffect(() => {
    let rad = (targetYaw * Math.PI) / 180;
    // Find shortest rotation path
    let diff = (rad - (currentYaw.current % (Math.PI * 2)));
    // Normalize diff to [-PI, PI]
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    targetYawRad.current = currentYaw.current + diff;
  }, [targetYaw]);

  // Handle Desktop Pointer & Mobile Touch Dragging for 360° Rotation
  useEffect(() => {
    const domElement = gl.domElement;

    const handlePointerDown = (e) => {
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;

      const sensitivity = isMobile ? 0.005 : 0.003;
      targetYawRad.current -= deltaX * sensitivity;
      targetPitch.current = Math.min(
        Math.max(targetPitch.current - deltaY * sensitivity, -Math.PI / 3),
        Math.PI / 3
      );

      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl, isMobile]);

  // Frame Loop Smooth Camera Lerp & Orientation Update
  useFrame(() => {
    // Smooth lerp damping
    currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYawRad.current, 0.08);
    currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, targetPitch.current, 0.08);

    // Calculate camera target look vector from center [0, 1.4, 0]
    const radius = 5;
    const yaw = currentYaw.current;
    const pitch = currentPitch.current;

    // Center eye-level position
    camera.position.set(0, 1.4, 0.1);

    // Spherical lookAt coordinates
    const targetX = radius * Math.sin(yaw) * Math.cos(pitch);
    const targetY = 1.4 + radius * Math.sin(pitch);
    const targetZ = -radius * Math.cos(yaw) * Math.cos(pitch);

    camera.lookAt(targetX, targetY, targetZ);
  });

  return null;
}
