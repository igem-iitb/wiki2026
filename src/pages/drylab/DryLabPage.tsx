import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Link, Navigate, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import LiquidIndex, { type LiquidIndexItem } from '../../components/LiquidIndex';
import TitleCard from '../../components/TitleCard';
import shell from '../../components/PageShell.module.css';
import styles from './drylab.module.css';
import { dryLabPages, modelTabs } from './drylabPages';
import CfdModels from './CfdModels';

// Each page's HTML is its own lazily loaded chunk.
const loaders = import.meta.glob('./content/*.html', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const MODEL_SLUGS = new Set(modelTabs.map((t) => t.slug));
const pageBySlug = (slug: string) => dryLabPages.find((p) => p.slug === slug);

// Links listed in the draft's footer.
const NOTE_LINKS = ['model', 'software', 'cfd', 'lca'];

export default function DryLabPage({ slug }: { slug: string }) {
  const page = pageBySlug(slug)!;
  const [loaded, setLoaded] = useState<{ slug: string; html: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    let alive = true;
    loaders[`./content/${slug}.html`]().then((html) => {
      if (alive) setLoaded({ slug, html });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  // Index entries for the left panel: the article's own h2 headings, given
  // stable ids so the panel can scroll to them.
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el || !loaded) return;
    const hs = [...el.querySelectorAll('h2')];
    const items = hs.map((h, i) => {
      if (!h.id) h.id = `sec-${i}-${(h.textContent || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
      return { id: h.id, label: h.textContent?.trim() || `Section ${i + 1}` };
    });
    setToc(items);
  }, [loaded]);

  // Box colours: each dropdown bar takes the next soft colour from the wiki's
  // wheel palette, so neighbours always differ. Flat colours, no shine.
  useEffect(() => {
    const root = contentRef.current;
    if (!root || !loaded) return;
    const palette: [number, number, number][] = [
      [207, 80, 84], // blue
      [238, 75, 88], // lavender
      [318, 50, 86], // orchid
      [44, 90, 80], // sun yellow
      [160, 50, 80], // mint
      [193, 55, 82], // teal
    ];
    const paint = () => {
      root.querySelectorAll<HTMLElement>('details.acc').forEach((b, i) => {
        const [h, sat, l] = palette[i % palette.length];
        b.style.setProperty('--acc-bg', `hsl(${h} ${sat}% ${l}%)`);
        b.style.setProperty('--acc-tint', `hsl(${h} ${Math.min(sat, 70)}% 96%)`);
        b.style.setProperty('--acc-line', `hsl(${h} ${sat}% ${l - 16}%)`);
      });
    };
    paint();
  }, [loaded]);

  // Spots in the page HTML where a live React widget goes (the CFD 3-D models).
  const [modelMounts, setModelMounts] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const el = contentRef.current;
    setModelMounts(el && loaded ? [...el.querySelectorAll<HTMLElement>('.cfd-3d-mount')] : []);
  }, [loaded]);

  const setAllOpen = (open: boolean) => {
    contentRef.current?.querySelectorAll<HTMLDetailsElement>('details.acc').forEach((d) => {
      d.open = open;
    });
  };

  // Open the section(s) containing a link target, then go to it.
  const reveal = useCallback((target: string) => {
    const id = decodeURIComponent(target.slice(1));
    const el = id ? document.getElementById(id) : null;
    if (!el || !contentRef.current?.contains(el)) return false;
    for (let d = el.closest('details'); d; d = d.parentElement?.closest('details') ?? null) d.open = true;
    el.scrollIntoView();
    return true;
  }, []);

  // New page content: start at the top (a jump, not the site's smooth scroll),
  // then go to the linked section if the URL names one.
  useEffect(() => {
    if (!loaded || loaded.slug !== slug) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (hash) reveal(hash);
  }, [loaded, slug, hash, reveal]);

  useEffect(() => {
    const openAll = () => setAllOpen(true);
    window.addEventListener('beforeprint', openAll);
    return () => window.removeEventListener('beforeprint', openAll);
  }, []);

  // Interactive diagrams embedded in the content (same-origin pages, e.g. the
  // LCA process maps) take the height of their own document and follow it.
  useEffect(() => {
    const el = contentRef.current;
    if (!el || !loaded) return;
    const observers: { disconnect(): void }[] = [];
    const fit = (frame: HTMLIFrameElement) => {
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      // The frame always matches the document's height, so the document itself
      // never needs to scroll (collapsed <details> can otherwise leave a phantom scrollbar).
      doc.documentElement.style.overflowY = 'hidden';
      // Height of the content itself (scrollHeight never drops below the frame, so it
      // could only grow) + the frame's borders (box-sizing is border-box) + 2px for
      // sub-pixel heights; either gap would otherwise show an inner scrollbar.
      const apply = () => {
        const content = Math.ceil(doc.documentElement.getBoundingClientRect().height);
        frame.style.height = `${content + frame.offsetHeight - frame.clientHeight + 2}px`;
      };
      apply();
      // Observe from the frame's own window: an observer from this window does not
      // reliably see changes inside another document. Resizes catch reflow; mutations
      // catch the diagram's own dropdowns and tabs opening or closing.
      const win = frame.contentWindow as (Window & typeof globalThis) | null;
      const ro = new (win?.ResizeObserver ?? ResizeObserver)(apply);
      ro.observe(doc.body);
      const mo = new (win?.MutationObserver ?? MutationObserver)(apply);
      mo.observe(doc.body, { subtree: true, childList: true, attributes: true, characterData: true });
      observers.push(ro, mo);
    };
    el.querySelectorAll<HTMLIFrameElement>('iframe.lca-pfd').forEach((frame) => {
      if (frame.contentDocument?.readyState === 'complete' && frame.contentDocument.body?.childElementCount) fit(frame);
      frame.addEventListener('load', () => fit(frame));
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [loaded]);

  // In-page anchors reveal their section; Dry Lab page links stay inside the app.
  const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href') ?? '';
    if (href.startsWith('#') && href.length > 1) {
      if (reveal(href)) {
        window.history.replaceState(window.history.state, '', href);
        e.preventDefault();
      }
    } else if (/^\/(dry-lab|project|wet-lab|human-practices|team|education|sustainability)(\/|#|$)/.test(href)) {
      e.preventDefault();
      navigate(href);
    }
  };

  const ready = loaded?.slug === slug;

  const ICONS = [
    <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    <><path d="M4 19V9M10 19V4M16 19v-7M22 19H2" /></>,
    <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    <><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" /></>,
    <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
    <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 4v16" /></>,
  ];
  const ACCENTS = ['#38BDF8', '#22D3EE', '#3B9EFF', '#3B82F6', '#4F7BF0', '#6366F1'];
  const indexItems: LiquidIndexItem[] = (toc.length ? toc : [{ id: 'dl-top', label: page.title }]).map((t, i) => ({
    num: String(i + 1).padStart(2, '0'),
    label: t.label,
    subtitle: '',
    sectionId: t.id,
    accent: ACCENTS[i % ACCENTS.length],
    icon: ICONS[i % ICONS.length],
  }));
  const ART: Record<string, string> = { model: 'chart', software: 'code', cfd: 'flow', lca: 'leaf' };

  return (
    // Pages always read in full: the draft's Brief/Full switch and the
    // expand/collapse-all bar are not shown.
    <main className={styles.page}>
      <LiquidIndex
        items={indexItems}
        className={shell.grad}
        header={
          <>
            <TitleCard title={page.title} art={ART[slug.split('-')[0]] ?? 'chart'} />
            <p className={styles.subtitle}>{page.subtitle}</p>
          </>
        }
      >
        <div className={styles.column} id="dl-top">
          {MODEL_SLUGS.has(slug) && (
            <nav aria-label="Model sections">
              <ul className={styles.tabs}>
                {modelTabs.map((t) => (
                  <li key={t.slug}>
                    <NavLink
                      to={t.path}
                      end
                      className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}
                    >
                      {t.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div>
            <article className={styles.card}>
              {ready ? (
                <div
                  ref={contentRef}
                  className={styles.content}
                  onClick={onContentClick}
                  dangerouslySetInnerHTML={{ __html: loaded.html }}
                />
              ) : (
                <div className={styles.loading} aria-busy="true" />
              )}
              {modelMounts.map((m, i) => createPortal(<CfdModels />, m, `models-${i}`))}
            </article>
          </div>

          {/* The draft's footer text (license + repository link are in the site footer). */}
          <section className={styles.note} aria-label="About the Dry Lab pages">
            <div>
              <h4>IIT Bombay iGEM 2026</h4>
              <p>
                Every figure on this site is a statement about a model. None of it has been validated against
                wet-lab data.
              </p>
            </div>
            <div>
              <h4>Pages</h4>
              <ul>
                {NOTE_LINKS.map((s) => {
                  const p = pageBySlug(s)!;
                  return (
                    <li key={s}>
                      <Link to={p.path}>{p.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h4>Code</h4>
              <p>
                Pre-flight tool (MIT):{' '}
                <a href="https://github.com/Siddhant-Chowdhary/igem-preflight">
                  github.com/Siddhant-Chowdhary/igem-preflight
                </a>
              </p>
            </div>
          </section>
        </div>
      </LiquidIndex>

      <Footer bgColor="transparent" />
    </main>
  );
}

/** /dry-lab/model/:slug, one of the model sub-pages; anything else goes to the overview. */
export function DryLabModelRoute() {
  const { slug = '' } = useParams();
  // these three live elsewhere now
  if (slug === 'engineering') return <Navigate to="/project/engineering" replace />;
  if (slug === 'results') return <Navigate to="/project/results" replace />;
  if (slug === 'life-cycle-assessment') return <Navigate to="/dry-lab/lca" replace />;
  if (slug === 'model' || !MODEL_SLUGS.has(slug)) return <Navigate to="/dry-lab/model" replace />;
  return <DryLabPage slug={slug} />;
}
