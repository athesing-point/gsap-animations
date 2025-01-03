document.addEventListener("DOMContentLoaded", () => {
  const heroAnimation = () => {
    const heroWrap = document.querySelector(".hero-illy-wrap");
    if (!heroWrap) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Animate the megaphone with its specific class
    tl.from(".refer-heroilly-mphone", {
      duration: 1,
      y: "1.875rem",
      opacity: 0,
      rotate: -15,
    });

    // Animate the smudge background
    tl.from(
      ".refer-heroilly-smudge",
      {
        duration: 0.8,
        scale: 0.9,
        opacity: 0,
      },
      "-=0.6"
    );

    // Animate the coins (without continuous bouncing)
    const coins = document.querySelector(".refer-heroilly-coins");
    if (coins) {
      tl.from(
        coins,
        {
          duration: 0.8,
          y: "1.25rem",
          opacity: 0,
        },
        "-=0.4"
      );
    }
  };

  const chatAnimation = () => {
    const chatWrapper = document.querySelector(".illy-wrapper.refer-steps");
    if (!chatWrapper) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Animate when in viewport
    const animateChat = () => {
      const rect = chatWrapper.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isInViewport) {
        tl.from(chatWrapper, {
          duration: 0.8,
          opacity: 0,
          scale: 0.98,
        })
          .from(
            ".refer-hiw_illy_left",
            {
              duration: 0.6,
              x: "-1.25rem",
              opacity: 0,
            },
            "-=0.4"
          )
          .from(
            ".refer-hiw_illy_right",
            {
              duration: 0.6,
              x: "1.25rem",
              opacity: 0,
            },
            "-=0.4"
          );

        // Remove scroll listener once animation has played
        window.removeEventListener("scroll", animateChat);
      }
    };

    // Check on scroll and initial load
    window.addEventListener("scroll", animateChat);
    animateChat(); // Check initial position

    // Hover effects
    [".refer-hiw_illy_left", ".refer-hiw_illy_right"].forEach((selector) => {
      const element = document.querySelector(selector);
      if (!element) return;

      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          duration: 0.3,
          y: "-0.1875rem",
          scale: 1.02,
          ease: "power1.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: "power1.out",
        });
      });
    });
  };

  // Initialize all animations
  heroAnimation();
  chatAnimation();
});
