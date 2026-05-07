# Contract: Dashboard Shells

**Feature**: `001-frontend-foundation`
**Applies to**: The four role dashboards. Each uses the app-shell contract (sidebar + header + main wrapper) and adds a role-specific main content layout.

The dashboards in this spec are *shell-level* (FR-018 through FR-022). They prove the layout, role identity, and visual system. Deeper business pages (full course catalog, full attendance grid, full finance ledgers) are out of scope and will land in follow-up specs.

All dashboards share:
- A "welcome" hero card at the top of `<main>` (full width on mobile, spans the full grid on desktop).
- A grid of role-specific summary cards beneath it.
- Reference month anchor: **أبريل 2026** (per data-model.md sample-data anchors).
- Latin digits inside Arabic copy (FR-043).

Cards use the design tokens from `design-tokens.md`. Status badges from E6 are used wherever applicable.

---

## Student Dashboard — `pages/student/dashboard.html`

Header: `pageTitleAr = "لوحة الطالب"`, `pageSubtitleAr = "أهلاً بك في رحلتك التعليمية"`. User: `عبد الرحمن مؤمن`.

Required content (FR-018):

| # | Card | Required content |
|---|---|---|
| 1 | **Welcome card** (full width) | Salutation `أهلاً بعودتك، عبد الرحمن! 👋` (no emoji per constitution Principle IV — replace with a small Lucide `sparkles` icon in `text-accent-500`); a 1-line motivational subtitle `استمر في رحلتك — لقد أنجزت 68% من خطة هذا الشهر`; primary action button `متابعة آخر درس`. |
| 2 | **Current course summary** | Course `القرآن الكريم — حفظ سورة يس`, teacher `أ. أحمد البكري`, progress bar at `68%`, badge `قيد التقدم` (info). Link `استعراض الدورة`. |
| 3 | **Upcoming live session** | `حصة القرآن الكريم — الأحد 12 أبريل، 6:30 مساءً`. Badge `قادم` (info). Action button `الانضمام`. |
| 4 | **Homework reminder** | "لديك واجب مستحق خلال يومين"; assignment `حل تمارين الوحدة الثالثة — اللغة العربية`. Badge `قيد الانتظار` (warning). Action `فتح الواجب`. |
| 5 | **Progress card** | Three sub-progress rows: `القرآن الكريم 68%`, `اللغة العربية 82%`, `اللغة الإنجليزية 54%`, `الرياضيات 71%`. Each row uses the progress-bar treatment from UI Kit § 15. |
| 6 | **Notification preview** | Top 3 recent notifications, each with an icon + Arabic title + relative time (e.g., `منذ ساعتين`). At least one should reference a graded homework, one a teacher comment, one an upcoming session. Footer link `عرض كل الإشعارات`. |

Grid: `grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6` with the welcome card spanning `lg:col-span-3`. Cards 2–6 fit naturally into the remaining cells.

---

## Parent Dashboard — `pages/parent/dashboard.html`

Header: `pageTitleAr = "لوحة ولي الأمر"`, `pageSubtitleAr = "متابعة رحلة عبد الرحمن التعليمية — أبريل 2026"`. User: `ولي أمر الطالب عبد الرحمن`.

Required content (FR-019):

| # | Card | Required content |
|---|---|---|
| 1 | **Welcome card** (full width) | `مرحباً بك. إليك ملخصاً سريعاً عن أبنائك هذا الشهر.` Action `تقرير الشهر الكامل`. |
| 2 | **Children overview** | A small list (or 2-card row) of children. Primary child: `عبد الرحمن مؤمن — الصف السادس`, status badge `ممتاز` (accent). Sibling: `سارة مؤمن — الصف الثالث`, status badge `يحتاج إلى دعم` (warning). Each row links to its child's detail page (planned). |
| 3 | **Payment reminder** | "اشتراك أبريل 2026 يستحق خلال 5 أيام"; amount `450 ر.س`; badge `قيد الانتظار` (warning). Two actions: `الدفع الآن` (primary), `فتح الفاتورة` (ghost). Currency: SAR. |
| 4 | **Monthly report preview** | Title `تقرير أبريل 2026 — عبد الرحمن`. KPIs: حضور `92%`، واجبات مكتملة `14/16`، اختبار شهري `ممتاز`. CTA `قراءة التقرير الكامل`. |
| 5 | **Teacher note preview** | An Arabic note signed by `أ. أحمد البكري`: `"عبد الرحمن أظهر تحسناً ملحوظاً في حفظ سورة يس، مع التركيز على أحكام التجويد قريباً."`. Date `7 أبريل 2026`. Action `الرد على الملاحظة`. |
| 6 | **Attendance summary** | A weekly mini-table: 5 days of the week with check / cross / late indicators (using Lucide `check`, `x`, `clock` icons + colors). Aggregate `4 من 5 أيام حضور كامل`. Link `عرض سجل الحضور`. |

Grid: `grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6`, welcome spans `lg:col-span-3`.

---

## Teacher Dashboard — `pages/teacher/dashboard.html`

Header: `pageTitleAr = "لوحة المعلم"`, `pageSubtitleAr = "أبريل 2026"`. User: `أ. أحمد البكري`.

Required content (FR-020):

| # | Card | Required content |
|---|---|---|
| 1 | **Welcome card** (full width) | `صباح الخير، أ. أحمد. لديك 3 حصص اليوم.` Action `جدولي اليوم`. |
| 2 | **Today's sessions** | Mini-list of 3 sessions: `9:00 ص — القرآن الكريم — الفصل أ` (badge `قادم`), `11:00 ص — اللغة العربية — الفصل ب` (badge `قادم`), `4:30 م — حصة فردية — عبد الرحمن مؤمن` (badge `قادم`). Each row has `بدء الحصة` button. |
| 3 | **Homework pending review** | Stat: `12 واجباً ينتظر التصحيح`. Sub-list (top 3): `سورة يس — 5 طلاب`, `قواعد النحو — 4 طلاب`, `الإملاء الأسبوعي — 3 طلاب`. Action `فتح قائمة التصحيح`. |
| 4 | **Student alerts** | Two alert rows: `سارة مؤمن — تأخر في تسليم 3 واجبات` (badge `يحتاج إلى دعم` — warning), `محمد العوفي — تحسن ملحوظ في الاختبارات` (badge `ممتاز` — accent). |
| 5 | **Earnings preview** | Stat: `الأرباح المتوقعة لشهر أبريل: 7,820 ر.س`. Sub-breakdown: `حصص جماعية 5,200 ر.س`, `حصص فردية 2,620 ر.س`. Note: `صافي بعد الخصومات: 7,200 ر.س`. Link `تفاصيل الأرباح`. |
| 6 | **Attendance summary** | Stat: `حضور الفصول هذا الأسبوع: 87%`. Mini bar chart placeholder (5 vertical bars, one per weekday) — implemented as styled `<div>`s with relative heights, no JS chart library. Link `سجل الحضور`. |

Grid: same structure as Parent dashboard.

---

## Admin Dashboard — `pages/admin/dashboard.html`

Header: `pageTitleAr = "لوحة الإدارة"`, `pageSubtitleAr = "نظرة عامة — أبريل 2026"`. User: `مدير المنصة`.

Required content (FR-021):

The admin layout uses a **stat-card row** at the top (4 KPIs side by side at `lg:`) followed by a 2-column content area below.

| # | Card | Required content |
|---|---|---|
| 1 | **Stat: Students** | `342 طالباً`, delta `+12 هذا الشهر` (success badge). Icon `graduation-cap`. |
| 2 | **Stat: Teachers** | `28 معلماً`, delta `+1 هذا الشهر` (info badge). Icon `user-cog`. |
| 3 | **Stat: Active courses** | `14 دورة`, delta `+2 هذا الشهر` (success badge). Icon `book-open`. |
| 4 | **Stat: Monthly revenue** | `48,250 ر.س`, delta `+8.4% مقارنة بشهر مارس` (success badge). Icon `trending-up`. Currency: SAR. |
| 5 | **Pending invoices** | Stat header: `7 فواتير قيد الانتظار — مجموع 6,450 ر.س`. List of top 3: each row is a family name + amount + status badge (`متأخر السداد` — danger, `قيد الانتظار` — warning, `مدفوع جزئياً` — warning). Link `عرض كل الفواتير`. |
| 6 | **System alerts** | List of 3 alerts of varying severity: `معلم لم يسجل دخوله منذ 3 أيام: أ. سعد القحطاني` (warning), `طلب صلاحية إدارية جديد من: ولي أمر الطالب يوسف العتيبي` (info), `استثناء ضريبي تم تطبيقه على 4 فواتير` (info). Each with a small action link. |

Grid: top row `grid grid-cols-2 xl:grid-cols-4 gap-4`. Bottom row `grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6`.

---

## Cross-dashboard consistency contract (FR-022, SC-009)

When the four dashboards are opened side-by-side, a reviewer MUST see:

| Element | Identical across all 4 |
|---|---|
| Header height, padding, type scale | ✅ |
| Sidebar width on desktop, sidebar dark navy color | ✅ |
| Card border-radius, shadow, padding | ✅ |
| Status badge visual treatment (font, radius, gap, icon size) | ✅ |
| Avatar size (40 px in header) | ✅ |
| Background color of `<body>` | ✅ |
| Typography hierarchy (page title size, card title size, body line-height) | ✅ |
| Currency notation (`ر.س` after amount, Latin digits) | ✅ |
| Reference month string (`أبريل 2026`) | ✅ |

This is the SC-009 acceptance gate: a reviewer flipping between tabs should perceive **one platform**, not four.
