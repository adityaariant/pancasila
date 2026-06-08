/* ============================================
   SAHABAT LANSIA — Report Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  populateElderlyDropdown();
  initReportStats();
  initElderlyInfoCard();
  initPhotoUpload();
  initReportForm();
  renderReportsTimeline();
  setDefaultDate();
});


// ---- Set Default Date to Today ----
function setDefaultDate() {
  const dateInput = document.getElementById("rpt-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }
}


// ---- Populate Elderly Dropdown ----
function populateElderlyDropdown() {
  const select = document.getElementById("rpt-elderly");
  if (!select) return;

  // Sort by risk score descending (highest risk first)
  const sorted = [...elderlyData].sort((a, b) => b.riskScore - a.riskScore);

  sorted.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.id;
    opt.textContent = `${getRiskEmoji(e.riskCategory)} ${e.name} — Skor: ${e.riskScore} (${e.district})`;
    select.appendChild(opt);
  });
}


// ---- Report Stats ----
function initReportStats() {
  const critical = visitReports.filter(r => r.overallRating === "critical").length;
  const concerning = visitReports.filter(r => r.overallRating === "concerning").length;
  const stable = visitReports.filter(r => r.overallRating === "stable").length;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) { el.dataset.count = val; el.textContent = val; }
  };

  set("stat-critical", critical);
  set("stat-concerning", concerning);
  set("stat-stable", stable);
}


// ---- Show Elderly Info When Selected ----
function initElderlyInfoCard() {
  const select = document.getElementById("rpt-elderly");
  const infoCard = document.getElementById("elderly-info-card");
  if (!select || !infoCard) return;

  select.addEventListener("change", () => {
    const id = parseInt(select.value, 10);
    if (!id) {
      infoCard.style.display = "none";
      return;
    }

    const elderly = getElderlyById(id);
    if (!elderly) return;

    infoCard.style.display = "";
    document.getElementById("info-avatar").textContent = elderly.photo;
    document.getElementById("info-name").textContent = elderly.name;
    document.getElementById("info-meta").textContent =
      `${elderly.age} tahun • ${elderly.district} • ${elderly.health}`;
    document.getElementById("info-badge").innerHTML = `
      <span class="risk-badge risk-badge--${elderly.riskCategory}">
        <span class="risk-badge__dot"></span>
        ${getRiskLabel(elderly.riskCategory)} (${elderly.riskScore})
      </span>
    `;

    // Update border color based on risk
    const colors = { high: "var(--risk-high)", medium: "var(--risk-medium)", low: "var(--risk-low)" };
    infoCard.style.borderLeftColor = colors[elderly.riskCategory] || "var(--primary)";
  });
}


// ---- Photo Upload ----
function initPhotoUpload() {
  const uploadArea = document.getElementById("photo-upload-area");
  const fileInput = document.getElementById("photo-input");
  const preview = document.getElementById("photo-preview");
  if (!uploadArea || !fileInput || !preview) return;

  // Click to open file picker
  uploadArea.addEventListener("click", () => fileInput.click());

  // Drag & drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--primary)";
    uploadArea.style.background = "rgba(106, 13, 13, 0.05)";
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.style.borderColor = "";
    uploadArea.style.background = "";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "";
    uploadArea.style.background = "";
    handleFiles(e.dataTransfer.files);
  });

  // File input change
  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const thumb = document.createElement("div");
        thumb.style.cssText = `
          position: relative; width: 80px; height: 80px; border-radius: var(--radius-sm);
          overflow: hidden; border: 2px solid var(--beige);
        `;
        thumb.innerHTML = `
          <img src="${e.target.result}" alt="Foto" style="width:100%;height:100%;object-fit:cover;">
          <button type="button" style="
            position: absolute; top: 2px; right: 2px; background: var(--risk-high); color: white;
            border: none; border-radius: 50%; width: 20px; height: 20px; font-size: 10px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
          " onclick="this.parentElement.remove()">✕</button>
        `;
        preview.appendChild(thumb);
      };
      reader.readAsDataURL(file);
    });
  }
}


// ---- Report Form Submission ----
function initReportForm() {
  const form = document.getElementById("report-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    const elderlyId = document.getElementById("rpt-elderly").value;
    const date = document.getElementById("rpt-date").value;
    const rating = document.getElementById("rpt-rating").value;

    if (!elderlyId || !date || !rating) {
      showToast("Mohon lengkapi semua field yang wajib diisi.", "warning");
      return;
    }

    // Success
    const elderly = getElderlyById(parseInt(elderlyId, 10));
    const name = elderly ? elderly.name : "Lansia";

    showToast(`✅ Laporan kunjungan untuk ${name} berhasil dikirim!`, "success");

    // Reset form
    form.reset();
    document.getElementById("elderly-info-card").style.display = "none";
    document.getElementById("photo-preview").innerHTML = "";
    setDefaultDate();
  });
}


// ---- Render Reports Timeline ----
function renderReportsTimeline() {
  const container = document.getElementById("reports-timeline");
  if (!container) return;

  // Sort by date descending
  const sorted = [...visitReports].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📋</div>
        <h3 class="empty-state__title">Belum Ada Laporan</h3>
        <p class="empty-state__text">Laporan kunjungan akan muncul di sini setelah relawan mengirimkan laporan.</p>
      </div>
    `;
    return;
  }

  const ratingConfig = {
    critical: { label: "Kritis", badge: "danger", emoji: "🔴" },
    concerning: { label: "Perlu Perhatian", badge: "warning", emoji: "🟠" },
    stable: { label: "Stabil", badge: "success", emoji: "🟢" }
  };

  container.innerHTML = sorted.map(report => {
    const elderly = getElderlyById(report.elderlyId);
    const volunteer = getVolunteerById(report.volunteerId);
    const rating = ratingConfig[report.overallRating] || ratingConfig.stable;
    const elderlyName = elderly ? elderly.name : "Tidak diketahui";
    const volunteerName = volunteer ? volunteer.name : "Tidak diketahui";
    const dateFormatted = formatDate(report.date);
    const daysAgo = daysSince(report.date);

    return `
      <div class="timeline__item">
        <div class="timeline__dot" style="background: var(--${
          report.overallRating === "critical" ? "risk-high" :
          report.overallRating === "concerning" ? "risk-medium" : "risk-low"
        });"></div>
        <div class="timeline__content">
          <div class="timeline__date">${dateFormatted} · ${daysAgo} hari lalu</div>
          <div class="timeline__title" style="display: flex; align-items: center; gap: var(--space-sm); flex-wrap: wrap;">
            <span>${elderly ? elderly.photo : '👤'} ${elderlyName}</span>
            <span class="badge badge--${rating.badge}">${rating.emoji} ${rating.label}</span>
          </div>
          <div style="margin-top: var(--space-sm); color: var(--text-secondary); font-size: 0.9rem; line-height: 1.7;">
            <p><strong>🏥 Kesehatan:</strong> ${report.healthUpdate}</p>
            <p style="margin-top: var(--space-xs);"><strong>🏠 Rumah:</strong> ${report.houseCondition}</p>
            <p style="margin-top: var(--space-xs);"><strong>💛 Emosional:</strong> ${report.emotionalWellbeing}</p>
            <p style="margin-top: var(--space-xs);"><strong>🆘 Bantuan:</strong> ${report.assistanceNeeded}</p>
          </div>
          <div style="margin-top: var(--space-sm); display: flex; align-items: center; gap: var(--space-md); font-size: 0.85rem; color: var(--text-muted);">
            <span>🤝 Relawan: ${volunteerName}</span>
            ${report.photoCount ? `<span>📷 ${report.photoCount} foto</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");
}
