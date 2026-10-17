// Turns the draft's <details class="acc"> sections into closed-by-default dropdowns.
// Each section keeps its heading and its one-paragraph "In brief" box visible; the rest
// of the section (the detail) is exposed when the heading is clicked.

const SHOW = 'Show details';
const HIDE = 'Hide details';

export function enhance(html: string): string {
  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, 'text/html');
  const root = doc.getElementById('root')!;

  root.querySelectorAll<HTMLDetailsElement>('details.acc').forEach((d) => {
    const isRefs = d.classList.contains('refs');
    const h2 = d.querySelector(':scope > summary > h2');
    const body = d.querySelector(':scope > .acc-body');
    if (!h2 || !body) return;

    const section = doc.createElement('section');
    section.className = `acc2${isRefs ? ' acc2-refs' : ''}`;

    const head = doc.createElement('h2');
    head.className = 'acc2-h';
    if (h2.id) head.id = h2.id;
    const btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'acc2-btn';
    btn.setAttribute('aria-expanded', 'false');
    const label = doc.createElement('span');
    label.className = 'acc2-title';
    label.innerHTML = h2.innerHTML;
    const hint = doc.createElement('span');
    hint.className = 'acc2-hint';
    hint.textContent = SHOW;
    const chev = doc.createElement('span');
    chev.className = 'acc2-chev';
    chev.setAttribute('aria-hidden', 'true');
    btn.append(label, hint, chev);
    head.append(btn);
    section.append(head);

    const brief = body.querySelector(':scope > .brief');
    if (brief) {
      brief.classList.add('acc2-teaser');
      section.append(brief); // moves it out of the body
    }

    const detail = doc.createElement('div');
    detail.className = 'acc2-body';
    detail.hidden = true;
    while (body.firstChild) detail.append(body.firstChild);
    section.append(detail);

    d.replaceWith(section);
  });

  return root.innerHTML;
}

export function setSectionOpen(section: Element, open: boolean) {
  const btn = section.querySelector<HTMLButtonElement>('.acc2-btn');
  const body = section.querySelector<HTMLElement>('.acc2-body');
  if (!btn || !body) return;
  btn.setAttribute('aria-expanded', String(open));
  body.hidden = !open;
  const hint = btn.querySelector('.acc2-hint');
  if (hint) hint.textContent = open ? HIDE : SHOW;
  section.classList.toggle('acc2-open', open);
}

export function setAllOpen(container: HTMLElement | null, open: boolean) {
  container?.querySelectorAll('.acc2').forEach((s) => setSectionOpen(s, open));
}

/** Open the section that contains (or is) the element with this id. Returns the element or null. */
export function openForId(container: HTMLElement | null, id: string): HTMLElement | null {
  if (!container || !id) return null;
  const el = document.getElementById(id);
  if (!el || !container.contains(el)) return null;
  const sec = el.closest('.acc2');
  if (sec) setSectionOpen(sec, true);
  return el;
}
