import React, { useEffect, useRef, useState } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    // 1. Scroll-driven visibility: 0 at Hero, fades in approaching Perfil Profesional (#sobre-mi)
    const handleScroll = () => {
      const sobreMiElem = document.getElementById('sobre-mi');
      if (!sobreMiElem) return;

      const rect = sobreMiElem.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start fading in when the top of #sobre-mi is 200px from entering the viewport bottom
      // Reach full opacity when #sobre-mi top reaches upper half of viewport
      const startFade = windowHeight + 150;
      const fullFade = windowHeight * 0.35;

      if (rect.top >= startFade) {
        setFadeOpacity(0);
      } else if (rect.top <= fullFade) {
        setFadeOpacity(1);
      } else {
        const progress = 1 - (rect.top - fullFade) / (startFade - fullFade);
        setFadeOpacity(Math.max(0, Math.min(1, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isRunning = false;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive dimensions
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 26 : 48;
    const maxLinkDist = isMobile ? 80 : 105;

    // Palette: Emerald and cyber mint tones
    const colorPalette = [
      { r: 0, g: 229, b: 117 },  // #00e575 (Signature Emerald)
      { r: 0, g: 255, b: 136 },  // #00ff88 (Bright Mint)
      { r: 16, g: 185, b: 129 }, // #10b981 (Deep Emerald)
      { r: 242, g: 245, b: 243 } // #f2f5f3 (Crisp subtle starlight)
    ];

    // Initialize particle field
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.32),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.32),
        radius: Math.random() * 1.4 + 1.1,
        color: col,
        baseAlpha: Math.random() * 0.18 + 0.14,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008
      });
    }

    // Mouse coordinates for gentle organic deflection
    const mouse = { x: -1000, y: -1000, active: false };

    const handlePointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    // Main render loop
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Only draw when opacity is above zero
      if (fadeOpacity > 0.005) {
        // Draw inter-particle constellation links
        for (let i = 0; i < particleCount; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxLinkDist) {
              const linkAlpha = (1 - dist / maxLinkDist) * 0.065 * fadeOpacity;
              ctx.strokeStyle = `rgba(0, 229, 117, ${linkAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw and update particles
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];

          // Gentle mouse avoidance
          if (mouse.active) {
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const repelRadius = 120;

            if (mDist < repelRadius && mDist > 0.1) {
              const force = (1 - mDist / repelRadius) * 0.75;
              p.x += (mdx / mDist) * force;
              p.y += (mdy / mDist) * force;
            }
          }

          // Advance position
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < -20) p.x = width + 20;
          else if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          else if (p.y > height + 20) p.y = -20;

          // Subtle harmonic breathing
          const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
          const currentAlpha = Math.max(0.05, p.baseAlpha + pulse * 0.08) * fadeOpacity;

          // Render soft particle glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
          ctx.fill();
        }
      }

      // Keep running only if visible or transition in progress
      if (fadeOpacity > 0.005 || isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // If fadeOpacity is greater than zero, start the render loop
    if (fadeOpacity > 0.005) {
      isRunning = true;
      animationFrameId = requestAnimationFrame(render);
    } else {
      // Clear canvas if fully invisible in hero
      ctx.clearRect(0, 0, width, height);
      isRunning = false;
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [fadeOpacity]);

  return (
    <div
      className="ambient-background-layer"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: fadeOpacity,
        transition: 'opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
        overflow: 'hidden'
      }}
    >
      {/* Subtle radial emerald depth gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle 850px at 50% 50%, rgba(0, 229, 117, 0.025) 0%, transparent 80%)',
          pointerEvents: 'none'
        }}
      />

      {/* Cyber micro-dot blueprint grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.65,
          pointerEvents: 'none'
        }}
      />

      {/* 2D Canvas with floating ambient particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
