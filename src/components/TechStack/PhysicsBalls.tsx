import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, BallCollider, RapierRigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData } from '../../data/portfolioData';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

function PhysicsBall({
  name,
  color,
  textColor,
  position
}: {
  name: string;
  color: string;
  textColor: string;
  position: [number, number, number];
}) {
  const rigidRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Keep them gently pushed towards the center
    if (rigidRef.current) {
      const trans = rigidRef.current.translation();
      rigidRef.current.applyImpulse(
        {
          x: -trans.x * 0.05,
          y: -trans.y * 0.05,
          z: -trans.z * 0.05
        },
        true
      );
    }
  });

  return (
    <RigidBody
      ref={rigidRef}
      position={position}
      colliders={false}
      restitution={0.8}
      friction={0.2}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <BallCollider args={[0.65]} />
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          if (rigidRef.current) {
            rigidRef.current.applyImpulse(
              {
                x: (Math.random() - 0.5) * 3,
                y: Math.random() * 3,
                z: (Math.random() - 0.5) * 2
              },
              true
            );
          }
        }}
      >
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.25}
        />
        <Text
          position={[0, 0, 0.68]}
          fontSize={0.2}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {name}
        </Text>
      </mesh>
    </RigidBody>
  );
}

function PointerAttractor() {
  const rigidRef = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (rigidRef.current) {
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      rigidRef.current.setNextKinematicTranslation({ x, y, z: 0 });
    }
  });

  return (
    <RigidBody ref={rigidRef} type="kinematicPosition" colliders={false}>
      <BallCollider args={[0.9]} />
    </RigidBody>
  );
}

export const PhysicsBallsCanvas: React.FC = () => {
  const { isLowPower, pixelRatio } = useDeviceCapability();
  const balls = portfolioData.skills.physicsBalls;

  return (
    <div className="physics-canvas-container">
      <div className="physics-interactive-hint">
        <span>✨ HOVER OR DRAG TO BOUNCE TECH SPHERES</span>
      </div>
      <Canvas
        dpr={pixelRatio}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: !isLowPower, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#38bdf8" />

        <Physics gravity={[0, 0, 0]}>
          <PointerAttractor />
          {balls.map((b, i) => {
            const angle = (i / balls.length) * Math.PI * 2;
            const r = 2.2 + (i % 2) * 0.8;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <PhysicsBall
                key={b.name}
                name={b.name}
                color={b.color}
                textColor={b.textColor}
                position={[x, y, (Math.random() - 0.5) * 1.5]}
              />
            );
          })}
        </Physics>
      </Canvas>
    </div>
  );
};
