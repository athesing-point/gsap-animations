/**
 * GSAP Fallback Animations
 * Provides graceful degradation when GSAP is not available
 */

// Helper function to check DOM ready state
function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

class AnimationsFallback {
  constructor() {
    this.init();
  }

  init() {
    ready(() => {
      console.warn("GSAP not loaded - applying animation fallbacks");
      this.applyFallbacks();
    });
  }

  applyFallbacks() {
    const animatedElements = document.querySelectorAll("[data-anim]");
    animatedElements.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.willChange = "auto";
      element.removeAttribute("data-anim");
    });
  }
}

// Make it globally available
window.AnimationsFallback = AnimationsFallback;
