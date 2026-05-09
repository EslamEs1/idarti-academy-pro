# Contract — `pages/student/social-hub.html`

**User story**: US1 (Social Hub Feed, P1 — MVP) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: Social Hub (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#sh-header` | h1 + subtitle + persona greeting |
| Moderation banner | `#sh-mod-banner` | shield icon + 1-line copy |
| Type filter | `#sh-filters` | 8-chip filter strip |
| Feed container | `#sh-feed` | wrapper for the 7 post cards |
| Post cards | `#sh-post-001` … `#sh-post-007` | one ID per card |

## Required content

### Header (`#sh-header`) — FR-020

- h1: `مجتمع إدارتي`
- Subtitle (one line): `مساحة تعليمية آمنة — منشورات الأكاديمية، تهانينا، وتحديات أسبوعية`
- Header chrome: search input + bell-as-anchor + profile dropdown (Spec 002 baseline) + greeting "عبد الرحمن مؤمن" (full name in OWN chrome — per data-model §E0).

### Moderation banner (`#sh-mod-banner`) — FR-021

Rendered immediately below the header. Style: info-50 background + info-700 text + shield icon (24×24 lucide).

```
🛡️ التعليقات تخضع للمراجعة — هذا فضاء تعليمي، ليس شبكة اجتماعية مفتوحة
```

### Type filter (`#sh-filters`) — FR-022

A horizontal `<ul>` of 8 chip `<button type="button">` elements with text labels (no leading icon needed for filter chips, but each label MUST appear with a small color dot per the type's color):

| # | Chip label | Default state |
|---|-----------|---------------|
| 1 | الكل | SELECTED (active class + accent ring) |
| 2 | إعلان عام | inactive |
| 3 | تهنئة | inactive |
| 4 | إنجاز طالب | inactive |
| 5 | تحدي الأسبوع | inactive |
| 6 | نصيحة تعليمية | inactive |
| 7 | تذكير اختبار | inactive |
| 8 | منشور دورة | inactive |

At < 768 px the strip becomes horizontally scrollable (`overflow-x-auto` + `whitespace-nowrap`). Visual-only (no JS).

### Feed (`#sh-feed`) — FR-023 + FR-024 + FR-025

7 post cards in reverse-chronological order. Each card has:

- **author strip**: avatar (circle, 40×40) + author name chip + date (Latin digits)
- **type pill**: 1 of 7 distinct color+icon (per data-model §E1)
- **body**: 2-3 sentence Arabic content
- **image placeholder**: 16:9 aspect-ratio illustrative SVG (NOT photo) with descriptive `alt`
- **related-course chip** (when applicable): "مرتبط بدورة: {course name + level}" → `course-details.html`
- **reaction row**: 5 fixed positive-only `<button type="button">` buttons (per data-model §E1 reactions field + research.md §R19)
- **comments-count chip**: "N تعليقاً" or "N تعليقات"
- **primary CTA**: "عرض المنشور" → `post-details.html`

Sample anchors per card (research.md §R11 verbatim):

| # | ID | Type | Author | Date | Body excerpt | Image | Related-course chip | Reactions (👍/⭐/❤️/🤲/👏) | Comments | CTA |
|---|----|------|--------|------|--------------|-------|---------------------|--------------------------|----------|-----|
| 1 | `sh-post-001` | إعلان عام | إدارة الأكاديمية | 7 مايو 2026 | "إجازة عيد الأضحى المبارك — الأكاديمية مغلقة من 6 إلى 10 يونيو 2026" | academy crest SVG, navy/gold | (none — degrades to "غير مرتبط بدورة محددة") | 23/8/12/6/4 | 7 تعليقات | عرض المنشور → `post-details.html` |
| 2 | `sh-post-002` | تهنئة | إدارة الأكاديمية | 5 مايو 2026 | "نهنئ **عبد الرحمن م.** على تفوّقه في اختبار شهر مارس بدرجة 95% — استمرّ في التميّز!" | gold star SVG over parchment | "مرتبط بدورة: القرآن الكريم — المستوى الثالث" → `course-details.html` | 18/14/11/9/16 | 12 تعليقاً | عرض المنشور |
| 3 | `sh-post-003` | إنجاز طالب | إدارة الأكاديمية | 3 مايو 2026 | "**سارة م.** أكملت المستوى الأول من مسار اللغة العربية — مبروك!" | book + checkmark SVG, success-tinted | "مرتبط بدورة: اللغة العربية — المستوى الأول" → `course-details.html` | 11/6/19/4/8 | 5 تعليقات | عرض المنشور |
| 4 | `sh-post-004` | تحدي الأسبوع | الأستاذ أحمد بن عبد الله | 5 مايو 2026 | "تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد" | Quran-page SVG, primary-tinted | "مرتبط بدورة: القرآن الكريم — المستوى الثالث" → `course-details.html` | 14/9/7/4/11 | 8 تعليقات | عرض المنشور (deep-dive sample for post-details.html) |
| 5 | `sh-post-005` | نصيحة تعليمية | الأستاذة منى سعد | 2 مايو 2026 | "نصيحة قراءة جهرية: ابدأ بسرعة بطيئة وزد تدريجياً — التركيز على المخارج أهمّ من السرعة" | open-book SVG, accent-tinted | (none — degrades to "غير مرتبط بدورة محددة") | 9/5/8/2/6 | 3 تعليقات | عرض المنشور |
| 6 | `sh-post-006` | تذكير اختبار | إدارة الأكاديمية | 1 مايو 2026 | "تذكير: اختبار شهر مايو في 28 مايو 2026 — تأكد من المراجعة" | calendar-clock SVG, info-tinted | "مرتبط بدورة: القرآن الكريم — المستوى الثالث" → `course-details.html` | 21/4/3/7/5 | 4 تعليقات | عرض المنشور |
| 7 | `sh-post-007` | منشور دورة | الأستاذ أحمد بن عبد الله | 30 أبريل 2026 | "بدأنا الجزء الثاني من المستوى الثالث في القرآن — التركيز على الآيات الطويلة" | course-banner SVG, success-tinted | "مرتبط بدورة: القرآن الكريم — المستوى الثالث" → `course-details.html` | 13/7/9/5/8 | 6 تعليقات | عرض المنشور |

## Forbidden content

- **NO post composer** (FR-011). The page MUST NOT contain any `<textarea>`, `<input type="text">`, `<form>` with composer semantics, or button labelled "اكتب منشوراً" / "ما الذي يدور في ذهنك؟" / "Post" / "Publish".
- **NO thumbs-down / laughing / anger reactions** (FR-012). Only the 5 positive-only emojis appear.
- **NO Download / Print / Share / Save / WhatsApp / Calendar-export buttons** (FR-019, FR-070 — these affordances live ONLY on calendar.html and on the report-canonical pages from Spec 006).
- **NO full real student names in post bodies** (FR-015 extension): "عبد الرحمن مؤمن" / "سارة مؤمن" MUST NOT appear in post #2 / #3 bodies — only "عبد الرحمن م." / "سارة م.". Authors ("إدارة الأكاديمية", named teachers) are unaffected.
- **NO reactor-list modal / popover** (FR-012 extension per Q5 / R7). Reaction buttons are non-interactive — no JS handler, no overlay opens on click.

## Grep checks (Polish phase)

- `grep -c 'sh-post-' pages/student/social-hub.html` ≥ 7 (one ID per post card)
- `grep -c '<button type="button"' pages/student/social-hub.html` ≥ 35 (5 reactions × 7 posts = 35; plus 8 filter chips = 43+)
- `grep -c 'post-details\.html' pages/student/social-hub.html` ≥ 7 (one CTA per card)
- `grep -c 'course-details\.html' pages/student/social-hub.html` ≥ 5 (5 of 7 posts have related-course chip)
- `grep -c 'إدارة الأكاديمية' pages/student/social-hub.html` ≥ 4 (4 of 7 posts authored by admin)
- `grep -c 'الأستاذ أحمد بن عبد الله' pages/student/social-hub.html` ≥ 2 (posts #4 + #7)
- `grep -c 'الأستاذة منى سعد' pages/student/social-hub.html` ≥ 1 (post #5)
- `grep -c 'عبد الرحمن م\.' pages/student/social-hub.html` ≥ 1 (post #2 anonymized subject) — the period after م is part of the anchor
- `grep -c 'عبد الرحمن مؤمن' pages/student/social-hub.html` MUST be 0 OR ≤ 1 (allowed only in header chrome greeting; not in post bodies — FR-015 extension)
- `grep -c 'سارة م\.' pages/student/social-hub.html` ≥ 1 (post #3 anonymized subject)
- `grep -c 'سارة مؤمن' pages/student/social-hub.html` MUST be 0 (sibling never in full name in posts)
- `grep -c '95%' pages/student/social-hub.html` ≥ 1 (post #2 score reference — FR-062)
- `grep -c '15 مارس 2026' pages/student/social-hub.html` ≥ 1 (post #2 date reference — FR-062)
- `grep -c 'تخضع للمراجعة' pages/student/social-hub.html` ≥ 1 (moderation banner)
- `grep -P '👎\|😂\|😡\|😠' pages/student/social-hub.html` returns 0 matches (FR-012 — no negative emojis)
- `grep -cE 'اكتب منشوراً\|ما الذي يدور في ذهنك\|اكتب ما تشعر به' pages/student/social-hub.html` MUST be 0 (FR-011 — no composer copy)
- `grep -c '👍 إعجاب\|⭐ تميّز\|❤️ محبّة\|🤲 دعاء\|👏 تشجيع' pages/student/social-hub.html` ≥ 35 (5 reaction labels × 7 posts)
- `grep -cE 'apple-calendar\|google-calendar\|outlook' pages/student/social-hub.html` MUST be 0 (FR-019 — export cluster is calendar-only)
- `grep -cE 'تنزيل\|طباعة\|واتساب\|مشاركة' pages/student/social-hub.html` MUST be 0 (FR-019 — these belong to report-canonical pages only)
- `grep -c 'onclick=\|data-reaction-modal\|data-reactor-list' pages/student/social-hub.html` MUST be 0 (FR-012 ext / R7 — no JS handler on reactions)
- `wc -l assets/js/main.js` MUST equal 68 after this page is added.
