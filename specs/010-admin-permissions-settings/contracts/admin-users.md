# Contract: `pages/admin/users.html`

**Role**: Admin | **Active sidebar entry**: «الأدوار والصلاحيات» (parent — sub-flow pattern) | **Anchor entity**: 14 users per data-model.md E3

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «الأدوار والصلاحيات» → «المستخدمون»
3. **Page header bar** — title «المستخدمون» + subtitle «جميع حسابات المنصة وحالات الوصول» + page-end CTA «+ مستخدم جديد» (primary button, visual-only `<button type="button">` since user creation is out of scope per spec assumption — caption «إنشاء حساب جديد سيُتاح في إصدار قادم» appears as a tooltip via `title=` attribute)
4. **Four summary tiles** in a 4-column desktop grid:
   - إجمالي المستخدمين: **14** (info-tone)
   - نشط: **13** (success-tone)
   - موقوف: **1** (danger-tone)
   - بريد إلكتروني غير موثّق: **2** (warning-tone)
5. **Filter bar** (FR-019) — horizontal flex with three filter groups:
   - **Role chips** (8 chips): الكل (active by default) / Admin / Finance Manager / Teacher / Parent / Student / Support / Operations — visual-only chip selection
   - **Status chips** (3 chips): الكل / نشط / موقوف — visual-only
   - **Search input**: `<input type="search" placeholder="ابحث بالاسم أو البريد أو الهاتف...">` + caption below «اكتب لتصفية النتائج» — no live JS handler (Constitution V); the static demo state shows all 14 rows
6. **Users table** (FR-020) — 14 rows × 6 columns + per-row action column (= 7 columns total). Wrapped in `<div class="overflow-x-auto"><table class="min-w-[800px]">` for mobile.
   - **Column headers** (under RTL): الاسم / البريد أو الهاتف / الدور / الحالة / آخر تسجيل دخول / الإجراء
   - **14 row data** (per data-model.md E3):

     | # | Name | Email/Phone | Role | Status | Last login |
     |---|------|-------------|------|--------|------------|
     | 1 | محمد بن عبدالعزيز الإدريسي | mohammed.a@idarti-academy.sa | المدير العام | نشط ✓ موثّق | 2026-05-10 08:00 |
     | 2 | عبدالرحمن سعد الفهد | abdulrahman.f@idarti-academy.sa | المدير العام | نشط ✓ موثّق | 2026-05-09 17:30 |
     | 3 | سارة محمد عبدالله **(anchor)** | sara.m@idarti-academy.sa | مديرة المالية | نشط ✓ موثّق | 2026-05-10 09:12 |
     | 4 | منى عبدالله الزهراني | mona.z@idarti-academy.sa | مديرة المالية | نشط ✓ موثّق | 2026-05-09 16:45 |
     | 5 | بدر سعود الخالد | bader.k@idarti-academy.sa | مديرة المالية | نشط ⚠ غير موثّق | 2026-05-08 14:20 |
     | 6 | أحمد بن خالد المالكي | ahmed.k@idarti-academy.sa | موظف التشغيل | نشط ✓ موثّق | 2026-05-09 14:12 |
     | 7 | الأستاذ أحمد بن عبد الله الزهراني | a.zahrani@idarti-academy.sa / +966 55 *** 0042 | المعلّم | نشط ✓ موثّق | 2026-05-10 07:30 |
     | 8 | الأستاذة منى سعد | m.saad@idarti-academy.sa | المعلّم | نشط ✓ موثّق | 2026-05-09 19:00 |
     | 9 | الأستاذة فاطمة الزهراني | f.zahrani@idarti-academy.sa | المعلّم | نشط ✓ موثّق | 2026-05-09 11:00 |
     | 10 | الأستاذ يوسف القحطاني | y.qahtani@idarti-academy.sa | المعلّم | نشط ⚠ غير موثّق | 2026-05-08 22:15 |
     | 11 | الأستاذة هبة محمد عبد الفتاح **(EGP/Cairo tag)** | h.abdelfattah@idarti-academy.eg | المعلّم | نشط ✓ موثّق | 2026-05-09 13:30 |
     | 12 | ولي أمر عبد الرحمن مؤمن | parent.momen@gmail.com / +966 55 *** 4321 | ولي الأمر | نشط ✓ موثّق | 2026-05-09 21:00 |
     | 13 | عبد الرحمن مؤمن (الطالب — الشخصية الأساسية) | (مرتبط ببريد ولي الأمر) | الطالب | نشط ✓ موثّق | 2026-05-10 08:45 |
     | 14 | نورة سعد الدوسري | nora.d@idarti-academy.sa | موظفة الدعم | **موقوف** | 2026-05-04 17:00 |

   - **EGP-context tag** on row 11: small chip «EGP / القاهرة» beside the role badge (FR-022).
   - **Per-row action column** (FR-021): three icon-buttons in a horizontal flex:
     - «عرض» — eye icon — `<a href="user-details.html">` (links to user-details for SARA.M only on row 3; other rows link to `user-details.html` which is the same page — implementation note: in this static prototype, user-details.html is the SARA.M-anchor page; clicking «عرض» on a non-SARA row routes to the same page since there's only one user-details page in this spec)
     - «تعديل» — pencil icon — `<button type="button">` visual-only
     - «تعطيل» — power-off icon — `<button type="button" data-modal-open="modal-disable-user-N">` (uses existing modal pattern; the modal element is rendered inline; visual-only confirmation pattern)
7. **Footer caption** (non-link text per FR-067): «المستخدمون مسحوبون من سجل الحسابات الموحّد. لإضافة موظف جديد، استخدم نموذج التوظيف في وحدة الموارد البشرية.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#4) | Page exists at `pages/admin/users.html` |
| FR-018 | 4 summary tiles |
| FR-019 | Role chip filter (8 chips) + status chip filter (3 chips) + search input + caption |
| FR-020 | 14-row users table × 6 columns (+ action column = 7 total) |
| FR-021 | 3 icon-buttons per row (عرض / تعديل / تعطيل) |
| FR-022 | EGP-context tag on الأستاذة هبة row |
| FR-067 | Zero `href="#"` |
| FR-068 | تعطيل button uses existing `data-modal-open` pattern |

## Constraints

- 14 rows in the table — exact count.
- One user per role appears (Admin row 1+2, Finance row 3+4+5, Teacher row 7+8+9+10+11, Parent row 12, Student row 13, Support row 14, Operations row 6) — covers all 7 active roles.
- Status distribution: 13 نشط + 1 موقوف (NORA.S row 14).
- Verification: 12 موثّق + 2 غير موثّق (rows 5 + 10).
- The «عرض» link routes to `user-details.html` which is the single static SARA.M page — this is a known prototype limitation; documented in the spec assumptions.
- The «تعطيل» buttons trigger existing modal handler — modal markup MAY be shared (one generic «modal-disable-user» rendered once, or 14 individual modals with hard-coded user names; implementer choice. The simpler one-modal approach is recommended).
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «الأدوار والصلاحيات» (parent — sub-flow pattern).
