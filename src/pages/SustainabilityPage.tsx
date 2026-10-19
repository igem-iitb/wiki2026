import IndexedEmbed from '../components/IndexedEmbed';
import { HP_TYPOGRAPHY_CSS } from '../components/hpTypography';

export default function SustainabilityPage() {
  return (
    <IndexedEmbed
      src="/pages/sustainability.html"
      title="Sustainability"
      art="leaf"
      sectionSelector="main > section"
      describe={(el, i) => {
        const h = el.querySelector('h2')?.textContent ?? '';
        const m = h.match(/^(SDG \d+)\s*[-\u2013\u2014,:]\s*(.*)$/);
        return m ? { label: m[1], subtitle: m[2] } : { label: i === 0 ? 'Overview' : h, subtitle: '' };
      }}
      injectCss={`.title{display:none!important}.wrap{padding-top:0!important}${HP_TYPOGRAPHY_CSS}`}
    />
  );
}
