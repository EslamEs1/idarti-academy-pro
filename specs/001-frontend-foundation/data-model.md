# Phase 1 Data Model: Frontend Foundation

**Feature**: `001-frontend-foundation`
**Date**: 2026-05-06

This is a static frontend prototype with **no runtime data layer** — no database, no API, no client store. The "data model" here is the shape of the **hard-coded sample content** that lives inside the HTML pages, and the **visual entities** that the UI represents. Documenting it once prevents inconsistencies (e.g., teacher named "أ. أحمد البكري" on the Parent dashboard but "الأستاذ أحمد" on the Teacher dashboard).

All entities below are HTML-embedded sample data only. No persistence, no validation logic, no state transitions in JS.

---

## E1. Role

The role determines which sidebar and dashboard a user sees. Out-of-scope roles (Finance Manager, Support / Operations) are referenced by the constitution but not delivered in this spec.

| Field | Type | Sample value | Notes |
|---|---|---|---|
| `id` | string | `student` \| `parent` \| `teacher` \| `admin` | Used in folder paths (`pages/<id>/`). |
| `labelAr` | string | `طالب`, `ولي أمر`, `معلّم`, `مدير المنصة` | Displayed in the header role label. |
| `accentColor` | token | `primary-700`, `accent-500`, `success-700`, `primary-900` | Used for the avatar circle background. |
| `dashboardPath` | path | `pages/<id>/dashboard.html` | Linked from `index.html` "Continue as..." buttons. |

---

## E2. User (Persona)

The four canonical personas embedded as logged-in user across the dashboard chrome.

| Field | Type | Sample values |
|---|---|---|
| `nameAr` | string | `عبد الرحمن مؤمن` (student), `ولي أمر الطالب عبد الرحمن` (parent), `أ. أحمد البكري` (teacher), `مدير المنصة` (admin) |
| `roleId` | E1 ref | `student`, `parent`, `teacher`, `admin` |
| `initialsAr` | string | `ع.م`, `و.أ`, `أ.ب`, `م.م` (two-character Arabic initials, dot-separated) |
| `avatarColorBg` | token | `bg-primary-700`, `bg-accent-100`, `bg-success-700`, `bg-primary-900` |
| `avatarColorText` | token | `text-white`, `text-primary-800`, `text-white`, `text-accent-400` |

---

## E3. Sidebar Navigation Entry

Every entry in every role's sidebar conforms to this shape.

| Field | Type | Notes |
|---|---|---|
| `labelAr` | string | Arabic label, exact wording per E5. |
| `icon` | Lucide icon name | e.g., `home`, `book-open`, `graduation-cap`, `calendar`, `bell`, `users`, `clipboard-list`, `award`, `chart-bar`, `file-text`, `credit-card`, `wallet`, `percent`, `shield-check`, `share-2`, `settings`, `log-out`. |
| `targetPath` | path | A real planned `.html` path under `pages/<role>/`. Never `#`. |
| `isActive` | boolean | Hard-coded `true` only on the matching role's `dashboard.html` for its own "Home / Dashboard" entry; computed by the page author. |

---

## E4. Course

Referenced in dashboards' sample data.

| Field | Type | Sample values |
|---|---|---|
| `nameAr` | string | `القرآن الكريم`, `اللغة العربية`, `اللغة الإنجليزية`, `الرياضيات`, `الدراسات الإسلامية` |
| `level` | string | `المستوى الأول`, `المستوى الثاني`, `المتوسط`, `المتقدم` |
| `teacherRef` | E2 ref | Typically `أ. أحمد البكري` |

---

## E5. Sidebar Vocabulary (per role)

Canonical Arabic labels for every sidebar entry in this spec. These values are the source of truth — every page that renders a role's sidebar MUST use these exact strings.

### Student (14 entries, FR-009)

| English | Arabic label | Lucide icon | Target path |
|---|---|---|---|
| Home | `الرئيسية` | `home` | `pages/student/dashboard.html` |
| Browse Courses | `استعراض الدورات` | `book-open` | `pages/student/browse-courses.html` |
| My Courses | `دوراتي` | `graduation-cap` | `pages/student/my-courses.html` |
| Live Sessions | `الحصص المباشرة` | `video` | `pages/student/live-sessions.html` |
| Assignments | `الواجبات` | `clipboard-list` | `pages/student/assignments.html` |
| Exams | `الاختبارات` | `file-text` | `pages/student/exams.html` |
| Achievements | `الإنجازات` | `award` | `pages/student/achievements.html` |
| Reports | `التقارير` | `chart-bar` | `pages/student/reports.html` |
| Social Hub | `المجتمع التعليمي` | `share-2` | `pages/student/social-hub.html` |
| Leaderboard | `لوحة المتميزين` | `trophy` | `pages/student/leaderboard.html` |
| Calendar | `التقويم` | `calendar` | `pages/student/calendar.html` |
| Payment History | `سجل المدفوعات` | `credit-card` | `pages/student/payment-history.html` |
| Profile | `الملف الشخصي` | `user` | `pages/student/profile.html` |
| Log Out | `تسجيل الخروج` | `log-out` | `index.html` |

### Parent (11 entries, FR-010)

| English | Arabic label | Lucide icon | Target path |
|---|---|---|---|
| Dashboard | `الرئيسية` | `home` | `pages/parent/dashboard.html` |
| My Children | `أبنائي` | `users` | `pages/parent/my-children.html` |
| Child Reports | `تقارير الأبناء` | `chart-bar` | `pages/parent/child-reports.html` |
| Attendance | `الحضور والغياب` | `calendar-check` | `pages/parent/attendance.html` |
| Homework Follow-up | `متابعة الواجبات` | `clipboard-list` | `pages/parent/homework-followup.html` |
| Certificates | `الشهادات` | `award` | `pages/parent/certificates.html` |
| Invoices | `الفواتير` | `file-text` | `pages/parent/invoices.html` |
| Family Balance | `رصيد العائلة` | `wallet` | `pages/parent/family-balance.html` |
| Messages | `الرسائل` | `message-circle` | `pages/parent/messages.html` |
| Profile | `الملف الشخصي` | `user` | `pages/parent/profile.html` |
| Log Out | `تسجيل الخروج` | `log-out` | `index.html` |

### Teacher (12 entries, FR-011)

| English | Arabic label | Lucide icon | Target path |
|---|---|---|---|
| Dashboard | `الرئيسية` | `home` | `pages/teacher/dashboard.html` |
| My Classes | `حصصي` | `book-open` | `pages/teacher/my-classes.html` |
| Live Sessions | `الحصص المباشرة` | `video` | `pages/teacher/live-sessions.html` |
| Homework Review | `تصحيح الواجبات` | `clipboard-check` | `pages/teacher/homework-review.html` |
| Student Reports | `تقارير الطلاب` | `chart-bar` | `pages/teacher/student-reports.html` |
| Attendance | `الحضور` | `calendar-check` | `pages/teacher/attendance.html` |
| Earnings | `الأرباح` | `wallet` | `pages/teacher/earnings.html` |
| Advances | `السلف` | `hand-coins` | `pages/teacher/advances.html` |
| Calendar | `التقويم` | `calendar` | `pages/teacher/calendar.html` |
| Messages | `الرسائل` | `message-circle` | `pages/teacher/messages.html` |
| Profile | `الملف الشخصي` | `user` | `pages/teacher/profile.html` |
| Log Out | `تسجيل الخروج` | `log-out` | `index.html` |

### Admin (19 entries, FR-012)

| English | Arabic label | Lucide icon | Target path |
|---|---|---|---|
| Dashboard | `الرئيسية` | `home` | `pages/admin/dashboard.html` |
| Students | `الطلاب` | `graduation-cap` | `pages/admin/students.html` |
| Families | `العائلات` | `users` | `pages/admin/families.html` |
| Teachers | `المعلمون` | `user-cog` | `pages/admin/teachers.html` |
| Courses | `الدورات` | `book-open` | `pages/admin/courses.html` |
| Live Sessions | `الحصص المباشرة` | `video` | `pages/admin/live-sessions.html` |
| Assignments | `الواجبات` | `clipboard-list` | `pages/admin/assignments.html` |
| Exams | `الاختبارات` | `file-text` | `pages/admin/exams.html` |
| Certificates | `الشهادات` | `award` | `pages/admin/certificates.html` |
| Reports | `التقارير` | `chart-bar` | `pages/admin/reports.html` |
| Payments | `المدفوعات` | `credit-card` | `pages/admin/payments.html` |
| Invoices | `الفواتير` | `receipt` | `pages/admin/invoices.html` |
| Tax Settings | `إعدادات الضريبة` | `percent` | `pages/admin/tax-settings.html` |
| Family Balances | `أرصدة العائلات` | `wallet` | `pages/admin/family-balances.html` |
| Teacher Finance | `مالية المعلمين` | `hand-coins` | `pages/admin/teacher-finance.html` |
| Roles & Permissions | `الأدوار والصلاحيات` | `shield-check` | `pages/admin/roles-permissions.html` |
| Social Hub | `المجتمع التعليمي` | `share-2` | `pages/admin/social-hub.html` |
| Platform Settings | `إعدادات المنصة` | `settings` | `pages/admin/platform-settings.html` |
| Log Out | `تسجيل الخروج` | `log-out` | `index.html` |

**Note on order**: Each role's sidebar follows the order shown above. The constitution allows order tuning for UX (e.g., grouping Finance entries together in Admin), but in this spec we keep the order matching the spec inputs for traceability.

**Note on depth-relative paths**: The `targetPath` column above is written from the **repo root**. When a sidebar is hand-copied into a page, every `<a href>` in the sidebar MUST be rewritten as a path relative to that page's depth. Specifically:

- For a page at depth-1 (e.g., `pages/ui-kit.html`): every entry's path becomes `../<targetPath>`. The Log Out target rewrites to `../index.html`. A sibling page rewrites e.g. `pages/student/dashboard.html` → `../pages/student/dashboard.html` (or, equivalently, `student/dashboard.html`).
- For a page at depth-2 (e.g., `pages/<role>/dashboard.html`): every entry's path becomes `../../<targetPath>` for cross-role/root targets, or just `<targetSlug>.html` for same-role siblings. The Log Out target rewrites to `../../index.html`.

Page authors MUST adjust these by hand when embedding the partial; there is no runtime path resolver. Failing to adjust produces broken links — particularly for Log Out, which is the same `index.html` from every page but at different depths.

---

## E6. Status Badge

The 19 status badges from FR-016 / Constitution Principle IV. Each badge has:

| Field | Type | Notes |
|---|---|---|
| `labelAr` | string | Arabic label (table below). |
| `colorToken` | Tailwind token | Background tint + foreground text token. |
| `iconName` | Lucide icon (optional) | Used so color is never the sole signal (FR-035). |

| English | Arabic | Color token | Icon |
|---|---|---|---|
| Active | `نشط` | `bg-success-100 text-success-700` | `check-circle` |
| Inactive | `غير نشط` | `bg-slate-100 text-slate-600` | `circle-off` |
| Pending | `قيد الانتظار` | `bg-warning-100 text-warning-600` | `clock` |
| Paid | `مدفوع` | `bg-success-100 text-success-700` | `badge-check` |
| Unpaid | `غير مدفوع` | `bg-danger-100 text-danger-600` | `alert-circle` |
| Partially Paid | `مدفوع جزئياً` | `bg-warning-100 text-warning-600` | `pie-chart` |
| Overdue | `متأخر السداد` | `bg-danger-100 text-danger-600` | `alarm-clock` |
| Submitted | `تم التسليم` | `bg-info-100 text-info-700` | `send` |
| Under Review | `قيد المراجعة` | `bg-info-100 text-info-700` | `eye` |
| Accepted | `مقبول` | `bg-success-100 text-success-700` | `thumbs-up` |
| Needs Revision | `يحتاج إلى مراجعة` | `bg-warning-100 text-warning-600` | `edit-3` |
| Rejected | `مرفوض` | `bg-danger-100 text-danger-600` | `x-circle` |
| Completed | `مكتمل` | `bg-success-100 text-success-700` | `check-circle-2` |
| Upcoming | `قادم` | `bg-info-100 text-info-700` | `calendar` |
| Missed | `فائت` | `bg-slate-100 text-slate-600` | `calendar-x` |
| Passed | `ناجح` | `bg-success-100 text-success-700` | `award` |
| Failed | `راسب` | `bg-danger-100 text-danger-600` | `x` |
| Excellent | `ممتاز` | `bg-accent-100 text-accent-700` | `star` |
| Needs Support | `يحتاج إلى دعم` | `bg-warning-100 text-warning-600` | `life-buoy` |

---

## E7. Dashboard Card

A reusable card that wraps every shell-level summary on the four role dashboards. Visual contract:

| Field | Type | Notes |
|---|---|---|
| `titleAr` | string | Arabic card title. |
| `subtitleAr` (optional) | string | Helper text under the title. |
| `body` | mixed | Numeric stat + delta indicator, OR a small list, OR a row of badges, OR a progress bar. |
| `actionAr` (optional) | link | "View all" / "Open" link to a planned future page. |

Concrete card variants live in `contracts/dashboard-shells.md`.

---

## E8. UI Kit Component

Each row on `pages/ui-kit.html` documents one component category from FR-014. The shape:

| Field | Type | Notes |
|---|---|---|
| `categoryAr` | string | Section heading on the UI kit page. |
| `liveExamples` | inline HTML | At least one rendered example of every state (default, hover via CSS, disabled, etc., as relevant). |
| `notes` (optional) | string | Implementation hints for future page authors (e.g., "use `inline-flex items-center gap-2` on every badge"). |

The exact set of categories is enumerated in `contracts/ui-kit-inventory.md`.

---

## E9. Header

The shared top bar on every in-app page. Embedded structure:

| Field | Type | Notes |
|---|---|---|
| `pageTitleAr` | string | Per-page title (e.g., "لوحة الطالب", "لوحة المعلم"). |
| `pageSubtitleAr` (optional) | string | Slot for short context (e.g., "أبريل 2026"). |
| `notificationCount` | integer (sample) | 0 → badge hidden; 1–99 → numeric; ≥100 → "99+". |
| `messageCount` | integer (sample) | Same rule as notificationCount. |
| `mobileToggleVisible` | boolean | Visible only at `< md` breakpoint. |
| `userRef` | E2 ref | The persona for that dashboard. |

---

## Sample-data anchor table (used across all four dashboards)

To keep the four dashboards internally consistent, every dashboard uses these anchor values when referencing the same fact:

| Anchor | Value |
|---|---|
| Reference month | `أبريل 2026` |
| Primary student persona | `عبد الرحمن مؤمن`, age 12, family ID `F-1042` |
| Primary parent persona | `ولي أمر الطالب عبد الرحمن` |
| Primary teacher persona | `أ. أحمد البكري`, specialization `القرآن الكريم واللغة العربية` |
| Primary admin persona | `مدير المنصة` |
| Primary currency | `SAR` (ر.س) |
| Secondary currency | `EGP` (ج.م) |
| Sample monthly revenue (Admin) | `48,250 ر.س` |
| Sample pending invoices (Admin) | `7 فواتير` |
| Sample student count (Admin) | `342 طالباً` |
| Sample teacher count (Admin) | `28 معلماً` |
| Sample active courses (Admin) | `14 دورة` |
| Sample family balance (Parent) | `1,250 ر.س` |
| Sample upcoming session | `حصة القرآن الكريم — الأحد 12 أبريل، 6:30 مساءً` |

These anchors prevent drift between the dashboards when stakeholders compare them side-by-side (SC-009).
