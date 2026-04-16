import styles from './ImagePlaceholder.module.css'
import BottomsPear1 from '../assets/Bottoms-Pear-1.png'
import BottomsPear2 from '../assets/Bottoms-Pear-2.png'
import BottomsPear3 from '../assets/Bottoms-Pear-3.png'
import BottomsApple1 from '../assets/Bottoms-Apple-1.png'
import BottomsApple2 from '../assets/Bottoms-Apple-2.png'
import BottomsHourglass1 from '../assets/Bottoms-Hourglass-1.png'
import BottomsHourglass2 from '../assets/Bottoms-Hourglass-2.png'
import BottomsHourglass3 from '../assets/Bottoms-Hourglass-3.png'
import BottomsRectangle1 from '../assets/Bottoms-Rectangle-1.png'
import BottomsRectangle2 from '../assets/Bottoms-Rectangle-2.png'
import BottomsRectangle3 from '../assets/Bottoms-Rectangle-3.png'
import BottomsInvertedTriangle1 from '../assets/Bottoms-InvertedTriangle-1.png'
import BottomsInvertedTriangle2 from '../assets/Bottoms-InvertedTriangle-2.png'
import BottomsInvertedTriangle3 from '../assets/Bottoms-InvertedTriangle-3.png'


// Asset map: GarmentPlaceholder[category][bodyType] = [img1, img2, img3]
// Add imports here as images are sourced.
// Naming convention: {Category}-{BodyType}-{1|2|3}.png
// e.g. Tops-Apple-1.png, Jackets-Pear-2.png
// Falls back to dashed placeholder for any null entry.

const GARMENT_ASSETS = {
  Tops:              { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Jackets:           { Hourglass: [null,null,null], Pear: [null,null,null], Apple: [null,null,null], Rectangle: [null,null,null], 'Inverted Triangle': [null,null,null] },
  Bottoms:           { Hourglass: [BottomsHourglass1,BottomsHourglass2,BottomsHourglass3], Pear: [BottomsPear1,BottomsPear2,BottomsPear3], Apple: [BottomsApple1,BottomsApple2,null], Rectangle: [BottomsRectangle1,BottomsRectangle2,BottomsRectangle3], 'Inverted Triangle': [BottomsInvertedTriangle1,BottomsInvertedTriangle2,BottomsInvertedTriangle3] },
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
