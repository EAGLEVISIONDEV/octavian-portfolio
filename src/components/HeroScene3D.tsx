"use client";

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, type MutableRefObject } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { Color, MathUtils, Vector3 } from "three";
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
  const tmp = useMemo(
    () => ({
      label: new Vector3(),
      cam: new Vector3(),
      toLabel: new Vector3(),
      toCam: new Vector3(),
      camToLabel: new Vector3(),
      camToCenter: new Vector3(),
      closest: new Vector3(),
    }),
    [],
  );

  useFrame(({ camera }) => {
    if (!marker.current) return;
    marker.current.getWorldPosition(tmp.label);
    const center = planetWorld.current;

    tmp.toLabel.copy(tmp.label).sub(center);
    tmp.toCam.copy(camera.position).sub(center);
    const behind = tmp.toLabel.dot(tmp.toCam) < 0;

    tmp.cam.copy(camera.position);
    tmp.camToLabel.copy(tmp.label).sub(tmp.cam);
    tmp.camToCenter.copy(center).sub(tmp.cam);
    const lenSq = tmp.camToLabel.lengthSq() || 1;
    const t = Math.max(0, Math.min(1, tmp.camToCenter.dot(tmp.camToLabel) / lenSq));
    tmp.closest.copy(tmp.cam).addScaledVector(tmp.camToLabel, t);
    const intersects = tmp.closest.distanceTo(center) < PLANET_RADIUS * 0.98;

    const next = behind || intersects;
    setHidden((prev) => (prev === next ? prev : next));
  });

  const x = Math.cos(angle) * RING_RADIUS;
  const y = Math.sin(angle) * RING_RADIUS;

  return (
    <group ref={marker} position={[x, y, 0]}>
      <Html
        center
        distanceFactor={7.5}
        style={{ pointerEvents: "none", opacity: hidden ? 0 : 1, transition: "opacity 180ms ease" }}
      >
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

/** Soft jelly planet — bulges toward the pointer, reforms when you leave. */
function DeformablePlanet({
  meshRef,
  hoverRef,
  hitLocal,
}: {
  meshRef: MutableRefObject<Mesh | null>;
  hoverRef: MutableRefObject<boolean>;
  hitLocal: MutableRefObject<Vector3>;
}) {
  const glowRef = useRef<Mesh>(null);
  const matRef = useRef<MeshStandardMaterial>(null);
  const originals = useRef<Float32Array | null>(null);
  const strength = useRef(0);
  const pulse = useRef(0);
  const emissive = useMemo(() => new Color("#0f766e"), []);
  const emissiveHot = useMemo(() => new Color("#2dd4bf"), []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!originals.current) {
      originals.current = new Float32Array(mesh.geometry.attributes.position.array as Float32Array);
    }
    const orig = originals.current;

    strength.current = MathUtils.damp(strength.current, hoverRef.current ? 1 : 0, 7, delta);
    pulse.current = MathUtils.damp(pulse.current, hoverRef.current ? 1 : 0, 5, delta);

    const pos = mesh.geometry.attributes.position;
    const hit = hitLocal.current;
    const hitLen = hit.length() || 1;
    const hx = hit.x / hitLen;
    const hy = hit.y / hitLen;
    const hz = hit.z / hitLen;
    const s = strength.current;

    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];
      const len = Math.hypot(ox, oy, oz) || 1;
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;
      const dot = Math.min(1, Math.max(-1, nx * hx + ny * hy + nz * hz));
      const ang = Math.acos(dot);
      const influence = Math.exp(-(ang * ang) * 9.5);
      const ripple = Math.exp(-(ang * ang) * 3.2) * Math.sin(ang * 10 - s * 2.5) * 0.04;
      const scale = 1 + s * (influence * 0.26 - (1 - influence) * 0.045 + ripple);
      pos.setXYZ(i, ox * scale, oy * scale, oz * scale);
    }
    pos.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    if (glowRef.current) {
      const g = 1.07 + pulse.current * 0.06;
      glowRef.current.scale.setScalar(g);
    }
    if (matRef.current) {
      matRef.current.emissive.copy(emissive).lerp(emissiveHot, pulse.current);
      matRef.current.emissiveIntensity = 0.2 + pulse.current * 0.55;
      matRef.current.metalness = 0.45 + pulse.current * 0.2;
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          hoverRef.current = true;
          hitLocal.current.copy(e.point);
          // Convert world hit into planet-local space
          meshRef.current?.worldToLocal(hitLocal.current);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hoverRef.current = false;
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[PLANET_RADIUS, 96, 96]} />
        <meshStandardMaterial
          ref={matRef}
          color="#6fc4b4"
          roughness={0.28}
          metalness={0.5}
          emissive="#0f766e"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.07}>
        <sphereGeometry args={[PLANET_RADIUS, 48, 48]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.08} />
      </mesh>
    </>
  );
}

function Saturn() {
  const body = useRef<Group>(null);
  const ringSystem = useRef<Group>(null);
  const planetMesh = useRef<Mesh>(null);
  const root = useRef<Group>(null);
  const planetWorld = useRef(new Vector3());
  const hoverRef = useRef(false);
  const hitLocal = useRef(new Vector3(0, 0, PLANET_RADIUS));
  const ringTilt = useRef(0);
  const { t } = useLocale();

  useFrame((_, delta) => {
    if (body.current) body.current.rotation.y += delta * (hoverRef.current ? 0.28 : 0.18);
    if (ringSystem.current) {
      ringSystem.current.rotation.z += delta * (hoverRef.current ? 0.55 : 0.35);
      ringTilt.current = MathUtils.damp(ringTilt.current, hoverRef.current ? 0.08 : 0, 6, delta);
      ringSystem.current.rotation.x = Math.PI / 2.05 + ringTilt.current;
    }
    if (root.current) root.current.getWorldPosition(planetWorld.current);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={root} position={[0.85, 0.1, 0]} rotation={[0.48, -0.28, 0.1]} scale={1.15}>
        <group ref={body}>
          <DeformablePlanet meshRef={planetMesh} hoverRef={hoverRef} hitLocal={hitLocal} />
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
        style={{ touchAction: "none" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
