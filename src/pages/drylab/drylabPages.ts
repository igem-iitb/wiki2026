// Generated from the IIT Bombay iGEM drylab wiki draft (helper set/iitb-igem-drylab-wiki-draft):
// titles and subtitles from wiki/base.html, page HTML in ./content rendered by the draft's own
// pipeline (citations, references, sections). Do not hand-edit the content files.

export type DryLabPage = { slug: string; path: string; title: string; subtitle: string };

export const dryLabPages: DryLabPage[] = [
  { slug: "home", path: "/dry-lab", title: "Home", subtitle: "The modelling behind a fatty-acid-engineering project, in the order in which it was carried out: from a residue, to a protein pocket, to the whole cell, to the coolant." },
  { slug: "model", path: "/dry-lab/model", title: "Model", subtitle: "The models, their assumptions, data, parameters and results, in the order in which they build on each other. Every claim carries a status: computed, from literature, hypothesis, or pending." },
  { slug: "sequence", path: "/dry-lab/model/sequence", title: "Sequence", subtitle: "Step 1: the residue of yeast fatty acid synthase that corresponds to the chain-length-determining residue in Yarrowia." },
  { slug: "fas-interaction", path: "/dry-lab/model/fas-interaction", title: "FAS Interaction", subtitle: "Step 2: whether the KS pocket accommodates a C14 chain, which residues must remain unaltered, and how far the Boltz-2 results depend on setup." },
  { slug: "bridge", path: "/dry-lab/model/bridge", title: "Bridge", subtitle: "Step 3: representation of the mutation in a metabolic model as an early-release reaction." },
  { slug: "metabolism", path: "/dry-lab/model/metabolism", title: "Metabolism", subtitle: "Step 4: what the whole cell can reach, at what growth cost, by flux balance analysis." },
  { slug: "trust", path: "/dry-lab/model/trust", title: "Trust", subtitle: "Step 5: whether a strain-design ranking is informative, and whether learned search is required." },
  { slug: "engineering", path: "/dry-lab/model/engineering", title: "Engineering", subtitle: "The Design, Build, Test, Learn cycle, including the strategy that the model indicated should be abandoned." },
  { slug: "results", path: "/dry-lab/model/results", title: "Results", subtitle: "The headline findings of the models, the changes they prompted in the plan, and what has not been validated." },
  { slug: "cfd", path: "/dry-lab/cfd", title: "CFD", subtitle: "Heat-flow simulations of the candidate coolant, methyl myristate, in an immersion-cooled server, and the separate comparison of two candidate esters." },
  { slug: "lca", path: "/dry-lab/lca", title: "Life Cycle Assessment", subtitle: "A screening-level life cycle assessment of methyl myristate as a bio-based immersion coolant, with its limits stated first." },
  { slug: "dbtl", path: "/dry-lab/dbtl", title: "DBTL", subtitle: "The Design, Build, Test, Learn cycles of the modelling work, including the checks that failed and what each failure changed." },
  { slug: "software", path: "/dry-lab/software", title: "Software", subtitle: "Pre-flight: six automated checks that test whether the scoring function of a model measures anything, before its ranking is acted upon." },
  { slug: "contribution", path: "/dry-lab/contribution", title: "Contribution", subtitle: "What the modelling work offers other teams: a checker for scoring functions, a benchmark of when machine learning is not required, and a screening life cycle assessment of a bio-based coolant." },
];

/** Sub-tabs of the Model tab: the synthetic-biology flow, then engineering and results. */
export const modelTabs: { slug: string; label: string; path: string }[] = [
  { slug: "model", label: "Overview", path: "/dry-lab/model" },
  { slug: "sequence", label: "1 Sequence", path: "/dry-lab/model/sequence" },
  { slug: "fas-interaction", label: "2 FAS interaction", path: "/dry-lab/model/fas-interaction" },
  { slug: "bridge", label: "3 Bridge", path: "/dry-lab/model/bridge" },
  { slug: "metabolism", label: "4 Metabolism", path: "/dry-lab/model/metabolism" },
  { slug: "trust", label: "5 Trust", path: "/dry-lab/model/trust" },
  { slug: "engineering", label: "Engineering", path: "/dry-lab/model/engineering" },
  { slug: "results", label: "Results", path: "/dry-lab/model/results" },
];

export type DryLabNavItem = { label: string; path: string; slugs: string[]; children?: { label: string; path: string; slug: string }[] };

/** The Dry Lab tabs, in menu order. One source for the top menu, the side switcher and the quick switcher. */
export const dryLabNav: DryLabNavItem[] = [
  { label: "Home", path: "/dry-lab", slugs: ["home"] },
  { label: "Model", path: "/dry-lab/model", slugs: modelTabs.map((t) => t.slug), children: modelTabs },
  { label: "CFD", path: "/dry-lab/cfd", slugs: ["cfd"] },
  { label: "Life Cycle Assessment", path: "/dry-lab/lca", slugs: ["lca"] },
  { label: "DBTL", path: "/dry-lab/dbtl", slugs: ["dbtl"] },
  { label: "Software", path: "/dry-lab/software", slugs: ["software"] },
  { label: "Contribution", path: "/dry-lab/contribution", slugs: ["contribution"] },
];
