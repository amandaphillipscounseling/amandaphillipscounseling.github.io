// Mobile menu toggle
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu after a link is tapped
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

// Contact form submission (Formspree)
const contactForm = document.getElementById("contact-form");
const formStatus = contactForm ? contactForm.querySelector(".form-status") : null;

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        submitButton.disabled = true;
        formStatus.textContent = "Sending...";
        formStatus.className = "form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" },
            });

            if (response.ok) {
                formStatus.textContent = "Thanks for reaching out — I'll be in touch soon.";
                formStatus.className = "form-status success";
                contactForm.reset();
            } else {
                formStatus.textContent = "Something went wrong. Please email or call directly.";
                formStatus.className = "form-status error";
            }
        } catch (error) {
            formStatus.textContent = "Something went wrong. Please email or call directly.";
            formStatus.className = "form-status error";
        } finally {
            submitButton.disabled = false;
        }
    });
}

// Gentle scroll-reveal for sections
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}