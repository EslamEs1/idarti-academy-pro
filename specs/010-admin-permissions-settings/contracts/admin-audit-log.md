# Contract: `pages/admin/audit-log.html`

**Role**: Admin | **Active sidebar entry**: «سجل المراجعة» (new sidebar entry — see plan.md FR-005) | **Anchor entity**: 24 audit events per data-model.md E7

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Page header bar** — title «سجل المراجعة» + subtitle «جميع الإجراءات الإدارية والنظامية على المنصة» + page-end controls (FR-060):
   - **«تصدير CSV» button** (Q2 D6) — secondary outline button with download icon (inline SVG):
     ```html
     <button type="button" class="..." title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي">
       <svg>...</svg> تصدير CSV
     </button>
     ```
     The button has NO `download` attribute and NO `href` (it's a `<button>`, not `<a>`). The `title=` tooltip is the SC-011 grep target.
   - **Date-range picker control** beside the export button (visual-only) defaulted to «آخر 7 أيام» (2026-05-04 → 2026-05-10)
3. **Four summary tiles** (FR-053) in a 4-column desktop grid:
   - الإجراءات: **24** (info-tone)
   - الوحدات المتأثّرة: **11** (warm-tone — note: implementation maps the 14 distinct module values to 11 supergroups per research.md D10)
   - النطاق الزمني: **7 أيام** (success-tone)
   - المستخدمون الفعّالون: **6** (accent-tone)
4. **Filter bar** (FR-054) — horizontal flex with 4 filter dropdowns + a result-count chip:
   - **الوحدة** dropdown — 11 options (المالية والمدفوعات / مالية المعلم / رصيد العائلة / المصادقة / إعدادات المنصة / إعدادات الضريبة / المستخدمون / الأدوار والصلاحيات / الطلاب / التقارير / المنبر الاجتماعي + سجل المراجعة as the implicit 12th — visible as «الكل» implicit)
   - **المستخدم** dropdown — 7 options (الكل / محمد بن عبدالعزيز / سارة محمد / أحمد بن خالد / نورة سعد / نظام تلقائي + 1 admin)
   - **النطاق الزمني** picker — defaulted to «آخر 7 أيام»
   - **نوع الإجراء** dropdown — 11 options (الكل / created / updated / approved / rejected / paid / disabled / login / viewed / executed / reviewed / exported)
   - **Result-count chip** beside the filters: «24 من 24» (info-tone, visual-only — reflects no-filter applied state)
5. **Audit-log events table** (FR-055) — 24 rows × 7 columns. Wrapped in `<div class="overflow-x-auto"><table class="min-w-[900px]">` for tablet.
   - **Column headers** (under RTL): المستخدم / الإجراء / الوحدة / التاريخ والوقت / IP / تفاصيل / الإجراء
   - **24 rows** (per data-model.md E7 / research.md D10) sorted descending by timestamp:

     | # | Actor | Action verb | Module | Timestamp | IP | Details |
     |---|-------|-------------|--------|-----------|-----|---------|
     | 1 | سارة محمد | created | مالية المعلم | 2026-05-10 09:15 | `94.***.***.118` | تعديل يدوي -80.00 ريال على **STL-2026-04-TCH-0042** — قبل: 0.00 / بعد: -80.00 / السبب: «تأخّر جلستين 14 + 22 أبريل» |
     | 2 | نظام تلقائي | executed | رصيد العائلة | 2026-05-10 08:42 | — | تطبيق رصيد عائلة 67.00 ريال على **INV-2026-0184** — مصدر الرصيد **FAM-2023-0211** / المتبقي بعد التطبيق 383.00 ريال |
     | 3 | محمد بن عبدالعزيز | login | المصادقة | 2026-05-10 08:00 | `94.***.***.118` | — |
     | 4 | محمد بن عبدالعزيز | approved | مالية المعلم | 2026-05-09 16:30 | `94.***.***.118` | اعتماد التسوية STL-2026-04-TCH-0078 (الأستاذ يوسف) — الحالة: بانتظار الاعتماد → معتمدة / تاريخ السداد المتوقّع 2026-05-15 |
     | 5 | سارة محمد | updated | إعدادات المنصة | 2026-05-09 14:22 | `94.***.***.118` | تحديث حقل: تذييل الفاتورة / السبب: تحديث رقم تواصل خدمة العملاء |
     | 6 | أحمد بن خالد | reviewed | مالية المعلم | 2026-05-09 14:12 | `78.***.***.45` | مراجعة التسوية **STL-2026-04-TCH-0042** — الحالة: قيد المراجعة → جاهزة للاعتماد |
     | 7 | سارة محمد | created | المدفوعات | 2026-05-09 11:35 | `94.***.***.118` | دفعة يدوية بمبلغ 200.00 ريال على INV-2026-0231 — العائلة: عائلة مؤمن / الطفل: عبد الرحمن مؤمن / طريقة: تحويل بنكي |
     | 8 | محمد بن عبدالعزيز | created | الأدوار والصلاحيات | 2026-05-08 18:45 | `94.***.***.118` | دور جديد «مساعد إداري» — الصلاحيات الممنوحة 5 / المستخدمون المعيّنون: 0 (الدور موقوف لاحقاً) |
     | 9 | سارة محمد | paid | مالية المعلم | 2026-05-08 16:20 | `94.***.***.118` | تسجيل دفعة على STL-2026-04-TCH-0067 (الأستاذ خالد) — المبلغ 5,500.00 ريال / مصرف الراجحي |
     | 10 | أحمد بن خالد | created | الفواتير | 2026-05-08 14:05 | `78.***.***.45` | فاتورة جديدة INV-2026-0231 — العائلة: عائلة مؤمن / المبلغ 437.00 ريال |
     | 11 | نورة سعد | viewed | الطلاب | 2026-05-08 09:30 | `212.***.***.91` | فتح ملف الطالب عبد الرحمن مؤمن — السبب: استفسار من ولي الأمر |
     | 12 | محمد بن عبدالعزيز | disabled | المستخدمون | 2026-05-07 20:15 | `94.***.***.118` | تعطيل حساب USR-2024-0099 (مساعد إداري سابق) — السبب: انتهاء الخدمة |
     | 13 | سارة محمد | updated | إعدادات المنصة | 2026-05-07 17:00 | `94.***.***.118` | تعديل قاعدة تسعير: «دورة القرآن الكريم — المستوى الثالث (غير ناطق)» — السعر السابق 580.00 / الجديد 600.00 ريال — تاريخ السريان 2026-06-01 |
     | 14 | أحمد بن خالد | reviewed | المدفوعات | 2026-05-07 12:40 | `78.***.***.45` | فاتورة INV-SES-2026-0212 — الحالة: تحت المراجعة → معتمدة |
     | 15 | نظام تلقائي | created | مالية المعلم | 2026-05-06 19:25 | — | تسوية STL-2026-04-TCH-0089 (الأستاذة هبة) — 40 حصة / صافي 3,950 جنيه |
     | 16 | سارة محمد | created | سُلَف المعلم | 2026-05-06 15:10 | `94.***.***.118` | سلفة ADV-2026-0024 للأستاذ يوسف — المبلغ 450.00 ريال / 3 أقساط |
     | 17 | سارة محمد | exported | التقارير | 2026-05-05 22:05 | `94.***.***.118` | تصدير تقرير شهر أبريل (PDF) — التقرير: **RPT-2026-04-Q03-007** / المستلم: ولي أمر عبد الرحمن مؤمن |
     | 18 | محمد بن عبدالعزيز | updated | الأدوار والصلاحيات | 2026-05-05 14:30 | `94.***.***.118` | تحديث صلاحيات دور Operations — إضافة: «عرض» على وحدة الواجبات |
     | 19 | نورة سعد | created | المنبر الاجتماعي | 2026-05-05 11:15 | `212.***.***.91` | رد على رسالة دعم — المرسل إليه: ولي أمر سارة مؤمن |
     | 20 | أحمد بن خالد | created | رصيد العائلة | 2026-05-04 18:50 | `78.***.***.45` | فاتورة يدوية على رصيد العائلة **FAM-2023-0211** — إيداع +200.00 ريال |
     | 21 | سارة محمد | approved | سُلَف المعلم | 2026-05-04 16:40 | `94.***.***.118` | اعتماد سلفة ADV-2026-0019 — المعلّم: الأستاذة منى / المبلغ 800.00 ريال |
     | 22 | محمد بن عبدالعزيز | updated | إعدادات الضريبة | 2026-05-04 14:00 | `94.***.***.118` | تعديل إعدادات الضريبة — نسبة الـVAT 15% / تطبيق على: الدورات + الحصص الخاصة + الحصص الجماعية |
     | 23 | سارة محمد | exported | سجل المراجعة | 2026-05-04 11:25 | `94.***.***.118` | تصدير سجل المراجعة — نطاق التصدير: 1-30 أبريل 2026 |
     | 24 | أحمد بن خالد | login | المصادقة | 2026-05-04 09:00 | `78.***.***.45` | — |

   - **Per-row action column** (FR-061): single «عرض التفاصيل» chevron icon-button (visual-only; no JS expand/collapse — collapsed visual state only).
6. **Footer caption** (non-link static text per FR-067): «سجل المراجعة لا يُحذَف ولا يُعدَّل — هذه الميزة ضامنة للمساءلة وفق المعايير المحاسبية المعتمدة في المملكة.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#10) | Page exists at `pages/admin/audit-log.html` |
| FR-053 | 4 summary tiles |
| FR-054 | 4 filter controls (الوحدة / المستخدم / النطاق الزمني / نوع الإجراء) |
| FR-055 | 24-row events table sorted descending |
| FR-056 | ≥ 4 prior-spec identifiers cited (STL-2026-04-TCH-0042, INV-2026-0184, FAM-2023-0211, RPT-2026-04-Q03-007) |
| FR-057 | ≥ 1 «نظام تلقائي» actor row (rows 2 + 15) |
| FR-058 | Every IP masked first-and-last-octet (94/78/212.***.***. or `—` for system actor) |
| FR-059 | ≥ 1 empty-payload «—» details row (rows 3 + 24) |
| FR-060 | Visual-only «تصدير CSV» button with `title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"` |
| FR-061 | Per-row «عرض التفاصيل» chevron icon-button |
| FR-067 | Zero `href="#"` |

## Constraints

- **24 events**, exact count (SC-006 traceability + summary tile alignment).
- The 4 prior-spec identifiers (STL-2026-04-TCH-0042 / INV-2026-0184 / FAM-2023-0211 / RPT-2026-04-Q03-007) MUST appear verbatim — verifiable by `grep -E ...` per SC-006.
- The «تصدير CSV» button title MUST be `title="عرض مرئي فقط — لا يتم تنزيل ملف فعلي"` exact text (SC-011).
- All IPs follow the masking convention `XX.***.***.YY` per data-model.md D13.
- Actor «نظام تلقائي» appears on events 2 and 15.
- Empty payload «—» appears on events 3 and 24 (login events).
- Date range: 2026-05-04 → 2026-05-10 inclusive (7 days).
- The «الإجراء» column action verbs (created / updated / approved / etc.) carry status-tone badges with text labels per Constitution IV.
- Sidebar active entry: «سجل المراجعة» (new constitutional entry per FR-005 — visible on this page and the other 9 new pages).
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
