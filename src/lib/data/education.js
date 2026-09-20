/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} excerpt
 * @property {string} category
 * @property {string} readTime
 * @property {boolean} isFeatured
 * @property {string} emoji - Used as visual placeholder
 */

export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'mengenal-diri', label: 'Mengenal Diri' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'relasi', label: 'Relasi' },
  { id: 'stress', label: 'Stress' },
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'self-care', label: 'Self Care' },
  { id: 'remaja', label: 'Remaja' },
  { id: 'pengembangan-diri', label: 'Pengembangan Diri' },
];

/** @type {Article[]} */
export const articles = [
  {
    id: 'mengenal-emosi',
    title: 'Mengenal Emosi: Langkah Pertama Memahami Diri Sendiri',
    excerpt: 'Emosi adalah bagian alami dari kehidupan. Belajar mengenali dan memahami emosi adalah langkah pertama menuju kesehatan mental yang lebih baik.',
    category: 'mengenal-diri',
    readTime: '5 menit',
    isFeatured: true,
    emoji: '🧠',
  },
  {
    id: 'apa-itu-anxiety',
    title: 'Apa Itu Anxiety? Memahami Kecemasan pada Remaja',
    excerpt: 'Kecemasan adalah respons alami tubuh, tapi kapan kecemasan menjadi masalah? Kenali tanda-tandanya dan cara mengatasinya.',
    category: 'anxiety',
    readTime: '7 menit',
    isFeatured: false,
    emoji: '💭',
  },
  {
    id: 'tips-self-care',
    title: '10 Kebiasaan Self Care yang Bisa Dimulai Hari Ini',
    excerpt: 'Self care bukan cuma soal skincare. Temukan kebiasaan sederhana yang bisa meningkatkan kesejahteraan fisik dan mentalmu.',
    category: 'self-care',
    readTime: '4 menit',
    isFeatured: false,
    emoji: '🌿',
  },
  {
    id: 'mengelola-stress',
    title: 'Cara Sehat Mengelola Stress saat Ujian',
    excerpt: 'Ujian datang, stress meningkat. Ini dia teknik-teknik sederhana yang terbukti efektif meredakan tekanan akademis.',
    category: 'stress',
    readTime: '6 menit',
    isFeatured: false,
    emoji: '📚',
  },
  {
    id: 'membangun-relasi-sehat',
    title: 'Membangun Relasi yang Sehat di Usia Remaja',
    excerpt: 'Relasi yang sehat dimulai dari memahami batasan. Pelajari cara membangun pertemanan dan hubungan yang positif.',
    category: 'relasi',
    readTime: '5 menit',
    isFeatured: false,
    emoji: '🤝',
  },
  {
    id: 'mental-health-101',
    title: 'Mental Health 101: Apa yang Perlu Kamu Tahu',
    excerpt: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Kenali dasar-dasar mental health dan mengapa kamu harus peduli.',
    category: 'mental-health',
    readTime: '8 menit',
    isFeatured: true,
    emoji: '💚',
  },
  {
    id: 'percaya-diri',
    title: 'Membangun Rasa Percaya Diri: Bukan Soal Sempurna',
    excerpt: 'Percaya diri bukan berarti tidak punya kelemahan. Temukan cara membangun kepercayaan diri yang autentik.',
    category: 'pengembangan-diri',
    readTime: '5 menit',
    isFeatured: false,
    emoji: '⭐',
  },
  {
    id: 'tekanan-teman-sebaya',
    title: 'Menghadapi Tekanan dari Teman Sebaya',
    excerpt: 'Peer pressure bisa datang dalam banyak bentuk. Pelajari cara mengatakan "tidak" tanpa merasa bersalah.',
    category: 'remaja',
    readTime: '6 menit',
    isFeatured: false,
    emoji: '🛡️',
  },
  {
    id: 'journaling-untuk-mental',
    title: 'Journaling: Menulis untuk Kesehatan Mental',
    excerpt: 'Menulis jurnal bisa menjadi terapi sederhana. Temukan cara memulai kebiasaan journaling yang bermanfaat.',
    category: 'self-care',
    readTime: '4 menit',
    isFeatured: false,
    emoji: '📝',
  },
];

/**
 * Filter articles by category.
 * @param {string} categoryId
 * @returns {Article[]}
 */
export function getArticlesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return articles;
  return articles.filter((a) => a.category === categoryId);
}

/**
 * Search articles by title or excerpt.
 * @param {string} query
 * @returns {Article[]}
 */
export function searchArticles(query) {
  if (!query) return articles;
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.excerpt.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get featured articles.
 * @returns {Article[]}
 */
export function getFeaturedArticles() {
  return articles.filter((a) => a.isFeatured);
}
