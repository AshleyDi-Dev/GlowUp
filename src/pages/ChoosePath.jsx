import { useNavigate } from 'react-router-dom'
import styles from './ChoosePath.module.css'

const OPTIONS = [
  {
    key:         'full',
    label:       'Full style profile',
    support:     'Walk through all four modules in order',
    path:        '/analyze/body',
    recommended: true,
  },
  {
    key:     'body',
    label:   'Body shape',
    support: 'Identify your proportions and silhouettes',
    path:    '/analyze/body',
  },
  {
    key:     'face',
    label:   'Face shape',
    support: 'Discover what necklines and styles suit you',
    path:    '/analyze/face',
  },
  {
    key:     'hair',
    label:   'Hair profile',
    support: 'Understand your texture, density, and color needs',
    path:    '/analyze/hair',
  },
  {
    key:     'color',
    label:   'Color analysis',
    support: 'Find your seasonal palette',
    path:    '/analyze/color',
  },
  {
    key:     'measurements',
    label:   'Just save my measurements',
    support: 'Store your measurements for fit reference',
    path:    '/measurements',
  },
]

export default function ChoosePath() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.heading}>What do you want help with?</h1>
          <p className={styles.subheading}>
            You can always come back and complete other sections later.
          </p>
        </div>

        <div className={styles.grid}>
          {OPTIONS.map(({ key, label, support, path, recommended }) => (
            <button
              key={key}
              type="button"
              className={[
                styles.card,
                recommended ? styles.cardRecommended : '',
              ].filter(Boolean).join(' ')}
              onClick={() => navigate(path)}
            >
              {recommended && (
                <span className={styles.badge}>Recommended</span>
              )}
              <p className={styles.cardLabel}>{label}</p>
              <p className={styles.cardSupport}>{support}</p>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
