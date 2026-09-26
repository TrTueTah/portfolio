import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import Globe from "react-globe.gl";

import { Button } from "../components/Button";
import { links } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    void navigator.clipboard.writeText(links.contactEmail);

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  // Reveal each row as it scrolls into view: the card slides in from its
  // side, then its media and text follow
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".about-row").forEach((row, i) => {
          const fromLeft = i % 2 === 0;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            })
            .from(row, {
              autoAlpha: 0,
              x: fromLeft ? -80 : 80,
              duration: 0.8,
              ease: "power3.out",
            })
            .from(
              row.querySelectorAll(".about-row_item"),
              {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
              },
              "-=0.4"
            );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="my-20 overflow-x-clip c-space"
      id="about"
    >
      <div className="flex flex-col gap-8">
        <div className="about-row grid-container md:flex-row md:items-center md:gap-10">
          <img
            src="/assets/teckstack.png"
            alt="Tech stack"
            className="about-row_item h-fit w-full object-contain sm:h-[276px] md:w-1/2"
          />

          <div className="about-row_item md:w-1/2">
            <p className="grid-headtext">TypeScript, front to back</p>
            <p className="grid-subtext">
              I build React.js and Next.js frontends, React Native mobile apps,
              and Node.js/NestJS services backed by PostgreSQL, MongoDB and
              RabbitMQ &ndash; with Go, Java Spring Boot and Docker in my
              toolbox too.
            </p>

            <Button href="#tech" containerClass="mt-8 w-full sm:mx-0 sm:w-fit">
              Explore my tech stack
            </Button>
          </div>
        </div>

        <div className="about-row grid-container md:flex-row-reverse md:items-center md:gap-10">
          <div className="about-row_item flex h-fit w-full items-center justify-center rounded-3xl sm:h-[326px] md:w-1/2">
            <Globe
              height={326}
              width={326}
              backgroundColor="rgba(0, 0, 0, 0)"
              showAtmosphere
              globeImageUrl="/assets/earth-night.jpg"
              bumpImageUrl="/assets/earth-topology.png"
              labelsData={[
                {
                  lat: 10.8231,
                  lng: 106.6297,
                  text: "I'm here!",
                  color: "white",
                  size: 20,
                },
              ]}
            />
          </div>

          <div className="about-row_item md:w-1/2">
            <p className="grid-headtext">
              Based in Ho Chi Minh City, open to remote work.
            </p>

            <p className="grid-subtext">
              I work directly with clients and product teams across time zones,
              turning changing requirements into working software &ndash; even
              on tight deadlines.
            </p>

            <Button
              href="#contact"
              containerClass="mt-8 w-full sm:mx-0 sm:w-fit"
              isBeam
            >
              Contact Me
            </Button>
          </div>
        </div>

        <div className="about-row grid-container md:flex-row md:items-center md:gap-10">
          <img
            src="/assets/grid3.png"
            alt="Coding"
            className="about-row_item h-fit w-full object-contain sm:h-[266px] md:w-1/2"
          />

          <div className="about-row_item md:w-1/2">
            <p className="grid-headtext">Owning features end to end</p>
            <p className="grid-subtext">
              From an AI-powered learning platform with automated grading to
              hospital ERP dashboards and a global K-pop fandom app, I enjoy
              taking features from spec to production. I work spec-first, then
              use AI coding agents to ship faster without losing architectural
              consistency.
            </p>
          </div>
        </div>

        <div className="about-row grid-container md:flex-row-reverse md:items-center md:gap-10">
          <img
            src="/assets/grid4.png"
            alt="Email"
            className="about-row_item h-fit w-full object-cover sm:h-[276px] sm:object-top md:w-1/2"
          />

          <div className="about-row_item space-y-4 md:w-1/2">
            <p className="grid-headtext">
              Have a project in mind? Let&apos;s talk.
            </p>
            <p className="grid-subtext">
              Copy my email and drop me a line about what you&apos;re building.
            </p>

            <div className="copy-container">
              <Button onClick={handleCopy} containerClass="w-full">
                <img
                  src={hasCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
                  alt={hasCopied ? "Check" : "Copy"}
                  className="size-5"
                />
                {hasCopied ? "Copied to clipboard" : "Copy Email"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
