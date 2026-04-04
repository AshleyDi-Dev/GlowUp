import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Card from '../components/Card'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState({})
  const [formError, setFormError] = useState('')

  function validate() {
    const next = {}
    if (!email)    next.email    = 'Email is required.'
    if (!password) next.password = 'Password is required.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')

    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setLoading(true)

    const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setLoading(false)
      if (error.message.toLowerCase().includes('email not confirmed') ||
          error.message.toLowerCase().includes('not confirmed')) {
        setFormError('Please confirm your email before logging in. Check your inbox for the confirmation link.')
      } else {
        setFormError('Incorrect email or password.')
      }
      return
    }

    // Check whether this user has completed onboarding
    const { data: profile } = await supabase
      .from('profiles')
      .select('has_onboarded')
      .eq('id', signInData.user.id)
      .maybeSingle()

    setLoading(false)

    if (profile?.has_onboarded) {
      navigate('/home')
    } else {
      navigate('/onboarding')
    }
  }

  function clearError(field) {
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.wordmark}>GlowUp</p>

        <Card padding="xl">
          <div className={styles.header}>
            <h1 className={styles.heading}>Welcome back</h1>
          </div>

          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            <TextInput
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => { setEmail(e.target.value); clearError('email') }}
              error={errors.email}
            />

            <TextInput
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => { setPassword(e.target.value); clearError('password') }}
              error={errors.password}
            />

            {formError && (
              <p className={styles.formError} role="alert">{formError}</p>
            )}

            <Button type="submit" fullWidth loading={loading}>
              Log in
            </Button>
          </form>
        </Card>

        <p className={styles.authSwitch}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>Sign up</Link>
        </p>
      </div>
    </div>
  )
}
