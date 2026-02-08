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
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.2 }
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

const cursor = document.querySelector(".custom-cursor");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursor.style.opacity = "1";
});

window.addEventListener("mouseout", () => {
  cursor.style.opacity = "0";
});

function animateCursor() {
  const speed = 0.16;
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

const artistCards = document.querySelectorAll(".artist-card");

artistCards.forEach((card) => {
  const button = card.querySelector(".artist-toggle");
  const embedWrap = card.querySelector(".embed-wrap");

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    artistCards.forEach((otherCard) => {
      const otherButton = otherCard.querySelector(".artist-toggle");
      const otherWrap = otherCard.querySelector(".embed-wrap");
      otherButton.setAttribute("aria-expanded", "false");
      otherWrap.classList.remove("open");
      otherWrap.hidden = true;
    });

    if (!isOpen) {
      if (!embedWrap.querySelector("iframe")) {
        const iframe = document.createElement("iframe");
        iframe.src = card.dataset.track;
        iframe.allow = "autoplay";
        iframe.loading = "lazy";
        iframe.title = `${card.querySelector("h3").textContent} SoundCloud Player`;
        embedWrap.appendChild(iframe);
      }

      button.setAttribute("aria-expanded", "true");
      embedWrap.hidden = false;
      requestAnimationFrame(() => embedWrap.classList.add("open"));
    }
  });
});
