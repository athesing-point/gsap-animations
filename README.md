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
       [data-anim] {
         will-change: transform, opacity;
       }
     </style>
     ```

## Usage

Add these data attributes to any element you want to animate:

### Core Animation Attributes

**`data-anim`**

- Specifies which animation to use
- Available values: `fadeIn`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`

**`data-duration`** (optional)

- Animation duration in seconds
- Defaults to .4s if not specified

**`data-delay`** (optional)

- Delay before animation starts in seconds
- Defaults to 0s if not specified

### Animation Trigger Settings

- threshold: 0.35 (35% of element must be visible)
- rootMargin: "-72px" (animation triggers when element is 72px into viewport)

To customize when animations trigger:

- Increase threshold (0 to 1) to require more element visibility
- Use negative rootMargin (e.g. "-100px") to trigger later
- Use positive rootMargin (e.g. "100px") to trigger earlier

### Example Usage

```html
<div data-anim="fadeIn" data-duration="1" data-delay="0">
  <!-- Your content here -->
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
<script src="https://cdn.jsdelivr.net/gh/pdc-path/webflow-animations@latest/animations.min.js"></script>
```

**CSS:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/pdc-path/webflow-animations@latest/animations-initial.min.css" />
```

Note: While using @latest is convenient for development, we recommend pinning to a specific version in production for stability.
