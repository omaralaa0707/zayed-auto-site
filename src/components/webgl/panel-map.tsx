"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";
import { PANEL_IDS, type PanelId, type PanelStatus } from "@/content/media";

/**
 * Zayed Auto's signature piece: the panel map.
 *
 * He is the only seller in this series who says what has been redone —
 * "فابريكا بالكامل معاده رفرفين امامي", entirely factory except the two front
 * wings. So the page draws the body as its separate panels and marks each one
 * with what he actually said about it.
 *
 * Each panel is a real extruded shape laid flat in a plan view and tilted
 * back, so it reads as a body diagram rather than an icon. Panels he called
 * factory sit flush; panels he said were redone are lifted clear of the
 * shell and outlined, which is what an exploded view is for. Panels he did
 * not speak to are left low and dim — the page never fills in a claim he did
 * not make.
 *
 * All eleven panels are one buffer of extruded geometry per panel with a flat
 * material; there is no lighting rig, because a diagram should not be lit
 * like a scene.
 */

/** Plan-view outlines, in metres-ish. x is across the car, y is along it. */
const PANEL_SHAPES: Record<PanelId, [number, number, number, number]> = {
  //            x        y       width  length
  bonnet: [0, 1.62, 1.72, 1.06],
  roof: [0, 0.1, 1.5, 1.24],
  boot: [0, -1.5, 1.68, 0.92],
  "wing-fl": [-1.02, 1.5, 0.44, 1.0],
  "wing-fr": [1.02, 1.5, 0.44, 1.0],
  "door-fl": [-0.98, 0.5, 0.42, 0.86],
  "door-fr": [0.98, 0.5, 0.42, 0.86],
  "door-rl": [-0.98, -0.42, 0.42, 0.86],
  "door-rr": [0.98, -0.42, 0.42, 0.86],
  "quarter-l": [-1.0, -1.34, 0.44, 0.84],
  "quarter-r": [1.0, -1.34, 0.44, 0.84],
};

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function Panel({
  id,
  status,
  paint,
  hovered,
  onHover,
}: {
  id: PanelId;
  status: PanelStatus;
  paint: string;
  hovered: boolean;
  onHover: (id: PanelId | null) => void;
}) {
  const [x, y, w, h] = PANEL_SHAPES[id];
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedRect(w, h, Math.min(w, h) * 0.22), {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    g.center();
    return g;
  }, [w, h]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Redone panels sit proud of the shell; unstated ones sit low and dim.
  const restZ = status === "redone" ? 0.34 : status === "unstated" ? -0.06 : 0;
  const target = useRef(restZ);

  // Writing a ref during render is a hard lint error, so the target is synced
  // after commit and the frame loop eases toward it.
  useEffect(() => {
    target.current = restZ + (hovered ? 0.22 : 0);
  }, [restZ, hovered]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const k = 1 - Math.pow(0.002, Math.min(delta, 0.05));
    group.current.position.z += (target.current - group.current.position.z) * k;
  });

  // Redone panels are chalk, not the flag colour: the flag is #E0B64A and the
  // Creta's own paint is #C3A253, so a hue-based marking disappeared entirely
  // on the one car whose disclosure this whole page is about. Chalk reads
  // against red, blue and yellow alike, and the lift and outline carry it too.
  const color =
    status === "redone" ? "#f2f4f6" : status === "unstated" ? "#3a3d42" : paint;
  const opacity = status === "unstated" ? 0.5 : 1;

  return (
    <group ref={group} position={[x, y, restZ]}>
      <mesh
        geometry={geometry}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <meshBasicMaterial color={color} transparent={opacity < 1} opacity={opacity} toneMapped={false} />
      </mesh>
      {/* Redone panels carry an outline as well as a lift, so the marking
          survives on a small screen where the height difference is subtle. */}
      {status === "redone" && (
        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial color="#e0b64a" toneMapped={false} />
        </lineSegments>
      )}
    </group>
  );
}

function Body({
  panels,
  paint,
  onHover,
  hovered,
}: {
  panels: Partial<Record<PanelId, PanelStatus>>;
  paint: string;
  hovered: PanelId | null;
  onHover: (id: PanelId | null) => void;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    // A slow, small oscillation — a diagram being turned in the hand, not a
    // showreel spin.
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.22) * 0.05;
  });

  return (
    <group ref={group} rotation={[-0.72, 0, 0]}>
      {/* The shell the panels sit on. */}
      <mesh position={[0, 0.08, -0.09]}>
        <planeGeometry args={[2.5, 4.6]} />
        <meshBasicMaterial color="#202226" toneMapped={false} />
      </mesh>
      {PANEL_IDS.map((id) => (
        <Panel
          key={id}
          id={id}
          status={panels[id] ?? "unstated"}
          paint={paint}
          hovered={hovered === id}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function PanelMap({
  panels,
  paint,
  labels,
  alt,
  className,
  onHoverLabel,
}: {
  panels: Partial<Record<PanelId, PanelStatus>>;
  paint: string;
  labels: Record<PanelId, string>;
  alt: string;
  className?: string;
  onHoverLabel?: (label: string | null) => void;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState<PanelId | null>(null);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  const onHover = useCallback(
    (id: PanelId | null) => {
      setHovered(id);
      onHoverLabel?.(id ? labels[id] : null);
    },
    [labels, onHoverLabel],
  );

  // Without WebGL the same information is a list, which is what the diagram
  // is a picture of anyway.
  if (lost || supported !== true) {
    return (
      <ul className={`grid grid-cols-2 gap-x-4 gap-y-1 text-[0.82rem] ${className ?? ""}`}>
        {PANEL_IDS.map((id) => {
          const s = panels[id] ?? "unstated";
          return (
            <li key={id} className="flex items-baseline justify-between gap-3 border-b border-white/10 py-1.5">
              <span className="text-chalk-2">{labels[id]}</span>
              <span className={s === "redone" ? "text-flag" : s === "factory" ? "text-chalk" : "text-chalk-3"}>
                {s}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, -0.6, 6.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Body panels={panels} paint={paint} hovered={hovered} onHover={onHover} />
      </Canvas>
    </div>
  );
}
