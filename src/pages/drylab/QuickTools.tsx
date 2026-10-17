import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './drylab.module.css';
import { dryLabPages } from './drylabPages';

/** Floating buttons: back to the top of the page, and a quick tab switcher (also Ctrl/Cmd+K). */
export default function QuickTools() {
  const [showTop, setShowTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => input.current?.focus(), 0);
    }
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return dryLabPages.filter((p) => !t || p.title.toLowerCase().includes(t) || p.slug.includes(t));
  }, [q]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <div className={styles.fabs}>
        {showTop && (
          <button type="button" className={`${styles.btn} ${styles.fab}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to the top of the page" title="Back to top">
            Top
          </button>
        )}
        <button type="button" className={`${styles.btn} ${styles.fab}`} onClick={() => go('/dry-lab')} aria-label="Dry Lab home" title="Dry Lab home">
          Home
        </button>
        <button type="button" className={`${styles.btn} ${styles.fab}`} onClick={() => setOpen(true)} aria-label="Open the quick tab switcher" title="Quick switcher (Ctrl+K)">
          Pages
        </button>
      </div>

      {open && (
        <div className={styles.qsBack} onMouseDown={() => setOpen(false)}>
          <div className={`${styles.card} ${styles.qs}`} role="dialog" aria-modal="true" aria-label="Quick tab switcher" onMouseDown={(e) => e.stopPropagation()}>
            <input
              ref={input}
              className={styles.input}
              placeholder="Go to a Dry Lab page…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setSel((s) => Math.min(s + 1, results.length - 1));
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setSel((s) => Math.max(s - 1, 0));
                } else if (e.key === 'Enter' && results[sel]) {
                  go(results[sel].path);
                }
              }}
            />
            <ul className={styles.qsList}>
              {results.map((p, i) => (
                <li key={p.slug}>
                  <button type="button" className={`${styles.qsItem} ${i === sel ? styles.qsSel : ''}`} onMouseEnter={() => setSel(i)} onClick={() => go(p.path)}>
                    <span>{p.title}</span>
                    <span className={styles.qsPath}>{p.path}</span>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className={styles.qsEmpty}>No matching page</li>}
            </ul>
            <div className={styles.qsHint}>↑ ↓ to move · Enter to open · Esc to close</div>
          </div>
        </div>
      )}
    </>
  );
}
