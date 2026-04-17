import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Card from '../components/Card'
import styles from './Measurements.module.css'

// ── Conversion helpers ────────────────────────────────────────────

const CM_TO_IN   = 0.393701
const IN_TO_CM   = 2.54
const KG_TO_LBS  = 2.20462
const LBS_TO_KG  = 0.453592

function round1(n) {
  return Math.round(n * 10) / 10
}

// These fields skip length conversion
const SKIP_LINEAR = new Set(['shoe_size', 'bra_size'])
// These convert as mass (kg ↔ lbs) when unit toggles
const MASS_FIELDS = new Set(['weight'])

function convertFields(fields, toUnit) {
  const result = {}
  Object.entries(fields).forEach(([key, val]) => {
    if (SKIP_LINEAR.has(key) || val === '') { result[key] = val; return }
    const n = parseFloat(val)
    if (isNaN(n)) { result[key] = val; return }

    if (MASS_FIELDS.has(key)) {
      result[key] = toUnit === 'in'
        ? String(round1(n * KG_TO_LBS))
        : String(round1(n * LBS_TO_KG))
    } else {
      result[key] = toUnit === 'in'
        ? String(round1(n * CM_TO_IN))
        : String(round1(n * IN_TO_CM))
    }
  })
  return result
}

// ── Field config ──────────────────────────────────────────────────

const EMPTY = {
  height:         '',
  bust:           '',
  waist:          '',
  hips:           '',
  inseam:         '',
  shoulder_width: '',
  shoe_size:      '',
  bra_size:       '',
  weight:         '',
}

const SECTIONS = [
  {
    label: 'Upper body',
    fields: [
      {
        key:    'bust',
        label:  'Bust',
        helper: 'Measure around the fullest part of your chest, keeping the tape level.',
      },
      {
        key:    'shoulder_width',
        label:  'Shoulder width',
        helper: 'Measure from the edge of one shoulder across to the other.',
      },
      {
        key:         'bra_size',
        label:       'Bra size',
        helper:      'Enter your band size and cup — e.g. 34B or 10C.',
        optional:    true,
        sensitive:   true,
        note:        'Optional — used for fit reference only',
        skipConvert: true,
      },
    ],
  },
  {
    label: 'Lower body',
    fields: [
      {
        key:    'waist',
        label:  'Waist',
        helper: 'Measure around your natural waist — the narrowest part of your torso.',
      },
      {
        key:    'hips',
        label:  'Hips',
        helper: 'Measure around the fullest part of your hips and seat.',
      },
      {
        key:    'inseam',
        label:  'Inseam',
        helper: 'Measure from the crotch seam down to the ankle along the inner leg.',
      },
    ],
  },
  {
    label: 'General',
    fields: [
      {
        key:    'height',
        label:  'Height',
        helper: 'Stand straight against a wall, measure from floor to top of head.',
      },
      {
        key:         'shoe_size',
        label:       'Shoe size',
        helper:      'Enter your standard size — e.g. 8, 8.5, or 39.',
        skipConvert: true,
      },
      {
        key:       'weight',
        label:     'Weight',
        helper:    (unit) => unit === 'cm' ? 'Enter in kg.' : 'Enter in lbs.',
        optional:  true,
        sensitive: true,
        note:      'Optional — never used for judgment, only for fit calculations if helpful',
      },
    ],
  },
]

// ── Field component ───────────────────────────────────────────────

function MeasurementField({ field, value, unit, onChange }) {
  const { key, label, helper, optional, sensitive, note, skipConvert } = field
  const helperText = typeof helper === 'function' ? helper(unit) : helper
  const inputId    = `mf-${key}`

  return (
    <div className={styles.fieldRow}>
      <div className={styles.fieldLabelRow}>
        <label
          htmlFor={inputId}
          className={[
            styles.fieldLabel,
            sensitive ? styles.fieldLabelMuted : '',
          ].filter(Boolean).join(' ')}
        >
          {label}
        </label>
        {optional && (
          <span className={styles.optionalTag}>Optional</span>
        )}
      </div>

      <input
        id={inputId}
        type={skipConvert ? 'text' : 'number'}
        inputMode="decimal"
        min="0"
        step="0.1"
        placeholder={skipConvert ? '' : unit}
        value={value}
        onChange={e => onChange(key, e.target.value)}
        className={styles.input}
      />

      <p className={styles.helper}>{helperText}</p>

      {note && (
        <p className={styles.sensitiveNote}>{note}</p>
      )}
    </div>
  )
}

// ── Date format ───────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function formatTimestamp(iso) {
  if (!iso) return null
  const d = new Date(iso)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

// ── Page ──────────────────────────────────────────────────────────

export default function Measurements() {
  const { user }       = useAuth()
  const navigate       = useNavigate()
  const [searchParams] = useSearchParams()

  const fromProfile = searchParams.get('from') === 'profile'
  const exitPath    = fromProfile ? '/profile' : '/home'

  const [unit, setUnit]           = useState('cm')
  const [fields, setFields]       = useState(EMPTY)
  const [loading, setLoading]     = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) console.error('[Measurements] load:', error)

      if (!error && data) {
        setUnit(data.unit ?? 'cm')
        setUpdatedAt(data.updated_at ?? data.created_at ?? null)
        setFields({
          height:         String(data.height         ?? ''),
          bust:           String(data.bust           ?? ''),
          waist:          String(data.waist          ?? ''),
          hips:           String(data.hips           ?? ''),
          inseam:         String(data.inseam         ?? ''),
          shoulder_width: String(data.shoulder_width ?? ''),
          shoe_size:      String(data.shoe_size      ?? ''),
          bra_size:       String(data.bra_size       ?? ''),
          weight:         String(data.weight         ?? ''),
        })
      }

      setLoading(false)
    }
    load()
  }, [user.id])

  function handleUnitToggle(newUnit) {
    if (newUnit === unit) return
    setFields(prev => convertFields(prev, newUnit))
    setUnit(newUnit)
  }

  function handleChange(key, value) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaveError('')
    setSaving(true)

    const num = v => v !== '' ? parseFloat(v) : null
    const str = v => v !== '' ? v             : null

    const row = {
      user_id:        user.id,
      unit,
      height:         num(fields.height),
      bust:           num(fields.bust),
      waist:          num(fields.waist),
      hips:           num(fields.hips),
      inseam:         num(fields.inseam),
      shoulder_width: num(fields.shoulder_width),
      shoe_size:      str(fields.shoe_size),
      bra_size:       str(fields.bra_size),
      weight:         num(fields.weight),
    }

    const { error } = await supabase
      .from('measurements')
      .upsert(row, { onConflict: 'user_id' })

    setSaving(false)

    if (error) {
      console.error('[Measurements] upsert:', error)
      setSaveError(`Couldn't save — ${error.message}`)
      return
    }

    setSaved(true)
    setTimeout(() => navigate(exitPath), 1500)
  }

  if (loading) return null

  const heading   = fromProfile ? 'Edit your measurements' : 'Your measurements'
  const skipLabel = fromProfile ? 'Cancel' : 'Skip for now'

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subheading}>
            Add what you know — all fields are optional and you can update them anytime.
          </p>
          {updatedAt && (
            <p className={styles.lastUpdated}>
              Last updated {formatTimestamp(updatedAt)}
            </p>
          )}
        </div>

        <div className={styles.unitToggle} role="group" aria-label="Unit system">
          <button
            type="button"
            className={[styles.unitBtn, unit === 'cm' ? styles.unitActive : ''].filter(Boolean).join(' ')}
            onClick={() => handleUnitToggle('cm')}
          >
            cm
          </button>
          <button
            type="button"
            className={[styles.unitBtn, unit === 'in' ? styles.unitActive : ''].filter(Boolean).join(' ')}
            onClick={() => handleUnitToggle('in')}
          >
            inches
          </button>
        </div>

        {SECTIONS.map(section => (
          <div key={section.label} className={styles.section}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <Card padding="lg">
              <div className={styles.fieldStack}>
                {section.fields.map(field => (
                  <MeasurementField
                    key={field.key}
                    field={field}
                    value={fields[field.key]}
                    unit={unit}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Card>
          </div>
        ))}

        {saveError && (
          <p className={styles.saveError} role="alert">{saveError}</p>
        )}

        <div className={styles.actions}>
          {saved ? (
            <p className={styles.savedConfirmation} role="status">
              <svg
                className={styles.savedIcon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.25" />
                <polyline
                  points="5,9.5 7.5,12 13,6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Measurements saved
            </p>
          ) : (
            <>
              <Button fullWidth loading={saving} onClick={handleSave}>
                Save and continue
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate(exitPath)}
              >
                {skipLabel}
              </Button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
