import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavBar from './NavBar'

export default function ProtectedLayout() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Outlet />
      <NavBar />
    </div>
  )
}
