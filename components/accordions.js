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

    // Set initial animation state
    content.style.overflow = "hidden";

    // Force first accordion to be open, otherwise use Finsweet's state
    const shouldBeExpanded = index === 0 || toggle.getAttribute("aria-expanded") === "true";

    // Set ARIA attributes for first accordion
    if (index === 0) {
      toggle.setAttribute("aria-expanded", "true");
      content.setAttribute("aria-hidden", "false");
    }

    gsap.set(content, {
      height: shouldBeExpanded ? "auto" : 0,
      opacity: shouldBeExpanded ? 1 : 0,
      display: "block", // Always keep display block
    });

    if (bgShadow) {
      gsap.set(bgShadow, {
        opacity: shouldBeExpanded ? 1 : 0,
      });
    }

    // Set up observer to watch for Finsweet's state changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "aria-expanded") {
          const isExpanded = toggle.getAttribute("aria-expanded") === "true";
          handleAccordionAnimation(content, bgShadow, isExpanded);
        }
      });
    });

    observer.observe(toggle, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });
  });

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
