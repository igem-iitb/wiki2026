import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Footer from '../components/Footer';
import TitleCard from '../components/TitleCard';
import styles from './kyt.module.css';

type Member = { name: string; photo: string; objectPosition?: string; zoom?: number };

type Group = {
  id: string;
  label: string;
  /** Role shown in the popup. */
  role: string;
  members: Member[];
};

const groups: Group[] = [
  {
    id: 'pi',
    label: 'Project Investigators',
    role: 'Principal Investigator',
    members: [
      { name: 'Prof. Saket Choudhary', photo: '/iit-bombay/members/profSaket.webp', objectPosition: 'center 100%', zoom: 1.3 },
      { name: 'Prof. Rajesh Patkar', photo: '/iit-bombay/members/profRajesh.webp', objectPosition: 'center 0%' },
    ],
  },
  {
    id: 'leads',
    label: 'Project Leads',
    role: 'Project Lead',
    members: [
      { name: 'Aarohi Gupta', photo: '/iit-bombay/members/aaorhi.jpg', objectPosition: 'center 0%' },
      { name: 'Angel Singhvi', photo: '/iit-bombay/members/angel-singhvi.jpg', objectPosition: 'center -20%' },
    ],
  },
  {
    id: 'wet',
    label: 'Wet Lab',
    role: 'Wet Lab',
    members: [
      { name: 'Durva Sachin Saraf', photo: '/iit-bombay/members/durva.jpg', objectPosition: 'center 0%' },
      { name: 'Madhur', photo: '/iit-bombay/members/madhur.jpg', objectPosition: 'center 60%', zoom: 1.1 },
      { name: 'Ranit S Sooraj', photo: '/iit-bombay/members/ranit.webp', objectPosition: 'center 40%', zoom: 1.2 },
      { name: 'Hardika Jain', photo: '/iit-bombay/members/hardika-jain.webp', objectPosition: 'center 40%', zoom: 1.1 },
      { name: 'Aayush Gupta', photo: '/iit-bombay/members/aayush-gupta.jpg', objectPosition: 'center 10%' },
      { name: 'Abhinav Gupta', photo: '/iit-bombay/members/abhinav.jpg', objectPosition: 'center 50%' },
      { name: 'Manish S', photo: '/iit-bombay/members/manish.jpg', objectPosition: 'center 30%', zoom: 1.1 },
    ],
  },
  {
    id: 'dry',
    label: 'Dry Lab',
    role: 'Dry Lab',
    members: [
      { name: 'Arhan Khade', photo: '/iit-bombay/members/arhan.jpg', objectPosition: 'center 0%' },
      { name: 'Bipra Bhanu Mohanty', photo: '/iit-bombay/members/bipra-bhanu-mohanty.jpg', objectPosition: 'center 15%' },
      { name: 'Ishaan Chhaya', photo: '/iit-bombay/members/ishaan.webp', objectPosition: 'center 10%' },
      { name: 'Pratik Rahul Ingle', photo: '/iit-bombay/members/pratik.jpeg', objectPosition: 'center 10%' },
      { name: 'Siddhant Chowdhary', photo: '/iit-bombay/members/siddhant.webp', objectPosition: 'center 50%', zoom: 2 },
      { name: 'Ekansh', photo: '/iit-bombay/members/ekansh.jpg', objectPosition: 'center 20%', zoom: 1.7 },
      { name: 'Gururatna Upadhyay', photo: '/iit-bombay/members/guru.webp', objectPosition: 'center 20%', zoom: 1.2 },
    ],
  },
  {
    id: 'hp',
    label: 'Human Practices',
    role: 'Human Practices',
    members: [
      { name: 'Yashika', photo: '/iit-bombay/members/yashika.webp', objectPosition: 'center 40%', zoom: 1.3 },
      { name: 'Arnav Oza', photo: '/iit-bombay/members/arnav.webp', objectPosition: 'center 30%' },
      { name: 'Tanish Jain', photo: '/iit-bombay/members/tanish.jpg', objectPosition: 'center 10%', zoom: 1.1 },
      { name: 'Shinjini Jain', photo: '/iit-bombay/members/shinjini.webp', objectPosition: 'center top' },
      { name: 'Latisha Meena', photo: '/iit-bombay/members/latisha.jpg', objectPosition: 'center top' },
      { name: 'Mitali Arya', photo: '/iit-bombay/members/mitali.jpg', objectPosition: 'center 20%' },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    role: 'Web & Design',
    members: [
      { name: 'Sagnik Dey', photo: '/iit-bombay/members/sagnik_dey.webp', objectPosition: 'center 0%' },
      { name: 'Nisarg Rathod', photo: '/iit-bombay/members/nisarg-rathod.jpeg', objectPosition: 'center 3%', zoom: 1.3 },
      { name: 'Aryan Prasad', photo: '/iit-bombay/members/aryan-prasad.webp', objectPosition: 'center 35%' },
    ],
  },
];

// Everyone in page order, so the popup's Next / Prev runs through the whole team.
const everyone = groups.flatMap((g) => g.members.map((m) => ({ ...m, role: g.role })));
const firstIndex = groups.reduce<number[]>((acc, _g, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + groups[i - 1].members.length);
  return acc;
}, []);

function Photo({ m }: { m: Member }) {
  const style: CSSProperties = {
    objectPosition: m.objectPosition || 'center top',
    transform: m.zoom && m.zoom !== 1 ? `scale(${m.zoom})` : undefined,
  };
  return (
    <div className={styles.pic}>
      <img src={m.photo} alt={m.name} style={style} loading="lazy" />
    </div>
  );
}

export default function KytPage() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastCard = useRef<HTMLElement | null>(null);

  const show = useCallback((k: number) => setOpen((k + everyone.length) % everyone.length), []);
  const close = useCallback(() => {
    setOpen(null);
    lastCard.current?.focus();
  }, []);

  // Esc closes, arrow keys step; the page behind does not scroll while open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(open + 1);
      if (e.key === 'ArrowLeft') show(open - 1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, show, close]);

  const m = open === null ? null : everyone[open];

  return (
    <div className={styles.page}>
      <TitleCard title="Meet Our Team" />

      <div className={styles.photo}>
        <img src="/iit-bombay/team_pic.webp" alt="The iGEM IIT Bombay 2026 team" />
      </div>

      <main>
        {groups.map((g, gi) => (
          <section
            key={g.id}
            id={g.id}
            className={`${styles.group} ${g.members.length <= 2 ? styles.pair : ''}`}
          >
            <div className={styles.label}>{g.label}</div>
            <div className={styles.grid}>
              {g.members.map((mem, mi) => (
                <button
                  key={mem.name}
                  type="button"
                  className={styles.card}
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    lastCard.current = e.currentTarget;
                    show(firstIndex[gi] + mi);
                  }}
                >
                  <Photo m={mem} />
                  <div className={styles.nm}>{mem.name}</div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>

      <div style={{ height: 90 }} />
      <Footer bgColor="transparent" />

      {m && open !== null && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={m.name}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className={styles.polar} key={open}>
            <button ref={closeRef} type="button" className={styles.x} aria-label="Close" onClick={close}>
              ×
            </button>
            <Photo m={m} />
            <h3>{m.name}</h3>
            <p className={styles.role}>{m.role}</p>
            <p className={styles.count}>
              {open + 1} of {everyone.length}
            </p>
            <div className={styles.nv}>
              <button type="button" onClick={() => show(open - 1)}>
                ← Prev
              </button>
              <button type="button" onClick={() => show(open + 1)}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
