import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  delay?: number;
  triggerOnScroll?: boolean;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  children,
  className = '',
  tag: Tag = 'h2',
  delay = 0,
  triggerOnScroll = true
}) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.anim-char');
    if (!chars.length) return;

    if (triggerOnScroll) {
      gsap.fromTo(
        chars,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -40
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.85,
          ease: 'power4.out',
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    } else {
      gsap.fromTo(
        chars,
        {
          yPercent: 120,
          opacity: 0,
          rotateX: -40
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.02,
          duration: 0.85,
          ease: 'power4.out',
          delay
        }
      );
    }
  }, [delay, triggerOnScroll]);

  // Split string into characters wrapped in span
  const words = children.split(' ');

  const Element = Tag as React.ElementType;

  return (
    <Element ref={containerRef} className={`animated-text-mask ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="anim-word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className="anim-char"
              style={{
                display: 'inline-block',
                willChange: 'transform, opacity',
                transformOrigin: '50% 100%'
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Element>
  );
};
