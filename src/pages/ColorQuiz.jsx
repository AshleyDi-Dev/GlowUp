import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import styles from './ColorQuiz.module.css'

// ── Questions ────────────────────────────────────────────────────

const HAIR_COLOR_NOTE = (
  <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-body)', padding: 'var(--space-md)', background: 'var(--color-accent-muted)', borderRadius: 'var(--radius-md)' }}>
    Note: if you've recently colored your hair, your results may shift slightly. You can retake this section anytime your hair changes.
  </p>
)

const QUESTIONS = [
  {
    id: 'q1',
    title: 'When you wear gold or silver jewelry near your face, which tends to look more natural?',
    tip: null,
    guide: null,
    options: [
      { value: 'gold_better',   label: 'Gold — it looks warm and harmonious against my skin' },
      { value: 'silver_better', label: 'Silver — it looks crisp and right against my skin' },
      { value: 'both_metal',    label: "Honestly both look fine, I can't tell a difference" },
    ],
  },
  {
    id: 'q2',
    title: 'Look at the veins on the inside of your wrist in natural light. What color are they?',
    tip: 'Check in daylight — artificial light can shift the colour.',
    guide: null,
    options: [
      { value: 'bluish_purple', label: 'Bluish or purple — quite cool toned' },
      { value: 'greenish',      label: 'Greenish — quite warm toned' },
      { value: 'mix_veins',     label: "A mix of both — I honestly can't tell" },
    ],
  },
  {
    id: 'q3',
    title: 'When you wear white and cream next to your face, which is more flattering?',
    tip: null,
    guide: null,
    options: [
      { value: 'bright_white', label: 'Bright white — it makes me look fresh and alive' },
      { value: 'cream_white',  label: 'Cream or off-white — bright white washes me out' },
      { value: 'both_whites',  label: 'Both work pretty well honestly' },
      { value: 'q3_idk',       label: "I'm not sure", escape: true },
    ],
  },
  {
    id: 'q4',
    title: 'Think about a time you got complimented on how you look. What were you wearing?',
    tip: null,
    guide: null,
    options: [
      { value: 'cool_compliment', label: 'Something cool toned — blues, pinks, purples, or grey' },
      { value: 'warm_compliment', label: 'Something warm toned — oranges, browns, yellows, or olive' },
      { value: 'both_compliment', label: 'I honestly get compliments in both' },
      { value: 'q4_idk',          label: "I'm not sure", escape: true },
    ],
  },
  {
    id: 'q5',
    title: 'What color are your eyes?',
    tip: null,
    guide: null,
    options: [
      { value: 'eyes_light_blue', label: 'Light blue or grey' },
      { value: 'eyes_green',      label: 'Green or hazel' },
      { value: 'eyes_light_brown',label: 'Light brown or amber' },
      { value: 'eyes_dark_brown', label: 'Dark brown' },
      { value: 'eyes_very_dark',  label: 'Very dark, almost black' },
    ],
  },
  {
    id: 'q6',
    title: 'How would you describe your overall coloring — skin, hair, and eyes together?',
    tip: null,
    guide: null,
    options: [
      { value: 'very_light',     label: 'Very light overall — fair skin, light hair, light eyes' },
      { value: 'medium_overall', label: "Medium — I'm not particularly light or dark" },
      { value: 'deep_overall',   label: 'Deep overall — dark skin, dark hair, dark eyes' },
      { value: 'high_contrast',  label: 'I have a lot of contrast — one feature is very light and another very dark' },
    ],
  },
  {
    id: 'q7',
    title: 'What happens to your skin in the sun?',
    tip: null,
    guide: null,
    options: [
      { value: 'burns_fair', label: "I burn easily and rarely tan — I'm quite fair" },
      { value: 'tan_golden', label: 'I tan gradually and golden' },
      { value: 'tan_deeply', label: 'I tan quickly and deeply — my skin gets very dark' },
      { value: 'deep_skin',  label: "I have deeper skin that rarely burns" },
      { value: 'q7_idk',     label: "I'm not sure", escape: true },
    ],
  },
  {
    id: 'q8',
    title: 'How much contrast is there between your skin, hair, and eyes?',
    tip: null,
    guide: null,
    options: [
      { value: 'very_little_c', label: 'Very little — everything is similar in tone and depth' },
      { value: 'moderate_c',    label: "Moderate — there's some difference but nothing dramatic" },
      { value: 'high_c',        label: "High — there's a striking difference between my features" },
      { value: 'q8_idk',        label: "I'm not sure", escape: true },
    ],
  },
  {
    id: 'q9',
    title: 'Which of these best describes how you look in bold bright colors?',
    tip: null,
    guide: null,
    options: [
      { value: 'overwhelm',    label: 'They overwhelm me — I look better in softer muted tones' },
      { value: 'suit_well',    label: 'They suit me perfectly — I can carry a bold color easily' },
      { value: 'depends_bold', label: "Depends on the color — some bold shades work, others don't" },
      { value: 'q9_idk',       label: "I'm not sure", escape: true },
    ],
  },
  {
    id: 'q10',
    title: 'When you wear dark colors near your face versus light colors, which tends to be more flattering?',
    tip: null,
    guide: HAIR_COLOR_NOTE,
    options: [
      { value: 'dark_better',  label: 'Dark colors — they make me look more defined and awake' },
      { value: 'light_better', label: 'Light colors — they make me look fresh and open' },
      { value: 'both_depth',   label: 'Both work about the same for me' },
      { value: 'q10_idk',      label: "I'm not sure", escape: true },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

// ── Scoring ──────────────────────────────────────────────────────
//
// Axis 1 — Warm vs Cool
//   Each answer votes +1 warm or +1 cool. Ties broken by jewelry
//   preference (q1) and eye color (q5), which are the strongest
//   physical indicators.
//
// Axis 2 — Depth (light → deep) and Contrast (low → high)
//   These narrow the quadrant to a specific season.
//
//   Warm + light/medium depth + low/medium contrast  → Spring
//   Cool + light/medium depth + low/medium contrast  → Summer
//   Warm + medium/deep depth  + low/medium contrast  → Autumn
//   Cool + medium/deep depth  + high contrast        → Winter

// Maps each answer value to its warm/cool vote (positive = warm, negative = cool, 0 = neutral).
// Weighted so the strongest indicators (jewelry, veins, eye color) count more.
const WARMTH = {
  // Q1 — jewelry (strong indicator, weight 2)
  gold_better:   2,
  silver_better: -2,
  both_metal:    0,
  // Q2 — veins (strong indicator, weight 2)
  bluish_purple: -2,
  greenish:       2,
  mix_veins:      0,
  // Q3 — white vs cream (weight 1)
  bright_white: -1,
  cream_white:   1,
  both_whites:   0,
  // Q4 — compliment colors (weight 1)
  cool_compliment: -1,
  warm_compliment:  1,
  both_compliment:  0,
  // Q5 — eye color (strong indicator, weight 2)
  eyes_light_blue:   -2,
  eyes_green:        -1,
  eyes_light_brown:   1,
  eyes_dark_brown:    1,
  eyes_very_dark:     0,  // dark eyes appear in both deep warm and deep cool
}

// Maps each answer value to a depth score: 0 = light, 1 = medium, 2 = deep.
const DEPTH = {
  // Q6 — overall coloring
  very_light:     0,
  medium_overall: 1,
  deep_overall:   2,
  high_contrast:  1,  // high contrast often reads as medium depth overall
  // Q7 — sun reaction
  burns_fair: 0,
  tan_golden: 1,
  tan_deeply: 2,
  deep_skin:  2,
}


const IDK_VALUES = new Set(['q3_idk', 'q4_idk', 'q7_idk', 'q8_idk', 'q9_idk', 'q10_idk'])

// Returns true if the user answered "I'm not sure" on 4 or more of the 6 eligible questions.
function isLowConfidence(answers) {
  const idkCount = Object.values(answers).filter(v => IDK_VALUES.has(v)).length
  return idkCount >= 4
}

function calculateResult(answers) {
  const vals = Object.values(answers)

  // ── Axis 1: warmth ────────────────────────────────────────────
  const warmthScore = vals.reduce((sum, v) => sum + (WARMTH[v] ?? 0), 0)

  let isWarm
  if (warmthScore !== 0) {
    isWarm = warmthScore > 0
  } else {
    // Tie — use jewelry (q1) then eye color (q5) as tiebreakers
    const jewelry  = answers.q1
    const eyes     = answers.q5
    const jewelryW = WARMTH[jewelry] ?? 0
    const eyesW    = WARMTH[eyes]    ?? 0
    const tiebreak = jewelryW !== 0 ? jewelryW : eyesW
    isWarm = tiebreak >= 0  // default to warm if all tiebreakers are neutral
  }

  // ── Axis 2: depth ─────────────────────────────────────────────
  const depthVals = vals.filter(v => DEPTH[v] !== undefined)
  const depthScore = depthVals.length
    ? depthVals.reduce((sum, v) => sum + DEPTH[v], 0) / depthVals.length
    : 1  // default to medium
  const isDeep = depthScore >= 1.2  // above medium tips into deep

  // ── Confidence — based on strength of the warmth signal ───────
  const confidence = Math.abs(warmthScore) >= 4 ? 'Strong match' : 'Likely match'

  // ── Season resolution ─────────────────────────────────────────
  let season
  if (isWarm && !isDeep)                   season = 'Spring'
  else if (!isWarm && !isDeep)             season = 'Summer'
  else if (isWarm && isDeep)               season = 'Autumn'
  else if (!isWarm && isDeep)              season = 'Winter'
  else                                     season = 'Summer'  // unreachable fallback

  return { season, confidence }
}

// ── Result content ────────────────────────────────────────────────

const RESULTS = {
  Spring: {
    heading:     'Your palette leans warm and clear',
    seasonLabel: 'Spring palette',
    palette: ['#E8705A', '#F5A07A', '#FBE8C8', '#F5C840', '#60C4A8', '#90C870', '#C8956A'],
    workWell: [
      'Clear warm tones like coral, peach, and warm salmon may make your features look more open and alive.',
      'Golden yellows, warm creams, and light camel worn close to the face may add a natural warmth and glow.',
      'Clear aquas and warm turquoise tones may work surprisingly well — the brightness in these shades tends to complement rather than compete.',
    ],
    lessHarmonious: [
      'Very dark shades like black or dark charcoal near the face may feel heavy or harsh against your colouring.',
      'Cool-based pinks, icy pastels, and heavy muted tones may mute your natural brightness rather than enhance it.',
    ],
    teaser: 'True Spring or Light Spring?',
  },
  Summer: {
    heading:     'Your palette leans soft and cool',
    seasonLabel: 'Summer palette',
    palette: ['#C47888', '#B0A0C8', '#B8B4BE', '#A89890', '#9AB4C8', '#9A6888', '#F4F0F4'],
    workWell: [
      'Dusty and softened cool tones — muted rose, lavender, powder blue, and soft mauve — may flatter you most when worn near your face.',
      'Charcoal, cool taupe, and blue-grey may work better than stark black as neutrals, keeping the overall look soft and harmonious.',
      'Dusty berry, softened lavender, and muted cool tones may bring out the cool clarity in your features without overwhelming them.',
    ],
    lessHarmonious: [
      'Very warm oranges, rusts, and olive greens near your face may feel less harmonious — they can draw colour away from your features.',
      'Highly saturated brights or strong black-and-white contrast may overpower the natural softness of your colouring.',
    ],
    teaser: 'Light Summer or Soft Summer?',
  },
  Autumn: {
    heading:     'Your palette leans warm and muted',
    seasonLabel: 'Autumn palette',
    palette: ['#C05840', '#C87038', '#848030', '#986040', '#B84830', '#C8A030', '#386858'],
    workWell: [
      'Earthy warm tones like terracotta, burnt orange, rust, and camel may look richly harmonious against your colouring.',
      'Olive, dark teal, and warm khaki may ground your look in a way that cool or bright greens rarely achieve for you.',
      'Warm mustard, deep warm brown, and muted brick red may add depth without feeling harsh or overly saturated.',
    ],
    lessHarmonious: [
      'Icy pastels and cool-based pinks or lavenders may feel flat or slightly off near your face — the cool undertone can clash with your natural warmth.',
      'Extremely bright or clear shades may feel less harmonious than their muted counterparts — warmth and softness tend to suit you more than high clarity.',
    ],
    teaser: 'Soft Autumn or Deep Autumn?',
  },
  Winter: {
    heading:     'Your palette leans cool and bold',
    seasonLabel: 'Winter palette',
    palette: ['#CC2040', '#1840AA', '#0A8040', '#0A0A0A', '#F8F8F8', '#7A1090', '#E01888'],
    workWell: [
      'Bold, clear cool tones — true red, cobalt blue, and emerald — may look striking and intentional rather than overwhelming against your colouring.',
      'Strong neutrals like black and pure white may sit very naturally near your face, especially when worn with intention.',
      'Deep jewel tones and cool-based brights like deep plum and hot pink may give your look a clarity that softer or muted shades don\'t quite achieve.',
    ],
    lessHarmonious: [
      'Warm oranges, peachy tones, and golden yellows near the face may feel less harmonious — they can muddy rather than enhance your natural contrast.',
      'Heavily muted or earthy shades may soften your contrast in a way that feels dull rather than polished.',
    ],
    teaser: 'True Winter or Deep Winter?',
  },
}

// ── Palette swatch strip ──────────────────────────────────────────

function PaletteStrip({ colors }) {
  return (
    <div className={styles.paletteStrip}>
      {colors.map(hex => (
        <div
          key={hex}
          className={styles.swatch}
          style={{ backgroundColor: hex }}
          aria-label={hex}
        />
      ))}
    </div>
  )
}

// ── Upgrade teaser ────────────────────────────────────────────────

function UpgradeTeaser({ seasonLabel }) {
  return (
    <div className={styles.teaser}>
      <div className={styles.teaserLockRow}>
        <span className={styles.teaserLockIcon} aria-hidden="true">⊘</span>
        <p className={styles.teaserEyebrow}>Want to go deeper?</p>
      </div>
      <p className={styles.teaserBody}>
        Your full 12-season analysis gives you a precise subtype — like{' '}
        <em>Soft Autumn</em> or <em>Deep Winter</em> — with a more tailored palette.
      </p>
      <div className={styles.teaserPreview} aria-hidden="true">
        <span className={styles.teaserPreviewPill}>Soft {seasonLabel?.replace(' palette', '')}</span>
        <span className={styles.teaserPreviewPill}>True {seasonLabel?.replace(' palette', '')}</span>
        <span className={styles.teaserPreviewPill}>Deep {seasonLabel?.replace(' palette', '')}</span>
      </div>
      <Button variant="ghost" disabled>
        Coming soon
      </Button>
    </div>
  )
}

// ── Shared result content ─────────────────────────────────────────

function ResultContent({ result }) {
  return (
    <>
      <PaletteStrip colors={result.palette} />

      <div className={styles.guidance}>
        <div className={styles.guidanceBlock}>
          <p className={styles.guidanceHeading}>May work well</p>
          <ul className={styles.guidanceList}>
            {result.workWell.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.guidanceBlock}>
          <p className={styles.guidanceHeading}>May feel less harmonious</p>
          <ul className={styles.guidanceList}>
            {result.lessHarmonious.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ season, onSave, onRetake, saving, saved, lowConfidence }) {
  const result = RESULTS[season] ?? RESULTS.Summer

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your color analysis</p>
          <h1 className={styles.resultLabel}>{result.heading}</h1>
          <p className={styles.resultSeasonLabel}>{result.seasonLabel}</p>
        </div>

        <ResultContent result={result} />

        {lowConfidence && (
          <p className={styles.lowConfidenceNote}>
            Your result is our best read based on your answers — color analysis can be tricky to self-assess. You can always retake this as you learn more about your coloring.
          </p>
        )}

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
          <button type="button" className={styles.hairResetLink} onClick={onRetake}>
            Changed your hair color? Retake this section to update your palette.
          </button>
          <Link to="/analyze" className={styles.textLink}>
            Back to Analyze
          </Link>
        </div>

        <UpgradeTeaser seasonLabel={result.seasonLabel} />

      </div>
    </div>
  )
}

function PreviousResultScreen({ season, onRetake }) {
  const result = RESULTS[season] ?? RESULTS.Summer

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved color analysis</p>
          <h1 className={styles.resultLabel}>{result.heading}</h1>
          <p className={styles.resultSeasonLabel}>{result.seasonLabel}</p>
        </div>

        <ResultContent result={result} />

        <div className={styles.resultActions}>
          <Button variant="ghost" fullWidth onClick={onRetake}>
            Retake quiz
          </Button>
          <button type="button" className={styles.hairResetLink} onClick={onRetake}>
            Changed your hair color? Retake this section to update your palette.
          </button>
          <Link to="/analyze" className={styles.textLink}>
            Back to Analyze
          </Link>
        </div>

        <UpgradeTeaser seasonLabel={result.seasonLabel} />

      </div>
    </div>
  )
}

// ── Intro screen ─────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className={styles.introPage}>
      <div className={styles.introContainer}>
        <div className={styles.introHeader}>
          <p className={styles.introEyebrow}>Color quiz</p>
          <h1 className={styles.introHeading}>Color analysis</h1>
          <p className={styles.introBody}>
            This section helps identify the kinds of colors that may make your features
            look clearer, brighter, and more harmonious.
          </p>
        </div>
        <div className={styles.introActions}>
          <Button fullWidth onClick={onStart}>
            Start color quiz
          </Button>
          <Link to="/analyze">
            <Button variant="ghost" fullWidth>Back to Analyze</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function ColorQuiz() {
  const { user } = useAuth()

  const [loading, setLoading]         = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const [savedResult, setSavedResult] = useState(null)
  const [newResult, setNewResult]     = useState(null)
  const [newAnswers, setNewAnswers]   = useState(null)
  const [skipPrev, setSkipPrev]       = useState(false)
  const [saving, setSaving]           = useState(false)
  const [saved, setSaved]             = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('style_summary')
        .select('color_season')
        .eq('user_id', user.id)
        .maybeSingle()

      if (data?.color_season) setSavedResult(data.color_season)
      setLoading(false)
    }
    load()
  }, [user.id])

  function handleComplete(answers) {
    const season = calculateResult(answers)
    setNewAnswers(answers)
    setNewResult(season)
  }

  async function handleSave() {
    setSaving(true)

    const { error: attemptError } = await supabase.from('quiz_attempts').insert({
      user_id:      user.id,
      quiz_type:    'color',
      answers_json: newAnswers,
      result_json:  { season: newResult },
      is_current:   true,
    })
    if (attemptError) console.error('[ColorQuiz] quiz_attempts error:', attemptError)

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      { user_id: user.id, color_season: newResult },
      { onConflict: 'user_id' }
    )
    if (summaryError) console.error('[ColorQuiz] style_summary error:', summaryError)

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

  if (newResult) {
    return (
      <ResultScreen
        season={newResult}
        onSave={handleSave}
        onRetake={handleRetakeFromResult}
        saving={saving}
        saved={saved}
        lowConfidence={newAnswers ? isLowConfidence(newAnswers) : false}
      />
    )
  }

  if (savedResult && !skipPrev) {
    return (
      <PreviousResultScreen
        season={savedResult}
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
