// Generated from the IIT Bombay iGEM drylab wiki draft (helper set/iitb-igem-drylab-wiki-draft):
// titles and subtitles from wiki/base.html, page HTML in ./content rendered by the draft's own
// pipeline (citations, references, sections). Do not hand-edit the content files.

export type DryLabPage = { slug: string; path: string; title: string; subtitle: string };

export const dryLabPages: DryLabPage[] = [
  { slug: "home", path: "/dry-lab", title: "Home", subtitle: "The modelling behind a fatty-acid-engineering project, in the order in which it was carried out: from a residue, to a protein pocket, to the whole cell, to the coolant." },
  { slug: "model", path: "/dry-lab/model", title: "Modeling", subtitle: "The models, their assumptions, data, parameters and results, in the order in which they build on each other. Every claim carries a status: computed, from literature, hypothesis, or pending." },
  { slug: "sequence", path: "/dry-lab/model/sequence", title: "Sequence", subtitle: "Step 1: the residue of yeast fatty acid synthase that corresponds to the chain-length-determining residue in Yarrowia." },
  { slug: "fas-interaction", path: "/dry-lab/model/fas-interaction", title: "FAS Interaction", subtitle: "Step 2: whether the KS pocket accommodates a C14 chain, which residues must remain unaltered, and how far the Boltz-2 results depend on setup." },
  { slug: "bridge", path: "/dry-lab/model/bridge", title: "Bridge", subtitle: "Step 3: representation of the mutation in a metabolic model as an early-release reaction." },
  { slug: "metabolism", path: "/dry-lab/model/metabolism", title: "Metabolism", subtitle: "Step 4: what the whole cell can reach, at what growth cost, by flux balance analysis." },
  { slug: "trust", path: "/dry-lab/model/trust", title: "Trust", subtitle: "Step 5: whether a strain-design ranking is informative, and whether learned search is required." },
  { slug: "process", path: "/dry-lab/model/process", title: "Process", subtitle: "Step 6: connection of the strain to its use as a coolant." },
  { slug: "software", path: "/dry-lab/software", title: "Software", subtitle: "Pre-flight: six automated checks that test whether the scoring function of a model measures anything, before its ranking is acted upon." },
  { slug: "cfd", path: "/dry-lab/cfd", title: "CFD", subtitle: "Immersion cooling of a 1U server with the bio-coolant methyl myristate: three-dimensional conjugate heat-transfer simulations in OpenFOAM, compared with mineral oil, an ester-based coolant and a GTL-based coolant." },
  { slug: "lca", path: "/dry-lab/lca", title: "Life Cycle Assessment", subtitle: "Methyl Myristate Bio-Coolant vs Commercial Immersion Coolants" },
];

/** Model section tabs, in the draft's order and wording. */
export const modelTabs: { slug: string; label: string; path: string }[] = [
  { slug: "model", label: "Overview", path: "/dry-lab/model" },
  { slug: "sequence", label: "1 Sequence", path: "/dry-lab/model/sequence" },
  { slug: "fas-interaction", label: "2 FAS interaction", path: "/dry-lab/model/fas-interaction" },
  { slug: "bridge", label: "3 Bridge", path: "/dry-lab/model/bridge" },
  { slug: "metabolism", label: "4 Metabolism", path: "/dry-lab/model/metabolism" },
  { slug: "trust", label: "5 Trust", path: "/dry-lab/model/trust" },
  { slug: "process", label: "6 Process", path: "/dry-lab/model/process" },
];
