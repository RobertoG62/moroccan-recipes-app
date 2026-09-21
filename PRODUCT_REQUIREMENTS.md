# PRD — המטבח המרוקאי

## Vision

A bilingual catalogue of authentic Moroccan home cooking that a kosher-keeping cook can use without
having to check, substitute or guess. The seventh country in the World Recipes Hub.

The constraint is the point: Moroccan cooking is unusually well suited to it — a Muslim-majority
country, so no pork to begin with, and a living Moroccan-Jewish tradition (dafina, chreime, mofletta)
that belongs in the catalogue on its own merits.

## Features (V1)

- 50 recipes, 5 categories × 10
- Every recipe marked **בשרי / חלבי / פרווה** on the card and in the detail view
- Bilingual HE/EN with browser detection and a remembered choice (`localStorage.lang`)
- Hebrew RTL by default; layout, fonts and borders flip with the language
- 200ms-debounced search across title, description, ingredient names and tags
- Category pill filters, derived from the data rather than hardcoded
- Full-page recipe detail on a hash route, deep-linkable
- WhatsApp share that sends the ingredient list as a checkbox shopping list
- Lazy-loaded images with a placeholder fallback
- Privacy / Terms / Accessibility pages, bilingual
- Zero third-party network requests

## Design

Moroccan flag green (`#006233`) on cream, with navy for the footer and hero scrims. Glassmorphism
panels, a responsive `auto-fill minmax(300px, 1fr)` grid, Heebo / Inter / Playfair Display.
Every colour pair meets WCAG AA; the measurements are in `governance/README.md`.

## Non-Goals (V1)

- No accounts, no user submissions, no comments
- No backend, no database — two static JSON files
- No offline mode, no PWA
- No rabbinical certification. The site applies kosher rules to recipes; it does not grant a hechsher,
  and the kashrut of the products a cook buys is theirs to check.
