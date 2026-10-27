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

// Juan's Landscaping - Formspree estimate request form
const estimateForm = document.querySelector("#estimate-form");
const formStatus = document.querySelector("#form-status");

if (estimateForm) {
  const submitButton = estimateForm.querySelector('button[type="submit"]');

  estimateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!estimateForm.reportValidity()) return;

    // Prevent duplicate submissions
    submitButton.disabled = true;

    if (formStatus) {
      formStatus.textContent = "Sending your estimate request...";
    }

    try {
      const formData = new FormData(estimateForm);

      const response = await fetch(estimateForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        if (formStatus) {
          formStatus.textContent =
            "Thank you! Your estimate request has been sent successfully. Juan will follow up with you.";
        }

        // Clear the fields after successful submission
        estimateForm.reset();

      } else {
        if (formStatus) {
          formStatus.textContent =
            "Sorry, we couldn't send your request. Please try again or contact Juan directly.";
        }
      }

    } catch (error) {
      console.error("Form submission error:", error);

      if (formStatus) {
        formStatus.textContent =
          "A connection error occurred. Please try again or contact Juan directly.";
      }

    } finally {
      // Allow another attempt after submission
      submitButton.disabled = false;
    }
  });
}
