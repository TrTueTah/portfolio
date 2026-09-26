/*
    Author: DoobiDooba (https://sketchfab.com/DoobiDooba)
    License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    Source: https://sketchfab.com/3d-models/rubiks-cube-155420e09a124ec3a3bcca0852280672
*/

import { useGSAP } from "@gsap/react";
import { Float, useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import type * as THREE from "three";

export const RubikCube = (props: ThreeElements["group"]) => {
  const { scene } = useGLTF("/models/rubiks_cube.glb");

  const cubeRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!cubeRef.current) return;

    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(cubeRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 2.5,
      });
  });

  return (
    <Float floatIntensity={2}>
      <group
        position={[9, -4, 0]}
        rotation={[2.6, 0.8, -1.8]}
        scale={11.7}
        dispose={null}
        {...props}
      >
        <group ref={cubeRef}>
          <primitive object={scene} />
        </group>
      </group>
    </Float>
  );
};

useGLTF.preload("/models/rubiks_cube.glb");
