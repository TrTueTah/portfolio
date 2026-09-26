/*
    Author: suguru (https://sketchfab.com/suguru)
    License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    Source: https://sketchfab.com/3d-models/gopher-dcab77f1912a40da8fe05e2b49a79485
*/

import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import type * as THREE from "three";

export const GolangLogo = (props: ThreeElements["group"]) => {
  const golangRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/golang.glb");

  useGSAP(() => {
    if (!golangRef.current) return;

    gsap.to(golangRef.current.position, {
      y: golangRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <group
      {...props}
      ref={golangRef}
      rotation={[0, -Math.PI / 2 + Math.PI / 5, 0]}
      scale={0.55}
    >
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload("/models/golang.glb");
