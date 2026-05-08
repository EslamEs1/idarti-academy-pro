# Contract — Submit Assignment Page

`pages/student/submit-assignment.html` is the action surface for any submission or resubmission. The featured state is **attempt 2 of 3** for E1.1 (`quran-meem-sakinah-baqarah-1-10`) — the resubmission of the featured Quran assignment. Per FR-031, all 7 submission methods are visible even when only the audio block applies.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-lg mx-auto space-y-6">

    <!-- Block 1: Assignment summary (pinned) -->
    <section id="sa-summary" class="bg-primary-50 border border-primary-200 rounded-2xl p-5 md:p-6">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <a href="assignment-details.html" class="text-xs text-accent-700 hover:underline">← العودة لتفاصيل الواجب</a>
          <h1 class="text-base md:text-lg font-semibold mt-1">{titleAr}</h1>
          <div class="flex flex-wrap items-center gap-2 text-xs text-text-base mt-2">
            <span>{courseRef.titleAr}</span>
            <span aria-hidden="true">·</span>
            <span>{teacherRef.nameAr}</span>
            <span aria-hidden="true">·</span>
            <span>التسليم قبل 10 مايو 2026</span>
          </div>
        </div>
        <span class="…attempt pill: المحاولة 2 من 3…">المحاولة 2 من 3</span>
      </div>
    </section>

    <!-- Block 2: Submission methods -->
    <section id="sa-methods">
      <h2>طريقة التسليم</h2>
      <div class="space-y-4">
        <!-- 7 method blocks per E6 -->
      </div>
    </section>

    <!-- Block 3: Note to teacher -->
    <section id="sa-note" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <label for="sa-note-text">ملاحظة للمعلم</label>
      <textarea id="sa-note-text" rows="4" placeholder="اكتب ملاحظاتك أو أسئلتك هنا..."></textarea>
      <p class="text-xs text-text-muted mt-2">سيراها المعلم مع تسليمك.</p>
    </section>

    <!-- Block 4: Pre-submit checklist -->
    <section id="sa-checklist" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
      <h2>قبل التسليم — قائمة التحقق</h2>
      <ul class="space-y-3"> … 5 checkbox items … </ul>
    </section>

    <!-- Block 5: Action area -->
    <section id="sa-actions" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200 flex flex-wrap items-center gap-3">
      <button type="button" class="btn-primary">تسليم الواجب</button>
      <a href="#sa-summary" class="btn-secondary">حفظ كمسودة</a>
      <a href="assignment-details.html" class="btn-tertiary">إلغاء</a>
      <p class="…inline notice…">هذا نموذج تجريبي — لا يتم رفع التسليم فعلياً.</p>
    </section>

  </div>
</main>
```

## Sidebar / header

- Sidebar: 15 entries from Spec 002; **active entry = "الواجبات"**.
- Header: same as Spec 002; `<title>` = `تسليم الواجب: {titleAr} — منصة إدارتي`; the in-page h1 is inside `#sa-summary`.

## Submission methods block (`#sa-methods`)

The 7 methods per E6. Each block has a uniform pattern:

```html
<div class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200" data-method="{methodKey}" data-applies="{true|false}">
  <header class="flex items-start gap-3 mb-3">
    <div class="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary-50 text-primary-700">
      <svg>…icon…</svg>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-semibold">{labelAr}</h3>
      <p class="text-xs text-text-muted mt-0.5">{helperTextAr}</p>
    </div>
    {!applies && <span class="text-xs text-text-muted italic">غير مطلوب لهذا الواجب</span>}
  </header>
  <div class="…method-specific UI…"></div>
</div>
```

### Audio block (the active one — pre-expanded with sample upload)

The audio block carries an additional accent border and the prominent placement (first in the list):

```html
<div class="bg-white rounded-2xl p-5 md:p-6 shadow-md border-2 border-accent-300 ring-1 ring-accent-100" data-method="audio-upload" data-applies="true">
  <header class="flex items-start gap-3 mb-4">
    <div class="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-accent-100 text-accent-700">
      <svg>…mic icon…</svg>
    </div>
    <div class="flex-1 min-w-0">
      <h3 class="text-sm font-semibold">رفع تسجيل صوتي</h3>
      <p class="text-xs text-text-muted mt-0.5">حدّ أقصى 5 MB — MP3 / M4A / WAV — مدة 60-90 ثانية</p>
    </div>
    <span class="…success pill: تم الرفع…">تم الرفع</span>
  </header>

  <!-- Pre-uploaded audio preview -->
  <div class="bg-slate-50 rounded-xl p-4 flex items-center gap-3 mb-3">
    <button type="button" aria-label="تشغيل التسجيل" class="…play button…">
      <svg class="h-5 w-5">…play…</svg>
    </button>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium truncate">تسجيل-الميم-الساكنة-المحاولة-2.mp3</p>
      <div class="flex items-center gap-3 text-xs text-text-muted mt-1">
        <span>1.2 MB</span>
        <span aria-hidden="true">·</span>
        <span>01:14 / 01:30</span>
      </div>
    </div>
    <button type="button" aria-label="حذف التسجيل" class="…trash icon…"><svg>…trash…</svg></button>
  </div>

  <!-- Waveform placeholder (visual only) -->
  <div class="flex items-end gap-0.5 h-12 mb-3" aria-hidden="true">
    <!-- ~40 small <span> bars with random heights styled via Tailwind h-* classes -->
  </div>

  <!-- Re-record affordance -->
  <div class="flex items-center gap-3">
    <button type="button" class="text-xs text-accent-700 hover:underline inline-flex items-center gap-1">
      <svg>…rotate-ccw…</svg>
      تسجيل من جديد
    </button>
    <span class="text-xs text-text-muted">أو</span>
    <button type="button" class="text-xs text-accent-700 hover:underline inline-flex items-center gap-1">
      <svg>…upload…</svg>
      رفع ملف بدلاً من ذلك
    </button>
  </div>
</div>
```

### Other 6 method blocks (muted)

Each of the remaining 6 methods (text-answer, file-upload, image-upload, video-upload, external-link, completion-confirmation) renders with its full UI but with a `data-applies="false"` flag and visual mute (reduced opacity to ~70%, the "غير مطلوب لهذا الواجب" caption visible). The internal UI is still painted to demonstrate the method's pattern:

- **Text answer**: a `<textarea>` with placeholder.
- **File upload**: a drag-and-drop zone with cloud-upload icon + accepted-types caption.
- **Image upload**: drop zone + camera icon.
- **Video upload**: drop zone + max-duration hint ("مدة قصوى 5 دقائق").
- **External link**: URL `<input type="url">` + helper text "الصق رابطاً من Google Drive أو Dropbox أو OneDrive".
- **Completion confirmation**: a `<label>` with a `<input type="checkbox">` + caption "أؤكد أنني أتممت المهام المطلوبة كاملةً."

## Pre-submit checklist (`#sa-checklist`)

5 checklist items, first 4 pre-checked (state = `checked` HTML attribute), 5th unchecked. Each:

```html
<li class="flex items-start gap-3">
  <input type="checkbox" id="chk-1" checked class="…" />
  <label for="chk-1" class="text-sm text-text-base leading-7">راجعت الآيات قبل التسجيل.</label>
</li>
```

The 5 items per FR-034:

1. ✅ راجعت الآيات قبل التسجيل.
2. ✅ التسجيل في مكان هادئ بدون تشويش.
3. ✅ صوتي واضح وغير مكتوم.
4. ✅ طبّقت أحكام الميم الساكنة في كل موضع.
5. ☐ استمعت لتسجيلي مرّتين قبل الرفع.

## Note to teacher (`#sa-note`)

```html
<label for="sa-note-text" class="block text-sm font-semibold mb-2">ملاحظة للمعلم <span class="text-xs font-normal text-text-muted">(اختياري)</span></label>
<textarea id="sa-note-text" rows="4" placeholder="اكتب ملاحظاتك أو أسئلتك للمعلم — مثلاً: 'كنت غير متأكد من الإخفاء عند الباء في الآية الثالثة'..." class="…"></textarea>
<p class="text-xs text-text-muted mt-2">سيراها المعلم مع تسليمك.</p>
```

## Action area (`#sa-actions`)

Per FR-035:

```html
<section id="sa-actions" class="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-200">
  <div class="flex flex-wrap items-center gap-3 mb-3">
    <button type="button" class="…btn-primary…">
      <svg>…send icon…</svg>
      تسليم الواجب
    </button>
    <a href="#sa-summary" class="…btn-secondary…">
      <svg>…save icon…</svg>
      حفظ كمسودة
    </a>
    <a href="assignment-details.html" class="…btn-tertiary…">إلغاء</a>
  </div>
  <p class="text-xs text-warning-700 bg-warning-50 border border-warning-200 rounded-lg px-3 py-2 inline-flex items-center gap-2">
    <svg>…info icon…</svg>
    هذا نموذج تجريبي — لا يتم رفع التسليم فعلياً.
  </p>
</section>
```

## Cross-page links

**Inbound**:

- `assignments.html` per-row "تسليم" / "إعادة التسليم" CTAs
- `assignment-details.html` "إعادة التسليم" primary CTA (sticky action area)
- `submission-feedback.html` "إعادة التسليم الآن" primary CTA

**Outbound**:

- "العودة لتفاصيل الواجب" (top of summary) → `assignment-details.html`
- "إلغاء" → `assignment-details.html`
- "حفظ كمسودة" → `#sa-summary` (same-page anchor; visual stub)
- "تسليم الواجب" → no navigation (visual `<button type="button">`)

## Validation hooks

- **FR-030**: `#sa-summary` contains the assignment title (linked to `assignment-details.html`), course/teacher chips, due date, attempt number "المحاولة 2 من 3".
- **FR-031**: `#sa-methods` contains exactly 7 `data-method` blocks. Verify with `grep -c 'data-method=' submit-assignment.html`.
- **FR-032**: The audio block has `data-method="audio-upload" data-applies="true"`, contains a play-button stub, a duration label "01:14 / 01:30", and a sample filename.
- **FR-033**: `#sa-note` exists and contains a `<textarea>` with the placeholder hint and a small caption.
- **FR-034**: `#sa-checklist` contains exactly 5 `<input type="checkbox">` items; the first 4 carry the `checked` attribute and the 5th does not.
- **FR-035**: `#sa-actions` contains a `<button type="button">` with text "تسليم الواجب", a "حفظ كمسودة" inline link, an "إلغاء" link to `assignment-details.html`, and the prototype notice.
- **SC-003**: A 30-second visual scan counts ≥ 7 distinct method blocks AND a checklist with ≥ 5 items showing both pre-checked and unchecked states.
