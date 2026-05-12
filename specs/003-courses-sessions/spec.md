# Feature Specification: Courses and Live Sessions Frontend

**Feature Branch**: `003-courses-sessions`
**Created**: 2026-05-07
**Status**: Draft
**Input**: User description: "Build the student-facing courses and live sessions experience. The platform must support both course-based learning and payment/booking for specific live sessions. The UI must clearly show course progress, live session schedules, session types, teacher information, and student type differences such as Arabic student vs Foreign student pricing."

## Overview

This feature extends the student section of the إدارتي academy platform with the **catalog, enrollment, and live-session experience** that sits behind the navigation entries already wired up by Spec 001 (`browse-courses`, `my-courses`, `live-sessions`) and the new dashboard CTAs added by Spec 002 ("متابعة التعلم" → `my-courses.html`, the upcoming-session card → `live-sessions.html`). It introduces three new linked pages — **course details**, **live-session details**, and a **session checkout preview** — and fully fleshes out the three navigation-anchor pages so a student can browse the catalog, see what they're already enrolled in, drill into any course, see their live-session calendar, drill into any session, and visualize the per-session checkout flow without any backend wiring.

The feature is purely visual / frontend. No real payment, no real booking, no API calls — every rate, every session time, every "تأكيد الحجز" button is static markup the user can read but not transact against. The point of the build is to make the **two business shapes** of the academy unmistakable on the screen:

1. **Some students pay for a full course** (recurring monthly subscription style — locked into a path with included live sessions).
2. **Some students pay per individual live session** (à la carte — no course commitment, transactional).

And to make the **two student-type pricing tracks** unmistakable on every catalog and checkout surface:

- **Arabic student** (`طالب عربي`) — typically lower price (Saudi/GCC market).
- **Foreign student** (`طالب غير ناطق بالعربية`) — typically higher price (international market, often paid in USD-equivalent).

These two business shapes × two price tracks are the distinguishing narrative of the entire feature. Every page must surface them clearly enough that a parent looking over a student's shoulder can immediately tell which pricing applies and which payment model is in use.

---

## Clarifications

### Session 2026-05-07

- Q: When showing the two prices on a course card, should both rates be visually equal in weight, or should the viewer's matching rate be emphasized? → A: Emphasize the viewer's matching rate while keeping the other visible (Arabic price bolder + larger; Foreign price smaller/muted as a comparison line). Both rates remain transparent on every card; only the visual weight differs.
- Q: Should the missed-sessions tab on `live-sessions.html` show ≥ 2 missed rows (proves row design works) or show a celebratory empty state (proves empty-state pattern works)? → A: Populate ≥ 2 missed rows so the status pill, the "إعادة الجدولة" link, and the missed-row design are all visible. The celebratory empty-state copy stays in Edge Cases as documentation of the empty-data fallback only — the prototype itself does not render that empty state.
- Q: Which specific course should `course-details.html` showcase — the persona's currently-enrolled Quran Level 3 course or a different prospective course? → A: The Quran path Level 3 course (matches the persona's current enrollment from Spec 002). The page shows the full marketing surface (overview, pricing matrix, curriculum, teacher profile) AND the enrolled-only sections (تقدّمك في هذه الدورة, parent confidence) all describing the same Quran course, so the page reads coherently with the dashboard.
- Q: What session is the checkout-preview page actually booking, given the persona is on a full-course subscription? → A: A supplementary 1:1 private session — "مراجعة خاصة قبل الاختبار الشهري" — booked with the same Quran teacher (الأستاذ أحمد) outside the subscription. Demonstrates that even subscribed students can book extras à la carte (the dual-payment-model rule). The same supplementary session is also the subject of `live-session-details.html` (upcoming, unpaid → "إتمام الدفع" CTA → checkout) so the two pages naturally chain.
- Q: Should the prototype's default checkout state show the balance-covers-fully flow (FR-067) or a partial-coverage flow with active payment radios? → A: Default state shows a 4-session **"حزمة المراجعة الشهرية"** bundle (4 × 75 = 300 ر.س base + 15% VAT = 345 ر.س total) partially covered by the 750 ر.س family balance. Wait — math check: 750 > 345, so the balance still covers fully. **Resolution: family balance applied is capped at 200 ر.س for this booking** (visual toggle "استخدام الرصيد" allows partial application — student choose how much), leaving 145 ر.س due. This keeps payment radios active (FR-064) AND demonstrates the balance pattern. The single-session 75 ر.س variant + the "balance covers fully" state both stay documented as alternative variants under FR-067. The `live-session-details.html` session remains the *first* of the 4 sessions in this bundle; tapping "إتمام الدفع" on it leads to the bundle checkout (with a caption "هذه الحصة جزء من حزمة المراجعة الشهرية — يلزم حجز الحزمة كاملة").

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Browsing the Course Catalog (Priority: P1)

A new or existing student lands on the **Browse Courses** page and wants to discover what the academy offers, narrow it down by subject and session type, and identify a course they want to learn more about. They need to see at a glance: who teaches it, what level it covers, how long it runs, and — critically — what it will cost **for their student type** (Arabic vs Foreign).

**Why this priority**: This is the discovery surface — the funnel entry for every new enrollment and every per-session booking. Without it, no student can act on the catalog. It is also the page where the dual-pricing narrative is established for the rest of the feature; if the student doesn't see "السعر للطالب العربي" and "السعر للطالب غير الناطق بالعربية" side by side here, no downstream page will recover that clarity.

**Independent Test**: Open `pages/student/browse-courses.html` from the file explorer. Without any other context, the viewer must be able to answer: "What subjects does the academy teach? What courses are available right now? Who teaches the Quran level-3 course? What does it cost for an Arabic student? What does it cost for a foreign student? Which courses are popular or new? Which are private vs group?" — entirely by reading the page. Filters and the search input must be visually present and obvious, even though they are non-functional in this prototype.

**Acceptance Scenarios**:

1. **Given** a student opens the browse-courses page, **When** they look at the hero section, **Then** they see a welcoming Arabic headline introducing the academy's tracks (e.g., "اكتشف مساراتك التعليمية في إدارتي") with a one-line subtitle explaining what's offered.
2. **Given** a student wants to narrow the catalog, **When** they look at the filter row, **Then** they see at least 7 filter chips: القرآن الكريم, اللغة العربية, اللغة الإنجليزية, الرياضيات, الدراسات الإسلامية, حصص خاصة, حصص جماعية — each visually distinct and clickable-looking.
3. **Given** the catalog shows ≥ 8 course cards, **When** the student looks at any one card, **Then** they see: course title, 1-2 line description, teacher name + role, level (e.g., "المستوى الثاني"), duration (e.g., "12 أسبوعاً — 3 حصص أسبوعياً"), course type pill (private/group), Arabic-student price + Foreign-student price (both visible on the same card), at least 3 cards carry a corner badge (Popular / New / Recommended), and a "عرض التفاصيل" CTA linking to course-details.
4. **Given** the student wants to see how prices vary, **When** they scan any card's pricing block, **Then** the Arabic price and Foreign price are clearly labeled (not one overriding the other) and visually balanced — neither label is hidden in fine print.
5. **Given** the student wants to search, **When** they look near the top of the page, **Then** they see a search input with a placeholder hint (e.g., "ابحث عن دورة، معلم، أو مهارة...") — purely visual but obviously present.

---

### User Story 2 — Reviewing My Enrolled Courses (Priority: P1)

An existing student opens the **My Courses** page and wants a single-glance view of what they're currently learning, how far along they are, what's coming next, what teacher feedback is fresh, and which of their courses they've already completed. The page is the bridge between the dashboard's "متابعة التعلم" CTA and any specific course-details page.

**Why this priority**: This is the most-visited authenticated page after the dashboard for any active student. It's the daily pickup surface — "where do I continue from?" The persona used across all four 001/002 pages (Abdulrahman, Quran path level 3) must show their active enrollments here in a way that is consistent with what the dashboard already claims about their attendance, homework, and level progress.

**Independent Test**: Open `pages/student/my-courses.html` from the file explorer. A viewer must be able to answer: "Which courses is this student actively enrolled in right now? How far along are they in each? What's their next lesson or session in each? Have they completed any courses already?" — entirely by reading the page. Each card must offer a clear "متابعة" / "استئناف الدورة" CTA.

**Acceptance Scenarios**:

1. **Given** the student opens the my-courses page, **When** they look at the page, **Then** the content is organized into clearly labeled sections: "دوراتي النشطة" (active) and "دورات أكملتها" (completed) — separated by a horizontal divider or a visible heading.
2. **Given** the student has ≥ 3 active enrollments, **When** they look at each active course card, **Then** they see: course title, teacher name + avatar, course-level pill, a progress bar with numeric percentage (e.g., 60%), the next lesson/session line ("الدرس القادم: …" with date/time), a homework count badge ("3 واجبات مستحقة"), a 1-line teacher note preview, and a primary "متابعة الدورة" CTA.
3. **Given** the student has ≥ 1 completed course, **When** they look at the completed section, **Then** each completed card shows: course title, completion date, final grade or "أُنجز بنجاح" status badge, a certificate-available indicator if applicable, and a secondary "عرض الشهادة" or "مراجعة الدورة" link.
4. **Given** the student is enrolled by full-course payment in some courses and per-session in others, **When** they scan the active section, **Then** each card visibly indicates the payment model it falls under (e.g., a small "اشتراك كامل" or "حصص مدفوعة فردياً" caption near the title) so the model is never ambiguous.

---

### User Story 3 — Drilling into a Course (Priority: P1)

A student taps "عرض التفاصيل" on a catalog card OR "متابعة الدورة" on their my-courses card and lands on the **Course Details** page. They want a complete picture of the course: what they'll learn, the curriculum, the teacher, included live sessions, included homework and exams, whether a certificate is awarded, and — for prospective students — both pricing options (full-course vs pay-per-session) for both student types. For enrolled students, the same page also shows their current progress preview and the parent-confidence summary so the page can serve as the "course homepage" for ongoing learners as well.

**Why this priority**: This page does two jobs at once — it's both the marketing/sales page for prospective students AND the home page for enrolled students. Both jobs must be evident; the layout cannot favor one to the exclusion of the other.

**Independent Test**: Open `pages/student/course-details.html` from the file explorer. A viewer must be able to answer: "What does this course teach? Who teaches it? How many live sessions does it include? What homework/exams come with it? Is there a certificate? What does it cost for an Arabic student paying for the full course? For a foreign student paying per session? Where is the current enrolled student in their progress?" — entirely by reading the page.

**Acceptance Scenarios**:

1. **Given** the student opens course-details, **When** they read the top of the page, **Then** they see: course title (h1), 2-3 line course overview, course-type pill (private/group), level pill, duration line, and a hero CTA row with a primary "اشتراك في الدورة" button + secondary "حجز حصة فردية" link.
2. **Given** the student wants to know what they'll learn, **When** they look below the overview, **Then** they see a "ماذا ستتعلم" section with ≥ 5 bullet outcomes, each accompanied by a small check-circle icon.
3. **Given** the student wants to see the curriculum, **When** they look at the curriculum block, **Then** they see ≥ 3 course-level groupings (Level 1, Level 2, Level 3...) each with a visible status (مكتمل / حالياً / قادم), a count of included sessions, and a count of included homework items.
4. **Given** the student wants to see the teacher, **When** they look at the teacher profile section, **Then** they see: teacher photo or initials avatar, teacher name, teacher title (e.g., "معلم القرآن الكريم"), brief bio (2-3 sentences), and a stats row (years of experience, students taught, average rating).
5. **Given** the student wants to see the pricing, **When** they look at the pricing block, **Then** they see a 2 × 2 matrix or two side-by-side cards making clear: (Arabic student × full course) vs (Arabic student × per-session) vs (Foreign student × full course) vs (Foreign student × per-session). All four combinations must be visible without further interaction.
6. **Given** the student is already enrolled in this course, **When** they look at the lower part of the page, **Then** they see a "تقدّمك في هذه الدورة" section with their level-progress bar and current milestone, plus a "ملخص يمكن لولي الأمر متابعته" card mirroring the dashboard's parent-confidence pattern from Spec 002.
7. **Given** the student wants to see what live sessions, homework, and exams the course includes, **When** they scan the page, **Then** they see three labeled summary cards/strips listing: ≥ 2 included live sessions (next upcoming highlighted), the homework total + breakdown, and the exam schedule + certificate availability.

---

### User Story 4 — Browsing Live Sessions (Priority: P2)

A student opens the **Live Sessions** page from the sidebar (or the dashboard upcoming-session card's "عرض كل الحصص" link) and wants to see the full schedule — what's coming up, what's already happened, what they missed — across all their courses, with the ability to filter by course / teacher / type / status / month. Some sessions are "included with course subscription" and have no price; others are "per-session paid" and show a price tag that the student can act on.

**Why this priority**: Live sessions are the academy's product — every other page describes them, links to them, or schedules them. This is the canonical schedule view. P2 because US1-US3 establish the catalog and enrollment paths first; the schedule is consulted after the student is in the system.

**Independent Test**: Open `pages/student/live-sessions.html` from the file explorer. A viewer must be able to answer: "What live sessions does this student have coming up this week? What sessions have they already completed? Did they miss any? Which sessions are included with their course and which would they need to pay for? Can they see this organized by status?" — entirely by reading the page.

**Acceptance Scenarios**:

1. **Given** the student opens the live-sessions page, **When** they look at the page header, **Then** they see a 3-tab visual structure: "قادمة" (upcoming, default-active), "مكتملة" (completed), "فائتة" (missed) — each tab shows a count badge.
2. **Given** the student is on the "قادمة" tab, **When** they look at the session list, **Then** they see ≥ 3 upcoming session cards/rows showing: title, course chip, teacher + avatar, date/time, duration, type (private/group), price (or "مشمولة في الاشتراك" caption if free for them), status pill ("قادمة"), and CTAs ("عرض التفاصيل" + "انضمام" — the join button is enabled-looking only on the imminent session).
3. **Given** the student wants to filter, **When** they look at the filter bar, **Then** they see ≥ 5 filter dropdowns/chips: الدورة, المعلم, نوع الحصة, الحالة, الشهر — visually present, clearly labeled, non-functional.
4. **Given** the student wants to see what they missed, **When** they switch tabs to "فائتة", **Then** they see ≥ 2 missed-session rows with a clear "فائتة" status pill, no join button, and a "عرض السبب" or "إعادة الجدولة" link.
5. **Given** the calendar/list distinction exists, **When** the student looks at the page, **Then** they see a clear toggle (segmented control) between "عرض القائمة" (list view, default) and "عرض التقويم" (calendar view) — only the list view is fully populated; the calendar view shows a month grid with session dots/markers but is not interactive.
6. **Given** at least one session is per-session-paid, **When** the student looks at that row, **Then** the price is visibly tagged (e.g., a small "75 ر.س" pill in accent color) and a "حجز" or "إدارة الحجز" CTA appears alongside the standard "عرض التفاصيل".

---

### User Story 5 — Drilling into a Live Session (Priority: P2)

A student taps "عرض التفاصيل" on any session row (or the dashboard's upcoming-session card) and lands on the **Live Session Details** page. They want everything they need to prepare for, attend, or review the session: the meeting link button, a preparation checklist, related homework, attendance status, post-session teacher notes (after completion), recording availability, and — if applicable — payment status.

**Why this priority**: This is the per-session command center. It pulls together course context, scheduling, prep, and post-session artifacts on a single screen. P2 because the live-sessions page (US4) must exist before drilling into a single one is meaningful.

**Independent Test**: Open `pages/student/live-session-details.html` from the file explorer. A viewer must be able to answer: "What session is this? When is it? Who is teaching? What should the student prepare before attending? Did they attend? What did the teacher say afterwards? Was a recording made? Is this session paid for?" — entirely by reading the page.

**Acceptance Scenarios**:

1. **Given** the student opens the page, **When** they read the hero block, **Then** they see: session title (h1), teacher name + avatar + chip linking to the teacher's course, course name, full date/time line ("الجمعة 1 مايو 2026 — 5:00 م إلى 6:00 م"), duration ("60 دقيقة"), and session type pill (جماعية / خاصة).
2. **Given** the session is upcoming and within join-window, **When** the student looks at the action area, **Then** they see a primary "انضمام إلى الحصة" button (visually enabled), an "إضافة للتقويم" secondary button, and a "نسخ رابط الاجتماع" link/button.
3. **Given** the session has prep work, **When** the student scrolls to the preparation section, **Then** they see a "قبل الحصة" checklist with ≥ 3 items (each with a disabled checkbox showing read state), e.g., "راجع آيات الجزء 30 من الآية 1 إلى 20", "حضّر السؤال الأول من الواجب", "تأكد من الكاميرا والميكروفون".
4. **Given** the session has related homework, **When** the student looks at the related-homework block, **Then** they see ≥ 1 linked homework card with title, due date, status badge from the Spec 001 catalog, and a "عرض الواجب" link.
5. **Given** the session has occurred, **When** the page is shown in "completed" variant (one of the two variants in this prototype), **Then** the join button is replaced by an attendance status pill ("تمّ الحضور" / "لم تحضر"), a "ملاحظات المعلم" section appears with the teacher's post-session note, and a "عرض التسجيل" CTA appears (or a "التسجيل غير متاح" caption when no recording).
6. **Given** the session is paid per-session, **When** the student looks near the action area, **Then** they see a payment-status block: paid → green "مدفوعة" pill + receipt link; unpaid → amber "بانتظار الدفع" pill + "إتمام الدفع" CTA linking to the checkout-preview page.

---

### User Story 6 — Visualizing the Per-Session Checkout (Priority: P3)

A student taps "حجز حصة فردية" or "إتمام الدفع" and lands on the **Session Checkout Preview** page. This is **not a real checkout** — it is a static visual representation of the per-session purchase flow: which session they selected, which student-type rate applies, the price calculation, an optional tax line, the family prepaid balance available to them, the amount actually due, payment-method options, and a final visual-only "تأكيد الحجز" button.

**Why this priority**: The checkout flow is the single most important *narrative* surface for the per-session-payment business model — the Family Prepaid Balance pattern (introduced in Spec 002 notifications and dashboard) lives here and must be visually anchored. P3 because no real money moves; the page is a static demo of what the future flow will look like, while still being clear enough that a stakeholder can validate the design direction.

**Independent Test**: Open `pages/student/session-checkout-preview.html` from the file explorer. A viewer must be able to answer: "What session is being booked? What student type does the system think this student is? What is the price for that type? Is there tax? Does the family have any prepaid balance? After applying the balance, how much is actually due? What payment methods are available? Where is the confirm button?" — entirely by reading the page.

**Acceptance Scenarios**:

1. **Given** the student opens the page, **When** they read the top, **Then** they see a "ملخص الحجز" panel showing: selected session title, course chip, teacher, date/time, duration, session type — exactly mirroring the live-session card format so the student recognizes what they're paying for.
2. **Given** the student type matters, **When** they look at the pricing area, **Then** they see a clearly-labeled current student type ("طالب عربي" or "طالب غير ناطق بالعربية"), an explicit price line for that student type, and a small caption explaining that the other student-type rate exists ("الطلاب غير الناطقين بالعربية: 25 USD / حصة").
3. **Given** the price has tax, **When** they look at the price calculation, **Then** they see line items: base price → tax (15% VAT shown as a separate line, even if 0) → subtotal.
4. **Given** the family prepaid balance exists, **When** they look at the calculation, **Then** they see: "رصيد العائلة المتاح: 750 ر.س", a checkbox-styled toggle "استخدام الرصيد للدفع" (visually pre-checked), and the resulting "المبلغ المستحق بعد خصم الرصيد: …" — making the prepaid-balance pattern from Spec 002 concrete.
5. **Given** the student must pick how to pay the remainder, **When** they look at the payment-methods area, **Then** they see ≥ 3 visual options (e.g., بطاقة ائتمانية / مدى / Apple Pay) each shown as a radio-card with logo and last-4 placeholder; the first option is visually pre-selected.
6. **Given** the student is ready to confirm, **When** they look at the bottom action area, **Then** they see a primary "تأكيد الحجز" button + a "إلغاء" link back to the live-session details page; both must be obvious, but the page must also include a small inline notice that this is a visual prototype only (e.g., "هذه شاشة عرض تجريبية — لا يتم تنفيذ أي عملية دفع فعلية.") so a stakeholder is not confused into thinking the prototype processes money.

---

### Edge Cases

- **Browse Courses with no badge**: If a course has no Popular/New/Recommended badge, its corner is left bare — never falls back to a placeholder badge.
- **My Courses with zero completed**: The "دورات أكملتها" section still renders with an empty-state card ("لم تكمل أي دورة بعد. تابع تعلّمك في الدورات النشطة.") — never collapses or disappears.
- **Course Details for a free / preview course**: Pricing block shows "مجاناً" in both student-type slots and hides the per-session payment option.
- **Live Sessions empty tab (documentation only)**: Per Q2 clarification, the prototype itself populates the "فائتة" tab with ≥ 2 missed rows (FR-043). This bullet documents what the UI should render *if* the underlying data were empty: a celebratory empty state ("ممتاز! لم تفُت أي حصة هذا الشهر.") — never an empty list. The prototype HTML does not render this state, but a future implementation must.
- **Live Session Details for cancelled session**: A cancelled session shows a clear "ملغاة" status pill, the join button is removed entirely, the teacher note is replaced with a cancellation reason, and a "إعادة الجدولة" link appears.
- **Checkout when the prepaid balance covers the full amount**: The "amount due" line shows "0 ر.س" in green, payment-method radios are visibly disabled with caption ("الدفع تمّ بالكامل من رصيد العائلة"), and the primary button reads "تأكيد الحجز (مجاناً)".
- **Foreign student price shown but Arabic student is viewing**: Per FR-016 (Q1 clarification), the matching-student-type rate is always visually emphasized (bolder + larger + accent color) and the other rate is shown as a smaller comparison line. This is the default state on every catalog and checkout surface — not an exceptional case.
- **Per-session-paid course on My Courses**: Card progress bar represents *number of paid sessions completed* (not curriculum progress) and includes a small caption clarifying that ("3 من 8 حصص مدفوعة مكتملة") so the per-session model isn't confused with the full-course-subscription model.

---

## Requirements *(mandatory)*

### Functional Requirements

#### Shell, navigation, and consistency

- **FR-001**: All six pages MUST embed the same student sidebar (15 entries, locked from Spec 002) and the same header (notification bell as `<a>`, message bell, user dropdown).
- **FR-002**: The student sidebar's active-entry indicator MUST be set per page: `browse-courses.html` highlights "استعراض الدورات"; `my-courses.html` highlights "دوراتي"; `course-details.html` does NOT highlight any entry (it's a drill-down, not a navigation root); `live-sessions.html` highlights "الحصص المباشرة"; `live-session-details.html` does NOT highlight any entry; `session-checkout-preview.html` does NOT highlight any entry.
- **FR-003**: All six pages MUST set `<html lang="ar" dir="rtl">`, use the Tajawal font, and load `../../assets/css/output.css` exactly as Spec 001/002 pages do.
- **FR-004**: All page `<title>` values MUST end with " — منصة إدارتي" so browser tabs are recognizable as part of the same product surface.
- **FR-005**: All header h1 + subtitle pairs MUST be set per page (catalog browse / my courses / a specific course title / live sessions / a specific session title / "إتمام حجز الحصة" + amount-due subtitle), never left as placeholder text.
- **FR-006**: All six pages MUST be reachable via at least one inbound `<a>` link from another page in the prototype (no orphan pages); specifically, the dashboard's "متابعة التعلم" CTA links to `my-courses.html`, the upcoming-session card links to `live-sessions.html`, and the catalog/details/checkout chain forms a closed loop.

#### Browse-courses page (US1)

- **FR-010**: `browse-courses.html` MUST contain a hero section with an Arabic headline (≥ 6 words), a 1-line subtitle, and at least one decorative element (icon or illustration block) — content non-empty.
- **FR-011**: Browse-courses MUST contain a search input visually present near the top, with an Arabic placeholder, a search icon, and the input must NOT be wired up to any actual filtering.
- **FR-012**: Browse-courses MUST display ≥ 7 visible filter chips/pills covering: القرآن الكريم, اللغة العربية, اللغة الإنجليزية, الرياضيات, الدراسات الإسلامية, حصص خاصة, حصص جماعية. Filters are visual-only.
- **FR-013**: Browse-courses MUST display ≥ 8 course cards in a responsive grid (1-col mobile / 2-col tablet / 3-col desktop / 4-col xl).
- **FR-014**: Each course card MUST display ALL of: course title, 1-2 line description, teacher name + role, level pill, duration line, course type pill (private/group), Arabic-student price, Foreign-student price, and a "عرض التفاصيل" CTA linking to `course-details.html`. No card may omit any of these fields.
- **FR-015**: At least 3 course cards MUST display a corner badge — using one of the values: "الأكثر طلباً" (Popular), "جديد" (New), "موصى بك" (Recommended). Each badge label MUST be among these three; no invented variants.
- **FR-016**: Both Arabic and Foreign prices MUST appear on every card, but the viewer's matching student-type rate (Arabic for the persona) MUST be visually emphasized — bolder weight + larger size + accent color — while the non-matching rate remains visible as a smaller secondary "comparison line" so the dual-pricing narrative is preserved without the viewer mistakenly reading the wrong rate.

#### My-courses page (US2)

- **FR-020**: `my-courses.html` MUST present content in TWO clearly labeled sections: "دوراتي النشطة" and "دورات أكملتها". Each section has its own heading; never collapsed into one list.
- **FR-021**: The active section MUST contain ≥ 3 active-course cards. Each active card MUST show: course title, teacher (avatar + name), level pill, progress bar (visual + numeric % label), next lesson/session line ("الدرس القادم: …" with date/time), homework count badge, 1-line teacher-note preview, and a primary "متابعة الدورة" CTA linking to `course-details.html`.
- **FR-022**: The completed section MUST contain ≥ 1 completed-course card. Each completed card MUST show: course title, completion date, final-status badge (e.g., "أُنجز بنجاح" / "ممتاز"), and a secondary "عرض الشهادة" or "مراجعة الدورة" CTA.
- **FR-023**: Each active card MUST visibly identify the payment model in use ("اشتراك كامل" or "حصص مدفوعة فردياً") via a small caption or chip near the title — never ambiguous.

#### Course-details page (US3)

- **FR-030**: `course-details.html` MUST showcase the **Quran path Level 3 course** (`أحكام الميم الساكنة وحفظ الجزء الثلاثين`) — matching the persona's current enrollment from Spec 002. The hero block MUST contain: course title (h1) reading the Quran Level 3 course name, 2-3 line overview describing the level's focus (Quran tajweed + memorization), course-type pill, level pill ("المستوى الثالث"), duration line, primary "اشتراك في الدورة" CTA (still visible because prospective viewers also use this page), secondary "حجز حصة فردية" link to `live-sessions.html?filter=course=...` (visual only, no real query handling).
- **FR-031**: A "ماذا ستتعلم" section MUST contain ≥ 5 outcome bullets, each accompanied by a check-circle icon.
- **FR-032**: A "المنهج الدراسي" / curriculum block MUST contain ≥ 3 level-grouped sub-sections, each showing a status pill (مكتمل / حالياً / قادم), a count of included sessions, and a count of included homework.
- **FR-033**: A "تعرّف على معلمك" section MUST contain: avatar, name, title, 2-3 sentence bio, and ≥ 3 stats (years of experience / students taught / average rating).
- **FR-034**: A pricing block MUST present all FOUR combinations of (student type × payment model) — Arabic full course, Arabic per-session, Foreign full course, Foreign per-session — visible without further interaction.
- **FR-035**: A "الحصص المضمنة" section MUST list ≥ 2 included live sessions, with the next upcoming session highlighted.
- **FR-036**: A "الواجبات والاختبارات" section MUST show: total homework count, total exam count, and certificate availability with an explicit Yes/No answer.
- **FR-037**: Because the page showcases the persona's currently-enrolled course (Q3 clarification), a "تقدّمك في هذه الدورة" section MUST be present and populated with the persona's actual progress: level-progress bar at 60% (matching the dashboard), current-milestone caption ("أحكام الميم الساكنة — تطبيق عملي"), and a "متابعة الدورة" CTA linking to `my-courses.html`.
- **FR-038**: A "ملخص يمكن لولي الأمر متابعته" section MUST appear on the page, mirroring the parent-confidence pattern from Spec 002 with at least 3 stat tiles (attendance 92%, homework commitment 85%, last teacher note quote, next evaluation date 12 مايو 2026 — same data as the dashboard's parent-confidence card so the two surfaces stay in sync).

#### Live-sessions page (US4)

- **FR-040**: `live-sessions.html` MUST contain a 3-tab visual structure for "قادمة", "مكتملة", "فائتة" — each tab shows a numeric count.
- **FR-041**: Live-sessions MUST display ≥ 3 upcoming session rows in the default tab. Each row MUST include: title, course chip, teacher avatar+name, date/time, duration, type pill, price (or "مشمولة في الاشتراك" caption), status pill, and at least two CTAs ("عرض التفاصيل" + "انضمام").
- **FR-042**: Live-sessions MUST contain a filter bar with ≥ 5 visible filter controls (الدورة, المعلم, نوع الحصة, الحالة, الشهر) — visual-only.
- **FR-043**: The completed-tab content MUST be present in the page markup (visible via tab switch) and contain ≥ 2 completed-session rows; the missed-tab content MUST contain ≥ 2 missed-session rows. Empty tabs use the empty-state copy from Edge Cases.
- **FR-044**: Live-sessions MUST contain a list/calendar view toggle. List is the default; the calendar view is rendered as a static month grid with markers but is not interactive.
- **FR-045**: At least one session row across all tabs MUST be per-session-paid: it carries a price pill (e.g., "75 ر.س / حصة") and a "حجز" or "إدارة الحجز" CTA in addition to "عرض التفاصيل".

#### Live-session-details page (US5)

- **FR-050**: `live-session-details.html` MUST showcase the **first session of the supplementary "حزمة المراجعة الشهرية" bundle** (Q4 + Q5 clarifications) — the "مراجعة خاصة 1: تطبيق أحكام الميم الساكنة" 1:1 review session with الأستاذ أحمد, the first of 4 sessions in the monthly review bundle, scheduled before the monthly exam (5 مايو 2026). The hero block MUST contain: session title (h1) reading the Arabic title above, teacher chip, course chip ("القرآن الكريم — المستوى الثالث"), a small "ضمن حزمة المراجعة الشهرية (1 من 4)" caption, full date/time line, duration ("60 دقيقة"), and session-type pill ("خاصة"). This anchors the per-session-paid narrative so FR-055's payment-status block displays naturally.
- **FR-051**: For an upcoming session within a join-window, the action area MUST contain a primary "انضمام إلى الحصة" button (enabled-looking), an "إضافة للتقويم" secondary, and a "نسخ رابط الاجتماع" link.
- **FR-052**: The page MUST contain a "قبل الحصة" preparation checklist with ≥ 3 items, each with a disabled checkbox reflecting completion state.
- **FR-053**: The page MUST contain a "الواجب المرتبط" section with ≥ 1 linked homework card showing title, due date, catalog status badge, and a "عرض الواجب" link.
- **FR-054**: The page MUST exist in TWO variants visible on the same page (clearly separated visually OR — preferred — implemented as a single page that shows the upcoming-state markup with a small inline annotation explaining what would change in the completed variant): the completed variant replaces the join button with attendance status, adds a teacher-note section, and shows recording availability ("عرض التسجيل" CTA OR "التسجيل غير متاح" caption).
- **FR-055**: The page MUST contain a payment-status block since the session is per-session-paid (part of the bundle, Q5 clarification): the bundle is unpaid → shows an amber "بانتظار الدفع — حجز حزمة المراجعة الشهرية" pill + "إتمام الدفع" CTA linking to `session-checkout-preview.html`. The block MUST also show the bundle price summary line ("4 حصص × 75 ر.س + 15% ضريبة = 345 ر.س") so the student knows what they're committing to before tapping the CTA.

#### Session-checkout-preview page (US6)

- **FR-060**: `session-checkout-preview.html` MUST contain a "ملخص الحجز" panel for the **"حزمة المراجعة الشهرية" 4-session bundle** (Q4 + Q5 clarifications) — including the same first session showcased on `live-session-details.html`. The panel MUST list all 4 sessions in the bundle (numbered 1 of 4, 2 of 4, etc., each with its own date/time + teacher chip — all with الأستاذ أحمد), plus the bundle title "حزمة المراجعة الشهرية", course chip ("القرآن الكريم — المستوى الثالث"), bundle duration line, and type pill "خاصة". This makes the bundle-not-single-session purchase unmistakable.
- **FR-061**: The page MUST display a current-student-type indicator with the student's classification and the price for that classification, plus a small caption mentioning the other classification's rate.
- **FR-062**: The page MUST display a price calculation broken into ≥ 3 line items: base price ("4 حصص × 75 ر.س = 300 ر.س"), tax line (always present: "ضريبة القيمة المضافة 15% = 45 ر.س"), subtotal ("الإجمالي قبل الرصيد = 345 ر.س").
- **FR-063**: The page MUST display a family-prepaid-balance section with: available-balance amount ("رصيد العائلة المتاح: 750 ر.س"), a visual toggle "استخدام الرصيد للدفع" (pre-checked), an applied-amount line capped at 200 ر.س for this booking ("سيُخصم من الرصيد: 200 ر.س"), and the resulting "المبلغ المستحق بعد خصم الرصيد: 145 ر.س" — keeping the amount-due > 0 so payment radios remain active per Q5 clarification.
- **FR-064**: The page MUST display ≥ 3 payment-method options as visual radio-cards (e.g., بطاقة ائتمانية / مدى / Apple Pay), with the first option pre-selected.
- **FR-065**: The page MUST contain a primary "تأكيد الحجز" button + a "إلغاء" link back to the live-session details page.
- **FR-066**: The page MUST contain a visible inline notice clarifying that this is a visual prototype and no actual payment is processed.
- **FR-067**: For the "balance covers full amount" edge case, the page MUST be designed such that the amount-due line gracefully shows "0 ر.س" and the payment-method radios visually disable while the confirm button text becomes "تأكيد الحجز (مجاناً)".

#### Cross-page consistency

- **FR-070**: The Abdulrahman persona locked in Spec 001 §E2 (Arabic student, Quran path level 3, family balance 750 ر.س) MUST be the assumed viewer across all six pages. All sample content (current course progress, my-courses cards, prepaid balance) MUST anchor to this persona for coherence with the dashboard.
- **FR-071**: All six pages MUST use Latin digits (1, 2, 3...) inside Arabic copy — no Eastern Arabic-Indic digits (٠-٩). This continues the Spec 002 SC-006 rule.
- **FR-072**: All status badges across the six pages MUST come from the Spec 001 19-badge catalog or the Spec 002 catalog additions ("جماعية" / "خاصة" session-type chips, notification type chips). No new badge variants may be invented.
- **FR-073**: All payment-related currency MUST be displayed in رس (ر.س) for Arabic-student prices and USD for foreign-student prices, with explicit currency suffix or symbol on every price.
- **FR-074**: Color is never the sole indicator of state. Every price difference, payment status, session type, attendance state, and tab indicator MUST pair color with text or icon (Constitution Principle IV / FR-035 carry-over from Spec 001).
- **FR-075**: No real `href="#"` placeholder links may exist on any of the six pages. Every CTA either links to another in-prototype page, to a planned-future page (e.g., `assignments.html`, `calendar.html`), or to a same-page anchor whose target id exists.
- **FR-076**: No JavaScript may render content — every card, badge, price, and row is static markup. The only sanctioned JS interactions are the existing Spec 001 sidebar drawer / dropdown / modal / tabs handlers; if tab-switching is needed on the live-sessions page, it reuses the existing `data-tabs` handler from Spec 001 with no additions.
- **FR-077**: No placeholder/filler text is allowed. Every Arabic sentence is meaningful and on-topic.

---

### Key Entities *(visual / sample data)*

The feature uses static sample data anchored to the Spec 001/002 personas. None of these are persisted, fetched, or rendered by JavaScript — every value is committed in HTML.

- **Course** — A learning track. Attributes: title (Arabic), description, subject (Quran / Arabic / English / Math / Islamic Studies), level (1-N), duration text, type (private/group), teacher reference, Arabic price (ر.س / month), Foreign price (USD / month), per-session Arabic price, per-session Foreign price, badge (Popular/New/Recommended/none), included-sessions list, included-homework count, included-exams count, certificate-available flag, curriculum (list of level-groupings each with status + counts), enrollment status for the current viewer (enrolled / not-enrolled / completed).
- **Course-Level Group** — A sub-section within a course's curriculum. Attributes: level number, name, status (مكتمل / حالياً / قادم), session count, homework count.
- **Teacher** — An academy instructor. Attributes: name, avatar (initials or photo), title (e.g., "معلم القرآن الكريم"), bio, years of experience, students-taught count, average rating, courses-taught count.
- **Live Session** — A scheduled instruction event. Attributes: title, course reference, teacher reference, date, time, duration (minutes), type (private/group), status (upcoming/completed/missed/cancelled), payment model (included/per-session-paid), price (when per-session), price-status (when per-session: paid/unpaid), attendance (for completed: attended/absent), recording availability (for completed: yes/no/unavailable), preparation checklist (list of items, each with done/not-done state), related homework (list of references), teacher post-session note (for completed).
- **Pricing Profile** — A pricing matrix per course. Attributes: arabic-full-monthly, foreign-full-monthly, arabic-per-session, foreign-per-session, certificate-included flag, family-discount-eligible flag.
- **Student-Type Indicator** — The classification of the current viewer. Values: "طالب عربي" (default for the persona) or "طالب غير ناطق بالعربية". Drives which price column visually emphasizes on cards.
- **Session Bundle** — A package of multiple per-session bookings purchased together (Q5 clarification). Sample: "حزمة المراجعة الشهرية" — 4 supplementary 1:1 sessions with the same teacher, each at the per-session rate, sold as one checkout transaction. Attributes: bundle title, included-sessions list (each with its own date/time + teacher), per-session base price, total base before VAT, type pill ("خاصة" for the bundle).
- **Family Prepaid Balance** — A money pool the family has loaded for per-session payments. Attributes: available amount (sample: 750 ر.س — anchored to Spec 002 notifications), apply-toggle state (visual only), applied amount (capped — student can choose how much to apply per booking).
- **Checkout Snapshot** — The composed state of the checkout page. Attributes: selected session/bundle reference, applicable student-type rate, base price, tax (15% VAT line, always present), prepaid-balance available, prepaid-balance applied amount, amount due after credit, selected payment method.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer opens `pages/student/browse-courses.html` and within 30 seconds can name (a) at least 4 subjects offered, (b) the price difference between an Arabic and a Foreign student for any one course, and (c) which courses carry a Popular / New / Recommended badge — entirely from the visible page content.
- **SC-002**: A reviewer opens `pages/student/my-courses.html` and within 15 seconds can name (a) the count of active enrollments, (b) the next upcoming session for the active Quran course, and (c) the count of completed courses — entirely from the visible page content.
- **SC-003**: A reviewer opens `pages/student/course-details.html` and finds ALL FOUR pricing combinations (Arabic-full, Arabic-per-session, Foreign-full, Foreign-per-session) visible on the page without any further interaction.
- **SC-004**: A reviewer opens `pages/student/live-sessions.html`, switches between the three tabs (قادمة / مكتملة / فائتة) using only mouse/touch, and verifies each tab is non-empty (≥ 2 rows in completed and missed; ≥ 3 in upcoming) and each tab's count badge matches the row count visible in that tab's content.
- **SC-005**: A reviewer opens `pages/student/live-session-details.html` and verifies that the page makes both the upcoming-state behavior and the completed-state behavior comprehensible — either by showing both variants on one page or by clearly annotating which variant is shown and what would change in the other.
- **SC-006**: A reviewer opens `pages/student/session-checkout-preview.html` and within 30 seconds can answer all of: which session is being booked, what price applies to this student type, how much the family prepaid balance contributes, what amount is actually due, and where the confirm button is — entirely from the visible page content.
- **SC-007**: A reviewer running `grep -nE ' href="#"' pages/student/{browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview}.html` finds zero matches.
- **SC-008**: A reviewer running an Arabic-Indic digit grep against the six new pages finds zero matches (Latin digits inside Arabic copy throughout).
- **SC-009**: A reviewer running `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` after this feature still finds zero matches; `assets/js/main.js` line count remains ≤ 80 LOC (no new JS handlers were added beyond Spec 001's four sanctioned ones).
- **SC-010**: A reviewer running `grep -nEi 'lorem|Item [0-9]|TBD|Course [0-9]|Student [0-9]' pages/student/{browse-courses,my-courses,course-details,live-sessions,live-session-details,session-checkout-preview}.html` finds zero matches.
- **SC-011**: A reviewer counts distinct status badge usages across the six pages and confirms ≥ 18 individual badge instances drawn from the Spec 001 19-badge catalog (plus the Spec 002 session-type and notification-type chips). No invented variants.
- **SC-012**: A reviewer opens any one of the six pages at viewport widths 375 / 768 / 1024 / 1280 px and verifies (a) no horizontal page-level scrollbar appears at any breakpoint, (b) the sidebar drawer (mobile burger → drawer with backdrop, body scroll locked) behaves identically to the Spec 001/002 baseline, (c) the course-card grid collapses gracefully (1 / 2 / 3 / 4 columns at the four breakpoints), (d) the live-sessions row layout stacks legibly at < 768 px.
- **SC-013**: A reviewer opens `pages/student/browse-courses.html`, follows the "عرض التفاصيل" CTA on any course card to land on `course-details.html`, then follows the "حجز حصة فردية" link to `live-sessions.html`, then follows any session's "عرض التفاصيل" CTA to `live-session-details.html`, then follows the "إتمام الدفع" CTA to `session-checkout-preview.html`, then follows the "إلغاء" link back to `live-session-details.html` — completing a closed navigation loop with no broken links.
- **SC-014**: A reviewer cross-checks the dashboard's "متابعة التعلم" CTA from Spec 002 and confirms it navigates to `my-courses.html`, and the dashboard's upcoming-session card "إضافة للتقويم" / "انضمام للحصة" CTAs navigate sensibly into this feature's pages.

---

## Assumptions

The following defaults were selected when the feature description did not specify a particular detail. Each is recorded so a reviewer can override it during `/speckit-clarify` or planning.

- **Persona anchor**: The viewer is Abdulrahman — Arabic student, Quran path level 3, family prepaid balance 750 ر.س — locked in Spec 001 §E2 and reused in Spec 002. All sample data on the six new pages anchors to this persona for dashboard coherence.
- **Subject taxonomy**: The five subjects (Quran / Arabic / English / Math / Islamic Studies) are treated as fixed catalog facets. They were enumerated in the user's brief; no additional subjects are introduced.
- **Session types**: Two types only — جماعية (group) and خاصة (private). These are visually distinct via the Spec 002 chip styling already established on the dashboard upcoming-session card.
- **Currency / pricing convention**: Arabic-student prices in Saudi Riyal (ر.س), Foreign-student prices in USD. Per-session sample pricing: Arabic 75 ر.س / Foreign 25 USD. Full-course monthly sample pricing: Arabic 600 ر.س / Foreign 200 USD. These are placeholder values clearly labeled as samples.
- **Tax line**: The Saudi VAT rate of 15% is shown as a separate line on the checkout-preview page even when the value displays as 0 (when the family balance fully covers the cost). Always-visible tax line is a deliberate transparency choice.
- **Completed/upcoming variant on session-details**: The page is built as a *single* page showing the upcoming-state variant with a clearly marked inline annotation describing what changes in the completed-state variant — rather than maintaining two near-duplicate HTML files. This preserves prototype clarity while keeping the file count manageable.
- **Tab implementation on live-sessions**: Tabs reuse the existing `data-tabs` handler from Spec 001's `assets/js/main.js`. No new JS is added.
- **Calendar view scope**: The calendar view on `live-sessions.html` is a *static* month grid with session-marker dots — clickable-looking but not actually interactive. A future spec will wire it up; for this prototype it is purely a visual stand-in.
- **Search input scope**: The search input on `browse-courses.html` is a visual element — placeholder + icon + input field, but no JavaScript filtering. Filter chips behave the same way.
- **No real payment**: The checkout page never POSTs anywhere. The "تأكيد الحجز" button is a `<button type="button">` with no form action. The inline prototype notice is mandatory (FR-066).
- **Pricing matrix layout on course-details**: The 2 × 2 pricing matrix is rendered as four side-by-side cards in a grid — not as a switcher/toggle — because the goal is to make all four combinations visible without interaction (US3 acceptance scenario 5).
- **Foreign-student rate visibility**: Foreign-student prices are always shown alongside Arabic prices on every catalog and details surface, even though the persona is Arabic. The viewer's matching rate (Arabic) is visually emphasized — bolder + larger + accent color — while the non-matching rate is shown as a smaller secondary "comparison line" (per Q1 clarification). This teaches the dual-pricing model to every viewer regardless of their own classification, while keeping the applicable rate unmissable.
- **Curriculum block data shape**: Each curriculum group on course-details mirrors the dashboard's "Path Progress" block from Spec 002 (Level 1 completed / Level 2 completed / Level 3 active / Level 4 locked) so the curriculum block reads as the *full* version of the dashboard's preview.
- **Achievement page integration is out-of-scope**: This feature does not touch `achievements.html`. The "عرض الشهادة" CTA on completed my-courses cards links to `achievements.html` (which exists from Spec 001 as a placeholder shell) — content for that page is a future spec.

---

## Out of scope

The following items are deliberately excluded from this feature and scheduled for later specs:

- Real payment processing, payment-method tokenization, refund flows.
- Real session attendance tracking (e.g., live join detection, attendance recording).
- Real video meeting integration. The "انضمام إلى الحصة" button is a visual stand-in.
- Real recording playback. The "عرض التسجيل" CTA is a visual stand-in.
- Teacher-side views (the teacher dashboard, teacher session control, teacher payouts) — these are handled in a future spec.
- Parent-side views beyond the read-only "ملخص يمكن لولي الأمر متابعته" embed already established by Spec 002.
- The monthly evaluation flow (mentioned by parent-confidence cards) — date is shown, page is not built.
- Course enrollment with backend validation, course discovery via search/filter (search & filter UIs are visual only).
- Calendar interactivity (drag/drop, click-to-detail). Calendar is static.
- The certificate generation flow. The "عرض الشهادة" CTA links to the existing achievements page.
- The "إعادة الجدولة" flow for missed/cancelled sessions. The link is a visual placeholder.
- Integrating the Achievements page (Spec 001 placeholder shell) with this feature's certificate-availability data — separate spec.
