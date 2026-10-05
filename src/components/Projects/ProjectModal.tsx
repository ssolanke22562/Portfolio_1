import React from 'react';
import { ProjectItem } from '../../data/portfolioData';
import { FiX, FiGithub, FiCheckCircle } from 'react-icons/fi';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="bracket-card project-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          <FiX size={24} />
        </button>

        <div className="project-modal-category">{project.category}</div>
        <h2 className="project-modal-title">{project.title}</h2>
        <p className="project-modal-tagline">{project.tagline}</p>

        <div className="project-modal-tech-list">
          {project.tech.map((t, idx) => (
            <span key={idx} className="project-tech-badge">
              {t}
            </span>
          ))}
        </div>

        <div className="project-modal-details">
          <h4 className="details-header">KEY CONTRIBUTIONS & ARCHITECTURE:</h4>
          <ul className="details-list">
            {project.bullets.map((b, idx) => (
              <li key={idx} className="details-item">
                <FiCheckCircle className="details-icon" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="project-modal-actions">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <FiGithub size={18} />
            <span>VIEW ON GITHUB</span>
          </a>
          <span className="repo-note">
            (Profile repository: <code>github.com/ssolanke22562</code>)
          </span>
        </div>
      </div>
    </div>
  );
};
