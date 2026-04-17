import { Link } from 'react-router-dom'
import Button from '../components/Button'
import styles from './ComingSoon.module.css'

export default function Style() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Style</h1>
        <p className={styles.body}>
          Your recommendations and outfit formulas are on their way. Complete your style profile to get personalized guidance.
        </p>
        <Link to="/profile">
          <Button variant="ghost">Complete my profile</Button>
        </Link>
      </div>
    </div>
  )
}
