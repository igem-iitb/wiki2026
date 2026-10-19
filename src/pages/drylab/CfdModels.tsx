import { useEffect, useRef, useState, type DetailedHTMLProps, type HTMLAttributes } from 'react';
import styles from './drylab.module.css';

// <model-viewer> is a web component; tell TypeScript about the attributes used here.
type ModelViewerAttrs = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  'camera-controls'?: boolean | string;
  'auto-rotate'?: boolean | string;
  'shadow-intensity'?: string;
  exposure?: string;
  'interaction-prompt'?: string;
  /** React 18 passes attributes to custom elements as written, so use `class`, not className. */
  class?: string;
};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttrs;
    }
  }
}

// Same simulation for all three: 1,200 W server, inlet 25 °C at 0.42 m/s.
const MODELS = [
  { id: 'mm', label: 'Methyl myristate', file: '/iit-bombay/drylab/cfd/models/mm-server.glb', max: '78.1 °C', ok: true },
  { id: 'mineral', label: 'Mineral oil', file: '/iit-bombay/drylab/cfd/models/mineraloil-server.glb', max: '87.2 °C', ok: false },
  { id: 'ester', label: 'Ester-based coolant', file: '/iit-bombay/drylab/cfd/models/ester-server.glb', max: '88.0 °C', ok: false },
];

/**
 * Figure 3 as rotatable 3-D models: one viewer, a button per coolant. The
 * viewer library (and three.js) only loads once the figure is close to the
 * screen, so the rest of the CFD page is not slowed down by it.
 */
export default function CfdModels() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        import('@google/model-viewer')
          .then(() => setReady(true))
          .catch(() => setFailed(true));
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const m = MODELS[active];

  return (
    <div ref={ref} className={styles.models}>
      <div className={styles.modelTabs} role="tablist" aria-label="Coolant">
        {MODELS.map((x, i) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`${styles.modelTab} ${i === active ? styles.modelTabOn : ''}`}
            onClick={() => setActive(i)}
          >
            {x.label}
            <span className={`${styles.modelTemp} ${x.ok ? styles.modelTempOk : styles.modelTempHot}`}>max {x.max}</span>
          </button>
        ))}
      </div>

      <div className={styles.modelStage}>
        {ready ? (
          <model-viewer
            key={m.id}
            src={m.file}
            alt={`Rotatable 3-D model of the server cooled by ${m.label}: surface coloured by temperature, flow tubes by coolant temperature`}
            camera-controls=""
            auto-rotate=""
            shadow-intensity="0.6"
            exposure="1.05"
            class={styles.modelViewer}
          />
        ) : (
          <p className={styles.modelNote}>{failed ? 'The 3-D viewer could not be loaded.' : 'Loading 3-D model…'}</p>
        )}
      </div>
      <p className={styles.modelHint}>
        Drag to rotate · scroll or pinch to zoom. Server surface coloured by temperature (25–90 °C, Turbo); flow
        tubes by coolant temperature (25–30 °C, Inferno).
      </p>
    </div>
  );
}
