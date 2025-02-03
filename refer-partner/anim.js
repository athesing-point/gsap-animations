document.addEventListener("DOMContentLoaded", () => {
  // Initialize dropdown animation
  const initDenialDropdown = () => {
    const trigger = document.querySelector("#reason-dropdown");
    const dropdown = document.querySelector(".hei-denial-explanation");
    if (!trigger || !dropdown) return;

    let isVisible = false;

    // Set initial state
    gsap.set(dropdown, {
      opacity: 0,
      display: "none",
      y: "-0.5rem",
      scale: 0.95,
      transformOrigin: "top",
    });

    const showDropdown = () => {
      if (!isVisible) {
        isVisible = true;
        dropdown.style.display = "block";
        gsap.to(dropdown, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.2,
          ease: "back.out(2)",
        });
      }
    };

    const hideDropdown = () => {
      if (isVisible) {
        isVisible = false;
        gsap.to(dropdown, {
          opacity: 0,
          y: "-0.5rem",
          scale: 0.95,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            dropdown.style.display = "none";
          },
        });
      }
    };

    // Handle click events
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isVisible) {
        hideDropdown();
      } else {
        showDropdown();
      }
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isVisible &&
        !dropdown.contains(e.target) &&
        !trigger.contains(e.target)
      ) {
        hideDropdown();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isVisible) {
        hideDropdown();
      }
    });
  };

  // Initialize all animations
  initDenialDropdown();
});
