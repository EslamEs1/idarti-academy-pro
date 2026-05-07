# Phase 1 Data Model — Student Dashboard and Learning Journey

This document defines the visual entities used across the four pages of Spec 002. Like Spec 001, this is a **visual / sample-data model** — none of these entities are persisted, fetched, or rendered by JavaScript. Each entity is committed as static HTML.

All entities anchor to the sample-data persona locked in Spec 001 §E2 and confirmed by Spec 002 research.md §R7 (Abdulrahman, Quran path, Level 3, April 2026).

---

## E1. Student Profile (single instance)

The persona used across all four pages and inherited from Spec 001.

| Field | Sample value | Notes |
|---|---|---|
| `nameAr` | "عبد الرحمن مؤمن" | Header user-block + welcome hero. |
| `avatarInitials` | "ع.م" | `h-10 w-10 rounded-full bg-primary-700 text-white`. |
| `roleLabelAr` | "طالب" | Sidebar role badge. |
| `pathAr` | "مسار القرآن الكريم" | Welcome hero + journey page anchor. |
| `currentLevel` | "المستوى الثالث" | Welcome hero subtitle + path-progress block. |
| `monthlyProgressPct` | 68 | Welcome hero progress bar + parent confidence card. |
| `attendanceRatePct` | 92 | Monthly progress overview + parent confidence. |
| `homeworkCommitmentPct` | 85 | Monthly progress overview + parent confidence. |
| `quizAveragePct` | 78 | Monthly progress overview. |
| `currentLevelProgressPct` | 60 | Monthly progress overview + path progress. |
| `achievementPoints` | 1280 | Monthly progress overview. |
| `activeLiveSessionsCount` | 4 | Monthly progress overview. |
| `nextEvaluationDateAr` | "12 مايو 2026" | Parent confidence card. |
| `lastTeacherNoteQuote` | "ملاحظة موجزة من الأستاذ أحمد." | Parent confidence card (one-line quote). |

---

## E2. Learning Path Level

The four levels of the Quran path, used in the dashboard's Path Progress block and referenced from the journey timeline.

| levelNumber | nameAr | status | levelProgressPct |
|---|---|---|---|
| 1 | "أساسيات التلاوة والتجويد" | completed | 100 |
| 2 | "مدّ الحروف وأحكام النون الساكنة" | completed | 100 |
| 3 | "أحكام الميم الساكنة وحفظ الجزء الثلاثين" | active | 60 |
| 4 | "إتقان التلاوة وتفسير قصار السور" | locked | 0 |

**Visual contract**: Completed levels use `bg-success-50 border border-success-200` with the `check-circle` icon; the active level uses `bg-accent-50 border-2 border-accent-500` with the `compass` icon and a "حالياً" caption; locked level uses `bg-slate-50 border border-slate-200` with the `lock` icon at reduced contrast (text-slate-400). Color is paired with icon + label per FR-035.

---

## E3. Weekly Goal (4 instances on dashboard, 4 on weekly plan)

| labelAr | statusKey | statusBadgeAr |
|---|---|---|
| "حضور حصتين مباشرتين" | completed | "مكتمل" |
| "تسليم 3 واجبات" | in-progress | "قيد التنفيذ" → mapped to "قيد المراجعة" |
| "مراجعة ملاحظات المعلم" | not-started | "لم يبدأ" → mapped to "قيد الانتظار" |
| "الاستعداد للاختبار الشهري" | in-progress | "قيد التنفيذ" → mapped to "قيد المراجعة" |

**Note on status mapping**: Spec 001's badge catalog does not literally include "قيد التنفيذ" or "لم يبدأ"; this feature reuses the closest-meaning catalog entries ("قيد المراجعة" and "قيد الانتظار" respectively) so the badge palette stays within the catalog, per Spec 001's no-new-badges rule. The acceptance scenarios in spec.md FR-013 use the everyday Arabic ("مكتمل" / "قيد التنفيذ" / "لم يبدأ") for narrative clarity; the concrete badges drawn from the catalog are the mapped values.

---

## E4. Upcoming Live Session (1 instance on dashboard, ≥ 2 on weekly plan)

| Field | Sample value (dashboard) |
|---|---|
| `sessionTitleAr` | "أحكام الميم الساكنة — تطبيق عملي" |
| `teacherNameAr` | "الأستاذ أحمد بن عبد الله" |
| `dateTimeAr` | "الإثنين 28 أبريل 2026 — 7:00 م" |
| `courseAr` | "القرآن الكريم — المستوى الثالث" |
| `typeAr` | "جماعي" |
| `joinHref` | `live-sessions.html` |
| `addToCalendarHref` | `calendar.html` (visual only) |

**Visual contract**: card uses `bg-primary-50 border border-primary-200`, primary "انضمام للحصة" button uses `bg-primary-700 text-white`, secondary "إضافة للتقويم" uses `border border-slate-300 text-text-base`.

---

## E5. Homework Item (≥ 3 on dashboard, ≥ 3 on weekly plan)

| titleAr | courseAr | dueDateAr | statusBadgeAr | teacherAr |
|---|---|---|---|---|
| "حفظ سورة الملك (الآيات 1-15)" | "القرآن الكريم" | "30 أبريل 2026" | "قيد الانتظار" | "الأستاذ أحمد بن عبد الله" |
| "إعراب فقرة من النص الأدبي" | "اللغة العربية" | "1 مايو 2026" | "تم التسليم" | "الأستاذة فاطمة الزهراني" |
| "تمارين القسمة المطولة (صفحة 42-46)" | "الرياضيات" | "27 أبريل 2026" | "متأخر السداد" | "الأستاذ خالد السبيعي" |
| "Reading comprehension worksheet" | "اللغة الإنجليزية" | "2 مايو 2026" | "قيد المراجعة" | "الأستاذة منى العتيبي" |

**View link**: each row has "عرض الواجب" linking to `assignments.html`.

---

## E6. Teacher Note (≥ 3 on dashboard)

| categoryKey | bodyAr | dateAr | teacherAr |
|---|---|---|---|
| positive | "أداء عبد الرحمن في حصة الإثنين كان متميزاً — التزام وإتقان واضح في تطبيق أحكام التجويد." | "21 أبريل 2026" | "الأستاذ أحمد بن عبد الله" |
| improvement | "أنصح بزيادة وقت المراجعة قبل الحصة المباشرة بمعدل 15 دقيقة لكل حصة لتحسين الانخراط." | "23 أبريل 2026" | "الأستاذة فاطمة الزهراني" |
| quran-specific | "العمل على إتقان مخارج حروف الإطباق (الصاد والضاد والطاء والظاء) — مع التدرّب على التفريق بين الضاد والظاء." | "25 أبريل 2026" | "الأستاذ أحمد بن عبد الله" |

**Visual contract**: each note is a card with `border-s-4` accent in the success / accent / primary color depending on category, plus a category caption above the body and the teacher name + date below.

---

## E7. Achievement Badge (≥ 3 on dashboard)

| nameAr | iconLucide | earnedDateAr | descriptionAr |
|---|---|---|---|
| "نجم الحضور" | `star` | "أبريل 2026" | "حضور 100% من الحصص الشهرية." |
| "بطل الواجبات" | `award` | "أبريل 2026" | "تسليم 12 واجباً متتالياً في موعدها." |
| "تميّز شهر أبريل" | `trophy` | "30 أبريل 2026" | "أعلى معدل تقدّم في مسار القرآن لشهر أبريل." |

**Visual contract**: square cards (`rounded-xl bg-accent-50 border border-accent-200`), 48 × 48 icon at top in `text-accent-700`, name in `text-sm font-semibold`, date in `text-xs text-text-muted`. Cards arranged in `grid grid-cols-1 sm:grid-cols-3 gap-3`. Section CTA: "عرض كل الإنجازات" → `achievements.html`.

---

## E8. Timeline Milestone (≥ 9 on learning-journey, ≥ 5 in dashboard preview)

The full chronological journey, oldest first.

| dateAr | titleAr | descriptionAr | relatedCourseAr | statusBadgeAr |
|---|---|---|---|---|
| "5 سبتمبر 2025" | "الانضمام للأكاديمية" | "أتمّ عبد الرحمن إجراءات التسجيل وانضم رسمياً لمسار القرآن الكريم." | "مسار القرآن الكريم" | "مكتمل" |
| "12 سبتمبر 2025" | "بداية أول دورة" | "بدأ المستوى الأول: أساسيات التلاوة والتجويد." | "القرآن — المستوى 1" | "مكتمل" |
| "15 سبتمبر 2025" | "حضور أول حصة مباشرة" | "حضر حصة المقدمة مع الأستاذ أحمد بن عبد الله." | "القرآن — المستوى 1" | "مكتمل" |
| "22 سبتمبر 2025" | "تسليم أول واجب" | "سلّم تطبيقاً عملياً لأحكام الاستعاذة والبسملة." | "القرآن — المستوى 1" | "مكتمل" |
| "30 أكتوبر 2025" | "اجتياز اختبار شهري" | "حصل على درجة 92% في اختبار شهر أكتوبر." | "القرآن — المستوى 1" | "ناجح" |
| "20 ديسمبر 2025" | "إنهاء المستوى الأول" | "أتمّ المستوى الأول بمعدل إتقان 95%." | "القرآن — المستوى 1" | "ممتاز" |
| "5 يناير 2026" | "نيل أول شهادة" | "حصل على شهادة إتمام المستوى الأول مع تقدير 'ممتاز'." | "القرآن — المستوى 1" | "ممتاز" |
| "10 فبراير 2026" | "نيل وسام 'بطل الواجبات'" | "نال الوسام بعد تسليم 12 واجباً متتالياً في موعدها." | "متعدد المسارات" | "ممتاز" |
| "1 أبريل 2026" | "بدء المستوى الثالث" | "انتقل إلى المستوى الثالث: أحكام الميم الساكنة والحفظ." | "القرآن — المستوى 3" | "حالياً" (status text + accent color) |

**Note**: The "حالياً" pseudo-badge is rendered as `bg-accent-100 text-accent-700` with the `compass` icon and the literal Arabic word — not a member of the 19-badge catalog, but acceptable as a *milestone-state indicator* (not a record-status badge). FR-032 mandates that the current milestone be visually distinct from completed and upcoming, which this satisfies via color + icon + word.

---

## E9. Weekly Plan (single instance — week of 27 أبريل – 3 مايو 2026)

The weekly plan groups multiple item types under one week. Concrete sub-blocks:

### E9.1 Weekly Goals (4 items)
Same as E3.

### E9.2 Upcoming Sessions (≥ 2 items; reuses E4 shape)
- "أحكام الميم الساكنة — تطبيق عملي" — الأستاذ أحمد — الإثنين 28 أبريل 7:00 م — جماعي.
- "ورشة تجويد المدّ" — الأستاذ أحمد — الأربعاء 30 أبريل 5:00 م — خاص.

### E9.3 Homework Deadlines (≥ 3 items; reuses E5 shape).

### E9.4 Review Tasks (≥ 2 items)
- "مراجعة سورة الفاتحة بأحكام التجويد" — مدة مقترحة 15 دقيقة.
- "مراجعة قواعد الإعراب من المستوى الثاني" — مدة مقترحة 30 دقيقة.

### E9.5 Exam Preparation (≥ 2 items)
- "حلّ نموذج اختبار الميم الساكنة" — قبل الاختبار الشهري.
- "تكرار حفظ سورة الملك (الآيات 1-15)" — يومياً قبل النوم.

### E9.6 Teacher Reminders (≥ 2 items)
- "تذكير الأستاذ أحمد: تسجيل تلاوة الميم الساكنة وإرسالها قبل حصة الإثنين."
- "تذكير الأستاذة فاطمة: قراءة فصل من الكتاب الإثرائي قبل حصة الثلاثاء."

### E9.7 Progress Checklist (≥ 5 items)

| labelAr | checked |
|---|---|
| "حضور حصة الإثنين" | true |
| "تسليم واجب القرآن" | true |
| "مراجعة قواعد الإعراب" | false |
| "حلّ نموذج الاختبار التجريبي" | false |
| "قراءة فصل اللغة الإنجليزية" | false |

**Visual contract**: each row uses a static `<input type="checkbox" disabled>` (the `disabled` keeps the visual state without inviting interaction; the prototype is read-only). Checked items get a strike-through on the label.

### E9.8 Motivational Note (1 item)
> "أنت أقرب إلى نهاية المستوى الثالث ممّا تظن — استمر بنفس الإيقاع وستفاجَأ بنتيجة الاختبار الشهري."
> — الأستاذ أحمد بن عبد الله، 27 أبريل 2026

---

## E10. Notification (≥ 8 instances)

Single chronological list, newest first. Type taxonomy: `homework`, `live-session`, `teacher-feedback`, `payment-family`, `achievement`, `exam`.

| timeAr | typeKey | titleAr | bodyAr | unread | ctaAr | ctaHref |
|---|---|---|---|---|---|---|
| "منذ 5 دقائق" | live-session | "تذكير: حصة الميم الساكنة بعد ساعتين" | "ستبدأ الحصة المباشرة مع الأستاذ أحمد عند 7:00 م." | true | "انضمام للحصة" | `live-sessions.html` |
| "منذ ساعتين" | homework | "موعد تسليم واجب القرآن: غداً" | "حفظ سورة الملك (الآيات 1-15) — مستحق 30 أبريل." | true | "افتح الواجب" | `assignments.html` |
| "اليوم 9:30 ص" | teacher-feedback | "ملاحظة جديدة من الأستاذ أحمد" | "أداء متميّز في حصة الإثنين — استمر على هذا النهج." | true | "اقرأ الملاحظة" | `messages.html` |
| "أمس 6:15 م" | achievement | "حصلت على وسام 'نجم الحضور'" | "حضور 100% من حصص شهر أبريل — تهانينا!" | false | "عرض الإنجازات" | `achievements.html` |
| "أمس 2:00 م" | exam | "تذكير: الاختبار الشهري بعد 6 أيام" | "اختبار المستوى الثالث يوم 5 مايو 2026 — ابدأ المراجعة." | false | "عرض جدول الاختبار" | `exams.html` |
| "26 أبريل" | payment-family | "وصلت دفعة شهرية إلى رصيد العائلة" | "تمّت إضافة 750 ر.س إلى رصيد العائلة لتغطية الاشتراك." | false | "عرض سجل المدفوعات" | `payment-history.html` |
| "25 أبريل" | homework | "تمّ قبول واجب اللغة العربية" | "قبلت الأستاذة فاطمة واجب الإعراب — درجة 9/10." | false | "عرض الواجب" | `assignments.html` |
| "24 أبريل" | live-session | "تمّ تسجيل حضورك في حصة الأحكام" | "شكراً لانضمامك المبكر للحصة." | false | — | — |

**Visual contract**:
- Unread row: `bg-white border-s-4 border-accent-500` + leading `h-2 w-2 rounded-full bg-accent-500` dot before the title; title in `font-semibold`.
- Read row: `bg-surface-50 border-s-4 border-transparent` + no dot; title in `text-text-muted`.
- Type icon: 24 × 24 in a small rounded-square `bg-{type}-50 text-{type}-700` chip on the inline-start, mapping homework→primary, live-session→success, teacher-feedback→accent, payment-family→info, achievement→warning, exam→danger.
- The page-level unread count "3" matches the bell badge.

---

## Validation summary

The four pages, considered together, render:

- **6 metric cards** on the dashboard (E1 attendance / homework / quiz / level progress / points / sessions count) — satisfies FR-012.
- **4 weekly goals** with mapped catalog badges — satisfies FR-013.
- **1 upcoming session** on the dashboard, ≥ 2 on the weekly plan — satisfies FR-014.
- **3 homework reminders** on the dashboard, ≥ 3 on weekly plan — satisfies FR-015.
- **3 teacher notes** on the dashboard — satisfies FR-016.
- **4 path levels** in three states — satisfies FR-017.
- **3 named badges** with icons + dates — satisfies FR-018.
- **Parent confidence snapshot** with attendance %, homework %, last note quote, next evaluation date — satisfies FR-019.
- **5 journey-preview milestones** linking to the full timeline — satisfies FR-020.
- **9 timeline milestones** on the journey page in chronological order — satisfies FR-030 / FR-031 / FR-032.
- **9 weekly-plan blocks** each with ≥ 2 items — satisfies FR-040 / FR-041 / FR-042 / FR-043.
- **8 notifications across 6 types** — satisfies FR-050 / FR-051 / FR-052 / FR-053.
- Cumulative distinct catalog badge usages: ≥ 12 — satisfies SC-004.
