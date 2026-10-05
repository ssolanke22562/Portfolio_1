import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Magnetic } from '../Common/Magnetic';
import { FiArrowDown, FiCode, FiMessageSquare, FiDownload, FiCheckCircle } from 'react-icons/fi';
import gsap from 'gsap';
import './Hero.css';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }

    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );
    }

    if (actionsRef.current) {
      tl.fromTo(
        actionsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, []);

  const highlightStats = [
    { value: '150+', label: 'STUDENTS MENTORED & CTF COMPETITORS', sub: 'Cybersecurity Club VP' },
    { value: '100+', label: 'MEDICINE LISTINGS DISTRIBUTED', sub: 'Medi-4-U Platform' },
    { value: '5-STAR', label: 'HACKERRANK MULTI-DOMAIN RATING', sub: 'SQL, Python, C++, Java, Problem Solving' },
    { value: 'TOP 10', label: 'NATIONAL HACKATHON FINALIST', sub: 'HackIndia Spark-12 (8th Rank)' }
  ];

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="container hero-content-layer">
        {/* Top Section Index Pill */}
        <div ref={badgeRef} className="hero-top-meta">
          <div className="hero-section-index">
            <span className="index-bracket">[</span>
            <span className="index-num">01</span>
            <span className="index-divider">//</span>
            <span className="index-title">EDITORIAL PORTFOLIO</span>
            <span className="index-bracket">]</span>
          </div>

          <div className="hero-availability-tag">
            <span className="pulse-dot-green" />
            <span>OPEN FOR ROLES & INNOVATIVE CONTRACTS</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="hero-main-banner">
          <h1 className="hero-giant-title">
            <span className="title-row first">
              <span className="name-bold">SARTHAK</span>
              <span className="title-pill">DEV '25</span>
            </span>
            <span className="title-row second">
              <span className="name-gradient">SOLANKE</span>
              <span className="title-sub-serif">Creative Architect</span>
            </span>
          </h1>
          <p className="hero-subheading-tagline">
            FULL-STACK (MERN) ENGINEER • GOOGLE GEMINI AI INTEGRATOR • IoT SYSTEMS BUILDER
          </p>
        </div>

        {/* Dual Column Editorial Layout */}
        <div className="hero-editorial-grid">
          {/* Left Column: Narrative & Quick Action CTAs */}
          <div className="hero-narrative-col">
            <div className="editorial-lead-box">
              <p className="hero-lead-text">
                Computer Science undergraduate (SCOE '27) crafting scalable MERN web applications, automated generative AI workflows with the Google Gemini API, and intelligent hardware sensor networks.
              </p>
            </div>

            <div className="hero-meta-badges">
              <span className="meta-pill">
                <FiCheckCircle className="pill-icon" />
                <span>B.Tech CSE • 7.8 CGPA</span>
              </span>
              <span className="meta-pill">
                <span className="location-pin">📍</span>
                <span>Maharashtra, India</span>
              </span>
            </div>

            {/* CTAs */}
            <div ref={actionsRef} className="hero-actions-row">
              <Magnetic strength={0.3}>
                <a href="#projects" className="btn-primary interactive">
                  <FiCode size={16} />
                  <span>SELECTED WORKS</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a href="#chess" className="btn-secondary interactive">
                  <span>♟️ PLAY CHESS BOT</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={portfolioData.identity.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary interactive"
                >
                  <FiDownload size={16} />
                  <span>RESUME PDF</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <button
                  className="btn-secondary chat-trigger-btn interactive"
                  onClick={() => {
                    const chatBtn = document.querySelector('.chat-widget-fab') as HTMLElement;
                    if (chatBtn) chatBtn.click();
                  }}
                >
                  <FiMessageSquare size={16} />
                  <span>AI ASSISTANT</span>
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Elena Voss Highlight Metric Cards */}
          <div ref={statsRef} className="hero-stats-col">
            {highlightStats.map((stat, idx) => (
              <div key={idx} className="editorial-stat-card">
                <div className="stat-card-header">
                  <span className="stat-card-index">0{idx + 1}</span>
                  <span className="stat-card-value">{stat.value}</span>
                </div>
                <h4 className="stat-card-label">{stat.label}</h4>
                <p className="stat-card-sub">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="hero-scroll-bottom">
          <Magnetic strength={0.35}>
            <a href="#about" className="scroll-cue-btn" aria-label="Scroll to next section">
              <span className="scroll-text">EXPLORE ARCHIVES</span>
              <FiArrowDown className="scroll-icon-animated" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

