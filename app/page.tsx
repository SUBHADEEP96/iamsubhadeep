import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { NavbarDemo as Navbar } from "@/components/navbar";
import Skills from "@/components/skills";
import { Suspense } from "react";

import GitHubProjectsSliderClient from "@/components/GitHubProjectsSlider";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      <Skills />

      <div>
        <Suspense fallback={<div>Loading Projects...</div>}>
          <GitHubProjectsSliderClient
            username="SUBHADEEP96"
            topic="ai"
            limit={6}
            useApiRoute={true}
          />
        </Suspense>
      </div>

      <Experience />
    </div>
  );
}
