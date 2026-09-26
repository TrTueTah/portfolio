import { useGSAP } from "@gsap/react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, type Vector3 } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { Suspense, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "../components/Button";
import { CanvasLoader } from "../components/CanvasLoader";
import { GolangLogo } from "../components/GolangLogo";
import { HeroCamera } from "../components/HeroCamera";
import { Macbook } from "../components/Macbook";
import { NestLogo } from "../components/NestLogo";
import { ReactLogo } from "../components/ReactLogo";
import { RubikCube } from "../components/RubikCube";
import { deviceScreenSizes, macbookScreen } from "../constants";
import { useScreenTexture } from "../hooks/useScreenTexture";
import { calculateSizes } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Scroll progress (0 → 1 over the pinned hero) where each stage ends
const TEXT_FADE_END = 0.15;
const ZOOM_END = 0.75;
const CANVAS_FADE_END = 0.95;
const BUTTON_FADE_START = 0.5;
const BUTTON_FADE_END = 0.7;

export const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  const aboutScreen = useScreenTexture(...deviceScreenSizes.macbook);
  const screenCenter = sizes.macbookPosition as [number, number, number];

  // The hero is pinned while the user scrolls through this tall wrapper
  const scrollRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });
  // Opacity ranges span the full 0 → 1 on purpose: Motion runs them on a native
  // scroll timeline, which otherwise falls back to the element's own opacity
  // (1) outside the listed keyframes, bringing the text and laptop back
  const textOpacity = useTransform(
    scrollYProgress,
    [0, TEXT_FADE_END, 1],
    [1, 0, 0]
  );
  const textY = useTransform(scrollYProgress, [0, TEXT_FADE_END], [0, -60]);
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, ZOOM_END, CANVAS_FADE_END, 1],
    [1, 1, 0, 0]
  );

  // Button stays until the zoom is well underway, then fades out (scrubbed)
  // so it hands off to the About section
  const buttonRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        })
        .to(
          buttonRef.current,
          {
            autoAlpha: 0,
            y: 40,
            ease: "power1.in",
            duration: BUTTON_FADE_END - BUTTON_FADE_START,
          },
          BUTTON_FADE_START
        )
        // Pad the timeline to 1 so positions map to scroll progress
        .set({}, {}, 1);
    },
    { scope: scrollRef }
  );

  return (
    <section ref={scrollRef} className="relative h-[300vh] w-full" id="home">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        <motion.div
          className="mx-auto mt-20 flex w-full flex-col gap-3 c-space sm:mt-36"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p className="text-center font-generalsans text-xl font-medium text-white sm:text-3xl">
            Hi, I am Tanh Tran <span className="waving-hand">👋</span>
          </p>

          <p className="text-gray_gradient hero_tag">Software Engineer</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 size-full"
          style={{ opacity: canvasOpacity }}
        >
          <Canvas className="size-full">
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />

              <HeroCamera
                isMobile={isMobile}
                progress={scrollYProgress}
                zoomEnd={ZOOM_END}
                screen={{
                  center: screenCenter,
                  normal: macbookScreen.normal,
                  width: macbookScreen.width * sizes.macbookScale,
                  height: macbookScreen.height * sizes.macbookScale,
                }}
              >
                <Macbook
                  scale={sizes.macbookScale}
                  position={screenCenter}
                  screenTexture={aboutScreen}
                />
              </HeroCamera>

              <group>
                <GolangLogo position={sizes.golangLogoPosition as Vector3} />
                <ReactLogo
                  position={sizes.reactLogoPosition as [number, number, number]}
                />
                <NestLogo position={sizes.nestLogoPosition as Vector3} />
                <RubikCube position={sizes.rubikCubePosition as Vector3} />
              </group>

              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </motion.div>

        <div
          ref={buttonRef}
          className="absolute right-0 bottom-7 left-0 z-10 w-full c-space"
        >
          <Button
            isBeam
            containerClass="sm:w-fit w-full sm:min-w-96"
            href="#about"
          >
            Let&apos;s work together
          </Button>
        </div>
      </div>
    </section>
  );
};
