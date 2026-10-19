import { useState, type MouseEvent } from 'react';
import Accordion from '../../components/Accordion';
import PageShell from '../../components/PageShell';
import styles from './wetlab.module.css';
import { sections, wheelSegments, type Block, type ProtocolSection } from './protocolsData';

// Wheel geometry as fractions of the rendered wheel image, so the hit areas
// follow the image at whatever size it is displayed.
const WHEEL_FX = 0.48901;
const WHEEL_FY = 0.47041;
const HIT_FR_MIN = 0.2475;
const HIT_FR_MAX = 0.5446;

// Icon + label for each segment, drawn over the wheel artwork (positions are in
// the wheel image's 1212x1352 pixel space, at each circle's centre).
const WHEEL_W = 1212;
const WHEEL_H = 1352;
const wheelLabels: { id: string; icon: string; label: string; x: number; y: number }[] = [
  { id: 'media-preparation', icon: 'media', label: 'Media Preparation', x: 549, y: -16 },
  { id: 'dna-extraction-purification', icon: 'dna', label: 'DNA Extraction', x: 1110, y: 282 },
  { id: 'pcr-analysis', icon: 'pcr', label: 'PCR & Analysis', x: 1172, y: 846 },
  { id: 'restriction-cloning', icon: 'restriction', label: 'Restriction & Cloning', x: 686, y: 1240 },
  { id: 'transformation', icon: 'transformation', label: 'Transformation', x: 92, y: 980 },
  { id: 'culture-storage', icon: 'culture', label: 'Culture & Storage', x: 42, y: 372 },
];

function segmentAt(x: number, y: number, w: number, h: number) {
  const dx = x - WHEEL_FX * w;
  const dy = y - WHEEL_FY * h;
  const r = Math.hypot(dx, dy) / w;
  if (r < HIT_FR_MIN || r > HIT_FR_MAX) return null;
  const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  const a = (deg + 360) % 360;
  return wheelSegments.find((s) => a >= s.from && a < s.to) ?? null;
}

function ProtocolBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h':
            return <h4 key={i}>{b.text}</h4>;
          case 'p':
            return <p key={i}>{b.text}</p>;
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} start={b.start}>
                {b.items.map((it, j) =>
                  typeof it === 'string' ? (
                    <li key={j}>{it}</li>
                  ) : (
                    <li key={j}>
                      {it.text}
                      <ol>
                        {it.sub.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ol>
                    </li>
                  ),
                )}
              </ol>
            );
          case 'table':
            return (
              <table key={i}>
                <thead>
                  <tr>
                    {b.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((c, k) => (
                        <td key={k}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
        }
      })}
    </>
  );
}

function Section({ section, first }: { section: ProtocolSection; first: boolean }) {
  return (
    <section
      id={section.id}
      className={`${styles.section} ${first ? styles.sectionFirst : ''}`}
      style={{ borderColor: section.border }}
    >
      <h2 className={styles.sectionTitle} style={{ paddingTop: section.titleTop - 2 }}>
        {section.title}
        <div className={styles.sectionLine} style={{ marginTop: section.lineTop - section.titleTop - 39 }} />
      </h2>
      <div className={styles.pills} style={{ marginTop: section.buttonsTop - section.lineTop - 1 }}>
        <Accordion
          items={section.protocols.map((p) => ({
            id: p.title,
            title: p.title,
            content: (
              <div className={styles.protocolBody}>
                <ProtocolBlocks blocks={p.blocks} />
              </div>
            ),
          }))}
          theme={{ bar: section.button, barText: '#1e1e1e', body: section.body, accent: section.segment }}
        />
      </div>
    </section>
  );
}

export default function ProtocolsPage() {
  const [hover, setHover] = useState(false);

  const onWheelClick = (e: MouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const seg = segmentAt(e.clientX - r.left, e.clientY - r.top, r.width, r.height);
    if (seg) document.getElementById(seg.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onWheelMove = (e: MouseEvent<HTMLImageElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(segmentAt(e.clientX - r.left, e.clientY - r.top, r.width, r.height) !== null);
  };

  return (
    <PageShell title="Protocols" art="flask" index={[{ id: 'wheel', label: 'Protocol wheel' }, ...sections.map((s) => ({ id: s.id, label: s.title }))]}>
      <div id="wheel" className={styles.wheelCard}>
        <div className={styles.wheelWrap}>
        <img
          src="/iit-bombay/wetlab/protocols/wheel.png"
          alt="Protocol wheel: Media Preparation, DNA Extraction, PCR & Analysis, Restriction & Cloning, Transformation, Culture & Storage"
          className={styles.wheelImg}
          style={{ cursor: hover ? 'pointer' : 'default' }}
          onClick={onWheelClick}
          onMouseMove={onWheelMove}
          onMouseLeave={() => setHover(false)}
        />
        <p className={styles.wheelHint}>
          Click on a segment
          <br />
          to explore protocols
        </p>
        {wheelLabels.map((l) => (
          <button
            key={l.id}
            type="button"
            className={styles.wheelLabel}
            style={{ left: `${(l.x / WHEEL_W) * 100}%`, top: `${(l.y / WHEEL_H) * 100}%` }}
            onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <img src={`/wetlab/protocols/icon-${l.icon}.png`} alt="" className={styles.wheelIcon} />
            <span>{l.label}</span>
          </button>
        ))}
        </div>
      </div>
      {sections.map((s, i) => (
        <Section key={s.id} section={s} first={i === 0} />
      ))}
    </PageShell>
  );
}
