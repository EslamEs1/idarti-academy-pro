# Contract: App Shell

**Feature**: `001-frontend-foundation`
**Applies to**: All five in-app pages (`pages/ui-kit.html` and the four role dashboards). `index.html` does NOT use this shell — it is a standalone mock login screen and intentionally has no sidebar/header.

This contract defines the structural skeleton every in-app page must embed. Page authors copy this skeleton from `components/header.html` and `components/<role>-sidebar.html` into each new page.

---

## Top-level document

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{pageTitleAr}} — منصة إدارتي التعليمية</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{relativePathToOutputCss}}" />
  </head>
  <body class="bg-surface-50 text-text-base font-sans antialiased">
    <div class="min-h-screen flex">
      <!-- SIDEBAR (E5 vocabulary, role-specific) -->
      <aside id="app-sidebar" class="...">…</aside>

      <!-- MAIN COLUMN -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- HEADER -->
        <header id="app-header" class="...">…</header>

        <!-- MAIN CONTENT WRAPPER -->
        <main class="flex-1 px-6 py-6 lg:px-8 lg:py-8 max-w-screen-2xl mx-auto w-full">
          {{pageContent}}
        </main>
      </div>
    </div>

    <!-- MOBILE BACKDROP -->
    <div id="app-backdrop" class="fixed inset-0 bg-black/40 hidden md:hidden"></div>

    <script src="{{relativePathToMainJs}}" defer></script>
  </body>
</html>
```

Notes:
- `lang="ar" dir="rtl"` is **required** at the document level (FR-029).
- `{{relativePathToOutputCss}}` resolves per page depth (`./assets/css/output.css` for `index.html`, `../../assets/css/output.css` for `pages/student/dashboard.html`, etc.).
- The header `<title>` ends with `— منصة إدارتي التعليمية` for cross-page consistency.

---

## Sidebar contract

| Spec area | Required |
|---|---|
| Width on desktop (`≥ md`) | `w-72` (288 px) |
| Position on desktop | `sticky top-0 h-screen` (fixed-effect within the flex shell) |
| Position on mobile (`< md`) | `fixed inset-block-0 inset-inline-end-0 w-80 max-w-[85vw] translate-x-full md:translate-x-0`; toggled `.is-open` adds `translate-x-0` |
| Background | `bg-primary-900` |
| Logo area | Top of sidebar, ~80 px tall, contains the academy logo block (text "إدارتي" + small mark in accent gold) and a subtle bottom border `border-primary-800`. |
| Nav list | `<ul>` of E3 entries, each rendered as: `<li><a href="{{targetPath}}" class="flex items-center gap-3 px-4 py-3 rounded-lg text-white/85 hover:bg-primary-800 hover:text-white transition-colors {{isActive ? 'is-active' : ''}}">{{icon}} <span>{{labelAr}}</span></a></li>` |
| Active state | `.is-active` applies `bg-primary-800 text-white font-semibold border-inline-end-4 border-accent-500` (per R6) |
| Logout | Last item in the list, target `index.html`, icon `log-out`. The list item has `mt-auto` (pushes to bottom of column-flex). |
| Close button (mobile) | Top-end corner, only visible at `< md`, icon `x`, fires `closeSidebar()` from main.js. |

---

## Header contract

| Spec area | Required |
|---|---|
| Height | `h-16` (64 px) |
| Background | `bg-white` with `border-b border-slate-200` |
| Position | Sticky (`sticky top-0 z-30`) within the main column |
| Inner padding | `px-4 md:px-6 lg:px-8` |
| Layout | `flex items-center justify-between gap-4` |

### Header — start (RTL: right side, since it's the inline-start in `dir="rtl"`)

1. **Mobile burger button** — visible `md:hidden`, icon `menu`, fires `openSidebar()`. Has `aria-label="فتح القائمة"`.
2. **Page title block** — `<div>` containing:
   - `<h1 class="text-base md:text-lg font-bold text-text-base leading-tight">{{pageTitleAr}}</h1>`
   - Optional `<p class="text-xs text-text-muted">{{pageSubtitleAr}}</p>`

### Header — end (RTL: left side, inline-end)

1. **Notification icon button** — `relative inline-flex h-10 w-10 items-center justify-center rounded-full text-text-base hover:bg-surface-50`. Icon `bell`. If `notificationCount > 0`, append `<span class="absolute -top-1 -end-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-danger-600 px-1 text-[0.625rem] font-bold text-white">{{count}}</span>`.
2. **Message icon button** — same shape as notification, icon `message-circle`, target `messages.html` for that role.
3. **User block** — clickable element opening a dropdown (defer dropdown content to a later spec; the trigger must still be present here):
   - Avatar (E2): `<div class="h-10 w-10 rounded-full {{avatarColorBg}} {{avatarColorText}} inline-flex items-center justify-center font-semibold">{{initialsAr}}</div>`
   - Name + role: hidden `< md`, visible `md:block` — two-line: `<p class="text-sm font-semibold leading-tight">{{nameAr}}</p><p class="text-xs text-text-muted leading-tight">{{labelAr from E1}}</p>`
   - Caret: Lucide `chevron-down`, ~16px.

---

## Responsive behavior

| Breakpoint | Sidebar | Header | Main content |
|---|---|---|---|
| `< md` (375 px reference) | Hidden by default; opens as a drawer from inline-end via `.is-open`. Backdrop active. | Burger button visible; user name+role hidden, only avatar shown. | Full width minus padding. Cards stack to single column. |
| `md` (768 px) | Hidden by default; opens as a drawer (matches mobile behavior up to `lg`). Some product teams prefer to show on tablet — but for clarity in this spec we keep the drawer pattern up through `< lg`. *Decision*: drawer for `< lg`, fixed for `≥ lg`. | Burger visible; user block shows avatar + name. | Cards in 2-column grid. |
| `≥ lg` (1024 px+) | Fixed `w-72`, always visible. No backdrop. | No burger. Full user block visible. | Cards in 3- or 4-column grid (per dashboard's spec). |

**Drawer breakpoint**: We use `lg:` modifiers (≥ 1024 px) to switch from drawer to fixed sidebar. Below 1024 px the sidebar is a drawer. This contract supersedes any inferred `md:` breakpoint elsewhere in this spec — `lg:` is the canonical desktop boundary.

---

## Accessibility contract

- The mobile burger button MUST have `aria-label="فتح القائمة"` and `aria-expanded` reflecting drawer state.
- The drawer close button MUST have `aria-label="إغلاق القائمة"`.
- Notification and message icon buttons MUST have visible-on-focus rings (Tailwind default `focus:ring-2 focus:ring-accent-500 focus:outline-none`).
- The active sidebar entry MUST have `aria-current="page"` in addition to its visual styling (FR-013/FR-035).
- All header icon buttons MUST include a text-only label via `<span class="sr-only">`.

---

## Width / overflow safeguards (FR-027, FR-028)

- Outermost `<body>` MUST NOT have any rule that creates horizontal overflow. Use `overflow-x-hidden` defensively only at body level.
- The `<main>` content area uses `min-w-0` on its parent (`.flex-1.flex.flex-col.min-w-0` above) to prevent flex children from forcing overflow.
- Any wide table inside `<main>` MUST be wrapped: `<div class="overflow-x-auto rounded-lg border border-slate-200">…</div>` so scroll stays inside the wrapper.
- The page title in the header MUST `truncate` if the title is unusually long; the user name MUST `truncate` similarly with a `max-w-[10rem]` cap.
