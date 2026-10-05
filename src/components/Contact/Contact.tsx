import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { AnimatedTitle } from '../Common/AnimatedText';
import { Magnetic } from '../Common/Magnetic';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiInstagram, FiArrowUpRight, FiDownload } from 'react-icons/fi';
import './Contact.css';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>10 // CONNECT & COLLABORATE</span>
          </div>
          <AnimatedTitle className="section-title">
            LET'S BUILD SOMETHING EXTRAORDINARY
          </AnimatedTitle>
          <p className="section-subtitle">
            Open for full-time software engineering roles, internship opportunities, and innovative collaborations.
          </p>
        </div>

        <div className="contact-grid">
          {/* Direct Communication Channels */}
          <div className="bracket-card contact-main-card">
            <h3 className="contact-card-title">Direct Channels</h3>
            <p className="contact-card-desc">
              Feel free to reach out directly via email, phone, or connect through social networks.
            </p>

            <div className="contact-info-list">
              <a href={portfolioData.identity.socials.email} className="contact-info-row">
                <div className="contact-icon-box">
                  <FiMail size={20} />
                </div>
                <div className="contact-text-wrap">
                  <span className="contact-label">EMAIL ADDRESS</span>
                  <span className="contact-val">{portfolioData.identity.email}</span>
                </div>
              </a>

              <a href={`tel:${portfolioData.identity.phone.replace(/\s+/g, '')}`} className="contact-info-row">
                <div className="contact-icon-box">
                  <FiPhone size={20} />
                </div>
                <div className="contact-text-wrap">
                  <span className="contact-label">PHONE NUMBER</span>
                  <span className="contact-val">{portfolioData.identity.phone}</span>
                </div>
              </a>

              <div className="contact-info-row static">
                <div className="contact-icon-box">
                  <FiMapPin size={20} />
                </div>
                <div className="contact-text-wrap">
                  <span className="contact-label">LOCATION</span>
                  <span className="contact-val">{portfolioData.identity.location}</span>
                </div>
              </div>
            </div>

            <div className="contact-social-links">
              <Magnetic strength={0.3}>
                <a
                  href={portfolioData.identity.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <FiLinkedin size={18} />
                  <span>LinkedIn</span>
                  <FiArrowUpRight size={14} />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={portfolioData.identity.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <FiGithub size={18} />
                  <span>GitHub</span>
                  <FiArrowUpRight size={14} />
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <a
                  href={portfolioData.identity.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                >
                  <FiInstagram size={18} />
                  <span>Instagram</span>
                  <FiArrowUpRight size={14} />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Quick Action Side Cards */}
          <div className="contact-side-column">
            <div className="bracket-card action-banner-card">
              <span className="banner-tag">RESUME ARCHIVE</span>
              <h4 className="banner-title">Need a physical copy of my credentials?</h4>
              <p className="banner-desc">
                Download my complete verified resume containing academic scores, project breakdowns, and technical certifications.
              </p>
              <Magnetic strength={0.3}>
                <a
                  href={portfolioData.identity.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary banner-action"
                >
                  <FiDownload size={18} />
                  <span>DOWNLOAD RESUME PDF</span>
                </a>
              </Magnetic>
            </div>

            <div className="bracket-card action-banner-card chess-banner">
              <span className="banner-tag">CHESS CHALLENGE</span>
              <h4 className="banner-title">Fancy a quick tactical game?</h4>
              <p className="banner-desc">
                Put your strategic calculation skills to the test against my custom chess bot.
              </p>
              <Magnetic strength={0.3}>
                <a href="#chess" className="btn-secondary banner-action">
                  <span>PLAY CHESS BOT ♟️</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
