# iGEM IIT Bombay 2026 Wiki: BiFrost

The team wiki for **Project BiFrost**, a yeast-made, biodegradable methyl myristate coolant for data-centre immersion cooling.

Built with React 18, Vite, React Router, Tailwind CSS and CSS Modules. Deployed on Vercel.

## Getting started

Needs Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:5173>. If a page fails to load after pulling new code, run `npm install` again, because a teammate may have added a package.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project layout

```
src/
  App.tsx            Routes
  components/        Shared pieces: Navbar, Footer, PageShell, TitleCard, LiquidIndex, IndexedEmbed, ...
  pages/             One file per tab, plus the text and data each tab shows
    drylab/          Dry Lab pages (HTML content in drylab/content/)
    wetlab/          Protocols, Notebook, Parts, Safety
public/
  pages/             Standalone HTML pages (Home, Project Description, Entrepreneurship, Sustainability)
  drylab/, eo/, wetlab/, news/, members/    Images, figures and PDFs
```

### How pages are built

- **Shared layout.** Most tabs use `PageShell`: the blue title banner (`TitleCard`) on top, the sticky sphere index on the left (`LiquidIndex`) and the content on the right. A change to `PageShell` reaches all of them.
- **Embedded pages.** Home, Project Description, Entrepreneurship and Sustainability are standalone HTML files in `public/pages/`, shown through `IndexedEmbed` (shared layout) or `EmbeddedPage` (full page). They have their own styles, so a global change does **not** reach them. Check them separately.
- **Content lives in data files.** Text for Engineering, EO, iHP and Protocols is in `engineeringContent.ts`, `eoContent.ts`, `ihpData.ts` and `wetlab/protocolsData.ts`. Edit those to change the wording.

## Design rules

- One font everywhere: **Montserrat**.
- Page background runs from `#fafafa` at the top to light blue `#6db8ea` at the bottom.
- Boxes have rounded corners and 22px between them.
- No em dashes and no emoji in the text.
- Compress images before adding them (WebP, around 2000px wide at most) to keep pages quick.

## Adding or changing a page

1. Add the route in `src/App.tsx`.
2. Wrap the content in `PageShell` with a `title` and an `index` list (the sections the sphere index shows).
3. Add a link in `src/components/Navbar.tsx`.
4. Run `npm run build` to check it compiles.
