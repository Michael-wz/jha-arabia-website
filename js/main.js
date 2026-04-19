document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const currentYearNodes = document.querySelectorAll(".current-year");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const revealNodes = document.querySelectorAll("[data-reveal]");
  const mailtoForms = document.querySelectorAll("form[data-mailto-form='true']");

  currentYearNodes.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (!linkPath) {
      return;
    }

    const normalized = linkPath.split("/").pop() || "index.html";
    if (normalized === currentPath) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  if (navToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("nav-open", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("is-open")) {
        return;
      }

      const target = event.target;
      if (
        target instanceof Node &&
        !navMenu.contains(target) &&
        !navToggle.contains(target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter") || "all";

        filterButtons.forEach((item) => {
          item.setAttribute("aria-pressed", String(item === button));
        });

        projectCards.forEach((card) => {
          const categories = (card.getAttribute("data-category") || "")
            .split(" ")
            .filter(Boolean);
          const isVisible =
            filter === "all" || categories.includes(filter);
          card.hidden = !isVisible;
        });
      });
    });
  }

  if (mailtoForms.length) {
    mailtoForms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!(form instanceof HTMLFormElement)) {
          return;
        }

        if (!form.reportValidity()) {
          return;
        }

        const recipient = form.getAttribute("data-recipient") || "info@jha-arabia.com";
        const statusNode = form.querySelector(".form-status");
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const company = String(formData.get("company") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const message = String(formData.get("message") || "").trim();
        const attachments = formData
          .getAll("attachments")
          .filter((item) => item instanceof File && item.name);

        const subjectParts = ["JHA Arabia Inquiry"];
        if (service) {
          subjectParts.push(service);
        }
        if (company) {
          subjectParts.push(company);
        } else if (name) {
          subjectParts.push(name);
        }

        const bodyLines = [
          "Hello JHA Arabia,",
          "",
          "I would like to discuss the following inquiry:",
          "",
          `Full name: ${name || "-"}`,
          `Company: ${company || "-"}`,
          `Email: ${email || "-"}`,
          `Phone: ${phone || "-"}`,
          `Inquiry type: ${service || "-"}`,
          "",
          "Project details:",
          message || "-",
        ];

        if (attachments.length) {
          bodyLines.push(
            "",
            "Attachment files (please attach these manually in your email app):"
          );
          attachments.forEach((file) => {
            bodyLines.push(`- ${file.name}`);
          });
        }

        const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(
          subjectParts.join(" | ")
        )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

        if (statusNode) {
          statusNode.textContent =
            "Your email app should open with a prepared draft. If files were selected, please attach them manually before sending.";
          statusNode.classList.add("is-success");
        }

        window.location.href = mailtoUrl;
      });
    });
  }

  if (revealNodes.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  }
});
