document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedUser")) || {};
  document.getElementById("user-name").textContent = user.name || "Unknown";
  document.getElementById("user-email").textContent = user.email || "Unknown";

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "../login.html";
  });
});
