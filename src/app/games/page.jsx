import { games } from '@/lib/data/games';
import styles from '@/components/games/games.module.css';
import UnavailableNotice from '@/components/shared/UnavailableNotice';

export const metadata = {
  title: 'Games | TEMANIN',
  description: 'Game edukatif di Roblox untuk membantu remaja memahami kesehatan mental sambil bermain.',
};

export default function GamesPage() {
  return (
    <div>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <div className="container">
          <span className={styles.pageHeaderBadge}>🎮 Game Edukatif</span>
          <h1 className={styles.pageTitle}>Belajar Sambil Bermain</h1>
          <p className={styles.pageDesc}>
            Game di Roblox yang dirancang khusus untuk membantu remaja memahami dan menjaga kesehatan mental.
          </p>
        </div>
      </header>

      {/* Games grid */}
      <section className={styles.gamesSection}>
        <div className="container">
          <div className={styles.gamesGrid}>
            {games.map((game) => (
              <UnavailableNotice
                key={game.id}
                href={game.url}
                className={styles.gameCard}
                title={`${game.title} belum tersedia`}
                message="Tautan resmi Roblox untuk game ini belum dirilis. Silakan kembali lagi setelah pengelola memperbarui tautannya."
              >
                <div className={styles.gameVisual}>
                  {game.emoji}
                </div>
                <div className={styles.gameContent}>
                  <h2 className={styles.gameTitle}>{game.title}</h2>
                  <p className={styles.gameDesc}>{game.description}</p>
                  <div className={styles.gameMeta}>
                    <span className={styles.gamePlatform}>🎮 {game.platform}</span>
                    <span className={styles.gamePlayBtn}>▶ Main Sekarang</span>
                  </div>
                </div>
              </UnavailableNotice>
            ))}
          </div>
        </div>
      </section>

      {/* Info section */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>ℹ️</span>
            <h3 className={styles.infoTitle}>Tentang Game Ini</h3>
            <p className={styles.infoDesc}>
              Semua game dikembangkan di platform Roblox dan dirancang dengan pendekatan edukatif.
              URL game akan diperbarui ketika versi final tersedia.
              Saat ini, game menggunakan link demo/placeholder.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
