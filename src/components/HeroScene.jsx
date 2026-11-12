import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold meshes
    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner core: Icosahedron wireframe in emerald
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00e575,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 2. Outer cage: Dodecahedron wireframe in deep sage
    const outerGeo = new THREE.DodecahedronGeometry(2.3, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 3. Dynamic Particle System (vertices + cosmic scatter nodes)
    const innerPosAttr = innerGeo.getAttribute('position');
    const outerPosAttr = outerGeo.getAttribute('position');

    const totalParticles = innerPosAttr.count + outerPosAttr.count + 180;
    const particlePositions = new Float32Array(totalParticles * 3);
    const originPositions = new Float32Array(totalParticles * 3);
    const scatterVectors = new Float32Array(totalParticles * 3);
    const scatterDistances = new Float32Array(totalParticles);

    let pIdx = 0;

    // Add inner vertices
    for (let i = 0; i < innerPosAttr.count; i++) {
      const x = innerPosAttr.getX(i);
      const y = innerPosAttr.getY(i);
      const z = innerPosAttr.getZ(i);

      originPositions[pIdx * 3] = x;
      originPositions[pIdx * 3 + 1] = y;
      originPositions[pIdx * 3 + 2] = z;

      particlePositions[pIdx * 3] = x;
      particlePositions[pIdx * 3 + 1] = y;
      particlePositions[pIdx * 3 + 2] = z;

      const v = new THREE.Vector3(x, y, z).normalize();
      v.x += (Math.random() - 0.5) * 0.8;
      v.y += (Math.random() - 0.5) * 0.8;
      v.z += (Math.random() - 0.5) * 0.8;
      v.normalize();

      scatterVectors[pIdx * 3] = v.x;
      scatterVectors[pIdx * 3 + 1] = v.y;
      scatterVectors[pIdx * 3 + 2] = v.z;
      scatterDistances[pIdx] = 3.5 + Math.random() * 4.5;
      pIdx++;
    }

    // Add outer vertices
    for (let i = 0; i < outerPosAttr.count; i++) {
      const x = outerPosAttr.getX(i);
      const y = outerPosAttr.getY(i);
      const z = outerPosAttr.getZ(i);

      originPositions[pIdx * 3] = x;
      originPositions[pIdx * 3 + 1] = y;
      originPositions[pIdx * 3 + 2] = z;

      particlePositions[pIdx * 3] = x;
      particlePositions[pIdx * 3 + 1] = y;
      particlePositions[pIdx * 3 + 2] = z;

      const v = new THREE.Vector3(x, y, z).normalize();
      v.x += (Math.random() - 0.5) * 0.9;
      v.y += (Math.random() - 0.5) * 0.9;
      v.z += (Math.random() - 0.5) * 0.9;
      v.normalize();

      scatterVectors[pIdx * 3] = v.x;
      scatterVectors[pIdx * 3 + 1] = v.y;
      scatterVectors[pIdx * 3 + 2] = v.z;
      scatterDistances[pIdx] = 4.0 + Math.random() * 5.0;
      pIdx++;
    }

    // Add satellite halo particles
    for (let i = 0; i < 180; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.4 + Math.random() * 1.0;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      originPositions[pIdx * 3] = x;
      originPositions[pIdx * 3 + 1] = y;
      originPositions[pIdx * 3 + 2] = z;

      particlePositions[pIdx * 3] = x;
      particlePositions[pIdx * 3 + 1] = y;
      particlePositions[pIdx * 3 + 2] = z;

      const dir = new THREE.Vector3(x, y, z).normalize();
      dir.x += (Math.random() - 0.5) * 1.1;
      dir.y += (Math.random() - 0.5) * 1.1;
      dir.z += (Math.random() - 0.5) * 1.1;
      dir.normalize();

      scatterVectors[pIdx * 3] = dir.x;
      scatterVectors[pIdx * 3 + 1] = dir.y;
      scatterVectors[pIdx * 3 + 2] = dir.z;
      scatterDistances[pIdx] = 5.0 + Math.random() * 6.0;
      pIdx++;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const pointsMat = new THREE.PointsMaterial({
      color: 0x00ff90,
      size: 0.075,
      transparent: true,
      opacity: 0.88
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    group.add(points);

    // Mouse tracking with momentum (lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll tracking for disassembly/reassembly
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;

    const handleScroll = () => {
      // Disassembly occurs over first 500px of scrolling down
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      targetScrollProgress = Math.min(scrollY / 450, 1.0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp of scrollProgress (elastic return when scrolling back up)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.085;

      if (!prefersReducedMotion) {
        // Continuous slow rotation around axis
        const rotSpeed = 1.0 - currentScrollProgress * 0.5;
        group.rotation.y += delta * 0.22 * rotSpeed;
        group.rotation.x += delta * 0.12 * rotSpeed;
        innerMesh.rotation.y -= delta * 0.15 * rotSpeed;

        // Disassemble / Explode into particles when scrolled down
        const positions = pointsGeo.attributes.position.array;
        const progress = currentScrollProgress;

        for (let i = 0; i < totalParticles; i++) {
          const i3 = i * 3;
          const origX = originPositions[i3];
          const origY = originPositions[i3 + 1];
          const origZ = originPositions[i3 + 2];

          if (progress < 0.002) {
            // Assembled completely: snap to exact original coordinate
            positions[i3] = origX;
            positions[i3 + 1] = origY;
            positions[i3 + 2] = origZ;
          } else {
            // Smooth non-linear cubic dispersion
            const easeP = progress * progress * (3 - 2 * progress);
            const dist = scatterDistances[i] * easeP;
            const vx = scatterVectors[i3];
            const vy = scatterVectors[i3 + 1];
            const vz = scatterVectors[i3 + 2];

            // Harmonic turbulence per particle
            const noise = Math.sin(elapsed * 1.8 + i) * 0.12 * progress;

            positions[i3] = origX + vx * dist + noise;
            positions[i3 + 1] = origY + vy * dist + noise;
            positions[i3 + 2] = origZ + vz * dist;
          }
        }
        pointsGeo.attributes.position.needsUpdate = true;

        // Scale and fade wireframe cages during disassembly
        const cageScale = 1.0 + progress * 1.6;
        innerMesh.scale.setScalar(cageScale);
        outerMesh.scale.setScalar(cageScale);

        innerMat.opacity = Math.max(0, 0.38 * (1.0 - progress * 1.4));
        outerMat.opacity = Math.max(0, 0.18 * (1.0 - progress * 1.4));
        pointsMat.opacity = Math.max(0, 0.88 * (1.0 - progress * 0.65));
        pointsMat.size = 0.075 + progress * 0.04;
      }

      // Smooth lerp towards mouse target
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      // Mouse tracking influence smoothly reduces as it disassembles and returns 100% when reassembled
      const mouseWeight = Math.max(0.1, 1.0 - currentScrollProgress * 0.7);
      group.position.x = mouseX * 0.8 * mouseWeight;
      group.position.y = mouseY * 0.8 * mouseWeight;
      group.rotation.z = mouseX * 0.2 * mouseWeight;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }

      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      pointsGeo.dispose();
      pointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-scene-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.92
      }}
    />
  );
}
