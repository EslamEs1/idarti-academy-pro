# Contract: `pages/teacher/earnings.html`

**Role**: Teacher | **Active sidebar entry**: «الأرباح» | **Anchor entity**: الأستاذ أحمد بن عبد الله الزهراني (TCH-2024-0042) — the 6 visible months of his 2026 settlements

## Page composition (top → bottom under RTL)

1. **Header** (reused) — search / bell / Tajawal greeting "أهلاً بك، أ. أحمد"
2. **Hero card** — title «تسوية أبريل 2026» + status badge «بانتظار اعتماد الإدارة» (info-tone) + الصافي المستحق `3,750.00 ريال` (large numeric) + sub-line «الاعتماد المتوقّع 2026-05-12 — السداد المتوقّع 2026-05-15» + primary CTA «عرض تفاصيل التسوية» → `pages/teacher/settlement-details.html`
3. **Eleven summary cards** in a responsive grid (3 cols desktop / 2 cols tablet / 1 col mobile). Each card carries a numeric value + a small contextual caption (e.g., "+12% مقارنة بشهر مارس").
   - الحصص المُنجزة 52
   - حصص ناطق بالعربية 40
   - حصص غير ناطق بالعربية 12
   - الحصص الجماعية 32
   - الحصص الخاصة 20
   - أرباح من الحصص 2,480.00 ريال
   - أرباح من الدورات 1,600.00 ريال
   - حوافز 200.00 ريال
   - خصومات يدوية -80.00 ريال
   - السلف المخصومة -450.00 ريال
   - الصافي المستحق 3,750.00 ريال
4. **Per-rate breakdown panel** — title «أرباح الحصص حسب نوع الطالب». 4 rate-bucket rows + 1 subtotal row (`font-tabular-nums` for column alignment):
   - ناطق بالعربية — جماعية: 24 حصة × 30.00 ريال = 720.00 ريال
   - ناطق بالعربية — خاصة: 16 حصة × 60.00 ريال = 960.00 ريال
   - غير ناطق بالعربية — جماعية: 8 حصص × 50.00 ريال = 400.00 ريال
   - غير ناطق بالعربية — خاصة: 4 حصص × 100.00 ريال = 400.00 ريال
   - **إجمالي أرباح الحصص: 2,480.00 ريال**
5. **Course-earnings panel** — title «أرباح من الدورات». One row: «دورة القرآن الكريم — المستوى الثالث — قاعدة "20% من الإيرادات" — إيرادات الدورة لشهر أبريل 8,000.00 ريال — حصة المعلّم 1,600.00 ريال». Caption: «إيرادات الدورة لشهر أبريل».
6. **Earnings-history table** — 5 rows × 8 columns (الشهر / الحصص / الأرباح الإجمالية / الخصومات / السلف / الصافي / الحالة / إجراء):
   - يناير 2026 — 47 — 4,100.00 — — / — / 4,100.00 — مدفوعة 2026-02-08 — عرض
   - فبراير 2026 — 49 — 3,820.00 — — / — / 3,820.00 — مدفوعة 2026-03-08 — عرض
   - مارس 2026 — 50 — 3,400.00 — — / — / 3,400.00 — مدفوعة 2026-04-08 — عرض
   - **أبريل 2026 — 52 — 4,480.00 — -80.00 / -450.00 / 3,750.00 — بانتظار الاعتماد** (anchor row, highlighted background) — عرض تفاصيل التسوية
   - مايو 2026 (جارٍ) — 9 — **420.00 + "تقدير" pill** (small neutral-tone badge adjacent to the amount cell — A1 indicator per FR-014) — — / — / 420.00 — قيد التحصيل (with caption «تفصيل: 5+2+1+1 جلسة عبر 4 أنواع» per Q4) — غير متاح بعد. Only the May row carries the "تقدير" pill; closed-month rows do not.
7. **Read-only side panel "ملخص قواعد الراتب الفعّالة"** (FR-018) — RTL right-side rail on desktop, below the breakdown panel on mobile. 5 rows: 4 per-session rates + 1 course-percentage line. Info icon links to `pages/admin/teacher-salary-rules.html` (visual link only — admin sidebar would gate teacher access in a real system).
8. **«ملاحظة الشفافية» footer caption** — text «العرض للقراءة فقط — لتعديل أي قيمة، يُرجى التواصل مع الإدارة عبر صفحة الرسائل».

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-010 | Hero card |
| FR-011 | 11 summary cards |
| FR-012 | Per-rate breakdown panel (4 buckets + subtotal) |
| FR-013 | Course-earnings panel |
| FR-014 | Earnings-history table 5 rows |
| FR-015 | 8-column structure |
| FR-016 | Per-row CTAs (closed-month "عرض" + April "عرض تفاصيل التسوية" + May "غير متاح بعد") |
| FR-017 | Footer transparency caption |
| FR-018 | Side panel «ملخص قواعد الراتب الفعّالة» |
| FR-090 | "ناطق بالعربية" / "غير ناطق بالعربية" labels |
| FR-091 | Per-session + course-percentage mechanisms visible |
| FR-096 | Zero `<input type="number">` (filter/search inputs only allowed) |

## Constraints

- No `<input type="number">` anywhere on the page (SC-010).
- The April row's 4,480.00 ريال gross-earnings cell = 2,480 + 1,600 + 200 + 200 (note: this is illustrative; the actual per-row numeric in the earnings-table is 4,200.00 representing post-deduction-pre-advances; an alternate column ordering is acceptable as long as the **net 3,750.00** matches).

  Authoritative interpretation: the table shows 4 visible totals per row → الأرباح الإجمالية = sum of sessions+courses+bonuses (gross) = 4,280.00 for April; الخصومات = -80; السلف = -450; الصافي = 3,750. That is internally consistent. Implement using الأرباح الإجمالية = 4,280.00.
- Latin digits inside Arabic copy (FR-005).
- May row caption «تفصيل: 5+2+1+1 جلسة عبر 4 أنواع» visible (Q4).
