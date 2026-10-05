import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera } from '@react-three/drei';
import { HeroAvatar } from './HeroAvatar';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export const Hero3DCanvas: React.FC = () => {
  const { isLowPower, pixelRatio } = useDeviceCapability();

  return (
    <div className="hero-canvas-wrapper">
      <Canvas
        dpr={pixelRatio}
        gl={{
          antialias: !isLowPower,
          powerPreference: 'high-performance',
          alpha: true
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={45} />

        {/* Ambient & Rim Lighting */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#38bdf8" />
        <spotLight
          position={[0, 8, 4]}
          intensity={2.0}
          angle={0.6}
          penumbra={1}
          color="#a855f7"
        />

        {/* Floating Sparkles & Dust */}
        <Sparkles
          count={isLowPower ? 35 : 80}
          scale={6}
          size={2.5}
          speed={0.4}
          color="#c084fc"
        />

        <Suspense fallback={null}>
          <HeroAvatar />
        </Suspense>
      </Canvas>
    </div>
  );
};
