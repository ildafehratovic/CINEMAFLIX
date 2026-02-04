document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      console.log("Form submitted:", { name, email, subject, message });

      document.getElementById("successMessage").classList.add("show");

      this.reset();
      setTimeout(() => {
        document.getElementById("successMessage").classList.remove("show");
      }, 5000);
    });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
