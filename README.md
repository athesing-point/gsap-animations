# GSAP Scroll Animations for PDC (Webflow)

A lightweight, attribute-driven animation system built on GSAP for Webflow projects. This library allows you to easily add scroll-triggered animations to any element using data attributes.

## Usage

Add these data attributes to any element you want to animate:

### Core Animation Attributes

**`data-anim`**

- Specifies which animation to use
- Available values: `fadeIn`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`

**`data-duration`** (optional)

- Animation duration in seconds
- Defaults to .3s if not specified

**`data-delay`** (optional)

- Delay before animation starts in seconds
- Defaults to 0s if not specified

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
