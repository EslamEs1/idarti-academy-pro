# Feature Specification: Achievements, Badges, Exams Passed, Levels Completed, and Certificates Frontend

**Feature Branch**: `005-achievements-certificates`
**Created**: 2026-05-08
**Status**: Draft
**Input**: User description: "Build a strong achievements area that motivates students and proves progress to parents. The section must include certificates, monthly exams passed, completed levels, badges, and certificate preview with download action inside preview only."

## Overview

This feature finally fills out the **Achievements & Certificates** layer that the إدارتي academy has been promising on every other page. Every prior-spec page (Spec 001 sidebar entry, Spec 002 dashboard "نيل أول شهادة معتمدة" milestone, Spec 002 learning-journey "بطل الواجبات" badge, Spec 003 my-courses "عرض الشهادة" CTA on the completed Quran L1 row, Spec 003 course-details "الشهادة المعتمدة" sub-card) currently links to a 404 destination. Spec 005 ships eight pages — six on the student side and two on the admin side — that turn every "your certificates", "your badges", "your achievements" reference into a real, motivating, parent-facing surface.

The spec adds:

1. `pages/student/achievements.html` — the motivational hub: "إنجازاتك التعليمية" headline, four summary cards (certificates / monthly exams passed / completed levels / badges earned), recent-achievement timeline, featured certificate, recent badges, and CTA links into each detail page.
2. `pages/student/certificates.html` — a grid/list of certificate cards (name + course + teacher + issue date + reason + status + "View" CTA only — **no download button on the card**, per the user's explicit constraint).
3. `pages/student/certificate-preview.html` — the large parchment-style preview with academy logo, student name, certificate title, course/level, teacher name, issue date, certificate ID, and the **download / print / share / back action cluster (the only place download is offered)**.
4. `pages/student/monthly-exams-passed.html` — a chronological list of passed monthly exams with month / course / score / percentage / status / teacher note / "View details" CTA.
5. `pages/student/completed-levels.html` — a list of finished curriculum levels with course / start date / completion date / final evaluation / next-recommended-level / certificate-availability indicator / "View report" CTA.
6. `pages/student/badges.html` — the badge wall covering 7 distinct achievement-badge types (Attendance Star, Homework Hero, Top of Class, Most Improved, Quran Progress, Monthly Excellence, Consistency Badge), each with icon + description + earned date + reason + visibility status.
7. `pages/admin/certificates.html` — the academy's certificate-management list (student / course / teacher / type / issue date / status + actions: view / edit / issue / revoke — all visual stubs).
8. `pages/admin/create-certificate.html` — the form UI for issuing a new certificate (student / type / course / level / teacher / reason / issue date / notes + Preview button + visual Save).

The feature is purely visual / frontend. No real PDF generation, no real download (the certificate-preview's "Download PDF" button is a `<button type="button">` visual stub like every other Submit/Save/Confirm in the prototype), no real form persistence, no API calls. The point is to make the academy's promise — *we celebrate every milestone and document every certificate* — unmistakable end-to-end, while keeping the **download-action-inside-preview-only** rule enforced as a design discipline that prevents stakeholders from confusing "view certificate" with "have the file".

The cross-page narrative anchors to the persona Abdulrahman locked since Spec 001 §E2: 4 certificates earned (Quran Level 1 + Quran Level 2 + Monthly Excellence March + Attendance for Term 2), 5 monthly exams passed (Dec 2025 → Apr 2026), 2 completed curriculum levels (Quran L1 + L2, with L3 currently in progress at 60%), and 7 badges earned (the full set listed in the user's brief). Every count, every date, every grade reconciles with what the dashboard / learning-journey / my-courses / weekly-plan already claim about this student.

---

## Clarifications

### Session 2026-05-08

- Q: How should the admin certificates table's per-row action affordances (FR-075) vary across the three certificate states — `بانتظار الاعتماد` (pending) vs `معتمدة` (active) vs `ملغاة` (revoked)? → A: **State-aware actions.** The 4-action cell is rendered per-row according to the row's status: (a) **Pending rows** show عرض / تعديل / **إصدار** (approve & activate the certificate) / إلغاء. (b) **Active rows** show عرض / تعديل / **إعادة إصدار** (resend the certificate to student + parent) / إلغاء. (c) **Revoked rows** show عرض / تعديل (visually disabled) / **إعادة تفعيل** (restore — replaces the "Issue/Re-Issue" slot) / إلغاء (visually disabled — already revoked). The third action's label flips automatically per-row, and the destructive action stays disabled when its outcome is already in effect. Reviewers see the academy's actual operational logic on the table.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Opening the Achievements Hub (Priority: P1) 🎯 MVP

A student opens the **Achievements** page from the sidebar (or from the dashboard's "عرض كل الإنجازات" link, the parent dashboard's certificates pointer, the learning-journey footer, the my-courses completed-card "عرض الشهادة" CTA, or the notifications list). They want to feel a wave of pride: **how much have I earned so far?** The page must answer that in five seconds — four big counters at the top, a motivational headline, a featured certificate that they can show their parent, the most recent badges they've unlocked, and a recent-achievement timeline that contextualises the journey.

**Why this priority**: This is the canonical motivation surface — the page every other page is pointing at. It is the parent's first-stop when they ask "show me what you've earned this term". Without it, every prior-spec link 404s and the academy's "we celebrate every milestone" promise is unsubstantiated. P1 because it's the entry point for the whole feature.

**Independent Test**: Open `pages/student/achievements.html` from the file explorer. Without any other context, the viewer must be able to answer in 30 seconds: "How many certificates has this student earned? How many monthly exams have they passed? How many curriculum levels have they completed? How many badges have they unlocked? What's their featured certificate (the one they'd hand a parent first)? What were their most recent 3 achievements in chronological order?" — entirely from the visible page content. CTA links to each detail page must be present and obvious.

**Acceptance Scenarios**:

1. **Given** a student opens the achievements page, **When** they look at the top, **Then** they see h1 "إنجازاتك التعليمية" + a 1-2 sentence motivational subtitle (e.g., "كل ما حقّقته في رحلتك التعليمية موثَّق هنا — اعرض تقدّمك بفخر لوالديك ومعلميك.") and the persona greeting in the header chrome.
2. **Given** the student wants a workload glance, **When** they look below the header, **Then** they see exactly four summary cards (1 col mobile / 2 col tablet / 4 col desktop): "الشهادات المعتمدة" (4), "اختبارات شهرية مجتازة" (5), "مستويات أكملتها" (2), "أوسمة حصلت عليها" (7) — each with distinct accent color paired with an icon (color is never alone).
3. **Given** the student wants the headline achievement, **When** they look at the "الشهادة المميَّزة" panel, **Then** they see a parchment-styled card showing the Quran Level 1 completion certificate (issued 5 يناير 2026), with the persona's name, the course title, the teacher name, a small certificate-ID caption, and a primary "عرض الشهادة" CTA → `certificate-preview.html`.
4. **Given** the student wants to see the journey, **When** they look at the "خط الإنجازات الأخيرة" timeline, **Then** they see ≥ 5 chronologically-ordered milestones spanning the last ~5 months (December 2025 → May 2026): first certificate (5 يناير), Homework Hero badge (15 يناير), Quran Level 2 completion (1 مارس), Monthly Excellence March (15 أبريل), Attendance Star (10 أبريل). Each milestone shows date, type pill (شهادة / وسام / مستوى / اختبار), and a 1-sentence description.
5. **Given** the student wants a celebration glance, **When** they look at the "أحدث الأوسمة" section, **Then** they see ≥ 4 recently-earned badge tiles (icon + name + earned date) plus a "عرض كل الأوسمة" CTA → `badges.html`.
6. **Given** the student wants to drill into any category, **When** they look at the page footer, **Then** they see four CTA cards ("الشهادات", "الاختبارات الشهرية المجتازة", "المستويات المكتملة", "أوسمتي") each linking to its detail page.

---

### User Story 2 — Browsing My Certificates (Priority: P1)

A student taps "الشهادات" on the achievements hub (or "عرض كل الشهادات" from the parent dashboard, or "عرض الشهادة" from a completed my-courses card) and lands on the **Certificates** page. They want a scannable grid of every certificate they've earned, with enough context (course / teacher / issue date / reason) to identify each, plus a "View" CTA that opens the full preview. Crucially, **there is NO download button on this list page** — the design discipline is that downloading happens only inside the preview, so a student must commit to "looking at" a certificate before downloading it.

**Why this priority**: This is the canonical certificates list — the destination the parent dashboard already links to. P1 because it's the second-most-linked-to page in this feature, and because the no-download-on-list rule is explicitly part of the user's brief (it must be visibly enforced from day one).

**Independent Test**: Open `pages/student/certificates.html` from the file explorer. A viewer must be able to answer: "How many certificates has this student earned? What are their names? Which course / teacher does each belong to? When was each issued? What was the reason? Which is featured/recent? Where do I view each one?" — entirely from the page. The viewer must NOT find a download button anywhere on this page.

**Acceptance Scenarios**:

1. **Given** the student opens certificates, **When** they look at the page, **Then** they see h1 "شهاداتي المعتمدة" + a count caption ("4 شهادات منذ بداية رحلتك") + a small "تنزيل الشهادة متاح من داخل صفحة المعاينة فقط — حافظ على رحلتك موثَّقة" callout banner explicitly enforcing the design rule.
2. **Given** the student looks at the grid, **When** they count the cards, **Then** they see exactly 4 certificate cards in a responsive grid (1 / 2 / 3 cols at mobile / tablet / desktop): Quran L1 / Quran L2 / Monthly Excellence March / Attendance Star Term 2.
3. **Given** the student looks at any one card, **When** they read it, **Then** they see: certificate name, student name (عبد الرحمن مؤمن), course chip, teacher chip with avatar, issue date, reason caption (1 line), status pill (معتمدة / موقّعة / موثّقة), AND a single primary "عرض الشهادة" CTA → `certificate-preview.html`. **No "تنزيل" / "Download" / "PDF" button appears on the card.**
4. **Given** the student wants to filter, **When** they look near the top, **Then** they see ≥ 3 visual filter chips (الكل / إتمام مستوى / تميّز شهري / حضور والتزام) — visual-only.
5. **Given** the page is responsive, **When** the student opens at mobile width, **Then** the cards stack to 1 column without horizontal page scroll.

---

### User Story 3 — Opening a Certificate Preview (Priority: P1)

A student taps "عرض الشهادة" on a certificates-list card (or from the my-courses completed card, or from the achievements featured-certificate panel) and lands on the **Certificate Preview** page. They see a large, parchment-styled, decorative preview that looks like a real certificate — academy logo at top, the persona's name in calligraphy weight, the certificate title, the course/level, the teacher's name + signature line, the issue date, a visible certificate ID, and an action cluster below the preview: **Download PDF**, **Print**, **Share with Parent**, **Back to Certificates**.

This is the **only page** in the entire feature where the Download CTA appears. The user's brief makes this an explicit design discipline.

**Why this priority**: The preview-with-download IS the feature's distinguishing pattern. Without this page rendering correctly, the no-download-on-list rule is meaningless. P1 because the rule's enforcement only makes sense when the preview is the visible alternative.

**Independent Test**: Open `pages/student/certificate-preview.html` from the file explorer. A viewer must see — without further interaction — a large certificate preview that looks parchment-styled (decorative border, gold/navy academy palette), with all required attributes visible (logo, name, title, course, teacher, date, ID), AND four action buttons below the preview (Download PDF, Print, Share with Parent, Back to Certificates).

**Acceptance Scenarios**:

1. **Given** the student opens certificate-preview, **When** they look at the page, **Then** the bulk of the viewport is occupied by a parchment-styled certificate card (cream background, gold border, decorative frame, deep-navy text, Tajawal display font for the name) showing: (a) academy logo top-center ("إدارتي" wordmark + accent dot), (b) certificate title "شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد" in display weight, (c) "تشهد أكاديمية إدارتي بأنّ" prefix, (d) student name "عبد الرحمن مؤمن" in calligraphic display weight, (e) "قد أتمّ بنجاح" suffix + level details + course details, (f) issue date "5 يناير 2026", (g) teacher name + signature line ("الأستاذ أحمد بن عبد الله — معلم القرآن الكريم"), (h) certificate ID "IDR-2026-Q01-0042" in a small bottom-corner caption.
2. **Given** the student looks below the preview, **When** they read the action cluster, **Then** they see exactly 4 buttons in this order: primary "تنزيل PDF" (`<button type="button">` — visual stub, NO real download), secondary "طباعة" (visual `<button>`), tertiary "مشاركة مع ولي الأمر" (visual `<button>`), and "العودة للشهادات" link → `certificates.html`.
3. **Given** the page is responsive, **When** the student opens at mobile width (< 768 px), **Then** the certificate scales down proportionally (preserving aspect ratio + decorative frame), the action cluster stacks vertically, and there is no horizontal page scroll.
4. **Given** the page contains the academy promise, **When** the student looks at the bottom of the certificate, **Then** they see a "ختم رسمي" / "Official Seal" decorative element (visual SVG stamp/seal styled in gold) plus the academy QR-code placeholder caption ("امسح للتحقّق من صحّة الشهادة").
5. **Given** the prototype is visual-only, **When** the student looks below the action cluster, **Then** they see a small inline notice: "هذا نموذج تجريبي — لا يتم تنزيل ملف فعلي عند النقر." (matches the prototype-notice convention from Spec 003/004).

---

### User Story 4 — Reviewing Monthly Exams Passed (Priority: P2)

A student opens **Monthly Exams Passed** (from the achievements footer CTA or the sidebar's exams entry → this page if they want only the *passed* ones, separate from the in-progress exams page). They want a chronological list of every monthly evaluation they've passed, what month / course / score / percentage / pass-status / teacher's one-line note — with a CTA to drill into each one's full report.

**Why this priority**: This is the academy's "monthly check-up" surface — important parental signal but secondary to the certificates surface. P2 because it doesn't gate any other page, and because the "Exams" sidebar entry already exists from Spec 001 (this page is the *passed-only* sub-view).

**Independent Test**: Open `pages/student/monthly-exams-passed.html` from the file explorer. A viewer must be able to answer: "How many monthly exams has this student passed? What were the most recent three months and how did they score? What course was each exam on? Which exam earned them an 'excellence' note?" — entirely from the page.

**Acceptance Scenarios**:

1. **Given** the student opens monthly-exams-passed, **When** they look at the page, **Then** they see h1 "الاختبارات الشهرية المجتازة" + count caption "5 اختبارات منذ ديسمبر 2025" + a small subtitle highlighting the cumulative average score.
2. **Given** the student wants the list, **When** they look at the table/cards, **Then** they see ≥ 5 rows in reverse-chronological order: April 2026 (88%, ممتاز, Quran L3) / March 2026 (95%, ممتاز, Quran L2 — final) / February 2026 (82%, جيد جداً, Quran L2) / January 2026 (78%, جيد جداً, transition) / December 2025 (90%, ممتاز, Quran L1 — final).
3. **Given** the student looks at any row, **When** they read it, **Then** they see: month + year, course chip, score (numerator/denominator like "88 / 100"), percentage with horizontal progress bar, status pill (ممتاز / جيد جداً / جيد / مقبول), 1-sentence teacher note quote, and a "عرض التقرير" / "View details" CTA that links to a future-spec exam-report page (placeholder anchor).
4. **Given** the page is responsive, **When** the student opens at mobile width, **Then** the table collapses to stacked cards preserving every cell.

---

### User Story 5 — Reviewing Completed Curriculum Levels (Priority: P2)

A student opens **Completed Levels** from the achievements footer CTA. They want to see every Quran-curriculum level they've finished — start date, completion date, final evaluation grade, what level was recommended next, whether a certificate is available, and a "View report" CTA.

**Why this priority**: This is the academy's "curriculum progress proof" surface — adjacent to but distinct from the my-courses (Spec 003) completion view. The my-courses page lists *finished courses*; this page lists *finished curriculum-levels within courses* (the Quran path has 4 sub-levels). Both lists may overlap but serve different audiences (my-courses is the student's pickup view; completed-levels is the parent-facing record).

**Independent Test**: Open `pages/student/completed-levels.html` from the file explorer. A viewer must be able to answer: "How many curriculum levels has this student completed? Which course did each belong to? When did they start, when did they finish? What grade did they get? What level is recommended next? Is a certificate available for each?" — entirely from the page.

**Acceptance Scenarios**:

1. **Given** the student opens completed-levels, **When** they look at the page, **Then** they see h1 "المستويات التي أكملتها" + count caption "2 من 4 مستويات في مسار القرآن الكريم" + a horizontal progress bar showing 50% of the path complete.
2. **Given** the student wants the list, **When** they look at the cards, **Then** they see exactly 2 completed-level cards: (Card 1) "المستوى الأول — أساسيات التلاوة والتجويد", started 1 سبتمبر 2025, completed 20 ديسمبر 2025, final evaluation "ممتاز", next recommended "المستوى الثاني (مكتمل)", certificate available ✓, "عرض التقرير" CTA; (Card 2) "المستوى الثاني — مدّ الحروف وأحكام النون الساكنة", started 5 يناير 2026, completed 1 مارس 2026, final evaluation "ممتاز", next recommended "المستوى الثالث (حالياً — 60%)", certificate available ✓.
3. **Given** the student wants to see what's coming, **When** they look below the completed list, **Then** they see a single "المستوى التالي" card showing Quran Level 3 in progress (60% bar) + "متابعة من حيث توقّفت" CTA → `my-courses.html`.

---

### User Story 6 — Browsing My Badges (Priority: P2)

A student opens **My Badges** from the achievements footer CTA. They want a wall of every badge they've earned — Attendance Star, Homework Hero, Top of Class, Most Improved, Quran Progress, Monthly Excellence, Consistency Badge — each shown with its icon, description, earned date, the reason for awarding it, and the visibility status (whether the badge is shown on the student's public profile or kept private).

**Why this priority**: Badges are the gamification layer of the academy — important for student motivation but the most "decorative" surface in this feature. P2 because none of the prior-spec pages depends on it, and because the badge-set is a fixed catalog (the user listed exactly 7 types).

**Independent Test**: Open `pages/student/badges.html` from the file explorer. A viewer must be able to identify all 7 badge types, see which the persona has earned (all 7 in the prototype), read the earned date and reason for each, and find the visibility status of each.

**Acceptance Scenarios**:

1. **Given** the student opens badges, **When** they look at the page, **Then** they see h1 "أوسمتي" + count caption "7 من 7 أوسمة" + a motivational subtitle ("كل وسام يعكس جانباً من تميّزك — اعرض ما تفتخر به على ملفك الشخصي.").
2. **Given** the student looks at the wall, **When** they count, **Then** they see exactly 7 badge tiles in a responsive grid (1 / 2 / 3 / 4 cols at mobile / tablet / desktop / wide): Attendance Star (وسام الحضور المتميّز), Homework Hero (بطل الواجبات), Top of Class (أوّل الفصل), Most Improved (الأكثر تطوراً), Quran Progress (متقن القرآن), Monthly Excellence (وسام التميّز الشهري), Consistency Badge (وسام المثابرة).
3. **Given** the student looks at any tile, **When** they read it, **Then** they see: a large icon (Lucide-as-inline-SVG with a distinct hue per badge), badge name in display weight, 1-line description ("لمن يحضر بانتظام كل حصة في الشهر"), earned date ("حصل عليه: 10 أبريل 2026"), reason ("نتيجة 92% حضور خلال الفصل الثاني"), and a visibility-status chip ("مرئي على ملفك الشخصي" / "خاص بك فقط" — see Assumptions).
4. **Given** the student wants to see when others might earn similar badges, **When** they look at the bottom of the page, **Then** they see an aspirational caption: "هل تعرف صديقاً يستحق وساماً؟ شجّعه ليكسب نفس الأوسمة."

---

### User Story 7 — Admin Manages Certificates (Priority: P1)

An admin (الأكاديمية / المدير العام) opens **Certificates** from the admin sidebar (the "Certificates" entry already exists in `pages/admin/dashboard.html` line 111). They want a single workspace listing every certificate the academy has issued — across all students — with student / course / teacher / type / issue date / status, and per-row actions: view (opens the preview), edit (opens the create form pre-filled), issue / re-issue (re-sends to student + parent), and revoke (visual stub).

**Why this priority**: This is the only admin-facing surface in the achievements feature — the academy's certificate-management workspace. P1 because the admin sidebar already wires this destination, and because admin oversight of certificates is the "trust" anchor the academy promises stakeholders.

**Independent Test**: Open `pages/admin/certificates.html` from the file explorer. A viewer must be able to answer: "How many certificates has the academy issued recently? Which students received them? Which teachers signed off? Which are revoked vs active? What can the admin do with each row?" — entirely from the page.

**Acceptance Scenarios**:

1. **Given** the admin opens admin/certificates, **When** they look at the page, **Then** they see h1 "إدارة الشهادات" + a contextual subtitle ("18 شهادة معتمدة هذا الفصل — راجع، حرّر، أو أصدر شهادات جديدة") and the admin-shell chrome (admin sidebar with "الشهادات" active).
2. **Given** the admin wants a workload glance, **When** they look below the header, **Then** they see exactly four summary cards: "شهادات معتمدة" (18), "شهادات بانتظار الاعتماد" (3), "شهادات أصدرت اليوم" (2), "شهادات مُلغاة" (1) — each with distinct accent + icon.
3. **Given** the admin wants to issue a new one, **When** they look near the page header, **Then** they see a primary "إصدار شهادة جديدة" CTA → `create-certificate.html`.
4. **Given** the admin wants to filter, **When** they look at the filter row, **Then** they see ≥ 4 dropdowns (الطالب / الدورة / المعلم / الحالة) + a search input — all visual-only.
5. **Given** the admin looks at the table, **When** they count, **Then** they see ≥ 8 certificate rows covering students from across the academy: عبد الرحمن مؤمن (the persona — Quran L1 + L2), other students (محمد السعيدي / ليلى المنصور / فيصل العتيبي / etc.), with diverse certificate types (إتمام مستوى / تميّز شهري / حضور / جائزة خاصة / إجازة قرآنية). Each row shows the 6 columns + an "إجراءات" cell with 4 inline icons/links: عرض (view, → `../student/certificate-preview.html`), تعديل (edit, → `create-certificate.html?id=…` placeholder), إصدار / إعادة إصدار (re-issue, visual stub), إلغاء (revoke, visual stub).
6. **Given** the admin sees a revoked certificate, **When** they look at row 8 (the revoked one), **Then** the row is visually muted (opacity-60 + strikethrough on the title) with a "ملغاة" pill and the revoke action is disabled-looking.

---

### User Story 8 — Admin Creates a New Certificate (Priority: P2)

An admin taps "إصدار شهادة جديدة" on `admin/certificates.html` and lands on **Create Certificate**. They see a static form UI with fields for student / certificate type / course / level / teacher / reason / issue date / notes, plus "Preview certificate" and "Save certificate" buttons (both visual-only).

**Why this priority**: This is the form-authoring surface for new certificates — important for admin functionality but secondary to the management list. P2 because the prototype's primary value is *demonstrating that the form exists*, not actually persisting a certificate.

**Independent Test**: Open `pages/admin/create-certificate.html` from the file explorer. A viewer must find — without further interaction — a complete form with all 8 fields, a Preview button, and a Save button. The form must visually look authorable, even though every input is a static stub.

**Acceptance Scenarios**:

1. **Given** the admin opens create-certificate, **When** they look at the page, **Then** they see h1 "إصدار شهادة جديدة" + breadcrumb (إدارة الشهادات / إصدار شهادة جديدة) + a small caption ("املأ الحقول التالية لإنشاء شهادة معتمدة جديدة. الشهادة تظهر للطالب وولي الأمر بعد الاعتماد.").
2. **Given** the admin looks at the form, **When** they count the fields, **Then** they see exactly 8 labeled inputs in a logical 2-column grid: (1) `<select>` الطالب pre-populated with student names, (2) `<select>` نوع الشهادة (إتمام مستوى / تميّز شهري / حضور والتزام / إجازة قرآنية / جائزة خاصة), (3) `<select>` الدورة, (4) `<select>` المستوى (e.g., المستوى الأول / الثاني / الثالث), (5) `<select>` المعلم الموقّع, (6) `<textarea>` سبب الإصدار, (7) `<input type="date">` تاريخ الإصدار, (8) `<textarea>` ملاحظات إضافية. Each input has a visible label tied via `for`/`id`.
3. **Given** the admin wants to see the result before saving, **When** they look at the form footer, **Then** they see exactly 3 action buttons: primary "معاينة الشهادة" (`<button type="button">` — visual stub that conceptually opens `../student/certificate-preview.html`), secondary "حفظ الشهادة" (visual stub), tertiary "إلغاء" link → `certificates.html`. A small inline notice clarifies that this is a visual prototype.
4. **Given** the form should feel realistic, **When** the admin looks at it, **Then** key fields are pre-filled with sample values reflecting the persona's next imaginable certificate: الطالب = عبد الرحمن مؤمن, نوع الشهادة = إتمام مستوى, الدورة = القرآن الكريم, المستوى = المستوى الثالث, المعلم = الأستاذ أحمد بن عبد الله, تاريخ الإصدار = (today's date placeholder), سبب الإصدار = "إتمام جميع متطلبات المستوى الثالث بنجاح" (sample text). This anchors the form to the academy's narrative without requiring real input.

---

### Edge Cases

The following states are documented as edge-case patterns. Where the prototype renders one variant, the alternative is documented inline (annotation or comment) so the design intent is preserved without doubling the page count.

- **No certificates yet (empty achievements/certificates)**: The achievements page MUST document an empty state in a comment block ("لم تحصل على أيّ شهادات بعد — أكمل واجباتك بانتظام واحضر اختبارك الشهري لتنال أوّل شهادة!"). The prototype renders the populated state; the empty-state copy lives in an HTML comment for documentation only.
- **No badges yet**: The badges page documents an empty state ("لم تحصل على أيّ وسام حتى الآن — لكن كل تقدم يقربك من أوّل وسام لك") in a comment block. Prototype renders all 7 earned.
- **Certificate revoked**: Documented on `admin/certificates.html` as row 8 (visually muted + strikethrough title + "ملغاة" pill). On the student side (`certificates.html`), revoked certificates do NOT appear at all — they're hidden from the student's list. Documented inline.
- **Pending approval (admin draft)**: A certificate that has been authored on `create-certificate.html` but not yet "Saved + Approved" is in the "بانتظار الاعتماد" state, counted in admin's summary card 2 but not visible on the student side. Documented inline.
- **Print view of certificate-preview**: The page should be print-friendly (a `@media print` fallback that hides the action cluster + sidebar/header and centers the certificate). Documented as a CSS-only behavior.
- **Share link copy state**: When the admin/student taps "مشاركة مع ولي الأمر", the prototype renders a static "تم نسخ الرابط" / "Copy link" affordance. Documented as a visual stub (no clipboard API).
- **Long student names overflow**: All certificate-list cards and the preview page must truncate names gracefully without breaking the parchment layout. Documented as a CSS responsiveness concern.
- **Non-Quran subject certificates**: The prototype showcases Quran certificates predominantly (matching the persona). The admin certificates list MUST include at least 1 Arabic-language and 1 Math/Islamic-Studies certificate to demonstrate the form/list works across subjects. Documented inline.

---

## Requirements *(mandatory)*

### Functional Requirements

The functional requirements below are organized first by cross-page items, then by page (matching the user-story groupings), then by cross-page consistency rules. Every FR is testable by inspecting the rendered HTML; none requires runtime interaction.

#### Cross-page items (apply to all eight pages)

- **FR-001**: Each new page MUST reuse the Spec 001 / Spec 002 / Spec 003 / Spec 004 page chrome — same role-appropriate sidebar (student or admin), same top header with the bell-as-anchor / search / notifications / profile area, same Tajawal font, same color tokens, same `dir="rtl"` root, same Lucide-as-inline-SVG pattern.
- **FR-002**: The student sidebar's "الإنجازات" entry (already wired across all prior-spec student pages) MUST be marked active on the six new student pages; the admin sidebar's "الشهادات" entry (already wired in `pages/admin/dashboard.html`) MUST be marked active on the two new admin pages.
- **FR-003**: Every CTA on every new page MUST link to a real existing HTML file — either an in-prototype page (any page from Spec 001/002/003/004 or the eight pages of this Spec) or to a planned-future page that uses a placeholder anchor `#planned` documented in a comment. No literal `href="#"` is permitted.
- **FR-004**: Each page MUST be openable directly from the file system without a dev server. No script tag may load remote dependencies beyond the Google Fonts CSS that prior pages already load.
- **FR-005**: No new JavaScript handlers may be added in `assets/js/main.js`. The only sanctioned interactions are the existing Spec 001 four (sidebar drawer / dropdown / modal / `data-tabs`). If tab UI is needed (likely none — see contracts), reuse the existing handler with no additions.
- **FR-006**: Every page MUST be responsive at viewport widths 375 / 768 / 1024 / 1280 px with no horizontal page-level scrollbar at any breakpoint.

#### Achievements hub page (US1)

- **FR-010**: `pages/student/achievements.html` MUST contain h1 "إنجازاتك التعليمية" + a 1-2 sentence motivational subtitle.
- **FR-011**: The page MUST contain exactly four summary cards labeled "الشهادات المعتمدة" (4), "اختبارات شهرية مجتازة" (5), "مستويات أكملتها" (2), "أوسمة حصلت عليها" (7) in a 1 / 2 / 4 col responsive grid. Each card carries a distinct accent color paired with an icon; color is never the sole indicator.
- **FR-012**: The page MUST contain a "الشهادة المميَّزة" panel showcasing the Quran Level 1 completion certificate (issued 5 يناير 2026): persona's name + course + teacher + small certificate-ID + a primary "عرض الشهادة" CTA → `certificate-preview.html`.
- **FR-013**: The page MUST contain a "خط الإنجازات الأخيرة" timeline with ≥ 5 chronologically-ordered milestones spanning ~5 months: (1) شهادة المستوى الأول 5 يناير 2026, (2) وسام بطل الواجبات 15 يناير 2026, (3) شهادة المستوى الثاني 1 مارس 2026, (4) اختبار شهر مارس 95% — 10 أبريل 2026, (5) شهادة التميّز الشهري 15 أبريل 2026, (6) وسام الحضور المتميّز 10 أبريل 2026. Each milestone shows date + type pill (شهادة / وسام / مستوى / اختبار) + 1-sentence description.
- **FR-014**: The page MUST contain an "أحدث الأوسمة" section with ≥ 4 recently-earned badge tiles + a "عرض كل الأوسمة" CTA → `badges.html`.
- **FR-015**: The page footer MUST contain four CTA cards linking to: `certificates.html` ("الشهادات"), `monthly-exams-passed.html` ("الاختبارات الشهرية"), `completed-levels.html` ("المستويات المكتملة"), `badges.html` ("أوسمتي").

#### Certificates list page (US2)

- **FR-020**: `pages/student/certificates.html` MUST contain h1 "شهاداتي المعتمدة" + a count caption "4 شهادات منذ بداية رحلتك".
- **FR-021**: The page MUST contain a top callout banner enforcing the design rule: "تنزيل الشهادة متاح من داخل صفحة المعاينة فقط — حافظ على رحلتك موثَّقة" (info-tinted, with `info` icon).
- **FR-022**: The page MUST contain ≥ 3 visual filter chips (الكل / إتمام مستوى / تميّز شهري / حضور والتزام) — visual-only.
- **FR-023**: The page MUST display exactly 4 certificate cards in a responsive grid (1 / 2 / 3 cols) covering: (Card 1) شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد — أ.أحمد — 5 يناير 2026 — "إتمام جميع متطلبات المستوى الأول بتقدير ممتاز" — معتمدة; (Card 2) شهادة إتمام المستوى الثاني — مدّ الحروف وأحكام النون الساكنة — أ.أحمد — 5 مارس 2026 — "إتمام جميع متطلبات المستوى الثاني بتقدير ممتاز" — معتمدة; (Card 3) شهادة التميّز الشهري — مارس 2026 — أ.أحمد — 15 أبريل 2026 — "أعلى درجة في اختبار شهر مارس (95%)" — معتمدة; (Card 4) شهادة الالتزام بالحضور — الفصل الثاني 2025-2026 — إدارة الأكاديمية — 10 أبريل 2026 — "حضور 92% خلال الفصل الثاني" — معتمدة.
- **FR-024**: Each card MUST contain — certificate name (h3), student name caption (عبد الرحمن مؤمن), course chip, teacher chip with avatar, issue date with calendar icon, reason caption (1 line, italic), status pill (معتمدة / موقّعة / موثّقة), AND a single primary "عرض الشهادة" CTA → `certificate-preview.html`. **No "تنزيل" / "Download" / "PDF" button appears on any card.**
- **FR-025**: A `grep -c 'تنزيل\|Download\|PDF' pages/student/certificates.html` MUST return zero matches in any clickable element (the only mention may be inside the FR-021 callout banner explaining the rule itself, which uses "تنزيل" textually).
- **FR-026**: The page MUST be responsive: 1 col mobile / 2 col tablet / 3 col desktop without horizontal page scroll.

#### Certificate preview page (US3)

- **FR-030**: `pages/student/certificate-preview.html` MUST contain a large parchment-styled certificate card occupying ~70% of the viewport at desktop widths. The card uses cream/parchment background (`bg-amber-50` or custom warm cream), a decorative gold border (`border-4 border-accent-500` or similar), and deep navy text (`text-primary-900`).
- **FR-031**: The certificate MUST contain in order: (a) academy logo block at top-center ("إدارتي" wordmark in display weight + accent dot), (b) decorative ornament strip below the logo, (c) certificate-title h2 in display weight ("شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد"), (d) prefix text "تشهد أكاديمية إدارتي بأنّ الطالب", (e) student-name display in calligraphic font weight ("عبد الرحمن مؤمن") at the largest font size on the page, (f) suffix + course/level details ("قد أتمّ بنجاح المستوى الأول من مسار القرآن الكريم — أساسيات التلاوة والتجويد — وذلك بتقدير ممتاز"), (g) issue date block ("صدر بتاريخ: 5 يناير 2026"), (h) two-column footer: signature line on the right ("الأستاذ أحمد بن عبد الله — معلم القرآن الكريم") and academy seal stamp on the left (decorative SVG circle with "أكاديمية إدارتي" inscription), (i) certificate-ID caption at the very bottom ("رقم الشهادة: IDR-2026-Q01-0042" + QR-code placeholder caption "امسح للتحقّق من صحّة الشهادة").
- **FR-032**: An action cluster MUST appear below the certificate (separated by visible whitespace) containing exactly 4 elements in this order: (1) primary "تنزيل PDF" `<button type="button">` (visual stub — NO real download, NO `<a download>`, NO real PDF asset), (2) secondary "طباعة" `<button type="button">` (visual stub), (3) tertiary "مشاركة مع ولي الأمر" `<button type="button">` (visual stub), (4) "العودة للشهادات" `<a href="certificates.html">` link.
- **FR-033**: A small inline notice MUST sit beneath the action cluster: "هذا نموذج تجريبي — لا يتم تنزيل ملف فعلي عند النقر." (warning-tinted, with info icon). This matches the prototype-notice convention from Specs 003/004.
- **FR-034**: At viewport widths < 768 px, the certificate scales down proportionally (preserving aspect ratio + decorative frame), the action cluster stacks vertically, and there is no horizontal page scroll.
- **FR-035**: A `@media print` CSS block MUST hide the sidebar/header/action cluster/inline notice when the user prints the page, leaving only the certificate centered on the printed page. (CSS-only — no JS.)

#### Monthly exams passed page (US4)

- **FR-040**: `pages/student/monthly-exams-passed.html` MUST contain h1 "الاختبارات الشهرية المجتازة" + count caption "5 اختبارات منذ ديسمبر 2025" + a subtitle showing the cumulative average ("متوسط درجاتك: 86.6 من 100").
- **FR-041**: The page MUST display ≥ 5 exam rows in reverse-chronological order (table on desktop, stacked cards on mobile): April 2026 (88%, ممتاز, Quran L3) / March 2026 (95%, ممتاز, Quran L2 — final) / February 2026 (82%, جيد جداً, Quran L2) / January 2026 (78%, جيد جداً, transition between L1 and L2) / December 2025 (90%, ممتاز, Quran L1 — final).
- **FR-042**: Each row MUST contain — month + year, course chip, score (numerator/denominator like "88 / 100"), percentage with horizontal progress bar showing the % fill, status pill (ممتاز / جيد جداً / جيد / مقبول), 1-sentence teacher-note quote, and a "عرض التقرير" CTA linking to a future-spec exam-report page (placeholder anchor `#planned` documented in HTML comment).
- **FR-043**: The page MUST be responsive: table on md+ → stacked cards below md.

#### Completed levels page (US5)

- **FR-050**: `pages/student/completed-levels.html` MUST contain h1 "المستويات التي أكملتها" + count caption "2 من 4 مستويات في مسار القرآن الكريم" + a horizontal progress bar at 50% representing the path-level completion.
- **FR-051**: The page MUST display exactly 2 completed-level cards: (Card 1) "المستوى الأول — أساسيات التلاوة والتجويد", started 1 سبتمبر 2025, completed 20 ديسمبر 2025, final evaluation "ممتاز", next recommended "المستوى الثاني (مكتمل)", certificate available ✓ ("عرض الشهادة" link → `certificates.html`); (Card 2) "المستوى الثاني — مدّ الحروف وأحكام النون الساكنة", started 5 يناير 2026, completed 1 مارس 2026, final evaluation "ممتاز", next recommended "المستوى الثالث (حالياً — 60%)", certificate available ✓.
- **FR-052**: Each card MUST contain — level name (h3), course chip, start-date / end-date pair, final-evaluation pill (ممتاز / جيد جداً / etc), next-recommended pointer with progress indicator if in-progress, certificate-availability indicator (✓ متاحة / ✗ قيد الإصدار), and a "عرض التقرير" CTA linking to a future-spec level-report page (placeholder anchor).
- **FR-053**: A "المستوى التالي" preview card MUST appear below the completed list showing Quran Level 3 in progress (60% bar) + "متابعة من حيث توقّفت" CTA → `my-courses.html`.

#### Badges page (US6)

- **FR-060**: `pages/student/badges.html` MUST contain h1 "أوسمتي" + count caption "7 من 7 أوسمة" + a motivational subtitle.
- **FR-061**: The page MUST display exactly 7 badge tiles in a responsive grid (1 / 2 / 3 / 4 cols) covering all the badge types in the user's brief: Attendance Star (وسام الحضور المتميّز), Homework Hero (بطل الواجبات), Top of Class (أوّل الفصل), Most Improved (الأكثر تطوراً), Quran Progress (متقن القرآن), Monthly Excellence (وسام التميّز الشهري), Consistency Badge (وسام المثابرة).
- **FR-062**: Each badge tile MUST contain — a large icon (Lucide-as-inline-SVG with a distinct hue per badge, displayed inside a circular accent-colored medallion ~80px diameter), badge name (h3 in display weight), 1-line description, earned date, reason (1-2 sentences), and a visibility-status chip ("مرئي على ملفك الشخصي" / "خاص بك فقط").
- **FR-063**: The 7 badges MUST visually use 7 distinct accent hues drawn from the Spec 001 token palette so the grid reads as a vibrant achievement wall — not as a uniform set. Suggested mapping: Attendance Star = success-500, Homework Hero = accent-500, Top of Class = primary-700, Most Improved = info-500, Quran Progress = warning-500, Monthly Excellence = rose-500, Consistency Badge = emerald-500.
- **FR-064**: The badges MUST anchor to dates spanning the persona's history: (1) Attendance Star — earned 10 أبريل 2026 — reason "حضور 92% خلال الفصل الثاني"; (2) Homework Hero — earned 15 يناير 2026 — reason "تسليم جميع الواجبات في موعدها 3 أشهر متتالية" (anchored to learning-journey milestone); (3) Top of Class — earned 20 أبريل 2026 — reason "أعلى درجة بين زملائك في القرآن الكريم — المستوى الثالث"; (4) Most Improved — earned 5 مارس 2026 — reason "تحسّن 25% في درجات اختبارات شهر مارس مقارنة بفبراير"; (5) Quran Progress — earned 1 مارس 2026 — reason "إتقان أحكام النون الساكنة بتقدير ممتاز"; (6) Monthly Excellence — earned 15 أبريل 2026 — reason "أعلى أداء شهري في الفصل — مارس 2026"; (7) Consistency Badge — earned 25 أبريل 2026 — reason "حضور بدون انقطاع لمدة 30 يوماً متتالياً".
- **FR-065**: At least 5 of the 7 badges MUST carry a visibility-status of "مرئي على ملفك الشخصي" (visible to peers); at least 1 MUST carry "خاص بك فقط" (private). Mix is locked so reviewers can verify both states.
- **FR-066**: A bottom aspirational section MUST contain copy encouraging the student to maintain habits ("استمر في الالتزام لتنال أوسمة جديدة") + a small motivational graphic.

#### Admin certificates list page (US7)

- **FR-070**: `pages/admin/certificates.html` MUST contain h1 "إدارة الشهادات" + a contextual subtitle ("18 شهادة معتمدة هذا الفصل — راجع، حرّر، أو أصدر شهادات جديدة") and the admin-shell chrome with "الشهادات" active in the admin sidebar.
- **FR-071**: The page MUST contain exactly four summary cards: "شهادات معتمدة" (18), "شهادات بانتظار الاعتماد" (3), "شهادات أصدرت اليوم" (2), "شهادات مُلغاة" (1) — each with distinct accent + icon.
- **FR-072**: A primary "إصدار شهادة جديدة" CTA MUST appear near the page header → `create-certificate.html`.
- **FR-073**: The page MUST contain ≥ 4 secondary filter dropdowns (الطالب / الدورة / المعلم / الحالة) + a search input — all visual-only.
- **FR-074**: The page MUST display ≥ 8 certificate rows in a responsive table covering ≥ 5 distinct students (including the persona عبد الرحمن مؤمن with at least 2 rows for L1 + L2) and ≥ 4 distinct certificate types (إتمام مستوى / تميّز شهري / حضور / إجازة قرآنية / جائزة خاصة).
- **FR-075**: Each row MUST contain — student name + avatar + grade-level chip, course chip, teacher chip with avatar, certificate-type pill, issue date with calendar icon, status pill (معتمدة / بانتظار الاعتماد / مُلغاة), and an "إجراءات" cell with 4 inline icon-buttons or links **rendered state-aware per the Q1 clarification (2026-05-08)**: (1) **عرض** (view) → `../student/certificate-preview.html` — present on every row, never disabled; (2) **تعديل** (edit) → `create-certificate.html` (with a comment annotation about the edit-prefill pattern) — present on every row, but **visually disabled on revoked rows** (no edits allowed once revoked); (3) **third-slot action — label flips by state**: on `بانتظار الاعتماد` rows the label is **"إصدار"** (approve & activate the certificate, success-tinted button) → `<button type="button">` visual stub; on `معتمدة` rows the label is **"إعادة إصدار"** (resend to student + parent, info-tinted button) → `<button type="button">` visual stub; on `ملغاة` rows the slot is replaced by **"إعادة تفعيل"** (restore the revoked certificate, accent-tinted) → `<button type="button">` visual stub; (4) **إلغاء** (revoke, danger-tinted) → `<button type="button">` visual stub on `بانتظار الاعتماد` and `معتمدة` rows; **visually disabled on ملغاة rows** (already revoked, action is meaningless). The state-aware label rendering MUST be visible to reviewers without interaction — i.e., row 1 (pending sample) shows "إصدار", rows 2-7 (active samples) show "إعادة إصدار", row 8 (revoked sample) shows "إعادة تفعيل".
- **FR-076**: At least 1 row MUST be in each of the three states so reviewers can verify the state-aware action rendering: ≥ 1 row in `بانتظار الاعتماد` (showing "إصدار" + active إلغاء), ≥ 1 row in `معتمدة` (showing "إعادة إصدار" + active إلغاء — the bulk of the table), and ≥ 1 row in `ملغاة` (visually muted with opacity-60 + strikethrough title + "ملغاة" pill + showing "إعادة تفعيل" in the third slot + disabled إلغاء).
- **FR-077**: The page MUST be responsive: table on md+ → stacked cards below md.

#### Admin create certificate page (US8)

- **FR-080**: `pages/admin/create-certificate.html` MUST contain h1 "إصدار شهادة جديدة" + a breadcrumb (إدارة الشهادات / إصدار شهادة جديدة) + a small caption.
- **FR-081**: The form MUST contain exactly 8 labeled inputs in a logical 2-column grid (1 col on mobile): (1) `<select>` الطالب pre-populated with ≥ 8 student names (the persona + others); (2) `<select>` نوع الشهادة with options "إتمام مستوى / تميّز شهري / حضور والتزام / إجازة قرآنية / جائزة خاصة"; (3) `<select>` الدورة; (4) `<select>` المستوى; (5) `<select>` المعلم الموقّع; (6) `<textarea>` سبب الإصدار (multi-line); (7) `<input type="date">` تاريخ الإصدار; (8) `<textarea>` ملاحظات إضافية.
- **FR-082**: Each input MUST have a visible `<label>` tied via `for`/`id` (FR-079 from Spec 004 carry-over).
- **FR-083**: Sample values MUST pre-fill the form to anchor it to the academy narrative: الطالب = عبد الرحمن مؤمن, نوع الشهادة = إتمام مستوى, الدورة = القرآن الكريم — المستوى الثالث, المستوى = المستوى الثالث, المعلم = الأستاذ أحمد بن عبد الله, تاريخ الإصدار = (placeholder for today), سبب الإصدار = "إتمام جميع متطلبات المستوى الثالث بنجاح وبتقدير ممتاز".
- **FR-084**: The form footer MUST contain exactly 3 action elements in this order: (1) primary "معاينة الشهادة" `<button type="button">` (visual stub — conceptually opens `../student/certificate-preview.html`), (2) secondary "حفظ الشهادة" `<button type="button">` (visual stub), (3) tertiary "إلغاء" `<a href="certificates.html">` link.
- **FR-085**: A small inline notice MUST sit beneath the form footer: "هذا نموذج تجريبي — لا يتم حفظ الشهادة فعلياً." (warning-tinted).
- **FR-086**: The form MUST be responsive: 2 col grid at md+ → 1 col below md.

#### Cross-page consistency

- **FR-090**: The Abdulrahman persona locked in Spec 001 §E2 / Specs 002/003/004 (عبد الرحمن مؤمن, ع.م initials, Quran path L3 60% progress) MUST be the assumed viewer across all six student pages, and the assumed *student-of-record* on the admin pages where the persona's certificate rows appear.
- **FR-091**: The dashboard's "نيل أول شهادة معتمدة" milestone (Spec 002, dashboard line 749-750) MUST reconcile with this feature's certificate-1 entry on key shared anchors — same date (5 يناير 2026), same level (المستوى الأول), and same signing teacher (الأستاذ أحمد بن عبد الله). The dashboard uses an abbreviated preview title "شهادة المستوى الأول"; this feature uses the canonical full title "شهادة إتمام المستوى الأول — أساسيات التلاوة والتجويد". The dashboard's preview title is a substring-aligned representation of the canonical full title — the prefix "إتمام" and the course-name suffix "أساسيات التلاوة والتجويد" are added in the canonical version where space allows. Both forms refer to the same certificate; reviewers MUST treat the substring overlap as the reconciliation contract, not require literal-string equality.
- **FR-092**: The learning-journey "بطل الواجبات" milestone (Spec 002, learning-journey line 455) MUST reconcile with this feature's badge-2 (Homework Hero) — same name (بطل الواجبات), same earned-context (3 months consecutive on-time submissions), same date frame (15 يناير 2026).
- **FR-093**: The my-courses completed-card "عرض الشهادة" CTA (Spec 003, `pages/student/my-courses.html` line 441) — which is wired as `<a href="achievements.html">` — MUST land on a real `achievements.html` page where the Quran L1 certificate is visible in the **الشهادة المميَّزة** featured-certificate panel (FR-012). The featured panel's "عرض الشهادة" CTA chains to `certificate-preview.html` (the canonical preview destination). The Quran L1 certificate is ALSO listed on `certificates.html` Card 1 (FR-023), reachable via the achievements hub's footer CTA grid (FR-015). This three-step navigation chain (my-courses → achievements → preview) is the canonical route for the cross-spec link; it is enforced by the achievements hub's existing inbound link target. The prototype does NOT modify Spec 003's link to point at `certificates.html` directly — Constitution Principle II forbids editing prior-spec pages.
- **FR-094**: All eight pages MUST use Latin digits (1, 2, 3, 88, 92, 100...) inside Arabic copy — no Eastern Arabic-Indic digits (٠-٩). This continues the Spec 002 SC-006 rule.
- **FR-095**: All status badges MUST come from the existing Spec 001 19-badge catalog plus the type chips from Specs 002/003/004. Certificate types and badge tints are listed in FR-023 / FR-063 / FR-074. No new badge variants.
- **FR-096**: Color is never the sole indicator of state. Every status pill, every certificate-type pill, every badge medallion, every progress bar, every visibility-status chip pairs color with text and icon (Constitution Principle IV / FR-074 from Spec 004 carry-over).
- **FR-097**: No real `href="#"` placeholder links may exist on any of the eight pages. Same-page anchors (`href="#planned"`, `href="#cert-preview"`) ARE allowed when the target id exists or is documented in a comment.
- **FR-098**: No JavaScript may render content — every card, badge, attempt timeline, certificate preview is static markup. The only sanctioned JS interactions are the existing Spec 001 sidebar drawer / dropdown / modal / data-tabs handlers; none of the eight pages adds a new handler.
- **FR-099**: No placeholder/filler text is allowed. Every Arabic sentence is meaningful and on-topic. No "Lorem ipsum", no "Item 1 / Item 2", no TBD / FIXME comments visible to the reader.
- **FR-100**: The download-only-inside-preview rule MUST be visibly enforced: the only page with any download/print/share action is `certificate-preview.html`. A grep across the other 7 pages for `تنزيل\|Download\|PDF\|طباعة\|Print` (in clickable elements) MUST return zero matches except for the FR-021 callout banner on `certificates.html` which mentions the rule textually.

---

### Key Entities *(visual / sample data)*

The feature uses static sample data anchored to the Spec 001/002/003/004 personas. None of these entities are persisted, fetched, or rendered by JavaScript — every value is committed in HTML.

- **Certificate** — A formal document recording a learning achievement. Attributes: certificate ID (e.g., `IDR-2026-Q01-0042`), title (Arabic), type (إتمام مستوى / تميّز شهري / حضور والتزام / إجازة قرآنية / جائزة خاصة), course reference, level reference (when applicable), teacher reference (signing teacher), issue date, reason text, status (معتمدة / بانتظار الاعتماد / مُلغاة), and a "featured" flag (for the achievements hub). Sample inventory: 4 student-side certificates + ≥ 8 admin-side certificates spanning multiple students.
- **Badge** — A motivational achievement marker. Attributes: badge key (one of the 7 fixed types), name (Arabic), description (1 line), icon key (Lucide), accent hue (mapped per FR-063), earned date, reason text (1-2 sentences), visibility status (مرئي على ملفك الشخصي / خاص بك فقط). Sample inventory: 7 badges (the full set from the user's brief, all earned).
- **Monthly Exam Result** — A passed monthly evaluation. Attributes: month + year, course reference, score (numerator/denominator), percentage, status (ممتاز / جيد جداً / جيد / مقبول), teacher-note (1 sentence), passed flag (always true on this page). Sample inventory: 5 entries (Dec 2025 → Apr 2026).
- **Completed Curriculum Level** — A finished sub-level within a course's curriculum. Attributes: level number (1-4), level name, course reference, start date, completion date, final-evaluation grade, next-recommended level (with progress when in-progress), certificate-available flag. Sample inventory: 2 entries (Quran L1 + L2).
- **Achievement Timeline Item** — A unified entry on the achievements hub timeline. Attributes: date, type (شهادة / وسام / مستوى / اختبار), title, 1-sentence description. Aggregated from Certificate + Badge + Monthly Exam + Completed Level entities. Sample inventory: ≥ 5 timeline items.
- **Admin Certificate Row** — A row in the admin's certificate-management table. Same attributes as Certificate plus: student reference (the recipient student), creation timestamp, last-edited timestamp, revoked flag. Sample inventory: ≥ 8 rows across ≥ 5 distinct students.
- **Certificate Authoring Form Snapshot** — The composed editable state on `admin/create-certificate.html`. Attributes: 8 form-input values pre-filled to the persona's next imaginable certificate (Quran L3 completion, anticipating end-of-Level-3 issuance).
- **Visibility Status** — A per-badge attribute: "مرئي على ملفك الشخصي" (visible to peers on the social-hub / leaderboard / public profile) or "خاص بك فقط" (visible only to the student and their parent). Drives the badge-tile chip but does NOT affect badge presence on the page. Documented as a future control surface (the student would toggle it on the future profile-settings page; this prototype renders the current state read-only).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer opens `pages/student/achievements.html` and within 30 seconds can answer all of: how many certificates (4), how many monthly exams passed (5), how many completed levels (2), how many badges (7), and identify the featured certificate (Quran Level 1, 5 يناير 2026) — entirely from the visible page content.
- **SC-002**: A reviewer opens `pages/student/certificates.html` and confirms — without further interaction — exactly 4 certificate cards, none of which contains a download / PDF / تنزيل button. Running `grep -nE '(تنزيل|Download|PDF)' pages/student/certificates.html` returns matches ONLY inside the FR-021 callout banner (the explanation), never inside `<button>` or clickable elements.
- **SC-003**: A reviewer opens `pages/student/certificate-preview.html` and finds a parchment-styled certificate occupying the bulk of the viewport, with all required attributes (logo / name / title / course / teacher / date / ID / signature / seal) visible, AND exactly 4 action buttons below (Download / Print / Share / Back).
- **SC-004**: A reviewer opens `pages/student/monthly-exams-passed.html` and within 30 seconds can identify (a) the count of passed exams (5), (b) the highest score (95% in March 2026), (c) the cumulative average (~86.6%), (d) which exam earned the persona the Monthly Excellence badge.
- **SC-005**: A reviewer opens `pages/student/completed-levels.html` and verifies exactly 2 completed-level cards, the 50% path-progress bar, and the in-progress Level 3 preview card.
- **SC-006**: A reviewer opens `pages/student/badges.html` and finds exactly 7 badge tiles representing all the types in the user's brief, each with icon + name + earned date + reason + visibility-status chip. At least 5 are "مرئي" and at least 1 is "خاص".
- **SC-007**: A reviewer opens `pages/admin/certificates.html` and finds 4 summary cards + ≥ 8 certificate rows + 4 actions per row + ≥ 1 visually muted "ملغاة" row + a primary "إصدار شهادة جديدة" CTA.
- **SC-008**: A reviewer opens `pages/admin/create-certificate.html` and finds — without further interaction — a form with 8 labeled inputs (each with `for`/`id` linkage), Preview + Save + Cancel buttons, and a prototype notice.
- **SC-009**: A reviewer running `grep -nE ' href="#"' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` finds zero matches.
- **SC-010**: A reviewer running an Arabic-Indic digit grep against the eight new pages finds zero matches (Latin digits inside Arabic copy throughout).
- **SC-011**: A reviewer running `grep -nE 'innerHTML|createElement|outerHTML|insertAdjacentHTML|document\.write' assets/js/main.js` after this feature still finds zero matches; `assets/js/main.js` line count remains ≤ 80 LOC (no new JS handlers added beyond Spec 001's four sanctioned ones).
- **SC-012**: A reviewer running `grep -nEi 'lorem|Item [0-9]|TBD|FIXME|Course [0-9]|Student [0-9]' pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` finds zero matches.
- **SC-013**: A reviewer counts distinct status badge usages across the eight pages and confirms ≥ 30 individual badge instances drawn from the existing Spec 001/002/003/004 catalogs. No invented badge variants.
- **SC-014**: A reviewer opens any one of the eight pages at viewport widths 375 / 768 / 1024 / 1280 px and verifies (a) no horizontal page-level scrollbar at any breakpoint, (b) the sidebar drawer behaves identically to the Spec 002/003/004 baseline, (c) certificates grid collapses 1/2/3 at 375/768/1024, (d) badges grid collapses 1/2/3/4 at 375/768/1024/1280, (e) the certificate preview scales proportionally at all widths.
- **SC-015**: A reviewer follows these navigation chains with no broken links: **(Chain A — student direct from dashboard)**: `pages/student/dashboard.html` → "عرض كل الإنجازات" → `achievements.html` → click the featured-certificate panel's "عرض الشهادة" CTA → `certificate-preview.html` → "العودة للشهادات" → `certificates.html` → click any card's "عرض الشهادة" → `certificate-preview.html`. **(Chain B — cross-spec from my-courses, per FR-093)**: `pages/student/my-courses.html` → completed-card "عرض الشهادة" → `achievements.html` (this is the actual existing wiring, not `certificates.html`) → featured panel's "عرض الشهادة" CTA → `certificate-preview.html`. **(Chain C — admin)**: `pages/admin/dashboard.html` → "الشهادات" sidebar → `admin/certificates.html` → "إصدار شهادة جديدة" → `create-certificate.html` → "إلغاء" → `admin/certificates.html`. All three chains MUST resolve with zero 404s; reviewers verifying Chain B MUST land on `achievements.html` (not `certificates.html`) per the existing Spec 003 link.
- **SC-016**: A reviewer running `ls pages/student/{achievements,certificates,certificate-preview,monthly-exams-passed,completed-levels,badges}.html pages/admin/{certificates,create-certificate}.html` confirms all eight files exist and are openable in a browser without a dev server.
- **SC-017**: The download-only-inside-preview rule is verifiable: opening `certificate-preview.html` finds the "تنزيل PDF" button; opening any other page in this feature finds no clickable download element. SC-002's grep enforces this for `certificates.html`; the rule is explicit and visible.

---

## Assumptions

The following defaults were selected when the feature description did not specify a particular detail. Each is recorded so a reviewer can override it during `/speckit-clarify` or planning.

- **Persona anchor**: The viewer is عبد الرحمن مؤمن — Quran path Level 3 (60% progress), 4 certificates earned, 7 badges earned, 5 monthly exams passed, 2 curriculum levels completed. Anchored to Spec 001 §E2 and reused across all four prior specs. The persona's first certificate is dated 5 يناير 2026, matching the dashboard / learning-journey milestone.
- **Featured certificate on achievements hub**: Defaults to the Quran Level 1 completion certificate (5 يناير 2026, "أساسيات التلاوة والتجويد", الأستاذ أحمد بن عبد الله) because that's the persona's first/most-prestigious certificate and the dashboard / learning-journey already pin it as the milestone. The Quran Level 2 certificate (5 مارس 2026) is the second-most prominent, surfaced on the certificates list but not as the featured.
- **Download / Print / Share buttons are visual stubs**: Per the Spec 003/004 prototype convention, every Submit / Save / Confirm / Download button is a `<button type="button">` with no real action. The "تنزيل PDF" button on `certificate-preview.html` is no exception — the inline notice in FR-033 makes this explicit. Real PDF generation, real print, real share are out of scope.
- **Certificate ID format**: `IDR-{YYYY}-{COURSE}-{NNNN}` where IDR = إدارتي academy code, YYYY = issue year, COURSE = short course code (Q01 = Quran L1, Q02 = Quran L2, MEXC = Monthly Excellence, ATT = Attendance), NNNN = sequential number. Sample: `IDR-2026-Q01-0042`. Visible on the certificate-preview page. Documented as a visual convention; not implemented as a generation algorithm.
- **Badge visibility-status semantics**: Two values — "مرئي على ملفك الشخصي" (peer-visible on social-hub / leaderboard / public profile) and "خاص بك فقط" (private, only the student and parent see it). The student would control this via a future profile-settings page (out of scope for this spec). The badges page renders the *current state* read-only (some are public, some are private) so reviewers can see both states. FR-065 locks the mix.
- **Admin Issue vs Edit semantics (per Q1 clarification 2026-05-08)**: "تعديل" opens the create-certificate form with the row's data conceptually pre-filled (the link uses a query-string `?id=…` placeholder documented in HTML comment — the prototype itself just opens the create form with the existing pre-fill); on revoked rows the edit action is visually disabled. The third action slot's label is **state-aware**: "إصدار" on pending rows (approve & activate), "إعادة إصدار" on active rows (resend to student + parent), "إعادة تفعيل" on revoked rows (restore). The إلغاء action is visually disabled on revoked rows (already revoked, no-op). All action buttons remain visual stubs with no real backend behavior.
- **Admin sidebar reuse**: The two admin pages embed the existing admin sidebar verbatim from `pages/admin/dashboard.html`. The sidebar contains all entries listed in the constitution (Dashboard, Students, Families, Teachers, Courses, Live Sessions, Assignments, Exams, Certificates, Reports, Payments, Invoices, Tax Settings, Family Balances, Teacher Finance, Roles & Permissions, Social Hub, Platform Settings, Log Out). The "Certificates" entry is the active one on both new admin pages.
- **Certificate type taxonomy**: Five types — إتمام مستوى (curriculum-level completion), تميّز شهري (monthly excellence based on exam score), حضور والتزام (attendance + engagement award), إجازة قرآنية (Quran ijazah / formal recitation chain), جائزة خاصة (special award for unique achievements). The persona's 4 certificates cover 3 of these types (إتمام مستوى × 2, تميّز شهري × 1, حضور والتزام × 1). The admin list demonstrates all 5 types.
- **Monthly exam pass threshold**: The page is titled "الاختبارات المجتازة" (passed exams). The pass threshold is implicit at ≥ 60% / "مقبول" or higher. The persona's lowest score on the page is 78% (جيد جداً). Failed exams (if any) are NOT shown on this page — they live on a separate (future) "all exams" page. The "exams.html" sidebar entry from Spec 001 is the all-exams page; this passed-only page is a sub-view linked from the achievements hub.
- **Completed levels vs completed courses**: The completed-levels page lists curriculum-level completions (the 4 sub-levels within the Quran path). My-courses.html (Spec 003) lists course completions (whole-course objects). They overlap when a course IS a single curriculum level (Quran L1 was both); they diverge for multi-level courses. The persona has completed 2 curriculum levels (L1 + L2) and 1 course (the L1 standalone offering listed in my-courses).
- **Recent timeline scope**: The achievements-hub timeline shows the most recent ~5 months of achievements (December 2025 → May 2026). Older milestones (e.g., enrollment in September 2025) are NOT shown here — they're on the learning-journey page (Spec 002) which is the comprehensive history view.
- **No backend, no real PDF, no real share**: Every action button is a `<button type="button">` with no `onclick`, no `<form action>`, no `<a download>`. The "Download PDF" button on certificate-preview is the most visible such stub; FR-033 documents this with an inline notice.
- **Print stylesheet**: A `@media print` block in the existing `assets/css/input.css` (or as inline style) hides chrome and centers the certificate. No new CSS file is added; the rule is added to input.css if needed and rebuilt via `npm run build:css`.
- **Today's date anchor**: All "today" references anchor to 2026-05-08 (the date this spec is created, matching Specs 003/004). Relative captions ("أمس", "قبل 3 أيام") compute against that date.
- **Currency on certificates**: None — certificates do not display currency. Grades use the format "N / 100" (Latin digits, slash separator). Dates use the format "D MMMM YYYY" in Arabic with Latin digits ("5 يناير 2026").
- **Decorative stamps and seals**: The "ختم رسمي" / academy seal on the certificate-preview page is a decorative SVG circle styled in gold tones, with "أكاديمية إدارتي" inscription. The QR-code placeholder is a 4×4 grid of small dark squares (not a real QR code) with caption "امسح للتحقّق من صحّة الشهادة" — purely visual.

---

## Out of scope

The following items are deliberately excluded from this feature and scheduled for later specs:

- Real PDF generation, real print to PDF, real download. The "تنزيل PDF" button is a visual stub.
- Real share-to-WhatsApp / share-to-email / clipboard-copy logic. The "مشاركة مع ولي الأمر" button is a visual stub.
- The future profile-settings page where the student would control badge visibility.
- The future exam-report page (linked from monthly-exams-passed) and the future level-report page (linked from completed-levels). These are placeholder destinations.
- The future failed-exams page or unified all-exams page. The Spec 001 "exams.html" sidebar entry is a placeholder destination.
- QR-code generation. The QR-code on the certificate is a decorative SVG.
- Verification by certificate ID (e.g., a verify.idarti.com page). The certificate-ID is visible but the verification flow is out of scope.
- Admin-side edit-certificate dialog (in-place edit) or edit-certificate page distinct from create-certificate. The "تعديل" admin action conceptually opens the create form with pre-fill but the prototype does not implement two distinct create vs edit pages.
- Admin-side bulk-issue-certificates flow.
- Parent-side certificate-viewing page (the parent dashboard already wires certificates.html — no separate parent page needed for this prototype).
- Achievement-streak / leaderboard integration. Badges have visibility status but the leaderboard surfacing is a future concern.
- Real-time notifications when a certificate is issued (the notifications page from Spec 002 already covers homework / sessions notifications; certificate-issuance notifications are a future spec extension).
- Translation / multilingual certificates. The prototype is Arabic-only; English certificate variants are out of scope.
- Certificate templates customization (multiple template designs). The prototype renders one parchment design used uniformly across all certificate types.
