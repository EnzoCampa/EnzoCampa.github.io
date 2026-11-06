
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Menu mobile
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Fermer le menu après sélection
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Apparition progressive au défilement
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".projects-placeholder, .simple-section")
    .forEach(section => observer.observe(section));

    // =========================================
// SCROLL SIDEBAR
// =========================================

const scrollLinks = document.querySelectorAll(".scroll-link");
const sections = document.querySelectorAll("main > section");

function updateActiveSection() {

    // Point de référence à 40% de la hauteur de l'écran
    const activationPoint = window.innerHeight * 0.4;

    let currentSection = sections[0];

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= activationPoint) {
            currentSection = section;
        }

    });

    // Mise à jour du bouton actif
    scrollLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.section === currentSection.id
        );

    });
}

// Détection du scroll
window.addEventListener("scroll", updateActiveSection, {
    passive: true
});

// Actualisation au redimensionnement
window.addEventListener("resize", updateActiveSection);

// Détection initiale
updateActiveSection();