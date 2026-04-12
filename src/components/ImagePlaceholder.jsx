import styles from './ImagePlaceholder.module.css'

export default function ImagePlaceholder() {
  return (
    <div className={styles.row}>
      <div className={styles.box}>
        <span className={styles.label}>Image coming soon</span>
      </div>
      <div className={styles.box}>
        <span className={styles.label}>Image coming soon</span>
      </div>
    </div>
  )
}
