"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import styles from "./kyt.module.css";

type Member = { name: string; photo?: string };

type Section = {
  id: string;
  label: string;
  panelImage: string | null;
  bg: string;
  textColor: string;
  swipeTextColor: string;
  members: Member[];
  layout: "two" | "three" | "six";
};

const sections: Section[] = [
  {
    id: "pi",
    label: "PROJECT INVESTIGATOR",
    panelImage: "/knowurteam/investigator.png",
    bg: "#00003D",
    textColor: "#F2E6EE",
    swipeTextColor: "#F1F1F1",
    members: [{ name: "NAME" }, { name: "NAME" }],
    layout: "two",
  },
  {
    id: "pl",
    label: "PROJECT LEADS",
    panelImage: "/knowurteam/teamlead.png",
    bg: "#F2E6EE",
    textColor: "#00003D",
    swipeTextColor: "#00003D",
    members: [{ name: "NAME" }, { name: "NAME" }],
    layout: "two",
  },
  {
    id: "wl",
    label: "WET LAB",
    panelImage: "/knowurteam/wetleb.png",
    bg: "#B8C4E8",
    textColor: "#00003D",
    swipeTextColor: "#00003D",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "dl",
    label: "DRY LAB",
    panelImage: "/knowurteam/drylab.png",
    bg: "#F2E6EE",
    textColor: "#00003D",
    swipeTextColor: "#00003D",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "hp",
    label: "HUMAN PRACTICES",
    panelImage: "/knowurteam/human.png",
    bg: "#B8C4E8",
    textColor: "#00003D",
    swipeTextColor: "#00003D",
    members: Array.from({ length: 6 }, () => ({ name: "NAME" })),
    layout: "six",
  },
  {
    id: "web",
    label: "WEB",
    panelImage: "/knowurteam/web.png",
    bg: "#F2E6EE",
    textColor: "#00003D",
    swipeTextColor: "#00003D",
    members: [{ name: "NAME" }, { name: "NAME" }, { name: "NAME" }],
    layout: "three",
  },
];

const stackedFolders = [
  { src: "/knowurteam/web.png", left: "50.49%", top: "6.7%", width: "45.43%", height: "65%", zIndex: 1 },
  { src: "/knowurteam/human.png", left: "21.81%", top: "14%", width: "74.10%", height: "57%", zIndex: 2 },
  { src: "/knowurteam/drylab.png", left: "3.96%", top: "23.1%", width: "91.74%", height: "39%", zIndex: 3 },
  { src: "/knowurteam/wetleb.png", left: "4.17%", top: "33.5%", width: "91.74%", height: "38%", zIndex: 4 },
  { src: "/knowurteam/teamlead.png", left: "3.96%", top: "42.2%", width: "91.74%", height: "29%", zIndex: 5 },
  { src: "/knowurteam/investigator.png", left: "3.82%", top: "53.7%", width: "92.08%", height: "21%", zIndex: 6 },
];

export default function KytPage() {
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const mouseStartY = useRef(0);
  const isDragging = useRef(false);

  const goToSection = useCallback(
    (index: number) => {
      if (isTransitioning || index < 0 || index >= sections.length) return;
      setIsTransitioning(true);
      setCurrentSection(index);
      setTimeout(() => setIsTransitioning(false), 750);
    },
    [isTransitioning]
  );

  const handleExpand = useCallback(() => {
    setCurrentSection(0);
    setExpanded(true);
    document.body.style.overflow = "hidden";
  }, []);

  const handleCollapse = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setExpanded(false);
      setClosing(false);
      document.body.style.overflow = "";
    }, 400);
  }, []);

  // Touch events (mobile swipe)
  useEffect(() => {
    if (!expanded || closing) return;
    const el = overlayRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 60) return;
      if (delta > 0 && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      } else if (delta < 0) {
        if (currentSection > 0) goToSection(currentSection - 1);
        else handleCollapse();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [expanded, closing, currentSection, goToSection, handleCollapse]);

  // Mouse drag events (desktop click-and-drag)
  useEffect(() => {
    if (!expanded || closing) return;
    const el = overlayRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      mouseStartY.current = e.clientY;
      isDragging.current = true;
      el.style.cursor = "grabbing";
    };

    const onMouseUp = (e: MouseEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      el.style.cursor = "grab";
      const delta = mouseStartY.current - e.clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0 && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
      } else if (delta < 0) {
        if (currentSection > 0) goToSection(currentSection - 1);
        else handleCollapse();
      }
    };

    const onMouseLeave = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.style.cursor = "";
    };
  }, [expanded, closing, currentSection, goToSection, handleCollapse]);

  // Keyboard events
  useEffect(() => {
    if (!expanded || closing) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        if (currentSection < sections.length - 1) goToSection(currentSection + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentSection > 0) goToSection(currentSection - 1);
        else handleCollapse();
      } else if (e.key === "Escape") {
        handleCollapse();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, closing, currentSection, goToSection, handleCollapse]);

  return (
    <div className={styles.page}>
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
          <h1 className={styles.heroTitle}>Meet Our Team</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSubtitle}>iGEM IIT Bombay 2026</p>
          <div className={styles.scrollIndicator}>
            <span>Scroll Down</span>
            <svg
              className={styles.scrollArrow}
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

      {/* ── Stacked Folders Section ── */}
      <section className={styles.stackSection}>
        <div className={styles.stackContainer} onClick={handleExpand}>
          <span className={styles.stackTitle}>Team</span>

          {stackedFolders.map((f) => (
            <div
              key={f.src}
              className={styles.folderClip}
              style={{
                left: f.left,
                top: f.top,
                width: f.width,
                height: f.height,
                zIndex: f.zIndex,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" className={styles.folderImage} loading="lazy" />
            </div>
          ))}
        </div>

        <button className={styles.clickButton} onClick={handleExpand}>
          Click
        </button>
      </section>

      {/* ── Expanded Sections Overlay ── */}
      {expanded && (
        <div
          ref={overlayRef}
          className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
        >
          <button className={styles.closeButton} onClick={handleCollapse}>
            ✕
          </button>

          {/* Dot navigation */}
          <div className={styles.dots}>
            {sections.map((s, i) => (
              <button
                key={s.id}
                className={`${styles.dot} ${i === currentSection ? styles.dotActive : ""}`}
                onClick={() => goToSection(i)}
                aria-label={s.label}
              />
            ))}
          </div>

          <div
            className={styles.sectionsTrack}
            style={{ transform: `translateY(-${currentSection * 100}vh)` }}
          >
            {sections.map((section, idx) => (
              <div
                key={section.id}
                className={styles.section}
                style={{ backgroundColor: "#000000" }}
              >
                {/* Panel background image */}
                {section.panelImage && (
                  <div className={styles.sectionPanel}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.panelImage}
                      alt=""
                    />
                  </div>
                )}

                {/* Cards grid */}
                <div
                  className={`${styles.cardsArea} ${
                    section.layout === "two"
                      ? styles.twoGrid
                      : section.layout === "three"
                        ? styles.threeGrid
                        : styles.sixGrid
                  }`}
                >
                  {section.members.map((member, i) => (
                    <div key={i} className={styles.card}>
                      <div className={styles.cardOuter}>
                        <div className={styles.cardPhoto}>
                          {member.photo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={member.photo}
                              alt={member.name}
                              className={styles.cardPhotoImg}
                            />
                          )}
                        </div>
                        <p className={styles.cardName}>{member.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Swipe indicator */}
                {idx < sections.length - 1 && (
                  <p
                    className={styles.swipeText}
                    style={{ color: section.swipeTextColor }}
                  >
                    ↑ Swipe to explore
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
