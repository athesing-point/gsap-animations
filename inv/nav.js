(function () {
  // Scroll threshold in rems (40px = 2.5rem at 16px base font size)
  const SCROLL_THRESHOLD = 2.5;
  const MOBILE_BREAKPOINT = 768; // Standard mobile breakpoint in pixels
  let isInitialized = false;

  // Convert rems to pixels based on current font size
  const remToPixels = (rem) => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  // Initialize scroll handler and menu functionality
  const initNavScroll = () => {
    if (isInitialized) return;
    isInitialized = true;

    const navbar = document.querySelector(".global-nav");
    const navMenu = document.querySelector(".nav-menu");
    const navBtn = document.querySelector(".nav-btn");

    // console.log("Nav elements found:", {
    //   navbar: !!navbar,
    //   navMenu: !!navMenu,
    //   navBtn: !!navBtn,
    // });

    if (!navbar || !navMenu || !navBtn) {
      // console.log("Missing required nav elements");
      return;
    }

    // Track if is-scrolled existed before menu open
    let hadScrolledClass = false;

    // Handle menu toggle
    const closeMenu = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      // console.log("Closing menu, isMobile:", isMobile);
      navMenu.classList.add("is-hidden");
      navBtn.setAttribute("aria-expanded", "false");
      navMenu.setAttribute("aria-hidden", "true");
      navBtn.classList.remove("nav-btn--active");
    };

    const toggleMenu = (e) => {
      e.stopPropagation();
      const menuIsHidden = navMenu.classList.contains("is-hidden");
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      // console.log("Toggle menu:", {
      //   menuIsHidden,
      //   isMobile,
      //   currentClasses: navMenu.classList.toString(),
      //   windowWidth: window.innerWidth,
      // });

      if (menuIsHidden) {
        // Opening the menu
        navMenu.classList.remove("is-hidden");
        navBtn.setAttribute("aria-expanded", "true");
        navMenu.setAttribute("aria-hidden", "false");
        navBtn.classList.add("nav-btn--active");
      } else {
        // Closing the menu
        navMenu.classList.add("is-hidden");
        navBtn.setAttribute("aria-expanded", "false");
        navMenu.setAttribute("aria-hidden", "true");
        navBtn.classList.remove("nav-btn--active");
      }

      // Trigger scroll handler to update is-scrolled state
      handleScroll();

      // console.log("Menu state after toggle:", {
      //   menuIsHidden: navMenu.classList.contains("is-hidden"),
      //   classes: navMenu.classList.toString(),
      // });
    };

    // Click handlers
    navBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu(e);
    });

    // Close menu when clicking on links inside nav menu
    navMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) {
        e.stopPropagation();

        // Check if it's an anchor link
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(href);

          if (targetElement) {
            closeMenu();
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        } else {
          closeMenu();
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      // Only close if menu is actually open
      if (
        !navMenu.classList.contains("is-hidden") &&
        !navMenu.contains(e.target) &&
        !navBtn.contains(e.target)
      ) {
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
      const menuOpen = !navMenu.classList.contains("is-hidden");

      // Determine new state
      if (scrollPosition > mobileThreshold || menuOpen) {
        if (!currentScrolled) {
          navbar.classList.add("is-scrolled");
        }
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

    // Run scroll check immediately on load
    handleScroll();
    // Sometimes the initial scroll position isn't accurate immediately, so check again after a brief delay
    requestAnimationFrame(() => {
      handleScroll();
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavScroll);
  } else {
    initNavScroll();
  }
})();
