(function () {
  const header = document.getElementById("site-header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const yearNodes = document.querySelectorAll("#year");
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const animatedNodes = document.querySelectorAll(".reveal");

  function handleHeaderState() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function closeMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.contains("is-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      const clickedInsideNav = event.target.closest(".nav");
      if (!clickedInsideNav && navLinks.classList.contains("is-open")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  function revealOnScroll() {
    if (!animatedNodes.length) return;
    const viewportBottom = window.innerHeight * 0.9;
    animatedNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < viewportBottom) {
        node.classList.add("is-visible");
      }
    });
  }

  function setYear() {
    const year = String(new Date().getFullYear());
    yearNodes.forEach((node) => {
      node.textContent = year;
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidPhone(value) {
    return /^[0-9+\s()/-]{7,}$/.test(value);
  }

  if (form && formMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      formMessage.textContent = "";
      formMessage.className = "form-message";

      if (!name || !email || !phone || !subject || !message) {
        formMessage.textContent = "Please complete all required fields.";
        formMessage.classList.add("error");
        return;
      }

      if (!isValidEmail(email)) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.classList.add("error");
        return;
      }

      if (!isValidPhone(phone)) {
        formMessage.textContent = "Please enter a valid phone number.";
        formMessage.classList.add("error");
        return;
      }

      const mailtoSubject = encodeURIComponent("Website enquiry: " + subject);
      const mailtoBody = encodeURIComponent(
        "Full name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n\n" +
        "Message:\n" + message
      );

      formMessage.textContent = "Your email app is opening with your enquiry pre-filled.";
      formMessage.classList.add("success");

      window.location.href =
        "mailto:wayne@wdlc.co.za?subject=" + mailtoSubject + "&body=" + mailtoBody;
    });
  }

  handleHeaderState();
  revealOnScroll();
  setYear();

  window.addEventListener("scroll", handleHeaderState, { passive: true });
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("resize", revealOnScroll);
})();
