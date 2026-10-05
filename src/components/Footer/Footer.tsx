import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Magnetic } from '../Common/Magnetic';
import { FiArrowUp, FiCopy, FiCheck, FiMail, FiLinkedin, FiGithub, FiInstagram, FiExternalLink } from 'react-icons/fi';
import './Footer.css';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        {/* Giant Editorial Sign-Off Statement */}
        <div className="footer-statement-wrap">
          <div className="footer-tag">
            <span className="dot" />
            <span>[ INQUIRIES & COLLABORATIONS ]</span>
          </div>
          <h2 className="footer-giant-heading">
            LET'S CRAFT SOMETHING <span className="highlight-text">EXTRAORDINARY</span> TOGETHER.
          </h2>

          {/* Interactive Large Email Box */}
          <div className="footer-email-box">
            <a
              href={`mailto:${portfolioData.identity.email}`}
              className="footer-email-link interactive"
            >
              <FiMail className="footer-mail-icon" />
              <span>{portfolioData.identity.email}</span>
            </a>

            <button
              className={`footer-copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy Email Address"
            >
              {copied ? (
                <>
                  <FiCheck className="btn-icon" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <FiCopy className="btn-icon" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="footer-divider" />

        {/* Middle Navigation & Social Row */}
        <div className="footer-middle-row">
          <div className="footer-brand-signature">
            <span className="brand-primary">SARTHAK SOLANKE</span>
            <span className="brand-tagline">Full-Stack Developer & AI Integrations</span>
          </div>

          <div className="footer-social-cluster">
            <a
              href={portfolioData.identity.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <FiGithub size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.identity.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <FiLinkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href={portfolioData.identity.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <FiInstagram size={16} />
              <span>Instagram</span>
            </a>
            <a
              href={portfolioData.identity.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link highlight"
            >
              <span>Resume PDF</span>
              <FiExternalLink size={14} />
            </a>
          </div>

          <Magnetic strength={0.4}>
            <button className="footer-scroll-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
              <span className="btn-text">TOP</span>
              <FiArrowUp size={16} />
            </button>
          </Magnetic>
        </div>

        <div className="footer-divider subtle" />

        {/* Bottom Metadata */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Sarthak Raju Solanke. All rights reserved.
          </p>
          <div className="footer-location-tag">
            <span className="location-dot" />
            <span>MUMBAI / KOPARGAON, INDIA • IST (UTC+05:30)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

