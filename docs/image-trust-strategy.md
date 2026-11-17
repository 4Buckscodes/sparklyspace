# Trust imagery strategy — Sparkly Space

## The diagnosis

Before this change the site claimed trust but rarely showed it:

- Only the hero carried photography — 4 stock Pexels images.
- Those 4 files were **1.1–2.5 MB each** (~7.6 MB total) served to mobile users.
- Everything else was **text + icons**: "vetted", "fully insured", "100% satisfaction",
  with no visual proof anywhere in the funnel.
- Service pages, location pages, the about page and the booking funnel had **no
  images at all**, so at the exact moment a visitor decides to book there was
  nothing reassuring to look at.
- Testimonials used coloured initials, which offers no evidence of work quality.

A cleaning business is bought on **risk reduction**. Photos only build trust when
they answer one of four questions. That gives four layers, in priority order:

| Layer | Question it answers | Best asset | Where it belongs |
| --- | --- | --- | --- |
| 1. Credential | *What protects me if something goes wrong?* | Insurance, vetting, guarantee | Directly under the hero, and again on the booking page |
| 2. Work proof | *What will my home actually look like?* | Room-by-room photos, before/after | Homepage mid-scroll, service pages |
| 3. People proof | *Who is coming into my house?* | Team, uniform, equipment | About page, booking page |
| 4. Local proof | *Do they really work where I live?* | Local homes, neighbourhood context | Location landing pages |

The mistake most cleaning sites make is spending everything on layer 2 while
ignoring 1, 3 and 4 — or worse, putting all four on the homepage and leaving the
booking funnel bare.

## What was built

**Data layer — `lib/images.ts`**
One registry for every photo: `heroSlides`, `workPhotos` (tag + title + detail),
`servicePhotos` (service → photo), `peoplePhotos`, and `beforeAfterPairs`.
Swapping a placeholder for a real photo is a one-line edit, and nothing else in
the codebase needs to know.

**Components**
- `components/sections/TrustBar.tsx` — five credential chips. Full version for the
  homepage, `compact` version for the booking page.
- `components/sections/WorkGallery.tsx` — editorial portfolio grid: wide feature
  tile, supporting tiles, full-width closer. Captions describe **the standard**,
  never a specific customer's address.
- `components/sections/BeforeAfterSlider.tsx` — accessible drag-to-compare
  (range input = keyboard + screen-reader control). Renders **nothing** until real
  pairs exist in `beforeAfterPairs`.

**Placement map**

| Page | Added |
| --- | --- |
| Home `/` | Credential bar under the hero; "What a Sparkly Space clean actually looks like" gallery; conditional before/after section |
| Services `/services` | A photo per service card, tagged with the service name |
| Service detail `/services/[slug]` | Wide hero photo + "finished to a documented checklist" caption |
| Locations `/bournemouth`, `/poole`, `/christchurch` | "Inside a [town] clean" three-up band, so they stop feeling templated |
| About `/about` | "Who turns up" — caddy + eco product photos, four-step vetting/process list |
| Book `/book` | "Your home is protected" credential row + "what happens after you submit" card with photo |
| Hero carousel | 6 slides (was 4), sourced from the registry with real alt text |

**Performance discipline**
- Every source image re-exported as **WebP** (~1400 px long edge, q82, metadata
  stripped): `public/` images went from ~7.6 MB to ~1.1 MB.
- All images render through `next/image` with `fill` + explicit `sizes`; only the
  hero's first slide and the service-detail hero are `priority`.
- `public/pexels-*.jpg` originals were deleted after conversion.

## The shot list — what to replace next (highest impact first)

Generated/stock imagery is fine as a floor, but real photographs will outperform
all of it. In order of conversion value:

1. **Six real before/after pairs** — same angle, same light, phone photos are fine.
   Kitchens (oven, hob), bathrooms (shower screen, limescale), carpets, end of
   tenancy rooms, an Airbnb turnaround. Add to `beforeAfterPairs` and the slider
   appears automatically.
2. **One real team photo** — uniformed, at a doorstep or with caddies, faces
   visible and consenting. Goes in the About "Who turns up" block.
3. **Your actual equipment and products** — photograph the caddy, cloths, and the
   eco range you really use. It is the cheapest credibility on the site.
4. **Review screenshots** — your Google Business Profile reviews (name, stars,
   text) as images next to the existing testimonials.
5. **Insurance certificate / DBS evidence** — only if you are happy to publish it;
   a badge that links to the certificate is stronger than the badge alone.
6. **Per-neighbourhood shots** — a clean interior in a Bournemouth apartment vs a
   Christchurch cottage removes the "template page" feel from the location pages.

## Honesty rules (please keep these)

- Never caption stock or generated imagery as a named customer's home, or as a
  named team member. Caption the **standard shown** instead — that is what the
  current copy does.
- No badge for a credential you do not hold. The bar claims background checks,
  insurance, a 24-hour re-clean guarantee, eco products on request and opening
  hours — all of which the site already asserts. If any is not accurate, edit
  `TrustBar.tsx` the same day.
- Before/after must be the same room, same angle. A staged pair is worse than no
  pair, because one customer noticing it destroys the whole section.

## Maintenance

- New photo → export WebP at ~1400 px, drop in `public/images/`, add an entry to
  `lib/images.ts` with descriptive alt text (room + finish, not "cleaning image").
- Keep alt text specific: it feeds local SEO and screen readers.
- Re-run `npm run build` after edits; `npx tsc --noEmit` catches registry typos.
