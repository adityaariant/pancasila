/* ============================================
   SAHABAT LANSIA — Volunteer Page Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  renderVolunteerStats();
  renderVolunteerCards('all');
  renderPriorityElderly();
  renderScheduleItems();
});


// ---- Render Stats ----
function renderVolunteerStats() {
  const totalEl = document.getElementById('stat-total');
  const activeEl = document.getElementById('stat-active');
  const visitsEl = document.getElementById('stat-visits');

  const total = volunteerData.length;
  const active = getActiveVolunteers().length;
  const totalVisits = volunteerData.reduce((sum, v) => sum + v.completedVisits, 0);

  if (totalEl) { totalEl.dataset.count = total; totalEl.textContent = total; }
  if (activeEl) { activeEl.dataset.count = active; activeEl.textContent = active; }
  if (visitsEl) { visitsEl.dataset.count = totalVisits; visitsEl.textContent = totalVisits; }
}


// ---- Render Volunteer Cards ----
function renderVolunteerCards(filter) {
  const grid = document.getElementById('volunteer-grid');
  if (!grid) return;

  let volunteers = volunteerData;
  if (filter === 'active') {
    volunteers = volunteerData.filter(v => v.status === 'active');
  } else if (filter === 'inactive') {
    volunteers = volunteerData.filter(v => v.status === 'inactive');
  }

  if (volunteers.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1; text-align:center; padding:var(--space-2xl);">
        <div class="empty-state__icon" style="font-size:3rem;">🔍</div>
        <h3 class="empty-state__title">Tidak ada relawan ditemukan</h3>
        <p class="empty-state__text">Tidak ada relawan dengan status yang dipilih.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = volunteers.map(v => {
    const statusBadgeClass = v.status === 'active' ? 'badge--success' : 'badge--warning';
    const statusLabel = v.status === 'active' ? '✅ Aktif' : '⏸️ Non-aktif';
    const assignedCount = v.assignedElderly.length;
    const stars = '⭐'.repeat(Math.round(v.rating));
    const joinFormatted = formatDate(v.joinDate);

    // Get names of assigned elderly
    const assignedNames = v.assignedElderly.map(id => {
      const elderly = getElderlyById(id);
      return elderly ? elderly.name : '';
    }).filter(Boolean);

    return `
      <div class="card volunteer-card" data-status="${v.status}" style="overflow:hidden;">
        <div style="background:linear-gradient(135deg, #6A0D0D 0%, #8B1E1E 60%, #D4A373 100%); padding:var(--space-lg); display:flex; align-items:center; gap:var(--space-md);">
          <div style="font-size:2.8rem; width:65px; height:65px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.2); border-radius:50%;">
            ${v.photo}
          </div>
          <div style="flex:1; color:white;">
            <h3 style="font-family:'Playfair Display',serif; font-size:1.1rem; margin-bottom:2px;">${v.name}</h3>
            <p style="font-size:0.85rem; opacity:0.9;">📍 ${v.district}</p>
            <p style="font-size:0.8rem; opacity:0.85; margin-top:2px;">${v.specialization}</p>
          </div>
        </div>
        <div class="card__body" style="padding:var(--space-md) var(--space-lg);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm);">
            <span class="badge ${statusBadgeClass}">${statusLabel}</span>
            <span style="font-size:0.85rem; color:var(--text-secondary);">Rating: ${v.rating} ${stars}</span>
          </div>
          <div class="gold-divider gold-divider--sm" style="margin:var(--space-sm) 0;"></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-sm); margin-bottom:var(--space-sm);">
            <div style="text-align:center; padding:var(--space-xs); background:var(--cream); border-radius:var(--radius-sm);">
              <div style="font-size:1.3rem; font-weight:700; color:var(--primary);">${v.completedVisits}</div>
              <div style="font-size:0.75rem; color:var(--text-secondary);">Kunjungan Selesai</div>
            </div>
            <div style="text-align:center; padding:var(--space-xs); background:var(--cream); border-radius:var(--radius-sm);">
              <div style="font-size:1.3rem; font-weight:700; color:var(--primary);">${assignedCount}</div>
              <div style="font-size:0.75rem; color:var(--text-secondary);">Lansia Dampingan</div>
            </div>
          </div>
          ${assignedNames.length > 0 ? `
            <div style="margin-bottom:var(--space-sm);">
              <span style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:4px;">👴 Lansia Dampingan:</span>
              <p style="font-size:0.8rem; color:var(--text-primary); line-height:1.5;">${assignedNames.join(', ')}</p>
            </div>
          ` : `
            <p style="font-size:0.8rem; color:var(--text-secondary); font-style:italic; margin-bottom:var(--space-sm);">Belum ada lansia dampingan</p>
          `}
          <p style="font-size:0.75rem; color:var(--text-secondary);">📅 Bergabung: ${joinFormatted}</p>
        </div>
        <div class="card__footer" style="display:flex; gap:var(--space-sm); padding:var(--space-sm) var(--space-lg) var(--space-lg);">
          <button class="btn btn--outline btn--sm" style="flex:1;" onclick="showToast('Menampilkan detail ${v.name}', 'success')">👁️ Lihat Detail</button>
          <button class="btn btn--primary btn--sm" style="flex:1;" onclick="showToast('Silakan pilih lansia untuk di-assign ke ${v.name}', 'success')">🤝 Assign Lansia</button>
        </div>
      </div>
    `;
  }).join('');
}


// ---- Filter Volunteers ----
function filterVolunteers(filter) {
  // Update chip active state
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('filter-chip--active', chip.dataset.filter === filter);
  });

  renderVolunteerCards(filter);
}


// ---- Render Priority Elderly ----
function renderPriorityElderly() {
  const listEl = document.getElementById('priority-elderly-list');
  if (!listEl) return;

  // Sort by riskScore descending, take top 5
  const sorted = [...elderlyData].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  listEl.innerHTML = sorted.map(e => {
    const riskClass = e.riskCategory;
    const riskLabel = getRiskLabel(e.riskCategory);
    const riskEmoji = getRiskEmoji(e.riskCategory);
    const days = daysSince(e.lastVisit);
    const daysText = days !== null ? days + ' hari lalu' : 'Belum pernah dikunjungi';
    const daysStyle = days !== null && days > 30 ? 'color:var(--risk-high); font-weight:600;' : 'color:var(--text-secondary);';

    return `
      <div class="elderly-card" style="border-left:4px solid var(--risk-${riskClass});">
        <div class="elderly-card__avatar" style="font-size:2.5rem;">${e.photo}</div>
        <div class="elderly-card__info">
          <h4 class="elderly-card__name">${e.name}</h4>
          <p class="elderly-card__meta">${e.age} tahun • ${e.gender} • ${e.district}</p>
          <div class="elderly-card__details" style="margin-top:var(--space-xs);">
            <span class="risk-badge risk-badge--${riskClass}">
              <span class="risk-badge__dot"></span> ${riskEmoji} ${riskLabel} (${e.riskScore})
            </span>
          </div>
          <p style="font-size:0.8rem; margin-top:var(--space-xs); ${daysStyle}">
            📅 Kunjungan terakhir: ${daysText}
          </p>
          <p style="font-size:0.8rem; color:var(--text-secondary);">🏥 ${e.health}</p>
        </div>
        <div class="elderly-card__actions" style="margin-top:var(--space-sm);">
          <button class="btn btn--gold btn--sm" onclick="showToast('Kunjungan ke ${e.name} telah dijadwalkan', 'success')">
            ✋ Terima Kunjungan
          </button>
        </div>
      </div>
    `;
  }).join('');
}


// ---- Render Schedule Items ----
function renderScheduleItems() {
  const listEl = document.getElementById('schedule-list');
  if (!listEl) return;

  const scheduleData = [
    {
      date: '2026-06-10',
      day: '10',
      month: 'Jun',
      elderlyName: 'Ibu Siti Aminah',
      volunteerName: 'Budi Santoso',
      time: '09:00 - 10:30',
      type: 'Pengecekan kesehatan rutin'
    },
    {
      date: '2026-06-10',
      day: '10',
      month: 'Jun',
      elderlyName: 'Bapak Ngadimin',
      volunteerName: 'Rina Wulandari',
      time: '13:00 - 14:30',
      type: 'Kunjungan darurat'
    },
    {
      date: '2026-06-11',
      day: '11',
      month: 'Jun',
      elderlyName: 'Ibu Romlah',
      volunteerName: 'Budi Santoso',
      time: '08:30 - 10:00',
      type: 'Pendampingan ke puskesmas'
    },
    {
      date: '2026-06-12',
      day: '12',
      month: 'Jun',
      elderlyName: 'Bapak Sudirman',
      volunteerName: 'Ahmad Fauzi',
      time: '10:00 - 11:30',
      type: 'Evaluasi kondisi rumah'
    },
    {
      date: '2026-06-13',
      day: '13',
      month: 'Jun',
      elderlyName: 'Ibu Warsini',
      volunteerName: 'Dewi Lestari',
      time: '09:00 - 10:00',
      type: 'Bantuan makanan & nutrisi'
    }
  ];

  listEl.innerHTML = scheduleData.map(s => `
    <div class="schedule-item" style="display:flex; align-items:center; gap:var(--space-lg); padding:var(--space-md) var(--space-lg); border-bottom:1px solid var(--beige);">
      <div class="schedule-item__date" style="text-align:center; min-width:60px;">
        <div class="schedule-item__day" style="font-size:1.5rem; font-weight:700; color:var(--primary); font-family:'Playfair Display',serif;">${s.day}</div>
        <div class="schedule-item__month" style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase; font-weight:600;">${s.month}</div>
      </div>
      <div style="width:1px; height:40px; background:var(--beige);"></div>
      <div class="schedule-item__info" style="flex:1;">
        <div class="schedule-item__title" style="font-weight:600; color:var(--text-primary); margin-bottom:2px;">${s.elderlyName}</div>
        <p style="font-size:0.85rem; color:var(--text-secondary);">${s.type}</p>
        <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">🤝 ${s.volunteerName}</p>
      </div>
      <div class="schedule-item__time" style="text-align:right;">
        <span class="badge badge--gold">🕐 ${s.time}</span>
      </div>
    </div>
  `).join('');
}
