---
description: "Task list for feature 001-frontend-foundation"
---

# Tasks: Frontend Foundation, Design System, and App Shell

**Input**: Design documents from `/specs/001-frontend-foundation/`
**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/`, `quickstart.md` (all present)

**Tests**: Not requested in the feature specification. The spec validates via manual visual review against 10 measurable success criteria (SC-001…SC-010) and per-page acceptance scenarios. No automated test tasks are generated. Audit tasks in US3 and US4 are manual visual checks, not unit tests.

**Organization**: Tasks are grouped by user story per spec.md priorities. Phases run roughly in spec priority order, except US3/US4 (audit-style stories) follow US1/US2 because they validate work that those stories produce.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps to user stories from `spec.md` (US1, US2, US3, US4); omitted on Setup/Foundational/Polish
- All paths are relative to repo root: `/media/mekky/work/backend/idarti-academy-pro/`

## Path Conventions

This is a single static-frontend project at the repo root. There is no `src/` or `tests/` tree. Pages live at the repo root or under `pages/<role>/`. Reference partials live under `components/`. CSS/JS assets under `assets/css/` and `assets/js/`. See `plan.md` "Project Structure" for the full tree.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project bootstrapping — Tailwind toolchain, Tailwind theme config matching the locked design tokens, base CSS, JS interactions file, and the directory tree.

- [x] T001 Initialize Node.js project at repo root: create `package.json` with `"private": true`, scripts `"build:css": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify"` and `"watch:css": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch"`, and a top-level `name`/`version` per repo metadata. Reference: `research.md § R10`, `plan.md` "Technical Context"
- [x] T002 [P] Add `.gitignore` at repo root entry for `node_modules/` (do NOT ignore `assets/css/output.css` — it is committed per `research.md § R10`)
- [x] T003 [P] Create the directory tree: `pages/student/`, `pages/parent/`, `pages/teacher/`, `pages/admin/`, `components/`, `assets/css/`, `assets/js/`
- [x] T004 Install devDependencies: `tailwindcss@^3.4.0`, `@tailwindcss/forms@^0.5.7`, `autoprefixer@^10.4.0` (writes `package-lock.json`)
- [x] T005 [P] Create `tailwind.config.js` at repo root with `content: ['./index.html', './pages/**/*.html', './components/**/*.html']`, `plugins: [require('@tailwindcss/forms')]`, and `theme.extend.colors` + `theme.extend.fontFamily.sans` exactly as specified in `contracts/design-tokens.md` (full hex palette for primary, accent, success, warning, danger, info, surface, text)
- [x] T006 [P] Create `postcss.config.js` at repo root with `module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }`
- [x] T007 [P] Create `assets/css/input.css` with `@tailwind base; @tailwind components; @tailwind utilities;` plus a custom `@layer base` rule that sets `html { font-family: theme('fontFamily.sans'); }` and a `@layer components` rule defining the `.is-active` sidebar modifier per `contracts/sidebar-navigation.md` (background, font weight, `border-inline-end-4 border-accent-500`)
- [x] T008 [P] Create `assets/js/main.js` (≤80 LOC, vanilla ES2020, no dependencies) implementing the four sanctioned UI interactions: (a) mobile sidebar drawer open/close via `.is-open` toggle on `#app-sidebar`, plus body-scroll lock and `aria-expanded` updates on the burger button; (b) close-on-resize-up listener that strips `.is-open` and unlocks scroll when viewport crosses to `≥ 1024px`; (c) generic dropdown toggle on `[data-dropdown-toggle]` elements; (d) generic modal open/close on `[data-modal-open]` and `[data-modal-close]`; (e) tab switching on `[role="tablist"]` containers. Reference: `research.md § R7`, constitution Principle V
- [x] T009 Run `npm run build:css` once to generate `assets/css/output.css` so reviewers can open pages immediately after pulling

**Checkpoint**: Build infrastructure ready. Tailwind config, base CSS, and JS interactions file exist; no HTML pages yet.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared reference partials (`components/header.html` and one sidebar per role) that every in-app page in US1 and US2 will hand-copy. Per `research.md § R9`, these are reference partials only — NOT loaded at runtime.

**⚠️ CRITICAL**: No US1, US2, US3, or US4 task can begin until this phase is complete.

- [x] T010 Create `components/header.html` containing the canonical app-shell header markup per `contracts/app-shell.md` § "Header contract": mobile burger button (Lucide `menu` SVG inline, `aria-label="فتح القائمة"`), page-title `<h1>` block with optional subtitle, notification icon button (Lucide `bell` SVG with conditional badge), message icon button (Lucide `message-circle` SVG with conditional badge), and a user block (avatar div with initials + name + role label + Lucide `chevron-down`). Top of file MUST start with the comment `<!-- REFERENCE — DO NOT LOAD AT RUNTIME. Hand-copy this markup into each page's <header> slot and replace the {{...}} placeholders with page-specific values. -->`
- [x] T011 [P] Create `components/student-sidebar.html` with all 14 student nav entries (Arabic labels, target paths, Lucide SVG icons) exactly per `data-model.md § E5` Student table. Last entry is Log Out → `index.html` per FR-042. Apply `aria-current="page"` and `is-active` class scaffolding via a `{{ACTIVE: home }}` placeholder comment so page authors know which `<li>` to flag active. Same REFERENCE-only header comment as T010.
- [x] T012 [P] Create `components/parent-sidebar.html` with all 11 parent nav entries per `data-model.md § E5` Parent table; same REFERENCE-only conventions as T011
- [x] T013 [P] Create `components/teacher-sidebar.html` with all 12 teacher nav entries per `data-model.md § E5` Teacher table; same REFERENCE-only conventions
- [x] T014 [P] Create `components/admin-sidebar.html` with all 19 admin nav entries per `data-model.md § E5` Admin table; same REFERENCE-only conventions

**Checkpoint**: Reference partials ready. Header skeleton + 4 role-specific sidebar skeletons exist with correct Arabic labels, Lucide SVG icons, and target paths. Page authoring (US1, US2) can now begin.

---

## Phase 3: User Story 1 — UI Kit Review (Priority: P1) 🎯 MVP

**Goal**: Deliver `pages/ui-kit.html` — the design-system reference page that documents and visually previews every reusable component category from FR-014. This is the visual contract for every later page; stakeholders sign off the look-and-feel here before any business pages are built.

**Independent Test**: Open `pages/ui-kit.html` directly in a browser. The page loads from `file://`, renders all 21 component categories with realistic Arabic content under RTL, shows all 19 status badges with both color and icon, and is openable without a dev server. Reviewer can complete sign-off on the design system without touching any other page.

### Implementation for User Story 1

> All US1 tasks edit the same file (`pages/ui-kit.html`); they cannot run in parallel. Sequential order is the order shown.

- [x] T015 [US1] Create `pages/ui-kit.html` with the document skeleton from `contracts/app-shell.md` (`<html lang="ar" dir="rtl">`, Tajawal preconnect + Google Fonts link, link to `../assets/css/output.css`, body with `min-h-screen flex` shell). Hand-copy `components/admin-sidebar.html` into the `<aside>` slot (admin sidebar per `contracts/ui-kit-inventory.md` rationale) — mark NO entry active since UI Kit isn't in the admin nav. Hand-copy `components/header.html` into the `<header>` slot with `pageTitleAr="دليل الواجهة وعناصر التصميم"` and `pageSubtitleAr="إصدار 1.0 — مرجع التصميم"`. Add `<script src="../assets/js/main.js" defer></script>`.
- [x] T016 [US1] In `pages/ui-kit.html`, add the **Colors** section (Section 1 of `contracts/ui-kit-inventory.md`): 10 swatch tiles in a `grid grid-cols-2 md:grid-cols-5 gap-4`, one per token family (primary, accent, success, warning, danger, info, surface, text-base, text-muted, slate); each tile shows the principal shade as a colored block, the role label in Arabic, and the hex value
- [x] T017 [US1] Add the **Typography** section to `pages/ui-kit.html`: live examples of each hierarchy level (Page title, Section title, Card title, Body text, Muted helper, Stat number) with the exact class combos from `contracts/design-tokens.md` "Typography tokens"; each example uses a realistic Arabic sentence
- [x] T018 [US1] Add the **Buttons** section to `pages/ui-kit.html`: 5 variants (Primary, Secondary, Accent, Ghost, Danger) × 3 sizes (sm/md/lg) × 3 states (default, disabled, with-icon); every button has a clear text label per FR-034
- [x] T019 [US1] Add the **Cards** section to `pages/ui-kit.html`: default card, card with header+body+footer, and a stat card variant (number + delta indicator)
- [x] T020 [US1] Add the **Tables** section to `pages/ui-kit.html`: 5-row roster table referencing real personas (e.g., students with course, last attendance, status badge), header row uses `bg-surface-50 text-text-muted text-xs uppercase tracking-wide`, wrapped in `<div class="overflow-x-auto rounded-lg border border-slate-200">` per app-shell overflow rules
- [x] T021 [US1] Add the **Form inputs** section to `pages/ui-kit.html`: text input with visible label, helper text, and error state; required indicator (asterisk + `aria-required="true"`)
- [x] T022 [US1] Add the **Select dropdowns** section to `pages/ui-kit.html`: native `<select>` styled via `@tailwindcss/forms` with at least 4 realistic Arabic options
- [x] T023 [US1] Add the **Textareas** section to `pages/ui-kit.html`: 3-row textarea with label and char-count helper text
- [x] T024 [US1] Add the **Checkboxes** section to `pages/ui-kit.html`: standalone checkbox + group of 3 with shared label group
- [x] T025 [US1] Add the **Radio buttons** section to `pages/ui-kit.html`: group of 3 in a card layout
- [x] T026 [US1] Add the **Toggle switches** section to `pages/ui-kit.html`: 3 toggles (off, on, disabled) using a `<label>` wrapping a hidden checkbox — pure CSS, no JS
- [x] T027 [US1] Add the **Badges** section to `pages/ui-kit.html`: render all 19 status badges from `data-model.md § E6` in a `flex flex-wrap gap-2`; every badge uses `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium` plus its color token AND its Lucide icon (color is never the sole signal per FR-035 / SC-010)
- [x] T028 [US1] Add the **Alerts** section to `pages/ui-kit.html`: 4 variants (success, warning, danger, info) — each with an icon and a visual-only `×` dismiss control
- [x] T029 [US1] Add the **Empty states** section to `pages/ui-kit.html`: 3 examples — "لا توجد واجبات مستحقة" (action: استعراض الدورات), "لم يتم رفع شهادات بعد" (action: طلب شهادة), "لا توجد رسائل غير مقروءة" (action: العودة للوحة الرئيسية) — each with illustration placeholder, Arabic explanation, and primary action button per FR-017
- [x] T030 [US1] Add the **Progress bars** section to `pages/ui-kit.html`: 3 examples at 25%, 60%, 92% labeled with course names ("القرآن الكريم — 60%"); track `bg-slate-100`, fill colors per `contracts/ui-kit-inventory.md` thresholds (success ≥75%, accent 40–74%, warning <40%)
- [x] T031 [US1] Add the **Timeline** section to `pages/ui-kit.html`: vertical timeline of 4 events from a student's recent week (live session attended, homework submitted, exam upcoming, certificate earned), each entry uses the matching status badge from T027
- [x] T032 [US1] Add the **Stat cards** section to `pages/ui-kit.html`: row of 4 stat cards representing the Admin dashboard's primary KPIs (students 342, teachers 28, active courses 14, monthly revenue 48,250 ر.س) — each with title, large number using `text-3xl font-extrabold tabular-nums`, and a delta indicator badge
- [x] T033 [US1] Add the **Modal style** section to `pages/ui-kit.html`: an always-visible static modal preview with title, body copy, explicit Cancel + Confirm buttons (FR-037), and a close × in the corner. NOT actually opened/closed — that demo lives elsewhere via main.js
- [x] T034 [US1] Add the **Tabs style** section to `pages/ui-kit.html`: 3 tabs ("الواجبات الحالية", "المسلَّمة", "قيد المراجعة") with the first tab active by default, wired via `[role="tablist"]` to the tab handler in `assets/js/main.js`
- [x] T035 [US1] Add the **Breadcrumb style** section to `pages/ui-kit.html`: 3-level breadcrumb "الرئيسية / المعلمون / أ. أحمد البكري" using Lucide `chevron-left` separators with `class="rtl:rotate-180"` so chevrons point naturally for RTL
- [x] T036 [US1] Add the **Avatar style** section to `pages/ui-kit.html`: 4 avatars (one per role from `data-model.md § E2`, sized 40px and 56px), plus a stack example showing 4 overlapping student avatars (classroom roster look)
- [x] T037 [US1] Add the **"Don't" anti-patterns callout** at the bottom of `pages/ui-kit.html`: a danger-tinted card listing the 5 forbidden patterns from `contracts/ui-kit-inventory.md` (color-only signals, Eastern Arabic-Indic digits, JS-rendered card content, `#` placeholder links, English filler)
- [x] T038 [US1] Run `npm run build:css` to ensure every utility class used in the UI Kit page is emitted into `output.css`; verify that opening `pages/ui-kit.html` in a browser shows all 21 sections fully styled with no missing styles

**Checkpoint**: User Story 1 (MVP) complete. The UI Kit page validates the design system end-to-end and unblocks all later pages.

---

## Phase 4: User Story 2 — Each Role Sees Their Own Dashboard Shell (Priority: P1)

**Goal**: Deliver `index.html` (mock login / role-selection) and one shell-level dashboard per role (Student, Parent, Teacher, Admin) — each populated with realistic Arabic sample data per `contracts/dashboard-shells.md`. Dashboards prove the layout, role identity, and visual system across all four primary personas.

**Independent Test**: Open `index.html`. Click each "Continue as..." button and land on the matching dashboard. On each dashboard, the role label in the header, the role-specific sidebar entries, and the role-appropriate summary cards (with Arabic sample data referencing عبد الرحمن مؤمن / أ. أحمد البكري / أبريل 2026 / SAR currency) are all immediately visible. Click any sidebar entry — the URL targets a real planned `.html` path (zero `#` links). Click "تسجيل الخروج" — return to `index.html`.

### Implementation for User Story 2

- [x] T039 [P] [US2] Create `index.html` (mock login / role-selection screen) at repo root per FR-002: `<html lang="ar" dir="rtl">`, Tajawal font link, link to `./assets/css/output.css`. Body contains a centered card on `bg-surface-50` background with the academy logo (text "إدارتي" + small accent-gold mark), an Arabic welcome heading "أهلاً بك في منصة إدارتي التعليمية" and subtitle "اختر الدور الذي تريد الدخول به", and four large "Continue as..." action buttons in a 2×2 grid on desktop / single column on mobile, each labeled in Arabic ("الدخول كطالب", "الدخول كولي أمر", "الدخول كمعلم", "الدخول كمدير منصة") with role-distinct accent treatment and an icon (graduation-cap, users, user-cog, settings respectively), linking to `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html` in that order. Below the four buttons, add a small auxiliary link "عرض دليل الواجهة" → `pages/ui-kit.html`. NO sidebar, NO header (this page deliberately skips the app shell).
- [x] T040 [P] [US2] Create `pages/student/dashboard.html` with the document skeleton from `contracts/app-shell.md` (paths to `../../assets/css/output.css` and `../../assets/js/main.js`). Hand-copy `components/student-sidebar.html` into the `<aside>` slot and mark "Home" (`pages/student/dashboard.html`) as `is-active` + `aria-current="page"`. Hand-copy `components/header.html` with `pageTitleAr="لوحة الطالب"`, `pageSubtitleAr="أهلاً بك في رحلتك التعليمية"`, user avatar `ع.م` on `bg-primary-700 text-white`, name "عبد الرحمن مؤمن", role label "طالب", notificationCount=3, messageCount=2. Add the 6 dashboard cards (welcome, current course summary, upcoming live session, homework reminder, progress card, notification preview) per `contracts/dashboard-shells.md` "Student Dashboard" with the exact Arabic sample copy specified there.
- [x] T041 [P] [US2] Create `pages/parent/dashboard.html` with the same document skeleton; copy `components/parent-sidebar.html` and mark "Dashboard" active. Header: `pageTitleAr="لوحة ولي الأمر"`, `pageSubtitleAr="متابعة رحلة عبد الرحمن التعليمية — أبريل 2026"`, avatar `و.أ` on `bg-accent-100 text-primary-800`, name "ولي أمر الطالب عبد الرحمن", role label "ولي أمر", notificationCount=1, messageCount=4. Add the 6 dashboard cards (welcome, children overview, payment reminder with SAR amount, monthly report preview, teacher note preview signed by أ. أحمد البكري, attendance summary) per `contracts/dashboard-shells.md` "Parent Dashboard"
- [x] T042 [P] [US2] Create `pages/teacher/dashboard.html` with the same document skeleton; copy `components/teacher-sidebar.html` and mark "Dashboard" active. Header: `pageTitleAr="لوحة المعلم"`, `pageSubtitleAr="أبريل 2026"`, avatar `أ.ب` on `bg-success-700 text-white`, name "أ. أحمد البكري", role label "معلّم", notificationCount=5, messageCount=8. Add the 6 dashboard cards (welcome, today's 3 sessions, homework pending review, student alerts, earnings preview with SAR breakdown, weekly attendance summary with mini bar chart) per `contracts/dashboard-shells.md` "Teacher Dashboard"
- [x] T043 [P] [US2] Create `pages/admin/dashboard.html` with the same document skeleton; copy `components/admin-sidebar.html` and mark "Dashboard" active. Header: `pageTitleAr="لوحة الإدارة"`, `pageSubtitleAr="نظرة عامة — أبريل 2026"`, avatar `م.م` on `bg-primary-900 text-accent-400`, name "مدير المنصة", role label "مدير المنصة", notificationCount=12, messageCount=3. Add the 4-stat top row (Students 342, Teachers 28, Active courses 14, Monthly revenue 48,250 ر.س) plus the 2-card bottom row (Pending invoices with 3-row list, System alerts with 3 alerts) per `contracts/dashboard-shells.md` "Admin Dashboard"
- [x] T044 [US2] Run `npm run build:css` to emit any new utilities introduced by the dashboard pages, then audit all 5 in-app pages plus `index.html` for navigation realism: every sidebar `<a href>` resolves to a real planned path under `pages/<role>/`, every "Log Out" entry resolves to `index.html` (FR-042), zero `#` placeholders exist anywhere (FR-041, SC-003)

**Checkpoint**: User Story 2 complete. All four role dashboards plus `index.html` are populated with realistic Arabic sample data, sidebars are correct, and the navigation is realistic end-to-end.

---

## Phase 5: User Story 4 — Arabic-First, RTL-Primary Audit (Priority: P1)

**Goal**: Verify that every page built in US1 and US2 renders correctly under RTL with realistic Saudi-Arabic copy, that all directional UI primitives (sidebar position, breadcrumb chevrons, active-state border, mobile drawer slide direction) behave correctly, that no Eastern Arabic-Indic digits leaked in (FR-043), and that Arabic body text uses comfortable line height per FR-031.

**Independent Test**: Open each of the 6 pages in a browser. Confirm `dir="rtl"` on `<html>`, sidebar on the right edge under RTL, breadcrumbs in UI Kit pointing toward the start of the trail, no `٠١٢٣٤٥٦٧٨٩` digits anywhere, no English placeholder copy in any primary user flow, comfortable Arabic body line-height (`leading-7`).

### Implementation for User Story 4

- [x] T045 [US4] Audit `lang="ar" dir="rtl"` is set on `<html>` for each of the 6 pages (`index.html`, `pages/ui-kit.html`, `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html`). Fix any page missing it.
- [x] T046 [P] [US4] Visual check on the 5 in-app pages: verify the sidebar is on the right edge of the viewport under RTL (the inline-start of `dir="rtl"` is the right side); verify the active-entry indicator bar (`border-inline-end-4 border-accent-500`) renders on the inner edge of the active `<li>` (i.e., facing the main content). If the bar is on the wrong edge anywhere, fix the styling in `assets/css/input.css` `.is-active` rule and re-run `npm run build:css`.
- [x] T047 [P] [US4] On `pages/ui-kit.html` Breadcrumb section, verify chevrons (Lucide `chevron-left`) carry `class="rtl:rotate-180"` and visually point toward the start of the trail under RTL; same check anywhere else a chevron is used (e.g., header user-block caret should NOT rotate — `chevron-down` is direction-neutral)
- [x] T048 [P] [US4] Sweep all 6 pages for Eastern Arabic-Indic digits (`٠١٢٣٤٥٦٧٨٩`) in any HTML text content: `grep -rE '[٠-٩]' index.html pages/ components/` MUST return zero matches. If any are found, replace with Latin digits per FR-043.
- [x] T049 [P] [US4] Sweep all 6 pages for English filler in primary user flows: scan card titles, badge labels, button labels, sidebar entries, dashboard sample-data rows. Untranslated English in primary flows MUST be replaced with realistic Arabic. Tooling-related English (e.g., HTML `lang` attribute, code comments, CSS class names) is allowed.
- [x] T050 [P] [US4] Verify body text uses `leading-7` (or equivalent ≥ 1.625) on prose blocks and card body copy across all 5 in-app pages, per FR-031. Spot-check 3–5 long-prose blocks (welcome cards, teacher notes, system alerts) for comfortable Arabic readability.

**Checkpoint**: User Story 4 audit complete. RTL rendering, Arabic copy quality, and digit conventions are validated and corrected.

---

## Phase 6: User Story 3 — App Shell Works on Mobile and Tablet (Priority: P2)

**Goal**: Validate that all 5 in-app pages render correctly at 375px / 768px / 1024px+ viewports, the mobile sidebar drawer opens/closes via the header burger button, no horizontal page-level scrollbar appears at any breakpoint, header content does not overflow, tables scroll within their wrappers (not the page), and the drawer state cleans up correctly on resize across the breakpoint.

**Independent Test**: Resize the browser (or use device emulation) to 375 / 768 / 1280 px on each of the 5 in-app pages. At each breakpoint the layout is intact, no horizontal page scrollbar appears, and on mobile the burger toggle opens and closes the drawer in under 2 seconds (SC-006).

### Implementation for User Story 3

- [x] T051 [US3] At 375 px viewport, audit `pages/ui-kit.html`, `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html`: verify the sidebar is hidden by default, the burger button is visible in the header, clicking it opens the drawer with backdrop, clicking the close × or backdrop closes it, body scroll is locked while open (FR-026, SC-006). Fix any failing page by adjusting the `.is-open` class wiring or the `assets/js/main.js` drawer handler.
- [x] T052 [US3] At 768 px viewport, audit the same 5 in-app pages: verify the drawer pattern still applies (per `contracts/app-shell.md` the drawer→fixed switch is at `lg:` / 1024 px, not `md:`), header layout is intact, content cards stack into the configured md grid columns, no horizontal page scrollbar
- [x] T053 [US3] At 1024 px+ viewport, audit the same 5 in-app pages: verify the sidebar is fixed at `w-72` and always visible (no burger button), the backdrop is hidden, content grids expand correctly (3-col on dashboards, 4-col on Admin stat row at `xl:`), no horizontal page scrollbar
- [x] T054 [US3] [P] Specifically verify table containers in `pages/ui-kit.html` and any tables embedded in dashboards scroll horizontally within their `<div class="overflow-x-auto rounded-lg border border-slate-200">` wrapper at 375 px — the table scroll MUST NOT bubble up to the page (FR-027)
- [x] T055 [US3] [P] Verify header content (avatar, role label, notification badge, message badge, page title) does not overflow at 375 / 768 / 1024 / 1280 px on any of the 5 in-app pages. Long Arabic names (e.g., "ولي أمر الطالب عبد الرحمن") MUST `truncate` with `max-w-[10rem]` per `contracts/app-shell.md` overflow safeguards. (FR-028, Edge Case "very long Arabic name")
- [x] T056 [US3] Cross-breakpoint resize test on `pages/admin/dashboard.html`: at 375 px, open the drawer; resize the window up to 1280 px without closing the drawer. The drawer state MUST resolve (`.is-open` removed, backdrop hidden, body scroll unlocked) automatically via the resize listener in `assets/js/main.js` — verify it behaves per `research.md § R7` and the spec's "Mobile drawer opened, then user rotates device or resizes to desktop" edge case

**Checkpoint**: User Story 3 audit complete. All 5 in-app pages are responsive at the three target breakpoints with no horizontal-overflow regressions and clean drawer-state cleanup.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final sweeps that confirm every Success Criterion (SC-001 through SC-010) passes before sign-off.

- [x] T057 Run `npm run build:css` (which already includes `--minify`) and verify `assets/css/output.css` size is ≤ 80 KB per `plan.md` "Performance Goals". If oversized, audit `tailwind.config.js` `content` glob coverage (it should NOT pick up `node_modules/` or doc files — purge must aggressively eliminate unused utilities).
- [x] T058 [P] Open all 6 pages from the file explorer (double-click) — none should require a dev server. Confirm each page reaches first meaningful paint within ~5 seconds and shows zero console-blocking errors (SC-001).
- [x] T059 [P] Spot-check zero placeholder content across all 6 pages: no "lorem ipsum", no "Item 1" / "Course 1" / "Student 1" / "TBD", no empty `<table><tbody></tbody></table>`, no English-only filler in primary flows (SC-007). Use `grep -nE 'lorem|Item [0-9]|TBD' index.html pages/` to confirm zero matches.
- [x] T060 [P] Side-by-side visual identity review of the 4 dashboards (`pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html`) opened in adjacent browser tabs: verify identical card border-radius, shadow, padding; identical badge visual treatment; identical header height/padding; identical typography hierarchy; identical sidebar dark-navy color and width; consistent `أبريل 2026` reference month and `ر.س` currency notation (SC-009).
- [x] T061 [P] Confirm `pages/ui-kit.html` Badges section renders ≥ 18 of the 19 status badges from `data-model.md § E6` (SC-010). Count rendered badges; if exactly 18, ensure the omitted one has an inline justification comment in the HTML; if < 18, add the missing badges.
- [x] T062 [P] Audit `assets/js/main.js` for FR-032 / FR-033 compliance: run `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` and confirm zero matches (FR-032 — no JS-rendered content). Then review the file's top-level handler exports against the four-category whitelist from constitution Principle V — drawer, dropdown, modal, tabs — and confirm no fifth interaction category has crept in (FR-033). If anything fails, either remove it or open a constitution amendment first.
- [x] T063 [P] Cross-page audit for FR-034 and FR-035: walk all 6 pages (`index.html`, `pages/ui-kit.html`, `pages/student/dashboard.html`, `pages/parent/dashboard.html`, `pages/teacher/dashboard.html`, `pages/admin/dashboard.html`) and verify (a) every `<button>` and `<a>` either has visible inline text OR an accessible label via `<span class="sr-only">…</span>` / `aria-label` (FR-034); (b) every status indicator anywhere on every page (badges, alerts, progress bars, dashboard pills, attendance check/cross marks) pairs color with text or icon — no color-only signals (FR-035). Fix any failing controls before T064.
- [x] T064 Walk through the validation table in `quickstart.md` "Validating the prototype against this spec" — execute every SC-001…SC-010 check end-to-end and record outcomes. The feature is Done only when all 10 success criteria pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1. **BLOCKS all user stories.**
- **Phase 3 (US1 — UI Kit)**: Depends on Phase 2. Can run in parallel with Phase 4 IF a second authoring resource is available — both phases consume the same partials but write to different files.
- **Phase 4 (US2 — Dashboards)**: Depends on Phase 2. Can run in parallel with Phase 3.
- **Phase 5 (US4 — RTL audit)**: Depends on Phases 3 AND 4 (audits work that those phases produced).
- **Phase 6 (US3 — Responsive audit)**: Depends on Phases 3 AND 4 (audits work that those phases produced). Can run in parallel with Phase 5 — the two audits inspect orthogonal concerns.
- **Phase 7 (Polish)**: Depends on Phases 3, 4, 5, AND 6.

### Within Each User Story

- **US1**: All tasks edit `pages/ui-kit.html` — must run sequentially (T015 → T016 → … → T038). One section per task for traceability.
- **US2**: T039 (`index.html`) can run concurrently with T040–T043 (the four role dashboards) since each dashboard is a different file. T044 (navigation realism audit) depends on all five page tasks completing.
- **US3**: T051 → T052 → T053 are inherently sequential because they require resizing the same browser to different breakpoints in turn. T054 / T055 can run in parallel with the breakpoint sweep. T056 (resize-cleanup test) is sequential after T051.
- **US4**: T045 must complete first (it sets the foundation `dir="rtl"`); T046–T050 can then run in parallel since they inspect different concerns on (potentially) different pages.

### Parallel Opportunities

- **Setup parallel batch**: After T001, run T002 / T003 / T005 / T006 / T007 / T008 in parallel (each touches a different file). T004 (npm install) and T009 (initial build) are sequential.
- **Foundational parallel batch**: After T010 (header partial), run T011 / T012 / T013 / T014 (the 4 sidebar partials) in parallel — different files.
- **US2 parallel batch**: T039 / T040 / T041 / T042 / T043 can all run in parallel — five different files.
- **US3 + US5 cross-phase parallel**: Phase 5 (RTL audit) and Phase 6 (Responsive audit) can run in parallel with two reviewers since they don't write to overlapping files.
- **Polish parallel batch**: T058 / T059 / T060 / T061 / T062 / T063 all read the same files in parallel without writing — fully parallelizable. T064 (final SC walk-through) runs sequentially after them as the sign-off gate.

---

## Parallel Execution Examples

### Setup phase (after T001)

```bash
# Once T001 (package.json) and T004 (npm install) are done, run these in parallel:
Task: "Add .gitignore at repo root entry for node_modules/"
Task: "Create directory tree pages/{student,parent,teacher,admin}/, components/, assets/css/, assets/js/"
Task: "Create tailwind.config.js with full color/font/breakpoint extensions per contracts/design-tokens.md"
Task: "Create postcss.config.js with tailwindcss + autoprefixer"
Task: "Create assets/css/input.css with @tailwind directives + .is-active layer rule"
Task: "Create assets/js/main.js with drawer/dropdown/modal/tabs handlers"
```

### Foundational phase (after T010)

```bash
# T010 first to ensure the header skeleton convention is set, then:
Task: "Create components/student-sidebar.html with all 14 entries"
Task: "Create components/parent-sidebar.html with all 11 entries"
Task: "Create components/teacher-sidebar.html with all 12 entries"
Task: "Create components/admin-sidebar.html with all 19 entries"
```

### US2 phase (after Foundational complete)

```bash
# All five page-creation tasks in parallel — different files:
Task: "Create index.html (mock login / role-selection)"
Task: "Create pages/student/dashboard.html with full content"
Task: "Create pages/parent/dashboard.html with full content"
Task: "Create pages/teacher/dashboard.html with full content"
Task: "Create pages/admin/dashboard.html with full content"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 — UI Kit Review
4. **STOP and VALIDATE**: Demo `pages/ui-kit.html` to design stakeholders. The MVP is the design system itself — without sign-off here, building the dashboards risks rework.

### Incremental Delivery

1. Setup + Foundational → infrastructure ready
2. Add US1 (UI Kit) → demo design system → sign-off
3. Add US2 (Dashboards) → demo all 4 role experiences → sign-off
4. Run US4 (RTL audit) → fix any RTL gaps
5. Run US3 (Responsive audit) → fix any responsive gaps
6. Polish → final SC-001…SC-010 verification → release prototype

### Parallel Team Strategy

With two authoring resources:

1. Resources A and B together complete Phases 1 + 2.
2. Once Foundational is done:
   - **Resource A**: Phase 3 (US1 — UI Kit) — single-file sequential work, ~24 tasks.
   - **Resource B**: Phase 4 (US2 — Dashboards) — five files in parallel, ~6 tasks.
3. Both converge on Phase 5 (RTL audit) and Phase 6 (Responsive audit) — splittable by viewport or by concern.
4. Both run Polish together.

---

## Notes

- `[P]` tasks operate on different files with no incomplete dependencies and can run in parallel.
- `[US#]` labels map every user-story task back to `spec.md` for traceability.
- US1 is the MVP — the UI Kit page is the smallest unit that delivers stakeholder value (design-system sign-off) on its own.
- Audit phases (US3, US4) inherently follow the build phases (US1, US2). The spec assigns priorities by user value, not strictly by build order; this tasks.md preserves both by listing audits in priority-order subheadings while ordering execution by dependency.
- Per `quickstart.md`, no automated test framework is in scope. Validation is via manual visual review of the 10 success criteria.
- Avoid: introducing JS that renders content; `#` placeholder links; English-only filler in primary flows; Eastern Arabic-Indic digits; reordering sidebar entries from `data-model.md § E5` without explicit spec change.
