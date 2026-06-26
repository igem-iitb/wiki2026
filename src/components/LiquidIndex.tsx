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
  /** SVG icon paths rendered inside the bubble (24x24 viewBox) */
  icon: ReactNode;
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mobile-node-icon">
                    {it.icon}
                  </svg>
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
                <filter id="flowGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="9" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {items.map((_it, i) => (
                  <radialGradient key={`s-${i}`} id={`sphere-${i}`} cx="30%" cy="24%" r="82%">
                    <stop offset="0%" stopColor="rgba(160,215,255,0.45)" />
                    <stop offset="12%" stopColor="rgba(100,170,240,0.22)" />
                    <stop offset="38%" stopColor="#0c1e38" />
                    <stop offset="65%" stopColor="#060e1e" />
                    <stop offset="100%" stopColor="#030810" />
                  </radialGradient>
                ))}
                {items.map((it, i) => (
                  <radialGradient key={`sl-${i}`} id={`sphere-lit-${i}`} cx="30%" cy="24%" r="82%">
                    <stop offset="0%" stopColor="rgba(210,245,255,0.75)" />
                    <stop offset="12%" stopColor={it.accent} stopOpacity="0.5" />
                    <stop offset="38%" stopColor="#0e2548" />
                    <stop offset="65%" stopColor="#081428" />
                    <stop offset="100%" stopColor="#040b16" />
                  </radialGradient>
                ))}
                <radialGradient id="specHi" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
                <radialGradient id="edgeVig" cx="50%" cy="50%" r="50%">
                  <stop offset="70%" stopColor="transparent" />
                  <stop offset="95%" stopColor="rgba(0,4,12,0.6)" />
                  <stop offset="100%" stopColor="rgba(0,4,12,0.85)" />
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
                return (
                  <g key={`con-${i}`} className="con-g" opacity={i <= active ? 1 : 0.28}>
                    <line x1={n.cx + WRAP_R} y1={n.cy} x2={440} y2={n.cy} stroke={it.accent} strokeWidth={i <= active ? 1.8 : 1} strokeDasharray="1 6" strokeLinecap="round" />
                    <circle cx={440} cy={n.cy} r={i <= active ? 5 : 3} fill={it.accent} />
                  </g>
                );
              })}

              {/* bubbles */}
              {items.map((it, i) => {
                const n = positions[i];
                const lit = i <= active;
                return (
                  <g key={`bub-${i}`} className={`bubble-g ${lit ? 'is-active' : ''}`} onClick={() => scrollTo(it.sectionId)} opacity={lit ? 1 : 0.72}>
                    {lit && <ellipse cx={n.cx} cy={n.cy + 22} rx={BUBBLE_R * 0.85} ry={BUBBLE_R * 0.5} fill={it.accent} opacity="0.18" filter="url(#flowGlow)" />}
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R} fill={lit ? `url(#sphere-lit-${i})` : `url(#sphere-${i})`} />
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R} fill="url(#edgeVig)" />
                    <circle cx={n.cx} cy={n.cy} r={BUBBLE_R - 1} fill="none" stroke="rgba(0,6,20,0.55)" strokeWidth="3" />
                    <ellipse cx={n.cx - 22} cy={n.cy - 26} rx="32" ry="20" fill="url(#specHi)" transform={`rotate(-25 ${n.cx - 22} ${n.cy - 26})`} opacity={lit ? 0.85 : 0.55} />
                    <ellipse cx={n.cx - 30} cy={n.cy - 36} rx="8" ry="4" fill="rgba(240,252,255,0.95)" transform={`rotate(-30 ${n.cx - 30} ${n.cy - 36})`} opacity={lit ? 1 : 0.5} />
                    <ellipse cx={n.cx + 20} cy={n.cy + 28} rx="18" ry="10" fill="rgba(100,180,255,0.10)" transform={`rotate(20 ${n.cx + 20} ${n.cy + 28})`} />
                    <path d={`M ${n.cx + 50} ${n.cy + 55} A ${BUBBLE_R - 4} ${BUBBLE_R - 4} 0 0 1 ${n.cx + 68} ${n.cy + 20}`} fill="none" stroke="rgba(140,200,255,0.15)" strokeWidth="3" strokeLinecap="round" />
                    <g className="bub-icon-svg" transform={`translate(${n.cx} ${n.cy}) scale(${ICON_SCALE}) translate(-12 -12)`} fill="none" stroke={lit ? '#eaf8ff' : 'rgba(170, 210, 245, 0.8)'} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" filter="url(#iconGlow)">
                      {it.icon}
                    </g>
                  </g>
                );
              })}

              {/* labels */}
              {items.map((it, i) => {
                const n = positions[i];
                const lit = i <= active;
                return (
                  <g key={`lab-${i}`} className={`label-g ${lit ? 'is-active' : ''}`} onClick={() => scrollTo(it.sectionId)}>
                    <text x={460} y={n.cy - 4} className="lab-num" fill={it.accent}>{it.num}</text>
                    <text x={460} y={n.cy + 27} className="lab-text">{it.label}</text>
                    <text x={460} y={n.cy + 47} className="lab-sdg">{it.subtitle}</text>
                    <line x1={460} y1={n.cy + 59} x2={460 + (lit ? 60 : 34)} y2={n.cy + 59} stroke={it.accent} strokeWidth="2.5" strokeLinecap="round" className="lab-underline" />
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
