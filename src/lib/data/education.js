/**
 * Data artikel edukasi. `content` disimpan sebagai struktur data agar halaman
 * detail dapat dirender tanpa HTML mentah.
 */
export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'kesehatan-mental', label: 'Kesehatan Mental' },
  { id: 'mengelola-emosi', label: 'Mengelola Emosi' },
  { id: 'media-sosial', label: 'Media Sosial' },
  { id: 'cyberbullying', label: 'Cyberbullying' },
  { id: 'self-awareness', label: 'Self-Awareness' },
  { id: 'dukungan-teman', label: 'Dukungan untuk Teman' },
  { id: 'relasi', label: 'Relasi Sehat' },
  { id: 'self-care', label: 'Self Care' },
];

export const articles = [
  {
    id: 'mengenal-emosi',
    title: 'Mengenal Emosi: Langkah Pertama Memahami Diri Sendiri',
    excerpt: 'Emosi adalah bagian alami dari kehidupan. Belajar mengenalinya membantu kita merespons keadaan dengan lebih sehat.',
    category: 'mengelola-emosi', readTime: '5 menit', isFeatured: true, emoji: '🧠',
    content: [
      { heading: 'Emosi membawa pesan', paragraphs: ['Senang, sedih, takut, marah, dan kecewa bukanlah emosi yang baik atau buruk. Setiap emosi memberi informasi tentang kebutuhan, batasan, atau keadaan yang sedang kita hadapi.', 'Mengenali emosi memberi kita jeda untuk memilih respons. Kita tidak harus langsung bertindak hanya karena sedang merasakan sesuatu yang kuat.'] },
      { heading: 'Latihan mengenali emosi', paragraphs: ['Saat perasaan terasa penuh, perhatikan apa yang terjadi pada tubuh, pikiran, dan doronganmu.'], tips: ['Sebutkan nama emosi dengan spesifik.', 'Nilai intensitasnya dari 1 sampai 10.', 'Tanyakan kebutuhan apa yang belum terpenuhi.', 'Pilih satu tindakan kecil yang aman.'] },
    ],
    nextSteps: ['Catat emosi yang paling sering muncul selama tiga hari.', 'Bicarakan pola yang kamu temukan dengan orang yang dipercaya.'],
  },
  {
    id: 'apa-itu-kecemasan',
    title: 'Memahami Kecemasan pada Remaja',
    excerpt: 'Kecemasan adalah respons alami tubuh. Kenali kapan rasa cemas mulai mengganggu dan cara menghadapinya.',
    category: 'kesehatan-mental', readTime: '7 menit', isFeatured: false, emoji: '💭',
    content: [
      { heading: 'Kapan kecemasan perlu diperhatikan?', paragraphs: ['Rasa cemas dapat membantu kita bersiap menghadapi ujian atau situasi baru. Kecemasan perlu mendapat perhatian ketika muncul terus-menerus, sulit dikendalikan, atau mengganggu tidur, sekolah, dan hubungan.', 'Tandanya dapat berupa jantung berdebar, sulit fokus, pikiran berulang, menghindari situasi tertentu, dan merasa akan terjadi sesuatu yang buruk.'] },
      { heading: 'Yang bisa dilakukan saat cemas', paragraphs: ['Tujuannya bukan memaksa kecemasan hilang seketika, tetapi membantu tubuh kembali merasa cukup aman.'], tips: ['Tarik napas 4 hitungan dan keluarkan 6 hitungan.', 'Sebutkan lima benda yang kamu lihat.', 'Kurangi kafein dan jaga waktu tidur.', 'Cari bantuan profesional jika kecemasan terus mengganggu.'] },
    ],
    nextSteps: ['Tuliskan situasi yang memicu kecemasan.', 'Mulai membicarakannya dengan orang yang aman.'],
  },
  {
    id: 'self-care-realistis',
    title: 'Self Care yang Bisa Dimulai Hari Ini',
    excerpt: 'Self care bukan hanya soal perawatan tubuh. Kebiasaan sederhana membantu menjaga energi fisik dan mental.',
    category: 'self-care', readTime: '4 menit', isFeatured: false, emoji: '🌿',
    content: [
      { heading: 'Self care yang realistis', paragraphs: ['Self care berarti merawat kebutuhan dasar secara konsisten. Tidak harus mahal, sempurna, atau terlihat menarik di media sosial.'], tips: ['Tidur dan bangun pada jam yang cukup konsisten.', 'Makan teratur dan minum air.', 'Bergerak ringan selama 10–15 menit.', 'Sisihkan waktu tanpa layar.'] },
      { heading: 'Mulai dari satu kebiasaan', paragraphs: ['Memulai terlalu banyak perubahan sekaligus sering membuat kita cepat lelah. Pilih satu kebiasaan kecil, tentukan waktu yang jelas, lalu evaluasi setelah satu minggu.'] },
    ],
    nextSteps: ['Pilih satu kebiasaan yang mungkin dilakukan hari ini.', 'Pasang pengingat sederhana selama tujuh hari.'],
  },
  {
    id: 'stres-saat-ujian',
    title: 'Cara Sehat Mengelola Stres saat Ujian',
    excerpt: 'Gunakan strategi belajar dan pemulihan yang membantu tubuh serta pikiran tetap stabil saat tekanan akademik meningkat.',
    category: 'mengelola-emosi', readTime: '6 menit', isFeatured: false, emoji: '📚',
    content: [
      { heading: 'Pisahkan yang bisa dikendalikan', paragraphs: ['Nilai akhir tidak sepenuhnya berada dalam kendali kita. Jadwal belajar, waktu istirahat, dan cara meminta bantuan dapat kita atur. Fokus pada tindakan konkret mengurangi rasa kewalahan.'] },
      { heading: 'Belajar tanpa mengorbankan diri', paragraphs: ['Otak membutuhkan jeda untuk menyimpan informasi. Belajar terus-menerus tanpa tidur justru dapat menurunkan fokus.'], tips: ['Pecah materi menjadi sesi 25–45 menit.', 'Tentukan tiga target utama per hari.', 'Beristirahat tanpa rasa bersalah.', 'Bicarakan beban akademik dengan orang yang dapat membantu.'] },
    ],
    nextSteps: ['Buat daftar tiga materi prioritas.', 'Jadwalkan waktu tidur sebelum hari ujian.'],
  },
  {
    id: 'relasi-sehat',
    title: 'Membangun Relasi yang Sehat di Usia Remaja',
    excerpt: 'Relasi yang sehat tumbuh dari rasa aman, komunikasi, dan batasan yang saling dihargai.',
    category: 'relasi', readTime: '5 menit', isFeatured: false, emoji: '🤝',
    content: [
      { heading: 'Ciri relasi yang sehat', paragraphs: ['Dalam relasi yang sehat, kedua pihak boleh memiliki pendapat, teman, dan waktu sendiri. Konflik diselesaikan tanpa ancaman, hinaan, atau kontrol berlebihan.'], tips: ['Sampaikan kebutuhan dengan jelas.', 'Dengarkan tanpa memotong.', 'Hormati jawaban tidak.', 'Perhatikan apakah kamu merasa aman menjadi diri sendiri.'] },
      { heading: 'Saat batasan dilanggar', paragraphs: ['Jika seseorang terus memaksa, mengontrol akunmu, merendahkan, atau membuatmu takut, cari dukungan dari orang dewasa yang dipercaya. Kamu tidak harus menghadapinya sendirian.'] },
    ],
    nextSteps: ['Tuliskan satu batasan yang penting bagimu.', 'Latih menyampaikannya dengan kalimat singkat.'],
  },
  {
    id: 'media-sosial-dan-perbandingan-diri',
    title: 'Media Sosial dan Kebiasaan Membandingkan Diri',
    excerpt: 'Linimasa hanya menampilkan sebagian kecil kehidupan orang lain. Gunakan media sosial tanpa kehilangan rasa cukup.',
    category: 'media-sosial', readTime: '6 menit', isFeatured: true, emoji: '📱',
    content: [
      { heading: 'Mengapa kita mudah membandingkan diri?', paragraphs: ['Otak menggunakan informasi sosial untuk menilai posisi kita. Media sosial sering mempertemukan keseharian kita dengan momen terbaik orang lain sehingga perbandingannya tidak seimbang.'] },
      { heading: 'Membuat linimasa lebih sehat', paragraphs: ['Kamu boleh mengatur ulang apa yang masuk ke ruang digitalmu.'], tips: ['Mute akun yang memicu tekanan berulang.', 'Batasi aplikasi sebelum tidur.', 'Ikuti akun yang edukatif dan realistis.', 'Ingat bahwa angka like bukan ukuran nilai diri.'] },
    ],
    nextSteps: ['Audit akun yang kamu ikuti.', 'Coba satu jam tanpa media sosial sebelum tidur.'],
  },
  {
    id: 'menghadapi-cyberbullying',
    title: 'Menghadapi Cyberbullying dengan Aman',
    excerpt: 'Perundungan digital bukan kesalahan korban. Simpan bukti, lindungi akun, dan cari bantuan dari orang yang dapat bertindak.',
    category: 'cyberbullying', readTime: '7 menit', isFeatured: false, emoji: '🛡️',
    content: [
      { heading: 'Kenali cyberbullying', paragraphs: ['Cyberbullying dapat berupa hinaan berulang, penyebaran foto tanpa izin, ancaman, penyamaran akun, atau pengucilan melalui platform digital. Dampaknya nyata meski terjadi secara online.'] },
      { heading: 'Langkah aman', paragraphs: ['Utamakan keselamatan dan jangan membalas ketika situasi dapat memburuk.'], tips: ['Simpan tangkapan layar beserta tanggal dan akun.', 'Blokir dan laporkan pelaku.', 'Ubah kata sandi dan aktifkan autentikasi dua faktor.', 'Laporkan kepada orang tua, sekolah, atau pihak berwenang bila ada ancaman.'] },
    ],
    nextSteps: ['Simpan bukti di tempat aman.', 'Ceritakan kepada orang dewasa yang dipercaya.'],
  },
  {
    id: 'mendukung-teman',
    title: 'Cara Mendukung Teman yang Sedang Kesulitan',
    excerpt: 'Kamu tidak harus menjadi ahli untuk hadir bagi teman. Dengarkan dan bantu mencari dukungan yang tepat.',
    category: 'dukungan-teman', readTime: '5 menit', isFeatured: false, emoji: '🫂',
    content: [
      { heading: 'Hadir tanpa mengambil alih', paragraphs: ['Dengarkan cerita teman dan tanyakan apa yang ia butuhkan. Hindari memaksa nasihat atau menjanjikan bahwa semua akan cepat membaik.'], tips: ['Katakan bahwa kamu percaya ceritanya.', 'Tanyakan apakah ia ingin didengar atau mencari solusi.', 'Ajak menghubungi orang dewasa atau tenaga profesional.', 'Jaga batasan agar kamu juga tidak kewalahan.'] },
      { heading: 'Jika ada risiko keselamatan', paragraphs: ['Jika teman menyebut ingin menyakiti diri atau berada dalam bahaya, jangan simpan sendiri sebagai rahasia. Hubungi orang dewasa tepercaya atau layanan darurat.'] },
    ],
    nextSteps: ['Kirim pesan sederhana untuk menanyakan kabarnya.', 'Libatkan orang dewasa jika ada kekhawatiran keselamatan.'],
  },
  {
    id: 'mengenal-kekuatan-diri',
    title: 'Mengenal Kekuatan Diri Tanpa Harus Sempurna',
    excerpt: 'Self-awareness membantu kita memahami nilai, kekuatan, kebutuhan, dan bagian diri yang ingin dikembangkan.',
    category: 'self-awareness', readTime: '5 menit', isFeatured: false, emoji: '⭐',
    content: [
      { heading: 'Nilai diri bukan daftar prestasi', paragraphs: ['Kekuatan dapat terlihat dalam cara kita bertahan, peduli, belajar, atau meminta maaf. Prestasi hanya salah satu bagian kecil dari identitas.'] },
      { heading: 'Latihan refleksi', paragraphs: ['Kenali dirimu melalui bukti konkret, bukan hanya penilaian sesaat.'], tips: ['Tuliskan tiga situasi sulit yang pernah kamu lewati.', 'Catat kemampuan yang membantumu saat itu.', 'Tanyakan kepada teman tepercaya kekuatan yang mereka lihat.'] },
    ],
    nextSteps: ['Pilih satu kekuatan yang ingin lebih sering digunakan.', 'Tuliskan satu hal yang kamu hargai dari dirimu.'],
  },
];

export function getArticleBySlug(slug) {
  return articles.find((article) => article.id === slug);
}

export function getArticlesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return articles;
  return articles.filter((article) => article.category === categoryId);
}

export function searchArticles(query) {
  if (!query) return articles;
  const normalizedQuery = query.toLowerCase();
  return articles.filter(
    (article) => article.title.toLowerCase().includes(normalizedQuery) || article.excerpt.toLowerCase().includes(normalizedQuery)
  );
}

export function getFeaturedArticles() {
  return articles.filter((article) => article.isFeatured);
}
