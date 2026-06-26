# Wiki 2026 - React + Vite + CSS

This project uses React with Vite as the build tool. Styling uses Tailwind CSS utility classes and CSS Modules.

## Project Structure

```
src/
├── components/    -> Reusable components (Navbar, Footer, TeamCard, etc.)
├── pages/         -> Page-level components (Home, KytPage, AttributionPage)
├── App.tsx        -> Main app with react-router-dom routes
├── main.tsx       -> Entry point (renders into #root)
└── index.css      -> Global styles + Tailwind directives
```

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
