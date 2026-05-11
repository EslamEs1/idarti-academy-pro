# Quickstart — Student-Teacher Assignment & Academic Supervision Frontend

**Feature**: 011-student-teacher-assignments
**Date**: 2026-05-11

This page lists every operational command needed to (a) **build** the seven new pages plus the rebuilt CSS, (b) **open** each page in a browser without a dev server, (c) **validate** the 12 success criteria via greps and `diff`, and (d) **verify** the 12-gate Constitutional Definition of Done.

---

## 1. Build the CSS

The compiled `assets/css/output.css` must be regenerated **once** at the end of the polish phase so the Tailwind JIT scan picks up any new utilities referenced by the 7 new pages.

```bash
# from repo root
npm run build:css
```

Expected: `output.css` size increases by ≤ 6 KB from the Spec-010 baseline (≈ 84-86 KB → ≤ 94 KB ceiling). No `input.css` edits.

---

## 2. Open the seven new pages

All seven pages are openable via plain `file://` URLs — no dev server required (Constitution I).

```bash
# admin pages (5)
xdg-open pages/admin/student-teacher-assignments.html
xdg-open pages/admin/create-student-teacher-assignment.html
xdg-open pages/admin/student-teacher-assignment-details.html
xdg-open pages/admin/transfer-student-teacher.html
xdg-open pages/admin/academic-supervisors.html

# teacher pages (2)
xdg-open pages/teacher/my-assigned-students.html
xdg-open pages/teacher/assigned-student-details.html
```

(Use `open` on macOS or double-click in the file explorer on any platform.)

---

## 3. Success criteria validation table

The 12 success criteria from `spec.md` § Success Criteria are validated below with the exact command and expected result. Run from the repo root.

| SC | Goal | Command | Expected |
|----|------|---------|----------|
| SC-001 | All 7 pages open with zero console errors | `ls pages/admin/student-teacher-assignments.html pages/admin/create-student-teacher-assignment.html pages/admin/student-teacher-assignment-details.html pages/admin/transfer-student-teacher.html pages/admin/academic-supervisors.html pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html` | 7 files listed; open each in DevTools — Console panel clean, Network panel clean |
| SC-002 | Zero `href="#"` across all 7 pages | `grep -nE 'href="#"' pages/admin/student-teacher-assignments.html pages/admin/create-student-teacher-assignment.html pages/admin/student-teacher-assignment-details.html pages/admin/transfer-student-teacher.html pages/admin/academic-supervisors.html pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html` | **0 matches** (in-page anchors like `href="#notes-card"` are NOT counted — the grep pattern requires the value to be exactly `"#"`) |
| SC-003 | Anchor `ASN-2024-1184` on ≥ 4 of the 7 pages | `grep -l ASN-2024-1184 pages/admin/student-teacher-assignments.html pages/admin/student-teacher-assignment-details.html pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html pages/admin/academic-supervisors.html \| wc -l` | ≥ 4 |
| SC-004 | SHARED_ASN_HEADER block byte-identical between admin and teacher detail pages | `diff <(awk '/SHARED_ASN_HEADER_START/,/SHARED_ASN_HEADER_END/' pages/admin/student-teacher-assignment-details.html) <(awk '/SHARED_ASN_HEADER_START/,/SHARED_ASN_HEADER_END/' pages/teacher/assigned-student-details.html)` | Zero output (no differences) |
| SC-005 | Cross-spec figures preserved verbatim | `grep -h -c -E '(92%\|88%\|ممتاز\|INV-2026-0184\|STL-2026-04-TCH-0042\|FAM-2023-0211\|450 ريال\|RPT-2026-04-Q03-007)' pages/admin/student-teacher-assignment-details.html pages/teacher/assigned-student-details.html pages/teacher/my-assigned-students.html pages/admin/create-student-teacher-assignment.html` | Each figure cited ≥ 1 time across the 4 pages combined |
| SC-006 | 90-second create-assignment walkthrough on 1440×900 | manual: open `pages/admin/create-student-teacher-assignment.html`, time top-to-bottom form scan ending with save-modal opening | < 90 seconds, zero scrolling |
| SC-007 | 15-second student lookup on `my-assigned-students.html`; 5-second "بحاجة متابعة" identification | manual: open `pages/teacher/my-assigned-students.html`, time identifying the persona row by name + identifying both at-risk rows by badge | < 15 seconds + < 5 seconds |
| SC-008 | 30-second comprehension of history-preservation rule | manual: open `pages/admin/transfer-student-teacher.html`, read the warning callout + click «تأكيد النقل» to see the modal, answer «هل تُحذف سجلات الأستاذ السابق؟» | answer «لا» in < 30 seconds |
| SC-009 | 100% Arabic-vs-Foreign rule identification on create-form | manual: open `pages/admin/create-student-teacher-assignment.html`, ask reviewer if differential pricing is visible | 100% «yes» rate; the pre-rendered «غير ناطق» chip + 600.00-ريال pricing + footnote together communicate the rule |
| SC-010 | CSS bundle ≤ 94 KB + only 8 staged files (modulo sidebar edits) | `du -k assets/css/output.css` + `git status --short \| wc -l` | output.css ≤ 94 KB; status shows ≤ 8 new files in `pages/` + 1 rebuilt `output.css` + the existing-page sidebar-diffs |
| SC-011 | Identical sidebar diff across prior-spec admin/teacher pages | `git diff --stat pages/admin/*.html \| grep -v 'student-teacher-assignments\|create-student-teacher-assignment\|student-teacher-assignment-details\|transfer-student-teacher\|academic-supervisors'` + same for teacher pages | every prior-spec admin file shows the **same** insertion-count (e.g., `+8 -0` or whatever the 2-`<li>` insert costs); every prior-spec teacher file shows the same insertion-count (e.g., `+4 -0` for the 1-`<li>` insert) |
| SC-012 | Zero new JS lines | `wc -l assets/js/main.js` | **68** (unchanged from Spec 010 baseline) |

---

## 4. Cross-spec grep validation

The following greps lock the spec's cross-spec discipline. Each MUST return the expected result before the spec is considered Done.

### Sidebar-update verification (SC-011)

```bash
# Every existing admin page must contain the new sidebar entries
grep -l 'href="student-teacher-assignments.html"' pages/admin/*.html | wc -l
grep -l 'href="academic-supervisors.html"' pages/admin/*.html | wc -l
# Both counts MUST equal the total number of admin files (≈ 50-60)

# Every existing teacher page must contain the new sidebar entry
grep -l 'href="my-assigned-students.html"' pages/teacher/*.html | wc -l
# MUST equal the total number of teacher files (≈ 20-25)
```

### Sanctioned-modal count (SC-012 + FR-083)

```bash
# At least 4 sanctioned modals across the 7 pages
grep -c 'data-modal-open="confirm-' \
  pages/admin/student-teacher-assignments.html \
  pages/admin/create-student-teacher-assignment.html \
  pages/admin/student-teacher-assignment-details.html \
  pages/admin/transfer-student-teacher.html | awk -F: '{s+=$2} END {print s}'
# MUST be ≥ 4 (save-assignment + stop-assignment + transfer + resume-assignment)

# Every modal body cites the «هذا عرض مرئي فقط» secondary caption
grep -c 'هذا عرض مرئي فقط' \
  pages/admin/student-teacher-assignments.html \
  pages/admin/create-student-teacher-assignment.html \
  pages/admin/student-teacher-assignment-details.html \
  pages/admin/transfer-student-teacher.html | awk -F: '{s+=$2} END {print s}'
# MUST be ≥ 4 — one per modal
```

### Persona-figure preservation (SC-005)

```bash
# Spec-006 figures
grep -h '92%' pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html | wc -l   # ≥ 2 hits
grep -h '88%' pages/teacher/assigned-student-details.html | wc -l                                            # ≥ 1
grep -h ممتاز pages/teacher/assigned-student-details.html | wc -l                                            # ≥ 1

# Spec-008 figures
grep -h 'FAM-2023-0211' pages/admin/student-teacher-assignment-details.html | wc -l                          # ≥ 1
grep -h 'INV-2026-0184' pages/admin/student-teacher-assignment-details.html | wc -l                          # ≥ 1
grep -h '450' pages/admin/student-teacher-assignment-details.html | wc -l                                    # ≥ 1 (the family balance figure)

# Spec-009 anchor
grep -h 'STL-2026-04-TCH-0042' pages/admin/student-teacher-assignment-details.html | wc -l                   # ≥ 1
```

### EGP currency preservation (FR-081)

```bash
# Exactly 1 EGP-tier row on the main assignments table
grep -c '1,500.00 EGP' pages/admin/student-teacher-assignments.html                                          # = 1
grep -c '1,500.00 EGP' pages/admin/*.html pages/teacher/*.html | awk -F: '{s+=$2} END {print s}'             # = 1 (no other page mentions EGP for the Egypt-tier course)
```

### Multi-teacher persona demo (FR-013 + Constitution VI)

```bash
# The persona appears on ≥ 2 rows of the main assignments table
grep -c 'عبد الرحمن مؤمن' pages/admin/student-teacher-assignments.html
# ≥ 2 (one for ASN-2024-1184 with الأستاذ أحمد, one for ASN-2024-1191 with الأستاذة منى)
```

### Latin-digits-inside-Arabic discipline (project-wide convention; FR-081 covers the currency-formatting case)

```bash
# No Eastern Arabic-Indic digits (٠١٢٣٤٥٦٧٨٩) anywhere in the 7 new pages
grep -nE '[٠-٩]' \
  pages/admin/student-teacher-assignments.html \
  pages/admin/create-student-teacher-assignment.html \
  pages/admin/student-teacher-assignment-details.html \
  pages/admin/transfer-student-teacher.html \
  pages/admin/academic-supervisors.html \
  pages/teacher/my-assigned-students.html \
  pages/teacher/assigned-student-details.html
# 0 matches
```

---

## 5. Constitutional 12-gate Definition of Done

| Gate | Verification |
|------|--------------|
| 1. All requested pages exist and openable | `ls` returns all 7 files |
| 2. Each page is responsive across desktop / tablet / mobile | manual visual check at 375 / 768 / 1024 / 1280 px |
| 3. Each page contains meaningful, realistic Arabic sample data | no lorem ipsum / no "Item 1" / no "Course 1" labels — the persona family + 4 named teachers + 14 supervised students + the 18 main-table rows all carry concrete Saudi-friendly names |
| 4. Header and sidebar consistent across pages within a role | the admin sidebar gains 2 entries on every admin page (sidebar diff identical, SC-011); the teacher sidebar gains 1 entry on every teacher page (same) |
| 5. Every navigation link points to a real existing HTML file | `grep -nE 'href="#"' <7 files>` = 0 (SC-002); each cross-spec link target exists (`pages/admin/invoice-details.html` Spec-008, `pages/admin/teacher-settlement-details.html` Spec-009, `pages/teacher/student-report.html` Spec-006, `pages/teacher/homework-review.html` Spec-004, `pages/teacher/create-homework.html` Spec-004) — verify with `ls` |
| 6. Page is visually professional and adheres to design tokens | reuses Spec 001 design tokens; ≥ 50 chip / badge instances styled by the constitutional palette |
| 7. No frontend framework or runtime | `grep -nrE '(react\|vue\|angular\|svelte\|jquery\|alpine\|next\|nuxt)' pages/admin/student-teacher-assignments.html pages/admin/create-student-teacher-assignment.html pages/admin/student-teacher-assignment-details.html pages/admin/transfer-student-teacher.html pages/admin/academic-supervisors.html pages/teacher/my-assigned-students.html pages/teacher/assigned-student-details.html` = 0 |
| 8. No backend, API, or simulated-API logic | `grep -nE '(fetch\(\|XMLHttpRequest\|axios\|\.ajax\()' <7 files>` = 0 |
| 9. TailwindCSS used consistently; no parallel ad-hoc CSS | no `<style>` blocks in any of the 7 pages other than the shared header link to `assets/css/output.css` |
| 10. JS limited to the 4 sanctioned interactions | `wc -l assets/js/main.js` = 68 (unchanged) |
| 11. Every "View" / detail entry point has a corresponding detail page | the «عرض» action on the assignments-list row routes to `student-teacher-assignment-details.html` (this spec); the «عرض الطالب» on the teacher's table routes to `assigned-student-details.html` (this spec); the «عرض الفاتورة» on related-invoices routes to Spec-008 `invoice-details.html` (existing); the «عرض التسوية» on teacher-earning-preview routes to Spec-009 `teacher-settlement-details.html` (existing) |
| 12. RTL rendering visually verified for every page | manual visual check at 1280 px — no broken alignment, no mirrored layouts, no English-only labels in primary flows |

---

## 6. Final git status audit

After the polish phase, `git status --short` MUST show **only** the following:

```text
A  pages/admin/student-teacher-assignments.html
A  pages/admin/create-student-teacher-assignment.html
A  pages/admin/student-teacher-assignment-details.html
A  pages/admin/transfer-student-teacher.html
A  pages/admin/academic-supervisors.html
A  pages/teacher/my-assigned-students.html
A  pages/teacher/assigned-student-details.html
M  assets/css/output.css
M  CLAUDE.md
M  .specify/feature.json
M  pages/admin/*.html (every prior-spec admin page — identical sidebar diff per SC-011)
M  pages/teacher/*.html (every prior-spec teacher page — identical sidebar diff per SC-011)
A  specs/011-student-teacher-assignments/spec.md
A  specs/011-student-teacher-assignments/plan.md
A  specs/011-student-teacher-assignments/research.md
A  specs/011-student-teacher-assignments/data-model.md
A  specs/011-student-teacher-assignments/quickstart.md
A  specs/011-student-teacher-assignments/contracts/*.md (7 files)
A  specs/011-student-teacher-assignments/checklists/requirements.md
A  specs/011-student-teacher-assignments/tasks.md (after /speckit-tasks runs)
```

**No other files** should appear in the diff. If any other file shows up:
- Prior-spec edits other than the sidebar partial → violation, revert.
- New CSS not via the rebuilt `output.css` → violation, fold into Tailwind utilities.
- New JS file → Constitution V violation, replace with existing data-modal-open pattern.

---

## 7. Browser smoke-test script

After build, on the first run, perform this 5-minute smoke test:

1. Open `pages/admin/student-teacher-assignments.html`. Verify: 5 tiles visible, 18 rows in the table, the persona row in position 1, ≥ 6 «غير ناطق» chips, 1 موقوف row, 1 EGP row. Click «عرض» on the persona row → `pages/admin/student-teacher-assignment-details.html` opens with breadcrumb «... › ASN-2024-1184».
2. From admin-details, scroll to the related-invoices list. Verify `INV-2026-0184` cited. Click «عرض» → Spec-008 invoice page opens. Back-navigate.
3. From admin-details, scroll to teacher-earning-preview. Verify `STL-2026-04-TCH-0042` cited. Click «عرض التسوية» → Spec-009 settlement page opens. Back-navigate.
4. Click «إيقاف التعيين» → confirm modal opens with projected-post-action + «هذا عرض مرئي فقط». Click «إلغاء» → modal closes.
5. Click «نقل المعلم» → `pages/admin/transfer-student-teacher.html` opens with the current-assignment summary for ASN-2024-1185 (سارة). Read the warning callout. Click «تأكيد النقل» → modal opens with full projected-post-action caption.
6. Open `pages/teacher/my-assigned-students.html`. Verify 6 summary cards, 12-row primary table, persona row carries 92%, ≥ 2 «بحاجة متابعة» badges. Expand «طلاب سابقون» → حسن المنصور row visible.
7. From the persona row, click «عرض الطالب» → `pages/teacher/assigned-student-details.html` opens. Verify the SHARED_ASN_HEADER block matches admin-details visually. Verify 92% / 88% / ممتاز preserved. Verify the 4 footer CTAs route to existing Spec-004 / Spec-006 files.
8. Open `pages/admin/academic-supervisors.html`. Verify 4 summary tiles, 4-card profile strip (sum 14), 14-row table with persona + sister + عمر شودري in rows 1-3.
9. Open `pages/admin/create-student-teacher-assignment.html`. Verify 13 controls, عمر شودري pre-filled, pricing-preview 600/480/90/0. Click «حفظ التعيين» → modal opens with projected-post-action.

If all 9 steps pass without console errors or 404s, the feature is operationally Done.
