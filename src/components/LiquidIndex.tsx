import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import '../pages/sustainability.css';

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

/** A single item (bubble) for the liquid index. */
export type LiquidIndexItem = {
  /** Display number (e.g. "01") */
  num: string;
  /** Short label shown next to the bubble */
  label: string;
  /** Subtitle shown below label (e.g. "SDG 6") */
  subtitle: string;
  /** ID of the corresponding content section (used for scroll sync) */
  sectionId: string;
  /** Accent color for this bubble (hex) */
  accent: string;
  /** SVG icon paths rendered inside the bubble (24x24 viewBox).
   *  Used as a fallback when `iconSrc` is not provided. */
  icon: ReactNode;
  /** Optional path to a standalone (white) pictogram SVG rendered as the
   *  central image inside the bubble. Takes precedence over `icon`. */
  iconSrc?: string;
};

export type LiquidIndexProps = {
  /** The items for the left-side liquid nav */
  items: LiquidIndexItem[];
  /** Content sections rendered on the right. Each section MUST have
   *  id={item.sectionId} for scroll sync to work. */
  children: ReactNode;
};

// ─── INTERNAL CONSTANTS ───────────────────────────────────────────────────────

const BUBBLE_R = 80;
const WRAP_R = 60;
const ICON_SCALE = 2.8;
/** Side length of the central pictogram image inside each bubble. */
const ICON_IMG = 92;

type NodePos = { cx: number; cy: number };

function computePositions(count: number): NodePos[] {
  const spacing = 270;
  const leftX = 165;
  const rightX = 255;
  return Array.from({ length: count }, (_, i) => ({
    cx: i % 2 === 0 ? leftX : rightX,
    cy: 150 + i * spacing,
  }));
}

function buildWrapPath(positions: NodePos[]): { d: string; topPaths: string[] } {
  const R = WRAP_R;
  const top = (p: NodePos): [number, number] => [p.cx, p.cy - R];
  const bot = (p: NodePos): [number, number] => [p.cx, p.cy + R];

  const [sx, sy] = top(positions[0]);
  let d = `M ${sx} ${sy}`;
  const topPaths: string[] = [d];

  positions.forEach((n, i) => {
    const left = i % 2 === 0;
    const side = left ? -1 : 1;
    const k = R * 0.66;
    const midX = n.cx + side * R;

    if (i < positions.length - 1) {
      const [bx, by] = bot(n);
      d += ` C ${n.cx} ${n.cy - R + k}, ${midX} ${n.cy - k}, ${midX} ${n.cy}`;
      d += ` C ${midX} ${n.cy + k}, ${n.cx} ${n.cy + R - k}, ${bx} ${by}`;
      const [ntx, nty] = top(positions[i + 1]);
      const gap = nty - by;
      d += ` C ${n.cx} ${by + gap * 0.45}, ${positions[i + 1].cx} ${nty - gap * 0.45}, ${ntx} ${nty}`;
      topPaths.push(d);
    } else {
      d += ` C ${n.cx} ${n.cy - R + k}, ${midX} ${n.cy - k}, ${midX} ${n.cy}`;
    }
  });
  return { d, topPaths };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function LiquidIndex({ items, children }: LiquidIndexProps) {
  const [active, setActive] = useState(0);
  const sparkRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const positions = computePositions(items.length);
  const viewH = positions[positions.length - 1].cy + 160;
  const viewW = 640;
  const { d: flowPath, topPaths } = buildWrapPath(positions);
  const topFracsRef = useRef<number[]>([]);
  const rafRef = useRef<number>(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);

  // Active section tracking is handled in onScroll below

  // Measure path-length fractions
  useEffect(() => {
    const svg = sparkRef.current?.ownerSVGElement;
    if (!svg) return;
    const svgNS = 'http://www.w3.org/2000/svg';
    const measure = (dStr: string) => {
      const p = document.createElementNS(svgNS, 'path');
      p.setAttribute('d', dStr);
      p.style.visibility = 'hidden';
      svg.appendChild(p);
      const len = p.getTotalLength();
      svg.removeChild(p);
      return len;
    };
    const full = measure(flowPath) || 1;
    topFracsRef.current = topPaths.map((tp) => measure(tp) / full);
  }, [flowPath, topPaths]);

  const onScroll = useCallback(() => {
    const fracs = topFracsRef.current;
    if (fracs.length !== items.length) return;
    const ref = window.scrollY + window.innerHeight * 0.32;
    const tops = items.map((it) => {
      const el = document.getElementById(it.sectionId);
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
    const lastEl = document.getElementById(items[items.length - 1].sectionId);
    const endPos = lastEl ? lastEl.getBoundingClientRect().bottom + window.scrollY : tops[tops.length - 1];

    // Detect bottom of page — guarantee last item activates
    const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
    if (atBottom) {
      setActive(items.length - 1);
      targetRef.current = 1;
      return;
    }

    let i = 0;
    for (let k = 0; k < items.length; k++) { if (ref >= tops[k]) i = k; }

    setActive(i);

    const fromFrac = fracs[i];
    const toFrac = i < items.length - 1 ? fracs[i + 1] : 1;
    const segStart = tops[i];
    const segEnd = i < items.length - 1 ? tops[i + 1] : endPos;
    const local = segEnd > segStart ? (ref - segStart) / (segEnd - segStart) : 0;
    targetRef.current = fromFrac + Math.max(0, Math.min(1, local)) * (toFrac - fromFrac);
  }, [items]);

  useEffect(() => {
    const setFill = (p: number) => {
      [fillRef.current, sparkRef.current].forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        path.style.strokeDasharray = `${len}`;
        path.style.strokeDashoffset = String(len * (1 - p));
      });
    };
    setFill(0);
    const animate = () => {
      const next = progressRef.current + (targetRef.current - progressRef.current) * 0.06;
      progressRef.current = next;
      setFill(next);
      const inner = innerRef.current;
      const wrap = inner?.parentElement;
      if (inner && wrap) {
        const overflow = Math.max(0, inner.offsetHeight - wrap.clientHeight);
        inner.style.transform = `translateY(${-(next * overflow)}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Auto-scroll mobile nav horizontally to keep active node centered
  const mobileNavRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const nav = mobileNavRef.current;
    if (!nav) return;
    const steps = nav.querySelectorAll('.mobile-step');
    const activeStep = steps[active] as HTMLElement | undefined;
    if (activeStep) {
      const target = activeStep.offsetLeft + activeStep.offsetWidth / 2 - nav.clientWidth / 2;
      nav.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }, [active]);

  return (
    <div className="sust-page">
      {/* MOBILE NAV — stepper with per-segment connecting lines */}
      <nav className="mobile-index" ref={mobileNavRef}>
        <div className="mobile-track">
          {items.map((it, i) => {
            const lit = i <= active;
            const current = i === active;
            return (
              <div key={it.sectionId} className="mobile-step">
                {/* segment connecting from previous node */}
                {i > 0 && <span className={`mobile-seg ${i <= active ? 'seg-lit' : ''}`} />}
                <button
                  className={`mobile-node ${lit ? 'node-lit' : ''} ${current ? 'node-current' : ''}`}
                  onClick={() => scrollTo(it.sectionId)}
                  style={{ '--node-accent': it.accent } as React.CSSProperties}
                >
                  {it.iconSrc ? (
                    <img src={it.iconSrc} alt="" className="mobile-node-icon" />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mobile-node-icon">
                      {it.icon}
                    </svg>
                  )}
                </button>
                <span className={`mobile-lbl ${lit ? 'lbl-lit' : ''}`}>{it.label}</span>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="sust-layout">
        <aside className="sust-index">
          <div className="sust-index-inner" ref={innerRef}>
            <div className="ambient-bubbles">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className={`amb amb-${i % 7}`} />
              ))}
            </div>
            <svg className="index-svg" viewBox={`0 0 ${viewW} ${viewH}`} preserveAspectRatio="xMidYMin meet">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="45%" stopColor="#2F7DE0" />
                  <stop offset="80%" stopColor="#3B6FE8" />
                  <stop offset="100%" stopColor="#5B6BEF" />
                </linearGradient>
                <filter id="flowGlow" filterUnits="userSpaceOnUse" x="0" y="0" width={viewW} height={viewH}>
                  <feGaussianBlur stdDeviation="9" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {items.map((_it, i) => (
                  <radialGradient key={`s-${i}`} id={`sphere-${i}`} cx="30%" cy="24%" r="82%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.98)" stopOpacity="1.0" />
                    <stop offset="12%" stopColor="rgba(240,242,255,0.95)" stopOpacity="0.98" />
                    <stop offset="50%" stopColor="#7980f7" stopOpacity="0.92" />
                    <stop offset="85%" stopColor="#5558e6" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#3c3eb8" stopOpacity="0.98" />
                  </radialGradient>
                ))}
                {items.map((it, i) => (
                  <radialGradient key={`sl-${i}`} id={`sphere-lit-${i}`} cx="30%" cy="24%" r="82%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.98)" stopOpacity="1.0" />
                    <stop offset="12%" stopColor="rgba(245,248,255,0.95)" stopOpacity="0.98" />
                    <stop offset="48%" stopColor={it.accent} stopOpacity="0.92" />
                    <stop offset="80%" stopColor="#4f46e5" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#3730a3" stopOpacity="0.98" />
                  </radialGradient>
                ))}
                <radialGradient id="specHi" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <radialGradient id="edgeVig" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="transparent" />
                  <stop offset="95%" stopColor="rgba(30,27,75,0.4)" />
                  <stop offset="100%" stopColor="rgba(30,27,75,0.6)" />
                </radialGradient>
                <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" in="SourceGraphic" result="g1" />
                  <feGaussianBlur stdDeviation="0.4" in="SourceGraphic" result="g2" />
                  <feMerge><feMergeNode in="g1" /><feMergeNode in="g2" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <path d={flowPath} className="flow-track" />
              <path ref={fillRef} d={flowPath} className="flow-fill" filter="url(#flowGlow)" />
              <path ref={sparkRef} d={flowPath} className="flow-spark" />

              {/* connectors */}
              {items.map((it, i) => {
                const n = positions[i];
                const lit = i <= active;
                return (
                  <g key={`con-${i}`} className="con-g" opacity={lit ? 1 : 0.45}>
                    <line x1={n.cx + WRAP_R} y1={n.cy} x2={440} y2={n.cy} strokeDasharray="1 6" strokeLinecap="round" className={`con-line ${lit ? 'is-lit' : ''}`} />
                    <circle cx={440} cy={n.cy} className={`con-dot ${lit ? 'is-lit' : ''}`} />
                  </g>
                );
              })}

              {/* bubbles */}
              {items.map((it, i) => {
                const n = positions[i];
                const lit = i <= active;
                return (
                  <g key={`bub-${i}`} className={`bubble-g ${lit ? 'is-active' : ''}`} onClick={() => scrollTo(it.sectionId)} opacity={lit ? 1 : 0.92}>
                    <ellipse cx={n.cx} cy={n.cy + 22} rx={BUBBLE_R * 0.85} ry={BUBBLE_R * 0.5} fill="#6366f1" opacity={lit ? 0.38 : 0} filter="url(#flowGlow)" className="bub-glow-ellipse" />
                    {/* Base inactive sphere */}
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R} fill={`url(#sphere-${i})`} />
                    {/* Active sphere overlay that cross-fades smoothly */}
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R} fill={`url(#sphere-lit-${i})`} opacity={lit ? 1 : 0} className="bub-active-overlay" />
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R} fill="url(#edgeVig)" opacity="0.6" />
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R - 1} fill="none" stroke="rgba(30,27,75,0.12)" strokeWidth="2.5" />
                    {/* Soft satin sheen for matte finish */}
                    <ellipse cx={n.cx - 22} cy={n.cy - 26} rx="36" ry="24" fill="url(#specHi)" transform={`rotate(-25 ${n.cx - 22} ${n.cy - 26})`} opacity={lit ? 0.35 : 0.2} className="bub-sheen" />
                    {it.iconSrc ? (
                      <image
                        className="bub-icon-svg"
                        href={it.iconSrc}
                        x={n.cx - ICON_IMG / 2}
                        y={n.cy - ICON_IMG / 2}
                        width={ICON_IMG}
                        height={ICON_IMG}
                        preserveAspectRatio="xMidYMid meet"
                      />
                    ) : (
                      <g className="bub-icon-svg" transform={`translate(${n.cx} ${n.cy}) scale(${ICON_SCALE}) translate(-12 -12)`} fill="none" stroke="#ffffff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" filter="url(#iconGlow)">
                        {it.icon}
                      </g>
                    )}
                  </g>
                );
              })}

              {/* labels */}
              {items.map((it, i) => {
                const n = positions[i];
                const lit = i <= active;
                return (
                  <g key={`lab-${i}`} className={`label-g ${lit ? 'is-active' : ''}`} onClick={() => scrollTo(it.sectionId)}>
                    <text x={460} y={n.cy - 4} className="lab-num" fill="#0d1738">{it.num}</text>
                    <text x={460} y={n.cy + 27} className="lab-text">{it.label}</text>
                    <text x={460} y={n.cy + 47} className="lab-sdg">{it.subtitle}</text>
                    <line x1={460} y1={n.cy + 59} x2={460 + (lit ? 60 : 34)} y2={n.cy + 59} stroke="#0d1738" strokeWidth="2.5" strokeLinecap="round" className="lab-underline" />
                  </g>
                );
              })}
            </svg>
          </div>
        </aside>

        <section className="sust-content" ref={contentRef}>
          {children}
        </section>
      </div>
    </div>
  );
}
