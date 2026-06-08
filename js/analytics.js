/* ============================================
   SAHABAT LANSIA — Analytics Page Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initAnalyticsStats();
  initDistrictChart();
  initTrendChart();
  initIncomePieChart();
  initHealthFamilyChart();
  initDistrictTable();
});


/* ---- Color Palette ---- */
const analyticsPalette = {
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


/* ---- Summary Stat Cards ---- */
function initAnalyticsStats() {
  // Vulnerability Index = average risk score across all elderly
  const avgScore = Math.round(
    elderlyData.reduce((s, e) => s + e.riskScore, 0) / elderlyData.length
  );

  // Total visits this month (count visits in June 2026 from visitReports + simulated)
  const currentMonth = "2026-06";
  const visitsThisMonth = visitReports.filter(v => v.date.startsWith(currentMonth)).length;
  // Add simulated: elderly with lastVisit this month
  const elderlyVisitedThisMonth = elderlyData.filter(e =>
    e.lastVisit && e.lastVisit.startsWith(currentMonth)
  ).length;
  const totalVisits = Math.max(visitsThisMonth, elderlyVisitedThisMonth);

  // Active volunteers
  const activeVols = getActiveVolunteers().length;

  // Elderly never visited or visited > 30 days ago
  const unvisited = elderlyData.filter(e => {
    if (!e.lastVisit) return true;
    return daysSince(e.lastVisit) > 30;
  }).length;

  const setCounter = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("data-count", value);
    animateCounter(el);
  };

  setCounter("stat-vulnIdx", avgScore);
  setCounter("stat-visits", totalVisits);
  setCounter("stat-volunteers", activeVols);
  setCounter("stat-unvisited", unvisited);
}


/* ---- 1. District Vulnerability — Stacked Bar ---- */
function initDistrictChart() {
  const ctx = document.getElementById("districtChart");
  if (!ctx) return;

  // Sort districts by highRisk descending, take top 15 for readability
  const sorted = [...districtData]
    .sort((a, b) => b.highRisk - a.highRisk || b.elderlyCount - a.elderlyCount)
    .slice(0, 15);

  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(d => d.name),
      datasets: [
        {
          label: "Risiko Tinggi",
          data: sorted.map(d => d.highRisk),
          backgroundColor: analyticsPalette.riskHigh,
          borderRadius: 4,
          barPercentage: 0.6
        },
        {
          label: "Risiko Menengah",
          data: sorted.map(d => d.mediumRisk),
          backgroundColor: analyticsPalette.riskMed,
          borderRadius: 4,
          barPercentage: 0.6
        },
        {
          label: "Risiko Rendah",
          data: sorted.map(d => d.lowRisk),
          backgroundColor: analyticsPalette.riskLow,
          borderRadius: 4,
          barPercentage: 0.6
        }
      ]
    },
    options: {
      ...defaults,
      maintainAspectRatio: false,
      plugins: {
        ...defaults.plugins,
        legend: {
          ...defaults.plugins.legend,
          position: "top"
        }
      },
      scales: {
        ...defaults.scales,
        x: {
          ...defaults.scales.x,
          stacked: true,
          ticks: {
            ...defaults.scales.x.ticks,
            maxRotation: 45,
            minRotation: 30
          }
        },
        y: {
          ...defaults.scales.y,
          stacked: true,
          title: {
            display: true,
            text: "Jumlah Lansia",
            font: { family: "'Inter', sans-serif", size: 12 },
            color: "#6B5B4E"
          }
        }
      }
    }
  });
}


/* ---- 2. Monthly Registration Trend — Line ---- */
function initTrendChart() {
  const ctx = document.getElementById("trendChart");
  if (!ctx) return;

  // Build monthly registration counts from registeredDate
  const monthCounts = {};
  const monthLabels = [
    "2025-04", "2025-05", "2025-06", "2025-07", "2025-08", "2025-09",
    "2025-10", "2025-11", "2025-12", "2026-01", "2026-02", "2026-03",
    "2026-04", "2026-05", "2026-06"
  ];
  monthLabels.forEach(m => monthCounts[m] = 0);

  elderlyData.forEach(e => {
    const ym = e.registeredDate.slice(0, 7);
    if (monthCounts[ym] !== undefined) monthCounts[ym]++;
  });

  const displayLabels = monthLabels.map(m => {
    const [y, mo] = m.split("-");
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    return `${months[parseInt(mo) - 1]} '${y.slice(2)}`;
  });

  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "line",
    data: {
      labels: displayLabels,
      datasets: [{
        label: "Pendaftaran",
        data: Object.values(monthCounts),
        borderColor: analyticsPalette.maroon,
        backgroundColor: analyticsPalette.maroon + "20",
        fill: true,
        tension: 0.35,
        pointBackgroundColor: analyticsPalette.maroon,
        pointRadius: 4,
        pointHoverRadius: 7,
        borderWidth: 2.5
      }]
    },
    options: {
      ...defaults,
      plugins: {
        ...defaults.plugins,
        legend: { display: false }
      },
      scales: {
        ...defaults.scales,
        y: {
          ...defaults.scales.y,
          title: {
            display: true,
            text: "Jumlah Pendaftaran",
            font: { family: "'Inter', sans-serif", size: 12 },
            color: "#6B5B4E"
          }
        }
      }
    }
  });
}


/* ---- 3. Income Distribution — Pie ---- */
function initIncomePieChart() {
  const ctx = document.getElementById("incomePieChart");
  if (!ctx) return;

  const income = getIncomeDistribution();
  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(income),
      datasets: [{
        data: Object.values(income),
        backgroundColor: [
          analyticsPalette.gold,
          analyticsPalette.warmBrown,
          analyticsPalette.riskHigh
        ],
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 10
      }]
    },
    options: {
      ...defaults,
      scales: undefined,
      plugins: {
        ...defaults.plugins,
        legend: {
          ...defaults.plugins.legend,
          position: "bottom"
        }
      }
    }
  });
}


/* ---- 4. Health vs Family Support — Grouped Bar ---- */
function initHealthFamilyChart() {
  const ctx = document.getElementById("healthFamilyChart");
  if (!ctx) return;

  // Cross-tabulate health condition vs family support
  const healthLabels = ["Sehat", "Penyakit Kronis", "Disabilitas"];
  const healthKeys   = ["healthy", "chronic", "disability"];
  const supportLabels = {
    alone:     "Tinggal Sendiri",
    caregiver: "Dengan Pengasuh",
    family:    "Dengan Keluarga"
  };
  const supportKeys = ["alone", "caregiver", "family"];

  const datasets = supportKeys.map((sk, i) => {
    const colors = [analyticsPalette.riskHigh, analyticsPalette.riskMed, analyticsPalette.riskLow];
    return {
      label: supportLabels[sk],
      data: healthKeys.map(hk =>
        elderlyData.filter(e => e.healthCondition === hk && e.familySupport === sk).length
      ),
      backgroundColor: colors[i],
      borderRadius: 6,
      barPercentage: 0.7,
      categoryPercentage: 0.7
    };
  });

  const defaults = getChartDefaults();

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: healthLabels,
      datasets: datasets
    },
    options: {
      ...defaults,
      maintainAspectRatio: false,
      plugins: {
        ...defaults.plugins,
        legend: {
          ...defaults.plugins.legend,
          position: "top"
        }
      },
      scales: {
        ...defaults.scales,
        y: {
          ...defaults.scales.y,
          title: {
            display: true,
            text: "Jumlah Lansia",
            font: { family: "'Inter', sans-serif", size: 12 },
            color: "#6B5B4E"
          }
        }
      }
    }
  });
}


/* ---- 5. Top 10 District Table ---- */
function initDistrictTable() {
  const tbody = document.getElementById("districtTableBody");
  if (!tbody) return;

  // Compute average risk score per district
  const districtScores = districtData.map(d => {
    const elderlyInDistrict = elderlyData.filter(e => e.district === d.name);
    const avgScore = elderlyInDistrict.length > 0
      ? Math.round(elderlyInDistrict.reduce((s, e) => s + e.riskScore, 0) / elderlyInDistrict.length)
      : 0;
    return { ...d, avgScore };
  });

  // Sort by risk: highRisk desc, then avgScore desc
  const sorted = districtScores
    .sort((a, b) => b.highRisk - a.highRisk || b.avgScore - a.avgScore)
    .slice(0, 10);

  tbody.innerHTML = sorted.map((d, i) => {
    let statusBadge;
    if (d.highRisk > 0) {
      statusBadge = `<span class="risk-badge risk-badge--high"><span class="risk-badge__dot"></span> Kritis</span>`;
    } else if (d.mediumRisk > 0) {
      statusBadge = `<span class="risk-badge risk-badge--medium"><span class="risk-badge__dot"></span> Waspada</span>`;
    } else {
      statusBadge = `<span class="risk-badge risk-badge--low"><span class="risk-badge__dot"></span> Aman</span>`;
    }

    return `
      <tr>
        <td><strong>${i + 1}</strong></td>
        <td><strong>${d.name}</strong></td>
        <td>${d.elderlyCount}</td>
        <td style="color:#C62828;font-weight:600;">${d.highRisk}</td>
        <td style="color:#E67E22;font-weight:600;">${d.mediumRisk}</td>
        <td style="color:#2E7D32;font-weight:600;">${d.lowRisk}</td>
        <td>
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden;">
              <div style="height:100%;width:${d.avgScore}%;border-radius:4px;background:${
                d.avgScore >= 65 ? '#C62828' : d.avgScore >= 35 ? '#E67E22' : '#2E7D32'
              };"></div>
            </div>
            <span style="font-weight:600;font-size:0.85rem;">${d.avgScore}</span>
          </div>
        </td>
        <td>${statusBadge}</td>
      </tr>
    `;
  }).join("");
}
