# Phase 0 Research — Courses and Live Sessions Frontend

This document consolidates the technical decisions, content sourcing, and clarification outcomes that bound the implementation of the six new pages. Each section follows the **Decision / Rationale / Alternatives considered** format. There are no remaining `NEEDS CLARIFICATION` items — all five `/speckit-clarify` Q&A bullets from `spec.md §Clarifications` are folded in.

---

## R1. Page count and structural strategy

**Decision**: Build six independent static HTML files, each fully self-contained, hard-embedding the 15-entry student sidebar and the bell-as-anchor header from Spec 002. No runtime include mechanism.

**Rationale**: Spec 001 §I + §II (constitution): "Every HTML page MUST be fully designed and contain its own realistic, hard-coded demo content." Spec 002 already shipped four pages this way; the convention is locked. The drill-down pages (`course-details`, `live-session-details`, `session-checkout-preview`) carry the same shell as the navigation-root pages — only the active-sidebar-entry indicator and the page-specific `<main>` content differ.

**Alternatives considered**:
- Server-side includes / a build-time HTML composer to deduplicate shells. Rejected — would introduce a build step that breaks the `file://` openability guarantee in Principle I.
- A single SPA with client-side routing. Rejected — banned by Principle I (no frameworks, no client routing) and by Principle V (no JS-rendered content).
- Reducing the page count to fewer files (e.g., merging `live-session-details` + `session-checkout-preview` into a single page with a modal). Rejected — the spec defines them as distinct pages with distinct responsibilities; merging would obscure the per-session-paid narrative.

---

## R2. Sidebar and header — zero-delta reuse from Spec 002

**Decision**: Embed the 15-entry student sidebar and the header exactly as Spec 002 left them. No new entries, no entry reordering, no header tweaks.

**Rationale**: Spec 002's sidebar already contains the three navigation roots this feature needs (`browse-courses.html`, `my-courses.html`, `live-sessions.html`) — they were placeholder shells until now. The bell already became an `<a href="notifications.html">` in Spec 002 (T003). FR-001..FR-005 / SC-014 require zero shell drift across the student section.

**Active-entry mapping** (FR-002):

| Page | Active sidebar entry |
|---|---|
| `browse-courses.html` | "استعراض الدورات" |
| `my-courses.html` | "دوراتي" |
| `course-details.html` | *none* (drill-down) |
| `live-sessions.html` | "الحصص المباشرة" |
| `live-session-details.html` | *none* (drill-down) |
| `session-checkout-preview.html` | *none* (drill-down) |

**Alternatives considered**: Adding a "حجوزاتي" or "السلة" entry for the checkout flow. Rejected — bookings are not a navigation concept in this feature; the checkout is reached from a session-details CTA, not a sidebar root.

---

## R3. JavaScript scope — `data-tabs` reuse, zero new handlers

**Decision**: The 3-tab Live Sessions UI (قادمة / مكتملة / فائتة) reuses the existing tabs handler in `assets/js/main.js` lines 47-66. No new JS handlers are added. The handler uses ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-controls`, `aria-selected`) with a `data-tabpanels` wrapper.

**Rationale**: Constitution Principle V sanctions "simple tabs" as one of the six allowed JS categories, and the handler already ships from Spec 001. Reusing it for Live Sessions is the simplest path. No new categories are introduced.

**Markup pattern** (used on `live-sessions.html`):

```html
<div role="tablist" class="...">
  <button role="tab" aria-selected="true" aria-controls="tab-upcoming" class="is-active">قادمة (5)</button>
  <button role="tab" aria-selected="false" aria-controls="tab-completed">مكتملة (8)</button>
  <button role="tab" aria-selected="false" aria-controls="tab-missed">فائتة (2)</button>
</div>
<div data-tabpanels>
  <div role="tabpanel" id="tab-upcoming"> … upcoming rows … </div>
  <div role="tabpanel" id="tab-completed" class="hidden"> … completed rows … </div>
  <div role="tabpanel" id="tab-missed" class="hidden"> … missed rows … </div>
</div>
```

**Alternatives considered**:
- Render all three tabs as stacked sections (no JS, no tab interaction) so the page works without `main.js`. Rejected — tab behavior is the canonical UX pattern, the JS already exists, and Principle V explicitly permits it. Stacked sections would make the page very long and fight the 3-tab visual structure required by FR-040.
- A CSS-only `:target` tab system. Rejected — works but breaks the keyboard navigation pattern the existing handler implements via ARIA. Reusing the existing handler is cleaner.

The list/calendar view toggle on `live-sessions.html` (FR-044) is a *separate* interaction. **It does NOT use the tabs handler.** Instead, both views are rendered side-by-side at desktop ≥ lg breakpoint, with a CSS-only segmented control marking which is "active" purely visually. The calendar view markup is always rendered (so toggle requires no JS) but is positioned below the list at < lg, and the segmented control's "active" state is hard-coded in markup to indicate "list view is the default". No JS state is involved.

---

## R4. Pricing display strategy (Q1 clarification)

**Decision**: On every catalog and details surface, show both the Arabic-student rate and the Foreign-student rate, but visually emphasize the viewer's matching rate (Arabic for the persona). The matching rate uses larger font + bold weight + accent color; the non-matching rate is shown as a smaller secondary "comparison line" with muted weight.

**Rationale**: Resolves the contradiction between FR-016 (originally "visually balanced") and the Edge Case (originally "emphasize matching rate"). The clarification chose the emphasis pattern because:
1. Both rates remain transparent on every card → dual-pricing narrative preserved.
2. The viewer's applicable rate is unmissable → reduces misreading risk.
3. Matches established e-commerce patterns where the applicable price is foregrounded.

**Concrete visual pattern** (used on browse-courses cards, course-details pricing matrix, and session rows):

```html
<!-- Matching rate (Arabic, viewer's rate) -->
<div class="text-2xl font-bold text-accent-700">
  600 <span class="text-base font-medium">ر.س / شهر</span>
</div>
<!-- Comparison rate (Foreign, smaller) -->
<div class="text-xs text-text-muted mt-1">
  للطلاب غير الناطقين بالعربية: <span class="font-semibold text-text-base">200 USD / شهر</span>
</div>
```

**Alternatives considered**:
- Show both rates at equal size (originally FR-016). Rejected — Q1 chose Option B.
- Show only the matching rate, hide the other (Q1 Option C). Rejected — would lose the dual-pricing narrative on the catalog surfaces.

---

## R5. Course choice for `course-details.html` (Q3 clarification)

**Decision**: `course-details.html` showcases the **Quran path Level 3 course** ("أحكام الميم الساكنة وحفظ الجزء الثلاثين") — the persona's currently-enrolled course from Spec 002. The page mixes the marketing surface (overview, pricing matrix, curriculum, teacher profile) with the enrolled-only sections (تقدّمك في هذه الدورة, parent confidence) all describing the same course.

**Rationale**: The persona is already on this course per Spec 002 dashboard. Showing the same course on the details page makes the enrolled-state sections (FR-037, FR-038) populate naturally with data already validated by the dashboard. Marketing content describing the same course doesn't conflict; prospective viewers can ignore the enrolled sections (they're clearly marked).

**Sample data continuity** with Spec 002:
- Title: `أحكام الميم الساكنة وحفظ الجزء الثلاثين`
- Course path: `مسار القرآن الكريم — المستوى الثالث`
- Teacher: `الأستاذ أحمد بن عبد الله` (matches dashboard upcoming-session card)
- Current progress: 60% (matches dashboard path-progress block)
- Current milestone: `أحكام الميم الساكنة — تطبيق عملي` (matches dashboard milestone caption)
- Parent confidence stats: attendance 92%, homework commitment 85%, last note quote, next evaluation 12 مايو 2026 (matches dashboard parent-confidence card)

**Alternatives considered**:
- Showcase a different prospective course (e.g., اللغة الإنجليزية). Rejected — would require duplicating teacher profiles, curriculum data, and a separate parent-confidence dataset, and would orphan the enrolled-only sections.
- Build two `course-details-*.html` files (one enrolled variant, one prospective variant). Rejected — doubles the maintenance surface for marginal narrative gain.

---

## R6. Per-session-paid narrative anchor (Q4 + Q5 clarifications)

**Decision**: `live-session-details.html` and `session-checkout-preview.html` both anchor to the **"حزمة المراجعة الشهرية" 4-session bundle** — a supplementary set of four 1:1 review sessions with الأستاذ أحمد, scheduled before the monthly Quran exam (5 مايو 2026), priced at 4 × 75 ر.س = 300 ر.س base + 15% VAT (45 ر.س) = **345 ر.س total** for an Arabic student. Foreign-student equivalent: 4 × 25 USD = 100 USD base + 15% VAT.

**Rationale**: The persona is on a full-course subscription per Spec 002. To showcase the per-session-payment business model (Constitution Principle VI), the natural fit is an *extra* bookable item outside the subscription — a supplementary review bundle with the same teacher. This:
- Demonstrates that even subscribed students can book extras à la carte.
- Stays anchored to the same teacher (الأستاذ أحمد) the dashboard already names.
- Connects to the monthly exam (5 مايو 2026) the weekly-plan page's countdown banner already establishes.
- Naturally triggers the unpaid payment-status block (FR-055) on session-details.

**Q5 numerics** (Decision detail):
- Base price: 300 ر.س (4 sessions × 75 ر.س)
- VAT: 45 ر.س (15% × 300)
- Subtotal: 345 ر.س
- Family balance available: 750 ر.س
- Family balance applied (capped, FR-063): 200 ر.س
- Amount due after credit: **145 ر.س**
- Payment-method radios stay active because amount due > 0 (FR-064 satisfied).
- The "balance covers fully" edge case (FR-067) remains documented as an alternative variant — not the default state.

**Alternatives considered**:
- Cross-subject single session (Q4 Option B). Rejected — would require introducing a second teacher and breaking the Quran-anchored narrative.
- Switch the persona to a per-session-only model (Q4 Option C). Rejected — would invalidate Spec 002's dashboard hero copy.
- Default to the balance-covers-fully state (Q5 Option B). Rejected — would force the payment-method radios into a disabled state by default, hiding the canonical payment-method UI pattern.
- Lower the family balance below 75 ر.س (Q5 Option C). Rejected — breaks consistency with Spec 002's 750 ر.س balance.

---

## R7. Missed-tab population (Q2 clarification)

**Decision**: Populate the "فائتة" tab on `live-sessions.html` with **≥ 2 missed-session rows**. Each missed row uses the missed-state status pill from the Spec 001 catalog ("فائت"), no join button, and an "إعادة الجدولة" link.

**Rationale**: Resolves the contradiction between FR-043 (originally "≥ 2 missed rows") and the Edge Case (originally "celebratory empty state"). Q2 chose to populate so the row design is exercised; the empty-state copy stays in Edge Cases as documentation of the empty-data fallback only.

**Sample missed sessions**:
1. حصة "أحكام النون الساكنة — مراجعة" — 22 أبريل 2026 (الأسبوع الماضي) — لم يحضر بسبب انقطاع الإنترنت — "إعادة الجدولة"
2. حصة "تجويد سورة الواقعة" — 15 أبريل 2026 — لم يحضر بدون عذر مسجّل — "إعادة الجدولة"

These are sample-data continuity items: both happened *before* the dashboard's "current week" (27 أبريل – 3 مايو 2026 per Spec 002 weekly-plan), so they don't conflict with the dashboard's 92% attendance claim (still valid: 92% over the full month, with 2 missed early sessions counted in).

**Alternatives considered**: Show the celebratory empty state (Q2 Option B) — rejected. Show both populated rows AND a small "if there were no missed sessions, this is what would show" preview (Q2 Option C) — rejected as visually noisy.

---

## R8. Course catalog data — eight courses across five subjects

**Decision**: `browse-courses.html` displays exactly **8 course cards** in the responsive grid (1-col mobile / 2-col tablet / 3-col desktop / 4-col xl), distributed across the 5 subjects:
1. **القرآن الكريم — المستوى الثالث** (Quran, group, Recommended badge — matches persona's enrolled course)
2. **القرآن الكريم — المستوى الأول** (Quran, group, Popular badge)
3. **اللغة العربية — البلاغة والإنشاء** (Arabic, group, New badge)
4. **اللغة العربية — قواعد النحو الميسّرة** (Arabic, private)
5. **اللغة الإنجليزية — للناطقين بالعربية** (English, group, Popular badge)
6. **اللغة الإنجليزية — محادثة متقدّمة** (English, private)
7. **الرياضيات — للمرحلة المتوسطة** (Math, group)
8. **الدراسات الإسلامية — السيرة النبوية** (Islamic Studies, group, Recommended badge)

**Rationale**: 8 cards fills the 4-col xl grid into two complete rows (4 × 2 = 8) with no half-rows. Subject distribution covers all five filters (Quran ×2, Arabic ×2, English ×2, Math ×1, Islamic Studies ×1) so each filter chip would have a non-empty result if filtering were active. Both session types appear (group ×6, private ×2). At least 4 cards carry corner badges (Recommended ×2, Popular ×2, New ×1) → satisfies FR-015 ("at least 3 cards carry a corner badge").

**Pricing**: Each course has 4 prices recorded (Arabic full / Foreign full / Arabic per-session / Foreign per-session). Sample range: Arabic full 400-700 ر.س / month; Foreign full 150-250 USD / month; Arabic per-session 60-100 ر.س; Foreign per-session 20-35 USD.

**Alternatives considered**: 6 or 9 cards. Rejected — 6 doesn't satisfy FR-013 (≥ 8); 9 leaves an awkward half-row at xl.

---

## R9. My-courses content composition

**Decision**: `my-courses.html` shows **3 active courses** (Quran Level 3 ✓ matches dashboard, اللغة العربية، الدراسات الإسلامية) + **1 completed course** (القرآن الكريم — المستوى الأول completed in 2025).

**Rationale**: FR-021 requires ≥ 3 active; FR-022 requires ≥ 1 completed. Three actives across three subjects keeps the page diverse without overwhelming the layout. The completed Quran Level 1 also reinforces the persona's curriculum progression (Spec 002 path-progress block: Level 1 ✓, Level 2 ✓, Level 3 active, Level 4 locked) — adding "Level 1" as a completed *course* (with certificate) ties cleanly to the journey timeline.

**Payment-model captions** (FR-023):
- Quran Level 3: "اشتراك كامل" (matches Spec 002 narrative)
- اللغة العربية: "اشتراك كامل"
- الدراسات الإسلامية: "حصص مدفوعة فردياً" (introduces the per-session model variant)
- Quran Level 1 (completed): "اشتراك كامل"

The "حصص مدفوعة فردياً" variant on the Islamic Studies card includes a small caption clarifier per Edge Case bullet ("3 من 8 حصص مدفوعة مكتملة") so the per-session model isn't confused with curriculum progress.

**Alternatives considered**: 5 actives + 2 completed (more populated but visually crowded). Rejected — 4 cards in two rows is the cleanest layout at desktop.

---

## R10. Pricing matrix layout on `course-details.html`

**Decision**: The 4-combination pricing matrix on `course-details.html` is rendered as **2 side-by-side cards at md+** (Arabic-full | Foreign-full) **stacked above another 2 side-by-side cards** (Arabic-per-session | Foreign-per-session). At mobile (< md) all four cards stack vertically. Each of the four cards uses a tinted background per its student-type / payment-model combination so the cells are scannable at a glance.

**Rationale**: All four combinations must be visible without further interaction (FR-034 / SC-003). A 2×2 grid is the cleanest layout. The two payment models (full / per-session) are stacked rows; the two student types (Arabic / Foreign) are columns. The viewer's rate (Arabic — both rows of the Arabic column) is visually emphasized per R4 (bolder + accent color); the Foreign column is shown as a comparison column with smaller weight.

**Alternatives considered**: A toggle-switch between Arabic and Foreign with per-payment-model rows below (Q3 Option A / Spec assumption originally). Rejected — Q3 confirmed the matrix layout (4 visible cards) is the chosen approach. A single 4-row table. Rejected — table reads densely; cards offer better breathing room.

---

## R11. Calendar view scope on `live-sessions.html`

**Decision**: The calendar view on `live-sessions.html` is a **static month grid** for **مايو 2026** (a one-month forward look from the dashboard's "current week"), rendered always (no JS toggle), with session-marker dots placed on the dates carrying upcoming sessions. The list/calendar segmented control is a CSS-only "switcher" indicating which view is active; both views are always present in the DOM.

**Rationale**: FR-044 requires a list/calendar view toggle but Principle V doesn't sanction a "view switcher" JS handler (would be a 5th category). Rendering both views simultaneously and letting the user scroll between them eliminates the need for a JS toggle — the segmented control is purely a navigational hint. The calendar shows مايو 2026 (the month containing the monthly exam on 5 مايو) so the page surfaces the exam-week visually.

**Calendar markers**: 7-9 dots placed on dates with sessions:
- 1 مايو, 3 مايو, 5 مايو (exam day, special marker), 6 مايو, 8 مايو, 12 مايو, 15 مايو, 17 مايو, 22 مايو
- Each dot uses the corresponding session-type color (success for group, accent for private)

**Alternatives considered**: Add a 5th JS handler for the toggle. Rejected — violates Principle V. Hide the calendar view entirely and ship only the list. Rejected — FR-044 explicitly requires both views.

---

## R12. Live-session-details — single page with completed-state annotation

**Decision**: `live-session-details.html` is **one page** showing the upcoming-state markup as the primary content (anchored to the Q4-clarified bundle session #1). A small inline annotation block ("في الحصة المكتملة، يظهر هنا...") describes what the completed variant would change — replacing the join button with attendance status, adding a teacher-note section, and showing recording availability.

**Rationale**: Q5 + the Assumptions section already locked this. Rationale: keeps the file count manageable, avoids a second near-duplicate `live-session-details-completed.html`, and makes both states comprehensible from one page.

**Annotation pattern**:

```html
<aside class="bg-info-50 border border-info-200 rounded-lg p-4 mt-6">
  <p class="text-xs text-info-700 font-semibold uppercase tracking-wide mb-2">
    معاينة الحالة بعد انتهاء الحصة
  </p>
  <p class="text-sm text-text-base leading-7">
    عند اكتمال الحصة، يُستبدل زر "انضمام إلى الحصة" بمؤشّر حضورك (تمّ الحضور / لم تحضر)،
    ويظهر قسم "ملاحظات المعلم" بتعليق الأستاذ أحمد، وزر "عرض التسجيل"
    (أو نص "التسجيل غير متاح" إن لم يكن متوفّراً).
  </p>
</aside>
```

**Alternatives considered**: Two separate HTML files. Rejected — duplicates the shell + maintenance. A single page with a JS toggle. Rejected — would add a 5th JS category.

---

## R13. CSS budget and Tailwind utility coverage

**Decision**: Six new pages add an estimated **+5 to +8 KB** to `output.css` after `npm run build:css`. Current size at end of Spec 002: ~41 KB. Projected after this feature: ≤ 49 KB. Budget ceiling: 80 KB. Headroom: ≥ 31 KB.

**Rationale**: Most utilities used by these pages are already present in the compiled CSS (grid, gap, padding, border tokens, color palette, badge variants). New utilities likely introduced: a few specific column spans for the 2×2 pricing matrix, the calendar grid layout (`grid-cols-7`), the `radio-card` styling (Tailwind utilities only, no custom CSS), and segmented-control styling. Tailwind purges unused utilities via the `content` glob in `tailwind.config.js` which already covers `pages/**/*.html`, so all six new pages are scanned automatically.

**Alternatives considered**: Adding custom CSS classes in `input.css`. Rejected — Tailwind utilities cover all needed patterns. Pre-emptively expanding the `content` glob. Not needed — already covers the new files via `pages/**/*.html`.

---

## R14. Sample-data persona continuity table

**Decision**: All sample data across the six pages anchors to the Spec 001 §E2 / Spec 002 anchored persona. Single source of truth for cross-page values:

| Field | Value | Source |
|---|---|---|
| Student name | عبد الرحمن مؤمن | Spec 001 §E2 |
| Student type | Arabic (طالب عربي) | Spec 001 §E2 |
| Family prepaid balance | 750 ر.س | Spec 002 notifications |
| Current path | مسار القرآن الكريم | Spec 001 §E2 |
| Current level | المستوى الثالث | Spec 002 dashboard |
| Current course title | أحكام الميم الساكنة وحفظ الجزء الثلاثين | Spec 002 dashboard / E2 |
| Current course progress | 60% | Spec 002 dashboard |
| Primary teacher | الأستاذ أحمد بن عبد الله | Spec 002 upcoming-session |
| Teacher avatar initials | أ.أ | Spec 002 upcoming-session |
| Attendance rate | 92% | Spec 002 parent confidence |
| Homework commitment | 85% | Spec 002 parent confidence |
| Next monthly evaluation | 12 مايو 2026 | Spec 002 parent confidence |
| Monthly exam date | 5 مايو 2026 | Spec 002 weekly-plan |
| Persona's current week | 27 أبريل – 3 مايو 2026 | Spec 002 weekly-plan |
| Latin-digits-only inside Arabic | Yes | Spec 002 SC-006 |
| Currency conventions | Arabic ر.س, Foreign USD | Spec 003 spec.md Assumptions |

This table is the single source of truth — every page's hard-coded data MUST match these values verbatim.

---

## Summary

All five clarifications resolved. No outstanding `NEEDS CLARIFICATION` markers. Constitution Check passes for all six principles. CSS budget headroom is comfortable. Zero new JS handlers; the existing `data-tabs` handler from Spec 001 powers the live-sessions tabs. Persona continuity with Spec 001 + Spec 002 is locked via R14. Phase 1 (data model + contracts + quickstart) can proceed.
