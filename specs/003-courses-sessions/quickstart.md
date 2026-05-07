# Quickstart — Courses and Live Sessions Frontend

This page tells a reviewer / implementer how to build, open, and validate the six new pages of Spec 003.

## 1. Build CSS

The Tailwind CLI build is unchanged from Spec 001/002:

```bash
cd /media/mekky/work/backend/idarti-academy-pro
npm run build:css
```

Verify the output:

```bash
wc -c assets/css/output.css   # expected: ≤ 80 KB (Spec 002 baseline ≈ 41 KB; this feature adds ≤ 8 KB)
```

The Tailwind `content` glob in `tailwind.config.js` already covers `pages/**/*.html` so the six new pages are scanned automatically.

## 2. Open the six pages

Open each in the browser via `file://`:

```bash
xdg-open pages/student/browse-courses.html
xdg-open pages/student/my-courses.html
xdg-open pages/student/course-details.html
xdg-open pages/student/live-sessions.html
xdg-open pages/student/live-session-details.html
xdg-open pages/student/session-checkout-preview.html
```

(Replace `xdg-open` with `open` on macOS or `start` on Windows.)

No dev server is required.

## 3. Validate the prototype against this spec

Walk through the 14 success criteria from `spec.md`. The feature is Done only when all 14 pass. Each row maps to a concrete inspection action.

| SC | Page(s) | What to check |
|---|---|---|
| SC-001 | browse-courses.html | Open the page; within 30 seconds, identify (a) ≥ 4 subjects, (b) Arabic vs Foreign price difference for any one course, (c) which cards carry Popular / New / Recommended badges. |
| SC-002 | my-courses.html | Open; within 15 seconds, identify (a) the count of active enrollments (3), (b) the next session for the active Quran course, (c) the count of completed courses (1). |
| SC-003 | course-details.html | Open; verify all FOUR pricing combinations (Arabic-full, Arabic-per-session, Foreign-full, Foreign-per-session) are visible without further interaction in the `#cd-pricing` block. |
| SC-004 | live-sessions.html | Open; switch between the three tabs by clicking. Verify each tab is non-empty (≥ 2 in completed and missed; ≥ 3 in upcoming) AND each tab's count badge matches the row count visible. |
| SC-005 | live-session-details.html | Open; verify the page makes both upcoming-state behavior and completed-state behavior comprehensible — `#lsd-completed-preview` annotation explains what changes after the session. |
| SC-006 | session-checkout-preview.html | Open; within 30 seconds, answer all of: which session/bundle is being booked, what price applies (75 ر.س × 4 = 300 ر.س base + 45 ر.س VAT = 345 ر.س subtotal), how much the family balance contributes (200 ر.س), what amount is due (145 ر.س), where the confirm button is. |
| SC-007 | All 6 pages | `grep -nE ' href="#"' pages/student/{browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview}.html` returns zero matches. |
| SC-008 | All 6 pages | `grep -nP '[٠-٩۰-۹]' pages/student/{browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview}.html` returns zero matches. |
| SC-009 | assets/js/main.js | `grep -nE 'innerHTML\|createElement\|outerHTML\|insertAdjacentHTML\|document\.write' assets/js/main.js` returns zero matches; `wc -l assets/js/main.js` shows ≤ 80 lines. |
| SC-010 | All 6 pages | `grep -nEi 'lorem|Item [0-9]|TBD|Course [0-9]|Student [0-9]' pages/student/{browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview}.html` returns zero matches. |
| SC-011 | All 6 pages | Count distinct status badge instances across the 6 pages — verify ≥ 18 individual usages drawn from the Spec 001 19-badge catalog (plus Spec 002 type chips). |
| SC-012 | All 6 pages | Open at viewport widths 375 / 768 / 1024 / 1280 px. Verify (a) no horizontal page-level scrollbar at any breakpoint, (b) sidebar drawer behaves as Spec 002 baseline, (c) browse-courses grid collapses 1/2/3/4 columns at the four breakpoints, (d) live-sessions row stacks legibly at < 768 px. |
| SC-013 | Cross-page nav loop | Browse → click any "عرض التفاصيل" → arrives at course-details. Click "حجز حصة فردية" → arrives at live-sessions. Click any "عرض التفاصيل" → arrives at live-session-details. Click "إتمام الدفع" → arrives at session-checkout-preview. Click "إلغاء" → returns to live-session-details. No 404, no broken link. |
| SC-014 | Spec 002 → Spec 003 wiring | From dashboard, click "متابعة التعلم" → arrives at my-courses. From dashboard upcoming-session card, click "تفاصيل" / "إضافة للتقويم" → arrives at the right page. |

## 4. Constitution Definition-of-Done audit

Cross-check the 12 Definition-of-Done gates from constitution v1.0.1 §Quality Gates:

1. ✅ All 6 requested pages exist as openable static HTML files.
2. ✅ Each page is responsive across desktop / tablet / mobile (verified via SC-012).
3. ✅ Each page contains meaningful, realistic Arabic sample data (R8/R9 inventories).
4. ✅ Header and sidebar are consistent with Spec 002 (R2 zero-delta).
5. ✅ Every navigation link points to a real existing HTML file (verified via SC-013 + SC-007).
6. ✅ Each page is visually professional (uses Spec 001 design tokens, navy/gold/green palette).
7. ✅ No frontend framework or runtime present (Constitution Check Principle I).
8. ✅ No backend / API / simulated-API logic present.
9. ✅ TailwindCSS used consistently — no parallel ad-hoc CSS systems.
10. ✅ JS limited to the four sanctioned interactions; the `data-tabs` handler reuse on live-sessions is within Principle V.
11. ✅ Every "View" entry has a corresponding detail page (course-details exists for browse cards; live-session-details exists for session rows; checkout exists for paid-session "حجز" CTA).
12. ✅ RTL rendering verified at each breakpoint.

## 5. File inventory after this feature

After `/speckit-implement` completes, expect the following added/changed files:

```text
A pages/student/browse-courses.html
A pages/student/my-courses.html
A pages/student/course-details.html
A pages/student/live-sessions.html
A pages/student/live-session-details.html
A pages/student/session-checkout-preview.html
M assets/css/output.css       # rebuilt; size ≤ 49 KB
```

No other files touched. `assets/js/main.js`, `tailwind.config.js`, `assets/css/input.css`, `components/student-sidebar.html`, `components/header.html`, and all Spec 001/002 pages remain unchanged.

## 6. Common pitfalls to avoid

Drawing from Spec 001/002 lessons learned:

- **Drift from the locked persona**: Always use `الأستاذ أحمد بن عبد الله`, `أ.أ` initials, 60% Quran L3 progress, 92% attendance, 85% homework, 750 ر.س family balance, 12 مايو 2026 next evaluation, 5 مايو 2026 monthly exam (R14 table).
- **Eastern Arabic-Indic digits**: Never use `٠١٢٣٤٥٦٧٨٩`. Always Latin: `0123456789`. Verify with the SC-008 grep.
- **Inventing badge variants**: Use only the catalog entries from `specs/001-frontend-foundation/data-model.md §E6` plus the type chips from Spec 002 (`جماعية`, `خاصة`, notification type chips). Don't invent `قيد التنفيذ` or `لم يبدأ` outside the established mapping.
- **Forgetting the bell-as-anchor**: The header bell is `<a href="notifications.html">`, not `<button>`. Spec 002 already updated `components/header.html`; reuse that markup verbatim.
- **Active-entry mapping mistakes** (FR-002 / R2 table): Drill-down pages (`course-details`, `live-session-details`, `session-checkout-preview`) show NO active entry — the navigation roots are the canonical anchors.
- **Adding new JS handlers**: Don't. The 3-tab UI uses the existing `data-tabs` handler from Spec 001 (R3); the list/calendar toggle is CSS-only (R11).
- **Pricing display**: Always emphasize the Arabic rate (Q1 / R4) — bigger + bolder + accent color. Foreign rate is the comparison line — smaller + muted.
- **Per-session price math drift**: The bundle is 4 × 75 ر.س = 300 ر.س base + 15% VAT (45 ر.س) = 345 ر.س subtotal; family balance applied = 200 ر.س cap; amount due = 145 ر.س. These specific numbers anchor the checkout-preview page (R6 / E9).
- **Calendar interactivity**: The list/calendar toggle is purely visual. Don't add JS state to it. Both views are always present in the DOM.
