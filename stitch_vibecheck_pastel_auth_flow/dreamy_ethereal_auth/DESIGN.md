---
name: Dreamy Ethereal Auth
colors:
  surface: '#fdf9f3'
  surface-dim: '#dddad4'
  surface-bright: '#fdf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ed'
  surface-container: '#f1ede7'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e6e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#544249'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0ea'
  outline: '#87717a'
  outline-variant: '#dac0c9'
  surface-tint: '#a43073'
  primary: '#a43073'
  on-primary: '#ffffff'
  primary-container: '#f472b6'
  on-primary-container: '#6d0047'
  inverse-primary: '#ffafd3'
  secondary: '#8127cf'
  on-secondary: '#ffffff'
  secondary-container: '#9c48ea'
  on-secondary-container: '#fffbff'
  tertiary: '#874b69'
  on-tertiary: '#ffffff'
  tertiary-container: '#d08aab'
  on-tertiary-container: '#58243f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#ffafd3'
  on-primary-fixed: '#3d0026'
  on-primary-fixed-variant: '#85145a'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#fbb1d3'
  on-tertiary-fixed: '#370824'
  on-tertiary-fixed-variant: '#6c3451'
  background: '#fdf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e6e2dc'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
The design system crafts an enchanting, reassuring, and playful authentication portal for mobile experiences. Targeted at modern, aesthetic-first digital natives, it transforms authentication from a bureaucratic friction point into an indulgent, warm ritual.

The visual direction blends **soft tactile minimalism with dreamy pastel glassmorphism**. The emotional response should be lighthearted, comforting, deeply trustworthy, and effortlessly chic. Key motifs include floating translucent pastel glass cards, delicate micro-borders, atmospheric radial glows, and whimsical iconography featuring stars, sparkles, and soft geometric heart motifs.

## Colors
The palette balances tender warmth and magical iridescence without compromising legibility or WCAG 2.1 AA contrast requirements.

- **Primary (`#F472B6`) & Primary Variants (`#FFB4D6`, `#FDE2E4`):** Soft rose to bubblegum tones applied to primary CTAs, active focus indicators, and glowing aura overlays.
- **Secondary (`#A855F7`) & Lavender Tints (`#C084FC`, `#E2D9F3`):** Mystical lavender hues utilized for secondary actions, interactive highlights, and ethereal gradient endpoints.
- **Neutral Canvas (`#FFFBF5`, `#FFF5EB`):** Warm clotted creams replacing cold sterile whites to preserve a pillowy, inviting atmosphere.
- **Typography & Structural Accents:** Deep velvet plum (`#2E103E`) for high-contrast text and labels, avoiding harsh pitch black (`#000000`). Muted rose-quartz (`#83677B`) serves as placeholder and secondary label coloring.
- **Gradients:** Dynamic linear angles (135deg) transitioning gracefully from `#FFB4D6` through `#E2D9F3` to `#FFF5EB`.

## Typography
Typographic rhythm pairs expressive warmth with ergonomic readability.

- **Headlines (`Epilogue`):** Delivers a charismatic, soft geometric posture with editorial charm. Used selectively for screen welcome headers, key authentication titles, and OTP verification prompts.
- **Body & Labels (`Plus Jakarta Sans`):** Clean, open-aperture geometry that maintains supreme clarity at tiny sizes on mobile viewports. Handles form inputs, error validation messages, button copy, and terms links.

## Layout & Spacing
The layout employs an adaptive fluid column framework designed specifically for thumb-friendly mobile canvases, centered single-column viewports on tablets, and contained modal framing on desktop previews.

- **Mobile Viewports (<640px):** Single vertical stacking context, full-width fluid forms framed by `margin-mobile` (20px), internal component spacing locked to `space-md` (16px), and card internal paddings at `space-lg` (24px).
- **Tablet / Responsive (<1024px):** Clamped form containers (maximum width 420px) horizontally and vertically centered with ambient background gradients filling negative margins.
- **Rhythm Rules:** Form inputs maintain a consistent vertical separation of `space-md`. Group-to-CTA separation scales to `space-xl` to give tap targets distinct hierarchy.

## Elevation & Depth
Depth is created through luminous, diffused glassmorphism and multi-layered atmospheric ambient drops rather than muddy opaque shadows:

- **Ethereal Base Canvas:** Background elements feature faint ambient radial blurs in `#FDE2E4` and `#E2D9F3` that pulse subtly under the surface.
- **Pastel Glass Cards:** Translucent cream base (`rgba(255, 251, 245, 0.72)`) with a high-diffusion backdrop filter (`backdrop-blur: 20px`).
- **Halo Outlines:** Surfaces are framed by a 1px soft rose/lavender gradient border (`linear-gradient(135deg, rgba(255, 180, 214, 0.6), rgba(226, 217, 243, 0.3))`).
- **Glow Drop Shadows:** Floating cards and primary action buttons feature two-tier colored shadows:
  - Ambient: `0 12px 32px -8px rgba(244, 114, 182, 0.22)`
  - Direct: `0 4px 12px 0 rgba(168, 85, 247, 0.12)`

## Shapes
Forms celebrate exaggerated, friendly contours. The shape system uses high curvature levels to evoke tactile softness:

- **Surface Sheets & Cards:** Styled with `rounded-2xl` (1.5rem / 24px) or `rounded-3xl` (2rem / 32px), eliminating harsh edges.
- **Buttons & Chips:** Pill-shaped (`rounded-full` / 9999px) for friendly tap ergonomics and tactile thumb contact.
- **Input Fields:** Curvature fixed at `rounded-2xl` (1rem / 16px) to strike a balance between structural form containment and pillowy softness.
- **OTP Segmented Cells:** Square rounded squircles with `rounded-xl` (0.75rem / 12px).

## Components

### Buttons
- **Primary Auth CTA:** Pill-shaped, coated in a soft rose gradient (`linear-gradient(135deg, #F472B6 0%, #C084FC 100%)`), white bold label (`label-lg`), supported by an active rose ambient glow. Hover/active micro-interaction scales to `0.98` with an interior shimmer highlight.
- **Social / Secondary:** Glass pill background (`rgba(255, 255, 255, 0.85)`), 1px border (`#FDE2E4`), velvet plum text. Displays provider icons flanked by delicate micro-sparkle accents.
- **Tertiary / Link Buttons:** Text-only in `#A855F7` with subtle underline animations on focus.

### Input Fields
- Form inputs feature pillowy inset containers (`#FFF5EB` at 60% opacity), 1px perimeter border in `#FDE2E4`, and generous internal padding (`space-md`).
- **Focus State:** Transitions border color to `#F472B6` with an outer soft focus ring `0 0 0 4px rgba(244, 114, 182, 0.15)`. Floating labels float gracefully with a soft scale and purple tint.

### OTP / Pin Verification Cells
- 6-slot independent digit blocks with high-contrast centered numbers (`headline-sm`).
- Unfilled state: Faint lavender stroke. Filled state: Pastel rose background tint with smooth bounce micro-animation upon entry.

### Cards & Sheets
- Floating authentication card anchored with `rounded-3xl`, glass blur, and ambient gradient outline.
- Header decoration features clustered sparkle, star, or heart glyphs tinted in translucent gold and soft rose.

### Checkboxes & Toggle Switches
- Rounded pill switches; track switches from muted cream-lavender (`#E2D9F3`) to vivid rose (`#F472B6`). The thumb is a pristine white circle featuring an optional micro-heart icon embossment.
- Checkboxes use smooth `rounded-md` (8px) squares that fill with an energetic rose pop upon selection.

### Feedback & Status Badges
- Floating glass toast banners with pastel status fills (Rose for error alerts, Mint Lavender for success). Adorned with delicate corner glimmers.