# Phase 0 Research: Teacher Finance, Earnings, Advances & Salary Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-10

## Goals

Phase 0 resolves all NEEDS CLARIFICATION items, locks the cross-spec data anchors, sources the Arabic copy and badge vocabulary, and establishes the implementation contract for the 8 new pages. There were ZERO `[NEEDS CLARIFICATION]` markers in the post-clarification spec — the four `/speckit-clarify` Q&A pairs (Q1 modal feedback, Q2 bonus threshold, Q3 retroactivity callout, Q4 May bucket decomposition) cover every previously-ambiguous decision.

## Decisions

### D1 — Anchor teacher (dual-lens entity)

- **Decision**: الأستاذ أحمد بن عبد الله الزهراني (TCH-2024-0042) is the dual-lens anchor across `pages/teacher/settlement-details.html` and `pages/admin/teacher-settlement-details.html`. His April 2026 settlement (STL-2026-04-TCH-0042, status بانتظار الاعتماد) renders byte-identically on both surfaces.
- **Rationale**: Maximizes cross-spec continuity — he is the persona's primary Quran teacher (locked in Spec 002), the implicit subject of the 92% attendance figure (Spec 006), and the seller of the course-line on the Spec 008 anchor invoice INV-2026-0184. Choosing him aligns the teacher-finance narrative with the family-finance narrative shipped in Spec 008 — the academy's two finance halves now share a single human protagonist.
- **Alternatives considered**: (a) الأستاذة منى سعد — rejected because she does not appear on Spec 008's invoice line-items; (b) Brand-new teacher — rejected because it would dilute persona continuity and require introducing a new bank account, contract type, and historical settlements; (c) Multiple anchor teachers — rejected because the two-views-one-entity discipline (established in Spec 008) requires a single shared entity for byte-identical financial figures across surfaces.

### D2 — Anchor settlement state (April 2026 = بانتظار الاعتماد)

- **Decision**: The April 2026 settlement is rendered in **بانتظار الاعتماد** state on today's date (2026-05-10), with March 2026 in **مدفوعة** terminal state and May 2026 in **قيد التحصيل** in-progress state. Three states demonstrated on a single page (teacher/earnings.html earnings-history table).
- **Rationale**: A settlement in **بانتظار الاعتماد** activates the admin's «اعتماد التسوية» + «تعليم كمدفوعة» CTAs in their primary state — the page demonstrates the workflow LIVE rather than as a closed read-only artifact. The March-paid + April-pending + May-in-progress trio shows the full settlement-state ladder (مسودة implicit on May / بانتظار-الاعتماد on April / مدفوعة on March) on one surface. Q1's confirmation-modal clarification depends on this — the modals are most informative when the underlying state is "live", not "closed".
- **Alternatives considered**: (a) April fully paid — rejected because admin action buttons would be greyed-out, defeating the demo purpose; (b) April in مسودة (pre-review) — rejected because the «إضافة خصم -80» + «إضافة حافز +200» events on the timeline already imply admin review, so مسودة contradicts the timeline; (c) April rejected — rejected because rejected settlements are an exotic side-state, not the canonical demo of the workflow.

### D3 — Anchor settlement financial figures (no contradiction with prior specs)

- **Decision**: Anchor April 2026 net = **3,750.00 ريال**, computed from: 4 rate-bucket session earnings (24×30 + 16×60 + 8×50 + 4×100 = 2,480) + course-percentage earning (20% × 8,000 = 1,600) + bonus (+200) - manual deduction (-80) - advance deductions (-200 + -250 = -450). The 8,000-ريال April course-revenue figure for "دورة القرآن الكريم — المستوى الثالث" is a new demo number consistent with the course catalog established in Spec 003; no academic figure from Spec 006 (92% / 88% / 88-100 / 89-100 / RPT-2026-04-Q03-007 / "ممتاز") is contradicted. The 92% figure IS cited verbatim in the Q2 bonus-eligibility caption to anchor the bonus's cause-effect.
- **Rationale**: The eleven-line financial breakdown is internally consistent (gross 4,280 - deductions 80 - advances 450 = net 3,750); the four rate buckets sum to the session-earnings subtotal; the two advance-installment events on the settlement match the advance ledger arithmetic (600 + 600 + 1,000 = 2,200 received; 600 + 600 + 250 = 1,450 paid back; 1,000 - 250 = 750 remaining). All figures grep-validate against SC-005 (byte-identical across the two settlement-details pages) + SC-006 (advance arithmetic reconciles) + SC-012 (Spec 006 figures untouched).
- **Alternatives considered**: (a) Round figures (e.g., net 4,000 ريال flat) — rejected because round numbers without bucket-fidelity would not visualize the Arabic-vs-Foreign rate distinction; (b) Higher net (e.g., 5,000 ريال) — rejected because it would imply a higher course-revenue than what the academy's small Quran cohort would realistically generate.

### D4 — Q1 modal copy (3 confirmation modals)

- **Decision**: The three Q1 confirmation modals on `admin/teacher-settlement-details.html` carry exact copy:
  - «اعتماد التسوية» modal: title «تأكيد اعتماد تسوية أبريل 2026» + body «التسوية ستنتقل إلى حالة معتمدة — السداد المتوقّع 2026-05-15 عبر مصرف الراجحي إلى الحساب SA03********0042» + secondary caption «هذا عرض مرئي فقط — لن تُصدَر دفعة فعلية في الإصدار الحالي» + buttons «تأكيد الاعتماد» (success-tone primary) / «إلغاء» (neutral secondary).
  - «تعليم كمدفوعة» modal: title «تأكيد تسجيل الدفعة» + body «ستُسجَّل دفعة بمبلغ 3,750.00 ريال إلى الحساب SA03********0042 بتاريخ 2026-05-10 عبر مصرف الراجحي» + same visual-only caption + buttons «تأكيد التسجيل» / «إلغاء».
  - «إعادة فتح التسوية» modal: title «تأكيد إعادة فتح التسوية» + body «سيتم إعادة فتح التسوية وإلغاء أي اعتمادات سابقة — هذا الإجراء يُسجَّل في سجل الاعتماد ولا يمكن التراجع عنه دون موافقة المدير العام» + buttons «تأكيد الفتح» (danger-tone) / «إلغاء».
- **Rationale**: Each modal's projected post-action caption visualizes the cause-effect of the action without faking persistence. The danger-tone modal carries an explicit "لا يمكن التراجع" warning since «إعادة فتح» reverses an admin's prior approval. All three modals reuse the existing **`data-modal-open`** (on trigger button — value = modal element ID) + **`data-modal-close`** (on close button inside `<div role="dialog">`) attribute pattern wired in `assets/js/main.js` lines 36-44 since Spec 002 — zero new JS. Verified by reading the actual handler source: the trigger reads `e.target.closest('[data-modal-open]')` and resolves `document.getElementById(open.getAttribute('data-modal-open'))`, then removes the `hidden` class; the close handler reads `e.target.closest('[data-modal-close]')` and adds `hidden` to the closest `[role="dialog"]`.
- **Alternatives considered**: (a) Single shared modal with dynamic body — rejected because dynamic content requires JS state injection (forbidden by Constitution V); (b) No copy in modal body, just title + buttons — rejected because the projected post-action caption is the entire reason Q1 chose modals.

### D5 — Q2 bonus-threshold caption copy

- **Decision**: The «سياسة حافز التميز» caption appears directly below the bonus row on both settlement-details pages with the exact Arabic copy: «يُمنَح هذا الحافز عند تجاوز نسبة حضور الطلاب 90% خلال الشهر + تقييم إيجابي من المراقب الأكاديمي — المبلغ 200.00 ريال ثابت. تحقّق هذا الشرط في أبريل بنسبة حضور 92% (وفق التقرير `RPT-2026-04-Q03-007`).» On the admin-side page, an additional sub-caption reads: «هذه القاعدة موثّقة في سياسة الحوافز المعتمدة — لتعديل القاعدة، يُرجى التواصل مع المدير العام.»
- **Rationale**: The 92% citation creates a verifiable cross-spec link; the report ID `RPT-2026-04-Q03-007` (locked in Spec 006) anchors the trust narrative. The caption deliberately commits to a single threshold (90%) + a fixed amount (200) — not a tiered scale — to avoid overcommitting the academy to a compensation policy the user did not request. Future specs can refine without breaking the existing surface.
- **Alternatives considered**: (a) No caption — rejected by the Q2 clarification; (b) Tiered scale (e.g., 90% → 100; 95% → 200; 98% → 300) — rejected by Q2 because it overcommits; (c) Free-form text without citation — rejected because it would fail the trust-narrative gate.

### D6 — Q3 retroactivity callout placement

- **Decision**: The Q3 callout «تسري القاعدة على التسويات الجديدة فقط من تاريخ السريان — لا تُعدَّل التسويات السابقة أو المدفوعة أو المعتمدة. لتعديل تسوية مغلقة، يُرجى استخدام «إعادة فتح التسوية» في صفحة تفاصيل التسوية الإدارية.» renders as a permanent info-tone alert directly above the rule-form's «تاريخ السريان» picker (under RTL — to the right of the picker on desktop, above on mobile). The table footnote `* جميع القواعد تُطبَّق إلى الأمام من تاريخ السريان.` renders directly below the rules table in muted text.
- **Rationale**: Placing the callout adjacent to the date picker maximizes salience at the moment the admin is choosing the effective date — the admin reads the rule before committing the date choice. The table footnote gives the same rule a second residence at the table level for admins who scan the table without using the form. Mirrors Spec 008's FR-088 tax-policy regulatory-transparency pattern.
- **Alternatives considered**: (a) Tooltip on the date picker — rejected because tooltips are easily missed; (b) Modal on form-submit — rejected because it interrupts the admin's flow; (c) Single placement (callout OR footnote, not both) — rejected because the admin's path through the page differs (some users go form-first, others table-first).

### D7 — Q4 May running-tally decomposition

- **Decision**: The May 2026 row on `pages/teacher/earnings.html` decomposes the 9 sessions across the 4 rate buckets as: 5 ناطق-جماعية × 30.00 = 150.00 + 2 ناطق-خاصة × 60.00 = 120.00 + 1 غير-ناطق-جماعية × 50.00 = 50.00 + 1 غير-ناطق-خاصة × 100.00 = 100.00 = **420.00 ريال**. The earnings-history table May row carries the explicit caption «تفصيل: 5+2+1+1 جلسة عبر 4 أنواع».
- **Rationale**: The original ~720 ريال estimate was arithmetically inconsistent with the persona's blended rates (52 sessions / 2,480 ريال = 47.7 ريال per session × 9 = ~430). Revising to 420.00 ريال preserves bucket-fidelity even on partial-month rows — making the Arabic-vs-Foreign rate distinction visible across all visible months, not just closed ones. The 5/2/1/1 distribution is realistic (mostly Arabic-speaker group sessions with a handful of private + foreign sessions) and visually distinct from April's 24/16/8/4.
- **Alternatives considered**: (a) Aggregated single line «9 حصص ~720» — rejected by Q4; (b) Different decomposition with the same 9-session count (e.g., 4/3/1/1 = 120+180+50+100 = 450 ريال) — rejected because 5/2/1/1 produces a cleaner per-bucket-rate-asymmetry visual (Arabic-private dominates over Foreign-private); (c) Keep ~720 estimate without decomposition — rejected because it leaves the arithmetic broken.

### D8 — Multi-currency teacher (الأستاذة هبة عبد الفتاح)

- **Decision**: One Egyptian teacher الأستاذة هبة محمد عبد الفتاح (TCH-2024-0089, Cairo, عقد بالحصة, الجنيه المصري) appears on three admin surfaces (admin/teacher-finance.html row 6, admin/teacher-advances.html row 6, admin/teacher-salary-rules.html row 7). Her April 2026 figures: 40 sessions all-foreign, 4,200 EGP gross, 1 active advance ADV-2026-EG-0007 (1,000 EGP / 4 installments, 250 deducted in April), net 3,950 EGP, status معتمدة 2026-05-09. Her salary rule has only foreign-rate cells (45 EGP group / 105 EGP private); the Arabic-rate cells render as «—».
- **Rationale**: Mirrors Spec 008's three-surface multi-currency demonstration (admin/payments + admin/family-balances + admin/tax-settings). One Egyptian teacher is enough to prove the multi-currency rendering without flooding the demo data; the three-surface coverage proves the pattern generalizes across all admin pages.
- **Alternatives considered**: (a) Two Egyptian teachers — rejected because it duplicates the demo signal without adding fidelity; (b) Zero Egyptian teachers (SAR-only) — rejected because it contradicts Constitution VI's multi-currency rule and would regress from Spec 008; (c) Egyptian teacher on teacher-side pages too — rejected because the dual-lens settlement-details anchor is locked to الأستاذ أحمد (D1), and ramping up a second teacher-side persona would inflate scope beyond 8 pages.

### D9 — Salary-rule-mechanism coverage (8 rules across 4 mechanisms)

- **Decision**: 8 salary rules are seeded on admin/teacher-salary-rules.html demonstrating all 4 rate mechanisms:
  - Rule 1 (الأستاذ أحمد — قرآن المستوى 3): 4 per-session + 20% course → demonstrates per-session + course-percentage combined
  - Rule 2 (الأستاذ أحمد — قرآن المستوى 4): 4 per-session + 20% course → demonstrates rate variance across courses for the same teacher
  - Rule 3 (الأستاذة منى — لغة عربية): 4 per-session + 18% course → demonstrates a different teacher's per-session+percentage rule
  - Rule 4 (الأستاذ خالد — دراسات إسلامية): 4 per-session + 15% course → demonstrates a third teacher's per-session+percentage rule
  - Rule 5 (الأستاذة فاطمة — رياضيات): 4 per-session only (no course-%, no fixed) → demonstrates per-session-only rule
  - Rule 6 (الأستاذ يوسف — إنجليزية للمدارس): 4 per-session + **1,200 ريال شهرياً ثابت** → demonstrates the fixed-monthly-amount mechanism (the only rule with non-zero fixed amount)
  - Rule 7 (الأستاذة هبة — إنجليزية لغير الناطقين): 2 per-session (foreign only) in EGP → demonstrates EGP-denominated rule + asymmetric-students rule
  - Rule 8 (الأستاذة منى — إملاء عربي متقدّم — موقوفة): 4 per-session + 18% — demonstrates the **موقوفة** state with «إعادة تفعيل» CTA
- **Rationale**: Together the 8 rules cover (a) all 4 rate mechanisms (FR-091 + SC-002 grep-validation), (b) both currencies (FR-092), (c) both rate states (نشطة on rules 1-7, موقوفة on rule 8), (d) all 6 teachers in the roster.
- **Alternatives considered**: (a) Fewer rules (e.g., 6 — one per teacher) — rejected because it cannot demonstrate the rate-variance-across-courses pattern (Rule 1 vs Rule 2 for الأستاذ أحمد); (b) More rules (e.g., 12 — multiple courses per teacher) — rejected because it bloats the table without adding mechanism coverage.

### D10 — Calendar today anchor (carried forward 2026-05-10)

- **Decision**: Today's date in the spec is **2026-05-10** — carried forward from Spec 008 unchanged (Spec 007 was 9 مايو 2026; Spec 008 advanced to 10 مايو 2026 to absorb the admin-adjustment row + manual-payment-form default; Spec 009 has no need to advance further).
- **Rationale**: Calendar continuity. The May running-tally decomposition (Q4) uses the 1-10 May session count realistically (~9 sessions in 10 days). The April settlement timeline uses 2026-05-01 (creation), 2026-05-02 (admin adjustments), 2026-05-03 (مراجعة AHMED.K), 2026-05-09 (notes), 2026-05-10 (pending — today). The expected-approval date 2026-05-12 and expected-payment date 2026-05-15 are 2 and 5 days in the future relative to today.
- **Alternatives considered**: (a) Advance to 2026-05-15 (post-payment) — rejected because the spec explicitly chose بانتظار-الاعتماد state over closed state (D2); (b) Roll back to 2026-05-08 — rejected because it contradicts Spec 008's anchor.

### D11 — Persona name continuity (3 prior teachers + 3 new)

- **Decision**: The 6-teacher roster comprises:
  - Carried over from Spec 002: الأستاذ أحمد بن عبد الله (TCH-2024-0042 — قرآن — anchor), الأستاذة منى سعد (TCH-2024-0051 — لغة عربية), الأستاذ خالد العبدلي (TCH-2024-0067 — دراسات إسلامية)
  - Newly introduced in Spec 009: الأستاذة فاطمة الزهراني (TCH-2024-0073 — رياضيات), الأستاذ يوسف القحطاني (TCH-2024-0078 — لغة إنجليزية للمدارس), الأستاذة هبة محمد عبد الفتاح (TCH-2024-0089 — إنجليزية لغير الناطقين, Cairo, EGP)
- **Rationale**: Three prior names preserve cross-spec continuity; three new names round out the demo to 6 teachers (enough for the salary-rules table's mechanism coverage in D9 and the EGP demonstration in D8). The new names are realistic Saudi/Egyptian surnames consistent with prior-spec naming conventions.
- **Alternatives considered**: (a) Reuse only Spec 002 teachers (3-teacher roster) — rejected because 3 teachers cannot demonstrate the four rate mechanisms + EGP coverage; (b) All-new teachers — rejected because it breaks persona continuity with Spec 002.

### D12 — Settlement state ladder copy (5 states)

- **Decision**: Five settlement statuses with these exact Arabic labels: مسودة (Draft, system-generated, neutral), بانتظار الاعتماد (Pending Approval, info-tone), معتمدة (Approved, success-tone), مدفوعة (Paid, success-tone solid), مرفوضة (Rejected, danger-tone). The April anchor uses بانتظار الاعتماد; March + الأستاذ خالد April use مدفوعة; الأستاذة منى + الأستاذة هبة April use معتمدة. مسودة is implicit on the May-in-progress earnings row (status «قيد التحصيل» represents the not-yet-finalized substate). مرفوضة is not demonstrated on a settlement (no rejected April settlements) — it lives in the entity definition + on advance row 8 (ADV-2026-0028).
- **Rationale**: Five states cover the full payroll workflow: draft → pending → approved → paid → (rejected side-branch). Showing 3 of the 5 states on a single admin page (مدفوعة + معتمدة + بانتظار-الاعتماد across 6 rows) provides workflow demonstration without requiring rejected/draft rows that complicate the demo. SC-016 grep-validates the 3-state coverage.
- **Alternatives considered**: (a) 3-state ladder (skip معتمدة, fold approved+paid into a single "paid" state) — rejected because the user-input "Approve settlement" + "Mark paid" CTAs explicitly distinguish the two; (b) 4-state ladder (skip مسودة) — rejected because the May running-tally row needs a name for its in-progress state; «قيد التحصيل» is conceptually a sub-state of مسودة.

### D13 — Advance state ladder copy (5 states + شبه-مكتملة novelty)

- **Decision**: Five advance statuses: نشطة (Active, info-tone), مكتملة (Completed, success-tone solid), شبه-مكتملة (Near-Complete — novel, warning amber + ⏳), بانتظار الاعتماد (Pending Approval, neutral + ⊕), مرفوضة (Rejected, danger-tone greyed). The شبه-مكتملة state is a spec novelty representing the dependency between settlement state and advance state — until the final installment's settlement is مدفوعة, the advance sits in شبه-مكتملة.
- **Rationale**: Without شبه-مكتملة, the advance ledger arithmetic creates a visible inconsistency: ADV-2026-0012's third installment is "deducted on the April settlement" but the April settlement is بانتظار-الاعتماد (not paid yet) — so is the advance مكتملة or نشطة? Neither answer is correct. The شبه-مكتملة state names this in-flight reality. SC-006 grep-validates the arithmetic reconciliation.
- **Alternatives considered**: (a) 4-state ladder without شبه-مكتملة (force ADV-2026-0012 to either مكتملة or نشطة) — rejected because either answer creates a visible inconsistency; (b) Mark ADV-2026-0012 as نشطة and document the dependency only in the admin-note thread — rejected because it hides the rule from the teacher's read-only advances page.

### D14 — Bank-info masking convention

- **Decision**: Both teacher-side and admin-side settlement-details pages display the teacher's IBAN with the last 4 digits visible only — the demo IBAN `SA0380000000600404420042` masks to `SA03********0042`. The EGP teacher الأستاذة هبة's bank info uses a CIB-Egypt-style sample IBAN, similarly masked.
- **Rationale**: Privacy-correct rendering — even on admin-side pages, full account numbers should not be casually exposed in tables. A "تعديل بيانات الحساب" affordance on admin-side is a static-disabled caption (per FR-086) since the actual edit surface is the teacher's profile page (out of scope for Spec 009).
- **Alternatives considered**: (a) Full IBAN visible — rejected for privacy reasons; (b) Last 6 digits visible — rejected because 4 is the established financial-industry convention.

### D15 — CSS rebuild expected delta

- **Decision**: Expected utility-set delta after the 8-page implementation is ≤ 6 KB (Spec 008 delta was ≤ 8 KB, and Spec 009 introduces fewer new utility classes since the layout patterns are largely table + card variants of Spec 008's family-finance pages). Final compiled `assets/css/output.css` size MUST stay below the constitutional 80 KB ceiling.
- **Rationale**: Most of Spec 009's HTML reuses utilities already present in Spec 008's compiled output (table classes, card variants, badge tones, divide separators, status-pill paddings). New utilities expected: `font-tabular-nums` (numeric columns alignment in 4-bucket panel + 11-line totals card), `divide-y-2` (heavier separators between bonus/deduction/advance panels), `border-double` (used optionally on the eleven-line settlement-totals divider), `min-w-[850px]` (horizontal-scroll container for the 10-column salary-rules table on tablet).
- **Alternatives considered**: (a) Larger delta budget (e.g., ≤ 10 KB) — rejected because the page count is smaller than Spec 008's; (b) Zero delta (use only existing utilities) — rejected because the 4-bucket numeric alignment requires `font-tabular-nums` which is not currently in the compiled output.

## Implementation Discipline Carried Forward

These disciplines from Specs 001-008 are inherited verbatim and grep-validated by SC-001 → SC-016:

- **Static HTML5 + Tailwind 3.4 + zero new JS** (Constitution I, V) — no framework, no API, no backend, no JS-rendered content.
- **RTL-primary Arabic-first** (Constitution III) — `lang="ar" dir="rtl"`, Tajawal font, Latin digits inside Arabic copy.
- **Constitutional badge vocabulary** (Constitution IV) — every status/state/category gets a color-AND-label-AND-icon badge; color is never the sole indicator.
- **Two-views-one-entity discipline** (Spec 008 SC-003 / SC-005) — the anchor settlement renders byte-identical financial figures across teacher/settlement-details and admin/teacher-settlement-details.
- **Multi-currency without column-mixing** (Spec 008 SC-007 / SC-009) — currency badges per row; SAR/EGP NEVER summed in a single tile.
- **Arabic-vs-Foreign rate distinction with «ناطق بالعربية / غير ناطق بالعربية» labels** (Spec 008 Q3) — these exact labels (NOT "محلي / مغترب", NOT "عربي / أجنبي") on every surface that surfaces the distinction.
- **Zero `href="#"` placeholders** (Spec 008 SC-015) — every CTA either resolves to a real existing HTML file in this spec or in specs 001-008, or is rendered as a non-link static caption.
- **Zero prior-spec edits** (Spec 008 + Spec 007 discipline) — the implementation only writes new files.
- **Spec 006 academic-figures untouched** (SC-012) — 92% / 88% / 88-100 / 89-100 / "ممتاز" / `RPT-2026-04-Q03-007` MUST NOT be invented or contradicted; Spec 009 cites the 92% figure verbatim in the Q2 caption only as a justification for the bonus.
