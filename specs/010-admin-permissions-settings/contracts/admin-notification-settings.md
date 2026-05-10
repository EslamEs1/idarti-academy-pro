# Contract: `pages/admin/notification-settings.html`

**Role**: Admin | **Active sidebar entry**: «إعدادات المنصة» (parent — sub-flow pattern) | **Anchor entity**: 28 notification toggles per data-model.md E6

## Page composition (top → bottom under RTL)

1. **Header** (reused)
2. **Breadcrumb**: «إعدادات المنصة» → «إعدادات الإشعارات»
3. **Page header bar** — title «إعدادات الإشعارات» + subtitle «التحكم في القنوات والفئات المُرسَلة من المنصة» + page-end CTA «حفظ جميع التغييرات» (primary success-tone, visual-only `<button type="button">`)
4. **Two-column layout** (desktop): main grid (~70% width) + side panel (~30% width). Stacks on mobile.

5. **Main column — notification toggle grid** (FR-047, FR-048, FR-049):
   - **Heading**: «الفئات والقنوات»
   - **Sub-caption**: «الفئات المعطّلة لا تُرسَل أي إشعار، حتى لو كانت القناة مفعّلة على المنصة»
   - **Grid**: 7 rows × 4 channels = 28 toggle cells. Header row carries channel labels: «الفئة / المنصة / البريد / واتساب / SMS». Each row carries:
     - Category label + description sub-caption (FR-050)
     - 4 toggle switches (peer-based Tailwind switches over `<input type="checkbox">` — checked attribute reflects ON state)

   - **7 rows + state pattern** (per data-model.md E6 / research.md D9):

     | # | Category | Description | Platform | Email | WhatsApp | SMS |
     |---|----------|-------------|----------|-------|----------|-----|
     | 1 | تذكير الواجبات | يُرسَل قبل 24 ساعة من موعد تسليم الواجب وعند تجاوز الموعد | ✓ ON | ✓ ON | ✕ OFF | ✕ OFF |
     | 2 | تذكير الحصة | يُرسَل قبل 30 دقيقة من بداية الحصة المباشرة | ✓ ON | ✓ ON | ✓ ON | ✕ OFF |
     | 3 | **تذكير الدفع** | يُرسَل قبل 3 أيام من تاريخ استحقاق الفاتورة وعند تجاوز التاريخ | ✓ ON | ✓ ON | ✓ ON | **✓ ON** |
     | 4 | تقارير ولي الأمر | يُرسَل في أول يوم من كل شهر مع رابط التقرير الشهري | ✓ ON | ✓ ON | ✓ ON | ✕ OFF |
     | 5 | إشعارات الإنجازات | يُرسَل فور حصول الطالب على شارة أو شهادة جديدة | ✓ ON | ✓ ON | ✕ OFF | ✕ OFF |
     | 6 | تذكير مراجعة المعلم | يُرسَل أسبوعياً للمعلمين عند وجود واجبات أو اختبارات تنتظر المراجعة | ✓ ON | ✕ OFF | ✕ OFF | ✕ OFF |
     | 7 | **تذكير دورة جديدة (deprecated)** | هذا الإشعار غير فعّال — يمكن إعادة تفعيله من إعدادات المنصة | ✕ OFF | ✕ OFF | ✕ OFF | ✕ OFF |

   - **Active-row state count**: 6+5+3+1 = **15 ON / 9 OFF** ✓ (FR-048).
   - **Deprecated row 7**: all 4 OFF + soft-gray «معطّلة» banner across the row (FR-049). Banner uses neutral-tone background + text icon.
   - **Total toggle count**: 28 (SC-016).

   - **Toggle-switch markup** (Tailwind peer-pattern, no JS):
     ```html
     <label class="relative inline-flex cursor-pointer items-center">
       <input type="checkbox" class="peer sr-only" checked>  <!-- omit `checked` for OFF -->
       <div class="peer h-6 w-11 rounded-full bg-neutral-300 after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary-600 peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5"></div>
     </label>
     ```
6. **Side panel — قنوات الاتصال** (FR-052) — sticky on desktop. Heading «قنوات الاتصال» + 4 channel-capability cards stacked vertically:

   - **المنصة card** (info-tone): «إشعار داخل المنصة في رمز الجرس + قائمة الإشعارات» + caption «متاح لجميع الباقات»
   - **البريد card** (success-tone): «بريد إلكتروني مع تنسيق HTML — يدعم العربية واللغات الأخرى» + caption «مجاني»
   - **واتساب card** (warning-tone): «رسائل واتساب عبر Twilio» + caption «متاح للمناطق المختارة (السعودية، الإمارات، مصر)»
   - **SMS card** (warm-tone): «رسائل نصية قصيرة» + caption «50 رسالة شهرياً ضمن الباقة الحالية، تكلفة إضافية للزيادة»

7. **Footer caption** (non-link static text per FR-067): «التغييرات على إعدادات الإشعارات تُطبَّق فوراً بعد الحفظ على جميع المستخدمين الذين تنطبق عليهم الفئة.»

## Functional requirement crosswalk

| FR | Element |
|----|---------|
| FR-001 (#9) | Page exists at `pages/admin/notification-settings.html` |
| FR-047 | 6×4 = 24-toggle grid (active rows) + row order |
| FR-048 | Default state: 15 ON / 9 OFF (active rows) |
| FR-049 | 7th deprecated row with all 4 OFF + معطّلة banner |
| FR-050 | Per-row description sub-captions |
| FR-051 | Pure HTML/CSS toggle switches — zero JS |
| FR-052 | Side panel «قنوات الاتصال» with 4 channel cards |
| FR-067 | Zero `href="#"` |

## Constraints

- 28 `<input type="checkbox">` elements total (SC-016).
- 15 carry the `checked` attribute (SC-016 default ON-state count).
- The toggle switches are pure CSS (peer-based) — no JS handler attached.
- The deprecated row 7 carries `<input>` elements but no `checked` (all 4 OFF) AND a visible «معطّلة» banner.
- No `href="#"` anywhere (SC-002).
- Latin digits inside Arabic copy (FR-063).
- Active sidebar entry: «إعدادات المنصة» (parent — sub-flow pattern).
