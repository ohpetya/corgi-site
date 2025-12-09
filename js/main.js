document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav ul");

    if (burger) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("menu-open");
        });
    }
});