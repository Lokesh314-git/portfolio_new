import React from 'react';
import Desk from './Desk';
import Laptop from './Laptop';
import PortfolioBook from './PortfolioBook';
import AINode from './AINode';

export default function DeskCenter({ onOpenBook, onOpenIdentity }) {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Desk Geometry, Monitor, PC, Chair */}
      <Desk />

      {/* Zone 1 Laptop */}
      <Laptop onClick={onOpenIdentity} />

      {/* Zone 3 Hardcover Portfolio Book */}
      <PortfolioBook onClick={onOpenBook} />

      {/* Zone 4 AI/ML Holographic Node */}
      <AINode onClick={onOpenIdentity} />
    </group>
  );
}
