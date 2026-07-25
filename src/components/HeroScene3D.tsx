"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import { orbitLabels } from "@/lib/data";

/** Saturn body + blue ring; labels ride on the ring and spin with it. */
function Saturn() {
  const body = useRef<Group>(null);
  const ringSystem = useRef<Group>(null);

  useFrame((_, delta) => {
    if (body.current) body.current.rotation.y += delta * 0.18;
    if (ringSystem.current) ringSystem.current.rotation.z += delta * 0.35;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group position={[0.85, 0.1, 0]} rotation={[0.48, -0.28, 0.1]} scale={1.15}>
        {/* Planet */}
        <group ref={body}>
          <mesh>
            <sphereGeometry args={[1.12, 48, 48]} />
            <meshStandardMaterial
              color="#6fc4b4"
              roughness={0.35}
              metalness={0.45}
              emissive="#0f766e"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh scale={1.07}>
            <sphereGeometry args={[1.12, 32, 32]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.07} />
          </mesh>
        </group>

        {/* Blue ring plane — spins; labels placed on this circle */}
        <group ref={ringSystem} rotation={[Math.PI / 2.05, 0.12, 0]}>
          {/* Main blue ring */}
          <mesh>
            <torusGeometry args={[1.95, 0.09, 3, 128]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.65}
              metalness={0.75}
              roughness={0.25}
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* Outer glow ring */}
          <mesh>
            <torusGeometry args={[2.28, 0.04, 2, 128]} />
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#0ea5e9"
              emissiveIntensity={0.4}
              metalness={0.5}
              roughness={0.35}
              transparent
              opacity={0.55}
            />
          </mesh>

          {orbitLabels.map((label, i) => {
            const angle = (i / orbitLabels.length) * Math.PI * 2;
            const radius = 1.95;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <Html
                key={label}
                position={[x, y, 0]}
                center
                distanceFactor={7.5}
                style={{ pointerEvents: "none" }}
              >
                <span className="whitespace-nowrap rounded-full border border-sky-400/40 bg-[#071018]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.35)] backdrop-blur-sm sm:text-[10px]">
                  {label}
                </span>
              </Html>
            );
          })}
        </group>
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
      <pointLight position={[2, -1, 3]} intensity={0.55} color="#38bdf8" />
      <Saturn />
      <Sparkles count={36} scale={[11, 7, 7]} size={2} speed={0.25} color="#5eead4" opacity={0.45} />
    </>
  );
}

export function HeroScene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 5.5], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
