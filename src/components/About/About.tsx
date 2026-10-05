import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { Magnetic } from '../Common/Magnetic';
import { FiDownload, FiAward, FiUsers, FiBookOpen, FiTerminal } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bioCardRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (bioCardRef.current) {
      gsap.fromTo(
        bioCardRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioCardRef.current,
            start: 'top 85%'
          }
        }
      );
    }

    if (statsGridRef.current) {
      gsap.fromTo(
        statsGridRef.current.children,
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: 'top 85%'
          }
        }
      );
    }
  }, []);

  const stats = [
    {
      icon: <FiBookOpen className="stat-icon" />,
      value: "7.8 / 10",
      label: "SCOE B.Tech CGPA",
      sublabel: "CSE Expected 2027"
    },
    {
      icon: <FiUsers className="stat-icon" />,
      value: "18+ Members",
      label: "Cybersecurity Club VP",
      sublabel: "150+ CTF Attendees"
    },
    {
      icon: <FiAward className="stat-icon" />,
      value: "Top 10",
      label: "National Hackathon Rank",
      sublabel: "HackIndia Spark-12"
    },
    {
      icon: <FiTerminal className="stat-icon" />,
      value: "5-Star",
      label: "HackerRank Ratings",
      sublabel: "SQL, Java, Python, C++, DSA"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>01 // ABOUT ME</span>
          </div>
          <AnimatedTitle className="section-title">
            ENGINEERING WITH PURPOSE
          </AnimatedTitle>
          <p className="section-subtitle">
            Bridging modern web architectures, generative AI models, and embedded IoT hardware.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Portrait & Identity HUD */}
          <div className="about-portrait-card bracket-card">
            <div className="portrait-image-wrapper">
              <img
                src={portfolioData.identity.photoUrl}
                alt={portfolioData.identity.fullName}
                className="portrait-photo"
              />
              <div className="portrait-overlay-hud">
                <div className="hud-corner top-left" />
                <div className="hud-corner top-right" />
                <div className="hud-corner bottom-left" />
                <div className="hud-corner bottom-right" />
                <div className="portrait-status-pill">
                  <span className="pulse-dot-green" />
                  <span>AVAILABLE FOR ROLES</span>
                </div>
              </div>
            </div>
            <div className="portrait-meta-box">
              <h4 className="portrait-name">{portfolioData.identity.fullName}</h4>
              <p className="portrait-title">Full-Stack Developer & AI Integrator</p>
              <div className="portrait-tags">
                <span className="p-tag">SCOE '27</span>
                <span className="p-tag">CyberSec VP</span>
                <span className="p-tag">MERN + Gemini</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Highlight Metrics */}
          <div className="about-content-col">
            {/* Main Bio Card */}
            <div ref={bioCardRef} className="bracket-card about-bio-card">
              <div className="bio-badge">PROFESSIONAL OVERVIEW</div>
              <h3 className="bio-heading">Sarthak Raju Solanke</h3>
              <p className="bio-lead">
                {portfolioData.summary}
              </p>
              <p className="bio-body">
                Currently pursuing my Bachelor of Technology in Computer Science and Engineering at Sanjivani College of Engineering (SCOE), Kopargaon. I specialize in building end-to-end applications that solve real-world problems—from AI prompt-to-visual workflow platforms like <strong>Nexus AI</strong> and healthcare inventory management in <strong>Medi-4-U</strong>, to intelligent assistive robotics with Raspberry Pi 4 and ESP32.
              </p>

              <div className="bio-actions">
                <Magnetic strength={0.3}>
                  <a
                    href={portfolioData.identity.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <FiDownload size={18} />
                    <span>DOWNLOAD RESUME (PDF)</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <a href="#contact" className="btn-secondary">
                    <span>GET IN TOUCH</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Key Metrics / Highlights Grid */}
            <div ref={statsGridRef} className="about-stats-grid">
              {stats.map((item, idx) => (
                <div key={idx} className="bracket-card stat-card">
                  <div className="stat-icon-wrap">{item.icon}</div>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                  <div className="stat-sublabel">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
