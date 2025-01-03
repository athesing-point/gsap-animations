document.addEventListener("DOMContentLoaded", () => {
  const partnerAnimation = () => {
    const wrapper = document.querySelector(".partners-hiw-illy");
    if (!wrapper) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      paused: true,
    });

    // First animate the boxes (house)
    tl.from(".partners-illy-boxes", {
      duration: 0.8,
      y: "1.25rem",
      opacity: 0,
    });

    // Set initial position behind boxes
    gsap.set(".partners-illy-slide", {
      y: "-7.75rem",
      zIndex: -1,
    });

    // Initial slide up animation
    tl.from(
      ".partners-illy-slide",
      {
        duration: 1.4,
        y: "9.375rem",
        opacity: 0,
        scale: 0.98,
        transformOrigin: "center center",
        ease: "power2.out",
        onComplete: () => {
          // Start the continuous bounce after initial animation
          gsap.to(".partners-illy-slide", {
            y: "-8.25rem",
            duration: 1.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      },
      "-=0.3"
    );

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    // Start observing the wrapper
    observer.observe(wrapper);
  };

  // Initialize animation
  partnerAnimation();
});
