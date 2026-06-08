/* ============================================
   SAHABAT LANSIA — Shared Application Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initActiveLink();
  initNotificationBadge();
  initAnimatedCounters();
  initSidebarToggle();
});

// ---- Navbar Toggle (Mobile) ----
function initNavbar() {
  const toggle = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("navbar__menu--open");
    const isOpen = menu.classList.contains("navbar__menu--open");
    toggle.textContent = isOpen ? "✕" : "☰";
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu on link click (mobile)
  menu.querySelectorAll(".navbar__link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("navbar__menu--open");
      toggle.textContent = "☰";
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove("navbar__menu--open");
      toggle.textContent = "☰";
    }
  });
}

// ---- Active Link Highlighting ----
function initActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("navbar__link--active");
    }
  });
  document.querySelectorAll(".sidebar__link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("sidebar__link--active");
    }
  });
}

// ---- Notification Badge ----
function initNotificationBadge() {
  const badges = document.querySelectorAll(".notification-badge");
  if (typeof getUnreadNotifications === "function") {
    const count = getUnreadNotifications().length;
    badges.forEach(badge => {
      badge.textContent = count;
      if (count === 0) badge.style.display = "none";
    });
  }
}

// ---- Animated Counters ----
function initAnimatedCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";
  const duration = 1500;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(eased * target);
    element.textContent = prefix + current.toLocaleString("id-ID") + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ---- Sidebar Toggle (Tablet/Mobile) ----
function initSidebarToggle() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  // Create toggle button for mobile
  const mainContent = document.querySelector(".main-content");
  if (mainContent && window.innerWidth <= 1024) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn--secondary btn--sm sidebar-toggle-btn";
    toggleBtn.innerHTML = "☰ Menu";
    toggleBtn.style.marginBottom = "var(--space-md)";
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar--open");
    });
    mainContent.insertBefore(toggleBtn, mainContent.firstChild);

    // Close sidebar on outside click
    document.addEventListener("click", (e) => {
      if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove("sidebar--open");
      }
    });
  }
}


// ---- Modal Helpers ----
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";

  // Close on overlay click
  const overlay = modal.querySelector(".modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", () => closeModal(modalId));
  }

  // Close on close button click
  const closeBtn = modal.querySelector(".modal__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(modalId));
  }

  // Close on Escape
  const escHandler = (e) => {
    if (e.key === "Escape") {
      closeModal(modalId);
      document.removeEventListener("keydown", escHandler);
    }
  };
  document.addEventListener("keydown", escHandler);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove("modal--open");
  document.body.style.overflow = "";
}


// ---- Toast Helpers ----
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  
  const icons = { success: "✓", error: "✕", warning: "⚠" };
  toast.innerHTML = `
    <span style="font-size:1.2rem">${icons[type] || "ℹ"}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}


// ---- Gauge Renderer ----
function renderGauge(containerId, score, size = 200) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const category = getRiskCategory(score);
  const colorMap = { high: "#C62828", medium: "#E67E22", low: "#2E7D32" };
  const labelMap = { high: "RISIKO TINGGI", medium: "RISIKO MENENGAH", low: "RISIKO RENDAH" };
  const color = colorMap[category];
  const label = labelMap[category];

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  container.innerHTML = `
    <div class="gauge" style="width:${size}px;height:${size}px">
      <svg class="gauge__svg" viewBox="0 0 200 200">
        <circle class="gauge__track" cx="100" cy="100" r="${radius}" />
        <circle class="gauge__fill gauge__fill--${category}" cx="100" cy="100" r="${radius}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
          style="stroke:${color}" />
      </svg>
      <div class="gauge__center">
        <div class="gauge__score" style="color:${color}">${score}</div>
        <div class="gauge__label">${label}</div>
      </div>
    </div>
  `;

  // Animate the fill
  requestAnimationFrame(() => {
    setTimeout(() => {
      const fill = container.querySelector(".gauge__fill");
      if (fill) fill.style.strokeDashoffset = offset;
    }, 100);
  });
}


// ---- Chart Theme Config ----
function getChartDefaults() {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          font: { family: "'Inter', sans-serif", size: 12 },
          color: "#6B5B4E",
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 8
        }
      },
      tooltip: {
        backgroundColor: "#2D1B0E",
        titleFont: { family: "'Inter', sans-serif", size: 13 },
        bodyFont: { family: "'Inter', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4
      }
    },
    scales: {
      x: {
        grid: { color: "rgba(212,163,115,0.15)", drawBorder: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#6B5B4E" }
      },
      y: {
        grid: { color: "rgba(212,163,115,0.15)", drawBorder: false },
        ticks: { font: { family: "'Inter', sans-serif", size: 11 }, color: "#6B5B4E" },
        beginAtZero: true
      }
    }
  };
}


// ---- Utility: Scroll To Section ----
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


// ---- Utility: Generate Sidebar HTML ----
function getSidebarHTML(activePage) {
  const links = [
    { href: "dashboard.html", icon: "📊", label: "Dashboard Utama" },
    { href: "scoring.html", icon: "🎯", label: "Scoring Risiko" },
    { href: "profile.html", icon: "👤", label: "Profil Lansia" },
    { href: "volunteer.html", icon: "🤝", label: "Manajemen Relawan" },
    { href: "register.html", icon: "📝", label: "Pendaftaran" },
    { href: "report.html", icon: "📋", label: "Laporan Kunjungan" },
    { href: "analytics.html", icon: "📈", label: "Analitik & Statistik" },
    { href: "notifications.html", icon: "🔔", label: "Notifikasi" }
  ];

  return `
    <div class="sidebar__header">
      <span>📊</span> Menu Dashboard
    </div>
    <div class="sidebar__section-label">Utama</div>
    <nav class="sidebar__nav">
      ${links.map(l => `
        <a href="${l.href}" class="sidebar__link ${l.href === activePage ? 'sidebar__link--active' : ''}">
          <span class="sidebar__link-icon">${l.icon}</span> ${l.label}
        </a>
      `).join('')}
    </nav>
  `;
}
