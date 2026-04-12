import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Profile.module.css'
import ImagePlaceholder from '../components/ImagePlaceholder'

// ── Content data ──────────────────────────────────────────────────

const BODY_DATA = {
  Hourglass: {
    label:       'Hourglass',
    description: 'Your shoulders and hips are balanced in width with a defined waist — clothes that follow your natural curves tend to work best. Wrap styles, belted pieces, and fitted cuts are your friends.',
  },
  Pear: {
    label:       'Pear',
    description: 'Your hips are the fullest part of your frame, with a narrower upper body. A-line skirts and structured tops that add interest above the waist tend to work especially well.',
  },
  InvertedTriangle: {
    label:       'Inverted triangle',
    description: 'Your shoulders are your widest point, with slimmer hips beneath. Wider-leg trousers, full skirts, and V-necks tend to create a balanced look.',
  },
  Rectangle: {
    label:       'Rectangle',
    description: 'Your shoulders, waist, and hips are close in width — a versatile canvas. Belted pieces and peplum styles add definition if you want it.',
  },
  Apple: {
    label:       'Apple',
    description: 'You carry more volume through the midsection, with slimmer legs and arms. Empire waists, wrap tops, and monochromatic dressing tend to be most flattering.',
  },
}

const FACE_DATA = {
  Oval: {
    label:       'Oval',
    description: 'Your face is gently balanced — wider at the cheekbones with a softly tapered chin. Oval is the most versatile face shape, and most styles tend to work naturally with it.',
  },
  Round: {
    label:       'Round',
    description: 'Your face is similar in width and length, with soft, full cheeks. Angular frames, longer hairstyles, and V-necklines tend to add the illusion of length.',
  },
  Square: {
    label:       'Square',
    description: 'You have a strong angular jaw close in width to your forehead. Softer necklines, curved earrings, and rounded glasses frames tend to balance the angles beautifully.',
  },
  Heart: {
    label:       'Heart',
    description: 'Your forehead is the widest part, tapering to a pointed chin. Wider necklines and accessories that add width at the jaw tend to work especially well.',
  },
  Oblong: {
    label:       'Oblong',
    description: 'Your face is noticeably longer than wide, with consistent proportions throughout. Wider necklines and hairstyles with side volume help add the illusion of width.',
  },
  Diamond: {
    label:       'Diamond',
    description: 'Your cheekbones are the widest part, with a narrow forehead and jaw. Styles that add a little width at the forehead and jaw naturally balance your proportions.',
  },
}

const HAIR_DESC = {
  Straight: 'Natural oils travel easily down the shaft — hair tends to stay shiny but can go flat or oily faster than other types. Lightweight products and regular cleansing keep the balance.',
  Wavy:     'A natural S-wave that frizzes in humidity and responds best to enhancing the pattern rather than fighting it. Light hold products applied to wet hair are the key.',
  Curly:    'Defined spirals that are naturally drier — moisture and sealing are the foundation of a good routine. The LOC method works well for most curl types.',
  Coily:    'Tight coils that shrink significantly when dry. Consistent moisture, gentle handling, and protective styling help retain length and definition.',
}

const COLOR_DATA = {
  Spring: {
    heading:     'Your palette leans warm and clear',
    seasonLabel: 'Spring palette',
    palette:     ['#E8705A', '#F5A07A', '#FBE8C8', '#F5C840', '#60C4A8', '#90C870', '#C8956A'],
    description: 'Clear warm tones like coral, peach, and warm salmon may make your features look most alive. Golden yellows and warm creams worn close to your face tend to add a natural brightness.',
  },
  Summer: {
    heading:     'Your palette leans soft and cool',
    seasonLabel: 'Summer palette',
    palette:     ['#C47888', '#B0A0C8', '#B8B4BE', '#A89890', '#9AB4C8', '#9A6888', '#F4F0F4'],
    description: 'Dusty, softened cool tones — muted rose, lavender, powder blue — may flatter you most near your face. Charcoal and cool taupe tend to work better than stark black as everyday neutrals.',
  },
  Autumn: {
    heading:     'Your palette leans warm and muted',
    seasonLabel: 'Autumn palette',
    palette:     ['#C05840', '#C87038', '#848030', '#986040', '#B84830', '#C8A030', '#386858'],
    description: 'Earthy warm tones like terracotta, rust, and camel may look richly harmonious against your colouring. Olive and warm khaki tend to ground your look in a way cool greens rarely achieve.',
  },
  Winter: {
    heading:     'Your palette leans cool and bold',
    seasonLabel: 'Winter palette',
    palette:     ['#CC2040', '#1840AA', '#0A8040', '#0A0A0A', '#F8F8F8', '#7A1090', '#E01888'],
    description: 'Bold, clear cool tones — true red, cobalt blue, and emerald — may look striking and intentional rather than overwhelming. Black and pure white sit naturally near your face.',
  },
}

// ── Profile summary bullets ───────────────────────────────────────

const BODY_BULLET = {
  Hourglass:        'Structured waist emphasis may work especially well for you — your proportions are made for it.',
  Pear:             'Adding visual interest above the waist may help balance your silhouette naturally.',
  InvertedTriangle: 'Volume through the lower half — wide-leg trousers, full skirts — may help balance your proportions.',
  Rectangle:        'You have a versatile silhouette — belted and high-waisted pieces can create shape where you want it.',
  Apple:            'Monochromatic dressing and elongating cuts through the middle may be particularly flattering for you.',
}

const FACE_BULLET = {
  Oval:    'Most necklines and accessory shapes work naturally for you — your choice can be based entirely on personal taste.',
  Round:   'V-necks and longer earrings tend to be especially flattering by adding the illusion of length near your face.',
  Square:  'Soft curved necklines and rounded earring shapes may complement your angular jaw particularly well.',
  Heart:   'Wider necklines and earrings that flare toward the bottom may balance your proportions beautifully.',
  Oblong:  'Wider necklines and hairstyles with side volume may suit your face shape especially well.',
  Diamond: 'Styles that add a little width at the forehead and jaw — boat necks, wide-brim hats — may be particularly flattering.',
}

const HAIR_BULLET = {
  Straight: 'Lightweight styling and regular cleansing may keep your hair looking its best — oils build up faster on straight types.',
  Wavy:     'Hairstyles with light movement may suit your texture — working with your wave pattern rather than against it is key.',
  Curly:    'Moisture-forward routines and gentle handling may make a significant difference for your curl definition.',
  Coily:    'Protective styles and consistent moisture retention may help your hair thrive and retain length over time.',
}

const COLOR_BULLET = {
  Spring: 'Clear warm tones like coral and peach worn close to your face may add a natural brightness and warmth.',
  Summer: 'Soft cool tones — muted rose, lavender, powder blue — may be especially flattering worn near your face.',
  Autumn: 'Earthy warm tones like terracotta and rust may look richly harmonious against your colouring.',
  Winter: 'Bold, clear cool tones may look intentional and striking — your palette can handle depth and contrast.',
}

function buildSummaryBullets(summary) {
  return [
    BODY_BULLET[summary.body_type],
    FACE_BULLET[summary.face_shape],
    HAIR_BULLET[summary.hair_texture],
    COLOR_BULLET[summary.color_season],
  ].filter(Boolean)
}

// ── Helpers ───────────────────────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function formatDate(iso) {
  if (!iso) return null
  const d = new Date(iso)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function fmtMeas(val, unit) {
  if (!val) return '—'
  const n = parseFloat(val)
  if (isNaN(n)) return '—'
  return `${n % 1 === 0 ? n : n.toFixed(1)} ${unit}`
}

// ── Shared sub-components ─────────────────────────────────────────

function SectionCard({ eyebrow, children }) {
  return (
    <div className={styles.sectionCard}>
      {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
      {children}
    </div>
  )
}

function EmptyState({ message, actionLabel, actionPath }) {
  return (
    <div className={styles.emptyState}>
      <p className={styles.emptyLabel}>{message}</p>
      <Link to={actionPath} className={styles.emptyAction}>
        <Button fullWidth>{actionLabel}</Button>
      </Link>
    </div>
  )
}

function RetakeLink({ to }) {
  return (
    <Link to={to} className={styles.fullWidth}>
      <Button variant="ghost" fullWidth>Retake quiz</Button>
    </Link>
  )
}

function ResetControl({ onReset, resetting }) {
  const [confirm, setConfirm] = useState(false)

  return confirm ? (
    <div className={styles.resetConfirm}>
      <p className={styles.resetConfirmText}>
        Resetting removes your current result so you can start fresh. Your history is never deleted.
      </p>
      <Button
        variant="destructive"
        fullWidth
        loading={resetting}
        onClick={onReset}
      >
        Yes, reset this section
      </Button>
      <button type="button" className={styles.textLink} onClick={() => setConfirm(false)}>
        Cancel
      </button>
    </div>
  ) : (
    <div className={styles.resetBlock}>
      <button type="button" className={styles.textLink} onClick={() => setConfirm(true)}>
        Reset this section
      </button>
    </div>
  )
}

// ── Section A — Measurements ──────────────────────────────────────

function MeasurementsSection({ measurements }) {
  if (!measurements || (!measurements.height && !measurements.bust && !measurements.waist && !measurements.hips)) {
    return (
      <SectionCard eyebrow="Measurements">
        <EmptyState
          message="No measurements saved yet"
          actionLabel="Add measurements"
          actionPath="/measurements"
        />
      </SectionCard>
    )
  }

  const u = measurements.unit ?? 'cm'

  return (
    <SectionCard eyebrow="Measurements">
      <div className={styles.measGrid}>
        {[
          { label: 'Height', value: measurements.height },
          { label: 'Bust',   value: measurements.bust   },
          { label: 'Waist',  value: measurements.waist  },
          { label: 'Hips',   value: measurements.hips   },
        ].map(({ label, value }) => (
          <div key={label} className={styles.measCell}>
            <p className={styles.measLabel}>{label}</p>
            <p className={styles.measValue}>{fmtMeas(value, u)}</p>
          </div>
        ))}
      </div>

      {(measurements.updated_at || measurements.created_at) && (
        <p className={styles.measUpdated}>
          Last updated {formatDate(measurements.updated_at ?? measurements.created_at)}
        </p>
      )}

      <Link to="/measurements?from=profile" className={styles.editLink}>
        Edit measurements
      </Link>
    </SectionCard>
  )
}

// ── Section B — Body ──────────────────────────────────────────────

function BodySection({ bodyType, onReset, resetting }) {
  if (!bodyType) {
    return (
      <SectionCard eyebrow="Body proportions">
        <EmptyState
          message="Not completed yet"
          actionLabel="Start body quiz"
          actionPath="/analyze/body"
        />
      </SectionCard>
    )
  }

  const data = BODY_DATA[bodyType] ?? { label: bodyType, description: '' }

  return (
    <SectionCard eyebrow="Body proportions">
      <p className={styles.resultTitle}>{data.label}</p>
      <p className={styles.resultDesc}>{data.description}</p>
      <ImagePlaceholder />
      <div className={styles.cardActions}>
        <RetakeLink to="/analyze/body" />
        <ResetControl onReset={onReset} resetting={resetting} />
      </div>
    </SectionCard>
  )
}

// ── Section C — Face ──────────────────────────────────────────────

function FaceSection({ faceShape, onReset, resetting }) {
  if (!faceShape) {
    return (
      <SectionCard eyebrow="Face shape">
        <EmptyState
          message="Not completed yet"
          actionLabel="Start face quiz"
          actionPath="/analyze/face"
        />
      </SectionCard>
    )
  }

  const data = FACE_DATA[faceShape] ?? { label: faceShape, description: '' }

  return (
    <SectionCard eyebrow="Face shape">
      <p className={styles.resultTitle}>{data.label}</p>
      <p className={styles.resultDesc}>{data.description}</p>
      <ImagePlaceholder />
      <div className={styles.cardActions}>
        <RetakeLink to="/analyze/face" />
        <ResetControl onReset={onReset} resetting={resetting} />
      </div>
    </SectionCard>
  )
}

// ── Section D — Hair ──────────────────────────────────────────────

function HairSection({ summary, onReset, resetting }) {
  const { hair_texture, hair_density, hair_porosity } = summary

  if (!hair_texture) {
    return (
      <SectionCard eyebrow="Hair profile">
        <EmptyState
          message="Not completed yet"
          actionLabel="Start hair quiz"
          actionPath="/analyze/hair"
        />
      </SectionCard>
    )
  }

  const parts = [hair_texture, hair_density, hair_porosity ? `${hair_porosity} porosity` : null].filter(Boolean)
  const combinedLabel = parts.join(' · ')
  const desc = HAIR_DESC[hair_texture] ?? ''

  return (
    <SectionCard eyebrow="Hair profile">
      <p className={styles.resultTitle}>{combinedLabel}</p>
      <p className={styles.resultDesc}>{desc}</p>
      <ImagePlaceholder />
      <div className={styles.cardActions}>
        <RetakeLink to="/analyze/hair" />
        <ResetControl onReset={onReset} resetting={resetting} />
      </div>
    </SectionCard>
  )
}

// ── Section E — Color ─────────────────────────────────────────────

function ColorSection({ colorSeason, onReset, resetting }) {
  if (!colorSeason) {
    return (
      <SectionCard eyebrow="Color analysis">
        <EmptyState
          message="Not completed yet"
          actionLabel="Start color quiz"
          actionPath="/analyze/color"
        />
      </SectionCard>
    )
  }

  const data = COLOR_DATA[colorSeason]

  if (!data) {
    return (
      <SectionCard eyebrow="Color analysis">
        <p className={styles.resultTitle}>{colorSeason}</p>
        <div className={styles.cardActions}>
          <RetakeLink to="/analyze/color" />
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard eyebrow="Color analysis">
      <p className={styles.resultTitle}>{data.heading}</p>
      <p className={styles.colorSeason}>{data.seasonLabel}</p>

      <div className={styles.paletteRow} aria-label="Color palette" role="img">
        {data.palette.map(hex => (
          <div
            key={hex}
            className={styles.swatch}
            style={{ background: hex }}
            title={hex}
          />
        ))}
      </div>

      <p className={styles.resultDesc}>{data.description}</p>
      <ImagePlaceholder />

      <div className={styles.cardActions}>
        <RetakeLink to="/analyze/color" />
        <ResetControl onReset={onReset} resetting={resetting} />
      </div>
    </SectionCard>
  )
}

// ── Section F — Style snapshot ────────────────────────────────────

function SnapshotCard({ summary }) {
  const bullets = buildSummaryBullets(summary)
  if (bullets.length < 2) return null
  return (
    <div className={styles.snapshotCard}>
      <p className={styles.sectionEyebrow}>Your style snapshot</p>
      <ul className={styles.bulletList}>
        {bullets.map((b, i) => (
          <li key={i} className={styles.bullet}>{b}</li>
        ))}
      </ul>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function Profile() {
  const { user }    = useAuth()
  const [loading, setLoading]       = useState(true)
  const [summary, setSummary]       = useState({})
  const [measurements, setMeasurements] = useState(null)
  const [resetting, setResetting]   = useState(null)  // 'hair' | 'color'
  const [hint, setHint]             = useState('')

  function showHint() {
    setHint('Coming soon')
    setTimeout(() => setHint(''), 2000)
  }

  useEffect(() => {
    async function load() {
      const [sumResult, measResult] = await Promise.all([
        supabase
          .from('style_summary')
          .select('body_type, face_shape, hair_texture, hair_density, hair_porosity, color_season')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('measurements')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
      ])

      if (sumResult.error) console.error('[Profile] style_summary fetch error:', sumResult.error)
      if (measResult.error) console.error('[Profile] measurements fetch error:', measResult.error)
      console.log('[Profile] measurements fetch result:', measResult)

      setSummary(sumResult.data ?? {})
      setMeasurements(measResult.data)
      setLoading(false)
    }
    load()
  }, [user.id])

  async function handleReset(quizType, nullFields) {
    setResetting(quizType)
    await supabase
      .from('quiz_attempts')
      .update({ is_current: false })
      .eq('user_id', user.id)
      .eq('quiz_type', quizType)
    await supabase.from('style_summary').upsert(
      { user_id: user.id, ...nullFields },
      { onConflict: 'user_id' }
    )
    setSummary(prev => ({ ...prev, ...nullFields }))
    setResetting(null)
  }

  if (loading) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>Your profile</p>
          <h1 className={styles.heading}>Your style profile</h1>
        </div>

        <SnapshotCard summary={summary} />

        <div className={styles.sectionsGrid}>
          <MeasurementsSection measurements={measurements} />

          <BodySection
            bodyType={summary.body_type ?? null}
            onReset={() => handleReset('body', { body_type: null })}
            resetting={resetting === 'body'}
          />

          <FaceSection
            faceShape={summary.face_shape ?? null}
            onReset={() => handleReset('face', { face_shape: null })}
            resetting={resetting === 'face'}
          />

          <HairSection
            summary={summary}
            onReset={() => handleReset('hair', {
              hair_texture: null, hair_density: null, hair_porosity: null,
              hair_current_color: null, hair_natural_color: null,
              hair_styling_tendency: null, hair_style_hold: null, hair_style: null,
            })}
            resetting={resetting === 'hair'}
          />

          <ColorSection
            colorSeason={summary.color_season ?? null}
            onReset={() => handleReset('color', { color_season: null })}
            resetting={resetting === 'color'}
          />
        </div>

        {buildSummaryBullets(summary).length >= 2 && (
          <div className={styles.actionsBar}>
            <Button fullWidth onClick={showHint}>View recommendations</Button>
            <Button variant="ghost" fullWidth onClick={showHint}>Build an outfit</Button>
            <Button variant="ghost" fullWidth onClick={showHint}>Save wardrobe notes</Button>
            {hint && <p className={styles.comingSoon} role="status">{hint}</p>}
          </div>
        )}

        <Link to="/analyze" className={styles.textLink}>
          Back to Analyze
        </Link>

      </div>
    </div>
  )
}
