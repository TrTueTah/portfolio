import { useGSAP } from "@gsap/react";
import {
  Center,
  Environment,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

import { CanvasLoader } from "../components/CanvasLoader";
import { Iphone } from "../components/Iphone";
import { Macbook } from "../components/Macbook";
import { deviceScreenSizes, myProjects, type Project } from "../constants";
import { useCanvasTexture } from "../hooks/useCanvasTexture";
import { useSlideshowTexture } from "../hooks/useSlideshowTexture";
import {
  drawImageInWindow,
  drawPhoneIsland,
  drawProjectScreen,
} from "../lib/screenTexture";

gsap.registerPlugin(ScrollTrigger);

interface DeviceProps {
  project: Project;
}

const MACBOOK_PROPS = {
  scale: 0.1,
  rotation: [0.15, 0, 0] as [number, number, number],
  lights: false,
};

const MacbookPlaceholder = ({ project }: DeviceProps) => {
  const screen = useCanvasTexture(
    ...deviceScreenSizes.macbook,
    drawProjectScreen,
    project
  );

  return <Macbook {...MACBOOK_PROPS} screenTexture={screen} />;
};

const MacbookSlideshow = ({
  project,
  screens,
}: DeviceProps & { screens: string[] }) => {
  // Show each screenshot in full inside a browser window titled with the company
  const options = useMemo(
    () => ({
      drawImage: (ctx: CanvasRenderingContext2D, image: HTMLImageElement) =>
        drawImageInWindow(ctx, image, project.company),
    }),
    [project.company]
  );
  const screen = useSlideshowTexture(
    ...deviceScreenSizes.macbook,
    screens,
    options
  );

  return <Macbook {...MACBOOK_PROPS} screenTexture={screen} />;
};

// Real screenshots when the project has them, a generated screen otherwise
const MacbookDevice = ({ project }: DeviceProps) =>
  project.screens?.length ? (
    <MacbookSlideshow
      key={project.title}
      project={project}
      screens={project.screens}
    />
  ) : (
    <MacbookPlaceholder project={project} />
  );

const IphonePlaceholder = ({ project }: DeviceProps) => {
  const screen = useCanvasTexture(
    ...deviceScreenSizes.iphone,
    drawProjectScreen,
    project
  );

  return <Iphone scale={24} screenTexture={screen} />;
};

const SLIDESHOW_OPTIONS = { overlay: drawPhoneIsland };

const IphoneSlideshow = ({ screens }: { screens: string[] }) => {
  const screen = useSlideshowTexture(
    ...deviceScreenSizes.iphone,
    screens,
    SLIDESHOW_OPTIONS
  );

  return <Iphone scale={24} screenTexture={screen} />;
};

// Real screenshots when the project has them, a generated screen otherwise
const IphoneDevice = ({ project }: DeviceProps) =>
  project.screens?.length ? (
    <IphoneSlideshow key={project.title} screens={project.screens} />
  ) : (
    <IphonePlaceholder project={project} />
  );

// Spins the device in whenever the project changes
const ProjectDevice = ({ project }: DeviceProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.from(groupRef.current.rotation, {
      y: Math.PI / 2,
      duration: 1,
      ease: "power3.out",
    });
  }, [project]);

  return (
    <group ref={groupRef}>
      <Center key={project.device}>
        {project.device === "iphone" ? (
          <IphoneDevice project={project} />
        ) : (
          <MacbookDevice project={project} />
        )}
      </Center>
    </group>
  );
};

export const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasShownProject = useRef(false);

  const currentProject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  const handleNavigation = (direction: "previous" | "next" = "next") => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  // Reveal the section as it scrolls into view. The trigger is the section
  // itself and the timeline plays on its own clock (not scrubbed), so it
  // isn't tied to the rest of the page's scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
            defaults: { ease: "power3.out" },
          })
          .from(".work-heading", { autoAlpha: 0, y: 40, duration: 0.7 })
          .from(".work-card", { autoAlpha: 0, x: -80, duration: 0.8 }, "-=0.4")
          .from(".work-device", { autoAlpha: 0, x: 80, duration: 0.8 }, "<")
          .from(
            ".work-item",
            { autoAlpha: 0, y: 30, duration: 0.6, stagger: 0.12 },
            "-=0.4"
          );
      });
    },
    { scope: sectionRef }
  );

  // Fade the text in whenever the project changes (the reveal above handles
  // the first one)
  useGSAP(
    () => {
      if (!hasShownProject.current) {
        hasShownProject.current = true;
        return;
      }

      gsap.fromTo(
        ".animatedText",
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
      );
    },
    { dependencies: [selectedProjectIndex], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="my-20 overflow-x-clip c-space"
      id="projects"
    >
      <p className="work-heading head-text">My Work</p>

      <div className="mt-12 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="work-card relative flex flex-col gap-5 px-5 py-10 shadow-2xl shadow-black-200 sm:p-10 lg:min-h-[720px]">
          <div className="absolute top-0 right-0">
            <img
              src={currentProject.spotlight}
              alt="Spotlight"
              className="pointer-events-none h-96 w-full rounded-xl object-cover select-none"
            />
          </div>

          <div
            className="work-item flex size-16 items-center justify-center rounded-lg backdrop-blur-3xl"
            style={currentProject.logoStyle}
          >
            <span
              className="text-xl font-semibold"
              style={{ color: currentProject.accent }}
            >
              {currentProject.initials}
            </span>
          </div>

          <div className="work-item my-5 flex flex-col gap-5 text-white-600">
            <div className="animatedText">
              <p className="text-2xl font-semibold text-white">
                {currentProject.title}
              </p>
              <p className="mt-1 text-sm text-white-500">
                {currentProject.company}
              </p>
            </div>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="work-item flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag) => (
                <div
                  key={`${currentProject.title}-${tag.name}`}
                  className="tech-logo"
                >
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className={tag.invert ? "invert" : undefined}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-5">
              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 text-white-600 transition-colors hover:text-white"
                >
                  <img src="/assets/github.svg" className="size-5" alt="" />
                  <p>Source code</p>
                </a>
              )}
            </div>
          </div>

          {/* Pinned to the bottom so it doesn't jump between projects */}
          <div className="work-item mt-auto flex items-center justify-between pt-7">
            <button
              className="flex arrow-btn items-center justify-center hover:bg-white/10"
              onClick={() => handleNavigation("previous")}
              aria-label="Previous project"
            >
              <img
                src="/assets/left-arrow.png"
                alt=""
                className="size-4 object-contain"
              />
            </button>

            <div className="flex items-center gap-2">
              {myProjects.map(({ title }, index) => (
                <button
                  key={title}
                  onClick={() => setSelectedProjectIndex(index)}
                  aria-label={`Show ${title}`}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedProjectIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              className="flex arrow-btn items-center justify-center hover:bg-white/10"
              onClick={() => handleNavigation("next")}
              aria-label="Next project"
            >
              <img
                src="/assets/right-arrow.png"
                alt=""
                className="size-4 object-contain"
              />
            </button>
          </div>
        </div>

        <div className="work-device h-96 rounded-lg border border-black-300 bg-black-200 md:h-full">
          <Canvas camera={{ position: [0, 0.5, 7], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 6]} intensity={1.5} />
            <pointLight
              position={[-6, 2, -4]}
              color="#8fa8ff"
              intensity={4}
              decay={0}
            />

            <Suspense fallback={<CanvasLoader />}>
              <ProjectDevice project={currentProject} />
            </Suspense>

            {/* Studio reflections for the metal and glass */}
            <Environment resolution={256}>
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

            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};
