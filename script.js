document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".menu-items");

    toggleButton.addEventListener("click", () => {
        menuItems.classList.toggle("active");
    });
});
