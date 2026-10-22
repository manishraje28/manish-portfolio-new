import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const COUNT = isMobile ? 1800 : 5000;
const PALETTE = ["#33c2cc", "#7a57db", "#ca2f8c", "#ffffff"].map((c) => new THREE.Color(c));

// Spiral galaxy of particles that twists with scroll and leans toward the mouse
const Galaxy = () => {
  const points = useRef();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.6) * 9;
      const branch = (i % 4) * ((Math.PI * 2) / 4);
      const spin = r * 0.55;
      const jitter = () => (Math.random() - 0.5) * (0.4 + r * 0.18);
      positions[i * 3] = Math.cos(branch + spin) * r + jitter();
      positions[i * 3 + 1] = jitter() * 0.6;
      positions[i * 3 + 2] = Math.sin(branch + spin) * r + jitter();
      const c = PALETTE[i % PALETTE.length].clone().lerp(PALETTE[3], Math.random() * 0.3);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    p.rotation.y += delta * 0.04;
    p.rotation.x = THREE.MathUtils.lerp(p.rotation.x, 0.9 - scroll * 1.4 + state.pointer.y * 0.15, 0.05);
    p.rotation.z = THREE.MathUtils.lerp(p.rotation.z, state.pointer.x * 0.15, 0.05);
    p.position.y = THREE.MathUtils.lerp(p.position.y, scroll * 3 - 1, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.05 : 0.035}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Fixed full-page WebGL layer behind all content
const CosmicBackground = () => (
  <div className="fixed inset-0 -z-40 pointer-events-none">
    <Canvas
      camera={{ position: [0, 2, 9], fov: 60 }}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Galaxy />
    </Canvas>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030412_85%)]" />
  </div>
);

export default CosmicBackground;
