/* ============================================
   SAHABAT LANSIA — Mock Data Layer
   ============================================ */

// ---- Elderly Data ----
let elderlyData = [
  {
    id: 1, name: "Ibu Siti Aminah", age: 79, gender: "Perempuan",
    address: "Jl. Kebonsari No. 12, Kel. Jambangan",
    district: "Jambangan", phone: "081234567890",
    photo: "👵",
    health: "Diabetes, keterbatasan mobilitas",
    healthCondition: "chronic",
    income: 500000, incomeCategory: "low",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 5, transportAccess: false,
    riskScore: 87, riskCategory: "high",
    lastVisit: "2026-05-20", volunteer: "Budi Santoso",
    registeredDate: "2026-01-15",
    notes: "Membutuhkan bantuan obat rutin dan pengecekan gula darah."
  },
  {
    id: 2, name: "Bapak Hasan Basri", age: 82, gender: "Laki-laki",
    address: "Jl. Wonokromo No. 45, Kel. Wonokromo",
    district: "Wonokromo", phone: "081345678901",
    photo: "👴",
    health: "Gangguan penglihatan, hipertensi",
    healthCondition: "chronic",
    income: 300000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 8, transportAccess: false,
    riskScore: 92, riskCategory: "high",
    lastVisit: "2026-05-10", volunteer: "Rina Wulandari",
    registeredDate: "2025-11-22",
    notes: "Perlu pendampingan ke puskesmas setiap bulan."
  },
  {
    id: 3, name: "Ibu Maryam", age: 74, gender: "Perempuan",
    address: "Jl. Darmo Permai No. 8, Kel. Sukomanunggal",
    district: "Sukomanunggal", phone: "081456789012",
    photo: "👵",
    health: "Osteoporosis",
    healthCondition: "chronic",
    income: 1200000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan anak",
    accessibilityDistance: 2, transportAccess: true,
    riskScore: 38, riskCategory: "low",
    lastVisit: "2026-06-01", volunteer: null,
    registeredDate: "2026-02-10",
    notes: "Kondisi stabil, keluarga aktif merawat."
  },
  {
    id: 4, name: "Bapak Slamet Riyadi", age: 85, gender: "Laki-laki",
    address: "Jl. Rungkut Lor No. 33, Kel. Rungkut",
    district: "Rungkut", phone: "081567890123",
    photo: "👴",
    health: "Demensia ringan, asma",
    healthCondition: "chronic",
    income: 0, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 10, transportAccess: false,
    riskScore: 95, riskCategory: "high",
    lastVisit: "2026-04-28", volunteer: "Ahmad Fauzi",
    registeredDate: "2025-09-05",
    notes: "Prioritas tinggi. Rumah dalam kondisi kurang layak."
  },
  {
    id: 5, name: "Ibu Kartini Wibowo", age: 71, gender: "Perempuan",
    address: "Jl. Mulyosari No. 21, Kel. Mulyorejo",
    district: "Mulyorejo", phone: "081678901234",
    photo: "👵",
    health: "Sehat",
    healthCondition: "healthy",
    income: 2000000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan suami",
    accessibilityDistance: 1, transportAccess: true,
    riskScore: 18, riskCategory: "low",
    lastVisit: "2026-06-05", volunteer: null,
    registeredDate: "2026-03-01",
    notes: "Aktif di posyandu lansia."
  },
  {
    id: 6, name: "Bapak Sutarno", age: 78, gender: "Laki-laki",
    address: "Jl. Semolowaru No. 55, Kel. Sukolilo",
    district: "Sukolilo", phone: "081789012345",
    photo: "👴",
    health: "Stroke ringan, hipertensi",
    healthCondition: "disability",
    income: 600000, incomeCategory: "low",
    familySupport: "caregiver", livingStatus: "Tinggal dengan pengasuh",
    accessibilityDistance: 3, transportAccess: true,
    riskScore: 62, riskCategory: "medium",
    lastVisit: "2026-05-28", volunteer: "Dewi Lestari",
    registeredDate: "2025-12-15",
    notes: "Pengasuh paruh waktu, perlu monitoring rutin."
  },
  {
    id: 7, name: "Ibu Rahayu", age: 88, gender: "Perempuan",
    address: "Jl. Tandes No. 7, Kel. Tandes",
    district: "Tandes", phone: "081890123456",
    photo: "👵",
    health: "Gagal jantung, diabetes",
    healthCondition: "chronic",
    income: 200000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 7, transportAccess: false,
    riskScore: 96, riskCategory: "high",
    lastVisit: "2026-05-05", volunteer: "Budi Santoso",
    registeredDate: "2025-08-20",
    notes: "Kondisi sangat rentan, butuh kunjungan mingguan."
  },
  {
    id: 8, name: "Bapak Djoko Susilo", age: 73, gender: "Laki-laki",
    address: "Jl. Benowo No. 18, Kel. Benowo",
    district: "Benowo", phone: "081901234567",
    photo: "👴",
    health: "Kolesterol tinggi",
    healthCondition: "chronic",
    income: 1500000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan keluarga",
    accessibilityDistance: 2, transportAccess: true,
    riskScore: 28, riskCategory: "low",
    lastVisit: "2026-06-03", volunteer: null,
    registeredDate: "2026-04-12",
    notes: "Kontrol rutin ke RS, keluarga mendukung."
  },
  {
    id: 9, name: "Ibu Sumiati", age: 80, gender: "Perempuan",
    address: "Jl. Lakarsantri No. 29, Kel. Lakarsantri",
    district: "Lakarsantri", phone: "082012345678",
    photo: "👵",
    health: "Rematik, gangguan pendengaran",
    healthCondition: "chronic",
    income: 400000, incomeCategory: "low",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 6, transportAccess: false,
    riskScore: 78, riskCategory: "high",
    lastVisit: "2026-05-18", volunteer: "Rina Wulandari",
    registeredDate: "2025-10-08",
    notes: "Kesulitan beraktivitas, perlu bantuan sehari-hari."
  },
  {
    id: 10, name: "Bapak Widodo", age: 76, gender: "Laki-laki",
    address: "Jl. Gubeng No. 41, Kel. Gubeng",
    district: "Gubeng", phone: "082123456789",
    photo: "👴",
    health: "Diabetes tipe 2",
    healthCondition: "chronic",
    income: 800000, incomeCategory: "low",
    familySupport: "family", livingStatus: "Tinggal dengan istri",
    accessibilityDistance: 1, transportAccess: true,
    riskScore: 45, riskCategory: "medium",
    lastVisit: "2026-06-02", volunteer: null,
    registeredDate: "2026-01-25",
    notes: "Istri juga lansia, perlu perhatian."
  },
  {
    id: 11, name: "Ibu Nurhasanah", age: 83, gender: "Perempuan",
    address: "Jl. Kenjeran No. 63, Kel. Bulak",
    district: "Bulak", phone: "082234567890",
    photo: "👵",
    health: "Katarak, hipertensi",
    healthCondition: "chronic",
    income: 350000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 9, transportAccess: false,
    riskScore: 88, riskCategory: "high",
    lastVisit: "2026-05-12", volunteer: "Ahmad Fauzi",
    registeredDate: "2025-07-14",
    notes: "Penglihatan sangat terbatas, butuh pendampingan."
  },
  {
    id: 12, name: "Bapak Mulyono", age: 69, gender: "Laki-laki",
    address: "Jl. Pakal No. 5, Kel. Pakal",
    district: "Pakal", phone: "082345678901",
    photo: "👴",
    health: "Sehat",
    healthCondition: "healthy",
    income: 1800000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan keluarga besar",
    accessibilityDistance: 1, transportAccess: true,
    riskScore: 12, riskCategory: "low",
    lastVisit: null, volunteer: null,
    registeredDate: "2026-05-20",
    notes: "Kondisi baik, aktif berolahraga."
  },
  {
    id: 13, name: "Ibu Fatimah", age: 77, gender: "Perempuan",
    address: "Jl. Tambaksari No. 17, Kel. Tambaksari",
    district: "Tambaksari", phone: "082456789012",
    photo: "👵",
    health: "Asma, radang sendi",
    healthCondition: "chronic",
    income: 450000, incomeCategory: "low",
    familySupport: "caregiver", livingStatus: "Tinggal dengan cucu",
    accessibilityDistance: 4, transportAccess: true,
    riskScore: 55, riskCategory: "medium",
    lastVisit: "2026-05-25", volunteer: "Dewi Lestari",
    registeredDate: "2026-02-28",
    notes: "Cucu bekerja seharian, perlu monitoring siang hari."
  },
  {
    id: 14, name: "Bapak Sudirman", age: 86, gender: "Laki-laki",
    address: "Jl. Sawahan No. 31, Kel. Sawahan",
    district: "Sawahan", phone: "082567890123",
    photo: "👴",
    health: "Parkinson, gangguan jantung",
    healthCondition: "disability",
    income: 100000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 11, transportAccess: false,
    riskScore: 98, riskCategory: "high",
    lastVisit: "2026-04-15", volunteer: "Budi Santoso",
    registeredDate: "2025-06-10",
    notes: "PRIORITAS TERTINGGI. Kondisi sangat kritis."
  },
  {
    id: 15, name: "Ibu Endang Sulistyowati", age: 72, gender: "Perempuan",
    address: "Jl. Wiyung No. 24, Kel. Wiyung",
    district: "Wiyung", phone: "082678901234",
    photo: "👵",
    health: "Hipertensi ringan",
    healthCondition: "chronic",
    income: 900000, incomeCategory: "low",
    familySupport: "family", livingStatus: "Tinggal dengan anak",
    accessibilityDistance: 2, transportAccess: true,
    riskScore: 35, riskCategory: "low",
    lastVisit: "2026-06-04", volunteer: null,
    registeredDate: "2026-03-18",
    notes: "Kondisi terkontrol dengan obat rutin."
  },
  {
    id: 16, name: "Bapak Agus Salim", age: 81, gender: "Laki-laki",
    address: "Jl. Tegalsari No. 52, Kel. Tegalsari",
    district: "Tegalsari", phone: "082789012345",
    photo: "👴",
    health: "Gangguan ginjal, anemia",
    healthCondition: "chronic",
    income: 250000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 6, transportAccess: false,
    riskScore: 85, riskCategory: "high",
    lastVisit: "2026-05-22", volunteer: "Ahmad Fauzi",
    registeredDate: "2025-11-03",
    notes: "Perlu dialisis rutin, transportasi sulit."
  },
  {
    id: 17, name: "Ibu Sri Mulyani", age: 75, gender: "Perempuan",
    address: "Jl. Gayungan No. 14, Kel. Gayungan",
    district: "Gayungan", phone: "082890123456",
    photo: "👵",
    health: "Diabetes, kaki bengkak",
    healthCondition: "chronic",
    income: 700000, incomeCategory: "low",
    familySupport: "caregiver", livingStatus: "Tinggal dengan pembantu",
    accessibilityDistance: 3, transportAccess: true,
    riskScore: 52, riskCategory: "medium",
    lastVisit: "2026-05-30", volunteer: "Rina Wulandari",
    registeredDate: "2026-01-08",
    notes: "Pemberian insulin perlu diawasi."
  },
  {
    id: 18, name: "Bapak Wahyu Hidayat", age: 70, gender: "Laki-laki",
    address: "Jl. Genteng No. 9, Kel. Genteng",
    district: "Genteng", phone: "082901234567",
    photo: "👴",
    health: "Sehat, kolesterol ringan",
    healthCondition: "healthy",
    income: 2500000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan istri dan anak",
    accessibilityDistance: 1, transportAccess: true,
    riskScore: 15, riskCategory: "low",
    lastVisit: null, volunteer: null,
    registeredDate: "2026-05-01",
    notes: "Pensiun PNS, kondisi sejahtera."
  },
  {
    id: 19, name: "Ibu Warsini", age: 84, gender: "Perempuan",
    address: "Jl. Simokerto No. 27, Kel. Simokerto",
    district: "Simokerto", phone: "083012345678",
    photo: "👵",
    health: "Gangguan paru-paru, malnutrisi",
    healthCondition: "chronic",
    income: 150000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 8, transportAccess: false,
    riskScore: 91, riskCategory: "high",
    lastVisit: "2026-05-08", volunteer: "Dewi Lestari",
    registeredDate: "2025-08-15",
    notes: "Gizi buruk, butuh bantuan makanan harian."
  },
  {
    id: 20, name: "Bapak Suroto", age: 77, gender: "Laki-laki",
    address: "Jl. Krembangan No. 38, Kel. Krembangan",
    district: "Krembangan", phone: "083123456789",
    photo: "👴",
    health: "Hernia, sulit berjalan",
    healthCondition: "disability",
    income: 550000, incomeCategory: "low",
    familySupport: "family", livingStatus: "Tinggal dengan anak",
    accessibilityDistance: 3, transportAccess: false,
    riskScore: 58, riskCategory: "medium",
    lastVisit: "2026-05-26", volunteer: null,
    registeredDate: "2026-02-05",
    notes: "Anak bekerja jauh, sering ditinggal sendiri siang hari."
  },
  {
    id: 21, name: "Ibu Romlah", age: 90, gender: "Perempuan",
    address: "Jl. Bubutan No. 11, Kel. Bubutan",
    district: "Bubutan", phone: "083234567890",
    photo: "👵",
    health: "Demensia, gangguan pendengaran, osteoporosis",
    healthCondition: "disability",
    income: 0, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 12, transportAccess: false,
    riskScore: 99, riskCategory: "high",
    lastVisit: "2026-04-20", volunteer: "Budi Santoso",
    registeredDate: "2025-05-10",
    notes: "KASUS PALING KRITIS. Lansia tertua, tinggal sendiri, tanpa penghasilan."
  },
  {
    id: 22, name: "Bapak Hartono", age: 68, gender: "Laki-laki",
    address: "Jl. Dukuh Pakis No. 16, Kel. Dukuh Pakis",
    district: "Dukuh Pakis", phone: "083345678901",
    photo: "👴",
    health: "Sehat",
    healthCondition: "healthy",
    income: 3000000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan istri",
    accessibilityDistance: 1, transportAccess: true,
    riskScore: 10, riskCategory: "low",
    lastVisit: null, volunteer: null,
    registeredDate: "2026-06-01",
    notes: "Baru terdaftar, kondisi sangat baik."
  },
  {
    id: 23, name: "Ibu Sumiyati", age: 76, gender: "Perempuan",
    address: "Jl. Karangpilang No. 44, Kel. Karangpilang",
    district: "Karangpilang", phone: "083456789012",
    photo: "👵",
    health: "Diabetes tipe 2, vertigo",
    healthCondition: "chronic",
    income: 650000, incomeCategory: "low",
    familySupport: "caregiver", livingStatus: "Tinggal dengan saudara",
    accessibilityDistance: 4, transportAccess: true,
    riskScore: 48, riskCategory: "medium",
    lastVisit: "2026-05-29", volunteer: "Rina Wulandari",
    registeredDate: "2026-03-22",
    notes: "Saudara yang merawat juga sudah tua."
  },
  {
    id: 24, name: "Bapak Suyanto", age: 80, gender: "Laki-laki",
    address: "Jl. Semampir No. 22, Kel. Semampir",
    district: "Semampir", phone: "083567890123",
    photo: "👴",
    health: "TBC, malnutrisi",
    healthCondition: "chronic",
    income: 200000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 7, transportAccess: false,
    riskScore: 90, riskCategory: "high",
    lastVisit: "2026-05-15", volunteer: "Ahmad Fauzi",
    registeredDate: "2025-10-20",
    notes: "Dalam pengobatan TBC, butuh pengawasan minum obat."
  },
  {
    id: 25, name: "Ibu Tuminah", age: 73, gender: "Perempuan",
    address: "Jl. Tenggilis No. 30, Kel. Tenggilis Mejoyo",
    district: "Tenggilis Mejoyo", phone: "083678901234",
    photo: "👵",
    health: "Hipertensi terkontrol",
    healthCondition: "chronic",
    income: 1100000, incomeCategory: "pension",
    familySupport: "family", livingStatus: "Tinggal dengan anak dan cucu",
    accessibilityDistance: 2, transportAccess: true,
    riskScore: 25, riskCategory: "low",
    lastVisit: "2026-06-05", volunteer: null,
    registeredDate: "2026-04-15",
    notes: "Aktif dan mandiri, keluarga suportif."
  },
  {
    id: 26, name: "Bapak Kasimin", age: 87, gender: "Laki-laki",
    address: "Jl. Asemrowo No. 8, Kel. Asemrowo",
    district: "Asemrowo", phone: "083789012345",
    photo: "👴",
    health: "Gangguan jantung, edema",
    healthCondition: "chronic",
    income: 100000, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 9, transportAccess: false,
    riskScore: 94, riskCategory: "high",
    lastVisit: "2026-05-02", volunteer: "Dewi Lestari",
    registeredDate: "2025-07-28",
    notes: "Kondisi kritis, perlu evakuasi ke panti jompo."
  },
  {
    id: 27, name: "Ibu Pariyem", age: 70, gender: "Perempuan",
    address: "Jl. Wonocolo No. 19, Kel. Wonocolo",
    district: "Wonocolo", phone: "083890123456",
    photo: "👵",
    health: "Arthritis ringan",
    healthCondition: "chronic",
    income: 950000, incomeCategory: "low",
    familySupport: "family", livingStatus: "Tinggal dengan suami",
    accessibilityDistance: 2, transportAccess: true,
    riskScore: 32, riskCategory: "low",
    lastVisit: "2026-06-01", volunteer: null,
    registeredDate: "2026-03-05",
    notes: "Pasangan lansia, keduanya masih cukup mandiri."
  },
  {
    id: 28, name: "Bapak Sariman", age: 83, gender: "Laki-laki",
    address: "Jl. Pabean Cantikan No. 6, Kel. Pabean Cantikan",
    district: "Pabean Cantikan", phone: "083901234567",
    photo: "👴",
    health: "Stroke, lumpuh sebagian",
    healthCondition: "disability",
    income: 300000, incomeCategory: "none",
    familySupport: "caregiver", livingStatus: "Tinggal dengan pengasuh",
    accessibilityDistance: 5, transportAccess: false,
    riskScore: 75, riskCategory: "high",
    lastVisit: "2026-05-20", volunteer: "Budi Santoso",
    registeredDate: "2025-09-12",
    notes: "Pengasuh dibayar oleh tetangga yang peduli."
  },
  {
    id: 29, name: "Ibu Kustiyah", age: 78, gender: "Perempuan",
    address: "Jl. Gunung Anyar No. 35, Kel. Gunung Anyar",
    district: "Gunung Anyar", phone: "084012345678",
    photo: "👵",
    health: "Gagal ginjal stadium awal",
    healthCondition: "chronic",
    income: 500000, incomeCategory: "low",
    familySupport: "family", livingStatus: "Tinggal dengan menantu",
    accessibilityDistance: 4, transportAccess: true,
    riskScore: 55, riskCategory: "medium",
    lastVisit: "2026-05-27", volunteer: "Ahmad Fauzi",
    registeredDate: "2026-02-14",
    notes: "Hubungan dengan menantu kurang harmonis."
  },
  {
    id: 30, name: "Bapak Ngadimin", age: 91, gender: "Laki-laki",
    address: "Jl. Tambak Wedi No. 3, Kel. Kenjeran",
    district: "Kenjeran", phone: "084123456789",
    photo: "👴",
    health: "Multi-penyakit kronis, bed-ridden",
    healthCondition: "disability",
    income: 0, incomeCategory: "none",
    familySupport: "alone", livingStatus: "Tinggal sendiri",
    accessibilityDistance: 15, transportAccess: false,
    riskScore: 100, riskCategory: "high",
    lastVisit: "2026-04-10", volunteer: "Rina Wulandari",
    registeredDate: "2025-04-01",
    notes: "SKOR MAKSIMUM. Tidak bisa bergerak, butuh perawatan total."
  }
];


// ---- Volunteer Data ----
const volunteerData = [
  {
    id: 1, name: "Budi Santoso", age: 32, gender: "Laki-laki",
    phone: "085123456789", email: "budi.santoso@email.com",
    photo: "🧑",
    district: "Jambangan", address: "Jl. Jambangan Indah No. 5",
    assignedElderly: [1, 7, 14, 21, 28],
    completedVisits: 45, pendingVisits: 3,
    joinDate: "2025-06-15", status: "active",
    rating: 4.8, specialization: "Pendampingan kesehatan"
  },
  {
    id: 2, name: "Rina Wulandari", age: 28, gender: "Perempuan",
    phone: "085234567890", email: "rina.wulandari@email.com",
    photo: "👩",
    district: "Wonokromo", address: "Jl. Wonokromo Baru No. 12",
    assignedElderly: [2, 9, 17, 23, 30],
    completedVisits: 38, pendingVisits: 4,
    joinDate: "2025-08-20", status: "active",
    rating: 4.9, specialization: "Konseling emosional"
  },
  {
    id: 3, name: "Ahmad Fauzi", age: 35, gender: "Laki-laki",
    phone: "085345678901", email: "ahmad.fauzi@email.com",
    photo: "🧑",
    district: "Rungkut", address: "Jl. Rungkut Kidul No. 8",
    assignedElderly: [4, 11, 16, 24, 29],
    completedVisits: 52, pendingVisits: 2,
    joinDate: "2025-05-10", status: "active",
    rating: 4.7, specialization: "Bantuan administratif"
  },
  {
    id: 4, name: "Dewi Lestari", age: 30, gender: "Perempuan",
    phone: "085456789012", email: "dewi.lestari@email.com",
    photo: "👩",
    district: "Tandes", address: "Jl. Tandes Lor No. 15",
    assignedElderly: [6, 13, 19, 26],
    completedVisits: 41, pendingVisits: 3,
    joinDate: "2025-07-01", status: "active",
    rating: 4.6, specialization: "Perawatan rumah"
  },
  {
    id: 5, name: "Rizky Pratama", age: 26, gender: "Laki-laki",
    phone: "085567890123", email: "rizky.pratama@email.com",
    photo: "🧑",
    district: "Sukolilo", address: "Jl. ITS No. 22",
    assignedElderly: [],
    completedVisits: 12, pendingVisits: 0,
    joinDate: "2026-01-15", status: "active",
    rating: 4.5, specialization: "Pendampingan teknologi"
  },
  {
    id: 6, name: "Siti Nurhaliza", age: 33, gender: "Perempuan",
    phone: "085678901234", email: "siti.nurhaliza@email.com",
    photo: "👩",
    district: "Gubeng", address: "Jl. Gubeng Kertajaya No. 30",
    assignedElderly: [],
    completedVisits: 28, pendingVisits: 0,
    joinDate: "2025-09-10", status: "inactive",
    rating: 4.4, specialization: "Nutrisi dan gizi"
  },
  {
    id: 7, name: "Hendra Wijaya", age: 29, gender: "Laki-laki",
    phone: "085789012345", email: "hendra.wijaya@email.com",
    photo: "🧑",
    district: "Sawahan", address: "Jl. Sawahan Timur No. 7",
    assignedElderly: [],
    completedVisits: 8, pendingVisits: 0,
    joinDate: "2026-03-01", status: "active",
    rating: 4.3, specialization: "Kebersihan lingkungan"
  },
  {
    id: 8, name: "Maya Indah", age: 27, gender: "Perempuan",
    phone: "085890123456", email: "maya.indah@email.com",
    photo: "👩",
    district: "Simokerto", address: "Jl. Simokerto Baru No. 11",
    assignedElderly: [],
    completedVisits: 15, pendingVisits: 1,
    joinDate: "2025-11-20", status: "active",
    rating: 4.6, specialization: "Fisioterapi dasar"
  },
  {
    id: 9, name: "Eko Prasetyo", age: 40, gender: "Laki-laki",
    phone: "085901234567", email: "eko.prasetyo@email.com",
    photo: "🧑",
    district: "Krembangan", address: "Jl. Krembangan Jaya No. 20",
    assignedElderly: [],
    completedVisits: 33, pendingVisits: 0,
    joinDate: "2025-06-25", status: "active",
    rating: 4.8, specialization: "Pendampingan spiritual"
  },
  {
    id: 10, name: "Anisa Rahma", age: 25, gender: "Perempuan",
    phone: "086012345678", email: "anisa.rahma@email.com",
    photo: "👩",
    district: "Mulyorejo", address: "Jl. Mulyosari Utara No. 9",
    assignedElderly: [],
    completedVisits: 5, pendingVisits: 0,
    joinDate: "2026-04-10", status: "active",
    rating: 4.2, specialization: "Pendampingan umum"
  }
];


// ---- District Data (Surabaya) ----
const districtData = [
  { name: "Jambangan", lat: -7.3290, lng: 112.7230, elderlyCount: 2, highRisk: 1, mediumRisk: 0, lowRisk: 1 },
  { name: "Wonokromo", lat: -7.3050, lng: 112.7370, elderlyCount: 2, highRisk: 1, mediumRisk: 1, lowRisk: 0 },
  { name: "Sukomanunggal", lat: -7.2720, lng: 112.7050, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Rungkut", lat: -7.3230, lng: 112.7720, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Mulyorejo", lat: -7.2700, lng: 112.7830, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Sukolilo", lat: -7.2900, lng: 112.7870, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Tandes", lat: -7.2580, lng: 112.6960, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Benowo", lat: -7.2400, lng: 112.6700, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Lakarsantri", lat: -7.3000, lng: 112.6650, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Gubeng", lat: -7.2750, lng: 112.7520, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Bulak", lat: -7.2350, lng: 112.7900, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Pakal", lat: -7.2300, lng: 112.6300, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Tambaksari", lat: -7.2550, lng: 112.7600, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Sawahan", lat: -7.2680, lng: 112.7280, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Tegalsari", lat: -7.2800, lng: 112.7400, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Gayungan", lat: -7.3340, lng: 112.7350, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Genteng", lat: -7.2650, lng: 112.7450, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Simokerto", lat: -7.2450, lng: 112.7550, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Krembangan", lat: -7.2350, lng: 112.7250, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Bubutan", lat: -7.2520, lng: 112.7300, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Dukuh Pakis", lat: -7.2950, lng: 112.7100, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Karangpilang", lat: -7.3350, lng: 112.7050, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Semampir", lat: -7.2300, lng: 112.7450, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Asemrowo", lat: -7.2420, lng: 112.7100, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Wonocolo", lat: -7.3200, lng: 112.7420, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Pabean Cantikan", lat: -7.2280, lng: 112.7380, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Gunung Anyar", lat: -7.3400, lng: 112.7780, elderlyCount: 1, highRisk: 0, mediumRisk: 1, lowRisk: 0 },
  { name: "Kenjeran", lat: -7.2280, lng: 112.7830, elderlyCount: 1, highRisk: 1, mediumRisk: 0, lowRisk: 0 },
  { name: "Tenggilis Mejoyo", lat: -7.3150, lng: 112.7570, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 },
  { name: "Wiyung", lat: -7.3200, lng: 112.6950, elderlyCount: 1, highRisk: 0, mediumRisk: 0, lowRisk: 1 }
];


// ---- Visit Reports ----
const visitReports = [
  {
    id: 1, elderlyId: 1, volunteerId: 1,
    date: "2026-05-20", time: "09:00",
    healthUpdate: "Gula darah 180 mg/dL (tinggi). Kaki bengkak bertambah. Perlu konsultasi dokter.",
    houseCondition: "Cukup bersih, namun lantai licin dan berbahaya. Perlu keset anti-slip.",
    emotionalWellbeing: "Kesepian, sering menangis. Merindukan keluarga yang jarang berkunjung.",
    assistanceNeeded: "Obat diabetes, bantuan makanan bergizi, kunjungan rutin 2x seminggu.",
    overallRating: "concerning",
    photoCount: 2
  },
  {
    id: 2, elderlyId: 2, volunteerId: 2,
    date: "2026-05-10", time: "10:30",
    healthUpdate: "Tekanan darah 160/95 mmHg. Penglihatan semakin memburuk. Perlu rujukan ke dokter mata.",
    houseCondition: "Gelap, kurang ventilasi. Lampu perlu diganti ke yang lebih terang.",
    emotionalWellbeing: "Cukup semangat, masih bisa bercanda. Senang didatangi relawan.",
    assistanceNeeded: "Kacamata baru, obat hipertensi, perbaikan pencahayaan rumah.",
    overallRating: "concerning",
    photoCount: 3
  },
  {
    id: 3, elderlyId: 4, volunteerId: 3,
    date: "2026-04-28", time: "14:00",
    healthUpdate: "Demensia memburuk, sering lupa makan. Asma kambuh 3x minggu ini.",
    houseCondition: "Sangat kotor dan berantakan. Atap bocor saat hujan. Butuh renovasi mendesak.",
    emotionalWellbeing: "Bingung, sulit berkomunikasi. Menunjukkan tanda-tanda depresi.",
    assistanceNeeded: "Perawat harian, renovasi rumah darurat, bantuan makan 3x sehari.",
    overallRating: "critical",
    photoCount: 5
  },
  {
    id: 4, elderlyId: 7, volunteerId: 1,
    date: "2026-05-05", time: "08:30",
    healthUpdate: "Sesak nafas bertambah. Gula darah tidak terkontrol, 250 mg/dL.",
    houseCondition: "Bersih tapi sangat sempit. Tidak ada ventilasi yang baik.",
    emotionalWellbeing: "Pasrah, merasa menjadi beban. Perlu dukungan psikologis.",
    assistanceNeeded: "Oksigen portable, insulin, konseling psikologis, bantuan makanan.",
    overallRating: "critical",
    photoCount: 2
  },
  {
    id: 5, elderlyId: 14, volunteerId: 1,
    date: "2026-04-15", time: "11:00",
    healthUpdate: "Tremor memburuk, sulit memegang sendok. Jantung berdebar tidak teratur.",
    houseCondition: "Sangat memprihatinkan. Dinding retak, lantai rusak, atap bocor.",
    emotionalWellbeing: "Sangat tertekan, menangis sepanjang kunjungan.",
    assistanceNeeded: "EVAKUASI KE PANTI JOMPO. Obat Parkinson, perbaikan rumah total.",
    overallRating: "critical",
    photoCount: 4
  },
  {
    id: 6, elderlyId: 6, volunteerId: 4,
    date: "2026-05-28", time: "15:00",
    healthUpdate: "Fisioterapi menunjukkan kemajuan. Tangan kanan sudah bisa digerakkan.",
    houseCondition: "Baik dan terawat. Pengasuh menjaga kebersihan.",
    emotionalWellbeing: "Optimis, bersemangat untuk sembuh. Senang bisa menggerakkan tangan.",
    assistanceNeeded: "Lanjutkan fisioterapi, alat bantu jalan.",
    overallRating: "stable",
    photoCount: 1
  }
];


// ---- Notifications ----
const notificationsData = [
  {
    id: 1, type: "danger",
    title: "Lansia Berisiko Tinggi Belum Dikunjungi",
    message: "Bapak Ngadimin (skor 100) belum dikunjungi selama 59 hari. Segera assign relawan.",
    time: "2 jam lalu", date: "2026-06-08",
    read: false, elderlyId: 30
  },
  {
    id: 2, type: "danger",
    title: "Kondisi Kritis Terdeteksi",
    message: "Ibu Romlah (skor 99) — kasus paling kritis. Kunjungan terakhir 49 hari lalu.",
    time: "3 jam lalu", date: "2026-06-08",
    read: false, elderlyId: 21
  },
  {
    id: 3, type: "warning",
    title: "Laporan Kunjungan Mendesak",
    message: "Laporan kunjungan Bapak Slamet Riyadi menunjukkan kondisi kritis. Perlu tindakan segera.",
    time: "5 jam lalu", date: "2026-06-08",
    read: false, elderlyId: 4
  },
  {
    id: 4, type: "info",
    title: "Lansia Baru Terdaftar",
    message: "Bapak Hartono (68 tahun) dari Dukuh Pakis telah terdaftar. Skor risiko: 10 (Rendah).",
    time: "1 hari lalu", date: "2026-06-07",
    read: true, elderlyId: 22
  },
  {
    id: 5, type: "success",
    title: "Kunjungan Selesai",
    message: "Dewi Lestari telah menyelesaikan kunjungan ke Bapak Sutarno. Kondisi stabil dan membaik.",
    time: "2 hari lalu", date: "2026-06-06",
    read: true, elderlyId: 6
  },
  {
    id: 6, type: "danger",
    title: "14 Hari Tanpa Kunjungan",
    message: "Bapak Sudirman (skor 98) belum dikunjungi selama 54 hari. PRIORITAS TERTINGGI.",
    time: "2 hari lalu", date: "2026-06-06",
    read: true, elderlyId: 14
  },
  {
    id: 7, type: "info",
    title: "Relawan Baru Bergabung",
    message: "Anisa Rahma telah bergabung sebagai relawan di wilayah Mulyorejo.",
    time: "3 hari lalu", date: "2026-06-05",
    read: true, elderlyId: null
  },
  {
    id: 8, type: "warning",
    title: "Perlu Verifikasi Data",
    message: "Data 3 lansia baru perlu diverifikasi oleh admin kelurahan.",
    time: "4 hari lalu", date: "2026-06-04",
    read: true, elderlyId: null
  }
];


// ---- Helper Functions ----
function getElderlyByRisk(category) {
  return elderlyData.filter(e => e.riskCategory === category);
}

function getElderlyById(id) {
  return elderlyData.find(e => e.id === id);
}

function getVolunteerById(id) {
  return volunteerData.find(v => v.id === id);
}

function getActiveVolunteers() {
  return volunteerData.filter(v => v.status === "active");
}

function getUnreadNotifications() {
  return notificationsData.filter(n => !n.read);
}

function getRiskStats() {
  const high = elderlyData.filter(e => e.riskCategory === "high").length;
  const medium = elderlyData.filter(e => e.riskCategory === "medium").length;
  const low = elderlyData.filter(e => e.riskCategory === "low").length;
  return { total: elderlyData.length, high, medium, low };
}

function getAgeDemographics() {
  const ranges = { "65-69": 0, "70-74": 0, "75-79": 0, "80-84": 0, "85-89": 0, "90+": 0 };
  elderlyData.forEach(e => {
    if (e.age >= 90) ranges["90+"]++;
    else if (e.age >= 85) ranges["85-89"]++;
    else if (e.age >= 80) ranges["80-84"]++;
    else if (e.age >= 75) ranges["75-79"]++;
    else if (e.age >= 70) ranges["70-74"]++;
    else ranges["65-69"]++;
  });
  return ranges;
}

function getIncomeDistribution() {
  const dist = { pension: 0, low: 0, none: 0 };
  elderlyData.forEach(e => dist[e.incomeCategory]++);
  return {
    "Pensiunan": dist.pension,
    "Pendapatan Rendah": dist.low,
    "Tanpa Pendapatan": dist.none
  };
}

function getHealthDistribution() {
  const dist = { healthy: 0, chronic: 0, disability: 0 };
  elderlyData.forEach(e => dist[e.healthCondition]++);
  return {
    "Sehat": dist.healthy,
    "Penyakit Kronis": dist.chronic,
    "Disabilitas": dist.disability
  };
}

function calculateRiskScore(data) {
  let score = 0;

  // Age scoring (max 25)
  if (data.age >= 90) score += 25;
  else if (data.age >= 85) score += 22;
  else if (data.age >= 80) score += 18;
  else if (data.age >= 75) score += 14;
  else if (data.age >= 70) score += 10;
  else score += 5;

  // Health scoring (max 25)
  if (data.healthCondition === "disability") score += 25;
  else if (data.healthCondition === "chronic") score += 18;
  else score += 5;

  // Income scoring (max 20)
  if (data.incomeCategory === "none") score += 20;
  else if (data.incomeCategory === "low") score += 12;
  else score += 4;

  // Family support scoring (max 20)
  if (data.familySupport === "alone") score += 20;
  else if (data.familySupport === "caregiver") score += 10;
  else score += 3;

  // Accessibility scoring (max 10)
  if (!data.transportAccess && data.accessibilityDistance > 5) score += 10;
  else if (!data.transportAccess) score += 7;
  else if (data.accessibilityDistance > 5) score += 5;
  else score += 2;

  return Math.min(100, score);
}

function getRiskCategory(score) {
  if (score >= 65) return "high";
  if (score >= 35) return "medium";
  return "low";
}

function getRiskLabel(category) {
  const labels = { high: "Risiko Tinggi", medium: "Risiko Menengah", low: "Risiko Rendah" };
  return labels[category] || category;
}

function getRiskEmoji(category) {
  const emojis = { high: "🔴", medium: "🟠", low: "🟢" };
  return emojis[category] || "⚪";
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
}

function daysSince(dateStr) {
  if (!dateStr) return null;
  const diff = new Date() - new Date(dateStr);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// ---- Persistance Setup ----
const storedElderlyData = localStorage.getItem('sahabatLansia_elderlyData');
if (storedElderlyData) {
  try {
    elderlyData = JSON.parse(storedElderlyData);
  } catch(e) {
    console.error("Failed parsing elderlyData from localStorage", e);
  }
}

function saveElderlyData() {
  localStorage.setItem('sahabatLansia_elderlyData', JSON.stringify(elderlyData));
}
