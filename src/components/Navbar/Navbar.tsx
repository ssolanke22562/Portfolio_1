import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Magnetic } from '../Common/Magnetic';
import { FiMenu, FiX, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentTime, setCurrentTime] = useState('');

  // Live IST Clock (Elena Voss signature header element)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(`${now.toLocaleTimeString('en-GB', options)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'what-i-do', 'experience', 'projects', 'skills', 'leadership', 'chess', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICES', href: '#what-i-do', id: 'what-i-do' },
    { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'SELECTED WORK', href: '#projects', id: 'projects' },
    { label: 'ARSENAL', href: '#skills', id: 'skills' },
    { label: 'LEADERSHIP', href: '#leadership', id: 'leadership' },
    { label: 'CHESS BOT', href: '#chess', id: 'chess' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left: Brand Logo & Status Tag */}
        <div className="navbar-left-group">
          <Magnetic strength={0.35}>
            <a href="#hero" className="navbar-brand" onClick={(e) => handleLinkClick(e, '#hero')}>
              <span className="brand-name">SARTHAK SOLANKE</span>
              <span className="brand-badge">FOLIO '25</span>
            </a>
          </Magnetic>

          <div className="navbar-status-indicator">
            <span className="status-dot-emerald" />
            <span className="status-text">AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Capsule */}
        <nav className="navbar-capsule">
          {navLinks.map((link) => (
            <Magnetic key={link.id} strength={0.25}>
              <a
                href={link.href}
                className={`capsule-nav-link text-roll-btn ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <span className="roll-wrap">
                  <span className="roll-text primary">{link.label}</span>
                  <span className="roll-text secondary">{link.label}</span>
                </span>
                {activeSection === link.id && <span className="active-glow-pip" />}
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Right: Time & Direct Contact Action */}
        <div className="navbar-right-group">
          {currentTime && (
            <div className="navbar-time-badge">
              <span className="time-location">MUMBAI, IN</span>
              <span className="time-value">{currentTime}</span>
            </div>
          )}

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="navbar-cta-btn"
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              <span>LET'S TALK</span>
              <FiArrowUpRight className="cta-arrow" />
            </a>
          </Magnetic>

          {/* Mobile Hamburger Toggle */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`drawer-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              <span className="drawer-link-num">0{navLinks.indexOf(link) + 1}</span>
              <span>{link.label}</span>
            </a>
          ))}
          <a
            href={portfolioData.identity.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-resume-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            DOWNLOAD RESUME <FiExternalLink />
          </a>
        </div>
      </div>
    </header>
  );
};

