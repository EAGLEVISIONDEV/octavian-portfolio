"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";
import { orbitLabels } from "@/lib/data";

function Saturn() {
  const group = useRef<Group>(null);
  const ring = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
    if (ring.current) ring.current.rotation.z += delta * 0.05;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group} position={[0.35, 0.05, 0]} rotation={[0.35, -0.25, 0.1]}>
        <mesh>
          <sphereGeometry args={[1.15, 48, 48]} />
          <meshStandardMaterial
            color="#7dd3c0"
            roughness={0.35}
            metalness={0.45}
            emissive="#0f766e"
            emissiveIntensity={0.22}
          />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[1.15, 32, 32]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.08} />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.15, 0.15, 0]}>
          <torusGeometry args={[1.85, 0.08, 2, 100]} />
          <meshStandardMaterial
            color="#94a3b8"
            emissive="#38bdf8"
            emissiveIntensity={0.35}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.15, 0.15, 0]}>
          <torusGeometry args={[2.15, 0.035, 2, 100]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.6}
            roughness={0.4}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 5, 3]} intensity={1.15} color="#e2e8f0" />
      <pointLight position={[-3, 2, 2]} intensity={0.9} color="#5eead4" />
      <pointLight position={[2, -1, 3]} intensity={0.45} color="#38bdf8" />
      <Saturn />
      <Sparkles count={36} scale={[11, 7, 7]} size={2} speed={0.25} color="#5eead4" opacity={0.45} />
    </>
  );
}

export function HeroScene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="orbit-ring relative h-[min(72vw,420px)] w-[min(72vw,420px)] lg:h-[460px] lg:w-[460px]">
          {orbitLabels.map((label, i) => {
            const angle = (360 / orbitLabels.length) * i;
            return (
              <span
                key={label}
                className="orbit-item absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#0b0f16]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur-md sm:text-[11px]"
                style={{ ["--a" as string]: `${angle}deg` }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
