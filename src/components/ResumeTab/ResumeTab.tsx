import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { FiArrowUpRight } from 'react-icons/fi';
import './ResumeTab.css';

export const ResumeTab: React.FC = () => {
  return (
    <aside className="resume-tab-wrap" aria-label="Resume button">
      <a
        href={portfolioData.identity.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="resume-tab-btn"
        aria-label="Download Resume PDF"
      >
        <span className="resume-text">RESUME</span>
        <FiArrowUpRight className="resume-icon" />
      </a>
      <div className="resume-tab-line" />
    </aside>
  );
};
