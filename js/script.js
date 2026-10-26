// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  // Close the mobile menu after a navigation link is selected.
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// Keep the copyright year current.
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// The form prepares an email draft. It does not send data to a server.
const estimateForm = document.querySelector("#estimate-form");
const formStatus = document.querySelector("#form-status");

if (estimateForm) {
  estimateForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!estimateForm.reportValidity()) return;

    const formData = new FormData(estimateForm);
    const name = formData.get("name");
    const phone = formData.get("phone") || "Not provided";
    const email = formData.get("email");
    const service = formData.get("service") || "Not sure yet";
    const message = formData.get("message");

    const subject = encodeURIComponent(`Free estimate request from ${name}`);
    const body = encodeURIComponent(
      `Hello Juan's Landscaping,\n\nI'd like to request a free estimate.\n\n` +
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n` +
      `Project details:\n${message}\n\nThank you!`
    );

    if (formStatus) {
      formStatus.textContent = "Opening your email app with the request filled in. Please review it and press Send to contact Juan.";
    }

    window.location.href = `mailto:jandres788@gmail.com?subject=${subject}&body=${body}`;
  });
}
