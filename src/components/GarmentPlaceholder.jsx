import styles from './ImagePlaceholder.module.css'

// Asset map: GarmentPlaceholder[category][bodyType] = [img1, img2, img3]
// Add imports here as images are sourced.
// Naming convention: {Category}-{BodyType}-{1|2|3}.png
// e.g. Tops-Apple-1.png, Jackets-Pear-2.png
// Falls back to dashed placeholder for any null entry.

const GARMENT_ASSETS = {
  Tops:              { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Jackets:           { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Bottoms:           { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Dresses:           { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Skirts:            { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Outerwear:         { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Necklines:         { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
}

export default function GarmentPlaceholder({ category, bodyType }) {
  const images = GARMENT_ASSETS[category]?.[bodyType] ?? [null, null, null]

  return (
    <div className={styles.rowThree}>
      {images.map((src, i) => (
        src
          ? <div key={i} className={styles.boxFilled}>
              <img src={src} alt={`${bodyType} ${category} example ${i + 1}`} className={styles.image} />
            </div>
          : <div key={i} className={styles.box}>
              <span className={styles.label}>Image coming soon</span>
            </div>
      ))}
    </div>
  )
}
