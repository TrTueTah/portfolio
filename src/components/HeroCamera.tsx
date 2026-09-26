import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { MotionValue } from "motion/react";
import { useRef, type PropsWithChildren } from "react";
import * as THREE from "three";

// Camera resting position before the user scrolls
const REST_POSITION = new THREE.Vector3(0, 0, 20);
const REST_TARGET = new THREE.Vector3(0, 0, 0);

export interface HeroCameraScreen {
  center: [number, number, number];
  normal: [number, number, number];
  width: number;
  height: number;
}

interface HeroCameraProps {
  isMobile: boolean;
  // Scroll progress of the hero (0 → 1)
  progress: MotionValue<number>;
  // Scroll progress at which the screen fills the viewport
  zoomEnd: number;
  screen: HeroCameraScreen;
}

export const HeroCamera = ({
  children,
  isMobile,
  progress,
  zoomEnd,
  screen,
}: PropsWithChildren<HeroCameraProps>) => {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef(REST_TARGET.clone());
  const vectors = useRef({
    center: new THREE.Vector3(),
    endPosition: new THREE.Vector3(),
    position: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
  });

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const { center, endPosition, position, lookAt } = vectors.current;
    const zoom = THREE.MathUtils.smoothstep(progress.get(), 0, zoomEnd);

    // Distance at which the screen fills the viewport: cover it on landscape
    // viewports, fit it (so the whole screen is readable) on portrait ones
    const aspect = state.size.width / state.size.height;
    const fit = aspect < 1 ? Math.max : Math.min;
    const visiblePerUnit =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const distance =
      (fit(screen.height, screen.width / aspect) / visiblePerUnit) * 0.95;

    center.set(...screen.center);
    endPosition
      .set(...screen.normal)
      .multiplyScalar(distance)
      .add(center);

    position.lerpVectors(REST_POSITION, endPosition, zoom);
    lookAt.lerpVectors(REST_TARGET, center, zoom);

    easing.damp3(camera.position, position, 0.25, delta);
    easing.damp3(target.current, lookAt, 0.25, delta);
    camera.lookAt(target.current);

    // Pointer tilt, faded out as soon as the zoom starts so the screen lines up
    if (groupRef.current) {
      const tilt = isMobile
        ? 0
        : 1 - THREE.MathUtils.smoothstep(progress.get(), 0, zoomEnd * 0.3);

      easing.dampE(
        groupRef.current.rotation,
        [(-state.pointer.y / 3) * tilt, (-state.pointer.x / 5) * tilt, 0],
        0.25,
        delta
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
};
