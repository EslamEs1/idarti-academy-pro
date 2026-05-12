# Phase 0 Research — Assignments and Homework Frontend

This document consolidates the technical decisions, content sourcing, and clarification outcomes that bound the implementation of the six new pages of Spec 004. Each section follows the **Decision / Rationale / Alternatives considered** format. There are no remaining `NEEDS CLARIFICATION` items — all three `/speckit-clarify` Q&A bullets from `spec.md §Clarifications` are folded in.

---

## R1. Page count and structural strategy

**Decision**: Build six independent static HTML files, each fully self-contained, hard-embedding the appropriate sidebar (student or teacher) and the bell-as-anchor header. No runtime include mechanism.

**Rationale**: Constitution Principle II: "Every HTML page MUST be fully designed and contain its own realistic, hard-coded demo content." Specs 001/002/003 already shipped 12 pages this way; the convention is locked. The drill-down pages (`assignment-details`, `submit-assignment`, `submission-feedback` on the student side; `homework-submission-details` on the teacher side) carry the same shell as the index/queue pages — only the active-sidebar-entry indicator and the page-specific `<main>` content differ.

**Alternatives considered**:

- Server-side includes / a build-time HTML composer to deduplicate shells. Rejected — would introduce a build step that breaks the `file://` openability guarantee in Principle I.
- A single SPA with client-side routing. Rejected — banned by Principle I (no frameworks, no client routing) and by Principle V (no JS-rendered content).
- Combining `submit-assignment.html` and `assignment-details.html` into a single page with a modal/tab. Rejected — the spec defines them as distinct pages with distinct responsibilities; merging would obscure the resubmission narrative and force a new JS handler.

---

## R2. Sidebar and header — zero-delta reuse

**Decision**: Embed the existing sidebars exactly as Specs 002/003 left them. No new entries on either role, no entry reordering, no header tweaks.

**Rationale**: Spec 002's 15-entry student sidebar already contains "الواجبات" → `assignments.html` as a placeholder destination (now fulfilled). The teacher dashboard from prior work already wires "مراجعة الواجبات" → `homework-review.html`. The bell remains `<a href="notifications.html">` on student pages and a similar placeholder anchor on teacher pages. FR-001..FR-006 require zero shell drift across the existing role sections.

**Active-entry mapping** (FR-002):

| Page | Sidebar | Active entry |
|---|---|---|
| `pages/student/assignments.html` | Student (15) | `الواجبات` |
| `pages/student/assignment-details.html` | Student (15) | `الواجبات` |
| `pages/student/submit-assignment.html` | Student (15) | `الواجبات` |
| `pages/student/submission-feedback.html` | Student (15) | `الواجبات` |
| `pages/teacher/homework-review.html` | Teacher | `مراجعة الواجبات` |
| `pages/teacher/homework-submission-details.html` | Teacher | `مراجعة الواجبات` |

**Alternatives considered**: Showing no active entry on the three student drill-downs (`assignment-details`, `submit-assignment`, `submission-feedback`) per the Spec 003 R2 convention for drill-downs. **Rejected** for this feature — all three drill-downs are part of the same conceptual "homework" cluster that the sidebar root represents, and visually preserving the active state across the cluster keeps users anchored. This differs from Spec 003 because Spec 003's drill-down pages (`course-details`, `live-session-details`, `session-checkout-preview`) cross conceptual boundaries (a course-details for Quran is not really under any one nav root); homework drill-downs do not.

---

## R3. JavaScript scope — zero new handlers

**Decision**: No new JS handlers are added. The mobile sidebar drawer from Spec 001 carries over verbatim. None of the six pages uses tabs, dropdowns, or modals.

**Rationale**: Constitution Principle V sanctions six JS interaction categories; none of the six pages requires any beyond the sidebar drawer that ships in the shell. The index/queue lists are unified tables filtered by *visual* chips (the chips are styled buttons that look clickable but do not modify the table's row visibility — the prototype renders a single fixed row mix on every visit). No tab structure is required because no page splits its content into mutually-exclusive panels.

**Why visual-only filter chips work**: The prototype's purpose is to communicate the academy's homework taxonomy and the platform's feature breadth — not to implement runtime filtering. SC-011 counts ≥ 25 distinct badge instances across the six pages; the chips contribute to that count even when they don't modify row visibility. Spec 003 used the same pattern for the course-catalog filters (R3 / FR-013).

**Alternatives considered**:

- Wire a simple JS filter that hides/shows table rows based on the selected chip. Rejected — would introduce a new JS category (DOM manipulation for filter state), which is not on the sanctioned list. Constitution Principle V says "every JS usage is justifiable against the list" — runtime filtering is not justifiable here because the static row mix already demonstrates every status.
- Build the queue/index as tabs (Pending / Accepted / Needs Revision / Late) for the teacher and (الكل / جديد / مطلوب التسليم / ...) for the student. Rejected — the user's brief listed these as filter chips, not tabs; the visual semantics are different (chips are typically pill-shaped, tabs are typically full-width segmented). Also: the teacher page has 4 summary cards already covering the four primary states, and the student page has 9 chips which won't fit as tabs.
- A CSS-only `:target` filter system (e.g., `<a href="#status-accepted">`). Rejected — the URL fragment changes every click, breaking the back-button experience and confusing reviewers about state persistence in a static prototype.

---

## R4. Quran-axis vs final-grade relationship (Q1 clarification)

**Decision**: The four Quran-axis scores (الحفظ / التجويد / النطق / الطلاقة) are diagnostic per-skill detail; the final grade in the meta-strip is a separate, holistic teacher judgment that may factor recording quality, الالتزام, adab, and other non-axis dimensions. An explanatory caption appears immediately above or below the axis grid on both `submission-feedback.html` (student-facing) and `homework-submission-details.html` (teacher-facing) making this relationship explicit.

**Rationale**: Q1 clarification chose Option A (independent axes vs holistic grade). This pattern:

1. Mirrors how Quran teachers actually grade — axis scores diagnose specific skill gaps, but the final mark also factors classroom adab, recording quality, الإلقاء العام, and effort.
2. Avoids implying a deterministic formula the prototype cannot enforce (and that would make the sample numbers feel rigged).
3. Lets the page surface ~72.5 average across axes alongside a 65 final grade without that gap reading as arithmetic error.

**Concrete caption** (used on both pages, mirrored copy):

> "المحاور أعلاه تفصيلية لأدائك في كل مهارة. التقييم العام (65 / 100) في الأعلى تقدير شامل من المعلم يأخذ في الاعتبار جودة التسجيل، الالتزام، وسلوكيات الأدب القرآني إلى جانب المهارات."

**Visual placement**: A single-line muted-grey caption (text-text-muted, text-xs leading-7) appears between the meta-strip and the axis grid on `submission-feedback.html`, and between the overall-grade input and the Quran-axis form on `homework-submission-details.html`. The caption is part of the same containing card to anchor it visually to the rubric.

**Alternatives considered**: Hard-coding the final grade to equal the weighted axis average (Option B from Q1). Rejected — would force a specific weighting (e.g., 30/30/20/20) that the spec doesn't authorize, and would constrain future grading logic. The independent pattern is more honest and more flexible.

---

## R5. Teacher-only status mapping (Q2 clarification)

**Decision**: The teacher's grading form retains all five status options (مقبول / مقبول مع ملاحظات / يحتاج تعديل / مرفوض / تأجيل المراجعة). On the student-facing pages (assignments-index pill, assignment-details meta-strip pill, submission-feedback pill), these collapse to four values per the mapping:

| Teacher selector value | Student-facing pill | Where the "extra" information appears |
|---|---|---|
| مقبول | مقبول | (none — clean accepted state) |
| مقبول مع ملاحظات | مقبول | Notes appear in the feedback panel (strengths/improvements + ملاحظة المعلم quote) |
| يحتاج تعديل | يحتاج تعديل | Resubmission panel + attempts-remaining indicator |
| مرفوض | مرفوض | Disabled-resubmit variant on submission-feedback (edge case) |
| تأجيل المراجعة | قيد المراجعة | (none — student keeps "awaiting review" caption) |

**Rationale**: Q2 clarification chose Option A (collapse to existing values). This:

1. Keeps the student-side filter chip set stable at 9 (الكل + 8 status values per the user's brief).
2. Avoids inventing new badge variants outside the locked Spec 001 19-badge catalog (FR-074).
3. Reflects the academy's internal/external status separation — "deferred" and "accepted with notes" are workflow states for the teacher, not states the student needs to differentiate.

**Where the helper caption goes**: A small helper line is rendered immediately beneath the radio-card cluster on `homework-submission-details.html` per FR-063:

> "ملاحظة: 'مقبول مع ملاحظات' تظهر للطالب كـ'مقبول' مع تفاصيل في لوحة الملاحظات. 'تأجيل المراجعة' تُبقي حالة التسليم لدى الطالب 'قيد المراجعة'."

**Alternatives considered**: Adding two new student-side status pills (Option B). Rejected — the user's brief explicitly enumerated 9 status filters, and inventing two more would violate FR-074's "no new badge variants" rule. Dropping the two teacher-only options (Option D) was also rejected — the teacher's daily workflow legitimately needs a "defer this for tomorrow" state and an "approved but mark these notes" state, both of which are realistic academy operations.

---

## R6. "جديد" vs "مطلوب التسليم" filter taxonomy (Q3 clarification)

**Decision**: "جديد" tags assignments posted within the last 48 hours that the student hasn't acted on yet. "مطلوب التسليم" tags assignments posted earlier than 48 hours, deadline-approaching, not yet submitted. A row carries exactly one of the two pills; once a "جديد" row crosses the 48-hour age boundary, it becomes "مطلوب التسليم".

**Rationale**: Q3 clarification chose Option A (recency vs deadline). This:

1. Gives the index visible variety — a freshly-posted homework reads as a notification ("there's something new to look at") while an older still-due homework reads as a deadline reminder ("you still have to do this").
2. Matches standard LMS conventions where "new" and "due" are visually distinct.
3. Allows the "واجبات مطلوبة (3)" summary card to count both categories without double-counting (each row carries exactly one of the two pills).

**Sample data anchor** (validated against today = 2026-05-08):

| Assignment | Assigned date | Due date | Age (days) | Pill |
|---|---|---|---|---|
| تسميع الدرس السابق + كتابة 5 أحكام | 2026-05-07 | 2026-05-09 | 1 | جديد |
| حفظ سورة الفجر كاملة | 2026-05-04 | 2026-05-12 | 4 | مطلوب التسليم |
| كتابة فقرة عن آداب التلاوة | 2026-05-03 | 2026-05-11 | 5 | مطلوب التسليم |

The "جديد" pill uses an accent-colored notification chip (bg-accent-100 text-accent-700 with a small dot icon); the "مطلوب التسليم" pill uses a neutral deadline chip (bg-slate-100 text-slate-700 with a clock icon). Color is paired with text and icon — never alone (FR-075).

**Alternatives considered**:

- Workflow-stages mapping (Option C): "جديد" = unviewed, "مطلوب التسليم" = viewed-but-unsubmitted. Rejected — would require a viewed/unviewed track-state bit that the static prototype cannot demonstrate without inventing a UI affordance to "view" the row, which doesn't match the user's brief.
- Synonyms (Option B): both filters mean the same thing. Rejected — visually pointless to have two filter chips that resolve to the same row set.
- Drop "جديد" entirely (Option D). Rejected — the user's brief explicitly listed it; removing it would silently violate the brief.

---

## R7. Quran tajweed reference content sourcing

**Decision**: The featured Quran assignment ("تطبيق أحكام الميم الساكنة من سورة البقرة الآيات 1-10") references the three classical rules of أحكام الميم الساكنة (Sakin Meem rules) as taught in Saudi/GCC Quran academies: الإخفاء الشفوي (when followed by ب), الإدغام الشفوي (when followed by م), and الإظهار الشفوي (when followed by any other letter). The "أخطاء شائعة يجب تجنّبها" section enumerates 4 common student errors.

**Rationale**: The prototype must use authentic, on-topic Quran tajweed content (Constitution Principle IV: "Trust, Motivation, and Premium Educational Tone") so that an Arabic-speaking reviewer reading the page is convinced the academy actually teaches Quran. Generic placeholders like "Lorem ipsum" or "Topic 1, Topic 2" would be flagged immediately by SC-010.

**Specific content** (used on `assignment-details.html`):

- **نطاق الحفظ والمراجعة**: سورة البقرة، الآيات 1 إلى 10 — تقريباً 65 كلمة.
- **تركيز التجويد**: أحكام الميم الساكنة. ثلاث أحكام:
  1. الإخفاء الشفوي — تخفى الميم الساكنة عند ملاقاتها للباء، مع غنّة بمقدار حركتين.
  2. الإدغام الشفوي (الصغير) — تدغم الميم الساكنة في الميم المتحركة بعدها، مع غنّة.
  3. الإظهار الشفوي — تظهر الميم الساكنة عند ملاقاتها لباقي الحروف (السبعة والعشرين).
- **أخطاء شائعة يجب تجنّبها**:
  1. الخلط بين الإخفاء الشفوي والإدغام الشفوي عند الالتقاء بالباء.
  2. ترك الغنّة عند الإدغام الشفوي.
  3. المبالغة في الإظهار حتى تصبح الميم وكأنها مفتوحة.
  4. إقلاب الميم نوناً أو تنويناً عند الإخفاء.
- **طريقة التسجيل المطلوبة**: مكان هادئ، 60-90 ثانية، صوت واضح، التزام بمخارج الحروف.

**Alternatives considered**: Using a different sura (e.g., الفاتحة) with simpler content. Rejected — the persona is at Quran Level 3, so the assignment must reflect intermediate-level rule application; البقرة 1-10 with أحكام الميم الساكنة is a canonical Level-3 exercise. Also, the dashboard's existing "تطبيق أحكام الميم الساكنة" homework preview (Spec 002, dashboard.html line 510) already pins this as the persona's current assignment — reusing it preserves cross-page narrative continuity.

---

## R8. Sample assignment inventory — student index (≥ 9 rows)

**Decision**: The `assignments.html` table ships with exactly 9 sample rows covering every status the spec requires plus enough variety to populate the secondary filters. Every row anchors to the persona Abdulrahman; teachers and courses spread across ≥ 2 distinct teachers and ≥ 2 distinct subjects.

**Sample inventory**:

| # | Title | Course | Teacher | Assigned | Due | Status pill | Grade | CTA cluster |
|---|---|---|---|---|---|---|---|---|
| 1 | تطبيق أحكام الميم الساكنة من سورة البقرة (الآيات 1-10) | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-05-02 | 2026-05-10 | يحتاج تعديل | 65 / 100 | عرض التفاصيل · إعادة التسليم |
| 2 | تلاوة سورة الضحى مع تطبيق أحكام التجويد | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-05-05 | 2026-05-09 | قيد المراجعة | — | عرض التفاصيل |
| 3 | تسميع الدرس السابق + كتابة 5 أحكام تعلمتها | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-05-07 | 2026-05-09 | جديد | — | عرض التفاصيل · تسليم |
| 4 | حفظ سورة الفجر كاملة | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-05-04 | 2026-05-12 | مطلوب التسليم | — | عرض التفاصيل · تسليم |
| 5 | كتابة فقرة عن آداب التلاوة | اللغة العربية — التعبير | الأستاذة سلمى البلوي | 2026-05-03 | 2026-05-11 | مطلوب التسليم | — | عرض التفاصيل · تسليم |
| 6 | كتابة ملخص لدرس أحكام النون الساكنة | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-04-25 | 2026-04-30 | مقبول | 92 / 100 | عرض التفاصيل · عرض الملاحظات |
| 7 | حلّ تمارين الإملاء — الدرس الرابع | اللغة العربية — التعبير | الأستاذة سلمى البلوي | 2026-04-18 | 2026-04-23 | مقبول | 88 / 100 | عرض التفاصيل · عرض الملاحظات |
| 8 | حفظ آخر 5 آيات من سورة البقرة | القرآن الكريم — المستوى الثالث | الأستاذ أحمد العمري | 2026-04-29 | 2026-05-02 | متأخر | — | عرض التفاصيل · تسليم |
| 9 | تسجيل تلاوة سورة الإخلاص (محاولة سابقة) | القرآن الكريم — المستوى الثاني | الأستاذ أحمد العمري | 2026-03-20 | 2026-03-25 | مرفوض | 35 / 100 | عرض التفاصيل · عرض الملاحظات |

**Rationale**: Exactly 9 rows hits the FR-014 minima (1 يحتاج تعديل، 1 قيد المراجعة، 1 جديد، 2 مطلوب التسليم، 2 مقبول، 1 متأخر، 1 مرفوض = 9) without bloat. Row 1 is the featured resubmission case (FR-020 anchor). Row 2 is the cross-page anchor visible on the teacher's homework-review queue. Rows 3-5 are the three actionable "واجبات مطلوبة" rows (1 جديد + 2 مطلوب التسليم) summing to the FR-011 count of 3.

The summary-card counts derive deterministically:

- واجبات مطلوبة (3) = rows 3, 4, 5
- تم التسليم (4) = rows 1 (its prior attempt), 2, 6, 7
- بانتظار المراجعة (1) = row 2
- تحتاج تعديل (1) = row 1
- متأخرة (1) = row 8

(Row 9 — مرفوض — is not counted in any summary card; it appears on the index for filter-chip coverage only.)

**Alternatives considered**: Sourcing 12-15 rows for visual density. Rejected — the 9-row count is already enough to demonstrate the full taxonomy without bloating the page. Spec 003's `live-sessions.html` showed that table rows beyond ~10 strain the mobile collapse pattern.

---

## R9. Sample submission inventory — teacher queue (≥ 8 rows)

**Decision**: The `homework-review.html` queue ships with exactly 8 sample rows covering every status the FR-053 mandates. Row 1 is the persona's "تلاوة سورة الضحى" submission (cross-page anchor with student-side row 2 from R8). Students are diverse Saudi/GCC names per FR-055.

**Sample inventory**:

| # | Student | Grade level | Assignment | Course | Submitted | Status | Attempts |
|---|---|---|---|---|---|---|---|
| 1 | عبدالرحمن السعد | المستوى الثالث | تلاوة سورة الضحى مع تطبيق أحكام التجويد | القرآن الكريم — المستوى الثالث | اليوم 09:14 ص | بانتظار المراجعة | 1 من 3 |
| 2 | محمد السعيدي | المستوى الثاني | كتابة فقرة عن "أهمية القراءة" | اللغة العربية — التعبير | اليوم 08:42 ص | بانتظار المراجعة | 1 من 3 |
| 3 | عمر القحطاني | المستوى الثالث | تلاوة سورة الفلق مع التجويد | القرآن الكريم — المستوى الثالث | أمس 21:18 م | بانتظار المراجعة | 2 من 3 (إعادة تسليم) |
| 4 | أحمد الغامدي | المستوى الأول | حلّ أسئلة الفصل الأول | الدراسات الإسلامية — السيرة | أمس 18:05 م | بانتظار المراجعة | 1 من 3 |
| 5 | فيصل العتيبي | المستوى الثاني | حفظ آيات من سورة الإسراء (1-15) | القرآن الكريم — المستوى الثاني | أمس 14:30 م | مقبول | 1 من 3 |
| 6 | ريم الدوسري | المستوى الثالث | تأمل في معاني سورة القدر | الدراسات الإسلامية — التفسير | اليوم 11:02 ص | مقبول | 1 من 3 |
| 7 | ليلى المنصور | المستوى الثاني | حلّ تمارين النحو ص 45 | اللغة العربية — النحو | منذ 3 أيام | يحتاج تعديل | 1 من 3 |
| 8 | سارة الحربي | المستوى الأول | تسميع جدول الضرب 1-10 | الرياضيات — الأساسيات | منذ 5 أيام | متأخر | 0 من 3 |

**Rationale**: Exactly 8 rows hits the FR-053 minima (4 بانتظار المراجعة + 2 مقبول graded today + 1 يحتاج تعديل + 1 متأخر = 8). Row 1 is the featured submission opened on `homework-submission-details.html`. Rows 2-4 are the other "pending review" entries (counted under "بانتظار المراجعة (4)" summary card). Rows 5-6 are graded today (counted under "تم القبول اليوم (2)" — assuming the relative captions place both grading actions on 2026-05-08). Row 7 is "يحتاج تعديل (1)". Row 8 is "تسليمات متأخرة (1)".

The summary-card counts derive deterministically:

- بانتظار المراجعة (4) = rows 1, 2, 3, 4
- تم القبول اليوم (2) = rows 5, 6
- تحتاج تعديل (1) = row 7
- تسليمات متأخرة (1) = row 8

**Cross-spec student-name sourcing**: The Saudi/GCC names are drawn from a realistic regional name pool (السعد، السعيدي، القحطاني، الغامدي، العتيبي، الدوسري، المنصور، الحربي). All names are male/female-balanced (4 male, 4 female) to reflect the academy's mixed enrollment.

**Alternatives considered**: A larger queue with 12-15 rows. Rejected — same pagination/density rationale as R8; 8 rows is enough to demonstrate every status and grade level.

---

## R10. Audio playback stub strategy

**Decision**: Audio attachments and submitted-audio files render as visual play-button stubs — a circular accent-colored icon button + a duration label + a filename — without any `<audio>` element with a `src`. The play button is `<button type="button" aria-label="تشغيل التسجيل">` and clicks do nothing.

**Rationale**: Avoids the need to ship real audio assets in the repo (none exist; sourcing public Quran recitations would require licensing review). The visual fidelity is preserved — a reviewer reading the page understands "this is an audio file, here is its duration" without expecting playback. Spec 003's R10 / `live-sessions.html` used the same pattern for "عرض التسجيل" stubs.

**Visual placement** (used on three pages):

- `assignment-details.html` — the audio attachment tile in the "الملفات والمراجع المرفقة" section (FR-024).
- `submit-assignment.html` — the audio block's pre-uploaded preview ("تسجيل-الميم-الساكنة-المحاولة-2.mp3") with duration "01:14 / 01:30" (FR-032).
- `homework-submission-details.html` — the student's submitted audio file in the left context column (FR-061).

**Markup pattern**:

```html
<button type="button" aria-label="تشغيل التسجيل" class="...">
  <svg class="h-5 w-5" aria-hidden="true">…play icon…</svg>
</button>
<span class="text-sm font-medium">تسجيل-الميم-الساكنة-المحاولة-2.mp3</span>
<span class="text-xs text-text-muted">01:14 / 01:30</span>
```

**Alternatives considered**: Embedding a real `<audio>` element pointing at a placeholder MP3. Rejected — would require committing a binary asset to the repo (currently zero binaries beyond fonts loaded via CDN), violating Spec 001's lean-asset convention.

---

## R11. External attachment link selection

**Decision**: The required external-link attachment on `assignment-details.html` (FR-024) points to `https://quran.com/2` — a real, public, evergreen Quran resource for سورة البقرة that requires no authentication and surfaces ayahs 1-10 directly.

**Rationale**: Satisfies the no-`href="#"` rule (FR-076 / SC-007) without inventing a fictional URL. quran.com is widely recognized in the Saudi/GCC Quran-academy space; a reviewer clicking the link lands on real, on-topic content. The URL is an HTTPS root path, so it remains stable across quran.com redesigns.

**Tile copy**:

```text
رابط خارجي
تطبيقات على Quran.com — سورة البقرة (الآيات 1-10)
quran.com
```

**Alternatives considered**:

- `https://tanzil.net/` — another canonical Quran resource. Rejected — quran.com is more student-friendly and renders on mobile better.
- A YouTube link to a recitation video. Rejected — YouTube URLs change/get removed; quran.com is more durable.
- Skipping the external-link attachment type entirely. Rejected — FR-024 explicitly requires it as one of the five attached-material types, and dropping it would shrink the visible material variety from 5 to 4.

---

## R12. Two-column responsive collapse on submission-details

**Decision**: `homework-submission-details.html` uses a 2-column desktop layout (left context / right grading form, 5/7 split via `lg:grid-cols-12 lg:col-span-5 / lg:col-span-7`). Below the `lg` breakpoint (< 1024 px), the layout collapses to a single column with the **context first** (student card + assignment card + submitted files + student note quote) and the **grading form second** (overall evaluation + status selector + Quran evaluation form). On mobile (< 768 px), all internal cards stack vertically with full-width edges.

**Rationale**: Context-then-form preserves reading order — a teacher reviewing on mobile reads the student/assignment context first, then enters the grading. The opposite order (form first) would force teachers to scroll up to verify which student they're grading. The 5/7 ratio (slightly favoring the form) keeps the form column wide enough for the four-axis Quran rubric grid to render comfortably side-by-side at lg.

**Alternatives considered**:

- 6/6 (equal columns). Rejected — the Quran-axis grid needs more horizontal room than the context cards.
- 4/8 (heavily form-favoring). Rejected — the student card and submitted-files list both contain rich content (audio file with duration, student note quote) that's readable at 5/12 but feels squeezed at 4/12.
- Form-first on mobile. Rejected — bad reading order; the teacher needs to know whose work this is before grading.

---

## R13. Attachment tile design language

**Decision**: All attachment tiles on `assignment-details.html` (FR-024) use a uniform card pattern — file-type icon (Lucide-as-inline-SVG, color-tagged by type) + file name + size-or-duration-or-domain caption + "تنزيل" or "فتح" inline link. Tiles render in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

**File-type → icon → accent color** mapping:

| Type | Icon | Tailwind tint | Caption |
|---|---|---|---|
| PDF | `file-text` | `bg-rose-50 text-rose-700` | "PDF — حجم الملف" |
| Audio | `music` | `bg-violet-50 text-violet-700` | "MP3 — مدة الملف" |
| Video | `video` | `bg-amber-50 text-amber-700` | "MP4 — مدة الفيديو" |
| Image | `image` | `bg-emerald-50 text-emerald-700` | "PNG — أبعاد الصورة" |
| External link | `external-link` | `bg-sky-50 text-sky-700` | (domain hint) |

**Rationale**: Uses the existing Spec 001 Tailwind color tokens (rose / violet / amber / emerald / sky) without inventing new ones. Color is paired with both icon and text — never alone (Constitution Principle IV / FR-075). The tints are pastel-light variants (`-50` background, `-700` text) to avoid competing visually with the page's primary navy/gold accents.

**Alternatives considered**: Using monochrome tiles with only icon + text differentiation. Rejected — color-tagging makes the file-type taxonomy scannable at a glance, which matters because FR-024 mandates ≥ 5 attachment tiles representing each material type at least once; without color it's hard to verify variety.

---

## R14. Persona / cross-spec continuity table

**Decision**: All sample data anchors to the persona table locked through Spec 001 §E2 / Spec 002 / Spec 003 §R14 and extended for this feature:

| Attribute | Value | Source |
|---|---|---|
| Student name | عبدالرحمن السعد | Spec 001 §E2 |
| Parent name | عبدالله السعد | Spec 002 (parent-confidence card) |
| Path | القرآن الكريم — المستوى الثالث | Spec 002 (path progress) |
| Family balance | 750 ر.س | Spec 002 (notifications) / Spec 003 (checkout-preview) |
| Primary teacher (Quran) | الأستاذ أحمد العمري | Spec 003 §R14 (carry-over) |
| Secondary teacher (Arabic) | الأستاذة سلمى البلوي | New in Spec 004 — needed for FR-016 / row 5 of R8 |
| Attendance % | 92% | Spec 002 (parent-confidence card) |
| Homework commitment % | 85% | Spec 002 (parent-confidence card) |
| Next monthly evaluation | 12 مايو 2026 | Spec 002 (parent-confidence card) |
| Today's date | 2026-05-08 | Spec 004 (this feature's anchor) |
| Total assignments completed | 18 | New — used on `homework-submission-details.html` left column student card |
| Featured assignment grade | 65 / 100 | Spec 004 (FR-021 / FR-041) |
| Featured Quran scores | 85 / 60 / 75 / 70 | Spec 004 (FR-044 / FR-064) |

**Rationale**: Keeps the persona stable across all four prior specs while adding only the two new attributes needed for this feature (الأستاذة سلمى البلوي as the Arabic-language teacher; total assignments completed = 18 for the teacher's left-column student card).

**Alternatives considered**: Inventing a fresh persona for the homework feature. Rejected — would break the dashboard's "آخر ملاحظة من المعلم" preview consistency, the my-courses card consistency, and the live-session-details "الواجب المرتبط" link consistency. Persona continuity is the prototype's most fragile cross-page invariant.

---

## R15. Cross-page navigation chain (matches SC-013)

**Decision**: The navigation chain validated by SC-013 is wired in the contracts as:

```text
Student chain:
  pages/student/dashboard.html
    → "عرض كل الواجبات" link (line 486 of dashboard.html)
    → assignments.html
      → "عرض التفاصيل" CTA on row 1 (the يحتاج تعديل featured row)
      → assignment-details.html
        → "إعادة التسليم" primary CTA (FR-027)
        → submit-assignment.html
          → "إلغاء" tertiary link (FR-035)
          → assignment-details.html
            → "عرض ملاحظات المعلم" link in submission history (FR-026)
            → submission-feedback.html
              → "إعادة التسليم الآن" primary CTA (FR-045)
              → submit-assignment.html

Teacher chain:
  pages/teacher/dashboard.html
    → "فتح قائمة التصحيح" link (line 278 of teacher/dashboard.html)
    → homework-review.html
      → "مراجعة" CTA on row 1 (the persona's submission)
      → homework-submission-details.html
        → "إلغاء" tertiary link (FR-065)
        → homework-review.html
```

**Rationale**: SC-013 explicitly enumerates this chain as the closed-loop validation. Each contract file lists the inbound and outbound links so an implementer can verify the wiring page-by-page during `/speckit-implement`.

**Anchoring inbound links from prior specs**: The following prior-spec links MUST resolve cleanly after this feature ships (already-correct URLs; no edits required):

- `dashboard.html` line 486: `<a href="assignments.html">عرض كل الواجبات</a>` ✓
- `dashboard.html` lines 501, 516, 531: per-row `<a href="assignments.html">عرض الواجب</a>` ✓
- `weekly-plan.html` lines 361, 373, 385: per-row `<a href="assignments.html">عرض الواجب</a>` ✓
- `learning-journey.html` line 71: sidebar `<a href="assignments.html">الواجبات</a>` ✓
- `notifications.html` line 318, 439: notification `<a href="assignments.html">عرض الواجب</a>` ✓
- `live-session-details.html` line 308: linked-homework `<a href="assignments.html">…</a>` ✓
- `pages/teacher/dashboard.html` line 278: `<a href="homework-review.html">فتح قائمة التصحيح</a>` ✓

**Alternatives considered**: Adding a "back to dashboard" link explicitly on each page. Rejected — the sidebar's "الرئيسية" / "لوحة التحكم" entry already provides this affordance; adding redundant inline back-links would clutter the page chrome.

---

## R16. Featured-content state choices

**Decision**: The four student pages render these specific narrative states on first load:

| Page | Narrative state | Why this state |
|---|---|---|
| `assignments.html` | The full 9-row mix from R8 — every status filter has at least one matching row visible. | Maximizes filter-chip variety so a reviewer can verify the full taxonomy without applying any filter. |
| `assignment-details.html` | Featured row = "تطبيق أحكام الميم الساكنة" in the "يحتاج تعديل" state with 1 attempt used and 2 remaining. | Demonstrates the resubmission narrative without inventing an unrealistic state. The dashboard already pinned this assignment as the persona's current focus. |
| `submit-assignment.html` | The student is opening this for attempt 2 (resubmission of the featured Quran assignment). All 7 method blocks visible; the audio block is pre-expanded with a sample uploaded filename; the checklist has 4 of 5 items pre-checked. | Demonstrates both the resubmission narrative AND the full method-variety of the page in one render. |
| `submission-feedback.html` | The student is reviewing the teacher's verdict on attempt 1 (the same assignment). All four Quran axes visible with diagnostic comments; resubmission panel active with attempts-remaining caption. | Demonstrates the four-axis rubric AND the resubmission CTA in one render — the page's two distinguishing patterns. |

The two teacher pages render:

| Page | Narrative state | Why this state |
|---|---|---|
| `homework-review.html` | The full 8-row queue from R9 — pending submissions at the top, accepted-today below, needs-revision and late at the bottom. | Maximizes queue variety so a reviewer can verify all four summary-card categories without applying any filter. |
| `homework-submission-details.html` | The teacher is mid-grading the persona's "تلاوة سورة الضحى" submission. Form is pre-filled (grade 65, status "يحتاج تعديل", Quran scores 85/60/75/70, mistakes count 5, three flagged ayahs, 4-sentence feedback draft). | Demonstrates the full populated form. The "Save" button is unsaved — the teacher's draft is what the student would receive if Save were tapped, and matches the prior-attempt grade visible on `submission-feedback.html`. |

**Rationale**: All six narrative states form a single coherent timeline: the teacher graded the persona's first attempt of the Quran homework yesterday (which the student now sees on submission-feedback.html), the student has been working on the resubmission (assignment-details.html / submit-assignment.html), and meanwhile the persona just submitted a new assignment ("تلاوة سورة الضحى") that the teacher is reviewing right now (homework-submission-details.html). The dashboard's data is a snapshot from this morning that hasn't refreshed for the new return-decision.

**Alternatives considered**: Showing a "first submission ever" empty state for the persona. Rejected — would contradict the dashboard's claim of 18 completed assignments and the parent-confidence card's 85% homework-commitment metric.

---

## R17. Inbound spec consistency snapshot

**Decision**: The following Specs 001/002/003 surfaces are validated against this feature's pages during `/speckit-implement`. No edits to those prior specs are made — only verification.

| Inbound surface | Anchor it asserts | Verification |
|---|---|---|
| `dashboard.html` "الواجبات المستحقة" preview (3 rows) | At least one of the 3 rows is recognizable on `assignments.html` | The الميم الساكنة row appears identically (same teacher, same assignment title); FR-071 documents the broader reconciliation. |
| `dashboard.html` "آخر ملاحظة من المعلم" quote | The quote is consistent with the teacher's voice on `submission-feedback.html` | SC-014: same teacher (الأستاذ أحمد), tone consistent, may be a slightly different note (documented inline if so). |
| `weekly-plan.html` per-day homework rows | At least 1-2 are recognizable on `assignments.html` | Cross-checked during implementation — minor naming alignment if needed. |
| `learning-journey.html` "بطل الواجبات" badge | The 18 completed-assignments count on `homework-submission-details.html` is consistent with the badge's earned state | The badge implies ≥ 12 consecutive on-time submissions; 18 completed (including some accepted, one rejected long ago, current ones) is consistent. |
| `notifications.html` homework-related notifications | Each notification's "عرض الواجب" link lands on `assignments.html`; the assignments referenced exist as rows | Verified at SC-013 / FR-076 grep time. |
| `live-session-details.html` "الواجب المرتبط" link | The linked homework exists as a row on `assignments.html` | The "تطبيق أحكام التجويد" link → row 2 of R8 (تلاوة سورة الضحى). Same teacher, same course. |
| `teacher/dashboard.html` "فتح قائمة التصحيح" link | Lands on a real `homework-review.html` page | Trivially satisfied after this feature ships. |

**Rationale**: Anchors the prototype's narrative cohesion across all four shipped specs. Reviewers walking the cross-page chain (SC-013 / SC-014) MUST find every link resolves and every cross-reference reads as the same story.

**Alternatives considered**: Editing prior-spec pages to align their data with this feature. Rejected — Constitution Principle II commits each page to remain self-contained at the time of its spec; cross-spec edits would break the audit trail.
