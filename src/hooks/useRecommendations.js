import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { getRecommendations } from '../lib/recommendationsEngine'

/**
 * Fetches the current user's style_summary row and returns the full
 * recommendations object produced by getRecommendations.
 *
 * Only runs when the user is authenticated. Safe to call before the
 * user has completed any quizzes — missing fields return null per the
 * engine's own null-safety rules.
 *
 * @returns {{ recommendations: object|null, loading: boolean, error: string|null }}
 */
export function useRecommendations() {
  const { user } = useAuth()
  const [recommendations, setRecommendations] = useState(null)
  const [styleSummary, setStyleSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return

    async function load() {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('style_summary')
        .select('body_type, face_shape, color_season, hair_texture, hair_density, hair_porosity')
        .eq('user_id', user.id)
        .maybeSingle()

      if (fetchError) {
        setError(fetchError.message)
        setLoading(false)
        return
      }

      const summary = data ?? {}
      setStyleSummary(summary)
      setRecommendations(getRecommendations(summary))
      setLoading(false)
    }

    load()
  }, [user])

  return { recommendations, styleSummary, loading, error }
}
