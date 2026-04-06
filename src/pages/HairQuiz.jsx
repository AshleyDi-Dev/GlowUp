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

const COLOR_LABEL = {
  col_black:       'Black',
  col_dark_brown:  'Dark brown',
  col_med_brown:   'Medium brown',
  col_light_brown: 'Light brown',
  col_blonde:      'Blonde',
  col_red:         'Red',
  col_auburn:      'Auburn',
  col_grey:        'Grey',
  col_white:       'White',
  col_treated:     'Colour treated',
}

// Individual dimension descriptions (used in the attribute breakdown)

const TEXTURE_INFO = {
  Straight: 'No natural curl pattern — natural oils travel easily down the shaft, which keeps it shinier but can mean it goes flat or oily faster than curly types.',
  Wavy:     'A natural S-wave that falls somewhere between straight and curly. It frizzes in humidity and responds best to enhancing the pattern rather than fighting it.',
  Curly:    'Defined ringlets or spirals that are naturally drier because oils struggle to travel down the curl. Moisture and sealing are the foundation of everything.',
  Coily:    'Tight coils or zigzags that shrink significantly when dry. Needs consistent moisture, gentle handling, and regular protective styling to retain length.',
}

const DENSITY_INFO = {
  Fine:   'Fewer individual strands overall — fine hair goes flat quickly and needs lightweight formulas, volumising products, and conditioning kept away from the roots.',
  Medium: 'Right in the middle — versatile and the easiest density to work with. Most products and cuts will suit you without much adjustment.',
  Thick:  'A high number of strands giving you a full, substantial head of hair. Heavier products won\'t weigh you down, and you can carry voluminous styles easily.',
}

const POROSITY_INFO = {
  Low:    'Your cuticle lies flat and resists absorbing moisture — which also means it holds onto moisture well once it\'s in. Products absorb slowly, so heat or steam helps.',
  Medium: 'A balanced cuticle that absorbs and retains moisture with minimal effort. Most products and routines work well — you don\'t need to fight your hair.',
  High:   'An open cuticle that soaks up moisture fast but loses it just as quickly. Sealing after washing with a cream or oil keeps hydration locked in.',
}

// Profile summary — one conversational sentence per combination

const TEXTURE_DENSITY_PHRASE = {
  Straight: { Fine: 'fine, straight hair', Medium: 'straight hair', Thick: 'thick, straight hair' },
  Wavy:     { Fine: 'fine, wavy hair',     Medium: 'wavy hair',     Thick: 'full, wavy hair'     },
  Curly:    { Fine: 'fine curly hair',     Medium: 'curly hair',    Thick: 'thick curly hair'    },
  Coily:    { Fine: 'fine coily hair',     Medium: 'coily hair',    Thick: 'dense coily hair'    },
}

const POROSITY_CONTEXT = {
  Low:    'a tight cuticle that holds moisture in but takes time to absorb it',
  Medium: 'a balanced cuticle that absorbs and retains moisture easily',
  High:   'an open cuticle that soaks up moisture quickly but needs help holding onto it',
}

function getProfileSummary(texture, density, porosity) {
  const phrase = TEXTURE_DENSITY_PHRASE[texture]?.[density] ?? 'a unique hair type'
  const context = POROSITY_CONTEXT[porosity] ?? ''
  return `You have ${phrase} with ${context}.`
}

// What this means — 3 bullets per combination, split by topic

const STYLING_BULLET = {
  Straight_Fine:   'Keep products lightweight and apply from mid-lengths down — anything heavy near the roots will flatten and grease your hair within hours.',
  Straight_Medium: 'Your hair sits where you put it and holds a blowout well — a round brush and light setting spray are all you need to add lasting movement.',
  Straight_Thick:  'A smoothing serum before blow-drying tames bulk and keeps the finish sleek — work in sections so heat reaches all the way through.',
  Wavy_Fine:       'Scrunch in a light mousse on soaking wet hair, then don\'t touch it until it\'s completely dry — disturbing the wave mid-dry is what causes frizz.',
  Wavy_Medium:     'A curl cream or light gel scrunched into wet hair enhances your wave — diffuse on low heat or air dry, and scrunch out the crunch once dry.',
  Wavy_Thick:      'Your wave is strong but needs weight removed to move freely — layer a leave-in and a medium-hold gel, then diffuse to encourage the pattern.',
  Curly_Fine:      'Layer products lightly — a leave-in plus a lightweight gel gives hold without the weight that collapses fine curls.',
  Curly_Medium:    'Use the LOC method (liquid, oil, cream) applied to soaking wet hair — let it dry completely undisturbed for the best definition.',
  Curly_Thick:     'Apply rich creams generously section by section on dripping wet hair — your curls need deep moisture to look defined and feel manageable.',
  Coily_Fine:      'Detangle only on wet, conditioned hair using your fingers or a wide-tooth comb — dry detangling will cause breakage on fine coily strands.',
  Coily_Medium:    'Work in small sections when styling so every curl gets even product coverage — coils this tight will absorb moisture unevenly if you rush.',
  Coily_Thick:     'Your hair needs time and consistency — deep condition weekly, seal with a butter or oil, and use protective styles whenever you want to retain length.',
}

const PRODUCT_BULLET = {
  Low_Fine:    'Use water-based, lightweight formulas only — heavy oils and creams sit on top and weigh down already-fine strands. Apply with a little steam or warmth to help absorption.',
  Low_Medium:  'Stick to water-based moisturisers and light oils like argan or grapeseed — use a warm towel or steamer when deep conditioning to help products penetrate the cuticle.',
  Low_Thick:   'Your hair can handle slightly richer formulas, but still apply with heat — a monthly warm-oil treatment or steam session keeps the cuticle soft and receptive.',
  Medium_Fine: 'Most standard moisturising products work for you — keep them lightweight and avoid conditioning close to the roots, which will flatten fine hair quickly.',
  Medium_Medium:'You\'re easy to shop for — most mainstream moisturising products work well. Focus your choices on what your texture needs rather than worrying about porosity.',
  Medium_Thick: 'Medium to heavier formulas suit you without weighing hair down — look for products that deliver both moisture and control in one step.',
  High_Fine:   'Protein treatments every 2–3 weeks help reinforce fragile high-porosity strands — always follow with a light oil to seal, and keep an eye out for products with keratin or hydrolysed proteins.',
  High_Medium: 'Alternate protein and moisture treatments to keep your cuticle strong — seal with a medium oil like jojoba or sweet almond after every wash to lock hydration in.',
  High_Thick:  'Lean into rich creams and heavy butters — your hair will absorb them fully and hold onto moisture far better with a proper sealing step after every wash.',
}

const CUT_BULLET = {
  Straight_Fine:   'Blunt cuts and bobs create the illusion of thickness on fine straight hair — go easy on layers, as too many will make ends look wispy and sparse.',
  Straight_Medium: 'Most cuts suit you well — ask for face-framing layers if you want movement, or keep it blunt for a clean, modern silhouette.',
  Straight_Thick:  'Long layers and internal thinning take weight out without sacrificing shape — blunt cuts at long lengths can look heavy and become difficult to manage.',
  Wavy_Fine:       'Long layers suit your hair well and help the wave fall without removing too much bulk — avoid over-thinning, which disrupts the S-pattern.',
  Wavy_Medium:     'Ask your stylist to cut your hair dry so they can see your natural wave — a long layered cut is almost always the right starting point.',
  Wavy_Thick:      'Layers are essential for removing bulk and letting your wave move freely — without them, the weight will pull the pattern flat by mid-afternoon.',
  Curly_Fine:      'A tapered layered shape supports your curl without making fine strands look sparse — avoid blunt cuts at the ends, which can look too heavy.',
  Curly_Medium:    'A curl specialist or DevaCut makes a real difference — dry cutting lets the stylist work with your natural pattern and shrinkage, not against it.',
  Curly_Thick:     'A wide, layered shape suits your curls beautifully — look for a natural hair specialist who will sculpt for your curl size and shrinkage level.',
  Coily_Fine:      'Preserve fullness and avoid heavy thinning — fine coily strands already deal with significant shrinkage, so keeping bulk at the ends helps.',
  Coily_Medium:    'Talk through your shrinkage with your stylist upfront so the final length lands where you want it — a tapered natural or defined shape both work well.',
  Coily_Thick:     'You have the density for almost any natural style — a shape-up or sculptural cut from a natural hair specialist will make the most of your hair\'s range.',
}

function getProfileBullets(texture, density, porosity) {
  return [
    STYLING_BULLET[`${texture}_${density}`] ?? '',
    PRODUCT_BULLET[`${porosity}_${density}`] ?? '',
    CUT_BULLET[`${texture}_${density}`] ?? '',
  ]
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

// ── Shared result content ─────────────────────────────────────────

function ProfileContent({ result, eyebrow }) {
  const { texture, density, porosity, currentColor } = result
  const colorLabel = currentColor ? COLOR_LABEL[currentColor] : null
  const summary    = getProfileSummary(texture, density, porosity)
  const bullets    = getProfileBullets(texture, density, porosity)

  return (
    <>
      <div className={styles.resultHeader}>
        <p className={styles.resultEyebrow}>{eyebrow}</p>
        <h1 className={styles.resultCombo}>
          {texture}
          <span className={styles.dot} aria-hidden="true">·</span>
          {density} density
          <span className={styles.dot} aria-hidden="true">·</span>
          {porosity} porosity
          {colorLabel && (
            <>
              <span className={styles.dot} aria-hidden="true">·</span>
              {colorLabel}
            </>
          )}
        </h1>
        <p className={styles.resultSummary}>{summary}</p>
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

      <div className={styles.whatThisMeans}>
        <p className={styles.sectionHeading}>What this means</p>
        <ul className={styles.meansList}>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </>
  )
}

// ── Result screen ─────────────────────────────────────────────────

function ResultScreen({ result, onSave, onRetake, saving, saved }) {
  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <ProfileContent result={result} eyebrow="Your hair profile" />

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
  return (
    <div className={styles.resultPage}>
      <div className={styles.resultContainer}>

        <ProfileContent result={result} eyebrow="Your saved hair profile" />

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
