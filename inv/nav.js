// Scroll threshold in rems (40px = 2.5rem at 16px base font size)
const SCROLL_THRESHOLD = 2.5;
const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint in pixels

// Convert rems to pixels based on current font size
const remToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

// Add initial loading class to navbar
document.addEventListener(
  "DOMContentLoaded",
  () => {
    const navbar = document.querySelector(".global-header-wrap");
    if (navbar) {
      navbar.classList.add("nav-loading");
    }
  },
  { once: true }
);

// Initialize scroll handler and menu functionality
const initNavScroll = () => {
  const navbar = document.querySelector(".global-header-wrap"); // Updated selector to match HTML structure
  const navMenu = document.querySelector(".nav-menu");
  const navBtn = document.querySelector(".nav-btn");

  if (!navbar || !navMenu || !navBtn) return;

  // Remove loading class with a slight delay to ensure styles are applied
  requestAnimationFrame(() => {
    navbar.classList.remove("nav-loading");
  });

  // Track if is-scrolled existed before menu open
  let hadScrolledClass = false;

  // Handle menu toggle
  const closeMenu = () => {
    navMenu.classList.add("is-hidden");
    // Remove is-scrolled only if it didn't exist before opening
    if (!hadScrolledClass) {
      navbar.classList.remove("is-scrolled");
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const isOpening = navMenu.classList.contains("is-hidden");

    if (isOpening) {
      // Store current state before opening
      hadScrolledClass = navbar.classList.contains("is-scrolled");
      // Add is-scrolled when opening
      navbar.classList.add("is-scrolled");
    } else {
      // Remove is-scrolled only if it didn't exist before opening
      if (!hadScrolledClass) {
        navbar.classList.remove("is-scrolled");
      }
    }

    navMenu.classList.toggle("is-hidden");
  };

  // Click handlers
  navBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking on links inside nav menu
  navMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navBtn.contains(e.target)) {
      closeMenu();
    }
  });

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = remToPixels(SCROLL_THRESHOLD);
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const mobileThreshold = isMobile ? threshold * 0.75 : threshold;

    // Store current nav state
    const currentScrolled = navbar.classList.contains("is-scrolled");
    const menuHidden = navMenu.classList.contains("is-hidden");

    // Determine new state
    if (scrollPosition > mobileThreshold) {
      if (!currentScrolled) {
        navbar.classList.add("is-scrolled");
      }
    } else if (menuHidden) {
      navbar.classList.remove("is-scrolled");
    }
  };

  // Add scroll event listener with performance optimization
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial check
  handleScroll();
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initNavScroll);
