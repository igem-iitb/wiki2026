import { useState } from 'react';
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
  onToggle?: () => void;
  onBackToNetwork?: () => void;
};

/**
 * One person's write-up, matching the Figma "individual write" card:
 * light-blue rounded shell, a header row, then a bordered box split into a
 * left column (photo + section headings) and a right answer box. Clicking a
 * heading swaps the answer shown. Reusable for every person.
 */
export default function WriteUpCard({ person, onToggle, onBackToNetwork }: Props) {
  const [active, setActive] = useState<keyof WriteUp>('purpose');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <button className={styles.titleBtn} onClick={onToggle} aria-label="Collapse write-up">
          <span className={styles.name}>{person.name}</span>
          {person.affiliation && <span className={styles.aff}>({person.affiliation})</span>}
          <span className={styles.caret}>▲</span>
        </button>
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

        <div className={styles.answer}>
          <p key={active as string}>{person[active]}</p>
        </div>
      </div>
    </div>
  );
}
