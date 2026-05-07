# Feature Specification: Frontend Foundation, Design System, and App Shell

**Feature Branch**: `001-frontend-foundation`
**Created**: 2026-05-06
**Status**: Draft
**Input**: User description: "Create the complete static frontend foundation for a premium educational platform serving Saudi Arabia and Egypt. This spec must establish the visual identity, layout system, reusable UI patterns, shared header, shared sidebar structure, responsive rules, RTL-first behavior, and base static page architecture."

## Clarifications

### Session 2026-05-06

- Q: What is the nature of `index.html`? → A: Mock login / role-selection screen — academy logo, Arabic welcome copy, four prominent "Continue as..." buttons (Student, Parent, Teacher, Admin) that navigate to each role's dashboard, and a small auxiliary link to `pages/ui-kit.html`. As a consequence: every "Log Out" link in every role's sidebar resolves to `index.html`, so no separate logout/login page is added to the page inventory. Translator's note: the visible Arabic label on each role-selection button is "الدخول كـ..." ("Enter as...") rather than a literal "متابعة كـ..." ("Continue as..."), because "الدخول" is the natural Arabic phrasing for entering a product as a given role.
- Q: Should the RTL/LTR direction toggle ship in this spec? → A: No — drop it entirely from this spec. All pages render in Arabic + RTL only. A working bidirectional toggle (and the parallel English copy it would require) is deferred to a later spec when an LTR/English mode is actually needed.
- Q: Which numeral system is canonical for digits inside Arabic copy? → A: Latin (Western Arabic) digits everywhere — for years, currencies, counts, percentages, times, and tabular numbers (e.g., "أبريل 2026", "28 طالباً", "2,450 ر.س", "92%"). Eastern Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) MUST NOT appear in this spec. Reasons: scannability for dashboard chrome, alignment in tables, and consistency with the spec's existing "أبريل 2026" sample.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Stakeholder Reviews the Visual Identity & UI Kit (Priority: P1)

A product or design stakeholder opens the platform's UI kit page in a browser to evaluate whether the visual language is suitable for a premium, trust-driven educational SaaS targeting Saudi Arabia and Egypt. They expect to see, in one place, the complete design vocabulary — colors, typography hierarchy, buttons, cards, tables, form controls, badges, alerts, empty states, progress bars, timeline, stat cards, modal style, tabs, breadcrumbs, and avatars — so they can sign off the look and feel before any business pages are built.

**Why this priority**: This is the visual contract for every subsequent spec. Without an approved UI kit, all later pages would be re-litigated. This single page validates the foundation against premium-educational expectations and unblocks the rest of the program.

**Independent Test**: Open `pages/ui-kit.html` directly in a browser. The page renders every documented component with realistic Arabic labels, the Saudi-friendly color system (deep navy, warm orange/gold, soft green, light backgrounds, calm gray text), and a clear hierarchy. Stakeholders can review and approve it without touching any other page.

**Acceptance Scenarios**:

1. **Given** a freshly cloned repo with no dev server, **When** the reviewer double-clicks `pages/ui-kit.html`, **Then** the page opens in the browser with all components rendered and styled (no broken layouts, no missing styles).
2. **Given** the UI kit page is open in RTL, **When** the reviewer scans the components, **Then** every component (buttons, tables, badges, inputs, modals, breadcrumbs) reads naturally right-to-left with no mirrored text, no broken alignment, and Arabic copy that matches Saudi-friendly tone.
3. **Given** the reviewer wants to confirm the badge vocabulary, **When** they look at the Badges section, **Then** they see consistent visual treatments for at minimum: Active, Inactive, Pending, Paid, Unpaid, Partially Paid, Overdue, Submitted, Under Review, Accepted, Needs Revision, Rejected, Completed, Upcoming, Missed, Passed, Failed, Excellent, Needs Support — each with both color and a textual/iconic indicator (color is never the sole signal).

---

### User Story 2 - Each Role Sees Their Own Dashboard Shell (Priority: P1)

A reviewer steps into the shoes of each of the four primary roles — Student, Parent, Teacher, Admin — opens that role's dashboard, and confirms that the layout, sidebar, header, and shell-level summary cards make the role's responsibilities immediately obvious. The shell should already feel like a complete educational platform, not a blank admin grid, even though deep business pages will be added in later specs.

**Why this priority**: The role-specific shell proves the navigation model and visual identity scale across all four primary personas. If the shell looks coherent across roles, every later feature spec can plug into it without re-designing layout. This is the second pillar of the foundation.

**Independent Test**: Open each of `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, and `pages/admin/dashboard.html`. Each must render its role-specific sidebar (with the exact navigation entries listed in the Requirements section), a top header with page title, notification badge, message badge, user avatar, user name, and role label, and a main content area with role-appropriate shell summary cards populated with realistic Arabic sample data.

**Acceptance Scenarios**:

1. **Given** the Student dashboard is open, **When** the reviewer scans the page, **Then** they see a welcome card addressed to "عبد الرحمن مؤمن", a current course summary (e.g., القرآن الكريم), an upcoming live session entry with date/time, a homework reminder, a progress card, and a notification preview — all populated with realistic data, no lorem ipsum, no empty states.
2. **Given** the Parent dashboard is open, **When** the reviewer scans the page, **Then** they see a children overview, a payment reminder showing currency in SAR, a monthly report preview labeled "أبريل 2026", a teacher note preview signed by "أ. أحمد البكري", and an attendance summary.
3. **Given** the Teacher dashboard is open, **When** the reviewer scans the page, **Then** they see today's sessions list, homework pending review, student alerts, an earnings preview, and an attendance summary — all with realistic Arabic content.
4. **Given** the Admin dashboard is open, **When** the reviewer scans the page, **Then** they see counts for students, teachers, and active courses; a monthly revenue card; a pending invoices card; and a system alerts panel.
5. **Given** any role's dashboard is open, **When** the reviewer clicks a sidebar entry that points to a future page, **Then** the link target is a real planned `.html` path under the correct role folder (no `#` placeholders, no JavaScript-only handlers), so future specs can drop a real page into that path with no rework.

---

### User Story 3 - The App Shell Works on Mobile and Tablet (Priority: P2)

A stakeholder previews the dashboards on a phone (and a tablet) to confirm that the platform is genuinely responsive. The sidebar collapses to a drawer that opens via a clearly labeled toggle, the header stays compact and legible, summary cards stack vertically without overflow, and tables either scroll horizontally or transform into card-style rows. Nothing important is hidden or unreachable on small screens.

**Why this priority**: Saudi and Egyptian users span phone, tablet, and desktop. A "responsive" claim that breaks on mobile destroys the premium impression at first contact. Validating this on the shell prevents every future page from inheriting broken responsive behavior.

**Independent Test**: Resize the browser (or use device emulation) to common breakpoints — ~375px (mobile), ~768px (tablet), ~1280px (desktop) — for each of the five core pages (UI kit + four dashboards). At each breakpoint the layout is intact, no horizontal page-level scrollbar appears, and the sidebar drawer toggle on mobile actually opens and closes the drawer.

**Acceptance Scenarios**:

1. **Given** the Admin dashboard is rendered at ~375px width, **When** the reviewer activates the sidebar toggle in the header, **Then** the sidebar slides in as a drawer over the content and a close affordance dismisses it.
2. **Given** any dashboard is rendered at ~768px, **When** the reviewer scrolls the page, **Then** content cards stack into a single or two-column layout without horizontal page overflow and without breaking the header alignment.
3. **Given** the UI kit's tables section is rendered at mobile width, **When** the reviewer interacts with a wide table, **Then** the table scrolls horizontally inside its container (or collapses into card-style rows) without forcing the entire page to scroll horizontally.

---

### User Story 4 - Arabic-First, RTL-Primary Experience (Priority: P1)

The primary audience reads Arabic and expects the entire interface to read naturally right-to-left. A stakeholder confirms that every page in this spec ships RTL by default with culturally appropriate Saudi-Arabic copy, that text alignment, sidebar position, table flow, and any directional icons (e.g., chevrons in breadcrumbs and dropdowns) all behave correctly in RTL. (LTR support and an RTL/LTR toggle are explicitly out of scope for this spec — see FR-008.)

**Why this priority**: RTL correctness is the baseline experience, not a polish item. A broken RTL layout would invalidate every other deliverable in this spec for the Saudi market.

**Independent Test**: Open each of the five core pages with `dir="rtl"` (the default for Arabic content). Confirm the sidebar is on the RTL-correct side, all text aligns naturally for Arabic, breadcrumb chevrons and dropdown indicators point in the right direction, no English placeholder copy remains in primary user flows, and Arabic is rendered with comfortable line height for readability.

**Acceptance Scenarios**:

1. **Given** the Student dashboard loads in RTL, **When** the reviewer scans the layout, **Then** the sidebar is in the correct RTL position, the header items (avatar, name, role, message and notification icons) are arranged in an order natural for Arabic reading, and breadcrumb separators point in the correct RTL direction.
2. **Given** any in-app page is loaded, **When** the reviewer inspects the document root, **Then** `dir="rtl"` is set at the document level and no RTL/LTR toggle control is present (see FR-008 — toggle is deferred to a later spec).
3. **Given** the reviewer reads the on-page copy on any of the five pages, **When** they look for placeholder/lorem text or untranslated English labels in primary flows, **Then** they find none — every label, button, badge, and sample row is in realistic Arabic.

---

### Edge Cases

- **A user with very long Arabic name**: The header user-name area MUST gracefully truncate or wrap without pushing the avatar, role label, or notification/message icons out of the header row.
- **No notifications and no messages**: The header notification and message icons MUST hide or zero-out their badge counts and still remain clickable affordances for future detail pages.
- **A sidebar entry whose target page does not yet exist in this spec**: The link MUST point to its real planned `.html` path so a future spec can fill it in. It MUST NOT be a `#` placeholder, and the page being navigated *from* MUST not break if the target file is created later.
- **Mobile drawer opened, then user rotates device or resizes to desktop**: When the breakpoint crosses to desktop, the drawer state MUST resolve to the standard fixed-sidebar layout without leaving an orphaned overlay or scroll lock.
- **Active sidebar entry on a page**: The currently viewed page's sidebar entry MUST visually distinguish itself (active state) from the rest, and that active styling MUST be readable in the deep navy sidebar background under RTL.
- **Tables on a narrow viewport**: A wide table MUST not cause the entire page to scroll horizontally; it MUST scroll within its own container or convert to card-style rows.

## Requirements *(mandatory)*

### Functional Requirements

**Page Inventory**

- **FR-001**: The deliverable MUST include exactly six static, browser-openable pages: `index.html`, `pages/ui-kit.html`, `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html`.
- **FR-002**: `index.html` MUST be presented as a mock login / role-selection screen consisting of: the academy logo, an Arabic welcome message, four prominent "Continue as..." buttons (Student, Parent, Teacher, Admin) that navigate respectively to `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, and `pages/admin/dashboard.html`, and a small auxiliary link to `pages/ui-kit.html`. The visual treatment MUST be consistent with the rest of the app shell (same color tokens, typography, and shadow/card style).
- **FR-003**: Every page MUST be openable directly via its file path in a browser without requiring a dev server.

**Shared App Shell**

- **FR-004**: All five "in-app" pages (the four role dashboards and the UI kit) MUST share a consistent app shell consisting of: a fixed sidebar on desktop, a top header inside the main content area, and a spacious main content wrapper.
- **FR-005**: The header on every in-app page MUST display: a page title, an optional subtitle slot, a notification icon with a badge for unread count, a message icon with a badge for unread count, a user avatar, the user's name, and a role label.
- **FR-006**: The sidebar on every in-app page MUST use a deep navy background, include a clearly identified academy logo area, expose role-aware navigation, distinguish the active link from inactive links, provide a visible hover state, pair every navigation entry with both an icon AND a text label (the icon is never used alone), and include a Log Out entry.
- **FR-007**: The app shell MUST present a visible role/identity indicator so a reviewer always knows which role's experience they are inspecting (e.g., the role label in the header and the role-appropriate logo/title context in the sidebar).
- **FR-008**: An RTL/LTR direction toggle is OUT OF SCOPE for this spec. All in-app pages MUST render in Arabic with `dir="rtl"` and MUST NOT include any visual toggle, English-mode copy, or LTR rendering paths. A bidirectional toggle is deferred to a later spec.

**Role-Aware Sidebar Navigation**

- **FR-009**: The Student sidebar MUST contain exactly these entries (order may be optimized but no entry may be omitted, and every entry MUST link to a real planned `.html` path under `pages/student/`): Home, Browse Courses, My Courses, Live Sessions, Assignments, Exams, Achievements, Reports, Social Hub, Leaderboard, Calendar, Payment History, Profile, Log Out.
- **FR-010**: The Parent sidebar MUST contain exactly these entries (same path-realism rule under `pages/parent/`): Dashboard, My Children, Child Reports, Attendance, Homework Follow-up, Certificates, Invoices, Family Balance, Messages, Profile, Log Out.
- **FR-011**: The Teacher sidebar MUST contain exactly these entries (under `pages/teacher/`): Dashboard, My Classes, Live Sessions, Homework Review, Student Reports, Attendance, Earnings, Advances, Calendar, Messages, Profile, Log Out.
- **FR-012**: The Admin sidebar MUST contain exactly these entries (under `pages/admin/`): Dashboard, Students, Families, Teachers, Courses, Live Sessions, Assignments, Exams, Certificates, Reports, Payments, Invoices, Tax Settings, Family Balances, Teacher Finance, Roles & Permissions, Social Hub, Platform Settings, Log Out.
- **FR-013**: The sidebar entry corresponding to the currently viewed page MUST be visually marked as active using more than color alone (e.g., a left/right indicator bar plus background contrast).

**UI Kit Component Coverage**

- **FR-014**: `pages/ui-kit.html` MUST document and visually preview every one of these component categories: Colors, Typography hierarchy (page title, section title, card title, body text, muted helper text), Buttons, Cards, Tables, Form inputs, Select dropdowns, Textareas, Checkboxes, Radio buttons, Toggle switches, Badges, Alerts, Empty states, Progress bars, Timeline, Stat cards, Modal style, Tabs style, Breadcrumb style, Avatar style.
- **FR-015**: The UI kit MUST present the platform color tokens with both visual swatches and human-readable role labels — Primary (deep navy), Accent (warm orange/gold), Success (soft green), Warning (amber), Danger (red), Info (blue), Background (light gray/soft blue), Cards (white), Text (dark slate), Muted text (gray).
- **FR-016**: The UI kit's Badges section MUST show all status badges defined in the constitution and the design system: Active, Inactive, Pending, Paid, Unpaid, Partially Paid, Overdue, Submitted, Under Review, Accepted, Needs Revision, Rejected, Completed, Upcoming, Missed, Passed, Failed, Excellent, Needs Support — each accompanied by text or icon (color must not be the sole signal).
- **FR-017**: The UI kit's Empty states MUST each explain what is missing and suggest a next action.

**Role Dashboard Shell Content**

- **FR-018**: The Student dashboard shell MUST contain a welcome card, a current course summary, an upcoming live session card, a homework reminder, a progress card, and a notification preview — all populated with realistic Arabic sample data referencing courses such as القرآن الكريم، اللغة العربية، اللغة الإنجليزية، and الرياضيات.
- **FR-019**: The Parent dashboard shell MUST contain a children overview, a payment reminder (with currency, e.g., SAR), a monthly report preview labeled "أبريل 2026", a teacher note preview, and an attendance summary.
- **FR-020**: The Teacher dashboard shell MUST contain today's sessions, homework pending review, student alerts, an earnings preview, and an attendance summary.
- **FR-021**: The Admin dashboard shell MUST contain student count, teacher count, active courses count, monthly revenue, pending invoices, and a system alerts panel.
- **FR-022**: All four dashboards MUST share the same visual identity — same color tokens, same card style, same badge vocabulary, same typography hierarchy — so that switching between them feels like one platform rather than four separate sites.

**Sample Data Quality**

- **FR-023**: Every page in this spec MUST be populated with realistic, Saudi-friendly Arabic sample data. Lorem ipsum, "Item 1"/"Course 1" labels, empty tables, and English-only filler copy are forbidden in primary flows.
- **FR-024**: Demo personas referenced across the dashboards SHOULD include the student "عبد الرحمن مؤمن", his parent ("ولي أمر الطالب عبد الرحمن"), the teacher "أ. أحمد البكري", and the admin "مدير المنصة".

**Responsive Behavior**

- **FR-025**: All five in-app pages MUST be responsive across mobile (~375px), tablet (~768px), and desktop (~1280px+) widths.
- **FR-026**: On mobile, the fixed sidebar MUST collapse and become a drawer that opens via a clearly visible toggle in the header, and a close affordance MUST dismiss the drawer.
- **FR-027**: At every supported breakpoint, the page MUST NOT introduce a horizontal page-level scrollbar; tables that exceed the viewport MUST scroll within their own container or convert to card-style rows.
- **FR-028**: Header content MUST never overflow or push critical elements (avatar, role label, notification/message icons) out of view on any supported breakpoint.

**RTL & Internationalization**

- **FR-029**: All Arabic-default pages MUST set `dir="rtl"` at the document level and MUST render every layout, alignment, and directional icon naturally for an Arabic reader.
- **FR-030**: Tables, breadcrumbs, dropdowns, and chevrons MUST behave correctly in RTL (e.g., breadcrumb separators and dropdown indicators point in the RTL-correct direction).
- **FR-031**: The line height and font stack used for Arabic text MUST be tuned for comfortable Arabic readability; the system MUST NOT mix Arabic and English in the same label awkwardly within a primary user flow.

**Interactivity Constraints**

- **FR-032**: Page content MUST NOT be generated or hydrated by JavaScript at load time; all visible content MUST be present in the static HTML.
- **FR-033**: Any JavaScript shipped with this spec MUST be limited to mobile sidebar open/close, simple dropdown toggle, simple modal open/close, and (optionally) simple tab switching. No data fetching, no API calls (real or mocked), no client-side routing.

**Accessibility & Visual Quality**

- **FR-034**: Every interactive control (buttons, toggles, drawer trigger, modal triggers) MUST have a clear, readable text label; icons MAY supplement but MUST NOT replace text.
- **FR-035**: Status meaning MUST never be conveyed by color alone — text, icon, or pattern MUST accompany the color.
- **FR-036**: Form controls in the UI kit MUST display visible labels.
- **FR-037**: Modals presented in the UI kit MUST expose explicit cancel and confirm actions.
- **FR-038**: The visual treatment MUST feel premium-educational: professional spacing, rounded cards, subtle shadows, clear section separation, and absence of childish or coldly-corporate motifs.

**Cross-Page Consistency**

- **FR-039**: Header structure (positions of title, subtitle slot, badges, avatar, name, role label) MUST be visually consistent across all in-app pages.
- **FR-040**: Sidebar structure (logo area, nav list pattern, active/hover styling, logout placement) MUST be visually consistent across all roles, even though each role's nav entries differ.
- **FR-041**: Every link on every in-app page MUST point either to a page that exists in this spec or to a real planned `.html` path that a future spec can fill — never to `#` placeholders.
- **FR-042**: On every role's sidebar, the "Log Out" entry MUST link to `index.html` (the mock role-selection / login screen). No separate logout or login page is introduced by this spec.

**Localization Conventions**

- **FR-043**: All digits rendered inside Arabic copy on every page in this spec MUST use Latin (Western Arabic) numerals (0-9). This applies to years, dates, currencies, counts, percentages, session times, and any tabular figures. Eastern Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) MUST NOT appear in any sample data, label, or UI string in this spec.

### Key Entities *(visual concepts referenced in sample data)*

- **Role**: One of Student, Parent/Family, Teacher, Admin/Manager. Each role determines which sidebar nav entries appear and which dashboard shell content is shown. Two additional roles — Finance Manager and Support/Operations — are referenced by the constitution but are out of scope for this foundation spec; their dashboards and sidebars will be derived from Admin in later specs via permission scoping.
- **User**: A persona with a name, avatar, and role. Sample personas include "عبد الرحمن مؤمن" (student), "ولي أمر الطالب عبد الرحمن" (parent), "أ. أحمد البكري" (teacher), and "مدير المنصة" (admin).
- **Course**: A learning track referenced in dashboard sample data — at minimum القرآن الكريم، اللغة العربية، اللغة الإنجليزية، الرياضيات.
- **Notification / Message**: Header indicators with unread counts. Pure shell-level affordances in this spec; behavior beyond the badge is deferred to later specs.
- **Sidebar Navigation Entry**: A label + icon + target `.html` path tied to a specific role.
- **UI Kit Component**: A reusable visual pattern (button, card, badge, table row, etc.) presented on `pages/ui-kit.html` for stakeholder approval and later reuse.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can open every one of the six required pages directly from the file system in a browser within 5 seconds of double-clicking, with no missing styles, no broken layouts, and no console-blocking errors.
- **SC-002**: For each of the four roles, a reviewer can identify the role and its primary responsibilities within 10 seconds of opening the corresponding dashboard, based purely on the visible header role label, sidebar entries, and shell summary cards.
- **SC-003**: 100% of the sidebar entries listed in FR-009 through FR-012 are present in their corresponding role dashboards, in the correct role folder, and link to real planned `.html` paths (zero `#` placeholders, zero JavaScript-only handlers).
- **SC-004**: 100% of the UI kit component categories listed in FR-014 are visibly present and rendered with realistic Arabic content on `pages/ui-kit.html`.
- **SC-005**: All five in-app pages render without a horizontal page-level scrollbar at 375px, 768px, and 1280px viewport widths.
- **SC-006**: On mobile (~375px), a reviewer can open and close the sidebar drawer via the header toggle on each of the four dashboards in under 2 seconds per interaction.
- **SC-007**: Zero occurrences of lorem ipsum, "Item 1"-style placeholder labels, or empty tables across all six pages — verified by spot-check on every page.
- **SC-008**: 100% of pages render correctly in RTL: sidebar in RTL-correct position, breadcrumb and dropdown chevrons RTL-correct, no mirrored-broken text, Arabic text rendered with comfortable line height (verified visually across all six pages).
- **SC-009**: All four dashboards pass a visual-identity consistency review: same color tokens, same card style, same badge vocabulary, same typography hierarchy, same header/sidebar structure — confirmed by side-by-side comparison.
- **SC-010**: At least 18 of the 19 status badges named in FR-016 are visibly present on `pages/ui-kit.html` (allowing one omission only with explicit justification logged in the page).

## Assumptions

- **Static delivery, no backend**: Per the project constitution, this spec ships static HTML pages styled with TailwindCSS and minimal vanilla JavaScript. No frontend framework, backend, real or mocked API, or database is in scope.
- **Arabic is the default language and RTL is the default direction**. LTR/English is structurally supported but secondary in this spec.
- **The four primary roles (Student, Parent, Teacher, Admin) get full dashboard shells in this spec**. Finance Manager and Support/Operations dashboards are deferred to a later spec and will be derived via the Admin shell + role/permissions scoping.
- **Currency examples** in dashboard sample data use SAR primarily and EGP as a secondary reference, reflecting that Saudi Arabia is the primary market and Egypt is secondary.
- **Sample dates** anchor on "أبريل 2026" to keep monthly-report and reminder copy consistent across dashboards in this spec.
- **The dashboards delivered here are shell-level**: they validate layout, navigation, identity, and responsive/RTL behavior. Deep business sections (full lists of courses, full attendance/finance/exam pages, etc.) are explicitly out of scope and will be added in subsequent specs that drop into the planned `.html` paths already wired into the sidebars.
- **Tailwind compilation**: An npm-based Tailwind toolchain (input.css → output.css) MAY be used solely for CSS generation. The compiled output must still allow every page to be opened directly from the filesystem without a dev server.
- **Future detail pages**: Every "View" or navigation target referenced from this foundation spec is assumed to be filled in by a follow-on spec. This spec is responsible only for the planned paths and the shell, not the detail pages themselves.
