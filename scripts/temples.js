const menu = document.querySelector("#menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
nav.classList.toggle("open");
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;