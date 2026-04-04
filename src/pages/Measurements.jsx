import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Card from '../components/Card'
import styles from './Measurements.module.css'

// Conversion helpers
const CM_TO_IN = 0.393701
const IN_TO_CM = 2.54

function round1(n) {
  return Math.round(n * 10) / 10
}

function convertFields(fields, toUnit) {
  const result = {}
  Object.entries(fields).forEach(([key, val]) => {
    if (key === 'shoe_size' || val === '') {
      result[key] = val
      return
    }
    const n = parseFloat(val)
    if (isNaN(n)) {
      result[key] = val
      return
    }
    result[key] = toUnit === 'in'
      ? String(round1(n * CM_TO_IN))
      : String(round1(n * IN_TO_CM))
  })
  return result
}

const EMPTY = {
  height:          '',
  bust:            '',
  waist:           '',
  hips:            '',
  inseam:          '',
  shoulder_width:  '',
  shoe_size:       '',
}

const SECTIONS = [
  {
    label: 'Upper body',
    fields: [
      {
        key: 'height',
        label: 'Height',
        helper: cm => cm
          ? 'Stand straight against a wall, measure from floor to top of head.'
          : 'Stand straight against a wall, measure from floor to top of head.',
      },
      {
        key: 'bust',
        label: 'Bust',
        helper: () => 'Measure around the fullest part of your chest, keeping the tape level.',
      },
      {
        key: 'shoulder_width',
        label: 'Shoulder width',
        helper: () => 'Measure from the edge of one shoulder across to the other.',
      },
    ],
  },
  {
    label: 'Lower body',
    fields: [
      {
        key: 'waist',
        label: 'Waist',
        helper: () => 'Measure around your natural waist — the narrowest part of your torso.',
      },
      {
        key: 'hips',
        label: 'Hips',
        helper: () => 'Measure around the fullest part of your hips and seat.',
      },
      {
        key: 'inseam',
        label: 'Inseam',
        helper: () => 'Measure from the crotch seam down to the ankle along the inner leg.',
      },
    ],
  },
  {
    label: 'Other',
    fields: [
      {
        key: 'shoe_size',
        label: 'Shoe size',
        helper: () => 'Enter your standard shoe size (e.g. 8, 8.5, 39).',
      },
    ],
  },
]

export default function Measurements() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [unit, setUnit]       = useState('cm')
  const [fields, setFields]   = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [saveError, setSaveError] = useState('')

  // Load existing measurements on mount
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('measurements')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) console.error('[Measurements] load error:', error)

      if (!error && data) {
        setUnit(data.unit ?? 'cm')
        setFields({
          height:         String(data.height         ?? ''),
          bust:           String(data.bust           ?? ''),
          waist:          String(data.waist          ?? ''),
          hips:           String(data.hips           ?? ''),
          inseam:         String(data.inseam         ?? ''),
          shoulder_width: String(data.shoulder_width ?? ''),
          shoe_size:      String(data.shoe_size      ?? ''),
        })
      }

      setLoading(false)
    }

    load()
  }, [user.id])

  function handleUnitToggle(newUnit) {
    if (newUnit === unit) return
    // Convert any filled-in numeric fields
    const converted = convertFields(fields, newUnit)
    setFields(converted)
    setUnit(newUnit)
  }

  function handleChange(key, value) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaveError('')
    setSaving(true)

    // Build the row — store empty strings as null, numbers as numbers
    const row = {
      user_id: user.id,
      unit,
      height:         fields.height         !== '' ? parseFloat(fields.height)         : null,
      bust:           fields.bust           !== '' ? parseFloat(fields.bust)           : null,
      waist:          fields.waist          !== '' ? parseFloat(fields.waist)          : null,
      hips:           fields.hips           !== '' ? parseFloat(fields.hips)           : null,
      inseam:         fields.inseam         !== '' ? parseFloat(fields.inseam)         : null,
      shoulder_width: fields.shoulder_width !== '' ? parseFloat(fields.shoulder_width) : null,
      shoe_size:      fields.shoe_size      !== '' ? fields.shoe_size                  : null,
    }

    console.log('[Measurements] saving row:', row)

    const { data, error } = await supabase
      .from('measurements')
      .upsert(row, { onConflict: 'user_id' })
      .select()

    setSaving(false)

    if (error) {
      console.error('[Measurements] upsert error:', {
        message: error.message,
        code:    error.code,
        details: error.details,
        hint:    error.hint,
      })
      setSaveError(`Error: ${error.message}`)
      return
    }

    console.log('[Measurements] saved successfully:', data)

    setSaved(true)
    setTimeout(() => navigate('/home'), 1500)
  }

  if (loading) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Your measurements</h1>
          <p className={styles.subheading}>
            All fields are optional. Add what you know — you can always update these later.
          </p>
        </div>

        {/* Unit toggle */}
        <div className={styles.unitToggle} role="group" aria-label="Unit system">
          <button
            type="button"
            className={`${styles.unitBtn} ${unit === 'cm' ? styles.unitActive : ''}`}
            onClick={() => handleUnitToggle('cm')}
          >
            cm
          </button>
          <button
            type="button"
            className={`${styles.unitBtn} ${unit === 'in' ? styles.unitActive : ''}`}
            onClick={() => handleUnitToggle('in')}
          >
            inches
          </button>
        </div>

        {/* Field sections */}
        {SECTIONS.map(section => (
          <div key={section.label} className={styles.section}>
            <p className={styles.sectionLabel}>{section.label}</p>
            <Card padding="lg">
              <div className={styles.fieldStack}>
                {section.fields.map(({ key, label, helper }) => (
                  <div key={key} className={styles.fieldRow}>
                    <TextInput
                      label={label}
                      type={key === 'shoe_size' ? 'text' : 'number'}
                      inputMode={key === 'shoe_size' ? 'decimal' : 'decimal'}
                      min="0"
                      step="0.1"
                      placeholder={key === 'shoe_size' ? 'e.g. 8 or 39' : unit}
                      value={fields[key]}
                      onChange={e => handleChange(key, e.target.value)}
                    />
                    <p className={styles.helper}>{helper(unit === 'cm')}</p>
                  </div>
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
              <span className={styles.savedCheck} aria-hidden="true">✓</span>
              Measurements saved
            </p>
          ) : (
            <>
              <Button fullWidth loading={saving} onClick={handleSave}>
                Save measurements
              </Button>
              <Button
                variant="ghost"
                fullWidth
                onClick={() => navigate('/home')}
              >
                Skip for now
              </Button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
