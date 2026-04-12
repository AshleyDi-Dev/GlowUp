import { Link } from 'react-router-dom'
import { useRecommendations } from '../hooks/useRecommendations'
import styles from './Recommendations.module.css'

// ── Shared primitives ─────────────────────────────────────────────

function ChipRow({ items }) {
  if (!items?.length) return null
  return (
    <div className={styles.chipRow}>
      {items.map((item, i) => (
        <span key={i} className={styles.chip}>{item}</span>
      ))}
    </div>
  )
}

function LabelledChips({ label, items }) {
  if (!items?.length) return null
  return (
    <div className={styles.group}>
      <p className={styles.groupLabel}>{label}</p>
      <ChipRow items={items} />
    </div>
  )
}

function AvoidBlock({ items }) {
  if (!items?.length) return null
  return (
    <div className={styles.avoidBlock}>
      <p className={styles.avoidLabel}>May be worth avoiding</p>
      <ul className={styles.avoidList}>
        {items.map((item, i) => (
          <li key={i} className={styles.avoidItem}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function SectionCard({ eyebrow, title, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionEyebrow}>{eyebrow}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function EmptySection({ message, quizPath, quizLabel }) {
  return (
    <div className={styles.emptySection}>
      <p className={styles.emptyText}>{message}</p>
      <Link to={quizPath} className={styles.emptyLink}>{quizLabel}</Link>
    </div>
  )
}

// ── Clothing section ──────────────────────────────────────────────

function ClothingSection({ clothing }) {
  if (!clothing) {
    return (
      <SectionCard eyebrow="Clothing" title="Silhouettes & cuts">
        <EmptySection
          message="Complete the body proportions quiz to unlock clothing recommendations."
          quizPath="/analyze/body"
          quizLabel="Take the body quiz"
        />
      </SectionCard>
    )
  }

  return (
    <SectionCard eyebrow="Clothing" title="Silhouettes & cuts">
      <p className={styles.whyText}>{clothing.why}</p>
      <ChipRow items={clothing.whatWorks} />
      <LabelledChips label="Necklines that tend to suit" items={clothing.necklines} />
      <LabelledChips label="Silhouettes to explore" items={clothing.silhouettes} />
      <AvoidBlock items={clothing.avoid} />
    </SectionCard>
  )
}

// ── Colour section ────────────────────────────────────────────────

function SwatchGrid({ swatches, small = false }) {
  if (!swatches?.length) return null
  return (
    <div className={styles.swatchGrid}>
      {swatches.map(({ name, hex }) => (
        <div key={hex} className={small ? styles.swatchItemSm : styles.swatchItem}>
          <div
            className={small ? styles.swatchColorSm : styles.swatchColor}
            style={{ background: hex }}
            title={hex}
            aria-label={name}
            role="img"
          />
          <span className={styles.swatchName}>{name}</span>
        </div>
      ))}
    </div>
  )
}

function ColourSection({ color }) {
  if (!color) {
    return (
      <SectionCard eyebrow="Colour" title="Your palette">
        <EmptySection
          message="Complete the colour analysis quiz to unlock your personal palette."
          quizPath="/analyze/color"
          quizLabel="Take the colour quiz"
        />
      </SectionCard>
    )
  }

  return (
    <SectionCard eyebrow="Colour" title="Your palette">
      <p className={styles.whyText}>{color.why}</p>
      <SwatchGrid swatches={color.paletteHero} />
      <div className={styles.group}>
        <p className={styles.groupLabel}>Your neutrals</p>
        <SwatchGrid swatches={color.neutrals} small />
      </div>
      {color.patternGuidance && (
        <p className={styles.patternNote}>{color.patternGuidance}</p>
      )}
      <LabelledChips label="Metals" items={color.metals} />
      <AvoidBlock items={color.avoid} />
      {color.upgradeTeaser && (
        <div className={styles.teaser}>
          <p className={styles.teaserText}>{color.upgradeTeaser}</p>
        </div>
      )}
    </SectionCard>
  )
}

// ── Hair section ──────────────────────────────────────────────────

function HairSubsection({ title, data }) {
  if (!data) return null
  return (
    <div className={styles.hairSubsection}>
      <p className={styles.subsectionTitle}>{title}</p>
      <p className={styles.whyText}>{data.why}</p>
      <ChipRow items={data.whatWorks} />
      <LabelledChips label="Product types to look for" items={data.productTypes} />
      {data.routineNote && (
        <p className={styles.patternNote}>{data.routineNote}</p>
      )}
      <AvoidBlock items={data.avoid} />
    </div>
  )
}

function HairSection({ hair }) {
  const hasAny = hair && (hair.texture || hair.density || hair.porosity)

  if (!hasAny) {
    return (
      <SectionCard eyebrow="Hair" title="Hair guidance">
        <EmptySection
          message="Complete the hair quiz to unlock personalised hair recommendations."
          quizPath="/analyze/hair"
          quizLabel="Take the hair quiz"
        />
      </SectionCard>
    )
  }

  const subsections = [
    { key: 'texture',  title: 'Texture',  data: hair.texture },
    { key: 'density',  title: 'Density',  data: hair.density },
    { key: 'porosity', title: 'Porosity', data: hair.porosity },
  ].filter(s => s.data)

  return (
    <SectionCard eyebrow="Hair" title="Hair guidance">
      {subsections.map((s, i) => (
        <div key={s.key}>
          {i > 0 && <div className={styles.subsectionDivider} />}
          <HairSubsection title={s.title} data={s.data} />
        </div>
      ))}
    </SectionCard>
  )
}

// ── Accessories section ───────────────────────────────────────────

function AccessoriesSection({ accessories }) {
  if (!accessories) {
    return (
      <SectionCard eyebrow="Accessories" title="Finishing touches">
        <EmptySection
          message="Complete the face shape quiz to unlock accessory recommendations."
          quizPath="/analyze/face"
          quizLabel="Take the face quiz"
        />
      </SectionCard>
    )
  }

  return (
    <SectionCard eyebrow="Accessories" title="Finishing touches">
      <p className={styles.whyText}>{accessories.why}</p>

      <div className={styles.group}>
        <p className={styles.groupLabel}>Earrings</p>
        <ChipRow items={accessories.earrings} />
        {accessories.earringsAvoid?.length > 0 && (
          <div className={styles.avoidInline}>
            {accessories.earringsAvoid.map((item, i) => (
              <p key={i} className={styles.avoidInlineText}>{item}</p>
            ))}
          </div>
        )}
      </div>

      <LabelledChips label="Necklace length" items={accessories.necklaceLength} />

      <div className={styles.group}>
        <p className={styles.groupLabel}>Glasses frames</p>
        <ChipRow items={accessories.glassesFrames} />
        {accessories.glassesAvoid && (
          <p className={styles.avoidInlineText}>{accessories.glassesAvoid}</p>
        )}
      </div>

      <LabelledChips label="Hat styles" items={accessories.hatStyles} />
    </SectionCard>
  )
}

// ── Main component ────────────────────────────────────────────────

export default function Recommendations() {
  const { recommendations, loading, error } = useRecommendations()

  if (loading) return null

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorText}>
            Something went wrong loading your recommendations. Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        <div className={styles.pageHeader}>
          <p className={styles.pageEyebrow}>Your style report</p>
          <h1 className={styles.pageHeading}>Recommendations</h1>
          <p className={styles.pageSubheading}>
            Personalised guidance based on your completed quizzes.
          </p>
        </div>

        <ClothingSection  clothing={recommendations?.clothing    ?? null} />
        <ColourSection    color={recommendations?.color          ?? null} />
        <HairSection      hair={recommendations?.hair            ?? null} />
        <AccessoriesSection accessories={recommendations?.accessories ?? null} />

      </div>
    </div>
  )
}
