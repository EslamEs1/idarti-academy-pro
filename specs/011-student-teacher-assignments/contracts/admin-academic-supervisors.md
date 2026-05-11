# Contract: `pages/admin/academic-supervisors.html`

**Role**: Admin | **Active sidebar entry**: «المشرفون الأكاديميون» (new in Spec 011) | **Anchor entity**: 14 Assignment records filtered to `assignment_type = "مشرف أكاديمي"` per Q1 resolution (data-model.md E1 + E2#6)

## Page composition (top → bottom under RTL)

1. **Header** (reused).
2. **Page header bar** — title «المشرفون الأكاديميون» + subtitle «المتابعة الأكاديمية للطلاب — يتابع المشرف التقدم دون أن يكون بالضرورة المعلم الأساسي».
3. **4 summary tiles** in a 4-column desktop grid:
   - مشرفون أكاديميون: **4**
   - طلاب تحت إشراف: **14**
   - تقارير ولي أمر قيد الإصدار: **5**
   - طلاب يحتاجون انتباهاً عاجلاً: **3**
4. **4-card supervisor-profiles strip** in a 4-column horizontal grid (responsive — wraps on tablet, stacks on mobile):

   | # | Supervisor | Student count | Status chip |
   |---|------------|--------------:|-------------|
   | 1 | الأستاذة منى سعد | 5 طلاب | «حالة جيدة» (brand-primary) |
   | 2 | الأستاذ أحمد بن عبد الله | 4 طلاب | «حالة جيدة» (brand-primary) |
   | 3 | الأستاذ خالد العبدلي | 3 طلاب | «تحتاج متابعة» (warning-amber) |
   | 4 | الأستاذة هبة | 2 طلاب | «حالة ممتازة» (success-green) |

   Sum = 5 + 4 + 3 + 2 = **14** (matches summary tile #2).

   Each card: avatar (CSS circle, `aspect-square`) + name + student-count chip + status chip + small «عرض الطلاب» visual link (anchor to in-page filter section — `href="#supervisor-{n}"`, in-page anchor only).

5. **14-row supervision-assignment table** with 6 columns in canonical order:

   | # | المشرف | الطالب | الدورة | آخر متابعة | المتابعة القادمة | الحالة |
   |---|--------|--------|--------|-----------|-------------------|--------|
   | 1 | الأستاذ أحمد بن عبد الله | **عبد الرحمن مؤمن** | دورة القرآن الكريم — المستوى الثالث | 2026-05-08 | 2026-05-15 | «جيدة» (brand-primary) |
   | 2 | الأستاذة منى سعد | **سارة مؤمن** | دورة القرآن الكريم — المستوى الثاني | 2026-05-09 | 2026-05-16 | «ممتازة» (success-green) |
   | 3 | الأستاذ خالد العبدلي | **عمر شودري** | دورة القرآن الكريم — المستوى الثالث (غير ناطق) | 2026-05-05 | 2026-05-12 | «تحتاج اهتماماً عاجلاً» (danger-amber) |
   | 4 | الأستاذة منى سعد | فاطمة الصبيحي | دورة التجويد — المستوى الأول | 2026-05-07 | 2026-05-14 | «ممتازة» |
   | 5 | الأستاذ أحمد | عمار العمري | دورة القرآن الكريم — المستوى الرابع | 2026-05-06 | 2026-05-13 | «جيدة» |
   | 6 | الأستاذة منى | ريم العتيبي | دورة التلاوة — المستوى الثاني | 2026-05-09 | 2026-05-16 | «جيدة» |
   | 7 | الأستاذ خالد | رنا اللهيب | دورة القرآن الكريم — المستوى الأول | 2026-05-04 | 2026-05-11 | «تحتاج اهتماماً عاجلاً» |
   | 8 | الأستاذة هبة | يوسف عبد الله المصري | لغة عربية — للناطقين بغيرها | 2026-05-08 | 2026-05-15 | «جيدة» |
   | 9 | الأستاذة منى | فهد القحطاني | دورة القرآن الكريم — المستوى الثاني | 2026-05-10 | 2026-05-17 | «جيدة» |
   | 10 | الأستاذ أحمد | محمد الحارثي | دورة القرآن الكريم — المستوى الثالث | 2026-05-09 | 2026-05-16 | «جيدة» |
   | 11 | الأستاذة منى | لمى الزهراني | دورة التجويد — المستوى الثاني | 2026-05-07 | 2026-05-14 | «جيدة» |
   | 12 | الأستاذ خالد | كريم سيف الدين | دورة القرآن الكريم — المستوى الأول (غير ناطق) | 2026-05-05 | 2026-05-12 | «تحتاج اهتماماً عاجلاً» |
   | 13 | الأستاذة هبة | داليا الفهد | لغة عربية — للناطقين بغيرها | 2026-05-09 | 2026-05-16 | «ممتازة» |
   | 14 | الأستاذ أحمد | سعد المطيري | دورة القرآن الكريم — المستوى الثاني | 2026-05-08 | 2026-05-15 | «جيدة» |

   **Status chip distribution**: 3 ممتازة (success-green) + 8 جيدة (brand-primary) + 3 تحتاج اهتماماً عاجلاً (danger-amber) — satisfying FR-074's "3 distinct chip styles".

   **Cross-spec persona / Pakistani-family rows**: 3 of 14 — rows 1, 2, 3 (عبد الرحمن / سارة / عمر) — satisfying FR-073.

   Each row's actions cell (final column) contains 2 icon-buttons: «عرض التعيين» → `pages/admin/student-teacher-assignment-details.html` (for row 1 it's the anchor ASN-2024-1184; for other rows it routes to the same shared admin-details page since the file is hard-coded to one ASN — the spec accepts this for the static prototype) + «إرسال تقرير لولي الأمر» (visual-only, `<button type="button">` with no real handler).

6. **Footer caption** (non-link text per Constitution Quality Gate 4): «الإشراف الأكاديمي هو متابعة لتقدم الطالب، وقد لا يكون المشرف هو المعلم الأساسي. يُمكن أن يُشرف معلم واحد على عدة طلاب من معلمين مختلفين.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#7) | Page exists at `pages/admin/academic-supervisors.html` |
| FR-002 | Admin sidebar gains «المشرفون الأكاديميون» entry — this page is the target |
| FR-070 | 4 summary tiles |
| FR-071 | 4-card supervisor-profiles strip with student-counts summing to 14 |
| FR-072 | 14-row × 6-column supervision-assignment table in canonical order |
| FR-073 | ≥ 3 rows cite persona-family / عمر شودري (rows 1, 2, 3) |
| FR-074 | 3 distinct supervision-status chip styles (success-green / brand-primary / danger-amber) with text labels per Constitution IV |
| FR-075 | Filtered view of the same Assignment entity — same ASN identifiers as the main assignments page (Q1 resolution) |

## Constraints

- The supervision page is a **filtered view of Assignment records** where `assignment_type = "مشرف أكاديمي"` — NOT a separate entity (Q1).
- The 14 rows have a mix of teachers (الأستاذة منى supervises 5 / الأستاذ أحمد 4 / الأستاذ خالد 3 / الأستاذة هبة 2 = 14) — counts match the profile-strip cards.
- The «حالة» chip uses 3 distinct text labels + 3 distinct colors + 3 distinct icons (✓ for ممتازة / ◯ for جيدة / ⚠ for تحتاج اهتماماً عاجلاً) — Constitution IV.
- The «عرض التعيين» action routes to the assignment-details page; for the static prototype, all 14 rows route to the same hard-coded admin-details file — this is acceptable for SC-005 cross-page anchor count (the goal is ASN-2024-1184 visibility, not per-row distinct files).
- The «إرسال تقرير لولي الأمر» button is `<button type="button">` with no real handler.
- The in-page anchor links (`href="#supervisor-1"` ... `href="#supervisor-4"`) on the profile-strip cards are valid in-page navigation — Constitution Quality Gate 4 allows in-page anchors (they're not placeholder `#` href).
- No `href="#"` placeholders.
- Latin digits inside Arabic copy.
- Color is never the sole indicator.
- The 14 rows include the cross-spec persona family (2 rows) + the Pakistani-family seed (1 row) + 11 other supervised students with realistic Saudi-and-Arab-family names.
