// Scroll threshold in rems (120px = 7.5rem at 16px base font size)
const SCROLL_THRESHOLD = 7.5;
const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint in pixels

// Convert rems to pixels based on current font size
const remToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
};

// Initialize scroll handler
const initNavScroll = () => {
  const navbar = document.querySelector(".global-nav"); // Updated selector to match HTML structure
  if (!navbar) return;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const threshold = remToPixels(SCROLL_THRESHOLD);

    // Adjust threshold for mobile
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const mobileThreshold = isMobile ? threshold * 0.75 : threshold; // 25% lower threshold for mobile

    if (scrollPosition > mobileThreshold) {
      navbar.classList.add("is-scrolled");
    } else {
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
