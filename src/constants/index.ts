import type { CSSProperties } from "react";

export const links = {
  contactEmail: "trantanh227@gmail.com",
  sourceCode: "https://github.com/TrTueTah",
};

// Shared by the About section and the hero computer screen
export const aboutIntro = {
  title: "Hi, I'm Tanh Tran",
  description:
    "A full-stack software engineer in Ho Chi Minh City, building production web and mobile apps end to end with React, Next.js, React Native and NestJS.",
  image: "/assets/grid1.png",
};

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Work",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
] as const;

export interface ProjectTag {
  id: number;
  name: string;
  path: string;
  // Dark logos that need to be flipped to white on the dark tag tile
  invert?: boolean;
}

export interface Project {
  title: string;
  // Short name shown on the device screen
  name: string;
  initials: string;
  company: string;
  // React Native projects are shown on an iPhone, the rest on a MacBook
  device: "iphone" | "macbook";
  accent: string;
  tagline: string;
  desc: string;
  subdesc: string;
  // Source code link; hidden when missing
  github?: string;
  // Screenshots cycled on the device screen (placeholder screen when missing)
  screens?: string[];
  logoStyle: CSSProperties;
  spotlight: string;
  tags: ProjectTag[];
}

export const myProjects: Project[] = [
  {
    title: "AI Mentor – AI-Powered Educational Assistant",
    name: "AI Mentor",
    initials: "AI",
    company: "724Softwares",
    device: "macbook",
    accent: "#8b5cf6",
    screens: ["/textures/project/ai-mentor.png"],
    tagline:
      "AI-driven learning with automated grading and personalized feedback",
    desc: "An AI-driven learning platform with authentication, course management, progress tracking, automated grading and personalized feedback.",
    subdesc:
      "I built the NestJS backend services, the Next.js web platform and the React Native mobile app, using RabbitMQ for asynchronous processing and TanStack Query on the client.",
    logoStyle: {
      backgroundColor: "#1E1633",
      border: "0.2px solid #2B2046",
      boxShadow: "0px 0px 60px 0px #8B5CF64D",
    },
    spotlight: "/assets/spotlight1.png",
    tags: [
      { id: 1, name: "NestJS", path: "/assets/tech/nestjs.png" },
      { id: 2, name: "PostgreSQL", path: "/assets/tech/postgresql.png" },
      { id: 3, name: "RabbitMQ", path: "/assets/tech/rabbitmq.png" },
      { id: 4, name: "Next.js", path: "/assets/tech/nextjs.png", invert: true },
      { id: 5, name: "React Native", path: "/assets/react.svg" },
    ],
  },
  {
    title: "Higher – K-pop Idol & Fandom Platform",
    name: "Higher",
    initials: "H",
    company: "WALA - ICT",
    device: "iphone",
    accent: "#ec4899",
    screens: [
      "/textures/project/higher-1.jpg",
      "/textures/project/higher-2.jpg",
      "/textures/project/higher-3.jpg",
      "/textures/project/higher-4.jpg",
    ],
    tagline: "Connecting idols and fans beyond passive voting",
    desc: "A global fandom platform that connects K-pop idols and fans beyond passive voting, with community and engagement features.",
    subdesc:
      "I developed the React Native mobile app and the NestJS backend microservices, backed by MongoDB and REST APIs.",
    logoStyle: {
      backgroundColor: "#2A1623",
      border: "0.2px solid #3F1F33",
      boxShadow: "0px 0px 60px 0px #EC48994D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      { id: 1, name: "React Native", path: "/assets/react.svg" },
      { id: 2, name: "NestJS", path: "/assets/tech/nestjs.png" },
      { id: 3, name: "MongoDB", path: "/assets/tech/mongodb.png" },
      { id: 4, name: "Kafka", path: "/assets/tech/kafka.png", invert: true },
    ],
  },
  {
    title: "Regen – Hospital ERP System",
    name: "Regen",
    initials: "R",
    company: "WALA - ICT",
    device: "macbook",
    accent: "#10b981",
    screens: ["/textures/project/regen.png"],
    tagline: "Hospital ERP dashboards for treatment records and reporting",
    desc: "A hospital ERP system with admin dashboards for treatment records, reporting and day-to-day operational workflows.",
    subdesc:
      "I implemented responsive dashboards in React.js with Ant Design and TanStack Query, consuming REST APIs for real-time data synchronization.",
    logoStyle: {
      backgroundColor: "#0F2A22",
      border: "0.2px solid #16392E",
      boxShadow: "0px 0px 60px 0px #10B9814D",
    },
    spotlight: "/assets/spotlight3.png",
    tags: [{ id: 1, name: "React.js", path: "/assets/react.svg" }],
  },
  {
    title: "ATALINK – Unified Supply Chain Management Platform",
    name: "ATALINK",
    initials: "A",
    company: "ATALINK",
    device: "iphone",
    accent: "#f97316",
    screens: [
      "/textures/project/atalink-1.png",
      "/textures/project/atalink-2.png",
    ],
    tagline: "One B2B platform for suppliers, distributors and customers",
    desc: "A B2B supply chain platform connecting businesses with their suppliers, distributors and customers.",
    subdesc:
      "I built backend services with NestJS and PostgreSQL, mobile features in React Native with Redux Toolkit and Redux Saga, and customized Odoo ERP modules, all shipped with Docker.",
    logoStyle: {
      backgroundColor: "#2A1A0F",
      border: "0.2px solid #3D2615",
      boxShadow: "0px 0px 60px 0px #F973164D",
    },
    spotlight: "/assets/spotlight4.png",
    tags: [
      { id: 1, name: "NestJS", path: "/assets/tech/nestjs.png" },
      { id: 2, name: "PostgreSQL", path: "/assets/tech/postgresql.png" },
      { id: 3, name: "Docker", path: "/assets/tech/docker.png" },
      { id: 4, name: "React Native", path: "/assets/react.svg" },
      { id: 5, name: "Redux Toolkit", path: "/assets/tech/redux.png" },
    ],
  },
  {
    title: "NFT-Based Online Notarization Platform",
    name: "NFT Notary",
    initials: "N",
    company: "University Project",
    device: "macbook",
    accent: "#3b82f6",
    screens: ["/textures/project/nft.png"],
    tagline: "Secure document storage and verification via NFTs",
    desc: "A full-stack blockchain notarization platform for secure document storage and verification via NFTs.",
    subdesc:
      "I built the NestJS/TypeScript backend and REST APIs, with smart-contract-backed notarization on Ethereum (Solidity) for trust and transparency.",
    github: "https://github.com/ASE-UIT",
    logoStyle: {
      backgroundColor: "#111C33",
      border: "0.2px solid #1A2A4A",
      boxShadow: "0px 0px 60px 0px #3B82F64D",
    },
    spotlight: "/assets/spotlight5.png",
    tags: [
      { id: 1, name: "NestJS", path: "/assets/tech/nestjs.png" },
      { id: 2, name: "TypeScript", path: "/assets/tech/typescript.png" },
      { id: 3, name: "React.js", path: "/assets/react.svg" },
      {
        id: 4,
        name: "Solidity",
        path: "/assets/tech/solidity.png",
        invert: true,
      },
      { id: 5, name: "MongoDB", path: "/assets/tech/mongodb.png" },
    ],
  },
  {
    title: "Enigma – AI-Powered Custom Merch Platform",
    name: "Enigma",
    initials: "E",
    company: "SEAPP Contest 2024",
    device: "iphone",
    accent: "#a855f7",
    screens: [
      "/textures/project/enigma-1.png",
      "/textures/project/enigma-2.png",
      "/textures/project/enigma-3.png",
      "/textures/project/enigma-4.png",
    ],
    tagline: "AI-generated designs for custom T-shirts and tote bags",
    desc: "A creative design and e-commerce platform for custom T-shirts and tote bags powered by AI, with an easy-to-use customization tool for AI-generated designs.",
    subdesc:
      "It covers order management, real-time sales tracking and seamless fulfillment with printing partners, built with React Native for Android, Node.js and Firestore. Awarded Consolation Prize at SEAPP Contest 2024.",
    github: "https://github.com/fived-studio",
    logoStyle: {
      backgroundColor: "#24133A",
      border: "0.2px solid #341C52",
      boxShadow: "0px 0px 60px 0px #A855F74D",
    },
    spotlight: "/assets/spotlight2.png",
    tags: [
      { id: 1, name: "React Native", path: "/assets/react.svg" },
      { id: 2, name: "Android", path: "/assets/tech/android.png" },
      { id: 3, name: "Node.js", path: "/assets/tech/nodejs.png" },
      { id: 4, name: "Firebase", path: "/assets/tech/firebase.png" },
    ],
  },
];

// Newest first
export const experiences = [
  {
    id: 1,
    title: "Software Engineer",
    companyName: "724Softwares",
    icon: "/assets/company/724-logo.jpeg",
    iconBg: "#ffffff",
    date: "Oct 2025 - Sep 2026",
    points: [
      "Delivered end-to-end features across multiple outsourcing projects, building React.js web frontends, Node.js/NestJS backend services and REST APIs, and React Native mobile apps.",
      "Designed and implemented backend microservices with NestJS following clean architecture, improving maintainability and testability of the codebase.",
      "Adopted an AI-assisted, spec-driven development (SDD) workflow, turning requirements into reviewable specs and plans, then using AI coding agents for implementation to ship faster while keeping the architecture consistent.",
      "Built a reusable React Native UI component library, reducing development time across projects.",
      "Collaborated directly with clients to translate changing requirements into technical solutions under tight deadlines.",
    ],
  },
  {
    id: 2,
    title: "Software Engineer",
    companyName: "WALA - ICT",
    icon: "/assets/company/wala-logo.jpeg",
    iconBg: "#ffffff",
    date: "Dec 2024 - Sep 2025",
    points: [
      "Contributed to 3+ outsourcing projects across web (React.js), backend (NestJS, Java Spring Boot) and mobile (React Native) stacks.",
      "Designed and integrated RESTful services and third-party APIs to support client- and server-side business logic across microservices.",
      "Developed scalable, modular components serving diverse client needs across multiple industries.",
    ],
  },
  {
    id: 3,
    title: "Software Engineer (Intern → Full-time)",
    companyName: "ATALINK",
    icon: "/assets/company/atalink-logo.jpeg",
    iconBg: "#ffffff",
    date: "Jul 2024 - Dec 2024",
    points: [
      "Promoted from intern to full-time engineer within the internship period based on technical performance.",
      "Developed backend APIs with NestJS and PostgreSQL, mobile features with React Native, and customized Odoo ERP modules for supply chain workflows.",
      "Took part in Agile ceremonies and the full development lifecycle from planning to deployment, troubleshooting production issues with guidance from senior engineers.",
    ],
  },
] as const;

export const socialLinks = [
  {
    name: "GitHub",
    icon: "/assets/github.svg",
    url: "https://github.com/TrTueTah",
  },
  {
    name: "LinkedIn",
    icon: "/assets/linkedin.svg",
    url: "https://www.linkedin.com/in/tanhtran227",
  },
] as const;

export const techStack = [
  { id: 1, name: "TypeScript", icon: "/assets/tech/typescript.png" },
  { id: 2, name: "Go", icon: "/assets/tech/go.png" },
  { id: 3, name: "NestJS", icon: "/assets/tech/nestjs.png" },
  { id: 4, name: "Next.js", icon: "/assets/tech/nextjs.png" },
  { id: 5, name: "Redux", icon: "/assets/tech/redux.png" },
  { id: 6, name: "Tailwind CSS", icon: "/assets/tech/tailwindcss.png" },
  { id: 7, name: "Spring Boot", icon: "/assets/tech/springboot.png" },
  { id: 8, name: "PostgreSQL", icon: "/assets/tech/postgresql.png" },
  { id: 9, name: "MongoDB", icon: "/assets/tech/mongodb.png" },
  { id: 10, name: "RabbitMQ", icon: "/assets/tech/rabbitmq.png" },
  { id: 11, name: "Docker", icon: "/assets/tech/docker.png" },
  { id: 12, name: "Android", icon: "/assets/tech/android.png" },
  { id: 13, name: "Xcode", icon: "/assets/tech/xcode.png" },
  { id: 14, name: "GitHub", icon: "/assets/tech/github.png" },
  { id: 15, name: "Jira", icon: "/assets/tech/jira.png" },
  { id: 16, name: "Claude", icon: "/assets/tech/claude.png" },
  { id: 17, name: "React", icon: "/assets/tech/react.png" },
  { id: 18, name: "Figma", icon: "/assets/tech/figma.png" },
] as const;

/*
  Display of /models/macbook.glb, measured from the model file (model units).
  <Macbook /> shifts the model so the display center sits at its origin; the
  lid leans back, so the display faces +Z and slightly up.
*/
export const macbookScreen = {
  width: 34.39,
  height: 22.17,
  normal: [0, 0.342, 0.94] as [number, number, number],
};

// Canvas sizes (px) matching each device's display aspect ratio
export const deviceScreenSizes = {
  macbook: [2048, 1320],
  iphone: [900, 1936],
} as const;
