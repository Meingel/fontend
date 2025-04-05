document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".menu-toggle");
  const menuItems = document.querySelector(".menu-items");

  toggleButton.addEventListener("click", () => {
    menuItems.classList.toggle("active");
  });
});

function togglePassword(icon) {
  const input = document.querySelector("#password");
  if (input.type === "password") {
    input.type = "text";
    icon.classList = "bi bi-eye";
  } else {
    input.type = "password";
    icon.classList = "bi bi-eye-slash";
  }
}
