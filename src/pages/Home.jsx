import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Home.module.css'

// ── Module sequence ───────────────────────────────────────────────

const MODULES = [
  { key: 'body',  field: 'body_type',    label: 'Body proportions', path: '/analyze/body'  },
  { key: 'face',  field: 'face_shape',   label: 'Face shape',       path: '/analyze/face'  },
  { key: 'hair',  field: 'hair_texture', label: 'Hair profile',     path: '/analyze/hair'  },
  { key: 'color', field: 'color_season', label: 'Color analysis',   path: '/analyze/color' },
]

// ── Latest result display ─────────────────────────────────────────

const RESULT_LABEL = {
  // body
  Hourglass:        'Hourglass proportions',
  Pear:             'Pear proportions',
  InvertedTriangle: 'Inverted triangle proportions',
  Rectangle:        'Rectangle proportions',
  Apple:            'Apple proportions',
  // face
  Oval:    'Oval face shape',
  Round:   'Round face shape',
  Square:  'Square face shape',
  Heart:   'Heart face shape',
  Oblong:  'Oblong face shape',
  Diamond: 'Diamond face shape',
  // color
  Spring: 'Warm and clear palette',
  Summer: 'Soft and cool palette',
  Autumn: 'Warm and muted palette',
  Winter: 'Cool and bold palette',
}

function getLatestResult(summary, dates) {
  // Find the module with the most recent quiz_attempt date
  let latest = null
  let latestDate = null

  MODULES.forEach(mod => {
    const val  = summary[mod.field]
    const date = dates[mod.key]
    if (val && date) {
      if (!latestDate || date > latestDate) {
        latestDate = date
        latest = { value: val, field: mod.field, key: mod.key }
      }
    }
  })

  // If no dates found but we have values, just return first complete
  if (!latest) {
    for (const mod of MODULES) {
      if (summary[mod.field]) {
        latest = { value: summary[mod.field], field: mod.field, key: mod.key }
        break
      }
    }
  }

  return latest
}

// ── Tips ──────────────────────────────────────────────────────────

const TIPS_BY_RESULT = {
  // body
  Hourglass: [
    "A wrap dress or belted piece works with your natural waist — it's one of the most effortless silhouettes for your proportions.",
    "Fitted styles through the torso tend to sit well on you — you don't need to add shape artificially.",
    "When sizing up for comfort through the waist, try a belt to bring things back in — it's an easy way to keep proportion.",
  ],
  Pear: [
    "A structured shoulder or interesting neckline can balance your silhouette by drawing the eye upward naturally.",
    "Separates often work better than one-size pieces — sizing for your hips and adjusting the top separately gives a better fit.",
    "A-line skirts that skim over the hip and flare out tend to be more comfortable and flattering than straight-cut styles.",
  ],
  InvertedTriangle: [
    "Wide-leg trousers and full skirts add visual weight to your lower half — a simple way to even out your proportions.",
    "V-necks soften the shoulder line — a small change that can make fitted tops feel more balanced.",
    "Your legs tend to be a strong feature. Shorter hemlines or well-tailored trousers can be worth exploring.",
  ],
  Rectangle: [
    "Belted pieces and high-waisted styles can create the impression of curves if you want them — entirely optional.",
    "You have one of the most versatile silhouettes. Most styles work, which gives you a lot of freedom to experiment.",
    "Clean, structured tailoring tends to look especially intentional on a straight silhouette.",
  ],
  Apple: [
    "Monochromatic dressing — one colour head to toe — creates an elongating effect that works especially well for your proportions.",
    "Empire waists and wrap styles that flow over the midsection tend to be the most comfortable and flattering.",
    "Drawing attention to your legs or shoulders naturally shifts the focus — both can be strong features worth highlighting.",
  ],
  // face
  Oval: [
    "Most necklines suit you — you can choose by outfit and personal taste rather than face-shape rules.",
    "Long drop earrings and hoops both work well for your proportions. Your choice can be entirely aesthetic.",
    "Most haircut lengths work on an oval face — layers add length, blunt cuts add fullness. Follow what you like.",
  ],
  Round: [
    "V-necks and open collars draw the eye downward and add a little length — one of the most consistently flattering choices for a round face.",
    "Longer earrings that hang below the jaw tend to elongate the face gently — drops and long dangles work well.",
    "Hairstyles that fall below the chin or have height at the crown add length — both tend to complement a round face nicely.",
  ],
  Square: [
    "Rounded necklines — scoop, U-necks, and off-shoulder — soften an angular jaw naturally.",
    "Curved earrings like hoops and teardrop shapes complement strong jaw angles in a really harmonious way.",
    "Round glasses frames may soften your features. Layered haircuts that fall below the jaw tend to work especially well.",
  ],
  Heart: [
    "Wider or off-shoulder necklines balance a broader forehead — sweetheart and boat necks draw the eye outward effectively.",
    "Earrings that are wider at the bottom — chandelier styles and teardrop drops — add visual weight below the jaw.",
    "Hairstyles with volume below the ear naturally balance a narrower chin. Waves from chin-length down work especially well.",
  ],
  Oblong: [
    "Wider necklines — boat necks and wide scoop styles — add horizontal visual weight and break up the vertical length nicely.",
    "Hairstyles with width at the sides tend to balance a longer face — waves and soft curls at cheek level work well.",
    "Shorter, chunkier earrings add width without length. Huggies, wide hoops, and button styles are worth exploring.",
  ],
  Diamond: [
    "Hairstyles with volume at the forehead and jaw — fuller fringes, chin-length bobs, fuller ends — balance a narrow forehead and chin.",
    "Oval and round frames with a bit of width at the top may work especially well for your face shape.",
    "Boat necks and wide scoop styles add a little width at the shoulder and collarbone area, which complements your proportions.",
  ],
  // color
  Spring: [
    "Coral, peach, and warm salmon worn close to your face may add a natural brightness — these warm, clear tones work particularly well for you.",
    "Golden yellows and warm creams near your face tend to add warmth without washing you out.",
    "Avoid very muted or dusty tones when you want your skin to look its clearest — clear, warm colours tend to do the heavy lifting.",
  ],
  Summer: [
    "Dusty, softened cool tones — muted rose, lavender, powder blue — tend to be most flattering for you near your face.",
    "Charcoal or cool taupe as your neutral may work better than stark black — it keeps the overall look soft and harmonious.",
    "Bright, saturated colours can feel heavy for a Summer palette — softened or greyed-down versions of those colours tend to be more harmonious.",
  ],
  Autumn: [
    "Earthy warm tones like terracotta, rust, and camel tend to look richly harmonious against your colouring — lean into them.",
    "Olive and warm khaki may ground your look in a way cool or bright greens rarely achieve for you.",
    "Avoid icy or cool-toned colours near your face — the contrast tends to wash out your warmth rather than enhancing it.",
  ],
  Winter: [
    "Bold, clear cool tones — true red, cobalt, emerald — may look intentional and striking rather than overwhelming for your palette.",
    "Black and pure white tend to sit naturally near your face. You can wear high contrast in a way most other seasons can't.",
    "Avoid very muted or earthy tones — they tend to dull a Winter palette rather than complement it.",
  ],
}

const GENERIC_TIPS = [
  "Start with fit — clothes that fit well tend to look intentional regardless of style.",
  "Building a capsule starts with three good neutrals. Everything else can rotate around them.",
  "The most versatile investment pieces tend to be simple, well-made, and in your neutral range.",
  "When in doubt, monochromatic dressing creates a pulled-together look with minimal effort.",
  "Proportion matters as much as style — try varying hem lengths and silhouettes to see what feels best.",
]

function getTip(summary) {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)

  // Collect all available tip arrays for completed results
  const allTips = []
  const resultOrder = [
    summary.color_season,
    summary.body_type,
    summary.face_shape,
    summary.hair_texture,
  ]
  resultOrder.forEach(val => {
    if (val && TIPS_BY_RESULT[val]) allTips.push(...TIPS_BY_RESULT[val])
  })

  const pool = allTips.length > 0 ? allTips : GENERIC_TIPS
  return pool[dayOfYear % pool.length]
}

// ── Name helper ───────────────────────────────────────────────────

function getFirstName(user) {
  const full = user?.user_metadata?.full_name ?? user?.user_metadata?.name ?? ''
  if (full) return full.split(' ')[0]
  // Fall back to email prefix
  const email = user?.email ?? ''
  return email.split('@')[0] || null
}

// ── Home ──────────────────────────────────────────────────────────

export default function Home() {
  const { user } = useAuth()
  const [loading, setLoading]   = useState(true)
  const [summary, setSummary]   = useState({})
  const [dates, setDates]       = useState({})
  const [comingSoon, setComingSoon] = useState(false)

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

  const firstName   = getFirstName(user)
  const anyComplete = MODULES.some(m => Boolean(summary[m.field]))
  const nextModule  = MODULES.find(m => !summary[m.field])
  const latestResult = getLatestResult(summary, dates)
  const tip         = getTip(summary)

  const welcomeText = anyComplete
    ? `Welcome back${firstName ? `, ${firstName}` : ''}`
    : `Welcome${firstName ? `, ${firstName}` : ''} — let's build your style profile`

  function handleComingSoon() {
    setComingSoon(true)
    setTimeout(() => setComingSoon(false), 2000)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Welcome */}
        <div className={styles.welcome}>
          <h1 className={styles.welcomeHeading}>{welcomeText}</h1>
        </div>

        {/* Next module prompt */}
        {nextModule && (
          <div className={styles.card}>
            <p className={styles.cardEyebrow}>Continue building your profile</p>
            <p className={styles.cardTitle}>Complete your {nextModule.label.toLowerCase()}</p>
            <Link to={nextModule.path} className={styles.fullWidth}>
              <Button fullWidth>Start</Button>
            </Link>
          </div>
        )}

        {/* Latest result */}
        {latestResult && (
          <div className={styles.card}>
            <p className={styles.cardEyebrow}>Your latest result</p>
            <p className={styles.latestResult}>
              {RESULT_LABEL[latestResult.value] ?? latestResult.value}
            </p>
            <Link to="/profile" className={styles.subtleLink}>View full profile</Link>
          </div>
        )}

        {/* Today's tip */}
        <div className={styles.card}>
          <p className={styles.cardEyebrow}>Today's styling note</p>
          <p className={styles.tipText}>{tip}</p>
        </div>

        {/* Quick actions */}
        <div className={styles.actionsCard}>
          <p className={styles.cardEyebrow}>Quick actions</p>
          <div className={styles.actionRow}>
            {[
              { label: 'Build an outfit', path: '/style/outfit-builder' },
              { label: 'Saved items',     path: '/saved'                },
            ].map(({ label, path }) => (
              <button
                key={path}
                type="button"
                className={styles.actionBtn}
                onClick={handleComingSoon}
              >
                <span className={styles.actionLabel}>{label}</span>
                <span className={styles.comingTag}>Soon</span>
              </button>
            ))}
            <Link to="/style" className={styles.actionBtn}>
              <span className={styles.actionLabel}>View recommendations</span>
            </Link>
          </div>
          {comingSoon && (
            <p className={styles.comingSoonNote} role="status">Coming soon</p>
          )}
        </div>

      </div>
    </div>
  )
}
