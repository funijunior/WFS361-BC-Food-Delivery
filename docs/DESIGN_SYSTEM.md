# BC Food Delivery — Design System
## WFS361 Capstone | Premium Frontend Design Tokens

A unified visual language for a cinematic, premium campus food delivery platform.

---

## 1. BRAND IDENTITY

**Name:** BC Eats (working name for the product)
**Tagline:** "Campus cravings, delivered."
**Personality:** Futuristic · Cinematic · Elegant · Premium · Smooth · Immersive

The product feels like a commercial SaaS food delivery platform — not a student assignment. Every surface uses layered depth, glassmorphism, soft shadows, and refined motion.

---

## 2. COLOR TOKENS

### Primary (Brand)
| Token | Hex | Usage |
|---|---|---|
| `--color-forest` | `#0F3D2E` | Primary brand, dark surfaces, hero bg |
| `--color-emerald` | `#1F8A70` | CTAs, active states, accents |

### Secondary (Surfaces)
| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#090909` | App background base |
| `--color-charcoal` | `#1B1B1B` | Cards, elevated surfaces |

### Accent
| Token | Hex | Usage |
|---|---|---|
| `--color-dark-red` | `#7B1113` | Price highlights, delete actions, badges |

### Neutrals
| Token | Hex | Usage |
|---|---|---|
| `--color-white` | `#FFFFFF` | Text on dark, glass text |
| `--color-soft-gray` | `#E8E8E8` | Secondary text, borders |
| `--color-gray-400` | `#9A9A9A` | Muted text |
| `--color-gray-600` | `#4A4A4A` | Disabled text |

### Glass (Glassmorphism)
| Token | Value |
|---|---|
| `--glass-bg` | `rgba(255,255,255,0.06)` |
| `--glass-border` | `rgba(255,255,255,0.12)` |
| `--glass-blur` | `18px` |

### Gradients (used sparingly)
| Token | Value |
|---|---|
| `--gradient-brand` | `linear-gradient(135deg, #0F3D2E 0%, #1F8A70 100%)` |
| `--gradient-hero` | `radial-gradient(circle at 20% 20%, rgba(31,138,112,0.25), transparent 60%), radial-gradient(circle at 80% 0%, rgba(123,17,19,0.18), transparent 55%)` |
| `--gradient-accent` | `linear-gradient(135deg, #1F8A70 0%, #7B1113 100%)` |

---

## 3. TYPOGRAPHY SCALE

**Font families:**
- Display/Headings: `Outfit` (geometric, modern, premium)
- Body/UI: `Inter` (excellent readability)
- Optional accents: `Poppins`

Loaded via Google Fonts in `index.html`.

**Scale (8px rhythm, fluid via clamp):**
| Token | Size | Weight | Line-height | Usage |
|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 4.5rem)` | 700 | 1.05 | Hero headline |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` | 700 | 1.1 | Page titles |
| `--text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | 1.2 | Section titles |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | 1.3 | Card titles |
| `--text-body-lg` | `1.125rem` | 400 | 1.6 | Lead paragraphs |
| `--text-body` | `1rem` | 400 | 1.6 | Default body |
| `--text-sm` | `0.875rem` | 500 | 1.5 | Secondary info |
| `--text-xs` | `0.75rem` | 600 | 1.4 | Labels, badges |

**Letter-spacing:** `-0.02em` on display/h1, `0` on body, `0.08em` uppercase on xs labels.

---

## 4. SPACING SCALE (8px system)
| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `24px` |
| `--space-6` | `32px` |
| `--space-7` | `48px` |
| `--space-8` | `64px` |
| `--space-9` | `80px` |
| `--space-10` | `96px` |

**Container max-width:** `1440px`
**Container padding:** Desktop `80px` · Tablet `48px` · Mobile `20px`

---

## 5. RADIUS SCALE
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Badges, small chips |
| `--radius-button` | `16px` | Buttons |
| `--radius-input` | `18px` | Inputs |
| `--radius-card` | `22px` | Food cards, panels |
| `--radius-glass` | `28px` | Glass panels, cart, hero cards |
| `--radius-pill` | `999px` | Pills, category chips |

---

## 6. ELEVATION / SHADOW SCALE
Soft, layered shadows (premium, not harsh).

| Token | Value | Usage |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.2)` | Subtle |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.25)` | Chips, small elements |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.3)` | Cards |
| `--shadow-lg` | `0 16px 48px rgba(0,0,0,0.35)` | Floating cart, modals |
| `--shadow-glow` | `0 0 24px rgba(31,138,112,0.35)` | Hover glow on brand |
| `--shadow-glow-red` | `0 0 20px rgba(123,17,19,0.4)` | Delete/danger hover |

---

## 7. ANIMATION TOKENS
Framer Motion + CSS transitions. Purposeful, not decorative.

| Token | Easing | Duration | Usage |
|---|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | — | Primary easing |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | — | Playful micro |
| `--dur-fast` | — | `150ms` | Hover, tap |
| `--dur-base` | — | `300ms` | Standard |
| `--dur-slow` | — | `600ms` | Page/hero reveals |

**Motion patterns:**
- Fade up + scale on scroll reveal (stagger)
- Cart morph: item flies to cart icon
- Magnetic buttons (cursor attraction)
- Animated search glow on focus
- Smooth page transitions (route fade)
- Navbar transparency → solid on scroll
- Hover: lift `translateY(-6px)` + glow + shadow-lg

**Reduced motion:** Respect `prefers-reduced-motion`.

---

## 8. ICON GUIDELINES
- Custom SVG icons in `src/assets/icons/` (cart, delivery, search, etc.)
- Stroke-based, `currentColor`, `2px` stroke, rounded caps
- Default size `24px`, scalable via `width/height`
- In-label ARIA where icon-only buttons

---

## 9. BUTTON VARIANTS
| Variant | Appearance | Use |
|---|---|---|
| `primary` | Emerald bg, white text, shadow-glow on hover | Main CTAs (Add, Checkout) |
| `secondary` | Glass bg, border, white text | Secondary actions |
| `ghost` | Transparent, white/emerald text | Nav links, tertiary |
| `danger` | Dark red bg, white text | Remove, delete |
| `icon` | Square, glass, hover lift | Icon-only (favorite, qty) |

**States:** default, hover (lift + glow), focus (emerald ring `0 0 0 3px`), active (scale 0.97), disabled (opacity 0.4, no pointer).

**Radius:** `16px`. **Padding:** `14px 28px` (lg), `12px 22px` (md).

---

## 10. INPUT VARIANTS
| Variant | Use |
|---|---|
| `text` | Search, name, contact |
| `select` | Delivery location |
| `textarea` | Notes |

- Glass bg, `18px` radius, `1px` glass border
- Focus: emerald border + outer ring glow
- Label above (xs, uppercase, tracked)
- Error: dark-red border + message

---

## 11. CARD VARIANTS
| Variant | Usage |
|---|---|
| `food-card` | Menu items — image, rating, time, price, fav, add |
| `glass-panel` | Cart, summary, hero cards |
| `category-chip` | Pill filter, active = emerald gradient |
| `stat-card` | Hero statistics |

All cards: `22px` radius (glass `28px`), shadow-md, hover lift.

---

## 12. COMPONENT STATES (every component)
- **Loading** — skeleton or Loader shimmer
- **Empty** — EmptyState illustration + message
- **Hover** — lift + glow
- **Focus** — visible emerald ring
- **Disabled** — dimmed, no pointer
- **Mobile** — stacked/refluid layout
- **Desktop** — full grid layout
- **A11y** — ARIA labels, keyboard support, semantic HTML

---

## 13. LAYOUT GRID
- CSS Grid preferred over Flexbox for major layouts
- Food grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap `24px`
- Checkout: 2-col grid (form 1.6fr / summary 1fr), collapses to 1-col on tablet
- Max content width `1440px`, centered with container padding

---

## 14. ACCESSIBILITY
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `footer`)
- ARIA labels on icon buttons, live regions for cart count
- Keyboard nav: tab order, Enter/Space activation, Esc closes cart
- Visible focus rings (emerald, `3px` offset)
- Color contrast: white on forest/emerald = AAA; soft-gray on charcoal = AA+
- `prefers-reduced-motion` respected

---

## 15. PERFORMANCE
- React.lazy + Suspense for Checkout/Order routes
- Memoized food list / filtered results (`useMemo`)
- Context value memoization to minimize re-renders
- Image lazy loading (`loading="lazy"`) + sized assets
- Framer Motion animations on transform/opacity only

---

## APPROVAL CHECKPOINT
This design system defines every token the application will use.
**Implementation will only begin once you approve this design system.**
