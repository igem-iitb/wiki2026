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
      { label: "Know Your Team", href: "/team/kyt" },
      { label: "Attributions", href: "/team/attribution" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenTab, setMobileOpenTab] = useState<string | null>(null);

  return (
   <header className="sticky top-0 z-[999] w-full border-b border-black/10 bg-zinc-200/80 shadow-sm backdrop-blur-sm">
 <div className="mx-auto max-w-[1440px] w-full flex h-[72px] items-center justify-between px-8 sm:px-12 lg:px-16">

    {/* Logo */}
    <Link
      href="/"
      className="flex items-center mr-12"
      style={{ marginLeft: "40px" }}
    >
      <Image
        src="/igem-iitb-logo.png"
        alt="iGEM IITB Logo"
        width={68}
        height={68}
        className="object-contain"
      />
    </Link>

    {/* Desktop Navigation */}
    <nav
      className="hidden lg:block"
      aria-label="Primary"
    >
      <ul className="flex items-center gap-5 xl:gap-7">
        {navigation.map((item) => (
          <li key={item.href} className="group relative">
            {item.subnav?.length ? (
              <span className="flex items-center gap-1 rounded-md px-3 py-1.5 text-lg text-zinc-700 cursor-default montserrat-semibold select-none">
                <span>{item.label}</span>
                <span className="text-xs">▾</span>
              </span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 rounded-md px-3 py-1.5 text-lg text-zinc-700 transition hover:bg-zinc-300/60 hover:text-zinc-950 montserrat-semibold"
              >
                <span>{item.label}</span>
              </Link>
            )}

            {item.subnav?.length ? (
              <div className="invisible absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-72 rounded-xl border border-black/10 bg-white p-2 shadow-lg">
                  <ul className="space-y-1">
                    {item.subnav.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className="block rounded-lg py-2.5 text-base text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:text-indigo-600 hover:translate-x-1 active:scale-[0.98] active:bg-zinc-100 montserrat-semibold"
                          style={{ paddingLeft: "24px", paddingRight: "24px" }}
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

    {/* Hamburger */}
    <button
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-expanded={mobileOpen}
      aria-controls="mobile-menu"
      className="justify-self-end rounded-md p-2 text-zinc-700 hover:bg-zinc-300/50 lg:hidden"
      style={{ marginRight: "24px" }}
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

  {/* Mobile Menu */}
  {mobileOpen && (
    <div id="mobile-menu" className="absolute top-full left-0 right-0 border-t border-black/5 bg-zinc-50 lg:hidden w-full transition-all duration-200 shadow-lg z-[999]">
      <nav className="px-8 py-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.href} className="border-b border-zinc-200 last:border-0 pb-2 last:pb-0">
              <div className="flex items-center justify-between w-full">
                {item.subnav?.length ? (
                  <button
                    onClick={() => setMobileOpenTab(mobileOpenTab === item.label ? null : item.label)}
                    className="w-full text-left flex items-center justify-between py-2 text-lg font-semibold text-zinc-800 hover:text-indigo-600 montserrat-semibold"
                  >
                    <span>{item.label}</span>
                    <span className="text-zinc-500 text-lg">
                      {mobileOpenTab === item.label ? "▴" : "▾"}
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2 text-lg font-semibold text-zinc-800 hover:text-indigo-600 montserrat-semibold"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
              {item.subnav?.length && mobileOpenTab === item.label ? (
                <ul className="pl-4 mt-1 space-y-1 bg-white/60 rounded-lg p-2 border border-black/5">
                  {item.subnav.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-base text-zinc-600 hover:text-indigo-600 pl-3 border-l border-zinc-300 hover:border-indigo-500 transition-all duration-150 montserrat-semibold"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )}
</header>
  );
}