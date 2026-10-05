import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './Preloader.css';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 4;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Execute GSAP curtain wipe-up exit animation
        const tl = gsap.timeline({
          onComplete: () => {
            onLoaded();
          }
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: 'power2.in'
        }).to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: 'power4.inOut'
          },
          '-=0.1'
        );
      } else {
        setProgress(current);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div ref={containerRef} className="preloader-curtain">
      <div ref={contentRef} className="preloader-content">
        <div className="preloader-logo">
          <span className="logo-initials">SS</span>
          <span className="logo-tag">/&gt;</span>
        </div>

        <div className="preloader-bar-wrap">
          <div className="preloader-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="preloader-status">
          <span className="status-text">INITIALIZING CORE NEURAL RUNTIME</span>
          <span className="status-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
