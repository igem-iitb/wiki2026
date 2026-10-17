import { Link } from 'react-router-dom';
import styles from './drylab.module.css';

type Node = { n: string; title: string; ask: string; found: string; to: string };

// Every statement below is taken from the page it links to.
const steps: Node[] = [
  { n: '1', title: 'Sequence', ask: 'Which yeast residue matches the Yarrowia chain-length residue?', found: 'V1254, so V1254W is the candidate. That it works in baker’s yeast is an assumption.', to: '/dry-lab/model/sequence' },
  { n: '2', title: 'FAS interaction', ask: 'Does the pocket of the enzyme hold a C14 chain?', found: 'The predicted position depended on how the run was set up, and a different random seed moved the ligand as much as a substitution did.', to: '/dry-lab/model/fas-interaction' },
  { n: '3', title: 'Bridge', ask: 'Can a metabolic model represent early release?', found: 'C14 export rose by only 2.6 %; NADPH is the limit.', to: '/dry-lab/model/bridge' },
  { n: '4', title: 'Metabolism', ask: 'What can the whole cell reach?', found: 'C14:0 only by shortening C16:0; no knockout set beat the wild type.', to: '/dry-lab/model/metabolism' },
  { n: '5', title: 'Trust', ask: 'Is the strain-design ranking informative?', found: 'The scoring function failed its own checks; no strain proposals were issued.', to: '/dry-lab/model/trust' },
];

const downstream: Node[] = [
  { n: 'CFD', title: 'Heat flow', ask: 'Does the coolant keep a server cool?', found: 'Below 85 °C at 0.27 m/s, against 0.80 m/s for two reference coolants.', to: '/dry-lab/cfd' },
  { n: 'LCA', title: 'Life cycle', ask: 'What is the footprint?', found: 'Production footprint is high today; the net result depends on the grid carbon factor.', to: '/dry-lab/lca' },
  { n: 'DBTL', title: 'Cycles and failures', ask: 'What was tried, what failed, and what did each failure change?', found: '', to: '/dry-lab/dbtl' },
];

/** Clickable overview: the five-step modelling flow, the downstream analyses and the DBTL record. */
export default function ChainFlow() {
  return (
    <section className={styles.flow} aria-label="Overview of the modelling flow">
      <h2 className={styles.flowH}>At a glance</h2>
      <p className={styles.flowLead}>
        One question, from a single residue to a coolant: can baker’s yeast be engineered to make myristic acid (C14:0)
        for a bio-based data-centre coolant? Select a step to open its page. All results are model outputs and none has
        been validated against wet-lab data.
      </p>

      <p className={styles.flowLabel}>Strain-design flow</p>
      <ol className={styles.flowSteps}>
        {steps.map((s) => (
          <li key={s.n}>
            <Link to={s.to} className={`${styles.card} ${styles.flowStep}`}>
              <span className={styles.flowNum}>{s.n}</span>
              <span className={styles.flowCell}>
                <span className={styles.flowTitle}>{s.title}</span>
                <span className={styles.flowAsk}>{s.ask}</span>
              </span>
              <span className={styles.flowCell}>
                <span className={styles.flowFound}>{s.found}</span>
                <span className={styles.flowGo}>Open page →</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className={styles.flowLabel}>Downstream and record</p>
      <ul className={styles.flowDown}>
        {downstream.map((s) => (
          <li key={s.n}>
            <Link to={s.to} className={`${styles.card} ${styles.flowCell}`}>
              <span className={styles.flowNum}>{s.n}</span>
              <span className={styles.flowTitle}>{s.title}</span>
              <span className={styles.flowAsk}>{s.ask}</span>
              {s.found && <span className={styles.flowFound}>{s.found}</span>}
              <span className={styles.flowGo}>Open page →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
