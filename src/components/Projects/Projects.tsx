import React, { useState, useEffect, useRef } from 'react';
import { portfolioData, ProjectItem } from '../../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { FiGithub, FiArrowUpRight, FiLayers, FiCode, FiCpu, FiCompass } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

function ProjectCardItem({
  project,
  index,
  onSelect
}: {
  project: ProjectItem;
  index: number;
  onSelect: (p: ProjectItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 6;
    const rotY = (x / (rect.width / 2)) * 6;

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      scale: 1.015,
      duration: 0.25,
      ease: 'power1.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'AI & Web': return <FiCpu />;
      case 'Full-Stack': return <FiCode />;
      case 'IoT & Embedded': return <FiCompass />;
      default: return <FiLayers />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="elena-project-card interactive"
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Visual Header Mockup Banner */}
      <div className={`project-banner-mockup grad-${(index % 4) + 1}`}>
        <div className="mockup-top-bar">
          <span className="mockup-index">[ 0{index + 1} ]</span>
          <span className="mockup-category-tag">
            {getCategoryIcon(project.category)}
            <span>{project.category}</span>
          </span>
        </div>

        <div className="mockup-center-preview">
          <div className="mockup-screen-card">
            <span className="screen-title">{project.title}</span>
            <span className="screen-sub">{project.tech[0]} • {project.tech[1] || 'Architecture'}</span>
          </div>
        </div>

        <div className="mockup-bottom-cue">
          <span>CLICK FOR SPECIFICATIONS</span>
          <FiArrowUpRight className="cue-icon" />
        </div>
      </div>

      {/* Card Body */}
      <div className="project-body-content">
        <div className="project-title-row">
          <h3 className="project-heading">{project.title}</h3>
          <span className="project-number-tag">0{index + 1}</span>
        </div>

        <p className="project-description-tagline">{project.tagline}</p>

        {/* Tech Chips */}
        <div className="project-tech-matrix">
          {project.tech.map((tech, idx) => (
            <span key={idx} className="elena-tech-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer Actions */}
        <div className="project-action-footer">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="elena-github-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub size={15} />
            <span>GitHub</span>
          </a>

          <button
            className="elena-deep-dive-btn"
            onClick={() => onSelect(project)}
          >
            <FiLayers size={14} />
            <span>Architecture Breakdown</span>
            <FiArrowUpRight className="btn-arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Full-Stack', 'AI & Web', 'IoT & Embedded', 'Client Work'];

  const filteredProjects = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, x: 80, scale: 0.96 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
        }
      }
    );
  }, [filter]);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="dot" />
            <span>04 // SELECTED WORKS</span>
          </div>
          <h2 className="section-title">
            CURATED ARCHITECTURES & SYSTEMS
          </h2>
          <p className="section-subtitle">
            Production web platforms, generative AI workflow tooling, and assistive IoT sensor hardware.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              <span>{cat}</span>
              {cat === 'All' && <span className="pill-count">({portfolioData.projects.length})</span>}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="elena-projects-grid">
          {filteredProjects.map((project, idx) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={idx}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

