# BC Food Delivery - WFS361 Capstone Project TODO

## Phase 1: Foundation & Design System
- [x] Analyze project structure
- [x] Create complete design system document (await approval)
- [x] Set up project scaffold (Vite + React)

## Phase 2: Design System Implementation ✅
- [x] Implement CSS variables (design tokens) — src/styles/variables.css
- [x] Create base app.css with typography & resets — src/styles/app.css
- [x] Wire index.css import order
- [x] Live visual preview of all tokens

## Phase 3: Component Build (one at a time, await approval after each)
- [x] Navbar (+ shared Button component, CartContext, icons, logo)
- [x] Hero (+ data/constants/utils, food imagery, icon library)
- [x] SearchBar (reusable) — verified live, glass field + focus glow + clear button + submit
- [x] CategoryFilter — verified live, sliding layoutId highlight + counts + ARIA tabs
- [x] FoodCard — verified live, glass card + image + rating/time chips + Add↔stepper wired to CartContext
- [x] FoodGrid
- [x] Cart + CartItem
- [x] DeliverySelector
- [x] OrderSummary
- [x] CheckoutForm + Checkout
- [x] Footer
- [x] Loader + EmptyState (shared)

## Phase 4: State, Data, Routing
- [x] CartContext + useCart hook
- [x] foodData, categories, deliveryLocations constants
- [x] utils (calculateTotal, formatPrice, getCategories)
- [x] orderService
- [x] AppRoutes + pages (Home, Checkout, Order)

## Phase 5: Polish
- [x] Framer Motion animations
- [x] Performance optimization
- [x] Rubric review
- [x] Final improvements