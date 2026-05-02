# i-Pazaryeri Premium Public Redesign

Date: 2026-05-02

## Goal

Raise the public i-Pazaryeri site from a functional B2B landing page to a more premium, colorful SaaS/product launch experience. The direction should be closer to an Apple-style product page mixed with a modern B2B SaaS launch site.

## Direction

- Keep the theme light. Do not introduce a dark section system.
- Use larger typography, calmer whitespace, and a more confident first viewport.
- Make the hero feel like a product launch: strong copy, large staged dashboard mockup, layered interface pieces, and subtle motion.
- Keep "Teklif Al" as the primary action.
- Put projects high on the homepage and make them feel like proof, not a plain card grid.
- Use colorful accents, gradients, glass surfaces, and refined shadows without making the page noisy.
- Add animation through CSS where possible: scroll reveal, gentle float, hover lift, dashboard layer motion, and soft background movement.
- Extend the same visual system to public alt pages.
- Keep admin functionality and data model unchanged.

## Homepage Order

1. Hero with staged marketplace dashboard.
2. Featured projects as a proof showcase.
3. Sectors as a more visual grouped section.
4. Core modules with refined cards.
5. Setup process with premium horizontal rhythm.
6. Final CTA.

## Constraints

- Public content must still come from the database/admin.
- No pricing section.
- No dark theme.
- No timeline component.
- Do not break admin pages.

## Verification

- Run `pnpm test`.
- Run `pnpm build`.
- Verify `/`, `/projeler`, `/ozellikler`, `/sektorler`, `/blog`, `/teklif-al`, and `/admin/login` respond locally.
