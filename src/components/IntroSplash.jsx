import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function IntroSplash({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const mountRef = useRef(null);
  const triggerExitRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const aspect = width / height;

    const getCameraZ = (asp) => {
      // Dynamic camera distance: ensures orb and React logo are 100% visible on mobile and desktop
      return asp < 1.0 ? Math.max(5.1, 5.1 / Math.pow(asp, 0.88)) : 4.8;
    };

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.z = getCameraZ(aspect);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Soft round glowing particle texture (canvas generated)
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(224, 255, 245, 0.95)');
      grad.addColorStop(0.65, 'rgba(0, 229, 117, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };
    const circleTexture = createCircleTexture();

    // ─────────────────────────────────────────────────────────────
    // PARTICLE GEOMETRY GENERATION (Outer Orb + Inner React Atom)
    // ─────────────────────────────────────────────────────────────
    // 1. Outer Orb Fibonacci Sphere Shell (2,400 points)
    const orbCount = 2400;
    // 2. React Nucleus (360 points)
    const nucCount = 360;
    // 3. React 3 Orbital Ellipses (3 * 700 = 2,100 points)
    const ringsCount = 2100;
    // 4. Subtle Outer Cosmic Dust (280 points)
    const dustCount = 280;

    const totalCount = orbCount + nucCount + ringsCount + dustCount;

    const homePositions = new Float32Array(totalCount * 3);
    const positions = new Float32Array(totalCount * 3);
    const colors = new Float32Array(totalCount * 3);
    const vx = new Float32Array(totalCount);
    const vy = new Float32Array(totalCount);
    const vz = new Float32Array(totalCount);
    const randoms = new Float32Array(totalCount);

    let ptr = 0;

    // Palette:
    const colorEmerald = new THREE.Color('#00e575');
    const colorMint = new THREE.Color('#38fdb2');
    const colorCyan = new THREE.Color('#00f5ff');
    const colorRimWhite = new THREE.Color('#eafff7');

    // 1. Generate Outer Orb Shell
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~2.39996 rad
    for (let i = 0; i < orbCount; i++) {
      const y = 1 - (i / (orbCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      const r = 1.72 + (Math.random() - 0.5) * 0.05;
      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const py = y * r;

      homePositions[ptr * 3] = x;
      homePositions[ptr * 3 + 1] = py;
      homePositions[ptr * 3 + 2] = z;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = py;
      positions[ptr * 3 + 2] = z;

      // Rim / Fresnel coloring: points on the silhouette edge glow brighter white-cyan
      const distFromCenterXY = Math.sqrt(x * x + py * py) / r;
      if (distFromCenterXY > 0.82) {
        colors[ptr * 3] = colorRimWhite.r;
        colors[ptr * 3 + 1] = colorRimWhite.g;
        colors[ptr * 3 + 2] = colorRimWhite.b;
      } else {
        const c = distFromCenterXY > 0.6 ? colorMint : colorEmerald;
        colors[ptr * 3] = c.r;
        colors[ptr * 3 + 1] = c.g;
        colors[ptr * 3 + 2] = c.b;
      }

      randoms[ptr] = Math.random();
      ptr++;
    }

    // 2. Generate Inner React Logo: Nucleus
    for (let i = 0; i < nucCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.26;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      homePositions[ptr * 3] = x;
      homePositions[ptr * 3 + 1] = y;
      homePositions[ptr * 3 + 2] = z;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = y;
      positions[ptr * 3 + 2] = z;

      colors[ptr * 3] = colorCyan.r;
      colors[ptr * 3 + 1] = colorCyan.g;
      colors[ptr * 3 + 2] = colorCyan.b;

      randoms[ptr] = Math.random();
      ptr++;
    }

    // 3. Generate Inner React Logo: 3 Orbital Ellipses (0°, 60°, 120°)
    const pointsPerRing = 700;
    const angles = [0, Math.PI / 3, (2 * Math.PI) / 3];

    for (let rIdx = 0; rIdx < 3; rIdx++) {
      const rotZ = angles[rIdx];
      const cosR = Math.cos(rotZ);
      const sinR = Math.sin(rotZ);

      for (let i = 0; i < pointsPerRing; i++) {
        const t = (i / pointsPerRing) * Math.PI * 2;
        const a = 0.88;
        const b = 0.35;

        const x0 = a * Math.cos(t);
        const y0 = b * Math.sin(t);

        // Volumetric thickness
        const jitter = (Math.random() - 0.5) * 0.035;
        const zJitter = (Math.random() - 0.5) * 0.035;

        const x = (x0 + jitter) * cosR - (y0 + jitter) * sinR;
        const y = (x0 + jitter) * sinR + (y0 + jitter) * cosR;
        const z = zJitter;

        homePositions[ptr * 3] = x;
        homePositions[ptr * 3 + 1] = y;
        homePositions[ptr * 3 + 2] = z;

        positions[ptr * 3] = x;
        positions[ptr * 3 + 1] = y;
        positions[ptr * 3 + 2] = z;

        // Alternating cyan and bright emerald
        const c = i % 2 === 0 ? colorCyan : colorMint;
        colors[ptr * 3] = c.r;
        colors[ptr * 3 + 1] = c.g;
        colors[ptr * 3 + 2] = c.b;

        randoms[ptr] = Math.random();
        ptr++;
      }
    }

    // 4. Subtle Outer Cosmic Dust
    for (let i = 0; i < dustCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.76 + Math.random() * 0.35;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      homePositions[ptr * 3] = x;
      homePositions[ptr * 3 + 1] = y;
      homePositions[ptr * 3 + 2] = z;

      positions[ptr * 3] = x;
      positions[ptr * 3 + 1] = y;
      positions[ptr * 3 + 2] = z;

      colors[ptr * 3] = colorRimWhite.r * 0.6;
      colors[ptr * 3 + 1] = colorRimWhite.g * 0.6;
      colors[ptr * 3 + 2] = colorRimWhite.b * 0.6;

      randoms[ptr] = Math.random();
      ptr++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const isMobile = window.innerWidth < 600;
    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.052 : 0.044,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.96
    });

    const particlesMesh = new THREE.Points(geometry, material);
    rootGroup.add(particlesMesh);

    // ─────────────────────────────────────────────────────────────
    // INTERACTIVE CURSOR REPULSION & SPRING REUNITE PHYSICS
    // ─────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mouseWorld = new THREE.Vector3(-9999, -9999, 0);
    const mouseLocal = new THREE.Vector3(-9999, -9999, 0);
    const invMatrix = new THREE.Matrix4();
    let isMouseActive = false;

    // Pointer Inertia Tilt
    let tiltX = 0;
    let tiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const updatePointerCoords = (clientX, clientY) => {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;

      tiltX = ndcX * 0.45;
      tiltY = ndcY * 0.45;

      raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
      raycaster.ray.intersectPlane(planeZ, mouseWorld);
      isMouseActive = true;
    };

    const handlePointerMove = (e) => {
      updatePointerCoords(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      isMouseActive = false;
      mouseWorld.set(-9999, -9999, 0);
      tiltX = 0;
      tiltY = 0;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePointerCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isMouseActive = false;
      mouseWorld.set(-9999, -9999, 0);
      tiltX = 0;
      tiltY = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const asp = w / h;
      camera.aspect = asp;
      camera.position.z = getCameraZ(asp);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', handleResize);

    // ─────────────────────────────────────────────────────────────
    // ANIMATION LOOP WITH CURSOR DISASSEMBLY & REUNITE
    // ─────────────────────────────────────────────────────────────
    let animId;
    let isWarpExit = false;
    let exitTime = 0;

    // Choreography timings:
    const DURATION_EXPLODE = 0.44; // Phase 1: Supernova explosion & particle expansion
    const DURATION_UNITE = 0.46;   // Phase 2: Gravitational reunion / convergence
    const DURATION_FORM = 0.35;    // Phase 3: Web forms as particles disperse into Hero

    triggerExitRef.current = () => {
      if (isWarpExit) return;
      isWarpExit = true;
    };

    const clock = new THREE.Clock();

    // Physics parameters (calibrated for organic particle spring feel)
    const REPEL_RADIUS = isMobile ? 0.85 : 0.72;
    const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
    const REPEL_STRENGTH = isMobile ? 0.18 : 0.15;
    const SPRING = 0.075;
    const DAMPING = 0.87;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Continuous gentle orb rotation + pointer tilt
      currentTiltX += (tiltX - currentTiltX) * 0.08;
      currentTiltY += (tiltY - currentTiltY) * 0.08;

      rootGroup.rotation.y += delta * 0.22;
      rootGroup.rotation.x = currentTiltY * 0.4;
      rootGroup.rotation.z = -currentTiltX * 0.2;

      // Transform 3D mouse into group's local coordinates
      invMatrix.copy(rootGroup.matrixWorld).invert();
      mouseLocal.copy(mouseWorld).applyMatrix4(invMatrix);

      const posArr = geometry.attributes.position.array;

      if (!isWarpExit) {
        // Normal interactive physics: cursor repels & particles spring back
        for (let i = 0; i < totalCount; i++) {
          const i3 = i * 3;
          const px = posArr[i3];
          const py = posArr[i3 + 1];
          const pz = posArr[i3 + 2];

          const hx = homePositions[i3];
          const hy = homePositions[i3 + 1];
          const hz = homePositions[i3 + 2];

          // 1. Repulsion from cursor (disassembles only around cursor)
          if (isMouseActive) {
            const dx = px - mouseLocal.x;
            const dy = py - mouseLocal.y;
            const dz = pz - mouseLocal.z;

            // Fast bounding-box precheck
            if (Math.abs(dx) < REPEL_RADIUS && Math.abs(dy) < REPEL_RADIUS && Math.abs(dz) < REPEL_RADIUS) {
              const dSq = dx * dx + dy * dy + dz * dz;
              if (dSq < REPEL_RADIUS_SQ && dSq > 0.0001) {
                const dist = Math.sqrt(dSq);
                const normDist = 1.0 - dist / REPEL_RADIUS;
                const force = normDist * normDist * REPEL_STRENGTH;

                vx[i] += (dx / dist) * force;
                vy[i] += (dy / dist) * force;
                vz[i] += (dz / dist || 0.6) * force * 1.3;
              }
            }
          }

          // 2. Elastic spring returning to home position (reunites when cursor moves away)
          vx[i] += (hx - px) * SPRING;
          vy[i] += (hy - py) * SPRING;
          vz[i] += (hz - pz) * SPRING;

          // 3. Friction damping
          vx[i] *= DAMPING;
          vy[i] *= DAMPING;
          vz[i] *= DAMPING;

          posArr[i3] = px + vx[i];
          posArr[i3 + 1] = py + vy[i];
          posArr[i3 + 2] = pz + vz[i];
        }
      } else {
        // ── EXIT CHOREOGRAPHY: EXPLOSION -> REUNION -> WEB FORMATION ──
        exitTime += delta;

        if (exitTime < DURATION_EXPLODE) {
          // PHASE 1: Supernova explosion & particle expansion outward
          const p1 = exitTime / DURATION_EXPLODE;
          const burstSpeed = Math.sin((1.0 - p1) * Math.PI * 0.5) * 22.0;

          for (let i = 0; i < totalCount; i++) {
            const i3 = i * 3;
            const px = posArr[i3];
            const py = posArr[i3 + 1];
            const pz = posArr[i3 + 2];

            const len = Math.sqrt(px * px + py * py + pz * pz) || 1.0;
            const dirX = px / len;
            const dirY = py / len;
            const dirZ = pz / len;

            posArr[i3] += dirX * burstSpeed * delta * 60 * (0.85 + randoms[i] * 0.6);
            posArr[i3 + 1] += dirY * burstSpeed * delta * 60 * (0.85 + randoms[i] * 0.6);
            posArr[i3 + 2] += dirZ * burstSpeed * delta * 60 * (0.9 + randoms[i] * 0.7);
          }
          camera.position.z += delta * 1.2;

        } else if (exitTime < DURATION_EXPLODE + DURATION_UNITE) {
          // PHASE 2: Inward gravitational pull & particle reunion in center
          const p2 = (exitTime - DURATION_EXPLODE) / DURATION_UNITE;
          const pullFactor = Math.pow(p2, 1.8) * 28.0;

          for (let i = 0; i < totalCount; i++) {
            const i3 = i * 3;
            const px = posArr[i3];
            const py = posArr[i3 + 1];
            const pz = posArr[i3 + 2];

            // Target position: tight radiant focal core in center
            const targetX = homePositions[i3] * 0.16;
            const targetY = homePositions[i3 + 1] * 0.16;
            const targetZ = homePositions[i3 + 2] * 0.16;

            const toX = targetX - px;
            const toY = targetY - py;
            const toZ = targetZ - pz;
            const dist = Math.sqrt(toX * toX + toY * toY + toZ * toZ) || 1.0;

            posArr[i3] += (toX / dist) * pullFactor * delta * 60;
            posArr[i3 + 1] += (toY / dist) * pullFactor * delta * 60;
            posArr[i3 + 2] += (toZ / dist) * pullFactor * delta * 60;
          }
          camera.position.z -= delta * 2.0;

        } else {
          // PHASE 3: United core blooms as initial web page forms
          const p3 = (exitTime - DURATION_EXPLODE - DURATION_UNITE) / DURATION_FORM;
          for (let i = 0; i < totalCount; i++) {
            const i3 = i * 3;
            const px = posArr[i3];
            const py = posArr[i3 + 1];
            const pz = posArr[i3 + 2];

            const len = Math.sqrt(px * px + py * py + pz * pz) || 1.0;
            posArr[i3] += (px / len) * 4.5 * delta * 60;
            posArr[i3 + 1] += (py / len) * 4.5 * delta * 60;
            posArr[i3 + 2] += (pz / len) * 4.5 * delta * 60;
          }
          material.opacity = Math.max(0, 1.0 - Math.pow(p3, 2.0));
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      circleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  const handleTriggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    if (triggerExitRef.current) {
      triggerExitRef.current();
    }

    // Call onEnter at the moment of particle reunion (~880ms)
    // so the initial web layout seamlessly forms out of the united core!
    setTimeout(() => {
      onEnter();
    }, 880);
  };

  return (
    <motion.div
      className="intro-splash-overlay"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1
      }}
      transition={{
        delay: isExiting ? 0.8 : 0,
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#030504',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 20px 40px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Interactive 3D WebGL Canvas Layer (Full viewport, catches mouse/touch) */}
      <div
        ref={mountRef}
        onClick={handleTriggerEnter}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer'
        }}
        title="Pasa el cursor por las partículas para desarmarlas o haz clic para ingresar"
      />

      {/* TOP HEADER: Status Pill */}
      <motion.div
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -14 : 0,
          filter: isExiting ? 'blur(8px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}
      >
        <span
          className="intro-status-pill"
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

      {/* BOTTOM CONTROLS & IDENTITY */}
      <motion.div
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? 14 : 0,
          filter: isExiting ? 'blur(8px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          maxWidth: '560px',
          width: '100%'
        }}
      >
        {/* Name Headline */}
        <h1
          className="intro-headline"
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(26px, 5vw, 42px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '6px'
          }}
        >
          Cristian Camilo Muñoz
        </h1>

        {/* Role Subtitle */}
        <p
          className="intro-subtitle"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(11px, 1.4vw, 13px)',
            color: 'var(--accent-emerald)',
            letterSpacing: '0.06em',
            marginBottom: '22px'
          }}
        >
          SOFTWARE ENGINEER & AI SYSTEMS ARCHITECT
        </p>

        {/* Interactive Enter CTA Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <button
            type="button"
            onClick={handleTriggerEnter}
            className="intro-enter-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 32px',
              borderRadius: '12px',
              background: 'var(--accent-emerald)',
              color: '#030504',
              fontFamily: 'var(--font-mono)',
              fontSize: '13.5px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 35px rgba(0, 229, 117, 0.45)',
              transition: 'transform 150ms var(--ease-out), box-shadow 150ms var(--ease-out), background-color 150ms var(--ease-out)'
            }}
          >
            <span>INGRESAR AL SISTEMA</span>
            <ArrowRight size={16} />
          </button>

          <div
            className="intro-caption"
            style={{
              marginTop: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10.5px',
              color: 'var(--text-muted)',
              letterSpacing: '0.03em'
            }}
          >
            [PASA EL CURSOR POR LA ESFERA PARA DESARMAR · CLIC PARA INICIAR]
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}



