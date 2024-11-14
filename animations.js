/**
 * How to use:
 *
 * Add these data attributes to any element you want to animate:
 *
 * data-anim="fadeIn|slideUp|slideDown|slideLeft|slideRight"
 * - Specifies which animation to use
 *
 * data-duration=".3" (optional)
 * - Animation duration in seconds
 * - Defaults to .3s if not specified
 *
 * data-delay="0" (optional)
 * - Delay before animation starts in seconds
 * - Defaults to 0s if not specified
 *
 * Example:
 * <div data-anim="slideUp" data-duration="1.5" data-delay="0.2">
 *   Content to animate
 * </div>
 */

// GSAP Scroll Animations for Webflow
class ScrollAnimations {
  constructor() {
    console.log("ScrollAnimations initialized");

    // Global configuration variables
    this.defaultDuration = 0.4;
    this.movementDistance = "2rem"; // Global movement distance

    this.defaultAnimations = {
      fadeIn: {
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideUp: {
        y: this.movementDistance, // Using global variable
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideDown: {
        y: `-${this.movementDistance}`, // Using negative of global variable
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideLeft: {
        x: `-${this.movementDistance}`, // Using negative of global variable
        opacity: 0,
        duration: this.defaultDuration,
      },
      slideRight: {
        x: this.movementDistance, // Using global variable
        opacity: 0,
        duration: this.defaultDuration,
      },
    };

    this.setInitialStates();
    setTimeout(() => this.init(), 100);
  }

  // Helper method to safely parse numeric attributes
  safelyParseNumber(value, defaultValue) {
    const parsed = parseFloat(value);
    return !isNaN(parsed) && parsed >= 0 ? parsed : defaultValue;
  }

  setInitialStates() {
    const animatedElements = document.querySelectorAll("[data-anim]");
    animatedElements.forEach((element) => {
      const animation = element.getAttribute("data-anim");
      if (this.defaultAnimations[animation]) {
        gsap.set(element, {
          opacity: 0,
          x: this.defaultAnimations[animation].x || 0,
          y: this.defaultAnimations[animation].y || 0,
          immediateRender: true,
        });
      }
    });
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
        threshold: 0.1,
        rootMargin: "56px",
      }
    );

    const animatedElements = document.querySelectorAll("[data-anim]");
    console.log("Found animated elements:", animatedElements.length);

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

    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: "ease",
      force3D: true,
    });
  }
}

// Initialize animations when Webflow is ready
window.addEventListener("load", function () {
  if (typeof Webflow === "undefined") {
    console.warn("Webflow not found, initializing directly");
    new ScrollAnimations();
  } else {
    console.log("Initializing with Webflow");
    Webflow.push(function () {
      new ScrollAnimations();
    });
  }
});
