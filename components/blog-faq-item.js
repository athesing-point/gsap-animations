// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Track animation state
  let isAnimating = false;

  // Select all accordion toggles
  const accordionToggles = document.querySelectorAll(".accordion-trigger");

  // Initialize all accordions
  accordionToggles.forEach((toggle, index) => {
    const accordionItem = toggle.closest(".accordion-item");
    const content = accordionItem.querySelector(".accordion-content");
    const icon = accordionItem.querySelector(".accordion-icon");
    const question = accordionItem.querySelector(".faq_q");

    if (!content) return;

    // Set initial animation state
    content.style.overflow = "hidden";
    let isExpanded = false;

    // Set initial states with GSAP
    gsap.set(content, {
      height: 0,
      opacity: 0,
    });

    if (icon) {
      gsap.set(icon, {
        rotationZ: -90,
      });
    }

    // Add hover handlers for the question text
    toggle.addEventListener("mouseenter", () => {
      if (question) {
        gsap.to(question, {
          color: "#01679a",
          duration: 0.2,
          ease: "none",
        });
      }
    });

    toggle.addEventListener("mouseleave", () => {
      if (question && !isExpanded) {
        gsap.to(question, {
          color: "#000000",
          duration: 0.2,
          ease: "none",
        });
      }
    });

    // Handle click events directly
    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      if (isAnimating) return;

      isExpanded = !isExpanded;
      handleAccordionAnimation(content, icon, question, isExpanded);
    });
  });

  function handleAccordionAnimation(content, icon, question, isExpanded) {
    if (isAnimating) return;

    isAnimating = true;

    // Create a timeline for smooth animation coordination
    const tl = gsap.timeline({
      onComplete: () => {
        if (isExpanded) {
          content.style.height = "auto";
        }
        isAnimating = false;
      },
    });

    if (isExpanded) {
      // Opening animations
      content.style.display = "block"; // Ensure content is visible for height calculation
      const height = content.scrollHeight;

      tl.to(content, {
        height: height,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      if (icon) {
        tl.to(
          icon,
          {
            rotationZ: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        );
      }

      if (question) {
        tl.to(
          question,
          {
            color: "#01679a",
            duration: 0.2,
            ease: "none",
          },
          "<"
        );
      }
    } else {
      // Closing animations
      tl.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          content.style.display = "none";
        },
      });

      if (icon) {
        tl.to(
          icon,
          {
            rotationZ: -90,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "<"
        );
      }

      if (question) {
        tl.to(
          question,
          {
            color: "#000000",
            duration: 0.2,
            ease: "none",
          },
          "<"
        );
      }
    }
  }
});
