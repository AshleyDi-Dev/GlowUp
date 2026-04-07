import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Onboarding.module.css'

const STEPS = [
  {
    label:   'Understand your features',
    support: 'Body, face, hair, and color analysis tailored to you',
  },
  {
    label:   'Save your measurements and style profile',
    support: 'Everything in one place, updated whenever you need',
  },
  {
    label:   'Get outfit formulas based on shapes and colors',
    support: 'Practical combinations, not overwhelming product lists',
  },
  {
    label:   'Retake sections anytime as you change',
    support: 'Your profile evolves with you',
  },
]

export default function Onboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [saving, setSaving]     = useState(false)

  useEffect(() => {
    async function check() {
      const { data } = await supabase
        .from('profiles')
        .select('has_onboarded')
        .eq('id', user.id)
        .maybeSingle()

      if (data?.has_onboarded) {
        navigate('/home', { replace: true })
      } else {
        setChecking(false)
      }
    }
    check()
  }, [user.id, navigate])

  async function handleStart() {
    setSaving(true)
    await supabase
      .from('profiles')
      .upsert({ id: user.id, has_onboarded: true }, { onConflict: 'id' })
    navigate('/choose-path', { replace: true })
  }

  if (checking) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.header}>
          <p className={styles.eyebrow}>GlowUp</p>
          <h1 className={styles.heading}>Here's what you can do</h1>
        </div>

        <ol className={styles.stepList}>
          {STEPS.map(({ label, support }, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={styles.stepText}>
                <p className={styles.stepLabel}>{label}</p>
                <p className={styles.stepSupport}>{support}</p>
              </div>
            </li>
          ))}
        </ol>

        <Button fullWidth loading={saving} onClick={handleStart}>
          Start my profile
        </Button>

      </div>
    </div>
  )
}
