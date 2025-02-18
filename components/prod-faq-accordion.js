// Initialize product FAQ accordion
(function () {
  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    // Check if GSAP is available
    const isGsapAvailable = typeof gsap !== "undefined";

    // Track animation state
    let isAnimating = false;

    // Select all accordion toggles
    const accordionToggles = document.querySelectorAll(".product-faq-toggle");

    // If GSAP isn't available after 2 seconds, force open all accordions and disable clicks
    setTimeout(() => {
      if (!isGsapAvailable) {
        accordionToggles.forEach((toggle) => {
          const accordionItem = toggle.closest(".product-faq-item");
          const content = accordionItem.querySelector(".product-faq-content");
          if (content) {
            // Force open state
            content.style.height = "auto";
            content.style.opacity = "1";
            content.style.display = "block";
            toggle.setAttribute("aria-expanded", "true");

            // Disable click events
            toggle.style.pointerEvents = "none";
          }
        });
        return; // Exit early if GSAP isn't available
      }
    }, 2000);

    // Only proceed with GSAP animations if GSAP is available
    if (!isGsapAvailable) return;

    // Initialize all accordions
    accordionToggles.forEach((toggle, index) => {
      const accordionItem = toggle.closest(".product-faq-item");
      const content = accordionItem.querySelector(".product-faq-content");
      const bgShadow = accordionItem.querySelector(".prod-faq-bg_shadow");

      if (!content) return;

      // Set initial animation state based on Finsweet's state
      content.style.overflow = "hidden";
      const isInitiallyExpanded =
        toggle.getAttribute("aria-expanded") === "true";

      // Let CSS handle initial state, only set display
      gsap.set(content, {
        display: "block", // Always keep display block
      });

      if (bgShadow && isInitiallyExpanded) {
        gsap.set(bgShadow, {
          opacity: 1,
        });
      }

      // Set up observer to watch for Finsweet's state changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "aria-expanded"
          ) {
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            handleAccordionAnimation(content, bgShadow, isExpanded, index);
          }
        });
      });

      observer.observe(toggle, {
        attributes: true,
        attributeFilter: ["aria-expanded"],
      });
    });

    // Wait for Finsweet to initialize, then open first accordion
    setTimeout(() => {
      if (accordionToggles.length > 0) {
        const firstToggle = accordionToggles[0];
        // Trigger a click on the first toggle to open it
        firstToggle.click();
      }
    }, 500); // Give Finsweet time to initialize

    function handleAccordionAnimation(content, bgShadow, isExpanded, index) {
      if (isAnimating) return;

      isAnimating = true;

      if (isExpanded) {
        // Get natural height before animating
        const height = content.scrollHeight;

        // Animate to open state
        gsap.fromTo(
          content,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: height,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              content.style.height = "auto";
              isAnimating = false;
            },
          }
        );

        if (bgShadow) {
          gsap.to(bgShadow, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      } else {
        // Animate to closed state
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            isAnimating = false;
          },
        });

        if (bgShadow) {
          gsap.to(bgShadow, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    }
  });
})();
