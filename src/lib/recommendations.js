// Clothing silhouette rules for Forme's recommendations engine.
// Sourced from: style_summary.body_type and style_summary.face_shape
//
// Body type is the primary rule. Face shape is a modifier that overrides
// the necklines field only — it does not create a full separate rule.
// faceModifiers only includes entries where guidance genuinely differs
// from the body-type base.

export const clothingRules = {

  bodyTypes: {

    Hourglass: {
      whatWorks: [
        'Wrap styles and belted silhouettes',
        'Fitted cuts that follow your shape',
        'Stretchy or draped fabrics that move with you',
        'High-waisted bottoms with tucked-in tops',
      ],
      why: 'Your shoulders and hips tend to be close in width with a naturally defined waist, so styles that follow your shape rather than obscure it often feel most balanced and intentional.',
      avoid: [
        'Very boxy or shapeless cuts',
        'Stiff fabrics that sit away from the body',
        'Extremely voluminous skirts that can overwhelm your proportions',
      ],
      necklines: ['V-neck', 'Sweetheart', 'Scoop neck'],
      silhouettes: ['Wrap dress', 'Fit-and-flare', 'Belted midi'],
      toneNote: 'Celebrate what's already there — this isn't about making the waist smaller, it's about working with a silhouette that naturally reads as balanced.',
    },

    Pear: {
      whatWorks: [
        'Structured or embellished tops that draw the eye upward',
        'A-line and flared skirts',
        'Wide-leg and straight-leg trousers',
        'Statement sleeves and interesting necklines',
      ],
      why: 'Your hips tend to be the fullest part of your frame — styles that add visual interest or structure above the waist can feel particularly balanced and intentional.',
      avoid: [
        'Tapered or skinny trousers that can emphasise the hip line',
        'Very heavy fabric concentrated below the waist',
        'Pencil skirts with no volume at the hem',
      ],
      necklines: ['Boat neck', 'Off-shoulder', 'Square neck'],
      silhouettes: ['A-line skirt', 'Wide-leg trouser', 'Empire waist dress'],
      toneNote: 'Frame this entirely as adding interest and energy above — never as reducing or balancing out below.',
    },

    Apple: {
      whatWorks: [
        'Empire and high-waist cuts that flow from above the fullest point',
        'Wrap styles with a defined tie',
        'Monochromatic dressing from top to toe',
        'Structured shoulders that create a strong upper frame',
      ],
      why: 'Your frame tends to carry more volume through the midsection — elongating cuts and a strong shoulder line often create a streamlined, confident silhouette.',
      avoid: [
        'Clingy fabrics across the midsection',
        'Cropped jackets that end at the widest point',
        'Very high-waisted bottoms that can cut across the midsection uncomfortably',
      ],
      necklines: ['V-neck', 'Deep scoop', 'Wrap'],
      silhouettes: ['Empire waist dress', 'Wrap dress', 'Shift dress'],
      toneNote: 'Emphasise elongation, ease, and confidence. The goal is a look that feels effortless and intentional, not one that appears to be working hard.',
    },

    Rectangle: {
      whatWorks: [
        'Belted and waist-defining styles',
        'Peplum and ruffle details that add movement',
        'High-waisted bottoms paired with tucked or cropped tops',
        'Layering to create visual depth',
      ],
      why: 'Your shoulders, waist, and hips tend to sit close in width — styles that introduce movement, texture, or a defined waist tend to add dimension and interest to your silhouette.',
      avoid: [
        'Extremely oversized pieces with no waist definition at all',
        'Very straight cuts in stiff fabric that read as flat',
        'Styles that cut horizontally at the widest point with no structure above or below',
      ],
      necklines: ['Square neck', 'V-neck', 'Scoop neck'],
      silhouettes: ['Peplum top', 'Belted wrap dress', 'A-line skirt'],
      toneNote: 'Frame this as creating shape and dimension, not adding curves. The goal is movement and interest, not a different body.',
    },

    'Inverted Triangle': {
      whatWorks: [
        'Wide-leg and flared trousers',
        'Full and A-line skirts',
        'Softer shoulder lines — raglan, dolman, or off-shoulder',
        'Details concentrated below the waist',
      ],
      why: 'Your shoulders tend to be your widest point — styles that introduce volume below the waist and soften the shoulder line often feel most balanced and naturally proportioned.',
      avoid: [
        'Strong shoulder details like padding or cap sleeves',
        'Strapless and halter styles that keep all the focus at the shoulders',
        'Very tapered hems that contrast sharply with the upper body',
      ],
      necklines: ['V-neck', 'Deep scoop', 'U-neck'],
      silhouettes: ['Wide-leg trouser', 'A-line skirt', 'Flared midi skirt'],
      toneNote: 'Treat lower volume as elegant and intentional — this is about proportion, not disguise.',
    },

  },

  // ── Face shape neckline overrides ──────────────────────────────────
  // Only included where the face-shape guidance genuinely conflicts with
  // or improves upon the body-type base necklines.

  faceModifiers: {

    Round: {
      // Base for Pear includes boat neck and square neck — both horizontal
      // lines that can amplify the roundness of a round face.
      Pear: {
        necklines: ['V-neck', 'Off-shoulder', 'Deep scoop'],
      },
      // Base for Rectangle includes square neck, which creates a strong
      // horizontal line that tends to widen a round face.
      Rectangle: {
        necklines: ['V-neck', 'Scoop neck', 'Cowl neck'],
      },
    },

    Heart: {
      // Base for Hourglass includes sweetheart, which tapers to a point
      // and can echo a heart face's narrow chin. Wider necklines add
      // perceived width at the jaw and feel more balanced.
      Hourglass: {
        necklines: ['Boat neck', 'Square neck', 'Off-shoulder'],
      },
      // Base for Apple is V-neck, deep scoop, wrap — all draw attention
      // centrally downward. A heart face tends to benefit from width at
      // the collarbone, which these don't offer.
      Apple: {
        necklines: ['Boat neck', 'Off-shoulder', 'Square neck'],
      },
      // Base for Inverted Triangle includes V-neck and deep scoop, which
      // can draw the eye toward a narrower chin rather than balancing it.
      // Softer, slightly wider necklines suit this combination better.
      'Inverted Triangle': {
        necklines: ['Cowl neck', 'Scoop neck', 'Square neck'],
      },
    },

    Square: {
      // Base for Pear includes square neck, which echoes and can
      // strengthen angular jaw features rather than softening them.
      Pear: {
        necklines: ['V-neck', 'Scoop neck', 'Off-shoulder'],
      },
      // Base for Rectangle includes square neck for the same reason —
      // it can reinforce rather than complement a square face shape.
      Rectangle: {
        necklines: ['V-neck', 'Scoop neck', 'Cowl neck'],
      },
    },

    Diamond: {
      // Base for Hourglass (V-neck, sweetheart, scoop) draws attention
      // to the center and narrows the perceived face width. Diamond faces
      // tend to benefit from necklines that add width at the collarbone.
      Hourglass: {
        necklines: ['Boat neck', 'Square neck', 'Off-shoulder'],
      },
      // Base for Apple is V-neck and deep scoop — same issue. Wider
      // necklines at the collarbone work better for a diamond face.
      Apple: {
        necklines: ['Boat neck', 'Off-shoulder', 'Square neck'],
      },
      // Base for Rectangle includes V-neck which narrows — swap to wider
      // options that add the breadth a diamond face shape benefits from.
      Rectangle: {
        necklines: ['Boat neck', 'Square neck', 'Scoop neck'],
      },
    },

    Oblong: {
      // Base for Hourglass (V-neck, sweetheart, scoop) all elongate —
      // which can make an already long face feel more pronounced.
      // Horizontal necklines add perceived width and break the vertical.
      Hourglass: {
        necklines: ['Boat neck', 'Square neck', 'Off-shoulder'],
      },
      // Base for Apple includes V-neck and deep scoop — both elongate.
      // Wider, more horizontal necklines suit an oblong face better.
      Apple: {
        necklines: ['Boat neck', 'Off-shoulder', 'Scoop neck'],
      },
      // Base for Rectangle includes V-neck which elongates. Override
      // with options that add horizontal interest near the face.
      Rectangle: {
        necklines: ['Boat neck', 'Square neck', 'Cowl neck'],
      },
      // Base for Inverted Triangle (V-neck, deep scoop, U-neck) all
      // create vertical pull — not ideal for an already long face.
      'Inverted Triangle': {
        necklines: ['Boat neck', 'Scoop neck', 'Off-shoulder'],
      },
    },

    // Oval: no overrides — oval is the most versatile face shape and
    // works naturally with all body-type base necklines.

  },

}
