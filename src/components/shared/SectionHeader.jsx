import styles from './shared.module.css';

export default function SectionHeader({ badge, badgeVariant = 'primary', title, description, align = 'center' }) {
  const badgeClass = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    accent: 'badge-accent',
    warm: 'badge-warm',
  }[badgeVariant] || 'badge-primary';

  return (
    <div className={`${styles.sectionHeader} ${align === 'left' ? styles.alignLeft : ''}`}>
      {badge && <span className={`badge ${badgeClass}`}>{badge}</span>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
