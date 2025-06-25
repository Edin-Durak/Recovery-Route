document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- UI Elements ---
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  // --- Scroll-to-Top Button Logic ---
  if (scrollToTopBtn) {
    // Visibility
    gsap.to(scrollToTopBtn, {
      scrollTrigger: {
        trigger: "body",
        start: "20% top",
        toggleActions: "play none none reverse",
        onEnter: () => scrollToTopBtn.classList.add("is-visible"),
        onLeaveBack: () => scrollToTopBtn.classList.remove("is-visible"),
      },
      opacity: 1,
      visibility: "visible",
      y: 0,
    });

    // Click action
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- Dynamic UI Color Change on Scroll ---
  const themedSections = document.querySelectorAll("[data-section-theme]");

  // For hamburger menu (top of screen)
  if (mobileToggle) {
    themedSections.forEach((section) => {
      const theme = section.dataset.sectionTheme;
      ScrollTrigger.create({
        trigger: section,
        start: "top 80px",
        end: "bottom 80px",
        onToggle: (self) => {
          if (self.isActive) {
            if (theme === "dark") {
              mobileToggle.classList.add("invert-colors");
            } else {
              mobileToggle.classList.remove("invert-colors");
            }
          }
        },
      });
    });
  }

  // For scroll-to-top button (bottom of screen)
  if (scrollToTopBtn) {
    themedSections.forEach((section) => {
      const theme = section.dataset.sectionTheme;
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom-=80px",
        end: "bottom bottom-=80px",
        onToggle: (self) => {
          if (self.isActive) {
            if (theme === "dark") {
              scrollToTopBtn.classList.add("invert-colors");
            } else {
              scrollToTopBtn.classList.remove("invert-colors");
            }
          }
        },
      });
    });
  }

  // Hero Section Animation
  gsap.from(".hero__title", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5,
  });

  gsap.from(".hero__description", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 0.8,
  });

  gsap.from(".hero__launch-date", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 1.1,
  });

  // Introduction Section Animation
  const introElements = document.querySelectorAll(
    ".introduction__image, .introduction__title, .introduction__text"
  );

  introElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });

  // Help Section Animation
  gsap.from(".help-section__image", {
    scrollTrigger: {
      trigger: ".help-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  gsap.from(".help-section__content > *", {
    scrollTrigger: {
      trigger: ".help-section__content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Designed for Needs Section Animation
  gsap.from(".designed-for-needs__content > *", {
    scrollTrigger: {
      trigger: ".designed-for-needs__content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".designed-for-needs__image", {
    scrollTrigger: {
      trigger: ".designed-for-needs",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  // Center Benefits Section Animation
  gsap.from(".center-benefits__image", {
    scrollTrigger: {
      trigger: ".center-benefits",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  gsap.from(".center-benefits__content > *", {
    scrollTrigger: {
      trigger: ".center-benefits__content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Pricing Section Animation
  gsap.from(".pricing-section__content > *", {
    scrollTrigger: {
      trigger: ".pricing-section__content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".pricing-section__image", {
    scrollTrigger: {
      trigger: ".pricing-section",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
  });

  // Contact Interest Section Animation
  gsap.to(".contact-interest-section__content > *", {
    scrollTrigger: {
      trigger: ".contact-interest-section__content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
  });
  gsap.to(".contact-interest-section__visual-img", {
    scrollTrigger: {
      trigger: ".contact-interest-section__visual-img",
      start: "top 85%",
      toggleActions: "play none none none",
    },
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
  });
});
