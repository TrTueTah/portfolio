import { Decal, useTexture } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";

import { techStack } from "../constants";

type TechBallProps = ThreeElements["group"] & {
  icon: string;
};

export const TechBall = ({ icon, ...props }: TechBallProps) => {
  const decal = useTexture(icon);

  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" roughness={0.4} flatShading />
        <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} map={decal} />
      </mesh>
    </group>
  );
};

useTexture.preload(techStack.map(({ icon }) => icon));
