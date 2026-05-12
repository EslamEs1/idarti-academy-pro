# Contract — `pages/student/leaderboard.html`

**User story**: US3 (Leaderboard, P1) — see spec.md.
**Persona**: عبد الرحمن مؤمن.
**Active sidebar entry**: Leaderboard (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Page header | `#lb-header` | h1 + subtitle + tonal-stance caption |
| Month selector | `#lb-months` | 6-month chip strip |
| Personal-rank hero card | `#lb-personal` | persona avatar + rank + points + movement + caption |
| Tab strip | `#lb-tabs` | 6 tab pills |
| Explainer accordion | `#lb-explainer` | `<details>` with 6 dimension formulas |
| Tab panels | `#lb-panel-overall` … `#lb-panel-participation` | 6 panels (one per tab) |
| Closing motivational panel | `#lb-closing` | "لم تظهر في القائمة..." + report CTA |

## Required content

### Header (`#lb-header`) — FR-032

- h1: `لوحة الترتيب الشهري`
- Subtitle: `احتفل بتقدّمك — وقدّم التشجيع لزملائك`
- Tonal-stance caption (slate-tinted, below subtitle): `الترتيب يعكس الجهد، والتطوّر يعكس النموّ. كلاهما يستحق الاحتفاء.`
- Header chrome with persona greeting "عبد الرحمن مؤمن".

### Month selector (`#lb-months`) — FR-033

Horizontal `<ul>` of 6 chip `<button type="button">` elements (or `<a>` with `?month=` placeholder hrefs):

| # | Chip label | State |
|---|-----------|-------|
| 1 | ديسمبر 2025 | inactive |
| 2 | يناير 2026 | inactive |
| 3 | فبراير 2026 | inactive |
| 4 | مارس 2026 | inactive |
| 5 | أبريل 2026 | SELECTED (bg-accent-100 + ring-2 ring-accent-500) |
| 6 | مايو 2026 | inactive (current month, leaderboard not yet ranked) |

At < 768 px the strip becomes horizontally scrollable.

### Personal-rank hero card (`#lb-personal`) — FR-034 + R10

Cream/parchment background (matching Spec 006 monthly-report header aesthetic). Renders:

- **Avatar**: `ع.م` circle (primary-700 fill, large 64×64).
- **Name**: `عبد الرحمن مؤمن` (FULL NAME — own chrome only; FR-015 extension applies to OTHER students seeing the persona, not the persona seeing themselves).
- **Level chip**: `الصف السادس — مسار القرآن الكريم`.
- **Dimension label**: `ترتيبك في الترتيب العام: 6` (text changes with the active tab in concept; the prototype renders "الترتيب العام" since that's the default tab).
- **Points this month**: `215 نقطة` (Latin digits).
- **Movement chip**: `صعدت 3 مراكز` (success-100 + up-arrow icon — positive framing per FR-017).
- **Motivational caption**: `استمرّ — أنت قريب من المراكز الأولى.`

### Tab strip (`#lb-tabs`) — FR-035

6 tab pills using existing main.js tablist handler. Container = `role="tablist"`; each button = `role="tab"` + `aria-controls="lb-panel-{slug}"`.

| # | Tab button | data-tab / aria-controls | Default state |
|---|-----------|--------------------------|---------------|
| 1 | الترتيب العام | `lb-panel-overall` | SELECTED (`aria-selected="true"` + `is-active`) |
| 2 | الحضور | `lb-panel-attendance` | inactive |
| 3 | الواجبات | `lb-panel-homework` | inactive |
| 4 | الأكثر تطوراً | `lb-panel-improved` | inactive |
| 5 | تقدّم القرآن | `lb-panel-quran` | inactive |
| 6 | المشاركة | `lb-panel-participation` | inactive |

At < 768 px the tab pills become horizontally scrollable.

### Explainer accordion (`#lb-explainer`) — FR-038a + R5

Native HTML5 `<details open>` (open by default — no-JS-fallback). Tailwind styling: rounded-lg border border-info-100 bg-info-50 p-4.

```html
<details id="lb-explainer" open class="rounded-lg border border-info-100 bg-info-50 p-4">
  <summary class="cursor-pointer font-medium text-info-700 flex items-center gap-2">
    <svg ... /> كيف نحسب النقاط؟
  </summary>
  <ul class="mt-3 space-y-2 text-sm text-slate-700">
    <li><strong>الترتيب العام:</strong> مجموع نقاط كل الفئات.</li>
    <li><strong>الحضور:</strong> 5 نقاط لكل حصة حضرت.</li>
    <li><strong>الواجبات:</strong> 10 نقاط لكل واجب مقبول.</li>
    <li><strong>الأكثر تطوراً:</strong> عدد المراكز التي صعدتها مقارنة بالشهر الماضي.</li>
    <li><strong>تقدّم القرآن:</strong> نسبة إكمال محتوى المستوى.</li>
    <li><strong>المشاركة:</strong> تفاعل في الحصص + التعليقات المعتمدة.</li>
  </ul>
</details>
```

### Tab panels — FR-035 + FR-036 + FR-037 + FR-039 + R14

6 `<div role="tabpanel">` panels, one per tab. The default selected tab's panel (`#lb-panel-overall`) is visible; the other 5 have `class="hidden"`. The 6 panels each contain a 10-row `<table>` with columns: المركز / الطالب / النقاط / الشارة / التقدّم.

**`#lb-panel-overall` (الترتيب العام)** — academy-wide top-10:

| Rank | Student | Points | Badge | Progress |
|------|---------|--------|-------|----------|
| 1 (gold) | خالد ع. | 312 | نجم الشهر | 95% |
| 2 (silver) | نورا ف. | 298 | متفوّقة | 92% |
| 3 (bronze) | يوسف ر. | 275 | متقدّم | 88% |
| 4 | فاطمة ك. | 248 | منتظمة | 85% |
| 5 | محمد س. | 232 | مجتهد | 82% |
| **6** (PERSONA — highlighted accent-50 + accent-500 ring) | **عبد الرحمن م.** | **215** | **قارئ متقن** | **78%** |
| 7 | ليلى ر. | 198 | متطوّرة | 73% |
| 8 | علي ج. | 184 | مواظب | 70% |
| 9 | مريم ح. | 172 | متعلمة | 68% |
| 10 | حسن أ. | 160 | محسن | 65% |

**`#lb-panel-attendance` (الحضور)** — academy-wide, persona at #4:

10 rows reshuffled by attendance %. Persona at rank 4 ("عبد الرحمن م.", 92%). Sibling سارة م. appears at rank 8 (78%). Other rows from R14 roster reshuffled.

**`#lb-panel-homework` (الواجبات)** — academy-wide, persona at #5:

10 rows reshuffled by homework %. Persona at rank 5 ("عبد الرحمن م.", 88%). Sibling سارة م. appears at rank 9 (65%). Other rows reshuffled.

**`#lb-panel-improved` (الأكثر تطوراً)** — academy-wide, persona at #2:

A small caption above the table reads: `هؤلاء الطلاب قطعوا أكبر مسافة من نقطة بدايتهم هذا الشهر — تطوّرهم يستحق الاحتفاء.` (FR-016)

10 rows ordered by month-over-month rank improvement. **Each row carries an additional movement chip** (FR-037) showing "+N مركزاً منذ مارس":

| Rank | Student | Points | Badge | Progress | Movement chip |
|------|---------|--------|-------|----------|----------------|
| 1 | ليلى ر. | 198 | الأكثر تطوّراً | 73% | +12 مركزاً منذ مارس |
| **2** (PERSONA) | **عبد الرحمن م.** | **215** | **قارئ متقن** | **78%** | **+4 مراكز** |
| 3 | حسن أ. | 160 | محسن | 65% | +3 مراكز |
| 4 | فاطمة ك. | 248 | منتظمة | 85% | +3 مراكز |
| 5 | علي ج. | 184 | مواظب | 70% | +2 مركز |
| 6 | يوسف ر. | 275 | متقدّم | 88% | +2 مركز |
| 7 | محمد س. | 232 | مجتهد | 82% | +1 مركز |
| 8 | مريم ح. | 172 | متعلمة | 68% | +1 مركز |
| 9 | نورا ف. | 298 | متفوّقة | 92% | ثبّتت ترتيبها |
| 10 | خالد ع. | 312 | نجم الشهر | 95% | ثبّت ترتيبه |

**`#lb-panel-quran` (تقدّم القرآن)** — enrollment-scoped per Q4 / R4. Scope caption above the table:

`هذا الترتيب يشمل الطلاب المسجّلين في دورات القرآن — نقيس التقدّم في المسار، ليس الالتحاق به.`

Only Quran-enrolled students from R14 roster appear. Sample 6 rows (since R14 lists 6 Quran-enrolled students out of the 10-roster; the table visually accommodates the 6 with a footer caption "6 طلاب مسجّلين في دورات القرآن — هؤلاء جميعهم في القائمة"):

| Rank | Student | Points | Badge | Progress |
|------|---------|--------|-------|----------|
| 1 (gold) | خالد ع. | 95 | نجم الحفظ | 95% (Quran L4) |
| 2 (silver) | يوسف ر. | 88 | متفوّق التجويد | 88% (Quran L3) |
| 3 (bronze) | محمد س. | 85 | حافظ ممتاز | 82% (Quran L3) |
| **4** (PERSONA) | **عبد الرحمن م.** | **80** | **قارئ متقن** | **78%** (Quran L3) |
| 5 | علي ج. | 72 | متعلم | 70% (Quran L2) |
| 6 | حسن أ. | 65 | مجتهد | 65% (Quran L4) |

**سارة م. MUST NOT appear in this tab's table** (sibling enrolled in Arabic L1, not Quran — per Q4 / R4).

**`#lb-panel-participation` (المشاركة)** — academy-wide, persona at #7:

10 rows reshuffled by participation score. Persona at rank 7 ("عبد الرحمن م."). Sibling سارة م. appears (Arabic-enrolled students still participate). Other rows reshuffled.

### Closing motivational panel (`#lb-closing`) — FR-038

Soft accent-50 / cream background. Position: below the tab panels.

```
لم تظهر في القائمة هذا الشهر؟ كل طالب يمشي على وتيرته. تابع جهدك، وستظهر نتيجتك في الأشهر القادمة.

[اقرأ تقريرك الشهري] → monthly-report.html
```

The CTA is a primary `<a>` link to `monthly-report.html` (Spec 006 anchor).

## Forbidden content

- **NO Download / Print / Share / Save / WhatsApp / Calendar-export buttons** (FR-019).
- **NO red/danger styling on movement chips** — down arrows MUST use amber/warning tint (FR-017).
- **NO full real student names** for non-persona/non-sibling rows (FR-039 — pseudonymous format mandatory).
- **NO سارة م. row in the تقدّم القرآن tab** (Q4 / R4 enrollment scoping).

## Grep checks (Polish phase)

- `grep -c 'role="tablist"' pages/student/leaderboard.html` ≥ 1
- `grep -c 'role="tab"' pages/student/leaderboard.html` ≥ 6 (6 tab buttons)
- `grep -c 'role="tabpanel"' pages/student/leaderboard.html` ≥ 6 (6 panels)
- `grep -c 'aria-controls="lb-panel-' pages/student/leaderboard.html` ≥ 6
- `grep -c 'aria-selected="true"' pages/student/leaderboard.html` ≥ 1 (default-selected tab)
- `grep -c '<details' pages/student/leaderboard.html` ≥ 1 (FR-038a)
- `grep -c '<summary' pages/student/leaderboard.html` ≥ 1 (FR-038a)
- `grep -c 'كيف نحسب النقاط؟' pages/student/leaderboard.html` ≥ 1
- `grep -c 'الترتيب العام:\|الحضور:\|الواجبات:\|الأكثر تطوراً:\|تقدّم القرآن:\|المشاركة:' pages/student/leaderboard.html` ≥ 6 (SC-022 — 6 explainer formulas)
- `grep -c 'عبد الرحمن م\.' pages/student/leaderboard.html` ≥ 6 (persona row appears in 6 tabs — should be 6 occurrences in table rows; counted across all panels in the same file)
- `grep -c 'سارة م\.' pages/student/leaderboard.html` ≥ 5 (sibling appears in 5 of 6 tabs — NOT in تقدّم القرآن)
- (sanity) `grep -c 'تقدّم القرآن' pages/student/leaderboard.html` followed by manual check that the سارة م. count in JUST the Quran panel (`grep -A 100 'lb-panel-quran' | grep -c 'سارة م\.'`) is 0
- `grep -c 'monthly-report\.html' pages/student/leaderboard.html` ≥ 1 (closing CTA)
- `grep -c '+12 مركزاً منذ مارس' pages/student/leaderboard.html` ≥ 1 (Most-Improved fairness lever — FR-016 + FR-037)
- `grep -c 'هذا الترتيب يشمل الطلاب المسجّلين في دورات القرآن' pages/student/leaderboard.html` ≥ 1 (Q4 scope caption)
- `grep -c 'لم تظهر في القائمة' pages/student/leaderboard.html` ≥ 1 (closing motivational panel — FR-038)
- `grep -c 'الترتيب يعكس الجهد، والتطوّر يعكس النموّ' pages/student/leaderboard.html` ≥ 1 (tonal-stance caption — FR-032)
- `grep -cE 'apple-calendar\|google-calendar\|outlook\|تنزيل\|طباعة\|واتساب' pages/student/leaderboard.html` MUST be 0 (FR-019)
- `wc -l assets/js/main.js` MUST equal 68 (zero new JS).
