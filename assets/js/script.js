document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileNavClose = document.querySelector(".mobile-nav__close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav__menu a");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      toggleMenu();
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener("click", () => {
      closeMenu();
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  const toggleMenu = () => {
    mobileNav.classList.toggle("is-open");
    mobileToggle.classList.toggle("is-active");
    document.body.classList.toggle("mobile-menu-open");

    const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", !isExpanded);
  };

  const closeMenu = () => {
    if (mobileNav.classList.contains("is-open")) {
      mobileNav.classList.remove("is-open");
      mobileToggle.classList.remove("is-active");
      document.body.classList.remove("mobile-menu-open");
      mobileToggle.setAttribute("aria-expanded", "false");
    }
  };

  // Progressive Image Loading
  initProgressiveImages();

  // Vanilla JavaScript Animations
  initScrollAnimations();
});

/**
 * Initialize progressive image loading
 */
function initProgressiveImages() {
  const progressiveImagePairs = document.querySelectorAll(
    "[data-progressive-image]"
  );

  if (!progressiveImagePairs.length) return;

  // Create intersection observer for lazy loading
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const imageId = entry.target.dataset.progressiveImage;
          loadHighQualityImage(imageId);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "50px 0px", // Start loading 50px before image comes into view
      threshold: 0.1,
    }
  );

  // Observe all progressive image pairs
  progressiveImagePairs.forEach((image) => {
    imageObserver.observe(image);
  });
}

/**
 * Load high quality image and handle transition
 */
function loadHighQualityImage(imageId) {
  const lowQualityImage = document.querySelector(
    `[data-progressive-image="${imageId}"].progressive-image-low`
  );
  const highQualityImage = document.querySelector(
    `[data-progressive-image="${imageId}"].progressive-image-high`
  );
  const container = lowQualityImage?.closest(".progressive-image-container");

  if (!highQualityImage || !lowQualityImage) return;

  // Add loading state to container if it exists
  if (container) {
    container.classList.add("is-loading");
  }

  // Create new image object to preload
  const img = new Image();

  img.onload = () => {
    // Remove loading state
    if (container) {
      container.classList.remove("is-loading");
    }

    // Show high quality image
    highQualityImage.classList.add("is-loaded");

    // Hide low quality image after transition
    setTimeout(() => {
      lowQualityImage.classList.add("is-hidden");
    }, 300); // Match transition duration
  };

  img.onerror = () => {
    // Handle error - keep low quality image visible
    if (container) {
      container.classList.remove("is-loading");
    }
    console.warn("Failed to load high quality image:", highQualityImage.src);
  };

  // Start loading the high quality image
  img.src = highQualityImage.src;
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initScrollAnimations() {
  // Responsive trigger points
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

  const getThreshold = () => {
    if (isMobile) return 0.05; // 5% visible
    if (isTablet) return 0.15; // 15% visible
    return 0.2; // 20% visible for desktop
  };

  // Hero animations (immediate)
  animateHero();

  // Scroll-triggered animations
  const animatedElements = [
    // Introduction
    {
      selector:
        ".introduction__image, .introduction__title, .introduction__text",
      stagger: 0.2,
    },

    // Help Section
    { selector: ".help-section__image", stagger: 0 },
    { selector: ".help-section__content > *", stagger: 0.2 },

    // How it works
    { selector: ".how-it-works-section__title", stagger: 0 },
    { selector: ".how-it-works-section p", stagger: 0.2 },
    { selector: ".how-it-works__step", stagger: 0.3 },

    // Easy Integration
    { selector: ".easy-integration__title", stagger: 0 },
    { selector: ".easy-integration__img", stagger: 0.4 },
    { selector: ".easy-integration__text-block", stagger: 0.2 },
    { selector: ".easy-integration__image-mobile", stagger: 0 },

    // Designed for Needs
    { selector: ".designed-for-needs__content > *", stagger: 0.2 },
    { selector: ".designed-for-needs__image", stagger: 0 },

    // Center Benefits
    { selector: ".center-benefits__image", stagger: 0 },
    { selector: ".center-benefits__content > *", stagger: 0.2 },

    // Pricing
    { selector: ".pricing-section__content > *", stagger: 0.2 },
    { selector: ".pricing-section__image", stagger: 0 },

    // Contact Interest
    { selector: ".contact-interest-section__content > *", stagger: 0.15 },
    { selector: ".contact-interest-section__visual-img", stagger: 0 },

    // Footer
    { selector: ".footer__content > *", stagger: 0.1 },
  ];

  animatedElements.forEach(({ selector, stagger }) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const delay = stagger * index;
            setTimeout(() => {
              entry.target.classList.add("animate-in");
            }, delay * 1000);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: getThreshold(),
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
  });

  // Scroll-to-top button
  initScrollToTop();

  // Dynamic UI color changes
  initDynamicColors();
}

/**
 * Animate hero section elements
 */
function animateHero() {
  const heroTitle = document.querySelector(".hero__title");
  const heroDescription = document.querySelector(".hero__description");
  const heroLaunchDate = document.querySelector(".hero__launch-date");

  if (heroTitle) {
    setTimeout(() => heroTitle.classList.add("animate-in"), 500);
  }
  if (heroDescription) {
    setTimeout(() => heroDescription.classList.add("animate-in"), 800);
  }
  if (heroLaunchDate) {
    setTimeout(() => heroLaunchDate.classList.add("animate-in"), 1100);
  }
}

/**
 * Initialize scroll-to-top button
 */
function initScrollToTop() {
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  if (!scrollToTopBtn) return;

  // Show button when scrolled down
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("is-visible");
    } else {
      scrollToTopBtn.classList.remove("is-visible");
    }
  });

  // Click handler
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/**
 * Initialize dynamic color changes for themed sections
 */
function initDynamicColors() {
  const mobileToggle = document.querySelector(".header__mobile-toggle");
  const scrollToTopBtn = document.querySelector(".scroll-to-top");
  const themedSections = document.querySelectorAll("[data-section-theme]");

  if (!mobileToggle && !scrollToTopBtn) return;

  themedSections.forEach((section) => {
    const theme = section.dataset.sectionTheme;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (theme === "dark") {
              mobileToggle?.classList.add("invert-colors");
              scrollToTopBtn?.classList.add("invert-colors");
            } else {
              mobileToggle?.classList.remove("invert-colors");
              scrollToTopBtn?.classList.remove("invert-colors");
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-80px 0px -80px 0px",
      }
    );

    observer.observe(section);
  });
}
