import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from 'react-icons/fi';
import './SocialDock.css';

export const SocialDock: React.FC = () => {
  return (
    <aside className="social-dock" aria-label="Social links">
      <div className="social-dock-line top" />
      <div className="social-dock-icons">
        <a
          href={portfolioData.identity.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-icon-link"
          aria-label="GitHub Profile"
        >
          <FiGithub size={20} />
          <span className="dock-tooltip">GitHub</span>
        </a>
        <a
          href={portfolioData.identity.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-icon-link"
          aria-label="LinkedIn Profile"
        >
          <FiLinkedin size={20} />
          <span className="dock-tooltip">LinkedIn</span>
        </a>
        <a
          href={portfolioData.identity.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="dock-icon-link"
          aria-label="Instagram Profile"
        >
          <FiInstagram size={20} />
          <span className="dock-tooltip">Instagram</span>
        </a>
        <a
          href={portfolioData.identity.socials.email}
          className="dock-icon-link"
          aria-label="Send Email"
        >
          <FiMail size={20} />
          <span className="dock-tooltip">Email</span>
        </a>
      </div>
      <div className="social-dock-line bottom" />
    </aside>
  );
};
