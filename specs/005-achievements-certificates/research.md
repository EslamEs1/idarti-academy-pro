# Phase 0 Research — Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

This document consolidates the technical decisions, content sourcing, and clarification outcomes that bound the implementation of the eight new pages of Spec 005. Each section follows the **Decision / Rationale / Alternatives considered** format. There are no remaining `NEEDS CLARIFICATION` items — the single `/speckit-clarify` Q&A bullet from `spec.md §Clarifications` is folded in.

---

## R1. Page count and structural strategy

**Decision**: Build eight independent static HTML files, each fully self-contained, hard-embedding the appropriate sidebar (student or admin) and the bell-as-anchor header. No runtime include mechanism.

**Rationale**: Constitution Principle II — every page complete and self-contained. Specs 001-004 already shipped 18 pages this way; the convention is locked. The eight pages split clean as 6 student + 2 admin, with no shared components.

**Alternatives considered**:

- A single SPA with hash-routing for the certificates sub-pages. Rejected — banned by Principle I/V.
- One certificate-preview HTML file per certificate (4 student-side + ≥ 8 admin-side variants). Rejected — would balloon the page count to 20+ and break the `file://` openability guarantee. Instead, one preview file shows the persona's Quran L1 certificate and acts as the canonical preview pattern.

---

## R2. Sidebar and header — zero-delta reuse

**Decision**: Embed the existing sidebars exactly as Specs 001-004 left them. No new entries on either role.

**Rationale**: Spec 001's student sidebar already contains "الإنجازات" → `achievements.html` (line 87 of dashboard). The admin sidebar already contains "الشهادات" → `certificates.html` (line 111 of admin/dashboard). Both entries become canonical destinations only after this feature ships.

**Active-entry mapping** (FR-002):

| Page | Sidebar | Active entry |
|---|---|---|
| `pages/student/achievements.html` | Student (15) | `الإنجازات` |
| `pages/student/certificates.html` | Student (15) | `الإنجازات` |
| `pages/student/certificate-preview.html` | Student (15) | `الإنجازات` |
| `pages/student/monthly-exams-passed.html` | Student (15) | `الإنجازات` |
| `pages/student/completed-levels.html` | Student (15) | `الإنجازات` |
| `pages/student/badges.html` | Student (15) | `الإنجازات` |
| `pages/admin/certificates.html` | Admin (18) | `الشهادات` |
| `pages/admin/create-certificate.html` | Admin (18) | `الشهادات` |

**Admin sidebar enumeration** (full 18 entries, verbatim from `pages/admin/dashboard.html`): (1) الرئيسية → `dashboard.html`, (2) الطلاب → `students.html`, (3) العائلات → `families.html`, (4) المعلمون → `teachers.html`, (5) الدورات → `courses.html`, (6) الحصص المباشرة → `live-sessions.html`, (7) الواجبات → `assignments.html`, (8) الاختبارات → `exams.html`, (9) **الشهادات → `certificates.html`** (active on this feature's admin pages), (10) التقارير → `reports.html`, (11) المدفوعات → `payments.html`, (12) الفواتير → `invoices.html`, (13) إعدادات الضريبة → `tax-settings.html`, (14) أرصدة العائلات → `family-balances.html`, (15) مالية المعلمين → `teacher-finance.html`, (16) الأدوار والصلاحيات → `roles-permissions.html`, (17) المجتمع التعليمي → `social-hub.html`, (18) إعدادات المنصة → `platform-settings.html`. Plus the Log Out link at the sidebar footer.

**Alternatives considered**: Showing no active entry on the certificate-preview drill-down (per Spec 003 R2's drill-down convention). **Rejected** — same as Spec 004's reasoning: certificate-preview is conceptually under the Achievements cluster, so preserving the "الإنجازات" active state keeps users anchored.

---

## R3. JavaScript scope — zero new handlers

**Decision**: No new JS handlers are added. The mobile sidebar drawer from Spec 001 carries over verbatim. None of the eight pages uses tabs, dropdowns, or modals.

**Rationale**: Constitution Principle V sanctions six JS interaction categories; none of the eight pages requires any beyond the sidebar drawer. The certificates-list filter chips are visual-only (same pattern as Specs 003/004); the admin certificates table uses visual-only filter dropdowns; the certificate-preview action cluster has zero interaction (Download/Print/Share are stubs); the create-certificate form has zero submit handler.

**Why visual-only filter chips work**: Same rationale as Spec 003/004 R3. Static row mix already demonstrates every state; runtime filtering would introduce a new JS category not on the sanctioned list.

**Alternatives considered**:

- Wire a state-aware admin row toggle (e.g., click "إصدار" button → row visually transitions to "معتمدة"). Rejected — would require new JS DOM manipulation, violating Principle V. Static row mix per FR-076 already demonstrates all three states.
- Wire a "تنزيل PDF" button to a real `<a download>` linking at a placeholder PDF asset. Rejected — would require committing a binary asset to the repo (Spec 001's lean-asset convention forbids this) and would semantically suggest the prototype "works", contradicting FR-033's prototype-notice convention.

---

## R4. Admin per-row action state-awareness (Q1 clarification)

**Decision**: The admin certificates table renders 4 actions per row, with **state-aware** rendering driven by the row's status. The third action slot's label flips automatically; the إلغاء action visually disables on revoked rows.

**State → action mapping** (from FR-075 / Q1 clarification):

| Row status | Action 1 (عرض) | Action 2 (تعديل) | Action 3 (state-aware) | Action 4 (إلغاء) |
|---|---|---|---|---|
| **بانتظار الاعتماد** (pending) | active link | active link | **"إصدار"** (success-tinted button) | active button (danger-tinted) |
| **معتمدة** (active) | active link | active link | **"إعادة إصدار"** (info-tinted button) | active button (danger-tinted) |
| **ملغاة** (revoked) | active link | **disabled** (no edits on revoked) | **"إعادة تفعيل"** (accent-tinted button — replaces issue/re-issue) | **disabled** (already revoked) |

**Rationale**: Q1 clarification chose Option A (state-aware actions). This:

1. Mirrors how production certificate-management systems behave (action affordances vary by lifecycle state).
2. Lets reviewers see the academy's actual operational logic on the table without runtime JS — the static row mix demonstrates each state's distinct rendering.
3. Anchors FR-076's requirement that the table contain ≥ 1 row in each state, so the state-aware rendering is visually verifiable.

**Sample row inventory** (8 rows, see R8):

- 1 row in `بانتظار الاعتماد` (third-slot label: "إصدار", success tint)
- 6 rows in `معتمدة` (third-slot label: "إعادة إصدار", info tint)
- 1 row in `ملغاة` (third-slot label: "إعادة تفعيل", accent tint; row visually muted with opacity-60 + strikethrough title)

**Visual cues that pair color with text** (FR-096): each third-slot button has a distinct icon — `check-circle` for إصدار, `send` or `repeat` for إعادة إصدار, `rotate-ccw` for إعادة تفعيل. This satisfies the "color is never the sole indicator" rule.

**Alternatives considered**:

- Uniform 4 actions on every row (Option B from Q1). Rejected — generic permissive table, doesn't match real workflows.
- Single primary CTA per row (Option C). Rejected — loses granularity; admins need direct access to View / Edit / Revoke as separate operations.

---

## R5. Persona / cross-spec continuity table

**Decision**: All sample data anchors to the persona table locked through Specs 001-004 §R14 + a few new attributes for this feature:

| Attribute | Value | Source |
|---|---|---|
| Student name | عبد الرحمن مؤمن | Spec 001 §E2 / verified in Spec 004 implementation |
| Avatar initials | ع.م | Verified in dashboard line 215 |
| Path | القرآن الكريم — المستوى الثالث (60% progress) | Spec 002 / 003 |
| Primary teacher (Quran) | الأستاذ أحمد بن عبد الله | Spec 003 §R14 / verified in Spec 004 |
| First certificate date | 5 يناير 2026 | Spec 002 dashboard line 749 ("نيل أول شهادة معتمدة") |
| First certificate title | شهادة إتمام المستوى الأول | Spec 002 learning-journey line 441 |
| Homework Hero badge date | 15 يناير 2026 | Spec 002 learning-journey line 463 |
| Today's date | 2026-05-08 | Spec 003 / 004 anchor (carried forward) |

New attributes for Spec 005:

- **Cumulative monthly-exam average**: 86.6% (computed from the 5 exam scores: 88+95+82+78+90 = 433 / 5 = 86.6).
- **Quran L2 completion date**: 1 مارس 2026 (introduced in this feature; consistent with persona being in L3 at 60% progress on 8 May 2026 — L2 completed ~2 months prior).
- **Quran L1 completion date**: 20 ديسمبر 2025 (carried from Spec 003 my-courses completed-card).
- **Family name on attendance certificate**: signed by "إدارة الأكاديمية" rather than a specific teacher (the attendance award is administrative, not teacher-issued).

**Alternatives considered**: Reusing only the dashboard milestones without inventing new attributes. Rejected — the spec needs L2 completion date + cumulative exam average, and these can be derived consistently from the existing persona timeline.

---

## R6. Certificate inventory — student-side (4 certificates)

**Decision**: The certificates list ships with exactly 4 certificate cards. Each is anchored to a real persona milestone.

**Sample inventory**:

| # | Title | Type | Course / Level | Teacher / Issuer | Issue date | Reason | Status |
|---|---|---|---|---|---|---|---|
| 1 | شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد | إتمام مستوى | القرآن الكريم — L1 | الأستاذ أحمد بن عبد الله | 5 يناير 2026 | إتمام جميع متطلبات المستوى الأول بتقدير ممتاز | معتمدة |
| 2 | شهادة إتمام المستوى الثاني — مدّ الحروف وأحكام النون الساكنة | إتمام مستوى | القرآن الكريم — L2 | الأستاذ أحمد بن عبد الله | 5 مارس 2026 | إتمام جميع متطلبات المستوى الثاني بتقدير ممتاز | معتمدة |
| 3 | شهادة التميّز الشهري — مارس 2026 | تميّز شهري | القرآن الكريم — L2 | الأستاذ أحمد بن عبد الله | 15 أبريل 2026 | أعلى درجة في اختبار شهر مارس (95%) | معتمدة |
| 4 | شهادة الالتزام بالحضور — الفصل الثاني 2025-2026 | حضور والتزام | الفصل الثاني الكامل | إدارة الأكاديمية | 10 أبريل 2026 | حضور 92% خلال الفصل الثاني | معتمدة |

**Featured certificate**: Card 1 (Quran L1) — anchored to the dashboard's "نيل أول شهادة معتمدة" milestone, surfaced on the achievements hub as `الشهادة المميَّزة`.

**Certificate ID format**: `IDR-{YYYY}-{COURSE}-{NNNN}` per Assumptions. Sample IDs: Cert 1 = `IDR-2026-Q01-0042`, Cert 2 = `IDR-2026-Q02-0044`, Cert 3 = `IDR-2026-MEXC-0103`, Cert 4 = `IDR-2026-ATT-0078`.

**Rationale**: 4 cards is enough to demonstrate certificate variety (3 of the 5 types — إتمام مستوى, تميّز شهري, حضور والتزام) and anchor the achievements hub's "4 certificates" summary card. The other 2 types (إجازة قرآنية, جائزة خاصة) are covered by the admin-side inventory in R8.

---

## R7. Badge inventory (7 badges per FR-061 + FR-064)

**Decision**: The badges page ships with exactly 7 badge tiles covering all the types in the user's brief. Each carries its locked accent hue from FR-063 and the sample dates from FR-064.

**Sample inventory**:

| # | English name | Arabic name | Hue (FR-063) | Earned date | Reason | Visibility |
|---|---|---|---|---|---|---|
| 1 | Attendance Star | وسام الحضور المتميّز | success-500 | 10 أبريل 2026 | حضور 92% خلال الفصل الثاني | مرئي |
| 2 | Homework Hero | بطل الواجبات | accent-500 | 15 يناير 2026 | تسليم جميع الواجبات في موعدها 3 أشهر متتالية | مرئي |
| 3 | Top of Class | أوّل الفصل | primary-700 | 20 أبريل 2026 | أعلى درجة بين زملائك في القرآن الكريم — المستوى الثالث | مرئي |
| 4 | Most Improved | الأكثر تطوراً | info-500 | 5 مارس 2026 | تحسّن 25% في درجات اختبارات شهر مارس مقارنة بفبراير | مرئي |
| 5 | Quran Progress | متقن القرآن | warning-500 | 1 مارس 2026 | إتقان أحكام النون الساكنة بتقدير ممتاز | خاص |
| 6 | Monthly Excellence | وسام التميّز الشهري | rose-500 | 15 أبريل 2026 | أعلى أداء شهري في الفصل — مارس 2026 | مرئي |
| 7 | Consistency Badge | وسام المثابرة | emerald-500 | 25 أبريل 2026 | حضور بدون انقطاع لمدة 30 يوماً متتالياً | خاص |

**Visibility mix**: 5 مرئي + 2 خاص (satisfies FR-065's "≥ 5 مرئي + ≥ 1 خاص" rule).

**Icon-to-hue rationale**: each badge gets a distinct Lucide icon paired with its hue: Attendance Star = `star`, Homework Hero = `award`, Top of Class = `trophy`, Most Improved = `trending-up`, Quran Progress = `book-open`, Monthly Excellence = `medal`, Consistency Badge = `target`. Color is paired with icon and Arabic name — never alone (FR-096).

**Alternatives considered**: Showing some badges as locked/unearned (e.g., 5 earned + 2 locked). Rejected — the prototype's purpose is to *celebrate* the persona's progress; locked badges would add a "you haven't earned this yet" dampener that contradicts the motivational intent. The empty-state pattern is documented in Edge Cases for the alternative scenario.

---

## R8. Admin certificate inventory (8 rows on admin/certificates.html)

**Decision**: The admin queue ships with exactly 8 sample rows covering ≥ 5 distinct students, ≥ 4 certificate types, and the three states (1 pending + 6 active + 1 revoked) so the state-aware action rendering (R4 / Q1 clarification) is fully demonstrable.

**Sample inventory**:

| # | Student | Course / Level | Teacher | Type | Issue date | Status | Action 3 label |
|---|---|---|---|---|---|---|---|
| 1 | عبد الرحمن مؤمن | القرآن L3 (anticipated) | الأستاذ أحمد بن عبد الله | إتمام مستوى | اليوم — 8 مايو 2026 | بانتظار الاعتماد | إصدار |
| 2 | عبد الرحمن مؤمن | القرآن L1 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 5 يناير 2026 | معتمدة | إعادة إصدار |
| 3 | عبد الرحمن مؤمن | القرآن L2 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 5 مارس 2026 | معتمدة | إعادة إصدار |
| 4 | محمد السعيدي | القرآن L1 | الأستاذ أحمد بن عبد الله | إتمام مستوى | 12 ديسمبر 2025 | معتمدة | إعادة إصدار |
| 5 | ليلى المنصور | اللغة العربية — النحو | الأستاذة سلمى الحارثي | تميّز شهري | 18 أبريل 2026 | معتمدة | إعادة إصدار |
| 6 | فيصل العتيبي | القرآن — إجازة الجزء الثلاثين | الشيخ عبد الله الراشد | إجازة قرآنية | 1 أبريل 2026 | معتمدة | إعادة إصدار |
| 7 | أحمد الغامدي | الدراسات الإسلامية — السيرة | الشيخ عبد الله الراشد | جائزة خاصة | 22 مارس 2026 | معتمدة | إعادة إصدار |
| 8 | سارة الحربي | الرياضيات — الأساسيات | الأستاذ عمر الزهراني | إتمام مستوى | 10 فبراير 2026 | ملغاة | إعادة تفعيل |

**Type coverage**: All 5 certificate types present — إتمام مستوى (rows 1, 2, 3, 4, 8 = 5 rows), تميّز شهري (row 5), إجازة قرآنية (row 6), جائزة خاصة (row 7), حضور والتزام (admin sample omits this; persona's attendance cert appears on student-side certificates.html as Card 4 but the admin queue keeps the variety to demonstrate the 5 type pills — alternatively, swap row 8 to حضور والتزام if needed; the visible spread already covers 4 types in the active rows).

Actually, to ensure the admin queue covers ≥ 4 distinct certificate types (FR-074), revise: row 8's type is `حضور والتزام` (e.g., a revoked attendance certificate for سارة that was rescinded due to data correction). Updated row: `8. سارة الحربي / الفصل الأول 2024-2025 / إدارة الأكاديمية / حضور والتزام / 10 فبراير 2026 / ملغاة / إعادة تفعيل`. This brings type coverage to 5 distinct types in the admin queue.

**State spread**: 1 pending (row 1, "إصدار" + active danger إلغاء) + 6 active (rows 2-7, "إعادة إصدار" + active إلغاء) + 1 revoked (row 8, visually muted + "إعادة تفعيل" + disabled إلغاء). Each state is visible without interaction.

**Cross-page anchor**: Rows 2 + 3 are the persona's active certificates — same titles, same dates, same teachers as the student-side `certificates.html` Cards 1 + 2. Reviewers walking the admin → student chain see the same data on both sides.

**Rationale**: 8 rows is enough to cover all states + types without bloating the page. Spec 004's R9 used the same 8-row count for the teacher's homework queue.

---

## R9. Achievement timeline scope on the hub

**Decision**: The achievements-hub timeline (FR-013) shows ≥ 5 chronologically-ordered milestones spanning the most recent ~5 months (December 2025 → May 2026). Older milestones (e.g., enrollment in September 2025) are not surfaced here — they live on the learning-journey page (Spec 002) which is the comprehensive history.

**Sample timeline** (6 milestones in reverse-chronological order — newest first):

1. **25 أبريل 2026** — وسام المثابرة — حضور بدون انقطاع لمدة 30 يوماً متتالياً.
2. **20 أبريل 2026** — وسام أوّل الفصل — أعلى درجة في القرآن الكريم — المستوى الثالث.
3. **15 أبريل 2026** — شهادة التميّز الشهري — مارس 2026 (95% في الاختبار الشهري).
4. **10 أبريل 2026** — وسام الحضور المتميّز — حضور 92% خلال الفصل الثاني.
5. **5 مارس 2026** — وسام الأكثر تطوراً — تحسّن 25% في درجات اختبارات شهر مارس.
6. **1 مارس 2026** — شهادة إتمام المستوى الثاني — أحكام النون الساكنة.

**Rationale**: Reverse-chronological order matches the convention from Spec 002's learning-journey timeline. Showing 6 milestones (rather than the FR-013 minimum of 5) gives the hub a richer celebratory feel without overwhelming the page.

**Alternatives considered**: All-time chronological order (oldest first). Rejected — the hub is a "what you've achieved recently" snapshot, not a comprehensive history; reverse-chronological is the natural ordering. Stays compatible with the learning-journey page's all-time chronological ordering by clearly framing this as recent.

---

## R10. Certificate-preview parchment design language

**Decision**: The certificate uses cream/parchment background, gold border, deep navy text, calligraphic Tajawal weight for the persona's name, and decorative frame elements styled with Spec 001 design tokens.

**Specific Tailwind tokens** (per FR-030 / FR-031):

- Background: `bg-amber-50` (cream/parchment tint).
- Border: `border-4 border-accent-500` (gold) with optional inner double-line via `ring-2 ring-accent-300 ring-offset-2 ring-offset-amber-50`.
- Text: `text-primary-900` (deep navy) for body; `text-accent-700` for accent labels; persona name in `text-primary-900 font-extrabold` at the largest size on the page (`text-4xl md:text-5xl lg:text-6xl`).
- Decorative ornament strip: a horizontal SVG flourish styled in `text-accent-500`, ~40px tall.
- Academy seal: a circular SVG (border-2 border-accent-600, ~120px diameter) with rotated text inscription "أكاديمية إدارتي" along the border + a star-of-david-style central ornament (Lucide `award` icon).
- QR-code placeholder: a `grid grid-cols-4 gap-0.5` of small dark squares (16 cells) in `bg-primary-900` and `bg-amber-50` to suggest a QR pattern visually.

**Alternatives considered**:

- Hire-quality calligraphy fonts (e.g., Amiri or Lateef from Google Fonts). Rejected — would require adding a new font CDN load, which is a tech-stack change. Tajawal display weight is sufficient for the prototype.
- Photographic background image (parchment texture). Rejected — would require committing a binary asset to the repo (Spec 001's lean-asset convention forbids this). Solid `bg-amber-50` with decorative SVG borders is sufficient.
- Real QR-code library generation. Rejected — would require adding a new JS dependency (banned by Principle V). Decorative grid placeholder per FR-031 / Assumptions is sufficient.

---

## R11. Print stylesheet (FR-035)

**Decision**: A single `@media print` block is added to `assets/css/input.css` to support the certificate-preview's print-friendly fallback. After the edit, `npm run build:css` regenerates `output.css` to include the print rule.

**Print rule** (added to `input.css`):

```css
@media print {
  @page { margin: 0; size: A4 landscape; }
  body { background: white !important; }
  #app-sidebar, #app-header, #cp-actions, #cp-prototype-notice, [data-sidebar-backdrop] {
    display: none !important;
  }
  #cp-certificate {
    box-shadow: none !important;
    margin: 0 auto !important;
    max-width: 100% !important;
    page-break-inside: avoid;
  }
}
```

**Rationale**: Hides chrome (sidebar / header / action cluster / prototype notice / backdrop) while preserving the certificate. Uses `A4 landscape` for typical certificate paper. The `#cp-actions` and `#cp-prototype-notice` IDs are introduced in `certificate-preview.html` per the contract.

**Alternatives considered**:

- Inline `<style>` block on the certificate-preview page only. Rejected — the input.css → output.css build pipeline already handles all project-wide rules; adding a single `@media print` block is the cleanest path and doesn't require a separate stylesheet.
- A separate `print.css` file linked only on the certificate-preview page. Rejected — adds file-management overhead for a 12-line rule; the existing input.css is the right home.

This is the **only edit to a non-page file** under this feature. `tailwind.config.js`, `assets/js/main.js`, and the embedded sidebar/header partials all remain unchanged.

---

## R12. Cross-page navigation chain (matches SC-015)

**Decision**: The navigation chain validated by SC-015 is wired in the contracts as:

```text
Student chain:
  pages/student/dashboard.html
    → "عرض كل الإنجازات" link (line 674)
    → achievements.html
      → "عرض الشهادة" CTA on the featured-certificate panel
      → certificate-preview.html
        → "العودة للشهادات" link
        → certificates.html
          → "عرض الشهادة" CTA on any certificate card
          → certificate-preview.html

Cross-spec chain:
  pages/student/my-courses.html
    → completed-card "عرض الشهادة" link (line 441)
    → currently lands on achievements.html (or certificates.html depending on prior wiring)
    → both destinations are real pages after this feature ships

Admin chain:
  pages/admin/dashboard.html
    → "الشهادات" sidebar entry (line 111)
    → admin/certificates.html
      → "إصدار شهادة جديدة" primary CTA
      → admin/create-certificate.html
        → "إلغاء" link
        → admin/certificates.html
```

**Rationale**: SC-015 explicitly enumerates this chain as the closed-loop validation. Each contract file documents the inbound and outbound links so an implementer can verify the wiring page-by-page.

**Inbound links from prior specs that resolve cleanly after this feature ships**:

- `dashboard.html` line 87 (sidebar `الإنجازات`) ✓
- `dashboard.html` line 674 (`عرض كل الإنجازات`) ✓
- `learning-journey.html` line 87 (sidebar) ✓
- `weekly-plan.html` line 87 (sidebar) ✓
- `my-courses.html` line 89 (sidebar) and line 441 (completed-card `عرض الشهادة`) ✓
- All Spec 003/004 student pages (sidebar entry on each — over a dozen pages) ✓
- `pages/parent/dashboard.html` line 79 (`certificates.html`) ✓
- `pages/admin/dashboard.html` line 111 (`certificates.html`) ✓
- `pages/student/notifications.html` line 367 (`achievements.html`) ✓

**Alternatives considered**: None — all inbound links already use the correct URLs.

---

## R13. Inbound spec consistency snapshot

**Decision**: The following Specs 001-004 surfaces are validated against this feature's pages during `/speckit-implement`. No edits to those prior specs are made — only verification.

| Inbound surface | Anchor it asserts | This feature delivers |
|---|---|---|
| `dashboard.html` line 749 ("نيل أول شهادة معتمدة") | First certificate dated 5 يناير 2026 | Cert 1 on `certificates.html` + featured cert on `achievements.html` + the certificate showcased on `certificate-preview.html` (FR-091) |
| `learning-journey.html` line 455 ("بطل الواجبات" badge) | Badge name + 3-month-consecutive context + 15 يناير 2026 date | Badge 2 on `badges.html` (FR-092) |
| `learning-journey.html` line 441 ("شهادة إتمام المستوى الأول") | Same title + same date | Cert 1 on `certificates.html` (FR-091) |
| `my-courses.html` line 441 (completed-card "عرض الشهادة") | Quran L1 completion → certificate exists | Cert 1 on `certificates.html` (FR-093) |
| `my-courses.html` Quran L1 completed-card date "20 ديسمبر 2025" | L1 completion date | Listed on `completed-levels.html` Card 1 |
| `parent/dashboard.html` line 79 ("Certificates" sidebar) | Real `certificates.html` exists | Trivially satisfied |
| `admin/dashboard.html` line 111 ("الشهادات" sidebar) | Real `admin/certificates.html` exists | Trivially satisfied |
| Spec 002 dashboard parent-confidence card "92% حضور" | Persona has 92% attendance | Reflected in Attendance Star badge reason (FR-064) + Cert 4 reason (FR-023) |

**Rationale**: Anchors the prototype's narrative cohesion across all five shipped specs. Reviewers walking the cross-page chain (SC-015) MUST find every link resolves and every cross-reference reads as the same story.

**Alternatives considered**: Editing prior-spec pages to align their data with this feature. Rejected — Constitution Principle II commits each page to remain self-contained at the time of its spec; cross-spec edits would break the audit trail.

---

## R14. Featured-content state choices

**Decision**: The eight pages render these specific narrative states on first load:

| Page | Narrative state | Why this state |
|---|---|---|
| `achievements.html` | Hub for the persona's full earned achievements as of 8 May 2026: 4 certs, 5 exams, 2 levels, 7 badges. Featured = Quran L1 cert. Timeline = last ~5 months. | Maximizes celebration; aligns with dashboard milestones. |
| `certificates.html` | 4 cert cards, all in `معتمدة` state, all without download buttons. Callout banner explaining the rule. | Demonstrates the rule + the inventory; revoked certs hidden from student side per Edge Cases. |
| `certificate-preview.html` | Showcases the Quran L1 certificate (Cert 1, the featured one). | Anchored to the dashboard milestone. The page is conceptually "whichever cert you clicked to view" — the prototype renders the most prestigious / first one. |
| `monthly-exams-passed.html` | 5 passed exams (Dec 2025 → Apr 2026) with 86.6% cumulative average. | Anchored to the persona's 5-month exam history. Failed exams (if any) are not shown. |
| `completed-levels.html` | 2 completed levels (Quran L1 + L2) + L3 in-progress preview at 60%. | Mirrors the dashboard's 50% path-completion progress. |
| `badges.html` | All 7 badges earned. 5 "مرئي" + 2 "خاص" mix. | Maximizes celebration; demonstrates both visibility states per FR-065. |
| `admin/certificates.html` | 8 rows across 5 students + 5 cert types + 3 states (1 pending, 6 active, 1 revoked). The persona's 2 active certs (rows 2, 3) reconcile with student-side. | Demonstrates state-aware actions + cross-page anchor + variety. |
| `admin/create-certificate.html` | Form pre-filled with the persona's "next imaginable certificate" — Quran L3 completion form. Save/Preview/Cancel are visual stubs. | Anticipates the natural next-issuance event; demonstrates the form's full populated state. |

**Rationale**: All eight states form a coherent academy snapshot at 8 May 2026. The persona is mid-Level-3 with a growing achievements pile; the admin queue shows their pending Level-3 certificate (anticipating completion) alongside the already-issued L1 + L2 certs. Reviewers walking the chain see one consistent story.

**Alternatives considered**: Showing some pages with empty / first-time states. Rejected — the prototype's purpose is to demonstrate the populated narrative; empty states are documented in Edge Cases as fallbacks.
