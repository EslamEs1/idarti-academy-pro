# Contract: `pages/admin/teacher-finance.html`

**Role**: Admin | **Active sidebar entry**: «مالية المعلمين» | **Anchor period**: April 2026 payroll cycle (5 SAR + 1 EGP teacher)

## Page composition

1. **Header** (reused) — admin variant.
2. **Page title bar** — H1 «مالية المعلمين» + 2 header CTAs (RTL-natural):
   - Primary «إنشاء سلفة جديدة» → `pages/admin/create-teacher-advance.html`
   - Secondary «قواعد الرواتب» → `pages/admin/teacher-salary-rules.html`
3. **Five summary cards** in a responsive grid:
   - **إجمالي مدفوعات المعلمين الشهر الماضي (أبريل)** — 28,400.00 ريال + 4,200.00 EGP separated — caption «6 معلمين»
   - **تسويات معلّقة** — 4 من 6 — caption «بانتظار الاعتماد»
   - **السلف المُصرفة هذا الشهر (مايو)** — 1,000.00 ريال + 2,500.00 EGP — caption «3 سلف»
   - **الصافي المستحق المتوقّع لمايو 2026** — 8,250.00 ريال + 4,200.00 EGP — caption «تقديري حتى تاريخ 2026-05-10»
   - **عدد المعلمين النشطين** — 6 معلمين — caption «5 ريال + 1 جنيه مصري»
4. **Footnote near summary cards** — «إجمالي مدفوعات الشهر الماضي يعكس الأرباح الإجمالية قبل خصم السلف؛ الصافي المدفوع للمعلمين يساوي الإجمالي ناقص السلف ناقص الخصومات اليدوية» (FR-046).
5. **Filters strip** — 4 controls (RTL order from start):
   - الحالة chips: الكل / بانتظار الاعتماد / معتمدة / مدفوعة / مرفوضة
   - الشهر dropdown: يناير 2026 — مايو 2026
   - العملة chips: الكل / ريال / EGP
   - البحث بالاسم input (sanctioned filter input — exempt from SC-010 read-only check)
6. **Bulk-action affordance** above the table — master-checkbox column header + «إجراءات مجمّعة» dropdown (visual disabled-styled when empty) offering: اعتماد المحدّد / تعليم كمدفوعة / تنزيل التسويات (PDF) / تصدير CSV.
7. **Teachers-finance table** — 6 rows × 12 columns (with leading checkbox + trailing «تفاصيل» CTA). Columns: ☐ / المعلّم / التخصص / الحصص / أرباح ناطق بالعربية / أرباح غير ناطق بالعربية / أرباح الدورات / السلف المخصومة / الصافي المستحق / العملة / الحالة / إجراء. Anchor rows:

   | ☐ | Teacher | Subject | Sessions | Ar-earnings | For-earnings | Course | Advances | Net | Currency | Status | Action |
   |---|---------|---------|----------|-------------|--------------|--------|----------|-----|----------|--------|--------|
   | ☐ | الأستاذ أحمد بن عبد الله | قرآن | 52 | 1,680.00 | 800.00 | 1,600.00 | -450.00 | **3,750.00** | ريال | بانتظار الاعتماد | تفاصيل |
   | ☐ | الأستاذة منى سعد | لغة عربية | 44 | 1,560.00 | 480.00 | 0.00 | -200.00 | **3,640.00** | ريال | معتمدة | تفاصيل |
   | ☐ | الأستاذ خالد العبدلي | دراسات إسلامية | 38 | 1,140.00 | 0.00 | 600.00 | 0.00 | **5,500.00** | ريال | مدفوعة 2026-05-08 | تفاصيل |
   | ☐ | الأستاذة فاطمة الزهراني | رياضيات | 32 | 960.00 | 320.00 | 0.00 | 0.00 | **3,180.00** | ريال | بانتظار الاعتماد | تفاصيل |
   | ☐ | الأستاذ يوسف القحطاني | لغة إنجليزية | 36 | 540.00 | 600.00 | 1,200.00 | -150.00 | **8,430.00** | ريال | بانتظار الاعتماد | تفاصيل |
   | ☐ | الأستاذة هبة عبد الفتاح | إنجليزية لغير الناطقين | 40 | 0.00 | 4,200.00 | 0.00 | -250.00 | **3,950.00** | EGP (جنيه) | معتمدة 2026-05-09 | تفاصيل |

   The «تفاصيل» CTA on the الأستاذ أحمد row links to `pages/admin/teacher-settlement-details.html` (canonical anchor).

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-040 | 5 summary cards (currency-separated) |
| FR-041 | 4 filter controls |
| FR-042 | 6-row teachers-finance table |
| FR-043 | Bulk-action affordance |
| FR-044 | Per-row checkbox + «تفاصيل» CTA |
| FR-045 | 2 header CTAs |
| FR-046 | Footnote |
| FR-090, FR-091, FR-092 | Arabic/Foreign distinction + 4 mechanisms + multi-currency |
| FR-094 | 3 of 5 settlement states visible (مدفوعة / معتمدة / بانتظار الاعتماد) |
| FR-095 | -450 advance figure consistent with anchor |

## Constraints

- Currencies NEVER summed across SAR and EGP — FR-040 summary cards expose them as separate sub-tiles.
- Master checkbox is a static `<input type="checkbox">` — toggling does not auto-style child rows (visual-only per Constitution V).
- Bulk-action dropdown reuses existing main.js dropdown handler.
- All non-anchor rows present illustrative net figures (per data-model.md note); only الأستاذ أحمد has a full settlement-details page.
