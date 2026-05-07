# Contract: UI Kit Inventory (`pages/ui-kit.html`)

**Feature**: `001-frontend-foundation`
**Acceptance gate**: Every category below MUST appear on `pages/ui-kit.html` with at least one rendered example. SC-004 requires 100% coverage of FR-014 categories. SC-010 requires ≥18/19 status badges.

The UI Kit page itself uses the **app shell** (sidebar + header + main content), with the Admin sidebar (since the UI kit is most relevant to admins/designers). The header `pageTitleAr` is `دليل الواجهة وعناصر التصميم` and `pageSubtitleAr` is `إصدار 1.0 — مرجع التصميم`.

The main content is divided into sections. Each section heading uses the `text-lg font-bold` token. Within a section, the live examples are arranged in a card grid (`grid grid-cols-1 md:grid-cols-2 gap-4` by default — sections may override).

---

## Sections (in display order)

### 1. Colors
- 10 swatch tiles, one per token family (`primary`, `accent`, `success`, `warning`, `danger`, `info`, `surface`, `text-base`, `text-muted`, `slate`).
- Each tile shows the principal shade, the role label, and the hex value.

### 2. Typography
- Live examples of each hierarchy level from `design-tokens.md` (Page title, Section title, Card title, Body text, Muted helper text, Stat number).
- Each example uses a realistic Arabic sentence, e.g., `العنوان الرئيسي للصفحة — منصة إدارتي التعليمية`.

### 3. Buttons
- Variants: Primary (`bg-primary-700 text-white`), Secondary (`bg-white text-primary-700 border-primary-200`), Accent (`bg-accent-500 text-primary-900`), Ghost (`bg-transparent text-primary-700 hover:bg-primary-50`), Danger (`bg-danger-600 text-white`).
- Sizes: `sm` (`px-3 py-1.5 text-xs`), `md` (`px-4 py-2 text-sm`, default), `lg` (`px-5 py-2.5 text-base`).
- States: default, hover (via CSS), disabled (`opacity-60 cursor-not-allowed`).
- Each button has a clear text label (FR-034); an icon-only button variant is shown but with `aria-label` and the requirement noted that text is preferred.

### 4. Cards
- Default card (`bg-white rounded-xl shadow-sm p-6 border border-slate-100`).
- Card with header + body + footer.
- Card with stat (number + delta + sparkline placeholder).

### 5. Tables
- A simple roster table with 5 sample rows referencing real personas (e.g., students with course, status badge, last attendance).
- Header row uses `bg-surface-50 text-text-muted text-xs uppercase tracking-wide`.
- Wrapped in `<div class="overflow-x-auto rounded-lg border border-slate-200">` per app-shell.md overflow rules.

### 6. Form inputs
- Text input with label, helper text, and error state.
- Required indicator visible (asterisk + `aria-required="true"`).

### 7. Select dropdowns
- Native `<select>` styled via `@tailwindcss/forms`.

### 8. Textareas
- 3-row textarea with label and char-count helper.

### 9. Checkboxes
- Standalone checkbox + group of 3 with shared label group.

### 10. Radio buttons
- Group of 3 in a card.

### 11. Toggle switches
- 3 toggles (off, on, disabled). Pure CSS using a `<label>` wrapping a hidden checkbox.

### 12. Badges
- All 19 status badges from `data-model.md § E6`, in a single section laid out as a flex-wrap. SC-010 gate.

### 13. Alerts
- 4 variants: success, warning, danger, info — each with an icon and a dismissable `×` (visual only — no JS dismissal in this spec).

### 14. Empty states
- 3 examples, each with: an illustration placeholder, an Arabic explanation of what's missing, and a primary action button suggesting the next step (FR-017).
  - Example 1: "لا توجد واجبات مستحقة" / Action: `استعراض الدورات`.
  - Example 2: "لم يتم رفع شهادات بعد" / Action: `طلب شهادة`.
  - Example 3: "لا توجد رسائل غير مقروءة" / Action: `العودة للوحة الرئيسية`.

### 15. Progress bars
- 3 examples at 25%, 60%, 92% — each labeled with a course name (`القرآن الكريم — 60%`).
- Uses `bg-success-500` for ≥75%, `bg-accent-500` for 40–74%, `bg-warning-500` for <40%.
- Track is `bg-slate-100`.

### 16. Timeline
- A vertical timeline of 4 events from a student's recent week (live session attended, homework submitted, exam upcoming, certificate earned). Each entry uses the relevant status badge.

### 17. Stat cards
- A row of 4 stat cards representing the Admin dashboard's primary KPIs: students, teachers, active courses, monthly revenue.
- Each card: title (muted), large number (`text-3xl font-extrabold tabular-nums`), delta indicator (small badge, e.g., `+12 هذا الشهر`).

### 18. Modal style
- An always-visible *static* modal preview (not actually opened/closed — that's demonstrated via the Tabs section's docs OR via the dashboard pages). Shows: title, body copy, **explicit Cancel + Confirm buttons** (FR-037), close × in the corner.

### 19. Tabs style
- 3 tabs (e.g., `الواجبات الحالية`, `المسلَّمة`, `قيد المراجعة`), default first tab active. Tab switching is wired via `assets/js/main.js` (one of the 4 sanctioned JS interactions per Principle V).

### 20. Breadcrumb style
- A 3-level breadcrumb (e.g., `الرئيسية / المعلمون / أ. أحمد البكري`).
- Separators use Lucide `chevron-left` (which in RTL must be flipped via `rtl:rotate-180` so the chevron points naturally — toward the start of the trail).

### 21. Avatar style
- 4 avatars (one per role) from E2, sized 40 px and 56 px.
- Plus a "stack" example showing 4 overlapping student avatars (e.g., classroom roster).

---

## Anti-patterns documented inline

The UI Kit page MUST also include a small "Don't" callout box at the very bottom listing forbidden patterns:
- ❌ Color as the only signal on a badge or alert.
- ❌ Eastern Arabic-Indic digits inside copy.
- ❌ JavaScript-rendered card content.
- ❌ `#` placeholder links anywhere.
- ❌ English filler in primary user flows.

This serves as a visible reminder for future page authors and as a stakeholder-facing assertion of the design rules.
