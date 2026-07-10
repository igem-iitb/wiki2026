import { useRef, useState } from 'react';
import Footer from '../components/Footer';
import WriteUpCard from '../components/WriteUpCard';
import { esterSteps, innerRingIds, writeUps } from './ihpData';
import styles from './ihp.module.css';

const CONCLUSION =
  'ESTER is not a straight line from problem to solution. It is a living loop: observation becomes dialogue, dialogue becomes a testable idea, testing becomes implementation, and implementation returns to people for refinement. The “integrated” in integrated human practices is therefore not a separate chapter — it is the connective tissue of the entire project.';

// Split the people onto the inner / outer network rings and give each a slot.
const innerPeople = writeUps.filter((w) => innerRingIds.includes(w.id));
const outerPeople = writeUps.filter((w) => !innerRingIds.includes(w.id));

// Elliptical ring: a smaller horizontal radius keeps wide name pills from
// spilling past the panel edges while still reading as a circle.
function ringPositions(count: number, rx: number, ry: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
    return { x: 50 + rx * Math.cos(angle), y: 50 + ry * Math.sin(angle) };
  });
}

const innerPos = ringPositions(innerPeople.length, 24, 28);
const outerPos = ringPositions(outerPeople.length, 39, 46);
const placedNodes = [
  ...innerPeople.map((p, i) => ({ ...p, ...innerPos[i] })),
  ...outerPeople.map((p, i) => ({ ...p, ...outerPos[i] })),
];

export default function IhpPage() {
  const [opened, setOpened] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const networkRef = useRef<HTMLDivElement>(null);
  const esterRef = useRef<HTMLDivElement>(null);

  const scrollToWriteUp = (id: string) => {
    setOpenId(id);
    requestAnimationFrame(() => {
      document.getElementById(`writeup-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const backToNetwork = () => {
    setOpenId(null);
    networkRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className={styles.page}>
      {/* Opening door / tribute overlay */}
      <div
        className={`${styles.door} ${opened ? styles.opened : ''}`}
        onClick={() => setOpened(true)}
        role="button"
        aria-label="Open the page"
      >
        <div className={`${styles.doorHalf} ${styles.doorTop}`}>
          <p className={styles.tribute}>None of this would have happened without them.</p>
        </div>
        <div className={styles.doorLine} />
        <div className={`${styles.doorHalf} ${styles.doorBottom}`}>
          <span className={styles.doorHint}>Click to open</span>
        </div>
      </div>

      <div className={`${styles.content} ${opened ? styles.revealed : ''}`}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.profRow}>
            <div className={styles.profCard}>Prof. Rajesh Patkar</div>
            <div className={styles.profCard}>Prof. Saket Choudhary</div>
          </div>

          <div className={styles.contentBox}>CONTENT</div>

          <button
            className={styles.knowMore}
            onClick={() => esterRef.current?.scrollIntoView({ behavior: 'smooth' })}
          >
            Click to know more
            <span className={styles.chevron}>⌄</span>
          </button>
        </section>

        {/* White content slab */}
        <div className={styles.panel} ref={esterRef}>
          <aside className={styles.indexRail}>
            <span>index</span>
          </aside>

          <div className={styles.panelMain}>
            {/* ESTER timeline */}
            <div className={styles.timeline}>
              {esterSteps.map((s, i) => (
                <div className={styles.step} key={i}>
                  <div className={styles.stepDot} style={{ background: s.color }}>
                    {s.letter}
                  </div>
                  <div className={styles.stepBody}>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                  <div className={styles.stepIcon}>
                    <img src={s.icon} alt="" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>

            {/* Network summary */}
            <h2 className={styles.networkHeading}>Network Summary</h2>
            <p className={styles.networkHint}>Everyone we reached out to, orbiting the process.</p>
            <div className={styles.networkWrap} ref={networkRef}>
              <svg className={styles.networkSvg} viewBox="0 0 100 100">
                <ellipse cx="50" cy="50" rx="24" ry="28" />
                <ellipse cx="50" cy="50" rx="39" ry="46" />
              </svg>
              <div className={styles.networkGlow} />
              <div className={styles.networkCore}>ESTER</div>
              {placedNodes.map((n) => (
                <button
                  key={n.id}
                  className={styles.node}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  onClick={() => scrollToWriteUp(n.id)}
                >
                  {n.name}
                </button>
              ))}
            </div>
            <p className={styles.networkOpenCue}>Click to open full write up</p>

            {/* Individual write-ups */}
            <h2 className={styles.writeHeading}>Individual write-ups</h2>
            <div className={styles.bars}>
              {writeUps.map((w) => {
                const isOpen = openId === w.id;
                return (
                  <div key={w.id} id={`writeup-${w.id}`} className={styles.barItem}>
                    {/* collapsed blue bar */}
                    <div className={`${styles.region} ${isOpen ? '' : styles.regionShown}`}>
                      <div className={styles.regionInner}>
                        <button className={styles.barBtn} onClick={() => setOpenId(w.id)}>
                          <span className={styles.barName}>{w.name}</span>
                          <span className={styles.barCue}>click to open full write up</span>
                        </button>
                      </div>
                    </div>
                    {/* expanded card */}
                    <div className={`${styles.region} ${isOpen ? styles.regionShown : ''}`}>
                      <div className={styles.regionInner}>
                        <WriteUpCard
                          person={w}
                          onToggle={() => setOpenId(null)}
                          onBackToNetwork={backToNetwork}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <section className={styles.conclusion}>
          <span className={styles.bigI}>i</span>
          <h2>Conclusion — the i in iHP</h2>
          <p>{CONCLUSION}</p>
        </section>

        <Footer />
      </div>
    </div>
  );
}
