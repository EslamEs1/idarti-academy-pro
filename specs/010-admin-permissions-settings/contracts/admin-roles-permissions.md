# Contract: `pages/admin/roles-permissions.html`

**Role**: Admin | **Active sidebar entry**: «الأدوار والصلاحيات» | **Anchor entity**: 8 role cards (7 active + 1 archived per data-model.md E1)

## Page composition (top → bottom under RTL)

1. **Header** (reused) — search / bell / Tajawal greeting "أهلاً بك، أ. محمد"
2. **Page header bar** — title «الأدوار والصلاحيات» + subtitle «إدارة المستويات الإدارية وصلاحيات الوصول لجميع وحدات المنصة» + page-end CTA «+ إنشاء دور جديد» (primary button) → `pages/admin/create-role.html`
3. **Four summary tiles** in a 4-column desktop grid:
   - الأدوار الفعّالة: **7** (success-tone)
   - الأدوار الموقوفة: **1** (neutral-tone)
   - إجمالي المستخدمين: **14** (info-tone)
   - الصلاحيات المعرّفة: **19 وحدة × 7 إجراء** (warm-tone, accent)
4. **Eight role cards** in a responsive 2-column desktop grid (4 rows). Each card:
   - **Card header**: role name (Arabic) + English subtitle in muted text + role-type chip (مدير / تشغيلي / دعم) + status badge (نشطة success-green check / موقوفة neutral-gray pause)
   - **Card body**: users-count tile («المستخدمون: N») + permissions-count summary («18 من 19 وحدة — مسموح كامل» or «6 من 19 وحدة — مالي فقط»...) + last-modified caption («آخر تعديل: 2026-04-22 بواسطة محمد بن عبدالعزيز»)
   - **Card footer**: primary CTA «عرض/تعديل» → `role-details.html` (or «إعادة تفعيل» neutral-tone replacement on the موقوفة 8th card)

   Card order (per data-model.md E1):
   1. **المدير العام** (Super Admin) — 2 users — «18 من 19 وحدة — مسموح كامل (سجل المراجعة قراءة فقط)» — نشطة
   2. **مديرة المالية** (Finance Manager) — 3 users — «6 من 19 وحدة — مالي فقط» — نشطة *(anchor card, slightly highlighted background)*
   3. **المعلّم** (Teacher) — 5 users — «8 من 19 وحدة — تشغيل مع الطلاب» — نشطة
   4. **ولي الأمر** (Parent) — 1 user — «5 من 19 وحدة — رؤية الأبناء» — نشطة
   5. **الطالب** (Student) — 1 user — «6 من 19 وحدة — تعلم وتفاعل» — نشطة
   6. **موظف الدعم** (Support) — 1 user — «5 من 19 وحدة — دعم العملاء» — نشطة
   7. **موظف التشغيل** (Operations) — 1 user — «9 من 19 وحدة — تشغيل أكاديمي» — نشطة
   8. **مساعد إداري** (Admin Assistant — archived) — 0 users — «دور موقوف منذ 2026-02-01» — موقوفة + «إعادة تفعيل» CTA
5. **Footer caption** (non-link text per FR-067): «الأدوار تعكس سياسة الصلاحيات الفعلية للأكاديمية. لتعديل سياسة عامة، يُرجى التواصل مع المدير العام.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#1) | Page exists at `pages/admin/roles-permissions.html` |
| FR-006 | 4 summary tiles |
| FR-007 | 7 active role cards + 1 archived card (8 total) |
| FR-008 | Per-card: name (Ar+En) + users-count + perm-count summary + status badge + CTA |
| FR-009 | Page-header «+ إنشاء دور جديد» CTA → create-role.html |
| FR-066 | Status badges «نشطة / موقوفة» from constitutional vocabulary |

## Constraints

- No `href="#"` (SC-002) — every CTA resolves to a real Spec-010 file.
- Latin digits inside Arabic copy (FR-063).
- Color-AND-label-AND-icon for status badges (Constitution IV).
- The 8th archived card carries «إعادة تفعيل» CTA — visual-only `<button type="button">` per Constitution V (no JS handler, no real action).
- User-count sum across the 8 cards = **14** ✓ (matches summary tile + users.html row count).
