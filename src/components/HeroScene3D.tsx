"use client";

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, type MutableRefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  Vector3,
  type Group,
  type Points,
  type PointsMaterial,
} from "three";
import { useLocale } from "@/lib/i18n";

const PLANET_RADIUS = 1.12;
const RING_INNER = 1.72;
const RING_OUTER = 2.35;
const RING_MID = (RING_INNER + RING_OUTER) * 0.5;

type HoverState = {
  active: boolean;
  /** World-space hit, converted per system as needed. */
  world: Vector3;
  strength: number;
};

function hash(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function useParticleDeform(
  pointsRef: MutableRefObject<Points | null>,
  rest: Float32Array,
  seeds: Float32Array,
  count: number,
  hover: MutableRefObject<HoverState>,
  localHit: MutableRefObject<Vector3>,
  kindScale: number,
) {
  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.attributes.position;
    const s = hover.current.strength;
    const t = state.clock.elapsedTime;
    const hit = localHit.current;

    for (let i = 0; i < count; i++) {
      const ox = rest[i * 3];
      const oy = rest[i * 3 + 1];
      const oz = rest[i * 3 + 2];
      const seed = seeds[i];

      const dx0 = ox - hit.x;
      const dy0 = oy - hit.y;
      const dz0 = oz - hit.z;
      const dist = Math.hypot(dx0, dy0, dz0);
      const influence = Math.exp(-(dist * dist) * kindScale);

      const swirl = t * (2.1 + seed * 2.8) + seed * 14;
      const burst = s * influence * (0.75 + seed * 0.95);
      const nlen = Math.hypot(ox, oy, oz) || 1;
      const rx = ox / nlen;
      const ry = oy / nlen;
      const rz = oz / nlen;
      const tx = -ry;
      const ty = rx;
      const noise =
        Math.sin(ox * 4.4 + t * 3.5 + seed * 10) * 0.15 +
        Math.cos(oy * 5.2 - t * 2.7 + seed * 8) * 0.12;
      const scatter = s * (0.14 + seed * 0.55) * (1 - influence * 0.3);

      posAttr.setXYZ(
        i,
        ox + rx * burst * (1 + noise) + tx * burst * Math.sin(swirl) + (hash(i + 40) - 0.5) * scatter,
        oy + ry * burst * (1 + noise) + ty * burst * Math.cos(swirl) + (hash(i + 55) - 0.5) * scatter,
        oz + rz * burst * (0.9 + noise) + Math.sin(swirl + seed) * burst * 0.6 + (hash(i + 70) - 0.5) * scatter,
      );
    }
    posAttr.needsUpdate = true;

    const mat = pts.material as PointsMaterial;
    mat.size = 0.025 + s * 0.032;
    mat.opacity = 0.8 + s * 0.2;
  });
}

function PlanetCloud({
  hover,
  groupRef,
}: {
  hover: MutableRefObject<HoverState>;
  groupRef: MutableRefObject<Group | null>;
}) {
  const pointsRef = useRef<Points>(null);
  const localHit = useRef(new Vector3());
  const data = useMemo(() => {
    const count = 5200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const teal = new Color("#5eead4");
    const mint = new Color("#99f6e4");
    const deep = new Color("#2dd4bf");
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let p = 0; p < count; p++) {
      const y = 1 - (p / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * p;
      const r = PLANET_RADIUS * (0.88 + hash(p) * 0.14);
      positions[p * 3] = Math.cos(theta) * radiusAtY * r;
      positions[p * 3 + 1] = y * r;
      positions[p * 3 + 2] = Math.sin(theta) * radiusAtY * r;
      const c = hash(p + 9) > 0.6 ? teal : hash(p + 11) > 0.5 ? mint : deep;
      colors[p * 3] = c.r;
      colors[p * 3 + 1] = c.g;
      colors[p * 3 + 2] = c.b;
      seeds[p] = hash(p + 21);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions.slice(), 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    return { geometry, rest: positions, seeds, count };
  }, []);

  useFrame(() => {
    localHit.current.copy(hover.current.world);
    groupRef.current?.worldToLocal(localHit.current);
  });

  useParticleDeform(pointsRef, data.rest, data.seeds, data.count, hover, localHit, 1.1);

  return (
    <points ref={pointsRef} geometry={data.geometry}>
      <pointsMaterial
        vertexColors
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function RingCloud({
  hover,
  groupRef,
}: {
  hover: MutableRefObject<HoverState>;
  groupRef: MutableRefObject<Group | null>;
}) {
  const pointsRef = useRef<Points>(null);
  const localHit = useRef(new Vector3());
  const data = useMemo(() => {
    const count = 4600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const cyan = new Color("#38bdf8");
    const ice = new Color("#e0f2fe");
    const sky = new Color("#7dd3fc");

    for (let p = 0; p < count; p++) {
      const a = hash(p + 3) * Math.PI * 2;
      const rad = RING_INNER + hash(p + 7) * (RING_OUTER - RING_INNER);
      positions[p * 3] = Math.cos(a) * rad;
      positions[p * 3 + 1] = Math.sin(a) * rad;
      positions[p * 3 + 2] = (hash(p + 13) - 0.5) * 0.06;
      const c = hash(p + 17) > 0.55 ? cyan : hash(p + 19) > 0.5 ? ice : sky;
      colors[p * 3] = c.r;
      colors[p * 3 + 1] = c.g;
      colors[p * 3 + 2] = c.b;
      seeds[p] = hash(p + 33);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions.slice(), 3));
    geometry.setAttribute("color", new BufferAttribute(colors, 3));
    return { geometry, rest: positions, seeds, count };
  }, []);

  useFrame(() => {
    localHit.current.copy(hover.current.world);
    groupRef.current?.worldToLocal(localHit.current);
  });

  useParticleDeform(pointsRef, data.rest, data.seeds, data.count, hover, localHit, 0.48);

  return (
    <points ref={pointsRef} geometry={data.geometry}>
      <pointsMaterial
        vertexColors
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function OrbitLabel({
  label,
  angle,
  planetWorld,
  hover,
  index,
  ringRef,
}: {
  label: string;
  angle: number;
  planetWorld: MutableRefObject<Vector3>;
  hover: MutableRefObject<HoverState>;
  index: number;
  ringRef: MutableRefObject<Group | null>;
}) {
  const marker = useRef<Group>(null);
  const [hidden, setHidden] = useState(false);
  const [fx, setFx] = useState({ x: 0, y: 0, rot: 0, scale: 1, opacity: 1, blur: 0 });
  const tmp = useMemo(
    () => ({
      label: new Vector3(),
      cam: new Vector3(),
      toLabel: new Vector3(),
      toCam: new Vector3(),
      camToLabel: new Vector3(),
      camToCenter: new Vector3(),
      closest: new Vector3(),
      hitLocal: new Vector3(),
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
    const tt = Math.max(0, Math.min(1, tmp.camToCenter.dot(tmp.camToLabel) / lenSq));
    tmp.closest.copy(tmp.cam).addScaledVector(tmp.camToLabel, tt);
    const intersects = tmp.closest.distanceTo(center) < PLANET_RADIUS * 0.9;
    const nextHide = behind || intersects;
    setHidden((prev) => (prev === nextHide ? prev : nextHide));

    tmp.hitLocal.copy(hover.current.world);
    ringRef.current?.worldToLocal(tmp.hitLocal);

    const s = hover.current.strength;
    const baseX = Math.cos(angle) * RING_MID;
    const baseY = Math.sin(angle) * RING_MID;
    const dist = Math.hypot(baseX - tmp.hitLocal.x, baseY - tmp.hitLocal.y);
    const influence = Math.exp(-(dist * dist) * 0.38);
    const push = s * (0.25 + influence * 0.9);
    const dir = index % 2 === 0 ? 1 : -1;

    setFx({
      x: Math.cos(angle) * push * 56,
      y: Math.sin(angle) * push * 56 + s * (hash(index + 2) - 0.5) * 40,
      rot: s * influence * dir * 36,
      scale: 1 + s * (0.15 + influence * 0.45),
      opacity: nextHide ? 0 : Math.max(0.15, 1 - s * influence * 0.45),
      blur: s * influence * 2.4,
    });
  });

  return (
    <group ref={marker} position={[Math.cos(angle) * RING_MID, Math.sin(angle) * RING_MID, 0]}>
      <Html center distanceFactor={7.1} style={{ pointerEvents: "none" }}>
        <span
          className="whitespace-nowrap rounded-full border border-sky-300/50 bg-[#071018]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-sky-100 shadow-[0_0_28px_rgba(56,189,248,0.5)] backdrop-blur-md sm:text-[10px]"
          style={{
            visibility: hidden ? "hidden" : "visible",
            opacity: fx.opacity,
            transform: `translate(${fx.x}px, ${fx.y}px) rotate(${fx.rot}deg) scale(${fx.scale})`,
            filter: fx.blur > 0.05 ? `blur(${fx.blur}px)` : "none",
          }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

function Saturn() {
  const root = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const planetWorld = useRef(new Vector3());
  const hover = useRef<HoverState>({
    active: false,
    world: new Vector3(0, 0, PLANET_RADIUS),
    strength: 0,
  });
  const { t } = useLocale();

  useFrame((_, delta) => {
    hover.current.strength = MathUtils.damp(
      hover.current.strength,
      hover.current.active ? 1 : 0,
      5.2,
      delta,
    );
    if (spin.current) spin.current.rotation.y += delta * (0.1 + hover.current.strength * 0.4);
    if (ring.current) ring.current.rotation.z += delta * (0.26 + hover.current.strength * 0.7);
    if (root.current) root.current.getWorldPosition(planetWorld.current);
  });

  const setHover = (e: ThreeEvent<PointerEvent>, active: boolean) => {
    e.stopPropagation();
    hover.current.active = active;
    if (active) {
      hover.current.world.copy(e.point);
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
  };

  return (
    <Float speed={0.65} rotationIntensity={0.05} floatIntensity={0.16}>
      <group ref={root} position={[0.75, 0.05, 0]} rotation={[0.48, -0.26, 0.08]} scale={0.92}>
        <group ref={spin}>
          <mesh>
            <sphereGeometry args={[0.38, 32, 32]} />
            <meshBasicMaterial color="#5eead4" transparent opacity={0.28} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.78, 32, 32]} />
            <meshBasicMaterial color="#14b8a6" transparent opacity={0.1} />
          </mesh>

          <PlanetCloud hover={hover} groupRef={spin} />

          <group ref={ring} rotation={[Math.PI / 2.05, 0.12, 0]}>
            <RingCloud hover={hover} groupRef={ring} />
            {t.orbit.map((label, i) => (
              <OrbitLabel
                key={`${label}-${i}`}
                label={label}
                angle={(i / t.orbit.length) * Math.PI * 2}
                planetWorld={planetWorld}
                hover={hover}
                index={i}
                ringRef={ring}
              />
            ))}
          </group>

          <mesh
            visible={false}
            onPointerOver={(e) => setHover(e, true)}
            onPointerMove={(e) => setHover(e, true)}
            onPointerOut={(e) => setHover(e, false)}
          >
            <sphereGeometry args={[2.5, 24, 24]} />
            <meshBasicMaterial />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 3]} intensity={0.95} color="#e2e8f0" />
      <pointLight position={[-3, 2, 2]} intensity={1.25} color="#5eead4" />
      <pointLight position={[2.5, -1, 3]} intensity={0.9} color="#38bdf8" />
      <Saturn />
    </>
  );
}

export function HeroScene3D({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0.1, 5.9], fov: 38 }}
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
