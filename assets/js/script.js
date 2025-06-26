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
