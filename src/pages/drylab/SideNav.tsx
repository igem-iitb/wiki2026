import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './drylab.module.css';
import { dryLabNav } from './drylabPages';

export type Heading = { id: string; text: string };

type Props = {
  slug: string;
  headings: Heading[];
  activeId: string;
  onJump: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
};

/** Left rail: page switcher (all Dry Lab tabs, Model expanded) and an index of the current page. */
export default function SideNav({ slug, headings, activeId, onJump, onExpandAll, onCollapseAll }: Props) {
  const wide = typeof window !== 'undefined' && window.matchMedia('(min-width: 1101px)').matches;
  const [modelOpen, setModelOpen] = useState<boolean | null>(null);

  return (
    <aside className={styles.sidebar} aria-label="Dry Lab navigation">
      <details className={styles.sideBlock} open={wide}>
        <summary className={styles.sideSummary}>Dry Lab pages</summary>
        <ul className={styles.sideList}>
          {dryLabNav.map((item) => {
            const active = item.slugs.includes(slug);
            const hasKids = !!item.children?.length;
            const open = hasKids && (modelOpen ?? active);
            return (
              <li key={item.path}>
                <div className={styles.sideRow}>
                  <Link
                    to={item.path}
                    className={`${styles.sideLink} ${active ? (hasKids ? styles.sideLinkParent : styles.sideLinkActive) : ''}`}
                    aria-current={active && !hasKids ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                  {hasKids && (
                    <button
                      type="button"
                      className={styles.sideToggle}
                      aria-expanded={open}
                      aria-label={`${open ? 'Hide' : 'Show'} ${item.label} sub-tabs`}
                      onClick={() => setModelOpen(!open)}
                    >
                      {open ? '▾' : '▸'}
                    </button>
                  )}
                </div>
                {open && (
                  <ul className={styles.sideSub}>
                    {item.children!.map((c) => (
                      <li key={c.path}>
                        <Link
                          to={c.path}
                          className={`${styles.sideSubLink} ${c.slug === slug ? styles.sideSubActive : ''}`}
                          aria-current={c.slug === slug ? 'page' : undefined}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </details>

      {headings.length > 0 && (
        <details className={styles.sideBlock} open={wide}>
          <summary className={styles.sideSummary}>On this page</summary>
          <ul className={styles.sideIndex}>
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`${styles.indexLink} ${h.id === activeId ? styles.indexActive : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onJump(h.id);
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.sideTools}>
            <button type="button" className={styles.btn} onClick={onExpandAll}>
              Expand all
            </button>
            <button type="button" className={styles.btn} onClick={onCollapseAll}>
              Collapse all
            </button>
          </div>
        </details>
      )}
    </aside>
  );
}
