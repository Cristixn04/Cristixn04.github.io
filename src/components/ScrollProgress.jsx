import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 38,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="top-scroll-progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2.5px',
        background: 'linear-gradient(90deg, #10b981, #00e575)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 999,
        boxShadow: '0 0 10px rgba(0, 229, 117, 0.7)'
      }}
    />
  );
}
