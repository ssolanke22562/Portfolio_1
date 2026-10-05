import { useState, useEffect } from 'react';

export interface DeviceCapability {
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  isLowPower: boolean;
  pixelRatio: number;
}

export function useDeviceCapability(): DeviceCapability {
  const [capability, setCapability] = useState<DeviceCapability>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        prefersReducedMotion: false,
        isLowPower: false,
        pixelRatio: 1
      };
    }

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Heuristic: mobile or low concurrency hardware
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isLowPower = isMobile || hardwareConcurrency <= 2;

    return {
      isMobile,
      isTablet,
      prefersReducedMotion,
      isLowPower,
      pixelRatio: dpr
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      const isLowPower = isMobile || hardwareConcurrency <= 2;

      setCapability({
        isMobile,
        isTablet,
        prefersReducedMotion,
        isLowPower,
        pixelRatio: dpr
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capability;
}
