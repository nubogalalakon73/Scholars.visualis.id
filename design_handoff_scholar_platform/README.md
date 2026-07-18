# Handoff: Scholar.visualis.id — Academic Discovery Platform

## Overview
Scholar.visualis.id is an Indonesian academic research discovery platform: search/browse research documents by university, discipline, and degree level, view document detail pages, and cross-sell into an external product ("ResearchOS", at risethibrida.com) via segmented CTA banners (S1/S2/S3-Scopus/Affiliate). This bundle covers 6 pages plus 3 shared components, built as a WordPress-target site (to be embedded as a Custom HTML block/page template, or rebuilt as a WP theme).

## About the Design Files
The files in this bundle (`*.dc.html`) are **design references built as streaming Design Components**, not production code to copy as-is — they use a custom `{{ }}` templating syntax, `<sc-for>`/`<sc-if>` loop/conditional tags, and a `<script type="text/x-dc" data-dc-script">` logic block that only runs inside this design tool's runtime. They are NOT valid standalone HTML/React and will not run unmodified anywhere else.

**Your task: recreate these designs as a real full-stack app**, not a WordPress site:
- **Frontend**: React (deployed on Vercel). Convert each `*.dc.html` page into a React route/page component; convert `Header`/`Footer`/`CtaBanner` into real reusable React components (`CtaBanner` takes a `variant` prop exactly as in the mock).
- **Backend**: A Node.js/Express (or similar) REST API, deployed on Render, replacing the static `data.js` sample data with real endpoints (documents, universities, disciplines, CTA content) backed by MongoDB.
- **Database**: MongoDB — model collections mirroring `data.js`'s shapes (see Data Model below): `documents`, `universities`, `disciplines`; `researchCTAs` can stay as static config/content rather than a DB collection unless the user wants it CMS-editable.

Treat this bundle as the visual/interaction spec and a rough data shape reference — not source to paste in.

## Target Stack
- **Frontend**: React, hosted on Vercel
- **Backend**: Node/Express API, hosted on Render
- **Database**: MongoDB (e.g. Atlas)

## Data Model (from `data.js`, to become MongoDB collections + API routes)
- `documents`: `id, title, authors[], universityId, university, faculty, program, degree (S1/S2/S3), year, language, repository, disciplineId, keywords[], abstract, doi`
- `universities`: `id, name, abbr, province, indexedDocs, status, topFaculties[]`
- `disciplines`: `id, name, mono, docCount`
- Suggested REST routes: `GET /api/documents` (supports query/filter/sort params mirroring the Search page's filters), `GET /api/documents/:id`, `GET /api/universities`, `GET /api/universities/:id`, `GET /api/disciplines`, `GET /api/disciplines/:id`, `GET /api/cta/:variant` (or bundle CTA content as static frontend config).

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy shown are final-intent. Recreate pixel-close using the design tokens below.

## Design System
Built on a design system called **Broadsheet** (newsprint-editorial: serif type, paper-white ground, restrained cyan/magenta accents, no boxes/rules for layout, cards reserved for discrete list items). The site's owner then applied direct overrides on top of Broadsheet (see Design Tokens) — most notably swapping the typeface to Inter and tightening corner radii — so implement the **override values**, not the base Broadsheet defaults, where they conflict.

## Screens / Views

### 1. Home (`Home.dc.html`)
- Sticky header (see Header component) then a single-column content well, `max-width:1280px`, horizontal padding `clamp(20px,5vw,64px)`.
- **Hero**: two-line serif/sans display headline (currently "Temukan" / "Karya Ilmiah Kampus Indonesia", orange accent word), subhead paragraph, then a white/tinted rounded search box (input + "Cari Penelitian" button) with a row of outlined "Populer:" keyword pill links beneath it, then a "Buka ResearchOS" secondary button.
- **Statistics band**: tinted rounded band, 4-column grid, big numeral + label per stat (Dokumen Terindeks, Universitas Terintegrasi, Disiplin Ilmu, Mitra Repository), centered text.
- **Discipline grid**: "Temukan Berdasarkan Disiplin" — 5 cards in a row, each a plain small icon (no circle backdrop) + name + doc count; card is the whole clickable link.
- **University grid**: 3 cards in a row inside a tinted band; each card has a square (not circular) dark badge with the university's abbreviation in white, name, province, doc count, status tag, "Jelajahi →" link.
- **Latest research**: 2 stacked full-width cards (title, authors, keyword tags, "Lihat Detail" + "Lanjutkan di ResearchOS" buttons).
- **Integrasi Repository** band (institution-facing CTA, separate from the researcher CTAs below).
- **Researcher CTA row** ("Sudah Menemukan Referensi?"): 4 `CtaBanner` cards side by side — variants `s1`, `s2`, `s3`, `aff` (see CtaBanner below).
- Footer (see Footer component).

### 2. Search (`Search.dc.html`)
- 3-column layout: left filter sidebar (230px, sticky) / results column (flexible) / right ResearchOS teaser card (280px, sticky).
- **Filters**: free-text search, Jenjang (degree) checkboxes S1/S2/S3, Universitas checkboxes (scrollable list), Disiplin Ilmu select, Bahasa select, Reset button.
- **Results header**: result count + fake search time, sort select (Relevansi/Terbaru/Terlama), List/Grid segmented toggle.
- **Result cards**: full metadata line, title, authors, repository tag, abstract, keyword tags, "Lihat Detail" / "Simpan" (bookmark toggle) / "ResearchOS" buttons.
- A `CtaBanner` (variant `s2`) is interspersed after the 2nd result card, before the rest of the results continue.
- Right sidebar: static ResearchOS teaser card.

### 3. Document detail (`Document.dc.html`)
- 3-column layout matching Search's proportions.
- **Left**: tinted metadata panel (author, institution link, faculty, program, degree, language, year, repository tag, DOI, "Salin Sitasi" copy-to-clipboard button with a 1.8s confirmation state).
- **Center**: discipline kicker, title, Abstrak section, Kata Kunci tag row, Tautan Repository / Unduh PDF buttons (placeholder hrefs).
- **Right**: a `CtaBanner` whose `variant` is chosen dynamically from the document's degree (S1→`s1`, S2→`s2`, else→`s3`), then an "Aksi Penelitian" card (Research Gap / Literature Review / Novelty Analysis / AI Research Assistant / "Lanjutkan Penelitian" — all external links), then a "Dokumen Terkait" list of related-document cards.

### 4. University profile (`University.dc.html`)
- Banner: square dark badge (abbreviation) + name + province + status tag.
- Stats row: big doc count numeral + "Fakultas Teratas" tag list.
- "Riset Terbaru dari {ABBR}" document card list.
- A `CtaBanner` (variant `s3`).
- Closing band: "Institusi Anda belum terdaftar?" + short body + "Jadi Mitra Repository" button → Partnership page.

### 5. Discipline page (`Discipline.dc.html`)
- Hero: kicker + discipline name (h1) + description paragraph.
- Tinted band: doc count numeral.
- "Topik Populer" tag row (derived from the discipline's documents' keywords).
- Tinted band: "Universitas Populer di Bidang Ini" — 3 cards.
- "Riset Terbaru" document card list.
- A `CtaBanner` (variant `s2`).
- Closing band: "Sudah menemukan referensi di bidang X?" + "Lanjutkan ke ResearchOS" button.

### 6. Partnership (`Partnership.dc.html`)
- Hero + "Ajukan Integrasi" (scrolls to wizard) / "Hubungi Kami" (mailto) buttons.
- Tinted band: 4 "Manfaat Bergabung" benefit cards (2×2 grid).
- "Alur Integrasi": 4-step numbered list.
- A `CtaBanner` (variant `aff`).
- Tinted band: FAQ as native `<details>/<summary>` accordion (3 Q&As).
- **Submit Repository wizard**: 4-step client-side wizard (Institution name → Repository URL → Platform radio-segment [DSpace/EPrints/OJS/Lainnya] → Contact name/email/phone), each step gated by simple required-field validation, ending in a success message ("Repository berhasil diajukan. Tim Scholar akan menghubungi {institution} melalui scholar@visualis.id.").

## Shared Components

### Header (`Header.dc.html`)
Sticky-feeling masthead: brand mark (circular "S" monogram, accent-filled) + wordmark + tagline, center nav (Discover/Universitas/Disiplin Ilmu/Kemitraan/Tentang) with an `activePage` prop controlling the active-link underline/color, right side: search icon link, "ID" language tag, "Login" ghost button, "Buka ResearchOS" primary button (external link, new tab). Wraps onto multiple rows at narrow widths instead of clipping.

### Footer (`Footer.dc.html`)
4-column: brand blurb / Navigasi links / Sumber Daya links / "Lanjutkan Riset" email + ResearchOS button. Bottom bar: copyright + social icon links.

### CtaBanner (`CtaBanner.dc.html`)
Reusable researcher-segment CTA card. Prop: `variant` (`s1`|`s2`|`s3`|`aff`). Pulls its copy from `data.js`'s `researchCTAs` array: kicker tag, title, body, CTA button (label/href/target). Content per variant:
- **s1** (Untuk Mahasiswa S1): "Sudah Menemukan Ide Judul Skripsi?" → external link, label "Mulai Penelitian S1"
- **s2** (Untuk Mahasiswa S2): "Sudah Sinkron Rujukan Tesis Anda?" → external link, label "Scan Proposal Tesis"
- **s3** (Untuk Peneliti & Dosen): "Siap Mengelevasi Topik ke Jurnal Internasional?" → external link, label "Validasi Naskah Jurnal"
- **aff** (Kemitraan & Ambassador): "Punya Komunitas Peneliti di Kampus Anda?" → `mailto:hello@risethibrida.com?subject=...`, label "Daftar Sebagai Partner"

## Interactions & Behavior
- **Home**: hero search form submits to `Search.dc.html?q=<encoded text>`; popular keyword links carry `?q=` too.
- **Search**: all filters are live client-side (no page reload) — text match across title/authors/keywords/university, degree/university/discipline/language filters, sort (relevance/newest/oldest), list/grid toggle, per-card "Simpan" bookmark toggle (local state only, not persisted), Reset button clears all filters. Search reads an initial `?q=` from the URL on load.
- **Document**: "Salin Sitasi" writes a formatted citation string to the clipboard and shows a checkmark label for 1.8s.
- **Partnership wizard**: pure client-side state machine (`step: 1–5`), Next/Back, per-step required-field validation disables the Next/Submit button, no real backend submission (this needs to be wired to a real endpoint in production).
- All "ResearchOS" / external CTA links point to `https://risethibrida.com` with `target="_blank" rel="noopener"`, except the affiliate CTA which is a `mailto:`.
- Internal navigation between pages passes state via URL query params (`?id=`, `?q=`) — no client-side router.

## State Management
- Each page's own local state: search/filter text and selections (Search), citation-copy toggle (Document), wizard step + form fields (Partnership), search query (Home).
- No global state; all "data" (documents, universities, disciplines, CTA copy) is static sample data loaded from `data.js` — replace with real API calls in production.

## Design Tokens
Base tokens come from the Broadsheet design system's `styles.css` (`--color-bg`, `--color-text`, `--color-accent` #0088b0, `--color-accent-2` #d6006c, `--color-neutral-100…900`, `--color-accent-100…900`, `--space-1/2/3/4/6/8`, `--radius-sm/md/lg`, `--shadow-sm/md/lg`). **This project overrides on top of that base**:
- **Typeface**: Inter (400/500/600/700) for both heading and body, replacing Broadsheet's default Source Serif 4 — loaded via Google Fonts and set with `--font-heading`/`--font-body` overrides.
- **Corner radius**: buttons and cards forced to `8px` (some elements locally overridden further to `5–15px` via direct edits — check individual inline styles).
- **Card surface**: cards use `var(--color-neutral-100)` (a near-white, slightly warm gray) with `box-shadow: var(--shadow-sm)` for a "lifted" look, rather than Broadsheet's flatter default surface.
- **Section "depth" bands**: alternating full-width rounded panels tinted `color-mix(in srgb, black 3%, var(--color-bg))` and `…black 5%…` are used to separate page sections instead of rules/dividers.
- Accent orange `#F14A17` / `#F24C00` / `#F55536` appear as direct one-off overrides on specific buttons/headline words (not systematic tokens) — treat as intentional brand-accent exceptions layered on the cyan/magenta Broadsheet palette.

## Assets
No photographic or illustration assets. All iconography is hand-authored inline SVG (search icon, external-link arrow, social icons, 5 discipline glyphs: cap/gear/briefcase/scale/heart). University/institution "logos" are typographic monogram badges (2–4 letter abbreviations), not real logo images.

## Files
- `Home.dc.html`, `Search.dc.html`, `Document.dc.html`, `University.dc.html`, `Discipline.dc.html`, `Partnership.dc.html` — the 6 pages
- `Header.dc.html`, `Footer.dc.html`, `CtaBanner.dc.html` — shared components, imported into each page
- `data.js` — sample data module: `documents`, `universities`, `disciplines`, `researchCTAs` arrays and lookup helpers (`getDocument`, `getUniversity`, `getDiscipline`, `getCTA`, `relatedDocuments`) — mirrors the real data shape the production API/CMS should return
