// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Track animation state
  let isAnimating = false;

  // Select all accordion toggles
  const accordionToggles = document.querySelectorAll(".product-faq-toggle");

  // Initialize all accordions
  accordionToggles.forEach((toggle, index) => {
    const accordionItem = toggle.closest(".product-faq-item");
    const content = accordionItem.querySelector(".product-faq-content");
    const bgShadow = accordionItem.querySelector(".prod-faq-bg_shadow");

    if (!content) return;

    // Set initial animation state based on Finsweet's state
    content.style.overflow = "hidden";
    const isInitiallyExpanded = toggle.getAttribute("aria-expanded") === "true";

    gsap.set(content, {
      height: isInitiallyExpanded ? "auto" : 0,
      opacity: isInitiallyExpanded ? 1 : 0,
      display: "block", // Always keep display block
    });

    if (bgShadow) {
      gsap.set(bgShadow, {
        opacity: isInitiallyExpanded ? 1 : 0,
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

  function handleAccordionAnimation(content, bgShadow, isExpanded) {
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
