import LiquidIndex, { LiquidIndexItem } from '../components/LiquidIndex';

const items: LiquidIndexItem[] = [
  {
    num: '01', label: 'Clean Water', subtitle: 'SDG 6', sectionId: 'sdg-6', accent: '#38BDF8',
    icon: <><path d="M12 2.5C8 7.5 5 11 5 14.5a7 7 0 0 0 14 0C19 11 16 7.5 12 2.5Z" /><path d="M9.5 16a3.5 3.5 0 0 0 5 0" /></>,
  },
  {
    num: '02', label: 'Clean Energy', subtitle: 'SDG 7', sectionId: 'sdg-7', accent: '#22D3EE',
    icon: <path d="M13 2 4 13h5.5l-1 9L19 11h-5.5L15 2h-2Z" />,
  },
  {
    num: '03', label: 'Industry', subtitle: 'SDG 9', sectionId: 'sdg-9', accent: '#3B9EFF',
    icon: <><circle cx="12" cy="12" r="3.5" /><path d="M12 1v2.5M12 20.5V23M1 12h2.5M20.5 12H23M4.2 4.2l1.8 1.8M18 18l1.8 1.8M4.2 19.8l1.8-1.8M18 6l1.8-1.8" /></>,
  },
  {
    num: '04', label: 'Cities', subtitle: 'SDG 11', sectionId: 'sdg-11', accent: '#3B82F6',
    icon: <><path d="M2 22h20" /><path d="M6 22V6l4-3v19" /><path d="M10 22V9l5-2v15" /><path d="M15 22V10l4-2v14" /><path d="M8 10h0M8 13h0M8 16h0M12 12h0M12 15h0M12 18h0M17 13h0M17 16h0" /></>,
  },
  {
    num: '05', label: 'Consumption', subtitle: 'SDG 12', sectionId: 'sdg-12', accent: '#4F7BF0',
    icon: <><path d="M12 4l3 3-3 3" /><path d="M15 7a7.5 7.5 0 0 1-2 13" /><path d="M12 20l-3-3 3-3" /><path d="M9 17A7.5 7.5 0 0 1 11 4" /></>,
  },
  {
    num: '06', label: 'Climate', subtitle: 'SDG 13', sectionId: 'sdg-13', accent: '#6366F1',
    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" /><path d="M4.5 6.5h15M4.5 17.5h15" /></>,
  },
];

export default function SustainabilityPage() {
  return (
    <LiquidIndex items={items}>
      <div id="sdg-6" className="dummy-section">
        <h2>SDG 6 — Clean Water &amp; Sanitation</h2>
        <p>Data center cooling is consuming freshwater at a scale that is now triggering legislation, community conflicts, and litigation. The mechanism is evaporative cooling: tower systems continuously lose water to the atmosphere and cannot recover it.</p>
        <p>Single-phase immersion cooling using Methyl Myristate operates as a closed-loop system. No water evaporates, no water is withdrawn from local sources, and the fluid is not consumed.</p>
        <p>Conventional evaporative cooling tower water is treated with a cocktail of chemicals: biocides, corrosion inhibitors, descalers, and phosphate-based polymers. Discharged as blowdown into local waterways.</p>
        <p>Methyl Myristate is structurally a FAME — the same chemical class as biodiesel. No fluorine, no halogen, no persistent bond.</p>
      </div>
      <div id="sdg-7" className="dummy-section">
        <h2>SDG 7 — Affordable &amp; Clean Energy</h2>
        <p>SDG 7.3 requires doubling the global rate of improvement in energy intensity by 2030. Actual 2021 improvement was 0.8% against a required ~3.8%.</p>
        <p>Global data center electricity was ~415 TWh in 2024, projected ~945 TWh by 2030. Cooling is 30–40% of total facility energy.</p>
        <p>Single-phase immersion achieves PUE 1.02–1.08 vs 1.4–1.57 for air cooling — up to 95% cooling energy reduction.</p>
        <p>We remove the coolant availability bottleneck slowing immersion adoption globally.</p>
      </div>
      <div id="sdg-9" className="dummy-section">
        <h2>SDG 9 — Industry, Innovation &amp; Infrastructure</h2>
        <p>3M's PFAS exit removed the dominant two-phase immersion fluid. The hardware is ready — the coolant supply chain is not.</p>
        <p>Methyl Myristate is a FAME — same chemistry as biodiesel at million-tonne scale. No new industrial infrastructure needed.</p>
        <p>One fermentation platform → five industries: coolant, cosmetics, surfactants, textiles, lubricants.</p>
        <p>Immersion cooling reduces construction costs by 60% and floor space by two-thirds.</p>
      </div>
      <div id="sdg-11" className="dummy-section">
        <h2>SDG 11 — Sustainable Cities &amp; Communities</h2>
        <p>Air-cooled data centers discharge superheated air, warming neighborhoods 0.7–2.2°C. Cascading AC demand creates a feedback loop.</p>
        <p>Immersion cooling eliminates condenser arrays — no thermal plume, no municipal water withdrawal.</p>
        <p>Fermentation-based production enables regional coolant supply near urban data center clusters.</p>
        <p>Shorter supply chains, lower transport emissions, more resilient procurement.</p>
      </div>
      <div id="sdg-12" className="dummy-section">
        <h2>SDG 12 — Responsible Consumption &amp; Production</h2>
        <p>PFAS fluids are forever chemicals. Mineral oils are hazardous waste. Neither fits a circular economy.</p>
        <p>Enzymatic synthesis (CalB lipase) at 30–60°C — no acid/base waste, reusable catalyst.</p>
        <p>Glycerol byproduct feeds the next fermentation batch — a designed closed-loop.</p>
        <p>Upstream uses agricultural waste as feedstock — not competing with food supply.</p>
      </div>
      <div id="sdg-13" className="dummy-section">
        <h2>SDG 13 — Climate Action</h2>
        <p>Goldman Sachs projects 165% increase in DC power demand by 2030. AI is the fastest-growing industrial CO₂ source.</p>
        <p>Data centers radiate heat at 2–6× peak solar irradiance. Thermal signatures detectable 500m from facilities.</p>
        <p>A single DC generates waste heat equivalent to 40,000 households.</p>
        <p>Our single FAS point mutation enables faster regulatory clearance — deployable within the 2030 climate window.</p>
      </div>
    </LiquidIndex>
  );
}
