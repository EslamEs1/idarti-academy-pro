# Quickstart — Payments, Invoices, Tax Settings & Family Balance Frontend

This document covers (1) how to build / open the ten new pages, (2) the 15-row Success Criteria validation table (SC-001 → SC-015), and (3) the 12-gate Constitutional Definition-of-Done verification routine. It is the single source of truth used by `/speckit-implement` Phase 11 (Polish) to gate the feature as Done.

## 1. Build & open

This feature ships HTML edits + **a one-time CSS rebuild** to pick up any new Tailwind utilities referenced by the new HTML but absent from the Spec 007 `output.css` baseline. **No `assets/js/` changes**, **no `assets/css/input.css` changes**, **no new dependencies**.

```bash
# 1. Confirm main.js is unchanged (zero new JS in this spec — research.md §R14)
wc -l assets/js/main.js        # must equal 68 (Spec 001/005/006/007 baseline)

# 2. After all 10 HTML files exist, rebuild CSS to pick up any new utilities
npm run build:css              # regenerates assets/css/output.css via Tailwind JIT
                               # expected new size: ~64-65 KB → ~70-72 KB (well under the 80 KB ceiling)

# 3. Open any of the ten pages directly in a browser via file://
xdg-open pages/student/payment-history.html
xdg-open pages/student/invoice-details.html
xdg-open pages/parent/invoices.html
xdg-open pages/parent/family-balance.html
xdg-open pages/admin/payments.html
xdg-open pages/admin/invoices.html
xdg-open pages/admin/invoice-details.html
xdg-open pages/admin/tax-settings.html
xdg-open pages/admin/family-balances.html
xdg-open pages/admin/create-manual-payment.html
```

Each page MUST render without a dev server (Constitution Principle I). No `npm run dev` required — `npm run build:css` is a one-shot CSS regeneration step, not a dev server.

## 2. Success Criteria validation table (SC-001 → SC-015)

Run from repo root after all ten pages ship. Every row MUST end with ✓ PASS.

| SC | Description | Validator | Expected |
|----|-------------|-----------|----------|
| SC-001 | All 10 pages exist + role-correct sidebar with active entry | `ls pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html` + manual visual review of active sidebar entry | All 10 files exist; each opens via `file://`; active sidebar entry highlighted per research.md §R13 |
| SC-002 | All 6 status badges visible on student/payment-history.html within 10s | Manual visual scan of `#ph-legend` strip + `#ph-table` rows | All 6 badges (مدفوعة / غير مدفوعة / مدفوعة جزئياً / متأخّرة / ملغاة / تحت المراجعة) visible in legend + table |
| SC-003 | INV-2026-0184 trace end-to-end in <90s | Manual trace: `payment-history.html` row 4 → click "عرض الفاتورة" → student `invoice-details.html` confirm 8-line breakdown + 3-stream panel → switch to admin role → open admin `invoice-details.html` → confirm 3 admin-only panels + 5-action bar | Both views render byte-identical financial figures (380 / 0 / 57 / 67 / 437 / 0 / 437 / مدفوعة) per research.md §R15 |
| SC-004 | Zero broken links on all new pages | `grep -nE 'href="[^"]*\.html"' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html \| awk -F'href="' '{print $2}' \| awk -F'"' '{print $1}' \| sort -u \| while read href; do test -e "pages/$(dirname $(echo $href \| sed s,\\.\\./,,))/$(basename $href)" \|\| echo "BROKEN: $href"; done` | Zero "BROKEN:" output |
| SC-005 | Total Paid summary card = sum of {Paid + Partially-Paid} amounts; Under Review excluded | Manual: open `student/payment-history.html`, verify 934.00 ريال = 437 + 437 + 60 (rows 4/5/3); 69.00 from row 2 (تحت المراجعة) NOT included | Math passes |
| SC-006 | VAT line ubiquity — ≥ 25 invoice contexts contain "ضريبة" + percentage + currency | `grep -c 'ضريبة\|VAT\|15%\|14%' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html \| awk -F: '{sum+=$2} END {print sum}'` | Result ≥ 25 |
| SC-007 | Multi-currency on 3 admin surfaces + tax-settings preview | `grep -l 'EGP' pages/admin/payments.html pages/admin/family-balances.html pages/admin/tax-settings.html pages/admin/invoices.html` | All 4 pages match (≥ 4 file matches) |
| SC-008 | Family-balance ledger has all 4 transaction types | `grep -E 'إيداع\|استخدام للفاتورة\|استرداد\|تسوية' pages/parent/family-balance.html \| sort -u \| wc -l` | ≥ 4 (one per type) |
| SC-009 | SAR rendered as "ريال" (Arabic word) only; EGP as Latin code | `grep -o 'SAR\|"\$"\|USD\|ر\.س' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html` should return zero matches; `grep -o '£\|EGP' pages/admin/family-balances.html` should match only "EGP" | Zero forbidden currency formats |
| SC-010 | Bulk-action affordance visible on admin/invoices.html (master checkbox + dropdown) above table | Manual: open `admin/invoices.html`, verify `#ai-bulk` renders both elements above `#ai-table` | Both elements visible |
| SC-011 | Persona's overdue row identifiable in <5s with color + text + icon | Manual: open `student/payment-history.html`, locate row 7 (INV-SES-2026-0098); verify danger-tone red + "متأخّر منذ 74 يوم" text + alert-triangle icon all present | All 3 indicators present |
| SC-012 | Spec 006/007 academic figures NOT contradicted | `grep -l 'RPT-2026-04-Q03-007\|92%\|88-100\|89-100\|ممتاز' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html` | Zero matches |
| SC-013 | CSS bundle ≤ 80 KB after rebuild | `wc -c assets/css/output.css` after `npm run build:css` | Result ≤ 81920 |
| SC-014 | Zero new JS lines | `wc -l assets/js/main.js` | Result = 68 (Spec 001/005/006/007 baseline) |
| SC-015 | Zero `href="#"` matches across the 10 new pages | `grep -nE 'href="#"' pages/student/{payment-history,invoice-details}.html pages/parent/{invoices,family-balance}.html pages/admin/{payments,invoices,invoice-details,tax-settings,family-balances,create-manual-payment}.html` | Zero matches |

## 3. Constitutional Definition-of-Done (12 gates)

The Constitution v1.0.1 §"Quality Gates & Definition of Done" enumerates 12 gates. Each MUST be verified before sign-off.

| Gate | Description | Verification | Status |
|------|-------------|-------------|--------|
| 1 | All requested pages exist as openable static HTML | `ls` the 10 paths | ☐ |
| 2 | Each page responsive across desktop / tablet / mobile | Manual review at 375 / 768 / 1024 / 1280 px | ☐ |
| 3 | Each page contains meaningful Arabic sample data | Visual review — no lorem ipsum, no "Item 1" labels | ☐ |
| 4 | Header + sidebar consistent across pages within a role | Manual side-by-side comparison + diff of sidebar markup across same-role pages | ☐ |
| 5 | Every navigation link points to a real existing HTML file | `grep` per SC-004 + SC-015 | ☐ |
| 6 | Visually professional + adheres to color/spacing/typography/badge rules | Manual review against research.md §R12 badge vocabulary | ☐ |
| 7 | No frontend framework or runtime present | `grep -nrE 'react\|vue\|angular\|svelte\|next\|nuxt\|alpine\|jquery' pages/ assets/` | ☐ |
| 8 | No backend / API / simulated-API logic | `grep -nrE 'fetch\(\|axios\|XMLHttpRequest\|api/' pages/` | ☐ |
| 9 | TailwindCSS used consistently; no parallel ad-hoc CSS | `wc -l assets/css/input.css` (no growth); single output.css | ☐ |
| 10 | JavaScript limited to sanctioned 6 categories | `wc -l assets/js/main.js` (= 68) + manual review of any inline `<script>` tags (none expected) | ☐ |
| 11 | Every "View" / detail entry point has a corresponding detail page | `grep` for "عرض" / "details" hrefs + verify each target exists | ☐ |
| 12 | RTL rendering verified for every page | Manual visual review under RTL across all 10 pages | ☐ |

## 4. Cross-spec reconciliation (no prior-spec edits)

Before merging, run `git status` from repo root. The output MUST show ONLY these 11 staged files:

```
new file:   assets/css/output.css                          # rebuilt; this is the only file outside pages/ that changes
new file:   pages/student/payment-history.html
new file:   pages/student/invoice-details.html
new file:   pages/parent/invoices.html
new file:   pages/parent/family-balance.html
new file:   pages/admin/payments.html
new file:   pages/admin/invoices.html
new file:   pages/admin/invoice-details.html
new file:   pages/admin/tax-settings.html
new file:   pages/admin/family-balances.html
new file:   pages/admin/create-manual-payment.html
```

If any other file appears in the diff (e.g., a prior-spec page like `pages/student/dashboard.html` showing as `modified`), the implementation has violated the **zero prior-spec edits** discipline — investigate and revert.

The spec docs (`specs/008-payments-invoices-billing/`) are also expected in the diff as new files — those are not "prior-spec edits", they are this spec's own deliverables.

## 5. After-merge follow-up

Once Spec 008 ships, the following constitutional sidebar entries become resolved (no longer 404):

- **Student**: Payment History
- **Parent / Family**: Invoices, Family Balance
- **Admin / Manager**: Payments, Invoices, Tax Settings, Family Balances

The remaining **Admin** entries that have NOT been delivered yet (Teacher Finance, Roles & Permissions, Platform Settings) are out of scope for Spec 008 and remain candidates for future specs. Constitution Quality Gate 5 ("every navigation link points to a real existing HTML file") will pass for THIS spec's 10 pages, but the broader academy-platform sidebar may still surface unresolved links pointing to those remaining Admin entries — that is a separate accounting item, NOT a Spec 008 regression.
