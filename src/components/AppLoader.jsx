import styles from './AppLoader.module.css'

export default function AppLoader() {
  return (
    <div className={styles.shell} aria-label="Loading" role="status">
      <p className={styles.wordmark}>GlowUp</p>
    </div>
  )
}
