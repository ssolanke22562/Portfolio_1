import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { FiUsers, FiMic, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Leadership.css';

gsap.registerPlugin(ScrollTrigger);

export const Leadership: React.FC = () => {
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
        stagger: 0.15,
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
    <section id="leadership" className="section leadership-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>06 // LEADERSHIP & IMPACT</span>
          </div>
          <AnimatedTitle className="section-title">
            COMMUNITY LEADERSHIP & INITIATIVES
          </AnimatedTitle>
          <p className="section-subtitle">
            Leading student technical societies, organizing national CTF competitions, and campus anchoring.
          </p>
        </div>

        <div ref={gridRef} className="leadership-grid">
          {portfolioData.leadership.map((item, idx) => (
            <div key={idx} className="bracket-card leadership-card">
              <div className="leadership-card-top">
                <div className="leadership-icon-wrap">
                  {idx === 0 ? <FiUsers size={24} /> : <FiMic size={24} />}
                </div>
                <div className="leadership-period">
                  <FiCalendar className="period-icon" />
                  <span>{item.period}</span>
                </div>
              </div>

              <h3 className="leadership-role">{item.role}</h3>
              <div className="leadership-org">{item.organization}</div>

              <ul className="leadership-bullets">
                {item.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="bullet-item">
                    <FiCheckCircle className="bullet-icon" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
