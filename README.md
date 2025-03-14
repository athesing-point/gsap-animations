# GSAP Scroll Animations for PDC (Webflow)

A lightweight, attribute-driven animation system built on GSAP for Webflow projects. This library allows you to easily add scroll-triggered animations to any element using data attributes.

## Setup

### Prerequisites

1. **Add GSAP to your project**

   - In Webflow: Project Settings > Custom Code > Footer Code
   - Add:
     ```html
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
     ```

2. **Add initial animation states**
   - In Webflow: Project Settings > Custom Code > Head Code
   - Add this CSS:
     ```html
     <style>
       [data-anim="fadeIn"] {
         opacity: 0;
       }
       [data-anim="slideUp"] {
         opacity: 0;
         transform: translateY(2rem);
       }
       [data-anim="slideDown"] {
         opacity: 0;
         transform: translateY(-2rem);
       }
       [data-anim="slideLeft"] {
         opacity: 0;
         transform: translateX(-2rem);
       }
       [data-anim="slideRight"] {
         opacity: 0;
         transform: translateX(2rem);
       }
       [data-anim="scaleIn"] {
         opacity: 0;
         transform: scale(0.85);
       }
       [data-anim="flipUp"] {
         opacity: 0;
         transform: translateY(2rem) rotateX(90deg);
         transform-origin: center bottom;
         perspective: 1000px;
         backface-visibility: hidden;
       }
       [data-anim] {
         will-change: transform, opacity;
       }
     </style>
     ```

## Usage

Add these data attributes to any element you want to animate:

### Available Attributes

**`data-anim`** (required)

- Specifies which animation to use
- Available animations:
  - `fadeIn`: Fades element in
  - `slideUp`: Slides up while fading in
  - `slideDown`: Slides down while fading in
  - `slideLeft`: Slides left while fading in
  - `slideRight`: Slides right while fading in
  - `scaleIn`: Scales up from 85% while fading in
  - `flipUp`: Flips up from bottom with 3D rotation

**`data-duration`** (optional)

- Controls how long the animation takes to complete
- Value in seconds (e.g., "0.4", "1.5")
- Defaults to 0.4s if not specified

**`data-delay`** (optional)

- Adds a delay before the animation starts
- Value in seconds (e.g., "0", "0.2")
- Defaults to 0s if not specified

**`data-instant`** (optional)

- Makes the animation trigger immediately on page load instead of on scroll
- Usage options:
  - `data-instant` or `data-instant="true"`: Enables instant animation
  - `data-instant="false"`: Explicitly disables instant animation
  - If omitted: Animation triggers on scroll

### Animation Trigger Settings

- threshold: 0.25 (25% of element must be visible)
- rootMargin: "-72px" (animation triggers when element is 72px into viewport)

To customize when animations trigger:

- Increase threshold (0 to 1) to require more element visibility
- Use negative rootMargin (e.g. "-100px") to trigger later
- Use positive rootMargin (e.g. "100px") to trigger earlier

### Example Usage

```html
<!-- Basic scroll animation -->
<div data-anim="slideUp">I'll slide up when scrolled into view</div>

<!-- Instant animation with custom timing -->
<div
  data-anim="fadeIn"
  data-instant="true"
  data-duration="0.8"
  data-delay="0.2"
>
  I'll fade in immediately when the page loads
</div>

<!-- Scale animation with custom duration -->
<div data-anim="scaleIn" data-duration="1.5">
  I'll scale up when scrolled into view
</div>

<!-- 3D flip animation -->
<div data-anim="flipUp">
  I'll flip up from the bottom when scrolled into view
</div>
```

## Performance Benefits

This implementation uses IntersectionObserver for superior performance compared to Webflow's native animations:

### Webflow Animations (current method):

- Constant scroll event processing
- CSS transitions (can be janky on mobile)
- No cleanup after animation
- Higher CPU usage
- More battery drain on mobile

### IntersectionObserver (new method):

- Fires only when elements enter/exit viewport
- Runs off main thread
- Non-blocking
- Minimal CPU usage
- Small memory footprint

## Production Recommendations

For best performance, we recommend using minified versions of both the JavaScript and CSS files in production. You can use a minification tool of your choice or use the pre-minified versions from our CDN.

## CDN Links

You can directly use these files from JSDelivr:

**JavaScript:**

```html
<script src="https://cdn.jsdelivr.net/gh/athesing-point/gsap-animations@latest/animations.min.js"></script>
```

**CSS:**

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/athesing-point/gsap-animations@latest/animations-initial.min.css"
/>
```

Note: While using @latest is convenient for development, we recommend pinning to a specific version (commit hash) in production for stability.

## Bonus: CSS-Only Animations

For hero sections and above-the-fold content where immediate animation is critical, we provide CSS-only alternatives that don't depend on JavaScript loading. These animations start immediately without any processing delays.

See the README in the `/css-only` folder for implementation details and usage instructions.
