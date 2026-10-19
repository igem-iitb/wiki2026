import { useState } from 'react';
import type { WriteUp } from '../pages/ihpData';
import styles from './WriteUpCard.module.css';

type Section = { label: string; key: keyof WriteUp };

const SECTIONS: Section[] = [
  { label: 'Purpose', key: 'purpose' },
  { label: 'Key Takeaway', key: 'keyTakeaway' },
  { label: 'Contribution', key: 'contribution' },
  { label: 'Implementation', key: 'implementation' },
];

type Props = {
  person: WriteUp;
  onBackToNetwork?: () => void;
};

/**
 * One person's write-up: a header row, a horizontal row of section tabs, then
 * the photo beside the answer. The answer box grows with its text instead of
 * sitting in a fixed-height panel, so short write-ups don't leave the card
 * mostly empty.
 */
export default function WriteUpCard({ person, onBackToNetwork }: Props) {
  const [active, setActive] = useState<keyof WriteUp>('purpose');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleBtn}>
          <span className={styles.name}>{person.name}</span>
        </div>
        {onBackToNetwork && (
          <button className={styles.back} onClick={onBackToNetwork}>
            Back to network ↑
          </button>
        )}
      </div>

      {/* Section tabs, laid out across the card */}
      <div className={styles.tabs} role="tablist" aria-label={`${person.name} write-up sections`}>
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            role="tab"
            aria-selected={active === s.key}
            className={`${styles.tab} ${active === s.key ? styles.tabActive : ''}`}
            onClick={() => setActive(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className={styles.box}>
        {/* photo, then who they are, when we met and what they helped with */}
        <div className={styles.side}>
          {person.photo ? (
            <img src={person.photo} alt={person.name} className={styles.photo} loading="lazy" />
          ) : (
            <div className={styles.image} aria-hidden>
              {person.name
                .replace(/^(Prof\.|Dr\.)\s*/, '')
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')}
            </div>
          )}
          {person.affiliation && <p className={styles.desig}>{person.affiliation}</p>}
          {person.date && (
            <p className={styles.date}>
              <span>Met:</span> {person.date}
            </p>
          )}
        </div>
        <p className={styles.answer} key={active as string}>
          {person[active]}
        </p>
        {person.summary && <p className={styles.summary}>{person.summary}</p>}
      </div>
    </div>
  );
}
