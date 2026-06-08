/* ============================================
   SAHABAT LANSIA — Scoring Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initScoringStats();
  initScoringForm();
});

// ---- Populate Overview Stats ----
function initScoringStats() {
  const stats = getRiskStats();
  const avgScore = Math.round(
    elderlyData.reduce((sum, e) => sum + e.riskScore, 0) / elderlyData.length
  );

  const setCount = (id, val) => {
    const el = document.getElementById(id);
    if (el) { el.dataset.count = val; el.textContent = val; }
  };

  setCount("stat-high", stats.high);
  setCount("stat-medium", stats.medium);
  setCount("stat-low", stats.low);
  setCount("stat-avg", avgScore);
}


// ---- Scoring Form ----
function initScoringForm() {
  const form = document.getElementById("scoring-form");
  const resetBtn = document.getElementById("reset-btn");
  if (!form) return;

  // Real-time calculation on any input change
  form.addEventListener("change", () => {
    const data = gatherFormData();
    if (data) {
      const scores = calculateBreakdown(data);
      const total = Math.min(100, scores.age + scores.health + scores.income + scores.family + scores.access);
      showResult(total, scores);
    }
  });

  // Submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = gatherFormData();
    if (!data) {
      showToast("Mohon lengkapi semua field yang wajib diisi.", "warning");
      return;
    }
    const scores = calculateBreakdown(data);
    const total = Math.min(100, scores.age + scores.health + scores.income + scores.family + scores.access);
    showResult(total, scores);
    showToast("Skor risiko berhasil dihitung!", "success");

    // Scroll to result on mobile
    const resultPanel = document.getElementById("result-panel");
    if (resultPanel && window.innerWidth < 1024) {
      resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Reset
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      document.getElementById("score-result").style.display = "none";
      document.getElementById("empty-result").style.display = "";
    });
  }
}


// ---- Gather Form Data ----
function gatherFormData() {
  const ageRange = document.getElementById("age-range").value;
  const healthCondition = document.querySelector('input[name="healthCondition"]:checked');
  const incomeCategory = document.querySelector('input[name="incomeCategory"]:checked');
  const familySupport = document.querySelector('input[name="familySupport"]:checked');

  if (!ageRange || !healthCondition || !incomeCategory || !familySupport) return null;

  return {
    ageRange: ageRange,
    healthCondition: healthCondition.value,
    incomeCategory: incomeCategory.value,
    familySupport: familySupport.value,
    distanceFar: document.getElementById("distance-far").checked,
    noTransport: document.getElementById("no-transport").checked
  };
}


// ---- Calculate Breakdown (matching calculateRiskScore logic) ----
function calculateBreakdown(data) {
  let age = 0;
  switch (data.ageRange) {
    case "90+":   age = 25; break;
    case "85-89": age = 22; break;
    case "80-84": age = 18; break;
    case "75-79": age = 14; break;
    case "70-74": age = 10; break;
    case "65-69": age = 5;  break;
  }

  let health = 0;
  switch (data.healthCondition) {
    case "disability": health = 25; break;
    case "chronic":    health = 18; break;
    case "healthy":    health = 5;  break;
  }

  let income = 0;
  switch (data.incomeCategory) {
    case "none":    income = 20; break;
    case "low":     income = 12; break;
    case "pension": income = 4;  break;
  }

  let family = 0;
  switch (data.familySupport) {
    case "alone":     family = 20; break;
    case "caregiver": family = 10; break;
    case "family":    family = 3;  break;
  }

  let access = 2; // base
  if (!data.noTransport && !data.distanceFar) {
    access = 2;
  } else if (data.noTransport && data.distanceFar) {
    access = 10;
  } else if (data.noTransport) {
    access = 7;
  } else if (data.distanceFar) {
    access = 5;
  }

  return { age, health, income, family, access };
}


// ---- Show Result ----
function showResult(total, scores) {
  // Toggle visibility
  document.getElementById("empty-result").style.display = "none";
  document.getElementById("score-result").style.display = "";

  // Render gauge
  renderGauge("score-gauge", total, 220);

  // Score text
  document.getElementById("score-text").textContent = `Skor Risiko: ${total}/100`;

  // Risk badge
  const category = getRiskCategory(total);
  const badgeContainer = document.getElementById("risk-badge-container");
  badgeContainer.innerHTML = `
    <span class="risk-badge risk-badge--${category}">
      <span class="risk-badge__dot"></span>
      ${getRiskLabel(category)}
    </span>
  `;

  // Animate breakdown bars
  animateBar("fill-age", "val-age", scores.age, 25);
  animateBar("fill-health", "val-health", scores.health, 25);
  animateBar("fill-income", "val-income", scores.income, 20);
  animateBar("fill-family", "val-family", scores.family, 20);
  animateBar("fill-access", "val-access", scores.access, 10);

  // Show recommendation
  showRecommendation(total, category, scores);
}


// ---- Animate Score Bar ----
function animateBar(fillId, valId, score, max) {
  const fill = document.getElementById(fillId);
  const val = document.getElementById(valId);
  if (!fill || !val) return;

  const pct = Math.round((score / max) * 100);
  val.textContent = `${score}/${max}`;

  // Animate with delay
  setTimeout(() => {
    fill.style.transition = "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    fill.style.width = pct + "%";
  }, 150);
}


// ---- Show Recommendation ----
function showRecommendation(total, category, scores) {
  const container = document.getElementById("recommendation-text");
  if (!container) return;

  let html = "";

  if (category === "high") {
    html = `
      <p style="color: var(--risk-high); font-weight: 600; margin-bottom: var(--space-sm);">
        ⚠️ PERHATIAN: Lansia termasuk kategori RISIKO TINGGI
      </p>
      <ul style="margin: 0; padding-left: var(--space-lg); color: var(--text-secondary);">
        <li>🔴 <strong>Prioritas kunjungan tinggi</strong> — perlu dikunjungi minimal 2x seminggu</li>
        <li>🏥 Segera hubungkan dengan layanan kesehatan terdekat</li>
        <li>🤝 Assign relawan pendamping tetap</li>
        <li>📋 Lakukan assessment kebutuhan mendesak</li>
        ${scores.family >= 15 ? '<li>👨‍👩‍👧 Cari alternatif dukungan sosial — lansia minim dukungan keluarga</li>' : ''}
        ${scores.income >= 15 ? '<li>💰 Daftarkan ke program bantuan sosial pemerintah</li>' : ''}
        ${scores.access >= 7 ? '<li>🚌 Fasilitasi akses transportasi ke fasilitas kesehatan</li>' : ''}
      </ul>
    `;
  } else if (category === "medium") {
    html = `
      <p style="color: var(--risk-medium); font-weight: 600; margin-bottom: var(--space-sm);">
        ℹ️ Lansia termasuk kategori RISIKO MENENGAH
      </p>
      <ul style="margin: 0; padding-left: var(--space-lg); color: var(--text-secondary);">
        <li>🟠 <strong>Monitoring berkala</strong> — kunjungan minimal 1x seminggu</li>
        <li>📊 Pantau perkembangan kondisi secara rutin</li>
        <li>🏥 Pastikan kontrol kesehatan terjadwal</li>
        ${scores.health >= 15 ? '<li>💊 Pastikan kepatuhan minum obat terjaga</li>' : ''}
        ${scores.income >= 10 ? '<li>💰 Evaluasi kebutuhan bantuan ekonomi</li>' : ''}
      </ul>
    `;
  } else {
    html = `
      <p style="color: var(--risk-low); font-weight: 600; margin-bottom: var(--space-sm);">
        ✅ Lansia termasuk kategori RISIKO RENDAH
      </p>
      <ul style="margin: 0; padding-left: var(--space-lg); color: var(--text-secondary);">
        <li>🟢 <strong>Pemantauan rutin</strong> — kunjungan bulanan cukup</li>
        <li>🤝 Libatkan dalam kegiatan sosial dan posyandu lansia</li>
        <li>💪 Dorong kemandirian dan aktivitas fisik</li>
        <li>📞 Pastikan jalur komunikasi darurat tersedia</li>
      </ul>
    `;
  }

  container.innerHTML = html;
}
