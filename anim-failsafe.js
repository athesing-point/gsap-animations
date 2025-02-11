// Check if GSAP is undefined and apply fallback if needed
(function () {
  // Wait for DOM to be ready
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    // Check if GSAP failed to load
    if (typeof gsap === "undefined") {
      console.warn("GSAP not loaded - applying animation fallbacks");

      // Get all elements with data-anim attribute
      const animatedElements = document.querySelectorAll("[data-anim]");

      // Reset styles for each animated element
      animatedElements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
        element.style.willChange = "auto";

        // Remove the data-anim attribute to prevent any other scripts from trying to animate
        element.removeAttribute("data-anim");
      });
    }
  });
})();
