(function () {
  const slides = document.querySelectorAll(".ss3d-slide");
  const slidesTrack = document.getElementById("ss3dSlidesTrack");
  const indicatorsContainer = document.getElementById("ss3dIndicators");
  let currentIndex = 0;
  const slideInterval = 3500;
  let intervalId;

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("ss3d-indicator");
    if (index === 0) indicator.classList.add("ss3d-active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".ss3d-indicator");

  function updateSlides() {
    const slideWidth = 650;

    slides.forEach((slide, index) => {
      const offset = (index - currentIndex) * slideWidth;
      const distance = Math.abs(index - currentIndex);

      slide.style.transform = `translateX(${offset}px) scale(${
        distance === 0 ? 1 : 0.85
      }) translateZ(${distance === 0 ? 0 : -100}px)`;
      slide.style.opacity = distance > 1 ? "0.3" : distance === 1 ? "0.6" : "1";
      slide.style.zIndex = distance === 0 ? 10 : 5 - distance;

      if (distance === 0) {
        slide.classList.add("ss3d-active");
      } else {
        slide.classList.remove("ss3d-active");
      }
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("ss3d-active", index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlides();

    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, slideInterval);
  }

  updateSlides();
  intervalId = setInterval(nextSlide, slideInterval);
})();
