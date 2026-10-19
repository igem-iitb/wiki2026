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

## Adding or changing a page

1. Add the route in `src/App.tsx`.
2. Wrap the content in `PageShell` with a `title` and an `index` list (the sections the sphere index shows).
3. Add a link in `src/components/Navbar.tsx`.
4. Run `npm run build` to check it compiles.
