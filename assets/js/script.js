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
});
