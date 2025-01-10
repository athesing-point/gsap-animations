document.addEventListener("DOMContentLoaded", () => {
  // Initialize dropdown animation
  const initDenialDropdown = () => {
    const trigger = document.querySelector("#deny-refer-dropdown");
    const dropdown = document.querySelector(".hei-denial-explanation");
    if (!trigger || !dropdown) return;

    // ... existing code ...
    let hideTimeout;
    let isVisible = false;

    // Set initial state
    gsap.set(dropdown, {
      opacity: 0,
      display: "none",
      y: "0.5rem",
    });

    const showDropdown = () => {
      // Clear any existing timeout
      if (hideTimeout) clearTimeout(hideTimeout);

      if (!isVisible) {
        isVisible = true;
        dropdown.style.display = "block";
        gsap.to(dropdown, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const hideDropdown = () => {
      if (isVisible) {
        isVisible = false;
        gsap.to(dropdown, {
          opacity: 0,
          y: "0.5rem",
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            dropdown.style.display = "none";
          },
        });
      }
    };

    // Handle hover events
    trigger.addEventListener("mouseenter", showDropdown);
    trigger.addEventListener("mouseleave", () => {
      // Only hide if it wasn't shown by click
      if (!trigger.dataset.clicked) {
        hideDropdown();
      }
    });

    // Handle click events
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      if (isVisible && trigger.dataset.clicked) {
        // If visible and was clicked, hide it
        delete trigger.dataset.clicked;
        hideDropdown();
      } else {
        // Show and set clicked state
        trigger.dataset.clicked = "true";
        showDropdown();

        // Set timeout to hide after 7 seconds
        hideTimeout = setTimeout(() => {
          delete trigger.dataset.clicked;
          hideDropdown();
        }, 7000);
      }
    });
  };

  // Initialize all animations
  initDenialDropdown();
});
