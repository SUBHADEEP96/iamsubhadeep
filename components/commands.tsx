import React from "react";
import {
  Code,
  Briefcase,
  User,
  Mail,
  GraduationCap,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";

export const commands: { [key: string]: () => React.ReactNode } = {
  help: () => (
    <div className="space-y-3">
      <div className="text-white font-semibold flex items-center">
        <HelpCircle className="w-4 h-4 mr-2" />
        Available Commands:
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <div>
            <span className="text-white">help</span> -{" "}
            <span className="text-white">Show this help</span>
          </div>
          <div>
            <span className="text-white">about</span> -{" "}
            <span className="text-white">About me</span>
          </div>
          <div>
            <span className="text-white">skills</span> -{" "}
            <span className="text-white">Tech stack</span>
          </div>
          <div>
            <span className="text-white">projects</span> -{" "}
            <span className="text-white">Selected work</span>
          </div>
          <div>
            <span className="text-white">experience</span> -{" "}
            <span className="text-white">Roles & impact</span>
          </div>
          <div>
            <span className="text-white">education</span> -{" "}
            <span className="text-white">Degree</span>
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <span className="text-white">leadership</span> -{" "}
            <span className="text-white">Team & community</span>
          </div>
          <div>
            <span className="text-white">contact</span> -{" "}
            <span className="text-white">Reach me</span>
          </div>
          <div>
            <span className="text-white">sudo</span> -{" "}
            <span className="text-white">Fun extras</span>
          </div>
          <div>
            <span className="text-white">clear</span> -{" "}
            <span className="text-white">Clear terminal</span>
          </div>
        </div>
      </div>
    </div>
  ),

  about: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <User className="w-4 h-4 mr-2" />
        About Subhadeep Paul
      </div>
      <div className="space-y-2 text-white">
        <p>
          I&apos;m a Senior Frontend/Full-Stack Engineer with ~6 years building
          secure, large-scale apps and production GenAI solutions across web &
          mobile. I specialize in React/Next/Remix, Node/Python, and end-to-end
          LLM systems (RAG, LangChain/LangGraph, Azure OpenAI, MCP) for real
          business impact.
        </p>
        <p>
          I enjoy taking products from 0→1: architecting data models, wiring
          cloud, shipping polished UX, and instrumenting analytics/A&#47;B to
          iterate fast.
        </p>
      </div>
      <div className="mt-4 p-3 bg-gray-900/50 rounded border border-green-400/20">
        <div className="text-white text-sm mb-2">Quick Facts</div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            GenAI coaching & training products (video, docs, real-time eval)
          </li>
          <li>
            Frontend depth (React, Remix, RN) + backend APIs (Node, Django,
            FastAPI)
          </li>
          <li>Cloud: Azure, AWS, GCP · CI/CD · Docker</li>
          <li>Open to remote full-time, part-time, and consulting</li>
        </ul>
      </div>
    </div>
  ),

  skills: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Code className="w-4 h-4 mr-2" />
        Technical Skills
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white text-sm">
        <div className="space-y-3">
          <div>
            <div className="mb-2">Frontend</div>
            <ul className="space-y-1">
              <li>React.js, Next.js (App Router), Remix.js, React Native</li>
              <li>TypeScript, Zustand/Redux, Tailwind, ShadCN UI</li>
              <li>Testing: Jest, RTL, Cypress</li>
            </ul>
          </div>
          <div>
            <div className="mb-2">Backend & APIs</div>
            <ul className="space-y-1">
              <li>Node.js, Express.js, Python (Django, FastAPI)</li>
              <li>REST, Auth, file/video pipelines</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-2">AI/Agentic</div>
            <ul className="space-y-1">
              <li>Azure OpenAI (GPT-4o), Open-source LLMs</li>
              <li>LangChain, LangGraph, RAG, MCP, AI SDK</li>
              <li>Azure Document Intelligence, Whisper, Video Indexer</li>
            </ul>
          </div>
          <div>
            <div className="mb-2">Cloud, Data & DevOps</div>
            <ul className="space-y-1">
              <li>Azure, AWS, GCP · Vercel · Netlify</li>
              <li>PostgreSQL, MySQL, MongoDB, Vector DB</li>
              <li>Docker, Jenkins, CI/CD</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),

  projects: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        Selected Projects (Impact)
      </div>

      {/* Verbalizer AI */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20 space-y-1">
        <div className="text-white font-medium">
          Verbalizer AI — GenAI Coaching Platform
        </div>
        <div className="text-white text-sm">
          Built web + mobile apps enabling real-time role-play evaluation,
          persona scoring, and analytics; boosted coaching efficiency ~3×.
        </div>
        <div className="text-white text-xs">
          Stack: React, Remix, React Native, Prisma, Docker · Azure OpenAI
          (GPT-4o), Azure Storage, Video Indexer, Whisper
        </div>
      </div>

      {/* Sense AI */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20 space-y-1">
        <div className="text-white font-medium">
          Sense AI — Medical Training Assistant
        </div>
        <div className="text-white text-sm">
          Django CMS app with AI chat, doc/video analysis, and modular agent
          plugins; reduced LMS costs ~40% and training time ~60%.
        </div>
        <div className="text-white text-xs">
          Stack: Python (Django), Azure OpenAI (GPT-4o), Azure Document
          Intelligence, Semantic Kernel, LangChain
        </div>
      </div>

      {/* Modal-Social */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20 space-y-1">
        <div className="text-white font-medium">
          Modal-Social — Community Module
        </div>
        <div className="text-white text-sm">
          End-to-end social community features with Remix, Tailwind, TypeScript,
          AWS.
        </div>
      </div>

      {/* BeiGene Migration */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20 space-y-1">
        <div className="text-white font-medium">
          BeiGene Treatment Landscape — Migration
        </div>
        <div className="text-white text-sm">
          Migrated Angular → Next.js; improved performance and added advanced
          filtering.
        </div>
      </div>

      {/* Doctors Training Portal */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20 space-y-1">
        <div className="text-white font-medium">
          Doctors Training Portal — Quiz Module
        </div>
        <div className="text-white text-sm">
          Implemented robust quiz flows using Remix, Tailwind, Prisma.
        </div>
      </div>

      <div className="text-white text-sm mt-2">
        More work: GitHub @ SUBHADEEP96
      </div>
    </div>
  ),

  experience: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Briefcase className="w-4 h-4 mr-2" />
        Work Experience
      </div>

      {/* Syneos Health */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <div className="text-white font-medium">
            Syneos Health — Senior Frontend Developer
          </div>
          <div className="text-white text-sm">
            Feb 2024 – Present · Remote (India)
          </div>
        </div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            Architected Verbalizer AI (web + mobile), 3× coaching efficiency
            uplift.
          </li>
          <li>
            Built Sense AI training assistant (Django + Azure OpenAI), cut costs
            ~40%.
          </li>
          <li>
            Led Modal-Social community module; migrated BeiGene app
            Angular→Next.js.
          </li>
          <li>Shipped quiz module for Doctors Training Portal.</li>
        </ul>
      </div>

      {/* LTIMindtree */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <div className="text-white font-medium">
            LTIMindtree Ltd — Senior Software Engineer
          </div>
          <div className="text-white text-sm">
            Oct 2021 – Feb 2024 · Kolkata, IN
          </div>
        </div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            Owned Search & Tealium modules (B2B/B2C); mentored 3 junior
            engineers.
          </li>
          <li>
            Built PDP/TN features with Next.js/Redux; integrated marketing
            tools.
          </li>
          <li>
            Designed microservices (Node/Express/Mongo) for high-traffic
            e-commerce.
          </li>
          <li>
            React Native B2B order-tracking app with real-time integrations.
          </li>
        </ul>
      </div>

      {/* Pitangent */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <div className="text-white font-medium">
            Pitangent Analytics — Full Stack Developer
          </div>
          <div className="text-white text-sm">
            Feb 2021 – Sep 2021 · Kolkata, IN
          </div>
        </div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            React/Redux portal components; AWS S3; integrated 40+ REST APIs
            (Laravel).
          </li>
          <li>Migrations, CRUD, complex business logic in Laravel.</li>
          <li>SaaS admin (Swifty) with role-based access & reporting.</li>
        </ul>
      </div>

      {/* MS Web Design */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <div className="text-white font-medium">
            MS Web Design — Full Stack Developer
          </div>
          <div className="text-white text-sm">
            Jul 2020 – Feb 2021 · Remote (Kolkata, IN)
          </div>
        </div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            Shopify admin panels (REST/GraphQL) using PHP/JS for
            OttoCases/Wholesale.
          </li>
          <li>React product customization; Node/Express backend modules.</li>
          <li>Shipped features & perf fixes across 20+ e-commerce stores.</li>
        </ul>
      </div>

      {/* Think Surf Media */}
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
          <div className="text-white font-medium">
            Think Surf Media — Web Developer
          </div>
          <div className="text-white text-sm">
            Jul 2019 – Apr 2020 · Kolkata, IN
          </div>
        </div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            React-based tracking module (Trac On Mobi) with REST integration.
          </li>
          <li>Inventory system (PHP, MySQL, AJAX) for Eurasia Decor.</li>
        </ul>
      </div>
    </div>
  ),

  education: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <GraduationCap className="w-4 h-4 mr-2" />
        Education
      </div>
      <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
        <div className="flex justify-between items-start mb-2">
          <div className="text-white font-medium">
            Amity University — B.Tech, CSE
          </div>
          <div className="text-white text-sm">2015 – 2019 · Kolkata, India</div>
        </div>
      </div>
    </div>
  ),

  leadership: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Users className="w-4 h-4 mr-2" />
        Leadership & Community
      </div>
      <ul className="text-white text-sm space-y-1 list-disc pl-5">
        <li>
          Mentored junior engineers (code reviews, module ownership, best
          practices).
        </li>
        <li>
          Drove performance, analytics and A/B experimentation culture on teams.
        </li>
      </ul>
    </div>
  ),

  contact: () => (
    <div className="space-y-4">
      <div className="text-white font-semibold flex items-center">
        <Mail className="w-4 h-4 mr-2" />
        Get In Touch
      </div>
      <div className="space-y-3">
        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white text-sm mb-3">
            Let&apos;s connect on product engineering or GenAI builds.
          </div>
          <div className="space-y-2 text-white text-sm">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <a
                href="mailto:subhadeep2040@gmail.com"
                className="hover:text-white transition-colors text-white"
              >
                subhadeep2040@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">💼</span>
              <a
                href="https://www.linkedin.com/in/subhadeep1996/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-white"
              >
                linkedin.com/in/subhadeep1996
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🐱</span>
              <a
                href="https://github.com/SUBHADEEP96"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-white"
              >
                github.com/SUBHADEEP96
              </a>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">🌐</span>
              <a
                href="https://www.iamsubhadeep.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-white"
              >
                iamsubhadeep.dev
              </a>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-900/50 rounded border border-green-400/20">
          <div className="text-white text-sm mb-2">Available for</div>
          <ul className="text-white text-sm space-y-1 list-disc pl-5">
            <li>Full-time roles</li>
            <li>Freelance/Part-time builds</li>
            <li>Agentic AI/GenAI consulting</li>
            <li>Technical talks & workshops</li>
          </ul>
        </div>

        <div className="text-white text-sm">Typical response: &lt;24h</div>
      </div>
    </div>
  ),

  sudo: () => (
    <div className="space-y-3">
      <div className="text-white font-semibold flex items-center">
        <Shield className="w-4 h-4 mr-2" />
        sudo access granted...
      </div>
      <div className="p-4 bg-red-900/20 border border-red-400/30 rounded">
        <div className="text-red-400 text-sm mb-2">🚨 SECRET (jk) 🚨</div>
        <ul className="text-white text-sm space-y-1 list-disc pl-5">
          <li>
            Superpower: Turning ambiguous product ideas into shipped features.
          </li>
          <li>Favorite tool: a well-placed console.log()</li>
          <li>Energy source: Coffee + clean PRs.</li>
        </ul>
      </div>
      <div className="text-white text-sm">Back to shipping. 🚀</div>
    </div>
  ),
};
