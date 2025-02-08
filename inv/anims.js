// Pure JavaScript counter implementation
class PureCounter {
  constructor(element, options = {}) {
    this.element = element;
    this.duration = options.duration || 1500;
    this.startValue = 0;
    // Remove any commas before parsing
    const targetValue = element.getAttribute("data-target").replace(/,/g, "");
    this.endValue = parseFloat(targetValue) || 0;
    this.decimals = this.hasDecimals(this.endValue) ? 1 : 0;
    this.shouldFormat = this.endValue === 11000; // Flag for formatting
    this.frameRate = 1000 / 60; // 60fps
  }

  hasDecimals(num) {
    return num % 1 !== 0;
  }

  formatNumber(num) {
    // Format with commas if it's the 11000 counter
    if (this.shouldFormat) {
      return Math.round(num)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return num.toFixed(this.decimals);
  }

  start() {
    const range = this.endValue - this.startValue;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      // Easing function (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      const currentValue = this.startValue + range * easeProgress;
      this.element.textContent = this.formatNumber(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

// Initialize counters when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Function to start counter animation
  function startCounter(counter) {
    const pureCounter = new PureCounter(counter, {
      duration: 1500,
    });
    pureCounter.start();
  }

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Get all counter elements
  const counters = document.querySelectorAll(".stat-counter");

  // Initialize intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          // Unobserve after starting animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
    }
  );

  // Observe each counter
  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// Accordion Implementation
document.addEventListener("DOMContentLoaded", function () {
  console.log("Accordion script loaded.");

  let isAnimating = false; // Prevents multiple animations overlapping

  // Select all accordion toggles
  const accordionToggles = document.querySelectorAll(".product-faq-toggle");

  if (accordionToggles.length === 0) {
    console.warn("No accordion toggles found. Check your class names.");
    return;
  }

  accordionToggles.forEach((toggle, index) => {
    const accordionItem = toggle.closest(".product-faq-item");
    const content = accordionItem?.querySelector(".product-faq-content");
    const bgShadow = accordionItem?.querySelector(".prod-faq-bg_shadow");

    if (!content) {
      console.warn(`Accordion ${index} has no content element.`);
      return;
    }

    console.log(`Initializing accordion ${index}:`, toggle);

    // Ensure overflow is hidden to avoid height issues
    content.style.overflow = "hidden";

    // Set initial state using GSAP
    gsap.set(content, { height: 0, opacity: 0, display: "none" });
    if (bgShadow) gsap.set(bgShadow, { opacity: 0 });

    // Click event to toggle accordion
    toggle.addEventListener("click", function () {
      if (isAnimating) return; // Prevent multiple rapid clicks from breaking animations

      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !isExpanded);
      console.log(`Click detected on accordion ${index}, toggling state.`);
      handleAccordionAnimation(content, bgShadow, !isExpanded, index);
    });

    // MutationObserver to watch for aria-expanded changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-expanded"
        ) {
          const isExpanded = toggle.getAttribute("aria-expanded") === "true";
          console.log(
            `Accordion ${index} state changed: isExpanded = ${isExpanded}`
          );
          handleAccordionAnimation(content, bgShadow, isExpanded, index);
        }
      });
    });

    observer.observe(toggle, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });

    console.log(`Observer attached to accordion ${index}`);
  });

  function handleAccordionAnimation(content, bgShadow, isExpanded, index) {
    if (isAnimating) return;
    isAnimating = true;
    console.log(
      `Starting GSAP animation for accordion ${index}: isExpanded = ${isExpanded}`
    );

    // Kill any existing tweens on the content
    gsap.killTweensOf(content);

    if (isExpanded) {
      content.style.display = "block"; // Ensure it's visible before animation
      const height = content.scrollHeight; // Get natural height for animation

      gsap.to(content, {
        height: height,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          // Update ScrollTrigger on each frame
          if (ScrollTrigger) ScrollTrigger.update();
        },
        onComplete: () => {
          content.style.height = "auto"; // Prevent height collapse after animation
          isAnimating = false;
          // Final ScrollTrigger update
          if (ScrollTrigger) ScrollTrigger.update();
          console.log(`Animation complete: accordion ${index} opened.`);
        },
      });

      if (bgShadow) {
        gsap.to(bgShadow, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          // Update ScrollTrigger on each frame
          if (ScrollTrigger) ScrollTrigger.update();
        },
        onComplete: () => {
          content.style.display = "none"; // Hide after animation
          isAnimating = false;
          // Final ScrollTrigger update
          if (ScrollTrigger) ScrollTrigger.update();
          console.log(`Animation complete: accordion ${index} closed.`);
        },
      });

      if (bgShadow) {
        gsap.to(bgShadow, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      }
    }
  }
});
