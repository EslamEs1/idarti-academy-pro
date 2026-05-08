# Phase 1 Data Model — Assignments and Homework Frontend

This document defines the visual entities used across the six pages of Spec 004. Like Specs 001/002/003, this is a **visual / sample-data model** — none of these entities are persisted, fetched, or rendered by JavaScript. Each entity is committed as static HTML.

All entities anchor to the persona locked in Spec 001 §E2 and the cross-spec continuity table in `research.md §R14` (Abdulrahman, Quran path, Level 3, family balance 750 ر.س, primary teacher الأستاذ أحمد العمري, secondary Arabic-language teacher الأستاذة سلمى البلوي).

---

## E1. Assignment (9 instances on assignments.html; 1 deep on assignment-details / submit-assignment / submission-feedback)

The full assignment record shown on `assignments.html` and fully expanded on `assignment-details.html`.

| Field | Type | Notes / sample |
|---|---|---|
| `id` | string | URL-style slug. Sample: `quran-meem-sakinah-baqarah-1-10` |
| `titleAr` | string | Assignment title in Arabic. Sample for E1.1: `تطبيق أحكام الميم الساكنة من سورة البقرة (الآيات 1-10)` |
| `courseRef` | reference → E11 | Course this assignment belongs to |
| `teacherRef` | reference → E11 | Teacher who set it |
| `creationDateAr` | string | Display date. Sample: `2 مايو 2026` (canonical Arabic-month names) |
| `dueDateAr` | string | Display date. Sample: `10 مايو 2026` |
| `relativeDueCaptionAr` | string | Sample: `بعد يومين` / `متأخر بـ 6 أيام` / `اليوم` — paired with the date |
| `subjectKey` | enum | One of `quran` / `arabic` / `english` / `math` / `islamic-studies` (consistent with Spec 003 E1) |
| `quranSpecific` | boolean | Drives whether Quran brief / Quran evaluation surfaces appear |
| `taskStatementAr` | string | 2-3 sentence statement of the task |
| `subTasksAr` | string[] | ≥ 3 numbered sub-tasks |
| `teacherInstructionsAr` | string | ≥ 4 sentences of teacher guidance |
| `attachedMaterials` | reference → E2[] | List of attached materials (≥ 5 for the featured assignment) |
| `quranBrief` | reference → E3 | When `quranSpecific === true` |
| `attemptsAllowed` | integer | Default 3 (1 first + 2 resubmissions) |
| `attemptsUsed` | integer | Sample: 1 for the featured row |
| `currentStatusKey` | enum | `new` / `due` / `submitted` / `under-review` / `accepted` / `needs-revision` / `late` / `rejected` |
| `currentStatusLabelAr` | string | Display label per status — `جديد` / `مطلوب التسليم` / `تم التسليم` / `قيد المراجعة` / `مقبول` / `يحتاج تعديل` / `متأخر` / `مرفوض` |
| `currentGradeAr` | string | Sample: `65 / 100` or `—` for un-graded |
| `resubmissionDeadlineAr` | string | Only when `currentStatusKey === needs-revision`. Sample: `10 مايو 2026` |

**Sample inventory** — the 9 rows from `research.md §R8`. The featured assignment is **E1.1** (`quran-meem-sakinah-baqarah-1-10`) — used on `assignment-details.html`, `submit-assignment.html`, and `submission-feedback.html`.

---

## E2. Attached Material (5 instances on assignment-details.html for the featured assignment)

The attachment tile shown in the "الملفات والمراجع المرفقة" section.

| Field | Type | Notes / sample |
|---|---|---|
| `typeKey` | enum | `pdf` / `audio` / `video` / `image` / `external-link` |
| `typeLabelAr` | string | `PDF` / `ملف صوتي` / `فيديو` / `صورة` / `رابط خارجي` |
| `iconKey` | string | Lucide icon name — `file-text` / `music` / `video` / `image` / `external-link` |
| `nameAr` | string | Filename or link title in Arabic |
| `metaAr` | string | "حجم: 1.4 MB" or "مدة: 02:18" or "أبعاد: 1280×720" or "quran.com" |
| `tintClass` | string | Tailwind tint per the R13 mapping (e.g., `bg-rose-50 text-rose-700` for PDF) |
| `actionLinkAr` | string | `تنزيل الملف` / `تشغيل` / `فتح الرابط` |
| `actionHref` | string | The actual `href` (in-prototype anchor or, for external-link, `https://quran.com/2`) |

**Sample inventory** for the featured assignment (E1.1):

| # | Type | Name | Meta | Action |
|---|---|---|---|---|
| 1 | PDF | ملخص أحكام الميم الساكنة.pdf | حجم: 1.4 MB | تنزيل الملف |
| 2 | Audio | نموذج تلاوة من الشيخ المنشاوي.mp3 | مدة: 02:18 | تشغيل |
| 3 | Video | شرح الإخفاء الشفوي والإدغام الشفوي.mp4 | مدة: 06:45 | تشغيل |
| 4 | Image | جدول أحكام الميم الساكنة.png | أبعاد: 1280×720 | عرض |
| 5 | External link | تطبيقات على Quran.com — سورة البقرة (الآيات 1-10) | quran.com | فتح الرابط (`https://quran.com/2`) |

---

## E3. Quran Brief (1 instance on assignment-details.html)

The four-block Quran-specific brief unique to Quran assignments.

| Field | Type | Notes / sample |
|---|---|---|
| `memorizationRangeAr` | string | "سورة البقرة، الآيات 1-10 — تقريباً 65 كلمة" |
| `tajweedFocusAr` | string | "أحكام الميم الساكنة" |
| `tajweedRules` | object[] | ≥ 3 tajweed rules with name + 1-line explanation. Per R7: الإخفاء الشفوي / الإدغام الشفوي / الإظهار الشفوي |
| `commonMistakesAr` | string[] | ≥ 3 bullets (R7 lists 4) |
| `recordingGuidanceAr` | string | "مكان هادئ، 60-90 ثانية، صوت واضح، التزام بمخارج الحروف" |

---

## E4. Submission (1 prior attempt on assignment-details.html; 1 expanded on submission-feedback.html; 1 mid-grading on homework-submission-details.html)

A single attempt by a student against an assignment.

| Field | Type | Notes / sample |
|---|---|---|
| `assignmentRef` | reference → E1 | The assignment being submitted against |
| `studentRef` | reference → E11 | Always Abdulrahman for student-side pages; multiple students for teacher queue |
| `attemptNumber` | integer | 1 / 2 / 3 |
| `attemptsAllowed` | integer | 3 |
| `submittedAtAr` | string | "اليوم 09:14 ص" / "أمس 21:18 م" / "منذ 3 أيام" |
| `submittedAtFullAr` | string | Full timestamp on detail pages: "8 مايو 2026 — الساعة 09:14 صباحاً" |
| `methodsUsed` | enum[] | One or more of `text-answer` / `file-upload` / `audio-upload` / `image-upload` / `video-upload` / `external-link` / `completion-confirmation` |
| `submittedFiles` | object[] | List of submitted artifacts. Each: { typeKey, nameAr, metaAr, durationAr (audio only) } |
| `studentNoteToTeacherAr` | string | 1-3 sentences from the student. Sample for E4.1: "راجعت الآيات قبل التسجيل، وحاولت تطبيق الإخفاء الشفوي قدر استطاعتي. أتمنى ملاحظاتكم على المخرج الصحيح للحرف." |
| `teacherVerdictKey` | enum | One of E7 statuses (after grading): `accepted` / `accepted-with-notes` / `needs-revision` / `rejected` / `deferred` |
| `teacherVerdictStudentLabelAr` | string | The student-facing label per the R5 mapping table |
| `gradeAr` | string | "65 / 100" or "—" |
| `gradedAtAr` | string | "اليوم 14:32 م" or "أمس" |
| `teacherFeedbackAr` | string | 4-6 sentence feedback message |
| `strengthsAr` | string[] | ≥ 3 bullets |
| `improvementsAr` | string[] | ≥ 3 bullets |
| `quranEvaluation` | reference → E5 | When applicable |

**Featured submissions**:

- **E4.1** — Persona's first attempt of E1.1 (الميم الساكنة), graded "needs revision", grade 65/100, full feedback + Quran evaluation pre-filled. This is what `submission-feedback.html` renders.
- **E4.2** — Persona's first attempt of E1.2 (تلاوة سورة الضحى), still in "بانتظار المراجعة" from the teacher's perspective. This is what `homework-submission-details.html` opens. The teacher's draft form is pre-filled (matching E4.1's grade pattern to demonstrate the page's populated state — not yet saved).

---

## E5. Quran Evaluation (1 instance on submission-feedback.html; 1 instance on homework-submission-details.html)

The four-axis evaluation pattern unique to Quran assignments. **Per Q1 clarification — independent of the final grade**.

| Field | Type | Notes / sample (E5.1 = the featured Quran submission's evaluation) |
|---|---|---|
| `memorizationScore` | integer (0-100) | 85 |
| `memorizationCommentAr` | string | "حفظ ممتاز للآيات — كلمات قليلة جداً تحتاج تثبيتاً" |
| `tajweedScore` | integer (0-100) | 60 |
| `tajweedCommentAr` | string | "تطبيق الإخفاء الشفوي يحتاج تركيزاً أكبر — خاصة عند الالتقاء بالباء" |
| `pronunciationScore` | integer (0-100) | 75 |
| `pronunciationCommentAr` | string | "النطق واضح بشكل عام — المخارج الجانبية تحتاج تعديلاً" |
| `fluencyScore` | integer (0-100) | 70 |
| `fluencyCommentAr` | string | "الطلاقة جيدة — حاول تقليل الوقفات الطويلة بين الآيات" |
| `mistakesCount` | integer | 5 |
| `ayahsNeedingReviewAr` | string[] | ["الآية 3", "الآية 4", "الآية 7"] |
| `additionalRecitationNotesAr` | string | "أنصحك بالاستماع إلى تسجيل الشيخ المنشاوي قبل المحاولة الثانية، والتركيز على التطبيق العملي للأحكام أثناء التلاوة." |

**Caption (per R4)**: A short helper line accompanies this entity on both pages explaining that the four axes are diagnostic and the final grade is holistic.

---

## E6. Submission Method (7 instances on submit-assignment.html)

The seven submission methods always visible on the submit page. Each has its own UI block; methods that don't apply to the current assignment are muted with a "غير مطلوب لهذا الواجب" caption.

| Method key | Label (Ar) | Icon | Helper text (Ar) | Applies to E1.1 (الميم الساكنة)? |
|---|---|---|---|---|
| `text-answer` | نص الإجابة | `pen-line` | اكتب إجابتك في المربع أدناه | لا — مكتوم |
| `file-upload` | رفع ملف | `upload-cloud` | حدّ أقصى 10 MB — PDF / DOCX / TXT | لا — مكتوم |
| `audio-upload` | رفع تسجيل صوتي | `mic` | حدّ أقصى 5 MB — MP3 / M4A / WAV | **نعم — مفعّل ومميَّز** |
| `image-upload` | رفع صورة | `camera` | حدّ أقصى 5 MB — JPG / PNG | لا — مكتوم |
| `video-upload` | رفع فيديو | `video` | حدّ أقصى 50 MB — MP4 — مدة قصوى 5 دقائق | لا — مكتوم |
| `external-link` | رابط خارجي | `link` | الصق رابطاً من Google Drive / Dropbox / OneDrive | لا — مكتوم |
| `completion-confirmation` | تأكيد الإنجاز | `check-circle` | للمهام التي لا تتطلب تسليم ملف | لا — مكتوم |

**Audio block (the active one) sample state**:

- Filename preview: `تسجيل-الميم-الساكنة-المحاولة-2.mp3`
- Duration: `01:14 / 01:30`
- Waveform: visual-only horizontal bar with random "amplitude" rectangles (no real audio source)
- Replay/re-record affordances visible

---

## E7. Status (taxonomy)

A finite set of status values used across the feature. Per R5, the teacher's grading form has **5** options; the student-facing pill set has **8** values; the assignments-index status filter chips have **9** (الكل + the 8 row statuses).

### Teacher-side status options (homework-submission-details.html)

| Key | Label (Ar) | Default? | Maps to student pill |
|---|---|---|---|
| `accepted` | مقبول | — | مقبول |
| `accepted-with-notes` | مقبول مع ملاحظات | — | مقبول (notes in feedback panel) |
| `needs-revision` | يحتاج تعديل | **selected by default** | يحتاج تعديل |
| `rejected` | مرفوض | — | مرفوض |
| `deferred` | تأجيل المراجعة | — | قيد المراجعة |

### Student-side row status pill values (assignments.html, assignment-details.html, submission-feedback.html)

| Key | Label (Ar) | Tailwind tint | Icon |
|---|---|---|---|
| `new` | جديد | `bg-accent-100 text-accent-700` | `bell` |
| `due` | مطلوب التسليم | `bg-slate-100 text-slate-700` | `clock` |
| `submitted` | تم التسليم | `bg-info-100 text-info-700` | `send` |
| `under-review` | قيد المراجعة | `bg-info-100 text-info-700` | `eye` |
| `accepted` | مقبول | `bg-success-100 text-success-700` | `check-circle` |
| `needs-revision` | يحتاج تعديل | `bg-warning-100 text-warning-700` | `alert-triangle` |
| `late` | متأخر | `bg-danger-100 text-danger-700` | `alert-octagon` |
| `rejected` | مرفوض | `bg-danger-100 text-danger-700` | `x-circle` |

### Student-side filter chips on assignments.html

The 9 chips are: `الكل` (selected by default), then the 8 row statuses above. Each chip is a styled `<button type="button">` with the same tint as its corresponding pill but lighter weight when unselected.

### Perspective-dependent label note

The student-side `under-review` pill ("قيد المراجعة") and the teacher-side queue label "بانتظار المراجعة" describe **the same underlying state** — a submission that has been delivered to the teacher but not yet graded. The labels intentionally differ by perspective:

- **Student perspective** ("قيد المراجعة" — *under review*): from the student's vantage, my submitted work is currently being looked at — the action is happening *to* my work.
- **Teacher perspective** ("بانتظار المراجعة" — *awaiting review*): from the teacher's vantage, this row is in my inbox waiting for me to act — the action is pending *from* me.

This is **not** a duplicate or inconsistent label — it is a deliberate re-rendering of the same Submission entity with the role-appropriate phrasing. Implementers MUST NOT homogenize the two labels (e.g., do not change the teacher-side label to "قيد المراجعة" or the student-side label to "بانتظار المراجعة"); the perspective duality is part of the academy's voice and reinforces the role-aware design. The cross-page anchor (FR-072) requires the *same submission* to appear on both sides — but with each side's natural label.

---

## E8. Teacher Grading Form Snapshot (1 instance on homework-submission-details.html)

The composed editable state on the teacher's grading surface.

| Field | Type | Sample value (E8.1 = featured form draft) |
|---|---|---|
| `numericGrade` | integer (0-100) | 65 |
| `feedbackTextAr` | string | 4-sentence draft per E4.1 |
| `strengthsItems` | string[] | ≥ 3 bullet inputs, each editable |
| `improvementsItems` | string[] | ≥ 3 bullet inputs, each editable |
| `selectedStatusKey` | enum (E7 teacher-side) | `needs-revision` (default) |
| `requestResubmissionFlag` | boolean | `true` (auto-checked when status = needs-revision) |
| `quranEvaluation` | reference → E5 | E5.1 values |
| `axisCommentsAr` | { memorization, tajweed, pronunciation, fluency } | 4 small comment inputs each pre-filled with one line |

**Save state**: All buttons are visual stubs (FR-065). The "حفظ المراجعة" button is `<button type="button">`; the "حفظ كمسودة" link is an inert anchor; the inline "هذا نموذج تجريبي — لا يتم حفظ المراجعة فعلياً" notice clarifies prototype behavior.

---

## E9. Summary Card (5 on assignments.html; 4 on homework-review.html)

Quick-glance workload counters above each list.

### Student-side (5 cards on assignments.html)

| Label (Ar) | Count | Accent tint | Icon |
|---|---|---|---|
| واجبات مطلوبة | 3 | `bg-accent-50 border-accent-200 text-accent-700` | `clipboard-list` |
| تم التسليم | 4 | `bg-info-50 border-info-200 text-info-700` | `send` |
| بانتظار المراجعة | 1 | `bg-info-50 border-info-200 text-info-700` | `eye` |
| تحتاج تعديل | 1 | `bg-warning-50 border-warning-200 text-warning-700` | `alert-triangle` |
| متأخرة | 1 | `bg-danger-50 border-danger-200 text-danger-700` | `alert-octagon` |

The summary-card counts derive deterministically from the R8 row inventory.

### Teacher-side (4 cards on homework-review.html)

| Label (Ar) | Count | Accent tint | Icon |
|---|---|---|---|
| بانتظار المراجعة | 4 | `bg-info-50 border-info-200 text-info-700` | `inbox` |
| تم القبول اليوم | 2 | `bg-success-50 border-success-200 text-success-700` | `check-circle` |
| تحتاج تعديل | 1 | `bg-warning-50 border-warning-200 text-warning-700` | `alert-triangle` |
| تسليمات متأخرة | 1 | `bg-danger-50 border-danger-200 text-danger-700` | `alert-octagon` |

Counts derive from the R9 queue inventory.

---

## E10. Filter Set (4 dropdowns + 1 search input per index page)

Visual-only filter controls.

### Student-side filters (above the table on assignments.html)

| Filter | Type | Options shown |
|---|---|---|
| الدورة | select | كل الدورات / القرآن الكريم — المستوى الثالث / اللغة العربية — التعبير / القرآن الكريم — المستوى الثاني |
| المعلم | select | كل المعلمين / الأستاذ أحمد العمري / الأستاذة سلمى البلوي |
| الشهر | select | كل الشهور / مارس 2026 / أبريل 2026 / مايو 2026 |
| الحالة | select | (echoes the chip set) |
| Search input | text | placeholder "ابحث عن واجب أو دورة..." |

### Teacher-side filters (above the table on homework-review.html)

| Filter | Type | Options shown |
|---|---|---|
| الدورة | select | كل الدورات / القرآن الكريم — المستوى الثالث / اللغة العربية — التعبير / الدراسات الإسلامية — السيرة / الرياضيات — الأساسيات |
| الطالب | select | كل الطلاب / عبدالرحمن السعد / محمد السعيدي / عمر القحطاني / أحمد الغامدي / فيصل العتيبي / ريم الدوسري / ليلى المنصور / سارة الحربي |
| الحالة | select | (echoes the chip set) |
| التاريخ | select | كل التواريخ / اليوم / آخر 24 ساعة / آخر 7 أيام / مخصص... |
| Search input | text | placeholder "ابحث باسم الطالب أو الواجب..." |

---

## E11. Person References (Teachers and Students)

### Teachers

| Key | Display name (Ar) | Subject(s) | Avatar initials |
|---|---|---|---|
| `t-ahmad-omari` | الأستاذ أحمد العمري | القرآن الكريم — المستوى الثالث (and Level 2 historically) | أ.أ |
| `t-salma-balwi` | الأستاذة سلمى البلوي | اللغة العربية — التعبير + النحو | أ.س |

The teacher viewing the two teacher pages is **t-ahmad-omari** — same teacher who set the featured Quran assignment and graded the prior attempt.

### Students (used on the teacher's homework-review queue)

| Key | Display name (Ar) | Grade level | Sample assignment |
|---|---|---|---|
| `s-abdulrahman-saad` (persona) | عبدالرحمن السعد | المستوى الثالث | تلاوة سورة الضحى |
| `s-mohammed-saidi` | محمد السعيدي | المستوى الثاني | كتابة فقرة "أهمية القراءة" |
| `s-omar-qahtani` | عمر القحطاني | المستوى الثالث | تلاوة سورة الفلق |
| `s-ahmed-ghamdi` | أحمد الغامدي | المستوى الأول | حلّ أسئلة الفصل الأول |
| `s-faisal-otaibi` | فيصل العتيبي | المستوى الثاني | حفظ آيات من سورة الإسراء |
| `s-reem-dosari` | ريم الدوسري | المستوى الثالث | تأمل في معاني سورة القدر |
| `s-layla-mansour` | ليلى المنصور | المستوى الثاني | حلّ تمارين النحو |
| `s-sarah-harbi` | سارة الحربي | المستوى الأول | تسميع جدول الضرب |

---

## Cross-spec invariants

| Invariant | Source | This feature |
|---|---|---|
| Persona name | Spec 001 §E2 | عبدالرحمن السعد — used on every student-side page header |
| Family balance | Spec 002 (notifications) / Spec 003 §R14 | 750 ر.س — referenced if any context surfaces it (not directly used in this feature) |
| Primary teacher | Spec 003 §R14 | الأستاذ أحمد العمري — same teacher graded the resubmission case + is the actor on both teacher pages |
| 19-badge catalog | Spec 001 §E6 | All E7 status pills draw from this catalog only — no new variants |
| Latin digits in Arabic copy | Spec 002 SC-006 | All grades, dates, ages, attempts, scores use Latin 0-9 |
| Bell-as-anchor header | Spec 002 T003 | Header carried over verbatim on student pages; teacher pages use the equivalent teacher-shell header |
| Sidebar drawer (mobile) | Spec 001 / `assets/js/main.js` | No new JS — drawer carries over as the only sanctioned interaction |
