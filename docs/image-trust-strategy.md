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


## Stage 2 — real job photography (Nov 2026)

The first pass used brand-matched generated scenes as a floor. They have now
been **replaced by 17 real job photographs** and the generated/stock assets were
removed from `public/`.

**Asset organisation** — `public/images/jobs/`, subject-first filenames:

| File | Shows | Used for |
| --- | --- | --- |
| `kitchen-reset.webp` | White kitchen, worktops and fronts wiped | Hero, gallery, Residential |
| `kitchen-appliances.webp` | Built-ins, fridge, oven open | Hero, gallery, Deep clean, About |
| `bathroom-tap.webp` | Chrome tap polished | Gallery, About inset |
| `bathroom-suite.webp` | Bath, screen, frosted window | Hero, gallery, Airbnb |
| `oven-detail.webp` / `oven-glass-detail.webp` | Oven interior and door glass | Gallery, Hero, Deep clean |
| `towel-radiator.webp` | Chrome radiator polished | Custom / other |
| `office-clean.webp` | Office desks, chairs, carpet | Hero, gallery, Commercial |
| `carpet-before/-after.webp` | Carpet deep clean | Before/after pair |
| `washer-drawer-before/-after.webp` | Detergent drawer descale | Before/after slider |
| `extractor-filter-before/-after.webp` | Cooker hood filters degreased | Before/after pair |
| `extractor-filters-clean.webp`, `extractor-filter-detail.webp` | Clean/dirty filter detail | Service pages, spares |
| `carpet-edge.webp` | Carpet edge, threshold, skirting | End of tenancy |

**Two before/after renderers, chosen by framing**
- `kind: "slider"` — identical camera position (washer drawer). Drag-to-compare,
  keyboard accessible.
- `kind: "pair"` — different zoom/angle (carpet, hood filters). Side-by-side so
  the honest comparison is obvious instead of looking like a camera jump.

**Framing decisions**
- The homepage gallery is a **masonry** layout that keeps each photo's native
  3:4 aspect. Cropping phone photos into 16:9 tiles was throwing away the detail
  that proves the clean.
- Wide crops are only used where the subject survives them: hero, service cards
  and location bands.
- EXIF rotation applied, metadata stripped, WebP q82, 1600 px long edge —
  17 photos total **3.7 MB**, versus 7.6 MB for the previous four stock JPEGs.

**What this unlocked** — the site now proves work (gallery), proves change
(before/after), and proves range (kitchen, bathroom, oven, carpet, office,
appliance) without a single stock or generated image.

## The shot list — what to add next (highest impact first)

Generated/stock imagery is fine as a floor, but real photographs will outperform
all of it. In order of conversion value:

1. **One real team photo** — uniformed, at a doorstep or holding a caddy, faces
   visible and consenting. This is the biggest remaining gap: every photo proves
   the work, none yet proves the people. Goes in the About "How we work" block.
2. **More before/after pairs** — you already have three strong ones. Shower
   screens (limescale), ovens, and end-of-tenancy rooms are the highest-value
   additions; shoot each pair from the same spot, then add to `beforeAfterPairs`.
3. **A bedroom and a living room after-shot** — the gallery currently skews
   kitchen/bathroom/commercial. Two residential room photos would complete the
   "we clean whole homes" story.
4. **A holiday-let turnaround** — bed made, towels stacked, guest-ready. Directly
   sells the Airbnb service.
5. **Review screenshots** — your Google Business Profile reviews (name, stars,
   text) as images next to the existing testimonials.
6. **Insurance certificate / DBS evidence** — only if you are happy to publish it;
   a badge that links to the certificate is stronger than the badge alone.
7. **Per-neighbourhood shots** — a clean interior in a Bournemouth apartment vs a
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

- New photo → export WebP at 1600 px long edge, drop in `public/images/jobs/`,
  add an entry to `lib/images.ts` with descriptive alt text (room + finish, not
  "cleaning image"). Named `subject-detail.webp`, lowercase, hyphenated.
- Keep alt text specific: it feeds local SEO and screen readers.
- Re-run `npm run build` after edits; `npx tsc --noEmit` catches registry typos.
