# Contract — Student Shell Delta

This contract describes the minimum-necessary changes to the **student shell** (header + sidebar) introduced by Spec 002. All other shell elements remain byte-identical to Spec 001.

## What does NOT change

- Header height (`h-16`), padding (`px-4 md:px-6 lg:px-8`), stickiness (`sticky top-0 z-30`).
- Header background, border, font tokens.
- Sidebar dark-navy color (`bg-primary-900`), width (`w-80 lg:w-72`), `is-active` indicator pattern, mobile drawer + close-button + backdrop wiring.
- The `<aside id="app-sidebar">` element's dataset, ARIA labels, and outer flex container.
- The four JS handlers in `assets/js/main.js` — no additions, no rewrites.

## What DOES change

### 1. Sidebar — two new entries (student sidebar only)

The student sidebar's `<ul>` of navigation entries grows from 13 to 15 items. Insertion points and exact markup:

#### After "الإنجازات" (achievements), before "التقارير" (reports):

```html
<li>
  <a href="learning-journey.html"
     class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-primary-800 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 flex-shrink-0" aria-hidden="true">
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>
      <circle cx="12" cy="12" r="10"/>
    </svg>
    <span class="text-sm">رحلتي التعليمية</span>
  </a>
</li>
```

#### After "التقويم" (calendar), before "سجل المدفوعات" (payment history):

```html
<li>
  <a href="weekly-plan.html"
     class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-primary-800 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500 focus-visible:outline-offset-2">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 flex-shrink-0" aria-hidden="true">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M12 11h4"/>
      <path d="M12 16h4"/>
      <path d="M8 11h.01"/>
      <path d="M8 16h.01"/>
    </svg>
    <span class="text-sm">خطة الأسبوع</span>
  </a>
</li>
```

### 2. Active-entry rule per page

Exactly one `<li>` MUST be marked as the active entry on each page using `aria-current="page"` + `is-active` class on the `<a>` tag, the rest left as inactive.

| Page | Active entry |
|---|---|
| `pages/student/dashboard.html` | "الرئيسية" |
| `pages/student/learning-journey.html` | "رحلتي التعليمية" |
| `pages/student/weekly-plan.html` | "خطة الأسبوع" |
| `pages/student/notifications.html` | none — bell is the canonical entry; sidebar shows no active entry on this page |

### 3. Header bell — `<button>` → `<a>`

The bell currently renders as:

```html
<button type="button" aria-label="الإشعارات"
  class="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text-base hover:bg-surface-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
  <!-- bell SVG -->
  <span class="absolute -top-0.5 -end-0.5 ...">3</span>
</button>
```

It MUST be replaced on the four pages built/redesigned by this feature with:

```html
<a href="notifications.html" aria-label="الإشعارات"
  class="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text-base hover:bg-surface-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
  <!-- same bell SVG -->
  <span class="absolute -top-0.5 -end-0.5 ...">3</span>
</a>
```

Same visual footprint, same aria-label, same count. The change is purely semantic + behavioral (anchor enables middle-click / cmd-click in browsers).

### 4. Page titles

Each page sets a unique `<title>`:

- `dashboard.html` → `لوحة الطالب — منصة إدارتي` (already set in Spec 001).
- `learning-journey.html` → `رحلتي التعليمية — منصة إدارتي`.
- `weekly-plan.html` → `خطة الأسبوع — منصة إدارتي`.
- `notifications.html` → `الإشعارات — منصة إدارتي`.

### 5. Page-level header `<h1>` and subtitle

The header's left-side title block updates per page:

| Page | `<h1>` | subtitle (`md:block`) |
|---|---|---|
| dashboard | `لوحة الطالب` | `أهلاً بك في رحلتك التعليمية` |
| learning-journey | `رحلتي التعليمية` | `سجل تقدّمك منذ بداية المسار` |
| weekly-plan | `خطة الأسبوع` | `27 أبريل – 3 مايو 2026` |
| notifications | `الإشعارات` | `3 إشعارات غير مقروءة` |

### 6. Other-role sidebars

Parent / teacher / admin sidebars are NOT modified. The two new entries appear only in the student sidebar, per FR-066.
