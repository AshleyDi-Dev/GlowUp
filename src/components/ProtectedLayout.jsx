import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLoader from './AppLoader'
import NavBar from './NavBar'
import styles from './ProtectedLayout.module.css'

export default function ProtectedLayout() {
  const { user, loading } = useAuth()

  if (loading) return <AppLoader />
  if (!user) return <Navigate to="/login" replace />

  return (
    <div className={styles.shell}>
      <NavBar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
