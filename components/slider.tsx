"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
export type BrandLogo = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
};

export interface BrandSliderProps {
  logos: BrandLogo[];
  speedSec?: number;
  heightClass?: string;
  gapClass?: string;
  className?: string;
}

const BrandSlider: React.FC<BrandSliderProps> = ({
  logos,
  speedSec = 25,
  heightClass = "h-16",
  gapClass = "gap-10",
  className = "",
}) => {
  // Use stable animation name to avoid hydration mismatch
  const animName = React.useId().replace(/[:]/g, "_");

  const loopLogos = [...logos, ...logos];

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        @keyframes ${animName} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className={`group relative overflow-hidden ${heightClass}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-neutral-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent dark:from-neutral-950" />

        <div
          className={`flex ${gapClass} items-center whitespace-nowrap will-change-transform`}
          style={{
            width: "200%",
            animation: `${animName} ${speedSec}s linear infinite`,
          }}
        >
          <Lane logos={logos} heightClass={heightClass} />
          <Lane logos={logos} heightClass={heightClass} />
        </div>
      </div>
    </div>
  );
};

const Lane: React.FC<{ logos: BrandLogo[]; heightClass: string }> = ({
  logos,
  heightClass,
}) => {
  return (
    <div
      className={`flex items-center ${heightClass.replace("h-", "min-h-")}`}
      style={{ width: "50%" }}
    >
      {logos.map((logo, idx) => (
        <LogoItem key={`${logo.src}-${idx}`} logo={logo} />
      ))}
    </div>
  );
};

const LogoItem: React.FC<{ logo: BrandLogo }> = ({ logo }) => {
  const img = (
    <img
      src={logo.src}
      alt={logo.alt}
      loading="lazy"
      decoding="async"
      className="h-10 w-auto md:h-12 lg:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
      width={logo.width}
      height={logo.height}
      draggable={false}
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        className="mx-6 md:mx-8 lg:mx-10 inline-flex items-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        {img}
      </a>
    );
  }

  return (
    <span className="mx-6 md:mx-8 lg:mx-10 inline-flex items-center">
      {img}
    </span>
  );
};

export default BrandSlider;
