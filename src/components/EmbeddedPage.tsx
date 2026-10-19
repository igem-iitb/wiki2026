import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Footer from './Footer';
import footerCss from './Footer.module.css?inline';
import waveCss from './WaveFooter.module.css?inline';

type EmbeddedPageProps = {
  /** Path to the HTML file served from the public/ folder, e.g. "/iit-bombay/pages/home.html" */
  src: string;
  title: string;
};

const HOST_ID = 'site-footer-host';
const MONTSERRAT_HREF =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';

// Lives inside the footer's shadow root: `all: initial` stops the embedded
// page's inherited styles at the boundary, then the base resets the footer gets
// from Tailwind's preflight in the app, then the footer's own CSS modules.
const SHADOW_CSS = `
:host { all: initial; display: block; position: relative; z-index: 1; font-family: 'Montserrat', sans-serif; line-height: 1.5; }
*, *::before, *::after { box-sizing: border-box; }
h2, p, address { margin: 0; }
a { color: inherit; text-decoration: inherit; }
img, svg { display: block; max-width: 100%; }
${footerCss}
${waveCss}
`;

/**
 * Renders a self-contained static HTML page (with its own CSS/JS) inside an
 * iframe that fills the viewport below the 72px navbar. The shared site footer
 * is portalled into the end of the embedded document (inside a shadow root, so
 * neither page's CSS reaches the other), so page and footer share one
 * continuous scroll. The iframe keeps its own scroll because these pages drive
 * sticky scenes and scroll listeners from their own document.
 */
export default function EmbeddedPage({ src, title }: EmbeddedPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [footerRoot, setFooterRoot] = useState<ShadowRoot | null>(null);

  // The embedded page scrolls inside its iframe, so the outer page must not
  // scroll as well (that produced a second scrollbar).
  useEffect(() => {
    const prev = document.documentElement.style.overflowY;
    document.documentElement.style.overflowY = 'hidden';
    return () => {
      document.documentElement.style.overflowY = prev;
    };
  }, []);

  const mountFooterHost = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc || doc.getElementById(HOST_ID)) return;

    // @font-face must be declared at document level to be usable in the shadow root.
    if (!doc.querySelector(`link[href="${MONTSERRAT_HREF}"]`)) {
      const font = doc.createElement('link');
      font.rel = 'stylesheet';
      font.href = MONTSERRAT_HREF;
      doc.head.appendChild(font);
    }

    const host = doc.createElement('div');
    host.id = HOST_ID;
    doc.body.appendChild(host);
    const root = host.attachShadow({ mode: 'open' });
    const style = doc.createElement('style');
    style.textContent = SHADOW_CSS;
    root.appendChild(style);
    setFooterRoot(root);
  };

  return (
    <main className="w-full">
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        onLoad={mountFooterHost}
        className="w-full border-0 block"
        style={{ height: 'calc(100dvh - 73px)' }}
      />
      {/* Transparent so the embedded page's own background flows into the waves */}
      {footerRoot && createPortal(<Footer bgColor="transparent" />, footerRoot)}
    </main>
  );
}
