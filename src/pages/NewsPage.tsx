import { useLayoutEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import { newsLayers, tickerItems, CANVAS_W, CANVAS_H } from './newsData';

// Map the Figma font names to web-safe stacks.
function fontStack(family: string): string {
  if (family === 'Times New Roman') return "'Times New Roman', Times, serif";
  if (family === 'Georgia') return "Georgia, 'Times New Roman', serif";
  if (family === 'Outfit' || family === 'Geologica') return `'${family}', system-ui, sans-serif`;
  return `'${family}', serif`;
}

// Render **bold** spans inside a text layer (newlines are kept by pre-wrap).
function renderRich(text: string) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong> : part,
  );
}

// Photos (cut-outs, kept PNG for transparency) + charts/infographics (JPEG),
// extracted from the Figma SVG and placed at their exact canvas rects.
const images: { src: string; left: number; top: number; width: number; height: number }[] = [
  { src: '/news/img/n1.webp', left: 68, top: 179, width: 169, height: 232 },   // Katie Muth
  { src: '/news/img/n0.webp', left: 1182, top: 174, width: 190, height: 237 }, // Ashwini Vaishnaw
  { src: '/news/img/n2.jpg', left: 307, top: 515, width: 480, height: 329 },
  { src: '/news/img/n7.jpg', left: 829, top: 902, width: 521, height: 339 },
  { src: '/news/img/n3.jpg', left: 83, top: 1198, width: 469, height: 267 },
  { src: '/news/img/n9.webp', left: 829, top: 1478, width: 322, height: 208 }, // Modi
  { src: '/news/img/n10.webp', left: 815, top: 1700, width: 550, height: 307 },
  { src: '/news/img/n4.jpg', left: 327, top: 1750, width: 461, height: 252 },
  { src: '/news/img/n5.jpg', left: 83, top: 2031, width: 706, height: 353 },
  { src: '/news/img/n6.webp', left: 1066, top: 565, width: 284, height: 301 },
  { src: '/news/img/n8.jpg', left: 1018, top: 2378, width: 347, height: 168 },
  { src: '/news/img/n11.webp', left: 825, top: 2783, width: 525, height: 311 },
  { src: '/news/img/n12.webp', left: 71, top: 3306, width: 1272, height: 559 },
];

// Filled color blocks + bordered boxes (Figma rectangles).
const boxes: { left: number; top: number; width: number; height: number; bg?: string; border?: boolean }[] = [
  { left: 69, top: 214, width: 720, height: 197, bg: '#A2E373' },  // green quote block
  { left: 789, top: 214, width: 583, height: 197, bg: '#48D7F8' }, // blue quote block
  { left: 86, top: 2543, width: 705, height: 104, bg: '#FBCAB2' }, // New York
  { left: 86, top: 2647, width: 705, height: 116, bg: '#F0FEB6' }, // Texas
  { left: 86, top: 2763, width: 705, height: 104, bg: '#9FFBD3' }, // Amsterdam
  { left: 86, top: 2867, width: 705, height: 104, bg: '#EED1FB' }, // Singapore
  { left: 1165, top: 1474, width: 207, height: 208, bg: '#FC8448', border: true }, // Modi quote box
  { left: 1012, top: 2372, width: 360, height: 337, border: true }, // chart frame
];

// Rules (Figma lines): horizontal unless marked vertical.
const rules: { left: number; top: number; width: number; height: number }[] = [
  { left: 71, top: 67, width: 1301, height: 1 },
  { left: 71, top: 421, width: 1301, height: 1 },
  { left: 310, top: 851, width: 477, height: 1 },
  { left: 810, top: 2019, width: 559, height: 1 },
  { left: 52, top: 3004, width: 758, height: 1 },
  { left: 808, top: 421, width: 1, height: 2884 }, // vertical column divider
];

/**
 * News Headlines, "iGEM IIT Bombay Times" special edition.
 * Rebuilt as real HTML from the Figma export: selectable text, the extracted
 * photos/charts as <img>, and the colour blocks/rules as elements, laid out on a
 * fixed 1440x4158 canvas that scales down to fit narrower viewports.
 */
// Newsprint grain: two faint dot layers over the cream so the sheet reads as
// paper rather than a flat fill. Pure CSS, so there is no image to load.
const NEWSPRINT = [
  'radial-gradient(circle at 1px 1px, rgba(120,104,74,0.13) 1px, transparent 0) 0 0 / 4px 4px',
  'radial-gradient(circle at 1px 1px, rgba(96,82,58,0.08) 1px, transparent 0) 2px 3px / 7px 7px',
  'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(214,201,172,0.22) 100%)',
].join(', ');

// The desk the sheet lies on: a warm linen tone with a soft light falling from
// the top, a fine woven texture, and a darker rim so the paper stands forward.
const DESK = 'linear-gradient(to bottom, #fafafa 0%, #6db8ea 101.6%)';

export default function NewsPage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CANVAS_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <main className="w-full" style={{ background: DESK }}>
      <div style={{ padding: 'clamp(0px, 3vw, 44px) clamp(0px, 3vw, 44px) 0' }}>
      <div
        ref={wrapRef}
        style={{
          width: '100%',
          maxWidth: CANVAS_W,
          height: CANVAS_H * scale,
          overflow: 'hidden',
          margin: '0 auto',
          borderRadius: 3,
          boxShadow: '0 2px 4px rgba(60,44,20,0.18), 0 22px 50px -10px rgba(60,44,20,0.45)',
        }}
      >
        <div
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            position: 'relative',
            background: NEWSPRINT,
            backgroundColor: '#F6F2E7',
            // aged edges: the cream deepens slightly towards the border
            boxShadow: 'inset 0 0 120px rgba(170,140,90,0.16)',
            border: '1px solid rgba(0,0,0,0.55)',
            boxSizing: 'border-box',
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
          {/* Colour blocks / bordered boxes */}
          {boxes.map((b, i) => (
            <div
              key={`box${i}`}
              style={{
                position: 'absolute',
                left: b.left,
                top: b.top,
                width: b.width,
                height: b.height,
                background: b.bg ?? 'transparent',
                border: b.border ? '1px solid #000' : undefined,
                boxSizing: 'border-box',
              }}
            />
          ))}

          {/* Rules */}
          {rules.map((r, i) => (
            <div
              key={`rule${i}`}
              style={{ position: 'absolute', left: r.left, top: r.top, width: r.width, height: r.height, background: '#000' }}
            />
          ))}

          {/* Photos / charts */}
          {images.map((im, i) => (
            <img
              key={`img${i}`}
              src={im.src}
              alt=""
              loading="lazy"
              style={{ position: 'absolute', left: im.left, top: im.top, width: im.width, height: im.height, objectFit: 'contain' }}
            />
          ))}

          {/* Text layers (selectable) */}
          {newsLayers.map((l, i) => (
            <div
              key={`t${i}`}
              style={{
                position: 'absolute',
                left: l.left,
                top: l.top,
                width: l.width,
                height: l.height,
                margin: 0,
                fontFamily: fontStack(l.fontFamily),
                fontSize: l.fontSize,
                lineHeight: `${l.lineHeight}px`,
                fontWeight: l.fontWeight,
                fontStyle: l.fontStyle,
                color: l.color,
                textAlign: l.textAlign as React.CSSProperties['textAlign'],
                textTransform: (l.textTransform as React.CSSProperties['textTransform']) || 'none',
                overflow: 'visible',
                whiteSpace: l.text.startsWith('BENNETT') ? 'nowrap' : 'pre-wrap',
              }}
            >
              {renderRich(l.text)}
            </div>
          ))}

          {/* Network ticker row */}
          <div
            style={{
              position: 'absolute',
              left: 202,
              top: 196,
              width: 1036,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            {tickerItems.map((t, i) => (
              <span
                key={`tk${i}`}
                style={{
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  fontSize: t.fontSize,
                  lineHeight: `${t.lineHeight}px`,
                  fontWeight: 700,
                  color: t.color,
                  whiteSpace: 'nowrap',
                }}
              >
                {t.text}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Footer bgColor="transparent" />
    </main>
  );
}
