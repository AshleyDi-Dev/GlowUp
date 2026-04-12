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

function Card({ eyebrow, title, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function EmptyState({ message, quizPath, quizLabel }) {
  return (
    <div className={styles.emptySection}>
      <p className={styles.emptyText}>{message}</p>
      <Link to={quizPath} className={styles.emptyLink}>{quizLabel}</Link>
    </div>
  )
}

// ── Garment cards ─────────────────────────────────────────────────

const GARMENT_NULL_MSG = 'Complete the body proportions quiz to unlock this category.'

function GarmentCard({ label, data }) {
  if (!data) {
    return (
      <Card eyebrow="Clothing" title={label}>
        <EmptyState message={GARMENT_NULL_MSG} quizPath="/analyze/body" quizLabel="Take the body quiz" />
      </Card>
    )
  }
  return (
    <Card eyebrow="Clothing" title={label}>
      <ChipRow items={data.whatWorks} />
      <AvoidBlock items={data.avoid} />
    </Card>
  )
}

function NecklinesCard({ necklines }) {
  if (!necklines) {
    return (
      <Card eyebrow="Clothing" title="Necklines">
        <EmptyState message={GARMENT_NULL_MSG} quizPath="/analyze/body" quizLabel="Take the body quiz" />
      </Card>
    )
  }
  return (
    <Card eyebrow="Clothing" title="Necklines">
      <ChipRow items={necklines} />
    </Card>
  )
}

// ── Haircuts card ─────────────────────────────────────────────────

function HaircutsCard({ haircuts }) {
  if (!haircuts) {
    return (
      <Card eyebrow="Hair" title="Haircuts">
        <EmptyState
          message="Complete the face shape quiz to unlock haircut recommendations."
          quizPath="/analyze/face"
          quizLabel="Take the face quiz"
        />
      </Card>
    )
  }
  return (
    <Card eyebrow="Hair" title="Haircuts">
      <ChipRow items={haircuts.whatWorks} />
      <AvoidBlock items={haircuts.avoid} />
      {haircuts.textureNote && (
        <p className={styles.patternNote}>{haircuts.textureNote}</p>
      )}
    </Card>
  )
}

// ── Accessories card ──────────────────────────────────────────────

function AccessoriesCard({ accessories }) {
  if (!accessories) {
    return (
      <Card eyebrow="Accessories" title="Finishing touches">
        <EmptyState
          message="Complete the face shape quiz to unlock accessory recommendations."
          quizPath="/analyze/face"
          quizLabel="Take the face quiz"
        />
      </Card>
    )
  }
  return (
    <Card eyebrow="Accessories" title="Finishing touches">
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
    </Card>
  )
}

// ── Colour card ───────────────────────────────────────────────────

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

function ColourCard({ color }) {
  if (!color) {
    return (
      <Card eyebrow="Colour" title="Your palette">
        <EmptyState
          message="Complete the colour analysis quiz to unlock your personal palette."
          quizPath="/analyze/color"
          quizLabel="Take the colour quiz"
        />
      </Card>
    )
  }
  return (
    <Card eyebrow="Colour" title="Your palette">
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
    </Card>
  )
}

// ── Hair info card ────────────────────────────────────────────────

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

function HairInfoCard({ hair }) {
  const hasAny = hair && (hair.texture || hair.density || hair.porosity)

  if (!hasAny) {
    return (
      <Card eyebrow="Hair" title="Hair info">
        <EmptyState
          message="Complete the hair quiz to unlock personalised hair recommendations."
          quizPath="/analyze/hair"
          quizLabel="Take the hair quiz"
        />
      </Card>
    )
  }

  const subsections = [
    { key: 'texture',  title: 'Texture',  data: hair.texture },
    { key: 'density',  title: 'Density',  data: hair.density },
    { key: 'porosity', title: 'Porosity', data: hair.porosity },
  ].filter(s => s.data)

  return (
    <Card eyebrow="Hair" title="Hair info">
      {subsections.map((s, i) => (
        <div key={s.key}>
          {i > 0 && <div className={styles.subsectionDivider} />}
          <HairSubsection title={s.title} data={s.data} />
        </div>
      ))}
    </Card>
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

  const { garments, color, accessories, hair, haircuts } = recommendations ?? {}

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

        {/* ── Clothing ── */}
        <GarmentCard  label="Tops"      data={garments?.tops}      />
        <GarmentCard  label="Jackets"   data={garments?.jackets}   />
        <GarmentCard  label="Bottoms"   data={garments?.bottoms}   />
        <GarmentCard  label="Dresses"   data={garments?.dresses}   />
        <GarmentCard  label="Skirts"    data={garments?.skirts}    />
        <GarmentCard  label="Outerwear" data={garments?.outerwear} />
        <NecklinesCard necklines={garments?.necklines} />

        {/* ── Face-based ── */}
        <HaircutsCard    haircuts={haircuts}       />
        <AccessoriesCard accessories={accessories} />

        {/* ── Colour ── */}
        <ColourCard color={color} />

        {/* ── Hair info ── */}
        <HairInfoCard hair={hair} />

        {/* Prints — coming soon */}
        {/* Glow-up — coming soon */}

      </div>
    </div>
  )
}
