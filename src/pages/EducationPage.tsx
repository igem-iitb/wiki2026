import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import PhotoCarousel from '../components/PhotoCarousel';
import Accordion from '../components/Accordion';
import DocViewer from '../components/DocViewer';
import styles from './eo.module.css';
import { EVENTS, HUBS, SUBTABS, SUBTAB_PROMPTS, type Block, type EventItem, type Tab } from './eoContent';

// Team photos for the gallery card.
const TEAM_PHOTOS = ['/eo/team.jpg', '/team_pic.webp', '/eo/team2.webp', '/eo/team3.webp'];

// ─── helpers ─────────────────────────────────────────────────────────────────

// Turn web addresses inside a line of text into links.
function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noreferrer" className={styles.link}>
        {p.length > 60 ? `${p.slice(0, 57)}…` : p}
      </a>
    ) : (
      p
    ),
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+|-+$)/g, '');
}
const eventId = (name: string) => `ev-${slug(name)}`;

// Gradual smooth scroll with an easeInOutCubic curve.
function smoothScrollTo(id: string, offset = 90, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;
  const startY = window.scrollY;
  const targetY = el.getBoundingClientRect().top + startY - offset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 4) return;
  let startTime: number | null = null;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const p = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Gallery ("images slide by slide") ───────────────────────────────────────

function Gallery({ photos = TEAM_PHOTOS, label = 'Team photos', compact = false }: { photos?: string[]; label?: string; compact?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = photos.length;
  const go = (d: number) => setI((prev) => (prev + d + n) % n);

  // Slide on its own every few seconds, unless hovered or the user prefers less motion.
  useEffect(() => {
    if (paused || typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((prev) => (prev + 1) % n), 5000);
    return () => window.clearInterval(id);
  }, [paused, n]);

  return (
    <div
      className={`${styles.gallery} ${compact ? styles.galleryCompact : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={styles.galleryTrack} style={{ transform: `translateX(-${i * 100}%)` }}>
        {photos.map((src, idx) => (
          <div key={src} className={styles.gallerySlide} aria-hidden={idx !== i}>
            <img src={src} alt={`${label} ${idx + 1}`} />
          </div>
        ))}
      </div>
      <button type="button" className={`${styles.galleryArrow} ${styles.galleryPrev}`} aria-label="Previous photo" onClick={() => go(-1)}>
        ←
      </button>
      <button type="button" className={`${styles.galleryArrow} ${styles.galleryNext}`} aria-label="Next photo" onClick={() => go(1)}>
        →
      </button>
      <div className={styles.galleryDots}>
        {photos.map((src, idx) => (
          <button
            key={src}
            type="button"
            className={`${styles.galleryDot} ${idx === i ? styles.galleryDotOn : ''}`}
            aria-label={`Show photo ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Initiative (a bar that opens into its card) ─────────────────────────────

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.rich}>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p':
            return <p key={i}>{linkify(b.text)}</p>;
          case 'ul':
            return (
              <ul key={i} className={styles.points}>
                {b.items.map((it, k) =>
                  typeof it === 'string' ? (
                    <li key={k}>{linkify(it)}</li>
                  ) : (
                    <li key={k}>
                      <b>{it[0]}</b> {linkify(it[1])}
                    </li>
                  ),
                )}
              </ul>
            );
          case 'table':
            return (
              <div key={i} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {b.head.map((h, k) => (
                        <th key={k}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, k) => (
                      <tr key={k}>
                        {r.map((c, j) => (
                          <td key={j}>{linkify(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'quote':
            return (
              <blockquote key={i} className={styles.quote}>
                <p>{b.text}</p>
                {b.by && <cite>{b.by}</cite>}
              </blockquote>
            );
          case 'stats':
            return (
              <div key={i} className={styles.stats}>
                {b.items.map(([v, l], k) => (
                  <div key={k} className={styles.stat}>
                    <span className={styles.statValue}>{v}</span>
                    <span className={styles.statLabel}>{l}</span>
                  </div>
                ))}
              </div>
            );
          case 'awards':
            return (
              <ul key={i} className={styles.awards}>
                {b.items.map((a) => (
                  <li key={a}>
                    {a}
                  </li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}

function Initiative({ item, index, isOpen, onToggle }: { item: EventItem; index: number; isOpen: boolean; onToggle: () => void }) {
  const [subtab, setSubtab] = useState<Tab>(SUBTABS[0]);
  const blocks = item.tabs[subtab];

  return (
    <div
      id={eventId(item.name)}
      className={`${styles.init} ${isOpen ? styles.initOpen : ''} ${item.highlight ? styles.initStar : ''} ${item.name.startsWith('BioTL') ? styles.initBlueGreen : ''}`}
    >
      {isOpen ? (
        <div className={styles.initHead}>
          <button type="button" className={styles.initTitle} aria-expanded onClick={onToggle}>
            <span className={styles.initNum} aria-hidden>
              {index + 1}
            </span>
            {item.name}
          </button>
          <button type="button" className={styles.backLink} onClick={() => smoothScrollTo('events')}>
            Back to the list ↑
          </button>
        </div>
      ) : (
        <button type="button" className={styles.initBar} aria-expanded={false} onClick={onToggle}>
          <span className={styles.initNum} aria-hidden>
            {index + 1}
          </span>
          <span className={styles.initBarText}>
            <span className={styles.initBarName}>
              {item.name}
              {item.highlight && (
                <span className={styles.starChip}>
                  Award winner
                </span>
              )}
            </span>
            {item.meta && <small>{item.meta}</small>}
          </span>
          <img src="/eo/atom/arrow.svg" alt="" className={styles.initArrow} />
        </button>
      )}

      {isOpen && (
        <div className={styles.initBody}>
          {item.highlight && (
            <div className={styles.starBanner}>
              <div className={styles.starText}>
                <p className={styles.starTitle}>{item.highlight.title}</p>
                <ul className={styles.awards}>
                  {item.highlight.awards.map((a) => (
                    <li key={a}>
                      {a}
                    </li>
                  ))}
                </ul>
                {item.highlight.note && <p className={styles.starNote}>{item.highlight.note}</p>}
              </div>
            </div>
          )}
          {item.meta && <p className={styles.initMeta}>{item.meta}</p>}

          {item.photos && <PhotoCarousel photos={item.photos} label={`${item.name} photos`} />}

          <div className={styles.frame}>
            <div className={styles.tabs} role="tablist" aria-label={`${item.name} details`}>
              {SUBTABS.map((st) => (
                <button
                  key={st}
                  type="button"
                  role="tab"
                  aria-selected={subtab === st}
                  className={`${styles.tab} ${subtab === st ? styles.tabOn : ''}`}
                  onClick={() => setSubtab(st)}
                >
                  {st}
                </button>
              ))}
            </div>
            <div className={styles.panelBox}>
              {blocks?.length ? <Blocks blocks={blocks} /> : <p className={styles.prompt}>{SUBTAB_PROMPTS[subtab]}</p>}
            </div>
          </div>

          {item.docs?.length ? (
            <div className={styles.docs}>
              <Accordion
                alignStart
                items={[
                  {
                    id: 'docs',
                    title: `Event Archive (${item.docs.length} ${item.docs.length === 1 ? 'file' : 'files'})`,
                    content: <DocViewer docs={item.docs} />,
                  },
                ]}
                theme={{ bar: '#fafafa', barText: '#09347b', body: '#ffffff', accent: '#089cff' }}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

const INDEX = [
  { id: 'learn-process', label: 'The LEARN process' },
  { id: 'events', label: 'Our initiatives' },
];

export default function EducationPage() {
  const [learnSel, setLearnSel] = useState(0);
  const sel = HUBS[learnSel];
  // One event open at a time; the first starts open.
  const [open, setOpen] = useState<string | null>(EVENTS[0].name);

  return (
    <PageShell
      title="Educational Outreach"
      art="book"
      noIndex
      index={INDEX}
      intro={<Gallery />}
      pageStyle={{ background: 'linear-gradient(175.575deg, #fafafa 0%, #6db8ea 82.027%)' }}
    >
      <div className={styles.box}>
        {/* LEARN process selector, the process itself, not a way of sorting events. */}
        <h2 id="learn-process" className={styles.learnHeading}>
          The E in EO. We Derived Our Own process: <b>LEARN</b>
        </h2>

        <div className={styles.select} role="tablist" aria-label="LEARN process">
          {HUBS.map((h, i) => (
            <button
              key={h.letter}
              type="button"
              role="tab"
              aria-selected={learnSel === i}
              className={`${styles.selCell} ${learnSel === i ? styles.selCellOn : ''}`}
              onClick={() => setLearnSel(i)}
            >
              <span className={styles.selLetter}>{h.letter}</span>
              <span className={styles.selName}>
                {h.lines.map((l, k) => (
                  <span key={k}>{l}</span>
                ))}
              </span>
              <span className={styles.selLine} />
            </button>
          ))}
        </div>

        <div className={styles.detail}>
          <div className={styles.detailLetter} aria-hidden>
            {sel.letter}
          </div>
          <div className={styles.detailBody}>
            <h3>{sel.name}</h3>
            <p>{sel.desc}</p>
          </div>
          <img className={styles.detailIcon} src={`/eo/icons/${sel.letter}.png`} alt="" aria-hidden />
        </div>

        {/* The order we ran things in. */}
        <div className={styles.flow} aria-label="Order of our initiatives">
          {EVENTS.map((ev, i) => (
            <button
              key={ev.name}
              type="button"
              className={styles.flowStep}
              onClick={() => {
                setOpen(ev.name);
                window.setTimeout(() => smoothScrollTo(eventId(ev.name)), 60);
              }}
            >
              <span className={styles.flowNum}>{i + 1}</span>
              <span className={styles.flowName}>{ev.name}</span>
            </button>
          ))}
        </div>

        {/* Every initiative, in the order we ran them. */}
        <h2 id="events" className={styles.eventsHeading}>
          Our initiatives
        </h2>
        <p className={styles.eventsLead}>
          {EVENTS.length} initiatives, in order. Open any one for its purpose, reach, what we ran, what we learned and
          what participants told us.
        </p>
        <div className={styles.inits}>
          {EVENTS.map((ev, i) => (
            <Initiative
              key={ev.name}
              item={ev}
              index={i}
              isOpen={open === ev.name}
              onToggle={() => setOpen((prev) => (prev === ev.name ? null : ev.name))}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
