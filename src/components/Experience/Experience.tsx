import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const axisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !axisRef.current) return;

    // ScrollTrigger line drawing animation
    gsap.fromTo(
      axisRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 85%',
          scrub: 0.5
        }
      }
    );

    // Stagger reveal milestone cards
    const items = containerRef.current.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const isLeft = index % 2 === 0;
      gsap.fromTo(
        item.querySelector('.timeline-card'),
        {
          opacity: 0,
          x: isLeft ? -50 : 50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%'
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>03 // CAREER JOURNEY</span>
          </div>
          <AnimatedTitle className="section-title">
            WORK EXPERIENCE & SIMULATIONS
          </AnimatedTitle>
          <p className="section-subtitle">
            Hands-on industry engineering roles and professional analytical simulations.
          </p>
        </div>

        <div ref={containerRef} className="timeline-container">
          <div ref={axisRef} className="timeline-axis" style={{ transformOrigin: 'top center' }} />

          <div className="timeline-items">
            {portfolioData.experience.map((item, idx) => (
              <div
                key={idx}
                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-node">
                  <div className="node-inner" />
                </div>

                <div className="bracket-card timeline-card">
                  <div className="timeline-card-header">
                    <div className="timeline-type-pill">{item.type}</div>
                    <div className="timeline-duration">
                      <FiCalendar className="meta-icon" />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  <h3 className="timeline-role">{item.role}</h3>
                  <div className="timeline-company">
                    <FiBriefcase className="meta-icon" />
                    <span>{item.company}</span>
                    {item.location && (
                      <span className="timeline-location">
                        <FiMapPin className="meta-icon" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="bullet-item">
                        <FiCheckCircle className="bullet-icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
