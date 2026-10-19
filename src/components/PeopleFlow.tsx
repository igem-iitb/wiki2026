import styles from './PeopleFlow.module.css';

type Box = {
  id: string;
  label: string;
  /** Position and size on the 1100 x 870 reference board, in px. */
  x: number;
  y: number;
  w: number;
  h: number;
  head: string;
  body: string;
  edge: string;
  /** Names shown, and the id of their write-up (null = name only). */
  people: [string, string | null][];
};

const BOXES: Box[] = [
  {
    id: 'wetlab', label: 'WETLABS', x: 75, y: 82, w: 280, h: 240, head: '#fcd96a', body: '#fff4d1', edge: '#2a2f55',
    people: [
      ['Parth', 'parth'], ['Prachita', 'prachita'], ['Professor Phale', 'prof-phale'], ['Professor Shantanu', 'prof-santanu'],
      ['Anushka Alikar', 'anushka-alikar'], ['Professor Balaji', 'balaji'], ['Pratik Makhija', 'pratik-makhija'],
      ['Sayali Bokare', 'sayali'],
    ],
  },
  {
    id: 'pis', label: "PI'S", x: 413, y: 70, w: 275, h: 150, head: '#8fcbf7', body: '#d2eafc', edge: '#2a2f55',
    people: [['Professor Saket', null], ['Professor Rajesh', null]],
  },
  {
    id: 'drylab', label: 'DRY LABS', x: 750, y: 100, w: 295, h: 220, head: '#cfa8f5', body: '#ece0fb', edge: '#2a2f55',
    people: [
      ['Professor Yogendra Shastri', 'yogendra-shastri'], ['Professor Sandip', 'prof-sandeep'], ['Professor Suyash', 'prof-suyash'],
      ['Shubham', 'shubham'], ['Rutuja Maam', 'rutuja'], ['Professor Shivasubramanian', 'prof-shiva'],
    ],
  },
  {
    id: 'product-dev', label: 'PRODUCT DEV', x: 45, y: 370, w: 308, h: 190, head: '#f9a9c0', body: '#fde3ec', edge: '#2a2f55',
    people: [
      ['Dr. Navratna', 'dr-navratna'], ['Rajesh Vadgama Sir (L’Oréal)', 'rajesh-vagdama'],
      ['Subhendu Sir (Shell)', 'subhendhu'], ['Vaibhav Sai Sir', 'vaibhav-sai'],
    ],
  },
  {
    id: 'regulations', label: 'REGULATIONS', x: 755, y: 380, w: 300, h: 120, head: '#fcd96a', body: '#fff4d1', edge: '#2a2f55',
    people: [['ECHA', 'echa']],
  },
  {
    id: 'alumni', label: 'ALUMNI', x: 255, y: 582, w: 280, h: 210, head: '#a8e6b4', body: '#e1f6e5', edge: '#2a2f55',
    people: [['Husayn', 'husayn'], ['Aditya', 'aditya-ict'], ['Anagdha', 'anagdha'], ['Deepan', 'deepan'], ['Dawar', 'dawar']],
  },
  {
    id: 'others', label: 'OTHERS', x: 615, y: 582, w: 322, h: 210, head: '#b4c8ef', body: '#e1e9f9', edge: '#2a2f55',
    people: [['Kadambari', null], ['Hrushikesh', null], ['Archana', null], ['iGEM Denmark', 'igem-denmark'], ['Nicola O’Riordan', null]],
  },
];

const W = 1100;
const H = 870;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

// Spokes from the hub (centre 550,430) out to each box.
const LINES = [
  'M 450 372 L 355 285', 'M 550 345 L 550 220', 'M 655 368 L 750 305',
  'M 445 430 L 353 430', 'M 660 430 L 755 430', 'M 500 505 L 430 582', 'M 605 505 L 680 582',
];

type Props = { onPick: (id: string) => void };

/**
 * The People Flow board as a hub-and-spoke chart: the iHP hub in the middle and a
 * boxed group for each kind of person we spoke to. Names with a write-up open it.
 */
export default function PeopleFlow({ onPick }: Props) {
  return (
    <div className={styles.paper}>
      <div className={styles.canvas}>
        <svg className={styles.svg} viewBox={`0 0 ${W} ${H}`} aria-hidden>
          {LINES.map((d) => (
            <path key={d} d={d} fill="none" stroke="#2a2f55" strokeWidth="2.4" strokeLinecap="round" />
          ))}
        </svg>
        <span className={styles.hub} style={{ left: pct(445, W), top: pct(345, H), width: pct(215, W), height: pct(160, H) }}>
          IHP
        </span>

        {BOXES.map((b) => (
          <div
            key={b.id}
            className={styles.box}
            style={{ left: pct(b.x, W), top: pct(b.y, H), width: pct(b.w, W), minHeight: pct(b.h, H), background: b.body }}
          >
            <h3 className={styles.label} style={{ background: b.head }}>{b.label}</h3>
            <ul className={styles.people}>
              {b.people.map(([name, id]) => (
                <li key={name}>
                  {id ? (
                    <button type="button" className={styles.person} onClick={() => onPick(id)}>
                      {name}
                    </button>
                  ) : (
                    <span className={`${styles.person} ${styles.personStatic}`}>{name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
