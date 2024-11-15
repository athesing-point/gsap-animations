/**
 * How to use:
 *
 * Add these data attributes to any element you want to animate:
 *
 * data-anim="fadeIn|slideUp|slideDown|slideLeft|slideRight"
 * - Specifies which animation to use
 *
 * data-duration=".4" (optional)
 * - Animation duration in seconds
 * - Defaults to .4s if not specified
 *
 * data-delay="0" (optional)
 * - Delay before animation starts in seconds
 * - Defaults to 0s if not specified
 *
 * Animation Trigger Settings:
 * - threshold: 0.35 (35% of element must be visible)
 * - rootMargin: "-72px" (animation triggers when element is 72px into viewport)
 *
 * To customize when animations trigger:
 * - Increase threshold (0 to 1) to require more element visibility
 * - Use negative rootMargin (e.g. "-100px") to trigger later
 * - Use positive rootMargin (e.g. "100px") to trigger earlier
 *
 * Example:
 * <div data-anim="slideUp" data-duration="1.5" data-delay="0.2">
 *   Content to animate
 * </div>
 */

// GSAP Scroll Animations for Webflow
class ScrollAnimations {
  constructor() {
    // console.log("ScrollAnimations initialized");

    // Global configuration variables
    this.defaultDuration = 0.4;
    this.movementDistance = "2rem";

    // Adjust threshold and rootMargin based on screen width
    if (window.innerWidth <= 768) {
      // Mobile settings - more aggressive
      this.intersectionThreshold = 0.1; // Only need 10% visibility on mobile
      this.rootMargin = "0px"; // Trigger as soon as element enters viewport
    } else {
      // Desktop settings - original values
      this.intersectionThreshold = 0.2;
      this.rootMargin = "-72px";
    }

    this.defaultAnimations = {
      fadeIn: {
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideUp: {
        y: this.movementDistance,
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideDown: {
        y: `-${this.movementDistance}`,
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideLeft: {
        x: `-${this.movementDistance}`,
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideRight: {
        x: this.movementDistance,
        opacity: 0,
        duration: this.defaultDuration,
      },
      scaleIn: {
        scale: 0.85,
        opacity: 0,
        duration: this.defaultDuration,
      },
    };

    setTimeout(() => this.init(), 100);
  }

  // Helper method to safely parse numeric attributes
  safelyParseNumber(value, defaultValue) {
    const parsed = parseFloat(value);
    return !isNaN(parsed) && parsed >= 0 ? parsed : defaultValue;
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: this.intersectionThreshold,
        rootMargin: this.rootMargin,
      }
    );

    const animatedElements = document.querySelectorAll("[data-anim]");
    // console.log("Found animated elements:", animatedElements.length);

    animatedElements.forEach((element) => {
      const animation = element.getAttribute("data-anim");
      if (this.defaultAnimations[animation]) {
        this.observer.observe(element);
      } else {
        console.warn(`Invalid animation type "${animation}" on element:`, element);
      }
    });
  }

  animateElement(element) {
    const animation = element.getAttribute("data-anim");

    // Safely get duration and delay with fallbacks
    const defaultDuration = this.defaultAnimations[animation].duration;
    const defaultDelay = 0;

    let duration = element.getAttribute("data-duration");
    let delay = element.getAttribute("data-delay");

    // Use safe parsing with fallbacks
    duration = this.safelyParseNumber(duration, defaultDuration);
    delay = this.safelyParseNumber(delay, defaultDelay);

    // Get the initial animation properties
    const animProps = { ...this.defaultAnimations[animation] };

    // Create the animation configuration
    const config = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: animation === "scaleIn" ? 1 : animProps.scale || 1, // Only set scale to 1 for scaleIn
      duration: duration,
      delay: delay,
      ease: "power2.out", // Changed ease for smoother animation
      force3D: true,
    };

    // Set initial state
    gsap.set(element, {
      opacity: animProps.opacity,
      x: animProps.x || 0,
      y: animProps.y || 0,
      scale: animation === "scaleIn" ? 0.85 : 1, // Only set initial scale for scaleIn
      immediateRender: true,
    });

    // Run the animation
    gsap.to(element, config);
  }
}

// Initialize animations when Webflow is ready
window.addEventListener("load", function () {
  if (typeof Webflow === "undefined") {
    console.warn("Webflow not found, initializing directly");
    new ScrollAnimations();
  } else {
    // console.log("Initializing with Webflow");
    Webflow.push(function () {
      new ScrollAnimations();
    });
  }
});
