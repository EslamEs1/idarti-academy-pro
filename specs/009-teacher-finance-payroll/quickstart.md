# Quickstart: Teacher Finance, Earnings, Advances & Salary Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Data Model**: [data-model.md](./data-model.md)

This document explains how to build, open, and validate the 8 new pages introduced by Spec 009. The implementation is purely static HTML + Tailwind 3.4; no dev server is required to view a page (every page opens via `file://`).

## Build / Run

The repository's existing Tailwind toolchain (locked in Spec 001) compiles utility classes from `assets/css/input.css` into `assets/css/output.css`. Spec 009 adds NO new utilities to `input.css` — the JIT scan picks up new utility classes referenced by the 8 new HTML files automatically when `npm run build:css` runs.

```bash
# One-time CSS rebuild after authoring the 8 HTML files (Polish phase)
npm run build:css

# Open any page directly
xdg-open pages/teacher/earnings.html        # Linux
open pages/teacher/earnings.html             # macOS
start pages/teacher/earnings.html            # Windows
```

**Expected `output.css` delta**: ≤ 6 KB. **Final size MUST stay** ≤ 80 KB (constitutional ceiling).

```bash
# Validate the size ceiling
wc -c assets/css/output.css   # expect ≤ 81920
```

## Page Inventory

| # | Path | Role | Sidebar entry highlighted |
|---|------|------|---------------------------|
| 1 | `pages/teacher/earnings.html` | Teacher | الأرباح |
| 2 | `pages/teacher/advances.html` | Teacher | السلف |
| 3 | `pages/teacher/settlement-details.html` | Teacher | الأرباح (deep-read) |
| 4 | `pages/admin/teacher-finance.html` | Admin | مالية المعلمين |
| 5 | `pages/admin/teacher-salary-rules.html` | Admin | مالية المعلمين (sub-flow) |
| 6 | `pages/admin/teacher-advances.html` | Admin | مالية المعلمين (sub-flow) |
| 7 | `pages/admin/create-teacher-advance.html` | Admin | مالية المعلمين (sub-flow) |
| 8 | `pages/admin/teacher-settlement-details.html` | Admin | مالية المعلمين (sub-flow) |

## Success Criteria Validation Table

Each row maps a `spec.md` SC to a verifiable check. Run from repo root.

| SC | What to check | Verification command / action |
|----|----|----|
| SC-001 | All 8 pages exist + open via `file://` + sidebar active-state correct | `ls pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html` |
| SC-002 | All 4 rate-bucket rows visible on teacher/earnings.html within 10s | Manual visual review — open `pages/teacher/earnings.html`, scroll to per-rate breakdown panel |
| SC-003 | "Trace one settlement end-to-end" task completes < 90s with zero broken links | Manual: teacher/earnings → click "عرض تفاصيل التسوية" on April row → verify 11 lines + 4 buckets → switch to admin/teacher-finance → click "تفاصيل" on الأستاذ أحمد row → verify 11 lines + 3 admin-only panels + 5-action bar |
| SC-004 | Zero `href="#"` across the 8 new files | `grep -nE 'href="#"' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html` returns empty |
| SC-005 | Eleven-line breakdown byte-identical across teacher- and admin-side settlement-details | `diff <(grep -A30 "أرباح الحصص:" pages/teacher/settlement-details.html) <(grep -A30 "أرباح الحصص:" pages/admin/teacher-settlement-details.html)` shows zero numeric divergence |
| SC-006 | Advance-cross-reference ubiquity (≥ 6 contexts each for ADV-2026-0012 and ADV-2026-0023) | `grep -c "ADV-2026-0012" pages/teacher/{earnings,advances,settlement-details}.html pages/admin/{teacher-finance,teacher-salary-rules,teacher-advances,create-teacher-advance,teacher-settlement-details}.html` summed ≥ 6; same for ADV-2026-0023 |
| SC-007 | "ناطق بالعربية" + "غير ناطق بالعربية" each ≥ 12 contexts across the 8 files | `grep -c "ناطق بالعربية" <8 files>` summed ≥ 12; same for "غير ناطق بالعربية" |
| SC-008 | EGP visible on 3 admin surfaces | `grep -lE 'EGP\|جنيه' pages/admin/teacher-finance.html pages/admin/teacher-advances.html pages/admin/teacher-salary-rules.html` returns all three filenames |
| SC-009 | All amounts on teacher-side pages carry "ريال" label | `grep -nE '\\$\|USD\|EGP' pages/teacher/{earnings,advances,settlement-details}.html` returns empty (excluding any non-amount false positives — visual spot-check confirms) |
| SC-010 | Zero `<input type="number">` on teacher-side pages | `grep -nE '<input type="number"' pages/teacher/{earnings,advances,settlement-details}.html` returns empty |
| SC-011 | All 4 advance statuses visible on admin/teacher-advances.html within 10s | Manual: open `pages/admin/teacher-advances.html`, scan table, locate نشطة + مكتملة + بانتظار-الاعتماد + مرفوضة rows; status-aware action cells visible per FR-064 |
| SC-012 | Spec 006 academic figures (RPT-2026-04-Q03-007 / 88% homework / 88-100 / 89-100 / "ممتاز") not invented or contradicted | `grep -nE 'RPT-2026-04-Q03-007\|88%\|88-100\|89-100\|ممتاز' pages/teacher/*.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html` — only RPT-2026-04-Q03-007 should appear, only inside the Q2 bonus caption on the two settlement-details pages; no other figure should appear |
| SC-013 | Final `output.css` ≤ 80 KB after rebuild | `wc -c assets/css/output.css` ≤ 81920 |
| SC-014 | Zero new lines added to `assets/js/main.js` | `git diff specs/008-payments-invoices-billing..HEAD -- assets/js/main.js` shows no insertion (or `wc -l assets/js/main.js` still reports 68 lines) |
| SC-015 | Two-views-one-entity discipline: salary rule (30/60/50/100 + 20%) consistent across admin/teacher-salary-rules and teacher/earnings side panel | `grep -E '30\\.00.*60\\.00.*50\\.00.*100\\.00.*20%' pages/admin/teacher-salary-rules.html pages/teacher/earnings.html` — both files match |
| SC-016 | Settlement workflow demonstration: ≥ 3 of the 5 states visible on admin/teacher-finance.html | Manual: scan table, locate at least one row each in {مدفوعة, معتمدة, بانتظار الاعتماد} (+ implicit مسودة on May earnings row + مرفوضة on advances ADV-2026-0028) |

## Constitutional Definition-of-Done Verification (12 gates)

| # | Gate | Verification |
|---|------|--------------|
| 1 | All requested pages exist + openable as static HTML | SC-001 |
| 2 | Each page is responsive across desktop / tablet / mobile | Manual: resize browser to 375 / 768 / 1024 / 1280; verify the 10-column salary-rules table collapses to horizontal-scroll on tablet (FR-004) |
| 3 | Each page contains meaningful realistic Arabic sample data | Manual: visual inspection — every cell, badge, caption, label, modal body has Arabic copy with Latin digits per FR-005 |
| 4 | Header + sidebar consistent across pages within a role | Manual: switch between the 3 teacher pages; verify identical header chrome + sidebar layout. Same for the 5 admin pages |
| 5 | Every navigation link points to a real existing HTML file | SC-004 + manual: every CTA's `href` target exists either in this spec's 8 new files or in specs 001-008 |
| 6 | Page is visually professional and adheres to color / spacing / typography / badge rules | Manual: navy/gold/green palette consistent with Spec 001; ≥ 30 status badge instances per the Spec-009 plan; color-AND-label-AND-icon pattern preserved |
| 7 | No frontend framework or runtime is present | `grep -rE 'react\|vue\|angular\|svelte\|alpine\|jquery\|next\|nuxt' pages/teacher/{earnings,advances,settlement-details}.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html` returns empty |
| 8 | No backend, API, or simulated-API logic | `grep -rE 'fetch\\(\|axios\|XMLHttpRequest\|api/' pages/teacher/*.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html` returns empty |
| 9 | TailwindCSS used consistently | Manual: every styling utility comes from Tailwind; no parallel ad-hoc CSS class system |
| 10 | JavaScript limited to sanctioned interactions | SC-014 + manual: only sidebar drawer / dropdown / modal / tabs handlers from the existing 68-line main.js are referenced |
| 11 | Every "View" / detail entry point has a corresponding detail page | SC-004 + manual: every "تفاصيل" CTA on admin/teacher-finance.html resolves to admin/teacher-settlement-details.html (anchored on الأستاذ أحمد); every "عرض" CTA on admin/teacher-advances.html resolves either to a viewable advance state visualization or stays inline |
| 12 | RTL rendering visually verified for every page | Manual: open each page; verify `dir="rtl"`, sidebar on the right, RTL-natural reading order, no mixed-directionality bugs |

## Cross-Spec Reconciliation Greps

These checks ensure Spec 009 does not contradict prior specs.

```bash
# Zero prior-spec edits — git status MUST show only the 8 new HTML files + output.css
git status --porcelain | grep -vE 'pages/teacher/(earnings|advances|settlement-details)\.html|pages/admin/(teacher-finance|teacher-salary-rules|teacher-advances|create-teacher-advance|teacher-settlement-details)\.html|assets/css/output\.css'
# expect empty output

# Spec 002 teacher names preserved
grep -c "الأستاذ أحمد بن عبد الله\|الأستاذة منى سعد\|الأستاذ خالد العبدلي" pages/teacher/*.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html
# expect ≥ 20 contexts

# Spec 008 student-type labels reused
grep -c "ناطق بالعربية\|غير ناطق بالعربية" pages/teacher/*.html pages/admin/teacher-*.html pages/admin/create-teacher-advance.html
# expect ≥ 24 contexts (12 each per SC-007)

# Spec 008 anchor invoice's course consistent
grep -c "دورة القرآن الكريم — المستوى الثالث" pages/teacher/*.html pages/admin/teacher-*.html
# expect ≥ 4 contexts (teacher/earnings + teacher/settlement-details + admin/teacher-salary-rules + admin/teacher-settlement-details)

# Persona STD-2024-0817 NOT directly referenced (the persona is a student, not a teacher)
grep -c "STD-2024-0817" pages/teacher/*.html pages/admin/teacher-*.html
# expect 0 (the 92% attendance figure is cited without naming the student — it's an aggregate over the class)
```

## Phase 2 Handoff

`/speckit-tasks` will read this quickstart, `data-model.md`, and the 8 contract files in `contracts/` to produce `tasks.md` — the dependency-ordered task list for the 8 HTML files + 1 CSS rebuild.
