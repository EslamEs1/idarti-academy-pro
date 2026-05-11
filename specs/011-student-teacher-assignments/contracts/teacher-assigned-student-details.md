# Contract: `pages/teacher/assigned-student-details.html`

**Role**: Teacher (view-as-الأستاذ-أحمد) | **Active sidebar entry**: «طلابي» | **Anchor entity**: `ASN-2024-1184` (عبد الرحمن مؤمن × الأستاذ أحمد) — same identifier as admin-details page; two-views-one-entity (SC-004 `diff` shared-header check)

## Page composition (top → bottom under RTL)

1. **Header** (reused — teacher chrome).
2. **Page header bar** — breadcrumb «طلابي › عبد الرحمن مؤمن — ASN-2024-1184» + title «تفاصيل الطالب — عبد الرحمن مؤمن» + status badge «نشط — متابعة جيدة».
3. **`<!-- SHARED_ASN_HEADER_START -->` block** — byte-identical to `student-teacher-assignment-details.html`. Contains:
   - Student-profile mini-card: «عبد الرحمن مؤمن — STD-2023-0143 — 11 سنة — جدة — ناطق بالعربية»
   - Course-and-level mini-card: «دورة القرآن الكريم — المستوى الثالث»
   - Assignment-type chip: «معلم رئيسي»
   - Start-date chip: «بدء التعيين: 2024-09-15»

   Closes with `<!-- SHARED_ASN_HEADER_END -->`.

   **SC-004**: `diff` between the SHARED_ASN_HEADER_START..END contents of this page and the admin-details page MUST return zero differences.

4. **8 detail cards** in a 2-column desktop grid (mobile-stacked):

   | # | Card | Body |
   |---|------|------|
   | 1 | معلومات الطالب | Full name + age + city + type + parent name «محمود مؤمن» (no `tel:` href, just visible text) |
   | 2 | الدورة والمستوى | «دورة القرآن الكريم — المستوى الثالث» + sub-caption «بدأ المستوى الثالث في 2025-02-01 بعد ترقية من المستوى الثاني» |
   | 3 | نوع التعيين | «معلم رئيسي» chip + caption «أنت المعلم الأساسي لهذا الطالب على هذه الدورة منذ 2024-09-15.» |
   | 4 | ملخص تواصل ولي الأمر | parent name + visual phone icon + visual WhatsApp icon — neither is a live `tel:`/`wa.me:` link (Constitution V); caption «للتواصل المباشر، يُرجى استخدام رسائل المنصة (لوحة الرسائل في الشريط الجانبي)» |
   | 5 | سجل الحضور | **92%** (Spec-006-locked) — 8-week sparkline as CSS-bar grid (8 `<div>` bars over `grid-cols-[repeat(8,minmax(0,1fr))]`) + text label below «نسبة الحضور خلال آخر 8 أسابيع — أداء ممتاز» |
   | 6 | سجل الواجبات | **88%** (Spec-006-locked) as the headline + caption «معدل التسليم التراكمي خلال الفصل الدراسي 2025-2026 — 22 من 25 واجباً» + a sub-line «آخر 6 واجبات: 5 مُسلَّمة · 1 في الانتظار». (The 5-of-6 recent count is NOT labeled "88%" — 5/6 ≈ 83%, not 88%; the 88% headline references the term-level 22/25 figure.) |
   | 7 | آخر التسليمات | 3 rows × 3 columns (الواجب / تاريخ التسليم / الدرجة): «واجب سورة البقرة 35-50» / 2026-05-05 / 92/100 + «اختبار التجويد» / 2026-04-28 / 88/100 + «واجب سورة البقرة 1-34» / 2026-04-15 / 95/100 |
   | 8 | ملاحظات | 3 prior notes in a vertical timeline (date + actor + body) + a `<textarea readonly>` for «إضافة ملاحظة جديدة» + sibling caption «هذا عرض مرئي فقط — لن يتم حفظ الملاحظة فعلياً» (FR-064) |

5. **Progress-summary tile** (full-width below the 8-card grid):
   - Heading: «الملخص العام»
   - Body: «التقدم العام: **ممتاز** (Spec-006-locked verbatim) — نسبة الحضور 92% + نسبة الواجبات 88% — يستحق هذا الطالب التقدير على تميّزه المستمر خلال شهر أبريل 2026.»

6. **Recommended-next-action tile**:
   - Heading: «التوصية المقترحة»
   - Body: «مراجعة الواجب الأخير (سورة البقرة 35-50) قبل جلسة 12 مايو — توجد ملاحظة من الطالب طلب فيها توضيحاً إضافياً عن آية 47.»
   - Visual chip: «أولوية متوسطة» (warning-amber)

7. **4 CTAs at footer**:
   - «إضافة ملاحظة» — scrolls to card 8's textarea (anchor link `href="#notes-card"`)
   - «مراجعة الواجبات» → `pages/teacher/homework-review.html` (Spec 004 existing page)
   - «عرض التقرير» → `pages/teacher/student-report.html` (Spec 006 existing page)
   - «إنشاء واجب» → `pages/teacher/create-homework.html` (Spec 004 existing page)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#6) | Page exists at `pages/teacher/assigned-student-details.html` |
| FR-060 | Page hard-coded to ASN-2024-1184 |
| FR-061 | `<!-- SHARED_ASN_HEADER -->` block byte-identical to admin-details (SC-004) |
| FR-062 | 8 cards in canonical order |
| FR-063 | Card 5 cites «92%», card 6 cites «88%», progress tile cites «ممتاز» — all verbatim |
| FR-064 | Card 8 textarea is `readonly` + sibling caption «هذا عرض مرئي فقط» |
| FR-065 | 4 footer CTAs routing to real existing files |

## Constraints

- The SHARED_ASN_HEADER block MUST diff-match the admin-details page exactly — verifiable by `diff <(awk '/SHARED_ASN_HEADER_START/,/SHARED_ASN_HEADER_END/' pages/admin/student-teacher-assignment-details.html) <(awk '/SHARED_ASN_HEADER_START/,/SHARED_ASN_HEADER_END/' pages/teacher/assigned-student-details.html)`.
- Spec-006-locked figures (92% / 88% / ممتاز) preserved verbatim — zero contradictions.
- The 8-week sparkline is pure CSS — 8 `<div>` bars in a grid; bar heights as Tailwind utility classes (`h-12`, `h-16`, `h-20`, `h-14`, etc.); no SVG, no JS, no chart library.
- The parent-contact-summary card MUST NOT carry a live `tel:` or `wa.me:` href — Constitution V (no new JS-launchable categories beyond the 4 sanctioned).
- The «إضافة ملاحظة» CTA uses `href="#notes-card"` (an anchor link, not a navigation link or modal trigger) — this is allowed because the destination ID `notes-card` exists on the same page; it does not satisfy any "broken-link" violation since it routes to an in-page anchor, not a placeholder.
- All 4 footer CTAs route to existing Spec-004 / Spec-006 pages — verifiable by `ls pages/teacher/homework-review.html pages/teacher/student-report.html pages/teacher/create-homework.html` returning all three files before the spec is considered Done.
- Latin digits inside Arabic copy (the project-wide convention; FR-081 spells it out for the currency-formatting case).
