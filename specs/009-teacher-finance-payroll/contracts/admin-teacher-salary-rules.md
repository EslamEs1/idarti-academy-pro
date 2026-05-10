# Contract: `pages/admin/teacher-salary-rules.html`

**Role**: Admin | **Active sidebar entry**: «مالية المعلمين» (sub-flow) | **Anchor**: 8 salary rules across 6 teachers + 4 rate-mechanism coverage + Q3 retroactivity callout

## Page composition

1. **Header** (reused) — admin variant.
2. **Page title bar** — H1 «قواعد رواتب المعلمين».
3. **Three summary tiles**:
   - عدد القواعد النشطة — 7 (8 total - 1 موقوفة)
   - عدد المعلمين المُغطّون — 6 معلمين
   - آخر تحديث للقاعدة — 2026-04-15 بواسطة SARA.M
4. **Filters strip** — 5 controls (RTL order):
   - المعلّم dropdown (6 options + الكل)
   - الدورة dropdown (5+ options + الكل)
   - نوع الطالب chips: ناطق بالعربية / غير ناطق بالعربية / الكل
   - الحالة chips: نشطة / موقوفة / الكل
   - البحث input
5. **Rules table** — 8 rows × 10 columns (`min-w-[850px]` overflow-scroll on tablet). Columns RTL order: المعلّم / الدورة / **ناطق بالعربية - جماعية** / **ناطق بالعربية - خاصة** / **غير ناطق بالعربية - جماعية** / **غير ناطق بالعربية - خاصة** / % الدورة / مبلغ ثابت شهرياً / الحالة / الإجراءات.

   Anchor rows (per data-model.md E2):

   | # | Teacher | Course | Ar-Grp | Ar-Prv | For-Grp | For-Prv | %Course | Fixed | Status | Actions |
   |---|---------|--------|--------|--------|---------|---------|---------|-------|--------|---------|
   | 1 | الأستاذ أحمد | دورة القرآن الكريم — المستوى الثالث | 30.00 | 60.00 | 50.00 | 100.00 | 20% | — | نشطة | تعديل / إيقاف |
   | 2 | الأستاذ أحمد | دورة القرآن الكريم — المستوى الرابع | 35.00 | 65.00 | 55.00 | 105.00 | 20% | — | نشطة | تعديل / إيقاف |
   | 3 | الأستاذة منى | دورة اللغة العربية الأساسية | 28.00 | 55.00 | 45.00 | 90.00 | 18% | — | نشطة | تعديل / إيقاف |
   | 4 | الأستاذ خالد | دراسات إسلامية للأطفال | 25.00 | 50.00 | 40.00 | 80.00 | 15% | — | نشطة | تعديل / إيقاف |
   | 5 | الأستاذة فاطمة | مساق الرياضيات الذكية | 30.00 | 55.00 | 50.00 | 95.00 | — | — | نشطة | تعديل / إيقاف |
   | 6 | الأستاذ يوسف | لغة إنجليزية للمدارس | 15.00 | 40.00 | 25.00 | 70.00 | — | **1,200.00 ريال** | نشطة | تعديل / إيقاف |
   | 7 | الأستاذة هبة | إنجليزية لغير الناطقين | — | — | **45.00 جنيه** | **105.00 جنيه** | — | — | نشطة (EGP) | تعديل / إيقاف |
   | 8 | الأستاذة منى | دورة الإملاء العربي المتقدّم | 30.00 | 60.00 | 50.00 | 100.00 | 18% | — | موقوفة (منذ 2026-03-01) | إعادة تفعيل |

6. **Table footnote (Q3)** — `* جميع القواعد تُطبَّق إلى الأمام من تاريخ السريان.` (small, muted text directly below the table).

7. **Rule-creation/edit form panel** (below the table OR as side-drawer-equivalent in-page section) labelled «إنشاء/تعديل قاعدة». 7 fields:
   - **المعلّم** dropdown (6 options) — pre-selected: الأستاذ أحمد
   - **الدورة** dropdown — pre-selected: دورة القرآن الكريم - المستوى الثالث
   - **نوع الطالب** chips: ناطق بالعربية / غير ناطق بالعربية / كلاهما — pre-selected: ناطق بالعربية
   - **نوع المعدّل** dropdown (4 options): لكل حصة جماعية / لكل حصة خاصة / نسبة من إيرادات الدورة / مبلغ ثابت شهرياً — pre-selected: لكل حصة خاصة
   - **المبلغ / النسبة** numeric input (sanctioned admin form input, NOT teacher-side) + currency-or-% badge — pre-fill 65.00 ريال
   - **تاريخ السريان** date picker — defaulted to **2026-06-01**
   - **ملاحظات** textarea — pre-fill «موافقة المدير العام بتاريخ 2026-04-30 — رفع المعدّل للحصص الخاصة بسبب الكفاءة»
   - Buttons: primary «حفظ القاعدة» + secondary «إلغاء»

8. **Q3 retroactivity callout** (FR-055b) — info-tone alert directly above (or beside on desktop RTL) the «تاريخ السريان» picker:

   > **«تسري القاعدة على التسويات الجديدة فقط من تاريخ السريان — لا تُعدَّل التسويات السابقة أو المدفوعة أو المعتمدة. لتعديل تسوية مغلقة، يُرجى استخدام «إعادة فتح التسوية» في صفحة تفاصيل التسوية الإدارية.»**

9. **«تاريخ التغييرات» timeline panel** (FR-056) — 3 historical rule-change entries:
   - 2026-04-15 — SARA.M — رفع نسبة الأستاذ أحمد على دورة المستوى الرابع من 18% إلى 20%
   - 2026-03-01 — AHMED.K — إيقاف قاعدة الأستاذة منى لدورة الإملاء العربي المتقدّم بعد تعليق الدورة
   - 2026-01-10 — SARA.M — إنشاء قاعدة الأستاذة هبة بالجنيه المصري (45/105 جنيه group/private)

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-050 | 3 summary tiles |
| FR-051 | 5 filter controls |
| FR-052 | 8 rows × 10 columns table |
| FR-053 | 4 rate mechanisms each demonstrated |
| FR-054 | موقوفة state with «إعادة تفعيل» CTA |
| FR-055 | 7-field rule-form panel + pre-filled demo state |
| FR-055b | Q3 retroactivity callout + table footnote |
| FR-056 | 3-entry historical timeline |
| FR-090, FR-091, FR-092 | All visibility rules satisfied |

## Constraints

- The 4 distinct per-session rate columns are mandatory (NOT collapsed into Arabic/Foreign aggregate columns).
- Row 6 (الأستاذ يوسف) MUST display the fixed monthly amount 1,200.00 ريال.
- Row 7 (الأستاذة هبة) MUST display EGP-denominated rates with «جنيه» badge.
- Row 8 MUST visually demonstrate the موقوفة greyed-out state with «إعادة تفعيل» CTA.
- The Q3 callout text is mandatory verbatim (FR-055b clarification).
- Form numeric input is sanctioned (admin-side).
