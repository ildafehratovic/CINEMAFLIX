// ─── SHA-256 via Web Crypto API ──────────────────────────────────────────────
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");

  // Passwords are stored as SHA-256 hashes
  // Original: user123 → e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446
  const USERS = [
    {
      email: "user@gmail.com",
      password:
        "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446",
      role: "user",
    },
    {
      email: "user2@gmail.com",
      password:
        "e606e38b0d8c19b24cf0ee3808183162ea7cd63ff7912dbb22b5e803286b4446",
      role: "user",
    },
  ];

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Show loading state on button
    const btn = form.querySelector(".btn-login");
    btn.textContent = "Verifying...";
    btn.disabled = true;

    // 🔒 Hash the entered password before comparing
    const hashedPassword = await sha256(password);

    const user = USERS.find(
      (u) => u.email === email && u.password === hashedPassword,
    );

    btn.textContent = "Login";
    btn.disabled = false;

    if (user) {
      window.location.href = "dashboard/home.html";
    } else {
      error.style.display = "block";
    }
  });

  // Hide error when user starts typing again
  document
    .getElementById("email")
    .addEventListener("input", () => (error.style.display = "none"));
  document
    .getElementById("password")
    .addEventListener("input", () => (error.style.display = "none"));
});
