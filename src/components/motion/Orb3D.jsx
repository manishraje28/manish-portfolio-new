import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// Wireframe shapes only: basic materials, no lights or shadows, so it's cheap on phone GPUs
const Shapes = () => {
  const group = useRef();
  const outer = useRef();
  const inner = useRef();
  const ring = useRef();
  useFrame((_, delta) => {
    outer.current.rotation.x += delta * 0.15;
    outer.current.rotation.y += delta * 0.2;
    inner.current.rotation.x -= delta * 0.4;
    inner.current.rotation.z += delta * 0.3;
    ring.current.rotation.z += delta * 0.12;
    group.current.rotation.y = window.scrollY * 0.0015;
  });
  return (
    <group ref={group}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.6, 1]} />
        <meshBasicMaterial color="#7a57db" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#33c2cc" wireframe />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.6, 0.015, 8, 96]} />
        <meshBasicMaterial color="#ca2f8c" />
      </mesh>
    </group>
  );
};

// `active` stops the render loop entirely while the section is off screen
const Orb3D = ({ active }) => (
  <Canvas
    frameloop={active ? "always" : "never"}
    camera={{ position: [0, 0, 8], fov: 55 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
  >
    <Shapes />
  </Canvas>
);

export default Orb3D;
