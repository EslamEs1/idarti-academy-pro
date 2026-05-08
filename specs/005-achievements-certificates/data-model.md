# Phase 1 Data Model — Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

This document defines the visual entities used across the eight pages of Spec 005. Like Specs 001-004, this is a **visual / sample-data model** — none of these entities are persisted, fetched, or rendered by JavaScript.

All entities anchor to the persona table locked through Specs 001-004 §R14 and extended in `research.md §R5` (Abdulrahman, عبد الرحمن مؤمن, ع.م initials, Quran path L3 60%, primary teacher الأستاذ أحمد بن عبد الله).

---

## E1. Certificate (4 instances on student-side; 8 on admin-side)

A formal achievement document. Featured prominently on `certificates.html`, fully showcased on `certificate-preview.html`, listed on `admin/certificates.html`.

| Field | Type | Notes / sample (E1.1 = Quran L1 = featured) |
|---|---|---|
| `id` | string | URL-style slug. Sample: `cert-quran-l1-abdulrahman` |
| `certificateIdDisplay` | string | Visible ID on certificate-preview. Sample: `IDR-2026-Q01-0042` |
| `titleAr` | string | Display title. Sample: `شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد` |
| `typeKey` | enum | One of `level-completion` / `monthly-excellence` / `attendance-engagement` / `quran-ijazah` / `special-award` |
| `typeLabelAr` | string | `إتمام مستوى` / `تميّز شهري` / `حضور والتزام` / `إجازة قرآنية` / `جائزة خاصة` |
| `courseRef` | reference | `القرآن الكريم — المستوى الأول` |
| `levelRef` | string (optional) | `المستوى الأول` (for level-completion type) |
| `teacherRef` | reference | `الأستاذ أحمد بن عبد الله` |
| `issueDateAr` | string | `5 يناير 2026` |
| `reasonAr` | string | 1-line caption. Sample: `إتمام جميع متطلبات المستوى الأول بتقدير ممتاز` |
| `statusKey` | enum | `pending-approval` / `approved` / `revoked` |
| `statusLabelAr` | string | `بانتظار الاعتماد` / `معتمدة` / `ملغاة` |
| `featured` | boolean | True for E1.1 (the showcased cert on achievements hub + the cert displayed in preview) |

**Student-side inventory** (4 cards on `certificates.html`):

| # | id | Title | Type | Issue date | Status | Featured? |
|---|---|---|---|---|---|---|
| 1 | `cert-quran-l1-abdulrahman` | شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد | إتمام مستوى | 5 يناير 2026 | معتمدة | **YES** |
| 2 | `cert-quran-l2-abdulrahman` | شهادة إتمام المستوى الثاني — مدّ الحروف وأحكام النون الساكنة | إتمام مستوى | 5 مارس 2026 | معتمدة | no |
| 3 | `cert-mexc-march-abdulrahman` | شهادة التميّز الشهري — مارس 2026 | تميّز شهري | 15 أبريل 2026 | معتمدة | no |
| 4 | `cert-att-term2-abdulrahman` | شهادة الالتزام بالحضور — الفصل الثاني 2025-2026 | حضور والتزام | 10 أبريل 2026 | معتمدة | no |

(Revoked certs are hidden from the student-side list per Edge Cases.)

**Admin-side inventory** (8 rows on `admin/certificates.html`, see R8):

| # | Student | Course/Level | Teacher | Type | Issue date | Status |
|---|---|---|---|---|---|---|
| 1 | عبد الرحمن مؤمن | Quran L3 (anticipated) | الأستاذ أحمد بن عبد الله | إتمام مستوى | اليوم — 8 مايو 2026 | بانتظار الاعتماد |
| 2 | عبد الرحمن مؤمن | Quran L1 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 5 يناير 2026 | معتمدة |
| 3 | عبد الرحمن مؤمن | Quran L2 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 5 مارس 2026 | معتمدة |
| 4 | محمد السعيدي | Quran L1 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 12 ديسمبر 2025 | معتمدة |
| 5 | ليلى المنصور | اللغة العربية — النحو | الأستاذة سلمى الحارثي | تميّز شهري | 18 أبريل 2026 | معتمدة |
| 6 | فيصل العتيبي | القرآن — إجازة الجزء الثلاثين | الشيخ عبد الله الراشد | إجازة قرآنية | 1 أبريل 2026 | معتمدة |
| 7 | أحمد الغامدي | الدراسات الإسلامية — السيرة | الشيخ عبد الله الراشد | جائزة خاصة | 22 مارس 2026 | معتمدة |
| 8 | سارة الحربي | الفصل الأول 2024-2025 | إدارة الأكاديمية | حضور والتزام | 10 فبراير 2026 | ملغاة |

---

## E2. Badge (7 instances on `badges.html`)

| Field | Type | Notes / sample (E2.2 = Homework Hero = anchored milestone) |
|---|---|---|
| `key` | enum | `attendance-star` / `homework-hero` / `top-of-class` / `most-improved` / `quran-progress` / `monthly-excellence` / `consistency-badge` |
| `nameAr` | string | `بطل الواجبات` |
| `descriptionAr` | string | 1-line: `لمن يلتزم بتسليم كل واجباته في موعدها` |
| `iconKey` | string | Lucide icon name. `award` for Homework Hero |
| `accentHue` | string | Tailwind token. `accent-500` for Homework Hero (per FR-063 mapping) |
| `earnedDateAr` | string | `15 يناير 2026` |
| `reasonAr` | string | 1-2 sentences. Sample: `تسليم جميع الواجبات في موعدها 3 أشهر متتالية — مستحق منذ بداية شهر يناير 2026.` |
| `visibilityKey` | enum | `public-on-profile` / `private` |
| `visibilityLabelAr` | string | `مرئي على ملفك الشخصي` / `خاص بك فقط` |

**Inventory** (per `research.md §R7`):

| # | key | Name | Hue | Earned | Visibility |
|---|---|---|---|---|---|
| 1 | `attendance-star` | وسام الحضور المتميّز | success-500 | 10 أبريل 2026 | مرئي |
| 2 | `homework-hero` | بطل الواجبات | accent-500 | 15 يناير 2026 | مرئي |
| 3 | `top-of-class` | أوّل الفصل | primary-700 | 20 أبريل 2026 | مرئي |
| 4 | `most-improved` | الأكثر تطوراً | info-500 | 5 مارس 2026 | مرئي |
| 5 | `quran-progress` | متقن القرآن | warning-500 | 1 مارس 2026 | **خاص** |
| 6 | `monthly-excellence` | وسام التميّز الشهري | rose-500 | 15 أبريل 2026 | مرئي |
| 7 | `consistency-badge` | وسام المثابرة | emerald-500 | 25 أبريل 2026 | **خاص** |

5 public + 2 private mix satisfies FR-065.

**Icon mapping**:

| Badge | Icon |
|---|---|
| Attendance Star | `star` |
| Homework Hero | `award` |
| Top of Class | `trophy` |
| Most Improved | `trending-up` |
| Quran Progress | `book-open` |
| Monthly Excellence | `medal` |
| Consistency Badge | `target` |

---

## E3. Monthly Exam Result (5 instances on `monthly-exams-passed.html`)

| Field | Type | Notes / sample (E3.1 = April 2026, most recent) |
|---|---|---|
| `monthAr` | string | `أبريل 2026` |
| `courseRef` | reference | `القرآن الكريم — المستوى الثالث` |
| `score` | int | 88 |
| `outOf` | int | 100 |
| `percentage` | int | 88 (computed) |
| `statusKey` | enum | `excellent` / `very-good` / `good` / `acceptable` |
| `statusLabelAr` | string | `ممتاز` / `جيد جداً` / `جيد` / `مقبول` |
| `teacherNoteAr` | string | 1-sentence teacher comment. Sample: `أداء قوي في تطبيق أحكام الميم الساكنة، نتطلع لمستوى أعلى الشهر القادم.` |
| `passed` | boolean | always true on this page |

**Inventory** (5 rows, reverse-chronological):

| # | Month | Course | Score | % | Status |
|---|---|---|---|---|---|
| 1 | أبريل 2026 | Quran L3 | 88 / 100 | 88% | ممتاز |
| 2 | مارس 2026 | Quran L2 (final) | 95 / 100 | 95% | ممتاز |
| 3 | فبراير 2026 | Quran L2 | 82 / 100 | 82% | جيد جداً |
| 4 | يناير 2026 | Quran L1→L2 transition | 78 / 100 | 78% | جيد جداً |
| 5 | ديسمبر 2025 | Quran L1 (final) | 90 / 100 | 90% | ممتاز |

Cumulative average: (88+95+82+78+90) / 5 = 86.6%.

---

## E4. Completed Curriculum Level (2 instances on `completed-levels.html`)

| Field | Type | Notes / sample (E4.1 = Quran L1) |
|---|---|---|
| `levelNumber` | int | 1 |
| `levelNameAr` | string | `المستوى الأول — أساسيات التلاوة والتجويد` |
| `courseRef` | reference | `القرآن الكريم` |
| `startDateAr` | string | `1 سبتمبر 2025` |
| `completionDateAr` | string | `20 ديسمبر 2025` |
| `finalEvaluationKey` | enum | `excellent` / `very-good` / `good` |
| `finalEvaluationLabelAr` | string | `ممتاز` |
| `nextRecommendedLevelAr` | string | `المستوى الثاني (مكتمل)` |
| `nextRecommendedStatusKey` | enum | `completed` / `in-progress` / `not-started` |
| `nextRecommendedProgressPct` | int (optional) | 100 (for completed) |
| `certificateAvailable` | boolean | true |
| `certificateRef` | reference (optional) | E1.1 |

**Inventory**:

| # | Level | Started | Completed | Final | Next |
|---|---|---|---|---|---|
| 1 | المستوى الأول — أساسيات التلاوة والتجويد | 1 سبتمبر 2025 | 20 ديسمبر 2025 | ممتاز | المستوى الثاني (مكتمل) |
| 2 | المستوى الثاني — مدّ الحروف وأحكام النون الساكنة | 5 يناير 2026 | 1 مارس 2026 | ممتاز | المستوى الثالث (حالياً — 60%) |

Both have `certificateAvailable = true` linked to E1.1 + E1.2.

**In-progress L3 preview card** (separate object):

| Field | Value |
|---|---|
| `levelNameAr` | `المستوى الثالث — أحكام الميم الساكنة وحفظ الجزء الثلاثين` |
| `progressPct` | 60 |
| `currentMilestoneAr` | `أحكام الميم الساكنة — تطبيق عملي` |
| `ctaLabelAr` | `متابعة من حيث توقّفت` |
| `ctaTarget` | `my-courses.html` |

---

## E5. Achievement Timeline Item (≥ 6 instances on `achievements.html`)

A unified entry on the achievements hub timeline. Aggregated from Certificate + Badge + Monthly Exam + Completed Level entities.

| Field | Type | Notes |
|---|---|---|
| `dateAr` | string | The earned/issue date |
| `typeKey` | enum | `certificate` / `badge` / `level-completion` / `monthly-exam` |
| `typeLabelAr` | string | `شهادة` / `وسام` / `مستوى` / `اختبار` |
| `titleAr` | string | The thing earned |
| `descriptionAr` | string | 1-sentence context |

**Inventory** (6 items in reverse-chronological order, per `research.md §R9`):

| # | Date | Type | Title | Description |
|---|---|---|---|---|
| 1 | 25 أبريل 2026 | وسام | وسام المثابرة | حضور بدون انقطاع لمدة 30 يوماً متتالياً |
| 2 | 20 أبريل 2026 | وسام | أوّل الفصل | أعلى درجة في القرآن الكريم — المستوى الثالث |
| 3 | 15 أبريل 2026 | شهادة | شهادة التميّز الشهري — مارس 2026 | 95% في الاختبار الشهري |
| 4 | 10 أبريل 2026 | وسام | وسام الحضور المتميّز | حضور 92% خلال الفصل الثاني |
| 5 | 5 مارس 2026 | وسام | وسام الأكثر تطوراً | تحسّن 25% في درجات اختبارات شهر مارس |
| 6 | 1 مارس 2026 | شهادة | شهادة إتمام المستوى الثاني | أحكام النون الساكنة بتقدير ممتاز |

(The first certificate dated 5 يناير 2026 is showcased separately as the **Featured Certificate** panel and not duplicated on the timeline.)

---

## E6. Summary Card (4 on achievements hub; 4 on admin certificates)

### Student-side (4 cards on `achievements.html`, FR-011)

| Label | Count | Tint | Icon |
|---|---|---|---|
| الشهادات المعتمدة | 4 | accent | `award` |
| اختبارات شهرية مجتازة | 5 | success | `circle-check` |
| مستويات أكملتها | 2 | primary | `layers` |
| أوسمة حصلت عليها | 7 | rose | `medal` |

### Admin-side (4 cards on `admin/certificates.html`, FR-071)

| Label | Count | Tint | Icon |
|---|---|---|---|
| شهادات معتمدة | 18 | success | `circle-check` |
| شهادات بانتظار الاعتماد | 3 | info | `clock` |
| شهادات أصدرت اليوم | 2 | accent | `send` |
| شهادات مُلغاة | 1 | danger | `x-circle` |

---

## E7. Filter Set (visual-only)

### Student certificates filter chips (FR-022, ≥ 3)

`الكل` (selected) / `إتمام مستوى` / `تميّز شهري` / `حضور والتزام` / `إجازة قرآنية` / `جائزة خاصة` (5 chips after الكل = 6 total).

### Admin certificates filters (FR-073, ≥ 4 dropdowns + search)

| Filter | Type | Options |
|---|---|---|
| الطالب | select | كل الطلاب / 8 student names |
| الدورة | select | كل الدورات / 5 courses across types |
| المعلم | select | كل المعلمين / 4 teachers (أحمد العمري / سلمى الحارثي / عبد الله الراشد / عمر الزهراني) |
| الحالة | select | كل الحالات / بانتظار الاعتماد / معتمدة / ملغاة |
| Search | text | placeholder "ابحث باسم الطالب أو الشهادة..." |

---

## E8. Certificate Authoring Form Snapshot (1 instance on `admin/create-certificate.html`)

The composed editable state of the create-certificate form. All inputs pre-filled to anticipate the persona's next certificate (Quran L3 completion).

| Field | Pre-filled value |
|---|---|
| `الطالب` (select) | عبد الرحمن مؤمن |
| `نوع الشهادة` (select) | إتمام مستوى |
| `الدورة` (select) | القرآن الكريم — المستوى الثالث |
| `المستوى` (select) | المستوى الثالث |
| `المعلم الموقّع` (select) | الأستاذ أحمد بن عبد الله |
| `سبب الإصدار` (textarea) | إتمام جميع متطلبات المستوى الثالث بنجاح وبتقدير ممتاز |
| `تاريخ الإصدار` (date) | 2026-05-08 (today's placeholder) |
| `ملاحظات إضافية` (textarea) | (empty / placeholder hint) |

**Action footer**: 3 elements per FR-084 — primary "معاينة الشهادة" `<button type="button">`, secondary "حفظ الشهادة" `<button type="button">`, tertiary "إلغاء" `<a href="certificates.html">`.

**Sample student options for the الطالب select** (≥ 8 names, FR-081):

عبد الرحمن مؤمن (selected), محمد السعيدي, ليلى المنصور, فيصل العتيبي, أحمد الغامدي, عمر القحطاني, ريم الدوسري, سارة الحربي.

---

## Cross-spec invariants

| Invariant | Source | This feature |
|---|---|---|
| Persona name + initials | Spec 001 §E2 / verified Spec 004 | عبد الرحمن مؤمن (ع.م) used on every student-side page |
| First certificate date | Spec 002 dashboard line 749 | 5 يناير 2026 — Cert 1 (E1.1) anchor on `certificates.html`, `achievements.html`, `certificate-preview.html` |
| Homework Hero badge date | Spec 002 learning-journey line 463 | 15 يناير 2026 — Badge 2 (E2.2) anchor on `badges.html` + Timeline item |
| 19-badge catalog | Spec 001 §E6 | All status pills + cert-type pills + visibility chips draw from this catalog only |
| Latin digits in Arabic copy | Spec 002 SC-006 | All grades, dates, ages, attempts, scores use Latin 0-9 |
| Bell-as-anchor header | Spec 002 T003 | Header carried over verbatim on student pages; admin pages use the equivalent admin-shell header |
| Sidebar drawer (mobile) | Spec 001 / `assets/js/main.js` | No new JS — drawer carries over as the only sanctioned interaction |
