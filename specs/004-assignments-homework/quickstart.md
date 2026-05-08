# Quickstart — Assignments and Homework Frontend

This page tells a reviewer / implementer how to build, open, and validate the six new pages of Spec 004.

## 1. Build CSS

The Tailwind CLI build is unchanged from Specs 001/002/003:

```bash
cd /media/mekky/work/backend/idarti-academy-pro
npm run build:css
```

Verify the output:

```bash
wc -c assets/css/output.css   # expected: ≤ 80 KB (Spec 003 baseline ≈ 49 KB; this feature adds ≤ 6 KB → ≤ 55 KB)
```

The Tailwind `content` glob in `tailwind.config.js` already covers `pages/**/*.html` so the six new pages are scanned automatically.

## 2. Open the six pages

Open each in the browser via `file://`:

```bash
xdg-open pages/student/assignments.html
xdg-open pages/student/assignment-details.html
xdg-open pages/student/submit-assignment.html
xdg-open pages/student/submission-feedback.html
xdg-open pages/teacher/homework-review.html
xdg-open pages/teacher/homework-submission-details.html
```

(Replace `xdg-open` with `open` on macOS or `start` on Windows.)

No dev server is required.

## 3. Validate the prototype against this spec

Walk through the 15 success criteria from `spec.md`. The feature is Done only when all 15 pass. Each row maps to a concrete inspection action.

| SC | Page(s) | What to check |
|---|---|---|
| SC-001 | assignments.html | Open; within 30 seconds, identify (a) waiting count = 3, (b) under-review = 1, (c) needs-revision = 1, (d) overdue = 1, and the resubmission row (الميم الساكنة, status يحتاج تعديل). |
| SC-002 | assignment-details.html | Open; within 30 seconds, identify (a) sura البقرة + ayahs 1-10, (b) tajweed focus = أحكام الميم الساكنة, (c) ≥ 3 common mistakes, (d) prior grade 65/100, (e) primary CTA = إعادة التسليم. |
| SC-003 | submit-assignment.html | Open; count ≥ 7 distinct submission method blocks (text / file / audio / image / video / external-link / completion-confirmation), AND a checklist with ≥ 5 items showing both pre-checked and unchecked states. |
| SC-004 | submission-feedback.html | Open; within 30 seconds, identify (a) the four Quran-axis scores 85/60/75/70, (b) mistakes count = 5, (c) ayahs 3 / 4 / 7, (d) resubmission deadline 10 مايو 2026, (e) attempts remaining = 2 من 3. |
| SC-005 | homework-review.html | Open; within 30 seconds, identify (a) pending = 4, (b) accepted today = 2, (c) the first 3 student names in the queue, (d) the row corresponding to عبدالرحمن السعد / تلاوة سورة الضحى. |
| SC-006 | homework-submission-details.html | Open; verify — without further interaction — every required form element: numeric grade input, written-feedback textarea, strengths/improvements lists, 5-option status selector, request-resubmission checkbox, 4-axis Quran evaluation form, mistakes-count input, ayahs-needing-review tag input, recitation-notes textarea. |
| SC-007 | All 6 pages | `grep -nE ' href="#"' pages/student/{assignments,assignment-details,submit-assignment,submission-feedback}.html pages/teacher/{homework-review,homework-submission-details}.html` returns zero matches. |
| SC-008 | All 6 pages | `grep -nP '[٠-٩۰-۹]' pages/student/{assignments,assignment-details,submit-assignment,submission-feedback}.html pages/teacher/{homework-review,homework-submission-details}.html` returns zero matches (Latin digits inside Arabic copy throughout). |
| SC-009 | assets/js/main.js | `grep -nE 'innerHTML\|createElement\|outerHTML\|insertAdjacentHTML\|document\.write' assets/js/main.js` returns zero matches; `wc -l assets/js/main.js` shows ≤ 80 lines. **No new JS handlers added by this feature.** |
| SC-010 | All 6 pages | `grep -nEi 'lorem\|Item [0-9]\|TBD\|FIXME\|Course [0-9]\|Student [0-9]' pages/student/{assignments,assignment-details,submit-assignment,submission-feedback}.html pages/teacher/{homework-review,homework-submission-details}.html` returns zero matches. |
| SC-011 | All 6 pages | Count distinct status badge instances across the 6 pages — verify ≥ 25 individual usages drawn from the Spec 001 19-badge catalog. (Total in practice: 5 student summary cards + 9 student status chips + 9 student row pills + 4 teacher summary cards + 8 teacher row pills ≈ 35.) |
| SC-012 | All 6 pages | Open at viewport widths 375 / 768 / 1024 / 1280 px. Verify (a) no horizontal page-level scrollbar at any breakpoint, (b) sidebar drawer behaves as Spec 002 baseline, (c) assignments-index list / homework-review list collapse from table to stacked cards at < 768 px, (d) the `homework-submission-details` two-column layout collapses to a single column at < 1024 px. |
| SC-013 | Cross-page nav loops | Student chain: dashboard → "عرض كل الواجبات" → assignments → click "عرض التفاصيل" on the يحتاج تعديل row → assignment-details → "إعادة التسليم" → submit-assignment → "إلغاء" → assignment-details → "عرض ملاحظات المعلم" on the prior attempt → submission-feedback → "إعادة التسليم الآن" → submit-assignment. Teacher chain: teacher/dashboard → "فتح قائمة التصحيح" → homework-review → "مراجعة" on the persona's row → homework-submission-details → "إلغاء" → homework-review. |
| SC-014 | Spec 002 → Spec 004 wiring | Cross-check the dashboard's "آخر ملاحظة من المعلم" preview and confirm consistency with the "ملاحظة المعلم" quote on submission-feedback (or document an inline annotation if it's a different earlier note). |
| SC-015 | All 6 pages | `ls pages/student/{assignments,assignment-details,submit-assignment,submission-feedback}.html pages/teacher/{homework-review,homework-submission-details}.html` confirms all six files exist and are openable in a browser without a dev server. |

## 4. Constitution Definition-of-Done audit

Cross-check the 12 Definition-of-Done gates from constitution v1.0.1 §Quality Gates:

1. ✅ All 6 requested pages exist as openable static HTML files.
2. ✅ Each page is responsive across desktop / tablet / mobile (verified via SC-012).
3. ✅ Each page contains meaningful, realistic Arabic sample data (R8 / R9 inventories).
4. ✅ Header and sidebar are consistent across pages within a role (R2 zero-delta — student sidebar on the 4 student pages; teacher sidebar on the 2 teacher pages).
5. ✅ Every navigation link points to a real existing HTML file (verified via SC-013 + SC-007).
6. ✅ Each page is visually professional (uses Spec 001 design tokens, navy/gold/green palette).
7. ✅ No frontend framework or runtime present (Constitution Check Principle I).
8. ✅ No backend / API / simulated-API logic present.
9. ✅ TailwindCSS used consistently — no parallel ad-hoc CSS systems.
10. ✅ JS limited to the four sanctioned interactions; **zero new handlers** added by this feature.
11. ✅ Every "View" entry has a corresponding detail page (assignments → assignment-details + submission-feedback; homework-review → homework-submission-details; assignment-details → submit-assignment).
12. ✅ RTL rendering verified at each breakpoint.

## 5. File inventory after this feature

After `/speckit-implement` completes, expect the following added/changed files:

```text
A pages/student/assignments.html
A pages/student/assignment-details.html
A pages/student/submit-assignment.html
A pages/student/submission-feedback.html
A pages/teacher/homework-review.html
A pages/teacher/homework-submission-details.html
M assets/css/output.css       # rebuilt; size ≤ 55 KB
```

No other files touched. `assets/js/main.js`, `tailwind.config.js`, `assets/css/input.css`, the embedded student/teacher sidebar partials, the embedded header partial, and all Spec 001 / 002 / 003 pages remain unchanged.

## 6. Common pitfalls to avoid

Drawing from Specs 001/002/003 lessons learned plus the new patterns of Spec 004:

- **Drift from the locked persona**: Always use `عبدالرحمن السعد`, `ع.س` initials, parent `عبدالله السعد`, total assignments completed = 18, family balance 750 ر.س (carried; not directly used here), Quran path Level 3, primary teacher الأستاذ أحمد العمري (`أ.أ` initials), secondary teacher الأستاذة سلمى البلوي (`أ.س` initials).
- **Eastern Arabic-Indic digits**: Never use `٠١٢٣٤٥٦٧٨٩`. Always Latin: `0123456789`. Verify with the SC-008 grep.
- **Inventing badge variants**: Use only the catalog entries from `specs/001-frontend-foundation/data-model.md §E6` plus the type chips from Specs 002/003 and the new pill mapping in `data-model.md §E7`. Don't invent new tints (e.g., a separate "deferred" badge violates Q2 → R5 → FR-074).
- **Forgetting the bell-as-anchor**: The header bell on student pages is `<a href="notifications.html">`, not `<button>`. Spec 002 already updated `components/header.html`; reuse that markup verbatim.
- **Active-entry mapping mistakes** (FR-002 / R2 table): "الواجبات" is active on all 4 student pages including drill-downs. "مراجعة الواجبات" is active on both teacher pages. Never blank the active state on a homework drill-down.
- **Adding new JS handlers**: Don't. The six pages do NOT use tabs, dropdowns, or modals — only the sidebar drawer carries over. Any new handler is an automatic Constitution Principle V violation.
- **Quran-axis vs final grade math**: The four axes are diagnostic, the final grade is holistic (per Q1 / R4). The captions on submission-feedback.html (FR-044) and homework-submission-details.html (FR-064) MUST explicitly state the relationship — see contracts for the canonical caption copy.
- **Teacher status mapping**: "مقبول مع ملاحظات" → student sees "مقبول" + notes in feedback panel. "تأجيل المراجعة" → student keeps "قيد المراجعة" pill (per Q2 / R5). The FR-063 helper caption must be present beneath the radio cluster.
- **"جديد" vs "مطلوب التسليم"**: Recency vs deadline (per Q3 / R6). The "جديد" pill is accent-colored (notification chip); the "مطلوب التسليم" pill is neutral slate (deadline chip). Both are visually distinct AND both contribute to the "واجبات مطلوبة (3)" summary card.
- **Cross-page row consistency**: The persona's "تلاوة سورة الضحى" submission MUST appear identically on `assignments.html` (status قيد المراجعة), as the first/second row of `homework-review.html` (status بانتظار المراجعة), and as the focused submission on `homework-submission-details.html`. Same teacher, same timestamp, same attempt count.
- **External link target**: The required external-link attachment on `assignment-details.html` MUST be `https://quran.com/2` (not `#`, not a fictional URL) — this is the FR-024 + SC-007 anchor.
- **No real upload, no real save**: Every Submit/Save button is `<button type="button">`. Inline notices on the two interactive pages call this out — don't omit them.
- **Audio playback stubs**: No `<audio>` element with src. Play buttons are `<button type="button" aria-label="تشغيل التسجيل">` and click does nothing — the duration label and waveform placeholder communicate "audio file" without playback.
- **Two-column responsive collapse**: On `homework-submission-details.html`, below the lg breakpoint the order is **context first, form second** (per R12). Don't put the form first — the teacher needs to know whose work this is before grading.

## 7. The /speckit-implement task ordering hint

When `/speckit-tasks` generates the task list, the natural ordering is:

1. **Sample-data prep**: Build the 9-row student-side inventory + 8-row teacher-side queue (research §R8 / §R9) as a content document or annotated comment block. Skip this if working from spec/data-model directly.
2. **Page 1 — assignments.html**: Index is the most-linked-to page; building it first unblocks the others.
3. **Page 2 — assignment-details.html**: Drills into the featured Quran case.
4. **Page 3 — submit-assignment.html**: Action surface; reachable from both assignments.html and assignment-details.html.
5. **Page 4 — submission-feedback.html**: Closes the loop with the teacher's verdict.
6. **Page 5 — homework-review.html**: Switch to teacher side; queue mirrors student index pattern.
7. **Page 6 — homework-submission-details.html**: Two-column grading form; the most layout-complex page.
8. **CSS rebuild**: `npm run build:css` to update `assets/css/output.css`.
9. **Validation pass**: Walk SC-001 through SC-015. Document any deviation.

Because the six pages are largely independent (no shared partials are added, no JS is added, no shared CSS rules are added to input.css), implementation can also be parallelized across multiple Claude sessions if desired — each page's contract file is a self-contained brief.
