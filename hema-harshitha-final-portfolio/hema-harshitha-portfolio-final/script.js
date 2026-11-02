// One-page app-style navigation: show only the selected section.
const pages = [...document.querySelectorAll(".page")];
const pageButtons = [...document.querySelectorAll("[data-page]")];
const navButtons = [...document.querySelectorAll(".nav-btn")];

function openPage(name) {
  const target = document.getElementById(`page-${name}`);
  if (!target) return;
  pages.forEach((page) => page.classList.toggle("active", page === target));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === name));
  document.querySelector(".top-nav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", name === "home" ? location.pathname : `#${name}`);
}
pageButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.tagName === "A") event.preventDefault();
    openPage(button.dataset.page);
  });
});

// Restore a section if the visitor opens a direct hash URL.
const initialPage = location.hash.replace("#", "");
if (initialPage && document.getElementById(`page-${initialPage}`)) openPage(initialPage);

// Theme selector.
document.querySelectorAll("[data-theme]").forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.remove("theme-blue", "theme-violet");
    if (button.dataset.theme === "blue") document.body.classList.add("theme-blue");
    if (button.dataset.theme === "violet") document.body.classList.add("theme-violet");
    document.querySelectorAll("[data-theme]").forEach((dot) => dot.classList.toggle("active", dot === button));
    localStorage.setItem("hemaPortfolioTheme", button.dataset.theme);
  });
});
const savedTheme = localStorage.getItem("hemaPortfolioTheme");
if (savedTheme) {
  const savedButton = document.querySelector(`[data-theme="${savedTheme}"]`);
  if (savedButton) savedButton.click();
}

document.getElementById("mobileNavToggle").addEventListener("click", () => {
  document.querySelector(".top-nav").classList.toggle("open");
});
document.getElementById("year").textContent = new Date().getFullYear();
