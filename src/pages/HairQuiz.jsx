import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import QuizEngine from '../components/QuizEngine'
import Button from '../components/Button'
import { HairTextureGuide } from '../components/HairGuide'
import styles from './HairQuiz.module.css'

// ── Shared options ───────────────────────────────────────────────

const COLOR_OPTIONS = [
  { value: 'col_black',       label: 'Black' },
  { value: 'col_dark_brown',  label: 'Dark brown' },
  { value: 'col_med_brown',   label: 'Medium brown' },
  { value: 'col_light_brown', label: 'Light brown' },
  { value: 'col_blonde',      label: 'Blonde' },
  { value: 'col_red',         label: 'Red' },
  { value: 'col_auburn',      label: 'Auburn' },
  { value: 'col_grey',        label: 'Grey' },
  { value: 'col_white',       label: 'White' },
  { value: 'col_treated',     label: 'Colour treated' },
]

// ── Questions ────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'q1',
    title: 'How does your hair dry naturally with no products?',
    tip: null,
    guide: <HairTextureGuide />,
    options: [
      { value: 'tex_straight', label: 'Completely straight — no wave or curl at all' },
      { value: 'tex_wavy',     label: 'It gets a little wavy or forms a loose S shape' },
      { value: 'tex_curly',    label: 'It curls up into defined ringlets or spirals' },
      { value: 'tex_coily',    label: 'It shrinks up and coils tightly — very curly' },
    ],
  },
  {
    id: 'q2',
    title: 'What does a single strand of your hair do when you hold it up?',
    tip: null,
    guide: <HairTextureGuide />,
    options: [
      { value: 'str_straight', label: 'Falls completely straight' },
      { value: 'str_wavy',     label: 'Has a slight bend or gentle wave' },
      { value: 'str_curly',    label: 'Curves into a definite curl or loop' },
      { value: 'str_coily',    label: 'Coils or zigzags immediately' },
    ],
  },
  {
    id: 'q3',
    title: 'When you pull your hair into a ponytail, how thick does it feel?',
    tip: null,
    guide: null,
    options: [
      { value: 'den_fine',   label: 'Pretty thin — I can wrap the hair tie around many times' },
      { value: 'den_medium', label: 'Medium — a couple of wraps feels right' },
      { value: 'den_thick',  label: 'Thick — I can barely get the hair tie around twice' },
    ],
  },
  {
    id: 'q4',
    title: 'When your hair is down, can you see your scalp easily?',
    tip: null,
    guide: null,
    options: [
      { value: 'sca_easily',  label: 'Yes, pretty easily even without parting it' },
      { value: 'sca_parting', label: 'Only if I part it or look closely' },
      { value: 'sca_notatal', label: 'Not at all — my hair is very full' },
    ],
  },
  {
    id: 'q5',
    title: 'How would you describe the thickness of a single strand of your hair?',
    tip: 'Try this → Pull out a single strand and hold it between your fingers. You can also lay it on a white surface and compare it to a piece of thread.',
    guide: null,
    options: [
      { value: 'sth_fine',   label: 'Fine — individual strands are very thin, almost invisible' },
      { value: 'sth_medium', label: 'Medium — strands are neither particularly thin nor thick' },
      { value: 'sth_coarse', label: 'Coarse — strands are thick and strong, very noticeable' },
    ],
  },
  {
    id: 'q6',
    title: 'When you wet your hair in the shower, how quickly does it absorb water?',
    tip: 'Try this → Drop a single clean hair (no product) into a glass of water and wait 2 minutes. Floats at the top → Low porosity. Sinks slowly to the middle → Medium porosity. Sinks straight to the bottom → High porosity.',
    guide: null,
    options: [
      { value: 'por_low',    label: 'It takes a while — water kind of sits on top before soaking in' },
      { value: 'por_medium', label: 'Pretty quickly — normal absorption' },
      { value: 'por_high',   label: 'Immediately — my hair soaks up water really fast' },
    ],
  },
  {
    id: 'q7',
    title: 'How does your hair feel after it dries without any products?',
    tip: null,
    guide: null,
    options: [
      { value: 'feel_low',    label: 'Smooth and a little stiff — products sit on top rather than soaking in' },
      { value: 'feel_medium', label: 'Normal — not particularly dry or frizzy' },
      { value: 'feel_high',   label: 'Dry, frizzy, or thirsty feeling — it drinks up product fast' },
    ],
  },
  {
    id: 'q8',
    title: 'How long does your hair take to dry naturally?',
    tip: null,
    guide: null,
    options: [
      { value: 'dry_low',    label: 'Ages — it stays wet for hours' },
      { value: 'dry_medium', label: 'Average — a couple of hours' },
      { value: 'dry_high',   label: 'Really quickly — it dries fast' },
    ],
  },
  {
    id: 'q9',
    title: 'What is your current hair color?',
    tip: null,
    guide: null,
    options: COLOR_OPTIONS,
  },
  {
    id: 'q10',
    title: 'What is your natural hair color?',
    tip: null,
    guide: null,
    optional: true,
    options: [
      { value: 'nat_same',        label: 'Same as current' },
      ...COLOR_OPTIONS,
    ],
  },
  {
    id: 'q11',
    title: 'How would you describe your hair day to day?',
    tip: null,
    guide: null,
    options: [
      { value: 'sty_dry',      label: 'Tends to get dry and frizzy — needs moisture' },
      { value: 'sty_oily',     label: 'Gets oily quickly — needs frequent washing' },
      { value: 'sty_balanced', label: 'Pretty balanced — not particularly dry or oily' },
      { value: 'sty_frizzy',   label: 'Frizzy in humidity but not dry overall' },
    ],
  },
  {
    id: 'q12',
    title: 'Does your hair hold styles well?',
    tip: null,
    guide: null,
    options: [
      { value: 'hld_poor',   label: 'Not really — styles drop within an hour or two' },
      { value: 'hld_medium', label: 'Somewhat — holds for a while but falls eventually' },
      { value: 'hld_good',   label: 'Yes — styles stay put all day without much effort' },
    ],
  },
]

// ── Scoring ──────────────────────────────────────────────────────

const TEXTURE_MAP = {
  tex_straight: 'Straight', str_straight: 'Straight',
  tex_wavy:     'Wavy',     str_wavy:     'Wavy',
  tex_curly:    'Curly',    str_curly:    'Curly',
  tex_coily:    'Coily',    str_coily:    'Coily',
}

const DENSITY_MAP = {
  den_fine:    'Fine',   sca_easily:  'Fine',   sth_fine:   'Fine',
  den_medium:  'Medium', sca_parting: 'Medium', sth_medium: 'Medium',
  den_thick:   'Thick',  sca_notatal: 'Thick',  sth_coarse: 'Thick',
}

const POROSITY_MAP = {
  por_low:    'Low',    feel_low:    'Low',    dry_low:    'Low',
  por_medium: 'Medium', feel_medium: 'Medium', dry_medium: 'Medium',
  por_high:   'High',   feel_high:   'High',   dry_high:   'High',
}

function tally(answers, map) {
  const counts = {}
  Object.values(answers).forEach(v => {
    const result = map[v]
    if (result) counts[result] = (counts[result] ?? 0) + 1
  })
  return Object.entries(counts).reduce(
    (best, [type, n]) => n > best.n ? { type, n } : best,
    { type: Object.values(map)[0], n: -1 }
  ).type
}

function calculateResult(answers) {
  return {
    texture:         tally(answers, TEXTURE_MAP),
    density:         tally(answers, DENSITY_MAP),
    porosity:        tally(answers, POROSITY_MAP),
    currentColor:    answers.q9  ?? null,
    naturalColor:    answers.q10 ?? null,
    stylingTendency: answers.q11 ?? null,
    styleHold:       answers.q12 ?? null,
  }
}

// ── Result content ────────────────────────────────────────────────

const TEXTURE_INFO = {
  Straight: 'Your hair grows without any natural curl pattern. It tends to be shinier (natural oils travel easily down the shaft) but can feel limp or oily faster. Volume and lightweight products work well.',
  Wavy:     'Your hair has a natural S-wave pattern — not fully straight but not ringlets either. It tends to frizz in humidity and responds well to enhancing the wave rather than fighting it.',
  Curly:    'Your hair forms defined ringlets or spirals. Moisture is key — curly hair tends to be drier because oils struggle to travel down the curl. Define-and-seal methods work best.',
  Coily:    'Your hair has a tight coil or zigzag pattern and shrinks significantly when dry. It needs consistent moisture, gentle handling, and protective styles to retain length.',
}

const DENSITY_INFO = {
  Fine:   'You have fewer individual hair strands overall. Fine hair can look flat easily and benefits from volumising products, lighter formulas, and avoiding heavy conditioning near the roots.',
  Medium: 'Your hair density is in the middle ground — versatile and the easiest density to work with. Most products and styles will suit you without much adjustment.',
  Thick:  'You have a high number of hair strands, giving you a full, substantial head of hair. Heavier products won\'t weigh your hair down, and you can carry off voluminous styles easily.',
}

const POROSITY_INFO = {
  Low:    'Your hair cuticle lies flat and resists absorbing moisture — which means it also resists losing it. Use heat when conditioning to help products penetrate, and opt for lighter, water-based formulas.',
  Medium: 'Your hair cuticle is balanced — it absorbs and retains moisture well. Most products work for you, and your hair tends to be healthy and manageable with regular care.',
  High:   'Your hair cuticle is more open, absorbing moisture quickly but losing it just as fast. Seal moisture in with heavier creams or oils after washing, and use protein treatments to strengthen the cuticle.',
}

// ── Intro screen ─────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className={styles.introPage}>
      <div className={styles.introContainer}>
        <div className={styles.introHeader}>
          <p className={styles.introEyebrow}>Hair quiz</p>
          <h1 className={styles.introHeading}>Hair profile</h1>
          <p className={styles.introBody}>
            Hair can change over time — colour, texture, length. So you'll be able to reset
            and update this section whenever you need to.
          </p>
        </div>
        <div className={styles.introActions}>
          <Button fullWidth onClick={onStart}>
            Start hair quiz
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

function ResultScreen({ result, onSave, onRetake, saving, saved }) {
  const { texture, density, porosity } = result

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your hair profile</p>
          <h1 className={styles.resultCombo}>
            {texture}
            <span className={styles.dot} aria-hidden="true">·</span>
            {density}
            <span className={styles.dot} aria-hidden="true">·</span>
            {porosity} porosity
          </h1>
        </div>

        <div className={styles.attributes}>
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Texture</p>
            <p className={styles.attrValue}>{texture}</p>
            <p className={styles.attrDesc}>{TEXTURE_INFO[texture]}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Density</p>
            <p className={styles.attrValue}>{density}</p>
            <p className={styles.attrDesc}>{DENSITY_INFO[density]}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Porosity</p>
            <p className={styles.attrValue}>{porosity}</p>
            <p className={styles.attrDesc}>{POROSITY_INFO[porosity]}</p>
          </div>
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

function PreviousResultScreen({ result, onRetake }) {
  const { texture, density, porosity } = result

  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <div className={styles.resultHeader}>
          <p className={styles.resultEyebrow}>Your saved hair profile</p>
          <h1 className={styles.resultCombo}>
            {texture}
            <span className={styles.dot} aria-hidden="true">·</span>
            {density}
            <span className={styles.dot} aria-hidden="true">·</span>
            {porosity} porosity
          </h1>
        </div>

        <div className={styles.attributes}>
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Texture</p>
            <p className={styles.attrValue}>{texture}</p>
            <p className={styles.attrDesc}>{TEXTURE_INFO[texture]}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Density</p>
            <p className={styles.attrValue}>{density}</p>
            <p className={styles.attrDesc}>{DENSITY_INFO[density]}</p>
          </div>
          <div className={styles.divider} />
          <div className={styles.attribute}>
            <p className={styles.attrLabel}>Porosity</p>
            <p className={styles.attrValue}>{porosity}</p>
            <p className={styles.attrDesc}>{POROSITY_INFO[porosity]}</p>
          </div>
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

export default function HairQuiz() {
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
        .select('hair_texture, hair_density, hair_porosity, hair_current_color, hair_natural_color, hair_styling_tendency, hair_style_hold')
        .eq('user_id', user.id)
        .maybeSingle()

      if (data?.hair_texture) {
        setSavedResult({
          texture:         data.hair_texture,
          density:         data.hair_density,
          porosity:        data.hair_porosity,
          currentColor:    data.hair_current_color    ?? null,
          naturalColor:    data.hair_natural_color    ?? null,
          stylingTendency: data.hair_styling_tendency ?? null,
          styleHold:       data.hair_style_hold       ?? null,
        })
      }
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
      quiz_type:    'hair',
      answers_json: newAnswers,
      result_json:  newResult,
      is_current:   true,
    })
    if (attemptError) console.error('[HairQuiz] quiz_attempts error:', attemptError)

    const { error: summaryError } = await supabase.from('style_summary').upsert(
      {
        user_id:                user.id,
        hair_texture:           newResult.texture,
        hair_density:           newResult.density,
        hair_porosity:          newResult.porosity,
        hair_current_color:     newResult.currentColor,
        hair_natural_color:     newResult.naturalColor,
        hair_styling_tendency:  newResult.stylingTendency,
        hair_style_hold:        newResult.styleHold,
      },
      { onConflict: 'user_id' }
    )
    if (summaryError) console.error('[HairQuiz] style_summary error:', summaryError)

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
        result={newResult}
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
        result={savedResult}
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
