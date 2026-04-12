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
      toneNote: 'Celebrate what\'s already there — this isn\'t about making the waist smaller, it\'s about working with a silhouette that naturally reads as balanced.',
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

// ── Colour palette rules ───────────────────────────────────────────
// Sourced from: style_summary.color_season
// Values: Spring | Summer | Autumn | Winter

export const colorRules = {

  Spring: {
    paletteHero: [
      { name: 'Warm peach',     hex: '#FFCBA4' },
      { name: 'Coral',          hex: '#F08060' },
      { name: 'Golden yellow',  hex: '#F5C842' },
      { name: 'Warm salmon',    hex: '#F4916A' },
      { name: 'Clear turquoise',hex: '#40C8A8' },
      { name: 'Apple green',    hex: '#8AC86A' },
      { name: 'Warm ivory',     hex: '#FBF0DC' },
      { name: 'Butterscotch',   hex: '#D4956A' },
    ],
    neutrals: [
      { name: 'Cream',       hex: '#FBF0E0' },
      { name: 'Camel',       hex: '#C8966A' },
      { name: 'Warm tan',    hex: '#D4A870' },
      { name: 'Warm taupe',  hex: '#B89878' },
    ],
    avoid: [
      'Cool or icy pastels — they can make warm colouring look washed out',
      'Dusty or heavily muted tones — they tend to sit flat against a clear complexion',
      'Stark black worn close to the face — a warm dark brown or deep olive tends to feel more natural',
    ],
    patternGuidance: 'Clear, warm-toned patterns with light to medium contrast tend to feel most cohesive — delicate florals, playful ditsy prints, and warm animal prints can work especially well.',
    metals: ['Gold', 'Rose gold'],
    why: 'Your colouring tends to have a warm, clear quality — colours with golden undertones and enough brightness to feel alive may bring out a natural warmth and luminosity in your complexion.',
    upgradeTeaser: 'Spring has three sub-seasons — Light Spring, True Spring, and Bright Spring each suit a slightly different balance of warmth and clarity, unlocking a more precise palette.',
  },

  Summer: {
    paletteHero: [
      { name: 'Soft rose',      hex: '#E8A0A8' },
      { name: 'Lavender',       hex: '#B8A8D0' },
      { name: 'Powder blue',    hex: '#9ABCD4' },
      { name: 'Dusty mauve',    hex: '#C09098' },
      { name: 'Soft teal',      hex: '#7AB0B8' },
      { name: 'Periwinkle',     hex: '#9898C8' },
      { name: 'Soft plum',      hex: '#A87890' },
      { name: 'Rose beige',     hex: '#D4A8A0' },
    ],
    neutrals: [
      { name: 'Soft white',   hex: '#F4F0F4' },
      { name: 'Cool taupe',   hex: '#B0A0A0' },
      { name: 'Dove gray',    hex: '#A0A0B0' },
      { name: 'Dusty blush',  hex: '#C8B0A8' },
    ],
    avoid: [
      'Warm or orange-based tones — they can create a sallow effect against cool colouring',
      'Very bright or highly saturated colours — they may overpower a naturally soft complexion',
      'High-contrast combinations close to the face — they can feel jarring against softer features',
    ],
    patternGuidance: 'Soft, blended patterns with low contrast tend to feel most harmonious — watercolour florals, tonal stripes, and subtle ditsy prints can be particularly flattering.',
    metals: ['Silver', 'White gold', 'Platinum'],
    why: 'Your colouring tends to have a cool, soft quality — colours that are gently muted rather than saturated may bring out a natural delicacy and refinement in your complexion.',
    upgradeTeaser: 'Summer has three sub-seasons — Light Summer, True Summer, and Soft Summer each suit a different balance of softness and depth, unlocking a more tailored palette.',
  },

  Autumn: {
    paletteHero: [
      { name: 'Terracotta',   hex: '#C06448' },
      { name: 'Rust',         hex: '#B85028' },
      { name: 'Olive green',  hex: '#787840' },
      { name: 'Mustard',      hex: '#C8A030' },
      { name: 'Forest green', hex: '#386858' },
      { name: 'Warm brown',   hex: '#946048' },
      { name: 'Pumpkin',      hex: '#C87038' },
      { name: 'Burnt sienna', hex: '#A84830' },
    ],
    neutrals: [
      { name: 'Camel',          hex: '#C09060' },
      { name: 'Chocolate brown',hex: '#6A3820' },
      { name: 'Warm cream',     hex: '#F0E0C0' },
      { name: 'Khaki',          hex: '#A09060' },
    ],
    avoid: [
      'Icy or cool pastels — they tend to sit in contrast with warm colouring rather than harmonising with it',
      'Bright, clear colours without warmth or mutedness — they can feel sharp against an earthy complexion',
      'Cool blue or blue-pink tones — they may work against the golden undertones in your colouring',
    ],
    patternGuidance: 'Rich, warm-toned patterns with moderate contrast tend to feel most natural — earthy geometrics, organic abstract prints, and tone-on-tone textures can feel especially grounded.',
    metals: ['Gold', 'Copper', 'Bronze'],
    why: 'Your colouring tends to have a warm, muted quality — earthy colours with golden or amber undertones may bring out a rich, natural depth and warmth in your complexion.',
    upgradeTeaser: 'Autumn has three sub-seasons — Soft Autumn, True Autumn, and Deep Autumn each suit a slightly different level of depth and intensity, unlocking your most accurate palette.',
  },

  Winter: {
    paletteHero: [
      { name: 'True red',     hex: '#CC2040' },
      { name: 'Cobalt blue',  hex: '#1840AA' },
      { name: 'Emerald',      hex: '#0A8040' },
      { name: 'Fuchsia',      hex: '#E01888' },
      { name: 'Royal purple', hex: '#7A1090' },
      { name: 'Pure white',   hex: '#F8F8F8' },
      { name: 'Black',        hex: '#0A0A0A' },
      { name: 'Icy pink',     hex: '#F8C0D0' },
    ],
    neutrals: [
      { name: 'Pure white', hex: '#F8F8F8' },
      { name: 'Black',      hex: '#0A0A0A' },
      { name: 'Charcoal',   hex: '#2A2A32' },
      { name: 'Navy',       hex: '#10204A' },
    ],
    avoid: [
      'Warm or yellow-based tones — they can make cool colouring look dull or sallow',
      'Dusty or earthy muted colours — they tend to flatten rather than complement high-contrast features',
      'Soft pastels without brightness or clarity — they may wash out a naturally bold complexion',
    ],
    patternGuidance: 'Bold, high-contrast patterns tend to work particularly well — stark geometric prints, strong colour-blocking, and clean graphic motifs can feel intentional and striking.',
    metals: ['Silver', 'Platinum', 'White gold'],
    why: 'Your colouring tends to have a cool, clear quality — colours with depth and contrast may bring out a natural boldness and definition in your complexion.',
    upgradeTeaser: 'Winter has three sub-seasons — True Winter, Bright Winter, and Deep Winter each suit a different level of contrast and intensity, unlocking a more precise palette.',
  },

}
