import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import { Q1Guide, Q5Guide } from '../components/FaceGuides'
import styles from './BodyQuiz.module.css'

// ── Questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'q1',
    title: "What's the widest part of your face?",
    tip: null,
    guide: <Q1Guide />,
    options: [
      { value: 'cheekbones',    label: "My cheekbones — they're the broadest part by far" },
      { value: 'forehead_wide', label: "My forehead — it's noticeably wider than my jaw" },
      { value: 'same_all',      label: "Everything is pretty much the same width top to bottom" },
      { value: 'jaw_wide',      label: "My jaw — it's the widest and most prominent part" },
      { value: 'balanced_face', label: "It all looks pretty balanced to me" },
    ],
  },
  {
    id: 'q2',
    title: 'What does your jawline look like?',
    tip: null,
    guide: null,
    options: [
      { value: 'soft_rounded',   label: "Soft and rounded — no real angles going on" },
      { value: 'strong_angular', label: "Strong and angular — I've got pretty defined corners" },
      { value: 'tapers_point',   label: "It tapers to more of a point at the chin" },
      { value: 'narrow_tapered', label: "Narrow and quite tapered overall" },
      { value: 'in_between',     label: "Somewhere in between — not super defined but not soft either" },
    ],
  },
  {
    id: 'q3',
    title: 'How does your forehead compare to your jaw?',
    tip: null,
    guide: null,
    options: [
      { value: 'same_fj',       label: "They're about the same width" },
      { value: 'forehead_wider', label: "My forehead is wider — my face narrows toward the chin" },
      { value: 'jaw_wider',     label: "My jaw is wider — my face narrows toward the forehead" },
      { value: 'both_narrow',   label: "Both are narrow — my cheekbones are really what stand out" },
    ],
  },
  {
    id: 'q4',
    title: 'How long does your face feel compared to its width?',
    tip: null,
    guide: null,
    options: [
      { value: 'compact_round', label: "About as wide as it is long — it feels compact and rounded" },
      { value: 'much_longer',   label: "Noticeably longer than it is wide — my face is quite long" },
      { value: 'balanced_len',  label: "Pretty balanced — not too long, not too wide" },
      { value: 'long_narrow',   label: "Long and narrow — quite slim overall" },
    ],
  },
  {
    id: 'q5',
    title: 'Where do your cheekbones sit?',
    tip: null,
    guide: <Q5Guide />,
    options: [
      { value: 'high_prominent', label: "High and prominent — pretty much the first thing you notice" },
      { value: 'average_cb',     label: "Average — not super high or particularly low" },
      { value: 'not_prominent',  label: "I don't have very prominent cheekbones" },
      { value: 'wide_not_high',  label: "Wide but not particularly high — they add width more than height" },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

const SCORE_MAP = {
  cheekbones:    { Diamond: 3, Oval: 1 },
  forehead_wide: { Heart: 3, Oval: 1 },
  same_all:      { Square: 2, Oblong: 1 },
  jaw_wide:      { Square: 3 },
  balanced_face: { Oval: 2, Round: 1 },
  soft_rounded:   { Round: 3, Oval: 1 },
  strong_angular: { Square: 3 },
  tapers_point:   { Heart: 2, Oval: 1 },
  narrow_tapered: { Diamond: 2, Oval: 1 },
  in_between:     { Oval: 2 },
  same_fj:       { Square: 2, Oblong: 1 },
  forehead_wider: { Heart: 3, Oval: 1 },
  jaw_wider:     { Square: 2 },
  both_narrow:   { Diamond: 3 },
  compact_round: { Round: 3 },
  much_longer:   { Oblong: 3 },
  balanced_len:  { Oval: 2, Square: 1 },
  long_narrow:   { Oblong: 2, Diamond: 1 },
  high_prominent: { Heart: 2, Diamond: 2, Oval: 1 },
  average_cb:     { Oval: 2, Square: 1 },
  not_prominent:  { Round: 2, Oblong: 1 },
  wide_not_high:  { Round: 1, Square: 1 },
}

function calculateResult(answers) {
  const totals = { Oval: 0, Round: 0, Square: 0, Heart: 0, Oblong: 0, Diamond: 0 }

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
  Oval: {
    label: 'Oval',
    summary: 'Your face shape appears oval — naturally balanced with gently tapered proportions.',
    description: "Your face is gently balanced — slightly wider at the cheekbones, with a forehead that's marginally broader than the jaw and a softly tapered chin. Oval is the most versatile face shape, and most styles and proportions tend to work naturally with it.",
    whatThisMeans: [
      'Most necklines suit you — scoop, V, square, or crew. You can choose by outfit and personal taste rather than face shape rules.',
      'Glasses and earring shapes are largely preference here. Oval, rectangular, and cat-eye frames all sit well; long drops and hoops both work comfortably.',
      'Haircut direction can go either way — layers add length, blunt cuts add fullness. Most lengths from short to long work well on your proportions.',
    ],
  },
  Round: {
    label: 'Round',
    summary: 'Your face shape appears round — with soft, full cheeks and similar width and length.',
    description: "Your face is similar in width and length, with soft, full cheeks and a rounded jawline with minimal angles. The goal is usually to add the illusion of length and definition — angular frames, longer hairstyles, and V-necklines tend to be flattering.",
    whatThisMeans: [
      'V-necks, deep scoop necks, and open collars draw the eye downward and add the illusion of length — they tend to be especially flattering.',
      'Angular earrings — long drops, rectangles, and geometric shapes — add definition. Hoops and round studs can echo the roundness, so longer vertical styles tend to work better.',
      'Rectangular or angular glasses frames may add structure and contrast well with soft features. Side-swept fringes and long layers tend to create a flattering vertical line.',
    ],
  },
  Square: {
    label: 'Square',
    summary: 'Your face shape appears square — with a strong, angular jaw and similar width at the forehead and jaw.',
    description: "You have a strong, angular jaw that's close in width to your forehead, giving your face a structured, defined quality. Softer styles can balance the angles, while more structured looks lean into them.",
    whatThisMeans: [
      'Round and oval necklines soften the jawline — scoop, U-necks, and off-shoulder styles all work well. Very square or boxy necklines can feel heavy when the jaw is already strong.',
      'Curved earrings — hoops, teardrop shapes, and round studs — complement the angular jaw naturally. Long, delicate drops also work by drawing the eye down.',
      'Round and oval glasses frames may soften the structure of the face. Layered haircuts that fall below the jaw tend to add softness; blunt jaw-length cuts tend to emphasise the angle.',
    ],
  },
  Heart: {
    label: 'Heart',
    summary: 'Your face shape appears heart-shaped — wider at the forehead, narrowing to a pointed chin.',
    description: "Your forehead is the widest part of your face, tapering down to a narrow, often pointed chin. High cheekbones are common with this shape. The aim is usually to add visual weight to the lower half of the face.",
    whatThisMeans: [
      'Wider or off-shoulder necklines balance the broader forehead — sweetheart, boat, and wide scoop necks draw the eye down and outward effectively.',
      'Earrings that are wider at the bottom — chandelier styles, teardrop shapes, and fan drops — add visual weight below the jaw, which balances the forehead width.',
      'Round and oval frames with slightly wider bottoms may work well for glasses. Haircuts with volume below the ear — waves, layers from the chin down — tend to complement the heart shape naturally.',
    ],
  },
  Oblong: {
    label: 'Oblong',
    summary: 'Your face shape appears oblong — noticeably longer than it is wide with fairly consistent proportions throughout.',
    description: "Your face is noticeably longer than it is wide, with fairly consistent width from forehead to jaw. The goal is usually to add the illusion of width and break up the vertical length.",
    whatThisMeans: [
      'Wider necklines — boat necks, wide scoop necks, and off-shoulder styles — add width and break up the vertical length of the face effectively.',
      'Stud earrings, small hoops, and wide horizontal earring shapes add width at face level. Long drop earrings can elongate further, which tends not to be the goal.',
      'Wider glasses frames and side-swept bangs or curtain fringes help break up the length. Short to medium haircut lengths suit better than very long straight styles.',
    ],
  },
  Diamond: {
    label: 'Diamond',
    summary: 'Your face shape appears diamond — with prominent cheekbones and a narrower forehead and jaw.',
    description: "Your cheekbones are the standout feature — wide and prominent, with a narrow forehead and a tapered jaw below. The goal is usually to add width at the forehead and chin to balance the cheekbone width.",
    whatThisMeans: [
      'Wider necklines at forehead level — boat necks and straight-across necklines — help add width where the face is narrower and balance the cheekbone width.',
      'Earrings that are wider at the top — studs, small hoops, and curved drops — may add width at the forehead and jaw level. Narrow drops that point straight down can elongate rather than balance, so they may feel less harmonious.',
      'Rimless and oval frames that sit wide at the forehead work well. Haircuts with volume at the crown and jaw — layers, side-swept styles — balance the narrow top and bottom of the face.',
    ],
  },
}

// ── Intro screen ──────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className={styles.introPage}>
      <div className={styles.introContainer}>
        <div className={styles.introHeader}>
          <p className={styles.introEyebrow}>Face quiz</p>
          <h1 className={styles.introHeading}>Face shape</h1>
          <p className={styles.introBody}>
            This section helps identify your face shape so we can tailor recommendations for
            necklines, glasses frames, earring styles, and haircut direction. Answer based on
            how your face looks naturally — not how you wish it looked.
          </p>
        </div>
        <div className={styles.introActions}>
          <Button fullWidth onClick={onStart}>
            Start face quiz
          </Button>
          <Link to="/analyze">
            <Button variant="ghost" fullWidth>Back to Analyze</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ resultType, confidence, onSave, onRetake, saving, saved }) {
  const result = RESULTS[resultType] ?? RESULTS.Oval

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your face shape</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <span className={styles.confidence}>{confidence}</span>
          <p className={styles.resultSummary}>{result.summary}</p>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <div className={styles.whatThisMeans}>
          <p className={styles.sectionHeading}>What this means</p>
          <ul className={styles.meansList}>
            {result.whatThisMeans.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
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
          <Link to="/analyze/hair" className={styles.fullWidth}>
            <Button variant="ghost" fullWidth>Continue to hair quiz</Button>
          </Link>
          <button type="button" className={styles.textLink} onClick={onRetake}>
            Retake quiz
          </button>
          <Link to="/analyze" className={styles.textLink}>
            Back to Analyze
          </Link>
        </div>

      </div>
    </div>
  )
}

// ── Previous result screen ────────────────────────────────────────

function PreviousResultScreen({ resultType, onRetake }) {
  const result = RESULTS[resultType] ?? RESULTS.Oval

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved result</p>
          <h1 className={styles.resultLabel}>{result.label}</h1>
          <p className={styles.resultSummary}>{result.summary}</p>
          <p className={styles.resultDescription}>{result.description}</p>
        </div>

        <div className={styles.whatThisMeans}>
          <p className={styles.sectionHeading}>What this means</p>
          <ul className={styles.meansList}>
            {result.whatThisMeans.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>

        <div className={styles.resultActions}>
          <Link to="/analyze/hair" className={styles.fullWidth}>
            <Button variant="ghost" fullWidth>Continue to hair quiz</Button>
          </Link>
          <button type="button" className={styles.textLink} onClick={onRetake}>
            Retake quiz
          </button>
          <Link to="/analyze" className={styles.textLink}>
            Back to Analyze
          </Link>
        </div>

      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function FaceQuiz() {
  const { user } = useAuth()

  const [loading, setLoading]         = useState(true)
  const [savedResult, setSavedResult] = useState(null)
  const [newResult, setNewResult]     = useState(null)   // { type, confidence }
  const [newAnswers, setNewAnswers]   = useState(null)
  const [skipPrev, setSkipPrev]       = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('style_summary')
        .select('face_shape')
        .eq('user_id', user.id)
        .maybeSingle()

      if (data?.face_shape) setSavedResult(data.face_shape)
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
      quiz_type:    'face',
      answers_json: newAnswers,
      result_json:  { type: newResult.type, confidence: newResult.confidence },
      is_current:   true,
    })
    if (attemptError) console.error('[FaceQuiz] quiz_attempts error:', attemptError)

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      { user_id: user.id, face_shape: newResult.type },
      { onConflict: 'user_id' }
    )
    if (summaryError) console.error('[FaceQuiz] style_summary error:', summaryError)

    setSaving(false)
    setSaved(true)
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
        saving={saving}
        saved={saved}
      />
    )
  }

  if (savedResult && !skipPrev) {
    return (
      <PreviousResultScreen
        resultType={savedResult}
        onRetake={() => { setSkipPrev(true); setQuizStarted(false) }}
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
