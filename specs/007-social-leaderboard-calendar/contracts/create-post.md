# Contract — `pages/admin/create-post.html`

**User story**: US6 (Admin Create Post, P3) — see spec.md.
**Persona**: إدارة الأكاديمية (admin).
**Active sidebar entry**: Social Hub (children-of — same active entry as `social-hub.html` since create-post is a sub-page of moderation).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Breadcrumb | `#cp-breadcrumb` | الإدارة / إدارة المجتمع / إنشاء منشور جديد |
| Page header | `#cp-header` | h1 + subtitle |
| Type select | `#cp-type` | 7-option `<select>` with helper |
| Title input | `#cp-title` | text input + placeholder + sample pre-fill |
| Content textarea | `#cp-content` | ≥ 6-row textarea + sample pre-fill |
| Audience radios | `#cp-audience-*` | 4 radios + conditional course select |
| Image upload visual | `#cp-upload` | dashed drop-zone + visual button + helper |
| Scheduling radios | `#cp-schedule-*` | 2 radios + 2 visual date/time inputs |
| Action cluster | `#cp-actions` | نشر / حفظ كمسودة / إلغاء + prototype notice |

## Required content

### Breadcrumb (`#cp-breadcrumb`)

`<a href="dashboard.html">الإدارة</a> / <a href="social-hub.html">إدارة المجتمع</a> / <span aria-current="page">إنشاء منشور جديد</span>`

### Header (`#cp-header`) — FR-053

- h1: `إنشاء منشور جديد`
- Subtitle: `سيتم نشر المنشور بعد المراجعة. يمكنك جدولته لتاريخ لاحق.`

### Type select (`#cp-type`) — FR-054

```html
<label for="cp-type">نوع المنشور</label>
<select id="cp-type" aria-describedby="cp-type-helper">
  <option value="general" selected>إعلان عام</option>
  <option value="congratulations">تهنئة</option>
  <option value="achievement">إنجاز طالب</option>
  <option value="challenge">تحدي الأسبوع</option>
  <option value="tip">نصيحة تعليمية</option>
  <option value="exam-reminder">تذكير اختبار</option>
  <option value="course">منشور دورة</option>
</select>
<p id="cp-type-helper" class="helper-text">ينشر للجميع — مناسب للإجازات والقرارات الإدارية.</p>
```

7 `<option>` values matching data-model §E1 type taxonomy verbatim. "إعلان عام" pre-selected per FR-054.

### Title input (`#cp-title`) — FR-055

```html
<label for="cp-title">العنوان</label>
<input type="text" id="cp-title" placeholder="اكتب عنواناً واضحاً للمنشور..." 
       value="إجازة عيد الأضحى المبارك — الأكاديمية مغلقة من 6 إلى 10 يونيو 2026" />
```

### Content textarea (`#cp-content`) — FR-055

```html
<label for="cp-content">محتوى المنشور</label>
<textarea id="cp-content" rows="6">أعزّاءنا الطلاب وأولياء الأمور،

نُعلمكم بأنّ الأكاديمية ستكون مغلقة خلال إجازة عيد الأضحى المبارك من 6 إلى 10 يونيو 2026.

ستستأنف الحصص يوم 11 يونيو حسب الجدول الأسبوعي المعتاد. لكم منّا أطيب التحيات وكل عام وأنتم بخير.

إدارة الأكاديمية</textarea>
```

Multi-paragraph Arabic sample pre-fill per data-model §E7.

### Audience radios (`#cp-audience-*`) — FR-056

```html
<fieldset>
  <legend>الجمهور المستهدف</legend>
  
  <label for="cp-audience-all">
    <input type="radio" id="cp-audience-all" name="cp-audience" value="all" checked />
    جميع الطلاب
  </label>
  <p class="helper-text">ينشر للطلاب فقط في تغذية المجتمع.</p>
  
  <label for="cp-audience-course">
    <input type="radio" id="cp-audience-course" name="cp-audience" value="course" />
    دورة محددة
  </label>
  <p class="helper-text">ينشر للطلاب المسجّلين في الدورة المختارة فقط.</p>
  <label for="cp-audience-course-select" class="sr-only">اختر الدورة</label>
  <select id="cp-audience-course-select" disabled>
    <option>القرآن الكريم — المستوى الثالث</option>
    <option>اللغة العربية — المستوى الرابع</option>
    <option>الدراسات الإسلامية — المستوى الثاني</option>
  </select>
  
  <label for="cp-audience-parents">
    <input type="radio" id="cp-audience-parents" name="cp-audience" value="parents" />
    أولياء الأمور
  </label>
  <p class="helper-text">ينشر في تغذية أولياء الأمور.</p>
  
  <label for="cp-audience-teachers">
    <input type="radio" id="cp-audience-teachers" name="cp-audience" value="teachers" />
    المعلمين
  </label>
  <p class="helper-text">ينشر للمعلمين فقط — مخصّص للإعلانات الإدارية.</p>
</fieldset>
```

Exactly 4 audience options per FR-056. The conditional course `<select>` lists the 3 existing prior-spec courses verbatim (per data-model §E7).

### Image upload visual (`#cp-upload`) — FR-057

```html
<label for="cp-upload-button">ارفع صورة</label>
<div id="cp-upload" class="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50">
  <svg class="upload-icon" .../> <!-- cloud-upload icon -->
  <p>اسحب صورة هنا أو اختر من جهازك</p>
  <button type="button" id="cp-upload-button">تصفح الجهاز</button>
  <p class="helper-text">الصور المسموحة: PNG / JPG حتى 2 ميغابايت — هذا حقل عرضي.</p>
</div>
```

Visual-only — NO real `<input type="file">`.

### Scheduling radios (`#cp-schedule-*`) — FR-058

```html
<fieldset>
  <legend>موعد النشر</legend>
  
  <label for="cp-schedule-now">
    <input type="radio" id="cp-schedule-now" name="cp-schedule" value="now" checked />
    نشر فوراً
  </label>
  
  <label for="cp-schedule-later">
    <input type="radio" id="cp-schedule-later" name="cp-schedule" value="later" />
    جدولة لتاريخ لاحق
  </label>
</fieldset>

<!-- 2 visual inputs rendered unconditionally for visibility per FR-058 -->
<label for="cp-schedule-date">تاريخ النشر</label>
<input type="date" id="cp-schedule-date" value="2026-05-12" />

<label for="cp-schedule-time">وقت النشر</label>
<input type="time" id="cp-schedule-time" value="08:00" />
```

### Action cluster (`#cp-actions`) — FR-059 + FR-060

```html
<div id="cp-actions" class="form-actions">
  <button type="button" class="btn-primary">نشر المنشور</button>
  <button type="button" class="btn-secondary">حفظ كمسودة</button>
  <a href="social-hub.html" class="btn-tertiary">إلغاء</a>
</div>
<p id="cp-prototype-notice" class="prototype-notice">
  هذا نموذج تجريبي — لا يتم حفظ أو نشر منشورات فعلية عند الإرسال.
</p>
```

The cancel link `<a href="social-hub.html">` resolves within `pages/admin/` to the moderation page (per FR-059).

## Forbidden content

- **NO real `<form action="...">` POST handler** — the form is purely visual (FR-003).
- **NO real `<input type="file">`** — the upload is a visual placeholder (FR-057).
- **NO date validation** for past dates on the scheduling input — visual-only, no JS validation.
- **NO Download / Share / WhatsApp / Calendar-export buttons** (FR-019).

## Grep checks (Polish phase)

- `grep -c '<label for="cp-' pages/admin/create-post.html` ≥ 9 (1 type select + 1 title + 1 content + 4 audience radios + 1 audience-course-select + 1 schedule-now + 1 schedule-later + 1 schedule-date + 1 schedule-time + 1 upload-button = 12+; counting only cp-prefixed labels per FR-008)
- Audit: `comm -23 <(grep -oP 'id="cp-[a-z-]+' pages/admin/create-post.html | sort -u) <(grep -oP 'for="cp-[a-z-]+' pages/admin/create-post.html | sort -u)` MUST return empty (every cp-prefixed input id has a matching for) (FR-008 / FR-060 / SC-012)
- `grep -c '<option' pages/admin/create-post.html` ≥ 11 (7 type + 3 course + 1 starting placeholder where applicable; also handle option count flexibly)
- `grep -c 'إعلان عام\|تهنئة\|إنجاز طالب\|تحدي الأسبوع\|نصيحة تعليمية\|تذكير اختبار\|منشور دورة' pages/admin/create-post.html` ≥ 7 (7 type options — FR-054)
- `grep -c 'جميع الطلاب\|دورة محددة\|أولياء الأمور\|المعلمين' pages/admin/create-post.html` ≥ 4 (4 audience options — FR-056)
- `grep -c '<button type="button"' pages/admin/create-post.html` ≥ 3 (نشر + حفظ + تصفح الجهاز)
- `grep -c 'social-hub\.html' pages/admin/create-post.html` ≥ 2 (breadcrumb + cancel link — FR-059)
- `grep -c 'هذا نموذج تجريبي' pages/admin/create-post.html` ≥ 2 (upload helper + form-footer notice)
- `grep -c '<input type="file"' pages/admin/create-post.html` MUST be 0 (visual-only upload — FR-057)
- `grep -c '<form action=' pages/admin/create-post.html` MUST be 0 (no real POST — FR-003)
- `grep -cE 'apple-calendar\|google-calendar\|outlook\|تنزيل\|طباعة\|واتساب' pages/admin/create-post.html` MUST be 0 (FR-019)
- `grep -nE ' href="#"' pages/admin/create-post.html` MUST return 0 (FR-007)
- `wc -l assets/js/main.js` MUST equal 68 (zero new JS).
