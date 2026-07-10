// Content for the Integrated Human Practices (iHP) page.
// The ESTER framework steps and every person's write-up live here so the
// page component stays focused on layout and interaction.

export type EsterStep = {
  letter: string;
  color: string;
  title: string;
  body: string;
  icon: string; // path under /public
};

// Circle colours + icons pulled from the Figma "ESTER full form" reference.
export const esterSteps: EsterStep[] = [
  {
    letter: 'E',
    color: '#f1bdae',
    title: 'ENCOUNTER the problem',
    body: 'Observing the data centre cooling crisis and the environmental cost of conventional coolants.',
    icon: '/ihp-icons/encounter.svg',
  },
  {
    letter: 'S',
    color: '#c7dcc7',
    title: 'SURVEY the ecosystem',
    body: 'Reaching out to operators, researchers and chemists to understand real constraints and priorities.',
    icon: '/ihp-icons/survey.svg',
  },
  {
    letter: 'T',
    color: '#f4dba0',
    title: 'THEORIZE from insight',
    body: 'Turning insights into testable hypotheses about myristate ester’s dielectric and thermal performance.',
    icon: '/ihp-icons/theorize.svg',
  },
  {
    letter: 'E',
    color: '#c6d2e6',
    title: 'EXECUTE the solution',
    body: 'Designing the bio-based immersion fluid and testing it against real cooling demands.',
    icon: '/ihp-icons/execute.svg',
  },
  {
    letter: 'R',
    color: '#d9ccde',
    title: 'REFINE with feedback',
    body: 'Looping insights from stakeholders and test data back into the formulation—closing the loop.',
    icon: '/ihp-icons/refine.svg',
  },
];

// Which people sit on the inner ring of the network (the rest go on the outer
// ring), matching the Figma network reference.
export const innerRingIds = [
  'dawar',
  'parth',
  'rutuja',
  'archana',
  'rajesh-vagdama',
  'husayn',
  'nicola-oriordan',
  'vaibhav-sai',
];

export type WriteUp = {
  id: string;
  name: string;
  affiliation?: string;
  purpose: string;
  keyTakeaway: string;
  contribution: string;
  implementation: string;
  references: string;
};

const TODO = 'Write-up in progress — this conversation is being documented and will be added here soon.';

// Order is exactly the order the team gave (Design & Content Brief, Section 3).
export const writeUps: WriteUp[] = [
  {
    id: 'balaji',
    name: 'Prof. Balaji',
    affiliation: 'IIT Bombay',
    purpose: 'We reached out to Prof. Balaji for early mentorship and to test whether our core idea was worth pursuing.',
    keyTakeaway: 'Prof. Balaji supported our idea and has been of great help; we are very grateful for his support.',
    contribution: 'He backed the direction of the project early on and encouraged us to keep building on it.',
    implementation: 'His encouragement gave us the confidence to commit to the biocoolant direction.',
    references: '—',
  },
  {
    id: 'kadambari',
    name: 'Kadambari',
    affiliation: 'Seniors Meet — Problem Statement & WetLab',
    purpose: 'Sought senior feedback on the problem statement and the feasibility of the wetlab plan.',
    keyTakeaway: 'As a problem statement the biocoolant idea is amazing and very relevant; we should verify wetlab feasibility and how much synthetic biology is genuinely involved.',
    contribution: 'Reviewed the problem statement and flagged wetlab feasibility and the depth of synbio content as the things to check.',
    implementation: 'We stress-tested the wetlab feasibility of the idea before committing further.',
    references: '—',
  },
  {
    id: 'husayn',
    name: 'Husayn',
    affiliation: 'Seniors Meet — Problem Statement & WetLab',
    purpose: 'Sought senior feedback on the problem statement and the feasibility of the wetlab plan.',
    keyTakeaway: 'The biocoolant idea is relevant and strong as a problem statement; check the wetlab feasibility and the amount of synbio.',
    contribution: 'Along with Kadambari, gave feedback on framing the problem and validating feasibility.',
    implementation: 'We refined the problem framing and re-checked feasibility based on this feedback.',
    references: '—',
  },
  {
    id: 'anushka-alikar',
    name: 'Anushka Alikar',
    purpose: 'Approached her for background knowledge on yeast.',
    keyTakeaway: 'Built foundational understanding of yeast biology relevant to our chassis choice.',
    contribution: 'Shared background on yeast that informed our early chassis thinking.',
    implementation: 'Used this grounding as we evaluated candidate yeast chassis.',
    references: '—',
  },
  {
    id: 'prachita',
    name: 'Prachita',
    purpose: 'Consulted on Yarrowia lipolytica — BKCDC, genome editing and FAS systems — and later on the shift to S. cerevisiae.',
    keyTakeaway: 'Initially guided our Y. lipolytica research; when the strain and mentorship proved unavailable in our institute, she helped us evaluate the move to S. cerevisiae.',
    contribution: 'Discussed BKCDC, genome editing and FAS systems for Y. lipolytica. When we hit availability limits, we consulted her again on the feasibility of switching chassis.',
    implementation: 'Shifted our chassis from Y. lipolytica to S. cerevisiae after weighing availability and feasibility.',
    references: '—',
  },
  {
    id: 'pratik-makhija',
    name: 'Pratik Makhija (IISER Pune)',
    affiliation: 'IISER Pune — Jatropha project',
    purpose: 'Asked how his team ran their Jatropha project — kits, protocols — to assess feasibility for us.',
    keyTakeaway: 'Learned practical project-execution details and used them to assess the feasibility of our own approach.',
    contribution: 'Shared kits, protocols and lessons from running a comparable project.',
    implementation: 'Folded his practical guidance into our feasibility assessment and planning.',
    references: '—',
  },
  {
    id: 'dawar',
    name: 'Dawar',
    affiliation: 'Ex-iHP Lead, iGEM IIT Bombay; Founder, Erdos AI',
    purpose:
      'We reached out to Dawar because, as a former iHP lead from our own institute who has since founded a company, he had hands-on experience with exactly the problems we were navigating — how to run iHP meaningfully rather than as a checkbox activity, how to manage team momentum and friction between subteams, how to approach project selection without chasing novelty, and how to pitch sponsors and the institute effectively.',
    keyTakeaway:
      'iHP should function as the project’s "eyes and ears" from day one, even before the final project is locked in — surfacing real stakeholder pain points and internal team friction early enough to shape the project rather than validate it afterward. Judges care about the depth and quality of insight integration far more than the volume of outreach.',
    contribution:
      'Dawar framed the team through the "J-curve of biotech" — biotech moving from niche research into a major growth phase — and argued the team should operate like a high-stakes startup, not a club. For project selection he put feasibility above novelty: a moderately novel project that produces working results beats an ambitious idea with no proof of concept, the point being to avoid "deterministic" research where outcomes are left to chance. He noted roughly 80% of breakthrough insights come from about 20% of the people you talk to, so identify high-value "node" people early. He stressed iHP must be active before the project spec is finalized, bridging Wetlab and Drylab when they stall, and that retention depends on people seeing weekly micro-growth. On sponsorship he advised positioning over persuasion — approach partners as "we’re doing this with or without you, but if you join it’s win-win" — leveraging the institute’s brand and the biotech growth narrative. On Jamboree: quality beats quantity; show how a specific insight changed an actual design decision.',
    implementation:
      'We activated iHP outreach before fully locking the project spec, and now prioritise high-value conversations over high-volume cold contact. For each major insight we track what specific design or methodological decision it changed, so we can demonstrate closed-loop integration. We are having iHP play a more active bridging role between Wetlab and Drylab, and we reframed sponsorship and institute outreach to lead with the biotech growth narrative and institute affiliation rather than positioning ourselves as students asking for help.',
    references: 'Conversation/mentorship session with Dawar, Ex-iHP Lead, iGEM IIT Bombay; Founder, Erdos AI.',
  },
  {
    id: 'deepan',
    name: 'Deepan',
    affiliation: 'Seniors Meet — iHP, Admin & Sponsors',
    purpose: 'Seniors meet focused on running iHP well and navigating admin and sponsors.',
    keyTakeaway: 'Practical guidance on running iHP and dealing with administration and sponsorship.',
    contribution: 'Shared experience on the operational side of iHP, admin and sponsor outreach.',
    implementation: 'Applied this to how we structured our iHP workflow and outreach.',
    references: '—',
  },
  {
    id: 'anagdha',
    name: 'Anagdha (BioCompute)',
    affiliation: 'BioCompute',
    purpose: 'Our iHP team set out to learn about data centres, innovation in the space and, above all, cooling.',
    keyTakeaway: 'Grounded the team in how data centres actually work and where cooling innovation is genuinely needed.',
    contribution: 'Explained data-centre operation, the innovation landscape and the cooling challenge.',
    implementation: 'Used this grounding to frame our coolant’s target use-case and requirements.',
    references: '—',
  },
  {
    id: 'prof-sandeep',
    name: 'Prof. Sandeep',
    purpose: 'Consulted on immersion cooling.',
    keyTakeaway: 'Immersion-cooling insights that fed directly into our coolant design.',
    contribution: 'Discussed the principles and practicalities of immersion cooling.',
    implementation: 'Incorporated his immersion-cooling guidance into our design assumptions.',
    references: '—',
  },
  {
    id: 'parth',
    name: 'Parth',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'hrushikesh',
    name: 'Hrushikesh',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'archana',
    name: 'Archana',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'prof-phale',
    name: 'Prof. Phale',
    purpose: 'Consulted him on metabolomics, cell health and overall project feasibility.',
    keyTakeaway:
      'Given our time constraints, he guided us to alternatives for cuphea and advised ordering the mutated yeast strains from our reference papers rather than mutating from scratch — which pushed us to shorten the timeline and find alternative methods for mutating FAS.',
    contribution:
      'Advised on metabolomics, cell health and feasibility; recommended ordering mutated strains from reference papers because a full mutation cycle would not fit our timeline; and discussed the feasibility of a metazoan FAS.',
    implementation:
      'We decided to save time by ordering the mutated strains and finding alternative methods for mutating FAS rather than attempting everything in one cycle.',
    references: '—',
  },
  {
    id: 'dr-navratna',
    name: 'Dr. Navratna (WRCB)',
    affiliation: 'WRCB',
    purpose: 'To understand how to frame research so it helps build something for the country, and how to build a strong team.',
    keyTakeaway:
      'He helped us think about research direction and team-building, and reflected on the problems with our previous project and how to avoid similar mistakes this time.',
    contribution:
      'Discussed how to think about research with national impact, how to develop a team, and walked through what went wrong previously and how we could have fixed it.',
    implementation: 'We carried his lessons on team-building and avoiding past mistakes into how we run this cycle.',
    references: '—',
  },
  {
    id: 'aditya-ict',
    name: 'Aditya (ICT)',
    affiliation: 'Team Lead, ICT Mumbai',
    purpose:
      'Our sponsorship outreach had stalled — cold emails and LinkedIn messages were yielding almost no response (roughly 1–2 replies per 50–60 contacts) — and we needed practical, insider guidance on who to target, how to frame the pitch, and when companies are actually receptive.',
    keyTakeaway:
      'Sponsorship success depends far less on the strength of the project pitch and far more on targeting the right people (sub-decision-makers in finance or marketing, and alumni specifically), timing outreach around the corporate financial year, and framing the ask around iGEM and synthetic biology broadly rather than project specifics — because companies give through CSR obligations and aren’t expecting a return.',
    contribution:
      'The low response rate pointed to who we were contacting, not the approach itself. He advised targeting people just below the top decision-makers — finance (near the CFO) or marketing — who can greenlight smaller asks. Companies set aside CSR funds they are obligated to spend, so the game is becoming an easy, credible recipient rather than "convincing" anyone; they expect little direct ROI beyond promotional visibility. Timing matters: firms avoid committing in Feb–March (financial year-end) but are far more open in June–July. Cold emails should lead with the broad value of iGEM and synthetic biology, not project specifics — easier for a non-specialist to approve, and it protects the team from being blamed if results don’t pan out. Prioritise alumni over cold corporate contacts, and don’t restrict the search to bioscience firms.',
    implementation:
      'We restructured our targeting list to prioritise alumni first, then mid-level finance and marketing professionals rather than top executives. We rewrote our outreach template to lead with a high-level intro to iGEM and synthetic biology and removed language tying funding to project outcomes. We shifted outreach to concentrate on June–July, and expanded the target list beyond bioscience/biotech to companies across industries with active CSR programs.',
    references: '—',
  },
  {
    id: 'vaibhav-sai',
    name: 'Vaibhav Sai',
    affiliation: 'BioEnt session',
    purpose: 'General advice on sponsors and how to present the project — who we should approach.',
    keyTakeaway: 'Advised on sponsors and pitching, and pointed us toward systems biologists such as Rutuja.',
    contribution: 'Gave general guidance on sponsors and presentation, and made referrals including to Rutuja.',
    implementation: 'We approached the contacts he suggested and refined how we present the project.',
    references: '—',
  },
  {
    id: 'rutuja',
    name: 'Rutuja',
    affiliation: 'Systems biology (referred by Vaibhav Sai)',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'rajesh-vagdama',
    name: 'Rajesh Vagdama',
    affiliation: 'Dr. Rajesh, Green Bio Synthesis Group, L’Oréal',
    purpose:
      'Having validated broad feasibility with Prof. Vikram, we needed deeper technical guidance on formulation chemistry — how to turn a hydrophobic bio-ester into a functional, homogeneous coolant — plus wetlab strategy for engineering yeast to make our target C14 fatty acid and scaling to viable yields. His role in L’Oréal’s Green Bio Synthesis Group made him ideal on bio-based formulation, sustainability certification and scale-up.',
    keyTakeaway:
      'A bio-ester alone cannot function as a coolant — it needs a carefully balanced additive system (emulsifiers, solubilisers, controlled concentration) to overcome its hydrophobicity and surface-tension issues. Biologically, producing C14 specifically (rather than yeast’s native C16/C18) requires a deliberate two-phase starvation strategy, not a single-step genetic or metabolic shock.',
    contribution:
      'A high-latent-heat coolant must release heat immediately, but bio-esters are hydrophobic while the coolant system needs to behave hydrophilically for homogeneity — so solubilisers and emulsifiers become the main functional ingredients (roughly 70% solvent to 30% main ingredient), with homogeneity a property to engineer, not assume. He identified surface tension as the core limitation, proposed hydrophobins, and stressed that surfactant type depends on emulsion type (checked via HLB value), with surfactant concentration never exceeding 2%. On certification, a product is "bio-based" only if >60% of its carbon is bio-sourced (verified by C14 isotope analysis), and feedstocks like palm oil need RSPO certification. For scale-up: fermentation yield ≥ 70%, downstream purification ~80%, with visual clarity as a quality proxy. S. cerevisiae makes C16/C18, so C14 selectivity needs mutation plus a two-phase starvation (grow first, then shift the C:N ratio — low carbon, high nitrogen — to divert metabolism to lipids). He recommended extracting the free C14 fatty acid cell-free, then esterifying outside the cell with immobilised enzymes and methanol, exploiting the bio-ester’s water-insolubility (and a salting-out effect) for phase separation.',
    implementation: 'Have to decide — we are weighing his formulation and wetlab recommendations against our current timeline.',
    references: 'Conversation with Dr. Rajesh, Green Bio Synthesis Group, L’Oréal — formulation chemistry and wetlab strategy guidance, iGEM IIT Bombay 2026 project.',
  },
  {
    id: 'prof-suyash',
    name: 'Prof. Suyash',
    affiliation: 'Prof. Suyash Vikram, Assistant Professor, Mechanical Engineering, Government Engineering College Vaishali',
    purpose:
      'Our project centres on a myristate ester-based immersion coolant for data-centre and battery thermal management, and we needed expert grounding in what actually makes an immersion coolant viable beyond lab-scale thermal performance — long-term reliability, material compatibility, and how industry validates coolants without waiting years for real-time data. We were also unsure whether additive strategies from conventional dielectric fluids transfer to ester-based systems.',
    keyTakeaway:
      'Thermal performance alone does not determine industrial viability — safety, long-term chemical stability, material compatibility and economics are equally decisive. For ester-based coolants specifically, the biggest open risks are flash-point limitations and potential decomposition/deposition at elevated temperatures over extended operation.',
    contribution:
      'He framed why immersion cooling is rising (direct dielectric contact removes thermal contact resistance and improves temperature uniformity, reducing uneven battery aging) and walked the competitive landscape — fluorinated fluids (e.g. 3M Novec) perform but are costly and vapour-prone; mineral/silicone oils are cheap but have tradeoffs; transformer oil remains the trusted benchmark. For esters he flagged decomposition and carbonaceous deposits under prolonged heat as a genuine, under-documented research gap. He stressed temperature-dependent property curves over single values, singling out viscosity (active circulation makes pumping penalties real). Industry justifies multi-year reliability via accelerated aging, dielectric/Hi-Pot testing and AI-assisted degradation models. Material compatibility (metals, busbars, connectors, seals, polymers) must be tested in parallel, not as a side-task. On simulation, the sim-vs-experiment gap often comes from ignoring buoyancy-driven natural convection and assuming uniform heat generation — he recommended user-defined functions in CFD. On flash point, additives can tune properties but every additive must be cross-checked against dielectric strength, thermal conductivity, viscosity, flash point and material compatibility.',
    implementation: 'CFD improvement, and he helped us discover the role of antioxidants in our additive strategy.',
    references: '—',
  },
  {
    id: 'subhendhu',
    name: 'Subhendhu (Shell)',
    affiliation: 'Shell',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'igem-denmark',
    name: 'iGEM Denmark',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
  {
    id: 'nicola-oriordan',
    name: 'Nicola O’Riordan',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: '—',
  },
];
