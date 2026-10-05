import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { FiLayout, FiCpu, FiRadio, FiShield } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhatIDo.css';

gsap.registerPlugin(ScrollTrigger);

export const WhatIDo: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
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

  const getIcon = (id: string) => {
    switch (id) {
      case 'full-stack':
        return <FiLayout className="service-icon" />;
      case 'ai-systems':
        return <FiCpu className="service-icon" />;
      case 'iot-embedded':
        return <FiRadio className="service-icon" />;
      case 'cybersecurity':
        return <FiShield className="service-icon" />;
      default:
        return <FiCpu className="service-icon" />;
    }
  };

  return (
    <section id="what-i-do" className="section what-i-do-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>02 // WHAT I DO</span>
          </div>
          <AnimatedTitle className="section-title">
            CORE CAPABILITIES & DISCIPLINES
          </AnimatedTitle>
          <p className="section-subtitle">
            From architecture to deployment, building resilient software and hardware systems.
          </p>
        </div>

        <div ref={gridRef} className="services-grid">
          {portfolioData.whatIDo.map((service, idx) => (
            <div key={service.id} className="bracket-card service-card">
              <div className="service-top">
                <div className="service-icon-box">
                  {getIcon(service.id)}
                </div>
                <span className="service-number">0{idx + 1}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <div className="service-subtitle">{service.subtitle}</div>
              <p className="service-description">{service.description}</p>

              <div className="service-tags">
                {service.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="service-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
