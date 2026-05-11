# Contract: `pages/admin/student-teacher-assignment-details.html`

**Role**: Admin | **Active sidebar entry**: «تعيين الطلاب للمعلمين» | **Anchor entity**: `ASN-2024-1184` (عبد الرحمن مؤمن × الأستاذ أحمد بن عبد الله × دورة القرآن الكريم — المستوى الثالث) per data-model.md E1 anchor record

## Page composition (top → bottom under RTL)

1. **Header** (reused).
2. **Page header bar** — breadcrumb «تعيين الطلاب للمعلمين › تفاصيل التعيين ASN-2024-1184» + title «تفاصيل التعيين» + identifier chip «ASN-2024-1184» + status badge «نشطة» (success-green).
3. **`<!-- SHARED_ASN_HEADER_START -->` block** — byte-identical to `assigned-student-details.html` per FR-061 + SC-004. Contains:
   - Student-profile mini-card: «عبد الرحمن مؤمن — STD-2023-0143 — 11 سنة — جدة — ناطق بالعربية»
   - Course-and-level mini-card: «دورة القرآن الكريم — المستوى الثالث»
   - Assignment-type chip: «معلم رئيسي»
   - Start-date chip: «بدء التعيين: 2024-09-15»

   Closes with `<!-- SHARED_ASN_HEADER_END -->` comment marker.

4. **10 detail cards** in a 3-column desktop grid (mobile-stacked):

   | # | Card | Body |
   |---|------|------|
   | 1 | الطالب | Full profile: name, age, city, type chip, parent name, contact summary |
   | 2 | العائلة | «عائلة مؤمن — FAM-2023-0211 — رصيد متاح: 450.00 ريال» + sibling caption «الرصيد محفوظ من سياق الفواتير السابقة (Spec 008)» + brother chip «أخو سارة مؤمن — تعيين ASN-2024-1185» |
   | 3 | الدورة والمستوى | «دورة القرآن الكريم — المستوى الثالث» + chip «الدورة من كاتالوج Spec 003» |
   | 4 | المعلم | «الأستاذ أحمد بن عبد الله — TCH-2023-0011» + visual «تواصل» small button (no `tel:`/`wa.me:`) + capacity badge «12/12 — وصل السعة القصوى» |
   | 5 | نوع الطالب | «ناطق بالعربية» chip + caption «يُطبَّق سعر التسعير الخاص بالناطقين» |
   | 6 | الحالة | «نشطة» badge + start-date 2024-09-15 + end-date «مستمر» |
   | 7 | نموذج الدفع | «دورة كاملة — 380.00 ريال» + Spec-010 Rule 1 citation + total-sessions 24 + remaining 18 |
   | 8 | ملخص الحضور | «92% خلال أبريل 2026» (Spec-006-locked figure preserved verbatim) + small sparkline |
   | 9 | ملخص الواجبات | «88%» (Spec-006-locked) headline + caption «معدل التسليم التراكمي خلال الفصل الدراسي 2025-2026 — 22 من 25 واجباً» + optional sub-line «آخر 6 واجبات: 5 مُسلَّمة · 1 في الانتظار» (the 5-of-6 count is NOT the source of the 88%) |
   | 10 | ملاحظات المعلم | 3 recent notes from الأستاذ أحمد + visual «إضافة ملاحظة» button (no real form) |

5. **Related-invoices wide block** — 1 row × 3-column table:

   | # | الفاتورة | التاريخ | المبلغ | الحالة | الإجراءات |
   |---|---------|---------|--------|--------|-----------|
   | 1 | **INV-2026-0184** | 2026-04-01 | 437.00 ريال (380.00 + 57.00 ضريبة) | مدفوعة | «عرض» → `pages/admin/invoice-details.html` |
   | 2 | INV-2026-0152 | 2026-03-01 | 437.00 ريال | مدفوعة | «عرض» |
   | 3 | INV-2026-0117 | 2026-02-01 | 437.00 ريال | مدفوعة | «عرض» |

   **NOTE**: row 1 cites `INV-2026-0184` verbatim — required for FR-032 + SC-005. The Spec-008 anchor invoice appears here as the **invoice that this assignment generated** (the bidirectional dual-lens discipline: Spec 008 viewed it as "the invoice"; Spec 011 views it as "the assignment's invoice").

6. **Teacher-earning-preview wide block** — 1 tile:
   - Heading: «أرباح المعلم لهذا التعيين — أبريل 2026»
   - Body: «يُساهم هذا التعيين في تسوية الأستاذ أحمد بن عبد الله الشهرية — **STL-2026-04-TCH-0042** — بمبلغ 3,750 ريال صافي (بانتظار الاعتماد). وفقاً لفئة الراتب «حصص خاصة — ناطق — 80%» من Spec 009.»
   - CTA: «عرض التسوية» → `pages/admin/teacher-settlement-details.html` (Spec-009 page)

7. **Assignment-history timeline** (full-width, vertical):
   - Legend chip strip at top: 4 event-type chips with icon + color:
     - «إنشاء التعيين» (brand-primary + plus icon)
     - «ترقية المستوى» (success-green + up-arrow icon)
     - «ملاحظة معلم» (neutral-gray + comment icon)
     - «نقل» (warning-amber + swap icon) — documented in legend, NOT exercised on this anchor (the persona has not been transferred)
   - 3 timeline `<li>` events per data-model.md E1 § History timeline events on ASN-2024-1184:
     1. 2024-09-15 — إنشاء التعيين — by محمد بن عبدالعزيز الإدريسي — body verbatim
     2. 2025-02-01 — ترقية المستوى — by الأستاذ أحمد — body verbatim
     3. 2026-05-08 — ملاحظة معلم — by الأستاذ أحمد — body verbatim

8. **Action bar at footer** — 3 buttons in canonical order:
   - «نقل المعلم» — primary brand-primary button → `pages/admin/transfer-student-teacher.html`
   - «إيقاف التعيين» — danger-amber button — `<button type="button" data-modal-open="confirm-stop-assignment">`
   - «تعديل التعيين» — secondary outline button → `pages/admin/create-student-teacher-assignment.html` (in edit-mode — same form, pre-populated for ASN-2024-1184)

9. **Sanctioned modal block** at page bottom:
   - `id="modal-confirm-stop-assignment"`
   - Body title: «تأكيد إيقاف التعيين»
   - Projected post-action caption: «سيتم إيقاف التعيين ابتداءً من 2026-05-12 — تبقى السجلات السابقة محفوظة لدى الأستاذ أحمد بن عبد الله. لن يتم إنشاء جلسات جديدة أو فواتير جديدة لهذا التعيين حتى يتم استئنافه.»
   - Secondary caption: «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً.»
   - Buttons: «تأكيد الإيقاف» (danger-amber) / «إلغاء»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#3) | Page exists |
| FR-030 | Page hard-coded to ASN-2024-1184; identifier visible in breadcrumb |
| FR-031 | 10 cards in 3-column grid + 2 wide blocks + 1 full-width timeline + 1 action bar |
| FR-032 | INV-2026-0184 cited verbatim on related-invoices + STL-2026-04-TCH-0042 cited verbatim on teacher-earning-preview |
| FR-033 | Timeline has ≥ 3 events with 4 event-type legend |
| FR-034 | 3-button action bar in canonical order with stop using `data-modal-open` |
| FR-035 | Stop-assignment modal carries projected post-action + «هذا عرض مرئي فقط» |
| FR-061 | `<!-- SHARED_ASN_HEADER -->` block (byte-identical to teacher-view) |

## Constraints

- The SHARED_ASN_HEADER block contents MUST diff-match the teacher-view page (SC-004).
- The Spec-006 figures 92% and 88% must appear verbatim on cards 8 and 9 — no contradictions.
- The Spec-008 figure 450.00 ريال must appear verbatim on card 2.
- Card 2's brother-chip cites ASN-2024-1185 — establishing intra-family multi-assignment visibility.
- Card 4's capacity badge demonstrates the at-capacity state visually but doesn't enforce anything.
- The «إضافة ملاحظة» button on card 10 is `<button type="button">` (no modal, no form, no save).
- Every action bar button routes to a real existing page or opens a sanctioned modal — Constitution Quality Gate 5.
