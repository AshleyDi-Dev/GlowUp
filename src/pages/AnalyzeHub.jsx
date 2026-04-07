import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Badge from '../components/Badge'
import styles from './AnalyzeHub.module.css'

// ── Module config ─────────────────────────────────────────────────

const MODULES = [
  {
    key:      'body',
    label:    'Body',
    desc:     'Proportions and shape balance',
    field:    'body_type',
    quizType: 'body',
    path:     '/analyze/body',
  },
  {
    key:      'face',
    label:    'Face',
    desc:     'Face shape and structure',
    field:    'face_shape',
    quizType: 'face',
    path:     '/analyze/face',
  },
  {
    key:      'hair',
    label:    'Hair',
    desc:     'Texture, density, and color profile',
    field:    'hair_texture',
    quizType: 'hair',
    path:     '/analyze/hair',
  },
  {
    key:      'color',
    label:    'Color',
    desc:     'Your seasonal color palette',
    field:    'color_season',
    quizType: 'color',
    path:     '/analyze/color',
  },
]

// ── Helpers ───────────────────────────────────────────────────────

const RESULT_LABELS = {
  InvertedTriangle: 'Inverted triangle',
}

function displayResult(value) {
  return RESULT_LABELS[value] ?? value
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  return `Updated ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

// ── Module card ───────────────────────────────────────────────────

function ModuleCard({ mod, result, updatedAt }) {
  const isComplete = Boolean(result)

  return (
    <Link to={mod.path} className={styles.cardLink}>
      <Card className={styles.card}>
        <div className={styles.cardTop}>
          <Badge variant={mod.key}>{mod.label}</Badge>
          {isComplete && (
            <svg
              className={styles.checkmark}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.25" />
              <polyline
                points="4.5,8.5 7,11 11.5,5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        <p className={styles.cardDesc}>{mod.desc}</p>

        <div className={styles.cardStatus}>
          {isComplete ? (
            <>
              <p className={styles.resultText}>{displayResult(result)}</p>
              {updatedAt && (
                <p className={styles.updatedDate}>{formatDate(updatedAt)}</p>
              )}
              <p className={styles.retakeHint}>Retake available</p>
            </>
          ) : (
            <p className={styles.notStarted}>Not started</p>
          )}
        </div>
      </Card>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────

export default function AnalyzeHub() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({})
  const [dates, setDates]     = useState({})

  useEffect(() => {
    async function load() {
      const [{ data: sumData }, { data: attempts }] = await Promise.all([
        supabase
          .from('style_summary')
          .select('body_type, face_shape, hair_texture, color_season')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('quiz_attempts')
          .select('quiz_type, created_at')
          .eq('user_id', user.id)
          .eq('is_current', true),
      ])

      setSummary(sumData ?? {})

      // Most recent is_current attempt per quiz type
      const dateMap = {}
      if (attempts) {
        attempts.forEach(a => {
          if (!dateMap[a.quiz_type] || a.created_at > dateMap[a.quiz_type]) {
            dateMap[a.quiz_type] = a.created_at
          }
        })
      }
      setDates(dateMap)
      setLoading(false)
    }
    load()
  }, [user.id])

  if (loading) return null

  const allComplete = MODULES.every(m => Boolean(summary[m.field]))

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h1 className={styles.heading}>Analyze</h1>
          <p className={styles.subheading}>Build your style profile one section at a time.</p>
        </div>

        {allComplete && (
          <Link to="/style" className={styles.completionBanner}>
            Your style profile is complete — head to Style for your recommendations.
          </Link>
        )}

        <div className={styles.grid}>
          {MODULES.map(mod => (
            <ModuleCard
              key={mod.key}
              mod={mod}
              result={summary[mod.field] ?? null}
              updatedAt={dates[mod.quizType] ?? null}
            />
          ))}
        </div>

      </div>
    </div>
  )
}
