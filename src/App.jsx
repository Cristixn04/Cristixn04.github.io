import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LanguageProvider } from './i18n/LanguageContext';
import ScrollProgress from './components/ScrollProgress';
import IntroSplash from './components/IntroSplash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import SoftSkills from './components/SoftSkills';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LanguageProvider>
      <div className="portfolio-app-root">
        {/* Top Scroll-Linked Progress Bar */}
        <ScrollProgress />

        {/* Interactive 3D Intro Splash Screen */}
        <AnimatePresence>
          {showSplash && (
            <IntroSplash onEnter={() => setShowSplash(false)} />
          )}
        </AnimatePresence>

        {/* Main Content Layout */}
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <SoftSkills />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
