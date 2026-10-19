import { Link } from 'react-router-dom';
import DocViewer from '../components/DocViewer';
import PageShell from '../components/PageShell';
import styles from './projectPages.module.css';

// Text from "wiki wetlab doccumentation" (day 3), RESULTS section. Only the
// red-highlighted "add … here" notes are instructions; the pink-shaded boxes
// (mutation-site selection, PreFlight) are content. The GC-MS comparison box
// has a heading but no data yet, so it is not shown.

const INDEX = [
  { id: 'res-cfd', label: 'Thermal efficiency (CFD)' },
  { id: 'res-site', label: 'Selection of mutation site' },
  { id: 'res-validation', label: 'V1254W validation' },
  { id: 'res-lca', label: 'Life cycle assessment' },
];

export default function ResultsPage() {
  return (
    <PageShell title="Results" index={INDEX}>
      <div className={styles.panel}>
        <h2 className={styles.h1}>Results</h2>
        <p className={styles.lead}>
          This section presents the computational and experimental results obtained during the development of BiFROST,
          our proposed bio-based dielectric coolant for single-phase immersion cooling. We evaluate its thermal
          performance through CFD simulations and document the construction and validation of the engineered{' '}
          <i>FAS2</i> mutant intended to enhance C14 fatty acid production. Together, these results establish the
          progress and achievements in the project so far.
        </p>

        {/* ---------- CFD ---------- */}
        <section id="res-cfd" className={`${styles.card} ${styles.blue}`}>
          <h3 className={styles.cardTitle}>Establishing thermal efficiency via Computational Fluid Dynamics</h3>

          <h4 className={styles.h3}>Basis 1: same flow rate, 0.42 m/s</h4>
          <figure className={styles.figure}>
            <video
              src="/iit-bombay/drylab/cfd/comparison-3coolants-temperature-speed.mp4"
              controls
              muted
              loop
              playsInline
              preload="metadata"
            />
            <figcaption>
              <b>Figure 1.</b> Server temperature (top) and coolant speed (bottom) at the same inlet conditions for all
              three coolants: inlet velocity 0.42&nbsp;m/s (34.4&nbsp;L/min), inlet temperature 25&nbsp;°C, server heat
              1,200&nbsp;W.
            </figcaption>
          </figure>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Coolant</th>
                  <th>Mass flow (kg/s)</th>
                  <th>
                    Server T<sub>max</sub> (°C)
                  </th>
                  <th>Margin to 85 °C (K)</th>
                  <th>Tank Δp (Pa)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.hl}>
                  <td>Methyl myristate (MM)</td>
                  <td>0.496</td>
                  <td>78.1</td>
                  <td>+6.9</td>
                  <td>65</td>
                </tr>
                <tr>
                  <td>GTL-based coolant</td>
                  <td>0.459</td>
                  <td>84.0</td>
                  <td>+1.0</td>
                  <td>63</td>
                </tr>
                <tr>
                  <td>Mineral oil</td>
                  <td>0.475</td>
                  <td>87.2</td>
                  <td>−2.2</td>
                  <td>≈64 (est.)</td>
                </tr>
                <tr>
                  <td>Ester-based coolant</td>
                  <td>0.525</td>
                  <td>88.0</td>
                  <td>−3.0</td>
                  <td>72.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className={styles.h3}>Basis 2: steady-state temperature fixed at 85 °C</h4>
          <figure className={styles.figure}>
            <img
              src="/iit-bombay/drylab/cfd/fig2-tmax-vs-velocity.jpg"
              alt="Hottest server temperature against inlet velocity for each coolant, with the 85 °C limit marked"
              loading="lazy"
            />
            <figcaption>
              <b>Figure 2.</b> Hottest server temperature (T<sub>max</sub>) against inlet velocity, 1,200&nbsp;W server,
              25&nbsp;°C coolant inlet. The hollow point marks an upper bound: MM at 0.80&nbsp;m/s, where the run was
              stopped by a numerical instability while still cooling.
            </figcaption>
          </figure>

          <h4 className={styles.h3}>OpenFOAM run results</h4>
          <p>
            These operating points were used to compare the coolants at their minimum flow rates that satisfy the
            85&nbsp;°C temperature limit.
          </p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Coolant</th>
                  <th>Lowest compliant flow found</th>
                  <th>Flow (L/min)</th>
                  <th>Server Tmax there (°C)</th>
                  <th>Tank Δp there (Pa)</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.hl}>
                  <td>Methyl myristate (MM)</td>
                  <td>0.27 m/s (fails at 0.25 m/s)</td>
                  <td>22.1</td>
                  <td>82.0</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>GTL-based coolant (Shell S5 X)</td>
                  <td>≤ 0.42 m/s</td>
                  <td>34.4</td>
                  <td>84.0</td>
                  <td>63</td>
                </tr>
                <tr>
                  <td>Mineral oil</td>
                  <td>0.80 m/s (fails at 0.60 m/s)</td>
                  <td>65.5</td>
                  <td>83.4</td>
                  <td>234</td>
                </tr>
                <tr>
                  <td>Ester-based coolant</td>
                  <td>0.80 m/s (fails at 0.60 m/s)</td>
                  <td>65.5</td>
                  <td>83.6</td>
                  <td>259</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.stat}>
            Methyl myristate (MM) demonstrates the strongest cooling performance, maintaining a maximum server
            temperature of <b>78.1&nbsp;°C</b> at 0.42&nbsp;m/s, around <b>9–10&nbsp;°C lower</b> than the comparison
            coolants. At an 85&nbsp;°C temperature limit, MM requires only <b>0.27&nbsp;m/s</b>, compared with
            0.80&nbsp;m/s for both alternatives. This reduces estimated pump power by approximately{' '}
            <b>26-fold</b>, highlighting MM’s potential to improve cooling efficiency and reduce energy consumption in AI
            data centres.
          </p>
          <Link to="/dry-lab/cfd" className={styles.more}>
            Refer to the details in the CFD tab →
          </Link>
        </section>

        {/* ---------- Mutation site ---------- */}
        <section id="res-site" className={`${styles.card} ${styles.amber}`}>
          <h3 className={styles.cardTitle}>Selection of mutation site</h3>

          <h4 className={styles.h3}>1. Selection of candidate mutation site</h4>
          <p>
            Sequence alignment of <i>S. cerevisiae</i> FAS2 against the <i>Yarrowia lipolytica</i> enzyme identified
            V1254 as the residue equivalent to the chain-length-determining I1220. This was sent to the wet-lab team to
            be mutated to W, so the construct follows directly from the modelling.
          </p>

          <h4 className={styles.h3}>2. Molecular docking studies</h4>
          <p>
            Boltz-2 structure predictions of the KS domain placed a C14 acyl chain in the substrate pocket. Across 50
            predicted models, minimisation and a 200&nbsp;ps restrained simulation found no steric failures.
          </p>

          <h4 className={styles.h3}>3. PreFlight (RL mutation screener)</h4>
          <p>
            Our pre-flight tool tested the scoring function before any ranking was used, so effort went into the
            single-mutation route. Exhaustive search over 175 gene-deletion sets finished in minutes and was as good as or
            better than a learning-based search, so the workflow is simple and reproducible. Other teams can reuse the
            tool.
          </p>
          <Link to="/dry-lab/software" className={styles.more}>
            See the Software tab →
          </Link>
        </section>

        {/* ---------- V1254W validation ---------- */}
        <section id="res-validation" className={`${styles.card} ${styles.teal}`}>
          <h3 className={styles.cardTitle}>Validation for V1254W Mutation</h3>

          <h4 className={styles.h3}>1. Recombinant plasmid design and assembly</h4>
          <p>
            The recombinant construct was designed using the p426GPD shuttle vector as the backbone. The assembly
            involved the <i>FAS2</i> ORF carrying the intended V1254W mutation (approximately 2.2&nbsp;kb) and the 3′
            genomic flanking region (approximately 300&nbsp;bp), which were introduced sequentially to generate the
            final construct.
          </p>
          <figure className={styles.figure}>
            <img
              src="/iit-bombay/project/results/plasmid-map.png"
              alt="Plasmid map of the final recombinant construct with the mutated FAS2 ORF and 3′ flank in p426GPD"
              loading="lazy"
              style={{ maxWidth: 560 }}
            />
            <figcaption>
              <b>Figure 3.</b> Plasmid map illustrating the final recombinant construct, including the mutated{' '}
              <i>FAS2</i> ORF, 3′ flanking region and p426GPD as backbone vector.
            </figcaption>
          </figure>

          <h4 className={styles.h3}>
            2. PCR amplification of the <i>FAS2</i> ORF and 3′ flanking region
          </h4>
          <p>
            The <i>FAS2</i> ORF carrying the intended V1254W mutation and the 3′ genomic flanking region were amplified
            separately and analysed using agarose gel electrophoresis. The gel images show the amplification results for
            both DNA fragments, with their expected sizes of approximately 2.2&nbsp;kb and 300&nbsp;bp, respectively.
          </p>
          <div className={styles.figPair}>
            <figure className={styles.figure}>
              <img
                src="/iit-bombay/project/results/gel-fas2-orf.png"
                alt="Agarose gel of the amplified FAS2 ORF with a 1 kb plus ladder"
                loading="lazy"
              />
              <figcaption>
                <b>Figure 4.</b> Agarose gel electrophoresis of the amplified <i>FAS2</i> ORF (approximately 2.2&nbsp;kb).
              </figcaption>
            </figure>
            <figure className={styles.figure}>
              <img
                src="/iit-bombay/project/results/gel-3-flank.png"
                alt="Agarose gel of the amplified 3′ genomic flanking region with a 1 kb plus ladder"
                loading="lazy"
              />
              <figcaption>
                <b>Figure 5.</b> Agarose gel electrophoresis of the amplified 3′ genomic flanking region (approximately
                300&nbsp;bp).
              </figcaption>
            </figure>
          </div>

          <h4 className={styles.h3}>3. Recombinant plasmid verification by Sanger sequencing</h4>
          <p>
            Sanger sequencing was performed to verify the assembled plasmid sequence and confirm the intended V1254W
            substitution in the <i>FAS2</i> KS domain. The sequencing read was examined around the target position, with
            the mutation located within approximately 50&nbsp;bp of the primer-binding site to assess it within the
            high-confidence region of the read.
          </p>
          <p>
            The sequencing results showed the intended nucleotide change corresponding to the V1254W amino-acid
            substitution, supporting successful incorporation of the mutation into the recombinant plasmid.
          </p>
          <figure className={styles.figure}>
            <DocViewer docs={[{ title: 'Sanger sequencing electropherogram (5 pages)', file: '/iit-bombay/project/results/sanger-sequencing.pdf' }]} />
            <figcaption>
              <b>Figure 6.</b> Sanger sequencing chromatogram showing the intended V1254W substitution in the{' '}
              <i>FAS2</i> ORF.
            </figcaption>
          </figure>
        </section>

        {/* ---------- LCA ---------- */}
        <section id="res-lca" className={`${styles.card} ${styles.violet}`}>
          <h3 className={styles.cardTitle}>LCA validation: lower carbon footprint and cooling energy demand</h3>
          <p>
            Methyl myristate showed lower in-use emissions of <b>5,012&nbsp;kg CO₂-eq per server-year</b>, compared with
            6,071&nbsp;kg CO₂-eq for the ester-based coolant. Its pump power requirement was <b>6.1&nbsp;W</b>, compared
            with 158.9&nbsp;W, corresponding to an estimated saving of around 1,600&nbsp;kWh of cooling electricity per
            server annually. Approximately <b>93% of its carbon was biogenic</b>, and the additional emissions from
            production were recovered in about 2.9 years under the base-case scenario.
          </p>
          <div className={styles.figPair}>
            <figure className={styles.figure}>
              <img
                src="/iit-bombay/project/results/lca-pump-power.png"
                alt="Pumping power: 6.1 W for methyl myristate against 158.9 W for the ester-based coolant, 96% lower"
                loading="lazy"
              />
              <figcaption>
                <b>Figure 7.</b> Pumping power, methyl myristate against the ester-based coolant.
              </figcaption>
            </figure>
            <figure className={styles.figure}>
              <img
                src="/iit-bombay/project/results/lca-co2.png"
                alt="CO2 emissions per server-year: 5,012 kg for methyl myristate against 6,071 kg for the ester-based coolant, 17% lower"
                loading="lazy"
              />
              <figcaption>
                <b>Figure 8.</b> CO₂ emissions per server-year, methyl myristate against the ester-based coolant.
              </figcaption>
            </figure>
          </div>
          <Link to="/dry-lab/lca" className={styles.more}>
            Refer to detailed analysis and procedure in LCA tab →
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
