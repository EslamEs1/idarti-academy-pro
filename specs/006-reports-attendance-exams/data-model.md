# Phase 1 Data Model — Reports, Attendance, and Exams Frontend

This document defines the seven entity schemas + their concrete sample-data anchors that every contract and every page in this feature MUST consume verbatim. The schemas are descriptive — they are NOT real database tables (no backend exists). They define the shape of the static sample data each page hard-codes so reviewers can verify cross-page consistency.

The persona family + cross-spec continuity is documented in research.md §R6. The April 2026 canonical numbers are in research.md §R7. The reflection-panel content is in research.md §R8. The teacher-note quotes are in research.md §R9. The sibling stats are in §R10. The completed-exam rows are in §R16. The exam-details sample is in §R17. **This file binds those decisions to entity field shapes that contracts/ and tasks.md reference.**

---

## E1. Monthly Report (1 instance per student per month — primary canonical artifact)

**Renders on**: `monthly-report.html` (student lens) + `child-reports.html` (parent lens, abridged) + `student-reports.html` (teacher-authoring lens, editable form).

**Fields**:
- **Student**: name (`عبد الرحمن مؤمن`), avatar initials (`ع.م`), level chip (`الصف السادس — مسار القرآن الكريم`), student-link reference.
- **Month**: display label (`أبريل 2026`), numeric (`2026-04`).
- **Overall evaluation**:
  - status pill: one of {ممتاز / جيد جداً / جيد / يحتاج إلى دعم}; hue paired with icon (success / info / accent / warning).
  - numeric score: `89 / 100`.
  - 1-2 sentence quote attributed to "إدارة الأكاديمية".
- **Four mini-summaries** (each with metric label + value + 1-line caption + optional CTA):
  - Attendance — 92% — "حضر 11 من 12 حصة هذا الشهر — حضور ممتاز" — CTA → `attendance.html`.
  - Homework — 88% — "أنجز 7 من 8 واجبات في موعدها" — CTA → `assignments.html` (Spec 004).
  - Exam score — 88/100 — "اختبار شهر أبريل — Quran L3" — CTA → `exam-details.html`.
  - Teacher-notes count — 3 ملاحظات — "تواصل بنّاء من الأساتذة" — CTA → in-page anchor `#mr-teacher-notes`.
- **Three reflection panels** (content from research.md §R8):
  - Strengths (نقاط القوّة) — success-tinted — ≥ 4 bullets.
  - Improvements (نقاط للتحسين) — warning-tinted — ≥ 3 bullets.
  - Next-month plan (خطة الشهر القادم — مايو 2026) — info-tinted — ≥ 4 bullets.
- **Parent summary**: 4-6 sentence parent-readable Arabic paragraph (from research.md §R8 / spec.md FR-022).
- **Teacher notes**: 3 quote blocks (research.md §R9) on `monthly-report.html`; 2 quote blocks (1 + 2) on `child-reports.html`.
- **Report ID**: `RPT-2026-04-Q03-007` (canonical identifier — same on all 3 pages).
- **Action cluster (lens-specific)**:
  - Student lens (`monthly-report.html`): تنزيل PDF / طباعة / مشاركة مع ولي الأمر.
  - Parent lens (`child-reports.html`): تنزيل التقرير / مشاركة عبر واتساب / العودة للأبناء.
  - Teacher lens (`student-reports.html`): حفظ التقرير / حفظ كمسودة / إلغاء (link → `homework-review.html`).

**Cross-page invariant**: SC-009 + SC-018 grep-validate that the four canonical numbers (92% / 88% / 88/100 / 89/100), the overall pill ("ممتاز"), and one teacher-quote sentence (الأستاذ أحمد بن عبد الله's primary quote) appear identically on all three pages. SC-016 grep-validates that Download / Print / Share / Save / WhatsApp clickable elements appear ONLY on these three pages (not on `reports`, `attendance`, `exams`, `exam-details`, `my-children`).

---

## E2. Per-Course Performance Row (3 instances per student per month — multi-month history extends across the 6-month chip strip)

**Renders on**: `reports.html`'s detail table.

**Fields**:
- **Course chip**: course name + level number (3 instances locked to persona's active classes per research.md §R6):
  - `القرآن الكريم — المستوى الثالث`
  - `اللغة العربية — المستوى الرابع`
  - `الدراسات الإسلامية — المستوى الثاني`
- **Teacher chip**: teacher avatar initials + name (paired 1:1 with course):
  - Quran → الأستاذ أحمد بن عبد الله (أ.أ)
  - Arabic → الأستاذة منى سعد (م.س)
  - Islamic Studies → الأستاذ خالد العبدلي (خ.ع)
- **Attendance %**: per-course rate for the selected month — sample for أبريل 2026: 100% / 90% / 89% (averages to ~93%; reconciles approximately with FR-013's 92% overall on `reports.html`).
- **Homework %**: per-course rate — sample: 100% (Quran 4/4) / 80% (Arabic 4/5 since the 2-of-5 vocabulary was returned for revision) / 100% (Islamic Studies 2/2). Aggregates ~88% per FR-013.
- **Quiz average %**: per-course aggregate across weekly + monthly tests — sample: 88% (Quran) / 80% (Arabic) / 75% (Islamic Studies).
- **Status pill**: derived from the row's combined metrics — sample: ممتاز / جيد جداً / جيد جداً.
- **CTA**: "عرض التفاصيل" → `monthly-report.html` (defaults to the selected month — `monthly-report.html?month=2026-04` placeholder anchor).

**Cross-page invariant**: The Quran-row's 88% quiz-average matches the canonical April monthly exam score (88/100) since that exam IS the persona's quiz contribution to the Quran course. The aggregate "متوسط الاختبارات (86.6%)" on `reports.html`'s 5-card summary matches Spec 005's cumulative-average anchor.

---

## E3. Attendance Record (1 instance per session — 60 sessions across 5 months → 8 rendered + 52 in HTML comment)

**Renders on**: `attendance.html`'s session-by-session table.

**Fields** (per row):
- **Date**: Arabic format (e.g., `5 مايو 2026`).
- **Course chip**: same 3-course catalog as E2.
- **Session label**: `الحصة N من M` format (research.md §R13).
- **Teacher chip**: same teacher catalog as E2.
- **Status badge**: one of {حاضر, غائب, متأخر, معذور} — distinct hue per status:
  - حاضر = success-100 + check icon
  - غائب = danger-100 + x icon
  - متأخر = warning-100 + clock icon
  - معذور = info-100 + shield icon
- **Notes**: 1-line teacher annotation (or `—` for routine present rows).

**Sample-data anchor**: 8 rows from research.md §R13 (rows #1-#8). Status distribution: 5 حاضر + 1 متأخر + 1 معذور + 1 غائب.

**Aggregate facts (rendered as 6 summary cards on the same page)**:
- إجمالي الحصص: 60
- حاضر: 54 (success-100)
- غائب: 2 (danger-100)
- متأخر: 3 (warning-100)
- معذور: 1 (info-100)
- نسبة الحضور: 92% (success-100 + percentage)

**Trend visual**: 5-bar SVG chart per research.md §R12 covering ديسمبر / يناير / فبراير / مارس / أبريل with 88% / 92% / 90% / 95% / 92% bars and a 90% reference line.

**Cross-page invariant**: The 92% rate matches FR-013 (reports hub), FR-019 (monthly-report mini-summary), FR-050 (child-report mini-summary), and FR-057 (teacher-form input "11 / 12" → 92%). All five surfaces reconcile.

---

## E4. Exam Record (≥ 11 instances rendered on `exams.html` across 3 tabs)

**Renders on**: `exams.html` (catalog lens, 3 tabs) + `exam-details.html` (deep-dive lens, 1 selected exam) + `monthly-exams-passed.html` (Spec 005, achievement lens — 5 monthly only).

**Fields** (per row):
- **Title**: full exam name (e.g., `اختبار شهر أبريل — القرآن الكريم المستوى الثالث`).
- **Course chip**: per E2 catalog.
- **Teacher**: per E2 catalog.
- **Date**: Arabic-format date.
- **Duration**: e.g., `45 دقيقة`.
- **Type pill**: one of {اختبار شهري, اختبار أسبوعي, اختبار فصلي} with distinct hue (primary / info / accent).
- **Score**: `numerator / denominator (percentage%)` — `—` if upcoming.
- **Status pill**: one of {قادم, ناجح, يحتاج إعادة, مكتمل} with hue + icon.
- **CTA**: "عرض التفاصيل" → `exam-details.html`.
- **Category breakdown** (only on exam-details page; ≥ 3 rows per Quran exam): category name + score + percentage + 1-line comment.
- **Strengths bullets** (only on exam-details): ≥ 3 success-tinted bullets.
- **Weaknesses bullets** (only on exam-details): ≥ 2 warning-tinted bullets.
- **Teacher recommendation** (only on exam-details): 3-5 sentence quote.
- **Related-certificate panel** (optional; rendered only when the exam unlocked a cert): cert name + issue date + teacher + CTA → `certificate-preview.html`.

**Sample-data anchors**:
- **Upcoming tab (≥ 2)**: see research.md §R2 — May Quran-L3 monthly + May Arabic week-22 quiz.
- **Completed tab (≥ 4)**: see research.md §R16 — 3 ناجح + 1 يحتاج إعادة.
- **Monthly tab (5 rows IDENTICAL to Spec 005)**:
  | Month | Score | Status | Course |
  |-------|-------|--------|--------|
  | December 2025 | 90 / 100 (90%) | ممتاز | Quran L1 (final exam, certificate-attached) |
  | January 2026 | 78 / 100 (78%) | جيد جداً | Quran transition |
  | February 2026 | 82 / 100 (82%) | جيد جداً | Quran L2 |
  | March 2026 | 95 / 100 (95%) | ممتاز | Quran L2 (final, certificate-attached) — exam-details deep-dive sample |
  | April 2026 | 88 / 100 (88%) | ممتاز | Quran L3 (current month) |
- **Exam-details deep-dive sample**: research.md §R17 — March 2026 monthly Quran-L2-final, certificate-attached.

**Cross-page invariant**: The 5 monthly rows on `exams.html` are byte-identical to Spec 005's `monthly-exams-passed.html` for all 7 fields per row. The April monthly row's 88/100 score reconciles with the canonical April figures (E1).

---

## E5. Child Profile (2 instances on `my-children.html`)

**Renders on**: `my-children.html`'s 2-card grid.

**Fields** (per child):
- **Avatar initials**: `ع.م` (primary-700) or `س.م` (warning-tinted for sibling).
- **Name**: `عبد الرحمن مؤمن` or `سارة مؤمن`.
- **Level + path**: `الصف السادس — مسار القرآن الكريم` or `الصف الثالث — مسار اللغة العربية`.
- **Attendance %**: 92% or 78%.
- **Homework %**: 88% or 65%.
- **Last report date**: 30 أبريل 2026 (both children).
- **Payment status**: مدفوع (both children — family balance covers both).
- **Aggregate state pill**: ممتاز (success-100 + star) or يحتاج إلى دعم (warning-100 + alert).
- **Primary CTA**: `عرض التقرير الكامل` → `child-reports.html` (or `child-reports.html?child=sara` for sibling).
- **Secondary chips**: 3 chips per card → `invoices.html` / `attendance.html` / `homework-followup.html` (placeholder anchors).

**Cross-page invariant**: The 2 cards' avatar / name / level / status pill MUST match the parent dashboard's existing children-card pin (lines 220 / 232 / 234 / 237 of `pages/parent/dashboard.html`). FR-063 + SC-006 grep-validate.

---

## E6. Child Report Card (1 rendered instance + 1 commented-only sibling variant)

**Renders on**: `child-reports.html`.

**Fields**:
- **Header**: child avatar + name + level chip + parent name + month label + sibling-switcher chip strip.
- **Tri-state progress track** (3 steps from research.md §R11):
  - يحتاج إلى دعم (slate-100 muted) — connector to step 2 muted slate-200.
  - مستقر (slate-100 muted) — connector to step 3 success-300 (since rendered persona is متحسّن).
  - متحسّن (success-700 + check icon, success-100 ring) — ACTIVE STEP for عبد الرحمن's rendered variant.
  - For سارة (commented-only variant): step 1 (يحتاج إلى دعم) would be active; connectors muted.
- **Tri-state rationale**: 1-2 sentence parent-readable text below the track ("عبد الرحمن أظهر تحسناً ملحوظاً في الحفظ والالتزام هذا الشهر مقارنة بمارس.").
- **Four plain-language summaries**: derived from E1's mini-summaries but with parent-friendly phrasing (no "completion %" jargon — instead "حضر 11 من 12 حصة"):
  - الحضور (92% — "حضر 11 من 12 حصة هذا الشهر — حضور ممتاز" + bar)
  - الواجبات (88% — "أنجز 7 من 8 واجبات في موعدها" + bar)
  - الاختبارات (88% — "حصل على 88% في اختبار شهر أبريل — تقدير ممتاز" + status pill)
  - الالتزام والمشاركة (state chip "ممتاز" — "أساتذته أشاروا إلى التزامه ومشاركته الفاعلة")
- **Teacher notes**: 2 quote blocks (research.md §R9 quotes 1 + 2 — Quran + Arabic).
- **Suggested-parent-action panel**: 1 primary action (2-3 sentences) + 1 secondary tip (per spec.md FR-052).
- **Action cluster**: 3 buttons — تنزيل التقرير / مشاركة عبر واتساب / العودة للأبناء.
- **Prototype notice**: standard convention.

**Cross-page invariant**: The numeric values match E1 (canonical April figures). The teacher quotes match E1's first two quote blocks byte-identically. The "مشاركة عبر واتساب" button must visually echo WhatsApp brand (success-600 background OR success-50 with success-600 text + chat-bubble icon).

---

## E7. Teacher Evaluation Form (1 instance — pre-filled)

**Renders on**: `student-reports.html` (teacher-authoring lens).

**Sections**:
- **Student-context strip (read-only)**:
  - Avatar `ع.م` + name `عبد الرحمن مؤمن`
  - Level `المستوى الثالث — مسار القرآن الكريم`
  - Parent name `ولي أمر عبد الرحمن`
  - Assignments accepted: `7 / 8`
  - Months reported so far: `هذا التقرير الخامس — منذ ديسمبر 2025`
  - Visual treatment: distinct from the editable form (slate-50 background or border).
- **Three evaluation panels (each labeled — `<label for>`-paired to the input below)**:
  - تقييم الحضور: numeric input pre-filled `11 / 12`; status select with options {ممتاز, جيد جداً, جيد, يحتاج تحسين} pre-selected `ممتاز`; comment textarea pre-filled `"حضور كامل تقريباً مع غياب يوم واحد بعذر."`.
  - تقييم الواجبات: input pre-filled `7 / 8`; status select pre-selected `جيد جداً` (or ممتاز); comment pre-filled `"تسليمات منتظمة وجودة عالية في الكتابة الإنشائية."`.
  - تقييم الاختبارات: input pre-filled `88 / 100`; status select pre-selected `ممتاز`; comment pre-filled `"أداء ممتاز في حفظ سورة الفجر، يحتاج إلى مراجعة أحكام التجويد للآيات الطويلة."`.
- **General-notes textarea**: ≥ 4 visible rows; pre-filled with a 4-sentence sample feedback IDENTICAL to research.md §R9 quote 1 (الأستاذ أحمد بن عبد الله's primary quote). SC-018 grep-validates this byte-identity across `student-reports.html` + `monthly-report.html` + `child-reports.html`.
- **Recommendation panel**:
  - "خطة الشهر القادم" — 4 bullet inputs pre-filled with research.md §R8 next-month-plan items + `+ إضافة بند` button (visual stub).
  - "الإجراء المقترح لولي الأمر" — single multi-line textarea pre-filled with the parent-action paragraph that also appears verbatim on `child-reports.html`.
- **Action cluster**: حفظ التقرير / حفظ كمسودة / إلغاء (link → `homework-review.html`).
- **Prototype notice**: clarifies visual-only nature.

**Cross-page invariant**: Every value in the form is the upstream source-of-truth for what the student reads on `monthly-report.html` and the parent reads on `child-reports.html`. FR-058 + FR-059 + FR-062 + SC-018 enforce this.

---

## Cross-spec invariants (auditable on `/speckit-implement` Polish)

These invariants reference data shapes defined above and are validated by SC-001 → SC-018:

| Invariant | Check | Validator |
|-----------|-------|-----------|
| Persona name `عبد الرحمن مؤمن` appears on all 8 pages | `grep -c 'عبد الرحمن مؤمن' [8 files]` ≥ 1 each | SC-001 / SC-009 |
| Sibling `سارة مؤمن` appears on `my-children.html` AND `child-reports.html` (in the sibling-switcher) | `grep -c 'سارة مؤمن' my-children.html child-reports.html` ≥ 1 each | SC-006 |
| Quran teacher `الأستاذ أحمد بن عبد الله` appears on every page that quotes a Quran teacher | `grep -c 'أحمد بن عبد الله' [reports / monthly-report / attendance / exams / exam-details / child-reports / student-reports]` ≥ 1 each | SC-009 |
| Arabic teacher `الأستاذة منى سعد` appears on per-course rows | `grep -c 'منى سعد' [reports / monthly-report / attendance / exams / exam-details / child-reports]` ≥ 1 each | SC-009 |
| Canonical April attendance `92%` matches across 4 pages | `grep -c '92%' [reports / monthly-report / child-reports / attendance]` ≥ 1 each | SC-009 |
| Canonical April homework `88%` matches across 4 pages | `grep -c '88%' [reports / monthly-report / child-reports / student-reports]` ≥ 1 each | SC-009 |
| April monthly score `88 / 100` matches across student-reports + monthly-report + child-reports | `grep -cE '88 ?/ ?100' [3 files]` ≥ 1 each | SC-009 / SC-018 |
| Overall pill `ممتاز` appears on all 4 report-canonical pages | `grep -c 'ممتاز' [reports + monthly-report + child-reports + student-reports]` ≥ 1 each | SC-009 |
| Tri-state labels `يحتاج إلى دعم` + `مستقر` + `متحسّن` all appear on `child-reports.html` | `grep -c 'يحتاج إلى دعم' child-reports.html && grep -c 'مستقر' && grep -c 'متحسّن'` each ≥ 1 | SC-007 |
| Sibling status `يحتاج إلى دعم` appears on `my-children.html` + parent-dashboard pin | (visual cross-check) | SC-006 |
| WhatsApp share visual stub `مشاركة عبر واتساب` appears ONLY on `child-reports.html` | `grep -l 'مشاركة عبر واتساب' [8 pages]` returns only `child-reports.html` | SC-007 / SC-016 |
| All 4 named attendance statuses appear on `attendance.html` | `grep -c 'حاضر\|غائب\|متأخر\|معذور' attendance.html` ≥ 4 | SC-003 |
| 5 monthly exams identical between `exams.html` and `monthly-exams-passed.html` | per-row grep on dates / scores / status | SC-009 (exam-row reconciliation) |
| Related-certificate CTA on `exam-details.html` → `certificate-preview.html` | `grep -c 'certificate-preview.html' exam-details.html` ≥ 1 | SC-005 |
| Quran-teacher's primary quote byte-identical across 3 files | `grep -c '"أداء عبد الرحمن في الحفظ هذا الشهر ممتاز' [monthly-report + child-reports + student-reports]` ≥ 1 each | SC-018 |
| Zero `href="#"` placeholders | `grep -nE ' href="#"' [8 files]` = 0 matches | SC-012 |
| Zero Eastern Arabic-Indic digits | `grep -nP '[٠-٩۰-۹]' [8 files]` = 0 matches | SC-013 |
| Zero new JS | `wc -l assets/js/main.js` = 68 (Spec 005 baseline); no new innerHTML/createElement calls | SC-011 |
| Download / Share / Print / Save / WhatsApp visible ONLY on the 3 canonical pages | `grep -nE '(تنزيل\|طباعة\|واتساب\|حفظ التقرير\|Download\|Print)' [other 5 pages]` returns no clickable matches | SC-016 |
