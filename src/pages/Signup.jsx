import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import Card from '../components/Card'
import styles from './Signup.module.css'

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password) {
  return password.length >= 8
}

function ConfirmationView({ email, onTryAgain }) {
  return (
    <>
      <Card padding="xl">
        <div className={styles.header}>
          <h1 className={styles.heading}>Check your email</h1>
          <p className={styles.subheading}>
            We've sent a confirmation link to <strong>{email}</strong>. Click the
            link to activate your account and get started.
          </p>
        </div>
        <p className={styles.retryNote}>
          Didn't receive it? Check your spam folder or{' '}
          <button type="button" className={styles.retryLink} onClick={onTryAgain}>
            try again
          </button>
          .
        </p>
      </Card>

      <p className={styles.authSwitch}>
        Already have an account?{' '}
        <Link to="/login" className={styles.link}>Log in</Link>
      </p>
    </>
  )
}

export default function Signup() {
  const [firstName, setFirstName]             = useState('')
  const [email, setEmail]                     = useState('')
  const [password, setPassword]               = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading]                 = useState(false)
  const [errors, setErrors]                   = useState({})
  const [formError, setFormError]             = useState('')
  const [submitted, setSubmitted]             = useState(false)
  const [submittedEmail, setSubmittedEmail]   = useState('')

  function validate() {
    const next = {}

    if (!firstName.trim()) {
      next.firstName = 'First name is required.'
    }

    if (!email) {
      next.email = 'Email is required.'
    } else if (!validateEmail(email)) {
      next.email = 'Enter a valid email address.'
    }

    if (!password) {
      next.password = 'Password is required.'
    } else if (!validatePassword(password)) {
      next.password = 'Password must be at least 8 characters.'
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password.'
    } else if (password && confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match.'
    }

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: firstName.trim() } },
    })

    setLoading(false)

    if (error) {
      if (error.message.toLowerCase().includes('already registered') ||
          error.message.toLowerCase().includes('already exists') ||
          error.message.toLowerCase().includes('user already')) {
        setErrors({ email: 'An account with this email already exists.' })
      } else {
        setFormError(error.message)
      }
      return
    }

    setSubmittedEmail(email)
    setSubmitted(true)
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

  function handleTryAgain() {
    setSubmitted(false)
    setPassword('')
    setConfirmPassword('')
    setErrors({})
    setFormError('')
    setFirstName('')
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.wordmark}>Forme</p>

        {submitted ? (
          <ConfirmationView email={submittedEmail} onTryAgain={handleTryAgain} />
        ) : (
          <>
            <Card padding="xl">
              <div className={styles.header}>
                <h1 className={styles.heading}>Create your account</h1>
                <p className={styles.subheading}>
                  Save your style profile, measurements, quiz history, and wardrobe notes.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className={styles.form}>
                <TextInput
                  label="First name"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value); clearError('firstName') }}
                  error={errors.firstName}
                />

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
                  autoComplete="new-password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); clearError('password') }}
                  error={errors.password}
                  helperText={!errors.password ? 'Minimum 8 characters.' : undefined}
                />

                <TextInput
                  label="Confirm password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); clearError('confirmPassword') }}
                  error={errors.confirmPassword}
                />

                {formError && (
                  <p className={styles.formError} role="alert">{formError}</p>
                )}

                <Button type="submit" fullWidth loading={loading}>
                  Create account
                </Button>

                <p className={styles.socialNote}>Apple and Google sign in coming soon</p>
              </form>
            </Card>

            <p className={styles.authSwitch}>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
