document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const error = document.getElementById("loginError");

  const USERS = [
    { email: "user@gmail.com", password: "user123", role: "user" },
    { email: "user2@gmail.com", password: "user123", role: "user" },
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = USERS.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      window.location.href = "dashboard/home.html";
    } else {
      error.style.display = "block";
    }
  });
});

window.login = login;
