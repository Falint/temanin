import Link from 'next/link';
import SectionHeader from '@/components/shared/SectionHeader';
import { games } from '@/lib/data/games';
import styles from './landing.module.css';

export default function GamesPreview() {
  return (
    <section className={styles.gamesSection}>
      <div className="container">
        <SectionHeader
          badge="Games"
          badgeVariant="warm"
          title="Belajar Sambil Bermain"
          description="Game edukatif di Roblox yang dirancang untuk membantu remaja memahami kesehatan mental."
        />

        <div className={styles.gamesGrid}>
          {games.map((game) => (
            <a
              key={game.id}
              href={game.url}
              className={styles.gameCard}
              target={game.url !== '#' ? '_blank' : undefined}
              rel={game.url !== '#' ? 'noopener noreferrer' : undefined}
            >
              <span className={styles.gameEmoji}>{game.emoji}</span>
              <h3 className={styles.gameTitle}>{game.title}</h3>
              <p className={styles.gameDesc}>{game.description}</p>
              <span className={styles.gameBadge}>🎮 {game.platform}</span>
            </a>
          ))}
        </div>

        <div className={styles.gamesCta}>
          <Link href="/games" className="btn btn-outline">
            Lihat Semua Games →
          </Link>
        </div>
      </div>
    </section>
  );
}
