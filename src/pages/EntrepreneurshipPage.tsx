import IndexedEmbed from '../components/IndexedEmbed';
import { HP_TYPOGRAPHY_CSS } from '../components/hpTypography';

export default function EntrepreneurshipPage() {
  return (
    <IndexedEmbed
      src="/iit-bombay/pages/entrepreneurship.html"
      title="Entrepreneurship"
      art="bulb"
      sectionSelector="section.sec"
      describe={(el, i) => {
        const h = el.querySelector('h2')?.textContent?.trim() ?? `Section ${i + 1}`;
        return { label: h.length > 22 ? h.slice(0, 20) + '...' : h };
      }}
      injectCss={`.rail,.bar,.prog{display:none!important}${HP_TYPOGRAPHY_CSS}`}
    />
  );
}
