const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

// Mobile navigation
menuToggle ? .addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle ? .setAttribute("aria-expanded", "false");
    });
});

// Dark / light theme, with preference saved in this browser
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light-theme");

function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");
    themeIcon.textContent = isLight ? "☾" : "☼";
    themeToggle ? .setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeToggle ? .setAttribute("title", isLight ? "Switch to dark theme" : "Switch to light theme");
}
updateThemeButton();

themeToggle ? .addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
    updateThemeButton();
});

// Highlight the navigation link for the section currently in view
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navItems.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
}

// Prefill email subject with the service selected by the visitor
document.querySelectorAll("[data-service]").forEach((link) => {
            link.addEventListener("click", () => {
                        const service = link.dataset.service;
                        const emailCta = document.querySelector("#email-cta");
                        if (emailCta && service) {
                            emailCta.href = `mailto:jlgardiola18@gmail.com?subject=${encodeURIComponent(`Inquiry: ${service}`)}`;
    }
  });
});

// Current year in footer
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();