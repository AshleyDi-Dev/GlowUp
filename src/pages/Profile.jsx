import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Profile.module.css'

// ── Quiz module config ────────────────────────────────────────────

const MODULES = [
  {
    key:       'body',
    label:     'Body proportions',
    field:     'body_type',
    quizPath:  '/analyze/body',
    quizType:  'body',
    nullFields: { body_type: null },
  },
  {
    key:       'face',
    label:     'Face shape',
    field:     'face_shape',
    quizPath:  '/analyze/face',
    quizType:  'face',
    nullFields: { face_shape: null },
  },
  {
    key:       'hair',
    label:     'Hair profile',
    field:     'hair_texture',
    quizPath:  '/analyze/hair',
    quizType:  'hair',
    nullFields: {
      hair_texture: null, hair_density: null, hair_porosity: null,
      hair_current_color: null, hair_natural_color: null,
      hair_styling_tendency: null, hair_style_hold: null, hair_style: null,
    },
  },
  {
    key:       'color',
    label:     'Color analysis',
    field:     'color_season',
    quizPath:  '/analyze/color',
    quizType:  'color',
    nullFields: { color_season: null },
  },
]

// ── Module card ───────────────────────────────────────────────────

function ModuleCard({ mod, result, onReset, resetting }) {
  const [confirmReset, setConfirmReset] = useState(false)
  const isComplete = Boolean(result)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <p className={styles.cardLabel}>{mod.label}</p>
          {isComplete
            ? <p className={styles.cardResult}>{result}</p>
            : <p className={styles.cardEmpty}>Not completed yet</p>
          }
        </div>
        {isComplete && (
          <span className={styles.completeBadge}>Done</span>
        )}
      </div>

      <div className={styles.cardActions}>
        {isComplete ? (
          <>
            <Link to={mod.quizPath} className={styles.fullWidth}>
              <Button variant="ghost" fullWidth>View result</Button>
            </Link>

            <div className={styles.retakeBlock}>
              <Link to={mod.quizPath} className={styles.fullWidth}>
                <Button variant="ghost" fullWidth>Retake quiz</Button>
              </Link>
            </div>

            {confirmReset ? (
              <div className={styles.resetConfirm}>
                <p className={styles.resetConfirmText}>
                  Resetting removes your current result so you can start this section fresh. Your previous results are never deleted.
                </p>
                <Button
                  variant="destructive"
                  fullWidth
                  loading={resetting === mod.key}
                  onClick={() => onReset(mod)}
                >
                  Yes, reset this section
                </Button>
                <button
                  type="button"
                  className={styles.textLink}
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.resetBlock}>
                <button
                  type="button"
                  className={styles.textLink}
                  onClick={() => setConfirmReset(true)}
                >
                  Reset this section
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to={mod.quizPath} className={styles.fullWidth}>
            <Button fullWidth>Start {mod.label.toLowerCase()}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading]   = useState(true)
  const [summary, setSummary]   = useState({})
  const [resetting, setResetting] = useState(null)  // key of module being reset

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('style_summary')
        .select('body_type, face_shape, hair_texture, color_season')
        .eq('user_id', user.id)
        .maybeSingle()

      setSummary(data ?? {})
      setLoading(false)
    }
    load()
  }, [user.id])

  async function handleReset(mod) {
    setResetting(mod.key)

    await supabase
      .from('quiz_attempts')
      .update({ is_current: false })
      .eq('user_id', user.id)
      .eq('quiz_type', mod.quizType)

    await supabase.from('style_summary').upsert(
      { user_id: user.id, ...mod.nullFields },
      { onConflict: 'user_id' }
    )

    setSummary(prev => ({ ...prev, ...mod.nullFields }))
    setResetting(null)
  }

  if (loading) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Your profile</p>
          <h1 className={styles.heading}>Style summary</h1>
          <p className={styles.body}>
            Manage your quiz results here. Retake any section to add to your history,
            or reset to start fresh.
          </p>
        </div>

        <div className={styles.modules}>
          {MODULES.map(mod => (
            <ModuleCard
              key={mod.key}
              mod={mod}
              result={summary[mod.field] ?? null}
              onReset={handleReset}
              resetting={resetting}
            />
          ))}
        </div>

        <Link to="/analyze" className={styles.textLink}>
          Back to Analyze
        </Link>

      </div>
    </div>
  )
}
