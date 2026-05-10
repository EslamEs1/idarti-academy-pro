# Contract: `pages/teacher/advances.html`

**Role**: Teacher | **Active sidebar entry**: «السلف» | **Anchor entity**: الأستاذ أحمد TCH-2024-0042 — his 3 personal advances

## Page composition

1. **Header** (reused).
2. **Three summary tiles** in a responsive grid:
   - إجمالي السلف المستلمة — 2,200.00 ريال — caption «موزّعة على 3 سلف منذ 2025-11»
   - إجمالي المُسدَّد — 1,450.00 ريال — caption «65.9% من الإجمالي»
   - الرصيد المتبقّي — 750.00 ريال — caption «على ADV-2026-0023 فقط»
3. **Advance-history table** — 3 rows × 7 columns (رقم السلفة / تاريخ المنح / المبلغ / السبب / طريقة الخصم / الحالة / ملاحظة الإدارة):
   - **ADV-2025-0089** — 2025-11-15 — 600.00 ريال — إعداد منزل المدرس — تقسيط شهري ثابت 200×3 — مكتملة (success ✓) — تم إغلاقها وفق الجدول
   - **ADV-2026-0012** — 2026-02-15 — 600.00 ريال — نفقات أسرية طارئة — تقسيط شهري ثابت 200×3 — شبه مكتملة (warning ⏳) — ستُغلق فور اعتماد تسوية أبريل
   - **ADV-2026-0023** — 2026-04-01 — 1,000.00 ريال — علاج طبي — تقسيط شهري ثابت 250×4 — نشطة (info ⏵) — خُصمت أول دفعة ضمن تسوية أبريل المعلّقة
4. **Side panel "جدول الخصم القادم"** (RTL right-side rail on desktop, below the table on mobile) — 3 rows + total chip:
   - مايو 2026 — ADV-2026-0023 — الدفعة 2 من 4 — 250.00 ريال
   - يونيو 2026 — ADV-2026-0023 — الدفعة 3 من 4 — 250.00 ريال
   - يوليو 2026 — ADV-2026-0023 — الدفعة 4 من 4 (الأخيرة) — 250.00 ريال
   - Total chip: «إجمالي الخصومات القادمة 750.00 ريال موزّعة على 3 أشهر»
5. **«ملاحظة الشفافية» footer caption** — text «السلف تُخصم تلقائياً من التسويات الشهرية وفق الجدول المعتمد. لا يمكن للمعلم تعديل سياسة الخصم — لطلب تعديل، يُرجى التواصل مع الإدارة».

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-020 | 3 summary tiles |
| FR-021 | 3-row advance-history table |
| FR-022 | 7-column structure + status badges with color+text+icon |
| FR-023 | Upcoming-deductions side panel (3 rows + total chip) |
| FR-024 | Footer transparency caption |
| FR-096 | Zero `<input type="number">` |

## Constraints

- No `<input type="number">` anywhere (SC-010).
- The anchor teacher does NOT carry "بانتظار الاعتماد" or "مرفوضة" rows on his own page (those statuses are demonstrated only on admin/teacher-advances.html — see FR-022 + FR-064).
- Status badges must pair color + text + icon (Constitution IV).
