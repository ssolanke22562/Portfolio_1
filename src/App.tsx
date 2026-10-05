import React, { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Preloader } from './components/Loader/Preloader';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { GlobalCanvas } from './components/Scene3D/GlobalCanvas';
import { Navbar } from './components/Navbar/Navbar';
import { SocialDock } from './components/SocialDock/SocialDock';
import { ResumeTab } from './components/ResumeTab/ResumeTab';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { WhatIDo } from './components/WhatIDo/WhatIDo';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { TechStack } from './components/TechStack/TechStack';
import { Leadership } from './components/Leadership/Leadership';
import { Education } from './components/Education/Education';
import { Achievements } from './components/Achievements/Achievements';
import { ChessArena } from './components/Chess/ChessArena';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ChatWidget } from './components/ChatWidget/ChatWidget';
import './styles/global.css';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll hooked to GSAP ScrollTrigger
  useSmoothScroll();

  return (
    <div className="portfolio-app">
      {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}

      {/* Global Persistent 3D Canvas with Bloom & Camera Scroll Interpolation */}
      <GlobalCanvas />

      <CustomCursor />
      <Navbar />
      <SocialDock />
      <ResumeTab />

      <main>
        <Hero />
        <About />
        <WhatIDo />
        <Experience />
        <Projects />
        <TechStack />
        <Leadership />
        <Education />
        <Achievements />
        <ChessArena />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
