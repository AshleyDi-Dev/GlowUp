import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import AppLoader from './AppLoader'

export default function PublicOnlyRoute() {
  const { user, loading } = useAuth()
  const [checking, setChecking]       = useState(true)
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    // No user — nothing to check, let the public route render
    if (!loading && !user) {
      setChecking(false)
      return
    }

    // User present — check whether they've completed onboarding
    if (!loading && user) {
      async function checkProfile() {
        const { data } = await supabase
          .from('profiles')
          .select('has_onboarded')
          .eq('id', user.id)
          .maybeSingle()

        setDestination(data?.has_onboarded ? '/home' : '/onboarding')
        setChecking(false)
      }
      checkProfile()
    }
  }, [user, loading])

  // Auth state still resolving, or profile check in flight
  if (loading || (user && checking)) return <AppLoader />

  // Logged in — route to the correct destination
  if (user) return <Navigate to={destination} replace />

  // Not logged in — render the public page (login / signup)
  return <Outlet />
}
