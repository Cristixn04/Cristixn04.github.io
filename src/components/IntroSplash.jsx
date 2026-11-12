import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';
import { ArrowRight } from 'lucide-react';

export default function IntroSplash({ onEnter }) {
  const [isExiting, setIsExiting] = useState(false);
  const mountRef = useRef(null);
  const triggerWarpRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const aspect = width / height;

    const calculateCameraZ = (asp) => {
      // Dynamic camera distance: keeps the full orb, outer halo and React atom 100% in view on any screen
      return asp < 1.0 ? Math.max(4.6, 4.6 / Math.pow(asp, 0.88)) : 4.6;
    };

    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    camera.position.z = calculateCameraZ(aspect);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Main 3D Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Subgroup for the Outer Particle Orb (sways with organic rotation)
    const orbGroup = new THREE.Group();
    rootGroup.add(orbGroup);

    // Subgroup for the Inner React Atom Logo
    const reactLogoGroup = new THREE.Group();
    rootGroup.add(reactLogoGroup);

    // ─────────────────────────────────────────────────────────────
    // 1. OUTER PARTICLE ORB (Fibonacci Sphere Shell with Rim Glow)
    // ─────────────────────────────────────────────────────────────
    const orbCount = 8200;
    const orbPositions = new Float32Array(orbCount * 3);
    const orbRandoms = new Float32Array(orbCount);
    const orbSizes = new Float32Array(orbCount);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const phi = 2 * Math.PI * (1 - 1 / goldenRatio); // ~2.39996 rad

    for (let i = 0; i < orbCount; i++) {
      const y = 1 - (i / (orbCount - 1)) * 2; // from 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      // Base radius ~1.78 with micro volumetric variations
      const r = 1.78 + (Math.random() - 0.5) * 0.08;

      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;
      const py = y * r;

      orbPositions[i * 3] = x;
      orbPositions[i * 3 + 1] = py;
      orbPositions[i * 3 + 2] = z;

      orbRandoms[i] = Math.random();
      orbSizes[i] = 0.75 + Math.random() * 0.55;
    }

    const orbGeometry = new THREE.BufferGeometry();
    orbGeometry.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3));
    orbGeometry.setAttribute('aRandom', new THREE.BufferAttribute(orbRandoms, 1));
    orbGeometry.setAttribute('aSize', new THREE.BufferAttribute(orbSizes, 1));

    const orbShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uWarp: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBaseSize: { value: 6.8 },
        uColorBase: { value: new THREE.Color('#00e575') },
        uColorRim: { value: new THREE.Color('#e0fff5') }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uWarp;
        uniform float uPixelRatio;
        uniform float uBaseSize;

        attribute float aRandom;
        attribute float aSize;

        varying float vRim;
        varying float vAlpha;
        varying float vRandom;

        void main() {
          vRandom = aRandom;
          vec3 pos = position;
          vec3 norm = normalize(pos);

          // Multi-frequency organic wave ripple displacement
          float w1 = sin(norm.x * 4.2 + uTime * 1.1) * cos(norm.y * 3.8 + uTime * 0.9);
          float w2 = sin(norm.z * 5.2 - uTime * 1.3) * 0.45;
          pos += norm * ((w1 + w2) * 0.05);

          // Warp hyperdrive expansion on enter click
          if (uWarp > 0.0) {
            float burst = pow(uWarp, 2.2) * (15.0 + aRandom * 14.0);
            pos += norm * burst;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Rim / Fresnel Lighting: grazing particles glow brighter (Motion Orb effect)
          vec3 viewNorm = normalize(normalMatrix * norm);
          vec3 viewDir = normalize(-mvPosition.xyz);
          float rim = 1.0 - abs(dot(viewNorm, viewDir));
          vRim = pow(rim, 2.3);

          float sizeMultiplier = (1.0 + uWarp * 2.2);
          gl_PointSize = (uBaseSize * aSize * sizeMultiplier * uPixelRatio) * (120.0 / -mvPosition.z);
          vAlpha = (1.0 - smoothstep(0.70, 1.0, uWarp));
        }
      `,
      fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorRim;
        uniform float uWarp;

        varying float vRim;
        varying float vAlpha;
        varying float vRandom;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float soft = smoothstep(0.5, 0.06, dist);
          vec3 color = mix(uColorBase, uColorRim, vRim * 0.88);
          float alphaRim = mix(0.38, 0.96, vRim);

          gl_FragColor = vec4(color, soft * alphaRim * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const orbMesh = new THREE.Points(orbGeometry, orbShaderMaterial);
    orbGroup.add(orbMesh);

    // ─────────────────────────────────────────────────────────────
    // 2. OUTER AMBIENT STARDUST HALO (Atmospheric depth mist)
    // ─────────────────────────────────────────────────────────────
    const haloCount = 1800;
    const haloPositions = new Float32Array(haloCount * 3);
    const haloRandoms = new Float32Array(haloCount);
    const haloSizes = new Float32Array(haloCount);

    for (let i = 0; i < haloCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiH = Math.acos(2.0 * v - 1.0);
      const r = 1.70 + Math.random() * 0.42;

      const sinPhi = Math.sin(phiH);
      haloPositions[i * 3] = r * sinPhi * Math.cos(theta);
      haloPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      haloPositions[i * 3 + 2] = r * Math.cos(phiH);

      haloRandoms[i] = Math.random();
      haloSizes[i] = 0.5 + Math.random() * 0.6;
    }

    const haloGeometry = new THREE.BufferGeometry();
    haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
    haloGeometry.setAttribute('aRandom', new THREE.BufferAttribute(haloRandoms, 1));
    haloGeometry.setAttribute('aSize', new THREE.BufferAttribute(haloSizes, 1));

    const haloMesh = new THREE.Points(haloGeometry, orbShaderMaterial);
    orbGroup.add(haloMesh);

    // ─────────────────────────────────────────────────────────────
    // 3. INNER REACT ATOM LOGO (Luminous Central Nucleus + 3 Orbitals)
    // ─────────────────────────────────────────────────────────────
    // A) Central Nucleus cluster
    const nucCount = 650;
    const nucPositions = new Float32Array(nucCount * 3);
    const nucRandoms = new Float32Array(nucCount);
    const nucProgress = new Float32Array(nucCount);

    for (let i = 0; i < nucCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phiN = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.28;

      const sinPhi = Math.sin(phiN);
      nucPositions[i * 3] = r * sinPhi * Math.cos(theta);
      nucPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      nucPositions[i * 3 + 2] = r * Math.cos(phiN);

      nucRandoms[i] = Math.random();
      nucProgress[i] = Math.random();
    }

    // B) 3 Orbital Elliptical Rings (0°, 60°, 120°)
    const ringPointsPerOrbital = 1100;
    const totalRingPoints = ringPointsPerOrbital * 3;
    const ringPositions = new Float32Array(totalRingPoints * 3);
    const ringRandoms = new Float32Array(totalRingPoints);
    const ringProgress = new Float32Array(totalRingPoints);

    const orbitAngles = [0, Math.PI / 3, (2 * Math.PI) / 3];
    let ringPtr = 0;

    for (let rIdx = 0; rIdx < 3; rIdx++) {
      const rotZ = orbitAngles[rIdx];
      const cosRot = Math.cos(rotZ);
      const sinRot = Math.sin(rotZ);

      for (let i = 0; i < ringPointsPerOrbital; i++) {
        const t = (i / ringPointsPerOrbital) * Math.PI * 2 + (Math.random() - 0.5) * 0.035;
        const a = 0.88;
        const b = 0.36;

        const x0 = a * Math.cos(t);
        const y0 = b * Math.sin(t);

        // Subtle 3D thickness and volumetric jitter
        const jitter = (Math.random() - 0.5) * 0.04;
        const zJitter = (Math.random() - 0.5) * 0.04;

        const x = (x0 + jitter) * cosRot - (y0 + jitter) * sinRot;
        const y = (x0 + jitter) * sinRot + (y0 + jitter) * cosRot;
        const z = zJitter;

        ringPositions[ringPtr * 3] = x;
        ringPositions[ringPtr * 3 + 1] = y;
        ringPositions[ringPtr * 3 + 2] = z;

        ringRandoms[ringPtr] = Math.random();
        ringProgress[ringPtr] = i / ringPointsPerOrbital;
        ringPtr++;
      }
    }

    // Combine Nucleus + 3 Orbitals into one unified React BufferGeometry
    const totalReactCount = nucCount + totalRingPoints;
    const reactPositions = new Float32Array(totalReactCount * 3);
    const reactRandoms = new Float32Array(totalReactCount);
    const reactProgressArray = new Float32Array(totalReactCount);

    reactPositions.set(nucPositions, 0);
    reactPositions.set(ringPositions, nucPositions.length);

    reactRandoms.set(nucRandoms, 0);
    reactRandoms.set(ringRandoms, nucRandoms.length);

    reactProgressArray.set(nucProgress, 0);
    reactProgressArray.set(ringProgress, nucProgress.length);

    const reactGeometry = new THREE.BufferGeometry();
    reactGeometry.setAttribute('position', new THREE.BufferAttribute(reactPositions, 3));
    reactGeometry.setAttribute('aRandom', new THREE.BufferAttribute(reactRandoms, 1));
    reactGeometry.setAttribute('aProgress', new THREE.BufferAttribute(reactProgressArray, 1));

    const reactShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uWarp: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBaseSize: { value: 6.6 },
        uColorCore: { value: new THREE.Color('#00f5ff') },
        uColorAccent: { value: new THREE.Color('#00e575') }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uWarp;
        uniform float uPixelRatio;
        uniform float uBaseSize;

        attribute float aRandom;
        attribute float aProgress;

        varying float vAlpha;
        varying float vProgress;

        void main() {
          vProgress = aProgress;
          vec3 pos = position;
          vec3 dir = normalize(pos);
          if (length(pos) < 0.001) dir = vec3(0.0, 0.0, 1.0);

          // Subtle harmonic breathing along orbit
          pos += dir * (sin(uTime * 2.4 + aProgress * 6.28318) * 0.016);

          // Warp burst outwards during exit
          if (uWarp > 0.0) {
            float burst = pow(uWarp, 2.0) * (18.0 + aRandom * 14.0);
            pos += dir * burst;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          float sizeMultiplier = (1.0 + uWarp * 2.8);
          gl_PointSize = (uBaseSize * (0.8 + 0.4 * aRandom) * sizeMultiplier * uPixelRatio) * (120.0 / -mvPosition.z);
          vAlpha = (1.0 - smoothstep(0.68, 1.0, uWarp));
        }
      `,
      fragmentShader: `
        uniform vec3 uColorCore;
        uniform vec3 uColorAccent;
        uniform float uWarp;

        varying float vAlpha;
        varying float vProgress;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float soft = smoothstep(0.5, 0.06, dist);
          vec3 col = mix(uColorCore, uColorAccent, sin(vProgress * 3.14159) * 0.45);

          gl_FragColor = vec4(col, soft * 0.96 * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const reactMesh = new THREE.Points(reactGeometry, reactShaderMaterial);
    reactLogoGroup.add(reactMesh);

    // ─────────────────────────────────────────────────────────────
    // 4. INTERACTION, INERTIA & RESIZE HANDLING
    // ─────────────────────────────────────────────────────────────
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = x * 0.65;
      targetY = y * 0.65;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetX = x * 0.65;
        targetY = y * 0.65;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const asp = w / h;
      camera.aspect = asp;
      camera.position.z = calculateCameraZ(asp);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const pr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(pr);
      orbShaderMaterial.uniforms.uPixelRatio.value = pr;
      reactShaderMaterial.uniforms.uPixelRatio.value = pr;
    };
    window.addEventListener('resize', handleResize);

    // ─────────────────────────────────────────────────────────────
    // 5. ANIMATION LOOP & HYPERDRIVE WARP TRANSITION
    // ─────────────────────────────────────────────────────────────
    let animId;
    let isWarping = false;
    let warpProgress = 0;
    const WARP_DURATION = 0.72; // Duration of radial particle expansion

    triggerWarpRef.current = () => {
      if (isWarping) return;
      isWarping = true;
    };

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update shader time uniforms for wave dynamics
      orbShaderMaterial.uniforms.uTime.value = elapsedTime;
      reactShaderMaterial.uniforms.uTime.value = elapsedTime;

      // Smooth inertia following pointer / touch
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Outer Orb organic rotation
      orbGroup.rotation.y = elapsedTime * 0.22 + currentX * 0.45;
      orbGroup.rotation.x = currentY * 0.4;

      // Inner React Logo independent orbit & gentle 3D tilt
      reactLogoGroup.rotation.y = -elapsedTime * 0.18 + currentX * 0.35;
      reactLogoGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.12;
      reactLogoGroup.rotation.x = currentY * 0.35;

      // Position centering with responsive dampening
      const isPortrait = window.innerWidth / window.innerHeight < 1.0;
      rootGroup.position.x = currentX * (isPortrait ? 0.3 : 0.85);
      rootGroup.position.y = currentY * (isPortrait ? 0.35 : 0.85);

      // Hyperjump Warp Transition Progress
      if (isWarping) {
        warpProgress = Math.min(1.0, warpProgress + delta / WARP_DURATION);
        // Exponential acceleration curve for cinematic warp feel
        const warpEased = Math.pow(warpProgress, 1.85);
        orbShaderMaterial.uniforms.uWarp.value = warpEased;
        reactShaderMaterial.uniforms.uWarp.value = warpEased;
        camera.position.z -= delta * (warpEased * 4.2);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      orbGeometry.dispose();
      haloGeometry.dispose();
      reactGeometry.dispose();
      orbShaderMaterial.dispose();
      reactShaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const handleTriggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Trigger Three.js hyperdrive particle dispersion
    if (triggerWarpRef.current) {
      triggerWarpRef.current();
    }

    // Smooth UI exit with clean handoff to portfolio Hero
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <motion.div
      className="intro-splash-overlay"
      initial={{ opacity: 1 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.07 : 1,
        filter: isExiting ? 'blur(16px)' : 'blur(0px)'
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#040605',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Interactive 3D WebGL Canvas Anchor */}
      <div
        ref={mountRef}
        onClick={handleTriggerEnter}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer'
        }}
        title="Haz clic en la esfera de partículas para ingresar al sistema"
      />

      {/* Subtle Atmospheric Grid Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 117, 0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 117, 0.025) 1px, transparent 1px)
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
          padding: '0 20px',
          maxWidth: '680px',
          width: '100%',
          boxSizing: 'border-box'
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

        {/* Name Headline */}
        <motion.h1
          className="intro-headline"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(30px, 6vw, 62px)',
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
          className="intro-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(12px, 1.6vw, 15px)',
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
              padding: '14px 34px',
              borderRadius: '12px',
              background: 'var(--accent-emerald)',
              color: '#040605',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
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
              marginTop: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.02em'
            }}
          >
            [INTERACTÚA CON LA ESFERA O HAZ CLIC PARA DESPLEGAR]
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

