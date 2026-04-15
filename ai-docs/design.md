# design.md

# Flipkart Clone Design Reference (Based on Provided Screenshot)

Use this file as the visual source of truth while building the UI.

---

# Overall Page Feel

- Clean ecommerce interface
- Light gray page background
- White content surfaces
- Compact spacing
- Rounded corners
- Subtle borders
- Dense but readable layout
- Modern Indian marketplace feel

---

# Color Palette

```css
Primary Blue: #2874F0
Search Border Blue: #2A55E5
Yellow Brand: #FFE500
Page Background: #F1F2F4
White: #FFFFFF
Text Primary: #212121
Text Secondary: #666666
Muted Gray: #878787
Border: #E0E0E0
Light Divider: #ECECEC
Success Green: #388E3C
Card Hover Shadow: rgba(0,0,0,0.08)
```

---

# Typography

## Base Font
Use:
- Inter
- system-ui
- sans-serif

## Sizes

```css
12px = helper text
14px = labels
16px = normal text
18px = headings
24px = major heading
32px = hero emphasis
```

## Weights

```css
400 = normal
500 = medium
600 = semi-bold
700 = bold
```

---

# Global Layout

## Page Container

```css
max-width: 1440px
margin: auto
padding-left: 16px
padding-right: 16px
```

## Vertical Rhythm

```css
section gap: 16px
card padding: 12px
large block padding: 16px
```

---

# Header Section

# Top Utility Row

Contains:
- Flipkart logo button
- Travel button
- Delivery location
- Login
- More
- Cart

## Layout

```css
height: 56px
display: flex
align-items: center
justify-content: space-between
gap: 16px
```

## Flipkart Brand Button

```css
background: #FFE500
height: 44px
padding: 0 20px
border-radius: 12px
font-weight: 700
display: flex
align-items: center
gap: 8px
```

## Secondary Travel Button

```css
background: #EDEDED
height: 44px
padding: 0 18px
border-radius: 12px
```

---

# Search Bar

## Style

```css
height: 48px
background: white
border: 2px solid #2A55E5
border-radius: 14px
padding: 0 16px
font-size: 16px
display: flex
align-items: center
gap: 10px
```

## Placeholder Text

```css
color: #666666
font-weight: 400
```

---

# Category Navigation Row

Contains icons + labels.

## Container

```css
height: 72px
background: white
display: flex
align-items: center
gap: 28px
overflow-x: auto
border-bottom: 1px solid #ECECEC
```

## Item

```css
display: flex
flex-direction: column
align-items: center
font-size: 14px
gap: 6px
cursor: pointer
min-width: 64px
```

## Active Item

```css
color: #111111
font-weight: 600
position: relative
```

## Active Underline

```css
height: 3px
width: 100%
background: #2874F0
border-radius: 10px
position: absolute
bottom: -12px
```

---

# Hero Banner Section

3 horizontal promo cards.

## Grid

```css
display: grid
grid-template-columns: 1.4fr 1.4fr 1fr
gap: 16px
```

## Banner Card

```css
background: white
border-radius: 16px
overflow: hidden
min-height: 260px
position: relative
```

## Banner Image

```css
width: 100%
height: 100%
object-fit: cover
```

## Banner Text Overlay

```css
position: absolute
left: 20px
top: 24px
max-width: 50%
color: #111111
```

---

# Product Recommendation Section

"Still looking for these?"

## Section Container

```css
background: linear-gradient(135deg, #EAF5FF, #F8E9FF)
border-radius: 18px
padding: 16px
```

## Title

```css
font-size: 32px
font-weight: 700
margin-bottom: 16px
```

## Product Row

```css
display: flex
gap: 12px
overflow-x: auto
```

---

# Recommendation Card

```css
width: 220px
background: rgba(255,255,255,0.72)
border-radius: 14px
padding: 8px
backdrop-filter: blur(4px)
```

## Product Image

```css
height: 180px
width: 100%
object-fit: contain
border-radius: 10px
background: #FFFFFF
```

## Product Label

```css
font-size: 14px
font-weight: 500
margin-top: 8px
color: #333333
```

---

# Buttons

## Primary CTA

```css
background: #2874F0
color: white
height: 44px
padding: 0 18px
border-radius: 10px
font-weight: 600
```

## Buy Button

```css
background: #FB641B
color: white
```

## Add To Cart Button

```css
background: #FF9F00
color: white
```

---

# Cards

## Standard Card

```css
background: white
border-radius: 12px
border: 1px solid #ECECEC
transition: all .2s ease
```

## Hover

```css
transform: translateY(-2px)
box-shadow: 0 8px 24px rgba(0,0,0,0.08)
```

---

# Icons

Use:
- Lucide React
- Heroicons
- Phosphor

Style:

```css
size: 18px to 22px
stroke-width: 1.8
color: #212121
```

---

# Responsive Rules

# Mobile (<768px)

- Stack utility row
- Full width search
- Horizontal scroll categories
- Hero becomes single column
- Product cards smaller
- Buttons full width

# Tablet (768px - 1024px)

- Two-column hero
- Reduced gaps
- Medium card sizes

# Desktop (>1024px)

- Full layout
- Three-column hero
- Maximum spacing

---

# Animation Rules

## Use Subtle Motion Only

```css
transition: 0.2s ease
hover scale: 1.02
button press: scale(0.98)
fade in sections
```

---

# Component Mapping

Build these components:

- Navbar.tsx
- SearchBar.tsx
- CategoryNav.tsx
- HeroBanner.tsx
- PromoCard.tsx
- ProductCard.tsx
- RecommendationSection.tsx
- Footer.tsx

---

# Clean Code Rules

- Keep components under 150 lines
- Reuse UI blocks
- Use TypeScript interfaces
- No inline styles unless dynamic
- Add comments only for logic
- Keep Tailwind classes readable
- Extract constants

---

# Final Goal

The UI should feel:

- Familiar
- Fast
- Clean
- Trustworthy
- Ecommerce ready
- Close to Flipkart without messy duplication