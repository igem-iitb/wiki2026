import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import WriteUpCard from '../components/WriteUpCard';
import { esterSteps, innerRingIds, writeUps } from './ihpData';
import styles from './ihp.module.css';

const CONCLUSION =
  'ESTER is not a straight line from problem to solution. It is a living loop: observation becomes dialogue, dialogue becomes a testable idea, testing becomes implementation, and implementation returns to people for refinement. The “integrated” in integrated human practices is therefore not a separate chapter — it is the connective tissue of the entire project.';

// Split the people onto the inner / outer network rings and give each a slot.
const innerPeople = writeUps.filter((w) => innerRingIds.includes(w.id));
const outerPeople = writeUps.filter((w) => !innerRingIds.includes(w.id));

// Perfect-circle rings. dx/dy are the unit direction from the centre.
function ringPositions(count: number, r: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (-90 + (360 / count) * i) * (Math.PI / 180);
    return {
      x: 50 + r * Math.cos(angle),
      y: 50 + r * Math.sin(angle),
      dx: Math.cos(angle),
      dy: Math.sin(angle),
    };
  });
}

const INNER_R = 24;
const OUTER_R = 39;
const innerPos = ringPositions(innerPeople.length, INNER_R);
const outerPos = ringPositions(outerPeople.length, OUTER_R);
const placedNodes = [
  ...innerPeople.map((p, i) => ({ ...p, ...innerPos[i] })),
  ...outerPeople.map((p, i) => ({ ...p, ...outerPos[i] })),
];

export default function IhpPage() {
  const [opened, setOpened] = useState(false);

  const networkRef = useRef<HTMLDivElement>(null);
  const esterRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [revealIn, setRevealIn] = useState(false);

  // Lock scroll behind the door so it can't be scrolled past before opening.
  useEffect(() => {
    document.documentElement.style.overflow = opened ? '' : 'hidden';
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [opened]);

  // ESTER reveal auto-plays once it scrolls into view: the two lines slide in
  // from the edges and ease into the centre. Requires a minimum amount of
  // scroll first (it sits inside the 100vh hero, so it's already in view on
  // load — without this it would fire instantly with no scroll at all). Once
  // both conditions are met it fires once and the animation runs to
  // completion on its own, independent of further scrolling.
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const MIN_SCROLL = 150;
    let intersecting = false;
    let triggered = false;
    const tryTrigger = () => {
      if (triggered || !intersecting || window.scrollY < MIN_SCROLL) return;
      triggered = true;
      setRevealIn(true);
      observer.disconnect();
      window.removeEventListener('scroll', tryTrigger);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        tryTrigger();
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    window.addEventListener('scroll', tryTrigger, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', tryTrigger);
    };
  }, []);

  // Every write-up is always fully expanded — no collapse/expand state — so
  // clicking a node just scrolls straight to it.
  const scrollToWriteUp = (id: string) => {
    document.getElementById(`writeup-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const backToNetwork = () => {
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
            <figure className={styles.profCard}>
              <div
                className={styles.profPhotoWrap}
                style={{ ['--photo-src' as string]: "url('/members/profRajesh.png')" }}
              >
                <img src="/members/profRajesh.png" alt="Prof. Rajesh Patkar" className={styles.profPhoto} />
              </div>
              <figcaption className={styles.profName}>Prof. Rajesh Patkar</figcaption>
            </figure>
            <figure className={styles.profCard}>
              <div
                className={styles.profPhotoWrap}
                style={{ ['--photo-src' as string]: "url('/members/profSaket.png')" }}
              >
                <img src="/members/profSaket.png" alt="Prof. Saket Choudhary" className={styles.profPhoto} />
              </div>
              <figcaption className={styles.profName}>Prof. Saket Choudhary</figcaption>
            </figure>
          </div>

          <div ref={revealRef} className={`${styles.reveal} ${revealIn ? styles.inview : ''}`}>
            <div className={styles.revealTop}>FROM PEOPLE TO PROCESS</div>
            <div className={styles.revealWord}>ESTER</div>
          </div>

          <button
            className={styles.knowMore}
            onClick={() => esterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
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
                <circle cx="50" cy="50" r={INNER_R} />
                <circle cx="50" cy="50" r={OUTER_R} />
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

            {/* Individual write-ups — always fully expanded, no collapse */}
            <h2 className={styles.writeHeading}>Individual write-ups</h2>
            <div className={styles.bars}>
              {writeUps.map((w) => (
                <div key={w.id} id={`writeup-${w.id}`} className={styles.barItem}>
                  <WriteUpCard person={w} onBackToNetwork={backToNetwork} />
                </div>
              ))}
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
