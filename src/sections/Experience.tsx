import { motion } from "motion/react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { experiences } from "../constants";
import { staggerContainer, textVariant } from "../lib/motion";

// Library default is triggerOnce: true; re-arm so each card bounces in again
// every time it scrolls back into view
const CARD_OBSERVER_PROPS = {
  rootMargin: "0px 0px -40px 0px",
  triggerOnce: false,
};

interface ExperienceCardProps {
  experience: (typeof experiences)[number];
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#0e0e10",
      color: "#fff",
      border: "1px solid #1c1c21",
      boxShadow: "none",
    }}
    contentArrowStyle={{ borderRight: "7px solid #1c1c21" }}
    iconStyle={{ background: experience.iconBg }}
    date={experience.date}
    dateClassName="text-white-600"
    intersectionObserverProps={CARD_OBSERVER_PROPS}
    icon={
      <div className="flex size-full items-center justify-center">
        <img
          src={experience.icon}
          alt={experience.companyName}
          className="size-[85%] rounded-full object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
      <p
        className="text-base font-semibold text-white-600"
        style={{ margin: 0 }}
      >
        {experience.companyName}
      </p>
    </div>

    <ul className="mt-5 ml-5 list-disc space-y-2">
      {experience.points.map((point) => (
        <li key={point} className="pl-1 text-sm tracking-wider text-white-800">
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

export const Experience = () => (
  <motion.section
    className="my-20 c-space"
    id="work"
    variants={staggerContainer()}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.25 }}
  >
    <motion.div variants={textVariant()}>
      <p className="text-sm tracking-wider text-white-500 uppercase sm:text-lg">
        What I have done so far
      </p>
      <h3 className="head-text">Work Experience.</h3>
    </motion.div>

    <div className="mt-20 flex flex-col">
      <VerticalTimeline lineColor="#1c1c21">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </VerticalTimeline>
    </div>
  </motion.section>
);
