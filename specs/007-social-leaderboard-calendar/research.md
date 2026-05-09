# Phase 0 Research — Social Hub, Leaderboard, and Calendar Frontend

This document records every clarification-driven decision, every content-sourcing choice, and every design-discipline rule that downstream artifacts (data-model.md / contracts/ / tasks.md) MUST consume verbatim. The format follows Spec 006's research.md: numbered research items, each with **Decision**, **Rationale**, **Alternatives considered**, and (where applicable) **Cross-doc references**.

The spec's seven clarifications (2 from `/speckit-specify`, 5 from `/speckit-clarify`) are recorded as R1 → R7 below. The remaining items (R8 → R20) capture sample-data anchors, content-sourcing decisions, and shell/JS scope rules that the implementer needs to ship the seven pages without re-deriving them.

---

## R1. Q1 — Admin filename canon (resolved 2026-05-09 during /speckit-specify)

**Decision**: Match the prior-spec link. The admin moderation page is filed as `pages/admin/social-hub.html` — exactly the target the admin dashboard sidebar (line 183) already points at. The brief's filename `social-hub-management.html` is dropped.

**Rationale**: Three convergent reasons.
1. **Constitution v1.0.1 admin-sidebar enumeration** uses "Social Hub" — a single-word product surface, not "Social Hub Management". Forcing the brief's longer filename would create a label / filename mismatch.
2. **Existing prior-spec link already resolves to this filename**. `pages/admin/dashboard.html` line 183 links to `social-hub.html`. Following the brief would have required editing 1 inbound `href` value across 1 prior-spec dashboard — a small but non-zero touch-point.
3. **Zero edits to prior-spec admin chrome = zero regression risk**. The Spec 005 / Spec 006 "no prior-spec edits" discipline (validated by `git status` after the feature ships) becomes trivially achievable.

**Alternatives considered**:
- **Follow brief exactly** (`social-hub-management.html` + edit admin dashboard): rejected — introduces 1 touch-point edit to Spec 005-era admin dashboard, contradicts the constitutional sidebar nomenclature.
- **Two pages** (`social-hub.html` overview + `social-hub-management.html` deep workspace): rejected — adds a page that doesn't appear in any inbound link, doubles the design surface for no UX gain.

**Cross-doc references**: spec.md §Clarifications Q1; FR-046 → FR-052 (admin moderation page); R3 (sidebar reuse).

---

## R2. Q2 — Teacher calendar inclusion (resolved 2026-05-09 during /speckit-specify)

**Decision**: In scope as the 7th page → `pages/teacher/calendar.html` with teacher-specific event data. The 5-event-type taxonomy and 4-status vocabulary are reused from the student calendar so teachers and students see identical visual language; only the underlying data differs.

**Rationale**: Three convergent reasons.
1. **Constitution v1.0.1 teacher-sidebar enumeration** explicitly lists "Calendar" — already a constitutional surface.
2. **Existing prior-spec links already target this filename**. `pages/teacher/dashboard.html` line 103 (sidebar) and line 212 (body CTA "جدولي اليوم") link to `calendar.html`. Deferring would leave both links broken.
3. **Cost is bounded**. The student calendar's structure (CSS grid + event list) is reused verbatim — only the underlying data records change. The marginal effort vs the half-effort of leaving the inbound 404 in place is small enough to justify shipping the variant.

**Teacher-relevant event data anchors** (data-model.md §E5b):
- **حصة مباشرة** = the teacher's own scheduled classes (e.g., "حصة القرآن الكريم — المستوى الثالث (مجموعة عبد الرحمن)" — the teacher leads it).
- **تسليم واجب** = grading deadlines the teacher is responsible for (e.g., "تصحيح واجب المراجعة 19 — 6 طلاب" with a "موعد التصحيح" caption). CTA → `homework-review.html` (NOT `assignment-details.html`).
- **اختبار** = exams the teacher invigilates / scores (e.g., "اختبار شهر مايو — المستوى الثالث — 6 طلاب"). CTA → `exam-details.html`.
- **إصدار تقرير** = the deadline by which the teacher must submit student-reports (e.g., "موعد تسليم تقارير شهر مايو"). CTA → `student-reports.html`.
- **إعلان أكاديمي** = teacher-targeted announcements (e.g., "اجتماع المعلمين الشهري — قاعة الإدارة"). CTA → `#planned` (teacher-targeted announcement page is out of scope for Spec 007).

**Alternatives considered**:
- **Out of scope (deferred)**: ship only the student calendar; document as known follow-up. Rejected — leaves a constitutional sidebar entry broken AND a body CTA broken; Spec 006 deferred parent/teacher attendance for similar reasons but the cost/benefit here favors inclusion.
- **In scope (thin variant)**: reuse the student calendar's data verbatim with the teacher chrome. Rejected — artificially inaccurate (teachers don't have "homework deadlines" in the student sense), and the spec brief's spirit is to make the calendar useful PER role.

**Cross-doc references**: spec.md §Clarifications Q2; US7 acceptance scenarios; FR-065 → FR-071; data-model.md §E5b.

---

## R3. Q3 — Achievement-post privacy (resolved 2026-05-09 during /speckit-clarify)

**Decision**: Anonymize achievement-post subjects to first-name + last-initial format ("عبد الرحمن م." / "سارة م.") matching the leaderboard pseudonym convention (FR-039) and the comments anonymization rule (FR-015). Full real student names ("عبد الرحمن مؤمن" / "سارة مؤمن") MUST NOT appear in any post body or post header on `social-hub.html` or `post-details.html` — verifiable via grep (SC-024).

**Rationale**: Two convergent reasons.
1. **Privacy posture consistency.** Before this clarification, the spec had two contradictory rules: comments are anonymized to role-titled display ("طالب من المستوى الثالث"), but achievement posts identify the celebrated student by full name + exact score. A reviewer applying the brief's "encourage students without creating negative pressure" mandate would (correctly) ask: "If we hide commenter identity to avoid social dynamics, why expose celebrated-student identity in a more visible surface?" The asymmetry was indefensible.
2. **First-name + last-initial preserves celebration without exposure.** "عبد الرحمن م. حصل على 95% في اختبار شهر مارس" still identifies the student to those who already know him (his classmates / his parents will recognize the name) AND celebrates the achievement. But a class roster of 30 students might have multiple "عبد الرحمن"s — the partial anonymization adds enough plausible deniability that the celebrated student is no longer publicly singled out by name in the academy-wide feed.

**Authors are NOT anonymized** — only celebrated subjects are. Posts authored by "إدارة الأكاديمية" or named teachers ("الأستاذ أحمد بن عبد الله") keep full names in the AUTHOR position. The distinction is: the academy / a teacher publicly authoring a post is consenting to be named; a celebrated student receiving the post may not have that consent (and getting per-post consent in a real production system is operationally heavy — anonymization is the policy that gives the same outcome by default).

**Alternatives considered**:
- **Always-public** (full names + exact scores): rejected — re-introduces the comparison-pressure dynamic the brief explicitly wants to eliminate.
- **Opt-in** (full name only when student/parent has consented): rejected — doubles the rendering burden for a static prototype where no real consent system exists; also requires designing what a "non-consenter celebrated post" looks like, which is more complexity than this clarification merits.
- **First-name only** ("عبد الرحمن"): rejected — warmer than initials but breaks the consistency with the leaderboard pseudonym format (FR-039), introducing a 3rd identifier convention.

**Cross-doc references**: spec.md §Clarifications Q3; FR-015 + FR-025 + FR-062; SC-024.

---

## R4. Q4 — "Quran Progress" leaderboard tab scope (resolved 2026-05-09 during /speckit-clarify)

**Decision**: Enrollment-scoped — the "تقدّم القرآن" tab renders only students currently enrolled in any Quran course. A scope caption above the table reads "هذا الترتيب يشمل الطلاب المسجّلين في دورات القرآن — نقيس التقدّم في المسار، ليس الالتحاق به." The sibling سارة (enrolled in Arabic L1, NOT Quran) MUST NOT appear in this tab's table. Other 5 dimensions remain academy-wide.

**Rationale**: The brief's "fair ranking" mandate plus the spec's tonal stance ("ranking is multi-dimensional, every student's progress is celebrated"). Including non-Quran-enrolled students in a Quran-progress dimension would surface them with 0% progress — punitive and inaccurate for a dimension where their absence is enrollment-shaped, not effort-shaped. The scope caption makes the dimension's framing explicit so a viewer reading the table doesn't ask "why is سارة not here?"

**Sample-data implication**: The "تقدّم القرآن" tab's top-10 table contains 10 Quran-enrolled students. The persona (Quran L3) appears at a plausible mid-pack rank (rank #4 in this dimension — see R10). The sibling سارة does NOT appear. Pseudonymous students enrolled in Quran do appear.

**Alternatives considered**:
- **All students with non-enrolled flagged**: rejected — surfaces "0% — غير مسجّل" rows that visually look like punishment.
- **All students with non-enrolled hidden from the visible top-10**: rejected — total-count caption ("12 طالباً مسجّلاً في القرآن") above the table is functionally identical to enrollment-scoping but reads more confusingly.
- **Drop the tab entirely**: rejected — loses a brief-aligned course-specific dimension AND introduces asymmetry with future course-specific dimensions.

**Cross-doc references**: spec.md §Clarifications Q4; FR-035 (extension); contracts/leaderboard.md §6 tabs.

---

## R5. Q5 — Leaderboard transparency / accordion implementation (resolved 2026-05-09 during /speckit-clarify)

**Decision**: Inline accordion explainer using native HTML5 `<details>` + `<summary>` elements. The leaderboard's "ⓘ كيف نحسب النقاط؟" affordance is a single `<details>` element wrapping a `<summary>` (the question text + info icon) and 6 dimension formula lines as child content. **Zero JavaScript is required** — `<details>` is a built-in browser disclosure widget supported in all evergreen browsers.

The 6 formula lines (FR-038a):
1. **الترتيب العام**: مجموع نقاط كل الفئات.
2. **الحضور**: 5 نقاط لكل حصة حضرت.
3. **الواجبات**: 10 نقاط لكل واجب مقبول.
4. **الأكثر تطوراً**: عدد المراكز التي صعدتها مقارنة بالشهر الماضي.
5. **تقدّم القرآن**: نسبة إكمال محتوى المستوى.
6. **المشاركة**: تفاعل في الحصص + التعليقات المعتمدة.

**Default open state**: The `<details>` element will render with the `open` attribute set by default in the prototype, so the explainer is visible without requiring the user to click. Browsers still render the disclosure triangle, allowing the user to collapse it if desired — a standards-based affordance with zero JS. This decision satisfies the spec's "open by default — no-JS-fallback" wording in FR-038a.

**Rationale**: Three reasons.
1. **Constitution V allows accordion as one of 6 sanctioned interaction categories**, but the constitution also says "If a feature can be expressed with HTML and CSS alone, JavaScript MUST NOT be introduced for it." `<details>`/`<summary>` is HTML alone — using a JS handler when the browser provides the same functionality natively would violate the principle.
2. **Zero new lines in main.js** — preserves the 68-line baseline.
3. **Better accessibility** than a JS accordion. Native `<details>` is keyboard-navigable and screen-reader-friendly without any ARIA wiring.

**Tailwind styling** (illustrative, not normative):
```html
<details open class="rounded-lg border border-info-100 bg-info-50 p-4">
  <summary class="cursor-pointer font-medium text-info-700 flex items-center gap-2">
    <svg ... /> كيف نحسب النقاط؟
  </summary>
  <ul class="mt-3 space-y-2 text-sm text-slate-700">
    <li><strong>الترتيب العام:</strong> مجموع نقاط كل الفئات.</li>
    <li><strong>الحضور:</strong> 5 نقاط لكل حصة حضرت.</li>
    <!-- … 4 more … -->
  </ul>
</details>
```

**Alternatives considered**:
- **Custom JS accordion handler**: rejected — adds JS where HTML suffices; violates Constitution V's "if CSS/HTML can do it, no JS".
- **Always-open static panel** (no disclosure widget at all): rejected — "كيف نحسب النقاط؟" implies a question/answer affordance; the disclosure widget makes the answer feel scoped.
- **Per-tab tooltip**: rejected per Q3 user's preference for a single accordion explainer (Q5 Option A in the clarify log).

**Cross-doc references**: spec.md §Clarifications Q5; FR-038a; SC-022; contracts/leaderboard.md §Explainer.

---

## R6. Q6 — Comment moderation 24-hour SLA (resolved 2026-05-09 during /speckit-clarify)

**Decision**: 24-hour SLA visible at two surfaces:
1. **Comment form helper text** (FR-014 update): "يرجى الالتزام بآداب الحوار التعليمي. التعليقات تخضع للمراجعة قبل النشر — نراجع التعليقات عادةً خلال 24 ساعة." Rendered in info-tinted style with a shield icon below the textarea.
2. **"في انتظار المراجعة" badge tooltip**: "سيتم نشر هذا التعليق بعد المراجعة — عادةً خلال 24 ساعة." Rendered as a `title` attribute on every pending-review badge in the comments thread.

**Rationale**: Trust is built by visible expectations. A commenter who sees "your comment is pending" with no timeline disclosure has no way to judge whether the system is functioning or stuck. Surfacing the SLA at submission time AND on every pending badge makes the moderation commitment legible from two angles. The 24-hour window is the educational-platform norm and easy for the academy to honor in practice.

**Implementation note**: the tooltip is a native HTML `title` attribute (no JS, no Tippy.js, no popover library) — modern browsers render it on hover after a short delay. For mobile users (no hover state), the same SLA copy is also visible in the form helper at the bottom of the page, so the information is reachable from at least one surface.

**Alternatives considered**:
- **48-hour SLA**: more conservative; rejected per Q6 user's preference for the tighter window (the user accepted the recommendation directly).
- **Vague language ("بأسرع وقت ممكن")**: rejected — defeats the purpose of disclosing an SLA at all.
- **No SLA copy**: rejected — leaves the trust gap open.

**Cross-doc references**: spec.md §Clarifications Q6; FR-014 (extended); US2 AC#5 (extended); contracts/post-details.md §Comment form.

---

## R7. Q7 — Reaction-tap behavior / non-interactive (resolved 2026-05-09 during /speckit-clarify)

**Decision**: Tapping a reaction button MUST be non-interactive — CSS-only `:active` / `:focus` visual highlight only. NO modal, tooltip, popover, or overlay revealing reactor identities (neither by full name, nor first-name + initial, nor role-titled aggregate). NO JS handler may be wired to reaction-button clicks. Reaction counts (e.g., "👍 14 إعجاباً") are visible inline as static numerical labels but cannot be expanded to show reactor lists.

**Rationale**: Three reasons.
1. **Privacy uniformity** — Q3's anonymization decision eliminates full-name visibility on celebrated students; Q7 closes the same loophole on reactor identities. Without Q7, a curious student could discover "who reacted ❤️ to my post" and use that signal to reconstruct social dynamics — re-introducing the open-network feel the brief explicitly wants to eliminate.
2. **Static-prototype no-JS posture** — the spec mandates zero new JS handlers. A reactor-list modal would require either a new JS handler (constitution violation) or a CSS-only :hover-popover (limited mobile support). Skipping the affordance entirely sidesteps both.
3. **Constitution V compliance** — modals are sanctioned but only for justified use. A reactor-list modal serves no educational purpose; if anything it works against the brief's safety mandate.

**Implementation note**: The reaction buttons are rendered as `<button type="button" disabled>` OR `<button type="button">` without any event handler. Since the buttons render an emoji + count + label triple inline, the user can read the information at a glance — no interaction needed. The CSS `:active`/`:focus` styles provide tactile feedback when tapped (matching native button affordances) but produce no behavior.

**Alternatives considered**:
- **Modal with full names**: rejected — directly contradicts Q3.
- **Modal with role-titled aggregate counts** ("12 طالباً + 3 معلمين"): rejected — still requires a JS handler to open the modal; the educational benefit is marginal.
- **Tooltip with the same count larger**: rejected — adds noise without information; user already sees the count next to the emoji.

**Cross-doc references**: spec.md §Clarifications Q7; FR-012 extension; SC-023.

---

## R8. Sidebar and header — zero-delta reuse

**Decision**: Hard-embed the existing role sidebars verbatim into each new page; do not introduce a runtime include mechanism.

- Four **student** pages (`social-hub`, `post-details`, `leaderboard`, `calendar`): copy the 14-entry student sidebar from `pages/student/dashboard.html` (or any later student page), then set `aria-current="page"` + the active class on:
  - `social-hub.html` → "Social Hub"
  - `post-details.html` → "Social Hub" (children-of: post-details is reached via a social-hub feed CTA, so the Social Hub sidebar entry stays active)
  - `leaderboard.html` → "Leaderboard"
  - `calendar.html` → "Calendar"
- Two **admin** pages (`social-hub`, `create-post`): copy the admin sidebar from `pages/admin/dashboard.html` / `certificates.html` / `create-certificate.html`, then set:
  - `social-hub.html` → "Social Hub"
  - `create-post.html` → "Social Hub" (children-of: create-post is a sub-page of social hub moderation)
- One **teacher** page (`calendar`): copy the 12-entry teacher sidebar from `pages/teacher/dashboard.html` (or `student-reports.html` from Spec 006), then set:
  - `calendar.html` → "Calendar"

Header chrome (search input / bell-as-anchor / profile dropdown) is identical to the prior-spec baseline on every page. The student-side header greets "عبد الرحمن مؤمن" (the persona); the admin-side greets "إدارة الأكاديمية" (the admin author voice introduced this spec); the teacher-side greets "الأستاذ أحمد بن عبد الله" (the persona's primary teacher).

**Rationale**: Spec 005 / Spec 006 followed this same pattern (zero shell drift; sidebars copied; only the active entry changed). The cost is duplication; the benefit is "every page is openable as a static file" (Constitution Principle II). Runtime includes would violate Principle I.

**Alternatives considered**:
- Component partial via JavaScript include: rejected — violates Principles I + V.
- Server-side includes (PHP / Jekyll layouts): rejected — would require a build/run server.

**Cross-doc references**: data-model.md §E0 (shell schema); contracts/*.md (each page's active sidebar entry).

---

## R9. JavaScript scope — zero new handlers (cross-reference R5 + R7)

**Decision**: Zero new JS additions. `assets/js/main.js` line count remains at 68 (Spec 001/005/006 baseline).

The four interactive behaviors that exist in this feature are:
1. **Sidebar drawer** (mobile burger menu) — already in main.js, no change.
2. **Header dropdowns** (profile menu, etc.) — already in main.js, no change.
3. **Tabs on `leaderboard.html`** (6 tabs) — reuses the existing `[role="tablist"]` handler from main.js lines 47-66 with no modification. Markup convention (verified in `live-sessions.html` from Spec 003 + `exams.html` from Spec 006): container = `role="tablist"`; each tab button = `role="tab"` + `aria-controls="<panel-id>"`; active tab has `aria-selected="true"` + class `is-active`; panels wrapped in `[data-tabpanels]` parent with `role="tabpanel"` + `id="<panel-id>"`; inactive panels have class `hidden`.
4. **Accordion explainer on `leaderboard.html`** — uses native `<details>`/`<summary>` per R5. Zero JS.

Everything else is visual-only:
- The 8-chip type filter on `social-hub.html` — visual-only chips.
- The 6-chip type filter on `calendar.html` (both variants) — visual-only chips.
- The month-navigation arrows on `calendar.html` (both variants) and `leaderboard.html` — visual-only.
- The 6-month chip strip on `leaderboard.html` — visual-only.
- The 5 reaction buttons on `social-hub.html` + `post-details.html` — visual-only per R7.
- The "إرسال للمراجعة" comment-form submit button on `post-details.html` — `<button type="button">` visual stub (no form action).
- The 5-icon action cluster per row on the admin `social-hub.html` posts table — visual-only.
- The "نشر المنشور" / "حفظ كمسودة" / "إلغاء" cluster on `create-post.html` — visual-only.
- The Apple/Google/Outlook export cluster on the student `calendar.html` — visual-only.

**Rationale**: Constitution Principle V + Spec 001/005/006 pattern. The fewer JS additions, the closer the project stays to "static, openable file" guarantee.

**Alternatives considered**: see R5 + R7 for the specific accordion + reaction-tap decisions.

**Cross-doc references**: plan.md §Constitution Check §V; contracts/leaderboard.md §Tabs; contracts/leaderboard.md §Explainer.

---

## R10. Persona family + cross-spec continuity table

**Decision**: The cross-spec persona table for Spec 007:

| Field | Value | Locked by |
|-------|-------|-----------|
| Primary student | عبد الرحمن مؤمن (ع.م) | Spec 002 / continued through Spec 006 |
| Anonymized form (used in posts visible to others) | عبد الرحمن م. | This spec — Q3 / FR-015 extension |
| Grade level | الصف السادس | Spec 002 parent dashboard line 232 |
| Curriculum path | مسار القرآن الكريم — المستوى الثالث (60% in progress) | Spec 005 / Spec 006 §R6 |
| Sibling | سارة مؤمن (س.م) | Spec 002 / Spec 006 |
| Sibling anonymized form (used in posts visible to others) | سارة م. | This spec — Q3 / FR-015 extension |
| Sibling status | يحتاج إلى دعم (warning-100 + alert icon) | Spec 002 parent dashboard line 237 |
| Parent | ولي أمر الطالب عبد الرحمن | Spec 002 parent dashboard line 170 |
| Primary teacher (Quran) | الأستاذ أحمد بن عبد الله (أ.أ) | Spec 005 / Spec 006 |
| Secondary teacher (Arabic) | الأستاذة منى سعد (م.س) | Spec 006 §R6 |
| Secondary teacher (Islamic Studies) | الأستاذ خالد العبدلي | Spec 005 §R5 / Spec 006 §R6 |
| Admin author voice | إدارة الأكاديمية | This spec |
| April 2026 attendance % | 92% | Spec 006 §R7 |
| April 2026 homework % | 88% | Spec 006 §R7 |
| April 2026 monthly exam | 88 / 100 | Spec 006 §R7 |
| April 2026 overall | 89 / 100 — ممتاز | Spec 006 §R7 |
| April 2026 report ID | RPT-2026-04-Q03-007 | Spec 006 §R7 |
| March 2026 monthly exam | 95 / 100 — ممتاز (Quran L2 final) | Spec 005 / Spec 006 §R17 |
| Cumulative monthly-exam average | 86.6% (Dec/Jan/Feb/Mar/Apr 90/78/82/95/88) | Spec 005 / Spec 006 §R7 |
| Today's date (calendar "today") | 9 مايو 2026 | This spec |
| Active reporting month (leaderboard default) | أبريل 2026 (just-completed) | This spec — same convention as Spec 006 reports.html |

**Persona's leaderboard rank pinning** (deliberately mid-pack — proves the page works for non-#1 students):

| Dimension | Persona's rank | Source |
|-----------|---------------|--------|
| الترتيب العام | #6 | spec.md Overview |
| الحضور | #4 | derived: 92% attendance ranks well but not top |
| الواجبات | #5 | derived: 88% homework ranks mid-pack |
| الأكثر تطوراً | #2 | spec.md Overview (climbed 4 places from #10 in March) |
| تقدّم القرآن | #4 | derived: enrolled in Quran L3 with strong progress |
| المشاركة | #7 | derived: solid but not the most visible participant |

**Rationale**: Continuity is the spec's distinguishing trust signal. A reviewer reading any one of the seven pages MUST be able to identify the persona, sibling, parent, and three teachers from the visible content alone, AND verify that those identities match every prior-spec page. The mid-pack rank pinning (rank #6, not rank #1) is the specific design choice that proves the leaderboard works for the typical student (the median of the academy).

**Cross-doc references**: spec.md §Overview §persona-family; data-model.md §sample-data anchors.

---

## R11. The 7 social-hub feed posts — sample anchors

**Decision**: The student-side `social-hub.html` feed renders ≥ 7 post cards, one per type from the locked taxonomy. Each card has its own pre-defined sample content. Anonymized subjects in posts of type "تهنئة" / "إنجاز طالب" use first-name + last-initial format per R3.

| # | Type | Author | Date | Title / Body anchor | Image placeholder | Reactions (sample) | Comments | CTA |
|---|------|--------|------|-------------------|-------------------|---------------------|----------|-----|
| 1 | إعلان عام | إدارة الأكاديمية | 7 مايو 2026 | "إجازة عيد الأضحى المبارك — الأكاديمية مغلقة من 6 إلى 10 يونيو 2026" | academy crest SVG, navy/gold | 👍 23 ⭐ 8 ❤️ 12 🤲 6 👏 4 | 7 | عرض المنشور |
| 2 | تهنئة | إدارة الأكاديمية | 5 مايو 2026 | "نهنئ **عبد الرحمن م.** على تفوّقه في اختبار شهر مارس بدرجة 95% — استمرّ في التميّز!" | gold star SVG over parchment | 👍 18 ⭐ 14 ❤️ 11 🤲 9 👏 16 | 12 | عرض المنشور |
| 3 | إنجاز طالب | إدارة الأكاديمية | 3 مايو 2026 | "**سارة م.** أكملت المستوى الأول من مسار اللغة العربية — مبروك!" | book + checkmark SVG, success-tinted | 👍 11 ⭐ 6 ❤️ 19 🤲 4 👏 8 | 5 | عرض المنشور |
| 4 | تحدي الأسبوع | الأستاذ أحمد بن عبد الله | 4 مايو 2026 | "تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد" | Quran-page SVG, primary-tinted | 👍 14 ⭐ 9 ❤️ 7 🤲 4 👏 11 | 8 | عرض المنشور (selected for post-details deep-dive) |
| 5 | نصيحة تعليمية | الأستاذة منى سعد | 2 مايو 2026 | "نصيحة قراءة جهرية: ابدأ بسرعة بطيئة وزد تدريجياً — التركيز على المخارج أهمّ من السرعة" | open-book SVG, accent-tinted | 👍 9 ⭐ 5 ❤️ 8 🤲 2 👏 6 | 3 | عرض المنشور |
| 6 | تذكير اختبار | إدارة الأكاديمية | 1 مايو 2026 | "تذكير: اختبار شهر مايو في 28 مايو 2026 — تأكد من المراجعة" | calendar-clock SVG, info-tinted | 👍 21 ⭐ 4 ❤️ 3 🤲 7 👏 5 | 4 | عرض المنشور |
| 7 | منشور دورة | الأستاذ أحمد بن عبد الله | 30 أبريل 2026 | "بدأنا الجزء الثاني من المستوى الثالث في القرآن — التركيز على الآيات الطويلة" | course-banner SVG, success-tinted, "مرتبط بدورة: القرآن الكريم — المستوى الثالث" chip | 👍 13 ⭐ 7 ❤️ 9 🤲 5 👏 8 | 6 | عرض المنشور |

The "تهنئة" post (#2) is the cross-spec reconciliation anchor for FR-062: its score "95%" and date "15 مارس 2026" inside the body text MUST be byte-identical to Spec 005's `monthly-exams-passed.html` row.

The "تحدي الأسبوع" post (#4) is the deep-dive sample for `post-details.html` — it has a related-course chip (Quran L3) which exercises the optional-related-course affordance documented in FR-027.

**Rationale**: 7 posts is the brief's minimum (one per type). Each type's sample content is chosen to demonstrate (a) the type-pill color + icon variation, (b) realistic Arabic copy for that type, (c) the academy-author vs teacher-author distinction (4 of 7 posts are academy-authored, 3 are teacher-authored), and (d) a plausible mix of comment counts (3-12) and reactions distribution (no post has zero of any reaction — the page should feel populated).

**Cross-doc references**: spec.md FR-023 / FR-024 / FR-025; data-model.md §E1.

---

## R12. The post-details deep-dive — full content of post #4

**Decision**: `pages/student/post-details.html` renders post #4 from R11 ("تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد") as the deep-dive sample. The full content:

- **Breadcrumb**: مجتمع إدارتي / تفاصيل المنشور
- **Type pill**: تحدي الأسبوع (accent-100 + star icon)
- **h1**: تحدي الأسبوع: راجع سورة الفجر مع تطبيق أحكام التجويد
- **Author strip**: avatar أ.أ (primary-700) + "الأستاذ أحمد بن عبد الله" + date "5 مايو 2026"
- **Related-course chip**: "مرتبط بدورة: القرآن الكريم — المستوى الثالث" → `course-details.html` (Spec 003 anchor)
- **Hero image placeholder**: aspect-ratio 16:9, Quran-page SVG with primary-tinted background
- **Body** (4 paragraphs):
  1. "أهلاً بطلابي الكرام، تحدي هذا الأسبوع يركّز على سورة الفجر — السورة التي حفظتموها معاً في الأسابيع الماضية. الهدف ليس فقط الحفظ، بل تطبيق أحكام التجويد التي تعلّمناها."
  2. "خطوات التحدي: (1) راجع السورة كاملة مرتين بصوت عالٍ. (2) ركّز على أحكام الميم الساكنة في الآيات 5 إلى 12 — تأكّد من النطق الصحيح. (3) سجّل قراءتك بهاتفك واستمع إليها — لاحظ أين تحتاج إلى تحسين."
  3. "هذا التحدي اختياري وغير مقيّم — هو فرصة للمراجعة الشخصية قبل اختبار شهر مايو. من يرغب بمشاركة تجربته يمكنه ذكرها في تعليق على هذا المنشور."
  4. "بالتوفيق جميعاً — أنا فخور بمستواكم في الحفظ هذا الفصل."
- **5-reaction quintet**: 👍 14 / ⭐ 9 / ❤️ 7 / 🤲 4 / 👏 11 (per R11 #4)
- **Comments-count chip**: "8 تعليقات"
- **Comments thread** (≥ 4 — see R13)
- **Comment form** (per R6 SLA + FR-014 content)
- **3 related-post mini-cards** (selected from the other 6 posts in R11; e.g., posts #2, #5, #7)

**Rationale**: Post #4 is selected as the deep-dive because (a) it has a related-course chip — exercising the optional affordance most other types don't, (b) its body is long enough (4 paragraphs) to demonstrate the line-height + font-size constraints in FR-027, (c) its educational tone matches the brief's "calm, family-friendly" requirement, (d) its author is a named teacher (الأستاذ أحمد بن عبد الله — locked persona) who already appears across Spec 005 / 006.

**Cross-doc references**: spec.md FR-027 + FR-031; data-model.md §E2.

---

## R13. The 4 comments on post-details — sample anchors with status mix

**Decision**: `pages/student/post-details.html` renders ≥ 4 comments with at least one in each status (per FR-013 / FR-029):

| # | Anonymized author | Date | Body | Status | Notes |
|---|-------------------|------|------|--------|-------|
| 1 | طالب من المستوى الثالث | 5 مايو 2026 | "جزاكم الله خيراً يا أستاذ أحمد — التحدي مفيد جداً وسأشاركم تسجيلي." | تم الاعتماد (success-100 + check icon) | full opacity, normal styling |
| 2 | ولي أمر | 5 مايو 2026 | "شكراً لكم على هذه المبادرة — أحفّز ابني على المشاركة معكم." | تم الاعتماد | full opacity |
| 3 | طالبة من المستوى الثاني | 6 مايو 2026 | "هل يمكنني المشاركة من المستوى الثاني؟ بدأت في حفظ سورة الفجر هذا الأسبوع." | تم الاعتماد | full opacity |
| 4 | طالب من المستوى الثالث | 6 مايو 2026 | "بإذن الله سأشارك بعد المغرب — اللهم وفقني." | في انتظار المراجعة (warning-100 + clock icon, tooltip per R6) | muted styling: opacity-60 + italic body OR a "قيد المراجعة" overlay caption |

**Rationale**: 3 approved + 1 pending demonstrates the badge vocabulary visibly without making the page feel under-moderated. The pending comment is the most recent (chronologically appropriate — the academy hasn't reviewed it yet). The pending comment's body is benign — moderation isn't about catching spam; it's about ensuring tone and educational appropriateness — so a benign pending comment shows the moderation policy applies to ALL comments uniformly, not just suspicious ones.

The author display anonymization uses 3 distinct role-titled formats ("طالب من المستوى الثالث" / "ولي أمر" / "طالبة من المستوى الثاني") to demonstrate the FR-015 rule and visibly include both student levels + a parent voice — reinforcing the "this is a multi-audience educational community" framing.

**Cross-doc references**: spec.md FR-013 + FR-015 + FR-029; data-model.md §E3.

---

## R14. The leaderboard top-10 table — sample row anchors per dimension

**Decision**: For each of the 6 tabs, a 10-row top-10 table is rendered. The persona "عبد الرحمن م." appears in tabs that include him (per R10 ranks). The sibling "سارة م." appears in the academy-wide tabs (الترتيب العام / الحضور / الواجبات / الأكثر تطوراً / المشاركة) but NOT in "تقدّم القرآن" (per R4 enrollment scoping). All other student names use pseudonymous one-name-plus-initial format per FR-039.

**Sample roster** (10 students on the academy-wide tabs):

| Rank | Display name | Primary path | Quran-enrolled? |
|------|-------------|--------------|----------------|
| 1 | خالد ع. | Quran L4 | yes |
| 2 | نورا ف. | Arabic L3 | no |
| 3 | يوسف ر. | Quran L3 | yes |
| 4 | فاطمة ك. | Arabic L4 | no |
| 5 | محمد س. | Quran L3 | yes |
| 6 | عبد الرحمن م. | Quran L3 | yes (PERSONA) |
| 7 | ليلى ر. | Arabic L2 | no |
| 8 | علي ج. | Quran L2 | yes |
| 9 | مريم ح. | Arabic L4 | no |
| 10 | حسن أ. | Quran L4 | yes |

**For "الترتيب العام" tab** (academy-wide): persona is rank #6.

**For "الأكثر تطوراً" tab** (academy-wide): the order is reshuffled to put students who climbed the most this month at the top. The persona is rank #2 (climbed 4 places from rank #10 in March). One row demonstrates the brief's fairness lever (FR-016 + R4 + Story 3 AC#6): "ليلى ر." — overall rank #7 (visible in الترتيب العام at rank #7) — but in "الأكثر تطوراً" she's at rank #1 with "+12 مركزاً منذ مارس" (climbed from #18 in March). The caption "هؤلاء الطلاب قطعوا أكبر مسافة..." appears above the table.

**For "تقدّم القرآن" tab** (Quran-enrolled only): only the 6 Quran-enrolled students from the roster (خالد / يوسف / محمد / عبد الرحمن / علي / حسن) appear. The persona is rank #4. Sibling سارة does NOT appear. Scope caption per R4.

**For "الحضور" / "الواجبات" / "المشاركة" tabs** (academy-wide): rank order is reshuffled per dimension. The persona's rank in each is per R10 (#4 / #5 / #7).

**Per-row columns**: المركز (rank chip — gold for #1, silver for #2, bronze for #3, slate for ranks 4-10), الطالب (avatar + display name; persona row visually highlighted via subtle accent-50 background + accent-500 ring), النقاط (numeric, right-aligned, Latin digits), الشارة (badge chip — e.g., "نجم الحفظ" for top-ranked Quran progress, "مواظب الشهر" for top attendance, "متفوّق التجويد" for high Quran exam, "متطوّر بسرعة" for top Most-Improved), التقدّم (small horizontal progress bar + % label).

**Rationale**: The 10-student roster size strikes a balance — large enough to demonstrate that the leaderboard isn't only about the persona, small enough to remain readable on mobile (FR-009). The mix of Quran-enrolled (6) + non-Quran (4) supports the Q4 enrollment-scoping demonstration. Pseudonymous names use simple Arabic given names with last-letter-only initials so they read realistic without appearing to identify any real student.

**Cross-doc references**: spec.md FR-035 + FR-036 + FR-037 + FR-039; data-model.md §E4.

---

## R15. Calendar event taxonomy + chip color mapping

**Decision**: The 5 event types map to distinct color + icon pairs identical between the student calendar and the teacher calendar (visual language is shared even when underlying data differs):

| Type | Color | Icon | Student data (R16) | Teacher data (R17) |
|------|-------|------|-------------------|-------------------|
| حصة مباشرة | info-100 + info-700 text | video icon | student's enrolled classes | teacher's own classes (taught) |
| تسليم واجب | warning-100 + warning-700 text | clipboard icon | student's homework due dates | teacher's grading deadlines |
| اختبار | primary-100 + primary-700 text | calendar-clock icon | upcoming exams student takes | exams teacher invigilates |
| إصدار تقرير | success-100 + success-700 text | file-text icon | report release dates (read for student) | report submission deadlines (write for teacher) |
| إعلان أكاديمي | slate-100 + slate-700 text | megaphone icon | academy-wide announcements (link → `post-details.html`) | teacher-targeted announcements (link → `#planned`) |

**4-status mapping** (identical between calendars):

| Status | Color | Icon | Notes |
|--------|-------|------|-------|
| قادم | info-100 + info-700 | clock icon | future events |
| مكتمل | success-100 + success-700 | check icon | completed events |
| فائت | danger-100 + danger-700 | x icon | missed events — used sparingly (≤ 1 per calendar per FR-018), neutral copy |
| اليوم | accent-100 + accent-700 | sparkle icon | today's events (9 مايو 2026) — 2-3 rows on student, 2-3 rows on teacher |

**Today's cell highlighting**: `ring-2 ring-accent-500` + `bg-accent-50` on the day-cell containing 9 مايو, with a "اليوم" mini-label inside the cell.

**Rationale**: Color + icon pairing satisfies FR-004 (color is never the sole indicator). Identical mapping between student and teacher calendars satisfies FR-066 (shared visual language). The "فائت" cap (≤ 1 row) prevents the calendar from feeling punitive; the recovery-oriented copy ("موعد سابق" / "لم يُحضر" — neutral framing) per FR-018 keeps the tone non-shaming.

**Cross-doc references**: spec.md FR-041 + FR-042 + FR-043 + FR-044 + FR-067; data-model.md §E5a + E5b.

---

## R16. Student calendar — May 2026 event sample

**Decision**: `pages/student/calendar.html` renders ≥ 8 events for May 2026. Sample roster (chronological, mix of statuses):

| # | Date | Time | Type | Title | Status | CTA destination |
|---|------|------|------|-------|--------|-----------------|
| 1 | 1 مايو 2026 | 09:00 | إصدار تقرير | إصدار تقرير شهر أبريل 2026 | مكتمل | `monthly-report.html` |
| 2 | 3 مايو 2026 | 18:00 | حصة مباشرة | حصة الدراسات الإسلامية — المستوى الثاني | مكتمل | `live-session-details.html` |
| 3 | 5 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث | مكتمل | `live-session-details.html` |
| 4 | 7 مايو 2026 | 20:00 | إعلان أكاديمي | إعلان عام: إجازة عيد الأضحى المبارك | مكتمل | `post-details.html` |
| 5 | 9 مايو 2026 | 18:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (الجزء الثاني) | اليوم | `live-session-details.html` |
| 6 | 9 مايو 2026 | 19:30 | حصة مباشرة | حصة اللغة العربية — المستوى الرابع | اليوم | `live-session-details.html` |
| 7 | 12 مايو 2026 | 23:59 | تسليم واجب | تسليم واجب المراجعة 18 — اللغة العربية | قادم | `assignment-details.html` |
| 8 | 14 مايو 2026 | 19:00 | اختبار | اختبار قواعد اللغة العربية — أسبوع 22 | قادم | `exam-details.html` |
| 9 | 22 مايو 2026 | 18:00 | حصة مباشرة | حصة الدراسات الإسلامية — المستوى الثاني | قادم | `live-session-details.html` |
| 10 | 28 مايو 2026 | 19:00 | اختبار | اختبار شهر مايو — القرآن الكريم المستوى الثالث | قادم | `exam-details.html` |
| 11 | 30 أبريل 2026 | 23:59 | تسليم واجب | تسليم واجب المراجعة 17 — القرآن الكريم | فائت — موعد سابق | `assignment-details.html` |

Status distribution: 4 مكتمل + 2 اليوم + 4 قادم + 1 فائت. The "فائت" row is the homework deadline missed on 30 أبريل — not a punishing tone (the ROW reads "فائت — موعد سابق" not "غاب عن الموعد" or "فشل") and links to the assignment page so the student can recover. Per FR-018.

The "اليوم" event count (2 rows on 9 مايو) demonstrates the "اليوم" status badge AND drives the today-cell highlighting (per FR-041).

**Rationale**: 11 sample events (≥ 8 minimum) across 4 statuses + 5 types covers the full vocabulary visibly. Anchoring to May 2026 ties cleanly to today=9 مايو 2026 and keeps the future events visible (the rest of May is upcoming). Anchoring some events to April (the "إصدار تقرير" + "فائت" homework) demonstrates that the calendar isn't only forward-looking.

**Cross-doc references**: spec.md FR-043 + FR-044 + Edge Cases; data-model.md §E5a.

---

## R17. Teacher calendar — May 2026 event sample

**Decision**: `pages/teacher/calendar.html` renders ≥ 8 events for May 2026 from الأستاذ أحمد بن عبد الله's perspective. Sample roster:

| # | Date | Time | Type | Title | Status | CTA destination |
|---|------|------|------|-------|--------|-----------------|
| 1 | 30 أبريل 2026 | 23:59 | إصدار تقرير | تسليم تقارير شهر أبريل — 6 طلاب | مكتمل | `student-reports.html` |
| 2 | 3 مايو 2026 | 17:00 | إعلان أكاديمي | اجتماع المعلمين الشهري — قاعة الإدارة | مكتمل | `#planned` |
| 3 | 5 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (مجموعة عبد الرحمن) | مكتمل | `live-session-details.html` |
| 4 | 7 مايو 2026 | 23:59 | تسليم واجب | تصحيح واجب المراجعة 17 — القرآن — 6 طلاب | فائت — متأخر | `homework-review.html` |
| 5 | 9 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث (الجزء الثاني) | اليوم | `live-session-details.html` |
| 6 | 9 مايو 2026 | 22:00 | تسليم واجب | تصحيح واجب المراجعة 18 — القرآن — 5 طلاب | اليوم | `homework-review.html` |
| 7 | 12 مايو 2026 | 23:59 | تسليم واجب | تصحيح واجب المراجعة 19 — القرآن — 6 طلاب | قادم | `homework-review.html` |
| 8 | 22 مايو 2026 | 19:00 | حصة مباشرة | حصة القرآن الكريم — المستوى الثالث | قادم | `live-session-details.html` |
| 9 | 28 مايو 2026 | 19:00 | اختبار | اختبار شهر مايو — المستوى الثالث (إشراف وتصحيح) — 6 طلاب | قادم | `exam-details.html` |
| 10 | 31 مايو 2026 | 23:59 | إصدار تقرير | موعد تسليم تقارير شهر مايو — 6 طلاب | قادم | `student-reports.html` |

Status distribution: 3 مكتمل + 2 اليوم + 4 قادم + 1 فائت. The "فائت" row is a grading deadline (May 7) the teacher missed by 2 days — the row reads "متأخر — يحتاج إجراء" (per FR-018, neutral framing pointing to recovery) and links to `homework-review.html` so the teacher can finish the grading.

**Workload-summary strip** (FR-068, rendered just below the subtitle, slate-tinted background, 1-line):
```
5 حصص — 18 واجباً للتصحيح — اختبار قادم — تقرير شهري قبل 31 مايو
```

This strip aggregates the teacher's May workload at a glance and is the teacher-only affordance distinguishing this page from the student calendar (FR-068 — appears ONLY on `pages/teacher/calendar.html`).

**Critical destination differences vs student calendar**:
- تسليم واجب → `homework-review.html` (teacher's grading workspace from Spec 004) — NOT `assignment-details.html` (student's submission view).
- إصدار تقرير → `student-reports.html` (teacher's report-authoring page from Spec 006) — same destination but different lens (teacher writes, student reads).
- إعلان أكاديمي → `#planned` (teacher-targeted announcements page is out of scope for Spec 007, per FR-069).

**Rationale**: The teacher's workload is real and substantial — 18 grading tasks across multiple deadlines is plausible for a 6-student Quran class. Anchoring rows to specific student counts ("6 طلاب" / "5 طلاب") gives the page operational realism. The "اليوم" cluster (2 rows) demonstrates that today's workload is non-trivial. The "فائت" row demonstrates that the teacher is mid-task (not perfect) — humanizing the surface and demonstrating the recovery-oriented framing.

**Cross-doc references**: spec.md FR-065 → FR-071; data-model.md §E5b.

---

## R18. Admin posts table — sample rows

**Decision**: `pages/admin/social-hub.html` renders ≥ 8 posts in the moderation table, with at least one row per of the 5 visible statuses (per FR-051). Sample roster:

| # | Title | Type | Author | Audience | Status | Last updated | Actions |
|---|-------|------|--------|----------|--------|---------------|---------|
| 1 | إجازة عيد الأضحى المبارك — الأكاديمية مغلقة | إعلان عام | إدارة الأكاديمية | جميع الطلاب | منشور (success-100 + check) | 7 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 2 | تهنئة عبد الرحمن م. — اختبار شهر مارس 95% | تهنئة | إدارة الأكاديمية | جميع الطلاب | منشور | 5 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 3 | إنجاز سارة م. — إكمال المستوى الأول من العربية | إنجاز طالب | إدارة الأكاديمية | جميع الطلاب | منشور | 3 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 4 | تحدي الأسبوع: راجع سورة الفجر مع التجويد | تحدي الأسبوع | الأستاذ أحمد بن عبد الله | دورة محددة: القرآن L3 | منشور | 4 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 5 | تذكير: اختبار شهر مايو في 28 مايو 2026 | تذكير اختبار | إدارة الأكاديمية | جميع الطلاب | مجدول (info-100 + calendar) | (سيُنشر 26 مايو) | 👁 ✏ 🗑 |
| 6 | استبيان رضا أولياء الأمور — مايو 2026 | إعلان عام | إدارة الأكاديمية | أولياء الأمور | مسودة (slate-100 + edit) | 9 مايو 2026 | 👁 ✏ ↗ 🗑 |
| 7 | اجتماع المعلمين الشهري — قاعة الإدارة | إعلان عام | إدارة الأكاديمية | المعلمين | مجدول | (سيُنشر 11 مايو) | 👁 ✏ 🗑 |
| 8 | نصيحة قراءة جهرية: ابدأ بسرعة بطيئة | نصيحة تعليمية | الأستاذة منى سعد | دورة محددة: العربية L4 | منشور | 2 مايو 2026 | 👁 ✏ ⛔ 🗑 |
| 9 | إعلان قديم: ساعات العمل الصيفية 2025 | إعلان عام | إدارة الأكاديمية | جميع الطلاب | غير منشور (warning-100 + eye-off) | 14 أبريل 2026 | 👁 ✏ ↗ 🗑 |
| 10 | منشور تجريبي قديم — لا تستخدم | إعلان عام | إدارة الأكاديمية | (—) | محذوف (slate-100 + line-through, opacity-60) | 1 أبريل 2026 | 👁 |

Status distribution: 5 منشور + 2 مجدول + 1 مسودة + 1 غير منشور + 1 محذوف. The "محذوف" row keeps the title visible with line-through + opacity-60 styling AND only the 👁 action remains active — making the visual-only nature of "Delete" unmistakable per FR-050.

**4 moderation-summary cards** (FR-047) computed from the table:
- تعليقات في انتظار المراجعة: 7 (warning-100 + clock icon → "مراجعة التعليقات" CTA leading to `#planned`)
- منشورات منشورة: 5 (success-100 + check icon — count from rows 1+2+3+4+8)
- منشورات مجدولة: 2 (info-100 + calendar icon — count from rows 5+7)
- مسوّدات: 1 (slate-100 + edit icon — count from row 6)

(Note: row 9 "غير منشور" and row 10 "محذوف" don't fit any of the 4 summary card categories — they're operational states tracked in the table only. The 4 summary cards represent the 4 highest-volume editorial states.)

**Rationale**: 10 sample rows (≥ 8 minimum) demonstrate every visible status. Authorship mix: 8 academy-authored + 2 teacher-authored (rows 4 + 8) — matches the social-hub feed's mix from R11. Audience mix: 6 جميع الطلاب + 2 دورة محددة + 1 أولياء الأمور + 1 المعلمين — exercises all 4 audience types from FR-056. The محذوف row demonstrates the unique soft-delete styling rule (FR-050).

**Cross-doc references**: spec.md FR-047 + FR-049 + FR-050 + FR-051; data-model.md §E6.

---

## R19. The 5-reaction quintet — implementation specifics

**Decision**: The 5-reaction quintet (per FR-012) is rendered as 5 inline-flex `<button type="button">` elements per post. The exact order, label, and emoji:

| Position | Emoji | Label | Color (badge tint) |
|----------|-------|-------|---------------------|
| 1 | 👍 | إعجاب | primary-50 background + primary-700 text |
| 2 | ⭐ | تميّز | accent-50 + accent-700 |
| 3 | ❤️ | محبّة | danger-50 + danger-700 |
| 4 | 🤲 | دعاء | success-50 + success-700 |
| 5 | 👏 | تشجيع | info-50 + info-700 |

Each button renders: `<emoji> <count> <label>` — e.g., `👍 14 إعجاب`. The emojis are native Unicode characters (no SVG fallback) — accepting OS-dependent rendering as a known constraint per spec.md §Assumptions.

The buttons are non-interactive per R7 (CSS `:active` / `:focus` highlight only; no JS handler).

The order MUST be identical between `social-hub.html` and `post-details.html` per FR-012 — verifiable by visual diff or grep on the position-1 emoji "👍" being the leftmost reaction in both files.

**Rationale**: Each reaction has a distinct positive emotion (admiration / celebration / love / prayer / encouragement) — none overlap. The Arabic labels are short (one word each) so they fit in the inline-flex layout without wrapping. The colors map onto Spec 001's existing palette tokens — no new utilities needed.

**Cross-doc references**: spec.md FR-012; SC-006 (positive-only-emoji audit); data-model.md §E1 reaction-counts.

---

## R20. Cross-page navigation chain audit

**Decision**: Every CTA / link from this spec's seven pages MUST resolve. Inbound links from prior-spec pages MUST resolve to a real existing file.

**Outbound chain (from this spec's pages):**
- `pages/student/social-hub.html` → `post-details.html` (every "عرض المنشور" CTA on each of 7 cards) + sidebar entries to all other student pages.
- `pages/student/post-details.html` → `social-hub.html` (breadcrumb / related-post mini-cards), `course-details.html` (related-course chip when present, per Spec 003 anchor).
- `pages/student/leaderboard.html` → `monthly-report.html` (closing motivational CTA per FR-038, links to Spec 006 anchor) + sidebar entries.
- `pages/student/calendar.html` → `live-session-details.html` (Spec 003), `assignment-details.html` (Spec 004), `exam-details.html` (Spec 006), `monthly-report.html` (Spec 006), `post-details.html` (this spec) — per FR-044.
- `pages/admin/social-hub.html` → `create-post.html` (primary CTA + posts-table actions when applicable).
- `pages/admin/create-post.html` → `social-hub.html` (cancel link per FR-059).
- `pages/teacher/calendar.html` → `live-session-details.html` (Spec 003), `homework-review.html` (Spec 004), `exam-details.html` (Spec 006), `student-reports.html` (Spec 006), `#planned` (teacher-announcements out of scope) — per FR-069.

**Inbound chain (from prior-spec pages, no edits required because Q1 + Q2 = match):**
- `pages/student/dashboard.html` line 114 (sidebar) → `social-hub.html` ✓
- `pages/student/dashboard.html` line 122 (sidebar) → `leaderboard.html` ✓
- `pages/student/dashboard.html` line 130 (sidebar) → `calendar.html` ✓
- `pages/student/dashboard.html` line 474 (body CTA "عرض الجدول") → `calendar.html` ✓
- All 25+ student pages embed the constitutional Social Hub / Leaderboard / Calendar sidebar entries → all 3 destinations ✓
- `pages/admin/dashboard.html` line 183 (sidebar) → `social-hub.html` ✓
- All 4 admin pages (dashboard + certificates + create-certificate + Spec 007's two new ones) embed the constitutional Social Hub admin sidebar entry → ✓
- `pages/teacher/dashboard.html` line 103 (sidebar) → `calendar.html` ✓
- `pages/teacher/dashboard.html` line 212 (body CTA "جدولي اليوم") → `calendar.html` ✓
- All 4 teacher pages (dashboard + homework-review + homework-submission-details + student-reports) embed the constitutional Calendar teacher sidebar entry → ✓

**Rationale**: SC-015 grep-validates this chain. A reviewer running the validation query MUST see every match resolve to a file that exists in the repo after Spec 007 ships. Zero inherited 404s from prior specs (the parent/teacher attendance 404s from Spec 006 remain documented but are not Spec 007's responsibility).

**Cross-doc references**: spec.md SC-015 (no broken links); quickstart.md §SC validation table.
