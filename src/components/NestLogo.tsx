import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import type * as THREE from "three";

export const NestLogo = (props: ThreeElements["group"]) => {
  const { scene } = useGLTF("/models/nestjs.glb");

  const logoRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!logoRef.current) return;

    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(logoRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        duration: 2.5,
      });
  });

  return (
    <group scale={2.2} dispose={null} {...props}>
      <group ref={logoRef} rotation={[0, -Math.PI / 2, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

useGLTF.preload("/models/nestjs.glb");
