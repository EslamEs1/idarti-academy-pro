# Contract — `pages/student/post-details.html`

**User story**: US2 (Single Post Deep-Read, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: Social Hub (children-of — `aria-current="page"` set on Social Hub since post-details is reached from the social-hub feed).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Breadcrumb | `#pd-breadcrumb` | مجتمع إدارتي / تفاصيل المنشور |
| Type pill + h1 | `#pd-header` | post type pill + title h1 |
| Author strip | `#pd-author` | avatar + name + date |
| Related-course chip | `#pd-course` | "مرتبط بدورة: ..." OR "غير مرتبط بدورة محددة" |
| Hero image | `#pd-image` | 16:9 illustrative SVG |
| Body | `#pd-body` | 4-6 paragraph Arabic content |
| Reaction row | `#pd-reactions` | 5 positive-only buttons |
| Comments thread | `#pd-comments` | ≥ 4 comment items |
| Comment form | `#pd-form` | textarea + helper + button |
| Related posts | `#pd-related` | ≥ 3 mini-cards |

## Required content

### Breadcrumb (`#pd-breadcrumb`)

`<a href="social-hub.html">مجتمع إدارتي</a> / <span aria-current="page">تفاصيل المنشور</span>`

### Header (`#pd-header`) — FR-026

- Type pill: `تحدي الأسبوع` (accent-100 background + accent-700 text + flag icon).
- h1: `تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد`

### Author strip (`#pd-author`) — FR-027

- Avatar: `أ.أ` circle (primary-700 fill, white text).
- Name chip: `الأستاذ أحمد بن عبد الله` (primary-50 background).
- Date: `5 مايو 2026` (Latin digits inside Arabic copy).

### Related-course chip (`#pd-course`) — FR-027

`<a href="course-details.html" class="...">مرتبط بدورة: القرآن الكريم — المستوى الثالث</a>` — info-tinted background, book icon. (For posts of type {إعلان عام, نصيحة تعليمية, إنجاز طالب} this chip degrades to a non-clickable "غير مرتبط بدورة محددة" caption per FR-027 — but the deep-dive sample is post #4 which DOES have a related course.)

### Hero image (`#pd-image`) — FR-027

16:9 aspect-ratio illustrative SVG (Quran-page motif, primary-tinted background) with `alt="صفحة من سورة الفجر — تحدي الأسبوع"` for screen readers.

### Body (`#pd-body`) — FR-027

4 paragraphs from research.md §R12, rendered with line-height ≥ 1.7 and font-size ≥ 16px:

1. "أهلاً بطلابي الكرام، تحدي هذا الأسبوع يركّز على سورة الفجر — السورة التي حفظتموها معاً في الأسابيع الماضية. الهدف ليس فقط الحفظ، بل تطبيق أحكام التجويد التي تعلّمناها."
2. "خطوات التحدي: (1) راجع السورة كاملة مرتين بصوت عالٍ. (2) ركّز على أحكام الميم الساكنة في الآيات 5 إلى 12 — تأكّد من النطق الصحيح. (3) سجّل قراءتك بهاتفك واستمع إليها — لاحظ أين تحتاج إلى تحسين."
3. "هذا التحدي اختياري وغير مقيّم — هو فرصة للمراجعة الشخصية قبل اختبار شهر مايو. من يرغب بمشاركة تجربته يمكنه ذكرها في تعليق على هذا المنشور."
4. "بالتوفيق جميعاً — أنا فخور بمستواكم في الحفظ هذا الفصل."

### Reaction row (`#pd-reactions`) — FR-028

5 fixed positive-only `<button type="button">` buttons in IDENTICAL order to social-hub.html (FR-012). Each button: `<emoji> <count> <label>` — counts from R11 post #4:

```
👍 14 إعجاب  ⭐ 9 تميّز  ❤️ 7 محبّة  🤲 4 دعاء  👏 11 تشجيع
```

After the reactions: a comments-count chip "8 تعليقات".

### Comments thread (`#pd-comments`) — FR-029

≥ 4 comments per research.md §R13. Each comment renders:
- Avatar: small circle with role-letter (ط/و).
- Anonymized author display.
- Date.
- Body (1-3 Arabic sentences).
- Status badge: تم الاعتماد (success-100 + check) OR في انتظار المراجعة (warning-100 + clock + tooltip).
- Pending comments use muted styling (opacity-60 + italic body) per FR-029.

| # | Author display | Date | Body | Status | Visual styling |
|---|----------------|------|------|--------|----------------|
| 1 | طالب من المستوى الثالث | 5 مايو 2026 | "جزاكم الله خيراً يا أستاذ أحمد — التحدي مفيد جداً وسأشاركم تسجيلي." | تم الاعتماد | full opacity |
| 2 | ولي أمر | 5 مايو 2026 | "شكراً لكم على هذه المبادرة — أحفّز ابني على المشاركة معكم." | تم الاعتماد | full opacity |
| 3 | طالبة من المستوى الثاني | 6 مايو 2026 | "هل يمكنني المشاركة من المستوى الثاني؟ بدأت في حفظ سورة الفجر هذا الأسبوع." | تم الاعتماد | full opacity |
| 4 | طالب من المستوى الثالث | 6 مايو 2026 | "بإذن الله سأشارك بعد المغرب — اللهم وفقني." | في انتظار المراجعة (badge tooltip: "سيتم نشر هذا التعليق بعد المراجعة — عادةً خلال 24 ساعة.") | opacity-60 + italic |

### Comment form (`#pd-form`) — FR-030 + FR-014 + R6

```html
<form id="pd-form" onsubmit="return false;">
  <label for="pd-comment-textarea">أضف تعليقاً</label>
  <textarea id="pd-comment-textarea" rows="4"
            placeholder="اكتب تعليقاً ملائماً ومحترماً..."
            aria-describedby="pd-form-helper"></textarea>
  <p id="pd-form-helper" class="info-tinted">
    🛡️ يرجى الالتزام بآداب الحوار التعليمي. التعليقات تخضع للمراجعة قبل النشر — نراجع التعليقات عادةً خلال 24 ساعة.
  </p>
  <button type="button">إرسال للمراجعة</button>
  <p class="prototype-notice">هذا نموذج تجريبي — لا يتم إرسال تعليقات فعلية.</p>
</form>
```

### Related posts (`#pd-related`) — FR-031

≥ 3 mini-cards. Sample:
- Mini-card 1 → links to `social-hub.html` with anchor for post #2 (تهنئة)
- Mini-card 2 → links to `social-hub.html` with anchor for post #5 (نصيحة تعليمية)
- Mini-card 3 → links to `social-hub.html` with anchor for post #7 (منشور دورة)

Each mini-card: type pill + 1-line title (line-clamp-2) + author + date. Visual layout: 3-column on desktop / horizontally scrollable strip on mobile.

## Forbidden content

- **NO Download / Print / Share / Save / WhatsApp / Calendar-export buttons** (FR-019).
- **NO thumbs-down / laughing / anger reactions** (FR-012).
- **NO full real student names in comments** (FR-015) — only role-titled anonymized formats.
- **NO reactor-list modal / popover** (R7).
- **NO `<form action="...">` or POST handler** — comment form is purely visual (FR-014).

## Grep checks (Polish phase)

- `grep -c '<label for="pd-comment-textarea"' pages/student/post-details.html` ≥ 1 (FR-008)
- `grep -c 'إرسال للمراجعة' pages/student/post-details.html` ≥ 1 (FR-014 button label — NOT "نشر")
- `grep -c 'نشر' pages/student/post-details.html` MUST NOT include the submit button — only "النشر" / "تنشر" / "تخضع للمراجعة قبل النشر" textual occurrences are acceptable; the literal `<button>نشر</button>` MUST NOT appear (FR-014).
- `grep -c 'خلال 24 ساعة' pages/student/post-details.html` ≥ 2 (form helper + ≥ 1 badge tooltip — R6)
- `grep -c 'تم الاعتماد' pages/student/post-details.html` ≥ 1 (FR-013, SC-017)
- `grep -c 'في انتظار المراجعة' pages/student/post-details.html` ≥ 1 (FR-013, SC-017)
- `grep -c 'طالب من المستوى\|طالبة من المستوى\|ولي أمر' pages/student/post-details.html` ≥ 4 (anonymized author roles per FR-015)
- `grep -c 'عبد الرحمن مؤمن' pages/student/post-details.html` MUST be 0 OR ≤ 1 (allowed only in header chrome — NOT in post body or comments — FR-015 extension; SC-024)
- `grep -c '👍.*إعجاب' pages/student/post-details.html` ≥ 1; same for ⭐ تميّز / ❤️ محبّة / 🤲 دعاء / 👏 تشجيع (FR-012, SC-011 order)
- `grep -P '👎\|😂\|😡\|😠' pages/student/post-details.html` returns 0 matches (FR-012, SC-006)
- `grep -c 'social-hub\.html' pages/student/post-details.html` ≥ 4 (breadcrumb + 3 related-post mini-cards)
- `grep -c 'course-details\.html' pages/student/post-details.html` ≥ 1 (related-course chip — FR-027)
- `grep -cE 'apple-calendar\|google-calendar\|outlook\|تنزيل\|طباعة\|واتساب' pages/student/post-details.html` MUST be 0 (FR-019)
- `grep -c 'onclick=\|data-reaction-modal\|data-reactor-list' pages/student/post-details.html` MUST be 0 (R7, SC-023)
- `wc -l assets/js/main.js` MUST equal 68 after this page is added.
