import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, x: 80, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  return (
    <section id="education" className="section education-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>07 // ACADEMIC FOUNDATION</span>
          </div>
          <AnimatedTitle className="section-title">
            EDUCATION & BACKGROUND
          </AnimatedTitle>
          <p className="section-subtitle">
            Rigorous academic foundation in Computer Science and Engineering.
          </p>
        </div>

        <div ref={gridRef} className="education-grid">
          {portfolioData.education.map((item, idx) => (
            <div key={idx} className="bracket-card edu-card">
              <div className="edu-top">
                <div className="edu-icon-wrap">
                  <FiBookOpen size={22} />
                </div>
                {item.period && (
                  <div className="edu-period">
                    <FiCalendar className="meta-icon" />
                    <span>{item.period}</span>
                  </div>
                )}
              </div>

              <h3 className="edu-degree">{item.degree}</h3>
              <div className="edu-institution">{item.institution}</div>

              <div className="edu-footer">
                <span className="edu-score">{item.details}</span>
                <span className="edu-location">
                  <FiMapPin className="meta-icon" />
                  {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
