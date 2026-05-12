# Phase 0 Research — Reports, Attendance, and Exams Frontend

This document records every clarification-driven decision, every content-sourcing choice, and every design-discipline rule that downstream artifacts (data-model.md / contracts/ / tasks.md) MUST consume verbatim. The format follows Spec 005's research.md: numbered research items, each with **Decision**, **Rationale**, **Alternatives considered**, and (where applicable) **Cross-doc references**.

The spec's two clarifications are recorded as R1 + R2 below. The remaining items (R3–R14) capture sample-data anchors, content-sourcing decisions, and shell/JS scope rules that the implementer needs to ship the eight pages without re-deriving them.

---

## R1. Q1 — Filename canon (resolved 2026-05-08)

**Decision**: Match prior-spec links. The three originally-ambiguous pages are bound to:
- `pages/parent/my-children.html` (NOT `children.html`)
- `pages/parent/child-reports.html` (plural, NOT `child-report.html` singular)
- `pages/teacher/student-reports.html` (plural, NOT `student-report.html` singular)

**Rationale**: Three convergent reasons.
1. **Constitution v1.0.1 sidebar enumerations already use the plural form**: "My Children" / "Child Reports" / "Student Reports". The plural is the constitutional canon; forcing the brief's singular into a singular file would create a label/filename mismatch.
2. **Existing prior-spec links already resolve to these filenames**. `pages/parent/dashboard.html` lines 47 / 55 / 244 / 292 link to `my-children.html` and `child-reports.html`. `pages/teacher/dashboard.html` lines 71 / 312 link to `student-reports.html`. Following the brief's singular would have required editing 6 inbound `href` values across 2 prior-spec dashboards — non-trivial drift.
3. **Zero edits to prior-spec pages = zero regression risk**. Spec 005's T054 inbound-wiring audit pattern (verify `git status` lists only the new spec's files + `specs/<feature>/`) becomes trivially achievable here. The eight new pages drop in as zero-delta destinations for already-correct inbound links.

**Alternatives considered**:
- **Follow brief exactly** (singular filenames + edit prior dashboards): rejected — introduces 6+ touch-point edits to Spec 002's parent dashboard and Spec 005-era teacher dashboard, risks drift, and contradicts the constitutional sidebar nomenclature.
- **Split per-page** (mixing plurals and singulars per the brief's intent): rejected — partial alignment is worse than full alignment because reviewers have to remember which is which.

**Cross-doc references**: spec.md §Clarifications Q1; FR-065 (zero prior-spec edits); SC-015 (inbound-link audit); CLAUDE.md (no shell-drift expected).

---

## R2. Q2 — `exams.html` scope vs Spec 005's `monthly-exams-passed.html` (resolved 2026-05-08)

**Decision**: Inclusive hub. `pages/student/exams.html` is the comprehensive exam catalog and renders three tabs:
- **اختبارات قادمة** (default-selected): ≥ 2 upcoming-exam cards. Sample anchors: (1) "اختبار شهر مايو — القرآن الكريم المستوى الثالث" — 28 مايو 2026 — 45 دقيقة — الأستاذ أحمد بن عبد الله; (2) "اختبار قواعد اللغة العربية — أسبوع 22" — 14 مايو 2026 — 30 دقيقة — الأستاذة منى سعد.
- **اختبارات مكتملة**: ≥ 4 weekly-quiz / term-test rows including ≥ 1 "ناجح" + ≥ 1 "يحتاج إعادة". Sample anchors: weekly Quran-tajweed quiz 18/20 (ناجح), Arabic grammar quiz 16/20 (ناجح), Islamic-Studies term test 15/20 (ناجح), one Arabic-vocabulary quiz 12/20 (يحتاج إعادة).
- **اختبارات شهرية**: 5 monthly rows IDENTICAL to Spec 005's `monthly-exams-passed.html`: December 2025 90% / January 2026 78% / February 82% / March 95% (Quran-L2-final, parchment-tinted) / April 88%. Each row links to `exam-details.html`. A small caption ("هذه الاختبارات تظهر أيضاً في صفحة 'الاختبارات الشهرية المجتازة' داخل الإنجازات") clarifies the dual-surface relationship without being a clickable link out (the achievement lens is reached from `achievements.html`).

**Rationale**: Two convergent reasons.
1. **Faithful to the brief**, which explicitly lists "Monthly exam results" as one of the three sub-sections of `exams.html`. Removing the monthly section to avoid overlap would have meant deleting brief-mandated content.
2. **The two surfaces serve distinct audiences**: `exams.html` is the operational catalog (a student preparing for next exam wants to see upcoming + recent results in one filterable view); `monthly-exams-passed.html` is the achievement lens (a parent reading the achievements hub wants the celebratory passed-only narrative). Both use cases are real; deduplication would have hurt one or the other.

The cost — 5 monthly rows duplicated in two HTML files — is mitigated by FR-005 + FR-062 (cross-spec reconciliation): both files MUST present byte-identical dates / scores / status pills for the 5 monthly rows. Any drift is grep-detectable.

**Alternatives considered**:
- **Separation**: drop the monthly tab from `exams.html`, link out to `monthly-exams-passed.html`. Rejected — contradicts the brief and forces the student to leave the operational catalog to see monthly results.
- **Inclusive without tabs**: render upcoming + completed + monthly as one chronological timeline with a "اختبار شهري" type pill. Rejected — the brief's "three sub-sections" wording implies tabbed segmentation; mixing exam types in one feed makes the upcoming exams less prominent.

**Cross-doc references**: spec.md §Clarifications Q2; FR-035 (monthly-tab content); FR-062 (cross-spec reconciliation); SC-009 (figure-byte-identity audit).

---

## R3. Sidebar and header — zero-delta reuse

**Decision**: Hard-embed the existing role sidebars verbatim into each new page; do not introduce a runtime include mechanism.

- Five **student** pages (`reports`, `monthly-report`, `attendance`, `exams`, `exam-details`): copy the 15-entry student sidebar from `pages/student/dashboard.html` (or any later student page like `pages/student/achievements.html` from Spec 005), then set `aria-current="page"` + the `is-active` class on the appropriate entry per page:
  - `reports.html` → التقارير
  - `monthly-report.html` → التقارير (children-of, since this is a sub-page of reports)
  - `attendance.html` → (no dedicated sidebar entry exists — student sidebar's "الإنجازات" is closest, OR no entry is set active and the page is reached only via deep links from monthly-report / parent-dashboard) — see R4
  - `exams.html` → الاختبارات
  - `exam-details.html` → الاختبارات (children-of)
- Two **parent** pages (`my-children`, `child-reports`): copy the 11-entry parent sidebar from `pages/parent/dashboard.html`, then set:
  - `my-children.html` → أبنائي
  - `child-reports.html` → تقارير الأبناء
- One **teacher** page (`student-reports`): copy the 12-entry teacher sidebar from `pages/teacher/dashboard.html`, then set:
  - `student-reports.html` → تقارير الطلاب

Header chrome (search input / bell-as-anchor / profile dropdown) is identical to the Spec 002 baseline on every page.

**Rationale**: Spec 005 followed this same pattern (zero shell drift; sidebars copied; only the active entry changed). The cost is duplication; the benefit is "every page is openable as a static file" (Constitution Principle II). Runtime includes would violate Principle I.

**Alternatives considered**:
- Component partial via JavaScript include: rejected — violates Principles I + V.
- Server-side includes (PHP / Jekyll layouts): rejected — would require a build/run server.

**Cross-doc references**: data-model.md §E0 (shell schema); contracts/*.md (each page's sidebar-active entry).

---

## R4. Student `attendance.html` sidebar-active entry

**Decision**: On `pages/student/attendance.html`, no student-sidebar entry is set as `aria-current="page"` because the student sidebar's 15-entry catalog (constitution v1.0.1) does not include a dedicated "الحضور" entry. The page is reachable from:
- `pages/student/dashboard.html`'s attendance card body link
- `pages/student/monthly-report.html`'s attendance mini-summary card CTA
- (parent-side) `pages/parent/dashboard.html`'s "عرض سجل الحضور" body link (line 364) — note the inheritance gap: this link points to `pages/parent/attendance.html` (out of scope per spec.md §Out of scope), NOT to the student-side page

The page's breadcrumb makes its origin clear: "الرئيسية / التقارير / سجل الحضور". The breadcrumb's "التقارير" segment links to `reports.html` so a student can navigate back to the report hub.

**Rationale**: The constitution does not list "الحضور" in the student sidebar, so introducing it would be a constitutional amendment (out of scope for this spec). Using the breadcrumb to anchor navigation is consistent with Spec 003's `course-details.html` pattern (no dedicated sidebar entry; breadcrumb anchors the back-navigation).

**Alternatives considered**:
- Add "الحضور" to the student sidebar. Rejected — requires constitutional amendment + ripple edits to all prior-spec student pages.
- Highlight "التقارير" in the sidebar even though the user landed on the attendance page directly. Rejected — misleading active-state.

**Cross-doc references**: contracts/attendance.md (breadcrumb spec); spec.md §Out of scope §parent-role / teacher-role attendance pages.

---

## R5. JavaScript scope — zero new handlers

**Decision**: Zero new JS additions. `assets/js/main.js` line count remains at 68 (Spec 001/005 baseline).

The only interactive behavior in this feature that needs JS is the tab switch on `exams.html` (3 tabs: upcoming / completed / monthly). The existing tabs handler in main.js (lines 47-66) is reused with no modification. **Actual markup convention** (verified from `live-sessions.html`): container uses `role="tablist"`; each tab button uses `role="tab"` + `aria-controls="<panel-id>"`; the active tab has `aria-selected="true"` + class `is-active`; panels are wrapped in a `[data-tabpanels]` parent with `role="tabpanel"` + `id="<panel-id>"`; inactive panels have class `hidden`. The handler reads `aria-controls` (not `data-tab`) to find the target panel and toggles `hidden`/`is-active`.

The tri-state progress track on `child-reports.html`, the sibling-switcher chip strip, the month-selector chip strip on `reports.html`, the filter chips on every page — all are visual-only. Where state-change is conceptually expected (e.g., "click a different month to see that month's report"), placeholder anchors (`<a href="?month=2026-04">`) provide the affordance without requiring JS.

The attendance trend chart on `attendance.html` is hand-authored static SVG inline in the page (≤ 80 LOC, no `<script>` tags). The Y-axis is a fixed 0–100% range; the bars are 5 fixed-height rectangles; the reference line at 90% is a single `<line>` element; the labels are `<text>` elements positioned absolutely.

**Rationale**: Constitution Principle V + Spec 001/002/003/004/005 pattern. The fewer JS additions, the closer the project stays to "static, openable file" guarantee.

**Alternatives considered**:
- Adopt a charting library (Chart.js): rejected — runtime dependency violates Principle I.
- Add a `<canvas>`-based hand-painted chart: rejected — would require JS.
- Render the trend as a CSS-grid bar chart with `bg-{hue}-{n}` classes: rejected — less precise positioning of the 90% reference line.

**Cross-doc references**: plan.md §Constitution Check §V; contracts/attendance.md §Trend visual; contracts/exams.md §Tabs.

---

## R6. Persona family + cross-spec continuity table

**Decision**: The cross-spec persona table for Spec 006:

| Field | Value | Locked by |
|-------|-------|-----------|
| Primary student | عبد الرحمن مؤمن (ع.م) | Spec 002 dashboard / Spec 005 |
| Grade level | الصف السادس | Spec 002 parent dashboard line 232 ("الصف السادس") |
| Curriculum path | مسار القرآن الكريم — المستوى الثالث (60% in progress) | Spec 005 R5 |
| Sibling | سارة مؤمن (س.م) — الصف الثالث | Spec 002 parent dashboard lines 230-238 |
| Sibling status | يحتاج إلى دعم (warning-100 + alert icon) | Spec 002 parent dashboard line 237 |
| Parent | ولي أمر الطالب عبد الرحمن | Spec 002 parent dashboard line 170 |
| Primary teacher (Quran) | الأستاذ أحمد بن عبد الله (أ.أ) | Spec 005 |
| Secondary teacher (Arabic) — NEW | الأستاذة منى سعد (م.س) | This spec |
| Secondary teacher (Islamic Studies) | الأستاذ خالد العبدلي | Spec 005 R5 (kept) |
| Family balance | 750 ر.س | Spec 003 / 004 |
| Active courses (May 2026) | القرآن الكريم — المستوى الثالث / اللغة العربية — المستوى الرابع / الدراسات الإسلامية — المستوى الثاني | This spec (with constraint that the Quran path matches Spec 005's L3-in-progress claim) |
| Reporting window | December 2025 → April 2026 (5 months); May 2026 = in-progress | Spec 005 R5 |
| Report-month focus | **April 2026** = "just-completed" reporting month (the report a parent reads on 2026-05-09 is the April report) | This spec |

**Rationale**: Continuity is the spec's distinguishing trust signal. A reviewer reading any one of the eight pages MUST be able to identify the persona, sibling, parent, and three teachers from the visible content alone, AND verify that those identities match every prior-spec page.

**Cross-doc references**: spec.md §Overview §persona-family; data-model.md §sample-data anchors.

---

## R7. April 2026 report figures — the canonical numbers

**Decision**: A single set of April 2026 numbers reconciles 1:1 across `reports.html`'s persona row + `monthly-report.html` + `child-reports.html` + `student-reports.html`. Any reviewer reading all four pages MUST see exactly these values:

| Metric | Numeric | Display | Source-of-truth |
|--------|---------|---------|-----------------|
| Attendance rate | 92% | "حضر 11 من 12 حصة" | Parent dashboard already pins "4 من 5 أيام حضور كامل" — extrapolated to 11/12 sessions for the full April month |
| Homework completion | 88% | "أنجز 7 من 8 واجبات في موعدها" | Spec 004 "3 واجبات مستحقة" + 4 already-submitted ≈ persona's homework volume; rounding to 88% / 7-of-8 keeps numbers tidy |
| April monthly exam score | 88 / 100 (88%) | "اختبار شهر أبريل — Quran L3" | Spec 005 §R5: "5 monthly exams passed (Dec 2025 → Apr 2026, average 86.6%)" — the April row in Spec 005's `monthly-exams-passed.html` is 88% |
| Quiz average (multi-course rollup) | 86.6% | "متوسط الاختبارات" | Spec 005 cumulative-average anchor (88+95+82+78+90)/5 = 86.6 |
| Overall evaluation pill | ممتاز | success-100 + star icon | Logical mapping from 89/100 |
| Overall numeric score | 89 / 100 | "89/100" | Synthesized from the four metrics; mid-90s attendance + high-80s homework + high-80s quiz → ~89 holistic |
| Active classes count | 3 | "الفصول النشطة (3)" | Per-course detail table renders 3 rows |

**Rationale**: A single canonical set of numbers prevents the spec's most serious failure mode — different pages contradicting each other about the same student's same month.

**Cross-doc references**: spec.md FR-062; SC-009; data-model.md §sample-data anchors.

---

## R8. April 2026 reflection panels — strengths / improvements / next-month plan

**Decision**: A single Arabic content set for the three reflection panels on `monthly-report.html`. The same content (or close paraphrases) appears as bullet inputs in the teacher's recommendation panel on `student-reports.html` and as compressed phrasing in the parent's suggested-action on `child-reports.html`.

**Strengths (نقاط القوّة) — ≥ 4 bullets**:
1. الحفظ المتقن لسورة الفجر
2. الالتزام الكامل بمواعيد الحصص
3. جودة الكتابة الإنشائية في اللغة العربية
4. الفهم العميق للسيرة النبوية في الدراسات الإسلامية

**Improvements (نقاط للتحسين) — ≥ 3 bullets**:
1. تطبيق أحكام التجويد في الآيات الطويلة
2. تنويع المفردات في التعبير الكتابي
3. زيادة سرعة القراءة الجهرية

**Next-month plan (خطة الشهر القادم — مايو 2026) — ≥ 4 bullets**:
1. إكمال المستوى الثالث من القرآن وبدء التحضير للمستوى الرابع
2. مراجعة قواعد الإملاء الأسبوعية
3. جلسة فردية مع الأستاذ أحمد لتجويد الآيات الطويلة
4. اختبار شهر مايو في 28 مايو 2026

**Rationale**: The teacher's `student-reports.html` page renders these same 4+3+4 bullets as `<input>` values (one per bullet) so the reviewer reading the teacher form sees the exact same plan that the student reads on `monthly-report.html`. This is the spec's symmetry rule (FR-058 + FR-059).

**Cross-doc references**: spec.md FR-021 / FR-058 / FR-059 / FR-062; data-model.md §sample-data anchors.

---

## R9. Teacher-note quote blocks (3 quotes for monthly-report; 2 for child-reports)

**Decision**: The three teacher-note quote blocks on `monthly-report.html` are:

1. **الأستاذ أحمد بن عبد الله — القرآن الكريم — 30 أبريل 2026** (avatar أ.أ, primary-700 fill):
   > "أداء عبد الرحمن في الحفظ هذا الشهر ممتاز، وقد أتقن أحكام الميم الساكنة. يحتاج إلى تركيز إضافي على التجويد في الآيات الطويلة."
2. **الأستاذة منى سعد — اللغة العربية — 30 أبريل 2026** (avatar م.س, accent-600 fill):
   > "تحسن واضح في القراءة الجهرية، مع التركيز على علامات الترقيم في الكتابة الإنشائية القادمة."
3. **الأستاذ خالد العبدلي — الدراسات الإسلامية — 28 أبريل 2026** (avatar خ.ع, success-700 fill):
   > "حضور والتزام مثاليّان، ومشاركة فاعلة في النقاشات الصفّية."

The two teacher-quote blocks on `child-reports.html` are quotes 1 + 2 (Quran + Arabic — the persona's primary courses); quote 3 is omitted to keep the parent-lens compact, but its content is summarized in the "الالتزام والمشاركة" mini-summary card.

The general-notes textarea on `student-reports.html` is pre-filled with quote 1 (the Quran teacher's note) since this is the teacher persona authoring the form. SC-018 grep-validates that this exact sentence appears in all three files.

**Rationale**: Three quotes on the canonical monthly report establish the multi-teacher narrative; two quotes on the parent lens trim length without losing signal; one quote pre-fills the teacher form for cross-page byte-identity.

**Cross-doc references**: spec.md FR-020 / FR-051 / FR-058 / SC-018; data-model.md §teacher-note shape.

---

## R10. Sibling سارة's stats — fleshing out the parent-dashboard pin

**Decision**: The parent dashboard line 232 already pins سارة مؤمن with avatar س.م + الصف الثالث + status pill "يحتاج إلى دعم" + warning-100 alert icon. Spec 006 fleshes this out with the following stats on `my-children.html`:

| Field | Value |
|-------|-------|
| Avatar / initials | س.م (warning-tinted) |
| Name | سارة مؤمن |
| Grade level | الصف الثالث |
| Curriculum path | مسار اللغة العربية (Arabic-language pathway under الأستاذة منى سعد) |
| Attendance % | 78% |
| Homework % | 65% |
| Last report date | 30 أبريل 2026 |
| Payment status | مدفوع (because the family balance is 750 ر.س — paid in full) |
| Aggregate state pill | يحتاج إلى دعم (warning-100 + alert icon) |
| Primary CTA | "عرض التقرير الكامل" → `child-reports.html?child=sara` (sibling-switcher placeholder) |
| Secondary chips | "الفواتير" → `invoices.html`, "الحضور" → `attendance.html`, "الواجبات" → `homework-followup.html` (placeholder anchor) |

The `child-reports.html` page renders only عبد الرحمن's full report; سارة's child-report content is documented in an HTML comment block as the empty-state alternative (per spec.md §Edge Cases §"Child report with يحتاج إلى دعم tri-state" — the tri-state would highlight يحتاج إلى دعم instead of متحسّن for سارة).

**Rationale**: The parent dashboard already promises a multi-child experience; fulfilling that promise on `my-children.html` requires concrete sibling stats. The numbers are chosen to make سارة's "يحتاج إلى دعم" status visually defensible (78% attendance and 65% homework are both below the academy's 90%-attendance + 85%-homework thresholds).

**Cross-doc references**: spec.md FR-044 / FR-063; data-model.md §Child Profile.

---

## R11. Tri-state progress track design

**Decision**: A 3-step horizontal stepper rendered via Tailwind utility classes, no JS. The track structure:

```html
<div class="tri-state-track flex items-center gap-2">
  <!-- Step 1: يحتاج إلى دعم (muted) -->
  <div class="step opacity-50">
    <div class="h-8 w-8 rounded-full bg-slate-100 ring-2 ring-slate-200 ...">[icon]</div>
    <span>يحتاج إلى دعم</span>
  </div>
  <div class="connector h-1 flex-1 bg-slate-200"></div>
  <!-- Step 2: مستقر (muted) -->
  <div class="step opacity-50">
    <div class="h-8 w-8 rounded-full bg-slate-100 ring-2 ring-slate-200 ...">[icon]</div>
    <span>مستقر</span>
  </div>
  <div class="connector h-1 flex-1 bg-success-300"></div>
  <!-- Step 3: متحسّن (active) -->
  <div class="step">
    <div class="h-8 w-8 rounded-full bg-success-700 text-white ring-4 ring-success-100 ...">[check icon]</div>
    <span class="font-semibold text-success-700">متحسّن</span>
  </div>
</div>
```

For عبد الرحمن (the rendered persona), step 3 is active. For سارة (documented in a comment), step 1 would be active and the connector colors would shift accordingly. The component MUST always render all three steps regardless of which is active — color is paired with text + icon (FR-004 / Constitution IV).

**Rationale**: A static stepper with explicit active-step styling is the simplest possible representation of the "Improving / Stable / Needs Support" rubric. No JS, no SVG, just Tailwind.

**Alternatives considered**:
- Three side-by-side cards with a single highlighted card: rejected — less visually obvious that this is a directional rubric.
- A horizontal slider with a thumb at the active step: rejected — sliders imply continuous data; this rubric is discrete.

**Cross-doc references**: spec.md FR-049 / SC-007; contracts/child-reports.md §Tri-state track.

---

## R12. Attendance trend chart — inline static SVG

**Decision**: A 5-bar vertical bar chart rendered as inline `<svg>` directly in `pages/student/attendance.html`. Line count target: ≤ 80 LOC. No `<script>` tag, no JS, no CSS animation.

Approximate SVG structure (illustrative, not normative):
```html
<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="اتجاه الحضور — 5 أشهر">
  <!-- Y-axis 0-100 -->
  <line x1="40" y1="20" x2="40" y2="180" stroke="#cbd5e1" />
  <!-- Reference line at 90% -->
  <line x1="40" y1="36" x2="380" y2="36" stroke="#10b981" stroke-dasharray="4 2" />
  <text x="385" y="40" font-size="10" fill="#10b981">90% — هدف الأكاديمية</text>
  <!-- 5 bars (Dec / Jan / Feb / Mar / Apr) -->
  <rect x="60" y="38" width="40" height="142" fill="#fbbf24" />  <!-- 88% -->
  <rect x="125" y="34" width="40" height="146" fill="#fbbf24" /> <!-- 92% -->
  <rect x="190" y="36" width="40" height="144" fill="#fbbf24" /> <!-- 90% -->
  <rect x="255" y="29" width="40" height="151" fill="#10b981" /> <!-- 95% — peak month, success-tinted -->
  <rect x="320" y="34" width="40" height="146" fill="#fbbf24" /> <!-- 92% -->
  <!-- X-axis labels -->
  <text x="80" y="195" text-anchor="middle" font-size="11">ديسمبر</text>
  <text x="145" y="195" text-anchor="middle" font-size="11">يناير</text>
  <text x="210" y="195" text-anchor="middle" font-size="11">فبراير</text>
  <text x="275" y="195" text-anchor="middle" font-size="11">مارس</text>
  <text x="340" y="195" text-anchor="middle" font-size="11">أبريل</text>
  <!-- Bar percentage labels -->
  <text x="80" y="33" text-anchor="middle" font-size="11" fill="#1e293b">88%</text>
  <text x="145" y="29" text-anchor="middle" font-size="11" fill="#1e293b">92%</text>
  <text x="210" y="31" text-anchor="middle" font-size="11" fill="#1e293b">90%</text>
  <text x="275" y="24" text-anchor="middle" font-size="11" fill="#10b981">95%</text>
  <text x="340" y="29" text-anchor="middle" font-size="11" fill="#1e293b">92%</text>
</svg>
```

Hex colors above (`#fbbf24` warning-400, `#10b981` success-500) MAY be replaced with TailwindCSS-compatible CSS-variable references (`fill="rgb(var(--color-warning-400))"`) if Spec 001's color tokens are exposed as CSS custom properties; otherwise hex literals are acceptable since the chart is self-contained inline SVG.

**Rationale**: The chart needs (a) precise positioning of the 90% reference line, (b) per-bar color variation (March's 95% peak is success-tinted; the other four bars are warning-tinted to reinforce that the academy's 90% target was met but not by a wide margin), (c) Arabic month labels positioned correctly under each bar in RTL — all of which are easy in SVG and awkward in pure CSS.

**Alternatives considered**:
- CSS-grid bar chart with `<div class="h-32 bg-warning-400">`: rejected — positioning the 90% reference line and the per-bar value labels is fiddly without absolute positioning, and accessibility (`role="img"` + `aria-label`) is awkward.
- Chart.js / canvas-based chart: rejected — Constitution Principle V violation.

**Cross-doc references**: spec.md FR-026 / SC-003; contracts/attendance.md §Trend visual.

---

## R13. Attendance session table — sample row anchors

**Decision**: Eight session rows on `pages/student/attendance.html` covering all four named statuses. Every row reconciles with the persona's locked course set.

| # | Date (Arabic) | Course | Session | Teacher | Status | Notes |
|---|---|---|---|---|---|---|
| 1 | 5 مايو 2026 | القرآن الكريم — المستوى الثالث | الحصة 12 من 24 | الأستاذ أحمد بن عبد الله | حاضر | — |
| 2 | 4 مايو 2026 | اللغة العربية — المستوى الرابع | الحصة 11 من 22 | الأستاذة منى سعد | حاضر | — |
| 3 | 3 مايو 2026 | الدراسات الإسلامية — المستوى الثاني | الحصة 9 من 18 | الأستاذ خالد العبدلي | متأخر | تأخر 12 دقيقة |
| 4 | 1 مايو 2026 | القرآن الكريم — المستوى الثالث | الحصة 11 من 24 | الأستاذ أحمد بن عبد الله | حاضر | — |
| 5 | 28 أبريل 2026 | اللغة العربية — المستوى الرابع | الحصة 10 من 22 | الأستاذة منى سعد | معذور | غياب بعذر طبي — موثَّق |
| 6 | 25 أبريل 2026 | القرآن الكريم — المستوى الثالث | الحصة 10 من 24 | الأستاذ أحمد بن عبد الله | حاضر | — |
| 7 | 22 أبريل 2026 | الدراسات الإسلامية — المستوى الثاني | الحصة 8 من 18 | الأستاذ خالد العبدلي | غائب | غياب بدون عذر — تم إبلاغ ولي الأمر |
| 8 | 20 أبريل 2026 | القرآن الكريم — المستوى الثالث | الحصة 9 من 24 | الأستاذ أحمد بن عبد الله | حاضر | — |

(The full session log over 5 months adds up to 60 sessions — 54 حاضر + 2 غائب + 3 متأخر + 1 معذور — matching the 6 summary cards in FR-025. Rows 9-60 are documented in an HTML comment block but not rendered in the prototype to keep the page concise.)

**Rationale**: Eight rows is the minimum that makes all four statuses visible (FR-027); reverse-chronological order (most recent first) matches the student's expected scan pattern; the absent + late + excused notes are concrete enough to feel real without being alarmist.

**Cross-doc references**: spec.md FR-025 / FR-027 / SC-003; data-model.md §Attendance Record.

---

## R14. Print stylesheet — extension or no-op?

**Decision**: Extend Spec 005's existing `@media print` block in `assets/css/input.css` to also cover `monthly-report.html` and `child-reports.html` shell elements.

The Spec 005 print rule already hides `#cp-actions`, `#cp-prototype-notice`, `#app-sidebar`, `#app-header`, and `[data-sidebar-backdrop]`. The Spec 006 extension adds:
```css
@media print {
  /* … existing Spec 005 selectors … */
  #mr-actions,                /* monthly-report.html action cluster */
  #mr-prototype-notice,        /* monthly-report.html prototype notice */
  #cr-actions,                /* child-reports.html action cluster */
  #cr-prototype-notice {      /* child-reports.html prototype notice */
    display: none !important;
  }
}
```

The `#app-sidebar`, `#app-header`, `[data-sidebar-backdrop]` selectors already cover the new pages because they reuse the same shell IDs.

After the edit, `npm run build:css` regenerates `output.css`. Total budget impact: ~ 4 selectors added → < 200 bytes in `output.css`.

**Rationale**: Print fidelity is a documented edge case (spec.md §Edge Cases) and a parent-confidence signal — a parent who taps "طباعة" should get a clean printed monthly report without the chrome. Extending the existing print rule (rather than adding a new `@media print` block) keeps the CSS coherent.

**Alternatives considered**:
- Don't extend — let the print view show shell elements. Rejected — looks unprofessional for parent-shareable documents.
- Add a separate `@media print` block per page. Rejected — fragments the rule across multiple locations.

**Cross-doc references**: spec.md §Edge Cases §"Print view"; spec.md §Assumptions §"Print CSS reuse"; tasks.md (a polish task to add the 4 selectors + rebuild output.css).

---

## R15. Cross-page navigation chain audit

**Decision**: Every CTA / link from this spec's eight pages MUST resolve. Inbound links from prior-spec pages MUST resolve to a real existing file.

**Outbound chain (from this spec's pages):**
- `reports.html` → `monthly-report.html` (footer CTA + each per-course row's "عرض التفاصيل")
- `monthly-report.html` → `attendance.html` (الحضور mini-summary CTA), `assignments.html` (الواجبات mini-summary CTA), `exam-details.html` (الاختبارات mini-summary CTA)
- `attendance.html` → (none — it's a leaf page; breadcrumb back to `reports.html`)
- `exams.html` → `exam-details.html` (every row's "عرض التفاصيل")
- `exam-details.html` → `certificate-preview.html` (related-cert CTA, when applicable)
- `my-children.html` → `child-reports.html` (per-card primary CTA), `invoices.html` / `attendance.html` / `homework-followup.html` (secondary chips)
- `child-reports.html` → `my-children.html` (back link), `?child=sara` (sibling-switcher placeholder)
- `student-reports.html` → `homework-review.html` (cancel link)

**Inbound chain (from prior-spec pages, no edits required because Q1 = match):**
- `pages/student/dashboard.html` line 106 → `reports.html` ✓
- `pages/student/dashboard.html` line 79 → `exams.html` ✓
- `pages/student/weekly-plan.html` lines 79, 106 → `exams.html` / `reports.html` ✓
- `pages/student/learning-journey.html` lines 79, 106 → `exams.html` / `reports.html` ✓
- `pages/parent/dashboard.html` line 47 (sidebar) + line 244 (body) → `my-children.html` ✓
- `pages/parent/dashboard.html` line 55 (sidebar) + line 204, 292 (body) → `child-reports.html` ✓
- `pages/teacher/dashboard.html` line 71 (sidebar) + line 312 (body) → `student-reports.html` ✓

**Rationale**: SC-015 grep-validates this chain. A reviewer running the validation query MUST see every match resolve to a file that exists in the repo after Spec 006 ships.

**Cross-doc references**: spec.md SC-015; quickstart.md §SC validation table.

---

## R16. Sample data anchors — exam rows on `exams.html`

**Decision**: The completed-exam tab renders at least 4 weekly/term rows. Sample anchors:

| # | Date | Title | Course | Score | Status |
|---|---|---|---|---|---|
| 1 | 25 أبريل 2026 | اختبار أسبوعي 17 — أحكام التجويد | القرآن الكريم — المستوى الثالث | 18 / 20 (90%) | ناجح |
| 2 | 20 أبريل 2026 | اختبار قواعد إملائية — الواو والياء المتطرفتان | اللغة العربية — المستوى الرابع | 16 / 20 (80%) | ناجح |
| 3 | 15 أبريل 2026 | اختبار فصلي — السيرة النبوية | الدراسات الإسلامية — المستوى الثاني | 15 / 20 (75%) | ناجح |
| 4 | 8 أبريل 2026 | اختبار مفردات اللغة العربية | اللغة العربية — المستوى الرابع | 12 / 20 (60%) | يحتاج إعادة |

Row 4 demonstrates the "يحتاج إعادة" status pill (warning-100 + retry icon) so the design discipline is visible. The "اختبار شهر أبريل" 88/100 monthly result is NOT in this tab (it's in the monthly tab).

**Rationale**: Three "ناجح" + one "يحتاج إعادة" gives the design enough variety without making the persona look weak. Diverse courses (Quran + Arabic + Islamic Studies + Arabic again) reinforce that the persona has 3 active classes.

**Cross-doc references**: spec.md FR-034 / SC-004; data-model.md §Exam Record.

---

## R17. Exam-details sample — March 2026 monthly Quran-L2-final (95%)

**Decision**: `pages/student/exam-details.html` renders the most narratively rich monthly exam: the March 2026 monthly exam that simultaneously was the Quran-Level-2-final (passed at 95%) and unlocked the "إتمام المستوى الثاني" certificate.

| Field | Value |
|-------|-------|
| Title | اختبار شهر مارس — القرآن الكريم المستوى الثاني (الاختبار النهائي) |
| Course | القرآن الكريم — المستوى الثاني (مكتمل) |
| Teacher | الأستاذ أحمد بن عبد الله |
| Date | 15 مارس 2026 |
| Duration | 45 دقيقة |
| Type pill | اختبار شهري (primary-100 + calendar-clock icon) |
| Score | 95 / 100 (95%) |
| Status pill | ممتاز — اجتاز الاختبار (success-100 + star icon) |
| Category 1 — حفظ السور | 38/40 (95%) — "إتقان كامل لسورة الفجر، خطأ بسيط في آيتي 3 و 7" |
| Category 2 — تجويد | 28/30 (93%) — "تطبيق صحيح لأحكام الميم الساكنة" |
| Category 3 — فهم وتفسير | 29/30 (97%) — "فهم عميق للمعاني العامة للسور المختارة" |
| Strengths bullets | 3 success-tinted bullets matching the categories |
| Weaknesses bullets | 2 warning-tinted bullets ("التجويد في الآيات الطويلة"، "تنويع الإيقاع في القراءة الجهرية") |
| Teacher recommendation | 4-sentence quote referencing the next month's plan |
| Related certificate | "شهادة إتمام المستوى الثاني — أساسيات أحكام النون الساكنة" — 1 مارس 2026 — الأستاذ أحمد بن عبد الله — primary CTA → `certificate-preview.html` |

The "exam not yet graded" / "failed exam" alternative variants are documented in HTML comment blocks per spec.md §Edge Cases.

**Rationale**: Showcasing the L2-final-with-certificate variant (the most narratively rich case) is more useful than showcasing a routine weekly quiz. It demonstrates (a) the parchment-tinted result panel, (b) the related-certificate panel CTA → Spec 005's preview, and (c) the cross-spec cert reconciliation.

**Cross-doc references**: spec.md FR-037 / FR-038 / FR-039 / FR-042 / SC-005; contracts/exam-details.md §Sample exam.

---

## R18. Inbound spec consistency snapshot (verification table)

**Decision**: Before Spec 006 ships, this table records the current state of inbound `href` values from prior specs to guarantee no drift after the eight new files land:

| File | Line | href value | Resolves to (after Spec 006) | Status |
|------|------|------------|------------------------------|--------|
| `pages/student/dashboard.html` | 79 | `exams.html` | `pages/student/exams.html` (NEW in Spec 006) | will resolve ✓ |
| `pages/student/dashboard.html` | 106 | `reports.html` | `pages/student/reports.html` (NEW in Spec 006) | will resolve ✓ |
| `pages/student/weekly-plan.html` | 79 | `exams.html` | (same) | will resolve ✓ |
| `pages/student/weekly-plan.html` | 106 | `reports.html` | (same) | will resolve ✓ |
| `pages/student/learning-journey.html` | 79 | `exams.html` | (same) | will resolve ✓ |
| `pages/student/learning-journey.html` | 106 | `reports.html` | (same) | will resolve ✓ |
| `pages/parent/dashboard.html` | 47 (sidebar) | `my-children.html` | `pages/parent/my-children.html` (NEW in Spec 006) | will resolve ✓ |
| `pages/parent/dashboard.html` | 55 (sidebar) | `child-reports.html` | `pages/parent/child-reports.html` (NEW in Spec 006) | will resolve ✓ |
| `pages/parent/dashboard.html` | 63 (sidebar) | `attendance.html` | `pages/parent/attendance.html` — NOT shipped in Spec 006 | INHERITED 404 (out of scope, see spec.md §Out of scope) |
| `pages/parent/dashboard.html` | 204 (body) | `child-reports.html` | (same as line 55) | will resolve ✓ |
| `pages/parent/dashboard.html` | 244 (body) | `my-children.html` | (same as line 47) | will resolve ✓ |
| `pages/parent/dashboard.html` | 292 (body) | `child-reports.html` | (same) | will resolve ✓ |
| `pages/parent/dashboard.html` | 364 (body) | `attendance.html` | (same as line 63) | INHERITED 404 |
| `pages/teacher/dashboard.html` | 71 (sidebar) | `student-reports.html` | `pages/teacher/student-reports.html` (NEW in Spec 006) | will resolve ✓ |
| `pages/teacher/dashboard.html` | 79 (sidebar) | `attendance.html` | `pages/teacher/attendance.html` — NOT shipped in Spec 006 | INHERITED 404 |
| `pages/teacher/dashboard.html` | 312 (body) | `student-reports.html` | (same as line 71) | will resolve ✓ |
| `pages/teacher/dashboard.html` | 374 (body) | `attendance.html` | (same as line 79) | INHERITED 404 |

**Rationale**: The 4 inherited 404s (parent line 63 + line 364 + teacher line 79 + line 374) are pre-existing, NOT introduced or worsened by Spec 006. They are documented in spec.md §Out of scope as a known follow-up. Spec 006 SHALL NOT touch them. The 13 inbound links that DO resolve cleanly become live the moment Spec 006's eight files land.

**Cross-doc references**: spec.md §Out of scope; FR-065; SC-015.
