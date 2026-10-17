import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import styles from './drylab.module.css';
import { dryLabPages, modelTabs } from './drylabPages';
import { enhance, openForId, setAllOpen, setSectionOpen } from './accordion';
import ChainFlow from './ChainFlow';
import QuickTools from './QuickTools';
import SideNav, { type Heading } from './SideNav';

// Each page's HTML is its own lazily loaded chunk.
const loaders = import.meta.glob('./content/*.html', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

const MODEL_SLUGS = new Set(modelTabs.map((t) => t.slug));
const pageBySlug = (slug: string) => dryLabPages.find((p) => p.slug === slug);

// Links listed in the draft's footer.
const NOTE_LINKS = ['home', 'model', 'cfd', 'lca', 'dbtl', 'software', 'contribution'];

// Pages that open with the clickable overview of the modelling flow.
const FLOW_SLUGS = new Set(['home', 'model']);

export default function DryLabPage({ slug }: { slug: string }) {
  const page = pageBySlug(slug)!;
  const [loaded, setLoaded] = useState<{ slug: string; html: string } | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    let alive = true;
    loaders[`./content/${slug}.html`]().then((html) => {
      if (alive) setLoaded({ slug, html: enhance(html) });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  // Open the section containing a link target, then scroll to it.
  const reveal = useCallback((target: string) => {
    const id = decodeURIComponent(target.replace(/^#/, ''));
    const el = openForId(contentRef.current, id);
    if (!el) return false;
    el.scrollIntoView();
    return true;
  }, []);

  // New page content: start at the top (a jump, not the site's smooth scroll), collect the
  // section index, then go to the linked section if the URL names one.
  useEffect(() => {
    if (!loaded || loaded.slug !== slug) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
    const hs = Array.from(contentRef.current?.querySelectorAll<HTMLElement>('.acc2-h[id]') ?? []).map((h) => ({
      id: h.id,
      text: h.querySelector('.acc2-title')?.textContent?.trim() ?? h.id,
    }));
    setHeadings(hs);
    setActiveId(hs[0]?.id ?? '');
    if (hash) reveal(hash);
  }, [loaded, slug, hash, reveal]);

  // Scroll spy: the last section heading above a line a little below the navbar.
  useEffect(() => {
    if (!headings.length) return;
    const onScroll = () => {
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= 140) current = h.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [headings]);

  // Print everything, not just the sections that happen to be open.
  useEffect(() => {
    const openAll = () => setAllOpen(contentRef.current, true);
    window.addEventListener('beforeprint', openAll);
    return () => window.removeEventListener('beforeprint', openAll);
  }, []);

  // Section headings toggle; in-page anchors reveal their section; Dry Lab links stay inside the app.
  const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    const btn = target.closest('.acc2-btn');
    if (btn) {
      const sec = btn.closest('.acc2');
      if (sec) setSectionOpen(sec, btn.getAttribute('aria-expanded') !== 'true');
      return;
    }
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = target.closest('a');
    const href = a?.getAttribute('href') ?? '';
    if (href.startsWith('#') && href.length > 1) {
      if (reveal(href)) {
        window.history.replaceState(window.history.state, '', href);
        e.preventDefault();
      }
    } else if (href.startsWith('/dry-lab')) {
      e.preventDefault();
      navigate(href);
    }
  };

  const ready = loaded?.slug === slug;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Dry Lab</span>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.subtitle}>{page.subtitle}</p>
      </header>

      <div className={styles.row}>
        <SideNav
          slug={slug}
          headings={headings}
          activeId={activeId}
          onJump={(id) => {
            if (reveal(id)) window.history.replaceState(window.history.state, '', `#${id}`);
          }}
          onExpandAll={() => setAllOpen(contentRef.current, true)}
          onCollapseAll={() => setAllOpen(contentRef.current, false)}
        />

        <div className={styles.column}>
          {FLOW_SLUGS.has(slug) && <ChainFlow />}

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
          </article>

          {/* The draft's footer text (license + repository link are in the site footer). */}
          <section className={styles.note} aria-label="About the Dry Lab pages">
            <div>
              <h4>IIT Bombay iGEM 2026</h4>
              <p>
                Every figure on this site is a statement about a model. None of it has been validated against wet-lab
                data. Status labels on each page say what is computed, taken from literature, a hypothesis, or pending.
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
      </div>

      <QuickTools />
      <Footer bgColor="transparent" />
    </main>
  );
}

const MOVED: Record<string, string> = {
  process: '/dry-lab/cfd',
  'life-cycle-assessment': '/dry-lab/lca',
};

/** /dry-lab/model/:slug — one of the model sub-pages; moved pages redirect, anything else goes to the overview. */
export function DryLabModelRoute() {
  const { slug = '' } = useParams();
  if (MOVED[slug]) return <Navigate to={MOVED[slug]} replace />;
  if (slug === 'model' || !MODEL_SLUGS.has(slug)) return <Navigate to="/dry-lab/model" replace />;
  return <DryLabPage slug={slug} />;
}
