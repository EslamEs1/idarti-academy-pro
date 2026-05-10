# Phase 1 Data Model: Admin Permissions, Roles, Platform Settings & Pricing Rules Frontend

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-05-10

This document defines the 8 entity types modeled in static HTML across the 10 new pages, plus the canonical sample-data anchors that every page MUST render consistently. Every numeric value, identifier, and copy string listed here is a hard-commit anchor — implementing pages may not invent alternative figures or contradict these.

## Entity Catalog

### E1 — Role

A named bundle of permissions assigned to one or more Users.

| Attribute | Constraint | Anchor instance (Finance Manager) |
|-----------|-----------|------------------------------------|
| Role ID | string slug | `finance_manager` |
| Arabic name | string | مديرة المالية |
| English subtitle | string | Finance Manager |
| Role type | one of {مدير, تشغيلي, دعم} | تشغيلي |
| Users count | integer | 3 |
| Permissions summary | string | 6 من 19 وحدة — مالي فقط |
| Permission grid | 19 modules × 7 actions = 133 cells | per E2 D4 |
| Status | one of {نشطة, موقوفة} | نشطة |
| Last-modified by | user reference | محمد بن عبدالعزيز |
| Last-modified at | YYYY-MM-DD | 2026-04-22 |

**Roster (8 cards on roles-permissions.html — 7 active + 1 archived)**:

| Card | Role ID | Arabic name | Users | Perm summary | Status |
|------|---------|-------------|-------|--------------|--------|
| 1 | super_admin | المدير العام | 2 | 18 من 19 وحدة — مسموح كامل (سجل المراجعة قراءة فقط) | نشطة |
| 2 | finance_manager | مديرة المالية | 3 | 6 من 19 وحدة — مالي فقط | نشطة |
| 3 | teacher | المعلّم | 5 | 8 من 19 وحدة — تشغيل مع الطلاب | نشطة |
| 4 | parent | ولي الأمر | 1 | 5 من 19 وحدة — رؤية الأبناء | نشطة |
| 5 | student | الطالب | 1 | 6 من 19 وحدة — تعلم وتفاعل | نشطة |
| 6 | support | موظف الدعم | 1 | 5 من 19 وحدة — دعم العملاء | نشطة |
| 7 | operations | موظف التشغيل | 1 | 9 من 19 وحدة — تشغيل أكاديمي | نشطة |
| 8 | admin_assistant | مساعد إداري | 0 | دور موقوف منذ 2026-02-01 | موقوفة |

User-count sum: 2 + 3 + 5 + 1 + 1 + 1 + 1 + 0 = **14** ✓ (matches the «إجمالي المستخدمين 14» summary tile + the 14-row users table).

### E2 — Permission

A single (Module, Action) pair on a single Role.

| Attribute | Constraint |
|-----------|-----------|
| Module | one of 19 (Dashboard / Students / Families / Teachers / Courses / Live Sessions / Assignments / Exams / Certificates / Reports / Payments / Invoices / Tax Settings / Family Balance / Teacher Finance / Teacher Advances / Social Hub / Platform Settings / Audit Log) |
| Action | one of 7 (View / Create / Edit / Delete / Approve / Export / Financial access) |
| Value | one of 3 (مسموح ✓ success-green / محجوب ✕ danger-red / غير منطبق – neutral-gray) |

**Anchor matrix (Finance Manager, 19 × 7 = 133 cells)** — see research.md D4 table for the full pattern.

Cell-state counts (Finance Manager):
- ✓ مسموح = **55 cells**
- ✕ محجوب = **72 cells**
- – غير منطبق = **6 cells** (Dashboard row's Create/Edit/Delete/Approve/Export/Financial)
- Total: **133 cells** ✓

The Dashboard "غير منطبق" pattern reflects that there's no Create/Edit/Delete on a dashboard summary surface — those actions don't make conceptual sense, hence "–" not "✕".

### E3 — User

A named human account on the platform.

| Attribute | Constraint | Anchor instance (SARA.M) |
|-----------|-----------|---------------------------|
| User ID | format `USR-YYYY-NNNN` | USR-2024-0007 |
| Arabic name | string | سارة محمد عبدالله |
| English transliteration | string | Sara Mohammed Abdullah |
| Email | string | sara.m@idarti-academy.sa |
| Phone (masked) | format `+CCC XX *** XXXX` | +966 50 *** 0007 |
| Assigned role | foreign key to E1 | finance_manager |
| Status | one of {نشط, موقوف, موثّق, غير موثّق} | نشط + موثّق |
| Last-login timestamp | ISO date+time | 2026-05-10 09:12 |
| Last-login IP (masked) | format `XX.***.***.YY` | 94.***.***.118 |
| Active sessions | integer | 2 |
| 2FA status | one of {مفعّلة, غير مفعّلة} | مفعّلة (تطبيق المصادقة) |
| Password strength | visual indicator | قوية |
| Linked entity | one of {Student, Teacher, Parent, Family, null} | null (admin-only account) |
| Account creation | YYYY-MM-DD | 2024-09-15 |

**Roster (14 rows on users.html)**:

| # | User ID | Name | Role | Email/Phone | Status | Last login |
|---|---------|------|------|-------------|--------|------------|
| 1 | USR-2024-0001 | محمد بن عبدالعزيز الإدريسي | super_admin | mohammed.a@idarti-academy.sa | نشط + موثّق | 2026-05-10 08:00 |
| 2 | USR-2024-0002 | عبدالرحمن سعد الفهد | super_admin | abdulrahman.f@idarti-academy.sa | نشط + موثّق | 2026-05-09 17:30 |
| 3 | USR-2024-0007 | سارة محمد عبدالله (anchor) | finance_manager | sara.m@idarti-academy.sa | نشط + موثّق | 2026-05-10 09:12 |
| 4 | USR-2024-0008 | منى عبدالله الزهراني | finance_manager | mona.z@idarti-academy.sa | نشط + موثّق | 2026-05-09 16:45 |
| 5 | USR-2024-0009 | بدر سعود الخالد | finance_manager | bader.k@idarti-academy.sa | نشط + غير موثّق | 2026-05-08 14:20 |
| 6 | USR-2024-0011 | أحمد بن خالد المالكي (AHMED.K) | operations | ahmed.k@idarti-academy.sa | نشط + موثّق | 2026-05-09 14:12 |
| 7 | USR-2024-0021 | الأستاذ أحمد بن عبد الله الزهراني | teacher | a.zahrani@idarti-academy.sa / +966 55 *** 0042 | نشط + موثّق | 2026-05-10 07:30 |
| 8 | USR-2024-0022 | الأستاذة منى سعد | teacher | m.saad@idarti-academy.sa | نشط + موثّق | 2026-05-09 19:00 |
| 9 | USR-2024-0023 | الأستاذة فاطمة الزهراني | teacher | f.zahrani@idarti-academy.sa | نشط + موثّق | 2026-05-09 11:00 |
| 10 | USR-2024-0024 | الأستاذ يوسف القحطاني | teacher | y.qahtani@idarti-academy.sa | نشط + موثّق | 2026-05-08 22:15 |
| 11 | USR-2024-0025 | الأستاذة هبة محمد عبد الفتاح (Cairo, EGP) | teacher | h.abdelfattah@idarti-academy.eg | نشط + موثّق | 2026-05-09 13:30 |
| 12 | USR-2024-0031 | ولي أمر عبد الرحمن مؤمن | parent | parent.momen@gmail.com / +966 55 *** 4321 | نشط + موثّق | 2026-05-09 21:00 |
| 13 | USR-2024-0041 | عبد الرحمن مؤمن (the persona) | student | (linked to parent's email) | نشط + موثّق | 2026-05-10 08:45 |
| 14 | USR-2024-0051 | نورة سعد الدوسري | support | nora.d@idarti-academy.sa | موقوف | 2026-05-04 17:00 |

Status distribution: 13 نشط + 1 موقوف (NORA.S row 14) ✓ matches summary tile «نشط 13 / موقوف 1». Email-verification distribution: 12 موثّق + 2 غير موثّق ✓ matches summary tile «بريد إلكتروني غير موثّق 2». The two غير موثّق users are **locked** as: **USR-2024-0009 بدر سعود الخالد** (row 5, Finance Manager) and **USR-2024-0024 الأستاذ يوسف القحطاني** (row 10, Teacher). All other 12 users are موثّق. This lock removes implementer-choice ambiguity so that parallel-developer authoring of `users.html` (T032) renders consistent rows regardless of which developer ships first.

### E4 — Pricing Rule

A monetary rule that determines an invoice line-item price.

| Attribute | Constraint | Anchor (Rule 1) |
|-----------|-----------|------------------|
| Rule ID | implicit row order | 1 |
| Rule type | one of {course-flat, live-group, live-private, Egypt-tier} | course-flat |
| Student type | one of {ناطق بالعربية, غير ناطق بالعربية, both} | ناطق بالعربية |
| Price | numeric | 380.00 |
| Currency | one of {SAR, EGP} | SAR |
| Applies to | string (course-id or session-class) | دورة القرآن الكريم — المستوى الثالث |
| Effective date | YYYY-MM-DD | 2024-09-01 |
| Status | one of {نشطة, موقوفة} | نشطة |
| Last-modified | actor + timestamp | SARA.M / 2024-09-01 |

**Anchor table (9 rows on pricing-rules.html)**:

| # | Type | Student type | Price | Currency | Applies to | Effective | Status |
|---|------|--------------|-------|----------|------------|-----------|--------|
| 1 | course-flat | ناطق بالعربية | 380.00 | SAR | دورة القرآن الكريم — المستوى الثالث | 2024-09-01 | نشطة |
| 2 | course-flat | غير ناطق بالعربية | 600.00 | SAR | دورة القرآن الكريم — المستوى الثالث (للناطقين بغير العربية) | 2024-09-01 | نشطة |
| 3 | live-group | ناطق بالعربية | 25.00 | SAR | حصة جماعية ساعة واحدة | 2024-09-01 | نشطة |
| 4 | live-group | غير ناطق بالعربية | 35.00 | SAR | حصة جماعية ساعة واحدة | 2024-09-01 | نشطة |
| 5 | live-private | both | **0.00** | SAR | حصة تجريبية مجانية | 2025-01-01 | نشطة |
| 6 | live-private | ناطق بالعربية | 60.00 | SAR | حصة خاصة ساعة واحدة | 2024-09-01 | نشطة |
| 7 | live-private | غير ناطق بالعربية | 80.00 | SAR | حصة خاصة ساعة واحدة | 2024-09-01 | نشطة |
| 8 | Egypt-tier course | غير ناطق بالعربية | 1500.00 | EGP | دورة الإنجليزية لغير الناطقين — المستوى الأول | 2025-01-01 | نشطة |
| 9 | Egypt-tier session | غير ناطق بالعربية | 80.00 | EGP | حصة جماعية بالقاهرة | 2025-01-01 | **موقوفة** (since 2026-03-15, reason: «إعادة هيكلة الباقة المصرية») |

Anchor figures align with Spec 008 invoice INV-2026-0184 (380 ريال subtotal — Rule 1) + INV-SES-2026-0205 (60 ريال private session — Rule 6) + Egypt tax-settings example 1500 EGP (Rule 8) and Spec 009 salary baseline 25 ريال group rate (Rule 3, the academy-revenue-per-student leg).

### E5 — Student Type

A platform-wide category that drives pricing-rule-tier and salary-rule-tier selection.

| Attribute | Constraint | Anchor (ناطق بالعربية) |
|-----------|-----------|-------------------------|
| Type slug | string | arabic_speaker |
| Arabic label | string | ناطق بالعربية |
| Pricing tier reference | link to E4 filtered | pricing-rules.html#student-type=arabic |
| Salary bucket reference | link to teacher-salary-rules.html filtered | teacher-salary-rules.html#student-type=arabic |
| Invoice label | string | طالب ناطق بالعربية |
| Report label | string | طالب ناطق بالعربية |
| Status | one of {نشط, موقوف} | نشط |
| Last updated | YYYY-MM-DD + actor | 2024-09-01 / محمد بن عبدالعزيز |

**Anchor table (2 rows on student-type-settings.html)**:

| # | Slug | Arabic label | Invoice label | Report label | Status |
|---|------|--------------|---------------|--------------|--------|
| 1 | arabic_speaker | ناطق بالعربية | طالب ناطق بالعربية | طالب ناطق بالعربية | نشط |
| 2 | non_arabic_speaker | غير ناطق بالعربية | طالب غير ناطق بالعربية | طالب غير ناطق بالعربية | نشط |

**Example-calculation preview (FR-044)** — 2 side-by-side cards:

- **ناطق-بالعربية card**: «حصة جماعية ساعة واحدة» — السعر الأساسي 25.00 ريال + ضريبة القيمة المضافة 15% = 3.75 ريال — **الإجمالي 28.75 ريال**
- **غير-ناطق-بالعربية card**: «حصة جماعية ساعة واحدة» — السعر الأساسي 35.00 ريال + ضريبة القيمة المضافة 15% = 5.25 ريال — **الإجمالي 40.25 ريال**

**Regulatory caption above table (FR-045)**: «تُحدَّد فئة الطالب وفقاً للغته الأولى وليس الجنسية أو بلد الإقامة — هذا يضمن مساواة المعاملة بين الطلاب السعوديين والمصريين الناطقين بالعربية.»

### E6 — Notification Setting

A (Category, Channel) toggle pair.

| Attribute | Constraint |
|-----------|-----------|
| Category | one of 7 (تذكير الواجبات / تذكير الحصة / تذكير الدفع / تقارير ولي الأمر / إشعارات الإنجازات / تذكير مراجعة المعلم / تذكير دورة جديدة) |
| Channel | one of 4 (المنصة / البريد / واتساب / SMS) |
| State | one of {ON, OFF} |
| Description | string (per-category fire condition) |

**Anchor 7×4 grid (28 toggles on notification-settings.html)** — see research.md D9 table for the full ON/OFF pattern.

State counts: 6 active categories × 4 channels = 24 toggles, of which **15 ON / 9 OFF** (per FR-048). 1 deprecated category (تذكير دورة جديدة) × 4 channels = 4 toggles all OFF. Total: **15 ON / 13 OFF = 28 toggles** ✓.

**Per-category descriptions (FR-050)**:
- تذكير الواجبات: «يُرسَل قبل 24 ساعة من موعد تسليم الواجب وعند تجاوز الموعد»
- تذكير الحصة: «يُرسَل قبل 30 دقيقة من بداية الحصة المباشرة»
- تذكير الدفع: «يُرسَل قبل 3 أيام من تاريخ استحقاق الفاتورة وعند تجاوز التاريخ»
- تقارير ولي الأمر: «يُرسَل في أول يوم من كل شهر مع رابط التقرير الشهري»
- إشعارات الإنجازات: «يُرسَل فور حصول الطالب على شارة أو شهادة جديدة»
- تذكير مراجعة المعلم: «يُرسَل أسبوعياً للمعلمين عند وجود واجبات أو اختبارات تنتظر المراجعة»
- تذكير دورة جديدة (deprecated): «هذا الإشعار غير فعّال — يمكن إعادة تفعيله من إعدادات المنصة»

**Channel-capability cards (FR-052)** — side panel «قنوات الاتصال»:
- **المنصة**: «إشعار داخل المنصة في رمز الجرس + قائمة الإشعارات — متاح لجميع الباقات»
- **البريد**: «بريد إلكتروني مع تنسيق HTML — يدعم العربية واللغات الأخرى — مجاني»
- **واتساب**: «رسائل واتساب عبر Twilio — متاح للمناطق المختارة (السعودية، الإمارات، مصر)»
- **SMS**: «رسائل نصية قصيرة — 50 رسالة شهرياً ضمن الباقة الحالية، تكلفة إضافية للزيادة»

### E7 — Audit Event

A single timestamped record of an admin or system action.

| Attribute | Constraint |
|-----------|-----------|
| Event ID | implicit row order |
| Actor | user reference or "نظام تلقائي" |
| Action verb | one of (created / updated / approved / rejected / paid / disabled / login / viewed / executed / reviewed / exported) |
| Module | one of 11 modules from research.md D10 |
| Target identifier | foreign reference (e.g., STL-2026-04-TCH-0042) or null |
| Diff payload | string or "—" |
| Timestamp | ISO date+time |
| IP (masked) | format `XX.***.***.YY` or "—" |

**Anchor 24-event timeline** — see research.md D10 for the full event list. Cross-spec identifiers cited (4 unique): STL-2026-04-TCH-0042 (events 1, 6) + INV-2026-0184 (event 2) + FAM-2023-0211 (events 2, 20) + RPT-2026-04-Q03-007 (event 17). System actor «نظام تلقائي» appears on events 2 and 15. Empty-payload «—» appears on events 3 and 24.

### E8 — Platform Setting

A platform-wide configuration value.

| Card | Field | Default value (anchor) |
|------|-------|-------------------------|
| **هوية الأكاديمية** | Academy name (Arabic) | أكاديمية إدارتي للتعليم |
| | Academy name (English) | Idarti Academy for Education |
| **الشعار** | Logo file | placeholder visual + file input |
| **الإعدادات الإقليمية** | Country | المملكة العربية السعودية |
| | Primary currency | الريال السعودي (SAR) |
| | Secondary currencies | [الجنيه المصري (EGP)] (1 chip) |
| | Language primary | العربية |
| | Language secondaries | [English] (1 chip) |
| | Default direction | من اليمين إلى اليسار (RTL) |
| **معلومات التواصل** | Phone | +966 11 234 5678 |
| | Email | info@idarti-academy.sa |
| | Address | الرياض، المملكة العربية السعودية |
| | Website | https://idarti-academy.sa |
| **تذييل الفاتورة** | Footer text (textarea) | «شكراً لاختياركم أكاديمية إدارتي. للاستفسار: info@idarti-academy.sa أو هاتف +966 11 234 5678. الرقم الضريبي: 312345678900003» |
| **إعدادات الشهادات** | Issuer name | أكاديمية إدارتي للتعليم |
| | Signature visual | placeholder image + file input |
| | Official seal visual | placeholder image + file input |
| **حفظ التغييرات** | Save button | + sibling caption «آخر حفظ — 2026-05-09 14:22 — بواسطة سارة محمد» |

The «العملات الثانوية» chip group carries the caption «العملات الثانوية المسموح بها — لا يتم جمعها مع العملة الأساسية في أي ملخص» (FR-032).

## Cross-Page Consistency Matrix

The following figures and entities MUST appear identically (byte-identically for matrix cells, label-identically for cross-references) across the listed pages — verified by SC-005 / SC-006 / SC-007 / SC-013 grep validations.

| Figure / Entity | Pages |
|-----------------|-------|
| **6×7 = 42 permission cells (Finance Manager)** byte-identical | role-details.html (rows 11-16 of full matrix) + user-details.html (entire mini-matrix) — SC-005 `diff` |
| **«ناطق بالعربية» / «غير ناطق بالعربية» labels** | pricing-rules.html (rules 1-7 student-type column) + student-type-settings.html (2 row labels + 2 example-calc cards + invoice-label + report-label columns) + users.html (الأستاذة هبة EGP row tag) + role-details.html / user-details.html (no direct mention, just module references) — each label appears ≥ 6 times across the 10 files (SC-007) |
| **STL-2026-04-TCH-0042** (Spec 009) | audit-log.html (events 1 + 6) + user-details.html (activity preview event 1 — SC-013 cross-page consistency) |
| **INV-2026-0184** (Spec 008) | audit-log.html (event 2) |
| **FAM-2023-0211** (Spec 008) | audit-log.html (events 2 + 20) |
| **RPT-2026-04-Q03-007** (Spec 006) | audit-log.html (event 17) |
| **سارة محمد عبدالله / SARA.M (USR-2024-0007)** | users.html (row 3) + user-details.html (entire page) + role-details.html (metadata strip «المستخدمون المعيّنون» link) + audit-log.html (events 1, 5, 7, 9, 13, 16, 17, 21, 23 — 9 events) + roles-permissions.html (Finance Manager card user count includes her) |
| **محمد بن عبدالعزيز الإدريسي (USR-2024-0001)** | users.html (row 1) + role-details.html («آخر تعديل بواسطة») + platform-settings.html («آخر حفظ بواسطة») + audit-log.html (events 3, 4, 8, 12, 18, 22) |
| **AHMED.K (USR-2024-0011)** | users.html (row 6) + audit-log.html (events 6, 10, 14, 20, 24) |
| **«نظام تلقائي»** | audit-log.html (events 2 + 15) — SC-007 |
| **EGP currency** | platform-settings.html (secondary chip) + pricing-rules.html (rules 8 + 9) + users.html (الأستاذة هبة row optional EGP-context tag) — SC-009 |
| **380.00 ريال** (Spec 008 INV-2026-0184 subtotal) | pricing-rules.html (Rule 1 price) — anchor figure |
| **600.00 ريال** (Constitution-VI differential) | pricing-rules.html (Rule 2 price) — internal arithmetic: 380 + 220 differential = 600 for غير ناطق tier |
| **25.00 / 35.00 ريال** (group session rates) | pricing-rules.html (Rules 3 + 4) + student-type-settings.html (example-calc cards) — anchor figures |
| **60.00 / 80.00 ريال** (private session rates) | pricing-rules.html (Rules 6 + 7) — Spec 008 INV-SES-2026-0205 alignment |
| **1500.00 EGP** (Egypt-tier course) | pricing-rules.html (Rule 8) — Spec 008 tax-settings alignment |
| **15% VAT** | platform-settings.html (footer text mentions tax number) + student-type-settings.html (example-calc cards) — Spec 008 tax-settings alignment |
| **2026-05-10 (today)** | user-details.html (last login 09:12) + audit-log.html (events 1-3, today) + roles-permissions.html (no direct mention; the «إجمالي المستخدمين 14» tile reflects today's count) + every page footer copyright if any |

## Implementation Anchors (page-by-page)

This is the canonical inventory of "what data goes on which page" — implementation contracts (`contracts/*.md`) reference these anchors.

| Page | Primary entities rendered | Sample-data row counts |
|------|---------------------------|------------------------|
| roles-permissions.html | E1 (8 cards) | summary tiles (4) + role cards (8: 7 active + 1 archived) + page-header CTA (1) |
| role-details.html | E1 (Finance Manager) + E2 (133 cells) | matrix legend (3 glyphs) + matrix rows (19) × columns (7) = 133 cells + metadata strip (4 fields) + action buttons (2) |
| create-role.html | E1 (form scaffolding for new role) + E2 (133 checkboxes) | form sections (3) + module accordion entries (19) × action checkboxes (7) = 133 checkboxes + side panel (1) + footer buttons (2) |
| users.html | E3 (14 users) | summary tiles (4) + role chips (8) + status chips (3) + search input (1) + table rows (14) × columns (6) + per-row icon-buttons (3) |
| user-details.html | E3 (SARA.M) + E2 (42 mini-matrix cells) | profile card (1) + linked-account card (1) + permissions mini-matrix (6 × 7 = 42 cells) + account-status card (6 fields) + activity preview list (5) + action bar (3 buttons) + modals (3) |
| platform-settings.html | E8 (7 cards × ~30 fields) | configuration cards (7) + form controls (~30) + secondary-currencies caption (1) + save button + actor caption (2) |
| pricing-rules.html | E4 (9 rules) | summary tiles (4) + table rows (9) × columns (7) + form fields (7) + Q1 callout (1) + table footnote (1) |
| student-type-settings.html | E5 (2 types) | regulatory caption (1) + table rows (2) × columns (6) + example-calc cards (2) |
| notification-settings.html | E6 (28 toggles) | toggle grid rows (7) × channels (4) = 28 toggles + per-row description captions (7) + side panel cards (4) |
| audit-log.html | E7 (24 events) | summary tiles (4) + filter controls (4) + table rows (24) × columns (7) + Q2 export button (1) + per-row icon-buttons (1 each) |

## Edit-Trail & Cross-Spec Discipline

- **Calendar today = 2026-05-10** (carried forward from Specs 008 + 009 unchanged).
- **Anchor admin user** السرة محمد عبدالله (USR-2024-0007 / Finance Manager) is the dual-lens entity for SC-005's two-views-one-entity discipline. Her permission matrix is rendered identically across role-details.html (full matrix's rows 11-16) and user-details.html (entire mini-matrix).
- **Spec 006 figures** (RPT-2026-04-Q03-007 / 92% / 88% / 88-100 / 89-100 / "ممتاز") referenced verbatim only in audit-log event 17 — never invented or contradicted on any other page.
- **Spec 008 figures** (INV-2026-0184 437 ريال / FAM-2023-0211 450 ريال / VAT 15%) referenced verbatim only in audit-log events 2 + 20 — never invented or contradicted.
- **Spec 009 figures** (STL-2026-04-TCH-0042 3,750 ريال / SARA.M -80 deduction + +200 bonus) referenced verbatim only in audit-log events 1 + 6 + activity-preview entry on user-details — never invented or contradicted.
- **Spec 008 student-type labels** (ناطق بالعربية / غير ناطق بالعربية) reused identically on every surface that surfaces the rate distinction (pricing-rules + student-type-settings).
- **Zero prior-spec edits**: Spec 010 writes 10 new HTML files + 1 rebuilt `output.css` only.
- **Zero new JS**: `assets/js/main.js` remains at 68 lines; the 3 user-details modals reuse the existing `data-modal-open` / `data-modal-close` attribute pattern.
