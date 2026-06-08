/* ============================================
   SAHABAT LANSIA — Dashboard Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initDashboardStats();
  initRiskChart();
  initAgeChart();
  initIncomeChart();
  initHealthChart();
  initMap();
  initActivityFeed();
});


/* ---- Stat Cards ---- */
function initDashboardStats() {
  const stats = getRiskStats();

  const setCounter = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("data-count", value);
    animateCounter(el);
  };

  setCounter("stat-total", stats.total);
  setCounter("stat-high", stats.high);
  setCounter("stat-medium", stats.medium);
  setCounter("stat-low", stats.low);
}


/* ---- Color Palette ---- */
const palette = {
  maroon:    "#6A0D0D",
  maroonDk:  "#8B1E1E",
  gold:      "#D4A373",
  warmBrown: "#8B5E3C",
  cream:     "#F8F2EA",
  beige:     "#EADBC8",
  riskHigh:  "#C62828",
  riskMed:   "#E67E22",
  riskLow:   "#2E7D32"
};


/* ---- 1. Risk Distribution — Doughnut ---- */
function initRiskChart() {
  const ctx = document.getElementById("riskChart");
  if (!ctx) return;

  const stats = getRiskStats();
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Risiko Tinggi", "Risiko Menengah", "Risiko Rendah"],
      datasets: [{
        data: [stats.high, stats.medium, stats.low],
        backgroundColor: [palette.riskHigh, palette.riskMed, palette.riskLow],
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      ...defaults,
      cutout: "62%",
      scales: undefined,           // doughnuts don't need axes
      plugins: {
        ...defaults.plugins,
        legend: {
          ...defaults.plugins.legend,
          position: "bottom"
        },
        tooltip: defaults.plugins.tooltip
      }
    }
  });
}


/* ---- 2. Age Demographics — Bar ---- */
function initAgeChart() {
  const ctx = document.getElementById("ageChart");
  if (!ctx) return;

  const demo = getAgeDemographics();
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(demo),
      datasets: [{
        label: "Jumlah Lansia",
        data: Object.values(demo),
        backgroundColor: [
          palette.cream, palette.beige, palette.gold,
          palette.warmBrown, palette.maroon, palette.maroonDk
        ],
        borderColor: palette.maroon,
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.65
      }]
    },
    options: {
      ...defaults,
      plugins: {
        ...defaults.plugins,
        legend: { display: false }
      }
    }
  });
}


/* ---- 3. Income Distribution — Horizontal Bar ---- */
function initIncomeChart() {
  const ctx = document.getElementById("incomeChart");
  if (!ctx) return;

  const income = getIncomeDistribution();
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(income),
      datasets: [{
        label: "Jumlah",
        data: Object.values(income),
        backgroundColor: [palette.gold, palette.warmBrown, palette.riskHigh],
        borderRadius: 6,
        barPercentage: 0.55
      }]
    },
    options: {
      ...defaults,
      indexAxis: "y",
      plugins: {
        ...defaults.plugins,
        legend: { display: false }
      }
    }
  });
}


/* ---- 4. Health Conditions — Bar ---- */
function initHealthChart() {
  const ctx = document.getElementById("healthChart");
  if (!ctx) return;

  const health = getHealthDistribution();
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(health),
      datasets: [{
        label: "Jumlah Lansia",
        data: Object.values(health),
        backgroundColor: [palette.riskLow, palette.riskMed, palette.riskHigh],
        borderRadius: 6,
        barPercentage: 0.55
      }]
    },
    options: {
      ...defaults,
      plugins: {
        ...defaults.plugins,
        legend: { display: false }
      }
    }
  });
}


/* ---- 5. Leaflet Map ---- */
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map").setView([-7.28, 112.75], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  districtData.forEach(d => {
    // Dominant risk determines color
    let color = palette.riskLow;
    let label = "Rendah";
    if (d.highRisk > 0) {
      color = palette.riskHigh;
      label = "Tinggi";
    } else if (d.mediumRisk > 0) {
      color = palette.riskMed;
      label = "Menengah";
    }

    const radius = 400 + d.elderlyCount * 200;

    L.circle([d.lat, d.lng], {
      radius: radius,
      color: color,
      fillColor: color,
      fillOpacity: 0.35,
      weight: 2
    })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Inter',sans-serif;min-width:180px">
        <strong style="font-size:14px;">${d.name}</strong><br>
        <span style="color:${color};font-weight:600;">● Risiko ${label}</span><br>
        <hr style="border:none;border-top:1px solid #eee;margin:6px 0">
        👥 Total Lansia: <strong>${d.elderlyCount}</strong><br>
        🔴 Tinggi: ${d.highRisk} &nbsp;
        🟠 Menengah: ${d.mediumRisk} &nbsp;
        🟢 Rendah: ${d.lowRisk}
      </div>
    `);
  });
}


/* ---- 6. Recent Activity Feed ---- */
function initActivityFeed() {
  const feed = document.getElementById("activityFeed");
  if (!feed) return;

  const activities = [
    {
      icon: "🚨",
      color: palette.riskHigh,
      title: "Peringatan Risiko Kritis",
      desc: "Bapak Ngadimin (skor 100) belum dikunjungi selama 59 hari",
      time: "2 jam lalu",
      badge: "danger"
    },
    {
      icon: "🔔",
      color: palette.riskHigh,
      title: "Kondisi Kritis Terdeteksi",
      desc: "Ibu Romlah (skor 99) — kasus paling kritis, 49 hari sejak kunjungan terakhir",
      time: "3 jam lalu",
      badge: "danger"
    },
    {
      icon: "📋",
      color: palette.riskMed,
      title: "Laporan Kunjungan Baru",
      desc: "Dewi Lestari melaporkan kunjungan ke Bapak Sutarno — kondisi stabil & membaik",
      time: "2 hari lalu",
      badge: "success"
    },
    {
      icon: "📝",
      color: palette.gold,
      title: "Pendaftaran Lansia Baru",
      desc: "Bapak Hartono (68 tahun) dari Dukuh Pakis berhasil didaftarkan — skor risiko 10",
      time: "1 hari lalu",
      badge: "primary"
    },
    {
      icon: "🤝",
      color: palette.riskLow,
      title: "Relawan Baru Bergabung",
      desc: "Anisa Rahma bergabung sebagai relawan di wilayah Mulyorejo",
      time: "3 hari lalu",
      badge: "success"
    },
    {
      icon: "⚠️",
      color: palette.riskMed,
      title: "Verifikasi Data Diperlukan",
      desc: "Data 3 lansia baru menunggu verifikasi oleh admin kelurahan",
      time: "4 hari lalu",
      badge: "warning"
    }
  ];

  feed.innerHTML = activities.map(a => `
    <div class="activity-item">
      <div class="activity-item__icon" style="background:${a.color}15;color:${a.color};font-size:1.5rem;
        width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${a.icon}
      </div>
      <div class="activity-item__content" style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <strong style="font-size:0.95rem;">${a.title}</strong>
          <span class="badge badge--${a.badge}" style="font-size:0.7rem;">${a.badge === 'danger' ? 'Kritis' : a.badge === 'warning' ? 'Perhatian' : a.badge === 'success' ? 'Selesai' : 'Info'}</span>
        </div>
        <p style="margin:4px 0 0;color:#6B5B4E;font-size:0.88rem;line-height:1.5;">${a.desc}</p>
      </div>
      <div class="activity-item__time" style="color:#9E8E7E;font-size:0.8rem;white-space:nowrap;flex-shrink:0;">
        ${a.time}
      </div>
    </div>
  `).join("");
}
