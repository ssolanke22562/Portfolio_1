import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import Marquee from 'react-fast-marquee';
import { PhysicsBallsCanvas } from './PhysicsBalls';
import { FiCode, FiLayers, FiDatabase, FiCpu, FiBarChart, FiShield, FiTool } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TechStack.css';

gsap.registerPlugin(ScrollTrigger);

export const TechStack: React.FC = () => {
  const matrixGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matrixGridRef.current) return;

    gsap.fromTo(
      matrixGridRef.current.children,
      { opacity: 0, x: 70, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: matrixGridRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Programming Languages':
        return <FiCode className="category-icon" />;
      case 'Web Development':
        return <FiLayers className="category-icon" />;
      case 'Databases':
        return <FiDatabase className="category-icon" />;
      case 'IoT & Embedded':
        return <FiCpu className="category-icon" />;
      case 'AI & Data':
        return <FiBarChart className="category-icon" />;
      case 'Core Concepts':
        return <FiShield className="category-icon" />;
      case 'Tools & Platforms':
        return <FiTool className="category-icon" />;
      default:
        return <FiCode className="category-icon" />;
    }
  };

  const allSkillsFlat = portfolioData.skills.categories.flatMap(c => c.skills);

  return (
    <section id="skills" className="section tech-stack-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>05 // ARSENAL & SKILLS</span>
          </div>
          <AnimatedTitle className="section-title">
            TECHNICAL MASTERY & TOOLS
          </AnimatedTitle>
          <p className="section-subtitle">
            Curated engineering proficiencies across software stacks, data science pipelines, and hardware.
          </p>
        </div>

        {/* 3D Rapier Interactive Physics Scene */}
        <PhysicsBallsCanvas />

        {/* Dynamic Infinite Marquee Strips */}
        <div className="marquee-wrapper">
          <Marquee gradient={false} speed={40} className="tech-marquee forward">
            {allSkillsFlat.slice(0, 16).map((skill, idx) => (
              <div key={idx} className="marquee-pill">
                <span className="pill-dot" />
                <span>{skill}</span>
              </div>
            ))}
          </Marquee>

          <Marquee gradient={false} speed={35} direction="right" className="tech-marquee reverse">
            {allSkillsFlat.slice(16).map((skill, idx) => (
              <div key={idx} className="marquee-pill">
                <span className="pill-dot alt" />
                <span>{skill}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Categorized Skills Matrix */}
        <div ref={matrixGridRef} className="skills-matrix-grid">
          {portfolioData.skills.categories.map((cat, idx) => (
            <div key={idx} className="bracket-card skill-cat-card">
              <div className="cat-card-header">
                <div className="cat-icon-wrap">{getCategoryIcon(cat.name)}</div>
                <h3 className="cat-title">{cat.name}</h3>
              </div>

              <div className="cat-skills-pills">
                {cat.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-badge">
                    {skill}
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
