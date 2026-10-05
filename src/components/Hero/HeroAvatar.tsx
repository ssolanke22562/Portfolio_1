import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sphere, Torus, Octahedron, MeshDistortMaterial, Box } from '@react-three/drei';

export const HeroAvatar: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRing1Ref = useRef<THREE.Mesh>(null);
  const outerRing2Ref = useRef<THREE.Mesh>(null);
  const deskGroupRef = useRef<THREE.Group>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);

  // Scroll interpolation target values
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY / (maxScroll || 1);
      scrollProgress.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const { pointer } = state;
    const progress = scrollProgress.current;

    // Calculate target transforms based on scroll stage:
    // Stage 0 (Hero, scroll < 0.1): Centered at [0, -0.2, 0]
    // Stage 1 (About, scroll ~ 0.15 - 0.3): Shifted to left [-2.5, -0.2, 0.4], rotated toward right text
    // Stage 2 (What I Do, scroll > 0.3): Shifted with workstation desk active
    let targetX = 0;
    let targetY = -0.2;
    let targetZ = 0;
    let targetRotY = pointer.x * 0.45;
    const targetRotX = -pointer.y * 0.35;
    let targetScale = 1.0;

    if (progress > 0.04 && progress <= 0.28) {
      // About Section Pose
      const t = (progress - 0.04) / 0.18;
      targetX = THREE.MathUtils.lerp(0, -2.6, Math.min(t, 1));
      targetY = -0.2;
      targetZ = THREE.MathUtils.lerp(0, 0.5, Math.min(t, 1));
      targetRotY = THREE.MathUtils.lerp(pointer.x * 0.45, 0.45 + pointer.x * 0.2, Math.min(t, 1));
      targetScale = THREE.MathUtils.lerp(1.0, 0.88, Math.min(t, 1));
    } else if (progress > 0.28) {
      // What I Do / Workstation Pose
      targetX = THREE.MathUtils.lerp(-2.6, 2.4, Math.min((progress - 0.28) / 0.2, 1));
      targetY = -0.4;
      targetZ = 0.2;
      targetRotY = THREE.MathUtils.lerp(0.45, -0.35 + pointer.x * 0.2, Math.min((progress - 0.28) / 0.2, 1));
      targetScale = 0.82;
    }

    // Smooth lerp group transforms
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.06);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.06);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.06)
      );
    }

    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.x += 0.008;
      outerRing1Ref.current.rotation.y += 0.012;
    }

    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.y -= 0.01;
      outerRing2Ref.current.rotation.z += 0.006;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += 0.02;
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += 0.008;
    }

    if (deskGroupRef.current) {
      // Fade in cyber desk on scroll
      const deskOpacity = progress > 0.25 ? 1 : 0;
      deskGroupRef.current.visible = deskOpacity > 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.7}>
        {/* Core Stylized Avatar Head / Orb */}
        <Sphere ref={headRef} args={[1.15, 64, 64]} position={[0, 0.4, 0]}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.28}
            speed={2}
            roughness={0.2}
            metalness={0.85}
            emissive="#4c1d95"
            emissiveIntensity={0.6}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>

        {/* Central Geometric Cyber-Core */}
        <Octahedron ref={innerCoreRef} args={[0.55]} position={[0, 0.4, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={1.2}
            wireframe
          />
        </Octahedron>

        {/* Outer Orbiting Gyroscope Rings */}
        <Torus ref={outerRing1Ref} args={[1.7, 0.022, 16, 100]} position={[0, 0.4, 0]}>
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>

        <Torus ref={outerRing2Ref} args={[2.0, 0.018, 16, 100]} position={[0, 0.4, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </Torus>

        {/* Orbiting Tech Particles */}
        <group ref={orbitGroupRef} position={[0, 0.4, 0]}>
          <Sphere args={[0.09, 16, 16]} position={[2.3, 0.4, 0.5]}>
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
          </Sphere>
          <Sphere args={[0.12, 16, 16]} position={[-2.2, -0.6, -0.8]}>
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
          </Sphere>
          <Sphere args={[0.07, 16, 16]} position={[0.8, 2.1, -1.2]}>
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2} />
          </Sphere>
          <Sphere args={[0.08, 16, 16]} position={[-1.4, 1.8, 1.1]}>
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
          </Sphere>
        </group>

        {/* Workstation Desk & Holographic Keyboard (Stage 2) */}
        <group ref={deskGroupRef} position={[0, -1.2, 0.6]}>
          <Box args={[2.8, 0.08, 1.2]}>
            <meshStandardMaterial color="#120e24" roughness={0.3} metalness={0.8} />
          </Box>
          {/* Laptop Base & Screen */}
          <Box args={[1.2, 0.04, 0.8]} position={[0, 0.06, 0]}>
            <meshStandardMaterial color="#1e1938" metalness={0.9} roughness={0.2} />
          </Box>
          <Box args={[1.2, 0.8, 0.04]} position={[0, 0.46, -0.38]} rotation={[-0.2, 0, 0]}>
            <meshStandardMaterial
              color="#050508"
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
            />
          </Box>
        </group>
      </Float>
    </group>
  );
};
