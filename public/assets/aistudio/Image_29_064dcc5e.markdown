---
name: Dewi Sri Playful Agro-Companion
colors:
  surface: '#fff8f5'
  surface-dim: '#fad3b3'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e8'
  surface-container: '#ffeadb'
  surface-container-high: '#ffe3ce'
  surface-container-highest: '#ffdcc1'
  on-surface: '#2b1704'
  on-surface-variant: '#3e4941'
  inverse-surface: '#432b16'
  inverse-on-surface: '#ffeee2'
  outline: '#6e7a70'
  outline-variant: '#bdcabe'
  surface-tint: '#006d40'
  primary: '#006a3e'
  on-primary: '#ffffff'
  primary-container: '#0e8551'
  on-primary-container: '#f6fff5'
  inverse-primary: '#74db9d'
  secondary: '#715c00'
  on-secondary: '#ffffff'
  secondary-container: '#feda5a'
  on-secondary-container: '#745f00'
  tertiary: '#00609a'
  on-tertiary: '#ffffff'
  tertiary-container: '#0979bf'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#91f8b8'
  primary-fixed-dim: '#74db9d'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#00522f'
  secondary-fixed: '#ffe17c'
  secondary-fixed-dim: '#e6c446'
  on-secondary-fixed: '#231b00'
  on-secondary-fixed-variant: '#564500'
  tertiary-fixed: '#cfe5ff'
  tertiary-fixed-dim: '#99cbff'
  on-tertiary-fixed: '#001d34'
  on-tertiary-fixed-variant: '#004a78'
  background: '#fff8f5'
  on-background: '#2b1704'
  surface-variant: '#ffdcc1'
typography:
  display-hero:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 38px
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 30px
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
  headline-sm:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
  title-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 22px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: 18px
  label-md:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 10px
    fontWeight: '800'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system blends a tactile 2D virtual pet simulator (evocative of classic character-care games like Pou) with an intuitive, friendly agricultural advisory assistant tailored for Indonesian users. The experience is warm, nurturing, lively, and culturally resonant—rooted in the heritage of Dewi Sri, the rice and fertility deity.

Visual style characteristics:
- **Tactile Toylike & Skeuomorphic-Lite:** UI controls evoke pressable rubber stamps, wooden signage, and bouncy jelly-buttons with defined bottom-beveled rims and punchy tactile states.
- **Organic Agricultural Warmth:** Surfaces mirror sunlit sawah (rice terrace) contours, woven bamboo textures, and clay pottery without cluttering utility.
- **Friendly Gamification:** Interfaces feature expressive status dials, floating bouncy bubble badges, and approachable conversational speech bubbles for the AI companion.

## Colors

The palette draws directly from tropical Indonesian agriculture: vibrant young rice stalks, fertile sunlit fields, clear irrigation waterways, and rich volcanic loam.

- **Primary (`#38A169` / Lush Padi Green):** Primary brand anchor, growth indicators, active health bars, and core positive actions. Paired with `#276749` for bottom tactile edge depth and `#E6FFFA` for soft badge fills.
- **Secondary (`#ECC94B` / Sunny Harvest Gold):** Currency, harvest-ready alerts, solar energy gauges, and special gamified rewards. Uses `#B7791F` for tactile click bases.
- **Tertiary (`#4299E1` / Irigasi Blue):** Water hydration meters, weather forecasts, spray/irrigation timers, and companion care actions (mandi/siram). Edge depth: `#2B6CB0`.
- **Neutral Earth (`#8C6D53` / Tanah Subur Brown):** Structural outlines, earthy text hierarchy, barn wood cards, and neutral navigation icons. Deepest shade: `#4A3525`.
- **Canvas (`#FCFBF7` / Beras Putih Cream):** Default soft screen backdrop, preventing eye fatigue under harsh field sunlight. Sub-surface cream cards sit on `#F7F5EE`.

## Typography

The typography leverages **Nunito Sans** configured with rounded terminal optical feel through heavier weights (600–800), offering immediate playful character while preserving high legibility for Indonesian field terms, botanical diagnostics, and numeric metrics.

- **Headlines & Titles:** Set with extra-bold cuts (`700` and `800`) to provide high visual weight against pillowy buttons and illustrated farm graphics.
- **Body:** Kept at medium-to-semibold (`500` and `600`) to guarantee high contrast on bright cream backgrounds under direct daylight.
- **Labels & Numbers:** Rendered in bold caps or tabular layout for XP bars, coin counts, temperature readings, and quick-action tooltips.

## Layout & Spacing

Engineered specifically around the compact 390x844 mobile viewport, optimizing touch zones for single-thumb play and outdoor farm usage.

- **Grid Architecture:** 4-column mobile fluid layout with `16px` outer canvas margins and `12px` column gutters.
- **Vertical Rhythm:** Rooted in an 8pt step system with 4pt micro-adjustments for badges and icon offsets.
- **Thumb Reach Zones:** Game HUD interactive hotkeys (Feed, Water, Chat AI, Harvest) occupy the bottom 25% of the viewport (between bottom safe-inset and 220px height) above the rounded navigation bar.
- **Top Safe Zone:** Housing avatar vitality status (Kesehatan, Kebahagiaan, Kadar Air) and inventory counters.

## Elevation & Depth

Visual hierarchy uses physical toy-like extrusion rather than blurred photorealistic drop shadows:

- **Tactile Extrusion (Chunky 3D Effect):** Solid, unblurred bottom drop borders (e.g., `box-shadow: 0 4px 0 0 #276749` on `#38A169` surfaces). When tapped or pressed, items shift down by 2–4px (`transform: translateY(3px)`) with the bottom shadow flattening to 1px.
- **Card Cushioning:** Cards use a dual-layer contour: a crisp `2px` stroke in soft clay/sand (`#EADCC9`) coupled with a soft ambient under-glow (`0 6px 12px -2px rgba(140, 109, 83, 0.08)`).
- **Floating Modals & Speech Bubbles:** Elevated over the play field with an exaggerated `0 8px 0 0 #4A3525` border offset, emphasizing comic-style layering.

## Shapes

The design system embraces high roundedness (Level 3 - Pill / Squircle) across all interfaces, conveying friendliness, softness, and organic life.

- **Buttons & Chips:** Full capsules and pills (`border-radius: 9999px`) with uniform 2px to 3px earthy outlines.
- **Cards & Sheets:** Heavy rounded rectangles (`border-radius: 24px` to `32px`) evoking river pebbles and polished clay tiles.
- **Terrace Contour Motifs:** Subtle background SVG path ribbons mimicking the undulating terraced slopes of Jatiluwih sawah, dividing informational sections organically without rigid straight borders.

## Components

### Chunky Tactile Buttons
- **Primary (Tindakan Utama - Panen / Tanam):** Padi Green background (`#38A169`), solid 4px bottom border (`#276749`), bold white text with subtle text shadow. Active/Pressed state translates 3px down, reducing border to 1px.
- **Secondary (Aksi Cepat - Siram / Pupuk):** Irigasi Blue or Sunny Gold, matching bottom bevel offsets.
- **Icon Action Buttons (HUD):** 56x56px circular pill buttons containing 28px illustrated farming icons with tactile rims.

### Pill Status Gauges & Vitals
- **Pet Vitality Bars (Air, Energi, Kesuburan):** Pill-shaped progress tracks (`#E2E8F0` track, 16px height) filled with bubbly glossy gradients (e.g., `#4299E1` to `#63B3ED`), topped with floating emoji or mini-icons on the left tip.

### Kartu Tanaman & Pet Card
- **Pillowy Container:** Off-white background (`#F7F5EE`), 2px stroke in `#EADCC9`, 24px corner radius.
- **Header:** Pill badge indicator showing growth phase (e.g., "Fase Bulir", "Siap Panen").
- **Stat Rows:** Divided with dotted earthy lines (`#D6C7B2`), keeping labels warm and friendly.

### AI Agronomist Speech Bubble ("Tanya Dewi")
- Floating cloud-shaped bubble with an off-center rounded tail pointing to the Dewi Sri character avatar.
- Includes quick-reply suggestion chips styled as miniature pill buttons along the base.

### Chips & Filter Bubbles
- Pill-shaped selector chips with a 2px outline. Inactive: `#FCFBF7` with `#8C6D53` text. Active: `#38A169` fill, white bold text, with 2px bottom shadow stamp.

### Checkboxes & Toggles
- Custom acorn or leaf check controls: circular toggle switches resembling wooden peg sliders with smooth bouncy sliding animations.

### Input Fields (Tanya AI / Catatan Tani)
- 48px height, 24px border radius, `#FFFFFF` interior, 2px border in `#CBB8A1`. Focus state transitions border to `#38A169` with an inset glow. Right-aligned chunky send button.