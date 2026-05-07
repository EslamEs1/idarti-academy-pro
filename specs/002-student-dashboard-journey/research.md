# Phase 0 Research — Student Dashboard and Learning Journey

This feature inherits 100% of the technology stack and design tokens locked by Spec 001 (`specs/001-frontend-foundation/research.md`). The research below covers only the **net new** decisions specific to Spec 002 and records the resolutions chosen during the `/speckit-clarify` session.

---

## R1 — Notifications page layout (Q1, Session 2026-05-07)

**Decision**: Single chronological list, newest first. Each row carries an inline type icon + Arabic type label. No tabs, no grouped sections, no JS-driven filtering.

**Rationale**:
- Matches typical inbox UX (bell → flat list of recent items).
- Works at every breakpoint without layout breakage at 375 px.
- Adds zero JavaScript, preserving the four-handler whitelist from Constitution Principle V and Spec 001's FR-033.
- The 8–12 notifications expected in this prototype do not warrant the discoverability overhead of tabs or section anchors.

**Alternatives considered and rejected**:
- *Grouped sections by type* (homework, sessions, feedback, payments, achievements, exams) — rejected because it makes the page taller without added value at this scale; users cannot quickly skim the absolute newest item across types.
- *Tab-filtered list* with a "All / Homework / Sessions / Feedback / Achievements / Exams" tab strip — rejected because it would force a JS handler reuse (the existing tab handler) for marginal UX benefit, and risks the user missing a fresh notification that lives behind an inactive tab.

**Implementation note**: Each notification row uses the `bg-{type}-50 border-{type}-200` pattern from the Spec 001 alerts section to make the type readable at a glance. The unread state is conveyed by a leading dot + bolder title text; the read state drops the dot and uses the `text-text-muted` token.

---

## R2 — Learning Journey timeline orientation (Q2, Session 2026-05-07)

**Decision**: Vertical timeline, oldest at the top, newest at the bottom. On mobile (< 1024 px) the timeline is a single-column stack of cards with the rail on the inline-start. On desktop (≥ 1024 px) the rail with milestone nodes sits on the inline-start (right edge under RTL) and each milestone's card extends to the inline-end of its node.

**Rationale**:
- Vertical timelines are the universal "history feed" pattern; readers immediately understand top-to-bottom = past-to-present.
- A single column at narrow widths avoids the layout breakage that horizontal timelines suffer at 375 px.
- Oldest-at-top reads as a story of growth — the student / parent scrolls forward through accomplishments and arrives at "where we are now" at the bottom.

**Alternatives considered and rejected**:
- *Vertical, newest-at-top* (reverse-chronological feed) — rejected because the page intent is a *journey* (a story you read forward), not an inbox (a stack of latest items). The dashboard's Journey Timeline Preview already surfaces recent items at the top; the dedicated journey page complements that with the full chronological narrative.
- *Horizontal timeline flowing right-to-left under RTL* — rejected because while visually striking on desktop, it requires a horizontal scrollbar at narrow widths or a fall-back vertical layout, which adds CSS complexity without proportional UX benefit.

**Implementation note**: The rail is a 2-px vertical line in `bg-slate-200` running between the milestone nodes; each node is a circle in the success / accent / slate token depending on milestone status (completed / current / upcoming). The current milestone node carries an additional pulse-style outer ring (static — pure CSS, no animation) and a "حالياً" text label in addition to the color, satisfying FR-032.

---

## R3 — Parent Confidence Snapshot position (Q3, Session 2026-05-07)

**Decision**: Position 2 of 10 dashboard blocks. The Parent Confidence Snapshot sits immediately under the Welcome Hero, *before* the Monthly Progress Overview.

**Rationale**:
- The page intent is to make the parent feel the academy is tracking the student. A parent glancing at the screen over the student's shoulder sees that summary without scrolling at common laptop viewports (1280 × 800 and similar).
- The hero greets the student by name; the snapshot directly under it tells the parent "here is the at-a-glance summary you can rely on". This narrative ordering reinforces the trust message of Constitution Principle IV.
- The student's own working surface (goals, session, homework, notes, path, achievements) flows below the snapshot — the snapshot does not interrupt the student's primary tasks; it merely declares the parent-readable view at the top of the page.

**Alternatives considered and rejected**:
- *Position 9 (original)* — between Achievements and Journey Preview. Rejected because a parent landing on the dashboard would have to scroll past 8 blocks before encountering anything labeled for them; the trust-building intent would be diluted.
- *Sticky right-rail card on `xl:` viewports* — rejected because it adds layout complexity (two-column page on `xl:`, single column elsewhere) and risks the snapshot disappearing on smaller laptops where parents are most likely to look. Position 2 in the main flow is simpler, predictable, and inherits the existing card grid.

**Implementation note**: The snapshot card uses an accent border-start (`border-s-4 border-accent-500`) + a soft `bg-accent-50` tint so it visually separates from the navy/white card stack and signals "this card is for the parent". The label "ملخص يمكن لولي الأمر متابعته" is rendered as a small caption above the four data rows (attendance %, homework %, last teacher note, next evaluation date).

---

## R4 — Header bell: `<button>` → `<a href="notifications.html">`

**Decision**: Convert the header notification bell from a `<button type="button">` (Spec 001) to an `<a href="notifications.html">` on every student-section page redesigned or created by this feature.

**Rationale**:
- The bell is a navigation control to the Notifications page; semantically, it is a link.
- An `<a>` allows browsers to support middle-click / cmd+click "open in new tab" behavior, which a `<button>` without explicit JS cannot.
- Sticking to a `<button>` would force a `data-` attribute + new JS handler to navigate, violating FR-065 (zero new JS).
- The screen-reader experience improves: the bell announces as a link to "الإشعارات" rather than a generic button.

**Alternatives considered and rejected**:
- *Keep as `<button>` and wire navigation in JS* — rejected because it requires a new handler in `assets/js/main.js`, breaking the four-handler whitelist.
- *Make the bell open a dropdown of recent notifications* — rejected because (a) it requires the dropdown handler to grow new content, (b) the dropdown content would need to be hard-coded and would drift out of sync with `notifications.html`, and (c) the dropdown would either duplicate or short-circuit the dedicated notifications page.

**Implementation note**: The `<a>` keeps the same h-10 w-10 visual footprint, the same aria-label "الإشعارات", and the same notification-count `<span>` overlay. The unread-count badge displays "3" matching FR-052.

---

## R5 — Two new student sidebar entries — placement and label

**Decision**: Add exactly two new entries to the **student sidebar only** (per FR-066):
1. "**رحلتي التعليمية**" (Learning Journey) — placed after "الإنجازات" (Achievements) and before "التقارير" (Reports). Lucide icon: `compass`.
2. "**خطة الأسبوع**" (Weekly Plan) — placed after "التقويم" (Calendar) and before "سجل المدفوعات" (Payment History). Lucide icon: `clipboard-list`.

**Rationale**:
- The student sidebar from Spec 001 has 13 entries. Adding two new entries brings it to 15. The constitutional cap is "no entry may be omitted" (i.e., min, not max), so 15 entries are allowed provided the sidebar still scrolls cleanly within the `nav.flex-1.overflow-y-auto` container.
- Placement is contextual: "رحلتي التعليمية" is a retrospective/progress view, so it sits next to "الإنجازات"; "خطة الأسبوع" is a planning/scheduling view, so it sits next to "التقويم".
- The icons map naturally: `compass` for a journey, `clipboard-list` for a planned set of items. Both icons are already in the Lucide bundle the project pulls inline; no new icons or licenses needed.

**Alternatives considered and rejected**:
- *Add the entries to the parent sidebar too* — rejected because parent sidebar entries are governed by Constitution v1.0.1 which does NOT include these. Cross-role sidebar pollution would violate Principle VI (role-specific business rules in the UI).
- *Replace existing entries* (e.g., remove "التقارير" since the journey is itself a report) — rejected because Constitution v1.0.1 explicitly enumerates "Reports" in the student sidebar and forbids omission.

**Implementation note**: The two entries are added to `components/student-sidebar.html` once; that updated partial is then hard-embedded into all four pages built by this feature. The active-entry indicator (`is-active` class + `aria-current="page"`) is set per page:
- `dashboard.html` → "الرئيسية"
- `learning-journey.html` → "رحلتي التعليمية"
- `weekly-plan.html` → "خطة الأسبوع"
- `notifications.html` → "الرئيسية" stays inactive; bell is the canonical entry; no sidebar entry highlighted (FR-002 explicitly: "no new sidebar entry; bell is the canonical entry point"). However, to give the user *some* current-section indicator on the notifications page, the page's `<h1>` shows "الإشعارات" and the header `<title>` reads "الإشعارات — لوحة الطالب".

---

## R6 — Status badge selection across the four pages (≥ 12 of 19 used)

**Decision**: Use ≥ 12 of the 19 badges from Spec 001's data-model `§E6`. Concrete map:

| Page / Block | Badge usages |
|---|---|
| Dashboard / Weekly Goals | "مكتمل", "قيد التنفيذ", "لم يبدأ" (mapped to "مكتمل", "قيد المراجعة", "قيد الانتظار") |
| Dashboard / Homework Reminders | "تم التسليم", "قيد المراجعة", "يحتاج إلى مراجعة", "مقبول" |
| Dashboard / Learning Path Progress | "مكتمل" (Levels 1–2), "قادم" (Level 4), plus "حالياً" status text (not a badge) for Level 3 |
| Dashboard / Achievement Preview | No badges per se; uses icon + name + date |
| Dashboard / Journey Timeline Preview | "مكتمل", "ممتاز", "ناجح" |
| Learning Journey | "مكتمل", "ممتاز", "ناجح", "قادم", "حالياً" via icon |
| Weekly Plan / Goals | same three from dashboard |
| Weekly Plan / Homework Deadlines | "قيد الانتظار", "تم التسليم", "متأخر السداد" (used semantically as "متأخر التسليم" — prototype acceptable) |
| Notifications | optional inline badges for unread state — uses dot, not badge |

**Rationale**: SC-004 requires ≥ 12 distinct badge usages across the four pages. The map above hits ≥ 12 distinct uses without inventing new badge variants, satisfying both Spec 001's catalog rule and the constitution's badge vocabulary.

**Alternatives considered and rejected**:
- *Introduce a new "متأخر التسليم" badge for late homework* — rejected because the existing "متأخر السداد" badge already covers the lateness semantic (originally framed for payments). For a prototype this overload is acceptable; if a future spec needs a distinct "late homework" badge, the constitution amendment procedure handles that.

---

## R7 — Sample-data anchors (carried forward from Spec 001)

**Decision**: All sample data on the four pages anchors to:
- Student: **عبد الرحمن مؤمن** (avatar initials "ع.م", `bg-primary-700 text-white`).
- Path / Level: **مسار القرآن الكريم — المستوى الثالث**.
- Reference month: **أبريل 2026** (used in dates throughout).
- Currency: **ر.س** (only relevant in the Notifications page payment-type entries).
- Teachers: **الأستاذ أحمد بن عبد الله**, **الأستاذة فاطمة الزهراني**, **الأستاذ خالد السبيعي**, **الأستاذة منى العتيبي** (a roster of four — at least one Quran teacher, one Arabic teacher, one math/science teacher, one English teacher, drawn from Spec 001's sample-data anchors and lightly extended).

**Rationale**: Carrying these anchors forward keeps the four pages internally consistent with the dashboards already shipped in Spec 001 and gives reviewers a single mental model of "this is Abdulrahman's universe" across all 10 student-section pages eventually built.

**Alternatives considered and rejected**:
- *Switch to a different student persona* — rejected because Spec 001 visual reviewers are already calibrated on Abdulrahman; switching would create review noise without UX benefit.

---

## R8 — Saudi-friendly date formatting

**Decision**: All dates render in the Arabic Gregorian style with Latin digits, e.g. "الإثنين 28 أبريل 2026" or short "28 أبريل 2026". Times use the 12-hour clock with Arabic period markers, e.g. "7:00 م" (م = مساءً) or "10:30 ص" (ص = صباحاً).

**Rationale**:
- Saudi users default to the Gregorian calendar in modern educational software (Hijri is supported in some govt contexts but is not the academy norm).
- Latin digits inside Arabic text are mandated by FR-060 (carry-over of Spec 001 FR-043).
- The 12-hour clock with Arabic AM/PM markers is the most natural reading for Saudi users.

**Alternatives considered and rejected**:
- *Hijri dates* — rejected because the academy operates on a Gregorian academic calendar; Hijri would create reconciliation complexity.
- *24-hour clock* — rejected because while technically unambiguous, it is uncommon in Arabic family-facing UIs.
