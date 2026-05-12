# Contract: `pages/teacher/my-assigned-students.html`

**Role**: Teacher (view-as-الأستاذ-أحمد) | **Active sidebar entry**: «طلابي» (new in Spec 011) | **Anchor entity**: 12 + 1 Assignment records per data-model.md E1 § my-assigned-students seed inventory

## Page composition (top → bottom under RTL)

1. **Header** (reused) — Tajawal greeting "أهلاً بك، أستاذ أحمد".
2. **Page header bar** — title «طلابي — الأستاذ أحمد بن عبد الله» + subtitle «الطلاب المعيّنون لي حالياً + المرجعية التاريخية للطلاب السابقين».
3. **6 summary cards** in a 6-column desktop grid (tablet 3-col, mobile 2-col):
   - إجمالي الطلاب: **12** (brand-primary)
   - ناطقون بالعربية: **9** (brand-primary)
   - غير ناطقين: **3** (accent-orange)
   - جلسات خاصة: **7** (info-tone)
   - جلسات جماعية: **5** (neutral-tone)
   - بحاجة متابعة: **2** (danger-amber)

   **Invariants**: 12 = 9 + 3 (student-type) AND 12 = 7 + 5 (session-type).

4. **Primary section** — «الطلاب الحاليون» (h2 with brand-primary underline):

   **12-row × 9-column table**:

   | # | Column |
   |---|--------|
   | 1 | الطالب (name + STD- tooltip) |
   | 2 | الدورة |
   | 3 | المستوى |
   | 4 | نوع الطالب (chip) |
   | 5 | الجلسة القادمة (date + time) |
   | 6 | حالة الواجبات (✓ مُسلَّم / متأخر / في الانتظار) |
   | 7 | الحضور (%) |
   | 8 | آخر ملاحظة (short text) |
   | 9 | CTA «عرض الطالب» (→ `pages/teacher/assigned-student-details.html`) |

   **Anchor row (row 1)**: عبد الرحمن مؤمن / دورة القرآن الكريم / المستوى الثالث / ناطق / 2026-05-12 — 17:00 / ✓ مُسلَّم / **92%** (Spec-006-locked) / «أداء ممتاز في جلسة 09 مايو» / «عرض الطالب».

   **«بحاجة متابعة» rows (2 of 12)**:
   - Row N: نواف الزهراني (STD-2023-0091, age 12, الرياض, ناطق) / دورة القرآن الكريم / المستوى الثاني / ناطق / 2026-05-13 — 16:00 / ✗ متأخر / **78%** / «انخفاض في الحضور خلال أبريل» — danger-amber «بحاجة متابعة» badge attached to row indicator.
   - Row M: إبراهيم الشمري (STD-2024-0012, age 9, الدمام, ناطق) / دورة التجويد / المستوى الأول / ناطق / 2026-05-14 — 18:00 / في الانتظار / 85% / «متأخر بثلاث واجبات» — danger-amber badge.

5. **Secondary section** — `<details>` collapsible (defaulted closed):
   - `<summary>`: «طلاب سابقون — للمرجعية التاريخية» (caption shows count «1 طالب» in parentheses)
   - Context: this row appears here because **الأستاذ أحمد is the previous teacher of `ASN-2024-0902`** — أحمد taught حسن المنصور Qur'an L1 group sessions in 2023-2024, then transferred him to الأستاذة منى on 2026-03-15 (reason «طلب ولي الأمر»). The «طلاب سابقون» section's defining rule is "assignments whose `transferred_out_at` is non-null and whose previous-teacher is the viewing teacher", and this page is fixed to أحمد's view (FR-050), so the row is correctly placed.
   - On expand, reveals a **1-row × 5-column table**:

     | # | Column | Value |
     |---|--------|-------|
     | 1 | الطالب | حسن المنصور (STD-2023-0067, age 10, الرياض, ناطق) |
     | 2 | الدورة | دورة القرآن الكريم — المستوى الأول (جلسات جماعية) |
     | 3 | تاريخ النقل | 2026-03-15 |
     | 4 | المعلم الجديد | الأستاذة منى سعد |
     | 5 | CTA «عرض السجل التاريخي» | → `pages/admin/student-teacher-assignment-details.html?id=ASN-2024-0902` (link target: the admin-details page in read-only-history mode; if the file is hard-coded to ASN-2024-1184, the link is best-effort and the destination page renders the «نقل» event in its timeline as the demo) |

   - Empty-state caption (rendered if the section is exercised with 0 rows): «لا يوجد طلاب سابقون» (not shown in the demo since 1 row is seeded).

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#5) | Page exists at `pages/teacher/my-assigned-students.html` |
| FR-003 | Teacher sidebar gains «طلابي» entry — this page is the target |
| FR-050 | Page heading cites الأستاذ أحمد بن عبد الله |
| FR-051 | 6 summary cards with seeded values + 12 = 9+3 and 12 = 7+5 invariants |
| FR-052 | 2 stacked sections (current + collapsible past) |
| FR-053 | Primary table: 9 columns in canonical order |
| FR-054 | «طلاب سابقون» section: 1 row for حسن المنصور (ASN-2024-0902) |
| FR-055 | ≥ 2 «بحاجة متابعة» badges |
| FR-056 | Persona row carries «92%» verbatim |

## Constraints

- `<details>` is native HTML — zero JS (Constitution V).
- The secondary section's caption shows the row-count: «طلاب سابقون — للمرجعية التاريخية (1 طالب)».
- Color is never the sole indicator: «بحاجة متابعة» chip = danger-amber + alert icon + text label.
- The 92% verbatim citation is locked from Spec 006 — do NOT round / re-compute / re-phrase.
- The «عرض الطالب» CTA on the persona row routes to `pages/teacher/assigned-student-details.html` — which is hard-coded to ASN-2024-1184 — the same anchor as this row.
- The «عرض السجل التاريخي» CTA on حسن المنصور's row routes to the admin-details page (a Spec-011 file). Since the admin-details file is hard-coded to ASN-2024-1184, the link's target page does not render حسن's exact data — this is acceptable for the static prototype (FR-061 + SC-004 reserve byte-identical fidelity for the ASN-2024-1184 SHARED_ASN_HEADER block, not for cross-record navigation).
- Latin digits inside Arabic copy.
- No `href="#"`.
