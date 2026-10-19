# iGEM IIT Bombay 2026 Wiki — Handoff

You are picking up work on the iGEM IIT Bombay 2026 team wiki, "Project BiFrost" (a yeast-made methyl myristate immersion coolant). A separate `igem-2026-wiki-rules.md` has the official rules — read it; the hard constraints there override everything below.

## The two repositories

| Repo | Location | Folder on disk |
|---|---|---|
| GitHub (team's working repo) | `github.com/igem-iitb/wiki2026` | `F:\iGEM Wiki\wiki2026` ← main working folder |
| iGEM GitLab (publishes the live wiki) | `gitlab.igem.org/2026/iit-bombay` | `F:\iGEM Wiki\igem-gitlab` ← clone of iGEM's template, kept as backup |

- The live wiki URL is `https://2026.igem.wiki/iit-bombay` — note it is served from a **subfolder** `/iit-bombay/`, not a domain root.
- iGEM GitLab builds the site itself on every push to `main` using its `.gitlab-ci.yml` (Node 22, `yarn install --frozen-lockfile`, `tsc && vite build`, publishes the `public/` folder). You push **source code**, not built files.
- The `igem-gitlab` folder currently holds iGEM's generic starter template (verified: no real team content in it). The real wiki is in `wiki2026`.

## Tech stack

React 18 + Vite + React Router + Tailwind + CSS Modules. Most pages share `PageShell` (blue title banner `TitleCard`, sticky sphere index `LiquidIndex`, content). Four pages are standalone HTML in `public/pages/` shown via `IndexedEmbed`/`EmbeddedPage` (Home, Project Description, Entrepreneurship, Sustainability) — global code changes do NOT reach these, check them separately. Page text for Engineering/EO/iHP/Protocols lives in `engineeringContent.ts`, `eoContent.ts`, `ihpData.ts`, `wetlab/protocolsData.ts`.

## What has already been done (works, verified locally)

The wiki was built for a domain root and has been converted to the `/iit-bombay/` subfolder:
- `vite.config.ts` → `base: '/iit-bombay/'`; `src/main.tsx` router → `basename={import.meta.env.BASE_URL}`.
- ~205 absolute asset paths prefixed with `/iit-bombay` (142 in React code, 42 in `src/pages/drylab/content/*.html`, plus the Project Description frame). Verified: all 163 built assets resolve, all 20 routes return 200.
- `yarn.lock` created (iGEM builds with yarn; npm's `package-lock.json` alone fails the CI).
- iGEM's `.gitlab-ci.yml` copied into the project root.
- One TypeScript warning fixed so `tsc && vite build` passes.
- Local dev is now at `localhost:5173/iit-bombay/`. `npm run dev` / `npm run build` both pass.

**None of this is committed or pushed yet.** Nothing has gone to iGEM GitLab.

## What still MUST be done before it can go live (blockers)

These were discovered from the rules AFTER the subfolder work. They are the reason we have NOT pushed:

1. **Build output must be under 5 MB (hard limit; over = `413` build failure).** Current `public/` is ~255 MB. **Measured: even after moving ALL images/PDF/CSV/glb/video to the CDN, the build is still ~5.6 MB and would fail.** Breakdown of what remains: JS 1.81 MB (includes a 0.93 MB 3-D model-viewer bundle), HTML 3.31 MB, SVG 0.33 MB, CSS 0.12 MB. To get under 5 MB you MUST also:
   - **Base64 extraction — DONE.** The images baked into `home.html`, `sustainability.html`, `project-description.html` have been extracted to real files under `public/pages/<page>/extracted/` (11 files, ~2.1 MB; HTML dropped 3.31 MB → 0.44 MB). All 3 pages verified rendering with 0 broken images. **These extracted files must be uploaded to the CDN too** — the team should upload the folders `pages/home/extracted/`, `pages/sustainability/extracted/`, `pages/project-description/extracted/` (same base + extension rule). The HTML already points at `/iit-bombay/pages/<page>/extracted/...`, so the normal path swap converts them.
   - **Move the file-based SVGs to the CDN** (SVG is an accepted upload type, stays `.svg`): `titles/title-frame.svg`, `wetlab/safety/circle.svg`, `wetlab/protocols/*.svg`, `eo/atom/arrow.svg`, `ihp-icons/*.svg`, `hp_sus_sdg/*.svg`, `bifrost-logo.svg`, etc. (SVGs used *inline in JSX* are code, not files — leave those.)
   - **Consider dropping the 0.93 MB `@google/model-viewer` 3-D bundle** (CFD interactive models) if the Draco/jsdelivr external-request issue isn't worth solving — falling back to the existing static CFD images removes both problems at once.
   - The 3 PFD HTML files (`drylab/lca/pfd/*.html`, 120 KB total) stay in the repo — HTML can't go to CDN, they're tiny and font-clean.
   - **Filenames are now globally unique (so the team can upload FLAT, no folders needed).** Done: deleted 5 unused duplicate files (`members/nisarg-rathod.{jpg,png}`, `members/pratik.{jpg,png}` — only the `.jpeg` of each is used; `wetlab/protocols/arrow.svg` — unused). Renamed `drylab/lca/figures/lca_boundary.jpg` → `lca_boundary-lca.jpg` (ref updated). Renamed all 117 EO event photos from `eo/events/<slug>/NN.jpg` → `eo/events/<slug>/<slug>-NN.jpg` and updated the generator in `eoContent.ts` line 33. Collision recheck: **0 remaining**, 334 unique files. All pages verified rendering.
     - Because names are unique, the CDN path swap can be done two ways depending on how the team uploaded: (a) if uploaded FLAT, rewrite to `https://static.igem.wiki/teams/6489/wiki/<basename><newext>` (strip the folder); (b) if uploaded keeping folders, rewrite preserving the path. Confirm with the team which they did before running the swap.
   - All media must move OFF the repo:
   - **Images, PDFs, 3D models (.glb), CSVs → iGEM CDN** via the Uploads tab at `teams.igem.org/6489/deliverables/wiki`. The team is uploading these by hand, mirroring the `public/` subfolder structure (a `members` folder, `eo` folder, etc., with the same inner nesting).
   - **CDN URL base and extension rule (CONFIRMED from a real uploaded file):**
     - A local path `/iit-bombay/<path>` becomes `https://static.igem.wiki/teams/6489/wiki/<path>` — note the `wiki/` segment after the team number.
     - The CDN auto-converts images and the **URL extension changes** (the original-extension URL returns AccessDenied). Rules by source type:
       - `.jpg` / `.jpeg` / `.png` → `.avif`
       - `.gif` → `.webp`
       - `.webp` → `.webp` (unchanged)
       - `.svg` → `.svg` (unchanged)
       - `.pdf` / `.csv` / `.glb` / `.json` → unchanged (not images)
     - Example: `/iit-bombay/members/durva.jpg` → `https://static.igem.wiki/teams/6489/wiki/members/durva.avif`
     - So the code swap is mechanical: replace base `/iit-bombay/` → `https://static.igem.wiki/teams/6489/wiki/`, then apply the extension rule above per file. Affects ~205 paths across `src/**` and `src/pages/drylab/content/*.html` and the public HTML pages. Do it only AFTER the team confirms all folders are uploaded.
   - **Videos (.mp4, ~128 MB, 10 files) → iGEM Video Universe** ("Videos & audios" tab), embedded from there. Must be uploaded ≥2 days before freeze; never re-upload. Replace the `<video src=...>` tags (mainly in `src/pages/drylab/content/cfd.html`, `eoContent.ts`, contribution) with the Video Universe embed code.
2. **No external runtime requests.** — DONE for fonts. Google Fonts fully removed: Montserrat and Playfair Display now bundled via `@fontsource/*` (imported in `src/main.tsx`); all `fonts.googleapis.com` `<link>`/`@import` removed from `index.html`, the CSS files, `EmbeddedPage.tsx`, `IndexedEmbed.tsx`, and the 4 `public/pages/*.html`. The embedded iframe pages now fall back to `system-ui` (their `font-family` is `Montserrat, system-ui, sans-serif`); if the team wants exact Montserrat there, upload a Montserrat woff2 to the CDN and add an `@font-face` in those HTML files. Grep confirms zero `fonts.googleapis`/`fonts.gstatic` references remain.
   - **STILL TO CHECK — Draco decoder CDN fetch.** The CFD 3-D model viewer (`three.js` / `@google/model-viewer`, used by `src/pages/drylab/CfdModels.tsx`) contains a string `https://cdn.jsdelivr.net/npm/three@0.149.0/examples/jsm/loaders/...` — a DRACO decoder it fetches at runtime *only if the `.glb` files are Draco-compressed*. If they are, that is an external-request violation. Fix: check whether the 3 `.glb` models are Draco-compressed; if so, either re-export them uncompressed, or host the decoder locally / on the iGEM CDN and point the loader's decoder path at it. Verify with the HAR check on the CFD page.
   - Other external URLs in the build are outbound hyperlinks (DOI citations, references, namespace URIs) — those are allowed per rules §1.
3. **Standard URL pages at exact paths.** Judges look for exact paths; nested ones won't be evaluated. Current routes vs required:
   - `/project/engineering` → needs `/engineering`
   - `/human-practices/ihp` → needs `/human-practices`
   - `/project/contribution` → needs `/contribution`
   - also needed at root: `/model`, `/software`, `/education`, `/entrepreneurship`, `/sustainability`, `/measurement`, `/safety-and-security`
   - Decide: add these exact routes (can alias/redirect to existing pages) in `src/App.tsx` + navbar.
4. **Force-push is DISABLED on iGEM GitLab.** You cannot push GitHub history over the template. Copy the wiki's files into the `igem-gitlab` clone as normal commits on `main` (keep iGEM's `LICENSE` and `.gitlab-ci.yml` untouched), then push. Do NOT try `git push --force`.
5. **Footer must show** a CC-BY 4.0 license link + a visible link to `gitlab.igem.org/2026/iit-bombay`. Verify `src/components/Footer.tsx` (it already mentions the gitlab link; confirm the license link).
6. **AI disclosure** section/table required (see rules §6). Confirm it exists.

## Suggested order

1. Confirm whether the CDN Uploads tab supports bulk upload (changes effort a lot).
2. Move all images/PDFs/glb/csv to CDN, swap paths. Move videos to Video Universe, embed.
3. Remove Google Fonts → bundle locally. Re-check no external requests remain.
4. Add the exact standard-page routes + navbar entries.
5. Confirm footer + AI disclosure.
6. `npm run build`, confirm `dist` (what CI publishes) is **under 5 MB**.
7. Copy files into the `igem-gitlab` clone as a normal commit, push to `main`, watch Build → Pipelines on GitLab.
8. Open `2026.igem.wiki/iit-bombay`, run iGEM's HAR / External Content Check on the standard pages.

## Known content gaps (not blockers, but incomplete)

- Project Description: 2 ATGC sequence images under the primer diagram still missing (team to supply).
- iHP: Parth & Prof. Santanu "advised on" lines; some write-ups say "Write-up in progress".
- EO: actual PDF/CSV files for some events; 3 new events (survey, LCA guide, market research).
- Results tab: 3 boxes still marked incomplete by the team.
- Attributions page is a placeholder.

## Deadline

Wiki deadline is **Oct 21**. Media uploads to Video Universe need ≥2 days lead, so videos are time-critical.
