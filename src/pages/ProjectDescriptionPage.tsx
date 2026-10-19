import IndexedEmbed from '../components/IndexedEmbed';

export default function ProjectDescriptionPage() {
  return (
    <IndexedEmbed
      src="/iit-bombay/pages/project-description.html"
      title="Project Description"
      sectionSelector="main > section:has(h2)"
      describe={(el, i) => {
        const h = (el.querySelector('h2')?.textContent ?? `Section ${i + 1}`).replace(/^\d+\.\s*/, '').trim();
        return { label: h.length > 22 ? h.slice(0, 20) + '...' : h };
      }}
      injectCss=".title,.rail{display:none!important}.layout{display:block!important}main{display:flex!important;flex-direction:column!important;gap:22px!important}.wrap{padding-top:0!important;max-width:none!important}"
    />
  );
}
