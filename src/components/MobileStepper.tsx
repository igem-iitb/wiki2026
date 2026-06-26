import { useEffect, useRef, ReactNode } from 'react';

export type MobileStepperItem = {
  label: string;
  sectionId: string;
  accent: string;
  icon: ReactNode;
};

type Props = {
  items: MobileStepperItem[];
  active: number;
  onNavigate: (sectionId: string) => void;
};

/**
 * A horizontal checkpoint stepper bar with icons, connecting segments,
 * and labels. Scrolls auto-horizontally to keep the active step visible.
 * Use inside a sticky wrapper or include in any layout.
 */
export default function MobileStepper({ items, active, onNavigate }: Props) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const steps = nav.querySelectorAll('.mobile-step');
    const el = steps[active] as HTMLElement | undefined;
    if (el) {
      const target = el.offsetLeft + el.offsetWidth / 2 - nav.clientWidth / 2;
      nav.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    }
  }, [active]);

  return (
    <nav className="mobile-index mobile-index--visible" ref={navRef}>
      <div className="mobile-track">
        {items.map((it, i) => {
          const lit = i <= active;
          const current = i === active;
          return (
            <div key={it.sectionId} className="mobile-step">
              {i > 0 && <span className={`mobile-seg ${i <= active ? 'seg-lit' : ''}`} />}
              <button
                className={`mobile-node ${lit ? 'node-lit' : ''} ${current ? 'node-current' : ''}`}
                onClick={() => onNavigate(it.sectionId)}
                style={{ '--node-accent': it.accent } as React.CSSProperties}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mobile-node-icon">
                  {it.icon}
                </svg>
              </button>
              <span className={`mobile-lbl ${lit ? 'lbl-lit' : ''}`}>{it.label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
