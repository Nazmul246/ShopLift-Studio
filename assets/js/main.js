(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim(),
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        },
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false,
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(
      ".faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header",
    )
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

// sls-unique-section.js code
document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".sls-unique-step");

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(30px)";

        setTimeout(() => {
          entry.target.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  steps.forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(step);
  });
});

// Custom Cursor

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX - 4 + "px";
  cursorDot.style.top = mouseY - 4 + "px";
});

// Animate ring to follow with delay
function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  cursorRing.style.left = ringX - 20 + "px";
  cursorRing.style.top = ringY - 20 + "px";

  requestAnimationFrame(animateRing);
}
animateRing();

// Create soft wave effect on click
document.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  createSoftWave(x, y);

  // Animate cursor ring on click
  cursorRing.classList.add("active");
  setTimeout(() => cursorRing.classList.remove("active"), 300);
});

function createSoftWave(x, y) {
  for (let i = 0; i < 2; i++) {
    const wave = document.createElement("div");
    wave.className = "soft-wave";
    wave.style.left = x + "px";
    wave.style.top = y + "px";
    wave.style.animationDelay = i * 0.4 + "s";
    document.body.appendChild(wave);
    setTimeout(() => wave.remove(), 2200);
  }
}

// sls unique contact us section

(function () {
  "use strict";

  var form = document.getElementById("sls-contact-form");
  var btn = document.getElementById("sls-submit-btn");
  var msgOk = document.getElementById("sls-msg-success");
  var msgErr = document.getElementById("sls-msg-error");
  var selectEls = form.querySelectorAll("select");

  // ── hide both messages on page load ──
  msgOk.style.display = "none";
  msgErr.style.display = "none";

  // ── live: colour select text when a value is chosen ──
  selectEls.forEach(function (sel) {
    sel.addEventListener("change", function () {
      this.classList.toggle("sls-field__selected", this.value !== "");
    });
  });

  // ── live: clear error state on input ──
  var fieldIds = ["sls-name", "sls-email", "sls-service", "sls-message"];
  fieldIds.forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      var parent = this.closest(".sls-field");
      if (parent) parent.classList.remove("sls-field--invalid");
    });
  });

  // ── client-side validation ──
  function validate() {
    var valid = true;

    // name
    var name = document.getElementById("sls-name");
    if (!name.value.trim()) {
      markInvalid("sls-field-name");
      valid = false;
    }

    // email – basic pattern
    var email = document.getElementById("sls-email");
    var emailPat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPat.test(email.value.trim())) {
      markInvalid("sls-field-email");
      valid = false;
    }

    // service
    var service = document.getElementById("sls-service");
    if (!service.value) {
      markInvalid("sls-field-service");
      valid = false;
    }

    // message
    var msg = document.getElementById("sls-message");
    if (!msg.value.trim()) {
      markInvalid("sls-field-message");
      valid = false;
    }

    return valid;
  }

  function markInvalid(fieldId) {
    var el = document.getElementById(fieldId);
    if (el) el.classList.add("sls-field--invalid");
  }

  // ── submit handler ──
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // honeypot check
    if (form.querySelector('[name="_honey"]').value) return;

    if (!validate()) return;

    // hide previous messages
    msgOk.style.display = "none";
    msgErr.style.display = "none";

    // loading state
    btn.classList.add("sls-btn--loading");

    // collect data
    var data = new FormData(form);

    // ── fetch POST to Formspree ──
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        btn.classList.remove("sls-btn--loading");

        if (res.ok) {
          // success
          msgOk.style.display = "flex";
          form.reset();
          // re-reset select colours
          selectEls.forEach(function (s) {
            s.classList.remove("sls-field__selected");
          });
        } else {
          // formspree validation error
          return res.json().then(function (o) {
            throw new Error(o.error || "Unknown");
          });
        }
      })
      .catch(function () {
        btn.classList.remove("sls-btn--loading");
        msgErr.style.display = "flex";
      });
  });
})();
