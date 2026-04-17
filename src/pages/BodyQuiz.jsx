import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import styles from './BodyQuiz.module.css'
import ImagePlaceholder from '../components/ImagePlaceholder'

// ── Questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'q1',
    title: 'Where do you carry most of your weight?',
    tip: 'Think about your natural body — not a goal or ideal.',
    guide: null,
    options: [
      { value: 'evenly',          label: 'Pretty evenly distributed — nothing stands out' },
      { value: 'hips_thighs',     label: "Definitely in my hips and thighs — that's where everything goes" },
      { value: 'stomach',         label: 'Mostly in my stomach and midsection' },
      { value: 'not_much',        label: "Honestly I don't carry much weight anywhere" },
      { value: 'upper_shoulders', label: 'My upper body and shoulders tend to fill out first' },
    ],
  },
  {
    id: 'q2',
    title: 'How would you describe your shoulders compared to your hips?',
    tip: null,
    guide: null,
    options: [
      { value: 'same_width',        label: "They're pretty much the same width" },
      { value: 'hips_wider',        label: 'My hips are wider — bottoms are always the struggle' },
      { value: 'shoulders_broader', label: 'My shoulders are broader — tops are where things get tight' },
      { value: 'straight',          label: "It's hard to tell honestly — I'm pretty straight up and down" },
    ],
  },
  {
    id: 'q3',
    title: 'Do you have a defined waist?',
    tip: null,
    guide: null,
    options: [
      { value: 'clearly_defined', label: "Yes, it's clearly narrower — I've got a visible curve there" },
      { value: 'slight_indent',   label: "Kind of — there's a slight indent but nothing dramatic" },
      { value: 'not_really',      label: 'Not really — my waist and hips are pretty much the same width' },
      { value: 'fullest_middle',  label: 'My middle is actually the fullest part of me' },
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
      { value: 'tops_fine_hips',  label: 'Tops fit fine but things always pull or gap at the hips' },
      { value: 'waistbands_swim', label: "Waistbands fit but I'm swimming in the top" },
      { value: 'shoulders_loose', label: 'Shoulders fill out but the waist and hips are loose' },
      { value: 'fits_evenly',     label: 'Most things fit pretty evenly — no one spot gives me trouble' },
      { value: 'middle_issue',    label: 'The middle is always the issue — waistbands are the enemy' },
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
      { value: 'rounder_middle',  label: "Rounder through the middle — that's where everything sits" },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

const SCORE_MAP = {
  evenly:           { Rectangle: 2 },
  hips_thighs:      { Pear: 2 },
  stomach:          { Apple: 2 },
  not_much:         { Rectangle: 1, InvertedTriangle: 1 },
  upper_shoulders:  { InvertedTriangle: 2 },
  same_width:        { Hourglass: 2, Rectangle: 1 },
  hips_wider:        { Pear: 2 },
  shoulders_broader: { InvertedTriangle: 2 },
  straight:          { Rectangle: 2 },
  clearly_defined: { Hourglass: 3 },
  slight_indent:   { Hourglass: 1, Pear: 1 },
  not_really:      { Rectangle: 2, InvertedTriangle: 1 },
  fullest_middle:  { Apple: 3 },
  full_rounded:    { Hourglass: 2, Pear: 1 },
  pretty_straight: { Rectangle: 2, InvertedTriangle: 1 },
  wide_noticeable: { Pear: 3 },
  changes:         { Rectangle: 1 },
  tops_fine_hips:  { Pear: 2 },
  waistbands_swim: { InvertedTriangle: 2 },
  shoulders_loose: { InvertedTriangle: 2 },
  fits_evenly:     { Rectangle: 2 },
  middle_issue:    { Apple: 3 },
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

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1])
  const gap = sorted[0][1] - sorted[1][1]

  return {
    type:       sorted[0][0],
    confidence: gap >= 4 ? 'Strong match' : 'Likely match',
  }
}

// ── Result content ────────────────────────────────────────────────

const RESULTS = {
  Hourglass: {
    label:       'Hourglass',
    description: 'Your shoulders and hips are balanced in width with a defined waist in between — the classic hourglass silhouette. Clothes designed to follow your natural curves tend to work best. Wrap styles, belted pieces, and fitted cuts are your friends.',
    summary:     'Your proportions are balanced top and bottom with a clearly defined waist.',
    whatThisMeans: [
      'Clothes that follow your natural curve tend to suit you best — fitted styles, wrap dresses, and belted pieces all play to your silhouette.',
      'You can generally wear both fitted and semi-fitted styles without needing to create shape artificially.',
      "The main thing to watch is fit through the waist — standard sizing can sometimes be too loose there even when the rest fits.",
    ],
  },
  Pear: {
    label:       'Pear',
    description: 'Your hips and thighs are the fullest part of your frame, with a narrower upper body. This responds beautifully to balancing — drawing the eye upward while giving your lower half room to breathe. A-line skirts and structured tops tend to work especially well.',
    summary:     'Your proportions are lower-body dominant — your hips and thighs carry more volume than your upper body.',
    whatThisMeans: [
      'Adding visual interest above the waist — structured shoulders, bolder necklines, or statement tops — helps balance your silhouette naturally.',
      'Your lower half tends to need more room than your upper half, so separates often work better than sizing to one number.',
      'A-line and flared skirts that skim over the hips tend to be more comfortable and flattering than straight or bodycon cuts.',
    ],
  },
  InvertedTriangle: {
    label:       'Inverted Triangle',
    description: 'Your shoulders and upper body are your widest point, with slimmer hips and legs beneath. The goal is usually to soften the shoulder line and add visual weight to the lower half. Wider-leg trousers, full skirts, and V-necks tend to create a balanced look.',
    summary:     'Your proportions are upper-body dominant — your shoulders carry more width than your hips.',
    whatThisMeans: [
      'Adding volume or detail to your lower half — wide-leg trousers, full skirts, pleats — helps bring your proportions into balance.',
      "V-necks and raglan sleeves soften the shoulder line, while boat necks and structured blazers emphasise it.",
      "Your legs tend to be a strong feature — styles that show them off, like shorter hemlines or tailored trousers, can be worth exploring.",
    ],
  },
  Rectangle: {
    label:       'Rectangle',
    description: 'Your shoulders, waist, and hips are close in width, giving you a lean, straight silhouette with minimal curves. This is a versatile canvas — you can create shape where you want it or lean into the clean, minimal aesthetic. Belted pieces and peplum styles add definition if you want it.',
    summary:     'Your proportions are fairly even throughout — similar width at the shoulders, waist, and hips with minimal curve definition.',
    whatThisMeans: [
      'You have one of the most versatile silhouettes — most styles work, which gives you a lot of freedom to experiment.',
      'If you want to create the appearance of curves, belted styles, peplum tops, and high-waisted pieces all help define shape.',
      'Structured pieces with good tailoring tend to look especially clean and intentional on your frame.',
    ],
  },
  Apple: {
    label:       'Apple',
    description: 'You carry weight through your midsection and torso, with slimmer legs and arms. The goal is usually to elongate the middle and draw attention to your stronger points — your legs, décolletage, or shoulders. Empire waists, wrap tops, and monochromatic looks tend to be the most flattering.',
    summary:     'Your proportions are midsection-dominant — you carry more volume through the torso with slimmer arms and legs.',
    whatThisMeans: [
      "Drawing attention to your legs, shoulders, or décolletage may shift the focus naturally — these areas can be strong features worth highlighting.",
      'Empire waists, wrap styles, and anything that flows over the midsection rather than clinging tend to be more comfortable and flattering.',
      'Monochromatic dressing — one colour head to toe — creates an elongating effect that works especially well for your proportions.',
    ],
  },
}

// ── Result actions ────────────────────────────────────────────────

function ResultActions({ onSave, onRetake, onReset, saving, saved, resetting, continueLink, continueLinkLabel }) {
  const [confirmReset, setConfirmReset] = useState(false)

  return (
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

      <Link to={continueLink} className={styles.fullWidth}>
        <Button variant="ghost" fullWidth>{continueLinkLabel}</Button>
      </Link>

      <div className={styles.retakeBlock}>
        <Button variant="ghost" fullWidth onClick={onRetake}>Retake quiz</Button>
      </div>

      {confirmReset ? (
        <div className={styles.resetConfirm}>
          <p className={styles.resetConfirmText}>
            Resetting removes your current result so you can start this section fresh. Your previous results are never deleted.
          </p>
          <Button variant="destructive" fullWidth loading={resetting} onClick={onReset}>
            Yes, reset this section
          </Button>
          <button type="button" className={styles.textLink} onClick={() => setConfirmReset(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.resetBlock}>
          <button type="button" className={styles.textLink} onClick={() => setConfirmReset(true)}>
            Reset this section
          </button>
        </div>
      )}

      <Link to="/analyze" className={styles.textLink}>
        Back to Analyze
      </Link>
    </div>
  )
}

function PreviousResultActions({ onRetake, onReset, resetting, continueLink, continueLinkLabel }) {
  const [confirmReset, setConfirmReset] = useState(false)

  return (
    <div className={styles.resultActions}>
      <Link to={continueLink} className={styles.fullWidth}>
        <Button variant="ghost" fullWidth>{continueLinkLabel}</Button>
      </Link>

      <div className={styles.retakeBlock}>
        <Button variant="ghost" fullWidth onClick={onRetake}>Retake quiz</Button>
      </div>

      {confirmReset ? (
        <div className={styles.resetConfirm}>
          <p className={styles.resetConfirmText}>
            Resetting removes your current result so you can start this section fresh. Your previous results are never deleted.
          </p>
          <Button variant="destructive" fullWidth loading={resetting} onClick={onReset}>
            Yes, reset this section
          </Button>
          <button type="button" className={styles.textLink} onClick={() => setConfirmReset(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className={styles.resetBlock}>
          <button type="button" className={styles.textLink} onClick={() => setConfirmReset(true)}>
            Reset this section
          </button>
        </div>
      )}

      <Link to="/analyze" className={styles.textLink}>
        Back to Analyze
      </Link>
    </div>
  )
}

// ── Intro screen ──────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className={styles.introPage}>
      <div className={styles.introContainer}>
        <div className={styles.introHeader}>
          <p className={styles.introEyebrow}>Body quiz</p>
          <h1 className={styles.introHeading}>Body proportions</h1>
          <p className={styles.introBody}>
            This section helps identify your proportions and shape balance so we can recommend
            silhouettes that tend to work especially well for you. There are no wrong answers —
            just honest ones.
          </p>
        </div>
        <div className={styles.introActions}>
          <Button fullWidth onClick={onStart}>
            Start body quiz
          </Button>
          <Link to="/analyze">
            <Button variant="ghost" fullWidth>
              Back to Analyze
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ resultType, confidence, onSave, onRetake, onReset, saving, saved, resetting }) {
  const result = RESULTS[resultType] ?? RESULTS.Rectangle

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your body type</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <span className={styles.confidence}>{confidence}</span>
          <p className={styles.resultSummary}>{result.summary}</p>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <ImagePlaceholder result={result.label} />

        <div className={styles.whatThisMeans}>
          <p className={styles.sectionHeading}>What this means</p>
          <ul className={styles.meansList}>
            {result.whatThisMeans.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <ResultActions
          onSave={onSave}
          onRetake={onRetake}
          onReset={onReset}
          saving={saving}
          saved={saved}
          resetting={resetting}
          continueLink="/analyze/face"
          continueLinkLabel="Continue to face quiz"
        />

      </div>
    </div>
  )
}

// ── Previous result screen ────────────────────────────────────────

function PreviousResultScreen({ resultType, onRetake, onReset, resetting }) {
  const result = RESULTS[resultType] ?? RESULTS.Rectangle

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved result</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultSummary}>{result.summary}</p>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <ImagePlaceholder result={result.label} />

        <div className={styles.whatThisMeans}>
          <p className={styles.sectionHeading}>What this means</p>
          <ul className={styles.meansList}>
            {result.whatThisMeans.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <PreviousResultActions
          onRetake={onRetake}
          onReset={onReset}
          resetting={resetting}
          continueLink="/analyze/face"
          continueLinkLabel="Continue to face quiz"
        />

      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function BodyQuiz() {
  const { user } = useAuth()

  const [loading, setLoading]         = useState(true)
  const [savedResult, setSavedResult] = useState(null)
  const [newResult, setNewResult]     = useState(null)   // { type, confidence }
  const [newAnswers, setNewAnswers]   = useState(null)
  const [skipPrev, setSkipPrev]       = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)
  const [resetting, setResetting]     = useState(false)

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

    // Mark all previous body attempts as not current
    await supabase
      .from('quiz_attempts')
      .update({ is_current: false })
      .eq('user_id', user.id)
      .eq('quiz_type', 'body')
      .eq('is_current', true)

    const { error: attemptError } = await supabase.from('quiz_attempts').insert({
      user_id:      user.id,
      quiz_type:    'body',
      answers_json: newAnswers,
      result_json:  { type: newResult.type, confidence: newResult.confidence },
      is_current:   true,
    })
    if (attemptError) { console.error('[BodyQuiz] quiz_attempts error:', attemptError); setSaving(false); return }

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      { user_id: user.id, body_type: newResult.type },
      { onConflict: 'user_id' }
    )
    if (summaryError) console.error('[BodyQuiz] style_summary error:', summaryError)

    setSaving(false)
    setSaved(true)
  }

  async function handleReset() {
    setResetting(true)

    await supabase
      .from('quiz_attempts')
      .update({ is_current: false })
      .eq('user_id', user.id)
      .eq('quiz_type', 'body')

    await supabase.from('style_summary').upsert(
      { user_id: user.id, body_type: null },
      { onConflict: 'user_id' }
    )

    setSavedResult(null)
    setNewResult(null)
    setNewAnswers(null)
    setSaved(false)
    setSkipPrev(false)
    setQuizStarted(false)
    setResetting(false)
  }

  function handleRetakeFromResult() {
    setNewResult(null)
    setNewAnswers(null)
    setSaved(false)
    setSkipPrev(true)
    setQuizStarted(true)
  }

  if (loading) return null

  if (newResult) {
    return (
      <ResultScreen
        resultType={newResult.type}
        confidence={newResult.confidence}
        onSave={handleSave}
        onRetake={handleRetakeFromResult}
        onReset={handleReset}
        saving={saving}
        saved={saved}
        resetting={resetting}
      />
    )
  }

  if (savedResult && !skipPrev) {
    return (
      <PreviousResultScreen
        resultType={savedResult}
        onRetake={() => { setSkipPrev(true); setQuizStarted(false) }}
        onReset={handleReset}
        resetting={resetting}
      />
    )
  }

  if (!quizStarted) {
    return <IntroScreen onStart={() => setQuizStarted(true)} />
  }

  return (
    <QuizEngine
      questions={QUESTIONS}
      onComplete={handleComplete}
    />
  )
}
