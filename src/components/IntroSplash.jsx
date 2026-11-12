import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { ArrowRight, Terminal, Sparkles, Activity } from 'lucide-react';

export default function IntroSplash({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const mountRef = useRef(null);
  const sceneElementsRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3D Core Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Icosahedron Wireframe
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00e575,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer Ring Cage
    const ringGeo = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.35
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2;
    group.add(ring1);
    group.add(ring2);

    // 3. Glowing Vertex Points
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', coreGeo.getAttribute('position'));
    const pointsMat = new THREE.PointsMaterial({
      color: 0x00ff90,
      size: 0.09,
      transparent: true,
      opacity: 0.95
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    sceneElementsRef.current = { group, coreMesh, ring1, ring2, renderer, scene, camera };

    // Interactive pointer inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x * 0.7;
      targetY = y * 0.7;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      group.rotation.y += delta * 0.35;
      group.rotation.x += delta * 0.18;
      ring1.rotation.z += delta * 0.25;
      ring2.rotation.y -= delta * 0.25;

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      group.position.x = mouseX * 1.2;
      group.position.y = mouseY * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleTriggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 650);
  };

  return (
    <motion.div
      className="intro-splash-overlay"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.08 : 1,
        filter: isExiting ? 'blur(20px)' : 'blur(0px)'
      }}
      transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050706',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 3D Canvas Anchor */}
      <div
        ref={mountRef}
        onClick={handleTriggerEnter}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer'
        }}
        title="Haz clic en la esfera o presiona inicializar para explorar"
      />

      {/* Grid Pattern Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 117, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 117, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none'
        }}
      />

      {/* Technical HUD Overlay Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          pointerEvents: 'none',
          padding: '0 24px',
          maxWidth: '680px'
        }}
      >
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{ marginBottom: '18px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              color: 'var(--accent-emerald)',
              background: 'rgba(0, 229, 117, 0.08)',
              border: '1px solid rgba(0, 229, 117, 0.25)',
              padding: '6px 16px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent-emerald)',
                boxShadow: '0 0 8px var(--accent-emerald)'
              }}
            />
            KERNEL BOOT // READY
          </span>
        </motion.div>

        {/* Name Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(32px, 6vw, 62px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            marginBottom: '12px'
          }}
        >
          Cristian Camilo Muñoz
        </motion.h1>

        {/* Role Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(13px, 1.6vw, 16px)',
            color: 'var(--accent-emerald)',
            letterSpacing: '0.04em',
            marginBottom: '36px'
          }}
        >
          SOFTWARE ENGINEER & AI SYSTEMS ARCHITECT
        </motion.p>

        {/* Interactive Enter CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          style={{ pointerEvents: 'auto' }}
        >
          <button
            type="button"
            onClick={handleTriggerEnter}
            className="intro-enter-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '12px',
              background: 'var(--accent-emerald)',
              color: '#040605',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(0, 229, 117, 0.4)',
              transition: 'transform 150ms var(--ease-out), box-shadow 150ms var(--ease-out)'
            }}
          >
            <span>INGRESAR AL SISTEMA</span>
            <ArrowRight size={16} />
          </button>

          <div
            style={{
              marginTop: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)'
            }}
          >
            [INTERACTÚA CON LA ESFERA O HAZ CLIC PARA DESPLEGAR]
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
