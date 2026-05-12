# Quickstart: Admin Permissions, Roles, Platform Settings & Pricing Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Data Model**: [data-model.md](./data-model.md)

This document explains how to build, open, and validate the 10 new pages introduced by Spec 010. The implementation is purely static HTML + Tailwind 3.4; no dev server is required to view a page (every page opens via `file://`).

## Build / Run

The repository's existing Tailwind toolchain (locked in Spec 001) compiles utility classes from `assets/css/input.css` into `assets/css/output.css`. Spec 010 adds NO new utilities to `input.css` — the JIT scan picks up new utility classes referenced by the 10 new HTML files automatically when `npm run build:css` runs.

```bash
# One-time CSS rebuild after authoring the 10 HTML files (Polish phase)
npm run build:css

# Open any page directly
xdg-open pages/admin/roles-permissions.html        # Linux
open pages/admin/roles-permissions.html             # macOS
start pages/admin/roles-permissions.html            # Windows
```

**Expected `output.css` delta**: ≤ 8 KB. **Final size MUST stay** ≤ 88 KB (the Spec-009 raised ceiling).

```bash
# Validate the size ceiling
wc -c assets/css/output.css   # expect ≤ 90112
```

## Page Inventory

| # | Path | Active sidebar entry |
|---|------|----------------------|
| 1 | `pages/admin/roles-permissions.html` | الأدوار والصلاحيات |
| 2 | `pages/admin/role-details.html` | الأدوار والصلاحيات (deep-read) |
| 3 | `pages/admin/create-role.html` | الأدوار والصلاحيات (sub-flow) |
| 4 | `pages/admin/users.html` | الأدوار والصلاحيات (sub-flow) |
| 5 | `pages/admin/user-details.html` | الأدوار والصلاحيات (deep-read) |
| 6 | `pages/admin/platform-settings.html` | إعدادات المنصة |
| 7 | `pages/admin/pricing-rules.html` | إعدادات المنصة (sub-flow) |
| 8 | `pages/admin/student-type-settings.html` | إعدادات المنصة (sub-flow) |
| 9 | `pages/admin/notification-settings.html` | إعدادات المنصة (sub-flow) |
| 10 | `pages/admin/audit-log.html` | سجل المراجعة (new sidebar entry) |

**Sidebar deep-read pattern note**: when a user opens `role-details.html` / `create-role.html` / `users.html` / `user-details.html`, the sidebar entry highlighted is **«الأدوار والصلاحيات»** (the parent), not the literal page they're on — same pattern Spec 008 used for `student/invoice-details.html` (highlighted "Payment History") and Spec 009 for `admin/teacher-settlement-details.html` (highlighted "Teacher Finance"). Page-level orientation is provided via the breadcrumb component, not the sidebar.

## Success Criteria Validation Table

Each row maps a `spec.md` SC to a verifiable check. Run from repo root.

| SC | What to check | Verification command / action |
|----|----|----|
| SC-001 | All 10 pages exist + open via `file://` + sidebar active-state correct | `find pages/admin -name "roles-permissions.html" -o -name "role-details.html" -o -name "create-role.html" -o -name "users.html" -o -name "user-details.html" -o -name "platform-settings.html" -o -name "pricing-rules.html" -o -name "student-type-settings.html" -o -name "notification-settings.html" -o -name "audit-log.html"` returns 10 results |
| SC-002 | Zero `href="#"` across the 10 new files | `grep -nE 'href="#"' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` returns empty |
| SC-003 | Zero new JS lines added | `wc -l assets/js/main.js` returns 68 (unchanged from Spec 009 baseline) |
| SC-004 | Zero prior-spec edits | `git status --porcelain` shows ONLY the 10 new HTML files + rebuilt `assets/css/output.css` (= 11 lines exactly) |
| SC-005 | Two-views-one-entity: 6×7 mini-matrix on user-details byte-identical to corresponding 6 rows of full matrix on role-details | `diff <(sed -n '/<!-- MATRIX_ROWS_11_16_START -->/,/<!-- MATRIX_ROWS_11_16_END -->/p' pages/admin/role-details.html) <(sed -n '/<!-- MINI_MATRIX_START -->/,/<!-- MINI_MATRIX_END -->/p' pages/admin/user-details.html)` shows only block-marker differences (use HTML-comment markers as alignment anchors during implementation) |
| SC-006 | Cross-spec audit-log traceability ≥ 4 prior-spec identifiers | `grep -E 'STL-2026-04-TCH-0042\|INV-2026-0184\|FAM-2023-0211\|RPT-2026-04-Q03-007' pages/admin/audit-log.html \| wc -l` returns ≥ 4 |
| SC-007 | "ناطق بالعربية" + "غير ناطق بالعربية" each ≥ 6 contexts | `grep -c "ناطق بالعربية" pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html \| awk -F: '{s+=$2}END{print s}'` returns ≥ 6; same for "غير ناطق بالعربية" |
| SC-008 | Permission matrix completeness — exactly 133 cells with 3-glyph values | Manual: visual inspection — open `pages/admin/role-details.html`, count rows (19) × columns (7) = 133. Each cell carries one of {✓, ✕, –} accompanied by aria-label text |
| SC-009 | Multi-currency configuration — EGP secondary chip + caption | `grep "العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص" pages/admin/platform-settings.html` returns ≥ 1 match; `grep "EGP\\|الجنيه المصري" pages/admin/platform-settings.html` returns ≥ 1 match |
| SC-010 | Retroactivity-discipline — Q1 callout + table footnote on pricing-rules | `grep -E 'تسري القاعدة على الفواتير الجديدة فقط\|جميع قواعد التسعير' pages/admin/pricing-rules.html` returns ≥ 2 matches |
| SC-011 | Audit-log export-button — Q2 visual-only with tooltip | `grep 'عرض مرئي فقط — لا يتم تنزيل ملف فعلي' pages/admin/audit-log.html` returns ≥ 1 match; `grep 'تصدير CSV' pages/admin/audit-log.html` returns ≥ 1 match |
| SC-012 | Sanctioned-modal pattern — exactly 3 data-modal-open triggers on user-details | `grep -c 'data-modal-open=' pages/admin/user-details.html` returns 3; `grep -c 'هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً' pages/admin/user-details.html` returns ≥ 3 |
| SC-013 | Anchor-user audit traceability — ≥ 2 events in user-details activity preview match audit-log entries | Manual: open both `pages/admin/user-details.html` and `pages/admin/audit-log.html`, identify ≥ 2 matching event identifiers (e.g., STL-2026-04-TCH-0042 manual-adjustment 09:15 + INV-2026-0231 manual-payment 11:35) |
| SC-014 | CSS rebuild stability — delta ≤ 8 KB AND final ≤ 88 KB | `wc -c assets/css/output.css` (after `npm run build:css`) returns ≤ 90112 (= 88 KB) |
| SC-015 | All 7 role cards present + 8th archived | `grep -E '(super_admin\|finance_manager\|teacher\|parent\|student\|support\|operations\|admin_assistant)' pages/admin/roles-permissions.html` returns matches for all 8 role identifiers; visual inspection confirms cards |
| SC-016 | Notification toggle count — 28 toggles, 15 ON | `grep -c 'type="checkbox"' pages/admin/notification-settings.html` returns 28; visual inspection confirms 15 of them carry the `checked` attribute |
| SC-017 | Definition-of-Done compliance — all 12 constitutional gates pass | See "Constitutional Definition-of-Done Verification" below |

## Constitutional Definition-of-Done Verification (12 gates)

| # | Gate | Verification |
|---|------|--------------|
| 1 | All requested pages exist + openable as static HTML | SC-001 |
| 2 | Each page is responsive across desktop / tablet / mobile | Manual: resize browser to 375 / 768 / 1024 / 1280; verify the 19×7 matrix on `role-details.html` collapses to horizontal-scroll on tablet (`overflow-x-auto` + `min-w-[900px]` per FR-070) |
| 3 | Each page contains meaningful realistic Arabic sample data | Manual: visual inspection — every cell, badge, caption, label, modal body, form pre-fill, audit event has Arabic copy with Latin digits per FR-063 |
| 4 | Header + sidebar consistent across the 10 pages | Manual: switch between the 10 admin pages; verify identical header chrome + sidebar layout (with the new «سجل المراجعة» entry visible on all 10) |
| 5 | Every navigation link points to a real existing HTML file | SC-002 + manual: every CTA's `href` target exists either in this spec's 10 new files or in specs 001-009 |
| 6 | Page is visually professional and adheres to color / spacing / typography / badge rules | Manual: navy/gold/green palette consistent with Spec 001; ≥ 60 status badge instances per the Spec-010 plan; color-AND-label-AND-icon pattern preserved |
| 7 | No frontend framework or runtime is present | `grep -rE 'react\|vue\|angular\|svelte\|alpine\|jquery\|next\|nuxt' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` returns empty |
| 8 | No backend, API, or simulated-API logic | `grep -rE 'fetch\\(\|axios\|XMLHttpRequest\|api/' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html` returns empty |
| 9 | TailwindCSS used consistently | Manual: every styling utility comes from Tailwind; no parallel ad-hoc CSS class system |
| 10 | JavaScript limited to sanctioned interactions | SC-003 + manual: only sidebar drawer / dropdown / modal / tabs handlers from the existing 68-line main.js are referenced |
| 11 | Every "View" / detail entry point has a corresponding detail page | SC-002 + manual: «عرض/تعديل» on roles-permissions resolves to role-details.html; «عرض» on users resolves to user-details.html; «+ إنشاء دور جديد» resolves to create-role.html; «عرض المستخدمين» on role-details resolves to users.html |
| 12 | RTL rendering visually verified for every page | Manual: open each page; verify `dir="rtl"`, sidebar on the right, RTL-natural reading order, no mixed-directionality bugs |

## Cross-Spec Reconciliation Greps

These checks ensure Spec 010 does not contradict prior specs.

```bash
# Zero prior-spec edits — git status MUST show only the 10 new HTML files + output.css
git status --porcelain | grep -vE 'pages/admin/(roles-permissions|role-details|create-role|users|user-details|platform-settings|pricing-rules|student-type-settings|notification-settings|audit-log)\.html|assets/css/output\.css'
# expect empty output

# Spec 002+009 teacher names preserved
grep -c "الأستاذ أحمد بن عبد الله\|الأستاذة منى سعد\|الأستاذ خالد العبدلي\|الأستاذة فاطمة الزهراني\|الأستاذ يوسف القحطاني\|الأستاذة هبة" pages/admin/users.html
# expect ≥ 5 (one row per teacher in the 14-row users table)

# Spec 008 + 009 staff names preserved (SARA.M, AHMED.K)
grep -c "سارة محمد\|أحمد بن خالد المالكي\|نظام تلقائي" pages/admin/audit-log.html
# expect ≥ 12 (SARA.M ≥ 9 events + AHMED.K ≥ 5 events + نظام تلقائي ≥ 2 events; some overlap allowed)

# Spec 008 student-type labels reused
grep -c "ناطق بالعربية\|غير ناطق بالعربية" pages/admin/{pricing-rules,student-type-settings,users}.html
# expect ≥ 12 contexts

# Spec 008 anchor invoice's course consistent
grep -c "دورة القرآن الكريم — المستوى الثالث" pages/admin/pricing-rules.html
# expect ≥ 2 contexts (Rule 1 ناطق + Rule 2 غير ناطق)

# Spec 008 anchor invoice subtotal preserved
grep -c "380.00" pages/admin/pricing-rules.html
# expect ≥ 1 (Rule 1 price)

# Spec 008 Egypt-tier anchor preserved
grep -c "1500.00\|1,500.00" pages/admin/pricing-rules.html
# expect ≥ 1 (Rule 8 price)

# Spec 009 anchor settlement preserved
grep -c "STL-2026-04-TCH-0042" pages/admin/audit-log.html pages/admin/user-details.html
# expect ≥ 3 (audit events 1 + 6 + user-details activity preview)

# Spec 008 anchor invoice preserved
grep -c "INV-2026-0184" pages/admin/audit-log.html
# expect ≥ 1 (audit event 2)

# Spec 008 family balance preserved
grep -c "FAM-2023-0211" pages/admin/audit-log.html
# expect ≥ 2 (audit events 2 + 20)

# Spec 006 report ID preserved
grep -c "RPT-2026-04-Q03-007" pages/admin/audit-log.html
# expect ≥ 1 (audit event 17)

# Spec 006 academic figures NOT contradicted (only 92% allowed, only inside cross-references)
# 88% / 88-100 / 89-100 / "ممتاز" should not appear anywhere in Spec 010
grep -nE '88%|88-100|89-100|ممتاز' pages/admin/{roles-permissions,role-details,create-role,users,user-details,platform-settings,pricing-rules,student-type-settings,notification-settings,audit-log}.html
# expect empty (Spec 006 figures untouched)

# Two-views-one-entity matrix consistency (SC-005)
diff <(awk '/<!-- MATRIX_ROWS_11_16_START -->/,/<!-- MATRIX_ROWS_11_16_END -->/' pages/admin/role-details.html) \
     <(awk '/<!-- MINI_MATRIX_START -->/,/<!-- MINI_MATRIX_END -->/' pages/admin/user-details.html) \
| grep -vE '^---|^[0-9,]+[acd][0-9,]+$|^>|^<.+MATRIX|^<.+MINI'
# expect empty (only the section-marker comments differ)

# Zero new JS verification
wc -l assets/js/main.js
# expect 68
```

## Phase 2 Handoff

`/speckit-tasks` will read this quickstart, `data-model.md`, and the 10 contract files in `contracts/` to produce `tasks.md` — the dependency-ordered task list for the 10 HTML files + 1 CSS rebuild.

**Recommended task ordering for `/speckit-implement`** (suggested by file dependency):

1. Setup tasks: verify zero `href="#"` baseline + verify `main.js` is at 68 lines
2. **Phase 1 — Author entry-point pages**: roles-permissions.html (no dependencies) + platform-settings.html (no dependencies)
3. **Phase 2 — Author deep-read pages** (cross-link from Phase 1): role-details.html (needs roles-permissions for back-link) + user-details.html (needs role-details for matrix-template extraction → SC-005 byte-identity) + users.html (needs user-details for «عرض» link)
4. **Phase 3 — Author sub-flow pages**: create-role.html (cross-link from roles-permissions) + pricing-rules.html (referenced by student-type-settings) + student-type-settings.html (cross-link to pricing-rules) + notification-settings.html (independent) + audit-log.html (cross-references prior specs but no Spec-010 internal dependencies)
5. **Polish phase**: `npm run build:css` rebuild + grep validation suite (SC-001 → SC-017) + manual responsive review at 4 breakpoints + final `git status` audit (must show exactly 11 staged files)
