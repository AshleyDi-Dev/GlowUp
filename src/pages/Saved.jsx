import { Link } from 'react-router-dom'
import Button from '../components/Button'
import styles from './ComingSoon.module.css'

export default function Saved() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Saved</h1>
        <p className={styles.body}>
          This is where your saved tips, outfit formulas, and style notes will live. Come back once you've completed your profile.
        </p>
        <Link to="/profile">
          <Button variant="ghost">Go to my profile</Button>
        </Link>
      </div>
    </div>
  )
}
