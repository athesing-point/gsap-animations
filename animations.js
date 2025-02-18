/**
 *
 * GSAP scroll animations for Webflow
 * See documentation at: https://github.com/athesing-point/gsap-animations
 *
 * Dependencies: Core GSAP library (no plugins required)
 *
 */

// GSAP Scroll Animations for Webflow
class ScrollAnimations {
  constructor() {
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

    // Handle instant animations immediately
    this.handleInstantAnimations();

    setTimeout(() => this.init(), 100);
  }

  // Updated method to use data-instant attribute
  handleInstantAnimations() {
    const instantElements = document.querySelectorAll(
      '[data-anim][data-instant]:not([data-instant="false"])'
    );
    instantElements.forEach((element) => {
      this.animateElement(element);
    });
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

    const animatedElements = document.querySelectorAll(
      '[data-anim]:not([data-instant]):not([data-instant="true"])'
    );

    animatedElements.forEach((element) => {
      const animation = element.getAttribute("data-anim");
      if (this.defaultAnimations[animation]) {
        this.observer.observe(element);
      } else {
        console.warn(
          `Invalid animation type "${animation}" on element:`,
          element
        );
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
      scale: animation === "scaleIn" ? 1 : animProps.scale || 1,
      duration: duration,
      delay: delay,
      ease: "power2.out",
      force3D: true,
    };

    // Set initial state
    gsap.set(element, {
      opacity: animProps.opacity,
      x: animProps.x || 0,
      y: animProps.y || 0,
      scale: animation === "scaleIn" ? 0.85 : 1,
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
    Webflow.push(function () {
      new ScrollAnimations();
    });
  }
});
