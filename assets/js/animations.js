document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

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

  gsap.from(".hero__background", {
    duration: 1.5,
    scale: 1.1,
    ease: "power3.out",
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
});
