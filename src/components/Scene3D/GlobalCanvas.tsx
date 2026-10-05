import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { SceneWorld } from './SceneWorld';
import { ScenePostProcessing } from './ScenePostProcessing';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';
import './GlobalCanvas.css';

export const GlobalCanvas: React.FC = () => {
  const { isLowPower, pixelRatio } = useDeviceCapability();

  return (
    <div className="global-3d-canvas-wrap" aria-hidden="true">
      <Canvas
        dpr={pixelRatio}
        gl={{
          antialias: !isLowPower,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.2]} fov={45} />

        <Suspense fallback={null}>
          <SceneWorld />
          <ScenePostProcessing />
        </Suspense>
      </Canvas>
    </div>
  );
};
