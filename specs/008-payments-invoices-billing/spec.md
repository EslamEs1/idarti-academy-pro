# Feature Specification: Payments, Invoices, Tax Settings & Family Balance Frontend

**Feature Branch**: `008-payments-invoices-billing`
**Created**: 2026-05-10
**Status**: Draft
**Input**: User description: "Build a complete finance frontend experience for students, parents, and admins. The UI must support course payments, pay-per-session payments, tax/VAT on invoices, partial payments, unpaid invoices, family prepaid balances, and Saudi/Egypt currency examples."

## Context & Continuity

This is the **eighth** spec in the Premium Education Platform Frontend program. Specs 001-007 have already shipped:

- **001** locked design tokens (deep-navy primary, warm-orange accent, soft-green success, calm-gray text, Tajawal/RTL).
- **002** built the home / dashboard / weekly-plan / learning-journey surfaces and pinned the persona family — **عبد الرحمن مؤمن** (الصف السادس، مسار القرآن الكريم — المستوى الثالث) plus sister **سارة مؤمن** (الصف الثالث، "يحتاج إلى دعم"), parent **ولي أمر الطالب عبد الرحمن**, primary teacher **الأستاذ أحمد بن عبد الله** (Quran), secondary teacher **الأستاذة منى سعد** (Arabic), Islamic-Studies teacher **الأستاذ خالد العبدلي**.
- **003** added courses / live sessions / per-session checkout preview.
- **004** added the assignments / homework loop.
- **005** shipped achievements, badges, certificates, monthly-exams-passed, and completed-levels.
- **006** shipped reports / monthly-report / attendance / exams / parent my-children / child-reports / teacher student-reports and locked the **April 2026** canonical figures (92% attendance, 88% homework, 88-100 monthly exam, 89-100 overall, "ممتاز", `RPT-2026-04-Q03-007`).
- **007** shipped social-hub / leaderboard / calendar across student / admin / teacher and locked the persona's leaderboard rank #6 (general) / #2 (most-improved).

This spec (**008**) ships the **finance layer**: ten pages spanning student, parent, and admin roles that close every constitutional finance sidebar entry — Student "Payment History", Parent "Invoices" + "Family Balance", Admin "Payments" + "Invoices" + "Tax Settings" + "Family Balances" — plus the operational sub-flows (admin invoice details, manual-payment intake). Existing sidebars on every prior-spec page already point to these exact file paths (`payment-history.html`, `invoices.html`, `family-balance.html`, `payments.html`, `family-balances.html`, `tax-settings.html`), so this spec requires **zero prior-spec edits** — once the new files exist, the existing links resolve automatically.

The spec deliberately scopes **out**: teacher payouts, teacher advances, teacher-finance dashboard, and salary deductions (Constitution VI flags those as separate sidebar entries in "Admin Teacher Finance" → reserved for a future spec). Real payment-gateway integration is also out of scope per Constitution I (no APIs, no real money flow, no simulated payment processors). All amounts shown are static demo values.

**Calendar today** = 9 مايو 2026 (per Spec 007). Persona scenario state: family prepaid balance **450.00 ريال**, current-month invoice **INV-2026-0231** for May (437.00 ريال) **unpaid** and due 2026-05-15, prior-month invoice **INV-2026-0184** for April (437.00 ريال) **fully paid** as of today (200 Mada card 2026-04-12 + 170 bank transfer 2026-04-25 + 67 family-balance auto-applied on due date 2026-04-30 = 437.00). A separate late-April private-session invoice **INV-SES-2026-0205** (115.00 ريال total, 60 paid via Mada 2026-04-30, due 2026-05-20) is the canonical **partially-paid** example — it carries 55.00 remaining inside its still-open window. Sister **سارة مؤمن** carries one **overdue** April invoice INV-2026-0188 visible on parent/invoices.html.

## Clarifications

### Session 2026-05-10

- Q: Anchor financial snapshot policy — should family balance auto-apply to invoices on the due date, stay manual-only, or use a "snapshot frozen 2026-04-29" framing? → A: Option A — **balance auto-applies on the invoice due date**, the seeded data reflects post-application reality. INV-2026-0184 status is "مدفوعة" today (closed 2026-04-30 by auto-application of 67.00 ريال from family balance), and a separate invoice INV-SES-2026-0205 (115.00 ريال total, 60.00 paid, 55.00 remaining, due 2026-05-20) is the canonical "مدفوعة جزئياً" demo example because it is still inside its payment window with no auto-application yet triggered.
- Q: Persona overdue attribution — should the persona himself carry an overdue invoice on his payment-history page, or should overdue belong only to Sister Sara on parent surface? → A: Option A — **persona keeps his overdue row** INV-SES-2026-0098 (Feb private session, 92.00 ريال, overdue since 2026-02-25) on student/payment-history.html, AND Sister Sara also carries her overdue INV-2026-0188 (April Arabic + Islamic Studies, 322.00 ريال) on parent/invoices.html. Both rows demonstrate the danger-tone "متأخّرة" badge in two different role contexts; a 3-month-old slipped private-session bill is a realistic forgivable artifact and does not contradict the persona's ممتاز academic standing locked in Spec 006.
- Q: Student-type filter labels for the Constitution-VI Arabic-vs-Foreign pricing distinction on `pages/admin/invoices.html` — which canonical Arabic labels should the chip group and per-row badges use? → A: Option B — **"ناطق بالعربية / غير ناطق بالعربية"** ("Arabic-speaking / non-Arabic-speaking"). Reason: this directly names the **language** criterion that drives the pricing rule (rather than residency, which "محلي / مغترب" implied incorrectly) and avoids the ethnic-framing ambiguity of "عربي / أجنبي". The labels are RTL-clean and used identically as filter chips, per-row badges, and any text references across the spec.
- Q: "إنشاء حركة رصيد" header CTA on `pages/admin/family-balances.html` — should the button route to a real destination, stay as a documented modal stub with `href="#"`, or be removed entirely? → A: Option A — **route to `pages/admin/create-manual-payment.html`** with the form rendering in an alternate "balance-deposit pre-filled mode" (family pre-selected, no invoice required, method "إيداع رصيد" exposed as an additional option in the method dropdown). This drops the only `href="#"` exception in SC-015 and avoids inventing an 11th page; the operational logic (admin records a money-in event for a family) is identical for both invoice payments and balance deposits, making the manual-payment form a natural reuse.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Student & parent see family finances at a glance (Priority: P1)

The persona **عبد الرحمن مؤمن** opens his "سجل المدفوعات" page from the student sidebar to confirm his April subscription was settled and see what he owes for May. Separately his **ولي الأمر** opens the parent "الفواتير" and "رصيد العائلة" pages to verify both children's invoices and to see the prepaid family balance (450.00 ريال) — including the recent +200.00 ريال top-up he made on 2026-05-05 and the 67.00 ريال the academy auto-applied to عبد الرحمن's April balance on 2026-04-30. The parent also sees that **سارة** has an overdue Arabic-and-Islamic-Studies invoice and that the "ادفع الآن" button is visually present on her row.

**Why this priority**: This is the single customer-facing slice that the academy's families touch every month. It must exist before any admin-facing operational page is useful, because the Definition-of-Done gate "every navigation link points to a real existing HTML file" (Constitution Quality Gate 5) is currently failing on five sidebar entries (Student Payment History, Parent Invoices, Parent Family Balance) for both Student and Parent roles. Closing this slice alone makes the prototype's family-finance story coherent and demoable to stakeholders.

**Independent Test**: Open `pages/student/payment-history.html` from the student sidebar and verify (a) all four summary cards render with concrete numbers (Total paid 934.00 ريال / Unpaid invoices 2 / Upcoming payment 437.00 ريال due 2026-05-15 / Family balance available 450.00 ريال), (b) the payment table contains seven rows demonstrating all six statuses (Paid, Partially Paid, Under Review, Unpaid, Overdue, Cancelled — Paid appears twice), (c) clicking "عرض الفاتورة" on the April INV-2026-0184 row navigates to `pages/student/invoice-details.html` showing the fully-paid invoice with subtotal/discount/VAT/balance-used/paid/remaining/total breakdown and the auto-applied balance event in the payment-stream list. Then open `pages/parent/invoices.html` and verify both children's invoices appear with filter chips by child / status / month and at least one row carries a visible "ادفع الآن" CTA. Finally open `pages/parent/family-balance.html` and verify the current 450.00 ريال balance card plus a balance-history table containing all four transaction types (Deposit / Used / Refund / Adjustment) with a "بواسطة" column showing which child consumed each "Used" entry. No JavaScript dependencies beyond the existing sidebar drawer; pages render under RTL with Arabic-first content.

**Acceptance Scenarios**:

1. **Given** the student sidebar's "سجل المدفوعات" link, **When** the persona clicks it, **Then** `pages/student/payment-history.html` opens, the active sidebar entry highlights, and a six-row payment table demonstrates all six statuses without scrolling beyond a single page-fold on a 1440-wide desktop.
2. **Given** any "عرض الفاتورة" CTA in the payment table, **When** the persona clicks it, **Then** `pages/student/invoice-details.html` opens showing the anchor invoice INV-2026-0184 (status "مدفوعة") with all eight financial lines (subtotal, discount, VAT 15%, family-balance-used 67.00, paid 437.00, remaining 0.00, total 437.00, status "مدفوعة") and two visual download buttons (الفاتورة / إيصال الدفع).
3. **Given** the parent's "الفواتير" page, **When** the parent applies the "الطفل: سارة مؤمن" filter chip, **Then** the table re-displays only Sara's invoice rows including the overdue INV-2026-0188 with a "متأخّر" red-tinted badge plus an "ادفع الآن" CTA visually present (no JS handler required).
4. **Given** the parent's "رصيد العائلة" page, **When** the parent scans the balance-history table, **Then** they can identify (a) one Deposit row of +500.00 ريال, (b) one Used-for-Invoice row consumed by عبد الرحمن, (c) one Used-for-Invoice row consumed by سارة, (d) one Refund row tied to a cancelled session invoice, and (e) one Adjustment row with a visible admin note — each row clearly labeled with transaction type, amount sign, date, and which child (when applicable).
5. **Given** the persona's six-row payment table, **When** the persona reads each row, **Then** Latin digits appear inside Arabic copy (per project convention), each row shows the invoice number, course/session label, subtotal, VAT, total, status badge, due date, and a per-row CTA — all in SAR.

---

### User Story 2 - Admin operates payments and invoices across the academy (Priority: P2)

A finance-team admin opens the admin sidebar, lands on "المدفوعات", scans the day's intake summary cards (مدفوع اليوم / تحت المراجعة / فشل / إجمالي الشهر), filters by "تحت المراجعة" status to triage the receipt that عبد الرحمن's parent uploaded for INV-SES-2026-0212, then jumps to "الفواتير" to bulk-act on a selection of overdue invoices. From the invoices table the admin opens the same anchor invoice INV-2026-0184 in **admin** mode (`pages/admin/invoice-details.html`) — this view shows the same financial breakdown the student sees, plus three extra panels: a payment-records timeline (3 events), a family-balance-usage entry (-67.00 ريال applied 2026-04-30 to عبد الرحمن's invoice), and an admin-notes thread (2 entries) — and the action bar exposes five operational buttons: تعليم كمدفوعة، إضافة دفعة، تطبيق رصيد العائلة، تنزيل، إلغاء الفاتورة.

**Why this priority**: These three pages are the academy's day-to-day operational core. They depend on Story 1 only insofar as both views share the anchor invoice; Story 2 is independently testable because admin pages have their own sample data set (10+ payments, 10+ invoices) and don't require the student/parent pages to exist. Without Story 2, the academy team cannot demonstrate triage / bulk-action / per-invoice ops to a stakeholder demo.

**Independent Test**: Open `pages/admin/payments.html` and verify (a) five summary cards render with totals, (b) five filter controls render (status / method / date / student / family) with visible Arabic labels and dropdown affordances, (c) a payments table with at least 10 rows shows diverse states across multiple families, currencies, and methods — including at least one EGP row to demonstrate multi-currency. Then open `pages/admin/invoices.html` and verify (a) five summary cards (total / paid / unpaid / partially paid / overdue), (b) six filter controls (paid / unpaid / partially paid / overdue / student type "ناطق بالعربية vs غير ناطق بالعربية" / course-or-session), (c) a checkbox column plus a bulk-action dropdown above the table demonstrating bulk-control affordances. Finally open `pages/admin/invoice-details.html` and verify the same anchor invoice INV-2026-0184 appears with the three admin-only panels and the five-action button row.

**Acceptance Scenarios**:

1. **Given** the admin "المدفوعات" page, **When** the admin scans the table, **Then** every row shows Payment ID + Student + Family + Amount + Currency + Method + Status + Date + Linked Invoice + Action — and at least one row carries the "EGP" currency tag with an Egyptian sample family.
2. **Given** the admin "الفواتير" page, **When** the admin clicks the master-checkbox in the table header, **Then** all visible rows visually toggle to a selected state and the bulk-action dropdown becomes the focal control above the table (visual affordance only — no JS state change required).
3. **Given** the admin "تفاصيل الفاتورة" page (admin view), **When** the admin scans the action bar, **Then** five buttons appear in this exact order from start (right under RTL): تعليم كمدفوعة، إضافة دفعة، تطبيق رصيد العائلة، تنزيل، إلغاء الفاتورة — with the destructive "إلغاء الفاتورة" button styled in danger-tone (red) and visually separated from the other four.
4. **Given** the admin invoice-details page, **When** the admin reads the payment-records timeline, **Then** three chronological events appear: (a) 2026-04-12 Mada card 200.00 ريال, (b) 2026-04-25 bank transfer 170.00 ريال, (c) 2026-04-30 family-balance applied -67.00 ريال (auto-applied on due date) — each event timestamped with admin actor name visible (the auto-application carries the system actor "نظام تلقائي").
5. **Given** the admin "تفاصيل الفاتورة" page, **When** the admin scans the "ملاحظات إدارية" panel, **Then** at least two notes are present with author + date + body, demonstrating an audit-trail affordance.

---

### User Story 3 - Admin configures tax, manages family balances, and records manual payments (Priority: P3)

A platform-settings admin opens "إعدادات الضريبة" once a quarter to review VAT configuration: the toggle is enabled, the rate is 15%, the country is "المملكة العربية السعودية", the apply-to checkboxes are set for Courses + Live Sessions + Private Sessions (Registration Fees unchecked per academy policy), and an example-invoice preview at the bottom of the page renders both a Saudi 15% VAT example (380 → 437) and an Egypt 14% VAT alternative (1500 → 1710 EGP) so the admin can verify the math against published tax rules. The admin then visits "أرصدة العائلات" to scan the families table — six families across SAR and EGP — locates a family that needs a balance adjustment, and uses the row's action menu (View / Add credit / Deduct / Adjustment). Finally the admin opens "تسجيل دفعة يدوية" to record a wire transfer that arrived from the persona's family for the May invoice: family pre-selected as **عائلة مؤمن**, student narrowed to **عبد الرحمن مؤمن**, invoice narrowed to **INV-2026-0231**, amount 437.00 ريال, method "تحويل بنكي", date today 2026-05-10, with a visual "إرفاق إيصال" upload affordance and a primary "حفظ الدفعة" button.

**Why this priority**: These three pages are configuration / back-office tools used less frequently than the operational pages in Story 2. They unblock the constitutional Definition-of-Done for the Admin sidebar (closing "إعدادات الضريبة" and "أرصدة العائلات") and provide the manual-payment intake surface that the academy's finance officer needs whenever a family pays outside the platform. Story 3 is independently testable because each page has its own self-contained sample data and form scaffolding; nothing in Story 3 requires Stories 1 or 2 to exist.

**Independent Test**: Open `pages/admin/tax-settings.html` and verify (a) toggle, percentage input (15), country dropdown (Saudi selected), four apply-to checkboxes with three checked, tax-number field (312345678900003), footer-note text, and an example-invoice calculation preview rendering both KSA and EGP variants side by side. Then open `pages/admin/family-balances.html` and verify (a) summary tiles (count / total balance / families-with-zero), (b) a search/filter bar, (c) a six-row families table with at least one EGP row, (d) action-menu icons per row (view / add-credit / deduct / adjustment). Finally open `pages/admin/create-manual-payment.html` and verify a complete form UI with family-dropdown, student-dropdown (filtered), invoice-dropdown (filtered), amount input + currency tag, payment-method dropdown, date picker (defaulted to 2026-05-10), notes textarea, "إرفاق إيصال" file-upload affordance, and primary "حفظ الدفعة" + secondary "إلغاء" buttons.

**Acceptance Scenarios**:

1. **Given** the tax-settings page, **When** the admin scans the apply-to checkbox group, **Then** four labeled options appear in this order: الدورات الكاملة، الحصص المباشرة، الحصص الخاصة، رسوم التسجيل — with the first three checked and the fourth (registration fees) unchecked.
2. **Given** the tax-settings page, **When** the admin scrolls to the example-invoice preview, **Then** two side-by-side cards render: a KSA card (subtotal 380.00 / VAT 15% = 57.00 / Total 437.00 ريال) and an Egypt-alternative card (subtotal 1500.00 / VAT 14% = 210.00 / Total 1710.00 EGP), making the multi-currency math visible at-a-glance.
3. **Given** the family-balances admin table, **When** the admin scans the Currency column, **Then** at least five rows show "ريال" and at least one row shows "EGP", demonstrating multi-currency support without UI degradation under RTL.
4. **Given** the create-manual-payment form, **When** the admin opens the family dropdown, **Then** عائلة مؤمن appears in the list (and is pre-selected for the demo state), AND the student dropdown is correctly filtered to show only that family's two children (عبد الرحمن، سارة).
5. **Given** the create-manual-payment form, **When** the admin scans the date input, **Then** today's date 2026-05-10 is the default value, the currency tag next to the amount input reads "ريال", and the "إرفاق إيصال" affordance is visually present (no real upload handler required).

---

### Edge Cases

- **Cancelled-then-refunded session invoice**: INV-SES-2026-0156 was paid 60.00 ريال by family balance on 2026-03-08, then the make-up session was cancelled on 2026-04-08; the invoice's status flips to "ملغاة" on student/payment-history.html AND a corresponding **+60.00 ريال refund** transaction appears on the family-balance history with a visible admin note "إلغاء حصة تعويضية". This double-bookkeeping pattern (cancellation status on the invoice + refund row on the balance) MUST be visible in both surfaces — silently zeroing the invoice without showing the refund violates the family's right to financial transparency.
- **Under-Review payment in summary math**: the 69.00 ريال receipt the parent uploaded for INV-SES-2026-0212 is in "تحت المراجعة" status on 2026-05-10. It MUST NOT be counted in the student page's "Total paid" summary card (934.00 ريال) — only the fully-Paid + Partially-Paid paid amounts (437 + 437 + 60) contribute. A footnote/tooltip on the summary card MAY clarify the exclusion.
- **Overdue ≠ Unpaid visual distinction**: INV-2026-0231 (current May, due 2026-05-15) is "غير مدفوعة" — neutral amber. INV-SES-2026-0098 (private session, due 2026-02-25) is "متأخّرة" — danger red, with an overdue-by indicator ("متأخّر منذ 74 يوم"). The two states MUST be visually distinguishable beyond color alone (text label + icon + duration).
- **Auto-applied family balance on due date**: When an invoice reaches its due date (e.g., INV-2026-0184 on 2026-04-30) carrying a non-zero remaining amount AND the family balance has sufficient funds to close it, the platform creates a settled "استخدام للفاتورة" entry on the family-balance ledger and a "تطبيق رصيد عائلي" event on the invoice's payment timeline — both labelled with the system actor "نظام تلقائي". The invoice's status flips from "غير مدفوعة" / "مدفوعة جزئياً" to "مدفوعة" automatically. This is the canonical realization of the FR-035 caption "يُطبَّق تلقائياً على الفواتير المستحقة".
- **Partially-paid invoice still inside its payment window**: INV-SES-2026-0205 (private session, 100.00 + 15.00 VAT = 115.00 ريال total, due 2026-05-20) has 60.00 paid via Mada on 2026-04-30 and 55.00 still remaining. Because today (2026-05-10) is BEFORE the due date 2026-05-20, no auto-application has triggered; the invoice remains in "مدفوعة جزئياً" state and is the canonical example of that status across the payment-history table. The student page MUST show the single Mada-60 payment stream, not collapse it.
- **Multi-stream fully-paid invoice**: INV-2026-0184 has THREE concurrent payment streams visible after auto-closure — 200.00 Mada (2026-04-12), 170.00 bank transfer (2026-04-25), 67.00 auto-applied family balance (2026-04-30) — totaling 437.00 = total. The student-side invoice-details page MUST show all three streams as a payment-method breakdown (with the third stream labelled "(تطبيق تلقائي عند تاريخ الاستحقاق)"), not collapse them to a single "Paid: 437.00" line.
- **Multi-currency family in admin family-balances table**: at least one EGP-denominated family row (e.g., عائلة حسن — Cairo) coexists in the same table with five SAR families. The currency tag MUST be a visible badge per row (not just a tooltip) and totals/sums MUST NOT mix currencies across rows in any summary card (admin sees separate "إجمالي الرصيد بالريال" and "إجمالي الرصيد بالجنيه" tiles).
- **Student type filter on admin/invoices.html**: the "نوع الطالب" filter chips offer "ناطق بالعربية" vs. "غير ناطق بالعربية" per Constitution VI's Arabic-vs-Foreign pricing rule (the criterion is the student's first-language proficiency, not their country of residence). Both chip options MUST be visible (visual filter only — no JS handler required) and at least one row of each type MUST appear in the seeded table; the per-row "نوع الطالب" badge MUST use the same two labels.
- **Empty balance-history state (NOT applicable here)**: the persona's family balance has 7 transactions, so the empty-state UI is not exercised on this surface. A reference family in admin/family-balances with 0.00 balance + 0 transactions exists to demonstrate the empty-row pattern.
- **Bulk-action without selection**: on admin/invoices.html, the bulk-action dropdown is rendered above the table even when no rows are checkboxed. The dropdown's primary CTA MUST NOT visually claim a destructive default (e.g., "تطبيق على المحدّد" — neutral) and MUST be visually disabled-styled when count = 0 (visual only — no JS gating required).

## Requirements *(mandatory)*

### Functional Requirements

#### A. Page deliverables & navigation

- **FR-001**: The system MUST deliver exactly **10 new HTML pages** at the following paths, each authored as a complete, openable static file with a Tajawal RTL Arabic-first layout, the role-correct sidebar, and the shared header — no API calls, no JS-generated content, no framework runtime:
  1. `pages/student/payment-history.html`
  2. `pages/student/invoice-details.html`
  3. `pages/parent/invoices.html`
  4. `pages/parent/family-balance.html`
  5. `pages/admin/payments.html`
  6. `pages/admin/invoices.html`
  7. `pages/admin/invoice-details.html`
  8. `pages/admin/tax-settings.html`
  9. `pages/admin/family-balances.html`
  10. `pages/admin/create-manual-payment.html`
- **FR-002**: Each page MUST render the sidebar entries enumerated in Constitution §"Information Architecture" for that role (Student / Parent / Admin), with the active entry highlighted on each respective destination page.
- **FR-003**: All cross-page links from prior specs that point to the new file paths (`payment-history.html`, `invoices.html`, `family-balance.html`, `payments.html`, `family-balances.html`, `tax-settings.html`) MUST resolve correctly without modifying any prior-spec page; this spec is a **zero prior-spec edit** spec.
- **FR-004**: Every page MUST be responsive: desktop ≥1280px renders full sidebar + content; tablet 768-1279px collapses dense tables to horizontal-scroll containers; mobile <768px collapses the sidebar via the existing drawer (`assets/js/main.js`) — no new JS introduced.
- **FR-005**: All Arabic copy MUST use natural, Saudi-friendly phrasing; Latin digits appear within Arabic numbers (e.g., "437.00 ريال", "2026-05-10"); currency labels use "ريال" (SAR primary) and "EGP" (Egypt secondary).

#### B. Student Payment History (`pages/student/payment-history.html`)

- **FR-010**: The page MUST render four summary cards at the top: (1) إجمالي المدفوع — 934.00 ريال (sum of {Paid + Partially-Paid amounts} across the visible table rows; "تحت المراجعة" amounts excluded); (2) فواتير غير مدفوعة — 2 (count of Unpaid + Overdue rows); (3) الدفعة القادمة — 437.00 ريال مستحقة 2026-05-15 (link to invoice-details); (4) رصيد العائلة المتاح — 450.00 ريال (link to parent/family-balance.html).
- **FR-011**: A status legend MUST appear above the table showing all six supported badges with text labels: مدفوعة، غير مدفوعة، مدفوعة جزئياً، متأخّرة، ملغاة، تحت المراجعة — each badge using its constitutional color + icon pairing (color is never the sole indicator).
- **FR-012**: The payment table MUST contain seven rows demonstrating all six statuses for the persona — anchor data: INV-2026-0184 (Paid, 437/437 ريال — fully closed by auto-applied balance on 2026-04-30), INV-2026-0137 (Paid, 437/437 ريال — March subscription), INV-SES-2026-0205 (Partially Paid, 60/115 ريال — late-April private session, due 2026-05-20, still in window), INV-SES-2026-0212 (Under Review, 69 ريال receipt pending), INV-2026-0231 (Unpaid, 437 ريال due 2026-05-15 — current May subscription), INV-SES-2026-0156 (Cancelled, 69 ريال — refunded to balance), INV-SES-2026-0098 (Overdue, 92 ريال — Feb private session, due 2026-02-25, slipped through).
- **FR-013**: Each table row MUST expose these columns in this RTL-natural order from the trailing edge: رقم الفاتورة، الدورة/الحصة، المبلغ الأساسي، الضريبة، الإجمالي، الحالة، تاريخ الاستحقاق، إجراء (CTA "عرض الفاتورة").
- **FR-014**: The "عرض الفاتورة" CTA on the INV-2026-0184 row MUST link to `pages/student/invoice-details.html`; CTAs on other rows MAY link to the same anchor invoice (single-detail-page anchor pattern, consistent with prior-spec anchor-detail discipline).
- **FR-015**: All amounts MUST appear in SAR with the trailing "ريال" label; the VAT column MUST display the per-invoice VAT amount (not just a percentage) — e.g., "57.00 ريال" not "15%".
- **FR-016**: The Method column MUST display the payment instrument used (e.g., "بطاقة مدى"، "تحويل بنكي"، "بطاقة + رصيد"، "إيصال بنكي") OR an em-dash "—" for unpaid/cancelled/under-review rows.

#### C. Student Invoice Details (`pages/student/invoice-details.html`)

- **FR-020**: The page MUST anchor on **INV-2026-0184** (April 2026 subscription, fully paid as of today via auto-applied balance on the due date). Header section MUST show: invoice number, issue date 2026-04-01, due date 2026-04-30, and a status badge "مدفوعة" (success-tone) with a small caption "أُغلقت تلقائياً بتطبيق رصيد العائلة في تاريخ الاستحقاق".
- **FR-021**: A "بيانات الطالب" section MUST display: full name عبد الرحمن مؤمن، الصف السادس، مسار القرآن الكريم — المستوى الثالث، رقم الطالب STD-2024-0817.
- **FR-022**: A "بيانات العائلة" section MUST display: ولي أمر الطالب عبد الرحمن، رقم العائلة FAM-2023-0211، الإخوة المسجّلون: سارة مؤمن (الصف الثالث).
- **FR-023**: The line-items table MUST render four item-type **examples** demonstrated across the page — though the anchor invoice INV-2026-0184 itself contains a single full-course line, a section labelled "مرجع: أنواع البنود المدعومة" MUST appear below the items table showing each of the four types with a visual sample:
  - **دورة كاملة** — اشتراك دورة القرآن الكريم — المستوى الثالث (شهر أبريل 2026) — 380.00 ريال
  - **حصة مباشرة محدّدة** — حصة قراءة المتشابهات — 18 أبريل 2026 — 60.00 ريال
  - **حصة خاصة** — حصة فردية لمراجعة الأخطاء — 12 مارس 2026 — 80.00 ريال
  - **حصة جماعية** — حلقة مذاكرة جماعية — 3 أبريل 2026 — 45.00 ريال
- **FR-024**: A financial-breakdown panel MUST display these eight lines for INV-2026-0184: المجموع الفرعي 380.00، الخصم 0.00، الضريبة (15%) 57.00، الرصيد العائلي المُستخدَم 67.00، المبلغ المدفوع 437.00، المبلغ المتبقّي 0.00، الإجمالي 437.00، الحالة "مدفوعة".
- **FR-025**: A "طريقة الدفع" panel MUST list the three concurrent payment streams (NOT collapsed): بطاقة مدى 200.00 (2026-04-12), تحويل بنكي 170.00 (2026-04-25), رصيد العائلة 67.00 (2026-04-30 — تطبيق تلقائي عند تاريخ الاستحقاق) — each with date stamp; the auto-applied stream MUST carry a small "تلقائي" pill or icon to distinguish it from the manual streams.
- **FR-026**: Two visual download buttons MUST appear at the page's primary action area: "تنزيل الفاتورة (PDF)" + "تنزيل إيصال الدفع (PDF)" — both visual-only per Constitution Quality Gate (download buttons are visual-only unless a real static file is bundled).
- **FR-027**: The line-item "اشتراك دورة القرآن الكريم — المستوى الثالث" MUST be a hyperlink pointing to `pages/student/course-details.html` (Spec 003), preserving cross-spec link discipline; the per-session reference items MAY link to `pages/student/live-session-details.html` if those pages exist.

#### D. Parent Invoices (`pages/parent/invoices.html`)

- **FR-030**: The page MUST render four summary tiles: إجمالي الفواتير (count across both children for the last 6 months), غير مدفوعة (count), متأخّرة (count), إجمالي المتبقّي (sum in SAR).
- **FR-031**: A filters strip MUST render three filter controls — الطفل (chips: "جميع الأبناء"، "عبد الرحمن"، "سارة")، الحالة (dropdown with all six statuses + "الكل")، الشهر (dropdown listing Jan-May 2026 + "كل الأشهر") — visual filters only, no JS handler required.
- **FR-032**: The invoices table MUST contain at least eight rows spanning both children and at least four statuses, with a "الطفل" column distinguishing each row's owner. Anchor rows MUST include INV-2026-0231 (عبد الرحمن، Unpaid)، INV-2026-0184 (عبد الرحمن، Paid)، INV-2026-0188 (سارة، Overdue, 322.00 ريال)، INV-2026-0145 (سارة، Paid March)، INV-SES-2026-0212 (عبد الرحمن، Under Review).
- **FR-033**: Sara's overdue row INV-2026-0188 MUST be visually highlighted (red-tinted row background or red badge + icon) AND carry a visible "ادفع الآن" CTA — visual only, no payment-handler.
- **FR-034**: Every row in the table where status ∈ {غير مدفوعة، مدفوعة جزئياً، متأخّرة} MUST show the "ادفع الآن" CTA; rows with status ∈ {مدفوعة، ملغاة} MUST instead show "عرض الفاتورة"; rows with status "تحت المراجعة" MUST show a neutral "عرض" CTA.
- **FR-035**: The page MUST include a small caption near the family-balance summary tile: "الرصيد المتاح: 450.00 ريال — يُطبَّق تلقائياً على الفواتير المستحقة" linking to `family-balance.html`.

#### E. Parent Family Balance (`pages/parent/family-balance.html`)

- **FR-040**: The current-balance hero card MUST display 450.00 ريال in a large numeric format with the label "رصيد العائلة الحالي" + a sub-line listing both children (عبد الرحمن، سارة) the balance is shared across.
- **FR-041**: A balance-history table MUST contain at least seven rows demonstrating all four transaction types — Deposit, Used-for-Invoice, Refund, Adjustment — with these anchor rows:
  - 2026-02-10 — إيداع — +500.00 ريال — بواسطة ولي الأمر — ملاحظة "إيداع أولي للعائلة"
  - 2026-03-25 — استخدام للفاتورة INV-2026-0137 — −100.00 ريال — بواسطة عبد الرحمن — ملاحظة "تسديد جزئي شهر مارس"
  - 2026-04-08 — استرداد من فاتورة ملغاة INV-SES-2026-0156 — +60.00 ريال — ملاحظة "إلغاء حصة تعويضية"
  - 2026-04-22 — تسوية — −10.00 ريال — ملاحظة "تسوية رسوم تحويل بنكي"
  - 2026-04-30 — استخدام للفاتورة INV-2026-0184 — −67.00 ريال — بواسطة عبد الرحمن — ملاحظة "تطبيق تلقائي عند تاريخ الاستحقاق — أغلق المبلغ المتبقّي" — يحمل وسم "تلقائي"
  - 2026-05-05 — إيداع — +200.00 ريال — بواسطة ولي الأمر — ملاحظة "إيداع لشهر مايو"
  - 2026-05-08 — تسوية — −133.00 ريال — ملاحظة "تعديل رصيد بناءً على طلب ولي الأمر"
- **FR-042**: For "Used-for-Invoice" rows, a "بواسطة" column MUST identify which child the balance was applied to — required for parent transparency when balance is shared across siblings.
- **FR-043**: Each row MUST include an "ملاحظة الإدارة" column visible in the table (or a hover-to-expand if column count exceeds 6 on mobile).
- **FR-044**: A primary CTA "إضافة رصيد" MUST appear above the table (visual only — no real payment gateway), with a secondary explanatory caption: "يمكن للعائلة الإيداع مقدّماً لتسديد الفواتير القادمة تلقائياً."
- **FR-045**: A four-tile sub-summary MUST appear between the hero card and the history table: إجمالي الإيداعات، إجمالي المُستخدَم، إجمالي المُستردّ، إجمالي التسويات — each with a SAR amount and a transaction-count chip.

#### F. Admin Payments (`pages/admin/payments.html`)

- **FR-050**: The page MUST render five summary cards: مدفوع اليوم، مدفوع هذا الشهر، تحت المراجعة، فاشل، الإجمالي للسنة — each with both an amount and a count chip.
- **FR-051**: Five filter controls MUST be present in this order from start: الحالة (dropdown with all 6 statuses + "الكل")، طريقة الدفع (dropdown: بطاقة مدى، تحويل بنكي، فيزا/ماستركارد، رصيد العائلة، إيصال يدوي، STC Pay)، النطاق الزمني (date-range picker)، الطالب (search input)، العائلة (search input). Visual filters only.
- **FR-052**: The payments table MUST contain at least 10 rows with the following columns: معرّف الدفعة، الطالب، العائلة، المبلغ، العملة، الطريقة، الحالة، التاريخ، الفاتورة المرتبطة، إجراء.
- **FR-053**: Sample rows MUST collectively demonstrate (a) at least one row per the four most common statuses (مدفوعة، تحت المراجعة، فاشل، مستردّ)، (b) at least one row per payment method, (c) at least one EGP-denominated row attributed to an Egyptian family, (d) at least one row demonstrating "رصيد العائلة" as the method.
- **FR-054**: Each row's "إجراء" cell MUST display two icon-buttons: عرض (eye icon — links to admin/invoice-details for the linked invoice when applicable) + قائمة الإجراءات (kebab/more icon — visual menu only).
- **FR-055**: A persistent "إنشاء دفعة يدوية" primary button MUST appear in the top-right of the page header, linking to `pages/admin/create-manual-payment.html`.

#### G. Admin Invoices (`pages/admin/invoices.html`)

- **FR-060**: The page MUST render five summary cards: إجمالي الفواتير، مدفوعة، غير مدفوعة، مدفوعة جزئياً، متأخّرة — each with a count + amount-sum chip.
- **FR-061**: Six filter controls MUST be present: حالة الدفع (chip group with "مدفوعة"، "غير مدفوعة"، "مدفوعة جزئياً"، "متأخّرة"، "ملغاة"، "تحت المراجعة"، "الكل")، نوع الطالب (chips "ناطق بالعربية" / "غير ناطق بالعربية" / "الكل")، نوع البند (dropdown: دورة كاملة، حصة مباشرة، حصة خاصة، حصة جماعية، رسوم تسجيل، الكل)، الشهر (dropdown)، العملة (chips "ريال" / "EGP" / "الكل")، البحث (input by invoice number or student name).
- **FR-062**: The invoices table MUST contain at least 12 rows spanning all six statuses, both student types (at least 2 "غير ناطق بالعربية" rows), both currencies (at least 2 EGP rows), and a mix of all four item types.
- **FR-063**: A bulk-action affordance MUST be present above the table: a master-checkbox column header + a "إجراءات مجمّعة" dropdown (visual only) offering: تنزيل المحدّد، تعليم كمدفوعة، إرسال تذكير، تصدير CSV (visual). The dropdown MUST be visually disabled-styled when no rows are checked.
- **FR-064**: Each row MUST include a per-row checkbox in the leading column AND a "عرض" CTA in the trailing column linking to `pages/admin/invoice-details.html`.
- **FR-065**: An "نوع الطالب" column MUST display "ناطق بالعربية" or "غير ناطق بالعربية" badges; non-Arabic-speaking student rows MUST visually use a distinct (info-tone) badge from the Arabic-speaking student rows.

#### H. Admin Invoice Details (`pages/admin/invoice-details.html`)

- **FR-070**: The page MUST anchor on the same **INV-2026-0184** as the student-side invoice-details page — identical financial figures, identical line-item, identical family-balance application, identical "مدفوعة" (closed) status — so the two surfaces are visibly the same invoice from two perspectives.
- **FR-071**: A "سجل المدفوعات" timeline panel MUST display three chronological events:
  - 2026-04-12 — بطاقة مدى — 200.00 ريال — السجل: AHMED.K (موظف الاستقبال)
  - 2026-04-25 — تحويل بنكي — 170.00 ريال — السجل: SARA.M (موظفة المالية)
  - 2026-04-30 — تطبيق رصيد عائلي (تلقائي عند تاريخ الاستحقاق) — 67.00 ريال — السجل: نظام تلقائي
- **FR-072**: A "استخدام الرصيد العائلي" panel MUST display the single −67.00 ريال entry tied back to family FAM-2023-0211 with a hyperlink "عرض رصيد العائلة" → `pages/admin/family-balances.html`.
- **FR-073**: A "ضريبة القيمة المضافة" line MUST be clearly demarcated showing 15% × 380.00 = 57.00 ريال + the academy tax number 312345678900003 + a tooltip/footnote linking to `pages/admin/tax-settings.html`.
- **FR-074**: A "ملاحظات إدارية" panel MUST contain at least two notes:
  - 2026-04-25 — كاتب: SARA.M — "تم إرسال تذكير دفع للأهل عبر الواتساب لتسديد المبلغ المتبقّي"
  - 2026-04-30 — كاتب: نظام تلقائي — "تم تطبيق رصيد العائلة المتاح (67.00 ريال) تلقائياً عند تاريخ الاستحقاق وفق سياسة المنصة لإغلاق الفاتورة"
- **FR-075**: An action bar MUST display five buttons in this RTL-natural order from the start (right): تعليم كمدفوعة (success-tone)، إضافة دفعة (primary)، تطبيق رصيد العائلة (info-tone)، تنزيل (neutral)، إلغاء الفاتورة (danger-tone, visually separated by a vertical divider). All buttons are visual-only.

#### I. Tax Settings (`pages/admin/tax-settings.html`)

- **FR-080**: The page MUST render a top-of-page toggle "تفعيل الضريبة" (currently ON, success-tone) with a sub-caption "الضريبة مُطبَّقة على الفواتير وفقاً للإعدادات أدناه".
- **FR-081**: A "نسبة الضريبة" numeric input MUST default to 15 with a "%" suffix label.
- **FR-082**: A "الدولة" dropdown MUST offer two options — "المملكة العربية السعودية" (selected, default) and "جمهورية مصر العربية" — each with the country's national VAT number format hint visible.
- **FR-083**: An "تطبيق الضريبة على" checkbox group MUST contain four items in this order: الدورات الكاملة (✓), الحصص المباشرة (✓), الحصص الخاصة (✓), رسوم التسجيل (☐). The first three are checked by default; the registration-fees option is intentionally unchecked.
- **FR-084**: A "الرقم الضريبي" text input MUST be present, defaulting to "312345678900003" for the Saudi configuration.
- **FR-085**: A "ملاحظة تذييل الفاتورة" textarea MUST default to: "السعر شامل ضريبة القيمة المضافة. الرقم الضريبي: 312345678900003. شكراً لثقتكم بأكاديمية إدارتي."
- **FR-086**: An "معاينة حساب الفاتورة" preview section MUST render TWO side-by-side cards:
  - **KSA card** (titled "مثال — المملكة العربية السعودية، 15%"): اشتراك دورة 380.00 → ضريبة 57.00 → الإجمالي **437.00 ريال**
  - **Egypt card** (titled "مثال بديل — جمهورية مصر العربية، 14%"): اشتراك دورة 1500.00 → ضريبة 210.00 → الإجمالي **1710.00 EGP**
- **FR-087**: A primary "حفظ الإعدادات" button (visual only) MUST appear at the bottom-end of the form alongside a secondary "إلغاء" button.
- **FR-088**: An informational callout near the top MUST explain in one short paragraph that registration fees are intentionally tax-exempt per academy policy and that changing the apply-to checkboxes affects all future invoices but does NOT recalculate historical invoices — visible regulatory transparency for the admin.

#### J. Family Balances Admin (`pages/admin/family-balances.html`)

- **FR-090**: The page MUST render three summary tiles: إجمالي العائلات، إجمالي الرصيد بالريال، إجمالي الرصيد بالجنيه — currencies must NEVER be summed across SAR and EGP into a single tile.
- **FR-091**: A search input + currency-filter chips ("ريال" / "EGP" / "الكل") + a "العائلات بدون رصيد" toggle MUST appear above the families table.
- **FR-092**: The families table MUST contain at least six rows with these columns: العائلة، أولياء الأمر، الأبناء المسجّلون (count + names tooltip)، الرصيد الحالي (with currency badge)، آخر معاملة (date)، الإجراءات. Anchor rows:
  - عائلة مؤمن (FAM-2023-0211) — 2 أبناء (عبد الرحمن، سارة) — 450.00 ريال — 2026-05-08 — view/add/deduct/adjust
  - عائلة الحارثي (FAM-2022-0089) — 2 أبناء — 1,200.00 ريال — 2026-04-29 — view/add/deduct/adjust
  - عائلة العتيبي (FAM-2024-0156) — 1 ابن — 0.00 ريال — 2026-03-15 — view/add/deduct/adjust (zero-balance state)
  - عائلة المنصور (FAM-2023-0312) — 3 أبناء — 850.00 ريال — 2026-05-05 — view/add/deduct/adjust
  - عائلة حسن (FAM-2024-0427، Cairo) — 2 أبناء — 380.00 EGP — 2026-05-03 — view/add/deduct/adjust
  - عائلة Hosni (FAM-2024-0511، Alexandria) — 1 ابن — 1,540.00 EGP — 2026-04-18 — view/add/deduct/adjust
- **FR-093**: At least one row MUST display a 0.00 balance (عائلة العتيبي) to demonstrate the zero-balance state's badge styling.
- **FR-094**: Each row's "الإجراءات" cell MUST display four icon-buttons in this order: عرض (eye), إضافة رصيد (plus), خصم (minus), تسوية (adjust/settings) — visual-only, no JS handlers required.
- **FR-095**: A "إنشاء حركة رصيد" primary button MUST appear in the top-right of the page header, linking to `pages/admin/create-manual-payment.html` with a query-style hint (e.g., a URL fragment `#deposit` OR a documented "balance-deposit pre-filled mode" demo state on that page) — operationally equivalent to recording a money-in event for a family without targeting a specific invoice. The button MUST resolve to a real existing HTML file (no `href="#"`).

#### K. Create Manual Payment (`pages/admin/create-manual-payment.html`)

- **FR-100**: The form MUST include a "العائلة" select with at least 6 options (matching the families on family-balances.html), with عائلة مؤمن pre-selected for the demo state.
- **FR-101**: The form MUST include a "الطالب" select that visually shows two options when family = عائلة مؤمن (عبد الرحمن مؤمن، سارة مؤمن), with عبد الرحمن pre-selected. The dependent filtering is presented visually (no JS state change required) — the rendered HTML for the demo state shows only the family-mu'min children.
- **FR-102**: The form MUST include a "الفاتورة" select narrowed to the persona's open invoices, with INV-2026-0231 pre-selected in the default "invoice-payment mode" (May subscription, 437.00 ريال unpaid). The select MUST also expose a "— إيداع رصيد للعائلة بدون فاتورة محددة —" option that, when chosen, hides the invoice requirement and routes the form into "balance-deposit mode" — this is the entry path used by the FR-095 "إنشاء حركة رصيد" CTA on family-balances.html.
- **FR-103**: A "المبلغ المدفوع" numeric input + currency badge ("ريال") MUST be present, defaulting to 437.00 in invoice-payment mode (matching the pre-selected invoice) or to a blank/zero default in balance-deposit mode.
- **FR-104**: A "طريقة الدفع" select MUST offer at least these seven options: نقداً، تحويل بنكي، بطاقة مدى، فيزا/ماستركارد، STC Pay، رصيد العائلة، إيصال يدوي — with "تحويل بنكي" pre-selected. When the form is in **balance-deposit mode**, the option label "إيداع رصيد" MUST appear as an additional first option in the same dropdown (visually grouped under a "إيداع للعائلة" subheading).
- **FR-105**: A "تاريخ الدفع" date input MUST default to today **2026-05-10**.
- **FR-106**: A "ملاحظات" textarea MUST be present with a placeholder "أدخل أي ملاحظات إدارية تتعلق بهذه الدفعة (رقم مرجعي، اسم المُحوِّل، إلخ.)".
- **FR-107**: An "إرفاق إيصال" file-upload affordance MUST be present (drag-and-drop area + button) with allowed-format hint (PDF / JPG / PNG, max 5MB) — visual-only, no real upload handler.
- **FR-108**: Two action buttons MUST appear at the form footer: primary "حفظ الدفعة" (success-tone) + secondary "إلغاء" (neutral, returns to admin/payments.html).
- **FR-109**: A small "بعد الحفظ" caption near the primary button MUST explain that the payment will appear in `pages/admin/payments.html` and update the linked invoice's status — OR, in balance-deposit mode, that the entry will appear as a "إيداع" row on the chosen family's balance-history ledger and on `pages/admin/family-balances.html`. Informational only, no JS behavior.

#### L. Business-rules visibility

- **FR-110**: At least one invoice across all surfaces MUST visibly demonstrate **family-balance application** (anchor: INV-2026-0184, −67.00 ريال auto-applied on due date 2026-04-30, labelled "تلقائي" on every surface that renders the event).
- **FR-111**: Every invoice rendered on every page MUST display a separate VAT line; no page may collapse VAT into a "tax-included total" without showing the VAT amount.
- **FR-112**: At least four pay-per-session invoices MUST appear across the spec (INV-SES-2026-0156 cancelled, INV-SES-2026-0212 under review, INV-SES-2026-0098 overdue, INV-SES-2026-0205 partially paid) demonstrating that pay-per-session is a first-class payment surface alongside full-course subscriptions.
- **FR-113**: At least three full-course-subscription invoices MUST appear (INV-2026-0184 paid via mixed streams + auto-balance, INV-2026-0231 unpaid current, INV-2026-0137 paid prior).
- **FR-114**: At least one **partial payment** example MUST be visible (anchor: INV-SES-2026-0205, 60.00 of 115.00 paid via Mada 2026-04-30, 55.00 remaining, due 2026-05-20 — still inside its payment window so no auto-application has triggered yet).
- **FR-115**: SAR (ريال) MUST be the primary currency on all student and parent pages; EGP MUST appear on at least three admin surfaces (admin/payments, admin/invoices, admin/family-balances) plus the tax-settings example preview.
- **FR-116**: The "ناطق بالعربية vs غير ناطق بالعربية" student-type distinction (Constitution VI Arabic-vs-Foreign pricing rule, scoped on student first-language proficiency rather than residency) MUST be visible at minimum on `pages/admin/invoices.html` as both a filter chip and a per-row badge.

### Key Entities

- **Invoice**: An issued bill for a student's enrollment item or per-session attendance. Attributes: invoice number (e.g., `INV-2026-0184`), issue date, due date, line items, subtotal, discount, VAT amount + percentage + tax-number, family-balance applied, paid amount (sum of payment streams), remaining amount, total, status (one of six), currency (SAR or EGP), assigned student, owning family, optional admin notes thread. Pay-per-session invoices use the `INV-SES-` prefix; subscription invoices use `INV-` prefix.
- **Invoice Line Item**: One billed unit on an invoice. Item types: دورة كاملة، حصة مباشرة محدّدة، حصة خاصة، حصة جماعية. Attributes: type, title, period (e.g., شهر أبريل 2026 for full-course; حصة 18 أبريل for live-session), quantity, unit price, line total. Optional cross-link to the corresponding course-details.html or live-session-details.html page.
- **Payment**: A recorded payment instance against one invoice. Attributes: payment ID, amount, currency, method (نقداً، تحويل بنكي، بطاقة مدى، فيزا/ماستركارد، STC Pay، رصيد العائلة، إيصال يدوي), date, status (مدفوعة، تحت المراجعة، فاشل، مستردّ), recording staff member name, optional attached receipt reference, optional admin note. A single invoice MAY have multiple payment streams (see INV-2026-0184).
- **Family**: A grouping of students sharing a single prepaid balance and a single billing address. Attributes: family ID (e.g., `FAM-2023-0211`), parent/guardian name, member students (1-N), country, primary currency, current balance, last-transaction date.
- **Family Balance Transaction**: A single ledger entry on the family's prepaid-balance history. Types: إيداع (deposit), استخدام للفاتورة (used-for-invoice), استرداد (refund), تسوية (adjustment). Attributes: type, signed amount, date, optional linked invoice (for "used"/"refund" types), optional consuming child (for "used"), admin note. The running balance is the cumulative sum of all transactions.
- **Tax Setting**: Platform-level VAT configuration. Attributes: enabled toggle, percentage, country (Saudi 15% / Egypt 14%), apply-to set (subset of {courses, live sessions, private sessions, registration fees}), tax registration number, invoice footer note. One platform-wide config; admin-only.
- **Student Type**: Discriminator on a student record affecting pricing (Constitution VI). Values: **ناطق بالعربية** (Arabic-native-speaker pricing schedule) / **غير ناطق بالعربية** (non-Arabic-speaker pricing schedule). The criterion is first-language proficiency, NOT country of residence — a student may live in KSA and still be "غير ناطق بالعربية" if they are learning Arabic as a foreign language, and vice versa. Visible as a filter chip and a per-row badge on admin/invoices.html.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All ten new pages exist at the exact paths listed in FR-001, each opens directly in a modern browser without a dev server, and each renders the role-correct sidebar with the active entry highlighted on its destination page (Constitution Quality Gates 1, 4, 5).
- **SC-002**: An evaluator can locate, on `pages/student/payment-history.html`, all six payment-status badges (Paid, Unpaid, Partially Paid, Overdue, Cancelled, Under Review) within 10 seconds — both in the legend strip and in the rendered table rows.
- **SC-003**: An evaluator can complete the "trace one invoice end-to-end" task — start at student/payment-history → click "عرض الفاتورة" on INV-2026-0184 → confirm the financial breakdown and three payment streams → return and switch to admin → open admin/invoice-details for the same invoice → confirm the three admin-only panels (timeline, balance-usage, admin-notes) and the five-action bar — in under 90 seconds with zero broken links.
- **SC-004**: 100% of all "View" / "Pay now" / "Open" / "Download" CTAs on every new page resolve to either an existing HTML file in this spec or an existing HTML file in specs 001-007; zero `href="#"` placeholders, zero "coming soon" stubs (Constitution Principle II).
- **SC-005**: The persona's payment-history table summary card "إجمالي المدفوع" (934.00 ريال) MUST mathematically equal the sum of {Paid + Partially-Paid paid-amounts} across the persona's table rows — i.e. 437.00 (INV-2026-0184) + 437.00 (INV-2026-0137) + 60.00 (INV-SES-2026-0205 partial) = 934.00; the "تحت المراجعة" amount (69.00 ريال on INV-SES-2026-0212) MUST NOT contribute to that sum (verifiable by inspection).
- **SC-006**: Every invoice rendered on every page contains a separate VAT line with both the percentage and the SAR/EGP amount visible — a grep across the 10 new HTML files for "ضريبة" + "%" + "ريال|EGP" returns at least 25 unique invoice contexts.
- **SC-007**: At least one row in `pages/admin/family-balances.html` displays an EGP-denominated balance, AND at least one row in `pages/admin/payments.html` displays an EGP-denominated payment, AND at least two rows on `pages/admin/invoices.html` display EGP-denominated invoices, AND `pages/admin/tax-settings.html` shows both the KSA-15% and Egypt-14% example cards side-by-side — multi-currency support is provably visible in **four** independent admin surfaces (matches FR-115's four-surface requirement and is grep-validated by the Polish-phase task that runs `grep -l 'EGP' pages/admin/payments.html pages/admin/family-balances.html pages/admin/tax-settings.html pages/admin/invoices.html`).
- **SC-008**: The persona's family-balance history on `pages/parent/family-balance.html` contains at least one row of each of the four transaction types (Deposit, Used-for-Invoice, Refund, Adjustment); a stakeholder reviewing the page can name all four types from the rendered rows alone.
- **SC-009**: All currency amounts on student/parent pages render in SAR (ريال label visible per amount), with no SAR row falling back to a generic "$" or "USD" symbol; an EGP amount on admin pages always carries the "EGP" label, never "£" or "EGP £".
- **SC-010**: The admin/invoices.html bulk-action affordance is visible above the table with both a master-checkbox column header and a "إجراءات مجمّعة" dropdown — even when no rows are selected (visual-only affordance per the constitution's bulk-control discipline).
- **SC-011**: An evaluator can identify the persona's overdue private-session invoice (INV-SES-2026-0098, 92.00 ريال, متأخّر منذ 74 يوم) on `pages/student/payment-history.html` within 5 seconds — the row uses both color (danger red) AND a textual overdue-by indicator AND an icon, satisfying Constitution IV's "color is never the sole indicator" rule.
- **SC-012**: The April canonical figures locked in Spec 006 (92% attendance / 88% homework / `RPT-2026-04-Q03-007`) and the Spec 007 leaderboard rank #6 / #2 figures are NOT contradicted anywhere in the new pages; finance pages do not invent new academic figures or override prior anchors.
- **SC-013**: Total CSS bundle size after one-time `npm run build:css` rebuild stays below the constitutional 80 KB ceiling (current Spec 007 baseline ~64-65 KB; Spec 008 expected utility-set delta ≤ 8 KB).
- **SC-014**: Zero new lines of JavaScript are introduced in `assets/js/main.js` for this spec — all interactivity (sidebar drawer, dropdown, modal, tabs) reuses the existing 68-line handler set; the spec's filters, bulk-action affordances, balance-history tabs, and form dropdowns are visually-rendered and do not require new JS handlers.
- **SC-015**: A grep for `href="#"` across the 10 new HTML files returns **zero** matches. Every CTA, sidebar entry, table-row "view"/"pay-now"/"download" button, and primary action resolves to a real existing HTML file in this spec or in specs 001-007 — including the "إنشاء حركة رصيد" header CTA on family-balances.html, which routes to `pages/admin/create-manual-payment.html` per the Q4 clarification.

## Assumptions

The following defaults were chosen where the brief did not specify a single answer; each is documented so a reviewer can override via `/speckit-clarify` if needed.

- **Persona financial scenario**: The persona عبد الرحمن مؤمن is a paying-up-to-date family member with the April subscription INV-2026-0184 fully closed (auto-balance 67.00 applied 2026-04-30 per Clarification Q1 → Option A), a partially-paid private-session bill INV-SES-2026-0205 (60 of 115 paid, 55 remaining, still inside its 2026-05-20 due window), an under-review manual receipt for INV-SES-2026-0212, a pending current-month INV-2026-0231 (437.00 ريال due 2026-05-15), and an old slipped private-session bill INV-SES-2026-0098 (Feb, overdue). The family carries a 450.00 ريال prepaid balance after a 200.00 ريال top-up on 2026-05-05 minus a 133.00 ريال admin adjustment on 2026-05-08. The sister سارة has one overdue April invoice (INV-2026-0188, 322.00 ريال). This scenario was chosen to exercise all six payment statuses and all four balance-transaction types within the persona's family without inventing implausible financial states.
- **VAT rate**: Saudi Arabia 15% (current 2026 standard rate) is the active tax-settings configuration; Egypt 14% is shown as an alternative example in the tax-settings preview. No other country is configured.
- **Tax-exemption policy on registration fees**: Registration fees are tax-exempt by default (apply-to checkbox unchecked) — this is a reasonable academy-policy stance and is explicitly called out in the FR-088 informational callout. Reviewers can flip the default if academy policy differs.
- **Currency primacy**: SAR is the primary currency on all student and parent pages (persona is Saudi-resident). EGP appears as a secondary currency demonstrated on admin pages only — no parent or student pages render EGP. This matches Constitution VI's "SAR primary, EGP secondary" guidance.
- **Sample family roster**: Six demo families across SAR and EGP appear on admin/family-balances.html. Family names (الحارثي، العتيبي، المنصور، حسن، Hosni) are realistic Saudi/Egyptian surnames consistent with prior-spec naming conventions; one family is intentionally seeded with 0.00 balance to demonstrate the zero-balance state.
- **Invoice numbering scheme**: `INV-YYYY-NNNN` for subscription invoices, `INV-SES-YYYY-NNNN` for per-session invoices. The numeric suffixes are ordered chronologically and do not need to be sequential within a single family.
- **Invoice anchor consistency**: The same invoice INV-2026-0184 anchors both `pages/student/invoice-details.html` and `pages/admin/invoice-details.html` — preserving the spec's "two views, one entity" pattern (analogous to Spec 004's `assignment-details` ↔ `homework-review` pairing). All financial figures match exactly across the two views.
- **Cross-spec line-item linking**: The full-course line item on student/invoice-details links back to `pages/student/course-details.html` (Spec 003); per-session line-items link to `pages/student/live-session-details.html` (Spec 003) when those pages exist. If a target page does not exist, the line item displays as plain text — this preserves Constitution Principle II (no broken links).
- **Pay-per-session example invoices**: Three demo session invoices (INV-SES-2026-0156, INV-SES-2026-0212, INV-SES-2026-0098) cover three of the six statuses; together with the three subscription invoices (INV-2026-0184, INV-2026-0231, INV-2026-0137) plus a fourth (INV-2026-0089 from February), the persona's table demonstrates all six statuses without contrivance.
- **Manual-payment form pre-state**: The `pages/admin/create-manual-payment.html` form is rendered in a "pre-filled for the persona's May payment" demo state (family عائلة مؤمن, student عبد الرحمن, invoice INV-2026-0231, amount 437.00 ريال, method تحويل بنكي, date 2026-05-10). This makes the page visually meaningful at first paint; an empty-form state is implicit but not separately rendered.
- **Out-of-scope deferrals**: Teacher payouts, teacher advances, salary-deductions, the "Teacher Finance" admin sidebar entry, and real payment-gateway integrations are explicitly deferred to future specs. The "إنشاء حركة رصيد" admin CTA (FR-095) is **no longer deferred** as of Clarification Q4 — it now routes to `pages/admin/create-manual-payment.html` in balance-deposit mode (FR-102 / FR-104 / FR-109). Every CTA in this spec resolves to a real existing HTML file (per SC-015).
- **Zero prior-spec edits**: Because every prior-spec sidebar already points to the exact file paths required by FR-001 (verified by repository grep before spec authoring), this spec does not modify any file from specs 001-007. The implementation phase only writes new files — preserving the spec-isolation discipline established in spec 007.

## Dependencies

- **Spec 001** (`assets/css/output.css`, design tokens, Tajawal RTL base): consumed without modification; the one-time CSS rebuild in the implementation phase will pick up any new Tailwind utilities used by the 10 new pages via JIT scan.
- **Spec 002** (persona family roster, `dashboard.html` for student/parent): cross-linked from finance pages via the sidebar; persona names and family ID `FAM-2023-0211` are reused without redefinition.
- **Spec 003** (`course-details.html`, `live-session-details.html`): line-items on `pages/student/invoice-details.html` link to these existing pages.
- **Spec 006** (April canonical figures, `RPT-2026-04-Q03-007`): finance pages reference the April subscription period without inventing contradictory academic figures.
- **Spec 007** (`pages/student/calendar.html` "today = 9 مايو 2026"): the May 2026 invoice's due date 2026-05-15 is consistent with this calendar anchor.
- **`assets/js/main.js`**: the existing 68-line vanilla-JS handler set (sidebar drawer, dropdown, modal, tabs) is the only JavaScript consumed; **zero new JS is introduced** by this spec.
