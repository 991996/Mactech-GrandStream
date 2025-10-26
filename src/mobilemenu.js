const navOpenButton = document.getElementById("nav-open-button");
const navCloseButton = document.getElementById("nav-close-button");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("overlay");
const header = document.querySelector("header");
const logo = document.getElementById("logo");

//  Mobile menu
navOpenButton.addEventListener("click", function () {
  mobileMenu.classList.remove("-left-[60%]");
  mobileMenu.classList.add("left-0");
  overlay.classList.remove("hidden");
});

navCloseButton.addEventListener("click", function () {
  mobileMenu.classList.remove("left-0");
  mobileMenu.classList.add("-left-[60%]");
  overlay.classList.add("hidden");
});

// Scroll nav

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.remove("absolute");
    header.classList.add("fixed");
    header.classList.add("bg-white");
    header.classList.add("shadow-xl");
    logo.classList.remove("w-[120px]");
    logo.classList.add("w-[80px]");
  } else {
    header.classList.add("absolute");
    header.classList.remove("fixed");
    header.classList.remove("bg-white");
    header.classList.remove("shadow-xl");
    logo.classList.remove("w-[80px]");
    logo.classList.add("w-[120px]");
  }
});
