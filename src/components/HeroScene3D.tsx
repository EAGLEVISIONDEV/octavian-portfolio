"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Orb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
      <mesh ref={ref} scale={1.55} position={[0.4, 0.1, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#5eead4"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.55}
          emissive="#0f766e"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh scale={2.1} position={[0.4, 0.1, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function Rings() {
  const ref = useRef<Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.2;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0.2, 0]} position={[0.4, 0.1, 0]}>
      <torusGeometry args={[2.15, 0.02, 12, 100]} />
      <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.4} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 2]} intensity={1.1} color="#e2e8f0" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#5eead4" />
      <Orb />
      <Rings />
      <Sparkles count={28} scale={[10, 6, 6]} size={2} speed={0.3} color="#5eead4" opacity={0.4} />
    </>
  );
}

export function HeroScene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
