import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export const ScenePostProcessing: React.FC = () => {
  const { isLowPower } = useDeviceCapability();

  // Skip heavy postprocessing on low power mobile devices for max 60fps performance
  if (isLowPower) {
    return null;
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.8}
        intensity={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={0.7}
        eskil={false}
      />
    </EffectComposer>
  );
};
