<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:image-fill-height-rule -->
# `<Image fill>` requires a definite height on the positioned parent

`height: 100%` resolves to 0 when the parent's height is implicit (e.g., `auto` grid rows, flex, or `aspect-ratio`-computed). The browser treats `aspect-ratio` as a *used* height, not a *definite* one for percentage-child resolution.

**Safe patterns (pick one):**
1. `aspect-*` directly on the element that is `relative` for `fill` — avoids `h-full` chains entirely.
2. If using `h-full` chains: every link in the chain must have a parent with a *definite* height — explicit `h-*`, `min-h-*`, or grid `1fr` row. Test by checking whether `height: 100%` would resolve at each level.
3. Grid rows with `fill` images: use `1fr` not `auto` — `auto` rows collapse when children are absolutely positioned.

**Broken pattern (what broke before):**
`<div class="relative aspect-[4/3]"><div class="h-full"><div class="h-full"><!-- no height on overflow wrapper --><div class="flex h-full">...</div></div></div></div>` — the overflow wrapper had no `h-full`, so the inner flex div's `height: 100%` resolved to 0.
<!-- END:image-fill-height-rule -->
