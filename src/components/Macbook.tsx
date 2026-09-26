/*
    Author: jackbaeten (https://sketchfab.com/jackbaeten)
    License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
    Source: https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4
    Title: macbook pro M3 16 inch 2024
*/

import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

// Material of the display panel in macbook.glb (the lid's inner screen)
const SCREEN_MATERIAL = "sfCQkHOWyrsLmor";

type MacbookProps = Omit<ThreeElements["group"], "scale"> & {
  scale?: number;
  // Shown on the display, sized with deviceScreenSizes.macbook
  screenTexture: THREE.Texture;
  // Built-in key/rim lights and reflections
  lights?: boolean;
};

export const Macbook = ({
  scale = 1,
  screenTexture,
  lights = true,
  ...props
}: MacbookProps) => {
  const { scene: original } = useGLTF("/models/macbook.glb");
  // Own copy so the model can appear in several canvases at once
  const scene = useMemo(() => original.clone(true), [original]);

  // Swap the wallpaper for our own screen (unlit, like a real display)
  useLayoutEffect(() => {
    let screen: THREE.Mesh | undefined;
    scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        (object.material as THREE.Material).name === SCREEN_MATERIAL
      ) {
        screen = object;
      }
    });
    if (!screen) return;

    const original = screen.material;
    const material = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
    screen.material = material;

    return () => {
      if (screen) screen.material = original;
      material.dispose();
    };
  }, [scene, screenTexture]);

  return (
    <group {...props} dispose={null}>
      {/* Screen center sits at this group's origin */}
      <group scale={scale}>
        <group position={[0, -11.708, 16.94]}>
          <primitive object={scene} />
        </group>
      </group>

      {lights && (
        <>
          {/* Lights (in world units, relative to the screen center) */}
          <spotLight
            position={[10, 12, 14]}
            angle={0.5}
            penumbra={1}
            intensity={2.5}
            decay={0}
          />
          {/* Cool rim light behind the lid so the silhouette reads on black */}
          <pointLight
            position={[0, 6, -8]}
            color="#8fa8ff"
            intensity={4}
            decay={0}
          />
          {/* Glow from the display spilling onto the keyboard */}
          <pointLight
            position={[0, -1, 3]}
            color="#dfe4ff"
            intensity={1}
            distance={12}
            decay={0}
          />

          {/* Studio reflections for the metal body (no HDR download needed) */}
          <Environment resolution={256} environmentIntensity={0.8}>
            <Lightformer
              form="rect"
              intensity={3}
              position={[0, 5, 8]}
              scale={[10, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              position={[-10, 2, 0]}
              rotation-y={Math.PI / 2}
              scale={[8, 4, 1]}
            />
            <Lightformer
              form="rect"
              intensity={2}
              color="#8fa8ff"
              position={[10, 2, -4]}
              rotation-y={-Math.PI / 2}
              scale={[8, 4, 1]}
            />
          </Environment>
        </>
      )}
    </group>
  );
};

useGLTF.preload("/models/macbook.glb");
