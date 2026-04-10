# ClairvoyAI: Component Architecture Refactor

Currently, `page.tsx` is a monolithic file (247 lines long) that handles everything: canvas rendering, scroll calculations, navigation, and the content for all 5 massive scrollytelling slides. This is difficult to scale or edit. We will refactor this into a composable React Architecture directly inside the `shadcn/components/` folder.

## Proposed Changes

We will divide the codebase into atomic layers:

### `components/layout/Navbar.tsx`
- We will extract the sticky, top-pinned navigation bar into its own module.
- It will natively handle the scroll visibility state (`isNavVisible`).

### `components/canvas/EyeCanvas.tsx`
- We will isolate the highly complex `requestAnimationFrame` loop, the `IntersectionObserver` scroll interpolations, and the `Image` preloading sequences.
- Keeping this abstracted means `page.tsx` is dramatically simplified and canvas states are purely self-contained.

### `components/sections/EsotericPanel.tsx`
- Instead of repeating massive Tailwind classes on every HTML `<section>`, we'll build a highly reusable, customized Shadcn component. 
- It will accept `titile`, `content`, and an `alignment` prop (`'left' | 'right' | 'center'`) to automatically enforce our new `.antigravityrules` about pushing text to the precise edges of the viewport to keep the eye unobstructed.

### `app/page.tsx` [MODIFY]
- `page.tsx` will be drastically simplified. It will now solely act as the declarative composition module calling these abstracted units in tandem.
