import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export default function MultiFollowCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Raw mouse coordinates (instantaneous, 0-latency tracking for lead pointer)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Progressive spring physics for the trailing concentric rings
  const ring1Config = shouldReduceMotion
    ? { stiffness: 1200, damping: 40, mass: 0.1 }
    : { stiffness: 500, damping: 28, mass: 0.35 };

  const ring2Config = shouldReduceMotion
    ? { stiffness: 1200, damping: 40, mass: 0.1 }
    : { stiffness: 320, damping: 24, mass: 0.6 };

  const ring3Config = shouldReduceMotion
    ? { stiffness: 1200, damping: 40, mass: 0.1 }
    : { stiffness: 180, damping: 20, mass: 0.95 };

  const ring1X = useSpring(mouseX, ring1Config);
  const ring1Y = useSpring(mouseY, ring1Config);

  const ring2X = useSpring(mouseX, ring2Config);
  const ring2Y = useSpring(mouseY, ring2Config);

  const ring3X = useSpring(mouseX, ring3Config);
  const ring3Y = useSpring(mouseY, ring3Config);

  // Hardware pointer gating: strictly enable only on devices with fine pointer (mouse/trackpad)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsFinePointer(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Pointer event listeners on window and document root
  useEffect(() => {
    if (!isFinePointer) return;

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if hovering interactive element
      const target = e.target;
      if (target && target.closest) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .project-card, .timeline-card, .cue-cell, .filter-btn, .action-btn, .lang-option'
        );
        setIsHovered(Boolean(interactive));
      }
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    const handleWindowLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setIsVisible(false);
      }
    };

    const handleWindowEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('mouseleave', handleWindowLeave, { passive: true });
    document.addEventListener('mouseenter', handleWindowEnter, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('mouseleave', handleWindowLeave);
      document.removeEventListener('mouseenter', handleWindowEnter);
    };
  }, [isFinePointer, isVisible, mouseX, mouseY]);

  // If not a fine pointer device (e.g. mobile touchscreen), render nothing
  if (!isFinePointer) {
    return null;
  }

  const rings = [
    {
      id: 'motion-ring-1',
      size: 18,
      x: ring1X,
      y: ring1Y,
      borderColor: '#00ff88',
      boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
      hoverScale: 1.25,
      zIndex: 999997,
    },
    {
      id: 'motion-ring-2',
      size: 28,
      x: ring2X,
      y: ring2Y,
      borderColor: '#00e575',
      boxShadow: '0 0 12px rgba(0, 229, 117, 0.45)',
      hoverScale: 1.35,
      zIndex: 999996,
    },
    {
      id: 'motion-ring-3',
      size: 40,
      x: ring3X,
      y: ring3Y,
      borderColor: '#10b981',
      boxShadow: '0 0 14px rgba(16, 185, 129, 0.4)',
      hoverScale: 1.45,
      zIndex: 999995,
    },
  ];

  return (
    <div className="motion-multifollow-container" aria-hidden="true">
      {/* 1. Lead Center Pointer (Instantaneous white dot with emerald aura) */}
      <motion.div
        className="motion-cursor-lead-dot"
        style={{
          x: mouseX,
          y: mouseY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.95), 0 0 4px rgba(0, 229, 117, 0.8)',
          pointerEvents: 'none',
          zIndex: 999999,
        }}
        animate={{
          scale: isPressed ? 0.6 : isHovered ? 1.35 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 500, damping: 25 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* 2. Trailing Staggered Spring Rings */}
      {rings.map((ring) => (
        <motion.div
          key={ring.id}
          className={`motion-cursor-ring ${ring.id}`}
          style={{
            x: ring.x,
            y: ring.y,
            position: 'fixed',
            top: 0,
            left: 0,
            width: ring.size,
            height: ring.size,
            marginLeft: -ring.size / 2,
            marginTop: -ring.size / 2,
            borderRadius: '50%',
            border: `1.5px solid ${ring.borderColor}`,
            backgroundColor: 'transparent',
            boxShadow: ring.boxShadow,
            pointerEvents: 'none',
            zIndex: ring.zIndex,
          }}
          animate={{
            scale: isPressed ? 0.7 : isHovered ? ring.hoverScale : 1,
            opacity: isVisible ? (isHovered ? 0.95 : 0.8) : 0,
          }}
          transition={{
            scale: { type: 'spring', stiffness: 420, damping: 24 },
            opacity: { duration: 0.15 },
          }}
        />
      ))}
    </div>
  );
}
