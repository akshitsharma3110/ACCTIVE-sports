'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* --- Animated Floating Sphere with wireframe glow --- */
function GlowSphere({ position, color, size = 1, speed = 1 }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.2;
      wireRef.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[size, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.12}
          roughness={0.3}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[size * 1.2, 1]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

/* --- Animated Torus Ring --- */
function GlowRing({ position, color, size = 1.5, speed = 0.5 }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.6;
      ringRef.current.rotation.y = t * 0.3;
      ringRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
    }
  });

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[size, 0.025, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

/* --- Pulsing Energy Orb --- */
function EnergyOrb({ position, color, size = 0.3 }) {
  const orbRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (orbRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.2;
      orbRef.current.scale.set(scale, scale, scale);
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(t * 1.5 + 1) * 0.3;
      glowRef.current.scale.set(scale, scale, scale);
      glowRef.current.material.opacity = 0.06 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group position={position}>
      <mesh ref={orbRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 3, 16, 16]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

/* --- Floating Particles --- */
function Particles({ count = 400 }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#7c3aed'),
      new THREE.Color('#06d6a0'),
      new THREE.Color('#f72585'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* --- DNA-like Helix Line --- */
function HelixLine({ color = '#00d4ff', speed = 0.3 }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * Math.PI * 4;
      pts.push(new THREE.Vector3(Math.cos(t) * 2, (i / 100) * 10 - 5, Math.sin(t) * 2));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <group ref={groupRef} position={[6, 0, -8]}>
      <line geometry={points}>
        <lineBasicMaterial color={color} transparent opacity={0.12} />
      </line>
    </group>
  );
}

/* --- Main Full-Page 3D Background Scene --- */
export default function HeroScene() {
  return (
    <Canvas
      className="bg-3d-canvas"
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.7} color="#7c3aed" />
      <pointLight position={[0, 4, -5]} intensity={0.5} color="#06d6a0" />
      <pointLight position={[-3, -4, 2]} intensity={0.3} color="#f72585" />

      {/* Floating Spheres */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <GlowSphere position={[-3.5, 1.5, -2]} color="#00d4ff" size={0.9} speed={0.5} />
      </Float>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.7}>
        <GlowSphere position={[4, -1.5, -1.5]} color="#7c3aed" size={1.1} speed={0.35} />
      </Float>

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <GlowSphere position={[0, 3, -3.5]} color="#06d6a0" size={0.65} speed={0.7} />
      </Float>

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
        <GlowSphere position={[-5, -2, -4]} color="#f72585" size={0.5} speed={0.6} />
      </Float>

      {/* Glowing Rings */}
      <GlowRing position={[-2.5, -1.5, -1.5]} color="#00d4ff" size={1.3} speed={0.25} />
      <GlowRing position={[3, 2, -2.5]} color="#7c3aed" size={1.1} speed={0.4} />
      <GlowRing position={[0, 0, -5]} color="#06d6a0" size={2.2} speed={0.15} />
      <GlowRing position={[-4, 3, -6]} color="#f72585" size={0.8} speed={0.35} />

      {/* Energy Orbs — pulsing accent points */}
      <Float speed={2} floatIntensity={1}>
        <EnergyOrb position={[2, 3, -2]} color="#00d4ff" size={0.15} />
      </Float>
      <Float speed={1.8} floatIntensity={0.8}>
        <EnergyOrb position={[-3, -3, -1]} color="#7c3aed" size={0.12} />
      </Float>
      <Float speed={2.2} floatIntensity={1.2}>
        <EnergyOrb position={[5, -2, -3]} color="#06d6a0" size={0.1} />
      </Float>
      <Float speed={1.5} floatIntensity={0.6}>
        <EnergyOrb position={[-1, 4, -4]} color="#f72585" size={0.13} />
      </Float>

      {/* Helix decorations */}
      <HelixLine color="#00d4ff" speed={0.2} />

      {/* Multi-color particles */}
      <Particles count={500} />

      {/* Stars field */}
      <Stars radius={20} depth={60} count={2500} factor={3.5} saturation={0.3} fade speed={0.8} />
    </Canvas>
  );
}
