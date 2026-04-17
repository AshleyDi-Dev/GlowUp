import appleOne           from '../assets/Apple-1.svg'
import appleTwo           from '../assets/Apple-2.svg'
import hourglassOne       from '../assets/Hourglass-1.svg'
import hourglassTwo       from '../assets/Hourglass-2.svg'
import invertedTriangleOne from '../assets/InvertedTriangle-1.svg'
import invertedTriangleTwo from '../assets/InvertedTriangle-2.svg'
import pearOne            from '../assets/Pear-1.svg'
import pearTwo            from '../assets/Pear-2.svg'
import rectangleOne       from '../assets/Rectangle-1.svg'
import rectangleTwo       from '../assets/Rectangle-2.svg'
import styles from './ImagePlaceholder.module.css'

const ILLUSTRATIONS = {
  'Apple':             [appleOne, appleTwo],
  'Hourglass':         [hourglassOne, hourglassTwo],
  'Inverted Triangle': [invertedTriangleOne, invertedTriangleTwo],
  'Pear':              [pearOne, pearTwo],
  'Rectangle':         [rectangleOne, rectangleTwo],
}

export default function ImagePlaceholder({ result }) {
  const illustrations = ILLUSTRATIONS[result]

  if (illustrations) {
    return (
      <div className={styles.row}>
        <div className={styles.boxFilled}>
          <img src={illustrations[0]} alt={`${result} illustration 1`} className={styles.image} />
        </div>
        <div className={styles.boxFilled}>
          <img src={illustrations[1]} alt={`${result} illustration 2`} className={styles.image} />
        </div>
      </div>
    )
  }

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
