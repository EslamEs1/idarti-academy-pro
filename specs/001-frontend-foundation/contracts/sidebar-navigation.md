# Contract: Sidebar Navigation

**Feature**: `001-frontend-foundation`
**Source of truth**: This contract is the canonical navigation map. Any deviation between it and a delivered page is a defect.

The exact Arabic labels, Lucide icon names, and target `.html` paths for every entry in every role's sidebar live in **`data-model.md` § E5**. This contract focuses on the *structural rules* every sidebar must obey.

---

## Cross-role rules

1. **Order is fixed per role and matches `data-model.md` § E5**. UX may revisit ordering in a later spec; this spec preserves spec.md's input order for traceability.
2. **Every entry MUST link to a real `.html` path** under the matching `pages/<role>/` folder, except `Log Out` which always links to `index.html` (FR-042).
3. **No `#` placeholder links anywhere** (FR-041).
4. **Every entry MUST have an icon AND a text label**. Icon-only entries are forbidden (FR-006).
5. **The currently viewed page's entry MUST be marked active** with three signals: `bg-primary-800` background, `font-semibold` weight, and a `4px border-inline-end` accent-gold indicator (R6 + FR-013).
6. **The active entry MUST also carry `aria-current="page"`** (a11y).
7. **Logout is always the last entry** in the list. Visually separated from the rest by `mt-auto` (pushes to the bottom of the sidebar's flex column).
8. **Hover state**: `hover:bg-primary-800 hover:text-white` (the inactive baseline is `text-white/85`).
9. **Focus state**: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2`.

---

## Per-role completeness check

For each role, the sidebar MUST contain *exactly* the entries from `data-model.md § E5`. Counts (used as quick acceptance gates):

| Role | Required entry count | Spec ref |
|---|---|---|
| Student | 14 (incl. Log Out) | FR-009 |
| Parent | 11 (incl. Log Out) | FR-010 |
| Teacher | 12 (incl. Log Out) | FR-011 |
| Admin | 19 (incl. Log Out) | FR-012 |

A page that is missing an entry, has an extra entry, has a `#` link target, or omits the active-state styling fails this contract.

---

## Path realism check

A reviewer verifying SC-003 should be able to: (a) click every sidebar entry on every dashboard, (b) land on a 404-style filesystem error for *any* page that hasn't been built yet — but the URL the browser tried to open MUST exactly match the `targetPath` in `data-model.md § E5`. No JS-only handlers, no anchor jumps, no `javascript:` URLs.

---

## RTL specifics

- The sidebar lives at the inline-start of the document grid (right side under `dir="rtl"`, which is the natural side for Arabic readers).
- `border-inline-end-4` on `.is-active` resolves to a *left* border in RTL — which is the inner edge facing the main content. This is the conventional RTL "active rail" position.
- Icons that have directional meaning (e.g., none in this set — Lucide's `home`, `book-open`, `chart-bar`, etc. are direction-neutral) need no special handling. If a future spec introduces a chevron in the sidebar, wrap it with `class="rtl:rotate-180"` to flip it for RTL.
