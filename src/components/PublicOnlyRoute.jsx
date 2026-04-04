import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AppLoader from './AppLoader'

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth()

  if (loading) return <AppLoader />
  if (user) return <Navigate to="/home" replace />

  return <Outlet />
}
