/* ============================================
   SAHABAT LANSIA — Registration Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  populateDistricts();
  initRegisterForm();
});


// ---- Populate District Dropdown ----
function populateDistricts() {
  const select = document.getElementById("reg-district");
  if (!select) return;

  districtData
    .map(d => d.name)
    .sort((a, b) => a.localeCompare(b, "id"))
    .forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
}


// ---- Form Logic ----
function initRegisterForm() {
  const form = document.getElementById("register-form");
  const calcBtn = document.getElementById("calc-score-btn");
  if (!form) return;

  // Calculate score button
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const data = gatherRegData();
      if (!data) {
        showToast("Mohon lengkapi field skor risiko (usia, kesehatan, pendapatan, keluarga, jarak faskes).", "warning");
        return;
      }
      const score = calculateRiskScore(data);
      showRegResult(score, data);
      showToast("Skor risiko berhasil dihitung!", "success");
    });
  }

  // Submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate required fields
    if (!validateForm(form)) {
      showToast("Mohon lengkapi semua field yang wajib diisi.", "warning");
      return;
    }

    // Calculate score if not done yet
    const data = gatherRegData();
    if (data) {
      const score = calculateRiskScore(data);
      showRegResult(score, data);
    }

    // Show success
    showToast("✅ Lansia berhasil didaftarkan ke dalam sistem!", "success");

    // Scroll to result
    const resultSection = document.getElementById("register-result");
    if (resultSection) {
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}


// ---- Validate Form ----
function validateForm(form) {
  const required = form.querySelectorAll("[required]");
  let valid = true;

  required.forEach(field => {
    // Remove previous error
    field.classList.remove("form-input--error");
    const existingError = field.parentElement.querySelector(".form-error");
    if (existingError) existingError.remove();

    if (!field.value || field.value.trim() === "") {
      valid = false;
      field.classList.add("form-input--error");
      const error = document.createElement("span");
      error.className = "form-error";
      error.textContent = "Field ini wajib diisi";
      field.parentElement.appendChild(error);
    }
  });

  return valid;
}


// ---- Gather Registration Data for Scoring ----
function gatherRegData() {
  const age = parseInt(document.getElementById("reg-usia")?.value, 10);
  const healthCondition = document.getElementById("reg-health")?.value;
  const incomeCategory = document.getElementById("reg-income")?.value;
  const familySupport = document.getElementById("reg-family")?.value;
  const distance = parseFloat(document.getElementById("reg-distance")?.value);
  const transport = document.getElementById("reg-transport")?.checked;

  // All scoring fields must be filled
  if (!age || !healthCondition || !incomeCategory || !familySupport || isNaN(distance)) {
    return null;
  }

  return {
    age,
    healthCondition,
    incomeCategory,
    familySupport,
    accessibilityDistance: distance,
    transportAccess: !!transport
  };
}


// ---- Show Score Result ----
function showRegResult(score, data) {
  const resultSection = document.getElementById("register-result");
  if (!resultSection) return;

  resultSection.style.display = "";

  // Render gauge
  renderGauge("reg-gauge", score, 180);

  // Score text
  document.getElementById("reg-score-text").textContent = `Skor Risiko: ${score}/100`;

  // Risk badge
  const category = getRiskCategory(score);
  document.getElementById("reg-risk-badge").innerHTML = `
    <span class="risk-badge risk-badge--${category}">
      <span class="risk-badge__dot"></span>
      ${getRiskLabel(category)}
    </span>
  `;

  // Summary
  const name = document.getElementById("reg-nama")?.value || "Lansia";
  const district = document.getElementById("reg-district")?.value || "";
  const summaryEl = document.getElementById("reg-summary");

  let priorityText = "";
  if (category === "high") {
    priorityText = "Lansia ini memerlukan <strong>perhatian prioritas tinggi</strong>. Segera assign relawan dan jadwalkan kunjungan rutin minimal 2x seminggu.";
  } else if (category === "medium") {
    priorityText = "Lansia ini memerlukan <strong>monitoring berkala</strong>. Jadwalkan kunjungan rutin minimal 1x seminggu.";
  } else {
    priorityText = "Lansia ini dalam kondisi <strong>relatif baik</strong>. Tetap lakukan pemantauan bulanan dan libatkan dalam kegiatan sosial.";
  }

  summaryEl.innerHTML = `
    <p><strong>${name}</strong> dari <strong>${district}</strong> telah tercatat dalam sistem dengan skor risiko <strong>${score}/100</strong> (${getRiskLabel(category)}).</p>
    <p style="margin-top: var(--space-sm);">${priorityText}</p>
    <div style="margin-top: var(--space-md); display: flex; gap: var(--space-sm); flex-wrap: wrap;">
      <a href="scoring.html" class="btn btn--outline btn--sm">🎯 Lihat Detail Scoring</a>
      <a href="dashboard.html" class="btn btn--outline btn--sm">📊 Ke Dashboard</a>
    </div>
  `;
}
