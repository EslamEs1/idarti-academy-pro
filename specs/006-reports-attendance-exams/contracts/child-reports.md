# Contract — `pages/parent/child-reports.html`

**User story**: US4 (Parent Child Report, P1) — see spec.md.
**Persona (rendered)**: عبد الرحمن مؤمن — أبريل 2026 report (parent lens).
**Sibling-switcher (commented variant)**: سارة مؤمن.
**Active sidebar entry**: تقارير الأبناء (`aria-current="page"` + `is-active`).

## Page anchors / IDs

| Section | Anchor / ID | Purpose |
|---------|-------------|---------|
| Header | `#cr-header` | parent-lens report-card header + sibling-switcher |
| Tri-state progress | `#cr-tristate` | 3-step horizontal track + rationale |
| Mini-summaries | `#cr-summaries` | 4 plain-language cards |
| Teacher notes | `#cr-teacher-notes` | 2 quote blocks |
| Suggested parent action | `#cr-action-panel` | 1 primary action + 1 secondary tip |
| Action cluster | `#cr-actions` | 3 buttons |
| Prototype notice | `#cr-prototype-notice` | 1-line stub clarifier |

## Required content

### Header (`#cr-header`) — FR-048
- h1: `تقرير عبد الرحمن — أبريل 2026`
- Child avatar `ع.م` + name + level chip `الصف السادس — مسار القرآن الكريم`
- Parent name: `ولي أمر الطالب عبد الرحمن`
- Month label: `أبريل 2026`
- **Sibling-switcher chip strip**:
  - Chip 1: `عبد الرحمن` — SELECTED (`bg-primary-100 ring-2 ring-primary-500`, no href)
  - Chip 2: `سارة` — `<a href="?child=sara">` (slate-100 hover) — placeholder for the sibling variant

### Tri-state progress track (`#cr-tristate`) — FR-049 / research.md §R11
3-step horizontal stepper. Active step: `متحسّن` (rightmost — RTL note: in RTL the rightmost visual position is "first" reading-order, so the order reads متحسّن — مستقر — يحتاج إلى دعم visually right-to-left, but the conceptual progression goes from يحتاج إلى دعم → مستقر → متحسّن).

Visual structure (LTR order in DOM, but RTL rendering flips visual placement):
- Step 1 (يحتاج إلى دعم) — slate-100 muted + text-slate-400
- Connector — h-1 bg-slate-200
- Step 2 (مستقر) — slate-100 muted + text-slate-400
- Connector — h-1 bg-success-300 (active connector to step 3)
- Step 3 (متحسّن) — bg-success-700 + ring-4 ring-success-100 + check icon + font-semibold text-success-700 — ACTIVE

Below the track: 1-2 sentence parent-readable rationale:
> "عبد الرحمن أظهر تحسناً ملحوظاً في الحفظ والالتزام هذا الشهر مقارنة بمارس."

### Mini-summaries (`#cr-summaries`) — FR-050
4 cards (1 col mobile / 2 col tablet / 4 col desktop). Plain-language phrasing — no jargon.

| ID | Label | Plain-language sentence | Visual |
|----|-------|---------|--------|
| `cr-card-attendance` | الحضور | حضر 11 من 12 حصة هذا الشهر — حضور ممتاز | 92% bar (success) + check icon |
| `cr-card-homework` | الواجبات | أنجز 7 من 8 واجبات في موعدها | 88% bar (accent) + clipboard-check icon |
| `cr-card-exams` | الاختبارات | حصل على 88% في اختبار شهر أبريل — تقدير ممتاز | status pill `ممتاز` + award icon |
| `cr-card-engagement` | الالتزام والمشاركة | أساتذته أشاروا إلى التزامه ومشاركته الفاعلة | state chip `ممتاز` + sparkles icon |

### Teacher notes (`#cr-teacher-notes`) — FR-051
2 quote blocks — research.md §R9 quotes 1 + 2 (Quran + Arabic). Each block: avatar + teacher name + course chip + date + 2-4 sentence Arabic message in plain (parent-readable) style.

### Suggested parent action (`#cr-action-panel`) — FR-052
1 primary action panel (info-50 background, info-700 text):
> "ننصح بمتابعة جلسة المراجعة الأسبوعية مع عبد الرحمن في البيت — 15 دقيقة فقط، أيام السبت أو الأحد، لمراجعة أحكام التجويد للآيات الطويلة. هذا سيدعم خطة الشهر القادم."

1 secondary tip (slate-50 background):
> "💡 شجّعوه على الاستمرار في حضوره الممتاز — أخبروه أنّكم لاحظتم تقدّمه."

### Action cluster (`#cr-actions`) — FR-053
3 buttons:
1. Primary `تنزيل التقرير` (`<button type="button">`) — primary-900 background, white text, download icon. Visual stub.
2. Secondary `مشاركة عبر واتساب` (`<button type="button">`) — DISTINCT VISUAL TREATMENT: success-50 background + success-600 border + success-700 text + small inline SVG icon. Use the **Lucide `message-circle`** icon (a chat-bubble outline) for the WhatsApp affordance. Visual stub. NO `wa.me/` href, NO `navigator.share()`.
3. Tertiary `العودة للأبناء` — `<a href="my-children.html">` (real navigation, slate-100 button).

### Prototype notice (`#cr-prototype-notice`) — FR-054
Inline notice: `هذا نموذج تجريبي — لا يتم تنزيل أو مشاركة ملف فعلي عند النقر.` (slate-100 background + info icon).

## Print rule (research.md §R14)
`@media print` extension hides `#cr-actions`, `#cr-prototype-notice`, `#app-sidebar`, `#app-header`, `[data-sidebar-backdrop]`. Only the report content prints.

## Sibling variant (commented-only)
At the bottom of the page, an HTML comment block documents the سارة variant:
```html
<!-- إذا تم النقر على الشقيقة في شريط التبديل (?child=sara):
- العنوان يصبح "تقرير سارة — أبريل 2026"
- الخطوة المُفعَّلة في #cr-tristate تصبح "يحتاج إلى دعم" (warning-700 + alert-icon)
- موجز الحضور: 78% / "حضرت 8 من 12 حصة"
- موجز الواجبات: 65% / "أنجزت 5 من 9 واجبات"
- موجز الاختبارات: 60% / "تحتاج إلى دعم في القراءة"
- موجز الالتزام: "تحتاج إلى تشجيع للمشاركة الصفّية"
- الإجراء المقترح: جلسة قراءة جهرية مع والديها 3 مرات أسبوعياً
- نفس مجموعة أزرار التنزيل / المشاركة / العودة
-->
```

## Grep checks (Polish phase)
- `grep -c '#cr-' pages/parent/child-reports.html` ≥ 7
- `grep -c 'يحتاج إلى دعم' pages/parent/child-reports.html` ≥ 1 (tri-state step 1)
- `grep -c 'مستقر' pages/parent/child-reports.html` ≥ 1 (step 2)
- `grep -c 'متحسّن' pages/parent/child-reports.html` ≥ 1 (step 3)
- `grep -c 'مشاركة عبر واتساب' pages/parent/child-reports.html` ≥ 1
- `grep -c 'تنزيل التقرير' pages/parent/child-reports.html` ≥ 1
- `grep -c 'my-children.html' pages/parent/child-reports.html` ≥ 1
- `grep -c '92%' pages/parent/child-reports.html` ≥ 1
- `grep -c '88%' pages/parent/child-reports.html` ≥ 1
- `grep -c 'الأستاذ أحمد بن عبد الله' pages/parent/child-reports.html` ≥ 1
- `grep -c 'الأستاذة منى سعد' pages/parent/child-reports.html` ≥ 1
