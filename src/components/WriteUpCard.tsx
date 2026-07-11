import { useLayoutEffect, useRef, useState } from 'react';
import type { WriteUp } from '../pages/ihpData';
import styles from './WriteUpCard.module.css';

type Section = { label: string; key: keyof WriteUp };

const SECTIONS: Section[] = [
  { label: 'Purpose', key: 'purpose' },
  { label: 'Key Takeaway', key: 'keyTakeaway' },
  { label: 'Contribution', key: 'contribution' },
  { label: 'Implementation', key: 'implementation' },
  { label: 'References', key: 'references' },
];

type Props = {
  person: WriteUp;
  onBackToNetwork?: () => void;
};

/**
 * One person's write-up, matching the Figma "individual write" card:
 * light-blue rounded shell, a header row, then a bordered box split into a
 * left column (photo + section headings) and a right answer box. Clicking a
 * heading swaps the answer shown. Always fully expanded — no collapse.
 * Reusable for every person.
 */
export default function WriteUpCard({ person, onBackToNetwork }: Props) {
  const [active, setActive] = useState<keyof WriteUp>('purpose');
  const answerRef = useRef<HTMLParagraphElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  // Show a "Scroll down" indicator whenever the answer overflows its box; it
  // fades out once the reader reaches the bottom.
  useLayoutEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    const check = () => {
      setScrollable(el.scrollHeight > el.clientHeight + 2);
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [active, person]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBtn}>
          <span className={styles.name}>{person.name}</span>
          {person.affiliation && <span className={styles.aff}>({person.affiliation})</span>}
        </div>
        {onBackToNetwork && (
          <button className={styles.back} onClick={onBackToNetwork}>
            Back to network ↑
          </button>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.box}>
        <div className={styles.left}>
          <div className={styles.image} aria-label={`Photo of ${person.name}`}>
            Image
          </div>
          <div className={styles.tabs}>
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                className={`${styles.tab} ${active === s.key ? styles.tabActive : ''}`}
                onClick={() => setActive(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`${styles.answer} ${scrollable ? styles.answerScrollable : ''}`}>
          <p ref={answerRef} key={active as string}>
            {person[active]}
          </p>
          {scrollable && (
            <div
              className={`${styles.scrollDown} ${atBottom ? styles.scrollDownHidden : ''}`}
              aria-hidden="true"
            >
              <span className={styles.scrollDownText}>Scroll down</span>
              <span className={styles.scrollDownArrow}>↓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
