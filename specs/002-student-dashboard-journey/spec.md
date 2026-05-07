# Feature Specification: Student Dashboard and Learning Journey

**Feature Branch**: `002-student-dashboard-journey`
**Created**: 2026-05-07
**Status**: Draft
**Input**: User description: "Build the full student dashboard experience as a motivational learning success page. The dashboard must make the student feel encouraged and make the parent feel that the academy is actively tracking progress, attendance, homework, live sessions, achievements, and teacher feedback."

---

## Context

This feature builds on top of `001-frontend-foundation`, which delivered the design system, app shell (header + sidebar + body), UI Kit, and a placeholder student dashboard. This spec replaces the placeholder dashboard with a complete, motivational, content-rich experience and adds three new student pages. The goal is a static, Arabic-first, RTL prototype that conveys the academy's commitment to tracking and supporting student progress — for both the student and the parent who will look over their shoulder.

The four pages built by this feature are:

1. `pages/student/dashboard.html` — the redesigned home screen with ten content blocks
2. `pages/student/learning-journey.html` — the full historical timeline of student milestones
3. `pages/student/weekly-plan.html` — the focus-this-week view with goals, sessions, deadlines
4. `pages/student/notifications.html` — the inbox of system, teacher, payment, and achievement alerts

All four pages reuse the shell, sidebar, header, design tokens, and UI Kit components established in Spec 001 — no shell redesign, no new component categories, no new JavaScript handlers.

---

## Clarifications

### Session 2026-05-07

- Q: Notifications page layout — single chronological list, grouped sections, or tab-filtered? → A: Single chronological list, newest first, each row tagged with type icon + Arabic type label, no JS-driven filtering or tabs.
- Q: Learning Journey timeline orientation — vertical or horizontal? → A: Vertical timeline, oldest at top, newest at bottom; single-column on mobile, rail-with-cards on desktop.
- Q: Parent Confidence Snapshot position on the dashboard? → A: Position 2, immediately after the Welcome Hero and before the Monthly Progress Overview, so a parent glancing at the page sees it without scrolling.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Student opens the dashboard and feels seen, encouraged, and oriented (Priority: P1)

A student (Abdulrahman, Level 3 in the Quran path) opens the academy after school. Within seconds of landing on the dashboard, he understands: where he stands this month, what he has to do this week, what's next on his calendar, what the teacher recently said about him, what badges he earned, and what level comes after the one he's working on. The page feels warm and personal — addressed to him by name, with a motivational note and a clear "next step" CTA.

**Why this priority**: This is the home screen of the entire student experience. If it feels generic or empty, the academy looks abandoned; if it feels alive, every other page benefits. It is also the page parents are most likely to glance at, so it carries the parent-trust burden.

**Independent Test**: Open `pages/student/dashboard.html` in a browser without touching the other three pages. The student should be able to identify their name, level, weekly goal, next live session, latest teacher note, current badge count, and at least one meaningful CTA — all above the fold or with at most one scroll on a 1280×800 viewport. A sibling or parent looking over the student's shoulder should be able to summarize "what is the academy tracking for this student this month" in one sentence.

**Acceptance Scenarios**:

1. **Given** the student opens `pages/student/dashboard.html`, **When** the page renders, **Then** the welcome hero shows the student's name, current level, current learning path name, a motivational sentence, the monthly progress percentage as a number and a visual bar, a primary CTA labeled "عرض خطة الأسبوع", and a secondary CTA labeled "متابعة التعلم".
2. **Given** the dashboard is open, **When** the user scans the Monthly Progress Overview, **Then** they see exactly six metric cards covering attendance rate, homework completion, quiz average, current level progress, achievement points, and active live sessions count — each with a value, a unit/label in Arabic, and a status indicator (icon + text or color + text, never color alone).
3. **Given** the dashboard is open, **When** the user scans the Weekly Goals section, **Then** they see four goals (attend 2 live sessions, submit 3 homework tasks, review teacher notes, prepare for the monthly quiz), each annotated with a status badge from the Spec 001 catalog: "مكتمل" / "قيد التنفيذ" / "لم يبدأ".
4. **Given** the dashboard is open, **When** the user scans the Upcoming Live Session card, **Then** they see one specific session with title, teacher name, exact date and time in Arabic, course name, type ("جماعي" or "خاص"), a primary "انضمام للحصة" button, and a visually present "إضافة للتقويم" secondary action.
5. **Given** the dashboard is open, **When** the user scans the Homework Reminder section, **Then** they see at least three pending or recently-due homework items, each with title, due date, status badge, teacher name, and a "عرض الواجب" link.
6. **Given** the dashboard is open, **When** the user scans the Teacher Notes section, **Then** they see at least three notes (one positive, one suggestion-for-improvement, one Quran-specific recitation note), each with body text, date, and teacher name.
7. **Given** the dashboard is open, **When** the user scans the Learning Path Progress, **Then** they see all four levels of the Quran path, with Levels 1–2 marked as completed (visual + status), Level 3 marked as the current/active level, and Level 4 marked as locked/upcoming.
8. **Given** the dashboard is open, **When** the user scans the Achievement Preview, **Then** they see at least three named badges/certificates ("نجم الحضور", "بطل الواجبات", "تميّز شهر أبريل") with icons and dates, plus a CTA linking to a planned achievements page.
9. **Given** the dashboard is open, **When** the user scans the Parent Confidence Snapshot ("ملخص يمكن لولي الأمر متابعته"), **Then** they see attendance percentage, homework commitment percentage, last teacher note quote, and next evaluation date — all in a visually distinct card so the parent can identify it at a glance.
10. **Given** the dashboard is open, **When** the user scans the Student Journey Timeline Preview, **Then** they see at least five recent milestones (joined academy, first session completed, first homework submitted, monthly exam passed, certificate received) and a "عرض الرحلة كاملة" CTA linking to `learning-journey.html`.
11. **Given** the dashboard is open at any of 375 / 768 / 1024 / 1280 px, **When** the user scrolls top-to-bottom, **Then** no horizontal page-level scrollbar appears, all card content remains readable, and the sidebar/header behave per the shell rules from Spec 001.

---

### User Story 2 — Student (or parent) reviews the full learning journey timeline (Priority: P2)

A parent during a parent-teacher conversation, or the student before the monthly quiz, opens the Learning Journey page to see everything that has happened from enrollment until today: when the student joined, the first course they started, every level they completed, every certificate awarded, every badge earned, and where they are right now. The page reads like a story of progress — chronological, dated, each event tied to a course, each event tagged with its status.

**Why this priority**: The dashboard shows a *preview* of the timeline; this page shows the full history. It is the second most important page because it is what reassures parents about the academy's tracking and what reminds students of how far they have come. It also reinforces the academy's "نتابع رحلتك" promise.

**Independent Test**: Open `pages/student/learning-journey.html` in a browser. Without any other context, a viewer should be able to answer: "Has this student been with the academy long? Have they completed any levels? Have they earned any certificates? What is happening right now?" — all by reading the timeline. The page should also link back to the dashboard via the sidebar.

**Acceptance Scenarios**:

1. **Given** the journey page is open, **When** the user scans the timeline, **Then** they see at least nine chronological events covering: enrollment, first course started, first live session attended, first homework submitted, first monthly quiz passed, level completed, certificate awarded, new badge earned, and the current active milestone.
2. **Given** the timeline is rendered, **When** the user inspects any timeline entry, **Then** they see four pieces of information together: date (day/month/year in Arabic), title, short description (one or two sentences), the related course name, and a status badge from the Spec 001 catalog.
3. **Given** the page is open at 375 px, **When** the user scrolls through the timeline, **Then** the timeline does not break the layout, every entry is readable, and no horizontal scrollbar appears at the page level.
4. **Given** the page is open at any breakpoint, **When** the user looks at the visual timeline indicator (rail + nodes), **Then** the current/active milestone is visually distinct from completed and upcoming milestones (color + icon, not color alone).

---

### User Story 3 — Student opens the weekly plan to focus on this week's commitments (Priority: P3)

On a Sunday morning, the student opens the Weekly Plan page to see exactly what to do this week. The page shows the week range as Arabic dates, the goals for the week, the live sessions on the schedule, the homework deadlines, the review tasks the teacher assigned, the exam preparation items, any reminders from teachers, a progress checklist that shows what the student has already ticked off, and a short motivational note tailored to this week.

**Why this priority**: The Weekly Plan transforms vague intentions into a concrete, time-boxed plan. It is third in priority because the dashboard already surfaces the *highlights* of the week; this page goes deep. Students who actually work the plan will feel the academy is helping them succeed.

**Independent Test**: Open `pages/student/weekly-plan.html`. A reader should be able to identify the date range covered, see at least one item in each of the eight sub-sections (goals, sessions, homework deadlines, reviews, exam prep, teacher reminders, checklist, motivational note), and tell which items are already done versus pending — without any other page context.

**Acceptance Scenarios**:

1. **Given** the weekly plan page is open, **When** the user looks at the page header, **Then** they see the week range in Arabic (e.g., "27 أبريل – 3 مايو 2026") prominently displayed.
2. **Given** the page is open, **When** the user scans the Goals block, **Then** they see at least four weekly goals each tagged with one of the three Spec 001 status badges (مكتمل / قيد التنفيذ / لم يبدأ).
3. **Given** the page is open, **When** the user scans the Upcoming Sessions block, **Then** they see at least two upcoming live sessions with title, teacher, date/time, and course.
4. **Given** the page is open, **When** the user scans the Homework Deadlines block, **Then** they see at least three homework items with title, due date, course, and status.
5. **Given** the page is open, **When** the user scans the Review Tasks, Exam Preparation, and Teacher Reminders blocks, **Then** each block has at least two specific Arabic items — never a placeholder or empty list.
6. **Given** the page is open, **When** the user scans the Progress Checklist, **Then** they see ≥ five checklist items with visible checked/unchecked state and clear Arabic labels.
7. **Given** the page is open, **When** the user reads the Motivational Note block, **Then** they see a short Arabic message (one to three sentences) attributed to a real teacher name, dated, and warm in tone.

---

### User Story 4 — Student catches up on notifications (Priority: P3)

The student opens the Notifications page to read everything the academy and the teachers have sent: homework reminders, live session reminders, teacher feedback messages, payment/family notifications relevant to the student, achievement notifications, and exam reminders. Each notification clearly states what it is, when it arrived, and whether it has been read.

**Why this priority**: Same priority as Weekly Plan — both are supporting flows that depend on the dashboard's existence. The Notifications page is what the bell icon in the header points to, so it must look populated and useful.

**Independent Test**: Open `pages/student/notifications.html`. A viewer should be able to count read vs unread notifications, identify which type each notification belongs to, see the time/date of each, and identify at least one notification that has a CTA (e.g., "افتح الواجب", "انضم للحصة"). The page should reflect the same notification badge count visible in the header bell on every other student page (3).

**Acceptance Scenarios**:

1. **Given** the notifications page is open, **When** the user scans the list, **Then** they see at least eight distinct notifications spanning all six required types (homework, live session, teacher feedback, payment/family, achievement, exam).
2. **Given** the list is rendered, **When** the user looks at any single notification, **Then** they see its type label, the time/date it arrived, a clear visual distinction between unread and read state, and (where applicable) a CTA button or link.
3. **Given** the user opens this page from the header bell on the dashboard, **When** the page loads, **Then** the unread count visible on the page matches the number badge shown on the header bell on the dashboard (3).
4. **Given** the page is open at 375 px, **When** the user scrolls the list, **Then** notifications stack into a single column and remain readable, with no horizontal scrollbar at the page level.

---

### Edge Cases

- **Empty list display**: A category with no current items (e.g., a quieter homework week) MUST still render an Arabic empty-state message ("لا توجد واجبات مستحقة هذا الأسبوع — أحسنت!") rather than an empty `<ul>` or a missing block. Empty in this prototype means *visually styled empty-state*, never blank space.
- **Long Arabic teacher names**: A teacher full name like "الأستاذ عبد الرحمن بن عبد العزيز السبيعي" MUST not break the card layout — names truncate with ellipsis where space is constrained (live-session card avatar row, notifications list).
- **Same-day events on weekly plan**: When two sessions or two homework deadlines fall on the same day, the weekly plan MUST display them grouped under that date with clear separation, not stacked in a way that hides one.
- **Active-vs-locked level visual contrast**: In Learning Path Progress on the dashboard, the locked Level 4 MUST be visually muted (lower contrast, lock icon) so the student does not click it expecting content. This is a usability safeguard, not just a style choice.
- **Notifications with destructive actions**: If a notification's CTA leads to a delete-style action (e.g., "إلغاء الحصة"), the CTA MUST be styled with the danger color token from Spec 001, not the neutral token, so the student does not click it accidentally. (For this prototype, no notification actually deletes anything; this is about visual conventions.)
- **Read-state regression**: The notification "read/unread" indicator is purely visual in this static prototype — clicking a notification does not actually change its state. The dot/border MUST therefore be tied to static markup, and it is acceptable that interaction does nothing. Future feature flags would handle real state.
- **Parent-confidence card location**: The parent-confidence snapshot lives *inside* the student dashboard. It is not a separate page. The wording MUST address the parent ("ملخص يمكن لولي الأمر متابعته") so the student understands this block is shared, not private.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Shell consistency

- **FR-001**: All four pages MUST reuse the exact header structure from Spec 001 (logo block, burger button on mobile, page title, notification bell with count badge, message link with count badge, user dropdown anchor). The header height (`h-16`), padding (`px-4 md:px-6 lg:px-8`), and stickiness MUST be unchanged from `pages/student/dashboard.html` as built in Spec 001.
- **FR-002**: All four pages MUST reuse the student sidebar from Spec 001 (`aside id="app-sidebar"`) verbatim — same dark-navy background, same `.is-active` indicator pattern. Each page MUST mark exactly one sidebar entry as active via `aria-current="page"` + `is-active` class:
  - `dashboard.html` → "الرئيسية"
  - `learning-journey.html` → a new sidebar entry "رحلتي التعليمية" added to the existing student sidebar
  - `weekly-plan.html` → a new sidebar entry "خطة الأسبوع" added to the existing student sidebar
  - `notifications.html` → activated when the user clicks the header bell (no new sidebar entry; bell is the canonical entry point)
- **FR-003**: All four pages MUST keep the same logout link, same Tajawal font loading, same `lang="ar" dir="rtl"` attributes, same `assets/css/output.css` and `assets/js/main.js` references as the Spec 001 student dashboard.

#### Dashboard content

- **FR-010**: The dashboard MUST contain exactly ten distinct content blocks in this order: Welcome Hero → **Parent Confidence Snapshot** → Monthly Progress Overview → Weekly Goals → Upcoming Live Session → Homework Reminders → Teacher Notes → Learning Path Progress → Achievement Preview → Journey Timeline Preview. The Parent Confidence Snapshot MUST sit at position 2 (immediately under the Welcome Hero) so a parent looking over the student's shoulder sees it without scrolling at common laptop viewports.
- **FR-011**: The Welcome Hero card MUST contain: student name, current level label, current learning path name, a one-sentence motivational message in Arabic, the monthly progress percentage as both numeral and progress bar, a primary CTA "عرض خطة الأسبوع" linking to `weekly-plan.html`, and a secondary CTA "متابعة التعلم" linking to `my-courses.html`.
- **FR-012**: The Monthly Progress Overview MUST contain exactly six metric cards: attendance rate, homework completion, quiz average, current level progress, achievement points, and active live sessions count. Each card MUST pair its number with an Arabic label and an icon (no color-only signals, FR-035 from Spec 001).
- **FR-013**: The Weekly Goals section MUST list four named goals, each with one of the three status badges from the Spec 001 catalog ("مكتمل" / "قيد التنفيذ" / "لم يبدأ"). At least one goal MUST be marked completed and at least one MUST be marked in-progress, so the section feels lived-in.
- **FR-014**: The Upcoming Live Session card MUST surface a single specific upcoming session with: session title, teacher name, exact date and time in Arabic (e.g., "الإثنين 28 أبريل 2026 — 7:00 م"), course name, type label ("جماعي" or "خاص"), a primary "انضمام للحصة" button, and a visually present secondary "إضافة للتقويم" action.
- **FR-015**: The Homework Reminders section MUST list at least three pending homework items, each with title, due date in Arabic, status badge, teacher name, and a "عرض الواجب" link.
- **FR-016**: The Teacher Notes section MUST display at least three notes — one explicitly positive, one suggestion-for-improvement, and one Quran-specific (recitation, tajweed, memorization) — each with body text, dated, and attributed to a teacher name.
- **FR-017**: The Learning Path Progress block MUST visualize all four levels of the student's path (vertical or horizontal stepper). Levels 1–2 marked completed; Level 3 the active level; Level 4 locked/upcoming. The visual treatment MUST distinguish the three states without relying on color alone.
- **FR-018**: The Achievement Preview MUST display at least three named badges/certificates with icons, names, and earned-on dates, plus a "عرض كل الإنجازات" CTA link.
- **FR-019**: The Parent Confidence Snapshot MUST be a visually distinct card (different surface tint or border accent), labeled "ملخص يمكن لولي الأمر متابعته", containing attendance %, homework commitment %, the last teacher note quote, and the next evaluation date.
- **FR-020**: The Journey Timeline Preview MUST show at least five recent milestones with date + title + status badge each, ending with a "عرض الرحلة كاملة" CTA linking to `learning-journey.html`.

#### Learning Journey page

- **FR-030**: `pages/student/learning-journey.html` MUST present a single **vertical** chronological timeline, oldest at the top and newest at the bottom, with at least nine entries covering enrollment, first course started, first live session attended, first homework submitted, first monthly quiz passed, level completed, certificate awarded, new badge earned, and current active milestone. On mobile (< 1024 px) the timeline MUST collapse to a single-column rail-with-cards stack; on desktop the rail with milestone nodes MUST sit on the inline-start (right edge under RTL) with each milestone's card to the inline-end of its node.
- **FR-031**: Each timeline entry MUST contain five fields: date (Arabic format), title, description (one or two sentences), related course, status badge (using the Spec 001 19-badge catalog).
- **FR-032**: The timeline MUST visually highlight the *current* milestone differently from past (completed) and future (upcoming) milestones — using both color and an explicit icon or label, never color alone.

#### Weekly Plan page

- **FR-040**: `pages/student/weekly-plan.html` MUST display the week range header in Arabic (day-month format spanning seven days, e.g., "27 أبريل – 3 مايو 2026").
- **FR-041**: The page MUST contain exactly nine content blocks: week range header, weekly goals, upcoming sessions, homework deadlines, review tasks, exam preparation, teacher reminders, progress checklist, motivational note. Every block MUST contain at least two specific items (no empty placeholders).
- **FR-042**: The Progress Checklist MUST contain at least five checklist items rendered with checkboxes whose checked/unchecked state is visible from the markup. (Static — clicking does not toggle.)
- **FR-043**: The Motivational Note MUST be one to three Arabic sentences, attributed to a teacher name, with a date.

#### Notifications page

- **FR-050**: `pages/student/notifications.html` MUST display at least eight notifications as a **single chronological list, newest first**, with no tab-based filtering and no grouped sections. Notifications MUST span all six required types: homework reminder, live session reminder, teacher feedback, payment/family, achievement, exam reminder. Each notification's type is signaled by an icon plus an Arabic type label inline on the row.
- **FR-051**: Each notification MUST display: type label (icon + Arabic label), time/date, read/unread visual state, and (where applicable) a CTA button or link.
- **FR-052**: The unread notification count visible on the notifications page MUST match the number on the header bell badge (which is "3" across all student pages from Spec 001).
- **FR-053**: The page MUST visually distinguish read from unread notifications without relying on color alone (e.g., bold text + dot for unread, subdued text + no dot for read).

#### Cross-cutting requirements

- **FR-060**: All Arabic copy MUST use Latin digits (1, 2, 3) — Eastern Arabic-Indic digits are forbidden anywhere in user-facing content (FR-043 from Spec 001 carries forward).
- **FR-061**: All four pages MUST contain zero `href="#"` placeholder links. Every link MUST point to an existing or planned-future page (relative paths, e.g., `assignments.html`, `live-sessions.html`).
- **FR-062**: No page MUST use JavaScript to render data. All entities (sessions, homework items, notes, badges, milestones, notifications) MUST exist as static HTML in the file. The only JavaScript permitted is the four shell handlers from Spec 001 (drawer, dropdown, modal, tabs).
- **FR-063**: All four pages MUST be responsive at 375 / 768 / 1024 / 1280 px. The drawer pattern from Spec 001 (sidebar hidden on mobile, fixed on desktop ≥ 1024 px) carries forward unchanged.
- **FR-064**: No page MUST contain placeholder filler ("lorem ipsum", "Item 1", "TBD", "Course 1", "Student 1"). Every content slot MUST hold realistic Saudi-friendly Arabic content tied to the sample student persona (Abdulrahman Mu'min, Quran path, Level 3, April 2026).
- **FR-065**: This feature MUST add **zero new JavaScript** to `assets/js/main.js`. The notifications page is a static chronological list (no tabs); the dashboard, weekly plan, and learning journey pages are static markup. The four shell handlers from Spec 001 (drawer, dropdown, modal, tabs) remain the only JS in the project. The 80 LOC budget for `main.js` is therefore not at risk under this feature.
- **FR-066**: Sidebar additions ("رحلتي التعليمية", "خطة الأسبوع") MUST be added to the **student** sidebar only — the four other roles do not get these entries.

### Key Entities

- **Student Profile**: Name (Arabic), avatar initials, current level, current learning path, monthly progress percentage, attendance rate, homework completion rate, quiz average, achievement points balance.
- **Live Session (upcoming)**: Title, teacher name, exact date+time in Arabic, course name, type (group/private), join URL (planned page link), calendar action.
- **Homework Item**: Title, course, due date, status (pending/submitted/under-review/needs-revision/accepted), teacher name, "view assignment" link.
- **Teacher Note**: Body text (Arabic), category (positive / improvement / Quran-specific), date, teacher name.
- **Achievement Badge**: Name, icon, earned-on date, optional short description.
- **Learning Path Level**: Level number, name, status (completed / active / locked).
- **Timeline Milestone**: Date, title, description, related course, status badge.
- **Weekly Plan Item**: Type (goal / session / homework / review / exam-prep / reminder / checklist), label, date or due date, status.
- **Notification**: Type (homework / live-session / teacher-feedback / payment-family / achievement / exam), title, time/date, read state, optional CTA.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time viewer can identify, within 10 seconds of opening the dashboard, the student's name, current level, current path, and at least one immediate next action (live session, homework, or weekly goal).
- **SC-002**: All four pages open from the file explorer (no dev server) and reach first meaningful paint within 5 seconds at standard broadband, with zero console-blocking errors.
- **SC-003**: At 375 / 768 / 1024 / 1280 px, no page produces a horizontal page-level scrollbar; all content remains readable; the sidebar/drawer behavior matches Spec 001.
- **SC-004**: A reviewer counting status badges across the four pages confirms ≥ 12 distinct badge usages drawn from the Spec 001 19-badge catalog (no badge invented outside the catalog).
- **SC-005**: A reviewer searching all four pages with `grep -nE 'lorem|Item [0-9]|TBD|Course [0-9]|Student [0-9]'` finds zero matches.
- **SC-006**: A reviewer running an Arabic-Indic digit grep against the four pages finds zero matches (no Eastern Arabic-Indic digits in user-facing content).
- **SC-007**: A reviewer running `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` after this feature still finds zero matches (no JS-rendered content was introduced).
- **SC-008**: A parent reading the dashboard's Parent Confidence Snapshot can summarize the student's monthly attendance %, homework % commitment, last teacher note, and next evaluation date in one breath, without scrolling away from the snapshot card.
- **SC-009**: The Learning Journey timeline contains ≥ 9 dated milestones in chronological order, with the *current* milestone visually distinct from completed and upcoming entries.
- **SC-010**: The Weekly Plan page renders all nine required blocks, each with ≥ 2 specific items (no empty blocks, no "coming soon" placeholders).
- **SC-011**: The Notifications page renders ≥ 8 notifications spanning all six types, with read/unread state visually distinguishable without color alone.
- **SC-012**: All four pages share the same header height, sidebar entries (plus the two new ones), and design tokens as the rest of the student section — a side-by-side compare against the Spec 001 baseline shows zero shell drift.

---

## Assumptions

- The shell, sidebar, header, design tokens, UI Kit components, and `assets/js/main.js` from Spec 001 are present and committed; this feature only adds page-specific content (with the exception of two new sidebar entries: "رحلتي التعليمية" and "خطة الأسبوع").
- The sample student persona is Abdulrahman Mu'min ("عبد الرحمن مؤمن"), Level 3 in the Quran path, with reference month April 2026 and currency notation `ر.س`. Sample data anchors locked in Spec 001 §E2 carry forward.
- The four pages do not call any backend, do not use any APIs, and do not include any framework runtime. All data is committed as static HTML.
- The CSS output budget (≤ 80 KB minified) carries forward from Spec 001. Any new utility classes used by these pages must fit within that budget after `npm run build:css`; if the budget is exceeded, the implementation is responsible for trimming.
- The Latin digits / RTL rules and the 19-badge catalog from Spec 001 are authoritative. This feature does not introduce new badge variants or new icon families.
- The student sidebar gains exactly two new entries ("رحلتي التعليمية" linking to `learning-journey.html`, "خطة الأسبوع" linking to `weekly-plan.html`), placed contextually (e.g., after "دوراتي" and "الواجبات") without disturbing the other 13 entries' order. Other-role sidebars (parent / teacher / admin) are NOT modified by this feature.
- The notifications page is the canonical destination for the header bell across the student section. After this feature ships, every student-section header bell in the student section MUST point to `notifications.html` (the bell is currently a `<button>` in Spec 001; adjusting it to an `<a href="notifications.html">` is in scope).
- Sample notifications, homework items, teacher notes, milestones, and badges are *plausible-looking placeholder data*, not real student records. The feature is a static prototype.
- Out of scope for this feature: building the linked secondary pages (`assignments.html`, `live-sessions.html`, `achievements.html`, `messages.html`, `calendar.html`, `payment-history.html`, `profile.html`, `social-hub.html`, `leaderboard.html`, `reports.html`, `exams.html`, `browse-courses.html`, `my-courses.html`). Links to those pages are scaffolded but the pages themselves remain Spec 001 placeholders.
