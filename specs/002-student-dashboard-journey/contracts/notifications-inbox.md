# Contract — Notifications Inbox Page

`pages/student/notifications.html` is a single-purpose page: a chronological list of recent notifications. Per the Q1 clarification (Session 2026-05-07), the page is a **single chronological list, newest first**, with no tabs and no grouped sections. Zero new JavaScript is required.

## Page-level layout

```html
<main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
  <div class="max-w-screen-md mx-auto space-y-5">

    <!-- Page intro -->
    <section class="flex items-start justify-between gap-4 flex-wrap">
      <div>
        <h2 class="text-lg md:text-xl font-bold leading-tight">الإشعارات</h2>
        <p class="text-sm text-text-muted leading-tight mt-1">
          جميع الإشعارات الحديثة في مكان واحد — مرتّبة من الأحدث إلى الأقدم.
        </p>
      </div>
      <!-- Unread chip -->
      <span class="inline-flex items-center gap-1.5 rounded-full bg-accent-100 text-accent-700 px-3 py-1 text-xs font-semibold">
        3 إشعارات غير مقروءة
      </span>
    </section>

    <!-- The list -->
    <ul class="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
      <!-- ≥ 8 notification <li> rows -->
    </ul>

    <!-- Footer link -->
    <p class="text-center text-xs text-text-muted">
      تظهر آخر 30 يوماً من الإشعارات. <a href="dashboard.html" class="text-accent-600 hover:underline">العودة إلى الرئيسية</a>.
    </p>
  </div>
</main>
```

## Notification row contract

Each `<li>` follows this structure:

```html
<li class="relative flex items-start gap-3 px-4 md:px-5 py-4 hover:bg-surface-50 transition-colors {unread: 'bg-white border-s-4 border-accent-500'} {read: 'bg-surface-50 border-s-4 border-transparent'}">

  <!-- Type icon chip (24×24 in tinted square) -->
  <span class="inline-flex h-9 w-9 items-center justify-center rounded-md flex-shrink-0 bg-{type}-50 text-{type}-700">
    <!-- Lucide icon for the type -->
  </span>

  <!-- Body -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 flex-wrap">
      <!-- unread dot, only when unread -->
      <span aria-hidden="true" class="h-2 w-2 rounded-full bg-accent-500"></span>
      <h3 class="text-sm {unread: 'font-semibold text-text-base'} {read: 'text-text-muted'} truncate">{titleAr}</h3>
      <!-- type label chip -->
      <span class="inline-flex items-center gap-1 rounded-full bg-{type}-50 text-{type}-700 px-2 py-0.5 text-[0.625rem] font-medium">
        {typeLabelAr}
      </span>
    </div>
    <p class="text-xs {unread: 'text-text-base'} {read: 'text-text-muted'} mt-1 leading-7">{bodyAr}</p>
    <div class="flex items-center justify-between gap-3 mt-2 flex-wrap">
      <span class="text-[0.625rem] text-text-muted">{timeAr}</span>
      <a href="{ctaHref}" class="text-xs font-medium text-accent-700 hover:text-accent-800 inline-flex items-center gap-1">
        {ctaAr} <!-- chevron-left icon with rtl:rotate-180 -->
      </a>
    </div>
  </div>
</li>
```

## Type taxonomy (6 types)

| typeKey | typeLabelAr | iconLucide | colorToken |
|---|---|---|---|
| homework | تذكير واجب | `book-open-check` | `primary` (navy) |
| live-session | حصة مباشرة | `video` | `success` (green) |
| teacher-feedback | ملاحظة من المعلم | `message-square-quote` | `accent` (gold) |
| payment-family | رصيد العائلة | `wallet` | `info` (blue) |
| achievement | إنجاز جديد | `award` | `warning` (amber) |
| exam | تذكير اختبار | `clipboard-check` | `danger` (red) |

## Read vs unread visual distinction (FR-053)

Read and unread states differ on **three independent visual axes** (no color-only signaling):

1. **Border-start**: `border-s-4 border-accent-500` (unread) vs `border-s-4 border-transparent` (read).
2. **Leading dot**: present + accent-colored (unread) vs absent (read).
3. **Title weight**: `font-semibold text-text-base` (unread) vs unstyled `text-text-muted` (read).

This satisfies FR-053 / Constitution Principle IV's "color is never the sole indicator".

## Required notifications (≥ 8)

Drawn from data-model §E10 in the listed order (newest first):

1. live-session — "تذكير: حصة الميم الساكنة بعد ساعتين" (unread)
2. homework — "موعد تسليم واجب القرآن: غداً" (unread)
3. teacher-feedback — "ملاحظة جديدة من الأستاذ أحمد" (unread)
4. achievement — "حصلت على وسام 'نجم الحضور'" (read)
5. exam — "تذكير: الاختبار الشهري بعد 6 أيام" (read)
6. payment-family — "وصلت دفعة شهرية إلى رصيد العائلة" (read)
7. homework — "تمّ قبول واجب اللغة العربية" (read)
8. live-session — "تمّ تسجيل حضورك في حصة الأحكام" (read, no CTA)

The first 3 are unread → unread count "3" matches the header bell badge per FR-052.

## Bottom navigation

A small "العودة للرئيسية" link sits below the list. No "Mark all as read", "Settings", or filter controls — the prototype is purely informational (per Q1 clarification).

## Mobile vs desktop

- **< 768 px**: type icon chip stays at the inline-start; title may wrap; CTA stacks below the timestamp.
- **≥ 768 px**: timestamp + CTA align on the same row; title can be longer before truncating.
- No horizontal scrollbar at any breakpoint.
