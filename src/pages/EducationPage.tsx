import { useState, useEffect } from 'react';
import LiquidIndex, { LiquidIndexItem, LiquidIndexGeometry } from '../components/LiquidIndex';
import Footer from '../components/Footer';
import './education.css';

// ─── LEARN hub data ───────────────────────────────────────────────────────────

type Hub = {
  letter: string;
  name: string;
  nameLines?: string[];
  tag: string;
  accent: string;
  sectionId: string;
  desc: string;
  initiatives: string[];
};

const HUBS: Hub[] = [
  {
    letter: 'L', name: 'Listen First', nameLines: ['Listen First'], tag: 'Surveys & listening', accent: '#38BDF8', sectionId: 'learn-l',
    desc: 'Before teaching anything, we listened. Surveys, questionnaires, and stakeholder conversations mapped what people already knew, misunderstood, or feared about synthetic biology — evidence before assumption.',
    initiatives: ['Public Awareness Survey', 'Internal AI Audit', 'AIIMS Stakeholder Questionnaire', 'International Survey w/ Team Denmark', 'Freshers Questionnaire'],
  },
  {
    letter: 'E', name: 'Engage Minds', nameLines: ['Engage Minds'], tag: 'Talks & quizzes', accent: '#22D3EE', sectionId: 'learn-e',
    desc: 'With that groundwork laid, we turned listening into dialogue — sparking curiosity about synthetic biology through talks, quizzes, and collaborations that met people where their interest already was.',
    initiatives: ['GYAANU 2026', 'BioTL (w/ BioX Club)'],
  },
  {
    letter: 'A', name: 'Assemble Community', nameLines: ['Assemble', 'Community'], tag: 'Events & partners', accent: '#3B9EFF', sectionId: 'learn-a',
    desc: 'Engagement became belonging. We convened students, clubs, and experts into a shared space — connecting people across disciplines so the conversation could outlast any single event.',
    initiatives: ['SynBioCon', 'TechConnect', 'BioX Club Collaboration', 'Webinars/Speaker Sessions'],
  },
  {
    letter: 'R', name: 'Reach Beyond Walls', nameLines: ['Reach Beyond', 'Walls'], tag: 'Digital & media', accent: '#3B82F6', sectionId: 'learn-r',
    desc: 'We carried the story past the campus gates — through digital series, comics, and interactive tools that made synthetic biology accessible to anyone with a phone and a question.',
    initiatives: ['Instagram/LinkedIn Series', 'Digital Comic Strip', 'Interactive Gene Cloning Simulation (site)'],
  },
  {
    letter: 'N', name: 'Nurture What Grows', nameLines: ['Nurture What', 'Grows'], tag: 'Open resources', accent: '#6366F1', sectionId: 'learn-n',
    desc: 'iGEM ends; the resources shouldn\'t. We left behind open booklets, reusable simulations, and an impact dashboard so the next team — and anyone curious — can pick up where we left off.',
    initiatives: ['OER Booklets', 'Interactive Gene Cloning Simulation (as reusable resource)', 'Impact Dashboard'],
  },
];

// LEARN letters carry a thematic icon inside the sphere.
const HUB_ICONS: Record<string, JSX.Element> = {
  L: <><path d="M7 9a5 5 0 0 1 10 0c0 2.5-2 3.6-2.9 5-.6 1-.3 3-2.1 3a2 2 0 0 1-2-2" /><path d="M9.5 9a2.5 2.5 0 0 1 4 0" /></>,
  E: <><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z" /></>,
  A: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="7" r="2.5" /><path d="M16 14c2.8.3 5 2.6 5 5.5" /></>,
  R: <><path d="M4 10v4a1 1 0 0 0 1 1h2l7 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M18 8a5 5 0 0 1 0 8" /></>,
  N: <><path d="M12 21v-8" /><path d="M12 13c0-3-2-5-5-5-1 0-1.8.2-1.8.2C5.2 11.2 7 13 10 13Z" /><path d="M12 11.5c0-3 2-5 5-5 1 0 1.8.2 1.8.2C18.8 9.7 17 11.5 14 11.5Z" /></>,
};

// Three stops at the top of the index, matching the real content flow of the
// page (photo gallery, the LEARN process overview, then the constellation
// network as a whole) before the five LEARN hubs — which point at their
// write-up (cards) sections, not the constellation diagrams, since that's
// where the substantial per-hub content actually lives.
const OVERVIEW_ITEMS: LiquidIndexItem[] = [
  {
    num: '', label: 'Gallery', subtitle: 'Event photos', sectionId: 'team-gallery', accent: '#7BCCED',
    icon: <><rect x="3" y="4" width="18" height="16" rx="2.2" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M21 16l-5.2-5.2a1.5 1.5 0 0 0-2.1 0L5 19" /></>,
  },
  {
    num: '', label: 'The Process', subtitle: 'Our 5-Step Framework', sectionId: 'learn-process', accent: '#38BDF8',
    icon: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="8.5" y="14" width="7" height="7" rx="1.5" /><path d="M6.5 10v2a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2" /></>,
  },
  {
    num: '', label: 'Initiatives', subtitle: 'The Network', sectionId: 'constellation-heading', accent: '#38BDF8',
    icon: (
      <>
        <polygon points="12 2 14.8 8.1 21.6 8.8 16.5 13.3 18 20.1 12 16.6 6 20.1 7.5 13.3 2.4 8.8 9.2 8.1 12 2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

const indexItems: LiquidIndexItem[] = [
  ...OVERVIEW_ITEMS,
  ...HUBS.map((h) => ({
    num: h.letter,
    label: h.name,
    subtitle: h.tag,
    sectionId: `${h.sectionId}-cards`,
    accent: h.accent,
    icon: HUB_ICONS[h.letter],
  })),
];

// Same sphere size and rail footprint as the Sustainability tab (all other
// geometry left at the shared component's defaults) — only the icon glyph
// inside each sphere is enlarged, 1.5x the default.
const eoGeometry: LiquidIndexGeometry = {
  iconScale: 2.8 * 1.5,
};

const SUBTABS = ['Purpose', 'Who We Reached', 'What We Did', 'Key Takeaway', 'Feedback', 'References'];
const SUBTAB_PROMPTS = [
  'Why this initiative? What gap or question prompted it?',
  'Which audience did this reach, and how many people?',
  'What did we actually run, build, or deliver?',
  'What did we learn — and what changed because of it?',
  'What did participants tell us afterwards?',
  'Sources, links, and further reading.',
];

// Stable anchor id for an initiative card, so the constellation's node text
// can jump straight to its full write-up further down the page.
function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}
function cardId(hubId: string, name: string) {
  return `${hubId}-${slug(name)}`;
}

function splitLabelLines(label: string): string[] {
  const formatted: Record<string, string[]> = {
    'Public Awareness Survey': ['Public Awareness', 'Survey'],
    'Freshers Questionnaire': ['Freshers', 'Questionnaire'],
    'AIIMS Stakeholder Questionnaire': ['AIIMS Stakeholder', 'Questionnaire'],
    'International Survey w/ Team Denmark': ['International Survey', 'w/ Team Denmark'],
    'Interactive Gene Cloning Simulation (site)': ['Interactive Gene Cloning', 'Simulation (site)'],
    'Interactive Gene Cloning Simulation (as reusable resource)': ['Interactive Gene Cloning', 'Simulation (resource)'],
    'Instagram/LinkedIn Series': ['Instagram/LinkedIn', 'Series'],
    'BioX Club Collaboration': ['BioX Club', 'Collaboration'],
    'Webinars/Speaker Sessions': ['Webinars/Speaker', 'Sessions'],
  };
  return formatted[label] || [label];
}

// Tracks viewport width so the constellation can pull its nodes in on narrow
// screens — a fixed spread percentage combined with a fixed label width will
// always overflow at some breakpoint, so both must shrink together.
function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return w;
}

// ─── Constellation ────────────────────────────────────────────────────────────

function Constellation({ hub }: { hub: Hub }) {
  const vw = useViewportWidth();
  // Spread and label width are chosen together so a label anchored at the
  // node's edge position can never reach past the container's own edge.
  const { spreadX, spreadY, labelMax } = vw < 340
    ? { spreadX: 14, spreadY: 19, labelMax: 64 }
    : vw < 420
    ? { spreadX: 17, spreadY: 23, labelMax: 80 }
    : vw < 700
    ? { spreadX: 24, spreadY: 28, labelMax: 120 }
    : { spreadX: 28, spreadY: 31, labelMax: 160 };

  const n = hub.initiatives.length;
  const nodes = hub.initiatives.map((label, i) => {
    const ang = (-90 + (i * 360) / n) * (Math.PI / 180);
    const cos = Math.cos(ang);
    return { label, left: 50 + spreadX * cos, top: 50 + spreadY * Math.sin(ang), side: cos < -0.15 ? 'left' : '' };
  });
  const orbits = [
    { rx: 300, ry: 130, rot: 0 }, { rx: 270, ry: 150, rot: 32 },
    { rx: 250, ry: 190, rot: -28 }, { rx: 300, ry: 110, rot: 62 }, { rx: 230, ry: 210, rot: -60 },
  ];
  return (
    <div className="eo-constellation" role="img" aria-label={`${hub.name} initiatives`}>
      <svg viewBox="0 0 720 560" preserveAspectRatio="xMidYMid meet">
        {orbits.map((o, i) => (
          <ellipse key={i} className="eo-orbit" cx={360} cy={280} rx={o.rx} ry={o.ry} transform={`rotate(${o.rot} 360 280)`} />
        ))}
        <g
          className="eo-const-core-btn"
          onClick={() => smoothScrollTo(`${hub.sectionId}-cards`, 84, 1100)}
          role="button"
          tabIndex={0}
          aria-label={`Scroll to ${hub.name} section`}
          style={{ cursor: 'pointer' }}
        >
          <circle className="eo-const-core" cx={360} cy={280} r={72} />
          {(hub.nameLines?.length ?? 1) > 1 ? (
            <>
              <text className="eo-const-core-letter is-two-lines" x={360} y={267}>{hub.letter}</text>
              <text className="eo-const-core-label" x={360} y={302}>{hub.nameLines![0]}</text>
              <text className="eo-const-core-label" x={360} y={322}>{hub.nameLines![1]}</text>
            </>
          ) : (
            <>
              <text className="eo-const-core-letter" x={360} y={284}>{hub.letter}</text>
              <text className="eo-const-core-label" x={360} y={320}>{hub.name}</text>
            </>
          )}
        </g>
      </svg>
      {nodes.map((nd) => (
        <button
          key={nd.label}
          type="button"
          className={`eo-cnode ${nd.side}`}
          style={{ left: `${nd.left}%`, top: `${nd.top}%` }}
          onClick={() => smoothScrollTo(cardId(hub.sectionId, nd.label), 100)}
        >
          <span className="eo-cdot" />
          <span className="eo-clbl" style={{ maxWidth: labelMax }}>{nd.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── LEARN progress strip (per hub, current letter highlighted) ───────────────

function LearnStrip({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="eo-strip" aria-hidden>
      {HUBS.map((h, i) => (
        <span
          key={h.letter}
          className={`eo-strip-dot ${i === activeIndex ? 'active' : ''}`}
        >
          {h.letter}
        </span>
      ))}
    </div>
  );
}

// ─── Initiative card (always expanded, own sub-tab state) ─────────────────────

function InitiativeCard({ name, hubId }: { name: string; hubId: string }) {
  const [subtab, setSubtab] = useState(0);
  const backToNetwork = () => smoothScrollTo(hubId, 84);
  return (
    <div id={cardId(hubId, name)} className="eo-acc-detail">
      <div className="eo-acc-detail-head">
        <h3>{name}</h3>
        <button className="eo-back-network" onClick={backToNetwork}>Back to network ↑</button>
      </div>
      <div className="eo-card-frame">
        <div className="eo-subtabs" role="tablist" aria-label={`${name} details`}>
          {SUBTABS.map((st, i) => (
            <button
              key={st}
              role="tab"
              aria-selected={subtab === i}
              className={`eo-subtab ${subtab === i ? 'active' : ''}`}
              onClick={() => setSubtab(i)}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="eo-subpanel">
          <p>{SUBTAB_PROMPTS[subtab]}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Hero = (
  <header className="eo-hero">
    <img src="/eo/hero.jpg" alt="Educational Outreach — Synthetic biology doesn't stay in the lab, it grows wherever curiosity is planted." />
  </header>
);

// Drop more team photos into public/eo/ and add them here — the carousel
// wires itself up automatically (arrows, number, fade).
const TEAM_PHOTOS = ['/eo/team.jpg', '/team_pic.png', '/eo/team2.jpg', '/eo/team3.png'];

function TeamCarousel() {
  const [i, setI] = useState(0);
  const n = TEAM_PHOTOS.length;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);
  return (
    <div className="eo-teamcard">
      <div className="eo-teamframe">
        {TEAM_PHOTOS.map((src, idx) => (
          <img key={src} src={src} alt={`iGEM IIT Bombay team ${idx + 1}`} className={idx === i ? 'is-current' : ''} />
        ))}
      </div>
      <div className="eo-carousel">
        <button aria-label="Previous photo" onClick={() => go(-1)} disabled={n <= 1}>←</button>
        <span className="eo-dot" aria-label={`Photo ${i + 1} of ${n}`}>{i + 1}</span>
        <button aria-label="Next photo" onClick={() => go(1)} disabled={n <= 1}>→</button>
      </div>
    </div>
  );
}

// Gradual, custom smooth scroll with easeInOutCubic curve over 1100ms
function smoothScrollTo(id: string, offset = 84, duration = 1100) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;

  let startTime: number | null = null;

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function EducationPage() {
  const [learnSel, setLearnSel] = useState(0);
  const sel = HUBS[learnSel];
  const scrollToLearn = () => smoothScrollTo('learn-process', 84, 400);

  return (
    <>
    <LiquidIndex items={indexItems} header={Hero} className="eo-hp" geometry={eoGeometry}>
      {/* Team photo carousel */}
      <div id="team-gallery">
        <TeamCarousel />
        <button className="eo-know-more" onClick={scrollToLearn}>
          Click to know more<span>↓</span>
        </button>
      </div>

      {/* LEARN process selector */}
      <h2 id="learn-process" className="eo-learn-heading">
        The E in EO — We Derived Our Own process: <b>LEARN</b>
      </h2>

      <div className="eo-learn-select" role="tablist" aria-label="LEARN process">
        {HUBS.map((h, i) => (
          <div
            key={h.letter}
            role="tab"
            aria-selected={learnSel === i}
            className={`eo-ls-cell ${learnSel === i ? 'active' : ''}`}
            onClick={() => setLearnSel(i)}
          >
            <div className="eo-ls-letter">{h.letter}</div>
            <div className="eo-ls-sub">{h.name}</div>
            <span className="eo-ls-underline" />
          </div>
        ))}
      </div>

      <div className="eo-learn-panel">
        <div className="eo-lp-letter">{sel.letter}</div>
        <div className="eo-lp-body">
          <h3>{sel.name}</h3>
          <p>{sel.desc}</p>
        </div>
        <img className="eo-lp-icon" src={`/eo/icons/${sel.letter}.png`} alt="" aria-hidden />
      </div>

      {/* Constellation intro */}
      <h2 id="constellation-heading" className="eo-const-heading">“The constellation of initiatives”</h2>
      <p className="eo-const-sub">
        EO's network is made of initiatives. Five LEARN hubs hold every survey, workshop, partnership,
        digital story, and open resource in orbit — scroll through each hub below.
      </p>
      <p className="eo-const-hint">CLICK for full write-up</p>

      {/* First: all five constellations, one after another */}
      {HUBS.map((h) => (
        <div id={h.sectionId} key={h.sectionId} className="eo-const-block">
          <Constellation hub={h} />
        </div>
      ))}

      {/* Then: the LEARN strip + every initiative expanded, once per hub,
          with that hub's letter lit in the strip */}
      {HUBS.map((h, i) => (
        <section id={`${h.sectionId}-cards`} key={`${h.sectionId}-cards`} className="eo-hub-section">
          <LearnStrip activeIndex={i} />

          <div className="eo-cards">
            {h.initiatives.map((name) => (
              <InitiativeCard key={name} name={name} hubId={h.sectionId} />
            ))}
          </div>
        </section>
      ))}
    </LiquidIndex>
    <Footer bgColor="#191834" />
    </>
  );
}
