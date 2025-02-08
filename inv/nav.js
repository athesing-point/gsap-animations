// Scroll threshold in rems (40px = 2.5rem at 16px base font size)
const SCROLL_THRESHOLD = 2.5;
const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint in pixels

// Convert rems to pixels based on current font size
const remToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

// Initialize scroll handler and menu functionality
const initNavScroll = () => {
  const navbar = document.querySelector(".global-nav"); // Updated selector to match HTML structure
  const navMenu = document.querySelector(".nav-menu");
  const navBtn = document.querySelector(".nav-btn");

  if (!navbar || !navMenu || !navBtn) return;

  // Track if is-scrolled existed before menu open
  let hadScrolledClass = false;

  // Track scroll position
  let lastScrollPosition = window.scrollY;

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
    // Store actual scroll position
    lastScrollPosition = window.scrollY;
    const threshold = remToPixels(SCROLL_THRESHOLD);

    // Adjust threshold for mobile
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const mobileThreshold = isMobile ? threshold * 0.75 : threshold; // 25% lower threshold for mobile

    // Simple scroll check - if we're above threshold, show background
    if (lastScrollPosition > mobileThreshold) {
      navbar.classList.add("is-scrolled");
    } else {
      // Only remove if menu is not open (is-hidden means menu is closed)
      if (navMenu.classList.contains("is-hidden")) {
        navbar.classList.remove("is-scrolled");
      }
    }
  };

  // Add scroll event listener with throttle
  let lastRun = 0;
  const throttleMs = 10;

  window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastRun >= throttleMs) {
      handleScroll();
      lastRun = now;
    }
  });

  // Handle resize with debounce
  let resizeTimeout;
  window.addEventListener("resize", () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        handleScroll();
        resizeTimeout = null;
      }, 10);
    }
  });

  // Initial check
  handleScroll();
};

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initNavScroll);
