# Contract — `pages/admin/social-hub.html`

**User story**: US5 (Admin Social Hub Management, P2) — see spec.md.
**Persona**: إدارة الأكاديمية (admin).
**Active sidebar entry**: Social Hub (`aria-current="page"` + `is-active`).
**Filename**: `pages/admin/social-hub.html` (NOT `social-hub-management.html`) per Q1 / R1.

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#ash-header` | h1 + subtitle + primary "إنشاء منشور جديد" CTA |
| Summary cards | `#ash-summary` | 4 moderation-summary cards |
| Filter row | `#ash-filters` | 3 dropdowns + search input |
| Posts table | `#ash-table` | ≥ 8-row table |
| Prototype notice | `#ash-notice` | "الإجراءات في هذه الصفحة عرضية..." |

## Required content

### Header (`#ash-header`) — FR-046

- h1: `إدارة المجتمع التعليمي`
- Subtitle: `راجع، انشر، وأدِر منشورات الأكاديمية`
- Primary CTA (right-aligned in RTL): `<a href="create-post.html" class="btn-primary">إنشاء منشور جديد</a>` (FR-046).
- Header chrome with admin greeting "إدارة الأكاديمية".

### Summary cards (`#ash-summary`) — FR-047

4 cards in a responsive grid (1 col mobile / 2 col tablet / 4 col desktop). Each card has a large numeric value + 1-line caption + distinct accent + icon. Per data-model §E6:

| # | Card title | Numeric | Caption | Accent + Icon | CTA |
|---|-----------|---------|---------|---------------|-----|
| 1 | تعليقات في انتظار المراجعة | 7 | بحاجة إلى مراجعة | warning-100 + clock icon | "مراجعة التعليقات" → `#planned` |
| 2 | منشورات منشورة | 5 | على الموقع حالياً | success-100 + check icon | (no CTA) |
| 3 | منشورات مجدولة | 2 | في انتظار النشر | info-100 + calendar icon | (no CTA) |
| 4 | مسوّدات | 1 | تحت الإنشاء | slate-100 + edit icon | (no CTA) |

### Filter row (`#ash-filters`) — FR-048

≥ 3 `<select>` dropdowns + 1 `<input type="search">`. Each input has a paired `<label for>` (FR-008).

```html
<div id="ash-filters" class="...">
  <label for="ash-filter-type">النوع</label>
  <select id="ash-filter-type">
    <option>الكل</option>
    <option>إعلان عام</option>
    <option>تهنئة</option>
    <option>إنجاز طالب</option>
    <option>تحدي الأسبوع</option>
    <option>نصيحة تعليمية</option>
    <option>تذكير اختبار</option>
    <option>منشور دورة</option>
  </select>

  <label for="ash-filter-status">الحالة</label>
  <select id="ash-filter-status">
    <option>الكل</option>
    <option>منشور</option>
    <option>مسودة</option>
    <option>مجدول</option>
    <option>غير منشور</option>
    <option>محذوف</option>
  </select>

  <label for="ash-filter-date">التاريخ</label>
  <select id="ash-filter-date">
    <option>الكل</option>
    <option>هذا الأسبوع</option>
    <option>هذا الشهر</option>
    <option>الشهر الماضي</option>
  </select>

  <label for="ash-search">ابحث في المنشورات</label>
  <input type="search" id="ash-search" placeholder="ابحث في المنشورات..." />
</div>
```

All controls visual-only.

### Prototype notice (`#ash-notice`) — FR-052

Position: above the posts table. 1-line copy:

```
الإجراءات في هذه الصفحة عرضية — لا يتم تنفيذ تغييرات فعلية على المنشورات.
```

### Posts table (`#ash-table`) — FR-049 + FR-050 + FR-051

`<table>` with header row + ≥ 8 body rows. Columns: العنوان / النوع / المؤلف / الجمهور / الحالة / آخر تحديث / الإجراءات.

Sample 10 rows from research.md §R18 — at least one row per of the 5 visible statuses (FR-051):

| # | Title | Type | Author | Audience | Status | Last updated | Actions |
|---|-------|------|--------|----------|--------|---------------|---------|
| 1 | إجازة عيد الأضحى المبارك — الأكاديمية مغلقة | إعلان عام | إدارة الأكاديمية | جميع الطلاب | منشور | 7 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 2 | تهنئة عبد الرحمن م. — اختبار شهر مارس 95% | تهنئة | إدارة الأكاديمية | جميع الطلاب | منشور | 5 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 3 | إنجاز سارة م. — إكمال المستوى الأول من العربية | إنجاز طالب | إدارة الأكاديمية | جميع الطلاب | منشور | 3 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 4 | تحدي الأسبوع: راجع سورة الفجر مع التجويد | تحدي الأسبوع | الأستاذ أحمد بن عبد الله | دورة محددة: القرآن L3 | منشور | 5 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 5 | تذكير: اختبار شهر مايو في 28 مايو 2026 | تذكير اختبار | إدارة الأكاديمية | جميع الطلاب | مجدول | (سيُنشر 26 مايو) | 👁 ✏ 🗑 |
| 6 | استبيان رضا أولياء الأمور — مايو 2026 | إعلان عام | إدارة الأكاديمية | أولياء الأمور | مسودة | 9 مايو 2026 | 👁 ✏ ↗ 🗑 |
| 7 | اجتماع المعلمين الشهري — قاعة الإدارة | إعلان عام | إدارة الأكاديمية | المعلمين | مجدول | (سيُنشر 11 مايو) | 👁 ✏ 🗑 |
| 8 | نصيحة قراءة جهرية: ابدأ بسرعة بطيئة | نصيحة تعليمية | الأستاذة منى سعد | دورة محددة: العربية L4 | منشور | 2 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 9 | إعلان قديم: ساعات العمل الصيفية 2025 | إعلان عام | إدارة الأكاديمية | جميع الطلاب | غير منشور | 14 أبريل 2026 | 👁 ✏ ↗ 🗑 |
| 10 | منشور تجريبي قديم — لا تستخدم | إعلان عام | إدارة الأكاديمية | (—) | محذوف | 1 أبريل 2026 | 👁 |

**Visual styling rules per status**:
- منشور = success-100 + check icon
- مسودة = slate-100 + edit icon
- مجدول = info-100 + calendar icon
- غير منشور = warning-100 + eye-off icon
- محذوف = slate-100 + trash icon, ROW with `opacity-60` + `line-through` on title; only 👁 action active per FR-050.

**Action cluster (per row)** — 5 icon-buttons rendered as `<button type="button">` with `aria-label` attributes:

```html
<div class="action-cluster" role="group" aria-label="إجراءات المنشور">
  <button type="button" aria-label="عرض" title="عرض"><svg .../></button>     <!-- 👁 always active -->
  <button type="button" aria-label="تعديل" title="تعديل"><svg .../></button>   <!-- ✏ active unless محذوف -->
  <button type="button" aria-label="نشر" title="نشر"><svg .../></button>       <!-- ↗ active on مسودة + غير منشور -->
  <button type="button" aria-label="إلغاء نشر" title="إلغاء نشر"><svg .../></button>  <!-- ⛔ active on منشور + مجدول -->
  <button type="button" aria-label="حذف" title="حذف"><svg .../></button>       <!-- 🗑 active unless محذوف -->
</div>
```

Inactive (state-disabled) actions render with `disabled` attribute + `opacity-30`.

**At < 768 px**: the table collapses to stacked per-row cards. Each card preserves every column as a labeled key-value pair. The action cluster becomes a horizontal icon-button row. No horizontal page scroll (FR-009).

## Forbidden content

- **NO real form actions** — every button is `<button type="button">` (FR-003).
- **NO Download / Share / WhatsApp / Calendar-export buttons** (FR-019).
- **NO student composer** (FR-011 — composer lives on `create-post.html` with admin role).
- **NO row removal** when 🗑 is clicked — the soft-delete styling MUST remain visible per FR-050.

## Grep checks (Polish phase)

- `grep -c 'create-post\.html' pages/admin/social-hub.html` ≥ 1 (FR-046 primary CTA)
- `grep -c 'إدارة المجتمع التعليمي' pages/admin/social-hub.html` ≥ 1 (h1)
- `grep -c '<label for="ash-' pages/admin/social-hub.html` ≥ 4 (3 dropdowns + 1 search — FR-008)
- `grep -c 'منشور\|مسودة\|مجدول\|غير منشور\|محذوف' pages/admin/social-hub.html` ≥ 5 distinct labels (FR-051, SC-018)
- `grep -c 'aria-label="عرض"\|aria-label="تعديل"\|aria-label="نشر"\|aria-label="إلغاء نشر"\|aria-label="حذف"' pages/admin/social-hub.html` ≥ 5 (per row × 10 rows = up to 50; minimum 5 distinct labels)
- `grep -c 'الإجراءات في هذه الصفحة عرضية' pages/admin/social-hub.html` ≥ 1 (FR-052 prototype-notice)
- `grep -c 'تعليقات في انتظار المراجعة\|منشورات منشورة\|منشورات مجدولة\|مسوّدات' pages/admin/social-hub.html` ≥ 4 (4 summary cards — FR-047)
- `grep -c 'opacity-60\|line-through' pages/admin/social-hub.html` ≥ 1 (محذوف row styling — FR-050)
- `grep -c 'عبد الرحمن م\.' pages/admin/social-hub.html` ≥ 1 (row 2 title references the anonymized form per FR-015 extension — Q3)
- `grep -c 'سارة م\.' pages/admin/social-hub.html` ≥ 1 (row 3 title — anonymized per Q3)
- `grep -c 'الأستاذ أحمد بن عبد الله\|الأستاذة منى سعد' pages/admin/social-hub.html` ≥ 2 (rows 4 + 8 author chips — authors are NOT anonymized per R3)
- `grep -cE 'apple-calendar\|google-calendar\|outlook\|تنزيل\|طباعة\|واتساب' pages/admin/social-hub.html` MUST be 0 (FR-019)
- `grep -nE ' href="#"' pages/admin/social-hub.html` MUST return 0 (FR-007; `href="#planned"` allowed for the مراجعة التعليقات CTA on summary card 1)
- `wc -l assets/js/main.js` MUST equal 68 (zero new JS).
