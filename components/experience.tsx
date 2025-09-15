import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function Experience() {
  const data = [
    {
      id: "syneos",
      title: "Syneos Health",
      content: (
        <div>
          <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
            <b>Senior Frontend Developer</b> | Feb 2024 – Present <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              React.js, Remix.js, React Native, TypeScript, Tailwind, Prisma,
              Node.js, AWS, Docker, Azure OpenAI
            </span>
          </p>
        </div>
      ),
    },
    {
      id: "ltimindtree",
      title: "LTIMindtree Ltd",
      content: (
        <>
          <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
            <b>Senior Software Engineer</b> | Oct 2021 – Feb 2024 <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              Next.js, Redux, React Native, Node.js, Express.js, MongoDB,
              Marketing Integrations
            </span>
          </p>
        </>
      ),
    },
    {
      id: "pitangent",
      title: "Pitangent Analytics",
      content: (
        <>
          <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
            <b>Full Stack Developer</b> | Feb 2021 – Sep 2021 <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              React.js, Redux, Laravel, AWS S3, REST APIs, MySQL
            </span>
          </p>
        </>
      ),
    },
    {
      id: "msweb",
      title: "MS Web Design",
      content: (
        <>
          <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
            <b>Full Stack Developer</b> | Jul 2020 – Feb 2021 <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              Shopify (REST/GraphQL), React.js, Node.js, Express.js, PHP
            </span>
          </p>
        </>
      ),
    },
    {
      id: "thinksurf",
      title: "Think Surf Media",
      content: (
        <>
          <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
            <b>Web Developer</b> | Jul 2019 – Apr 2020 <br />
            <span className="text-neutral-700 dark:text-neutral-300">
              React.js, PHP, MySQL, AJAX
            </span>
          </p>
        </>
      ),
    },
    // {
    //   id: "amity",
    //   title: "Amity University",
    //   content: (
    //     <div>
    //       <p className="text-sm md:text-base lg:text-lg text-neutral-800 dark:text-neutral-200">
    //         <b>B.Tech, Computer Science & Engineering</b> | 2015 – 2019
    //       </p>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
