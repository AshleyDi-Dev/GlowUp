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


// ── Accessory rules ────────────────────────────────────────────────
// Sourced from: style_summary.face_shape
// Values: Oval | Round | Heart | Square | Diamond | Oblong
//
// Each entry covers earrings, necklace length, glasses frames, and
// hat styles. Guidance uses tendency language throughout — these are
// suggestions, not rules.

export const accessoryRules = {

  Oval: {
    earrings: [
      'Most styles tend to suit — hoops, drops, and studs all work well',
      'Elongated drops or angular shapes can add definition without disrupting balance',
      'Sculptural or statement earrings may feel particularly intentional',
    ],
    earringsAvoid: [
      'Very long, narrow drops that may over-elongate an already balanced shape',
    ],
    necklaceLength: [
      'Princess length (16–18") tends to sit flatteringly at the collarbone',
      'Matinee length (20–24") can work well with open or lower necklines',
      'Most lengths tend to suit — versatility is the hallmark of an oval face',
    ],
    glassesFrames: [
      'Cat-eye frames can add a subtle lift and character',
      'Rectangular or geometric frames tend to add structure without looking harsh',
      'Oval or rounded frames may feel soft and harmonious',
    ],
    glassesAvoid: 'Frames so oversized they obscure the face rather than frame it',
    hatStyles: [
      'Fedoras and structured brims tend to suit well',
      'Beanies or slouchy styles can feel relaxed without disrupting proportion',
    ],
    why: 'Your face shape tends to be gently balanced in proportion, which means most accessory styles are open to you — the main consideration is choosing pieces that suit your personal aesthetic rather than working around specific constraints.',
  },

  Round: {
    earrings: [
      'Long drops or linear styles tend to create a lengthening effect',
      'Angular or geometric shapes may add welcome definition',
      'Ear climbers or vertical cluster designs can draw the eye upward',
    ],
    earringsAvoid: [
      'Large circular hoops or round studs that may echo and amplify the face\'s roundness',
      'Very wide, short styles that add horizontal width close to the face',
    ],
    necklaceLength: [
      'Longer pendant necklaces (matinee or opera length) tend to add a vertical line that can be elongating',
      'V-shaped or drop pendants may help create the impression of length',
      'Very short chokers close to the jaw tend to widen rather than lengthen',
    ],
    glassesFrames: [
      'Rectangular or angular frames tend to add definition and length',
      'Cat-eye frames can create a subtle lift at the outer corners',
      'Narrow or slightly taller frames may help introduce more vertical proportion',
    ],
    glassesAvoid: 'Round or circular frames that mirror the face shape',
    hatStyles: [
      'Taller-crowned styles like structured fedoras may add height and length',
      'Asymmetric or angled brims can introduce interesting angles',
    ],
    why: 'Your face shape tends to be softly curved and roughly equal in width and length, so accessories that introduce a vertical line or angular detail may help add definition and a sense of elongation.',
  },

  Heart: {
    earrings: [
      'Chandelier or teardrop styles that widen toward the bottom may feel particularly balanced',
      'Cluster earrings with weight below the lobe can help draw the eye downward',
      'Small to medium drops that don\'t draw attention to the forehead tend to suit well',
    ],
    earringsAvoid: [
      'Very top-heavy or wide statement pieces that add visual weight near the temples',
    ],
    necklaceLength: [
      'Longer pendant necklaces (matinee length) can draw the eye toward the chin and help balance a wider forehead',
      'Choker or collar styles worn lower on the throat may add perceived width near the jaw',
      'Delicate layered chains can feel balanced without adding too much weight at any one point',
    ],
    glassesFrames: [
      'Bottom-heavy or rimless frames with lighter upper edges may feel more balanced',
      'Oval frames tend to soften the forehead without adding emphasis',
      'Light, thin frames that don\'t add visual weight at the brow tend to suit well',
    ],
    glassesAvoid: 'Cat-eye or top-heavy frames that accentuate the upper face and wider forehead',
    hatStyles: [
      'Wide or floppy brims can help balance a narrower chin by broadening the visual frame',
      'Medium-brimmed styles like a soft boater may sit proportionally without overwhelming',
    ],
    why: 'Your face shape tends to be broader at the forehead and narrower at the chin, so accessories that add visual interest or weight toward the lower face may feel most balanced and harmonious.',
  },

  Square: {
    earrings: [
      'Round hoops or circular designs may soften angular jaw features',
      'Teardrop or oval drops tend to introduce gentle curves that complement a square face',
      'Long, fluid earrings can add length and movement near the jawline',
    ],
    earringsAvoid: [
      'Very geometric or square-edged earrings that can echo and strengthen the jaw angle',
    ],
    necklaceLength: [
      'Longer V-shaped pendants or opera-length chains may help elongate and soften',
      'Delicate drop necklaces that draw the eye vertically can feel particularly elegant',
      'Curved or circular pendants may introduce softness near the face',
    ],
    glassesFrames: [
      'Round or oval frames tend to soften strong angular features',
      'Cat-eye frames can introduce an upward curve that complements the jawline',
      'Rimless or lightweight frames may feel less competing with bold bone structure',
    ],
    glassesAvoid: 'Square or strongly rectangular frames that mirror the jaw\'s angularity',
    hatStyles: [
      'Soft, unstructured styles like a slouchy beanie can feel relaxed rather than angular',
      'Asymmetric or curved-brim styles may introduce gentle movement',
    ],
    why: 'Your face shape tends to have strong, defined angles — particularly at the jaw — so accessories that introduce soft curves or vertical lines may feel most complementary and naturally balanced.',
  },

  Diamond: {
    earrings: [
      'Studs or small huggies that sit close to the ear tend to suit — they avoid drawing the eye further outward at the cheekbones',
      'Ear climbers or designs that sit along the lobe may feel elegant and proportionate',
      'Subtle drops of medium length can work well without exaggerating the cheekbone width',
    ],
    earringsAvoid: [
      'Very long or heavily weighted drops that may emphasise the narrow chin',
      'Very wide statement earrings that further broaden the cheekbone area',
    ],
    necklaceLength: [
      'Choker or collar styles tend to add width near the collarbone and draw the eye outward',
      'Princess-length necklaces may sit flatteringly without pulling the eye downward',
      'Wider or collar-style statement pieces can help balance the narrower forehead and chin',
    ],
    glassesFrames: [
      'Cat-eye or upswept frames can add width at the brow and balance a narrower forehead',
      'Oval frames tend to harmonise with the natural curves of this face shape',
      'Rimless or semi-rimless styles may feel light and proportionate',
    ],
    glassesAvoid: 'Narrow frames or very angular shapes that accentuate the cheekbone width without adding balance above or below',
    hatStyles: [
      'Medium-brimmed styles can add width at the top without drawing attention to the narrow chin',
      'Structured hats with a defined crown may feel proportionate and grounded',
    ],
    why: 'Your face shape tends to be widest at the cheekbones with a narrower forehead and chin, so accessories that add width near the brow or collarbone may help create a sense of balance across the face.',
  },

  Oblong: {
    earrings: [
      'Wide hoops or circular earrings tend to add horizontal width and break the vertical line',
      'Chandelier or broad cluster styles may help widen the perceived face',
      'Button studs or short styles that sit wide at the ear can work particularly well',
    ],
    earringsAvoid: [
      'Very long pendant drops that may further elongate the face',
    ],
    necklaceLength: [
      'Choker or collar-length styles tend to add a strong horizontal break near the chin',
      'Princess-length necklaces may sit well without pulling the eye too far downward',
      'Wide or statement collar pieces can help add breadth at the neckline',
    ],
    glassesFrames: [
      'Wide rectangular frames tend to add horizontal width and break the vertical proportion',
      'Round or oversized frames may help widen and soften a longer face',
      'Deep-set frames with more vertical height can feel proportionate without elongating further',
    ],
    glassesAvoid: 'Narrow or vertically tall frames that may exaggerate the length of the face',
    hatStyles: [
      'Wide, flat-brimmed styles tend to add horizontal breadth and interrupt the vertical line',
      'Bucket hats or styles with a full, rounded crown may feel balanced without adding height',
    ],
    why: 'Your face shape tends to be noticeably longer than it is wide, so accessories that introduce horizontal lines or add width near the face may help create a sense of proportion and balance.',
  },

}
