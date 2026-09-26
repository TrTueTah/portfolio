/*
    Author: mister dude (https://sketchfab.com/misterdude)
    License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    Source: https://sketchfab.com/3d-models/iphone-14-pro-5cb0778041a34f09b409a38c687bb1d4
    Title: Iphone 14 Pro
*/

import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

/*
  Active display area measured from iphone.glb (model units). The model is a
  single textured mesh, so our screen is a rounded plane laid just in front of
  the glass rather than a material swap.
*/
const SCREEN = {
  width: 0.0768,
  height: 0.1652,
  radius: 0.011,
  // Glass sits at z = 0.0042 once the model is turned to face the camera
  z: 0.0044,
};

type IphoneProps = ThreeElements["group"] & {
  // Shown on the display, sized with deviceScreenSizes.iphone
  screenTexture: THREE.Texture;
};

// Rounded-rectangle plane with 0..1 UVs across its bounds
const createScreenGeometry = () => {
  const { width, height, radius } = SCREEN;
  const x = -width / 2;
  const y = -height / 2;

  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  const geometry = new THREE.ShapeGeometry(shape, 12);
  const position = geometry.getAttribute("position");
  const uv = geometry.getAttribute("uv");
  for (let i = 0; i < position.count; i++) {
    uv.setXY(
      i,
      (position.getX(i) - x) / width,
      (position.getY(i) - y) / height
    );
  }
  return geometry;
};

export const Iphone = ({ screenTexture, ...props }: IphoneProps) => {
  const { scene: original } = useGLTF("/models/iphone.glb");
  // Own copy so the model can appear in several canvases at once
  const scene = useMemo(() => original.clone(true), [original]);
  const screenGeometry = useMemo(() => createScreenGeometry(), []);

  useEffect(() => () => screenGeometry.dispose(), [screenGeometry]);

  return (
    <group {...props} dispose={null}>
      {/* Turn the display (-Z in the model) toward the camera */}
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />
      </group>

      <mesh geometry={screenGeometry} position={[0, 0, SCREEN.z]}>
        <meshBasicMaterial map={screenTexture} toneMapped={false} />
      </mesh>
    </group>
  );
};

// Start downloading on page load so the My Work section is ready when reached
useGLTF.preload("/models/iphone.glb");
