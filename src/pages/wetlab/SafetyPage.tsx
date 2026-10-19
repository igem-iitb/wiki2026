import { useState } from 'react';
import Accordion from '../../components/Accordion';
import PageShell from '../../components/PageShell';
import styles from './wetlab.module.css';

// Captions from "wiki wetlab doccumentation.pdf" pages 20–22. Image 1 is the Figma export.
const slides = [
  { src: '/iit-bombay/wetlab/safety/image1.webp', caption: 'LAF cabinet used as a workbench for microbial samples where contamination may be an issue' },
  { src: '/iit-bombay/wetlab/safety/pdf-image2.jpeg', caption: 'Gloves were used throughout the experiments for handling all samples and chemicals' },
  { src: '/iit-bombay/wetlab/safety/pdf-image3.jpeg', caption: 'All high temperature chemicals were handled using heat resistant gloves' },
  { src: '/iit-bombay/wetlab/safety/pdf-image4.jpeg', caption: '70% ethanol was used to disinfect all workbenches before and after experiments daily' },
  {
    src: '/iit-bombay/wetlab/safety/pdf-image5.jpeg',
    caption: 'All discarded biological samples were placed in biohazard bags and stored in designated biosafety containers prior to autoclaving.',
  },
  { src: '/iit-bombay/wetlab/safety/pdf-image6.jpeg', caption: 'A team member working in the LAF cabinet' },
  {
    src: '/iit-bombay/wetlab/safety/pdf-image7.jpeg',
    caption:
      'A team member wearing a lab coat and goggles. Lab coats were worn throughout all laboratory experiments. Goggles were worn as additional eye protection alongside face shields during gel extraction.',
  },
];

export default function SafetyPage() {
  const [slide, setSlide] = useState(0);
  const step = (d: number) => setSlide((s) => (s + d + slides.length) % slides.length);

  return (
    <PageShell
      title="Safety"
      art="shield"
      index={[
        { id: 'overview', label: 'Overview' },
        { id: 'lab-safety', label: 'Lab Safety' },
        { id: 'references', label: 'References' },
      ]}
    >
      {/* OVERVIEW */}
      <div id="overview" className={`${styles.sCard} ${styles.prose}`} style={{ borderColor: '#b8d9ed' }}>
        <h2 className={styles.cardHeading}>
          OVERVIEW
        </h2>
        <p style={{ marginBottom: 2 }}>
          Safety was integrated into every stage of our project, from selecting the production organism to designing the final
          bio-coolant. As our project combines synthetic biology with chemical formulation, we considered both
          <b> biosafety during microbial engineering</b> and <b>product safety for the intended coolant application.</b>
        </p>
        <p style={{ marginBottom: 12 }}>
          Our project uses genetically engineered Saccharomyces cerevisiae solely as a microbial production platform for
          synthesizing bio-based coolant components. In addition, we use Escherichia coli for plasmid replication. The engineered
          microorganisms are strictly confined to laboratory conditions and will be separated out for the{' '}
          <b>final coolant formulation</b>, ensuring that the final product poses no GMO-related risk during transportation,
          handling, or use
        </p>
        <p style={{ marginBottom: 0 }}>
          To ensure responsible research, our project was designed in accordance with the{' '}
          <b>iGEM Safety and Security Programme</b>, using organisms and genetic components permitted under the{' '}
          <b>iGEM White List</b>. All experimental work was carried out following the biosafety regulations established by our{' '}
          <b>Institutional Biosafety Committee (IBSC)</b> and institutional laboratory safety guidelines.
        </p>
      </div>

      {/* LAB SAFETY */}
      <div id="lab-safety"
        className={`${styles.sCard} ${styles.prose}`}
        style={{ borderColor: '#e4f3ee', paddingTop: 30, paddingBottom: 23 }}
      >
        <h2 className={styles.cardHeading}>
          LAB SAFETY
        </h2>
        <p>
          Since our project involves the genetic engineering of S.cerevisiae for the biosynthesis of methyl myristate, biosafety
          considerations were incorporated throughout the experimental workflow to ensure the safety of laboratory personnel and
          prevent unintended environmental release.
        </p>
        <h3>Compliance with iGEM Safety Standards</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>
            The biological chassis and genetic components used in this project were selected in accordance with the
            <span className={styles.semi}> iGEM Safety and Security Programme</span> and
            <span className={styles.semi}> the iGEM White List</span>.
          </li>
          <li>
            Only <span className={styles.semi}>non-pathogenic laboratory strains of S. cerevisiae and E. coli</span> were used
            throughout the project. The production of lipids and fatty acids are enhanced under nitrogen-starvation of the
            organism. While it is in our best interest to do this, this is stressful to the organism and leads to spore formation.
            Thus, we have opted to not use any nitrogen-deficient medium. This does not affect our proof of concept as in both
            cases, we are only interested in the relative values of the yield and composition of the fatty acids
          </li>
          <li>No Risk Group 2 or higher organisms, pathogenic microorganisms, toxins, or hazardous biological agents were used.</li>
          <li>
            The genetically modified organisms were used exclusively for laboratory-scale biosynthesis and were never intended for
            environmental release or direct application.
          </li>
        </ul>
      
        <h3>Institutional Biosafety Compliance</h3>
        <p>
          All experimental procedures involving recombinant DNA and genetically modified microorganisms were conducted under the
          guidance of our Institutional Biosafety Committee (IBSC). Experimental protocols were reviewed to ensure compliance with
          institutional biosafety regulations, including appropriate containment, handling, and waste disposal practices.
        </p>
        <h3>GMO Containment and Handling</h3>
        <p style={{ marginBottom: 0 }}>To prevent accidental exposure or environmental release, the following practices were implemented:</p>
        <ul>
          <li>
            All experiments involving engineered S. cerevisiae and E. coli were performed using Biosafety Level 1 (BSL-1)
            laboratory practices.
          </li>
          <li>Microbial cultures were maintained only within designated laboratory workspaces.</li>
          <li>
            Standard aseptic techniques were followed during cloning, transformation, culturing, and downstream processing to
            minimize contamination.
          </li>
          <li>Live genetically modified microorganisms will never be incorporated into the final coolant formulation.</li>
          <li>
            Following experimentation, all biological cultures, contaminated media, pipette tips, microcentrifuge tubes, and
            disposable materials were sterilized by autoclaving before disposal in accordance with IBSC guidelines.
          </li>
        </ul>
        <h3>Laboratory Practices</h3>
        <p style={{ marginBottom: 0 }}>
          To maintain a safe working environment, all team members adhered to standard laboratory practices, including:
        </p>
        <ul>
          <li>Wearing laboratory coats, gloves, and appropriate personal protective equipment throughout experimentation.</li>
          <li>Routine disinfection of benches and work surfaces before and after laboratory work.</li>
          <li>Proper labeling and secure storage of biological samples, plasmids, and chemical reagents.</li>
          <li>Maintaining accurate records of all recombinant DNA constructs and microbial cultures to ensure traceability.</li>
        </ul>
        {/* TODO: "Fire Safety" heading has no content in the PDF. */}
        <h3>Fire Safety</h3>
        <p />
        <h3>DATA CENTER COOLANT SAFETY AND REGULATORY CONSIDERATIONS</h3>
        <p>
          To ensure that our bio-coolant is suitable for practical deployment, its formulation was developed with reference to
          internationally recognized engineering and safety guidelines. The proposed coolant was evaluated against the general
          recommendations of the Open Compute Project (OCP) for liquid cooling systems, while its physicochemical properties were
          considered in accordance with relevant ASTM International testing standards. Fire safety considerations were referenced
          from NFPA 30 (Flammable and Combustible Liquids Code). Collectively, these guidelines emphasize key requirements such as
          high flash point, thermal stability, controlled viscosity, material compatibility, low electrical conductivity, and
          environmental safety, all of which were considered during the design of our bio-coolant.
        </p>
        <h3>Risk Assessment</h3>
        <p>
          The overall biological risk associated with this project is considered low, as it employs non-pathogenic laboratory
          strains under BSL-1 containment and does not involve hazardous pathogens or toxins. Furthermore, the final bio-coolant
          will not contain any viable genetically modified organisms, significantly reducing biosafety concerns during storage,
          transportation, and eventual application.
        </p>
        <p style={{ marginBottom: 0 }}>
          By integrating biosafety considerations from strain selection through product development, our project aligns with both
          iGEM safety expectations and institutional biosafety requirements, ensuring that innovation is accompanied by responsible
          and safe engineering practices.
        </p>
        {/* IMAGES, part of the Lab Safety card */}
        <div id="images" className={`${styles.imagesCard} ${styles.imagesInCard}`}>
          <h2 className={styles.imagesTitle}>IMAGES</h2>
          <img src={slides[slide].src} alt={slides[slide].caption} className={styles.slideImg} />
          <p className={styles.caption}>{slides[slide].caption}</p>
          <div className={styles.slideNav}>
            <button type="button" className={styles.navBtn} aria-label="Previous image" onClick={() => step(-1)}>
              <span>←</span>
            </button>
            <button type="button" className={styles.navBtn} aria-label="Next image" onClick={() => step(1)}>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* REFERENCES */}
      <div id="references">
        <Accordion
          alignStart
          items={[
            {
              id: 'refs',
              title: 'REFERENCES',
              content: (
                <div className={styles.prose}>
                  <h3>iGEM and Biosafety</h3>
                  <ul>
                    <li>iGEM Foundation. Safety and Security Programme.</li>
                    <li>iGEM Foundation. White List for Safe Laboratory Organisms and Parts.</li>
                    <li>Institute Biosafety Committee (IBSC), IIT Bombay. Handbook for Institutional Biosafety Committees (IBSCs)</li>
                    <li>NIH. Guidelines for Research Involving Recombinant or Synthetic Nucleic Acid Molecules.</li>
                  </ul>
                  <h3>Data Center Cooling</h3>
                  <ul>
                    <li>ASHRAE Technical Committee 9.9: Thermal Guidelines for Data Processing Environments.</li>
                    <li>Open Compute Project (OCP): Advanced Cooling Solutions and Immersion Cooling Guidelines.</li>
                  </ul>
                </div>
              ),
            },
          ]}
          theme={{ bar: '#ebf2ff', barText: '#172b4d', body: '#f5f8ff', accent: '#3f94d2' }}
        />
      </div>
    </PageShell>
  );
}
