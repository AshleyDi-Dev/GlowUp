import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import styles from './BodyQuiz.module.css'

// ── Questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'q1',
    title: 'Where do you carry most of your weight?',
    tip: 'Think about your natural body — not a goal or ideal.',
    guide: null,
    options: [
      { value: 'evenly',          label: 'Pretty evenly distributed — nothing stands out' },
      { value: 'hips_thighs',     label: 'Definitely in my hips and thighs — that\'s where everything goes' },
      { value: 'stomach',         label: 'Mostly in my stomach and midsection' },
      { value: 'not_much',        label: 'Honestly I don\'t carry much weight anywhere' },
      { value: 'upper_shoulders', label: 'My upper body and shoulders tend to fill out first' },
    ],
  },
  {
    id: 'q2',
    title: 'How would you describe your shoulders compared to your hips?',
    tip: null,
    guide: null,
    options: [
      { value: 'same_width',         label: 'They\'re pretty much the same width' },
      { value: 'hips_wider',         label: 'My hips are wider — bottoms are always the struggle' },
      { value: 'shoulders_broader',  label: 'My shoulders are broader — tops are where things get tight' },
      { value: 'straight',           label: 'It\'s hard to tell honestly — I\'m pretty straight up and down' },
    ],
  },
  {
    id: 'q3',
    title: 'Do you have a defined waist?',
    tip: null,
    guide: null,
    options: [
      { value: 'clearly_defined',  label: 'Yes, it\'s clearly narrower — I\'ve got a visible curve there' },
      { value: 'slight_indent',    label: 'Kind of — there\'s a slight indent but nothing dramatic' },
      { value: 'not_really',       label: 'Not really — my waist and hips are pretty much the same width' },
      { value: 'fullest_middle',   label: 'My middle is actually the fullest part of me' },
    ],
  },
  {
    id: 'q4',
    title: 'How do your hips look from the front?',
    tip: null,
    guide: null,
    options: [
      { value: 'full_rounded',    label: 'Full and rounded — they have a definite curve' },
      { value: 'pretty_straight', label: 'Pretty straight — not much flare happening' },
      { value: 'wide_noticeable', label: 'Wide and noticeable — wider than everything else' },
      { value: 'changes',         label: 'Honestly it changes depending on the day' },
    ],
  },
  {
    id: 'q5',
    title: 'How do clothes usually fit you?',
    tip: null,
    guide: null,
    options: [
      { value: 'tops_fine_hips',   label: 'Tops fit fine but things always pull or gap at the hips' },
      { value: 'waistbands_swim',  label: 'Waistbands fit but I\'m swimming in the top' },
      { value: 'shoulders_loose',  label: 'Shoulders fill out but the waist and hips are loose' },
      { value: 'fits_evenly',      label: 'Most things fit pretty evenly — no one spot gives me trouble' },
      { value: 'middle_issue',     label: 'The middle is always the issue — waistbands are the enemy' },
    ],
  },
  {
    id: 'q6',
    title: 'Which best describes your silhouette when you look in the mirror?',
    tip: null,
    guide: null,
    options: [
      { value: 'hourglass_vibes', label: 'Curvy on top and bottom with a nipped in middle — classic hourglass vibes' },
      { value: 'fuller_bottom',   label: 'Fuller on the bottom, narrower up top — very bottom heavy' },
      { value: 'broader_top',     label: 'Broader up top, slimmer through the hips and legs' },
      { value: 'similar_width',   label: 'Pretty similar width all the way down — not much going on curve-wise' },
      { value: 'rounder_middle',  label: 'Rounder through the middle — that\'s where everything sits' },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

const SCORE_MAP = {
  // Q1
  evenly:           { Rectangle: 2 },
  hips_thighs:      { Pear: 2 },
  stomach:          { Apple: 2 },
  not_much:         { Rectangle: 1, InvertedTriangle: 1 },
  upper_shoulders:  { InvertedTriangle: 2 },
  // Q2
  same_width:        { Hourglass: 2, Rectangle: 1 },
  hips_wider:        { Pear: 2 },
  shoulders_broader: { InvertedTriangle: 2 },
  straight:          { Rectangle: 2 },
  // Q3
  clearly_defined: { Hourglass: 3 },
  slight_indent:   { Hourglass: 1, Pear: 1 },
  not_really:      { Rectangle: 2, InvertedTriangle: 1 },
  fullest_middle:  { Apple: 3 },
  // Q4
  full_rounded:    { Hourglass: 2, Pear: 1 },
  pretty_straight: { Rectangle: 2, InvertedTriangle: 1 },
  wide_noticeable: { Pear: 3 },
  changes:         { Rectangle: 1 },
  // Q5
  tops_fine_hips:  { Pear: 2 },
  waistbands_swim: { InvertedTriangle: 2 },
  shoulders_loose: { InvertedTriangle: 2 },
  fits_evenly:     { Rectangle: 2 },
  middle_issue:    { Apple: 3 },
  // Q6
  hourglass_vibes: { Hourglass: 3 },
  fuller_bottom:   { Pear: 2 },
  broader_top:     { InvertedTriangle: 2 },
  similar_width:   { Rectangle: 2 },
  rounder_middle:  { Apple: 2 },
}

function calculateResult(answers) {
  const totals = { Hourglass: 0, Pear: 0, InvertedTriangle: 0, Rectangle: 0, Apple: 0 }

  Object.values(answers).forEach(value => {
    const scores = SCORE_MAP[value] ?? {}
    Object.entries(scores).forEach(([type, pts]) => {
      totals[type] += pts
    })
  })

  return Object.entries(totals).reduce(
    (best, [type, pts]) => pts > best.pts ? { type, pts } : best,
    { type: 'Rectangle', pts: -1 }
  ).type
}

// ── Result content ────────────────────────────────────────────────

const RESULTS = {
  Hourglass: {
    label: 'Hourglass',
    description: 'Your shoulders and hips are balanced in width with a defined waist in between — the classic hourglass silhouette. Clothes designed to follow your natural curves tend to work best. Wrap styles, belted pieces, and fitted cuts are your friends.',
  },
  Pear: {
    label: 'Pear',
    description: 'Your hips and thighs are the fullest part of your frame, with a narrower upper body. This responds beautifully to balancing — drawing the eye upward while giving your lower half room to breathe. A-line skirts and structured tops tend to work especially well.',
  },
  InvertedTriangle: {
    label: 'Inverted Triangle',
    description: 'Your shoulders and upper body are your widest point, with slimmer hips and legs beneath. The goal is usually to soften the shoulder line and add visual weight to the lower half. Wider-leg trousers, full skirts, and V-necks tend to create a balanced look.',
  },
  Rectangle: {
    label: 'Rectangle',
    description: 'Your shoulders, waist, and hips are close in width, giving you a lean, straight silhouette with minimal curves. This is a versatile canvas — you can create shape where you want it or lean into the clean, minimal aesthetic. Belted pieces and peplum styles add definition if you want it.',
  },
  Apple: {
    label: 'Apple',
    description: 'You carry weight through your midsection and torso, with slimmer legs and arms. The goal is usually to elongate the middle and draw attention to your stronger points — your legs, décolletage, or shoulders. Empire waists, wrap tops, and monochromatic looks tend to be the most flattering.',
  },
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ resultType, onSave, onRetake, saving, saved }) {
  const result = RESULTS[resultType] ?? RESULTS.Rectangle

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your body type</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <div className={styles.resultActions}>
          {saved ? (
            <p className={styles.savedConfirmation} role="status">
              <span aria-hidden="true">✓</span> Result saved
            </p>
          ) : (
            <Button fullWidth loading={saving} onClick={onSave}>
              Save result
            </Button>
          )}

          <Button variant="ghost" fullWidth onClick={onRetake}>
            Retake quiz
          </Button>

          <Link to="/analyze" className={styles.backLink}>
            Back to Analyze
          </Link>
        </div>

      </div>
    </div>
  )
}

// ── Previous result screen ────────────────────────────────────────

function PreviousResultScreen({ resultType, onRetake }) {
  const result = RESULTS[resultType] ?? RESULTS.Rectangle

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved result</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <div className={styles.resultActions}>
          <Button variant="ghost" fullWidth onClick={onRetake}>
            Retake quiz
          </Button>
          <Link to="/analyze" className={styles.backLink}>
            Back to Analyze
          </Link>
        </div>

      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function BodyQuiz() {
  const { user } = useAuth()

  const [loading, setLoading]         = useState(true)
  const [savedResult, setSavedResult] = useState(null)   // from Supabase
  const [newResult, setNewResult]     = useState(null)   // just computed
  const [newAnswers, setNewAnswers]   = useState(null)
  const [skipPrev, setSkipPrev]       = useState(false)  // retaking from result screen
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('style_summary')
        .select('body_type')
        .eq('user_id', user.id)
        .maybeSingle()

      if (data?.body_type) setSavedResult(data.body_type)
      setLoading(false)
    }
    load()
  }, [user.id])

  function handleComplete(answers) {
    const result = calculateResult(answers)
    setNewAnswers(answers)
    setNewResult(result)
  }

  async function handleSave() {
    setSaving(true)

    const { error: attemptError } = await supabase.from('quiz_attempts').insert({
      user_id:      user.id,
      quiz_type:    'body',
      answers_json: newAnswers,
      result_json:  { type: newResult },
      is_current:   true,
    })

    if (attemptError) {
      console.error('[BodyQuiz] quiz_attempts insert error:', attemptError)
    }

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      { user_id: user.id, body_type: newResult },
      { onConflict: 'user_id' }
    )

    if (summaryError) {
      console.error('[BodyQuiz] style_summary upsert error:', summaryError)
    }

    setSaving(false)
    setSaved(true)
  }

  function handleRetakeFromResult() {
    setNewResult(null)
    setNewAnswers(null)
    setSaved(false)
    setSkipPrev(true)
  }

  if (loading) return null

  // Show newly computed result
  if (newResult) {
    return (
      <ResultScreen
        resultType={newResult}
        onSave={handleSave}
        onRetake={handleRetakeFromResult}
        saving={saving}
        saved={saved}
      />
    )
  }

  // Show previous saved result (unless user chose to retake)
  if (savedResult && !skipPrev) {
    return (
      <PreviousResultScreen
        resultType={savedResult}
        onRetake={() => setSkipPrev(true)}
      />
    )
  }

  // Show the quiz
  return (
    <QuizEngine
      questions={QUESTIONS}
      onComplete={handleComplete}
    />
  )
}
