// Educational Outreach content.
// The LEARN hubs stay as the process breakdown; the events below are a single
// flat list in the order of "EO Flow" (DAY4/EO wiki content), not grouped by LEARN.
// Each event's six tabs follow the team's own outreach write-up template.

export type Block =
  | { t: 'p'; text: string }
  | { t: 'ul'; items: (string | [string, string])[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'quote'; text: string; by?: string }
  | { t: 'stats'; items: [string, string][] }
  | { t: 'awards'; items: string[] };

export type Tab = 'Purpose' | 'Who We Reached' | 'What We Did' | 'Key Takeaway' | 'Feedback' | 'References';

export type Doc = { title: string; file: string };

export type EventItem = {
  /** Short title shown on the bar. */
  name: string;
  /** One line under the title: date, partner or format. */
  meta?: string;
  photos?: string[];
  /** PDFs and CSVs shown in the Documents dropdown at the bottom of the card. */
  docs?: Doc[];
  /** A result worth seeing before opening any tab, shown as a banner at the top. */
  highlight?: { title: string; awards: string[]; note?: string };
  tabs: Partial<Record<Tab, Block[]>>;
};

/** Photos for an event, copied from "day 3/eo images" as public/eo/events/<slug>/01.jpg… */
const shots = (slug: string, n: number) =>
  Array.from({ length: n }, (_, i) => `/eo/events/${slug}/${slug}-${String(i + 1).padStart(2, '0')}.jpg`);

export const SUBTABS: Tab[] = ['Purpose', 'Who We Reached', 'What We Did', 'Key Takeaway', 'Feedback', 'References'];

/** Shown when an event has nothing written for a tab yet. */
export const SUBTAB_PROMPTS: Record<Tab, string> = {
  Purpose: 'Why this initiative? What gap or question prompted it?',
  'Who We Reached': 'Which audience did this reach, and how many people?',
  'What We Did': 'What did we actually run, build, or deliver?',
  'Key Takeaway': 'What did we learn, and what changed because of it?',
  Feedback: 'What did participants tell us afterwards?',
  References: 'Sources, links, and further reading.',
};

export type Hub = {
  letter: string;
  name: string;
  /** Label broken onto lines the way the Figma selector shows it. */
  lines: string[];
  desc: string;
};

export const HUBS: Hub[] = [
  {
    letter: 'L', name: 'Listen First', lines: ['Listen', 'First'],
    desc: 'Before teaching anything, we listened. Surveys, questionnaires, and stakeholder conversations mapped what people already knew, misunderstood, or feared about synthetic biology, evidence before assumption.',
  },
  {
    letter: 'E', name: 'Engage Minds', lines: ['Engage', 'Minds'],
    desc: 'With that groundwork laid, we turned listening into dialogue, sparking curiosity about synthetic biology through talks, quizzes, and collaborations that met people where their interest already was.',
  },
  {
    letter: 'A', name: 'Assemble Community', lines: ['Assemble', 'Community'],
    desc: 'Engagement became belonging. We convened students, clubs, and experts into a shared space, connecting people across disciplines so the conversation could outlast any single event.',
  },
  {
    letter: 'R', name: 'Reach Beyond Walls', lines: ['Reach Beyond', 'Walls'],
    desc: 'We carried the story past the campus gates, through digital series, comics, and interactive tools that made synthetic biology accessible to anyone with a phone and a question.',
  },
  {
    letter: 'N', name: 'Nurture What Grows', lines: ['Nurture', 'What', 'Grows'],
    desc: "iGEM ends; the resources shouldn't. We left behind open booklets, reusable simulations, and an impact dashboard so the next team, and anyone curious, can pick up where we left off.",
  },
];

export const EVENTS: EventItem[] = [
  // 1 ────────────────────────────────────────────────────────────────────────
  {
    name: 'BioTL: BioTinkerers’ Laboratory',
    docs: [{ title: 'BioTL proposal deck', file: '/iit-bombay/eo/docs/biotl/biotl-deck.pdf' }, { title: 'BioTL floor plan', file: '/iit-bombay/eo/docs/biotl/floor-plan.pdf' }, { title: 'BioTL interest survey responses (names removed)', file: '/iit-bombay/eo/docs/biotl/survey-responses.csv' }],
    photos: shots('biotl', 5),
    meta: 'A 24 x 7 student-run tinkering lab · MoU signed 11 March 2026 · @biotl.iitb',
    tabs: {
      Purpose: [
        { t: 'p', text: 'Culture it. Test it. Discover it. A permanent, student-run biology tinkering lab at IIT Bombay (2nd floor, DSSE), backed by a ₹2.5 crore gift from the IIT Bombay Class of 1966.' },
        { t: 'ul', items: [
          ['The gap.', 'Ideas in biology often die before they start. A formal research project demands a lab, funding and a clear scope; a curious student with a "what if?" has nowhere to try it. Software students can prototype on a laptop overnight, a biology student cannot.'],
          ['Our answer.', 'A student-run, collaborative tinkering space for future bio-entrepreneurs: a low-barrier place to design and run your own experiments with hands-on mentorship. Anyone can walk in, with zero prerequisites.'],
          ['The goal.', 'To build a community, not just a lab, where anyone can explore what is possible with biology.'],
          ['Why it matters to us.', 'Our outreach built curiosity about synthetic biology. BioTL gives that curiosity somewhere to go, and turns a year of events into infrastructure that stays after iGEM is over.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['₹2.5 cr', 'alumni gift, Class of 1966'], ['120', 'survey respondents'], ['21', 'inventory items placed']] },
        { t: 'ul', items: [
          ['The backers.', 'Alumni of the IIT Bombay Class of 1966. The MoU was signed with the Dean (Alumni and Corporate Relations), Prof. Upendra Bhandarkar.'],
          ['Mentors from within.', 'PhD students who volunteered to mentor undergraduates and run workshops.'],
          ['Future users from every background.', 'Respondents wanted to collaborate with Chemistry, Materials Science, Computer Science and AI, Entrepreneurship and Business, and Design.'],
          ['A student-led council.', 'Manager Yashika and four Conveners, Eshan, Siddhant, Tanvi and Aayush, with the whole iGEM IIT Bombay team.'],
          ['Expert recognition.', 'The AIIM 2026 judging panel called the BioTL makerspace a promising addition to our project.'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We did not just ask for a lab. We secured the money, designed the space, listened to the community, and built the structures that keep it safe and open.' },
        { t: 'table', head: ['Step', 'What we did', 'Result'], rows: [
          ['1. Fund it', 'Pitched the idea to alumni of the Class of 1966', '₹2.5 crore gift, MoU signed 11 March 2026'],
          ['2. Design it', 'Planned a 20 × 20 ft lab in two zones: culture and storage, working and instruments', '21 inventory items placed on the floor plan'],
          ['3. Equip it', 'Specified equipment for end-to-end synthetic biology', 'See the equipment table below'],
          ['4. Listen', 'Ran the BioTL Interest and Engagement Survey', 'Interest across six areas of biology and five partner disciplines'],
          ['5. Build the community', 'Student council, mentorship model, biosafety training before access', 'Open entry with responsible hands-on practice'],
        ] },
        { t: 'table', head: ['Area', 'Equipment'], rows: [
          ['Cold chain', '−80 °C freezer, −20 °C freezer, 4 °C cabinets ×2'],
          ['Culture and biosafety', 'CO₂ incubators ×2 (stacked), biosafety cabinets ×2, laminar air flow units ×2'],
          ['Molecular and analysis', 'PCR machines ×2, agarose gel apparatus ×2, SDS-PAGE apparatus ×2, gel documentation system, gel rockers ×2'],
          ['Preparation and support', 'High-speed cooling centrifuges ×2, 12 pipette workstations, magnetic stirrer, pH and vortex sets ×3, orbital shakers ×2, water purification, ice flake machine, water and dry baths, balances, microwave, sinks, storage cabinets ×3'],
        ] },
        { t: 'ul', items: [
          ['Two tracks, one space.', 'Wet lab: molecular biology, DNA extraction, SDS-PAGE, synthetic biology experiments. Computational biology: genomic sequence analysis, protein structure prediction, bio-algorithms and machine learning on complex biological data.'],
          ['Zero-prerequisite entry.', 'The launch session pairs a quiz with a hands-on strawberry DNA extraction that gives visible DNA in under five minutes, so someone who has never entered a lab can leave having done real biology.'],
          ['The roadmap.', 'Speaker Series, Research Mentorship, Wet Lab Training, Student-Led Research, and Project Showcases.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Outreach became infrastructure.', 'Our events built interest in synthetic biology; BioTL is where that interest turns into experiments, projects and startups. This answers the judges’ request for tangible outcomes from outreach with something lasting and physical.'],
          ['A gift of trust.', 'A cohort that graduated in 1966 put ₹25 million behind a student-run lab, validation that outreach rarely gets.'],
          ['A community model, not just equipment.', 'Mentorship, peer teaching, biosafety training and open entry are designed in from day one.'],
          ['Built to last beyond iGEM.', 'The lab is run by its own council and stays in the Institute after our competition year ends.'],
          ['The need is real.', 'The survey pointed to the same gaps again and again: freedom to explore outside core research, entrepreneurship, and rapid prototyping.'],
          ['Recognised by experts.', 'The AIIM 2026 panel highlighted BioTL, and our project won Best Human Practices and Best Overall Team at the same meet.'],
          ['Next.', 'Open the doors for the first Wet Lab Training cohort planned for the winter, and back the first student-led projects.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'BioTL Interest and Engagement Survey, 120 respondents. This was a first pulse-check, not a final census. Questions were multi-select, so shares do not add up to 100%.' },
        { t: 'table', head: ['What respondents said is missing today', 'Respondents', 'Share'], rows: [
          ['Freedom to explore ideas outside core research', '70 of 120', '58%'],
          ['Developing entrepreneurial ideas', '60 of 120', '50%'],
          ['Rapid prototyping and preliminary experiments', '50 of 120', '42%'],
          ['Cross-disciplinary collaboration', '40 of 120', '33%'],
          ['Personal and side projects', '40 of 120', '33%'],
        ] },
        { t: 'table', head: ['You said', 'BioTL’s answer'], rows: [
          ['"I need freedom outside my core research"', 'A student-run open lab where you design your own experiments'],
          ['"I want to develop entrepreneurial ideas"', 'A tinkering space for future bio-entrepreneurs, with Project Showcases'],
          ['"I need to prototype quickly"', '12 workstations plus culture, PCR, gel and analysis equipment on site'],
          ['"I want collaborators from other fields"', 'A computational track alongside the wet lab, open to Chemistry, Materials, CS and AI, and Design'],
          ['"Guide me"', 'Research Mentorship and Wet Lab Training'],
          ['"Keep it safe"', 'Biosafety cabinets and biosafety training before access, all 120 respondents were willing or open to it'],
        ] },
        { t: 'ul', items: [
          '80 of 120 respondents said they would mentor newer students (40 actively, 40 occasionally).',
          'Half (60 of 120) said they would definitely attend introductory workshops; the rest said probably or maybe.',
          'Mentors offered technical Q&A, teaching techniques, guiding projects, running workshops, and expertise from areas such as 3D bioprinting, molecular docking and drug formulation.',
          '60 of 120 expected to use BioTL about once a week or more.',
          'Half had not heard of BioTL before the survey, which tells us our launch communication matters.',
        ] },
      ],
      References: [
        { t: 'ul', items: [
          'MoU signing ceremony and ceremonial cheque handover, Class of 1966, IIT Bombay, 11 March 2026.',
          'BioTL Interest and Engagement Survey: results and method (an exploratory pilot; percentages from multi-select questions).',
          'BioTL floor plan: 20 × 20 ft, 21 inventory items, and the equipment list.',
          'BioTL launch presentation: "BioTinkerers’ Laboratory: Culture it. Test it. Discover it."',
          'AIIM 2026 write-up with the judges’ feedback.',
          'Instagram: @biotl.iitb',
          'Gallery: cheque handover, MoU signing and group photographs.',
          'Instagram post: https://www.instagram.com/p/Dd4Dv_ggnwX/',
        ] },
      ],
    },
  },

  // 2 ────────────────────────────────────────────────────────────────────────
  {
    name: 'AIIM 2026: All India iGEM Meet',
    docs: [{ title: 'Research poster', file: '/iit-bombay/eo/docs/aiim/research-poster.pdf' }, { title: 'Judging presentation', file: '/iit-bombay/eo/docs/aiim/judging-presentation.pdf' }],
    photos: shots('aiim', 18),
    meta: 'Best Human Practices and Best Overall Team',
    highlight: {
      title: 'Two awards at AIIM 2026',
      awards: ['Best Human Practices (iHP) Award', 'Best Overall Team Award'],
      note: 'Judges recognised our science, engineering and Human Practices together, singling out the breadth of our stakeholder engagement and the BioTL makerspace.',
    },
    tabs: {
      Purpose: [
        { t: 'p', text: 'The All India iGEM Meet (AIIM) 2026, hosted by IIT Madras, brought iGEM teams from across India together for scientific exchange, collaboration, networking and community building.' },
        { t: 'ul', items: [
          'Present BiFROST to different audiences, from informal visitors to the judging panel.',
          'Test our science and Human Practices against expert scrutiny.',
          'Connect with teams and stakeholders from across the country.',
        ] },
      ],
      'Who We Reached': [
        { t: 'ul', items: [
          'Fellow iGEM teams from across India.',
          'The judging panel, who evaluated our science, engineering, computational work and Human Practices.',
          'Organisers, students and other participants, who engaged with us at the poster stall and the project introduction session.',
          'Potential stakeholders and collaborators in the wider iGEM community.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We presented BiFROST at four levels, each pitched to a different audience:' },
        { t: 'table', head: ['Format', 'Audience', 'What we did'], rows: [
          ['1. Research poster stall', 'Students, teams, organisers, participants', 'Walked visitors through the problem, our science, our engineering strategy and the BiFROST vision. Visitors questioned our assumptions and gave new perspectives, which made it two-way.'],
          ['2. Project introduction (5 min)', 'The whole AIIM community', 'An interactive, audience-driven pitch with questions and prompts, so the audience thought through the problem alongside us.'],
          ['3. Judging presentation (15 min)', 'Judging panel', 'A jamboree-style presentation across all subdivisions, science, engineering, experiments, computation, Human Practices and future directions, then a detailed Q&A in which we defended our decisions.'],
          ['4. Project thesis (20+ pages)', 'Judging panel', 'A written record of problem definition, rationale, engineering, wet and dry lab work, Human Practices and goals.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'awards', items: ['Best Human Practices (iHP) Award', 'Best Overall Team Award'] },
        { t: 'ul', items: [
          ['Recognised across the whole project.', 'The awards acknowledged our science, engineering, Human Practices and interdisciplinary work together, not one strong area.'],
          ['Strong under scrutiny.', 'We held up across 4 formats, from informal poster conversations to a judge Q&A where we defended our decisions.'],
          ['Stakeholder engagement stood out.', 'Judges highlighted the breadth and diversity of our Human Practices work.'],
          ['The experience was two-way.', 'Questions from participants and judges helped us see parts of BiFROST we couldn’t see from inside the team.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'What the judges praised' },
        { t: 'table', head: ['Area', 'Feedback'], rows: [
          ['Problem definition', 'Clear from the outset, backed by quantitative evidence and an extensive literature review'],
          ['Science', 'Fatty acid synthesis in S. cerevisiae, supported by structural analysis, mutagenesis and metabolic modelling, called a well-considered approach'],
          ['Integration', 'Wet lab, dry lab and literature work came together as one coherent narrative'],
          ['Human Practices', 'Breadth and diversity of stakeholder engagement particularly appreciated'],
          ['Realism', 'We acknowledged the limits of existing approaches instead of overstating our solution'],
          ['Technical understanding', 'Strong grasp of the rationale behind our design and method choices'],
          ['Future direction', 'Next steps and applications well defined'],
          ['BioTL', 'The makerspace initiative was recognised as a promising addition'],
          ['Interdisciplinarity', 'The team’s mixed backgrounds and collaboration were highlighted'],
        ] },
        { t: 'p', text: 'What the judges suggested: our next steps' },
        { t: 'ul', items: [
          ['Functional validation.', 'Confirm that our mutations change fatty-acid profiles as intended.'],
          ['Quantify fatty-acid profiles.', 'Show the relative proportions of species alongside production differences.'],
          ['Product recovery and purification.', 'Plan how to recover the cooling molecules from the broth, especially at scale.'],
          ['Long-term stability.', 'Test oxidative stability during prolonged operation.'],
          ['Translational feasibility.', 'Work out how BiFROST could become an industrially viable, competitive solution.'],
          ['Human Practices outcomes.', 'Go beyond reach and participation to show tangible outcomes; our outreach already has some: 88 of 90 students interested in synbio after our simulation, multiple industry collaboration offers at TechConnect, and an invitation to present at Junicorn.'],
          ['Local context.', 'Add local data and stakeholder perspectives.'],
          ['Communication.', 'Spend more presentation time on BiFROST’s engineering and results, with more concise, visual slides.'],
        ] },
      ],
      References: [
        { t: 'ul', items: ['AIIM 2026, IIT Madras', 'Research poster (PDF)', 'Project introduction presentation (PDF)', 'Judging presentation (PDF)', 'Project thesis, 20+ pages (PDF)'] },
      ],
    },
  },

  // 3 ────────────────────────────────────────────────────────────────────────
  {
    name: 'SYNBIOCON 2026',
    docs: [{ title: 'Conference schedule', file: '/iit-bombay/eo/docs/synbiocon/conference-schedule.pdf' }, { title: 'SynBioCon 2026 brochure', file: '/iit-bombay/eo/docs/synbiocon/synbiocon-brochure.pdf' }, { title: 'Participation certificate (template)', file: '/iit-bombay/eo/docs/synbiocon/participation-certificate-template.pdf' }],
    photos: shots('synbiocon', 19),
    meta: 'iGEM IIT Bombay × iGEM IIT Kharagpur · 7–8 March 2026 · synbiocon2026.in',
    tabs: {
      Purpose: [
        { t: 'p', text: '"Inspiring the nation, one gene at a time", a pan-India conference on Microsoft Teams. Speaker sessions were livestreamed at IIT Kharagpur for on-campus participants, and the bioinformatics workshop ran as live hands-on training.' },
        { t: 'ul', items: [
          ['The gap.', 'Synthetic biology students in India mostly learn in separate academic silos. They rarely meet leading researchers and industry leaders in the same place, and few get hands-on computational training. Many students never see how a research idea becomes a product, a manufacturing process, or a company.'],
          ['Our answer.', 'SYNBIOCON 2026, an IIT Bombay × IIT Kharagpur collaboration. We made it virtual and free to register so that cost and travel would not stop students from joining.'],
          ['The goal.', 'To strengthen the synbio ecosystem by linking academia, industry and the student community, and to show how scientific ideas become real-world solutions.'],
        ] },
        { t: 'ul', items: [
          ['Industrial exposure.', 'Give students a realistic picture of the biotech R&D lifecycle and commercialisation.'],
          ['Innovation showcase.', 'Highlight projects from iGEM teams to show how versatile synthetic biology is.'],
          ['Skill development.', 'Offer workshops in bioinformatics and the tools used in modern bio-industrial design.'],
          ['Networking.', 'Connect undergraduates with researchers and industry leaders.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['200+', 'participants'], ['6', 'speakers'], ['3', 'iGEM teams in the showcase']] },
        { t: 'p', text: 'Students, researchers, professionals and enthusiasts from across the country.' },
        { t: 'table', head: ['Speaker', 'Affiliation', 'Area'], rows: [
          ['Prof. Yvonne Y. Chen', 'UCLA', 'Cellular systems engineering, immunology'],
          ['Dr. Syed Shams Yazdani', 'ICGEB', 'Microbial engineering, synthetic and systems biology'],
          ['Prof. Barbara Di Ventura', 'University of Freiburg', 'Synthetic biology, cellular systems engineering'],
          ['Mr. Rajesh Kumar Kante', 'Serum Institute of India', 'Research, development and manufacturing'],
          ['Mr. Nitin Vaish', 'Former BD & Strategy Lead, Ginkgo Bioworks', 'Industrial biotech, agriculture, sustainability'],
          ['Mr. Kishin Inoue', 'iGEM Okinawa', 'Their iGEM projects as a high school team'],
        ] },
        { t: 'ul', items: [
          ['iGEM teams in the showcase.', 'iGEM IIT Bombay, iGEM Kharagpur and iGEM Okinawa.'],
          ['Reach beyond the venue.', 'Two IITs, plus an international speaker and team, meant participants met the wider global community in one programme. The official website, built and managed by us, carried the schedule, speakers, workshop details and registration.'],
        ] },
      ],
      'What We Did': [
        { t: 'table', head: ['Component', 'What happened', 'What participants gained'], rows: [
          ['1. Speaker sessions', 'Five talks across two days, mixing academic research with industry experience', 'A bridge from textbook to research, technology and industry'],
          ['2. Bioinformatics workshop', 'Two sessions of live, hands-on training on systems biology, circuit modelling and biosensors, with discussion', 'Practical computational skills beyond regular coursework'],
          ['3. iGEM project showcase', 'Interactive presentations by three iGEM teams. We presented AureoLyze; iGEM Okinawa presented their work', 'Open discussion, doubt-clearing and peer learning'],
          ['4. Official website', 'We built and managed the SYNBIOCON 2026 site', 'One digital home for information and registration'],
        ] },
        { t: 'table', head: ['', 'Day 1 (7 March)', 'Day 2 (8 March)'], rows: [
          ['Morning', 'Prof. Yvonne Y. Chen (UCLA), then iGEM Okinawa presented their work', 'Mr. Nitin Vaish (Ginkgo Bioworks), then bioinformatics workshop (11:00–13:00)'],
          ['Midday', 'Mr. Rajesh Kumar Kante (Serum Institute of India), then lunch', 'Lunch'],
          ['Afternoon', 'Dr. Syed Shams Yazdani (ICGEB), then bioinformatics workshop (16:00–18:30)', 'iGEM IIT Bombay showcase, then a second iGEM team showcase'],
          ['Evening', 'N/A', 'Prof. Barbara Di Ventura (University of Freiburg)'],
        ] },
        { t: 'ul', items: [
          ['Design choices.', 'Every part of the programme was interactive, so participants could ask questions, work with data and talk directly with teams instead of only listening. The programme alternated research talks with industry talks, and the showcase slots gave participants a break from lectures. Participants also received certificates.'],
          ['Our role as organisers.', 'We invited and coordinated the speakers, built the schedule, handled registration and Teams links, ran the website, issued certificates and coordinated logistics, and built on our own knowledge through the presentations of our distinguished speakers.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['A national platform with real scale.', '200+ participants over two days, with speakers from UCLA, Freiburg, ICGEB, the Serum Institute of India and Ginkgo Bioworks.'],
          ['Academia and industry on one stage.', 'Participants saw how an idea moves from fundamental research to manufacturing and sustainable impact.'],
          ['From theory to practice.', 'The two-session bioinformatics workshop gave participants hands-on computational skills and showed how computation and experiments work together.'],
          ['Peer learning at the showcase.', 'Participants questioned three iGEM teams directly, and we presented AureoLyze to a new audience.'],
          ['Digital reach.', 'The official website made the conference accessible beyond the live sessions.'],
          ['For us.', 'It widened our view of the field beyond our own project and built connections across the synthetic biology ecosystem.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'More than 200 people attended and 50 gave us feedback. They came from IIT Kharagpur, IIT Bombay, NIT Agartala, KIIT, Gujarat University, Madras Christian College, DY Patil University, the Regional Centre for Biotechnology and several other institutions, BTech, MSc and PhD students, and at least one industry professional.' },
        { t: 'table', head: ['Item (1–5 scale, n = 49)', 'Average', 'Rated 4 or 5'], rows: [
          ['Bioinformatics workshop', '4.67', '49 of 49 (100%)'],
          ['Talk by Dr. Rajesh Kante (Serum Institute of India)', '4.57', '46 of 49 (94%)'],
          ['Organisation and scheduling', '4.57', '47 of 49 (96%)'],
          ['Talk by Prof. Yvonne Y. Chen (UCLA)', '4.55', '48 of 49 (98%)'],
          ['Relevance of topics to my interests', '4.51', '46 of 49 (94%)'],
          ['Talk by Dr. Syed Shams Yazdani (ICGEB)', '4.49', '46 of 49 (94%)'],
          ['Online platform and session links', '4.47', '43 of 49 (88%)'],
          ['iGEM Okinawa project showcase', '4.24', '41 of 49 (84%)'],
        ] },
        { t: 'p', text: 'Would you attend SynBioCon again? 47 said yes and 2 said maybe. Nobody said no.' },
        { t: 'ul', items: [
          ['Favourite session (40 free-text answers).', 'The bioinformatics workshop was most named (about 18 mentions). Participants valued doing the work themselves, InterPro, multiple sequence alignment, phylogenetic trees and protein structure mapping in Google Colab.'],
          ['Next.', 'Prof. Yvonne Y. Chen’s CAR-T and cancer immunotherapy talk (about 10), praised for being clear and engaging; then Dr. Rajesh Kante’s talk (about 8), valued for showing the full path from lab research to industrial vaccine manufacturing.'],
        ] },
        { t: 'quote', text: 'I could not only listen but also do it.', by: 'workshop participant' },
        { t: 'ul', items: [
          ['What participants wanted improved.', 'Workshop logistics (roughly a third of the suggestions): setup instructions and software requirements before the event, a pre-session to get systems ready, more time and a slower pace, clearer communication during the practicals, more than one coordinator and better audio.'],
          ['Also requested.', 'Session recordings for later review, study materials a week ahead, more interaction and Q&A time, a bit more gap between sessions, another industry expert from pharma or biotech, and offline access to the workshop material.'],
          ['Topics for future editions.', 'CRISPR and gene editing (about 9 participants) was the most popular request, then genomics, NGS and omics, AI and machine learning in biology, systems biology, genetic circuit design, bioprocessing and fermentation, vaccine manufacturing, molecular docking and network pharmacology.'],
        ] },
      ],
      References: [
        { t: 'ul', items: [
          'SYNBIOCON 2026, IIT Bombay × IIT Kharagpur, 7–8 March 2026.',
          'Official website: https://www.synbiocon2026.in/',
          'Speaker announcement posters and the programme schedule.',
          'Invitation poster and session-links page.',
          'AureoLyze showcase presentation.',
          'Participant survey: the questionnaire and a summary of the responses.',
          'Gallery and screenshots of the website.',
        ] },
      ],
    },
  },

  // 4 ────────────────────────────────────────────────────────────────────────
  {
    name: 'SynBio Explorers at AECS No. 3',
    docs: [{ title: 'Activity booklet', file: '/iit-bombay/eo/docs/aecs/activity-booklet.pdf' }, { title: 'Chromatography session slides', file: '/iit-bombay/eo/docs/aecs/chromatography-slides.pdf' }, { title: 'iGEM introduction slides', file: '/iit-bombay/eo/docs/aecs/igem-introduction.pdf' }],
    photos: shots('aecs', 13),
    meta: 'Atomic Energy Central School No. 3 · 80+ Grade 8 students · our flagship school visit',
    tabs: {
      Purpose: [
        { t: 'quote', text: 'What if you could turn a banana into an orange?' },
        { t: 'ul', items: [
          ['The gap.', 'School biology is mostly memorising diagrams and definitions. Students rarely touch, see or question the science, and synthetic biology is almost never introduced at school level. For most students, DNA is a picture in a textbook, not something they have ever seen.'],
          ['Our answer.', 'SynBio Explorers, our flagship school outreach initiative. Instead of opening with "What is synthetic biology?" and a list of definitions, we opened with that question.'],
          ['The goal.', 'Give students a first glimpse into how scientists work with biology: look closer, find out what’s there, understand it, then ask "what could we change?"'],
          ['Why it mattered to us.', 'Synthetic biology in India needs a pipeline of curious young people. We wanted to plant that curiosity early, in a classroom, with no prior background needed.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['80+', 'Grade 8 students'], ['3', 'wet-lab stations'], ['100%', 'hands-on participation']] },
        { t: 'ul', items: [
          ['One of our largest single-session cohorts.', '80+ Grade 8 students at AECS No. 3.'],
          ['Zero passive spectating.', 'Every student extracted genomic DNA, ran chromatography strips, focused microscope lenses and solved booklet challenges.'],
          ['A full-day scientific ecosystem.', 'Three wet-lab experiment stations, a bespoke illustrated activity workbook, an open-floor inquiry session, a digital lab simulator and a closing quiz.'],
          ['The near-peer advantage.', 'Facilitated by undergraduate engineering and science researchers. Near-peer facilitation broke down intimidation and turned the "distant scientist" stereotype into approachable mentorship.'],
          ['Physical-to-digital continuity.', 'Our Gene Cloning Simulation website let students bridge tactile wet-lab discoveries into digital genetic design.'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We architected SynBio Explorers around an intuitive scientific storyline: investigate, isolate, visualise, engineer.' },
        { t: 'table', head: ['Experiment', 'What students did', 'What it showed'], rows: [
          ['01 DNA extraction', 'Lysed banana cell walls, precipitated genomic material and spooled visible white strands of DNA into test tubes', 'The textbook became tangible: DNA stopped being an abstract drawing and became a real structure they could hold'],
          ['02 Chromatography', 'Spotted pigment mixtures onto paper and watched capillary action separate uniform ink into its constituent colours', 'Demystified the invisible: how analytical scientists break complex mixtures apart to uncover hidden building blocks'],
          ['03 Microscopy', 'Prepared wet mounts, operated fine focus knobs and resolved living cellular architecture beneath ordinary surfaces', 'Reframed reality: the microscopic realm out of the textbook and into sharp focus'],
        ] },
        { t: 'ul', items: [
          ['The custom activity booklet.', 'An illustrated field workbook of visual puzzles, conceptual maps and thought experiments, designed to take home and revisit, not a worksheet of definitions.'],
          ['The unfiltered "But why?" forum.', 'An open-floor session where curiosity drove the agenda. Questions sparked by science videos, everyday observations and mid-experiment surprises became room-wide discussions.'],
          ['Digital gene cloning simulation.', 'Students navigated our interactive web platform to simulate recombinant gene design and molecular cloning workflows.'],
          ['High-stakes interactive showdown.', 'A fast-paced closing quiz. Hands flew up within seconds, with students confidently explaining concepts that were completely new to them hours earlier.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Touch before theory.', 'Introducing DNA, chromatography and microscopy through hands-on manipulation meant foundational principles were grasped intuitively and retained.'],
          ['Curiosity as the primary metric.', 'Success was never measured by quiet compliance, but by a room buzzing with follow-up questions, edge cases and genuine wonder.'],
          ['High-touch rigour at scale.', 'Managing 80+ students across multiple benches showed that ambitious wet-lab outreach can scale without sacrificing depth.'],
          ['A fundamental paradigm shift.', 'Science ceased being a static list of exam definitions and became something real to touch, question, experiment with and ultimately engineer.'],
          ['The learning outlasts the session.', 'The activity booklet gave every student something to revisit at home.'],
        ] },
        { t: 'p', text: 'We did not turn a banana into an orange that afternoon. But we left a room of eighty students looking at living systems not as static facts to memorise, but as a code waiting to be explored. That is the exact moment a SynBio Explorer is born.' },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['Spontaneous intellectual momentum.', 'Questions required no prompting; discussions cascaded from lab benches into thoughtful debates on biotechnology and genetic modification.'],
          ['Immediate conceptual recall.', 'Speed and precision during the final quiz demonstrated authentic understanding rather than short-term memorisation.'],
          ['Long-term engagement.', 'Students carried their annotated workbooks home to share with peers and family rather than leaving them behind.'],
        ] },
        { t: 'quote', text: 'It was so awesome, can you guys come back soon?', by: 'Grade 8 student, AECS No. 3' },
        { t: 'quote', text: 'They really enjoyed it; it is always so nice to see students teaching other students.', by: 'School faculty, AECS No. 3' },
        { t: 'p', text: 'When middle school students ask researchers to come back immediately, it is the clearest proof that real curiosity was ignited. The school’s comment confirms that peer-led teaching made the content more approachable.' },
      ],
      References: [
        { t: 'ul', items: [
          'AECS No. 3 school visit: field report, curriculum guide and session schedule.',
          'SynBio Explorers activity booklet: illustrated print-ready educational workbook.',
          'Gene Cloning Simulation platform: digital lab write-up, interface and educational modules.',
          'AECS educational outreach write-up: programme metrics and educational impact summary.',
          'Gallery: Gyan Samvardhan SynBio Explorers by iGEM IIT Bombay.',
        ] },
      ],
    },
  },

  // 5 ────────────────────────────────────────────────────────────────────────
  {
    name: 'GnaanU 2026',
    docs: [{ title: 'Blood testing session slides', file: '/iit-bombay/eo/docs/gnaanu/blood-testing-slides.pdf' }],
    photos: shots('gnaanu', 9),
    meta: 'GnaanU (NGO) × iGEM IIT Bombay × IITB Biology Club · classes 6–8 · 16 January 2026',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'For most school students in classes 6–8, biology is a textbook subject. They rarely see a cell, extract DNA or run a test in a lab, and these are the years when curiosity about science is decided. Many of the students GnaanU works with also have little access to well-equipped labs.'],
          ['Our answer.', 'GnaanU partners with IIT Bombay’s tech clubs every year to show 500+ children how technology and science come to life. We joined this programme with the IIT Bombay Biology Club to bring the biology side: three short, hands-on sessions that turn textbook ideas into things students can see and do.'],
          ['Our goal.', 'To make biology feel concrete and exciting, to show that real science can be done with simple materials, and to plant the idea that students their age can become scientists.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['500+', 'students reached'], ['6–8', 'school classes'], ['10+', 'volunteers']] },
        { t: 'ul', items: [
          'Students of classes 6 to 8.',
          'GnaanU: an NGO that runs this programme each year with IIT Bombay’s tech clubs.',
          'Volunteers: 10+ from iGEM IIT Bombay and the IITB Biology Club.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We ran three activities, each built around a different level of biology: cells, molecules and microbes.' },
        { t: 'table', head: ['Activity', 'Concept', 'What students learned and did'], rows: [
          ['1. Blood testing', 'Blood as the body’s delivery system; blood types', 'A short, story-led presentation, then a child-friendly blood test'],
          ['2. Fruit DNA isolation', 'DNA is in every living thing, and can be extracted', 'Mash fruit, add a detergent-based lysis solution and salt, filter, then add cold alcohol so white, stringy DNA appears'],
          ['3. Gram staining and microscopy', 'Bacteria differ in their cell walls, and we can see the difference', 'Smear, stain and observe under the microscope to tell Gram-positive from Gram-negative bacteria and notice their shapes'],
        ] },
        { t: 'p', text: 'How we designed the blood session for this age group, a slide deck called "The Secret Code in Your Veins!", built around a superhero theme:' },
        { t: 'ul', items: [
          ['Everyday analogies.', 'Blood as a highway and delivery system, red cells as oxygen delivery trucks, white cells as the police force, platelets as the construction crew, and plasma as the river everyone floats in.'],
          ['Properties.', 'Colour, saltiness, body temperature and thickness, shown with a microscope image of real blood cells.'],
          ['Blood types.', 'Antigens explained as "nametags" on red blood cells, with a lock-and-key picture of how antibodies are used in testing.'],
          ['Clotting.', 'Four steps from cut to scab, showing how platelets and fibrin repair the body.'],
          ['Why blood drives matter.', 'One donation can help up to three people.'],
          ['Future technology.', 'Microneedle patches, laser-based testing and smart watches as painless ways of testing blood.'],
          ['Student comfort.', 'A slide asked children to tell us if they were scared of blood.'],
          ['Safety and ethics.', 'Our session plan lists sterile collection, protective equipment, sharps disposal and biohazard waste handling for the blood test, plus aseptic technique, flame safety and slide disposal for Gram staining.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Real experiments work for young students.', 'Classes 6–8 handled DNA isolation, staining and microscopy.'],
          ['Analogies carried the science.', 'The superhero and delivery-system framing let us explain antigens, antibodies and clotting without jargon.'],
          ['Three formats, one message.', 'Biology is something you can see and do, whether at the level of cells, molecules or microbes.'],
          ['Partnering through an established NGO.', 'It let us reach students we could not have reached alone, and gave us a ready structure for the event.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['Reach.', '500+ students.'],
          ['What it taught us.', 'Explaining blood typing and DNA to 11- to 13-year-olds forced us to simplify without being inaccurate, which sharpened our own communication for judges and the public.'],
          ['Future collaboration.', 'GnaanU were keen to organise more events with us.'],
        ] },
      ],
      References: [{ t: 'ul', items: ['Slide decks: "The Secret Code in Your Veins!" and the session plan.', 'Photos from the session.'] }],
    },
  },

  // 6 ────────────────────────────────────────────────────────────────────────
  {
    name: 'The AI Cooling Crisis Audit (Survey)',
    docs: [{ title: 'Survey responses (anonymised)', file: '/iit-bombay/eo/docs/survey/survey-responses.csv' }],
    meta: 'Two-round online survey · 62 respondents · pilot 23 June to 7 July, main round 13 to 19 October 2026',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'AI data centres are driving a water and power crisis, and bio-manufactured coolants are a proposed fix. Yet nobody had asked the public what they know, what they fear, and what proof they would need before trusting a living-organism-made coolant in the infrastructure behind the AI tools they use every day.'],
          ['Our answer.', 'The AI Cooling Crisis Audit, a two-round online survey run by iGEM IIT Bombay that doubles as a learning experience. Participants ranked trade-offs, argued through dilemmas, and told us what they would say to tech leaders.'],
          ['The goal.', 'Find out what the public understands, worries about and demands, and use it to shape our project’s design, safety case and communication. We also wanted participants to leave with a sharper view of the problem.'],
          ['How it started.', 'Our human-practices work asks what society wants from a technology, before we decide how to build it.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'ul', items: ['62 respondents in total, from India.'] },
        { t: 'table', head: ['Age range', 'Respondents', 'Share'], rows: [
          ['Under 18', '6', '10%'], ['18–24', '36', '58%'], ['25–34', '1', '2%'], ['35–49', '14', '23%'], ['50 and above', '5', '8%'],
        ] },
        { t: 'table', head: ['Background', 'Respondents'], rows: [
          ['Engineering', '16'], ['Computer science, AI, ML', '13'], ['Student (not yet specialised)', '9'], ['Business, finance, policy', '6'],
          ['Arts, humanities, social sciences', '3'], ['Mixed backgrounds (picked 2 or more)', '15, of which 9 include synthetic biology or life sciences'],
        ] },
        { t: 'ul', items: [
          ['iGEM connection (n = 11 who answered).', '6 on an active team, 1 alumnus, 3 familiar with iGEM and 1 new to it.'],
          ['Scale and setting.', 'Online, open to the public, shared through WhatsApp groups, campus channels, LinkedIn and iGEM networks.'],
          ['Reach beyond the event.', 'Respondents who offered to contribute through igem.iitb@gmail.com, mentors who asked for the results, and other iGEM teams who want to reuse the survey.'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'A two-round public "audit" that moved from awareness, to ranking trade-offs, to ethical dilemmas, to an India-specific module, and ended by asking whether the survey itself changed anyone’s mind.' },
        { t: 'table', head: ['Activity / Step', 'What participants did', 'What it showed or taught'], rows: [
          ['1. Pilot round (6 responses, 23 June to 7 July)', 'Took the long form, including safety, disclosure and company-decision questions', 'Which questions worked, and early signals on safety and disclosure'],
          ['2. Awareness baseline', 'Reported how much they knew about data-centre water and energy use, and about liquid immersion cooling', 'How big the gap is between knowing the problem and knowing the solution'],
          ['3. Ranking exercises', 'Ranked 4 consequences of data-centre heat by how much each worries them, then ranked 4 factors tech companies should prioritise', 'Forced trade-offs showed what people truly value, not just what they say they value'],
          ['4. Synbio attitudes and trust', 'Gave their stance on engineered organisms in industry, picked applications they would accept, and rated trust in academic institutions', 'Where public comfort with synthetic biology starts and stops'],
          ['5. Dilemmas', 'Weighed the Jevons Paradox, speed against biosafety, and a company choice between two coolant options', 'How people reason about rebound effects and risk, not only what they conclude'],
          ['6. India module (56 responses)', 'Said which real Indian data-centre controversies and policies they knew, then wrote one sentence to tech leaders and policy-makers about a city rationing drinking water next to a data centre', 'How much local reality has reached the public, plus raw moral language we can learn from'],
          ['7. Reflection', 'Said which of their views the survey changed', 'A direct measure of the survey’s influence'],
        ] },
        { t: 'ul', items: [
          ['What we built ourselves.', 'The survey form, an India module covering real developments (Vizag, Thane/Balkum, Bhogapuram, Ratnagiri, IndiaAI Mission, Semicon India), a Jevons Paradox question, and a two-option coolant case study.'],
          'We used ranking instead of rating so people had to choose between water, grid power, carbon and heat.',
          'Dilemma questions said "there is no right answer", to avoid leading respondents.',
          'The India module started from real local stories instead of abstract numbers.',
          'We closed with a reflection question to measure change in views.',
          'The main round used a shorter form than the pilot, with an added India section.',
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Headline result.', '62 people across 3 countries, from under 18 to over 50, told us that water comes first: 34 of 62 (55%) ranked water consumption as their top worry, and 34 of 62 (55%) ranked water conservation as the top priority for cooling technology.'],
          ['Impact on the audience.', '45 of 54 (83%) said the survey changed or nuanced at least one of their views. 26 of 54 (48%) said it changed how seriously they see the data-centre crisis.'],
          ['What worked.', 'Forced ranking and real Indian examples. Forty of 56 India-module respondents (71%) wrote a full sentence to tech and policy leaders. Most people who saw this question chose to answer it.'],
        ] },
        { t: 'table', head: ['Finding', 'Evidence', 'Why it matters for our project'], rows: [
          ['Water is the public’s top concern', '34 of 62 (55%) ranked it #1 worry; 54 of 62 (87%) ranked it #1 or #2', 'Lead with water savings in our communication'],
          ['Cost matters least to the public', '38 of 62 (61%) ranked cost and performance last', 'A "green but costly" message may still land'],
          ['Awareness of the problem is high, of the solution low', '54 of 62 (87%) had heard of the problem; 21 of 62 (34%) had never heard of immersion cooling; only 5 of 56 (9%) knew of bio-based coolants in India', 'Our work fills a real awareness gap'],
          ['Public is open to industrial synbio, with conditions', '41 of 62 (66%) supportive; 24 (39%) only "with conditions"', 'Safety and containment have to be visible'],
          ['Industrial uses are the easiest to accept', '46 of 62 (74%) accept engineered microbes for coolants or polymers, versus 27 (44%) for engineered crops', 'Our application sits in the most accepted category'],
          ['Trust in researchers is conditional', '31 of 62 (50%) moderate trust, 24 (39%) high, 7 (11%) low or very low', 'Publish data and invite independent checks'],
          ['Rebound effects divide opinion', '21 (34%) net positive, 18 (29%) neutral, 14 (23%) net negative, 9 (15%) unknowable', 'We must show that cheaper cooling does not simply mean more data centres'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['Awareness.', '28 of 62 (45%) already followed the topic closely and 26 (42%) knew a little, while 8 (13%) knew vaguely or nothing.'],
          ['Engagement.', 'Respondents wrote 40 one-sentence messages to leaders, 22 comments on the survey and 13 answers on unsolved problems for bio-based materials.'],
          ['India’s local stories had real reach.', '47 of 56 (84%) knew at least one data-centre development. 27 (48%) knew of the Vizag protests, 26 (46%) the Thane/Balkum protests, and 17 (30%) the water-footprint controversies.'],
          ['Cooling policy shifts are less known.', 'Only 13 (23%) knew of the move to dry air cooling.'],
        ] },
        { t: 'quote', text: 'Who are you even making this technology for, if the common man is suffering?' },
        { t: 'quote', text: 'Prioritize people not performance.' },
        { t: 'quote', text: 'If there are no people then who will use your technology?' },
        { t: 'quote', text: 'Get to the first few field trials as soon as you can... Fail fast and adapt faster.' },
        { t: 'quote', text: 'Will building new data centres which use immersion cooling need heavy government involvement, will AI companies lobby against it?' },
        { t: 'ul', items: [['What people wanted to verify (n = 6 who answered).', 'Net carbon, water and energy savings once making the coolant is counted; cost against petroleum coolants; durability; comparison with what it replaces; and whether it would "increase the opportunity of more data centers".']] },
        { t: 'table', head: ['Question (pilot round only, small n, treat as directional)', 'Result'], rows: [
          ['What would make you confident in a bio-coolant? (n = 11)', 'Regulatory approval 9, life-cycle analysis 9, peer-reviewed performance data 8, biodegradability certification 6, contained bioreactor manufacturing 5, adoption by a major tech company 5'],
          ['Speed against biosafety (n = 11)', 'Parallel track 4, safety first 4, case by case 2, speed first 1'],
          ['Company choice between two options (n = 6)', 'Blended deployment 5, delay until 5 years of data 1'],
          ['Should cooling technology be disclosed, like food ingredients? (n = 6)', 'Mandatory 4, summary level 2, no disclosure 0'],
          ['Personal responsibility for AI’s environmental cost (n = 11)', '9 of 11 (82%) feel at least some responsibility'],
          ['Effect of bio-coolant on how you see AI tools (n = 6)', 'Slightly more positive 3, no change 2, more cautious 1'],
        ] },
        { t: 'table', head: ['You said', 'We did'], rows: [
          ['"Keep survey shorter"', 'We iterated the survey multiple times; the main round used a shorter form than the pilot'],
          ['"A deeper explanation of what a biocoolant is"', 'Added a reference to our wiki'],
          ['"Validate human safety for any allergy occurrences"', 'Our research team has set this research goal for the next tenure'],
          ['"Does making the coolant use as much energy and water as it saves?"', 'We have fully decoded our LCA on our wiki'],
        ] },
        { t: 'ul', items: [
          ['Limits we want to be honest about.', 'This is a convenience sample, with 58% aged 18–24 and 89% from India. The respondents were already informed: 54 of 62 (87%) had heard of the problem. The two form versions mean several questions have small samples (n = 6 to 11). The survey was not a controlled study.'],
          ['What it told us.', 'People care about water above everything, ask who benefits, and want proof before trust. The strongest public question was our own: does cheaper cooling just mean more data centres?'],
        ] },
      ],
      References: [
        { t: 'ul', items: [
          'AI Cooling Crisis Audit, run by iGEM IIT Bombay, pilot 23 June to 7 July 2026 and main round 13 to 19 October 2026.',
          'Survey link: https://forms.gle/DztpBMEQn43cEQt56',
          'Responses sheet (anonymised): in the Event Archive below.',
        ] },
      ],
    },
  },

  // 7 ────────────────────────────────────────────────────────────────────────
  {
    name: 'TechConnect at TechFest',
    docs: [{ title: 'Breaking the Biofilm Barrier: research poster', file: '/iit-bombay/eo/docs/techconnect/biofilm-poster.pdf' }, { title: 'Team iGEM IIT Bombay at TechConnect', file: '/iit-bombay/eo/docs/techconnect/team-igem-techconnect.pdf' }, { title: 'Stall video 1', file: '/iit-bombay/eo/docs/techconnect/stall-video-1.mp4' }, { title: 'Stall video 2', file: '/iit-bombay/eo/docs/techconnect/stall-video-2.mp4' }, { title: 'Stall video 3', file: '/iit-bombay/eo/docs/techconnect/stall-video-3.mp4' }, { title: 'Stall video 4', file: '/iit-bombay/eo/docs/techconnect/stall-video-4.mp4' }],
    photos: shots('techconnect', 3),
    meta: 'IIT Bombay TechFest: Asia’s largest technology fest · 1,000+ stall visitors',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Synbio in India is still small, and few people outside biology know what undergraduates can build in it.'],
          ['Our goal.', 'Show India what UG students can innovate in synbio, and make the case that synbio in India needs to grow.'],
          ['The stage.', 'TechConnect at IIT Bombay’s TechFest, Asia’s largest technology fest (200,000+ visitors), where 100+ teams and research groups showcased projects.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['1,000+', 'stall visitors (estimated)'], ['100+', 'teams exhibiting'], ['200,000+', 'TechFest visitors']] },
        { t: 'ul', items: [
          '1,000+ visitors at our stall (estimated footfall).',
          'The Chief of Defence Staff of India visited our stall while leading Defence Symposium 2.0.',
          'Every audience: school students, entrepreneurs, professors, deans, industry professionals and defence officers.',
          'From across India, plus international professors and industry representatives.',
          'One of the very few biology stalls among 100+ teams.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'A four-step stall flow that took visitors from "what is synbio?" to "I want to know more":' },
        { t: 'table', head: ['Step', 'What visitors did', 'Purpose'], rows: [
          ['1. Simulation website', 'Ran the gene cloning simulation', 'Hands-on first feel for synbio'],
          ['2. Posters', 'Walked through 6 posters on our iGEM projects CalciCapture and AureoLyze (technical R&D and overview)', 'Link the basics to real research'],
          ['3. Microscopes', 'Viewed 40+ slides, with a presentation explaining each slide’s mode of transportation', 'Make the science visible'],
          ['4. Crossword', 'Solved a crossword with hints hidden in the posters, and won freebies', 'Made them read the posters'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['UG-led synbio earned a place on a national stage.', 'A biology stall among 100+ teams drew 1,000+ visitors, including the Chief of Defence Staff.'],
          ['The format worked.', 'Hands-on, then research, then reward, visitors engaged at every step.'],
          'Visitors left more curious than they came.',
          ['It opened doors.', 'Multiple collaboration offers from industry professionals, plus a new partnership with 100 GIGA.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['Collaboration offers.', 'Industry professionals approached us with several problem statements to work on together.'],
          ['100 GIGA.', 'We met this girl-led innovation group at the stall and were invited to present at their Junicorn event afterwards. A single stall conversation became a second outreach platform.'],
        ] },
      ],
      References: [{ t: 'ul', items: ['TechConnect, IIT Bombay TechFest.', 'Stall posters for CalciCapture and AureoLyze (6 posters).', 'Microscope slide deck and the crossword.', 'Gallery.'] }],
    },
  },

  // 8 ────────────────────────────────────────────────────────────────────────
  {
    name: 'Is SynBio Really Sustainable?',
    docs: [{ title: 'SynBio Reality Check: discussion booklet (IIT Delhi × IIT Bombay)', file: '/iit-bombay/eo/docs/synbio-sustainable/synbio-reality-check-booklet.pdf' }, { title: 'Episode 1', file: '/iit-bombay/eo/docs/synbio-sustainable/episode-1.mp4' }, { title: 'Episode 2', file: '/iit-bombay/eo/docs/synbio-sustainable/episode-2.mp4' }],
    meta: 'SynBio Reality Check · iGEM IIT Delhi × iGEM IIT Bombay · two-episode video series',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Synthetic biology is frequently hyped as an unalloyed green replacement for petrochemical industries, yet academic discussions often skip life-cycle emissions, land-use impacts, and the 60–80% downstream processing (DSP) cost.'],
          ['Our answer.', 'SynBio Reality Check, a collaborative two-episode video discussion series and joint policy booklet uniting the iGEM teams of IIT Delhi and IIT Bombay to critically audit industrial scale, supply chains and regulatory hurdles.'],
          ['The goal.', 'To replace over-promised green perfection with disciplined, modest, testable claims, proving that biotech credibility is earned by confronting trade-offs head-on.'],
          ['How it started.', 'A shared realisation during our iGEM preparations that student projects rarely stress-test their real-world manufacturing and regulatory constraints before judging.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'ul', items: [
          ['2 iGEM teams engaged.', 'IIT Bombay (BiFROST) and IIT Delhi (DermaSense), creating a cross-institutional dialogue involving core research members, student hosts and expert respondents.'],
          ['Audience mix.', 'Undergraduate researchers, iGEM student teams, synthetic biology practitioners, academic judges and prospective biotech entrepreneurs.'],
          ['Scale and setting.', 'A two-episode video series (~13 minutes for Episode 1, ~12 for Episode 2) recorded over a unified virtual session and distributed via team wikis and public platforms.'],
          ['Reach beyond the event.', 'Led to a joint 1-page policy brief and structured discussion modules adopted by peer student groups.'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'A two-part cross-examination format where IIT Delhi and IIT Bombay alternate hosting and responding to critical industrial, supply-chain and regulatory dilemmas.' },
        { t: 'table', head: ['Step', 'What participants did', 'What it showed'], rows: [
          ['1. Episode 1: upstream sustainability and manufacturing', 'IIT Delhi (host: Amogh Kukreja) interrogated IIT Bombay (Pratik Ingle and Abhinav Gupta) on BiFROST', 'Life-cycle analysis on a coal-heavy grid raises production-stage emissions, requiring renewable offsets and cyclic cooling efficiencies'],
          ['2. Episode 2: supply chain resilience and regulation', 'IIT Bombay (host: Abhinav Gupta) interrogated IIT Delhi (Amogh Kukreja) on DermaSense and field constraints', 'Lab resilience relies on in-house fallback protocols, regional reagent foundries and lyophilisation rather than total self-sufficiency'],
          ['3. Joint policy brief and booklet', 'Structured the discussions into a 6-section analytical booklet and draft essay', 'Actionable frameworks to audit carbon footprints, metabolic burden and risk-proportioned biosafety rules'],
        ] },
        { t: 'p', text: 'What Episode 1 covered' },
        { t: 'ul', items: [
          ['Is the carbon footprint meaningfully lower?', 'Industrial bioprocesses need heavy aeration, agitation, autoclaving and deep cooling. Using ecoinvent data, we found that because India’s grid relies heavily on coal, production-stage emissions can run high. BiFROST circulates in a cyclic data-centre cooling loop, so if thermal performance outpaces conventional coolants, net pump and chiller energy falls over the installation’s lifetime.'],
          ['The biofuel trap.', 'Swapping petroleum for sugarcane molasses, cornstarch or glucose risks competing with arable farmland, worsening water scarcity and driving deforestation.'],
          ['Scale-up and evolutionary pressure.', 'At industrial scale, evolution selects for mutants that shed costly pathways. The answers: design around metabolic burden, optimise fermentation parameters, run multi-generation testing, and use flux balance analysis to predict pathway disruptions.'],
          ['Downstream processing: the overlooked cost.', 'Purification accounts for 60–80% of total production costs and often uses volatile organic solvents. Leaving DSP out of academic assessments creates a false picture of feasibility.'],
        ] },
        { t: 'p', text: 'What Episode 2 covered' },
        { t: 'ul', items: [
          ['Supply chain dependency.', 'Dual sourcing and in-house fallbacks (Taq, Pfu, T4 ligase, T7 polymerase, chemically competent cells), regional reagent foundries, lyophilisation to remove cold-chain dependency, and PCR assembly over expensive synthetic DNA.'],
          ['Practical waste valorisation.', 'Standardise inputs, evolve strains for stress tolerance, design for non-sterile and low-pH environments, and target point-sources where waste is concentrated.'],
          ['Regulation and biosecurity.', 'BSL-1 work with well-characterised organisms should be governed by simple notifications rather than protracted multi-committee reviews, with oversight focused on DNA synthesis providers.'],
        ] },
        { t: 'ul', items: [
          ['What we built ourselves.', 'A structured discussion booklet, a joint policy brief PDF, pre-vetted question banks, and 2 video episodes embedded across team wiki pages.'],
          ['Design choices.', 'We structured the interaction as an expert cross-examination rather than a friendly chat, forcing both teams to defend real engineering trade-offs and acknowledge unquantified metrics.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Headline result.', 'The collaborative framework reframed synbio communication from carbon-neutral perfection to modest, verifiable goals of comparative reduction and supply-chain resilience.'],
          ['Impact on the audience.', 'Shifted student perspective from idealised lab titres to whole-system accounting, including downstream processing and evolutionary drift.'],
          ['What worked.', 'Splitting the series into two operational lenses, upstream manufacturing and downstream access and regulation, allowed deep analysis without diluting scope.'],
          ['Wider impact.', 'Established an inter-IIT iGEM partnership template that integrates Human Practices with rigorous life-cycle and policy thinking.'],
          ['Next steps.', 'Integrate these auditing frameworks into early-stage project design for future iGEM cycles.'],
        ] },
        { t: 'p', text: 'Quick actionable takeaways for iGEM teams: never skip LCA; design for scale, accounting for metabolic burden and evolutionary drift; build supply-chain resilience through freeze-drying and in-house enzyme expression; and advocate for risk-proportioned rules.' },
      ],
      Feedback: [
        { t: 'p', text: 'What we observed: high engagement and critical reflection from peer iGEM members regarding the hidden costs of downstream purification and the brittleness of genetic containment.' },
        { t: 'quote', text: 'Synthetic biology cannot honestly be marketed as a blanket substitute for fossil resources; the correct claim is comparative reduction and reduced geopolitical vulnerability.', by: 'respondent, Episode 1 recording' },
        { t: 'quote', text: 'Low-risk BSL-1 work with well-characterized organisms carries near-zero risk and should be governed by simple notifications rather than protracted multi-committee reviews.', by: 'participant, Episode 2 policy debate' },
        { t: 'ul', items: [
          ['Survey result.', '100% of participating team members (n = 10 core organisers) agreed that stress-testing project assumptions before judging significantly strengthened their technical defences.'],
          ['You said.', 'Land-use offsets and sequence screening limits were left unquantified in initial discussions.'],
          ['We did.', 'Explicitly flagged these as critical gaps in Section 4 of the booklet, to encourage ongoing inquiry by future researchers.'],
          ['What it told us.', 'Student researchers are hungry for honest discussions about failure modes, scale-up bottlenecks and regulatory red tape rather than uncritical techno-optimism.'],
        ] },
      ],
      References: [{ t: 'ul', items: ['SynBio Reality Check: IIT Delhi × IIT Bombay iGEM discussion booklet.', 'Joint policy brief (PDF).', 'Episodes 1 and 2 (video).', 'Gallery.'] }],
    },
  },

  // 9 ────────────────────────────────────────────────────────────────────────
  {
    name: 'Do IITB Freshers Know SynBio?',
    docs: [{ title: 'Interview clips, part 1', file: '/iit-bombay/eo/docs/freshers/interviews-1.mp4' }, { title: 'Interview clips, part 2', file: '/iit-bombay/eo/docs/freshers/interviews-2.mp4' }],
    photos: shots('freshers', 3),
    meta: 'Hostel 16 mess, dinner, 5 October 2026 · 40+ on-camera interviews',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Most freshers arrive at IIT Bombay with little or no exposure to synthetic biology. We also had no clear picture of what freshers actually knew, so our outreach was aimed at an audience we had never measured.'],
          ['Our answer.', 'Go to where freshers already are. We took a camera to the Hostel 16 mess at dinner, asked first-year students what they think synthetic biology is, explained the core ideas on the spot, and asked what they would do with it.'],
          ['The goal.', 'Measure baseline awareness, spark curiosity in a single conversation, and use their answers to shape our future outreach.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['40+', 'first-years interviewed'], ['1', 'dinner hour'], ['1', 'question']] },
        { t: 'ul', items: [
          '40+ first-year students interviewed and recorded on camera.',
          'Setting: the Hostel 16 mess during dinner on 5 October 2026, when freshers are together and relaxed, not in a lecture hall or at a stall they had to choose to visit.',
          'Students from many branches who had not chosen to attend a synthetic biology event. We met them where they already were.',
        ] },
      ],
      'What We Did': [
        { t: 'table', head: ['Step', 'What happened', 'What it showed'], rows: [
          ['1. Awareness check', 'On camera, we asked each fresher what synthetic biology is', 'Baseline knowledge was very low'],
          ['2. Quick introduction', 'We explained synthetic biology and our iGEM work in plain language', 'What it is, what it can do and how impactful it can be'],
          ['3. Their ideas', 'We asked where they would apply synthetic biology themselves', 'Freshers engage creatively once they have a starting point'],
        ] },
        { t: 'p', text: 'Design choices: short, informal, one-on-one conversations on camera, with everyday examples instead of jargon. We chose a casual setting so that "I don’t know" felt like a safe answer.' },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Headline result.', 'We interviewed 40+ IIT Bombay freshers on camera. Most began with little or no idea what synthetic biology is. After a short introduction, all of them were curious to learn more.'],
          ['Impact on the audience.', 'In a single conversation, freshers went from hesitant, unsure answers to asking questions and pitching their own applications.'],
          ['What worked.', 'Short, informal, one-on-one chats; explaining the idea through everyday examples; and letting students come up with their own uses afterwards, which made the idea theirs.'],
          ['What it means for us.', 'We now have a real baseline of what freshers know, and evidence that a few minutes of friendly explanation is enough to change it. That gives our outreach a clear, low-cost model: meet students where they are, keep it short, and ask for their ideas.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'What we observed: many freshers hesitated at first, unsure how to answer. Once we explained the core idea, they became fascinated and came up with a surprising number of thoughtful ideas of their own.' },
        { t: 'quote', text: 'Synthetic biology is "man doing biology", haha.', by: 'before the introduction' },
        { t: 'quote', text: 'I would alter my genes to be more muscular. · I would probably get rid of insomnia by using synthetic biology. · I would produce a lot of caffeine.', by: 'after the introduction' },
        { t: 'ul', items: [
          ['Awareness is the barrier, not interest.', 'Most freshers enter IIT Bombay with little exposure to synthetic biology, but a short, friendly introduction is enough to spark real interest.'],
          ['Their ideas are personal.', 'Every example is about the student’s own body or daily life. People connect to synbio through health, performance and sleep, so that is a useful way into the topic.'],
          ['An opening for Human Practices.', 'Freshers spontaneously raised editing their own genes, which is exactly the kind of idea that leads into a conversation about safety, ethics and what responsible use looks like.'],
        ] },
      ],
      References: [{ t: 'ul', items: ['Interview question set.', 'Photographs and video of the interviews.'] }],
    },
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Careers in SynBio ft. iGEM IITB Alumni',
    photos: shots('careers', 8),
    docs: [{ title: 'Careers in SynBio: session slides', file: '/iit-bombay/eo/docs/careers/careers-in-synbio-slides.pdf' }],
    meta: 'Online · 18 October 2026 · 2 sessions · 3 speakers · 20 students',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Students fascinated by biology often don’t know where synthetic biology could take them. The field is interdisciplinary and fast-moving, and a career in it can feel like "a world of possibilities without a map".'],
          ['Our answer.', 'Careers in SynBio, a two-session speaker series organised by iGEM IIT Bombay on 18 October 2026.'],
          ['The goal.', 'Participants should understand which roles exist in SynBio, what skills they need, and what a real journey into the field looks like, so they can start working out where they fit.'],
          ['How it started.', 'At our orientation, students kept asking what career paths lie ahead in synbio. This series was our direct response to those questions.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'ul', items: ['20 students, from IITB.', 'Scale and setting: 2 sessions, online, 18 October 2026.'] },
        { t: 'table', head: ['Speaker', 'Role'], rows: [
          ['Kadambari Bhide', 'First-year PhD student, Chemical Engineering, MIT; founding member of iGEM IIT Bombay'],
          ['Husayn Bootwala', 'First-year PhD student, Washington University in St. Louis; founder of iGEM IIT Bombay'],
          ['Anagha Rajesh', 'CEO of BioCompute, which builds data storage using bacterial DNA'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'Two speaker sessions, one mapping the whole SynBio career landscape and one built around a founder’s personal journey, both with live Q&A.' },
        { t: 'table', head: ['Activity / Step', 'What participants did', 'What it showed or taught'], rows: [
          ['1. Session 1: Understanding the SynBio Career Landscape (45 min talk, 15 min Q&A)', 'Heard about applications and career routes, then questioned two PhD students', 'SynBio is an ecosystem of roles across academia, R&D, biomanufacturing, computational biology, startups, policy, IP and consulting'],
          ['2. Wet lab vs dry lab', 'Compared experimental and computational work', 'The two sides connect through the Design-Build-Test-Learn cycle, and AI is opening new areas such as protein design'],
          ['3. Paths into the field', 'Learned about research in India, academia-industry links, internships and higher studies', 'Build foundations and try both wet and dry work before specialising'],
          ['4. Session 2: Careers, Choices & Conversations (10 min intro, then open discussion)', 'Asked Anagha Rajesh about her journey, her typical day, her team, setbacks and where the field is heading', 'A career is more than a job title: it is the journey, the work and the challenges behind it'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Headline result.', '20 students attended 2 sessions with 3 speakers, and participants asked questions across the full 45 + 15 and 10 + open-floor formats.'],
          ['Impact on the audience.', 'Career curiosity became concrete questions about daily work, setbacks, team roles and next steps.'],
          ['What worked.', 'Pairing a broad overview with one individual’s story, and handing the second session over to participant questions.'],
          ['Wider impact.', 'The series answers a question first raised at our orientation, and it connects our students to alumni now doing PhDs abroad and to a founder working at the edge of biology and computing.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['What we observed.', 'Participants asked about Anagha’s college journey, her day-to-day work, her co-team members, challenges she faced, and the future scope of the field.'],
          ['What it told us.', 'Students want the human side of a career, including setbacks and daily routines, not only a list of roles.'],
        ] },
        { t: 'table', head: ['You said', 'We did'], rows: [['Record the sessions', 'Recording made available on our Instagram']] },
      ],
      References: [
        { t: 'ul', items: ['Careers in SynBio, organised by iGEM IIT Bombay, 18 October 2026.', 'Related write-up from our team: Orientations.'] },
      ],
    },
  },

  // 11 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Know Your Lab: iGEM IITB × EnPOWER',
    photos: shots('know-your-lab', 10),
    meta: 'A social-media poster series on two BSBE labs · 1,000+ views',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Undergraduates at IIT Bombay often don’t know what research happens in the labs around them, or how to approach a professor to get involved. Professors, in turn, often know little about iGEM as an undergraduate-led initiative. Two gaps on either side of the same missing link.'],
          ['Our goal.', 'Introduce IIT Bombay faculty to iGEM as a student-driven synthetic biology initiative; help undergraduates find research opportunities in biology and synthetic biology; and act as a mediator so students have a clear, low-pressure way to learn what a lab does and what they could contribute.'],
          ['Why EnPOWER.', 'EnPOWER is the institute’s research club, so it already has the student audience interested in research. Partnering let us combine its reach with our contacts in BSBE.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['2', 'labs featured'], ['1,000+', 'views'], ['2', 'faculty + their PhD students']] },
        { t: 'ul', items: [
          'Professors: 2 faculty members, plus their PhD students, who gave us time and described their work.',
          'Undergraduates: 1,000+ views across the series.',
          'EnPOWER’s members and the iGEM team, who helped interview, design and share the series.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We approached two professors in BSBE, spoke with them and with their PhD students, introduced iGEM, and asked each lab to describe its research. We then turned each conversation into a short poster series. Each series used the same structure, which made the posts easy to compare: a lab introduction card; core research focus; research approach; from mechanism to therapy (or sample to answer); key hurdles and real-world applications; and a UG spotlight.' },
        { t: 'table', head: ['Lab', 'Focus', 'Approach'], rows: [
          ['Cilia Biology Lab: Dr. Swapnil Rohidas Shinde', 'How cilia work and how their dysfunction contributes to disease, including the molecular basis of ciliopathies and their links to cancer', 'GPCR signalling on primary cilia; modelling disease mechanisms and targets'],
          ['Precision Oncology Lab: Dr. Sushil Kumar', 'The cellular pathways that drive tumour growth, survival and spread, and less invasive liquid biopsies that detect tumour signals in blood and urine', 'Fundamental cancer biology, genomic and DNA analysis, translational research'],
        ] },
        { t: 'ul', items: [
          ['Cilia lab hurdles and applications.', 'Understanding the molecular basis of ciliopathies, the link between cilia loss and ovarian cancer and melanoma, localising GPCRs to primary cilia and tracking their trafficking. Applications: GPCRs in diabetes and obesity, GPCR structures for in-silico drug design, ubiquitin-based targeted protein degradation and CRISPR-based gene therapy.'],
          ['Precision Oncology hurdles and applications.', 'Patient sample collection and ethics approvals, clinical validation, high CRO and clinical-trial costs, regulatory approvals and scaling research into products. Applications: early and minimally invasive cancer detection, personalised treatment, new therapeutic targets and affordable diagnostics.'],
          ['UG spotlight.', 'Undergraduates can gain hands-on experience alongside PhD students in cell culture, bacterial culture, recombinant DNA technology, plasmids and constructs, PCR and primers, sequencing and Western blots, with each technique explained in terms of what it is used for.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Faculty were introduced to iGEM.', 'As an undergraduate synthetic biology initiative, one of our main aims.'],
          ['Students got a simple route into research.', 'Each series ended with what UGs can do in the lab and which skills they learn, so a student could decide whether to reach out.'],
          ['The labs link to synthetic biology.', 'Even though neither is a synbio lab: CRISPR-based gene manipulation, recombinant DNA work, sequencing and in-silico design all transfer across fields.'],
          ['We learned how translational research works.', 'The oncology lab’s hurdles, ethics approvals, clinical validation, regulatory approvals and costs, mirror the barriers our own project faces when moving from a lab idea to a product.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['Faculty relationship.', 'Prof. Sushil Kumar agreed to be the Professor-in-Charge of BioTL.'],
          ['Follow-through.', 'Various biology projects were circulated amongst students for the winter.'],
        ] },
      ],
      References: [{ t: 'ul', items: ['The two lab introduction posters and the research summary posters.', 'Collaboration: iGEM IIT Bombay × EnPOWER, UGAC.', 'Instagram post: https://www.instagram.com/p/Dd30q2iAgKu/'] }],
    },
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    name: 'The FAS Booklet: First Edition',
    docs: [{ title: 'The FAS Booklet, first edition', file: '/iit-bombay/eo/docs/fas-booklet/fas-booklet.pdf' }],
    meta: 'A Field Guide to Fungal Fatty Acid Synthase · emailed to 100+ readers',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'FAS is one of the oldest and most important enzymes in metabolism, yet almost nobody outside the field has heard of it. It is a 2.6-megadalton barrel of twelve protein chains, and the literature on it is dense structural biology. Our entire project depends on editing a single residue (V1254W) in this machine.'],
          ['The question.', 'Can a very complex molecular machine be explained so that it feels intuitive, using analogies that hold up long enough to be useful and are honest about where they fail?'],
          ['Our goal.', 'Write the booklet while learning the system, so that we understood FAS well enough to justify our design, and so that anyone, from a first-year student to a professor in another field, could pick it up and follow it.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['100+', 'readers emailed'], ['6', 'chapters'], ['28', 'sources']] },
        { t: 'ul', items: [
          '100+ people contacted by email: professors and BSBE students at IIT Bombay. A mix of readers who work in biology and some who do not, which is why we wrote it to be readable without prior FAS knowledge.',
          'Our own team, who used it as the shared technical reference for the wet-lab design.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We wrote a booklet that takes the reader from the whole enzyme down to our single edit, in six chapters:' },
        { t: 'ul', items: [
          ['FAS in context.', 'What it does, what it costs the cell (about 122 ATP per palmitate), and the three architectures of life.'],
          ['Structural organisation.', 'The α6β6 barrel, its two chambers, six reaction centres, eight domains, and the phosphopantetheine arm that carries the product between stations.'],
          ['The elongation cycle.', 'Substrates, stoichiometry and the ten-step cycle, plus the arithmetic of why six cycles give C14 and seven give C16.'],
          ['Chain-length control.', 'Why the chain stops at sixteen carbons, the Met1251 gatekeeper, and the wild-type product spectrum (C14 is only 2.7 ± 0.2 mol%).'],
          ['Regulation.', 'Three layers of control: the γ subunit, the product-sensor site and phosphorylation.'],
          ['Our design.', 'Methyl myristate as a coolant, three case studies of convergent evidence, and the rationale for FAS2 V1254W.'],
        ] },
        { t: 'p', text: 'The method behind it: each chapter views FAS through a different lens and then pushes the lens until it breaks. Every break marks a physical principle the lens did not predict, and that is where the real biochemistry sits.' },
        { t: 'table', head: ['Lens', 'What the analogy gives', 'Where it breaks, and what we learn'], rows: [
          ['A factory', 'Fixed stations, a fixed order, and a floor plan (about half the mass is scaffold)', 'No conveyor (the product is tethered to an arm), no manager (control by geometry and charge), and no calm (thermal noise is the engine, a Brownian ratchet)'],
          ['Electronics', 'A quick way to compare the three architectures', 'The metaphors are "deliberately imperfect"; the real criterion is how the carrier finds its work, and two-dimensional diffusion explains why the barrel wins'],
          ['A program', 'Each domain "executes an instruction"', 'There is no processor, and nothing happens until the carrier arrives'],
          ['A molecular ruler', 'A simple answer to "why sixteen?"', 'There is no counter, only a race between elongation and release'],
          ['Control engineering', 'A governor, a feedback sensor and firmware', 'The closest match, where the analogy gets better'],
          ['A dimmer', 'Our edit tunes the exit by two carbons, not ten', 'A "tuning, not breaking" argument for why we chose V1254W over harsher mutants'],
        ] },
        { t: 'p', text: 'Making it approachable: scale analogies (the barrel blown up to a football pitch, with a 7-metre arm), diagrams such as the org chart of the barrel and a chain-length timeline, a glossary, and a few jokes. The foreword invites readers to "read critically, and argue with us."' },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Analogies work best when you break them.', 'Pushing each lens until it failed made the real mechanisms memorable, and kept us honest about what is a metaphor.'],
          ['Writing it taught us the system.', 'Explaining FAS in plain language forced us to understand each part we later rely on, including why we chose a moderate substitution and what baseline our GC-MS result must beat.'],
          ['The booklet is part of our design logic, not a side project.', 'Chapter 6 ties the whole enzyme back to V1254W, the wild-type baseline, and the hypothesis we are testing.'],
          ['There is appetite for this format.', 'Readers said they enjoyed the depth and the intuition, and asked for more analogy-based booklets on other topics.'],
          ['For the team.', 'The booklet is a reusable teaching tool for future members.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'We emailed the booklet to 100+ professors and BSBE students and received positive feedback. Readers said that:' },
        { t: 'ul', items: [
          'They liked the depth of the content.',
          'The analogies were excellent and made the material intuitive to follow.',
          'We should make more booklets like this, with interesting analogies, on other topics.',
        ] },
      ],
      References: [
        { t: 'p', text: 'Key literature in the booklet (28 sources in total; full list in the PDF):' },
        { t: 'ul', items: [
          'Lomakin, I.B., Xiong, Y. & Steitz, T.A. (2007). The crystal structure of yeast fatty acid synthase. Cell 129, 319–332.',
          'Singh, K. et al. (2020). Discovery of a regulatory subunit of the yeast fatty acid synthase. Cell 180, 1130–1143.',
          'Sangwallek, J. et al. (2013). Ketoacyl synthase domain is a major determinant for fatty acyl chain length in S. cerevisiae. Archives of Microbiology 195, 843–852.',
          'Gajewski, J. et al. (2017). Engineering fungal de novo fatty acid synthesis for short chain fatty acid production. Nature Communications 8, 14650.',
          'Rigouin, C. et al. (2017). Production of medium chain fatty acids by Yarrowia lipolytica. ACS Synthetic Biology 6, 1870–1879.',
          'Hasan, S.M.N. et al. (2025). Allosteric regulation of fungal fatty acid synthesis. Structure 33, 2041–2048.',
          'Martínez-Montañés, F. et al. (2020). Phosphoproteomic analysis across the yeast life cycle reveals control of fatty acyl chain length by phosphorylation of the FAS complex. Cell Reports 32, 108024.',
          'PDB 8PRW, structure of S. cerevisiae FAS at 1.9 Å.',
        ] },
      ],
    },
  },

  // 13 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Gene Cloning Simulation Website 2.0',
    docs: [{ title: 'Walk-through of the simulation website', file: '/iit-bombay/project/contribution/simulation-website.mp4' }],
    photos: shots('gene-cloning', 3),
    meta: '400+ students · igem-simulation-beta.vercel.app',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Synbio is taught as theory. School students never step into a lab, and terms like plasmid and restriction enzyme feel intimidating.'],
          ['Our answer.', 'A gene cloning simulation that gives students the feel of working in a synbio lab while teaching the core concepts.'],
          ['This year’s upgrade.', 'Last year’s feedback said the module was too complicated. We rebuilt every step so it makes intuitive sense to a student with zero synbio background, using everyday analogies, a plasmid as a "gene delivery truck".'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['400+', 'students used it'], ['98%', 'interested in synbio afterwards']] },
        { t: 'ul', items: [
          '400+ students used the simulation this year.',
          'AECS school visit: the simulation anchored the session (Grade 8).',
          'Orientation: a "roller coaster" of concepts connected by the simulator.',
          'BioQuest participants: the virtual lab was central to the outreach.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'A four-module journey to produce a protein from a bacterium:' },
        { t: 'table', head: ['Module', 'Students do', 'Concepts learned'], rows: [
          ['1. Gene extraction', 'Culture bacteria, lyse cells, purify DNA through interactive drag-and-drop actions', 'Cell lysis, DNA purification'],
          ['2. Gene cloning', 'Pick enzymes, cut and "paste" gene + plasmid', 'Plasmids, restriction enzymes, ligase'],
          ['3. Transformation and expression', 'Heat shock, antibiotic selection, induction', 'Transformation, selection, expression'],
          ['4. Purification and validation', 'Affinity chromatography, read SDS-PAGE', 'Purification, how success is confirmed'],
        ] },
        { t: 'p', text: 'The simulation culminates in a visual SDS-PAGE representation, where users see a clear band confirming successful production of their protein. It was also taken beyond the screen into live sessions at AECS and orientation.' },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['A complex lab workflow became accessible.', 'To 400+ students with no prior background.'],
          ['Interest followed understanding.', '88 of 90 surveyed students (98%) said they were interested in synbio after using it.'],
          ['Students went beyond the steps.', 'They began asking real scientific questions, such as why experiments fail and where plasmids come from.'],
          ['Next.', 'Expand with more advanced topics so curious students can go deeper.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [
          ['You said → we did.', 'Last year: "Too complicated." This year: intuitive analogies and user-friendly features at every step.'],
          ['Post-simulation survey.', '88 of 90 students (98%) said they were interested in synthetic biology. The 2 who weren’t cited their Jain beliefs and not wanting to harm microbes, their hesitation was ethical, not a lack of interest in the science, which shows the simulation got students thinking about the ethics of biology too.'],
        ] },
        { t: 'p', text: 'What students asked while using it:' },
        { t: 'quote', text: 'Didi, how often do these fail? Like so much heat shock, the cells could die also na.' },
        { t: 'quote', text: 'Didi, how do we get plasmids?' },
        { t: 'p', text: 'These questions showed students were thinking like scientists, curious about failure, not just success. This shaped our plan to add failure and troubleshooting scenarios next.' },
      ],
      References: [{ t: 'ul', items: ['https://igem-simulation-beta.vercel.app/', 'AECS educational outreach write-up.'] }],
    },
  },

  // 14 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Market Research for Our SynBio Product',
    meta: 'Write-up in progress',
    tabs: {},
  },

  // 15 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Orientations',
    photos: shots('orientations', 19),
    meta: 'iGEM IITB Orientation, IIT Bombay · 50+ attendees · 40+ signed up or showed interest',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Students curious about synthetic biology, from "not sure what synbio is" to "sure it is my career", have no single place to see what iGEM IITB does, what they would learn and where it can lead.'],
          ['Our answer.', 'The iGEM IITB Orientation, a one-room event where the whole team presents its work and invites the next generation to join.'],
          ['The goal.', 'Students leave knowing what synbio is, what they would learn and do on the team, and why joining is worth it. We also want them to feel how much the team has grown through iGEM.'],
          ['How it started.', 'After 2 years of work and learning, the team wanted to pass it on to the people who will carry the project forward.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'ul', items: ['Over 50 students and team members, from freshers to sophomores to Masters and PhD.', 'Scale and setting: iGEM IITB Orientation, IIT Bombay, 50+ attendees.', 'Reach beyond the event: the questions asked here led to our Careers in SynBio session.'] },
        { t: 'table', head: ['Group', 'Why they came'], rows: [
          ['Freshers', 'Exploring synbio and iGEM for the first time'],
          ['Sophomores', 'Missed their chance in fresher year'],
          ['Masters and PhD students', 'Want to mentor'],
          ['Current teammates and alumni', 'Celebrating the handover'],
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'A team-led presentation covering what synbio is, what students will learn, why they should join and what iGEM has meant to us.' },
        { t: 'table', head: ['Activity / Step', 'What participants did', 'What it showed or taught'], rows: [
          ['1. What is synbio?', 'Watched the intro and asked questions', 'Synbio basics for students from any starting point'],
          ['2. What you will learn on the team', 'Heard about the work and skills across the team', 'The range of projects and roles open to them'],
          ['3. Why join us', 'Heard the pitch, including the trip to Paris for the iGEM Jamboree', 'A concrete reason to commit'],
          ['4. Our journey', 'Listened to members share how they grew', 'What 2 years in iGEM does to a person'],
        ] },
        { t: 'ul', items: [
          ['What we built ourselves.', 'Orientation slide deck, posters, videos and handouts.'],
          'One room for every level of interest and every year, so freshers meet seniors, mentors and alumni directly. We went beyond the pitch and shared personal stories.',
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Headline result.', '50+ students attended and 40+ signed up or showed interest in joining.'],
          ['Impact on the audience.', 'Students asked about careers and about balancing iGEM with academics. They arrived curious and left with concrete questions and next steps.'],
          ['What worked.', 'Mixing all years in one room, and letting teammates and alumni speak from experience.'],
          ['Wider impact.', 'Student questions led directly to the Careers in SynBio session.'],
          ['Next steps.', 'Show clearly how iGEM fits around academics in future orientations, and run career sessions as a regular follow-up.'],
        ] },
      ],
      Feedback: [
        { t: 'ul', items: [['What we observed.', 'Students asked many questions on careers and workload. This showed us how enthusiastic they were and how much they were willing to learn.']] },
        { t: 'quote', text: 'What’s the scope of SynBio?' },
        { t: 'quote', text: 'iGEM is our child and it’s a full circle moment for us.' },
        { t: 'table', head: ['You said', 'We did'], rows: [
          ['"What are the career paths ahead in synbio?"', 'Ran a dedicated Careers in SynBio session'],
          ['"How does one manage iGEM with academics?"', 'Explained the team’s flexible work culture'],
        ] },
        { t: 'ul', items: [['What it told us.', 'Students want to see where synbio leads, and they want proof that iGEM fits alongside their courses.']] },
      ],
      References: [
        { t: 'ul', items: ['iGEM IITB Orientation, organised by iGEM IITB.', 'Materials we made: orientation slides.', 'Related write-up from our team: Careers in SynBio session.'] },
      ],
    },
  },

  // 16 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Internal AI Audit',
    photos: shots('ai-audit', 6),
    docs: [{ title: 'Survey responses (names removed)', file: '/iit-bombay/eo/docs/ai-audit/responses.csv' }],
    meta: '19 team members across all 5 subsystems',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Our project tackles the heat and water cost of data-centre cooling, but nobody had measured our own AI use. Awareness of AI’s footprint is also low on teams where AI is part of daily work.'],
          ['Our answer.', 'A fun, interactive Team AI Audit with references and articles woven into the questions, so filling it in was a learning moment, not a chore.'],
          ['The goals.', 'Map how the team really uses AI; test whether we verify what it tells us; and make every member experience learning about its environmental cost while stating their own opinions, as a journey through the survey.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['19', 'team members'], ['5', 'subsystems'], ['15', 'distinct AI tools']] },
        { t: 'table', head: ['Subsystem', 'Responses'], rows: [['Wet Lab', '6'], ['iHP & EO', '4'], ['Dry Lab', '4'], ['Web Team', '3'], ['Media & Design', '2']] },
        { t: 'p', text: '15 distinct AI tools reported, including open-source models (Gemma, Qwen, MiniMax) and Grok.' },
      ],
      'What We Did': [
        { t: 'p', text: 'We designed the audit as a game, with five parts. Every question carried a fact or article reference.' },
        { t: 'ul', items: [
          ['Usage data.', '"AI CPU utilisation", queries per day, % of iGEM work AI-assisted, tools used, main use case.'],
          ['Honesty checks.', 'Thanking AI, pasting code unread, whether we read the papers we cite.'],
          ['Critical thinking.', 'What we do when an LLM hallucinates, and the one thing we would never use AI for.'],
          ['Environmental awareness.', 'The water cost of each AI query, plus a "swimming pool" dilemma.'],
          ['Project tie-ins.', 'Meltdown scenarios, name ideas, promo-video scenes, merch and wiki ideas, all linked back to our bio-coolant project.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['AI is core infrastructure for our team.', '9 of 19 (47%) run it at 50%+ capacity, 9 of 19 (47%) send 15+ queries a day, and 5 (26%) send 30+. That is why its footprint matters to us.'],
          ['The audit changed the conversation on water.', 'Only 5 of 19 (26%) felt "nothing". 6 (32%) felt guilt, and 8 (42%) said it validated our project or motivated them to build the solution.'],
          ['The team verifies, not just trusts.', '14 of 18 (78%) go into detective mode when an LLM hallucinates, and 14 of 18 (78%) read all or the key parts of the papers they cite.'],
          ['The audit exposed real AI-literacy gaps.', '17 of 19 (89%) have pasted code without reading it, and 2 have submitted code they can’t explain. 4 of 18 rely on abstracts or AI summaries for papers. Next, we plan AI-literacy sessions to close these gaps.'],
          ['Perception didn’t match data.', '8 of 18 guessed Dry Lab uses AI most, but the data shows the Web Team at 3 of 3 at 50%+ usage, versus Dry Lab at 2 of 4 and Wet Lab at 1 of 6.'],
        ] },
      ],
      Feedback: [
        { t: 'table', head: ['Question', 'Result'], rows: [
          ['AI use level (n=19)', '10 standard (53%), 7 high (37%), 2 overclocked (11%)'],
          ['Queries per day (n=19)', '9 send 5–15, 4 send 15–30, 2 send 30–50, 3 send 50+, 1 sends 1–5'],
          ['% of iGEM work AI-assisted (n=19)', '9 at 21–40%, 8 at 41%+, 2 at 20% or less'],
          ['Reaction to AI’s water use (n=19)', '8 validation or motivation, 6 guilt, 5 nothing'],
          ['LLM hallucinates (n=18)', '14 investigate, 2 rage, 1 denial, 1 acceptance'],
          ['"Swimming pool" dilemma (n=18)', '10 only before a deadline, 6 would fix the data centre while using it, 2 yes'],
          ['Polite to AI (n=19)', '15 (79%) have thanked it or apologised to it'],
          ['Most-used tools (n=18)', 'Claude 17 (94%), Gemini 16 (89%), ChatGPT 11 (61%), Perplexity 9 (50%)'],
          ['Top AI use cases (n=18)', 'About 7 research papers and literature search, about 5 coding and debugging'],
          ['Top red flags named', '4 hallucinated citations or fake info, 2 water wastage'],
        ] },
        { t: 'quote', text: 'Citing stuff; it usually doesn’t give accurate information unless you proofread and ask it to be very, very thorough.', by: 'team member' },
        { t: 'p', text: 'Members drew their own lines on AI use, naming citations, important reading and hypothesis generation as things they would never hand over fully. 2 members named water wastage as the biggest red flag of their main LLM, after taking the audit.' },
      ],
      References: [{ t: 'ul', items: ['Team AI Audit form and the responses sheet.'] }],
    },
  },

  // 17 ───────────────────────────────────────────────────────────────────────
  {
    name: 'LCA Guide for SynBiologists',
    meta: 'Write-up in progress',
    tabs: {},
  },

  // 18 ───────────────────────────────────────────────────────────────────────
  {
    name: 'Junicorn by 100 GIGA',
    docs: [{ title: 'Junicorn pitch deck', file: '/iit-bombay/eo/docs/junicorn/junicorn-pitch.pdf' }],
    photos: shots('junicorn', 1),
    meta: 'Dayananda Sagar University, International StartUp Fair · a cohort of 40 girl founders',
    tabs: {
      Purpose: [
        { t: 'ul', items: [
          ['The gap.', 'Young women interested in science and startups rarely hear from someone close to their own age who has built something in synthetic biology. Biology also has a reputation as a field you can’t enter without large funding, labs and institutional backing. Together, these make the field look closed.'],
          ['Our goal.', 'To show a cohort of aspiring girl founders how an undergraduate team goes from a problem statement to a product, and to make the case that synbio in India has room for them. We wanted the session to be practical, not an inspirational talk: how a student team actually starts, funds itself and keeps going.'],
          ['The origin.', 'We met 100 GIGA at our TechConnect stall at IIT Bombay TechFest. That conversation led to an invitation to present at their Junicorn event, so this audience came directly from our earlier outreach.'],
        ] },
      ],
      'Who We Reached': [
        { t: 'stats', items: [['40', 'girl founders in the cohort']] },
        { t: 'ul', items: [
          'A cohort of 40 girls from the Junicorn programme.',
          'Held at Dayananda Sagar University as part of the International StartUp Fair. We joined remotely while the cohort attended in person.',
          'Delivering the session online let us reach participants in another city without travel, removing a cost and time barrier on both sides.',
          'The audience was early-stage and entrepreneurship-minded, so we pitched at founders-in-the-making, not biology specialists.',
        ] },
      ],
      'What We Did': [
        { t: 'p', text: 'We ran a session on how to build in synbio as a student team, organised around the questions a first-time founder would ask, and drew each part from our own cycle:' },
        { t: 'ul', items: [
          ['Sponsors.', 'How to bring them in, including how we position the team and what sponsors actually respond to.'],
          ['Product development.', 'From an initial idea through validation to a working prototype, using our bio-coolant as the running example.'],
          ['Problem statements.', 'How we identify a real problem and decide it’s worth solving, which for us started from the regulatory pressure on PFAS-based cooling fluids.'],
          ['Team building.', 'How we find and keep a team across wet lab, dry lab, design and media.'],
          ['Collaboration.', 'How it works in practice across sub-teams and with outside experts.'],
          ['Finances.', 'How we manage a restricted budget, including keeping a reserve for failed experiments.'],
          ['Mindset.', 'How to stay proactive when progress is slow or experiments fail.'],
        ] },
      ],
      'Key Takeaway': [
        { t: 'ul', items: [
          ['Synbio is accessible, even on a tight budget.', 'Biology doesn’t have to start with expensive equipment. There is a growing space of software-based work, modelling, simulation, computational design, tool-building, that needs no in-person lab, and it can be a real entry point.'],
          ['AI is a tool for thinking, not a shortcut.', 'We showed how to use it as a companion that handles grunt work and sparks ideas, while the human does the judgment and development.'],
          ['A student team can run a real project.', 'Sponsors, finances, collaboration and problem-solving are skills you can learn and practise now, not only after graduating.'],
          ['We inspired the next wave.', 'Forty young women left with a practical roadmap and a view of synbio as a field they can enter.'],
        ] },
      ],
      Feedback: [
        { t: 'p', text: 'Questions from the cohort' },
        { t: 'ul', items: [
          ['"Isn’t the initial investment for biology huge, with all the equipment?"', 'Our answer: yes, wet-lab work can be costly, but there is a lot of new software you can build that needs no in-person equipment, and there is always a lot of scope. We also pointed to how we budgeted our own first cycle to keep costs under control.'],
          ['"How do you integrate and use AI cleverly?"', 'Our answer: we treat AI as a companion. It does the grunt work while we spend our time on the thinking, and sometimes it gives us the spark for an idea that we then develop and check ourselves.'],
        ] },
        { t: 'quote', text: 'Never realised the scope of entrepreneurship in biology, especially in India where medicine is the biggest demand.', by: 'participant' },
        { t: 'p', text: 'What the feedback told us: the questions were about feasibility and strategy, not just curiosity. The cohort was asking how to actually start, which is exactly the mindset we hoped to build.' },
      ],
      References: [{ t: 'ul', items: ['Session slides.', 'Junicorn by 100 GIGA, International StartUp Fair, Dayananda Sagar University.'] }],
    },
  },

];
