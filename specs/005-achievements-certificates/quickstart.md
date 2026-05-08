# Quickstart — Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

This page tells a reviewer / implementer how to build, open, and validate the eight new pages of Spec 005.

## 1. Build CSS

A small one-time edit to `assets/css/input.css` adds the `@media print` block per FR-035 / `research.md §R11`. After the edit, run the standard Tailwind CLI build:

```bash
cd /media/mekky/work/backend/idarti-academy-pro
npm run build:css
```

Verify the output:

```bash
wc -c assets/css/output.css   # expected: ≤ 80 KB (Spec 004 baseline ≈ 53 KB; this feature adds ≤ 8 KB → ≤ 61 KB)
```

The Tailwind `content` glob in `tailwind.config.js` already covers `pages/**/*.html` so the eight new pages are scanned automatically.

## 2. Open the eight pages

Open each in the browser via `file://`:

```bash
xdg-open pages/student/achievements.html
xdg-open pages/student/certificates.html
xdg-open pages/student/certificate-preview.html
xdg-open pages/student/monthly-exams-passed.html
xdg-open pages/student/completed-levels.html
xdg-open pages/student/badges.html
xdg-open pages/admin/certificates.html
xdg-open pages/admin/create-certificate.html
```

(Replace `xdg-open` with `open` on macOS or `start` on Windows.)

No dev server is required.

## 3. Validate the prototype against the 17 success criteria

The feature is Done only when all 17 SCs pass.

| SC | Page(s) | What to check |
|---|---|---|
| SC-001 | achievements.html | Open; within 30 seconds, identify (a) 4 certs, (b) 5 exams, (c) 2 levels, (d) 7 badges, (e) the featured Quran L1 cert. |
| SC-002 | certificates.html | Open; verify exactly 4 cert cards with NO download buttons. Run `grep -nE '(تنزيل|Download|PDF)' pages/student/certificates.html` and confirm matches appear ONLY inside the FR-021 callout banner — never inside `<button>` or `<a class="…btn-primary">`. |
| SC-003 | certificate-preview.html | Open; find the parchment certificate occupying the bulk of the viewport with all 9 required attributes (logo / ornament / title / prefix / name / suffix / date / signature / seal / ID-QR). Find exactly 4 action buttons below (Download/Print/Share/Back). |
| SC-004 | monthly-exams-passed.html | Open; identify 5 exams + highest 95% (March) + average 86.6% + March exam earned the Monthly Excellence badge. |
| SC-005 | completed-levels.html | Open; verify 2 completed-level cards + 50% path-progress bar + L3 in-progress preview at 60%. |
| SC-006 | badges.html | Open; find all 7 badge tiles with name + icon + earned date + reason + visibility chip. Verify ≥ 5 "مرئي" + ≥ 1 "خاص" via `grep -c 'مرئي على ملفك الشخصي' pages/student/badges.html` (≥ 5) and `grep -c 'خاص بك فقط' pages/student/badges.html` (≥ 1). |
| SC-007 | admin/certificates.html | Open; verify 4 summary cards + ≥ 8 rows + 4 actions per row + ≥ 1 visually muted "ملغاة" row + primary "إصدار شهادة جديدة" CTA. Verify state-aware actions: row 1 (pending) shows "إصدار" success-tinted; rows 2-7 (active) show "إعادة إصدار" info-tinted; row 8 (revoked) shows "إعادة تفعيل" accent-tinted. |
| SC-008 | admin/create-certificate.html | Open; find 8 labeled inputs + 3 action buttons (Preview/Save/Cancel) + prototype notice. Verify every `id="cc-*"` has a matching `for="cc-*"` via `grep -oE 'id="cc-[a-z-]+"' pages/admin/create-certificate.html \| sort -u` and `grep -oE 'for="cc-[a-z-]+"' pages/admin/create-certificate.html \| sort -u` show identical sets. |
| SC-009 | All 8 pages | `grep -nE ' href="#"' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` returns zero matches. (Same-page anchors `href="#planned"` are allowed and documented in HTML comments.) |
| SC-010 | All 8 pages | `grep -nP '[٠-٩۰-۹]' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` returns zero matches. |
| SC-011 | assets/js/main.js | `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` returns zero matches; `wc -l assets/js/main.js` shows ≤ 80 LOC. **No new JS handlers added.** |
| SC-012 | All 8 pages | `grep -nEi 'lorem|Item [0-9]|TBD|FIXME|Course [0-9]|Student [0-9]' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` returns zero matches. |
| SC-013 | All 8 pages | Count distinct status badge instances across the 8 pages — verify ≥ 30 individual usages. (Practical total: 4+4 summary cards = 8; ≥ 4 cert-type pills + ≥ 4 status pills × 4 cards on certificates = 16; 7 badge medallions + 7 visibility chips = 14; ≥ 8 admin row pills × 2 (status + type) + 4 admin summary = 20; ≥ 5 exam status pills + 2 level eval pills = 7. Total ≈ 65.) |
| SC-014 | All 8 pages | Open at viewport widths 375 / 768 / 1024 / 1280 px. Verify (a) no horizontal page-level scrollbar at any breakpoint, (b) sidebar drawer behaves as Spec 002/003/004 baseline, (c) certificates grid collapses 1/2/3, (d) badges grid collapses 1/2/3/4, (e) certificate preview scales proportionally. |
| SC-015 | Cross-page nav loops | Student chain: dashboard → "عرض كل الإنجازات" → achievements → featured cert → certificate-preview → "العودة للشهادات" → certificates → any "عرض الشهادة" → certificate-preview. Cross-spec: my-courses completed-card "عرض الشهادة" → achievements/certificates. Admin chain: admin/dashboard → "الشهادات" → admin/certificates → "إصدار شهادة جديدة" → admin/create-certificate → "إلغاء" → admin/certificates. |
| SC-016 | All 8 pages | `ls pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` confirms all 8 files exist and are openable in a browser. |
| SC-017 | The download-only-inside-preview rule | Open `certificate-preview.html` → find "تنزيل PDF" button. Open any other page in this feature → find no clickable download element. SC-002's grep enforces this for `certificates.html`. |

## 4. Constitution Definition-of-Done audit

Cross-check the 12 Definition-of-Done gates from constitution v1.0.1 §Quality Gates:

1. ✅ All 8 requested pages exist as openable static HTML files.
2. ✅ Each page is responsive across desktop / tablet / mobile (verified via SC-014).
3. ✅ Each page contains meaningful, realistic Arabic sample data (R6/R7/R8 inventories).
4. ✅ Header and sidebar are consistent across pages within a role (R2 zero-delta — student sidebar on the 6 student pages; admin sidebar on the 2 admin pages).
5. ✅ Every navigation link points to a real existing HTML file (verified via SC-009 + SC-015).
6. ✅ Each page is visually professional (uses Spec 001 design tokens, navy/gold/green palette). The certificate-preview parchment is the most ornate surface in the entire app.
7. ✅ No frontend framework or runtime present (Constitution Check Principle I).
8. ✅ No backend / API / simulated-API logic present.
9. ✅ TailwindCSS used consistently — no parallel ad-hoc CSS systems. The `@media print` rule is added to `input.css` and rebuilt via the standard pipeline.
10. ✅ JS limited to the four sanctioned interactions; **zero new handlers** added by this feature.
11. ✅ Every "View" entry has a corresponding detail page (achievements → certificates + certificate-preview; certificates → certificate-preview; admin/certificates → certificate-preview + admin/create-certificate).
12. ✅ RTL rendering verified at each breakpoint.

## 5. File inventory after this feature

After `/speckit-implement` completes, expect:

```text
A pages/student/achievements.html
A pages/student/certificates.html
A pages/student/certificate-preview.html
A pages/student/monthly-exams-passed.html
A pages/student/completed-levels.html
A pages/student/badges.html
A pages/admin/certificates.html
A pages/admin/create-certificate.html
M assets/css/input.css        # added @media print block (one-time edit)
M assets/css/output.css       # rebuilt; size ≤ 61 KB
```

No other files touched. `assets/js/main.js`, `tailwind.config.js`, the embedded sidebar/header partials, and all Spec 001 / 002 / 003 / 004 pages remain unchanged.

## 6. Common pitfalls to avoid

Drawing from Specs 001-004 lessons learned:

- **Persona drift**: Always use `عبد الرحمن مؤمن`, `ع.م` initials, primary teacher `الأستاذ أحمد بن عبد الله` (`أ.أ`), Arabic teacher `الأستاذة سلمى الحارثي` (`أ.س`). The persona's first certificate is dated **5 يناير 2026** matching the dashboard milestone — do not invent a different date.
- **Eastern Arabic-Indic digits**: Never use `٠١٢٣٤٥٦٧٨٩`. Always Latin: `0123456789`.
- **Inventing badge variants**: Use only the catalog entries from `specs/001-frontend-foundation/data-model.md §E6` plus established type chips. The 7 badge hues in FR-063 are locked — no new hues.
- **Forgetting the bell-as-anchor**: Header bell on student pages is `<a href="notifications.html">`, not `<button>`. Reuse Spec 002 markup verbatim.
- **Active-entry mapping mistakes**: "الإنجازات" is active on all 6 student pages. "الشهادات" is active on both admin pages. Never blank the active state.
- **Adding new JS handlers**: Don't. The 8 pages do NOT use tabs/dropdowns/modals — only the sidebar drawer carries over.
- **Adding a download/print/share button on any non-preview page**: Forbidden by FR-100 / SC-002 / SC-017. The certificates list page has the FR-021 callout banner explaining the rule textually — that's the only mention of "تنزيل" allowed outside the preview page.
- **Cross-page row consistency**: The persona's L1 + L2 active certs on the admin queue (rows 2, 3) MUST reconcile with the student-side `certificates.html` cards 1 + 2 — same titles, same dates, same teachers.
- **State-aware actions on admin queue**: Don't render uniform 4 actions per row. Row 1 (pending) shows "إصدار" success-tinted; rows 2-7 (active) show "إعادة إصدار" info-tinted; row 8 (revoked) shows "إعادة تفعيل" accent-tinted with disabled تعديل + إلغاء. Color paired with icon — never alone.
- **No real PDF, no real download**: Every action button is a `<button type="button">`. The "تنزيل PDF" button on certificate-preview is the most visible such stub; FR-033 documents this with an inline notice.
- **Print stylesheet location**: The `@media print` rule lives in `assets/css/input.css` (added once, applies globally). After the edit, `npm run build:css` regenerates `output.css`. No new CSS file.
- **Admin sidebar enumeration**: The admin sidebar has 18 entries (matching the constitution). Copy the entire `<aside>` block from `pages/admin/dashboard.html` and only change the `aria-current="page"` and `is-active` to land on entry #9 (الشهادات). Never strip entries.
- **Decorative SVG ornaments on the certificate**: Don't use binary asset images. Pure SVG / CSS for the gold border, decorative corners, ornament strip, academy seal, QR-code grid placeholder.

## 7. The /speckit-implement task ordering hint

When `/speckit-tasks` generates the task list, the natural ordering is:

1. **Setup**: T001 baseline check (Specs 001-004 outputs intact, main.js ≤ 80 LOC).
2. **Foundational**: T002 zero-shell-deltas confirmation + add `@media print` block to `assets/css/input.css`.
3. **US1 (P1 MVP) — achievements.html**: The hub is the most-linked-to page; building it first unblocks all the prior-spec inbound links.
4. **US2 (P1) — certificates.html**: List with the no-download-button rule and the callout banner.
5. **US3 (P1) — certificate-preview.html**: The parchment + 4 action buttons; the most visually ornate page in the project.
6. **US4 (P2) — monthly-exams-passed.html**: 5 exam rows.
7. **US5 (P2) — completed-levels.html**: 2 cards + path bar + L3 preview.
8. **US6 (P2) — badges.html**: 7 badge tiles + visibility chips.
9. **US7 (P1) — admin/certificates.html**: State-aware actions table.
10. **US8 (P2) — admin/create-certificate.html**: 8-field form.
11. **CSS rebuild**: `npm run build:css`.
12. **Polish**: 18 audit tasks per spec template.
13. **Final SC walk**: T-final.

Because the eight pages are largely independent (no shared partials, no JS), implementation can be parallelized across multiple Claude sessions if desired — each contract is a self-contained brief.
