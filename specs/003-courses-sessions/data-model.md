# Phase 1 Data Model — Courses and Live Sessions

This document defines the visual entities used across the six pages of Spec 003. Like Spec 001/002, this is a **visual / sample-data model** — none of these entities are persisted, fetched, or rendered by JavaScript. Each entity is committed as static HTML.

All entities anchor to the persona locked in Spec 001 §E2 and the cross-spec continuity table in `research.md §R14` (Abdulrahman, Quran path, Level 3, family balance 750 ر.س, primary teacher الأستاذ أحمد بن عبد الله).

---

## E1. Course (8 instances on browse-courses; 4 cross-referenced on my-courses; 1 deep on course-details)

The full catalog item shown on `browse-courses.html`, summarized on `my-courses.html`, and fully expanded on `course-details.html`.

| Field | Type | Notes / sample |
|---|---|---|
| `id` | string | URL-style slug. Sample: `quran-l3` |
| `titleAr` | string | Course title in Arabic. Sample for E1.1: `أحكام الميم الساكنة وحفظ الجزء الثلاثين` |
| `subjectKey` | enum | One of `quran` / `arabic` / `english` / `math` / `islamic-studies` |
| `subjectLabelAr` | string | Display name for the subject |
| `descriptionAr` | string | 1-2 line Arabic description shown on cards + course-details overview |
| `levelLabelAr` | string | e.g., `المستوى الثالث` |
| `durationLabelAr` | string | e.g., `12 أسبوعاً — 3 حصص أسبوعياً` |
| `typeKey` | enum | `group` (جماعية) or `private` (خاصة) — feminine forms (modify دورة / حصة) |
| `priceArabicFullMonthly` | number | Sample: 600 ر.س / month for Quran L3 |
| `priceForeignFullMonthly` | number | Sample: 200 USD / month |
| `priceArabicPerSession` | number | Sample: 75 ر.س |
| `priceForeignPerSession` | number | Sample: 25 USD |
| `badgeKey` | enum (optional) | One of `popular` / `new` / `recommended` / `none` |
| `badgeLabelAr` | string (optional) | `الأكثر طلباً` / `جديد` / `موصى بك` |
| `teacherRef` | reference → E3 | The teacher anchoring this course |
| `enrollmentStatus` | enum | `enrolled` / `not-enrolled` / `completed` |
| `currentLevelProgressPct` | number (0-100) | Only when `enrolled`. Sample: 60 for E1.1 |
| `currentMilestoneAr` | string | Only when `enrolled`. Sample: `أحكام الميم الساكنة — تطبيق عملي` |
| `paymentModelLabelAr` | string | Only when `enrolled`. `اشتراك كامل` or `حصص مدفوعة فردياً` |
| `paidSessionsCompleted` | number | Only when `paymentModelLabelAr === حصص مدفوعة فردياً`. Sample: `3` |
| `paidSessionsTotal` | number | Only when per-session. Sample: `8` |
| `completionDateAr` | string | Only when `completed`. Sample: `15 يناير 2026` |
| `finalGradeLabelAr` | string | Only when `completed`. Sample: `ممتاز` |
| `certificateAvailable` | boolean | Only when `completed`. |

**Sample course inventory** (Spec 003 catalog — locked via R8 of research.md):

| # | id | Title | Subject | Type | Badge | Arabic full / mo | Foreign full / mo |
|---|---|---|---|---|---|---|---|
| 1 | `quran-l3` | أحكام الميم الساكنة وحفظ الجزء الثلاثين | quran | group | recommended | 600 ر.س | 200 USD |
| 2 | `quran-l1` | أساسيات التلاوة والتجويد | quran | group | popular | 500 ر.س | 175 USD |
| 3 | `arabic-balagha` | اللغة العربية — البلاغة والإنشاء | arabic | group | new | 550 ر.س | 185 USD |
| 4 | `arabic-nahw` | اللغة العربية — قواعد النحو الميسّرة | arabic | private | none | 700 ر.س | 250 USD |
| 5 | `english-arabic-speakers` | اللغة الإنجليزية — للناطقين بالعربية | english | group | popular | 500 ر.س | 175 USD |
| 6 | `english-conversation` | اللغة الإنجليزية — محادثة متقدّمة | english | private | none | 650 ر.س | 230 USD |
| 7 | `math-middle` | الرياضيات — للمرحلة المتوسطة | math | group | none | 450 ر.س | 160 USD |
| 8 | `islamic-sira` | الدراسات الإسلامية — السيرة النبوية | islamic-studies | group | recommended | 400 ر.س | 150 USD |

Per-session prices: Arabic 60-100 ر.س (75 standard); Foreign 20-35 USD (25 standard).

---

## E2. Course-Level Group (4 instances on course-details for the Quran L3 curriculum)

The curriculum sub-sections within a course's "المنهج الدراسي" block.

| Field | Type | Notes / sample |
|---|---|---|
| `levelNumber` | integer | 1-4 |
| `nameAr` | string | The level's name (mirrors Spec 002 §E2 path levels) |
| `status` | enum | `completed` / `current` / `upcoming` |
| `statusLabelAr` | string | `مكتمل` / `حالياً` / `قادم` |
| `sessionCount` | integer | Number of sessions in the level. Sample: 12 / 15 / 18 / 20 across L1-L4 |
| `homeworkCount` | integer | Number of homework items in the level. Sample: 6 / 8 / 10 / 12 |

Same 4 levels as Spec 002 §E2 (Quran path) — preserves continuity.

---

## E3. Teacher (1 deep instance on course-details for الأستاذ أحمد; cross-referenced everywhere)

| Field | Type | Notes / sample |
|---|---|---|
| `nameAr` | string | الأستاذ أحمد بن عبد الله |
| `avatarInitials` | string | أ.أ — used as `bg-primary-700 text-white` round avatar |
| `titleAr` | string | معلم القرآن الكريم — معتمد من جامعة الإمام |
| `bioAr` | string | 2-3 Arabic sentences about background, methodology |
| `yearsOfExperience` | integer | 12 |
| `studentsTaught` | integer | 480 |
| `averageRating` | number | 4.9 (out of 5) |
| `coursesTaughtCount` | integer | 7 |

Used on course-details (deep profile) and as a referenced chip on every session row + my-courses card.

---

## E4. Live Session (≥ 7 across the 3 tabs of live-sessions; 1 deep on live-session-details; 4 in the bundle on checkout)

The scheduled instruction event.

| Field | Type | Notes / sample |
|---|---|---|
| `id` | string | URL-style slug. Sample: `bundle-1` |
| `titleAr` | string | Sample for live-session-details: `مراجعة خاصة 1: تطبيق أحكام الميم الساكنة` |
| `courseRef` | reference → E1 | Course this session belongs to |
| `teacherRef` | reference → E3 | Always الأستاذ أحمد in this prototype |
| `dateAr` | string | e.g., `الجمعة 1 مايو 2026` |
| `timeAr` | string | e.g., `7:00 م إلى 8:00 م` |
| `durationLabelAr` | string | e.g., `60 دقيقة` |
| `typeKey` | enum | `group` or `private` |
| `typeLabelAr` | string | `جماعية` or `خاصة` |
| `status` | enum | `upcoming` / `completed` / `missed` / `cancelled` |
| `statusLabelAr` | string | Maps to catalog: `قادم` / `مكتمل` / `فائت` / `ملغاة` |
| `paymentModel` | enum | `included` (with subscription) or `per-session` |
| `priceForViewer` | number (optional) | Only when `per-session`. e.g., `75` (ر.س) |
| `priceStatus` | enum (optional) | Only when `per-session`. `paid` or `unpaid` |
| `attendanceStatus` | enum (optional) | Only when `completed`. `attended` or `absent` |
| `recordingAvailability` | enum (optional) | Only when `completed`. `available` / `not-available` |
| `bundleRef` | reference → E5 (optional) | Only when this session belongs to a bundle |
| `bundlePosition` | string (optional) | e.g., `1 من 4` |

---

### E4-A. Live-sessions page row inventory (the 3 tabs)

**Upcoming tab (≥ 3 rows, FR-041)**:
1. حصة "أحكام الميم الساكنة — تطبيق عملي" — 28 أبريل 2026 7:00 م — جماعية — included (matches dashboard upcoming-session card from Spec 002 after gender-drift fix)
2. حصة "تطبيق المدّ المنفصل والمتّصل" — 30 أبريل 2026 7:00 م — جماعية — included
3. حصة "مراجعة خاصة 1: تطبيق أحكام الميم الساكنة" — 1 مايو 2026 5:00 م — خاصة — per-session paid (UNPAID, links to checkout)

**Completed tab (≥ 2 rows, FR-043)**:
4. حصة "حفظ سورة النبأ" — 24 أبريل 2026 — جماعية — included — حضر
5. حصة "تجويد سورة الواقعة" — 17 أبريل 2026 — جماعية — included — حضر — recording available

**Missed tab (≥ 2 rows, R7)**:
6. حصة "أحكام النون الساكنة — مراجعة" — 22 أبريل 2026 — جماعية — included — لم يحضر بسبب انقطاع الإنترنت — "إعادة الجدولة"
7. حصة "تجويد سورة الواقعة" — 15 أبريل 2026 — جماعية — included — لم يحضر بدون عذر — "إعادة الجدولة"

---

## E5. Session Bundle (1 instance: حزمة المراجعة الشهرية — anchored to checkout-preview + live-session-details)

A package of multiple per-session bookings purchased together (Q5 clarification).

| Field | Type | Notes / sample |
|---|---|---|
| `id` | string | `monthly-review` |
| `titleAr` | string | حزمة المراجعة الشهرية |
| `descriptionAr` | string | "أربع حصص مراجعة خاصة 1:1 مع الأستاذ أحمد قبل الاختبار الشهري" |
| `courseRef` | reference → E1 | Quran L3 |
| `teacherRef` | reference → E3 | الأستاذ أحمد |
| `typeKey` | enum | `private` |
| `typeLabelAr` | string | `خاصة` |
| `sessions` | list of E4 entries | 4 sessions |
| `pricePerSessionArabic` | number | 75 (ر.س) |
| `pricePerSessionForeign` | number | 25 (USD) |
| `sessionCount` | integer | 4 |
| `baseTotalArabic` | number | 300 (4 × 75 ر.س) |
| `baseTotalForeign` | number | 100 (4 × 25 USD) |
| `vatPct` | number | 15 |
| `vatAmountArabic` | number | 45 (15% × 300) |
| `subtotalArabic` | number | 345 (300 + 45) |
| `paymentStatus` | enum | `unpaid` (default — drives the FR-055 unpaid block on session-details) |

The bundle's 4 sessions:

| # | titleAr | dateAr | timeAr |
|---|---|---|---|
| 1 | مراجعة خاصة 1: تطبيق أحكام الميم الساكنة | الجمعة 1 مايو 2026 | 5:00 م إلى 6:00 م |
| 2 | مراجعة خاصة 2: حفظ الجزء الثلاثين | السبت 2 مايو 2026 | 5:00 م إلى 6:00 م |
| 3 | مراجعة خاصة 3: تطبيق أحكام التجويد | الأحد 3 مايو 2026 | 5:00 م إلى 6:00 م |
| 4 | مراجعة خاصة 4: محاكاة الاختبار الشهري | الإثنين 4 مايو 2026 | 5:00 م إلى 6:00 م |

All 4 sessions: type=private, teacher=الأستاذ أحمد, paymentModel=per-session, priceForViewer=75 (Arabic), priceStatus=unpaid, bundleRef=monthly-review, bundlePosition=`N من 4`.

---

## E6. Pricing Profile (1 instance per course, deep on course-details for Quran L3)

The full 2×2 pricing matrix.

| Field | Type | Notes / sample (Quran L3) |
|---|---|---|
| `arabicFullMonthly` | number | 600 (ر.س / شهر) |
| `foreignFullMonthly` | number | 200 (USD / month) |
| `arabicPerSession` | number | 75 (ر.س / حصة) |
| `foreignPerSession` | number | 25 (USD / session) |
| `certificateIncluded` | boolean | true |
| `familyDiscountEligible` | boolean | true (5% if 2+ children enrolled — visual caption only) |

Rendered as 4 side-by-side cards in a 2×2 grid (R10). Arabic column is visually emphasized (R4); Foreign column is the comparison line.

---

## E7. Student-Type Indicator (single instance — the persona)

| Field | Value |
|---|---|
| `key` | `arabic-student` |
| `labelAr` | `طالب عربي` |
| `currencyCode` | `SAR` |
| `currencySuffix` | `ر.س` |
| `appliesToRow` | "Arabic" pricing rows on every catalog/details/checkout surface |
| `comparisonLabelAr` | `للطلاب غير الناطقين بالعربية` (used in the smaller comparison line) |

The non-matching profile (foreign student) is shown alongside but with smaller weight per R4.

---

## E8. Family Prepaid Balance (single instance — anchored to Spec 002)

| Field | Value |
|---|---|
| `availableAmountArabic` | 750 ر.س |
| `applyToggleStateDefault` | checked |
| `appliedAmountThisCheckout` | 200 ر.س (capped — keeps amount due > 0 per Q5) |
| `remainingAfterApplyArabic` | 550 ر.س (informational caption) |

---

## E9. Checkout Snapshot (single instance — anchored to the bundle on checkout-preview)

The composed state of `session-checkout-preview.html` for the default render.

| Field | Value (Arabic student / Quran L3 bundle) |
|---|---|
| `bundleRef` | E5 monthly-review |
| `studentTypeRef` | E7 arabic-student |
| `basePrice` | 300 ر.س |
| `basePriceLabelAr` | `4 حصص × 75 ر.س = 300 ر.س` |
| `vatPct` | 15 |
| `vatAmount` | 45 ر.س |
| `vatLabelAr` | `ضريبة القيمة المضافة 15% = 45 ر.س` |
| `subtotal` | 345 ر.س |
| `subtotalLabelAr` | `الإجمالي قبل الرصيد = 345 ر.س` |
| `balanceAvailable` | 750 ر.س |
| `balanceApplied` | 200 ر.س |
| `balanceAppliedLabelAr` | `سيُخصم من الرصيد: 200 ر.س` |
| `amountDue` | 145 ر.س |
| `amountDueLabelAr` | `المبلغ المستحق بعد خصم الرصيد: 145 ر.س` |
| `selectedPaymentMethodRef` | E10 method #1 (بطاقة ائتمانية) |

Foreign-student comparison line: `للطلاب غير الناطقين بالعربية: ~62 USD بعد خصم الرصيد` (math: 4 × 25 USD base + 15% VAT = 115 USD subtotal − ~53 USD equiv. of 200 ر.س balance applied ≈ 62 USD due).

---

## E10. Payment Method (3 instances on checkout-preview, FR-064)

Visual radio-cards. The first option is pre-selected.

| # | key | labelAr | logoText | last4 | preSelected |
|---|---|---|---|---|---|
| 1 | `credit-card` | بطاقة ائتمانية (Visa) | VISA | 4242 | ✓ |
| 2 | `mada` | مدى | مدى | 8821 |  |
| 3 | `apple-pay` | Apple Pay |  Pay |  iPhone |  |

All three are visually present; only the radio control (visual) marks #1 as selected. No JS state.

---

## E11. Course Outcome (≥ 5 instances on course-details "ماذا ستتعلم" section, FR-031)

Sample for Quran L3:

| # | outcomeAr |
|---|---|
| 1 | إتقان أحكام الميم الساكنة (إخفاء، إدغام، إظهار) في التلاوة |
| 2 | حفظ الجزء الثلاثين بالكامل مع ضبط مخارج الحروف |
| 3 | فهم تطبيقات المدّ بأنواعه الثلاثة (الطبيعي، المنفصل، المتّصل) |
| 4 | تحسين الأداء الصوتي والتجويد العملي تحت إشراف معلم معتمد |
| 5 | الاستعداد الكامل للانتقال إلى المستوى الرابع (التلاوة المتقدّمة) |
| 6 | اجتياز الاختبار الشهري بتقدير لا يقل عن "ممتاز" |

Each outcome paired with a `check-circle` Lucide icon at `text-success-600` (per FR-031).

---

## E12. Preparation Checklist Item (≥ 3 instances on live-session-details, FR-052)

For bundle session #1 (مراجعة خاصة 1):

| # | itemAr | doneState |
|---|---|---|
| 1 | راجع آيات الجزء 30 من الآية 1 إلى 20 (سورة النبأ) | ✓ done |
| 2 | حضّر السؤال الأول من الواجب الأخير (تطبيق إخفاء الميم) | ✓ done |
| 3 | تأكّد من جودة الكاميرا والميكروفون قبل الموعد بـ 10 دقائق | not done |
| 4 | اختر مكاناً هادئاً مع إضاءة كافية | not done |

Each row: `<input type="checkbox" disabled>` reflecting `doneState`; checked items strike-through + `text-text-muted`; unchecked stay `text-text-base`.

---

## E13. Linked Homework (≥ 1 instance on live-session-details, FR-053)

For bundle session #1:

| Field | Value |
|---|---|
| `titleAr` | تطبيق أحكام الميم الساكنة في سورة النبأ |
| `dueDateAr` | الخميس 30 أبريل 2026 |
| `statusKey` | `under-review` (catalog) |
| `statusLabelAr` | قيد المراجعة |
| `teacherRef` | الأستاذ أحمد |
| `cta` | `عرض الواجب` → `assignments.html` |

---

## E14. Catalog Filter (≥ 7 chips on browse-courses, FR-012)

Visual filter chips. None pre-selected (all visually equal-weight).

| # | key | labelAr | iconLucide |
|---|---|---|---|
| 1 | quran | القرآن الكريم | book-open |
| 2 | arabic | اللغة العربية | languages |
| 3 | english | اللغة الإنجليزية | languages |
| 4 | math | الرياضيات | calculator |
| 5 | islamic-studies | الدراسات الإسلامية | landmark |
| 6 | private | حصص خاصة | user |
| 7 | group | حصص جماعية | users |

Each chip rendered as `inline-flex items-center gap-1.5 rounded-full bg-surface-100 hover:bg-surface-200 text-text-base px-3.5 py-1.5 text-sm font-medium border border-slate-200 cursor-pointer`. Visual only; no JS.

---

## Summary

14 entities. ~70 sample-data records total. All values anchored to Spec 001/002 persona and continuity table (R14). No fields are JS-rendered; every value is committed in HTML.
