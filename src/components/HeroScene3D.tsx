"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, type MutableRefObject } from "react";
import type { Group, Mesh } from "three";
import { Vector3 } from "three";
import { useLocale } from "@/lib/i18n";

const PLANET_RADIUS = 1.12;
const RING_RADIUS = 1.95;

function OrbitLabel({
  label,
  angle,
  planetWorld,
}: {
  label: string;
  angle: number;
  planetWorld: MutableRefObject<Vector3>;
}) {
  const marker = useRef<Group>(null);
  const [hidden, setHidden] = useState(false);
  const tmp = useMemo(() => ({ label: new Vector3(), cam: new Vector3(), toLabel: new Vector3(), toCam: new Vector3() }), []);

  useFrame(({ camera }) => {
    if (!marker.current) return;
    marker.current.getWorldPosition(tmp.label);
    const center = planetWorld.current;

    // Hide when label is on the far side of the planet (behind the ball from camera).
    tmp.toLabel.copy(tmp.label).sub(center);
    tmp.toCam.copy(camera.position).sub(center);
    const behind = tmp.toLabel.dot(tmp.toCam) < 0;

    // Also hide if the camera→label segment comes within the planet sphere.
    tmp.cam.copy(camera.position);
    const camToLabel = tmp.label.clone().sub(tmp.cam);
    const camToCenter = center.clone().sub(tmp.cam);
    const t = Math.max(0, Math.min(1, camToCenter.dot(camToLabel) / camToLabel.lengthSq()));
    const closest = tmp.cam.clone().add(camToLabel.multiplyScalar(t));
    const intersects = closest.distanceTo(center) < PLANET_RADIUS * 0.98;

    const next = behind || intersects;
    setHidden((prev) => (prev === next ? prev : next));
  });

  const x = Math.cos(angle) * RING_RADIUS;
  const y = Math.sin(angle) * RING_RADIUS;

  return (
    <group ref={marker} position={[x, y, 0]}>
      <Html center distanceFactor={7.5} style={{ pointerEvents: "none", opacity: hidden ? 0 : 1, transition: "opacity 180ms ease" }}>
        <span
          className="whitespace-nowrap rounded-full border border-sky-400/40 bg-[#071018]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.35)] backdrop-blur-sm sm:text-[10px]"
          style={{ visibility: hidden ? "hidden" : "visible" }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Saturn() {
  const body = useRef<Group>(null);
  const ringSystem = useRef<Group>(null);
  const planetMesh = useRef<Mesh>(null);
  const root = useRef<Group>(null);
  const planetWorld = useRef(new Vector3());
  const { t } = useLocale();

  useFrame((_, delta) => {
    if (body.current) body.current.rotation.y += delta * 0.18;
    if (ringSystem.current) ringSystem.current.rotation.z += delta * 0.35;
    if (root.current) root.current.getWorldPosition(planetWorld.current);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={root} position={[0.85, 0.1, 0]} rotation={[0.48, -0.28, 0.1]} scale={1.15}>
        <group ref={body}>
          <mesh ref={planetMesh}>
            <sphereGeometry args={[PLANET_RADIUS, 48, 48]} />
            <meshStandardMaterial
              color="#6fc4b4"
              roughness={0.35}
              metalness={0.45}
              emissive="#0f766e"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh scale={1.07}>
            <sphereGeometry args={[PLANET_RADIUS, 32, 32]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.07} />
          </mesh>
        </group>

        <group ref={ringSystem} rotation={[Math.PI / 2.05, 0.12, 0]}>
          <mesh>
            <torusGeometry args={[RING_RADIUS, 0.09, 3, 128]} />
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

          {t.orbit.map((label, i) => {
            const angle = (i / t.orbit.length) * Math.PI * 2;
            return (
              <OrbitLabel key={`${label}-${i}`} label={label} angle={angle} planetWorld={planetWorld} />
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
