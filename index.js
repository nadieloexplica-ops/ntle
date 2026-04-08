const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const backToTop = document.querySelector(".back-to-top");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("is-visible");
  } else {
    backToTop.classList.remove("is-visible");
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const mensaje = document.getElementById("mensaje")?.value.trim();

    if (!nombre || !email || !mensaje) {
      formMessage.textContent = "Completa al menos nombre, email y mensaje.";
      return;
    }

    formMessage.textContent =
      "Formulario listo. Cuando conectes tu sistema de envío, este mensaje se podrá enviar.";
    contactForm.reset();
  });
}
