# CLAUDE.md — המטבח המרוקאי (moroccan-recipes-app)

## Project Overview

Bilingual (Hebrew RTL / English LTR) single-page recipe site. **50 Moroccan recipes, all kosher.**
Part of the World Recipes Hub — one of seven sibling country apps, each its own repo on GitHub Pages.

Live: https://robertog62.github.io/moroccan-recipes-app/
Hub: https://robertog62.github.io/recipes-world-hub/

## Run Locally

No build step. Serve the folder over HTTP (the app `fetch`es its JSON, so `file://` will not work):

```
python -m http.server 8000
```

## Architecture

Vanilla JS, no framework, no bundler, no dependencies. Four IIFEs loaded in dependency order:

```html
<script src="js/i18n.js"></script>   <!-- translations + language detection -->
<script src="js/data.js"></script>   <!-- fetch, search, filter, state -->
<script src="js/ui.js"></script>     <!-- all DOM rendering -->
<script src="js/app.js"></script>    <!-- router, init, orchestration -->
```

- **Views**: `#home-view` and `#recipe-view` are two divs toggled with the `hidden` class. There is no detail page per recipe and no modal.
- **Routing**: hash-based. `#/` is home, `#/recipe/{id}` is the detail view. A fragment (not a path) is what makes deep links work on GitHub Pages without rewrites.
- **Rendering**: 100% client-side via template literals and `innerHTML`.
- **Language**: `localStorage.lang` (`'he'` | `'en'`) is the only client storage in the app. Switching re-fetches the other JSON file.

## Key Patterns

### The "all" sentinel is localized — do not hardcode it
`state.allLabel` is set per language in `fetchRecipes` and every comparison goes through it. Hardcoding `'הכל'` breaks the filter in English; that was a real bug inherited from the template.

### CSP blocks inline event handlers
`index.html` declares `script-src 'self'` with no `'unsafe-inline'`. Inline `onload` / `onerror` **attributes do not run**. `.recipe-card-image` starts at `opacity: 0` and only `.loaded` reveals it, so the listeners are attached in JS in `renderCards`, with an `img.complete && img.naturalWidth > 0` check for images that finish loading from cache before the listener attaches.

Do not "fix" an image problem by adding `'unsafe-inline'` to the CSP.

### Dual-language lookup maps
`CATEGORY_ICONS`, the difficulty map and `KOSHER_BADGES` in `js/ui.js` are flat maps holding **both** the Hebrew and the English keys, so they resolve whichever language is loaded. Add both halves when adding a category.

## Data

`data/recipes-he.json` and `data/recipes-en.json` — same shape, same `id` order, same `image` paths.

```json
{
  "id": "dafina",                      // kebab-case, identical across both files; the routing key
  "title": "...",                      // HE: Hebrew name · EN: Latin transliteration (NOT the Arabic)
  "originalName": "الدفينة",            // Arabic, rendered italic under the title
  "description": "...",
  "category": "...",                   // one of 5, localized per file
  "kosherType": "בשרי|חלבי|פרווה",      // EN: Meat|Dairy|Parve
  "image": "images/Name.jpg",          // relative, no leading slash
  "prepTime": 40, "cookTime": 720, "servings": 8,
  "difficulty": "קל|בינוני|מאתגר",       // EN: Easy|Medium|Hard
  "ingredients": [{ "name": "", "quantity": "", "unit": "" }],   // all three are strings
  "instructions": ["..."],
  "tags": ["..."]
}
```

> `kosherType` is this app's only schema addition over the six sibling apps.

### Categories (5 × 10)

| HE | EN | icon |
|---|---|---|
| סלטים וממרחים | Salads & Dips | `fa-jar` |
| מרקים וחרירה | Soups & Harira | `fa-bowl-food` |
| טאג׳ין ובשרים | Tagines & Meats | `fa-fire-burner` |
| קוסקוס ומאפים | Couscous & Pastries | `fa-wheat-awn` |
| קינוחים ומתוקים | Desserts & Sweets | `fa-cake-candles` |

## Editing recipes

`RECIPES_LIST.md`, both JSON files and the image prompts are **generated** from one source, so counts and ids cannot drift apart. Edit the source, not the outputs.

Source + generator: `scratchpad/recipes/{cat1..cat5}.mjs` + `build.mjs`. The generator validates before it writes anything — if a rule fails, no file is emitted.

## Kashrut rules — enforced, not assumed

Every recipe must satisfy all of these, and `build.mjs` checks them against the **ingredient list**, never the title:

1. No pork, no shellfish. Fish must have fins and scales.
2. **No meat and dairy in the same recipe.**
3. `kosherType` must match what the ingredients actually contain.
4. Where a traditional recipe uses smen (fermented butter) with meat, it is replaced with olive oil and the step says so.

The site carries **no rabbinical certification** and says so in the footer and in `terms.html`. Do not remove that caveat.

## Design Tokens

CSS variables in `css/style.css :root`. The same colours are compiled into `assets/css/tailwind.css` as `ma-*` utilities — **both must change together**; there is no Tailwind build in this repo.

| Token | Hex | Use |
|---|---|---|
| `--ma-primary` | `#006233` | Moroccan flag green: CTAs, active pills, icons, step numbers |
| `--ma-primary-light` | `#5FBF8C` | text on navy, hub CTA border |
| `--ma-primary-dark` | `#00401F` | hover, card `originalName` |
| `--ma-cream` | `#FAFAFA` | page background |
| `--ma-charcoal` | `#1A1A1A` | body text |
| `--ma-navy` | `#0A1628` | footer, hero scrims |
| `--ma-warm-gray` | `#F5F0EB` | tag pills |
| `--ma-text-secondary` | `#6B7280` | muted text |
| `--ma-border` | `#E5E1DC` | 1px borders |

Contrast for every pair is measured and recorded in `governance/README.md`. Re-measure if you change a colour.

Fonts: Heebo (Hebrew), Inter (English), Playfair Display (headings) — all self-hosted in `assets/fonts/`. **Zero third-party requests** is a compliance property of this site, not an accident: do not add a CDN link.

## Images

51 JPEGs in `images/` — 50 recipes plus `Moroccan_Cuisine_Hero_Background.jpg`, which is referenced from `css/style.css .home-hero`, not from data.

Filenames are `PascalCase_With_Underscores.jpg` based on the English dish name. The mapping from `id` to filename lives only in the JSON — there is no algorithm.

Generated with `gemini-3.1-flash-image` at 4:3. Prompts carry an explicit kashrut constraint (no dairy in frame for a meat dish, and so on).

## Deploy

GitHub Pages serving the repo root of `master`. No CI, no workflows, no CNAME — `git push` is the deploy.
