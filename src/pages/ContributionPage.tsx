import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import styles from './projectPages.module.css';

// Text from "wiki wetlab doccumentation" (day 3), Contribution section. The
// red "add … here" notes in that doc are filled in where the file exists
// (FAS booklet PDF, simulation video from the day 3 folder).

const INDEX = [
  { id: 'con-wetlab', label: 'Wet lab contributions' },
  { id: 'con-drylab', label: 'Dry lab contributions' },
  { id: 'con-ihp', label: 'iHP contributions' },
  { id: 'con-hope', label: 'Our hope' },
];

export default function ContributionPage() {
  return (
    <PageShell title="Contribution" index={INDEX}>
      <div className={styles.panel}>
        <h2 className={styles.h1}>Our Contribution to the iGEM Community</h2>
        <p className={styles.lead}>
          Through BiFROST, we aim to contribute to the iGEM community by sharing the knowledge, experimental learnings,
          and computational tools developed during our work on bio-based dielectric coolants for AI data centres. Our
          contributions include insights into fatty acid engineering in <i>S. cerevisiae</i>, experimental protocols
          and characterisation approaches, and a reinforcement learning-based model for exploring genetic modifications
          to improve fatty acid production. We hope these resources can support future teams working at the
          intersection of synthetic biology, sustainable biotechnology, and industrial applications.
        </p>

        {/* ---------- Wet lab ---------- */}
        <section id="con-wetlab" className={`${styles.card} ${styles.teal}`}>
          <h3 className={styles.cardTitle}>Wet lab contributions</h3>
          <p className={styles.cardIntro}>
            Through BiFROST, we developed genetic parts and experimental protocols to support future iGEM teams working
            on fatty acid biosynthesis and lipid engineering in <i>Saccharomyces cerevisiae</i>.
          </p>

          <h4 className={styles.h3}>Parts</h4>
          <p>
            We contributed both subunits of the <i>S. cerevisiae</i> fatty acid synthase (FAS) complex, along with a
            modified form of the α-subunit carrying the V1254W mutation, designed to bias fatty acid production towards
            C14. These parts provide a foundation for future teams exploring fatty acid profile engineering and
            microbial lipid production.
          </p>
          <Link to="/wet-lab/parts" className={styles.more}>
            Explore our parts →
          </Link>

          <h4 className={styles.h3}>Protocols</h4>
          <p>
            We documented a fatty acid methyl ester (FAME) extraction protocol for preparing yeast-derived samples for
            GC–MS analysis. This workflow can help future teams characterise fatty acid profiles and evaluate the effects
            of genetic modifications on fatty acid production.
          </p>
          <Link to="/wet-lab/protocols" className={styles.more}>
            Explore our protocol →
          </Link>
        </section>

        {/* ---------- Dry lab ---------- */}
        <section id="con-drylab" className={`${styles.card} ${styles.blue}`}>
          <h3 className={styles.cardTitle}>Dry lab contributions</h3>
          <p className={styles.cardIntro}>
            Through BiFROST, we developed reusable modelling tools and benchmarking insights to help future iGEM teams
            make more reliable, evidence-based decisions in metabolic engineering.
          </p>

          <h4 className={styles.h3}>Pre-flight: validating scoring functions</h4>
          <p>
            We developed Pre-flight, an MIT-licensed tool that performs six automated checks (D1–D6) to assess whether a
            metabolic-model scoring function meaningfully distinguishes candidate genetic designs. It highlights issues
            such as baseline designs scoring as well as engineered ones and scores lacking sufficient resolution to
            support meaningful rankings. The tool accepts a simple <code>evaluate(combo, target) → float</code>{' '}
            interface, making it adaptable to different modelling workflows.
          </p>

          <h4 className={styles.h3}>Benchmarking machine learning against simpler methods</h4>
          <p>
            We benchmarked reinforcement learning against brute-force, greedy and random search for metabolic knockout
            design. In our test landscape, brute force found the exact optimum, while greedy search outperformed the
            reinforcement-learning agent. This demonstrates the value of testing simpler optimisation methods before
            adopting machine learning, particularly when exhaustive search remains computationally feasible.
          </p>
          <p className={styles.stat}>
            Together, these contributions provide future teams with{' '}
            <b>reusable tools to validate their modelling assumptions and practical benchmarks to guide their choice of
            optimisation strategy</b>.
          </p>
          <Link to="/dry-lab/software" className={styles.more}>
            See the Software tab →
          </Link>
        </section>

        {/* ---------- iHP ---------- */}
        <section id="con-ihp" className={`${styles.card} ${styles.amber}`}>
          <h3 className={styles.cardTitle}>iHP contributions</h3>
          <p className={styles.cardIntro}>
            Through BiFROST, we built resources that other teams can pick up and use, especially teams working with
            limited resources or trying to ground their projects in real-world sustainability.
          </p>

          <h4 className={styles.h3}>Education and outreach: two booklets, built to be reused</h4>
          <div className={styles.booklets}>
            <div className={styles.booklet}>
              <img src="/project/contribution/fas-booklet-cover.jpg" alt="Cover of the FAS Booklet, first edition" loading="lazy" />
              <div>
                <h4>FAS booklet</h4>
                <p>
                  A self-contained explainer on FAS Enzyme in plain and intuitive language, with no biology
                  background needed. Teams can hand it to schools or community groups as is, adapt it to their own
                  project, or use it as a template for making complex science accessible.
                </p>
                <a href="/eo/docs/fas-booklet/fas-booklet.pdf" target="_blank" rel="noreferrer" className={styles.more}>
                  Read the FAS booklet (PDF) ↗
                </a>
              </div>
            </div>
            <div className={styles.booklet}>
              <img
                src="/project/contribution/synbio-reality-check-cover.jpg"
                alt="Cover of the SynBio Reality Check booklet, Beyond the Green Promise"
                loading="lazy"
              />
              <div>
                <h4>
                  <i>Is SynBio Really Sustainable?</i>
                </h4>
                <p>
                  A booklet that questions the field instead of promoting it. It covers a unique sustainability
                  perspective to SynBio which is crucial to the iGEM Community and gives teams the language and
                  structure to discuss sustainability honestly with judges, sponsors and the public. It also works as a
                  discussion tool for workshops and events, and helps teams stress-test their own claims early.
                </p>
                <a
                  href="/eo/docs/synbio-sustainable/synbio-reality-check-booklet.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.more}
                >
                  Read the SynBio Reality Check booklet (PDF) ↗
                </a>
              </div>
            </div>
          </div>
          <p>
            Together, they cover both sides of good outreach: explaining the science, and critically examining its
            purpose.
          </p>

          <h4 className={styles.h3}>Gene cloning simulation website</h4>
          <p>
            Our interactive simulation work has been in use since last year at events in our own city and in
            collaboration with other iGEM teams. A simulation travels better than a presentation: it needs no lab, adapts
            to any audience, and makes concepts hands-on. We hope other teams will run or modify it for their own events.
          </p>
          <figure className={styles.figure}>
            <video src="/project/contribution/simulation-website.mp4" controls muted playsInline preload="metadata" />
            <figcaption>A walk-through of the gene cloning simulation website.</figcaption>
          </figure>
          <a href="https://igem-simulation-beta.vercel.app/" target="_blank" rel="noreferrer" className={styles.more}>
            Try the simulation ↗
          </a>

          <h4 className={styles.h3}>Integrated Human Practices</h4>
          <p>
            <b>A sustainability audit framework (LCA) for iGEM teams.</b> We spoke with industry stakeholders about how
            sustainability is actually sold, and with professors about how it should be measured. We used these
            insights to audit BiFROST, and in the process developed a core framework that can be applied to its own
            project, with our work as a worked example.
          </p>
          <p>
            <b>Practical guidance from alumni and teams.</b> We spoke with many alumni and teams about the unwritten
            parts of running iGEM: team administration, sponsorships, approaching the right labs in India, and
            optimising experiments around available resources. We compiled these into resources to save future teams,
            especially newer ones, a lot of trial and error.
          </p>
          <Link to="/human-practices/ihp" className={styles.more}>
            See Integrated Human Practices →
          </Link>
        </section>

        <section id="con-hope" className={styles.hope} style={{ scrollMarginTop: 96 }}>
          <h3 className={styles.cardTitle}>Our hope</h3>
          <p>
            iGEM is strongest when teams build on each other’s work. Everything here is meant to be used, adapted and
            improved, and we would love to hear from any team that does.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
