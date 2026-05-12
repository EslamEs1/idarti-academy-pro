# Phase 0: Research & Clarification — Student-Teacher Assignment & Academic Supervision Frontend

**Feature**: 011-student-teacher-assignments
**Date**: 2026-05-11

The Technical Context in `plan.md` carries **zero NEEDS CLARIFICATION markers** — every technology choice (HTML5 + TailwindCSS 3.4 + ES2020 vanilla JS / 0 new lines) is decided by Constitution v1.0.1 and continued from Specs 001-010. The three substantive open questions for this feature (academic-supervisors page architecture, transferred-out student visibility on the prior teacher's view, sanctioned-modal pattern for consequential actions) were resolved inline during `/speckit-specify` and recorded in `spec.md` § Clarifications. This document records (a) the decision detail for each clarification, (b) the cross-spec sourcing rules for every reused identifier / persona / figure, (c) the alternatives considered and rejected, and (d) the validation greps that lock the decisions.

## Decision 1 — Academic-supervisors page is a filtered view of the main assignments entity

**Decision**: The supervision-assignment table on `pages/admin/academic-supervisors.html` is derived from the **same underlying Assignment records** seen on `pages/admin/student-teacher-assignments.html`, filtered to assignment-type = «مشرف أكاديمي». A single supervisor row (e.g., «الأستاذة منى تشرف على عمر شودري») appears as **one row** on both pages, citing the same `ASN-...` identifier. Supervision-specific columns (last-follow-up / next-follow-up / pending-parent-reports / supervision-status) are **surfaced** on the supervisors page without creating a separate underlying entity.

**Rationale**:

- Preserves the **two-views-one-entity** dual-lens discipline established in Spec 008 (INV-2026-0184 admin-view + parent-view) and Spec 010 (Finance Manager mini-matrix appearing identically on `role-details.html` and `user-details.html`). One business entity has one representation; surface variations are columns / cards, not duplicate records.
- Avoids the maintenance nightmare of two parallel systems-of-record: in the static prototype, two parallel tables would still demand identical updates; in the real platform they would be a foreign-key duplication smell. The single-entity rule keeps the spec aligned with the underlying data discipline.
- Constitution VI: "real business rules in the UI". The academy's real rule is that a teacher may carry both a *teaching* assignment and a *supervision* assignment for the same student (or for different students); both are the same kind of binding record with a discriminator column. Modeling this as two entities would obscure that rule.

**Alternatives considered**:

- **(a) Separate supervisor entity** — a parallel `SUP-YYYY-NNNN` identifier and separate data model. **Rejected** because it would force the prototype to invent a new identifier namespace, double the seeded data, and violate the dual-lens discipline. No clear UX benefit.
- **(b) Hidden supervision column on the main assignments page** — fold all supervision-specific columns into the main 13-column table. **Rejected** because the main table is already 13 columns wide (borderline horizontal-scroll territory at desktop); adding 4 more supervision-specific columns (last-follow-up / next-follow-up / pending-parent-reports / supervision-status) would degrade scannability for the dominant teaching-assignment use case.
- **(c) Drop the dedicated supervisors page entirely** — surface supervision only as a filter on the main assignments page. **Rejected** because the user-input lists `academic-supervisors.html` as a required page with its own 4 summary tiles + 4-card supervisor-profiles strip; the page is the natural surface for the operations specialist's «who is supervising whom» workflow.

**Validation grep**: `grep -l "ASN-" pages/admin/student-teacher-assignments.html pages/admin/academic-supervisors.html` MUST return both files; pick any supervisor-type `ASN-...` identifier and verify it appears on both pages by `grep "<that-id>" pages/admin/student-teacher-assignments.html pages/admin/academic-supervisors.html` returning at least one hit per file.

## Decision 2 — Transferred-out students appear in a separate «طلاب سابقون» collapsible section on the prior teacher's view

**Decision**: Teacher A's `pages/teacher/my-assigned-students.html` renders **two stacked sections** — the primary «الطلاب الحاليون» table (only currently-active assignments for teacher A) AND a secondary **collapsible** «طلاب سابقون — للمرجعية التاريخية» section (assignments whose `transferred_out_at` is non-null and whose previous-teacher was A). The anchor demonstration uses `ASN-2024-0902` (حسن المنصور, transferred 2026-03-15 الأستاذ أحمد → الأستاذة منى, reason «طلب ولي الأمر» — أحمد taught حسن Qur'an L1 group sessions before the transfer): because `my-assigned-students.html` is fixed to **الأستاذ أحمد's view** (FR-050) and أحمد is the *previous* teacher of ASN-2024-0902, the row legitimately belongs in أحمد's «طلاب سابقون» section. The same identifier would appear in the «الطلاب الحاليون» section of الأستاذة منى's view — same identifier, two views (the page-pair dual-lens discipline).

**Rationale**:

- Constitution VI: "no silent erasure of historical state". The transferred-out student's old reports / homework / attendance / earnings MUST remain accessible to teacher A — that's the policy this clarification operationalizes.
- Mixing past-and-present students in one table would pollute teacher A's day-to-day workflow. Teachers need to see their current roster at a glance; historical references are valuable but lower-frequency.
- A collapsible `<details>` element is the lowest-cost UX for this: defaulted-collapsed it stays out of the way; expanded it reveals the past students. Zero JS required (native HTML behavior), RTL-safe.
- The empty-state caption «لا يوجد طلاب سابقون» (when no transfers have happened for teacher A) keeps the section discoverable without polluting the page when not exercised.

**Alternatives considered**:

- **(a) Hide transferred-out students entirely from teacher A's view** — only teacher B sees the student after transfer. **Rejected** because it violates Constitution VI's history-preservation policy at the UI level; teacher A loses the ability to reference the student's past performance, which the academy's actual policy preserves.
- **(b) Keep transferred-out students in the active table with a moved-out badge** — show them inline with a chip / visual flag. **Rejected** because it confuses the day-to-day "who am I currently teaching" workflow. The roster count summary card would then need a "10 active + 2 historical" footnote on every count, which is more clutter than clarity.
- **(c) Surface transferred-out students only via a separate "historical assignments" page** — a new admin/teacher page dedicated to history. **Rejected** because it inflates the spec to 8 pages without UX gain; the collapsible section reuses the existing my-assigned-students page and satisfies the visibility requirement.

**Validation grep**: `grep "طلاب سابقون" pages/teacher/my-assigned-students.html` MUST return at least one hit; `grep "ASN-2024-0902" pages/teacher/my-assigned-students.html` MUST return at least one hit; `grep "<details" pages/teacher/my-assigned-students.html` MUST return at least one hit (the native collapsible element).

## Decision 3 — Stop / transfer / save-assignment consequential actions use the existing main.js `data-modal-open` sanctioned-modal pattern

**Decision**: Both consequential actions («إيقاف التعيين» on assignment-details + «تأكيد النقل» on transfer-student-teacher) trigger `<div role="dialog" class="hidden">` modals via the existing main.js handler (lines 36-44) — same pattern as Spec 010's three user-details modals and Spec 009's three settlement-action modals. The «حفظ التعيين» on the create-assignment form and the «استئناف» on a موقوف assignment row are also modal-triggered for consistency. Each modal carries:

- A **projected post-action caption** explaining what would change if the action were real («سيتم نقل سارة مؤمن من الأستاذة منى سعد إلى الأستاذ خالد العبدلي ابتداءً من 2026-05-15 — يبقى ربط جميع السجلات السابقة بالأستاذة منى سعد دون تغيير»).
- A «هذا عرض مرئي فقط — لن يتم تنفيذ الإجراء فعلياً» **secondary caption** making the no-real-write semantics explicit.
- A **confirm / cancel** button pair using the existing `data-modal-close` selector.

**Rationale**:

- Stop-assignment and transfer-teacher are exactly the consequential, family-affecting, hard-to-undo actions Constitution V #4 authorizes confirmation modals for. The save-assignment and resume-assignment cases are included for consistency: every state-mutating CTA in this feature uses the same pattern.
- The modal body is the only place where the history-preservation guarantee can be reinforced at the moment of action — surfacing it on the page is one thing, but seeing it again the instant before "confirming" the action drives the policy home.
- **Zero new JS** — reuses the existing `data-modal-open` attribute selector from main.js lines 36-44 (verified against the actual handler source). The spec's SC-012 grep `wc -l assets/js/main.js` = 68 unchanged passes.

**Alternatives considered**:

- **(a) Live form submit with toast-style success message** — wire a real handler. **Rejected** because Constitution I forbids backend / API / simulated-mutation in the static prototype; a toast without a real write would be deceptive UX.
- **(b) Inline disabled-caption text** — render the action as a passive caption rather than a clickable CTA. **Rejected** because the user-input lists these as actual «Stop» / «Confirm Transfer» CTAs; the page must communicate the action's existence to support the family-facing narrative.
- **(c) Sanctioned modal — no projected post-action caption, only "هذا عرض مرئي فقط"** — minimal modal copy. **Rejected** because the modal body is the natural place to communicate the history-preservation rule + the projected state change; a minimal modal would miss the educational opportunity to demonstrate the rule at the point of action.

**Validation grep**: `grep -c "data-modal-open" pages/admin/student-teacher-assignment-details.html pages/admin/transfer-student-teacher.html pages/admin/create-student-teacher-assignment.html pages/admin/student-teacher-assignments.html` MUST return a sum ≥ 4 (save / stop / transfer / resume); `grep "هذا عرض مرئي فقط" pages/admin/student-teacher-assignment-details.html pages/admin/transfer-student-teacher.html pages/admin/create-student-teacher-assignment.html pages/admin/student-teacher-assignments.html` MUST return at least 4 hits.

## Content-sourcing rules (cross-spec reconciliation)

This is the **eleventh** spec in the program. The content reuse rules below preserve cross-spec figure consistency and prevent the prototype from accidentally contradicting prior locked anchors.

### Persona family (Spec 002 anchor, preserved verbatim)

- **عبد الرحمن مؤمن** — STD-2023-0143, age 11, جدة, «ناطق بالعربية», parent محمود مؤمن. Anchor student. Studies دورة القرآن الكريم — المستوى الثالث with الأستاذ أحمد (assignment `ASN-2024-1184`, started 2024-09-15). **NEW IN SPEC 011**: also studies «حصص جماعية» with الأستاذة منى (assignment `ASN-2024-1191`, started 2025-02-10) — demonstrating the multi-teacher rule.
- **سارة مؤمن** — STD-2023-0144, age 9, جدة, «ناطق بالعربية», same parent. Studies دورة القرآن الكريم — المستوى الثاني with الأستاذة منى in group sessions (assignment `ASN-2024-1185`, started 2024-09-15). **NEW IN SPEC 011**: pre-populated as the transfer-page demo target → moving to الأستاذ خالد for reason «تعارض في الجدول».
- **محمود مؤمن** — PRT-2023-0089, parent of both. Family `FAM-2023-0211` (450 ريال balance — Spec 008-locked verbatim).

### Named teachers (Spec 002 / 009 anchors, preserved verbatim)

- **الأستاذ أحمد بن عبد الله** — TCH-2023-0011. SAR salary buckets per Spec 009. Spec-009 anchor settlement `STL-2026-04-TCH-0042` (3,750 ريال صافي بانتظار الاعتماد). Capacity = 12/12 (at-capacity demo on the assignments page summary card). **NEW IN SPEC 011**: ≈ 5 active teaching assignments + 1 transferred-out history-link to `ASN-2024-0902` (حسن المنصور, whom أحمد taught Qur'an L1 group sessions before transferring him to الأستاذة منى on 2026-03-15 — this is the «طلاب سابقون» demo row on أحمد's `my-assigned-students.html`).
- **الأستاذة منى سعد** — TCH-2023-0012. SAR. ≈ 5 active assignments. Pre-populated as the current-teacher in the transfer-page demo for ASN-2024-1185; and the *new* teacher of ASN-2024-0902 after the March transfer.
- **الأستاذ خالد العبدلي** — TCH-2023-0013. SAR. ≈ 4 active assignments. Pre-populated as the new-teacher in the transfer-page demo (sister سارة moving to him) AND as the demo teacher in the create-form (عمر شودري being assigned to him).
- **الأستاذة هبة** — TCH-2024-0089 (Egypt). EGP salary buckets per Spec 009. 1 EGP-tier active assignment + 1 academic-supervisor-only record. Carries forward the Spec 008/009 multi-currency-never-summed discipline.

### Admin staff (Spec 010 anchors, preserved verbatim)

- **محمد بن عبدالعزيز الإدريسي** — USR-2024-0001 / المدير التنفيذي / super-admin. No direct involvement in this feature's seeded scenario; appears as actor of the assignment-history timeline event «إنشاء التعيين» on ASN-2024-1184 (created by him on 2024-09-15).
- **سارة محمد عبدالله** SARA.M — USR-2024-0007 / Finance Manager. Anchor admin user for the create-assignment / transfer / assignments-list narration in user stories 1 and 2.
- **أحمد بن خالد المالكي** AHMED.K — USR-2024-0011 / Operations. Anchor admin user for the academic-supervisors narration in user story 4.

### New seeds (introduced in Spec 011 only)

- **عمر شودري** — STD-2024-0034, age 11, جدة, «غير ناطق بالعربية», Pakistani father. **Foreign-student anchor**. Drives the create-form demo state (assigned to الأستاذ خالد for دورة القرآن الكريم — المستوى الثالث with «غير ناطق» pricing = 600.00 ريال matching Spec 010 Rule 2) + 6-row «غير ناطق» minimum on the assignments table + the academic-supervisor «تحتاج اهتماماً عاجلاً» row.
- **محمد إقبال شودري** — PRT-2024-0089, Pakistani father. Family `FAM-2024-0089` (0 ريال balance — distinct from `FAM-2023-0211`'s 450 ريال). Demonstrates the empty-family-balance pricing-preview path on the create-form.
- **حسن المنصور** — STD-2023-0067, age 10, الرياض, «ناطق بالعربية», parent ماجد المنصور (PRT-2023-0067). Family `FAM-2023-0067` (no balance demo — not exercised in this spec). Transferred 2026-03-15 from **الأستاذ أحمد** (who taught him Qur'an L1 group sessions) to **الأستاذة منى** for reason «طلب ولي الأمر». Assignment `ASN-2024-0902`. **The «طلاب سابقون» anchor** — appears on الأستاذ أحمد's `my-assigned-students.html` because أحمد is the previous teacher (FR-050 fixes that page to أحمد's view).

### Cross-spec anchor identifiers (verbatim citations)

| Identifier | Source | First citation | Re-cited on |
|------------|--------|----------------|-------------|
| `RPT-2026-04-Q03-007` | Spec 006 | (cited there) | Not re-cited in this spec (the report identifier appears only in the audit-log per Spec 010 + on the teacher-view via the «عرض التقرير» CTA route — the CTA links to the report page where the identifier already lives) |
| `INV-2026-0184` | Spec 008 | (cited there) | `pages/admin/student-teacher-assignment-details.html` related-invoices list (FR-032 + SC-005) |
| `FAM-2023-0211` | Spec 008 | (cited there) | `pages/admin/student-teacher-assignment-details.html` family card + `pages/admin/create-student-teacher-assignment.html` pricing-preview family-balance line (FR-024 + SC-005) |
| `STL-2026-04-TCH-0042` | Spec 009 | (cited there) | `pages/admin/student-teacher-assignment-details.html` teacher-earning-preview tile (FR-032 + SC-005) |
| **`ASN-2024-1184`** | **Spec 011 (new)** | Assignment list row + admin-details page heading + teacher-view page heading | Appears on ≥ 4 of the 7 new pages per SC-003 |

### Cross-spec figures (preserved verbatim, never invented or contradicted)

| Figure | Source | Preserved on |
|--------|--------|--------------|
| **92%** (attendance) | Spec 006 | Persona's row on `my-assigned-students.html` + `assigned-student-details.html` attendance-history card |
| **88%** (homework) | Spec 006 | `assigned-student-details.html` homework-history card |
| **88-100** (monthly exam range) | Spec 006 | Not re-cited (the exam page is not in this spec; the range is preserved by omission) |
| **89-100** (overall) | Spec 006 | Not re-cited (same reason) |
| **"ممتاز"** (overall grade) | Spec 006 | `assigned-student-details.html` progress-summary tile |
| **437.00 ريال** (INV-2026-0184 total) | Spec 008 | Not re-cited verbatim (only the invoice ID is cited; the figure is implicit via the link) |
| **380.00 ريال** (course subtotal) | Spec 008 + Spec 010 Rule 1 | Pricing-preview on `create-student-teacher-assignment.html` if the seeded state were persona-instead-of-عمر (NOT exercised — seeded state is عمر/600/غير-ناطق) + on assignment-details «نموذج الدفع» column of the persona's row |
| **600.00 ريال** (course subtotal — غير ناطق) | Spec 010 Rule 2 | Pricing-preview on `create-student-teacher-assignment.html` seeded عمر state |
| **450.00 ريال** (FAM-2023-0211 balance) | Spec 008 | `student-teacher-assignment-details.html` family card |
| **3,750 ريال** (STL settlement net) | Spec 009 | Not re-cited verbatim (only the settlement ID is cited) |
| **1,500.00 EGP** (Egypt-tier course) | Spec 010 Rule 8 | The 1 EGP-tier row on `student-teacher-assignments.html` |

### Sidebar update rule

The admin sidebar partial in every existing `pages/admin/*.html` gains **2 new `<li>` entries** at the canonical position (between «الطلاب» and «المعلمون»):

```html
<li>
  <a href="student-teacher-assignments.html" class="<sidebar-link-classes>">
    <svg ...><!-- link icon --></svg>
    <span>تعيين الطلاب للمعلمين</span>
  </a>
</li>
<li>
  <a href="academic-supervisors.html" class="<sidebar-link-classes>">
    <svg ...><!-- supervisor icon --></svg>
    <span>المشرفون الأكاديميون</span>
  </a>
</li>
```

The teacher sidebar partial in every existing `pages/teacher/*.html` gains **1 new `<li>` entry** at the canonical position (between «جدولي» and «الأرباح»):

```html
<li>
  <a href="my-assigned-students.html" class="<sidebar-link-classes>">
    <svg ...><!-- students icon --></svg>
    <span>طلابي</span>
  </a>
</li>
```

The 2 / 1 insertions MUST be **identical across every file** in their respective directory — the `git diff` for `pages/admin/*.html` MUST show the same added lines across files (SC-011). The path prefixes are relative since the admin sidebar lives in admin pages that already reference siblings via plain filename; the teacher sidebar follows the same convention.

## Sample-data design decisions

### Assignment-status mix on the main table (18 rows)

- **نشطة**: 16 rows (the operational mass)
- **موقوفة**: 1 row (the soft-stop demo — actions cell shows عرض / تعديل / استئناف / حذف instead of the default 4)
- **مكتملة**: 1 row (a completed full-course demo for a student who finished دورة الفقه — Spec-003-existing course — last month)

### Student-type mix on the main table (18 rows)

- **ناطق بالعربية**: 12 rows (the operational mass — Saudi-and-Arab-speaking students)
- **غير ناطق بالعربية**: 6 rows (matches the «6 تعيينات لطلاب غير ناطقين» summary card; the 6 rows include عمر شودري's create-form-target + 5 other foreign students seeded with realistic non-Saudi names)

### Session-type mix on the main table (18 rows)

- **خاصة**: 10 rows
- **جماعية**: 8 rows

### Currency mix on the main table (18 rows)

- **SAR**: 17 rows
- **EGP**: 1 row (الأستاذة هبة × Egyptian student, Rule 8 = 1,500.00 EGP)

### Payment-model mix on the main table (18 rows)

- **دورة كاملة**: 9 rows (50%)
- **جلسات بث محددة**: 4 rows
- **اشتراك شهري**: 3 rows
- **حصة تجريبية**: 2 rows (the zero-price edge case for 2 prospective students)

### Remaining-sessions edge cases

- 2 rows with «الجلسات المتبقية ≤ 2» carrying the warning-amber «على وشك الانتهاء» indicator (renewal-prompt state demo)
- 1 row with «18 من 24» (the persona anchor ASN-2024-1184 — partway through)

### Assignment-type mix on the main table (18 rows)

- **معلم رئيسي**: 14 rows (primary teaching)
- **معلم مساعد**: 1 row
- **معلم بديل**: 0 rows (substitute teachers don't carry standing assignments — they fill in ad-hoc)
- **معلم تقييم**: 1 row
- **معلم مؤقت**: 0 rows (same rationale as substitute)
- **مشرف أكاديمي**: 2 rows (the supervision-only assignments — supervisor follows progress without being the primary teacher). These 2 rows are **part of the 18-row main table**. They share the `ASN-...` identifier discipline with the `academic-supervisors.html` page (the page-pair dual-lens), but the supervisors page is **not** required to be a strict subset of the 18-row main table.

**Counting model (single source of truth — supersedes any earlier wording):** the 18-row main table on `student-teacher-assignments.html` = **16 teaching rows + 2 «مشرف أكاديمي» rows = 18**. Separately, the `academic-supervisors.html` page seeds its **own 14 supervision rows / 4 supervisors** directly in that page's markup (these need not appear on the main table to satisfy SC-003 — SC-003 is satisfied via the `ASN-2024-1184` anchor row on the main table + the admin-details/teacher-view pages + the supervisors-page row for عبد الرحمن).

### Teacher distribution on the main table (18 rows = 16 teaching + 2 supervisor)

| Teacher | Teaching rows | «مشرف أكاديمي» rows | Total rows on main table |
|---------|--------------:|--------------------:|-------------------------:|
| الأستاذ أحمد | 5 (+1 transferred-out history-link to ASN-2024-0902) | 0 | 5 |
| الأستاذة منى | 5 | 0 | 5 |
| الأستاذ خالد | 4 | 0 | 4 |
| الأستاذة هبة | 2 | 0 | 2 |
| _supervision-only (no teaching on this row)_ | 0 | 2 | 2 |
| **Total** | **16** | **2** | **18** |

(The "+1 transferred-out history-link" on أحمد's row count is the `ASN-2024-0902` historical record — it is rendered as أحمد's «طلاب سابقون» entry on `my-assigned-students.html`, not as a current row in the 18-row table; it is listed here only to show where the transfer-out demo data lives. The teacher counts may be adjusted during `/speckit-plan` as long as the 18-row total, the 16-teaching + 2-supervisor split, the 6-«غير ناطق» minimum, the 1-موقوف minimum, and the 1-EGP minimum all hold.)

Note: the «3 طلاب بدون معلم» summary tile is not part of the 18 rows — it links to a hypothetical filtered view of the existing `pages/admin/students.html` page (the 3 waiting-list students are seeded inside the summary tile's expanded popover only; no main-table row).

## Constitutional gates re-check (Phase 0 close)

| Gate | Status |
|------|--------|
| Static-First | ✅ unchanged |
| Self-Contained Pages | ✅ unchanged |
| Arabic-First / RTL | ✅ unchanged |
| Premium Tone | ✅ unchanged |
| Minimal JS | ✅ unchanged |
| Real Business Rules | ✅ unchanged |

Phase 0 closes with the same Constitution Check verdict as the initial plan check: PASS. No new clarifications surfaced during research; the spec is ready for Phase 1 design.
