import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { FiAward, FiStar, FiCheck, FiCheckSquare } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

export const Achievements: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, x: 70, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'Rank':
      case 'Award':
        return <FiAward className="achieve-icon" />;
      case 'Rating':
        return <FiStar className="achieve-icon gold" />;
      default:
        return <FiCheck className="achieve-icon" />;
    }
  };

  return (
    <section id="achievements" className="section achievements-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>08 // HONORS & CREDENTIALS</span>
          </div>
          <AnimatedTitle className="section-title">
            ACHIEVEMENTS & CERTIFICATIONS
          </AnimatedTitle>
          <p className="section-subtitle">
            National hackathon ranks, technical ratings, and verified credentials.
          </p>
        </div>

        <div ref={gridRef} className="achievements-grid">
          {portfolioData.achievements.map((item, idx) => (
            <div key={idx} className="bracket-card achievement-card">
              <div className="achieve-header">
                <div className="achieve-icon-wrap">
                  {getBadgeIcon(item.type)}
                </div>
                <span className="achieve-type-pill">{item.type}</span>
              </div>

              <h3 className="achieve-title">{item.title}</h3>
              <div className="achieve-issuer">{item.issuer}</div>

              {item.highlight && (
                <div className="achieve-highlight">
                  <FiCheckSquare className="meta-icon" />
                  <span>{item.highlight}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
