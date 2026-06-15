"use client";

import styles from "./cards.module.css";
import { ProjectLeads, WetLab, DryLab, HumanPractices, WebTeam } from "../../components/cards";

export default function KytPage() {
  return (
    <div className="relative min-h-screen bg-[#f1f1f1] text-white pb-16">
      {/* Hero Section: 100vh Team Photo starting from top (sliding under sticky header) */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-900 via-indigo-950 to-[#00003d] mt-[-72px]">
        {/* Team photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/team_pic.png"
          alt="iGEM IIT Bombay Team"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          onError={(e) => {
            // If the image fails to load, hide it so the CSS gradient fallback shows
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Dark overlay & Text Content (padded top to offset header) */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center z-10 pt-[72px]">
          <h1
            className="text-5xl md:text-8xl font-black tracking-widest uppercase drop-shadow-2xl text-white select-none"
            style={{ fontFamily: "var(--font-mont), sans-serif" }}
          >
            Meet Our Team
          </h1>
          <div className="w-24 h-1.5 bg-indigo-500 my-6 rounded-full shadow-lg"></div>
          <p className="text-lg md:text-2xl font-medium tracking-wide text-zinc-100 max-w-2xl drop-shadow-md">
            iGEM IIT Bombay 2026
          </p>

          {/* Animated Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-xs font-semibold tracking-widest text-zinc-300 uppercase mb-2">
              Scroll Down
            </span>
            <svg
              className="w-6 h-6 text-zinc-300 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>


      {/* Spacer */}
      <div className="h-[10vw] w-full" />

      {/* Team Details Sections */}
      <div className="w-full relative z-20 aspect-[1440/1800]">
        <div className="absolute top-[0%] left-0 w-full z-10">
          <WebTeam />
        </div>
        <div className="absolute top-[3%] left-0 w-full z-20">
          <HumanPractices />
        </div>
        <div className="absolute top-[8%] left-0 w-full z-30">
          <DryLab />
        </div>
        <div className="absolute top-[17%] left-0 w-full z-40">
          <WetLab />
        </div>
        <div className="absolute top-[22%] left-0 w-full z-50">
          <ProjectLeads />
        </div>
      </div>
    </div>
  );
}
