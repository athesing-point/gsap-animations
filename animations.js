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
    // Animation configurations
    this.defaultAnimations = {
      fadeIn: {
        opacity: 0,
        duration: 0.3,
      },
      slideUp: {
        y: "3.5rem",
        opacity: 0,
        duration: 0.3,
      },
      slideDown: {
        y: "-3.5rem",
        opacity: 0,
        duration: 0.3,
      },
      slideLeft: {
        x: "-3.5rem",
        opacity: 0,
        duration: 0.3,
      },
      slideRight: {
        x: "3.5rem",
        opacity: 0,
        duration: 0.3,
      },
    };

    this.init();
  }

  init() {
    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            // Unobserve after animation starts
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "3.5rem",
      }
    );

    // Select and observe all animated elements
    const animatedElements = document.querySelectorAll("[data-anim]");
    animatedElements.forEach((element) => {
      const animation = element.getAttribute("data-anim");
      const delay = element.getAttribute("data-delay") || 0;

      if (this.defaultAnimations[animation]) {
        // Set initial state
        gsap.set(element, {
          opacity: this.defaultAnimations[animation].opacity,
          x: this.defaultAnimations[animation].x || 0,
          y: this.defaultAnimations[animation].y || 0,
        });

        // Start observing
        this.observer.observe(element);
      }
    });
  }

  animateElement(element) {
    const animation = element.getAttribute("data-anim");
    const delay = element.getAttribute("data-delay") || 0;

    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: this.defaultAnimations[animation].duration,
      delay: parseFloat(delay),
      ease: "power2.out",
    });
  }
}

// Initialize animations when Webflow is ready
Webflow.push(function () {
  new ScrollAnimations();
});
