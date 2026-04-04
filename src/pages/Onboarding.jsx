import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import styles from './Onboarding.module.css'

const FEATURES = [
  {
    icon: '◎',
    label: 'Understand your features',
    description: 'Body, face, hair, and color analysis — all in one place.',
  },
  {
    icon: '◻',
    label: 'Save your measurements and style profile',
    description: 'Everything you know about yourself, stored and ready to use.',
  },
  {
    icon: '▦',
    label: 'Get outfit formulas based on your shape and colors',
    description: 'Practical guidance, not mood boards — clothes that actually work for you.',
  },
  {
    icon: '↺',
    label: 'Retake sections anytime as you change',
    description: 'Your profile grows with you — nothing is set in stone.',
  },
]

export default function Onboarding() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [saving, setSaving]     = useState(false)

  // Redirect if already onboarded
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

    navigate('/home', { replace: true })
  }

  if (checking) return null

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <p className={styles.wordmark}>GlowUp</p>
          <h1 className={styles.heading}>Your style profile starts here.</h1>
        </div>

        <ol className={styles.featureList}>
          {FEATURES.map(({ icon, label, description }, i) => (
            <li key={i} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
              <div className={styles.featureText}>
                <p className={styles.featureLabel}>{label}</p>
                <p className={styles.featureDescription}>{description}</p>
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
