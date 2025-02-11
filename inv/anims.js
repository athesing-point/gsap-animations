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
  let isAnimating = false;

  // Wait for GSAP to be ready
  const initAccordions = () => {
    // Select all accordion toggles
    const accordionToggles = document.querySelectorAll(".product-faq-toggle");
    const accordionContents = document.querySelectorAll(".product-faq-content");

    // Check if GSAP is available
    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded - showing all accordions");
      // Show all accordions when GSAP is not available
      accordionContents.forEach((content) => {
        content.style.display = "block";
        content.style.height = "auto";
        content.style.opacity = "1";
        content.style.overflow = "visible";
        const toggle = content
          .closest(".product-faq-item")
          ?.querySelector(".product-faq-toggle");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "true");
        }
        content.setAttribute("aria-hidden", "false");
      });
      return;
    }

    // First hide all contents immediately
    accordionContents.forEach((content) => {
      content.style.display = "none";
      content.style.height = "0";
      content.style.opacity = "0";
    });

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

      // Set initial state
      toggle.setAttribute("aria-expanded", "false");
      content.style.overflow = "hidden";
      content.setAttribute("aria-hidden", "true");

      // Set initial state using GSAP
      gsap.set(content, {
        height: 0,
        opacity: 0,
        display: "none",
      });

      if (bgShadow) {
        gsap.set(bgShadow, { opacity: 0 });
      }

      // Click event to toggle accordion
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (isAnimating) return;

        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !isExpanded);
        content.setAttribute("aria-hidden", isExpanded);

        handleAccordionAnimation(content, bgShadow, !isExpanded);
      });
    });
  };

  function handleAccordionAnimation(content, bgShadow, isExpanded) {
    if (isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
      },
    });

    if (isExpanded) {
      // Show content first
      gsap.set(content, { display: "block", height: "auto" });
      const height = content.offsetHeight;
      gsap.set(content, { height: 0 });

      tl.to(content, {
        height: height,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          content.style.height = "auto";
        },
      });

      if (bgShadow) {
        tl.to(
          bgShadow,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    } else {
      // Set initial height before animating
      gsap.set(content, { height: content.offsetHeight });

      tl.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(content, { display: "none" });
        },
      });

      if (bgShadow) {
        tl.to(
          bgShadow,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }
    }
  }

  // Initialize accordions after a brief delay to ensure GSAP is loaded
  setTimeout(initAccordions, 0);
});
