import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Sphere, Torus, Octahedron, Box, MeshDistortMaterial, Sparkles, Cylinder } from '@react-three/drei';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export const SceneWorld: React.FC = () => {
  const { isLowPower } = useDeviceCapability();
  const { camera } = useThree();

  // Root avatar group
  const avatarGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  // Workstation group (What I Do section)
  const workstationRef = useRef<THREE.Group>(null);
  const laptopScreenRef = useRef<THREE.Mesh>(null);

  // Experience Neural Spline Nodes
  const neuralNodesRef = useRef<THREE.Group>(null);

  // Contact Hologram Transmitter
  const transmitterRef = useRef<THREE.Group>(null);

  // Scroll Progress Tracking (0 to 1 across whole page)
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / (maxScroll || 1)));
      scrollProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const { pointer } = state;
    const p = scrollProgress.current;

    // --- 1. CAMERA INTERPOLATION ACROSS 3D SECTIONS ---
    // Smooth camera z, y, and tilt depending on scroll section
    const targetCamZ = THREE.MathUtils.lerp(5.2, 6.0, Math.sin(p * Math.PI));
    const targetCamY = THREE.MathUtils.lerp(0, -0.4, p);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);

    // --- 2. AVATAR STAGE MORPHING ---
    // Stage 0 (Hero: 0 - 0.12): Center stage [0, 0, 0]
    // Stage 1 (About: 0.12 - 0.28): Left flank [-2.6, 0.2, 0.6] looking right at bio
    // Stage 2 (What I Do: 0.28 - 0.44): Right flank [2.4, -0.3, 0.4] with active workstation
    // Stage 3 (Experience: 0.44 - 0.60): Floating higher [0, 1.2, -1] observing timeline
    // Stage 4 (Projects: 0.60 - 0.76): Backstage glowing core [0, 0, -2]
    // Stage 5 (Contact: 0.85 - 1.0): Floating orbital beacon [0, -0.5, 0.5]
    let avatarX = 0;
    let avatarY = 0;
    let avatarZ = 0;
    let avatarRotY = pointer.x * 0.4;
    const avatarRotX = -pointer.y * 0.3;
    let avatarScale = 1.0;

    let workstationVisible = false;
    let neuralVisible = false;
    let transmitterVisible = false;

    if (p <= 0.12) {
      // Hero Stage
      avatarX = 0;
      avatarY = -0.1;
      avatarZ = 0;
      avatarScale = 1.0;
    } else if (p > 0.12 && p <= 0.28) {
      // About Section Pose
      const t = (p - 0.12) / 0.16;
      avatarX = THREE.MathUtils.lerp(0, -2.5, t);
      avatarY = 0.1;
      avatarZ = THREE.MathUtils.lerp(0, 0.6, t);
      avatarRotY = THREE.MathUtils.lerp(pointer.x * 0.4, 0.55 + pointer.x * 0.15, t);
      avatarScale = THREE.MathUtils.lerp(1.0, 0.88, t);
    } else if (p > 0.28 && p <= 0.44) {
      // What I Do Workstation Pose
      const t = (p - 0.28) / 0.16;
      avatarX = THREE.MathUtils.lerp(-2.5, 2.5, t);
      avatarY = -0.3;
      avatarZ = 0.3;
      avatarRotY = THREE.MathUtils.lerp(0.55, -0.45 + pointer.x * 0.15, t);
      avatarScale = 0.82;
      workstationVisible = true;
    } else if (p > 0.44 && p <= 0.60) {
      // Career Timeline Stage
      const t = (p - 0.44) / 0.16;
      avatarX = THREE.MathUtils.lerp(2.5, 0, t);
      avatarY = THREE.MathUtils.lerp(-0.3, 1.4, t);
      avatarZ = -1.2;
      avatarRotY = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      avatarScale = 0.7;
      neuralVisible = true;
    } else if (p > 0.60 && p <= 0.85) {
      // Projects & Skills Stage
      avatarX = 0;
      avatarY = 0;
      avatarZ = -2.2;
      avatarScale = 0.65;
      avatarRotY = state.clock.elapsedTime * 0.2;
    } else {
      // Contact Section Stage
      const t = (p - 0.85) / 0.15;
      avatarX = 0;
      avatarY = THREE.MathUtils.lerp(0, -0.4, t);
      avatarZ = THREE.MathUtils.lerp(-2.2, 0.8, t);
      avatarScale = 0.95;
      transmitterVisible = true;
    }

    if (avatarGroupRef.current) {
      avatarGroupRef.current.position.x = THREE.MathUtils.lerp(avatarGroupRef.current.position.x, avatarX, 0.07);
      avatarGroupRef.current.position.y = THREE.MathUtils.lerp(avatarGroupRef.current.position.y, avatarY, 0.07);
      avatarGroupRef.current.position.z = THREE.MathUtils.lerp(avatarGroupRef.current.position.z, avatarZ, 0.07);
      avatarGroupRef.current.rotation.y = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.y, avatarRotY, 0.07);
      avatarGroupRef.current.rotation.x = THREE.MathUtils.lerp(avatarGroupRef.current.rotation.x, avatarRotX, 0.07);
      avatarGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(avatarGroupRef.current.scale.x, avatarScale, 0.07)
      );
    }

    // Continuous gyro ring rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.012;
      ring1Ref.current.rotation.y += 0.016;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= 0.014;
      ring2Ref.current.rotation.z += 0.008;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= 0.01;
      ring3Ref.current.rotation.x += 0.007;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.025;
      coreRef.current.rotation.x += 0.015;
    }

    // Update conditional section components
    if (workstationRef.current) {
      workstationRef.current.visible = workstationVisible;
      if (workstationVisible && laptopScreenRef.current) {
        laptopScreenRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }

    if (neuralNodesRef.current) {
      neuralNodesRef.current.visible = neuralVisible;
      if (neuralVisible) {
        neuralNodesRef.current.rotation.y += 0.006;
      }
    }

    if (transmitterRef.current) {
      transmitterRef.current.visible = transmitterVisible;
      if (transmitterVisible) {
        transmitterRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <>
      {/* Dynamic 3D Scene Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#c084fc" />
      <pointLight position={[-8, -6, 2]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[0, 4, -4]} intensity={1.2} color="#a855f7" />
      <spotLight
        position={[0, 10, 6]}
        intensity={2.5}
        angle={0.5}
        penumbra={1}
        color="#c084fc"
      />

      {/* Global 3D Ambient Dust & Sparkles */}
      <Sparkles
        count={isLowPower ? 40 : 120}
        scale={10}
        size={2.5}
        speed={0.35}
        color="#c084fc"
      />

      {/* MAIN 3D AVATAR CYBER BUST */}
      <group ref={avatarGroupRef} position={[0, -0.1, 0]}>
        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          {/* Central Stylized Metallic Sphere */}
          <Sphere ref={headRef} args={[1.1, 64, 64]} position={[0, 0.4, 0]}>
            <MeshDistortMaterial
              color="#8b5cf6"
              distort={0.28}
              speed={2.2}
              roughness={0.15}
              metalness={0.88}
              emissive="#3b0764"
              emissiveIntensity={0.7}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </Sphere>

          {/* Central Glowing Cyber Crystal Core */}
          <Octahedron ref={coreRef} args={[0.55]} position={[0, 0.4, 0]}>
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.4}
              wireframe
            />
          </Octahedron>

          {/* Triple Gyroscope Neon Orbit Rings */}
          <Torus ref={ring1Ref} args={[1.65, 0.022, 16, 100]} position={[0, 0.4, 0]}>
            <meshStandardMaterial
              color="#c084fc"
              emissive="#a855f7"
              emissiveIntensity={1.2}
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>

          <Torus ref={ring2Ref} args={[1.95, 0.018, 16, 100]} position={[0, 0.4, 0]}>
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.9}
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>

          <Torus ref={ring3Ref} args={[2.25, 0.014, 16, 100]} position={[0, 0.4, 0]}>
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#d97706"
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </Torus>

          {/* Floating Cyber Workstation Desk (What I Do stage) */}
          <group ref={workstationRef} position={[0, -1.2, 0.5]} visible={false}>
            <Box args={[2.8, 0.08, 1.2]}>
              <meshStandardMaterial color="#0f0c1d" roughness={0.3} metalness={0.85} />
            </Box>
            <Box args={[1.2, 0.04, 0.8]} position={[0, 0.06, 0]}>
              <meshStandardMaterial color="#1e1938" metalness={0.9} roughness={0.2} />
            </Box>
            <Box ref={laptopScreenRef} args={[1.2, 0.8, 0.04]} position={[0, 0.46, -0.38]} rotation={[-0.2, 0, 0]}>
              <meshStandardMaterial
                color="#050508"
                emissive="#8b5cf6"
                emissiveIntensity={1.2}
              />
            </Box>
          </group>
        </Float>
      </group>

      {/* Neural Spline Network Stage (Experience) */}
      <group ref={neuralNodesRef} position={[0, 0, -1]} visible={false}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2;
          const r = 2.4;
          return (
            <group key={i} position={[Math.cos(angle) * r, Math.sin(angle) * 1.5, Math.sin(angle * 2) * 0.8]}>
              <Sphere args={[0.12, 16, 16]}>
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
              </Sphere>
            </group>
          );
        })}
      </group>

      {/* Hologram Transmitter Beacon (Contact Stage) */}
      <group ref={transmitterRef} position={[0, -1.8, 0]} visible={false}>
        <Cylinder args={[1.4, 1.6, 0.2, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#120e24" metalness={0.9} roughness={0.2} />
        </Cylinder>
        <Torus args={[1.2, 0.03, 16, 64]} position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} />
        </Torus>
      </group>
    </>
  );
};
