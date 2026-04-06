import { useState } from 'react'
import ProgressBar from './ProgressBar'
import SelectionCard from './SelectionCard'
import Button from './Button'
import styles from './QuizEngine.module.css'

/**
 * QuizEngine — generic single-question-at-a-time quiz component.
 *
 * @param {Array}    questions        — array of question objects (see shape below)
 * @param {function} onComplete       — called with answers object when quiz finishes
 * @param {object}   previousResult   — if set, shows result screen first with retake option
 * @param {function} renderResult     — renders the result UI given previousResult
 *
 * Question shape:
 * {
 *   id:      string,
 *   title:   string,
 *   tip:     string | null,        — optional helper callout beneath the question
 *   guide:   ReactNode | null,     — optional visual guide above the answer options
 *   options: Array<{
 *     value:    string,
 *     label:    string,
 *     icon:     string | null,
 *     imageSrc: string | null,
 *     imageAlt: string | null,
 *   }>
 * }
 */
export default function QuizEngine({
  questions,
  onComplete,
  previousResult = null,
  renderResult   = null,
}) {
  const [phase, setPhase]     = useState(previousResult ? 'result' : 'quiz')
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})

  const current  = questions[step]
  const total    = questions.length
  const progress = Math.round(((step) / total) * 100)
  const isLast   = step === total - 1
  const selected = answers[current?.id] ?? null

  function handleSelect(value) {
    setAnswers(prev => ({ ...prev, [current.id]: value }))
  }

  function handleNext() {
    if (!selected && !current.optional) return
    if (isLast) {
      onComplete(answers)
    } else {
      setStep(s => s + 1)
    }
  }

  function handleBack() {
    if (step === 0) return
    setStep(s => s - 1)
  }

  function handleRetake() {
    setAnswers({})
    setStep(0)
    setPhase('quiz')
  }

  // ── Result screen ──────────────────────────────────────────────
  if (phase === 'result' && previousResult) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          {renderResult ? renderResult(previousResult) : (
            <p className={styles.resultPlaceholder}>Result: {JSON.stringify(previousResult)}</p>
          )}
          <Button variant="ghost" fullWidth onClick={handleRetake}>
            Retake quiz
          </Button>
        </div>
      </div>
    )
  }

  // ── Quiz screen ────────────────────────────────────────────────
  return (
    <div className={styles.page}>

      {/* Top bar */}
      <div className={styles.topBar}>
        {step > 0 ? (
          <button
            type="button"
            className={styles.backBtn}
            onClick={handleBack}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <polyline
                points="13,4 7,10 13,16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className={styles.backPlaceholder} />
        )}

        <div className={styles.progressWrap}>
          <ProgressBar value={progress} />
        </div>

        <span className={styles.stepCount}>{step + 1}/{total}</span>
      </div>

      {/* Question */}
      <div className={styles.container}>
        <div className={styles.questionBlock}>
          <h2 className={styles.questionTitle}>{current.title}</h2>

          {current.tip && (
            <div className={styles.tip} role="note">
              <span className={styles.tipIcon} aria-hidden="true">◎</span>
              <p className={styles.tipText}>{current.tip}</p>
            </div>
          )}
        </div>

        {/* Optional visual guide */}
        {current.guide && (
          <div className={styles.guide}>
            {current.guide}
          </div>
        )}

        {/* Answer options */}
        <div className={styles.options}>
          {current.options.map(opt => (
            <SelectionCard
              key={opt.value}
              label={opt.label}
              selected={selected === opt.value}
              onSelect={() => handleSelect(opt.value)}
              icon={opt.icon ?? undefined}
              imageSrc={opt.imageSrc ?? undefined}
              imageAlt={opt.imageAlt ?? undefined}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <Button
            fullWidth
            disabled={!selected && !current.optional}
            onClick={handleNext}
          >
            {isLast
              ? (selected ? 'See my results' : 'Skip & see results')
              : (selected ? 'Next' : 'Skip')}
          </Button>
        </div>
      </div>

    </div>
  )
}
