import LiquidIndex, { LiquidIndexItem } from '../components/LiquidIndex';

const items: LiquidIndexItem[] = [
  {
    num: '01', label: 'Clean Water', subtitle: 'SDG 6', sectionId: 'sdg-6', accent: '#38BDF8',
    iconSrc: '/hp_sus_sdg/goal6.svg',
    icon: <><path d="M12 2.5C8 7.5 5 11 5 14.5a7 7 0 0 0 14 0C19 11 16 7.5 12 2.5Z" /><path d="M9.5 16a3.5 3.5 0 0 0 5 0" /></>,
  },
  {
    num: '02', label: 'Clean Energy', subtitle: 'SDG 7', sectionId: 'sdg-7', accent: '#22D3EE',
    iconSrc: '/hp_sus_sdg/goal7.svg',
    icon: <path d="M13 2 4 13h5.5l-1 9L19 11h-5.5L15 2h-2Z" />,
  },
  {
    num: '03', label: 'Industry', subtitle: 'SDG 9', sectionId: 'sdg-9', accent: '#3B9EFF',
    iconSrc: '/hp_sus_sdg/goal9.svg',
    icon: <><circle cx="12" cy="12" r="3.5" /><path d="M12 1v2.5M12 20.5V23M1 12h2.5M20.5 12H23M4.2 4.2l1.8 1.8M18 18l1.8 1.8M4.2 19.8l1.8-1.8M18 6l1.8-1.8" /></>,
  },
  {
    num: '04', label: 'Cities', subtitle: 'SDG 11', sectionId: 'sdg-11', accent: '#3B82F6',
    iconSrc: '/hp_sus_sdg/goal11.svg',
    icon: <><path d="M2 22h20" /><path d="M6 22V6l4-3v19" /><path d="M10 22V9l5-2v15" /><path d="M15 22V10l4-2v14" /><path d="M8 10h0M8 13h0M8 16h0M12 12h0M12 15h0M12 18h0M17 13h0M17 16h0" /></>,
  },
  {
    num: '05', label: 'Consumption', subtitle: 'SDG 12', sectionId: 'sdg-12', accent: '#4F7BF0',
    iconSrc: '/hp_sus_sdg/goal12.svg',
    icon: <><path d="M12 4l3 3-3 3" /><path d="M15 7a7.5 7.5 0 0 1-2 13" /><path d="M12 20l-3-3 3-3" /><path d="M9 17A7.5 7.5 0 0 1 11 4" /></>,
  },
  {
    num: '06', label: 'Climate', subtitle: 'SDG 13', sectionId: 'sdg-13', accent: '#6366F1',
    iconSrc: '/hp_sus_sdg/goal13.svg',
    icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20" /><path d="M4.5 6.5h15M4.5 17.5h15" /></>,
  },
];

export default function SustainabilityPage() {
  return (
    <LiquidIndex items={items}>
      {/* Overview Block */}
      <div className="mb-10 p-8 rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(99,102,241,0.04)]">
        <h1 className="text-3xl font-bold text-[#0d1738] mb-2 font-['Space_Grotesk'] tracking-tight">Sustainability &amp; SDG Alignment</h1>
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-6 font-mono">iGEM IIT Bombay 2026: Biocoolant Overview</p>
        <img
          src="/hp_sustain.png"
          alt="Sustainability & SDG alignment overview"
          className="w-full h-auto rounded-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(99,102,241,0.06)] mb-6"
        />
        <div className="space-y-4 text-[#2d3b66] leading-relaxed text-[1.05rem]">
          <p>
            AI is the fastest-growing source of demand on two of Earth's most constrained resources: energy and freshwater. The infrastructure enabling this growth, high-density data centers, has a cooling problem it cannot solve with the fluids currently available. PFAS-based dielectric coolants are being phased out globally after 3M's 2022 exit from Novec manufacturing, mineral oils require hazardous disposal, and evaporative air cooling wastes millions of litres of water per day. It's also thermally unworkable above ~30 kW/rack, while modern AI accelerator racks routinely exceed 100 kW.
          </p>
          <p>
            Our project engineers <em>Saccharomyces cerevisiae</em> to biosynthesize Methyl Myristate, a C14 saturated fatty acid methyl ester (FAME), as a bio-based, PFAS-free, biodegradable dielectric coolant for single-phase immersion cooling. The production strategy is a single targeted mutation in the fatty acid synthase (FAS) chain-length gate that shifts the natural C16/C18 output toward C14, yielding myristic acid that is then esterified to Methyl Myristate.
          </p>
          <p>
            This isn't a niche lab curiosity: it directly addresses the structural gap at the coolant supply layer that is slowing immersion cooling adoption globally, and it does so through a production route that is low-overhead, aligned with existing industrial chemistry, and genuinely circular. Six UN Sustainable Development Goals follow from these properties, not from a surface-level mapping exercise.
          </p>
          <p className="text-xs italic text-[#5e6e96] pt-4 border-t border-slate-100 font-sans">
            Insights in this section have been informed by discussions with Prof. Rajesh Patkar (IIT Bombay, BSBE) on integrated approaches to sustainable infrastructure and the role of synthetic biology in bridging lab-scale proofs of concept with real-world industrial deployment.
          </p>
        </div>
      </div>

      {/* SDG 6 */}
      <div id="sdg-6" className="dummy-section">
        <h2>SDG 6: Clean Water and Sanitation</h2>
        
        {/* Alignment summary box */}
        <div className="p-5 rounded-xl bg-sky-50/50 border border-sky-100 mb-6 text-sm text-sky-900 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> By deploying a bio-based, PFAS-free, non-evaporative dielectric fluid whose production byproducts are recyclable rather than dischargeable, Biocoolat directly advances SDG 6.3 (improving water quality, reducing pollution), 6.4 (water-use efficiency across all sectors), and 6.6 (protecting freshwater ecosystems from chemical contamination).
        </div>

        <h3>The Problem: Data Centers Are in a Water Crisis, and Creating One</h3>
        <p>
          Data center cooling is consuming freshwater at a scale that is now triggering legislation, community conflicts, and litigation across the United States. The mechanism is evaporative cooling: tower systems continuously lose water to the atmosphere and cannot recover it.
        </p>
        <p>
          Simultaneously, the chemical-laden blowdown water they periodically discharge (containing biocides, corrosion inhibitors, descalers, and potentially PFAS) flows into local water systems with almost no public disclosure.
        </p>
        <p>
          This has now reached the point where U.S. states and Congress are acting with unusual urgency: at least 30 bills were proposed across 16 states in 2026 alone addressing data center water use, with 4 states enacting legislation. The H.R.6984 Data Center Transparency Act introduced in Congress in January 2026 explicitly requires reporting on <em>"the type and amount of pollutants discharged into water by data centers,"</em> acknowledging for the first time at the federal level that data centers aren't just consuming water but potentially contaminating it.
        </p>

        <h3>Two Distinct Water Protection Mechanisms</h3>
        
        <h4 className="text-base font-bold text-slate-800 mt-4 mb-2">1. Zero evaporative withdrawal: WUE of effectively 0 L/kWh</h4>
        <p>
          Single-phase immersion cooling using Methyl Myristate operates as a closed-loop system. No water evaporates, no water is withdrawn from local sources, and the fluid is not consumed. This directly contrasts with the industry average WUE of ~1.8 L/kWh for evaporative systems, which means a single hyperscale facility can consume up to 1.5 million litres of water per day, enough to supply thousands of households. Two-thirds of new U.S. data centers are being built in high water-stress regions; in those contexts, removing a facility from the evaporative water demand curve is not a marginal improvement. It is the difference between a data center that communities can coexist with and one they will fight.
        </p>

        <h4 className="text-base font-bold text-slate-800 mt-4 mb-2">2. Eliminating the chemical discharge burden, including PFAS</h4>
        <p>
          This is the part that rarely appears in immersion cooling pitches, and it's arguably more important than volume alone.
        </p>
        <p>
          Conventional evaporative cooling tower water is treated with a cocktail of chemicals: biocides to control <em>Legionella</em>, corrosion inhibitors (nitrites, molybdates, borates, azoles), descalers, and phosphate-based polymers. When this water is discharged as "blowdown," these chemicals go with it into local waterways. The U.S. EPA now requires NPDES permits for cooling tower blowdown and imposes strict limits on discharge temperature, TDS, pH, and, as of 2026, PFAS content and quaternary ammonia biocides.
        </p>
        <p>
          The PFAS dimension deserves specific attention. Two-phase immersion cooling, the dominant immersion approach before 3M's PFAS exit, uses fluorinated dielectric fluids. When these systems leak or their fluid is improperly disposed of, PFAS enters soil and groundwater. PFAS immersion fluids also break down into trifluoroacetic acid (TFA), a chemical linked to reproductive health risks. These "forever chemicals" have been detected in water systems near data center clusters, as documented by both WUNC News and North Carolina's Tar River conservancy activists, who are actively contesting a proposed 900 MW data center that would draw 500,000 gallons/day from the Tar River, a river already carrying existing PFAS loads.
        </p>
        <p>
          Methyl Myristate is structurally a FAME, the same chemical class as biodiesel. It contains no fluorine, no halogen, no persistent bond. If a Methyl Myristate system ever leaked, spilled, or was improperly decommissioned, the environmental risk profile is categorically different from PFAS fluids: a biodegradable, non-toxic, food-chemistry-adjacent molecule entering a watershed is not a forever-contamination event.
        </p>

        <h4 className="text-base font-bold text-slate-800 mt-4 mb-2">On bioreactor waste streams</h4>
        <p>
          Our production process generates a glycerol co-product from the transesterification step. Rather than treating this as effluent to be discharged, engineered <em>S. cerevisiae</em> strains can consume glycerol as a sole carbon source, meaning our byproduct feeds the next batch, not the water table. This is not just a theoretical circularity claim; it's been demonstrated in peer-reviewed literature (Swinnen et al., 2013) and is a key design principle of our upstream process.
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-sky-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                U.S. data centers directly consumed <strong>17.4 billion gallons</strong> of water in 2023, with up to 85% lost to evaporation.
              </p>
              <a href="https://mostpolicyinitiative.org/science-note/data-center-water-use/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                LBNL / MOST Policy Initiative (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Hyperscale evaporative cooling facilities can consume up to <strong>1.5 million litres</strong> of water per day per site.
              </p>
              <a href="https://datacentremagazine.com/news/how-are-companies-pioneering-data-centre-zero-water-cooling" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                Data Centre Magazine (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Immersion cooling achieves <strong>WUE = 0 L/kWh</strong> vs. industry average ~1.8 L/kWh.
              </p>
              <a href="https://www.eesi.org/articles/view/data-centers-and-water-consumption" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                EESI (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                At least <strong>30 bills</strong> were proposed across 16 states in 2026 alone addressing data center water use; 4 states enacted legislation.
              </p>
              <a href="https://climate-xchange.org/2026/04/webinar-recap-data-center-water-impacts/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                Climate XChange (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                <strong>H.R.6984 Data Center Transparency Act</strong> (119th Congress, Jan 2026) explicitly mandates reporting on pollutants discharged by data centers.
              </p>
              <a href="https://www.congress.gov/bill/119th-congress/house-bill/6984/text" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                U.S. Congress (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Cooling tower blowdown chemicals include biocides, corrosion inhibitors, and PFAS; EPA now requires <strong>NPDES permits with strict PFAS limits</strong>.
              </p>
              <a href="https://controlassociatesinc.com/blog/data-center-water-regulation-2026" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                Control Associates (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                PFAS immersion fluids leak into groundwater and degrade to <strong>TFA (trifluoroacetic acid)</strong>, linked to reproductive health risks.
              </p>
              <a href="https://www.sierraclub.org/sierra/data-centers-have-pfas-problem" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                Sierra Club / EESI (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Tar River conservancy groups actively contest a proposed <strong>900 MW</strong> data center that would draw 500,000 gallons/day.
              </p>
              <a href="https://www.wunc.org/environment/2026-04-10/data-centers-water-quality-pfas-drought-climate-change" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                WUNC News (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Two-thirds of new data centers since 2022 are in <strong>high water-stress regions</strong> (e.g., Arizona restricting groundwater certificates).
              </p>
              <a href="https://www.datacenterdynamics.com/en/news/ai-data-center-growth-deepens-water-security-concerns-in-high-stress-states-report/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                WRI / Bloomberg (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Senator Durbin's Act highlights: a 100 MW data center consumes water equivalent to <strong>2,600 households</strong>.
              </p>
              <a href="https://www.durbin.senate.gov/newsroom/press-releases/as-utility-costs-rise-durbin-introduces-new-legislation-to-bring-transparency-to-energy-and-water-consumption-by-data-centers" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                U.S. Senate (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/40 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Engineered <em>S. cerevisiae</em> strains utilize glycerol as a <strong>sole carbon source</strong> for closed-loop recycling.
              </p>
              <a href="https://doi.org/10.1186/1754-6834-6-157" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-sky-600 hover:text-sky-700 mt-3 inline-flex items-center">
                Swinnen et al. (2013) ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 7 */}
      <div id="sdg-7" className="dummy-section">
        <h2>SDG 7: Affordable and Clean Energy</h2>

        <div className="p-5 rounded-xl bg-cyan-50/50 border border-cyan-100 mb-6 text-sm text-cyan-950 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> By making high-efficiency immersion cooling accessible through a sustainable, scalable coolant supply chain, Biocoolat contributes to SDG 7.3 at precisely the industrial scale where the efficiency gap is most acute.
        </div>

        <h3>Understanding the Target: Where We Are and Why It Matters</h3>
        <p>
          It's worth being precise about what SDG 7 actually demands, because our project's relevance isn't obvious at first glance.
        </p>
        <p>
          SDG 7 has three formal targets. Target 7.1 is universal electricity access. Target 7.2 is increasing the share of renewables. Target 7.3 is <strong>doubling the global rate of improvement in energy intensity</strong> (defined as energy consumed per unit of GDP) by 2030 relative to the 1990–2010 baseline.
        </p>
        <p>
          We are not a power generation project. We do not produce clean electricity or expand access. What we do is speak directly to Target 7.3, and the urgency around that target is severe. The UN's own 2025 SDG Tracking Report shows that energy intensity improved only 0.8% in 2021, against a required annual rate of ~2.6–3.8%. The world is not on track. COP28 renewed the call to double the rate of efficiency improvement by 2030, but that trajectory is now being actively undermined by one of the fastest-growing industrial energy consumers on Earth: AI data centers.
        </p>

        <h3>How AI Data Centers Are Actively Working Against SDG 7.3</h3>
        <p>
          Global data center electricity consumption was ~415 TWh in 2024 and is projected to reach ~945 TWh by 2030. That trajectory, if unchecked, adds a massive, fast-growing denominator of energy consumption that is not matched by a corresponding increase in economic output efficiency. It actively degrades the global energy intensity metric SDG 7.3 is tracking.
        </p>
        <p>
          Cooling is the largest controllable fraction of that consumption: 30–40% of total data center facility energy in optimized modern builds. And the problem is structural: traditional air cooling simply cannot cool above ~30 kW/rack, which means as AI racks push past 100 kW (and they are), operators are forced to over-provision cooling infrastructure, deploy redundant thermal management, or throttle compute. None of these options improve energy intensity.
        </p>

        <h3>Where Methyl Myristate Fits</h3>
        <p>
          Single-phase immersion cooling using Methyl Myristate achieves PUE values of 1.02–1.08, versus 1.4–1.57 for conventional air-cooled facilities. That's a <strong>reduction in cooling-related energy consumption of up to 95%</strong>. Across a data center consuming 415 TWh annually, even partial adoption of immersion cooling at this efficiency level represents a contribution to energy intensity improvement that operates at the exact scale the SDG 7.3 tracking methodology measures.
        </p>
        <p>
          More precisely: by enabling immersion cooling with a bio-based, continuously-producible coolant whose supply chain doesn't depend on a single petrochemical manufacturer (3M's Novec exit left an entire industry without a PFAS dielectric supplier overnight), we remove the coolant availability bottleneck that is currently slowing immersion adoption. Not hardware readiness, not installation complexity, but simply: what do you fill the tank with?
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-cyan-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                SDG 7.3 requires <strong>~3.8% annual improvement</strong> in energy intensity to 2030; actual 2021 improvement was only 0.8%.
              </p>
              <a href="https://www.seforall.org/goal-7-targets/energy-efficiency" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 mt-3 inline-flex items-center">
                UN SDG Tracking Report / SEforAll (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                COP28 formally renewed the commitment to <strong>double the global rate of energy efficiency improvement</strong> by 2030.
              </p>
              <a href="https://www.iea.org/reports/tracking-sdg7-the-energy-progress-report-2025" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 mt-3 inline-flex items-center">
                IEA SDG7 Progress Report (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Global data center electricity consumption was <strong>~415 TWh</strong> in 2024, projected to hit ~945 TWh by 2030.
              </p>
              <a href="https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 mt-3 inline-flex items-center">
                IEA Energy and AI Report (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Cooling comprises <strong>30–40%</strong> of total data center facility energy in conventional configurations.
              </p>
              <a href="https://www.congress.gov/crs-product/R48646" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 mt-3 inline-flex items-center">
                Congressional Research Service (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Immersion PUE reaches <strong>1.02–1.08</strong>, representing up to 95% cooling power reductions over air cooling (1.4–1.57).
              </p>
              <a href="https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 mt-3 inline-flex items-center">
                LBNL Data Center Energy Report (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/10 hover:bg-cyan-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Single-phase immersion cooling reduces total cooling electricity power by <strong>up to 95%</strong>.
              </p>
              <span className="text-xs font-semibold text-slate-400 mt-3 font-sans">
                STET Journal (2024) [Citing GRC Data]
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 9 */}
      <div id="sdg-9" className="dummy-section">
        <h2>SDG 9: Industry, Innovation and Infrastructure</h2>

        <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 mb-6 text-sm text-blue-950 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> Our dual wet/dry lab validation, characterizing Methyl Myristate's dielectric and thermal properties alongside metabolic flux modeling in <em>S. cerevisiae</em>, establishes the first synthetic-biology-to-server-stack proof of concept for a bio-based immersion coolant designed from the outset to plug into existing industrial ester chemistry.
        </div>

        <h3>The Market Gap Our Project Was Built To Fill</h3>
        <p>
          The dielectric fluid market for immersion cooling has a structural problem: its dominant chemistry is being regulated out of existence. 3M's December 2022 PFAS exit, ceasing all Novec manufacturing by end of 2025, removed the industry's most widely-deployed two-phase immersion fluid from the market. Mineral oil alternatives work but require hazardous disposal and have viscosity profiles that don't suit next-generation high-density racks. The immersion cooling hardware ecosystem is ready. The coolant supply chain is not.
        </p>
        <p>
          This is the gap Biocoolat addresses, but it does so in a way that creates several layered SDG 9 impacts beyond simply "making a coolant."
        </p>

        <h3>Innovation: Riding Existing Industrial Rails</h3>
        <p>
          This is the point most bio-based chemical projects miss. Methyl Myristate is a FAME (fatty acid methyl ester), structurally the same compound class that the global biodiesel industry produces at multi-million-tonne scale via transesterification. That means our downstream conversion step, from yeast lipid output to finished dielectric fluid, doesn't require building new industrial chemistry from scratch. Transesterification reactors, methanol feedstocks, catalyst systems, and purification processes already exist at industrial scale. The innovation we're introducing connects to that infrastructure rather than demanding the world build something new before our molecule can be produced at volume. That is a genuinely different scale-up story from most synthetic biology proposals for novel bio-based chemicals.
        </p>

        <h3>Innovation: One Platform, Many Industries</h3>
        <p>
          A single engineered <em>S. cerevisiae</em> fermentation platform producing C14 myristic acid isn't locked to one market. The same backbone underlies an entire family of industrially valuable esters currently sourced from petrochemical or palm-derived feedstocks:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 text-[1.05rem]">
          <li><strong>Cosmetics and personal care:</strong> Methyl Myristate and related myristate esters (isopropyl myristate, sodium myristate, myristyl myristate) are established skin-conditioning emollients, emulsifiers, and texture agents used globally in skincare, haircare, and cosmetic formulations.</li>
          <li><strong>Surfactants and home care:</strong> Sodium myristate and related C14 esters function as surfactants and emulsifiers in soaps, shampoos, and detergents.</li>
          <li><strong>Textile auxiliaries:</strong> Myristate esters aid dye uptake and fabric finishing in textile processing.</li>
          <li><strong>Lubricants and metalworking:</strong> Myristate ester derivatives serve as industrial lubricants, metalworking fluid components, and high-performance carrier solvents for fragrance and pharmaceutical applications.</li>
        </ul>
        <p>
          With targeted downstream derivatization (esterification with different alcohols, partial oxidation, or chain extension), the same biosynthetic route could supply multiple of these adjacent markets simultaneously. The innovation story isn't "we made a coolant." It's that a single fermentation platform, built for one problem, can displace petrochemical and palm-oil inputs across an entire family of industrial esters, most of which currently carry palm-sourcing and deforestation liabilities that a C14-yeast route entirely sidesteps.
        </p>

        <h3>Industry: Decentralizing a Critically Centralized Supply Chain</h3>
        <p>
          The PFAS immersion fluid failure is an object lesson in what happens when a critical industrial input depends on a single supplier. 3M was effectively the sole global producer of PFAS dielectric fluids suitable for two-phase immersion. When they exited, the entire sector had no equivalent drop-in replacement. Fermentation-based production does not have this single-point-of-failure property. Yeast fermentation facilities can be sited regionally, near data center clusters, using locally available carbon feedstocks. This is a supply-chain resilience argument as much as a sustainability argument, exactly the kind of industrial diversification SDG 9.3 calls for.
        </p>

        <h3>Infrastructure: Immersion Is a Different Infrastructure Category</h3>
        <p>
          Single-phase immersion cooling using a fluid like Methyl Myristate reduces upfront data center construction costs by up to 60% by eliminating chillers, CRAC units, and raised floors, and cuts floor space requirements to roughly one-third of equivalent air-cooled configurations. Unlike direct-to-chip cooling, which only contacts the chip via a cold plate, immersion cools the entire board: VRMs, capacitors, PCIe cards, memory, every component that generates heat. This matters as AI racks push past 100 kW, because hotspot management becomes the bottleneck that direct-to-chip cooling handles poorly. The two approaches are complementary rather than competing (direct-to-chip retrofits better into existing air-cooled buildings), but for new-build AI infrastructure, the full-board thermal management that immersion provides is a fundamental infrastructure advantage.
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                3M exited all PFAS manufacturing (including Novec 1230) by end of 2025 under regulatory pressures.
              </p>
              <a href="https://www.sec.gov/Archives/edgar/data/0000066740/000006674022000085/a1220228kex-991.htm" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                3M SEC Form 8-K (2022) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Single-phase direct-to-chip holds <strong>55%</strong> liquid cooling market share as two-phase growth halted due to PFAS bans.
              </p>
              <a href="https://blog.se.com/datacenter/2026/05/22/pfas-phase-out-liquid-cooling-us-data-center-operators-must-do/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Schneider Electric Blog (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                <em>S. cerevisiae</em> is an established, resilient host for metabolic engineering of fatty acids and biofuels.
              </p>
              <a href="https://doi.org/10.1098/rsob.190049" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Hu et al., Open Biology (2019) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Methyl Myristate and myristate esters are established emollients and ingredients in global cosmetics.
              </p>
              <a href="https://www.cosmeticsinfo.org/ingredient/methyl-myristate/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Cosmetics Info ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Related myristate esters (e.g. Sodium Myristate) serve as surfactants in soaps, shampoos, and household applications.
              </p>
              <a href="https://www.nbinno.com/article/surfactants/sodium-myristate-applications-soaps-industrial-processes-ju" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                NBInno Surfactants Review (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Myristate derivatives function as industrial lubricants, metalworking fluids, and drug carrier solvents.
              </p>
              <a href="https://www.alfa-chemistry.com/resources/comprehensive-analysis-of-isopropyl-myristate-in-pharmaceutical-and-cosmetic-applications.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Alfa Chemistry (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Immersion cooling enables up to <strong>60% reduction in upfront construction costs</strong> and uses 1/3 of the floor space.
              </p>
              <a href="https://www.stet-review.org/articles/stet/full_html/2024/01/stet20240005/stet20240005.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                STET Journal (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Immersion cools the whole board (VRMs, memory, PCIe cards) unlike chip-only cold plates, handling high-density AI nodes.
              </p>
              <a href="https://www.linkedin.com/pulse/immersion-cooling-vs-direct-to-chip-d2c-technical-tco-joaquin-vzlnf" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                GBC Engineers / LinkedIn (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Global liquid immersion market is projected to reach <strong>USD 7.22 Billion by 2030</strong> with a CAGR of 22.3%.
              </p>
              <a href="https://www.grandviewresearch.com/industry-analysis/data-center-liquid-immersion-cooling-market-report" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Grand View Research (2025) ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 11 */}
      <div id="sdg-11" className="dummy-section">
        <h2>SDG 11: Sustainable Cities and Communities</h2>

        <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 mb-6 text-sm text-blue-950 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> Our project contributes to SDG 11.6 (reduce the adverse environmental impact of cities) and 11.b (integrated policies toward resource efficiency) by addressing data center thermal and water impact at the neighborhood scale, and by enabling a regionally-producible coolant supply chain that reduces urban infrastructure's dependence on central petrochemical inputs.
        </div>

        <h3>Mechanism</h3>
        <p>
          Urban data centers are the backbone of smart city infrastructure, powering municipal AI systems, traffic management, public health monitoring, and digital governance. As cities densify and AI workloads scale, the energy and water burden of data center cooling falls directly on urban grids and municipal water supplies.
        </p>
        <p>
          The critical, underappreciated dynamic here is feedback: an air-cooled data center in a city doesn't just consume electricity. It discharges heat into the surrounding neighborhood via condenser arrays, raising local air temperatures. Higher neighborhood temperatures drive higher air conditioning use in surrounding buildings. More AC means more electricity demand. More electricity demand feeds back into grid load that data centers share with residents. A single facility's thermal output creates a city-scale demand cascade.
        </p>
        <p>
          Immersion cooling with a closed-loop bio-based fluid breaks this cascade. No condenser arrays, no discharge of superheated air into residential streets, no evaporative water withdrawal from municipal supply: the facility's energy use drops (PUE 1.02 vs 1.5+), its water use approaches zero, and its thermal export to the surrounding neighborhood falls dramatically.
        </p>

        <h3>The locally-produced supply chain dimension</h3>
        <p>
          Because our production route is fermentation-based, the coolant itself can in principle be produced regionally, near urban data center clusters, using locally available feedstocks, rather than shipped from one of a handful of global PFAS manufacturing sites. Shorter supply chains mean lower transport emissions and, critically, lower exposure to the kind of single-supplier shock the PFAS phase-out just created. For city-level infrastructure planners, "our cooling fluid comes from a regional biorefinery that uses local agricultural waste" is a fundamentally more resilient procurement story than "our cooling fluid comes from a petrochemical facility on another continent that may be regulated out of business at any time."
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Over <strong>70% of global data center capacity</strong> is concentrated in or near major metropolitan areas.
              </p>
              <a href="https://www.jll.com/en/trends-and-insights/research/global-data-center-outlook" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                JLL Global Data Center Outlook (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                In cities like Dublin and Singapore, data centers consume <strong>25–30%</strong> of the total city electricity grid.
              </p>
              <a href="https://www.iea.org/reports/data-centres-and-data-transmission-networks" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                IEA Data Center &amp; Transmission Report (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                U.S. data center electrical capacity is projected to more than <strong>double by 2030</strong>.
              </p>
              <a href="https://news.asu.edu/20260518-environment-and-sustainability-turning-down-heat-data-centers" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                ASU News (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Even a 1–2°F increase in neighborhood air temperature drives significantly higher air-conditioning loads, cascading neighborhood grid demands.
              </p>
              <a href="https://asmedigitalcollection.asme.org/sustainablebuildings/article/7/2/024501/1233035/Data-Center-Waste-Heat-as-an-Emerging-Urban" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                ASU/ASME Field Study (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                The UN projects <strong>68% of the global population</strong> will live in urban areas by 2050, compounding urban infrastructure stress.
              </p>
              <a href="https://www.un.org/development/desa/en/news/population/2018-revision-of-world-urbanization-prospects.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                UN DESA Population Division (2018) ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 12 */}
      <div id="sdg-12" className="dummy-section">
        <h2>SDG 12: Responsible Consumption and Production</h2>

        <div className="p-5 rounded-xl bg-blue-50/50 border border-blue-100 mb-6 text-sm text-blue-950 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> By combining a biodegradable end-of-life profile, enzymatic synthesis at the manufacturing step, and a closed glycerol-recirculation loop, Biocoolat demonstrates that SDG 12.4 (environmentally sound management of chemicals throughout their lifecycle) and 12.5 (substantially reduce waste generation) can be addressed simultaneously rather than traded off, and that the circularity story starts at the reactor, not at the disposal stage.
        </div>

        <h3>The Problem With "Just Disposing of It Properly"</h3>
        <p>
          Conventional dielectric fluid end-of-life stories are quietly catastrophic. PFAS-class fluids have no viable environmental degradation pathway, are classified as forever chemicals by the EPA, are linked to reproductive harm and cancer, and require specialized high-temperature incineration that is expensive and imperfect. Mineral oil coolants are classified as hazardous waste requiring licensed disposal. Neither fits a circular economy. And the circular economy argument can't just be about what happens at the end of the fluid's life: it has to account for what happens when it's made.
        </p>

        <h3>The Manufacturing Story That's Usually Missing</h3>
        <p>
          Industrial FAME production, the same chemistry used to make biodiesel, is conventionally done by acid- or base-catalyzed transesterification: runs hot (150–250°C), requires strong acid (H<sub>2</sub>SO<sub>4</sub>) or strong base (NaOH) catalysts, generates acidic or alkaline waste streams requiring neutralization, and produces a wash stream loaded with soap and glycerol impurities. This is a chemically messy, energy-intensive, waste-generating process.
        </p>
        <p>
          An enzymatic route using immobilized lipase (<em>Candida antarctica</em> Lipase B, or CalB, the industrial workhorse for selective esterification) changes the green-chemistry profile of the manufacturing step itself:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 text-[1.05rem]">
          <li><strong>Mild conditions:</strong> CalB-catalyzed transesterification runs at 30–60°C, eliminating energy-intensive high-temperature costs.</li>
          <li><strong>No strong acid/base waste:</strong> The reaction proceeds in neutral or mildly buffered conditions, generating no acidic or basic neutralization streams.</li>
          <li><strong>Catalyst reuse:</strong> Immobilized CalB is recovered after each batch and reused across multiple production cycles. This is true catalytic recycling, not one-time catalyst consumption.</li>
          <li><strong>Higher selectivity:</strong> Enzymatic routes generate fewer byproduct impurities, significantly reducing downstream chemical purification burdens.</li>
        </ul>
        <p>
          This is a real, peer-reviewed green-chemistry differentiator at the synthesis step, not just an end-of-life biodegradability argument.
        </p>

        <h3>A Genuinely Closed Production Loop</h3>
        <p>
          Transesterification of the yeast's lipid output with methanol produces glycerol as a stoichiometric co-product, typically a disposal headache in conventional FAME production. Our production model treats this differently: engineered <em>S. cerevisiae</em> strains have been demonstrated to grow on glycerol as a sole carbon source, meaning the glycerol byproduct from our downstream esterification step can be fed back into the upstream fermentation as the carbon source for the next batch. This is not just "the molecule biodegrades eventually." It's a closed material loop between two stages of the same process, designed from the outset rather than retrofitted.
        </p>
        <p>
          Additionally, the upstream fermentation can utilize lignocellulosic hydrolysates and agricultural waste streams as primary carbon feedstocks, meaning we're not competing with food supply chains for glucose, but converting waste biomass into a high-value industrial chemical.
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                FAME-class compounds achieve <strong>&gt;60% biodegradation in 28 days</strong> under OECD 301B ready-biodegradability testing.
              </p>
              <a href="https://www.oecd.org/en/publications/test-no-301-ready-biodegradability_9789264070349-en.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                OECD Test Guideline 301 (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                PFAS dielectric fluids break down into persistent <strong>TFA (trifluoroacetic acid)</strong>, accumulating in watersheds and soil.
              </p>
              <a href="https://www.sierraclub.org/sierra/data-centers-have-pfas-problem" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Sierra Club / EESI Report (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Two-phase PFAS immersion systems leak into soil/groundwater, and discarded components release PFAS in municipal landfills.
              </p>
              <a href="https://fieldreport.caes.uga.edu/publications/TP121/how-data-centers-impact-surface-and-ground-waters/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                UGA Extension CAES Field Report (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                <em>S. cerevisiae</em> engineered to grow on glycerol enables recycled feedstock pathways in bioreactors.
              </p>
              <a href="https://doi.org/10.1186/1754-6834-6-157" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                Swinnen et al., Biotech for Biofuels (2013) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Data centers release PFAS during fire suppression discharges and e-waste disposal, compounding municipal environmental burdens.
              </p>
              <a href="https://www.eesi.org/articles/view/data-centers-are-contributing-to-pfas-forever-chemical-pollution" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center">
                EESI (2026) ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SDG 13 */}
      <div id="sdg-13" className="dummy-section">
        <h2>SDG 13: Climate Action</h2>

        <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-100 mb-6 text-sm text-indigo-950 leading-relaxed font-sans">
          <strong>Alignment Summary:</strong> By enabling immersion cooling at scale through a sustainable, rapidly-deployable bio-based coolant supply chain, Biocoolat contributes to SDG 13.2 (integrate climate change measures into national policies and planning) by demonstrating that a minimal synthetic biology intervention (a single FAS point mutation, a well-understood downstream esterification step, a production route plugged into existing industrial infrastructure) can address a climate problem at the scale where the problem actually lives: inside the thermal management systems of AI infrastructure.
        </div>

        <h3>Two Warming Stories: Grid CO<sub>2</sub> and Hyperlocal Heat</h3>
        <p>
          Most discussions of data center climate impact stay at the grid level: how much electricity, how much CO<sub>2</sub>. That's important: Goldman Sachs projects a 165% increase in data center power demand by 2030, and AI-driven incremental demand is estimated at ~200 TWh through 2030. Without efficiency intervention, that locks in substantial additional emissions from fossil-heavy grid mixes.
        </p>
        <p>
          But 2026 research has now documented a second, distinct warming mechanism that receives almost no attention: concentrated waste heat discharged directly into urban neighborhoods.
        </p>

        <h3>The Neighborhood-Level Heat Evidence</h3>
        <p>
          The ASU/ASME study published in May 2026 provides the first peer-reviewed, field-measurement-based evidence of this effect. Researchers mounted precision temperature sensors on vehicles and drove traverses around four Phoenix-area data centers from June to October 2025. The findings:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-700 text-[1.05rem]">
          <li>Air condenser arrays discharge air <strong>14–25°F above ambient</strong> into the surrounding environment.</li>
          <li>Data center heat flux densities <strong>exceed peak solar irradiance by a factor of 2–6x</strong>.</li>
          <li>Downwind air temperatures in residential neighborhoods are elevated by an average of <strong>0.7–0.9°C</strong>, with peaks up to <strong>2.2°C (4°F)</strong>.</li>
          <li>Thermal signatures are detectable at distances <strong>up to 500 meters</strong> from facility perimeters.</li>
          <li>A single data center's waste heat output can exceed that of <strong>40,000 households</strong>.</li>
        </ul>
        <p>
          With U.S. data center capacity projected to more than double by 2030, and hundreds of megawatts now concentrated in individual metropolitan areas, the ASU team's own assessment is stark: <em>"Even if these data centers only contribute to an additional heat island magnitude of 1 or 2 degrees, that can still have a very significant impact on our lives."</em> Each degree of additional air temperature drives higher air-conditioning use across entire surrounding neighborhoods, which itself generates more heat, more grid load, and more energy demand. This is a positive feedback loop.
        </p>
        <p>
          A separate preprint study led by University of Cambridge researchers, analyzing NASA satellite land temperature data across 6,000+ data centers globally over 20 years, found an average surface temperature increase of <strong>3.6°F after a facility began operations</strong>, detectable up to 6 miles from the facility, affecting an estimated 340 million people. The methodology of this study has been publicly contested (critics argue the signal may partially reflect general land-use change from construction, not specifically waste heat), and it has not yet been peer-reviewed; we present it as directionally suggestive evidence, not a settled finding.
        </p>
        <p>
          Immersion cooling using Methyl Myristate eliminates the condenser/CRAC heat-rejection pathway responsible for this localized discharge. The heat that would otherwise blast through rooftop condenser arrays into surrounding neighborhoods is instead captured in the closed-loop fluid and managed through a compact, contained heat exchanger, not expelled as a thermal plume into residential areas.
        </p>

        <h3>The Deployment Speed Argument: Why Biology Matters for Climate Timelines</h3>
        <p>
          Climate mitigation technologies are only as useful as how fast they can be deployed. Our FAS single-point-mutation strategy produces a strain with a significantly smaller genetic modification footprint than multi-gene overexpression pathways, which means a shorter path through biosafety assessment, a simpler regulatory filing, and faster access to pilot-scale fermentation capacity. Given that Goldman Sachs's 165% demand increase trajectory is built around a 2030 deadline, a coolant that can realistically reach commercial fermenters within that window, rather than one still working through years of strain optimization, matters as much as the molecule's intrinsic properties for determining actual climate impact.
        </p>

        <div className="mt-8">
          <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-widest mb-4 font-mono">Key Data &amp; References</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Goldman Sachs projects <strong>165% increase in data center power demand by 2030</strong>, driven by AI compute loads.
              </p>
              <a href="https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                Goldman Sachs Research (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Data centers and networks account for &lt;1% of global CO2, but AI compute is the fastest growing industrial emissions driver.
              </p>
              <a href="https://www.iea.org/reports/energy-and-ai/energy-supply-for-ai" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                IEA Energy and AI Report (2025) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Immersion cooling reduces cooling-related energy consumption by <strong>up to 95%</strong> over air-cooling facilities.
              </p>
              <a href="https://www.stet-review.org/articles/stet/full_html/2024/01/stet20240005/stet20240005.html" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                STET Journal (2024) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                ASU/ASME field study shows air condensers discharge air <strong>14–25°F above ambient</strong>, elevating downwind temperatures 0.7–0.9°C.
              </p>
              <a href="https://asmedigitalcollection.asme.org/sustainablebuildings/article/7/2/024501/1233035/Data-Center-Waste-Heat-as-an-Emerging-Urban" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                ASU/ASME Field Study (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                A single large data center generates waste heat output equivalent to <strong>40,000 households</strong>.
              </p>
              <a href="https://news.asu.edu/20260518-environment-and-sustainability-turning-down-heat-data-centers" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                ASU News (2026) ↗
              </a>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/10 hover:bg-indigo-50/30 transition-all flex flex-col justify-between">
              <p className="text-[0.92rem] text-slate-700 leading-snug">
                Cambridge preprint: satellite data across 6,000+ data centers indicates average surface temp increase of <strong>3.6°F downwind</strong>.
              </p>
              <a href="https://www.researchgate.net/publication/403073048_The_data_heat_island_effect_quantifying_the_impact_of_AI_data_centers_in_a_warming_world" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 mt-3 inline-flex items-center">
                Cambridge/ResearchGate (2026) ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </LiquidIndex>
  );
}
