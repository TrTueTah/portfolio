import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { inSphere } from "maath/random";
import { Suspense, useRef, useState } from "react";
import type * as THREE from "three";

// Must be a multiple of 3 (x, y, z per star)
const STAR_COUNT = 2000;

const Stars = () => {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(
    () =>
      inSphere(new Float32Array(STAR_COUNT * 3), {
        radius: 1.2,
      }) as Float32Array
  );

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 size-full">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
    </Canvas>
  </div>
);
