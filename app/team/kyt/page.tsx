"use client";

import styles from "./kyt.module.css";
import TeamCard from "../../components/TeamCard";

type Member = { name: string; photo?: string };

type Section = {
  id: string;
  label: string;
  panelImage: string;
  members: Member[];
  layout: "two" | "six";
};

const sections: Section[] = [
  {
    id: "pi",
    label: "PROJECT INVESTIGATOR",
    panelImage: "/knowurteam/investigator.png",
    members: [{ name: "NAME" }, { name: "NAME" }],
    layout: "two",
  },
  {
    id: "pl",
    label: "PROJECT LEADS",
    panelImage: "/knowurteam/teamlead.png",
    members: [{ name: "NAME" }, { name: "NAME" }],
    layout: "two",
  },
  {
    id: "wl",
    label: "WET LAB",
    panelImage: "/knowurteam/wetleb.png",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "dl",
    label: "DRY LAB",
    panelImage: "/knowurteam/drylab.png",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "hp",
    label: "HUMAN PRACTICES",
    panelImage: "/knowurteam/human.png",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "web",
    label: "WEB",
    panelImage: "/knowurteam/web.png",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
];

export default function KytPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/team_pic.png"
          alt="iGEM IIT Bombay Team"
          className={styles.heroImage}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle} style={{ lineHeight: 1.1 }}>
            TEAM<br />PHOTO
          </h1>
        </div>
      </section>

      {/* ── Folder Sections ── */}
      <div className="w-full flex flex-col items-center">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            className="w-full relative flex flex-col items-center"
            style={{
              marginTop: idx === 0 ? "2vw" : "-14vw", // Small gap above the first panel, then overlap seams
              zIndex: idx + 1
            }}
          >
            {/* Background Panel Image */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={section.panelImage}
                alt={`${section.label} Background`}
                className="w-full h-full object-fill"
              />
            </div>

            {/* Content Container */}
            <div
              className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center"
              style={{
                paddingTop: "24vw", // Space for the folder tab
                paddingBottom: "16vw" // Consistent padding
              }}
            >
              {section.layout === "two" ? (
                // Leads: 2 large cards (362px @ 1440). width 55.8%, gap 9.84%
                <div className="mx-auto grid grid-cols-2 w-[85%] md:w-[55.8%] gap-x-[9.84%]">
                  {section.members.map((member, i) => (
                    <TeamCard key={i} name={member.name} photo={member.photo} />
                  ))}
                </div>
              ) : (
                // Teams: 3 columns of smaller cards (247px @ 1440). width 74.5%, gap 15.4%
                <div className="mx-auto grid grid-cols-2 md:grid-cols-3 w-[92%] md:w-[74.5%] gap-x-[6%] md:gap-x-[15.4%] gap-y-[7%] md:gap-y-[5%]">
                  {section.members.map((member, i) => (
                    <TeamCard key={i} name={member.name} photo={member.photo} />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
