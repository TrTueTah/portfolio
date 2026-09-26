import { Environment, Float, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Suspense, useRef, useState } from "react";
import type * as THREE from "three";

import { CanvasLoader } from "../components/CanvasLoader";
import { TechBall } from "../components/TechBall";
import { techStack } from "../constants";

// Radians per second the ring turns
const RING_SPEED = 0.25;
// Ring scale when the section starts entering the viewport
const START_SCALE = 2.5;

interface TechRingProps {
  scale: MotionValue<number>;
}

const TechRing = ({ scale }: TechRingProps) => {
  const ringRef = useRef<THREE.Group>(null);
  const ballRefs = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const { viewport } = useThree();

  // Fit the ring inside the container, whatever its aspect ratio
  const ringRadius = Math.min(viewport.width, viewport.height) / 2 - 0.9;
  const ballRadius = Math.min(
    ((Math.PI * ringRadius) / techStack.length) * 0.75,
    0.75
  );

  useFrame((_, delta) => {
    if (!ringRef.current) return;

    // Negative z rotation = clockwise; pause while a ball is hovered
    if (hovered === null) ringRef.current.rotation.z -= delta * RING_SPEED;

    // Scroll-driven zoom: big on entry, normal once the section is fully shown
    ringRef.current.scale.setScalar(scale.get());

    const ringAngle = ringRef.current.rotation.z;
    ballRefs.current.forEach((ball, i) => {
      if (!ball) return;

      // Counter-rotate so the logos stay upright while the ring turns
      ball.rotation.z = -ringAngle;

      const target = (hovered === i ? 1.35 : 1) * ballRadius;
      ball.scale.setScalar(
        ball.scale.x + (target - ball.scale.x) * Math.min(delta * 10, 1)
      );
    });
  });

  return (
    <group ref={ringRef}>
      {techStack.map(({ id, icon }, i) => {
        // Start at 12 o'clock and go around clockwise
        const angle = Math.PI / 2 - (i / techStack.length) * Math.PI * 2;

        return (
          <group
            key={id}
            position={[
              Math.cos(angle) * ringRadius,
              Math.sin(angle) * ringRadius,
              0,
            ]}
          >
            <Float speed={1.75} rotationIntensity={0.6} floatIntensity={0.6}>
              <TechBall
                ref={(el) => {
                  ballRefs.current[i] = el;
                }}
                icon={icon}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHovered(i);
                }}
                onPointerOut={() => setHovered(null)}
              />
            </Float>
          </group>
        );
      })}
    </group>
  );
};

export const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // 0 when the section's top reaches the bottom of the screen,
  // 1 when its bottom does (i.e. the whole section is visible)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const ringScale = useSpring(
    useTransform(scrollYProgress, [0, 1], [START_SCALE, 1]),
    { stiffness: 120, damping: 30 }
  );

  return (
    <section ref={sectionRef} className="my-20 c-space" id="tech">
      <div className="w-full text-white-600">
        <h3 className="head-text">My tech stack</h3>

        <div className="mt-12 h-[450px] sm:h-[600px]">
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 30], fov: 17.5, near: 1, far: 60 }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <ambientLight intensity={0.4} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />

              <TechRing scale={ringScale} />

              <Environment resolution={256}>
                <group rotation={[-Math.PI / 3, 0, 1]}>
                  <Lightformer
                    form="circle"
                    intensity={4}
                    rotation-x={Math.PI / 2}
                    position={[0, 5, -9]}
                    scale={2}
                  />
                  <Lightformer
                    form="circle"
                    intensity={2}
                    rotation-y={Math.PI / 2}
                    position={[-5, 1, -1]}
                    scale={2}
                  />
                  <Lightformer
                    form="circle"
                    intensity={2}
                    rotation-y={-Math.PI / 2}
                    position={[10, 1, 0]}
                    scale={8}
                  />
                </group>
              </Environment>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};
