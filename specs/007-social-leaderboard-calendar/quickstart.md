# Quickstart — Social Hub, Leaderboard, and Calendar Frontend

This document covers (1) how to build / open the seven new pages, (2) the 24-row Success Criteria validation table, and (3) the 12-gate Definition-of-Done verification routine. It is the single source of truth used by `/speckit-implement` Phase 11 (Polish) to gate the feature as Done.

## 1. Build & open

This feature ships HTML edits + **a one-time CSS rebuild** to pick up 4 Tailwind core utilities (`opacity-30`, `whitespace-nowrap`, `aspect-video`, `line-clamp-1`) referenced by the new HTML but absent from the Spec 006 `output.css` baseline. **No `assets/js/` changes**, **no `assets/css/input.css` changes**, **no new dependencies**.

```bash
# 1. Confirm main.js is unchanged
wc -l assets/js/main.js        # must equal 68 (Spec 001/005/006 baseline)

# 2. After all 7 HTML files exist, rebuild CSS to pick up the 4 new utilities (T063 in Polish)
npm run build:css              # regenerates assets/css/output.css via Tailwind JIT
                               # expected new size: 63,191 → ~64-65 KB (well under the 80 KB ceiling)

# 3. Verify the 4 new utilities are now present in output.css
grep -c '\.opacity-30' assets/css/output.css        # ≥ 1
grep -c '\.whitespace-nowrap' assets/css/output.css # ≥ 1
grep -c '\.aspect-video' assets/css/output.css      # ≥ 1
grep -c '\.line-clamp-1' assets/css/output.css      # ≥ 1

# 4. Open any of the seven pages directly in a browser via file://
xdg-open pages/student/social-hub.html
xdg-open pages/student/post-details.html
xdg-open pages/student/leaderboard.html
xdg-open pages/student/calendar.html
xdg-open pages/admin/social-hub.html
xdg-open pages/admin/create-post.html
xdg-open pages/teacher/calendar.html
```

Each page MUST render without a dev server (Constitution Principle I). No `npm run dev` required — `npm run build:css` is a one-shot CSS regeneration step, not a dev server.

## 2. Success Criteria validation table (SC-001 → SC-024)

Run from repo root after all seven pages ship. Every row MUST end with ✓ PASS.

| SC | Description | Validator | Expected |
|----|-------------|-----------|----------|
| SC-001 | Social-hub feed: 7 post cards, all 7 types, anonymized subjects in تهنئة/إنجاز, 5-reaction quintet, comments-count chips, view-post CTAs | `grep -c 'sh-post-' pages/student/social-hub.html` ≥ 7; `grep -c 'post-details\.html' pages/student/social-hub.html` ≥ 7 | both ≥ thresholds |
| SC-002 | Leaderboard: 6-month chips + personal-rank hero card + 6 tabs + accordion explainer + 10-row top-10 + closing motivational | `grep -c 'role="tab"' pages/student/leaderboard.html` ≥ 6; `grep -c '<details' pages/student/leaderboard.html` ≥ 1; `grep -c 'monthly-report\.html' pages/student/leaderboard.html` ≥ 1 | all match |
| SC-003 | Calendar: 9 مايو highlighted as today + ≥ 8 events + 4 statuses + role-correct CTAs (5 destinations) | `grep -c 'اليوم' pages/student/calendar.html` ≥ 3; `grep -c '(live-session-details\|assignment-details\|exam-details\|monthly-report\|post-details)\.html' pages/student/calendar.html` ≥ 8 | all match |
| SC-004 | Post-details: ≥ 1 approved + ≥ 1 pending comment + 24h SLA in helper + إرسال للمراجعة button | `grep -c 'تم الاعتماد' pages/student/post-details.html` ≥ 1; `grep -c 'في انتظار المراجعة' pages/student/post-details.html` ≥ 1; `grep -c 'إرسال للمراجعة' pages/student/post-details.html` ≥ 1; `grep -c 'خلال 24 ساعة' pages/student/post-details.html` ≥ 2 | all ≥ |
| SC-005 | Zero student composer on social-hub | `grep -cE 'اكتب منشوراً\|ما الذي يدور في ذهنك\|اكتب ما تشعر به\|post status' pages/student/social-hub.html` MUST be 0 | 0 |
| SC-006 | Zero negative-emotion reactions across social pages | `grep -P '👎\|😂\|😡\|😠' pages/student/{social-hub,post-details}.html` MUST return 0 | 0 |
| SC-007 | Calendar event CTAs all resolve to existing prior-spec / Spec 007 files | `grep -nE ' href="#"' pages/student/calendar.html` returns 0; for each href in the event list verify file exists via `ls pages/student/{live-session-details,assignment-details,exam-details,monthly-report,post-details}.html` | all files present + 0 `#` |
| SC-008 | Admin dashboard sidebar lands on Spec 007 admin moderation page (no 404) | `test -f pages/admin/social-hub.html` returns 0 (file exists) | exit 0 |
| SC-009 | All 7 pages render at 375 / 768 / 1024 / 1280 px without horizontal scroll | Manual review per Spec 005/006 audit pattern | manual ✓ |
| SC-010 | All 7 pages contain the role-correct sidebar with constitutional v1.0.1 entries | Manual diff: student sidebar identical across 4 student pages; admin sidebar identical across 2 admin pages; teacher sidebar identical against teacher page | matches Spec 002/005/006 baseline |
| SC-011 | 5-reaction quintet identical order on social-hub and post-details | `grep -oE '👍\|⭐\|❤️\|🤲\|👏' pages/student/social-hub.html \| head -5` MUST equal same query on post-details (i.e., 👍 first, 👏 last) | identical sequence |
| SC-012 | Every form input has paired `<label for>` on post-details, admin social-hub, create-post | `comm -23 <(grep -oP 'id="[a-z]+-[a-z-]+' pages/student/post-details.html pages/admin/social-hub.html pages/admin/create-post.html \| awk -F= '{print $2}' \| sort -u) <(grep -oP 'for="[a-z]+-[a-z-]+' pages/student/post-details.html pages/admin/social-hub.html pages/admin/create-post.html \| awk -F= '{print $2}' \| sort -u)` MUST return empty | empty diff |
| SC-013 | April 2026 figures match Spec 006 (92% / 88% / 88-100 / 89-100 / ممتاز) wherever Spec 007 surfaces them | `grep -c 'متحسّن\|ممتاز' pages/student/leaderboard.html` ≥ 1 (overall pill in personal card); cross-spec invariant: numbers used in Spec 007 must match Spec 006's `monthly-report.html` per FR-005 | ≥ 1 + manual cross-check |
| SC-014 | "تهنئة" post anonymized name + March 95% byte-identical to Spec 005 | `grep -c '95%' pages/student/social-hub.html` ≥ 1; `grep -c '15 مارس 2026' pages/student/social-hub.html` ≥ 1; `grep -c 'عبد الرحمن مؤمن' pages/student/social-hub.html` MUST be 0 in post bodies (header-chrome occurrences allowed) | all match |
| SC-015 | Zero `href="#"` placeholders across 7 pages | `grep -nE ' href="#"' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` MUST return 0 (`href="#planned"` is allowed and excluded) | 0 |
| SC-016 | Apple/Google/Outlook export cluster ONLY on student calendar | `grep -lE 'تقويم آبل\|تقويم جوجل\|Outlook' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` returns ONLY `pages/student/calendar.html` | 1 file |
| SC-017 | Comment-status badge mix: ≥ 1 approved + ≥ 1 pending on post-details | `grep -c 'تم الاعتماد' pages/student/post-details.html` ≥ 1; `grep -c 'في انتظار المراجعة' pages/student/post-details.html` ≥ 1 | both ≥ 1 |
| SC-018 | Admin posts table contains all 5 visible statuses (منشور / مسودة / مجدول / غير منشور / محذوف) | `grep -c 'منشور\|مسودة\|مجدول\|غير منشور\|محذوف' pages/admin/social-hub.html` ≥ 5 distinct labels (visual diff) | 5 distinct |
| SC-019 | Teacher dashboard sidebar (L103) + body CTA (L212) both land on Spec 007 teacher calendar | `test -f pages/teacher/calendar.html` returns 0; manual click-test from `pages/teacher/dashboard.html` | file exists + manual ✓ |
| SC-020 | Teacher calendar workload-summary strip ONLY on teacher calendar | `grep -c 'خلاصة هذا الأسبوع' pages/teacher/calendar.html` ≥ 1; `grep -c 'خلاصة هذا الأسبوع' pages/student/calendar.html` MUST be 0 | 1 + 0 |
| SC-021 | Teacher calendar تسليم واجب CTAs link to `homework-review.html` (NOT `assignment-details.html`) | `grep -c 'homework-review\.html' pages/teacher/calendar.html` ≥ 2; `grep -c 'assignment-details\.html' pages/teacher/calendar.html` MUST be 0 | ≥ 2 + 0 |
| SC-022 | Leaderboard explainer renders all 6 dimension formulas | `grep -c 'الترتيب العام:\|الحضور:\|الواجبات:\|الأكثر تطوراً:\|تقدّم القرآن:\|المشاركة:' pages/student/leaderboard.html` ≥ 6 distinct anchors | 6 distinct |
| SC-023 | Reaction buttons have ZERO JS handlers | `grep -c 'onclick=\|data-reaction-modal\|data-reactor-list' pages/student/{social-hub,post-details}.html` MUST return 0 | 0 |
| SC-024 | Achievement-post anonymization: zero "عبد الرحمن مؤمن" / "سارة مؤمن" full names in post bodies | `grep -c 'عبد الرحمن مؤمن' pages/student/social-hub.html` MUST be 0 OR ≤ 1 (allowed only in header chrome — the title attribute / `<title>`); same audit on post-details. The anonymized form `عبد الرحمن م.` MUST appear ≥ 1 in post body (post #2). Sibling `سارة م.` MUST appear ≥ 1 in post body (post #3); `سارة مؤمن` MUST be 0 | full names ≤ 1 (chrome only) + anonymized ≥ 1 |

## 3. Definition-of-Done verification (Constitution v1.0.1, gates 1-12)

| Gate | Description | Verification | Expected |
|------|-------------|--------------|----------|
| 1 | All 7 requested pages exist and are openable as static HTML | `ls pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` lists all 7 | 7 files present |
| 2 | Every page is responsive across desktop / tablet / mobile breakpoints | Manual review at 375 / 768 / 1024 / 1280 px on each of 7 pages | no horizontal scroll on any page at any breakpoint |
| 3 | Each page contains meaningful, realistic Arabic sample data (no lorem ipsum, no "Course 1") | `grep -nEi 'lorem\|Item [0-9]\|TBD\|FIXME\|Course [0-9]\|Student [0-9]' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` returns 0 | 0 matches |
| 4 | Header and sidebar are consistent across pages within a role | Visual diff: student sidebar identical across 4 student pages; admin sidebar identical across 2 admin pages; teacher sidebar matches Spec 006 baseline | matches baseline |
| 5 | Every navigation link points to a real existing HTML file in the spec | SC-007 + SC-008 + SC-015 + SC-019 audits; `href="#planned"` allowed for the teacher-announcement / pending-comment-review out-of-scope destinations | 0 unintended 404s |
| 6 | Each page is visually professional (Spec 001 colors / spacing / typography / badge rules of Constitution IV) | Visual review against Spec 001 design tokens; ≥ 35 status-badge usages across the 7 pages (7-type post pills × ≥ 2 surfaces; 4-state event pills × 2 calendars; 5-state admin posts pills; 2-state comment badges; 4-state ranking medal pills) | manual ✓ + ≥ 35 |
| 7 | No frontend framework or runtime is present | `grep -nE 'react\|vue\|angular\|svelte\|next\|nuxt\|alpine\|jquery' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` returns 0 | 0 |
| 8 | No backend, API, or simulated-API logic is present | Same grep + `grep -nE 'fetch\(\|XMLHttpRequest\|axios\|wa\.me\|navigator\.share' [7 files]` returns 0 | 0 |
| 9 | TailwindCSS used consistently; no parallel ad-hoc CSS systems | Visual review; `grep -nE '<style' [7 files]` returns 0 (no inline `<style>` blocks needed for this feature — calendar grid uses utility classes only) | 0 inline styles |
| 10 | JavaScript is limited to the 4 sanctioned interactions (drawer / dropdown / modal / tabs) | `wc -l assets/js/main.js` = 68; `grep -nE 'innerHTML\|createElement\|outerHTML\|insertAdjacentHTML\|document\.write' assets/js/main.js` returns 0 | 68 + 0 |
| 11 | Every "View" / detail entry point has a corresponding detail page in the same or next spec | SC-007 audit + the post-details page IS the social-hub's "View" target | 0 unresolved CTAs |
| 12 | RTL rendering verified visually on every page | `grep -L 'lang="ar" dir="rtl"' pages/student/{social-hub,post-details,leaderboard,calendar}.html pages/admin/{social-hub,create-post}.html pages/teacher/calendar.html` returns 0 (all 7 files have the attribute pair) | 0 files missing RTL |

## 4. Cross-spec invariants checklist

| Invariant | Confirms |
|-----------|----------|
| Persona name `عبد الرحمن مؤمن` appears in self-chrome (header / personal card) but NOT in posts visible to other students (`social-hub.html` / `post-details.html` post bodies); only `عبد الرحمن م.` appears in posts | Q3 / FR-015 extension / SC-024 |
| Sibling `سارة مؤمن` reconciles with parent-dashboard line 232 pin AND with Spec 006's my-children.html sibling card; on `social-hub.html` post #3, only `سارة م.` (anonymized) appears | Q3 / FR-015 / Spec 002 + 006 continuity |
| Quran teacher `الأستاذ أحمد بن عبد الله` appears as author on Spec 007 posts AND as event subject on teacher calendar | Continuity from Spec 005 / 006 |
| Arabic teacher `الأستاذة منى سعد` appears as author on Spec 007 nصيحة post (post #5) | Continuity from Spec 006 |
| Admin author voice `إدارة الأكاديمية` newly named in Spec 007; appears as author on 4 of 7 social-hub posts AND as the admin chrome greeting | This spec |
| March monthly exam (95% on 15 مارس 2026) referenced byte-identically in social-hub post #2 — matches Spec 005's `monthly-exams-passed.html` row | FR-062 / Q3 anonymization applied to subject name |
| April monthly report (`monthly-report.html` from Spec 006) linked from calendar event #1 (1 مايو release) AND from leaderboard's closing motivational CTA | FR-005 + FR-038 + FR-044 |
| 5 monthly exams from Spec 005 / Spec 006 are NOT re-rendered in Spec 007 (the leaderboard surfaces points + ranks, not exam scores) — but March 95% appears as a celebration anchor on social-hub | FR-005 |
| Zero edits to prior-spec files (Specs 001-006) — `git status` after Spec 007 lists only the 7 new files + `specs/007-social-leaderboard-calendar/` | FR-005 / Q1 + Q2 / "no prior-spec edits" discipline |
| Zero new JS — `wc -l assets/js/main.js` = 68; `<details>`/`<summary>` accordion + reused tablist handler cover the 2 interactive surfaces | FR-002 / R5 / R7 / R9 |

## 5. Run order for the implementer

The recommended order matches the spec's user-story priority (P1 first, then P2, then P3):

1. **P1 student trio** (US1 + US2 + US3 + US4 — all 4 student pages are P1):
   - `pages/student/social-hub.html` (US1 — MVP — the headline page)
   - `pages/student/post-details.html` (US2 — depends on social-hub for inbound CTAs)
   - `pages/student/leaderboard.html` (US3 — independent)
   - `pages/student/calendar.html` (US4 — closes 3 inbound dashboard links)
2. **P2 admin pair + teacher** (US5 + US7):
   - `pages/admin/social-hub.html` (US5 — closes admin dashboard sidebar L183)
   - `pages/teacher/calendar.html` (US7 — closes teacher dashboard L103 + L212)
3. **P3 admin authoring** (US6):
   - `pages/admin/create-post.html` (US6 — depends on admin/social-hub for inbound CTA)
4. **Polish**: run all 24 SC validators + verify all 12 DoD gates + verify cross-spec invariants table + sign-off.

The MVP cut-line is after step 1, page 1: with `social-hub.html` shipped, the student dashboard's "آخر منشورات الأكاديمية" CTA + the constitutional Social Hub sidebar entry on every student page resolve. The full 7-page set is the spec's actual deliverable, but step 1 is the minimum that unblocks downstream work.
