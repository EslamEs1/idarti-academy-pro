# Phase 0 Research — Payments, Invoices, Tax Settings & Family Balance Frontend

This document records every clarification-driven decision, every content-sourcing choice, every cross-spec reconciliation rule, and every design-discipline anchor that downstream artifacts (data-model.md / contracts/ / tasks.md / the 10 HTML files) MUST consume verbatim. The format follows Spec 007's research.md: numbered research items, each with **Decision**, **Rationale**, **Alternatives considered**, and (where applicable) **Cross-doc references**.

The spec's four clarifications (resolved during `/speckit-clarify` on 2026-05-10) are recorded as R1 → R4 below. The remaining items (R5 → R20) capture persona pinning, sample-data anchors, content-sourcing decisions, currency-rendering conventions, anchor-invoice math, family-balance ledger math, and shell/JS scope rules that the implementer needs to ship the ten pages without re-deriving them.

---

## R1. Q1 — Anchor financial snapshot policy (resolved 2026-05-10)

**Decision**: **Family balance auto-applies on the invoice due date.** The seeded data reflects post-application reality. INV-2026-0184 status is "مدفوعة" (closed 2026-04-30 by auto-application of 67.00 ريال). A separate invoice INV-SES-2026-0205 (115.00 ريال total, 60.00 paid, 55.00 remaining, due 2026-05-20) is the canonical "مدفوعة جزئياً" demo example because it is still inside its payment window with no auto-application yet triggered.

**Rationale**: Three convergent reasons.
1. **Realism** — auto-application matches how real finance systems handle prepaid balances at due-date breakpoints. Manual-only application would require the admin to remember every due date — operationally implausible.
2. **Internal consistency** — the original spec draft contained a contradiction (INV-2026-0184 labelled "Partially Paid" while having a balance-application timestamp 10 days in the past). Option A removes the contradiction by aligning the snapshot with the policy.
3. **Caption-level pre-existing intent** — FR-035's caption "يُطبَّق تلقائياً على الفواتير المستحقة" had already implied auto-application; Option A operationalizes that caption rather than contradicting it.

**Operational rules**:
- The auto-application event is rendered on three independent surfaces with the **identical** "تلقائي" badge / pill:
  - **Admin invoice-details timeline** (FR-071) — system actor "نظام تلقائي" + caption "تلقائي عند تاريخ الاستحقاق".
  - **Parent family-balance ledger** (FR-041 row 5) — note "تطبيق تلقائي عند تاريخ الاستحقاق — أغلق المبلغ المتبقّي" + a "تلقائي" pill.
  - **Student invoice-details payment-method panel** (FR-025) — third stream labelled "(تطبيق تلقائي عند تاريخ الاستحقاق)" + a small "تلقائي" pill or icon to distinguish it from the manual streams.
- The 3-payment-stream breakdown for INV-2026-0184 is recalibrated: Mada 200 (2026-04-12) + bank transfer **170** (2026-04-25, was 103) + auto-applied balance 67 (2026-04-30) = 437 = total. The bank-transfer amount changes from the original draft's 103 to 170 to make the math close to 437 with a single 67-balance application.
- The persona's payment-history "إجمالي المدفوع" summary card recalibrates from 1,313 ريال to **934.00 ريال** (sum of {INV-2026-0184 437 + INV-2026-0137 437 + INV-SES-2026-0205 partial 60} = 934). The "تحت المراجعة" 69 from INV-SES-2026-0212 is excluded.

**Alternatives considered**:
- **Option B — Manual-only application**: rejected — INV-2026-0184 stays Partially Paid forever; the 2026-04-30 balance-history row becomes a "scheduled, not yet executed" entry that never resolves; auditors would see a perpetual pending application.
- **Option C — Snapshot frozen 2026-04-29**: rejected — adds a visible "كما في 2026-04-29" timestamp banner everywhere, conflicting with the spec's elsewhere-pinned "today = 2026-05-10" convention.

**Cross-doc references**: spec.md §Clarifications Q1; FR-024, FR-025, FR-035, FR-041, FR-071, FR-074, FR-110, FR-114; SC-005; new "Auto-applied family balance on due date" edge case; this plan's Summary §Q1; data-model.md §E1 + §E2; contracts/student-invoice-details.md, contracts/admin-invoice-details.md, contracts/parent-family-balance.md.

---

## R2. Q2 — Persona overdue attribution (resolved 2026-05-10)

**Decision**: **The persona himself carries his own overdue invoice** INV-SES-2026-0098 (Feb private session, 92.00 ريال, overdue since 2026-02-25 — "متأخّر منذ 74 يوم") on `pages/student/payment-history.html`, AND Sister Sara also carries her own overdue INV-2026-0188 (April Arabic + Islamic Studies, 322.00 ريال) on `pages/parent/invoices.html`.

**Rationale**: Two convergent reasons.
1. **Single-page demonstration value** — the spec's MVP value is to let an evaluator demonstrate **all six payment statuses** on the highest-traffic page (student/payment-history.html) without role-switching. A 3-month-old slipped private-session bill is a forgivable artifact that exercises the "متأخّرة" badge in the persona's own table, in danger-tone red, with the "متأخّر منذ N يوم" duration helper text.
2. **Realism + non-conflict with academic anchors** — the persona's "ممتاز" academic standing locked in Spec 006 is about effort/attendance/exam scores, not about the parent's bill-payment cadence. Many real families exhibit exactly this pattern: kids excellent at school, parents occasionally miss a private-session invoice. The two are operationally and tonally distinct.

**Distribution**:
- **Persona (student/payment-history.html)**: 1 overdue (INV-SES-2026-0098) + 2 paid (INV-2026-0184, INV-2026-0137) + 1 partially paid (INV-SES-2026-0205) + 1 under review (INV-SES-2026-0212) + 1 unpaid (INV-2026-0231) + 1 cancelled (INV-SES-2026-0156). 7 rows total.
- **Sister Sara (parent/invoices.html only)**: 1 overdue (INV-2026-0188 322.00 ريال) + ≥ 2 paid prior-month rows (INV-2026-0145 March, INV-2026-0107 February) + the May current INV-2026-0234 unpaid (Sara's May subscription due 2026-05-20).
- **No third overdue is added anywhere** — the danger-tone overdue affordance is exercised exactly twice across the spec, on two DIFFERENT student rows in two DIFFERENT role contexts.

**Alternatives considered**:
- **Option B — Overdue moves to Sara only**: rejected — persona's table shrinks to 6 rows; demonstrating "متأخّرة" requires switching to parent role; reduces single-page demo value.
- **Option C — Overdue is admin-only**: rejected — neither student nor parent surface shows overdue; misses the constitutional principle "color is never the sole indicator" demonstration on customer-facing pages where the affordance matters most.

**Cross-doc references**: spec.md §Clarifications Q2; FR-012, FR-032, FR-033; data-model.md §E1; contracts/student-payment-history.md, contracts/parent-invoices.md.

---

## R3. Q3 — Student-type filter labels (resolved 2026-05-10)

**Decision**: The Constitution-VI Arabic-vs-Foreign pricing distinction is rendered as **"ناطق بالعربية"** ("Arabic-speaking") and **"غير ناطق بالعربية"** ("non-Arabic-speaking"). These are the canonical labels for both the filter chip group on `pages/admin/invoices.html` AND the per-row badge in the table's "نوع الطالب" column.

**Rationale**: Three convergent reasons.
1. **Names the actual pricing criterion** — the academy's pricing rule is driven by the student's first-language proficiency (Arabic native vs. Arabic learner from a non-Arabic-speaking country). The original draft "محلي / مغترب" ("local / abroad") conflated this with residency, creating misclassifications: a Saudi student studying abroad would still be "Arabic-speaking" pricing under the academy's actual rule, but "مغترب" would have flagged them as the foreign-pricing tier.
2. **Avoids ethnic-framing ambiguity** — the rejected alternative "عربي / أجنبي" reads ambiguously as ethnic Arab vs foreign nationality, an inappropriate framing for a language-proficiency criterion in a Quran-learning context where many non-Arab students study Arabic from abroad.
3. **RTL-clean and consistent** — both labels are concise enough to fit a chip + a row badge under RTL without overflow, and use parallel grammatical structure ("X / غير X").

**Cross-spec normalization**: any future spec that surfaces this same distinction MUST use the exact same two labels. This is now a spec-008-locked vocabulary entry.

**Sample-data implications** (data-model.md §E6):
- The persona عبد الرحمن مؤمن is "ناطق بالعربية" (Saudi-resident, Arabic native).
- The Egyptian sample family حسن (Cairo) is "ناطق بالعربية" (Egyptian, Arabic native).
- At least 2 distinct `غير ناطق بالعربية` student rows MUST appear on `admin/invoices.html` — anchored to two new sample students: **عبدالله رحمن** (Indonesian, Quran level 2, Riyadh-based) and **يوسف عبد الكريم** (American, Arabic L1 beginner, US-based, taught remotely). These two are added to the global student roster JUST for the admin/invoices.html demonstration; they do NOT appear on any student/parent surface.

**Alternatives considered**:
- **Option A — "محلي / مغترب"** (current draft, rejected): conflates residency with language.
- **Option C — "عربي / أجنبي"**: ethnic-framing ambiguity.
- **Option D — "طالب من العالم العربي / طالب دولي"**: too long for chips + per-row badges.

**Cross-doc references**: spec.md §Clarifications Q3; FR-061, FR-062, FR-065, FR-116; Key Entities §Student Type; data-model.md §E6; contracts/admin-invoices.md.

---

## R4. Q4 — "إنشاء حركة رصيد" CTA destination (resolved 2026-05-10)

**Decision**: The top-right "إنشاء حركة رصيد" primary button on `pages/admin/family-balances.html` routes to `pages/admin/create-manual-payment.html` in **balance-deposit mode**. The form's invoice select gains a sentinel option "— إيداع رصيد للعائلة بدون فاتورة محددة —" that hides the invoice requirement and exposes "إيداع رصيد" as the leading method option (visually grouped under an "إيداع للعائلة" subheading).

**Rationale**: Three convergent reasons.
1. **Eliminates the only `href="#"` exception** — SC-015 originally contained a documented exception for the FR-095 "envisioned modal" stub. Routing the CTA to a real page lets SC-015 mandate **zero `href="#"`** across the entire feature, tightening the Constitution Quality Gate 5 ("every navigation link points to a real existing HTML file").
2. **Operationally identical** — recording a balance deposit IS a money-in event from the academy's perspective; the manual-payment form already handles every other money-in event (invoice payments). Reusing the form avoids inventing an 11th page that would ship near-duplicate UI.
3. **Form complexity is bounded** — the form gains exactly one sentinel option in the invoice select + one "إيداع رصيد" option in the method select + one mode-aware caption near the Save button. The cascading-dropdown HTML structure is untouched; no JS state-change is required because the demo state is pre-rendered.

**Two operational modes** (contract: `contracts/admin-create-manual-payment.md`):
- **Invoice-payment mode** (default — entered via the persistent CTA on `admin/payments.html` OR the "Add payment" action on `admin/invoice-details.html`): family عائلة مؤمن + student عبد الرحمن + invoice INV-2026-0231 + amount 437.00 + method تحويل بنكي + date 2026-05-10 pre-filled. After-save caption points to `admin/payments.html` and the linked invoice.
- **Balance-deposit mode** (entered via the FR-095 CTA on `admin/family-balances.html`): family pre-selected (whichever family the admin clicked from), invoice = sentinel "— إيداع رصيد للعائلة بدون فاتورة محددة —", amount blank/zero default, method "إيداع رصيد", date 2026-05-10. After-save caption points to `admin/family-balances.html` and the chosen family's ledger.

**Alternatives considered**:
- **Option B — Keep the modal stub**: rejected — preserves the `href="#"` exception in SC-015, loses an opportunity to tighten Constitution Quality Gate 5.
- **Option C — Remove the CTA**: rejected — per-row action menu (View / Add credit / Deduct / Adjustment) covers row-level actions, but a top-level affordance is a usability convenience for admins onboarding a new family with an initial deposit (no row exists yet, so no row-action menu applies).

**Cross-doc references**: spec.md §Clarifications Q4; FR-095, FR-102, FR-103, FR-104, FR-109; SC-015; Assumptions §Out-of-scope deferrals (FR-095 removed from deferrals); contracts/admin-family-balances.md, contracts/admin-create-manual-payment.md.

---

## R5. Persona pinning + cross-spec continuity

**Decision**: The persona family is pinned identically to Specs 002-007. Full identity references are reused verbatim; finance-specific identifiers are newly issued in this spec.

| Field | Value | Source |
|-------|-------|--------|
| Student name | عبد الرحمن مؤمن | Spec 002 |
| Student initials avatar | ع.م | Spec 002 |
| Student grade | الصف السادس | Spec 002 |
| Student track | مسار القرآن الكريم — المستوى الثالث | Spec 002 |
| Student ID | **STD-2024-0817** | Spec 008 (new) |
| Sister name | سارة مؤمن | Spec 002 |
| Sister grade | الصف الثالث | Spec 002 |
| Sister status | يحتاج إلى دعم | Spec 002 |
| Parent name | ولي أمر الطالب عبد الرحمن | Spec 002 |
| Family ID | **FAM-2023-0211** | Spec 008 (new) |
| Primary teacher | الأستاذ أحمد بن عبد الله (Quran) | Spec 002 |
| Secondary teacher | الأستاذة منى سعد (Arabic) | Spec 002 |
| Islamic-Studies teacher | الأستاذ خالد العبدلي | Spec 002 |
| April canonical figures | 92% attendance / 88% homework / 88-100 monthly exam / 89-100 overall / "ممتاز" / `RPT-2026-04-Q03-007` | Spec 006 |
| Leaderboard rank | #6 in الترتيب العام / #2 in الأكثر تطوراً | Spec 007 (NOT surfaced in finance pages) |

**Newly named in this spec**:
- **AHMED.K** (موظف الاستقبال) — admin staff who recorded the 2026-04-12 Mada payment.
- **SARA.M** (موظفة المالية) — admin staff who recorded the 2026-04-25 bank transfer + the 2026-04-25 admin note.
- **نظام تلقائي** — the system actor for auto-applied balance events.

**Other sample families (newly named in admin/family-balances.html + admin/invoices.html)**:
- **عائلة الحارثي** (FAM-2022-0089) — 2 children نورة، خالد — 1,200 ريال — Saudi.
- **عائلة العتيبي** (FAM-2024-0156) — 1 child عبدالعزيز — 0.00 ريال (zero-balance demo) — Saudi.
- **عائلة المنصور** (FAM-2023-0312) — 3 children فهد، ريما، ليلى — 850 ريال — Saudi.
- **عائلة حسن** (FAM-2024-0427) — 2 children أحمد، فاطمة — 380 EGP — Egyptian.
- **عائلة Hosni** (FAM-2024-0511) — 1 child Yousuf — 1,540 EGP — Egyptian.
- **عبدالله رحمن** (Indonesian student, Quran L2, Riyadh-resident) — admin/invoices.html only — "غير ناطق بالعربية" pricing tier.
- **يوسف عبد الكريم** (American student, Arabic L1 beginner, US-resident) — admin/invoices.html only — "غير ناطق بالعربية" pricing tier.

**Rationale**: Reuses every persona attribute already established in prior specs to honor the constitutional cross-spec consistency rule. Only the IDs and finance-specific staff are newly issued — no academic figure is invented or contradicted.

**Cross-doc references**: data-model.md §E6 + §E7; every contract file in `contracts/`.

---

## R6. INV-2026-0184 anchor-invoice arithmetic

**Decision**: The anchor invoice INV-2026-0184 has the following line-item + financial-breakdown shape, locked across all surfaces (student invoice-details + admin invoice-details + parent invoices summary + persona payment-history):

| Field | Value |
|-------|-------|
| Invoice number | INV-2026-0184 |
| Issue date | 2026-04-01 |
| Due date | 2026-04-30 |
| Period | شهر أبريل 2026 |
| Line item | اشتراك دورة القرآن الكريم — المستوى الثالث (شهر أبريل 2026) |
| Item type | دورة كاملة |
| Quantity | 1 |
| Unit price | 380.00 ريال |
| Subtotal | 380.00 ريال |
| Discount | 0.00 ريال |
| VAT 15% | 57.00 ريال |
| Total | 437.00 ريال |
| Family-balance applied | 67.00 ريال (auto on 2026-04-30) |
| Manual paid (Mada + bank) | 370.00 ريال |
| Total paid | 437.00 ريال |
| Remaining | 0.00 ريال |
| Status | مدفوعة |
| Currency | ريال (SAR) |
| Tax number on footer | 312345678900003 |

**Three payment streams** (rendered in chronological order on both student- and admin-side invoice-details):

| # | Date | Method | Amount | Actor | Note |
|---|------|--------|--------|-------|------|
| 1 | 2026-04-12 | بطاقة مدى | 200.00 ريال | AHMED.K (موظف الاستقبال) | — |
| 2 | 2026-04-25 | تحويل بنكي | 170.00 ريال | SARA.M (موظفة المالية) | — |
| 3 | 2026-04-30 | تطبيق رصيد عائلي (تلقائي عند تاريخ الاستحقاق) | 67.00 ريال | نظام تلقائي | تلقائي pill rendered |

Sum = 200 + 170 + 67 = 437.00 ريال ✓ matches total.

**Math verification**: 380 × 1.15 = 437.00 (KSA VAT 15% on a 380 base). ✓

**Rationale**: Each surface MUST render byte-identical figures so the "two views, one entity" discipline holds; reviewers verify this by side-by-side comparison of student-side and admin-side invoice-details pages.

**Cross-doc references**: FR-024, FR-025, FR-070, FR-071, FR-074; data-model.md §E1 (Invoice schema) + §E2 (Payment schema); contracts/student-invoice-details.md, contracts/admin-invoice-details.md.

---

## R7. Family-balance ledger arithmetic (FAM-2023-0211 — عائلة مؤمن)

**Decision**: The persona's family carries a 450.00 ريال current balance. The 7-row balance-history table (sum-verified) is:

| # | Date | Type | Signed amount | By/For | Note | Running balance |
|---|------|------|---------------|--------|------|-----------------|
| 1 | 2026-02-10 | إيداع | +500.00 | بواسطة ولي الأمر | إيداع أولي للعائلة | 500.00 |
| 2 | 2026-03-25 | استخدام للفاتورة INV-2026-0137 | -100.00 | بواسطة عبد الرحمن | تسديد جزئي شهر مارس | 400.00 |
| 3 | 2026-04-08 | استرداد من فاتورة ملغاة INV-SES-2026-0156 | +60.00 | — | إلغاء حصة تعويضية | 460.00 |
| 4 | 2026-04-22 | تسوية | -10.00 | — | تسوية رسوم تحويل بنكي | 450.00 |
| 5 | 2026-04-30 | استخدام للفاتورة INV-2026-0184 | -67.00 | بواسطة عبد الرحمن | تطبيق تلقائي عند تاريخ الاستحقاق — أغلق المبلغ المتبقّي (تلقائي pill) | 383.00 |
| 6 | 2026-05-05 | إيداع | +200.00 | بواسطة ولي الأمر | إيداع لشهر مايو | 583.00 |
| 7 | 2026-05-08 | تسوية | -133.00 | بواسطة الإدارة | تعديل رصيد بناءً على طلب ولي الأمر | 450.00 |

Sum = 500 - 100 + 60 - 10 - 67 + 200 - 133 = **450.00 ريال** ✓ matches the hero card.

**4-tile sub-summary math**:
- إجمالي الإيداعات = 500 + 200 = **700.00 ريال** (2 deposits)
- إجمالي المُستخدَم = 100 + 67 = **167.00 ريال** (2 used-for-invoice)
- إجمالي المُستردّ = 60 = **60.00 ريال** (1 refund)
- إجمالي التسويات = -10 + -133 = **-143.00 ريال** (2 adjustments, net negative)

Sub-summary tiles MUST display all four amounts including the negative adjustment total (rendered as "-143.00 ريال" with red-tinted minus sign).

**Cross-doc references**: FR-040, FR-041, FR-042, FR-043, FR-044, FR-045; data-model.md §E3 (FamilyBalanceTransaction schema); contracts/parent-family-balance.md.

---

## R8. Persona's payment-history math (student/payment-history.html — 7 rows)

**Decision**: The persona's payment table contains exactly 7 rows in this chronological order (most recent first per typical UX convention):

| # | Invoice | Item | Issued | Due | Subtotal | VAT 15% | Total | Paid | Method | Status |
|---|---------|------|--------|-----|----------|---------|-------|------|--------|--------|
| 1 | INV-2026-0231 | اشتراك مايو 2026 (دورة كاملة) | 2026-05-01 | 2026-05-15 | 380.00 | 57.00 | 437.00 | 0.00 | — | غير مدفوعة |
| 2 | INV-SES-2026-0212 | حصة مراجعة قبل الاختبار — 28 أبريل (حصة مباشرة) | 2026-04-26 | 2026-04-28 | 60.00 | 9.00 | 69.00 | 69.00 | إيصال بنكي | تحت المراجعة |
| 3 | INV-SES-2026-0205 | حصة فردية للتأسيس النحوي — 25 أبريل (حصة خاصة) | 2026-04-22 | 2026-05-20 | 100.00 | 15.00 | 115.00 | 60.00 | بطاقة مدى | مدفوعة جزئياً |
| 4 | INV-2026-0184 | اشتراك أبريل 2026 (دورة كاملة) | 2026-04-01 | 2026-04-30 | 380.00 | 57.00 | 437.00 | 437.00 | بطاقة + تحويل + رصيد | مدفوعة |
| 5 | INV-2026-0137 | اشتراك مارس 2026 (دورة كاملة) | 2026-03-01 | 2026-03-15 | 380.00 | 57.00 | 437.00 | 437.00 | بطاقة + رصيد | مدفوعة |
| 6 | INV-SES-2026-0156 | حصة تعويضية فردية — 12 مارس (حصة خاصة) | 2026-03-08 | 2026-03-12 | 60.00 | 9.00 | 69.00 | 0.00 | — | ملغاة |
| 7 | INV-SES-2026-0098 | حصة فردية لمراجعة الأخطاء — 18 فبراير (حصة خاصة) | 2026-02-15 | 2026-02-25 | 80.00 | 12.00 | 92.00 | 0.00 | — | متأخّرة |

**Math verification**:
- Total paid (sum of paid amounts on Paid + Partially-Paid rows, excluding Under Review per SC-005) = 437 + 437 + 60 = **934.00 ريال** ✓ matches FR-010 summary card 1.
- Unpaid invoices count (Unpaid + Overdue) = INV-2026-0231 (Unpaid) + INV-SES-2026-0098 (Overdue) = **2** ✓ matches FR-010 summary card 2.
- Upcoming payment = INV-2026-0231, **437.00 ريال due 2026-05-15** ✓ matches FR-010 summary card 3.
- Family balance available = **450.00 ريال** (cross-references R7 hero card) ✓ matches FR-010 summary card 4.
- Per-row VAT correctness: 380 × 0.15 = 57 ✓; 60 × 0.15 = 9 ✓; 100 × 0.15 = 15 ✓; 80 × 0.15 = 12 ✓.

**Status mix** demonstrates all 6 supported statuses without contrivance: Paid (×2 — INV-2026-0184, INV-2026-0137), Partially Paid (×1 — INV-SES-2026-0205), Under Review (×1 — INV-SES-2026-0212), Unpaid (×1 — INV-2026-0231), Cancelled (×1 — INV-SES-2026-0156), Overdue (×1 — INV-SES-2026-0098). 7 rows / 6 unique statuses.

**Cross-doc references**: FR-010, FR-011, FR-012, FR-013, FR-014, FR-015, FR-016, FR-114; data-model.md §E1 (Invoice schema with anchor-row table); contracts/student-payment-history.md.

---

## R9. Sister Sara's parent-side invoice rows (parent/invoices.html)

**Decision**: Sara's invoices on `pages/parent/invoices.html` (≥ 4 rows + persona's rows totalling ≥ 8 rows on the table). Sara's curriculum: Arabic L1 + Islamic Studies (per Spec 002 — "يحتاج إلى دعم" status).

| # | Invoice | Owner | Item | Issued | Due | Total | Paid | Status | CTA |
|---|---------|-------|------|--------|-----|-------|------|--------|-----|
| 1 | INV-2026-0107 | سارة مؤمن | اشتراك فبراير 2026 (Arabic + Islamic Studies) | 2026-02-01 | 2026-02-15 | 322.00 | 322.00 | مدفوعة | عرض الفاتورة |
| 2 | INV-2026-0145 | سارة مؤمن | اشتراك مارس 2026 | 2026-03-01 | 2026-03-15 | 322.00 | 322.00 | مدفوعة | عرض الفاتورة |
| 3 | INV-2026-0188 | سارة مؤمن | اشتراك أبريل 2026 | 2026-04-01 | 2026-04-30 | 322.00 | 0.00 | متأخّرة (manual since balance was insufficient on due date — see R10) | ادفع الآن |
| 4 | INV-2026-0234 | سارة مؤمن | اشتراك مايو 2026 | 2026-05-01 | 2026-05-20 | 322.00 | 0.00 | غير مدفوعة | ادفع الآن |

**Sara's monthly subscription math**: 280.00 ريال base × 1.15 VAT = 322.00 ريال total. (Different from عبد الرحمن's 437 because Sara's curriculum has fewer hours.)

**Why Sara's INV-2026-0188 is overdue, not auto-closed**: On 2026-04-30 the family balance was 450 ريال. The auto-application policy applies up to the remaining amount of EACH overdue invoice individually, in chronological order of due date. On 2026-04-30 both INV-2026-0184 (67 remaining) and INV-2026-0188 (322 remaining) were due. Auto-application order: INV-2026-0184 first (smaller earlier-issued invoice) — applies 67, balance drops from 450 to 383. INV-2026-0188 next — but the policy is "apply up to the remaining if and only if the balance fully covers the remaining amount" (atomic-close policy, not partial-close). 383 < 322 would close it, BUT the academy's clarification policy is that auto-application ONLY closes invoices fully — it does not partially apply. (This sub-rule is documented as **R9a** below to keep the rule explicit; it explains why Sara's invoice stays Overdue while عبد الرحمن's closes.)

**R9a — Auto-application sub-rule**: Auto-application closes invoices **only if the entire remaining amount can be covered**. If the family balance is insufficient, the invoice flips to "متأخّرة" / "غير مدفوعة" (depending on whether the due date has passed) and the balance is left untouched. Manual application via admin/invoice-details "تطبيق رصيد العائلة" action remains available (FR-075).

**Combined parent table** = Sara's 4 rows + persona's relevant rows from R8 (the persona's invoices visible to the parent: INV-2026-0184 Paid, INV-2026-0231 Unpaid, INV-SES-2026-0205 Partially Paid, INV-SES-2026-0212 Under Review). Total parent table: **≥ 8 rows** spanning both children, satisfying FR-032.

**Cross-doc references**: FR-032, FR-033; data-model.md §E1 (Sara's row-set + auto-application sub-rule); contracts/parent-invoices.md.

---

## R10. Multi-currency demonstration scope

**Decision**: SAR is the primary currency on all student/parent surfaces. EGP is demonstrated on **three** independent admin surfaces:

| Surface | EGP demonstration |
|---------|-------------------|
| `pages/admin/payments.html` | ≥ 1 EGP-denominated payment row attributed to عائلة حسن (Cairo). Row: "PAY-2026-EG-0042" / أحمد حسن / عائلة حسن / 1,710 EGP / تحويل بنكي / مدفوعة / 2026-05-03 / INV-EG-2026-0019 / view." |
| `pages/admin/family-balances.html` | 2 rows in EGP (عائلة حسن 380 EGP + عائلة Hosni 1,540 EGP) plus a separate "إجمالي الرصيد بالجنيه" summary tile that NEVER mixes with the SAR tile. |
| `pages/admin/tax-settings.html` | The example-invoice preview's Egypt card (1500 + 14% VAT = 1,710 EGP) renders side-by-side with the KSA card. |

**Rule — currency labels**:
- SAR is rendered as the Arabic word "ريال" (NOT "ر.س" / NOT "SAR" / NOT "$") — matches the constitutional convention.
- EGP is rendered as the Latin code "EGP" (NOT "ج.م" / NOT "£") — explicit shorthand to disambiguate from SAR readers reading Arabic-only.
- No surface ever mixes SAR and EGP into a single sum.

**Cross-doc references**: FR-053, FR-054, FR-086, FR-093, FR-115, FR-116; SC-007, SC-009; data-model.md §E2 (Payment schema); contracts/admin-payments.md, contracts/admin-family-balances.md, contracts/admin-tax-settings.md.

---

## R11. VAT-line ubiquity rule

**Decision**: Every invoice rendered on every page MUST display a separate VAT line. The VAT line MUST contain (a) the percentage explicitly written ("ضريبة القيمة المضافة 15%" or "(15%)" inline), (b) the VAT amount in the invoice's currency, and (c) optionally the tax-registration number (mandatory on full invoice-detail surfaces; optional on summary tables where space is constrained).

**Forbidden patterns**:
- "السعر شامل ضريبة القيمة المضافة" without a separate VAT line in the breakdown (this is a footer-note pattern; on the breakdown itself the VAT MUST be a separate line).
- "Total: 437.00 ريال (شامل الضريبة)" without breakdown — collapses VAT into the total, violates FR-111.

**Sanctioned patterns** (reused across every invoice surface):
- Breakdown line: "ضريبة القيمة المضافة (15%) — 57.00 ريال"
- Footer note (in addition, not instead): "السعر شامل ضريبة القيمة المضافة. الرقم الضريبي: 312345678900003."

**Egypt variant** for tax-settings preview only:
- "ضريبة القيمة المضافة (14%) — 210.00 EGP"

**Cross-doc references**: FR-024, FR-073, FR-086, FR-111; SC-006; contracts/student-invoice-details.md, contracts/admin-invoice-details.md, contracts/admin-tax-settings.md.

---

## R12. Status badge vocabulary (canonical)

**Decision**: All 10 pages MUST use this badge vocabulary verbatim. Each badge pairs a color/tone with a textual label and (where space permits) a small icon — color is never the sole indicator.

| Status | Label (canonical) | Tone | Icon | Used on |
|--------|-------------------|------|------|---------|
| Paid | مدفوعة | success-100 (green) | check-circle | invoice rows, payment rows |
| Unpaid | غير مدفوعة | warning-50 (amber) | clock | invoice rows |
| Partially Paid | مدفوعة جزئياً | warning-100 (deeper amber) | pie-chart-half | invoice rows |
| Overdue | متأخّرة | danger-100 (red) | alert-triangle | invoice rows; pairs with "متأخّر منذ N يوم" duration text |
| Cancelled | ملغاة | neutral-200 (gray) | x-circle | invoice rows |
| Under Review | تحت المراجعة | info-100 (blue) | clipboard-check | invoice rows, payment rows; pairs with optional "نراجع خلال X ساعة" tooltip |
| Auto-applied | تلقائي | info-50 (light blue) | bolt / lightning | balance-history rows, payment-stream entries |

**Balance-transaction-type badges** (parent/family-balance.html row-type column):

| Type | Label | Tone | Icon |
|------|-------|------|------|
| Deposit | إيداع | success-50 | arrow-down-circle |
| Used-for-Invoice | استخدام للفاتورة | warning-50 | arrow-up-circle |
| Refund | استرداد | success-100 | rotate-ccw |
| Adjustment | تسوية | neutral-100 | settings-2 |

**Currency badges** (admin tables):

| Currency | Label | Tone | Notes |
|----------|-------|------|-------|
| SAR | ريال | neutral-200 with primary-700 text | Arabic word; primary currency |
| EGP | EGP | info-50 with info-700 text | Latin code; secondary currency |

**Student-type badges** (admin/invoices.html row "نوع الطالب" column):

| Type | Label | Tone |
|------|-------|------|
| Arabic-speaking | ناطق بالعربية | neutral-100 / muted |
| Non-Arabic-speaking | غير ناطق بالعربية | info-50 / distinct from Arabic-speaking |

**Rationale**: Constitution Principle IV mandates a consistent badge vocabulary across pages; this table is the spec's contribution to the cross-spec badge canon. The status / transaction-type / currency / student-type badges together total **17 distinct visual states** rendered across the 10 pages — sufficient diversity to validate the design system without bloating the visual surface.

**Cross-doc references**: FR-011, FR-021 (constitutional badge vocabulary), FR-041, FR-042, FR-053, FR-061, FR-065, FR-093; data-model.md (each entity references the relevant badge subset).

---

## R13. Sidebar reuse + active-entry mapping

**Decision**: The 10 new pages embed sidebars that MUST be byte-identical to the prior-spec baselines except for the active-entry indicator. The active entry per page:

| Page | Sidebar source (byte-identical) | Active entry |
|------|----------------------------------|--------------|
| `pages/student/payment-history.html` | Spec 002/003/.../007 student sidebar (e.g., from `pages/student/dashboard.html`) | Payment History |
| `pages/student/invoice-details.html` | Same | Payment History (deep-read of same surface) |
| `pages/parent/invoices.html` | Spec 002/006 parent sidebar (e.g., from `pages/parent/dashboard.html`) | Invoices |
| `pages/parent/family-balance.html` | Same | Family Balance |
| `pages/admin/payments.html` | Spec 005/007 admin sidebar (e.g., from `pages/admin/dashboard.html`) | Payments |
| `pages/admin/invoices.html` | Same | Invoices |
| `pages/admin/invoice-details.html` | Same | Invoices (deep-read of same surface) |
| `pages/admin/tax-settings.html` | Same | Tax Settings |
| `pages/admin/family-balances.html` | Same | Family Balances |
| `pages/admin/create-manual-payment.html` | Same | Payments (sub-flow) |

**Active-entry indicator**: `aria-current="page"` + the project's `is-active` class on the appropriate `<a>` (matches Spec 002-007 convention).

**Cross-doc references**: FR-002, FR-003, FR-004; data-model.md §E0 (Shell schema); every contract file.

---

## R14. JavaScript scope — zero new code

**Decision**: No file under `assets/js/` is touched by this feature. The existing `assets/js/main.js` (68 lines, baseline since Spec 001) is the only JavaScript shipped. The feature uses:
- Existing **sidebar drawer** handler (mobile collapse).
- Existing **dropdown** handler (admin-table action menus, status-filter dropdowns, payment-method dropdown on create-manual-payment.html, country dropdown on tax-settings.html).
- No new tabs / modals / accordions are introduced — none of the 10 pages requires interaction state beyond what the four existing handlers already provide.

**Specific non-handlers** (visually rendered without JS state):
- Admin/invoices.html master-checkbox + bulk-action dropdown — visually rendered, no JS toggle (the `aria-disabled="true"` styling carries the "no rows selected" state).
- create-manual-payment.html cascading dropdowns — pre-rendered HTML reflects the demo state; no filter logic runs.
- tax-settings.html toggle (Tax enabled) — visually rendered in the ON state with a CSS pseudo-class; no toggle handler.
- admin/invoice-details.html action buttons — `<button type="button">` with no click handlers.
- Receipt-upload affordance on create-manual-payment.html — visual drop-zone aesthetic (`<div>` with dashed border), no `<input type="file">` change handler.

**CSS rebuild** (Polish phase): one-time `npm run build:css` to pick up any new Tailwind utilities. Expected delta ≤ 8 KB; final size ≤ 80 KB ceiling.

**Cross-doc references**: Constitution Principle V; FR-004; SC-013, SC-014; quickstart.md §1 (Build & Open).

---

## R15. Two-views-one-entity discipline (anchor invoice INV-2026-0184)

**Decision**: The same invoice INV-2026-0184 renders on TWO pages — `pages/student/invoice-details.html` (student lens) and `pages/admin/invoice-details.html` (admin lens) — with **byte-identical financial figures** but **different surrounding panels**:

| Element | Student lens | Admin lens |
|---------|--------------|------------|
| Invoice number | ✓ | ✓ |
| Issue + due dates | ✓ | ✓ |
| Status badge | ✓ مدفوعة | ✓ مدفوعة |
| Student info | ✓ | ✓ |
| Family info | ✓ | ✓ |
| Line items table | ✓ + 4-item-type reference panel | ✓ |
| 8-line financial breakdown | ✓ | ✓ |
| 3-stream payment-method panel | ✓ | ✓ (within timeline) |
| Two visual download buttons | ✓ | NO (different action set) |
| Payment-records timeline (with admin actor names) | NO | ✓ |
| Family-balance usage panel (cross-link to family-balances.html) | NO | ✓ |
| Admin-notes panel (≥ 2 entries) | NO | ✓ |
| 5-button action bar (Mark/Add/Apply/Download/Cancel) | NO | ✓ |

**Verification rule**: The numeric figures (subtotal 380, discount 0, VAT 57, balance-used 67, paid 437, remaining 0, total 437) MUST be byte-identical on the two pages. A reviewer running `diff` (or visually side-by-side comparison) on the two financial-breakdown panels MUST find the same numbers in the same order.

**Cross-doc references**: FR-020 → FR-027 (student lens); FR-070 → FR-075 (admin lens); SC-003; contracts/student-invoice-details.md, contracts/admin-invoice-details.md.

---

## R16. Cross-spec reconciliation rules

**Decision**: This spec is a "additive-only, no-prior-spec-edits" spec. The following cross-spec rules MUST hold:

- **Spec 002 persona**: عبد الرحمن مؤمن / سارة مؤمن / parent / 3 teachers reused verbatim. No grade / track / status / name change.
- **Spec 003 course/session anchors**: line items on `pages/student/invoice-details.html` link to `pages/student/course-details.html` (full-course line) — preserves the cross-page link discipline.
- **Spec 004 homework anchors**: NOT referenced. Finance pages do not surface homework.
- **Spec 005 achievements anchors**: NOT referenced.
- **Spec 006 academic figures**: 92% attendance / 88% homework / 88-100 monthly exam / 89-100 overall / "ممتاز" / `RPT-2026-04-Q03-007` MUST NOT be contradicted on any of the 10 new pages. Finance pages do not surface academic figures (no attendance%, no exam scores, no overall band).
- **Spec 007 leaderboard anchors**: rank #6 (general) / #2 (most-improved) NOT referenced. Finance pages do not surface ranks.
- **Spec 007 calendar anchor "today = 9 مايو 2026"**: this spec advances by 1 day to **2026-05-10** to absorb the 2026-05-08 admin-adjustment row + 2026-05-05 deposit row + 2026-05-10 manual-payment-form default. The 1-day advance does NOT contradict Spec 007 — Spec 007 doesn't lock 9 مايو as the only allowed "today"; it pinned 9 مايو for the calendar event-list demonstration. Each spec MAY pick its own "today" anchor as long as financial dates remain consistent within the spec.

**Validation grep** (during Polish phase):
```bash
# Spec 006 academic figures untouched — these strings should NOT appear in any new spec-008 file:
grep -l 'RPT-2026-04-Q03-007\|92%\|88-100\|89-100\|ممتاز' pages/student/payment-history.html pages/student/invoice-details.html pages/parent/invoices.html pages/parent/family-balance.html pages/admin/payments.html pages/admin/invoices.html pages/admin/invoice-details.html pages/admin/tax-settings.html pages/admin/family-balances.html pages/admin/create-manual-payment.html
# Expected: no matches.

# Persona name + family ID present on owner-pages only:
grep -l 'عبد الرحمن مؤمن' pages/student/payment-history.html pages/student/invoice-details.html pages/parent/invoices.html pages/parent/family-balance.html pages/admin/invoice-details.html pages/admin/create-manual-payment.html
# Expected: 6 matches (those 6 pages all reference the persona).
```

**Cross-doc references**: spec.md §Dependencies; SC-012 (Spec 006/007 anchors not contradicted); quickstart.md §3 (DoD validation).

---

## R17. Sample-data anchor — admin/payments.html (≥ 10 rows)

**Decision**: 10 anchor rows for the admin payments table, demonstrating ≥ 4 statuses, ≥ 6 methods, ≥ 1 EGP, ≥ 1 family-balance method, multiple families.

| # | Payment ID | Student | Family | Amount | Cur | Method | Status | Date | Linked invoice |
|---|-----------|---------|--------|--------|-----|--------|--------|------|----------------|
| 1 | PAY-2026-0512 | عبد الرحمن مؤمن | عائلة مؤمن | 200.00 | ريال | بطاقة مدى | مدفوعة | 2026-04-12 | INV-2026-0184 |
| 2 | PAY-2026-0537 | عبد الرحمن مؤمن | عائلة مؤمن | 170.00 | ريال | تحويل بنكي | مدفوعة | 2026-04-25 | INV-2026-0184 |
| 3 | PAY-2026-0541 | عبد الرحمن مؤمن | عائلة مؤمن | 67.00 | ريال | رصيد العائلة (تلقائي) | مدفوعة | 2026-04-30 | INV-2026-0184 |
| 4 | PAY-2026-0548 | عبد الرحمن مؤمن | عائلة مؤمن | 60.00 | ريال | بطاقة مدى | مدفوعة | 2026-04-30 | INV-SES-2026-0205 |
| 5 | PAY-2026-0552 | عبد الرحمن مؤمن | عائلة مؤمن | 69.00 | ريال | إيصال بنكي يدوي | تحت المراجعة | 2026-04-26 | INV-SES-2026-0212 |
| 6 | PAY-2026-0561 | فهد المنصور | عائلة المنصور | 437.00 | ريال | فيزا/ماستركارد | فاشل | 2026-05-02 | INV-2026-0227 |
| 7 | PAY-2026-0568 | نورة الحارثي | عائلة الحارثي | 322.00 | ريال | STC Pay | مدفوعة | 2026-05-04 | INV-2026-0218 |
| 8 | PAY-2026-EG-0042 | أحمد حسن | عائلة حسن | 1,710.00 | EGP | تحويل بنكي | مدفوعة | 2026-05-03 | INV-EG-2026-0019 |
| 9 | PAY-2026-0573 | عبدالله رحمن | — (individual student) | 540.00 | ريال | بطاقة مدى | مستردّ | 2026-05-06 | INV-2026-0220 |
| 10 | PAY-2026-0581 | ولي أمر الطالب عبد الرحمن | عائلة مؤمن | 200.00 | ريال | تحويل بنكي | مدفوعة | 2026-05-05 | — (إيداع رصيد للعائلة) |

Row 10 demonstrates the balance-deposit mode (no linked invoice → recorded as a balance-deposit event per Q4).

**Cross-doc references**: FR-052, FR-053, FR-054, FR-115; data-model.md §E2; contracts/admin-payments.md.

---

## R18. Sample-data anchor — admin/invoices.html (≥ 12 rows)

**Decision**: 12 anchor rows for the admin invoices table, spanning all 6 statuses, both student types, both currencies, all 4 item types.

| # | Invoice | Student | Type | Item type | Total | Currency | Status |
|---|---------|---------|------|-----------|-------|----------|--------|
| 1 | INV-2026-0184 | عبد الرحمن مؤمن | ناطق بالعربية | دورة كاملة | 437.00 | ريال | مدفوعة |
| 2 | INV-2026-0231 | عبد الرحمن مؤمن | ناطق بالعربية | دورة كاملة | 437.00 | ريال | غير مدفوعة |
| 3 | INV-2026-0188 | سارة مؤمن | ناطق بالعربية | دورة كاملة | 322.00 | ريال | متأخّرة |
| 4 | INV-SES-2026-0205 | عبد الرحمن مؤمن | ناطق بالعربية | حصة خاصة | 115.00 | ريال | مدفوعة جزئياً |
| 5 | INV-SES-2026-0212 | عبد الرحمن مؤمن | ناطق بالعربية | حصة مباشرة | 69.00 | ريال | تحت المراجعة |
| 6 | INV-SES-2026-0156 | عبد الرحمن مؤمن | ناطق بالعربية | حصة خاصة | 69.00 | ريال | ملغاة |
| 7 | INV-2026-0227 | فهد المنصور | ناطق بالعربية | دورة كاملة | 437.00 | ريال | غير مدفوعة |
| 8 | INV-GR-2026-0033 | ريما المنصور | ناطق بالعربية | حصة جماعية | 51.75 (45 + 6.75 VAT) | ريال | مدفوعة |
| 9 | INV-REG-2026-0019 | فاطمة حسن | ناطق بالعربية | رسوم تسجيل | 350.00 | ريال | مدفوعة (no VAT — registration fee tax-exempt per FR-083) |
| 10 | INV-EG-2026-0019 | أحمد حسن | ناطق بالعربية | دورة كاملة | 1,710.00 (1500 + 14% VAT) | EGP | مدفوعة |
| 11 | INV-EG-2026-0024 | Yousuf Hosni | غير ناطق بالعربية | دورة كاملة | 2,394.00 (2100 + 14% VAT) | EGP | غير مدفوعة |
| 12 | INV-2026-0220 | عبدالله رحمن | غير ناطق بالعربية | حصة خاصة | 540.00 | ريال | مستردّ (cancelled-then-refunded) |

**Item-type coverage check**: دورة كاملة (rows 1, 2, 3, 7, 10, 11) ✓ / حصة خاصة (rows 4, 6, 12) ✓ / حصة مباشرة (row 5) ✓ / حصة جماعية (row 8) ✓ / رسوم تسجيل (row 9) ✓.

**Status coverage check**: مدفوعة (rows 1, 8, 9, 10) ✓ / غير مدفوعة (rows 2, 7, 11) ✓ / متأخّرة (row 3) ✓ / مدفوعة جزئياً (row 4) ✓ / تحت المراجعة (row 5) ✓ / ملغاة (row 6) ✓ / مستردّ (row 12) ✓ — 7th status mentioned in the spec's payment-status entity for completeness.

**Student-type coverage check**: ناطق بالعربية (rows 1-10) ✓ / غير ناطق بالعربية (rows 11, 12) ✓ → ≥ 2 rows of the second type per FR-062.

**Currency coverage check**: ريال (rows 1-9, 12) ✓ / EGP (rows 10, 11) ✓ → ≥ 2 EGP rows per FR-062.

**Cross-doc references**: FR-061, FR-062, FR-063, FR-064, FR-065, FR-115; data-model.md §E1 §E6; contracts/admin-invoices.md.

---

## R19. Tax-settings example-invoice math

**Decision**: The tax-settings.html example-invoice preview renders TWO side-by-side cards. Both demonstrate the same line-item shape (a course subscription) but with different country / VAT-rate / currency / total figures.

**KSA card** (titled "مثال — المملكة العربية السعودية، 15%"):
- Line: اشتراك دورة — مستوى ثالث (شهر مايو 2026)
- Subtotal: 380.00 ريال
- VAT 15%: 57.00 ريال
- Total: **437.00 ريال**
- Tax number: 312345678900003 (15-digit Saudi format)

**Egypt card** (titled "مثال بديل — جمهورية مصر العربية، 14%"):
- Line: اشتراك دورة — مستوى متقدم (شهر مايو 2026)
- Subtotal: 1,500.00 EGP
- VAT 14%: 210.00 EGP
- Total: **1,710.00 EGP**
- Tax number format hint: 9-digit Egyptian format (sample: 200-456-789)

**Math verification**: 380 × 1.15 = 437.00 ✓; 1,500 × 1.14 = 1,710.00 ✓.

**Cross-doc references**: FR-080, FR-081, FR-082, FR-083, FR-084, FR-085, FR-086, FR-087, FR-088; contracts/admin-tax-settings.md.

---

## R20. Existing prior-spec sidebar verification

**Decision**: A grep audit before authoring confirmed that **all six target file paths** in this spec's FR-001 are already pointed-to by sidebars in pages from Specs 001-007:

```
$ grep -h -o 'href="[^"]*\(payment\|invoice\|balance\|payments\|invoices\|tax-settings\|family-balance\)[^"]*"' pages/*/*.html | sort -u
href="family-balance.html"
href="family-balances.html"
href="invoices.html"
href="payment-history.html"
href="payments.html"
href="tax-settings.html"
```

All 6 paths resolve cleanly to the new files this spec creates. **Zero prior-spec edits** are required for sidebar correctness — once the files exist, all existing sidebar links resolve.

**Verification during Polish phase**: a final `git status` check MUST show only the 11 expected files staged (10 new HTML pages + 1 rebuilt `assets/css/output.css`); no other files should appear in the diff.

**Cross-doc references**: FR-003, SC-004, SC-015; quickstart.md §3 DoD verification.
