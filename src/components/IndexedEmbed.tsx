import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Footer from './Footer';
import LiquidIndex, { type LiquidIndexItem } from './LiquidIndex';
import TitleCard from './TitleCard';
import shell from './PageShell.module.css';

type Section = { id: string; label: string; subtitle: string; top: number };

type Props = {
  src: string;
  title: string;
  art?: string;
  /** CSS selector for the sections of the embedded page that make up the index. */
  sectionSelector: string;
  /** Label / subtitle for a section element. */
  describe: (el: Element, i: number) => { label: string; subtitle?: string };
  /** CSS injected into the embedded page (hide its own header, rail, etc.). */
  injectCss?: string;
};

const ACCENTS = ['#38BDF8', '#22D3EE', '#3B9EFF', '#3B82F6', '#4F7BF0', '#6366F1'];
const ICONS: ReactNode[] = [
  <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></>,
  <><path d="M4 19V9M10 19V4M16 19v-7M22 19H2" /></>,
  <><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" /></>,
];

/**
 * A static HTML page shown in an auto-sized iframe inside the shared layout:
 * title banner on top, sticky liquid index on the left. Invisible markers are
 * laid over the iframe at each section so the index can scroll to them.
 */
export default function IndexedEmbed({ src, title, art, sectionSelector, describe, injectCss }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);
  const [sections, setSections] = useState<Section[]>([]);

  const measure = () => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    setHeight(Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight));
    const top = doc.documentElement.getBoundingClientRect().top;
    const els = Array.from(doc.querySelectorAll(sectionSelector));
    setSections(
      els.map((el, i) => {
        const d = describe(el, i);
        return { id: `emb-${i}`, label: d.label, subtitle: d.subtitle ?? '', top: el.getBoundingClientRect().top - top };
      }),
    );
  };

  const onLoad = () => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const style = doc.createElement('style');
    style.textContent = `html,body{overflow:hidden!important;background:transparent!important}body,h1,h2,h3,h4,p,li,td,th,summary,button{font-family:Montserrat,system-ui,sans-serif!important}${injectCss ?? ''}`;
    doc.head.appendChild(style);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(doc.body);
    window.setTimeout(measure, 600);
    window.setTimeout(measure, 2000);
  };

  useEffect(() => () => undefined, []);

  const items: LiquidIndexItem[] = sections.map((s, i) => ({
    num: String(i + 1).padStart(2, '0'),
    label: s.label,
    subtitle: s.subtitle,
    sectionId: s.id,
    accent: ACCENTS[i % ACCENTS.length],
    icon: ICONS[i % ICONS.length],
  }));

  const wrap: CSSProperties = { position: 'relative', height };

  return (
    <main className={shell.page}>
      {items.length ? (
        <LiquidIndex items={items} className={shell.grad} header={<TitleCard title={title} art={art} />}>
          <div style={wrap}>
            {sections.map((s) => (
              <div key={s.id} id={s.id} style={{ position: 'absolute', left: 0, top: s.top, height: 1, width: 1 }} />
            ))}
            <iframe ref={frameRef} src={src} title={title} onLoad={onLoad} scrolling="no" style={{ width: '100%', height, border: 0, display: 'block' }} />
          </div>
        </LiquidIndex>
      ) : (
        <>
          <TitleCard title={title} art={art} />
          <div style={{ padding: '0 24px', maxWidth: 1100, margin: '0 auto' }}>
            <iframe ref={frameRef} src={src} title={title} onLoad={onLoad} scrolling="no" style={{ width: '100%', height, border: 0, display: 'block' }} />
          </div>
        </>
      )}
      <Footer bgColor="transparent" />
    </main>
  );
}
