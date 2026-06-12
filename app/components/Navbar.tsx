"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type SubnavItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  subnav?: SubnavItem[];
};

const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Project",
    href: "/project",
    subnav: [
      { label: "Description", href: "/#project-description" },
      { label: "Safety", href: "/#safety" },
      { label: "Design", href: "/#design" },
      { label: "Contribution", href: "/#contribution" },
      { label: "Cooling Measurement", href: "/#cooling-measurement" },
      { label: "News Headlines", href: "/#news-headlines" },
      { label: "Future Plans", href: "/#future-plans" },
    ],
  },
  {
    label: "WetLab",
    href: "/wet-lab",
    subnav: [
      { label: "Notebook", href: "/wet-lab#notebook" },
      { label: "Protocol", href: "/wet-lab#protocol" },
      { label: "Parts", href: "/wet-lab#parts" },
      { label: "Result", href: "/wet-lab#result" },
      { label: "DBTL", href: "/wet-lab#dbtl" },
    ],
  },
  {
    label: "DryLab",
    href: "/dry-lab",
    subnav: [
      { label: "Model", href: "/dry-lab#model" },
      { label: "Software", href: "/dry-lab#software" },
      { label: "Hardware", href: "/dry-lab#hardware" },

    ],
  },
  {
    label: "HumanPractices",
    href: "/human-practices",
    subnav: [
      { label: "Integrated Human Practices", href: "/human-practices#integrated-human-practices" },
      { label: "Education", href: "/human-practices#education" },
      { label: "Sustainability", href: "/human-practices#sustainability" },
      { label: "Entrepreneurship", href: "/human-practices#entrepreneurship" },
    ],
  },
  {
    label: "Team",
    href: "/team",
    subnav: [
      { label: "Know Your Team", href: "/team#kyt" },
      { label: "Attributions", href: "/team#attributions" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenTab, setMobileOpenTab] = useState<string | null>(null);

  return (
    <header className="w-full border-b border-black/10 bg-zinc-200/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:px-16">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/igem-iitb-logo.png"
            alt="iGEM IITB Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </Link>

        {/* Desktop*/}
        <nav className="hidden lg:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-lg text-zinc-700 hover:text-zinc-900 montserrat-semibold"
                >
                  <span>{item.label}</span>
                  {item.subnav?.length ? <span className="text-xs">▾</span> : null}
                </Link>

                {item.subnav?.length ? (
                  <div className="invisible absolute right-0 top-full z-20 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-72 rounded-xl border border-black/10 bg-white p-3 shadow-lg">
                      <ul className="space-y-1">
                        {item.subnav.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className="block rounded-lg px-3 py-2 text-base text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 montserrat-semibold"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/*Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden p-2 rounded-md text-zinc-700 hover:bg-zinc-300/50"
        >
          <span className="sr-only">Open Menu</span>

          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                mobileOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile*/}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-black/10 bg-zinc-100"
        >
          <div className="flex flex-col p-4">
            {navigation.map((item) => {
              const isOpen = mobileOpenTab === item.label;

              return (
                <div key={item.href} className="mb-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.href}
                      className="flex-1 rounded-md px-3 py-3 text-lg text-zinc-700 hover:bg-zinc-200 montserrat-semibold"
                    >
                      {item.label}
                    </Link>

                    {item.subnav?.length ? (
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenTab(isOpen ? null : item.label)
                        }
                        aria-expanded={isOpen}
                        className="rounded-md px-3 py-3 text-zinc-700 hover:bg-zinc-200"
                      >
                        <span className="text-xs">▾</span>
                      </button>
                    ) : null}
                  </div>

                  {item.subnav?.length && isOpen ? (
                    <div className="ml-3 mt-1 border-l border-black/10 pl-3">
                      {item.subnav.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block rounded-md px-3 py-2 text-base text-zinc-600 hover:bg-zinc-200 montserrat-semibold"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}