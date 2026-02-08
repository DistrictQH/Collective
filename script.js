const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const sections = document.querySelectorAll(".fade-in-section");
const navAnchors = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

sections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 140;

  navAnchors.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});