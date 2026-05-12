# Phase 1: Data Model — Student-Teacher Assignment & Academic Supervision Frontend

**Feature**: 011-student-teacher-assignments
**Date**: 2026-05-11

This document lists the **eight conceptual entities** modeled in static HTML across the seven new pages, plus the **sample-data anchors** every page must seed. All "data" is hard-coded markup — no runtime store, no fetch, no JS-generated rows. The figures below are the canonical seed values; implementation MUST cite these verbatim.

## Entity overview

| # | Entity | Identifier pattern | Anchor record | Pages where surfaced |
|---|--------|--------------------|---------------|----------------------|
| E1 | **Assignment** | `ASN-YYYY-NNNN` | `ASN-2024-1184` (عبد الرحمن مؤمن × الأستاذ أحمد) | All 7 pages |
| E2 | **Assignment Type** | enum of 6 | «معلم رئيسي» | Create-form select / details type chip / assignments-list column / supervisors-page filter |
| E3 | **Session Type** | enum of 2 (خاصة / جماعية) | «خاصة» (for the anchor record) | Create-form select / list column / details card |
| E4 | **Payment Model** | enum of 4 | «دورة كاملة» | Create-form select / list column / details card / pricing-preview formula |
| E5 | **Student** | `STD-YYYY-NNNN` | `STD-2023-0143` (عبد الرحمن مؤمن) | All 7 pages |
| E6 | **Family** | `FAM-YYYY-NNNN` | `FAM-2023-0211` (عائلة مؤمن, 450 ريال balance) | Create-form family auto-fill / details family card / pricing-preview family-balance line |
| E7 | **Teacher** | `TCH-YYYY-NNNN` | `TCH-2023-0011` (الأستاذ أحمد) | All 7 pages |
| E8 | **Transfer Event** | sub-record on Assignment | transfer event on `ASN-2024-0902` (2026-03-15) | Transfer page / assignment-history timeline / «طلاب سابقون» section |

A 9th conceptual surface — **Academic Supervisor** — is **NOT a separate entity** per Q1 resolution: it is the filtered view of Assignment records where `assignment_type = "مشرف أكاديمي"`, surfaced on `academic-supervisors.html` with supervision-specific columns.

---

## E1 — Assignment

**Identifier**: `ASN-YYYY-NNNN` (4-digit zero-padded sequence, Latin digits per the project-wide Latin-digits-inside-Arabic convention — FR-081 spells it out for the currency-formatting case)
**Anchor record**: `ASN-2024-1184`

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | `ASN-YYYY-NNNN` |
| `student_id` | string | FK to E5 |
| `family_id` | string | FK to E6 (derived from student) |
| `course` | string | from Spec 003 catalog |
| `level` | string | course-dependent level |
| `current_teacher_id` | string | FK to E7 — the *currently active* teacher |
| `previous_teacher_id` | string \| null | non-null only if the assignment has been transferred |
| `assignment_type` | enum E2 | one of 6 |
| `session_type` | enum E3 | خاصة / جماعية |
| `payment_model` | enum E4 | one of 4 |
| `student_type` | enum («ناطق بالعربية» / «غير ناطق بالعربية») | derived from E5; preserved on the record for pricing-history reasons |
| `currency` | enum (SAR / EGP) | derived from teacher's pricing tier |
| `unit_price` | decimal | matches a Spec-010 pricing rule (cited by ID in the pricing-preview) |
| `total_sessions` | integer | static demo value |
| `remaining_sessions` | integer | static demo value; ≤ 2 triggers the «على وشك الانتهاء» indicator |
| `status` | enum (نشطة / موقوفة / منتهية / مكتملة) | 4 values |
| `start_date` | date | YYYY-MM-DD |
| `end_date` | date \| string | YYYY-MM-DD or «مستمر» |
| `preferred_days` | array of weekday names (الأحد...السبت) | multi-chip on the create-form |
| `preferred_time` | string | HH:MM (24-hour, Latin digits) |
| `transferred_out_at` | datetime \| null | non-null only for records on the transferred-out demo path |
| `history` | array of timeline events | embedded in the details page |

### Status state transitions

```text
        (admin creates)
نشطة  ────────────────►  نشطة
  │                       │
  │                       │ (admin clicks «إيقاف التعيين» on details page → sanctioned modal → confirms)
  │                       ▼
  │                    موقوفة
  │                       │
  │                       │ (admin clicks «استئناف» on the موقوف row's actions cell → sanctioned modal → confirms)
  │                       │
  │      ◄────────────────┘
  │
  │ (remaining_sessions reaches 0 OR end_date passes)
  ▼
مكتملة
  │
  │ (admin chooses to close the record administratively, e.g., student withdrew mid-program with no plan to return)
  ▼
منتهية
```

In the static prototype, the 18-row main table seeds **16 نشطة + 1 موقوفة + 1 مكتملة + 0 منتهية** to demonstrate the dominant states and the soft-stop transition. The transfer event is **not** a state transition — it does NOT change `status` (remains نشطة); it only updates `current_teacher_id` and adds a history event.

### Anchor record `ASN-2024-1184` (verbatim)

```text
id:                 ASN-2024-1184
student_id:         STD-2023-0143  (عبد الرحمن مؤمن)
family_id:          FAM-2023-0211  (عائلة مؤمن)
course:             دورة القرآن الكريم
level:              المستوى الثالث
current_teacher_id: TCH-2023-0011  (الأستاذ أحمد بن عبد الله)
previous_teacher_id: null
assignment_type:    معلم رئيسي
session_type:       خاصة
payment_model:      دورة كاملة
student_type:       ناطق بالعربية
currency:           SAR
unit_price:         380.00 ريال       (Spec-010 Rule 1)
total_sessions:     24
remaining_sessions: 18
status:             نشطة
start_date:         2024-09-15
end_date:           مستمر
preferred_days:     [الأحد, الثلاثاء, الخميس]
preferred_time:     17:00
transferred_out_at: null
history:            (3 events — see below)
```

### Anchor record `ASN-2024-1185` — pre-populated on transfer page

```text
id:                 ASN-2024-1185
student_id:         STD-2023-0144  (سارة مؤمن)
family_id:          FAM-2023-0211
course:             دورة القرآن الكريم
level:              المستوى الثاني
current_teacher_id: TCH-2023-0012  (الأستاذة منى سعد)
previous_teacher_id: null
assignment_type:    معلم رئيسي
session_type:       جماعية
payment_model:      دورة كاملة
student_type:       ناطق بالعربية
currency:           SAR
unit_price:         380.00 ريال
total_sessions:     24
remaining_sessions: 14
status:             نشطة
start_date:         2024-09-15
preferred_days:     [الإثنين, الأربعاء]
preferred_time:     16:00
```

The transfer-page demo seeded state proposes moving سارة from الأستاذة منى to الأستاذ خالد العبدلي on 2026-05-15 for reason «تعارض في الجدول», scope «الجلسات المستقبلية فقط».

### Anchor record `ASN-2024-0902` — transferred-out demo

```text
id:                  ASN-2024-0902
student_id:          STD-2023-0067  (حسن المنصور)
family_id:           FAM-2023-0067
course:              دورة القرآن الكريم
level:               المستوى الأول
current_teacher_id:  TCH-2023-0012  (الأستاذة منى — current after transfer)
previous_teacher_id: TCH-2023-0011  (الأستاذ أحمد بن عبد الله — pre-transfer; أحمد taught حسن Qur'an L1 group sessions before the March transfer)
assignment_type:     معلم رئيسي
session_type:        جماعية
payment_model:       اشتراك شهري
student_type:        ناطق بالعربية
currency:            SAR
unit_price:          25.00 ريال/جلسة  (Spec-010 Rule 3)
total_sessions:      n/a (شهري)
remaining_sessions:  n/a (شهري)
status:              نشطة
start_date:          2023-10-01
transferred_out_at:  2026-03-15
history:             [created 2023-10-01, transferred 2026-03-15 (from أحمد to منى, reason طلب ولي الأمر)]
```

This record appears on **الأستاذ أحمد's** `my-assigned-students.html` in the **«طلاب سابقون»** collapsible section (أحمد is the *previous* teacher, and that page is fixed to أحمد's view per FR-050 — so the section's defining rule "assignments whose previous-teacher was the viewing teacher" is satisfied), AND would appear on الأستاذة منى's `my-assigned-students.html` in the **«الطلاب الحاليون»** primary table (same identifier, two views — Q2 resolution).

### Anchor record `ASN-2024-1191` — multi-teacher persona demo (NEW)

```text
id:                  ASN-2024-1191
student_id:          STD-2023-0143  (عبد الرحمن مؤمن — SAME as ASN-2024-1184)
family_id:           FAM-2023-0211
course:              حصص جماعية إضافية للقرآن الكريم
level:               المستوى الثالث
current_teacher_id:  TCH-2023-0012  (الأستاذة منى)
assignment_type:     معلم رئيسي
session_type:        جماعية
payment_model:       اشتراك شهري
student_type:        ناطق بالعربية
currency:            SAR
unit_price:          25.00 ريال/جلسة  (Spec-010 Rule 3)
status:              نشطة
start_date:          2025-02-10
```

Demonstrates the multi-teacher rule: عبد الرحمن appears in 2 rows on the main table (ASN-2024-1184 with الأستاذ أحمد + ASN-2024-1191 with الأستاذة منى).

### History timeline events on ASN-2024-1184

```text
Event 1: إنشاء التعيين
  date:  2024-09-15
  actor: محمد بن عبدالعزيز الإدريسي (USR-2024-0001)
  body:  «أنشئ التعيين الأولي بين الطالب عبد الرحمن مؤمن والأستاذ أحمد بن عبد الله على دورة القرآن الكريم — المستوى الثالث.»

Event 2: ترقية المستوى
  date:  2025-02-01
  actor: الأستاذ أحمد بن عبد الله
  body:  «رُقّي الطالب من المستوى الثاني إلى المستوى الثالث بعد اجتياز اختبار الانتقال (88/100).»

Event 3: ملاحظة معلم
  date:  2026-05-08
  actor: الأستاذ أحمد بن عبد الله
  body:  «أداء ممتاز خلال شهر أبريل — نسبة الحضور 92% ونسبة تسليم الواجبات 88%. يُنصح بمتابعة نفس الوتيرة.»
```

The 4th event-type «نقل» is documented in the timeline legend (icon + chip color) for discoverability but is not exercised on this specific anchor record (the persona has never been transferred). The transfer demo lives on `ASN-2024-0902` instead.

---

## E2 — Assignment Type

**Enum**: 6 values (canonical order).

| # | Value | Used by | Note |
|---|-------|---------|------|
| 1 | «معلم رئيسي» | 14 rows on main table | The dominant value |
| 2 | «معلم مساعد» | 1 row on main table | Assistant teacher demo |
| 3 | «معلم بديل» | 0 rows on main table | Substitute teachers fill in ad-hoc; no standing record |
| 4 | «معلم تقييم» | 1 row on main table | Evaluation teacher (e.g., the placement-test teacher) demo |
| 5 | «معلم مؤقت» | 0 rows on main table | Same as substitute — no standing record |
| 6 | «مشرف أكاديمي» | 2 rows on main table + 12 additional supervision-only rows on `academic-supervisors.html` | The supervision-discriminator value |

The create-form's assignment-type select MUST list all 6 in this canonical order (FR-021). The «معلم بديل» / «معلم مؤقت» options are selectable in the form (the spec ships the visual affordance even though no demo row exercises them).

---

## E3 — Session Type

**Enum**: 2 values.

| Value | Pricing tier |
|-------|--------------|
| «خاصة» | Spec-010 Rule 6 (60.00 SAR ناطق) / Rule 7 (80.00 SAR غير ناطق) |
| «جماعية» | Spec-010 Rule 3 (25.00 SAR ناطق) / Rule 4 (35.00 SAR غير ناطق) |

On the 18-row main table: 10 خاصة + 8 جماعية.

---

## E4 — Payment Model

**Enum**: 4 values (canonical order on the create-form select).

| # | Value | Pricing formula | Number-of-sessions field |
|---|-------|------------------|--------------------------|
| 1 | «دورة كاملة» | flat course price (Rule 1 / Rule 2 / Rule 8) | disabled — implicit total_sessions = 24 |
| 2 | «جلسات بث محددة» | per-session price × N | editable |
| 3 | «اشتراك شهري» | per-session price × monthly-session-count | shown as caption "حسب جدول الشهر" |
| 4 | «حصة تجريبية» | 0.00 (Rule 5) | disabled — implicit total_sessions = 1 |

Mix on the 18-row main table: 9 دورة-كاملة + 4 جلسات-محددة + 3 شهري + 2 حصة-تجريبية.

---

## E5 — Student

**Identifier**: `STD-YYYY-NNNN`
**Anchor**: `STD-2023-0143` (عبد الرحمن مؤمن)

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | `STD-YYYY-NNNN` |
| `name_ar` | string | Arabic name |
| `age` | integer | static demo value |
| `city` | string | جدة / الرياض / etc. |
| `student_type` | enum («ناطق بالعربية» / «غير ناطق بالعربية») | the Constitution-VI Arabic-vs-Foreign label |
| `family_id` | string | FK to E6 |
| `nationality` | string \| null | optional; relevant only for «غير ناطق» students (e.g., "باكستاني") |

### Seeded students (only those referenced by ASN records in this spec)

| `id` | Name | Age | City | Type | Family | Nationality |
|------|------|----:|------|------|--------|-------------|
| STD-2023-0143 | عبد الرحمن مؤمن | 11 | جدة | ناطق بالعربية | FAM-2023-0211 | سعودي |
| STD-2023-0144 | سارة مؤمن | 9 | جدة | ناطق بالعربية | FAM-2023-0211 | سعودي |
| STD-2023-0067 | حسن المنصور | 10 | الرياض | ناطق بالعربية | FAM-2023-0067 | سعودي |
| **STD-2024-0034** | **عمر شودري** | **11** | **جدة** | **غير ناطق بالعربية** | **FAM-2024-0089** | **باكستاني** |

The 14 + other students referenced on the main table + 14 supervisor rows are seeded as needed by each page; no central student-roster page is in scope for this spec (the existing `pages/admin/students.html` covers that).

---

## E6 — Family

**Identifier**: `FAM-YYYY-NNNN`
**Anchor**: `FAM-2023-0211` (عائلة مؤمن, 450 ريال balance — Spec 008-locked)

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | `FAM-YYYY-NNNN` |
| `name` | string | عائلة + parent surname |
| `parent_id` | string | FK to a parent record (PRT-...) |
| `parent_name` | string | full name |
| `parent_phone` | string \| null | E.164 with Saudi masking convention |
| `parent_whatsapp` | string \| null | same as phone or distinct |
| `balance` | decimal | rolled credit, in SAR (or EGP for Egypt-tier families — not exercised in this spec) |
| `children_ids` | array of student IDs | derived |

### Seeded families (relevant to this spec)

| `id` | Name | Parent | Balance | Children |
|------|------|--------|--------:|----------|
| FAM-2023-0211 | عائلة مؤمن | محمود مؤمن (PRT-2023-0089) | 450.00 ريال | عبد الرحمن + سارة |
| FAM-2023-0067 | عائلة المنصور | ماجد المنصور (PRT-2023-0067) | 0.00 ريال | حسن (transferred-out demo) |
| **FAM-2024-0089** | **عائلة شودري** | **محمد إقبال شودري (PRT-2024-0089)** | **0.00 ريال** | **عمر (new seed)** |

The `FAM-2023-0211` balance of 450 ريال is the Spec 008-locked anchor figure and MUST NOT be contradicted (FR-063 + SC-005). The new family `FAM-2024-0089` is a deliberately distinct (empty-balance) seed to demonstrate the pricing-preview path when no family balance is available — the create-form pricing-preview line reads «رصيد العائلة المتاح: 0.00 ريال — حساب جديد».

---

## E7 — Teacher

**Identifier**: `TCH-YYYY-NNNN`

| `id` | Name | Currency | Specialty | Capacity |
|------|------|----------|-----------|---------:|
| TCH-2023-0011 | الأستاذ أحمد بن عبد الله | SAR | القرآن الكريم — جميع المستويات | 12/12 (at capacity — demo) |
| TCH-2023-0012 | الأستاذة منى سعد | SAR | القرآن الكريم + التجويد | 10 (with capacity) |
| TCH-2023-0013 | الأستاذ خالد العبدلي | SAR | القرآن الكريم — للناشئين والمبتدئين | 8 (with capacity) |
| TCH-2024-0089 | الأستاذة هبة | EGP | اللغة العربية للناطقين بغيرها | 6 (with capacity) |

The capacity numbers are seeded display values — the platform does NOT enforce capacity in the static prototype, and the at-capacity teacher remains selectable in the new-teacher dropdown on the transfer page (with a visual disabled-style + tooltip).

---

## E8 — Transfer Event

**Sub-record on Assignment** — each transfer event embeds inside the parent assignment's `history` array.

### Schema

| Field | Type | Notes |
|-------|------|-------|
| `event_type` | constant string «نقل» | distinguishes from other history event types |
| `date` | date | YYYY-MM-DD |
| `from_teacher_id` | string | FK to E7 (the teacher being transferred-from) |
| `to_teacher_id` | string | FK to E7 (the teacher being transferred-to) |
| `reason` | enum (6 values) | see Reason enum below |
| `scope` | enum (3 values) | see Scope enum below |
| `admin_actor_id` | string | who authorized the transfer |
| `admin_note` | string \| null | optional |
| `preserved_records_summary` | string (Arabic) | the projected post-action caption shown in the confirmation modal |

### Reason enum (canonical order on radio group, FR-042)

1. «طلب ولي الأمر»
2. «عدم توفر المعلم»
3. «تغيير المستوى»
4. «تحسين الأداء»
5. «تعارض في الجدول» ← pre-selected on the transfer page demo
6. «قرار إداري»

### Scope enum (canonical order on radio group, FR-043)

1. «الجلسات المستقبلية فقط» ← pre-selected (safe-default)
2. «الشهر الحالي بعد التاريخ المحدد»
3. «نقل فوري»

### Seeded transfer event (on ASN-2024-0902)

```text
event_type: نقل
date: 2026-03-15
from_teacher_id: TCH-2023-0011 (الأستاذ أحمد بن عبد الله)
to_teacher_id: TCH-2023-0012 (الأستاذة منى سعد)
reason: طلب ولي الأمر
scope: الجلسات المستقبلية فقط
admin_actor_id: USR-2024-0007 (سارة محمد عبدالله)
admin_note: «تم النقل بناءً على طلب الوالد لتوحيد المعلمات بين الأخوة في نفس المدرسة.»
preserved_records_summary: «احتُفظ بجميع تقارير وحضور وواجبات حسن المنصور في فترة الأستاذ أحمد بن عبد الله.»
```

This event:
- Appears as a timeline entry on `ASN-2024-0902`'s detail view.
- Causes حسن to appear in the «طلاب سابقون» section of **الأستاذ أحمد's** `my-assigned-students.html` (أحمد = previous teacher) AND in the «الطلاب الحاليون» of الأستاذة منى's.
- Is **not** echoed in the Spec 010 audit log (because the audit-log window in Spec 010 was 2026-05-04 → 2026-05-10, and this event happened on 2026-03-15 — outside the window). No spec-010 edit required.

---

## Page-specific seed inventories

### `pages/admin/student-teacher-assignments.html`

- **5 summary tiles**: see [FR-010] for canonical values.
- **18 table rows** seeded per the mix in `research.md` § Sample-data design decisions.
- **6 «غير ناطق» rows** include: عمر شودري × الأستاذ خالد × دورة كاملة (600.00) / 5 other foreign students with realistic non-Saudi names (Pakistani / Indian / Indonesian / Turkish / Sudanese — children of expat families resident in KSA) × varied teacher / session-type / payment-model combinations.
- **1 EGP row**: الأستاذة هبة × Egyptian student (e.g., يوسف عبد الله المصري, child of an Egypt-resident family) × Rule 8 = 1,500.00 EGP.
- **1 موقوف row**: a hypothetical Arabic-speaking student paused for medical reasons; actions cell shows «استئناف» instead of «نقل / إيقاف».
- **2 «على وشك الانتهاء» rows**: one with «2 من 10» remaining, one with «1 من 8» — both trigger the warning indicator.

### `pages/admin/create-student-teacher-assignment.html`

- **Pre-rendered seeded state**: عمر شودري × الأستاذ خالد × دورة القرآن الكريم — المستوى الثالث × دورة كاملة × «غير ناطق» / 600.00 ريال subtotal / 480.00 ريال teacher cut (80% Spec-009 bucket) / 90.00 ريال VAT / 0.00 ريال family balance.
- **13 form controls** seeded with the values above (FR-020).
- **1 sanctioned modal** at the page bottom: `id="modal-confirm-save-assignment"` with the projected post-action caption «سيتم تعيين عمر شودري للأستاذ خالد العبدلي على دورة القرآن الكريم — المستوى الثالث ابتداءً من 2026-05-15» + «هذا عرض مرئي فقط» secondary caption.

### `pages/admin/student-teacher-assignment-details.html`

- **Anchor**: `ASN-2024-1184`.
- **10 detail cards** per FR-031.
- **Related-invoices list**: 1 row citing `INV-2026-0184` (verbatim) + 2 historical rows for prior months (e.g., `INV-2026-0152` from March 2026, `INV-2026-0117` from February 2026 — both seeded as 437.00 ريال each — matching the persona's full-course rhythm).
- **Teacher-earning-preview tile**: cites `STL-2026-04-TCH-0042` verbatim with the projected April earnings contribution from this assignment («بانتظار اعتماد التسوية»).
- **3 timeline events** per E1 § History above + 1 documented-but-not-exercised «نقل» event-type in the legend.
- **3 action buttons** at footer: «نقل المعلم» (link) / «إيقاف التعيين» (`data-modal-open="confirm-stop-assignment"`) / «تعديل التعيين» (link).
- **1 sanctioned modal** for stop-assignment with caption «سيتم إيقاف التعيين ابتداءً من 2026-05-12 — تبقى السجلات السابقة محفوظة لدى الأستاذ أحمد بن عبد الله».

### `pages/admin/transfer-student-teacher.html`

- **Pre-populated for**: `ASN-2024-1185` (سارة مؤمن × الأستاذة منى → الأستاذ خالد).
- **Current-assignment summary card**: cites all the anchor values from ASN-2024-1185 above.
- **Form pre-fills**: new-teacher = الأستاذ خالد العبدلي / transfer-date = 2026-05-15 / reason = «تعارض في الجدول» / scope = «الجلسات المستقبلية فقط» / admin-notes = «بناءً على اتصال الوالد محمود مؤمن لتوحيد جدول الأخت مع أخيها.».
- **Warning-amber callout**: body per FR-044 verbatim.
- **1 sanctioned modal**: `id="modal-confirm-transfer"` with body caption «سيتم نقل سارة مؤمن من الأستاذة منى سعد إلى الأستاذ خالد العبدلي ابتداءً من 2026-05-15 — يبقى ربط جميع السجلات السابقة بالأستاذة منى سعد دون تغيير» + «هذا عرض مرئي فقط» secondary caption.

### `pages/teacher/my-assigned-students.html`

- **View-as-الأستاذ-أحمد**.
- **6 summary cards** per FR-051 (12 / 9 / 3 / 7 / 5 / 2).
- **Primary table — 12 rows** (الأستاذ أحمد's current roster):
  - Row 1: عبد الرحمن مؤمن × ASN-2024-1184 × «خاصة» × الجلسة القادمة 2026-05-12 17:00 × homework ✓ مُسلَّم × attendance **92%** (Spec-006-locked) × note «أداء ممتاز في جلسة 09 مايو»
  - 8 other ناطق rows × 3 غير-ناطق rows (matches 9 + 3 = 12).
  - 2 of the 12 carry the «بحاجة متابعة» danger-amber badge — seeded on 2 students who are not the create-form's عمر (عمر is الأستاذ خالد's create-form student, not أحمد's roster student): «نواف الزهراني» (attendance 78%) + «إبراهيم الشمري» (homework status «متأخر بثلاث واجبات»).
- **«طلاب سابقون» collapsible section — 1 row: حسن المنصور (`ASN-2024-0902`)**. الأستاذ أحمد taught حسن Qur'an L1 group sessions in 2023-2024, then transferred him to الأستاذة منى on 2026-03-15 (reason «طلب ولي الأمر»). Because أحمد is the *previous* teacher of ASN-2024-0902 and `my-assigned-students.html` is fixed to أحمد's view (FR-050), the row legitimately belongs in this section. Columns: الطالب / الدورة / تاريخ النقل / المعلم الجديد (الأستاذة منى سعد) / CTA «عرض السجل التاريخي» → `student-teacher-assignment-details.html` (the one canonical detail page, hard-coded to ASN-2024-1184 — the established static-prototype convention from Specs 008-010). An empty-state caption «لا يوجد طلاب سابقون» is authored but visually hidden since the 1 row is seeded. The 12 / 1 split (12 current + 1 past) holds.

### `pages/teacher/assigned-student-details.html`

- **Anchor**: `ASN-2024-1184` (same as admin-details — two-views-one-entity).
- **`<!-- SHARED_ASN_HEADER -->` block**: byte-identical to admin-details (SC-004).
- **8 cards** per FR-062.
- **Attendance-history card**: 8-week sparkline (CSS bars), text label below «92% — أداء ممتاز» (Spec-006-locked figure preserved).
- **Homework-history card**: headline «88%» (Spec-006-locked) + caption «معدل التسليم التراكمي خلال الفصل الدراسي 2025-2026 — 22 من 25 واجباً» + a sub-line «آخر 6 واجبات: 5 مُسلَّمة · 1 في الانتظار». (Do NOT label the 5-of-6 recent count "88%" — 5/6 ≈ 83%, not 88%; the 88% headline references the term-level 22/25 figure. The 6-item recent list is the most-recent window, not the percentage source.)
- **Progress-summary tile**: «ممتاز» (Spec-006-locked).
- **Recommended-next-action tile**: «مراجعة الواجب الأخير قبل جلسة 12 مايو».
- **4 CTAs**: routing per FR-065.

### `pages/admin/academic-supervisors.html`

- **4 summary tiles**: 4 / 14 / 5 / 3.
- **4-card supervisor-profiles strip**: الأستاذة منى (5 طلاب — جيدة) / الأستاذ أحمد (4 طلاب — جيدة) / الأستاذ خالد (3 طلاب — تحتاج متابعة) / الأستاذة هبة (2 طلاب — ممتازة). Sum = 14.
- **14 supervision-table rows** including:
  - عبد الرحمن مؤمن under الأستاذ أحمد (آخر متابعة 2026-05-08 / المتابعة القادمة 2026-05-15 / جيدة)
  - سارة مؤمن under الأستاذة منى (آخر 2026-05-09 / القادمة 2026-05-16 / ممتازة)
  - عمر شودري under الأستاذ خالد (آخر 2026-05-05 / القادمة 2026-05-12 / تحتاج اهتماماً عاجلاً)
  - 11 other supervision rows with realistic Arabic names, varied last-follow-up dates (within 2026-05-01 → 2026-05-10), varied next-follow-up dates (within 2026-05-12 → 2026-05-25), 3 status chip styles distributed: ≥ 2 ممتازة (success-green) + ≥ 8 جيدة (brand-primary) + ≥ 3 تحتاج اهتماماً عاجلاً (danger-amber) — satisfying FR-074.

---

## Validation checklist (cross-page consistency)

| Check | Value | How to verify |
|-------|-------|---------------|
| Anchor `ASN-2024-1184` appears on ≥ 4 of the 7 pages | ✓ | `grep -l ASN-2024-1184 pages/admin/student-teacher-assignments.html pages/admin/student-teacher-assignment-details.html pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html pages/admin/academic-supervisors.html` returns ≥ 4 files |
| `INV-2026-0184` cited verbatim on admin-details | ✓ | `grep INV-2026-0184 pages/admin/student-teacher-assignment-details.html` returns ≥ 1 hit |
| `STL-2026-04-TCH-0042` cited verbatim on admin-details | ✓ | `grep STL-2026-04-TCH-0042 pages/admin/student-teacher-assignment-details.html` returns ≥ 1 hit |
| `FAM-2023-0211` cited on admin-details + create-form | ✓ | `grep FAM-2023-0211 pages/admin/student-teacher-assignment-details.html pages/admin/create-student-teacher-assignment.html` returns ≥ 2 hits |
| Persona attendance «92%» preserved on teacher-view | ✓ | `grep '92%' pages/teacher/assigned-student-details.html pages/teacher/my-assigned-students.html` returns ≥ 2 hits |
| Persona homework «88%» preserved on teacher-view | ✓ | `grep '88%' pages/teacher/assigned-student-details.html` returns ≥ 1 hit |
| Persona grade «ممتاز» preserved on teacher-view | ✓ | `grep ممتاز pages/teacher/assigned-student-details.html` returns ≥ 1 hit |
| SHARED_ASN_HEADER block is byte-identical between admin and teacher detail pages | ✓ | `diff` the block between the SHARED_ASN_HEADER markers (SC-004) |
| Page-pair-level dual-lens: same ASN identifier on assignments-list + academic-supervisors | ✓ | `grep ASN-2024 pages/admin/student-teacher-assignments.html pages/admin/academic-supervisors.html` — pick a supervisor `ASN-...` and verify it appears on both |
| Zero `href="#"` across the 7 new pages | ✓ | `grep -nE 'href="#"' <7 files>` returns zero (SC-002) |
| Zero new JS lines | ✓ | `wc -l assets/js/main.js` returns 68 (SC-012) |
| 4 sanctioned modals total | ✓ | `grep -c 'data-modal-open="confirm-' <7 files>` sums to ≥ 4 |

This data model is the single source-of-truth for every page-level identifier, name, figure, and seeded value referenced by the contracts in `contracts/*.md`. If a contract introduces a value not present here, the data model MUST be updated first.
