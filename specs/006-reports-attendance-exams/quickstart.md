# Quickstart — Reports, Attendance, and Exams Frontend

This document covers (1) how to build / open the eight new pages, (2) the 18-row Success Criteria validation table, and (3) the 12-gate Definition-of-Done verification routine. It is the single source of truth used by `/speckit-implement` Phase 11 (Polish) to gate the feature as Done.

## 1. Build & open

This feature ships only HTML edits + (optional) a small extension to `assets/css/input.css` for the `@media print` rule. No new dependencies, no new JavaScript.

```bash
# 1. From repo root, run the existing CSS build (only required if input.css was extended per research.md §R14)
npm run build:css

# 2. Open any of the eight pages directly in a browser via file://
xdg-open pages/student/reports.html
xdg-open pages/student/monthly-report.html
xdg-open pages/student/attendance.html
xdg-open pages/student/exams.html
xdg-open pages/student/exam-details.html
xdg-open pages/parent/my-children.html
xdg-open pages/parent/child-reports.html
xdg-open pages/teacher/student-reports.html
```

Each page MUST render without a dev server (Constitution Principle I). No `npm run dev` required.

## 2. Success Criteria validation table (SC-001 → SC-018)

Run from repo root after all eight pages ship. Every row MUST end with ✓ PASS.

| SC | Description | Validator | Expected |
|----|-------------|-----------|----------|
| SC-001 | Reports hub renders 6-month chips, 5 summary cards, ≥ 3 detail-table rows | `grep -c 'rp-card-' pages/student/reports.html` ≥ 5; `grep -c '<tr' pages/student/reports.html` ≥ 4 | ≥ 5 + ≥ 4 |
| SC-002 | Monthly report renders all 7 sections in order + 3 visual-stub action buttons | `grep -c '#mr-' pages/student/monthly-report.html` ≥ 7; `grep -c '<button type="button"' pages/student/monthly-report.html` ≥ 3 | ≥ 7 + ≥ 3 |
| SC-003 | Attendance log renders 6 cards + inline-SVG trend + ≥ 8 rows + all 4 named statuses | `grep -c 'att-card-' pages/student/attendance.html` ≥ 6; `grep -c '<svg' pages/student/attendance.html` ≥ 1; `grep -c '<rect' pages/student/attendance.html` ≥ 5; `grep -c 'حاضر\|غائب\|متأخر\|معذور' pages/student/attendance.html` ≥ 8 | all ≥ thresholds |
| SC-004 | Exams hub: 3 tabs via existing main.js + ≥ 2 upcoming + ≥ 4 completed (≥ 1 each ناجح / يحتاج إعادة) + 5 monthly | `grep -c 'data-tab=' pages/student/exams.html` ≥ 3; `grep -c 'ناجح' pages/student/exams.html` ≥ 3; `grep -c 'يحتاج إعادة' pages/student/exams.html` ≥ 1; `grep -c 'exam-details.html' pages/student/exams.html` ≥ 11; `wc -l assets/js/main.js` = 68 | all match |
| SC-005 | Exam details: parchment result + 3 categories + strengths/weaknesses + recommendation + related-cert CTA → `certificate-preview.html` | `grep -c '#ed-' pages/student/exam-details.html` ≥ 6; `grep -c 'certificate-preview.html' pages/student/exam-details.html` ≥ 1; `grep -c '95 / 100' pages/student/exam-details.html` ≥ 1 | all ≥ |
| SC-006 | Children-overview: 2 cards (عبد الرحمن ممتاز + سارة يحتاج إلى دعم) reconcile with parent-dashboard pin | `grep -c 'عبد الرحمن مؤمن' pages/parent/my-children.html` ≥ 1; `grep -c 'سارة مؤمن' pages/parent/my-children.html` ≥ 1; `grep -c 'يحتاج إلى دعم' pages/parent/my-children.html` ≥ 1; `grep -c 'ممتاز' pages/parent/my-children.html` ≥ 1 | all match |
| SC-007 | Child-report: tri-state track (3 steps) + 4 summaries + ≥ 2 teacher quotes + WhatsApp stub + 3-button cluster | `grep -c 'يحتاج إلى دعم' pages/parent/child-reports.html` ≥ 1; `grep -c 'مستقر' pages/parent/child-reports.html` ≥ 1; `grep -c 'متحسّن' pages/parent/child-reports.html` ≥ 1; `grep -c 'مشاركة عبر واتساب' pages/parent/child-reports.html` ≥ 1; `grep -c 'cr-card-' pages/parent/child-reports.html` ≥ 4 | all ≥ 1 (4 for cards) |
| SC-008 | Teacher form: read-only context + 3 evaluation panels + general-notes + recommendation + 3-button cluster + 100% label/id pairing | `grep -c '#sr-' pages/teacher/student-reports.html` ≥ 7; per the FR-008 audit: `comm -23` between sorted `id="sr-…"` and sorted `for="sr-…"` MUST be empty | all match |
| SC-009 | Cross-page reconciliation: 92% / 88% / 88-100 / 89-100 / ممتاز match across 4 report-canonical pages | `for f in reports.html monthly-report.html child-reports.html student-reports.html; do grep -c '88' "$f"; done` (each ≥ 1) AND `for f in reports.html monthly-report.html child-reports.html attendance.html; do grep -c '92%' "$f"; done` (each ≥ 1) | each file ≥ 1 |
| SC-010 | Zero lorem ipsum / placeholder filler across all 8 pages | `grep -nEi 'lorem\|Item [0-9]\|TBD\|FIXME\|Course [0-9]\|Student [0-9]' pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` MUST return 0 matches | 0 |
| SC-011 | Zero new JS: main.js stays at 68 LOC; no new innerHTML/createElement/etc. | `wc -l assets/js/main.js` = 68; `grep -nE 'innerHTML\|createElement\|outerHTML\|insertAdjacentHTML\|document\.write' assets/js/main.js` returns 0 | 68 + 0 |
| SC-012 | Zero `href="#"` placeholder links across 8 pages | `grep -nE ' href="#"' pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` MUST return 0 | 0 |
| SC-013 | Zero Eastern Arabic-Indic digits across 8 pages | `grep -nP '[٠-٩۰-۹]' [8 files]` MUST return 0 | 0 |
| SC-014 | All 8 pages responsive at 375 / 768 / 1024 / 1280 px with no horizontal scroll | Manual review per Spec 005 T051 audit pattern | manual ✓ |
| SC-015 | Inbound-link wiring: every prior-spec href to a Spec-006 file resolves | `for href in reports.html exams.html my-children.html child-reports.html student-reports.html monthly-report.html exam-details.html attendance.html; do test -f "pages/student/$href" -o -f "pages/parent/$href" -o -f "pages/teacher/$href" && echo "$href OK"; done` should print 6 OK lines (`reports`, `exams`, `monthly-report`, `exam-details` for student; `my-children`, `child-reports` for parent; `student-reports` for teacher; `attendance` for student-only). The 4 inherited 404s on parent/teacher attendance are documented in spec.md §Out of scope | 6+ OK + 4 documented |
| SC-016 | Download/Print/Share/Save/WhatsApp visible ONLY on monthly-report + child-reports + student-reports | `grep -lE '(تنزيل\|طباعة\|واتساب\|مشاركة\|حفظ التقرير)' pages/student/{reports,attendance,exams,exam-details}.html pages/parent/my-children.html` MUST return 0 files. AND `grep -c '<button type="button"' pages/student/monthly-report.html` ≥ 3 + same for `pages/parent/child-reports.html` ≥ 3 + `pages/teacher/student-reports.html` ≥ 2 | 0 + ≥ 3+3+2 |
| SC-017 | All 18 SCs + 12 DoD gates pass on the final review pass | This table all ✓ + §3 gates all ✓ | combined |
| SC-018 | Quran-teacher's primary quote byte-identical across `monthly-report.html` + `child-reports.html` + `student-reports.html` | `grep -c '"أداء عبد الرحمن في الحفظ هذا الشهر ممتاز' pages/student/monthly-report.html pages/parent/child-reports.html pages/teacher/student-reports.html` MUST be ≥ 1 each (3 lines, all ≥ 1) | each ≥ 1 |

## 3. Definition-of-Done verification (Constitution v1.0.1, gates 1-12)

| Gate | Description | Verification | Expected |
|------|-------------|--------------|----------|
| 1 | All 8 requested pages exist and are openable as static HTML | `ls pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` lists all 8 | 8 files present |
| 2 | Every page is responsive across desktop / tablet / mobile breakpoints | Manual review at 375 / 768 / 1024 / 1280 px on each of 8 pages | no horizontal scroll on any page at any breakpoint |
| 3 | Each page contains meaningful, realistic Arabic sample data (no lorem ipsum, no "Course 1") | SC-010 grep audit | 0 matches |
| 4 | Header and sidebar are consistent across pages within a role | Visual diff: student sidebar identical across 5 student pages; parent sidebar identical across 2 parent pages; teacher sidebar identical against teacher page | matches Spec 002 / 005 baseline |
| 5 | Every navigation link points to a real existing HTML file in the spec | SC-015 grep audit; the 4 inherited 404s (parent/teacher attendance) are documented as out-of-scope | 0 unintended 404s |
| 6 | Each page is visually professional (Spec 001 colors / spacing / typography / badge rules of Constitution IV) | Visual review against Spec 001 design tokens; ≥ 30 status-badge usages across the 8 pages | manual ✓ + ≥ 30 |
| 7 | No frontend framework or runtime is present | `grep -nE 'react\|vue\|angular\|svelte\|next\|nuxt\|alpine\|jquery' pages/student/{reports,monthly-report,attendance,exams,exam-details}.html pages/parent/{my-children,child-reports}.html pages/teacher/student-reports.html` returns 0 | 0 |
| 8 | No backend, API, or simulated-API logic is present | Same grep + `grep -nE 'fetch\(\|XMLHttpRequest\|axios' [8 files]` returns 0 | 0 |
| 9 | TailwindCSS used consistently; no parallel ad-hoc CSS systems | Visual review; `grep -nE '<style' [8 files]` only matches inline `<style>` for the SVG trend chart styles (acceptable) or 0 inline styles | manual ✓ |
| 10 | JavaScript is limited to the 4 sanctioned interactions (drawer / dropdown / modal / tabs) | SC-011 grep audit; tabs handler reused on `exams.html` is the same one already in main.js | 0 new JS |
| 11 | Every "View" / detail entry point in a page has a corresponding detail page in the same or next spec | SC-015 grep audit | 0 unresolved CTAs |
| 12 | RTL rendering verified visually on every page (no broken alignment, no mixed directionality bugs, no English-only labels) | Manual review per Spec 005 T038 pattern (`grep -L 'lang="ar" dir="rtl"' [8 files]` returns 0) | 0 files missing RTL |

## 4. Cross-spec invariants checklist

| Invariant | Confirms |
|-----------|----------|
| Persona name `عبد الرحمن مؤمن` appears on all 8 pages | Story continuity |
| Sibling `سارة مؤمن` reconciles with parent-dashboard line 232 pin | FR-063 / SC-006 |
| Quran teacher `الأستاذ أحمد بن عبد الله` appears on all 7 pages that quote Quran (all except `my-children.html`) | Continuity from Spec 005 |
| Arabic teacher `الأستاذة منى سعد` newly named — appears in per-course rows + exams.html upcoming card 2 + monthly-report.html teacher quote 2 + child-reports.html teacher quote 2 | New-this-spec persona |
| April 2026 figures (92% / 88% / 88-100 / 89-100 / ممتاز) reconcile across 4 report-canonical pages | FR-062 / SC-009 |
| 5 monthly exams identical between `exams.html` (monthly tab) and `monthly-exams-passed.html` (Spec 005) | Q2 inclusive-hub resolution |
| March monthly exam (95% Quran-L2-final) is the `exam-details.html` deep-dive sample → links to `certificate-preview.html` | Cross-spec cert reconciliation |
| Quran-teacher's primary quote byte-identical across 3 files (monthly-report + child-reports + student-reports) | SC-018 |
| Zero edits to prior-spec files (Specs 001-005) — `git status` after Spec 006 lists only the 8 new files + `specs/006-reports-attendance-exams/` + (optionally) `assets/css/input.css` + rebuilt `assets/css/output.css` | FR-065 / Q1 resolution |

## 5. Run order for the implementer

The recommended order matches the spec's user-story priority:
1. P1 student stories (US1, US2) → 2 student pages: `reports.html`, `monthly-report.html`
2. P1 parent stories (US3, US4) → 2 parent pages: `my-children.html`, `child-reports.html`
3. P1 teacher story (US5) → 1 teacher page: `student-reports.html`
4. P2 student stories (US6, US7) → 2 student pages: `attendance.html`, `exams.html`
5. P3 student story (US8) → 1 student page: `exam-details.html`
6. Polish: rebuild CSS (if input.css extended) + run all 18 SC validators + verify all 12 DoD gates + sign-off.

The MVP cut-line is after step 1: with `reports.html` + `monthly-report.html` shipped, every prior-spec student-side reports link resolves and the canonical April monthly report is readable. The full 8-page set is the spec's actual deliverable, but step 1 is the minimum that unblocks downstream work.
