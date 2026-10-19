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
    body: 'Looping insights from stakeholders and test data back into the formulation, closing the loop.',
    icon: '/ihp-icons/refine.svg',
  },
];

// The six groups the people fall into, taken from the team's "People Flow"
// board: six clusters around a central iHP hub. Colours follow the sticky
// notes on that board. Anyone not placed on the board falls into the trailing
// "others" group so no write-up is dropped.
export type PeopleGroup = {
  id: string;
  label: string;
  /** Sticky-note header colour. */
  accent: string;
  /** Sticky-note body colour. */
  tint: string;
  memberIds: string[];
};

export const peopleGroups: PeopleGroup[] = [
  {
    id: 'wetlab',
    label: 'Wetlabs',
    accent: '#E0A93C',
    tint: '#FBDFAE',
    memberIds: ['parth', 'prachita', 'prof-phale', 'prof-santanu', 'anushka-alikar', 'balaji', 'pratik-makhija', 'sayali'],
  },
  {
    id: 'drylab',
    label: 'Dry Labs',
    accent: '#C77FD6',
    tint: '#E8CDF5',
    memberIds: ['yogendra-shastri', 'prof-sandeep', 'prof-suyash', 'shubham', 'rutuja', 'prof-shiva'],
  },
  {
    id: 'product-dev',
    label: 'Product Dev',
    accent: '#E8594C',
    tint: '#F9B9B8',
    memberIds: ['dr-navratna', 'rajesh-vagdama', 'subhendhu', 'vaibhav-sai'],
  },
  {
    id: 'regulations',
    label: 'Regulations',
    accent: '#D9A800',
    tint: '#FBDFAE',
    memberIds: ['echa'],
  },
  {
    id: 'alumni',
    label: 'Alumni',
    accent: '#3FCB5C',
    tint: '#C7F0AE',
    memberIds: ['husayn', 'aditya-ict', 'anagdha', 'deepan', 'dawar'],
  },
  // Not on the People Flow board, but they have a write-up.
  {
    id: 'others',
    label: 'Others',
    accent: '#9AA8C2',
    tint: '#DDE4EF',
    memberIds: ['igem-denmark'],
  },
];

export type WriteUp = {
  id: string;
  name: string;
  /** Designation, shown under the photo. */
  affiliation?: string;
  /** Photo under /public/ihp-photos. */
  photo?: string;
  /** One line under the photo: what they helped with. */
  summary?: string;
  /** When we met, as recorded by the team. */
  date?: string;
  purpose: string;
  keyTakeaway: string;
  contribution: string;
  implementation: string;
  references: string;
};

const TODO = 'Write-up in progress; this conversation is being documented and will be added here soon.';

// Order is exactly the order the team gave (Design & Content Brief, Section 3).
export const writeUps: WriteUp[] = [
  {
    id: 'balaji',
    name: 'Prof. Balaji',
    affiliation: 'Professor, Department of Biosciences and Bioengineering, IIT Bombay',
    photo: '/ihp-photos/balaji.jpg',
    summary: 'Assessed the feasibility of the chitinase project',
    date: '10/12/25',
    purpose:
      'At the start of the cycle we were choosing between two candidate projects and were not sure which was more feasible for a first-time undergraduate team. One of them was an enzymatic approach using a chitinase to degrade chitin waste into chitooligosaccharides. We lacked a clear sense of its scope, its biochemical risks, and how realistic it was to execute within one iGEM cycle. We wanted an expert view on the technical soundness and feasibility of the chitinase idea so we could compare it against our other candidate.',
    keyTakeaway:
      'The chitinase project as we described it was too much for one cycle, closer to the workload of a PhD. On raw, solid shell waste the enzyme might only superficially scratch the surface; if the substrate were first broken down or "melted", the chitinase could then convert it into chitooligosaccharides, so the key question was which substrates it acts on, down to the microstructure level. He told us to avoid kinetic characterisation, since it adds complexity and has limited use at this stage, and to give every parameter we planned to measure a clear purpose, asking, for example, why we needed an optimal temperature and how it would help. For DMDP he asked what it would increase stability with respect to, pointing to conformational stability and protein servers that can predict thermostability. He offered cellulases as an analogy for domain design (a catalytic domain plus carbohydrate-binding modules), and noted that glycosylation machinery matters when choosing an expression host, since prokaryotes have very specialised glycosylation machinery.',
    contribution:
      'This early consultation helped us compare our two candidate projects on feasibility. It showed that the chitinase route carried a heavy workload, an unresolved substrate problem (crystalline chitin needing pre-treatment), and several uncertain engineering steps. This reinforced our selection rule of putting feasibility ahead of novelty, and it contributed to our decision to move forward with the bio-coolant project (Project BiFrost). His habit of asking "why do we need this parameter?" also stayed with us as a way to question each experiment before committing resources.',
    implementation:
      'We used his feedback on scope and technical risk to choose between the two candidate ideas, and formally decided not to pursue the chitinase project, selecting the bio-coolant project instead. We then carried the lessons forward: we limited our scope strictly to what could be accomplished within a single cycle, focusing on C14 fatty acid methyl ester (methyl myristate) yield optimisation in S. cerevisiae; we applied the "why this parameter?" test when planning bio-coolant experiments, so that every thermophysical property measured (dynamic viscosity, pour point, dielectric breakdown voltage) had a clear functional justification; and we prioritised dry-lab modelling (flux balance analysis and kinetic parameter estimation) to predict outcomes before committing to wet-lab work. The chitinase-specific points, DMDP stability, CBM domain pairing, host glycosylation, substrate pre-treatment, were recorded for reference only and were not implemented.',
    references: 'None',
  },
  {
    id: 'husayn',
    name: 'Husayn',
    affiliation: 'Senior from iGEM IIT Bombay',
    summary: 'Gave feedback on the problem statement and wetlab plan',
    date: 'Monthly',
    purpose: 'Sought senior feedback on the problem statement and the feasibility of the wetlab plan.',
    keyTakeaway: 'The biocoolant idea is relevant and strong as a problem statement; check the wetlab feasibility and the amount of synbio.',
    contribution: 'Along with Kadambari, gave feedback on framing the problem and validating feasibility.',
    implementation: 'We refined the problem framing and re-checked feasibility based on this feedback.',
    references: 'None',
  },
  {
    id: 'anushka-alikar',
    name: 'Anushka Alikar',
    affiliation: 'PhD researcher',
    photo: '/ihp-photos/anushka-alikar.jpg',
    summary: 'Advised on chassis comparison, promoter systems and lipid metabolism',
    date: '19/12/25',
    purpose:
      'During the initial stages of BiFROST we were exploring metabolic engineering strategies for a yeast-based production platform for lipid-derived compounds. The host chassis, genetic targets and pathway engineering strategy were all still under evaluation. We sought expert input on identifying metabolic bottlenecks, selecting suitable genetic modifications, and balancing pathway optimisation against host viability, assessing the feasibility of knockout and overexpression strategies, exploring promoter systems and comparative genomics, and identifying interventions that fit our experimental and infrastructural constraints.',
    keyTakeaway:
      'On chassis selection, comparing Yarrowia lipolytica, Saccharomyces cerevisiae and Pichia pastoris would reveal differences in metabolic pathways, genetic architecture and lipid-production capability, and comparative sequence analysis could identify conserved genes and transferable strategies. On expression control, knockout and overexpression strategies were considered alongside promoter systems including galactose-inducible and copper-responsive promoters, with expression levels balanced against cellular fitness, excessive expression or disruption of essential genes could compromise viability. On lipid metabolism, possible interventions included exogenous lipid supplementation, manipulating OLE1 to alter the saturated-to-unsaturated ratio, and error-prone PCR for directed evolution, along with mapping endogenous pathways and investigating the branched-chain alpha-keto acid dehydrogenase complex (BCKDC). The discussion also covered transformation feasibility, substrate requirements and costs, and academic collaborations and laboratory infrastructure relevant to yeast engineering.',
    contribution:
      'The consultation helped establish an initial framework for evaluating yeast metabolic engineering strategies, highlighting the importance of pathway-level analysis before committing to specific genetic interventions. It encouraged us to consider the interactions between genetic modifications, metabolic flux, cellular viability and production performance rather than treating individual genes as isolated targets, and gave us a foundation for refining the engineering objective as our understanding of the product and its biosynthetic requirements developed.',
    implementation:
      'We investigated the relevant metabolic pathways in greater depth to identify bottlenecks and prioritise genetic interventions. Since a CRISPR facility was unavailable to us, we focused on pathway-level alternatives that minimised dependence on gene knockouts, assessing strategies within our experimental constraints and their implications for host metabolism. As the project progressed we refined the engineering objective from increasing overall free fatty acid yield to specifically enhancing C14 production: because C14 fatty acids are the precursors for methyl myristate, chain-length specificity became a more targeted objective than maximising total FFA accumulation. This shift directed subsequent work towards the fatty acid synthesis machinery and strategies favouring medium-chain product formation.',
    references: 'None',
  },
  {
    id: 'prachita',
    name: 'Prachita',
    affiliation: 'PhD researcher in yeast experiments',
    summary: 'Advised on host selection (S. cerevisiae vs Y. lipolytica) and pathway engineering',
    date: '20/12/2025, 19/01/2026, 3/02/2026',
    purpose:
      'These consultations addressed key scientific and experimental uncertainties in engineering yeast for fatty acid production, particularly methyl myristate as a sustainable dielectric coolant. At the initial stage we were uncertain about selecting a host organism between Saccharomyces cerevisiae and Yarrowia lipolytica. We also needed to understand suitable genetic engineering strategies, identify relevant genetic targets, and determine feasible transformation and expression protocols, so as to establish a scientifically sound and practically feasible workflow.',
    keyTakeaway:
      'On host selection and pathway feasibility, we discussed the differences between S. cerevisiae and Y. lipolytica, their metabolic pathways, genetic characteristics and suitability for fatty acid production, along with the feasibility of introducing heterologous genes, the potential essentiality of target genes, and differences in gene encoding and expression. On genetic engineering strategies, the discussion covered promoter selection, gene overexpression, gene silencing, plasmid-based expression versus genomic integration, and the pop-in/pop-out strategy, with error-prone PCR and directed evolution explored as ways to modify enzyme specificity and improve production. On metabolic considerations, we explored fatty acid production kinetics, the relationship between free fatty acids and triacylglycerols, the role of S-adenosylmethionine (SAM) metabolism, and the influence of growth phases including the stationary phase on yield. On experimental feasibility, the consultations addressed chemical transformation and electroporation, growth media such as YPD, plasmid copy number, and the practical considerations of introducing and expressing genetic constructs, with emphasis on following detailed protocols and planning cloning workflows carefully.',
    contribution:
      'The consultations helped us approach host selection and pathway engineering more systematically, highlighting the need to consider not only the desired metabolic pathway but also the genetic tractability of the host, expression strategy, potential effects on essential genes, and feasibility of experimental implementation. Her guidance was particularly valuable in addressing our uncertainty between S. cerevisiae and Y. lipolytica: by discussing their metabolic characteristics, genetic engineering possibilities and transformation requirements, we could evaluate the practical implications of working with each organism before finalising our choice. The consultations also helped identify important literature and protocols for further investigation.',
    // TODO (team): the source document records Y. lipolytica as the chassis selected after these
    // consultations, while the Dawar write-up records the later pivot to S. cerevisiae. Confirm the
    // wording here so the two accounts agree.
    implementation:
      'Chassis selection: discussions on metabolic pathways, genetic characteristics, transformation methods and suitability for fatty acid production helped us evaluate the feasibility of working with each organism. Following these consultations and further literature review the team selected Y. lipolytica as its host chassis, establishing a clearer direction for subsequent pathway engineering; the project later moved to S. cerevisiae after consultations with PhD researchers. FAS engineering for increased C14 yield: we explored modifications to the fatty acid synthase complex to improve production of shorter-chain fatty acids, including the choice between Type I and Type II FAS systems and the feasibility of modifying specific domains to influence chain length. We pursued a targeted mutation in the ketosynthase (KS) domain of the Type I system rather than incorporating the E. coli FAS system, which would have required introducing nine genes. POX deletion as future scope: deletion of POX genes, which encode acyl-CoA oxidases involved in peroxisomal beta-oxidation, was identified as a potential future strategy to reduce fatty acid degradation and direct more flux towards C14, and remains a proposed future direction.',
    references: 'None',
  },
  {
    id: 'pratik-makhija',
    name: 'Pratik Makhija',
    affiliation: 'IISER Pune team member who ran the Jetropha project',
    photo: '/ihp-photos/pratik-makhija.jpg',
    summary: 'Advised on strains, vectors and protocols for working with Yarrowia',
    date: '28/10/25, 10/01/26',
    purpose: 'Asked how his team ran their Jetropha project, strains, vectors, kits and protocols, to assess feasibility for our own work with Yarrowia lipolytica.',
    keyTakeaway:
      'The team emphasised that for reliable results the Y. lipolytica strain should be sourced from IMTECH (MTCC), Chandigarh, specifically the Po1g strain, a derivative of the W29 lineage, and that it is particularly effective with the pYLEX vector series for genomic integration. On vectors, they highlighted the Yeastern BioKit as an all-in-one solution: pYLEX is the "home" for the gene of interest, designed for precise homologous recombination into the genome, and the kit includes pre-optimised components that simplify transformation, which can otherwise be tricky with non-conventional yeasts. They mentioned using restriction enzymes such as BamHI and PmlI for cloning into the pYLEX backbone, following advice from experts including Dr. Catherine Madzak. On media and growth, cultivation is handled in distinct stages to balance biomass growth against gene induction: standard YPD for general maintenance, then a medium protocol sheet specific to pYLEX for expression and selection, typically YNB without amino acids to maintain selection pressure. They noted pH (around 5.5) and aeration are critical, and explored using perfluorodecalin to enhance oxygen availability, which significantly boosted their lipid and enzyme yields. They also suggested keeping a strict components table for consistency across batches, glucose for normal growth and glycerol for induction, ammonium sulfate or urea as nitrogen source (limitation triggers lipids), EDTA, ZnSO4, MnSO4 and FeSO4 as trace elements, and leucine (LEU2) or uracil (URA3) as selection marker depending on the pYLEX variant. Their mentors, including Dr. Sunish Radhakrishnan, advised that codon optimisation for the Y. lipolytica bias is essential, as rare codons from other species often lead to failed western blots or low protein expression.',
    contribution: 'Shared the strain source, vector system, kits, media staging and protocol details from running a comparable project, giving us a concrete picture of what working with Y. lipolytica would require.',
    implementation: 'Folded his practical guidance into our feasibility assessment and planning.',
    references: 'None',
  },
  {
    id: 'dawar',
    name: 'Dawar',
    affiliation: 'Ex-iHP Lead of iGEM IIT Bombay and founder of Erdos AI',
    photo: '/ihp-photos/dawar.jpg',
    summary: 'Advised on meaningful iHP, project selection and pitching sponsors',
    date: '08/11/2025',
    purpose:
      'We reached out to Dawar because, as a former iHP lead from our own institute who has since founded a company, he had hands-on experience with exactly the problems we were navigating, how to run iHP meaningfully rather than as a checkbox activity, how to manage team momentum and friction between subteams, how to approach project selection without chasing novelty, and how to pitch sponsors and the institute effectively.',
    keyTakeaway:
      'iHP should function as the project’s "eyes and ears" from day one, even before the final project is locked in, surfacing real stakeholder pain points and internal team friction early enough to shape the project rather than validate it afterward. Judges care about the depth and quality of insight integration far more than the volume of outreach.',
    contribution:
      'Dawar framed the team through the "J-curve of biotech", biotech moving from niche research into a major growth phase, and argued the team should operate like a high-stakes startup, not a club. For project selection he put feasibility above novelty: a moderately novel project that produces working results beats an ambitious idea with no proof of concept, the point being to avoid "deterministic" research where outcomes are left to chance. He noted roughly 80% of breakthrough insights come from about 20% of the people you talk to, so identify high-value "node" people early. He stressed iHP must be active before the project spec is finalized, bridging Wetlab and Drylab when they stall, and that retention depends on people seeing weekly micro-growth. On sponsorship he advised positioning over persuasion, approach partners as "we’re doing this with or without you, but if you join it’s win-win", leveraging the institute’s brand and the biotech growth narrative. On Jamboree: quality beats quantity; show how a specific insight changed an actual design decision.',
    implementation:
      'We evaluated project options on feasibility and novelty, which led to selecting the bio-coolant project; it has been well received across our institute and department, which suggests it balances ambition with achievability. Following his advice to keep the media and web teams involved from the start, we gave them real work early on, our own website, a separate simulation website, and several posters and software tools, so the team could grow as a whole while members still built individual skills. We used the "sell the vision" framing in sponsor and institute pitches: our social media following has grown to about 1.5 times its earlier level and our budget has increased to Rs 30 lakh, double last year’s, and contacting reagent-selling organisations helped us secure Rs 5 lakh from WRCB, within Rs 15 lakh of sponsorship overall. Over the cycle we reached out to more than six PhD researchers; one conversation was decisive, warning that as undergraduates we might struggle to procure and experiment with Yarrowia lipolytica, which led us to pivot to Saccharomyces cerevisiae and avoid several likely failures and significant experimentation cost. His reminder to check whether an approach is worth its cost also prompted us to carry out a formal cost analysis.',
    references: 'Conversation/mentorship session with Dawar, Ex-iHP Lead, iGEM IIT Bombay; Founder, Erdos AI.',
  },
  {
    id: 'deepan',
    name: 'Deepan',
    affiliation: 'Senior member of iGEM IIT Bombay (ex-iHP and Wet Lab)',
    photo: '/ihp-photos/deepan.jpg',
    summary: 'Advised on institute funding and experimental budgeting',
    date: '04/11/2025',
    purpose:
      'We needed to secure funding from the Institute but did not know how the administration works or whom to approach. We were also planning our first cycle working with yeast, so we had no basis for how much budget to set aside for failed experiments. Our Human Practices approach also needed direction on how to engage stakeholders and validate our progress. We wanted to learn from a senior with both iHP and wet lab experience how to approach IIT Bombay administration for funding, how to structure our outreach, and how to design a realistic experimental budget.',
    keyTakeaway:
      'He explained how the administration at IIT Bombay works, how we should seek funding from it, and which people to contact. On iHP, he said the best approach is simply talking to professors, academics and other relevant people, and that whatever progress we make should be validated by speaking with relevant experts and stakeholders. On budget, experiments should be designed around our budget, keeping a healthy overhead for failed experiments and re-experiments.',
    contribution:
      'Knowing how the administration works and whom to contact gave us a clear route to Institute funding instead of ad hoc approaches. His emphasis on talking to professors and academics, and on validating progress with relevant people, reinforced a validation-driven iHP workflow that keeps our decisions tied to expert feedback. Because this was our first time working with yeast we expected more failed experiments and re-runs, and following his advice we set aside a large part of the budget for re-experiments, which gave us room to absorb setbacks without halting the project. He also helped us design this year’s budget, so far our most well-planned and efficient, with a good balance between experimental success and cost.',
    implementation:
      'We contacted the administrative offices he recommended and pursued Institute funding through them. We spoke with professors, academics and other relevant people throughout the cycle and used these conversations to check our progress at each stage. With his help we built our budget around our planned experiments and allocated a large share to re-experiments, which allowed us to handle failed experiments without running out of funds.',
    references: 'None',
  },
  {
    id: 'anagdha',
    name: 'Anagdha',
    affiliation: 'BioCompute (bacterial DNA data storage)',
    photo: '/ihp-photos/anagdha.jpg',
    summary: 'Explored synergy between our bio-coolant and bacterial DNA data storage',
    date: '18/10/2026, 22/01/2026',
    purpose:
      'Our bio-coolant project is designed around conventional data centre cooling. We wanted to know whether the idea could apply to newer computing infrastructure, and we had not yet explored bacterial or DNA-based data centres as an application area. The aim was to explore potential synergies between our bio-coolant and her work on using bacterial DNA for data storage, and to gauge whether a formal collaboration was feasible.',
    keyTakeaway:
      'She works on using bacterial DNA as the storage medium for data centres, an alternative to traditional silicon-based ones, and expressed strong interest in a formal collaboration. The conversation centred on developing specialised coolants that maintain optimal thermal and biological conditions for DNA-based data centres. The synergy areas we discussed were exploratory: bio-coolants that maintain the thermal and chemical gradients needed for bacterial DNA stability and longevity; minimising thermal fluctuation to reduce the risk of mutation or degradation in DNA-based storage media; and pairing the eco-friendly profile of our bio-coolant with the low-carbon footprint of biological computing. The conversation did not produce technical feedback or guidance on our current project; it was exploratory and focused on future possibilities. We invited her to our bioentrepreneurs online session, which she joined from Silicon Valley (details in the EO tab).',
    contribution:
      'The meeting did not change our technical design, but it widened our view of where the bio-coolant could be applied, from conventional data centres to emerging bacterial and DNA-based ones. It also gave us a contact in the biological computing space who is open to collaboration, which could matter for the project’s long-term vision and future applications. Her participation in our bioentrepreneurs session also added to our network and outreach.',
    implementation:
      'No changes to the current project design came from this meeting. We are keeping the DNA data storage application as a possible future direction and will note it in our broader-impact and applications discussion, and we are keeping the collaboration channel open for further discussion. The bioentrepreneurs session with her is documented in the EO tab.',
    references: 'None',
  },
  {
    id: 'prof-sandeep',
    name: 'Prof. Sandip Saha',
    affiliation: 'Professor, Department of Mechanical Engineering, IIT Bombay',
    photo: '/ihp-photos/prof-sandeep.jpg',
    summary: 'Advised on immersion cooling fundamentals and testing roadmap',
    date: '03/03/26',
    purpose:
      'This was our first consultation on immersion cooling. As a team we were new to the field and did not know which thermophysical, electrical and system-level factors decide whether a coolant works for immersion cooling, or which to evaluate first. We also had not yet narrowed down which ester, and which carbon chain length, to pursue. We wanted an expert view on what to evaluate when considering a bio-derived ester as an immersion coolant, and what a realistic system and testing roadmap looks like.',
    keyTakeaway:
      'On maturity, there is no long-term use of bio-based coolants in immersion cooling yet, so long-term performance data is limited, and a bio-coolant can change its properties over time, so ageing and stability need examining. On thermophysical properties, esters tend to be viscous and to have low thermal conductivity, both of which can limit heat transfer; viscosity should be measured with a rheometer and thermal conductivity with a liquid thermal conductivity measurement, with a custom-built setup also an option. The coolant must stay liquid in cold, freezing climates, so its melting point must be low enough for such conditions. On electrical properties, the ester must be dielectric, and what matters is the net effective dielectric behaviour of the fluid as used. On fluid and material behaviour, compatibility with the immersed materials and components must be checked, and hydrophobic and hydrophilic behaviour characterised. On thermal-system design, single-phase versus two-phase depends on the application and on compatibility with weather and ambient conditions; a liquid coolant can form bubbles, so the heat flux the system will see and the likelihood of boiling need estimating, and a secondary coolant loop such as a heat exchanger will likely be needed to reject heat from the primary immersion fluid.',
    contribution:
      'It gave us a structured checklist of properties and system factors where before we had no framework for judging coolant suitability. It showed that viability depends on thermal transport, electrical behaviour, material compatibility, ageing, low-temperature behaviour and heat rejection together, not on any single property, and moved our evaluation from "can the molecule be made" to "can it function as a coolant." His point about cold-climate operation made melting point a primary selection criterion, which led directly to our choice of carbon chain length and our candidate molecule, methyl myristate (a C14 ester).',
    // TODO (team): the source document leaves the drawback of chains shorter than C14 unfilled
    // ("[add the specific issue after checking, e.g. volatility or lower flash point]").
    implementation:
      'We used melting point as a screening criterion to choose the carbon chain length of our ester, and recorded the remaining items from the meeting as open validation items rather than completed work. After the meeting we looked for compounds with the lowest melting points and compared ester chain lengths: beyond C14 the melting point rises, which makes longer chains unsuitable for cold climates, while chains shorter than C14 had other drawbacks. C14 gave the best trade-off, so we selected methyl myristate, and this choice then shaped our wet-lab work on producing C14 in S. cerevisiae.',
    references: 'None',
  },
  {
    id: 'parth',
    name: 'Parth',
    affiliation: 'PhD in Yeast Engineering',
    photo: '/ihp-photos/parth.jpg',
    summary: 'PhD Mentor',
    date: 'Weekly',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  {
    id: 'prof-phale',
    name: 'Prof. Phale',
    affiliation: 'Professor in metabolic engineering',
    photo: '/ihp-photos/prof-phale.jpg',
    summary: 'Advised on gene modifications, metabolic flux and the thioesterase route to C14 fatty acids',
    date: '2/03/26',
    // TODO (team): an earlier version of this write-up also recorded advice on alternatives to
    // cuphea, ordering mutated yeast strains from the reference papers rather than mutating from
    // scratch, and the feasibility of a metazoan FAS. Those points are not in the Drive document -
    // confirm whether they belong here or to a separate meeting.
    purpose:
      'Our project aimed to engineer a microbial system capable of producing methyl myristate, a potential sustainable dielectric coolant. Our proposed strategy involved multiple genetic modifications, including gene incorporation and deletion, to enable in vivo methylation and improve product formation. We consulted him to understand how these modifications could affect metabolic flux, cellular energy requirements, organism fitness and overall product yield, and to explore alternative approaches for obtaining C14 fatty acids, including using a thioesterase to release them from fatty acyl-CoA intermediates.',
    keyTakeaway:
      'The discussion highlighted the importance of considering the host’s overall metabolism rather than optimising individual reactions in isolation. On metabolic flux and cellular fitness, redirecting carbon towards the desired product could affect essential cellular processes and energy production, so the cumulative effects of multiple gene insertions and deletions needed consideration. On alternative production pathways, we discussed triacylglycerol accumulation and subsequent hydrolysis as a possible route to fatty acid recovery, and a thioesterase-based approach for converting C14 fatty acyl-CoA into free fatty acids. On genetic feasibility, he suggested investigating the availability of suitable host strains, searching for homologous sequences using BLAST, and identifying appropriate DNA fragments and vectors. On experimental validation, physiological characterisation, including assessing TAG accumulation and examining how the engineered system interacts with cellular processes, was identified as important for evaluating the effects of genetic modifications.',
    contribution:
      'The consultation broadened our approach from pathway construction to evaluating the metabolic consequences of engineering. It highlighted that increasing product formation must be balanced against cellular growth, energy requirements and metabolic stability, and encouraged us to consider alternative routes for C14 fatty acid production rather than relying exclusively on a single pathway design.',
    implementation:
      'We evaluated the feasibility of introducing multiple genes and deleting selected native genes to enable in vivo methylation and improve methyl myristate production, considering the potential effects on metabolic flux, cellular fitness and overall yield while refining our engineering strategy. We conducted BLAST searches to investigate relevant genes and sequence similarities for our proposed pathway engineering, and evaluated introducing a thioesterase to release C14 fatty acids from fatty acyl-CoA intermediates; after further evaluation we decided not to pursue the thioesterase-based approach and instead focused on alternative strategies for improving C14 production and its conversion to methyl myristate. The consultation also helped us recognise the importance of evaluating genetic modifications in the context of the host’s overall metabolism, which informed our subsequent pathway design.',
    references: 'None',
  },
  {
    id: 'dr-navratna',
    name: 'Dr. Navratna',
    affiliation: 'CEO, WITC: Wadhwani Innovation Technology Centre',
    photo: '/ihp-photos/dr-navratna.jpg',
    summary: 'Advised on framing research for national impact and building a strong team',
    date: 'Biweekly',
    purpose: 'To understand how to frame research so it helps build something for the country, and how to build a strong team.',
    keyTakeaway:
      'He helped us think about research direction and team-building, and reflected on the problems with our previous project and how to avoid similar mistakes this time.',
    contribution:
      'Discussed how to think about research with national impact, how to develop a team, and walked through what went wrong previously and how we could have fixed it.',
    implementation:
      'We carried his lessons on team-building and avoiding past mistakes into how we run this cycle. He also helped us verify our experiments, and helped us understand GC-MS and how we tuned it so that it could be applied to our work.',
    references: 'None',
  },
  {
    id: 'aditya-ict',
    name: 'Aditya',
    affiliation: 'Team Lead, ICT Mumbai',
    photo: '/ihp-photos/aditya-ict.jpg',
    summary: 'Advised on sponsorship outreach',
    date: '2/06/26',
    purpose:
      'Our sponsorship outreach had stalled, cold emails and LinkedIn messages were yielding almost no response (roughly 1–2 replies per 50–60 contacts), and we needed practical, insider guidance on who to target, how to frame the pitch, and when companies are actually receptive.',
    keyTakeaway:
      'Sponsorship success depends far less on the strength of the project pitch and far more on targeting the right people (sub-decision-makers in finance or marketing, and alumni specifically), timing outreach around the corporate financial year, and framing the ask around iGEM and synthetic biology broadly rather than project specifics, because companies give through CSR obligations and aren’t expecting a return.',
    contribution:
      'The low response rate pointed to who we were contacting, not the approach itself. He advised targeting people just below the top decision-makers, finance (near the CFO) or marketing, who can greenlight smaller asks. Companies set aside CSR funds they are obligated to spend, so the game is becoming an easy, credible recipient rather than "convincing" anyone; they expect little direct ROI beyond promotional visibility. Timing matters: firms avoid committing in Feb–March (financial year-end) but are far more open in June–July. Cold emails should lead with the broad value of iGEM and synthetic biology, not project specifics, easier for a non-specialist to approve, and it protects the team from being blamed if results don’t pan out. Prioritise alumni over cold corporate contacts, and don’t restrict the search to bioscience firms.',
    implementation:
      'We restructured our targeting list to prioritise alumni first, then mid-level finance and marketing professionals rather than top executives. We rewrote our outreach template to lead with a high-level intro to iGEM and synthetic biology and removed language tying funding to project outcomes. We shifted outreach to concentrate on June–July, and expanded the target list beyond bioscience/biotech to companies across industries with active CSR programs, offering promotion within the competition as the stated return. We also built a prospect list segmented by alumni, industry and role so we could track responses and refine the first email. Result so far: following this approach we reached out to the IIT Bombay alumni fund and, after pitching and a follow-up conversation with the Dean of Alumni and Corporate Relations, were awarded Rs 10 lakh for travel and accommodation.',
    references: 'None',
  },
  {
    id: 'vaibhav-sai',
    name: 'Vaibhav Sai',
    affiliation: 'Bioentrepreneur, DiagnoBac',
    photo: '/ihp-photos/vaibhav-sai.jpg',
    summary: 'Advised on stakeholder outreach, scale-up and networking',
    date: '24/05/2026',
    purpose:
      'We wanted to identify and reach stakeholders relevant to the project, especially those involved in sustainable infrastructure and data centres; to understand strategies for industrial scale-up and improving product yield; to re-evaluate our outreach and event strategies so they aligned with the project’s goals and target audience; to explore integrating computational biology and optimisation models into the project; and to build meaningful industry and research connections through targeted networking.',
    keyTakeaway:
      'On networking, he advised applying to competitions and initiatives such as MeitY to gain exposure and build industry connections, attending or organising interdisciplinary events spanning the AI and synthetic biology communities, and using outreach strategically to gain sponsors, mentorship, partnerships and stakeholder connections, with every event having a clear purpose and tangible benefit for the project. On stakeholders, he suggested reaching out to organisations building data centres, sustainability-driven companies, environmental groups focused on water conservation, and communities advocating reduced water usage in data centres. On outreach strategy, he noted our previous activities were beneficial for the broader synthetic biology community but might not attract stakeholders relevant to this specific project, and recommended shifting to project-focused initiatives, debates, panel discussions and awareness events on water conservation and sustainable infrastructure, including a data centre and water conservation themed event to identify sponsors, connect with experts and gain guidance. On wet lab and scale-up, product yield is expected to be a major challenge during industrial scale-up, cellular behaviour is difficult to predict and requires iterative optimisation, and we should focus on chassis optimisation, metabolic pathway reconfiguration, feed optimisation, temperature optimisation, pH control and other external growth parameters, while exploring biological systems naturally suited for the desired function. On dry lab, DiagnoBac has created a hybrid chassis optimisation computational model that takes a desired objective such as increased yield, automatically optimises metabolic pathways, removes unnecessary biological components and improves overall productivity; he pointed us to Rutuja, a systems biologist, for guidance on computational modelling and optimisation. He also advised spending time outside standard coursework understanding how biological systems function, why certain systems perform effectively and why some fail under specific conditions, building conceptual understanding rather than focusing only on implementation.',
    contribution: 'Gave guidance on sponsors, stakeholder targeting, event strategy and scale-up, and made referrals including to Rutuja for computational modelling and chassis optimisation.',
    implementation:
      'We approached the contacts he suggested, including Rutuja for computational modelling and chassis optimisation, and refined how we present the project. The action items from the session were to explore competitions and MeitY opportunities, organise project-focused outreach events on water conservation and sustainable data centres, reassess our outreach strategy so it attracts relevant stakeholders, investigate chassis, feed and environmental parameter optimisation to improve yield, explore collaborations with environmental and sustainability groups, and plan networking initiatives involving the AI and synthetic biology communities.',
    references: 'None',
  },
  {
    id: 'rutuja',
    name: 'Rutuja',
    affiliation: 'Systems biology researcher',
    photo: '/ihp-photos/rutuja.jpg',
    summary: 'Advised on FAS simulations and yeast metabolic models',
    date: '2/06/26',
    purpose:
      'We needed guidance on our computational work: whether to simulate the entire FAS complex or only the relevant domains, which yeast metabolic model to build on and how to constrain it, and how to identify errors in our results.',
    keyTakeaway:
      'On simulation scope, we can simulate only the relevant domain of interest but must take care of everything within roughly 10 to 30 ångström of it for appropriate and accurate results, which saves computational power while still giving relevant results; she also advised looking for people who have worked on this simulation earlier and using a similar template for accurate substrate and domain docking. On the yeast model, we can use models such as Yeast8 or Yeast9, we had decided to work on Yeast8 and she approved that choice, but we must make sure the reactions we want to focus on are included in the model, put in proper constraints, and can work by choosing a general minimal medium. She advised focusing on multi-objective goals, maximising production of the relevant fatty acid while keeping the cells alive, and looking into the production envelope, context-specific models if we have enough data, phase plane analysis, and fetching relevant reactions while including transcriptome and sequence data and, when it arrives, wet lab data. When verifying, we should check important cell reactions such as the central carbon reactions and look for substrate-competitive or dead-end reactions. She pointed us to a book on systems biology and computational methods by Prof. Karthik Raman. On identifying errors, she advised experimental verification, for example, if we suspect protein denaturation, check it in the lab with a sample, and looking into cell-free analysis.',
    contribution: 'Confirmed our modelling choices, set the bounds for domain-level simulation, and gave us a checklist for constraining and verifying the metabolic model.',
    implementation: 'We carried her guidance into our dry lab modelling work, see the Dry Lab Model pages.',
    references: 'Book on systems biology and computational methods by Prof. Karthik Raman.',
  },
  {
    id: 'rajesh-vagdama',
    name: 'Dr. Rajesh Vagdama',
    affiliation: 'Green Bio Synthesis Group, L’Oréal',
    photo: '/ihp-photos/rajesh-vagdama.jpg',
    summary: 'Advised on bio-ester formulation, sustainability certification and scale-up',
    date: '05/06/26',
    purpose:
      'Having validated broad feasibility with Prof. Vikram, we needed deeper technical guidance on formulation chemistry, how to turn a hydrophobic bio-ester into a functional, homogeneous coolant, plus wetlab strategy for engineering yeast to make our target C14 fatty acid and scaling to viable yields. His role in L’Oréal’s Green Bio Synthesis Group made him ideal on bio-based formulation, sustainability certification and scale-up.',
    keyTakeaway:
      'A bio-ester alone cannot function as a coolant; it needs a carefully balanced additive system (emulsifiers, solubilisers, controlled concentration) to overcome its hydrophobicity and surface-tension issues. Biologically, producing C14 specifically (rather than yeast’s native C16/C18) requires a deliberate two-phase starvation strategy, not a single-step genetic or metabolic shock.',
    contribution:
      'A high-latent-heat coolant must release heat immediately, but bio-esters are hydrophobic while the coolant system needs to behave hydrophilically for homogeneity, so solubilisers and emulsifiers become the main functional ingredients (roughly 70% solvent to 30% main ingredient), with homogeneity a property to engineer, not assume. He identified surface tension as the core limitation, proposed hydrophobins, and stressed that surfactant type depends on emulsion type (checked via HLB value), with surfactant concentration never exceeding 2%. On certification, a product is "bio-based" only if >60% of its carbon is bio-sourced (verified by C14 isotope analysis), and feedstocks like palm oil need RSPO certification. For scale-up: fermentation yield ≥ 70%, downstream purification ~80%, with visual clarity as a quality proxy. S. cerevisiae makes C16/C18, so C14 selectivity needs mutation plus a two-phase starvation (grow first, then shift the C:N ratio, low carbon, high nitrogen, to divert metabolism to lipids). He recommended extracting the free C14 fatty acid cell-free, then esterifying outside the cell with immobilised enzymes and methanol, exploiting the bio-ester’s water-insolubility (and a salting-out effect) for phase separation.',
    // TODO (team): the Drive document leaves its Execution Strategy items as unconfirmed
    // "[Confirm: …]" placeholders, so only the agreed plan is published here.
    implementation:
      'Our plan from this meeting: design the formulation with a solubiliser/emulsifier system and select surfactants using HLB values, keeping concentration at or below 2%; adopt the two-phase lipid production workflow, grow first, then divert, with incremental changes in conditions; keep the C14 yield target as our main wet lab objective; perform esterification outside the cell with immobilised enzymes and then separate the ester by salting-out; use the 70% scale-up and 80% purification yields as benchmarks in our scale-up and techno-economic discussion; and include bio-based content and source certification in our sustainability analysis.',
    references: 'Conversation with Dr. Rajesh, Green Bio Synthesis Group, L’Oréal, formulation chemistry and wetlab strategy guidance, iGEM IIT Bombay 2026 project.',
  },
  {
    id: 'prof-suyash',
    name: 'Prof. Suyash Vikram',
    affiliation: 'Assistant Professor, Mechanical Engineering, Government Engineering College Vaishali',
    photo: '/ihp-photos/prof-suyash.jpg',
    summary: 'Advised on coolant reliability, material compatibility and additives',
    date: '5/07/26',
    purpose:
      'Our project centres on a myristate ester-based immersion coolant for data-centre and battery thermal management, and we needed expert grounding in what actually makes an immersion coolant viable beyond lab-scale thermal performance, long-term reliability, material compatibility, and how industry validates coolants without waiting years for real-time data. We were also unsure whether additive strategies from conventional dielectric fluids transfer to ester-based systems.',
    keyTakeaway:
      'Thermal performance alone does not determine industrial viability, safety, long-term chemical stability, material compatibility and economics are equally decisive. For ester-based coolants specifically, the biggest open risks are flash-point limitations and potential decomposition/deposition at elevated temperatures over extended operation.',
    contribution:
      'He framed why immersion cooling is rising (direct dielectric contact removes thermal contact resistance and improves temperature uniformity, reducing uneven battery aging) and walked the competitive landscape, fluorinated fluids (e.g. 3M Novec) perform but are costly and vapour-prone; mineral/silicone oils are cheap but have tradeoffs; transformer oil remains the trusted benchmark. For esters he flagged decomposition and carbonaceous deposits under prolonged heat as a genuine, under-documented research gap. He stressed temperature-dependent property curves over single values, singling out viscosity (active circulation makes pumping penalties real). Industry justifies multi-year reliability via accelerated aging, dielectric/Hi-Pot testing and AI-assisted degradation models. Material compatibility (metals, busbars, connectors, seals, polymers) must be tested in parallel, not as a side-task. On simulation, the sim-vs-experiment gap often comes from ignoring buoyancy-driven natural convection and assuming uniform heat generation; he recommended user-defined functions in CFD. On flash point, additives can tune properties but every additive must be cross-checked against dielectric strength, thermal conductivity, viscosity, flash point and material compatibility.',
    implementation: 'CFD improvement, and he helped us discover the role of antioxidants in our additive strategy.',
    references: 'None',
  },
  {
    id: 'subhendhu',
    name: 'Subhendu',
    affiliation: 'Researcher at Shell working on immersion coolants',
    photo: '/ihp-photos/subhendhu.jpg',
    summary: 'Gave the industry view on competing with PAO and GTL fluids',
    date: '7/06/26, 28/07/26',
    purpose:
      'We were developing a sustainable, ester-based, PFAS-free immersion cooling fluid for data centres. We had the technical idea but lacked an industry view on how it would compete against established synthetics (PAO, GTL), what data centre customers actually value, and which technical trade-offs would decide success. We wanted an industry researcher’s view on the market landscape and barriers to adoption, the fluid property targets and formulation strategies, and how to validate and position the product commercially.',
    keyTakeaway:
      'On the market, standard immersion cooling is cost-effective for non-AI data centres, while the surge in AI workloads is pushing the market toward direct-to-chip cooling; air-cooling competitors are offsetting their high power draw with free nuclear or solar power to recover CAPEX, and traditional cooling towers face severe pressure because of their water intensity. Innovation is not limited to the coolant, competitors are modifying chips and exploring system-level changes such as water cooling or seawater heat sinks, so our competition includes other value chain players, not only other immersion coolant companies. Operators are highly risk-averse, prefer predictable and oversupplied synthetics, and usually optimise for power or water usage rather than switching fluid; adoption is notoriously slow even for a strong product. On the technical dilemma, raising molecular weight raises heat capacity, which lowers average temperature under the same load, but also spikes viscosity; hydrocarbon fluids have very low thermal diffusivity (about 0.11–0.12); the current fix is higher pump velocity, which leaves the fluid unchanged but raises OPEX; and the long-term R&D goal is a fluid designed from first principles that behaves like water, with high thermal diffusivity and heat capacity without a viscosity penalty. On targets, raw material candidates include cashew nut shell oil and terpene/woody biomass chemistry, with boiling point above 230 °C (initial boiling point/volatility in the 230–270 °C range), viscosity as low as 4–50 cP, melting/pour point below −20 °C, and corrosion resistance including inhibitors such as tertiary amines for heat exchanger corrosion. On formulation, core-shell phase change materials (for example a wax core) can add phase change benefits, with a polymer shell to keep dielectric insulation and scalable routes via interfacial polymerisation in CSTRs or spray drying, since wet-chemistry synthesis of stable core-shell particles is very hard to scale; particles thicken the oil, so a desktop modelling exercise with the Einstein equation and soft-colloid correlations should find the best balance of heat capacity and friction; total additive volume should stay below 20% to protect the baseline oil; hydrophobic variants help prevent microbubble formation and keep the fluid homogeneous, and because biological proteins degrade rapidly at data centre temperatures he suggested cycloaliphatic systems and organic surfactants instead; and hexagonal boron nitride is a high-diffusivity material that Shell’s patented process separates into nanosheets for doped thermal fluids, offering very high diffusivity at a fraction of graphene’s cost. On commercialisation, customers equate clarity with purity and assume a translucent fluid was not dewaxed properly, so we must actively counter that perception; every customer’s system design is different, so formulations must be tailored; we cannot sell on being "green" alone but must prove the fluid cuts power cost using concrete numbers; the sustainability case has to be airtight and based on LCA, benchmarked against mineral and synthetic oils on carbon density; and validation runs in two rounds, plugging fluid properties into a simulation console to estimate system-level thermal impacts, then physical reliability testing for at least six months (Shell previously ran a 12-month test with Nvidia).',
    contribution:
      'It shifted our focus from "can we make a PFAS-free ester coolant" to "why would a data centre operator switch to it, and is it really more sustainable?" It made us confront why existing "sustainable" coolants struggle commercially and whether our product avoids the same problems, and made market positioning, cost analysis and quantitative sustainability benchmarking priorities for the project. It also gave us a clear technical framework, the viscosity and heat capacity trade-off, additive limits, and stability testing, and a realistic view of the validation timeline we would face in industry.',
    implementation:
      'Following this meeting we began five workstreams: market positioning, reframing the pitch around user-focused value rather than general societal benefit and examining where we sit against PAO, GTL and other cooling approaches; understanding why current "sustainable" coolants fall short, by examining the limitations of existing bio-based and natural coolants; cost analysis, covering cost of production and how far the sustainability benefit outweighs the cost premium; a life cycle analysis of our product’s carbon footprint compared with natural coolants and conventional oils; and sustainability validation, testing whether our product is actually sustainable and assembling the full case for it. The work appears in the Know Your Coolant tab (market positioning, cost analysis, comparison with other coolants), the LCA Analysis tab (carbon footprint and comparison with natural coolants) and the Sustainability tab.',
    references: 'None',
  },
  {
    id: 'sayali',
    name: 'Sayali Bokare',
    affiliation: 'PhD Researcher, GC–MS',
    summary: 'Advised on lyophilization for GC–MS sample preparation',
    date: '10/10/26',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  {
    id: 'prof-shiva',
    name: 'Prof. Shivasubramanian Gopalakrishnan',
    affiliation: 'Professor, Mechanical Engineering, IIT Bombay',
    photo: '/ihp-photos/prof-shiva.jpg',
    summary: 'Validated our OpenFOAM immersion-cooling simulations',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  {
    id: 'igem-denmark',
    name: 'iGEM Denmark',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  // On the People Flow board but with no document in the shared Drive folder yet.
  {
    id: 'prof-santanu',
    name: 'Prof. Shantanu Ghosh',
    affiliation: 'Professor in Plasmid Design',
    photo: '/ihp-photos/prof-santanu.jpg',
    summary: 'Validated Plasmid Map',
    date: '30/09/26',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  {
    id: 'shubham',
    name: 'Shubham',
    affiliation: 'PhD researcher in LCA',
    photo: '/ihp-photos/shubham.jpg',
    summary: 'Mentored the dry lab team on LCA (via Prof. Shastri)',
    date: '20/10/2025',
    purpose: TODO,
    keyTakeaway: TODO,
    contribution: TODO,
    implementation: TODO,
    references: 'None',
  },
  {
    id: 'yogendra-shastri',
    name: 'Prof. Yogendra Shastri',
    affiliation: 'Professor, Department of Chemical Engineering, IIT Bombay',
    photo: '/ihp-photos/yogendra-shastri.jpg',
    summary: 'Guided our Life Cycle Assessment',
    date: '01/10/26',
    purpose:
      'To rigorously evaluate the environmental sustainability and carbon footprint of Project BiFrost against conventional petroleum and fluorinated (PFAS) coolants, we needed to conduct a formal Life Cycle Assessment. As an undergraduate team with limited background in standardised LCA methodologies, we needed expert guidance to structure the assessment, define system boundaries, and access reliable industrial inventory data. We consulted him on the core stages of an LCA, on establishing an accurate process flow diagram for our bio-coolant production, and on obtaining the tools and database access to execute the analysis.',
    keyTakeaway:
      'He outlined the standard four-phase LCA framework, goal and scope definition, life cycle inventory analysis, life cycle impact assessment, and interpretation, and emphasised that before running any impact assessment software or querying databases, a rigorous process flow diagram must be established to account for all raw material inputs, energy requirements, intermediate streams and waste outputs. To ensure our bioprocess model was industry-accurate he assigned PhD researcher Shubham to mentor our dry lab team, and working with Shubham we mapped and finalised our complete PFD, spanning upstream feedstock preparation, S. cerevisiae fermentation, lipid extraction, esterification to C14 methyl myristate, and downstream purification. He also granted our team access to the ecoinvent database, enabling us to pull verified industrial inventory data for utility consumption, chemical inputs and baseline emissions.',
    contribution:
      'His guidance transformed our sustainability goals into a quantitative, industry-standard environmental assessment. By pairing us with Shubham he ensured our process engineering assumptions were grounded and mass-balanced, and granting access to the ecoinvent database provided the high-fidelity inventory data necessary to calculate precise environmental indicators such as global warming potential and eutrophication potential for our bio-coolant.',
    implementation:
      'Under Shubham’s direct mentorship we constructed and finalised the step-by-step process flow diagram for our microbial methyl myristate production route. Using the ecoinvent database made available through his lab, we modelled our inventory and executed a comprehensive life cycle assessment comparing BiFrost against incumbent coolants. The full quantitative results, impact category breakdowns and comparative findings are detailed on the LCA tab.',
    references: 'ecoinvent database (access granted through Prof. Shastri’s lab).',
  },
  {
    id: 'echa',
    name: 'ECHA',
    affiliation: 'European Chemicals Agency',
    photo: '/ihp-photos/echa.jpg',
    summary: 'Explained how the EU REACH PFAS restriction is assessed',
    date: '31/08/2026',
    purpose:
      'Our project was motivated by the proposed PFAS restriction under EU REACH, which affects the fluorinated fluids currently used in data centre immersion cooling. We were building the sustainability case for our bio-coolant as an alternative, but we only understood the restriction at a headline level: we did not know how regulators assess risk, weigh technical feasibility and alternatives, or set timelines. We asked for a brief call or a few thoughts over email on the assessment methodology used to evaluate impact and risk, how technical feasibility and safer alternatives were weighed, and the data points that shaped the restriction timeline.',
    keyTakeaway:
      'On status, as of our email on 31 August 2026: on 26 March 2026 ECHA’s RAC adopted its final opinion and SEAC issued a draft opinion, both supporting an EU-wide PFAS restriction with specific derogations plus measures to minimise emissions; a public consultation on the SEAC draft ran until 25 May 2026 and ECHA published its outcome on 3 June 2026, so the final SEAC opinion was still pending when we wrote. On classification, ECHA’s use-mapping places heat transfer fluids for immersion cooling inside the electronics and semiconductors sector and notes that both 1-phase and 2-phase immersion cooling may use PFAS as dielectric fluids, so immersion cooling is assessed as its own use. On derogations, the SEAC draft lists heat transfer fluids for 2-phase immersion cooling among the uses given a 13.5-year derogation; derogations come in a shorter form (18 months plus 5 years) and a longer form (18 months plus 12 years), so 13.5 years appears to be a transition window for 2-phase PFAS fluids rather than a permanent exemption. We could not confirm from our sources how 1-phase immersion fluids are treated, which matters most for us. SEAC’s opinion says any derogation should come with reporting obligations, site-specific PFAS management plans, and labelling and proof-of-origin requirements. On alternatives, SEAC assesses them sector by sector and application by application, and derogations are granted where evidence shows alternatives are not available and the costs and benefits justify it, so a derogation is temporary breathing room that depends on credible alternatives developing. The Danish EPA’s 2024 review of PFAS in electronics lists mineral oils, synthetic oils, natural oils and hydrocarbon fluids for immersion cooling and notes that industry stakeholders considered PFAS alternatives not readily available for the sector, while ChemSec’s Check Your Tech calls natural and synthetic ester-based fluids the most promising alternatives. From ECHA’s reply, RAC uses emissions as a proxy for risk, which is why the derogation conditions focus on emissions reporting and management.',
    contribution:
      'It grounded our project’s motivation in ECHA’s own framework instead of news articles: immersion cooling is a named use in the restriction, and the proposed derogations are time-limited, which shows a transition window for the sector. It showed that regulators judge alternatives sector by sector on availability, cost and benefit, so our sustainability argument should be framed the same way, a technically viable, PFAS-free option, not just an environmental claim. The derogation conditions (emissions reporting, management plans, proof of origin) show what regulators value, supporting our focus on a biodegradable, bio-based fluid with a certified source, which links to the bio-based content and RSPO points from Dr. Vadgama. It also reminded us that the rules are still moving, so we describe the restriction as a pending proposal with a dated status.',
    // TODO (team): the Drive document marks the Execution Strategy items as still to be verified
    // or linked ("[True once you've skimmed them]", "[Add where]"), so only the plan is published.
    implementation:
      'Our plan from this correspondence: use ECHA’s sector framing (electronics and semiconductors, with 1-phase and 2-phase immersion cooling) when describing the regulatory context for our coolant; frame the project as a PFAS-free alternative that regulators’ alternatives analysis would count as credible; present the restriction’s status with dates; and keep monitoring for the final SEAC opinion, including a check of ECHA’s PFAS page before the Jamboree.',
    references:
      'ECHA, “ECHA supports PFAS restriction with targeted derogations,” news release ECHA/NR/26/17, 26 March 2026, echa.europa.eu. ECHA, PFAS hot topics page (updates through June 2026), echa.europa.eu/hot-topics/perfluoroalkyl-chemicals-pfas. ECHA, SEAC draft opinion on the PFAS restriction (2026), echa.europa.eu. ECHA, PFAS use-mapping annex to guidance for respondents (electronics and semiconductors, immersion cooling). Danish Environmental Protection Agency (2024), PFASs and PFAS free alternatives in the Electronics and Energy sector: A summary. ChemSec (2023), Check Your Tech: A guide to PFAS in electronics. White & Case, “Europe’s PFAS restriction proposal is moving forward.”',
  },
];
