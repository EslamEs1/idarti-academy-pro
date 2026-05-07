# Contract: Design Tokens

**Feature**: `001-frontend-foundation`
**Locked**: `tailwind.config.js` MUST express exactly these tokens. UI Kit MUST display them.

---

## Color tokens (full hex map)

```js
// tailwind.config.js — theme.extend.colors
colors: {
  primary: {
    50:  '#EEF2FA',
    100: '#D6DEF1',
    200: '#A4B3DB',
    500: '#1E3A8A',
    600: '#15306E',
    700: '#0F2C5C',
    800: '#0A234A',
    900: '#0A1F44',
    950: '#06152E',
  },
  accent: {
    50:  '#FBF5E7',
    100: '#F6E8C2',
    200: '#EDD18A',
    400: '#DDB45F',
    500: '#D4A045',
    600: '#B58435',
    700: '#946826',
    800: '#754F18',
  },
  success: {
    50:  '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    500: '#15A36E',
    600: '#11875B',
    700: '#0E6E49',
  },
  warning: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
  },
  danger: {
    50:  '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  info: {
    50:  '#F0F9FF',
    100: '#E0F2FE',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
  },
  surface: {
    50:  '#F4F6FB',  // app background
    100: '#FFFFFF',  // card background
  },
  text: {
    base:    '#1E293B',  // body text (slate-800)
    muted:   '#64748B',  // helper text (slate-500)
    inverse: '#FFFFFF',
  },
}
```

Plus Tailwind's stock `slate` palette is kept available (used for `bg-slate-100` on inactive badges and `border-slate-200` on dividers).

---

## Typography tokens

```js
// tailwind.config.js — theme.extend.fontFamily
fontFamily: {
  sans: ['Tajawal', 'Cairo', 'Segoe UI', 'Tahoma', 'system-ui', 'sans-serif'],
}
```

Hierarchy (use these utility combinations, not custom CSS):

| Hierarchy level | Class combo | Notes |
|---|---|---|
| Page title (H1) | `text-xl md:text-2xl font-bold text-text-base leading-tight` | Used in header `<h1>` and in the top of each dashboard's "welcome" card. |
| Section title (H2) | `text-lg font-bold text-text-base` | Used above each card group on dashboards. |
| Card title (H3) | `text-base font-semibold text-text-base` | Inside individual cards. |
| Body text | `text-sm text-text-base leading-7` | `leading-7` (= 1.75rem line-height) is tuned for Arabic readability per FR-031. |
| Muted helper text | `text-xs text-text-muted leading-6` | Subtitles, captions. |
| Stat number | `text-3xl font-extrabold text-text-base tabular-nums` | Big numeric on stat cards. |

`tabular-nums` is required on every numeric card so column widths align across stat groups.

---

## Spacing tokens

Use Tailwind's default spacing scale. Key conventions:

| Element | Padding | Gap |
|---|---|---|
| Card | `p-5 md:p-6` | — |
| Card stack | — | `gap-4 md:gap-6` |
| Sidebar nav item | `px-4 py-3` | — between icon and label: `gap-3` |
| Header inner | `px-4 md:px-6 lg:px-8` | `gap-4` |
| Main content wrapper | `px-6 py-6 lg:px-8 lg:py-8` | — |

---

## Shadow + radius tokens

| Element | Tailwind class |
|---|---|
| Card border-radius | `rounded-xl` (12 px) |
| Card shadow | `shadow-sm` (subtle premium feel; not `shadow-md` which reads more "alert dialog") |
| Button radius | `rounded-lg` (10 px) |
| Avatar radius | `rounded-full` |
| Badge radius | `rounded-full` |
| Sidebar nav item radius | `rounded-lg` |
| Modal card radius | `rounded-2xl` (16 px) |

---

## Breakpoint tokens

Tailwind defaults are kept:

| Breakpoint | Min width | Used for |
|---|---|---|
| `sm` | 640 px | Minor inline text adjustments. |
| `md` | 768 px | Hide/show user name in header. |
| `lg` | 1024 px | **Drawer → fixed sidebar transition** (R7 + app-shell.md). |
| `xl` | 1280 px | Wider stat-card grids on dashboards. |
| `2xl` | 1536 px | Cap content max-width via `max-w-screen-2xl`. |

---

## Status badge tokens (E6)

The full mapping of badge label → color tokens → icon lives in **`data-model.md § E6`**. UI Kit MUST display all 19 (FR-016 / SC-010 allows one omission with explicit justification).

Visual contract for every badge: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium {{colorToken}}`. The icon is always present and is sized `h-3.5 w-3.5`.

---

## Component density rules

- A *card* never has internal margins (`m-*`); spacing between cards is the parent's responsibility (`gap-*` on the grid).
- A card never wraps a card.
- Buttons inside cards align to the card's inline-end edge (`mt-auto self-end` in flex columns).
