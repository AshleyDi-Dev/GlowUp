import { useRecommendations } from '../hooks/useRecommendations'
import styles from './Recommendations.module.css'

// ── Category config ───────────────────────────────────────────────

const CATEGORIES = [
  { key: 'clothing',    label: 'Clothing' },
  { key: 'color',       label: 'Colour' },
  { key: 'accessories', label: 'Accessories' },
  { key: 'hair',        label: 'Hair' },
]

// ── Component ─────────────────────────────────────────────────────

export default function Recommendations() {
  const { recommendations, loading, error } = useRecommendations()

  if (loading) return null

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorText}>
            Something went wrong loading your recommendations. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.heading}>Your recommendations</h1>
          <p className={styles.subheading}>
            Personalised guidance based on your style profile.
          </p>
        </div>

        <div className={styles.categories}>
          {CATEGORIES.map(({ key, label }) => {
            const hasData = recommendations?.[key] !== null
            return (
              <div key={key} className={styles.categoryCard}>
                <div className={styles.cardTop}>
                  <p className={styles.cardEyebrow}>Category</p>
                  <h2 className={styles.cardTitle}>{label}</h2>
                </div>
                <p className={styles.cardNote}>
                  {hasData
                    ? 'Data loaded — full UI coming soon.'
                    : 'Complete the relevant quiz to unlock this category.'}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
