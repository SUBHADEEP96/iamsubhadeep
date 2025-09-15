"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import {
  Github,
  SquareTerminal,
  BotMessageSquare,
  Globe,
  FileUser,
} from "lucide-react";
import { useState } from "react";

export function NavbarDemo() {
  const navItems = [
    {
      icon: <Globe className="w-4 h-4 inline mr-2" />,
      name: "WebView",
      link: "/",
    },
    {
      icon: <SquareTerminal className="w-4 h-4 inline mr-2" />,
      name: "Terminal",
      link: "#terminal",
    },
    {
      icon: <BotMessageSquare className="w-4 h-4 inline mr-2" />,
      name: "ChatBot",
      link: "#chatbot",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="w-12 h-12 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className="text-2xl">SP</p>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://github.com/SUBHADEEP96",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Github />
            </NavbarButton>
            <NavbarButton
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer"
              onClick={() =>
                window.open("/data/Subhadeep_Paul_profile.pdf", "_blank")
              }
            >
              <FileUser />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="w-12 h-12 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
              <p className="text-2xl">SP</p>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() =>
                  window.open(
                    "https://github.com/SUBHADEEP96",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                variant="primary"
                className=""
              >
                <Github />
              </NavbarButton>
              <NavbarButton
                variant="primary"
                className="w-full"
                onClick={() =>
                  window.open("/data/Subhadeep_Paul_profile.pdf", "_blank")
                }
              >
                <FileUser />
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* <DummyContent /> */}

      {/* Navbar */}
    </div>
  );
}
