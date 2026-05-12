# Contract — `pages/parent/my-children.html`

**User story**: US3 (Parent Children Overview, P1) — see spec.md.
**Family**: عبد الرحمن مؤمن (الصف السادس) + سارة مؤمن (الصف الثالث).
**Active sidebar entry**: أبنائي (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ch-header` | h1 + subtitle + add-child CTA |
| Children grid | `#ch-grid` | 2 child cards |

## Required content

### Header (`#ch-header`) — FR-043, FR-046
- h1: `أبنائي`
- Subtitle: `متابعة شاملة لتقدّم كل طفل — اضغط على أيّ طفل لقراءة تقريره الكامل`
- Header chrome: parent persona greeting `ولي أمر الطالب عبد الرحمن`
- Small "أضف طفلاً جديداً" / "اطلب إضافة طفل" button near the header (`<button type="button">`, primary-100 background + plus-icon, visual stub)

### Children grid (`#ch-grid`) — FR-044, FR-045, FR-047
Exactly 2 cards. Layout: 1 col mobile / 2 col tablet+.

#### Card 1 — `#ch-card-abdulrahman` (عبد الرحمن مؤمن)
- Avatar `ع.م` (primary-700 fill, 48-64 px circle).
- Name: `عبد الرحمن مؤمن`
- Level: `الصف السادس — مسار القرآن الكريم`
- Stats grid:
  - الحضور: `92%` (success-tinted)
  - الواجبات: `88%` (accent-tinted)
  - آخر تقرير: `30 أبريل 2026`
  - السداد: `مدفوع` (success-100 + check icon)
- Aggregate state pill: `ممتاز` (success-100 + star icon, success-700 text)
- Primary CTA: `عرض التقرير الكامل` → `child-reports.html` (primary-900 button)
- Secondary chips below CTA:
  - `الفواتير` → `invoices.html` (slate-100, file-icon)
  - `الحضور` → `attendance.html` (slate-100, calendar-icon)
  - `الواجبات` → `homework-followup.html` (slate-100, clipboard-icon — placeholder anchor; documented inline as future-spec)

#### Card 2 — `#ch-card-sara` (سارة مؤمن)
- Avatar `س.م` (warning-tinted fill — matches parent dashboard's existing pin)
- Name: `سارة مؤمن`
- Level: `الصف الثالث — مسار اللغة العربية`
- Stats grid:
  - الحضور: `78%` (warning-tinted)
  - الواجبات: `65%` (warning-tinted)
  - آخر تقرير: `30 أبريل 2026`
  - السداد: `مدفوع` (success-100)
- Aggregate state pill: `يحتاج إلى دعم` (warning-100 + alert icon, warning-700 text — MUST match parent dashboard line 237 byte-identically)
- Primary CTA: `عرض التقرير الكامل` → `child-reports.html?child=sara` (warning-100 button — different hue from عبد الرحمن's button to reinforce the priority signal)
- Secondary chips: same 3 chips as Card 1.

## Forbidden content (SC-016)
- NO Download / Print / Share / Save / WhatsApp clickable elements anywhere on this page.

## Grep checks (Polish phase)
- `grep -c '#ch-card-' pages/parent/my-children.html` ≥ 2
- `grep -c 'عبد الرحمن مؤمن' pages/parent/my-children.html` ≥ 1
- `grep -c 'سارة مؤمن' pages/parent/my-children.html` ≥ 1
- `grep -c 'ممتاز' pages/parent/my-children.html` ≥ 1
- `grep -c 'يحتاج إلى دعم' pages/parent/my-children.html` ≥ 1
- `grep -c 'child-reports.html' pages/parent/my-children.html` ≥ 2 (one per card)
- `grep -nE '(تنزيل|طباعة|واتساب|مشاركة|حفظ التقرير)' pages/parent/my-children.html` MUST be empty.
