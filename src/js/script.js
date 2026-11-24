// =========================
// 1. Mobile Navigation
// =========================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

// Open and close mobile menu
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


// Close menu after clicking a navigation link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// =========================
// 2. Automatic Copyright Year
// =========================

const currentYear = document.getElementById("current-year");

currentYear.textContent = new Date().getFullYear();


// =========================
// 3. Dark / Light Theme Toggle
// =========================

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Load the saved theme (default is dark)
setTheme(localStorage.getItem("theme") || "dark");

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
}

themeToggle.addEventListener("click", function () {
    const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(newTheme);
});


// =========================
// 4. Project Modal
// =========================

const projects = {
    khilji: {
        category: "Personal / Family Business Project",
        title: "Khilji Brothers Engineering Co.",
        description: "A full-stack contractor company website with a dynamic project portfolio and an admin panel for managing content.",
        features: [
            "Dynamic project portfolio",
            "Project category filtering",
            "Admin panel",
            "Contact message management"
        ],
        tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Cloudinary"],
        link: "https://github.com/0xcodeghost/contractor-site-updated"
    },
    food: {
        category: "University Final Year Project",
        title: "Online Food Ordering System",
        description: "A food ordering web application built with Laravel, Vue.js and MySQL.",
        features: [
            "Restaurant management",
            "Restaurant onboarding"
        ],
        tech: ["Laravel", "Vue.js 3", "MySQL", "Tailwind CSS", "Bootstrap"],
        link: "https://github.com/0xcodeghost/online-food-ordering-systemm"
    }
};

const modal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");

function openModal(key) {
    const project = projects[key];

    document.getElementById("modal-category").textContent = project.category;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-description").textContent = project.description;
    document.getElementById("modal-link").href = project.link;

    const featuresList = document.getElementById("modal-features");
    featuresList.innerHTML = "";
    project.features.forEach(function (feature) {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    const techBox = document.getElementById("modal-tech");
    techBox.innerHTML = "";
    project.tech.forEach(function (item) {
        const span = document.createElement("span");
        span.textContent = item;
        techBox.appendChild(span);
    });

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Open: every "View Details" button
document.querySelectorAll(".project-details-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        openModal(btn.dataset.project);
    });
});

// Close: X button, click on dark area, or Escape key
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});