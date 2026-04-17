// Garment-specific clothing rules for Forme's recommendations engine.
// Sourced from: style_summary.body_type and style_summary.face_shape
//
// Each garment category is keyed by body type: { whatWorks, avoid }.
// Necklines use body type as the base; face shape modifiers are applied
// at engine time via necklineFaceModifiers — only where guidance
// genuinely conflicts with the body-type base.

export const garmentRules = {

  // ── Tops ──────────────────────────────────────────────────────────

  tops: {

    Hourglass: {
      whatWorks: [
        'Fitted or semi-fitted styles',
        'Wrap tops',
        'Tucked-in blouses',
        'Ribbed knits',
      ],
      avoid: [
        'Extremely oversized or boxy tops that obscure the waist',
      ],
    },

    Pear: {
      whatWorks: [
        'Structured or embellished tops',
        'Bardot, off-shoulder, and boat neck',
        'Puff sleeves',
        'Statement necklines',
      ],
      avoid: [
        'Thin spaghetti straps with no structure',
        'Very plain fitted tops with no interest above the waist',
      ],
    },

    Apple: {
      whatWorks: [
        'Wrap tops',
        'V-neck blouses',
        'Floaty or draped fabric',
        'Empire-line tops',
        'Longline styles',
      ],
      avoid: [
        'Cropped tops',
        'Very fitted styles across the midsection',
        'Horizontal stripes across the torso',
      ],
    },

    Rectangle: {
      whatWorks: [
        'Peplum tops',
        'Ruffled or textured blouses',
        'Wrap tops',
        'Cropped styles with high-waisted bottoms',
      ],
      avoid: [
        'Very straight boxy styles with no shape or detail',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'Soft draped tops',
        'V-necks',
        'Dolman and raglan sleeves',
        'Simple fitted styles with no shoulder detail',
      ],
      avoid: [
        'Structured shoulders',
        'Cap sleeves',
        'Halter necks',
        'Heavy embellishment at the shoulders',
      ],
    },

  },

  // ── Jackets ───────────────────────────────────────────────────────

  jackets: {

    Hourglass: {
      whatWorks: [
        'Fitted blazers',
        'Belted jackets',
        'Tailored cuts that follow the waist',
      ],
      avoid: [
        'Boxy oversized blazers that hide the waist entirely',
      ],
    },

    Pear: {
      whatWorks: [
        'Structured blazers that end at the hip or above',
        'Cropped jackets',
        'Strong-shouldered styles',
      ],
      avoid: [
        'Jackets that flare or add volume at the hip',
        'Very long jackets that end at the widest point',
      ],
    },

    Apple: {
      whatWorks: [
        'Longline blazers',
        'Open-front styles',
        'Structured shoulders',
        'Single-button jackets',
      ],
      avoid: [
        'Cropped jackets that end at the waist',
        'Very fitted styles across the midsection',
      ],
    },

    Rectangle: {
      whatWorks: [
        'Belted or cinched jackets',
        'Textured or bouclé styles',
        'Double-breasted for structure',
      ],
      avoid: [
        'Completely shapeless unstructured styles',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'Hip-length or longer jackets',
        'Softer unstructured blazers',
        'No-shoulder-pad styles',
      ],
      avoid: [
        'Strongly padded shoulders',
        'Cropped jackets that emphasise the upper body',
      ],
    },

  },

  // ── Bottoms ───────────────────────────────────────────────────────

  bottoms: {

    Hourglass: {
      whatWorks: [
        'High-waisted trousers',
        'Straight-leg and wide-leg jeans',
        'Fitted skirts',
        'Tailored shorts',
      ],
      avoid: [
        'Very low-rise styles that sit below the natural waist',
      ],
    },

    Pear: {
      whatWorks: [
        'Wide-leg and straight-leg trousers',
        'A-line skirts',
        'Bootcut jeans',
        'Midi skirts with volume',
      ],
      avoid: [
        'Tapered or skinny trousers',
        'Pencil skirts with no volume',
        'Cargo pockets at the hip',
      ],
    },

    Apple: {
      whatWorks: [
        'Straight-leg and wide-leg trousers',
        'Pull-on or elasticated waists',
        'Palazzo pants',
      ],
      avoid: [
        'Very high-waisted styles that cut uncomfortably',
        'Extremely low-rise styles',
      ],
    },

    Rectangle: {
      whatWorks: [
        'High-waisted trousers',
        'Wide-leg jeans',
        'Textured or pleated trousers',
        'Paperbag waist styles',
      ],
      avoid: [
        'Very flat-front straight trousers in stiff fabric with no detail',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'Wide-leg trousers',
        'Full and pleated skirts',
        'Cargo styles',
        'Patterned or textured bottoms',
      ],
      avoid: [
        'Very tapered or straight-leg styles that contrast with broader shoulders',
      ],
    },

  },

  // ── Dresses ───────────────────────────────────────────────────────

  dresses: {

    Hourglass: {
      whatWorks: [
        'Wrap dresses',
        'Fit-and-flare',
        'Bodycon with stretch',
        'Belted midis',
      ],
      avoid: [
        'Completely shapeless shift dresses',
        'Drop-waist styles',
      ],
    },

    Pear: {
      whatWorks: [
        'Empire waist',
        'A-line',
        'Fit-and-flare',
        'Wrap dresses with a defined waist',
      ],
      avoid: [
        'Very fitted hip-skimming styles',
        'Shift dresses with no waist definition',
      ],
    },

    Apple: {
      whatWorks: [
        'Wrap dresses',
        'Shirt dresses worn open',
        'Empire waist',
        'Floaty midi styles',
      ],
      avoid: [
        'Very fitted bodycon styles',
        'Dresses with a defined waist that sits at the widest point',
      ],
    },

    Rectangle: {
      whatWorks: [
        'Wrap dresses',
        'Belted styles',
        'Dresses with ruffle or peplum detail',
        'Tiered midis',
      ],
      avoid: [
        'Completely straight shift dresses with no shape or movement',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'A-line',
        'Fit-and-flare',
        'Full skirt styles',
        'Wrap dresses with volume below the waist',
      ],
      avoid: [
        'Strapless or halter styles',
        'Very structured shoulders on dress tops',
      ],
    },

  },

  // ── Skirts ────────────────────────────────────────────────────────

  skirts: {

    Hourglass: {
      whatWorks: [
        'Fitted midi skirts',
        'Wrap skirts',
        'High-waisted pencil skirts',
        'A-line',
      ],
      avoid: [
        'Very voluminous full skirts that overpower the proportions',
      ],
    },

    Pear: {
      whatWorks: [
        'A-line',
        'Flared',
        'Pleated midis',
        'Tiered styles',
      ],
      avoid: [
        'Pencil skirts',
        'Very fitted straight skirts',
        'Wrap skirts that pull across the hip',
      ],
    },

    Apple: {
      whatWorks: [
        'A-line',
        'Floaty midi',
        'Elasticated waist styles',
        'Wrap skirts',
      ],
      avoid: [
        'Very fitted pencil skirts',
        'Styles with waistbands that dig in',
      ],
    },

    Rectangle: {
      whatWorks: [
        'Pleated, tiered, ruffled, or textured skirts',
        'Wrap styles',
      ],
      avoid: [
        'Flat-front pencil skirts with no detail or movement',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'Full and A-line skirts',
        'Tiered midis',
        'Pleated styles',
        'Patterned skirts',
      ],
      avoid: [
        'Very straight or fitted skirts that contrast with the broader upper body',
      ],
    },

  },

  // ── Outerwear ─────────────────────────────────────────────────────

  outerwear: {

    Hourglass: {
      whatWorks: [
        'Belted coats',
        'Wrap coats',
        'Fitted wool coats',
        'Trench coats with a tie',
      ],
      avoid: [
        'Completely unstructured puffer styles that hide the shape entirely',
      ],
    },

    Pear: {
      whatWorks: [
        'A-line coats',
        'Structured coats that skim the hip',
        'Trench coats',
      ],
      avoid: [
        'Coats that flare significantly at the hip',
        'Very voluminous puffers below the waist',
      ],
    },

    Apple: {
      whatWorks: [
        'Longline coats',
        'Open-front styles',
        "Straight-line coats that don't pull across the middle",
      ],
      avoid: [
        'Cropped jackets',
        'Very fitted coats across the midsection',
      ],
    },

    Rectangle: {
      whatWorks: [
        'Belted or wrap coats',
        'Double-breasted styles',
        'Textured or bouclé coats',
      ],
      avoid: [
        'Very straight unstructured longline coats with no shape',
      ],
    },

    'Inverted Triangle': {
      whatWorks: [
        'Hip-length or longer coats',
        'Raglan or dolman sleeve styles',
        'A-line silhouettes',
      ],
      avoid: [
        'Strongly padded or structured shoulders',
        'Cropped styles that draw attention to the upper body',
      ],
    },

  },

  // ── Necklines ─────────────────────────────────────────────────────
  // Base necklines per body type. Face shape modifiers are applied at
  // engine time via necklineFaceModifiers — only where guidance
  // genuinely conflicts with the body-type base.

  necklines: {
    Hourglass:           ['V-neck', 'Sweetheart', 'Scoop neck'],
    Pear:                ['Boat neck', 'Off-shoulder', 'Square neck'],
    Apple:               ['V-neck', 'Deep scoop', 'Wrap'],
    Rectangle:           ['Square neck', 'V-neck', 'Scoop neck'],
    'Inverted Triangle': ['V-neck', 'Deep scoop', 'U-neck'],
  },

  // ── Neckline face modifiers ────────────────────────────────────────
  // Preserved exactly from the original clothingRules.faceModifiers.
  // Only included where face-shape guidance genuinely conflicts with
  // or improves upon the body-type base necklines.

  necklineFaceModifiers: {

    Round: {
      Pear:      { necklines: ['V-neck', 'Off-shoulder', 'Deep scoop'] },
      Rectangle: { necklines: ['V-neck', 'Scoop neck', 'Cowl neck'] },
    },

    Heart: {
      Hourglass:           { necklines: ['Boat neck', 'Square neck', 'Off-shoulder'] },
      Apple:               { necklines: ['Boat neck', 'Off-shoulder', 'Square neck'] },
      'Inverted Triangle': { necklines: ['Cowl neck', 'Scoop neck', 'Square neck'] },
    },

    Square: {
      Pear:      { necklines: ['V-neck', 'Scoop neck', 'Off-shoulder'] },
      Rectangle: { necklines: ['V-neck', 'Scoop neck', 'Cowl neck'] },
    },

    Diamond: {
      Hourglass: { necklines: ['Boat neck', 'Square neck', 'Off-shoulder'] },
      Apple:     { necklines: ['Boat neck', 'Off-shoulder', 'Square neck'] },
      Rectangle: { necklines: ['Boat neck', 'Square neck', 'Scoop neck'] },
    },

    Oblong: {
      Hourglass:           { necklines: ['Boat neck', 'Square neck', 'Off-shoulder'] },
      Apple:               { necklines: ['Boat neck', 'Off-shoulder', 'Scoop neck'] },
      Rectangle:           { necklines: ['Boat neck', 'Square neck', 'Cowl neck'] },
      'Inverted Triangle': { necklines: ['Boat neck', 'Scoop neck', 'Off-shoulder'] },
    },

    // Oval: no overrides — works naturally with all body-type base necklines.

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


// ── Hair rules ─────────────────────────────────────────────────────
// Sourced from: style_summary.hair_texture, hair_density, hair_porosity
// Each attribute is looked up independently — they do not cross-reference.
//
// hair_texture: Straight | Wavy | Curly | Coily
// hair_density: Fine | Medium | Thick
// hair_porosity: Low | Normal | High

export const hairRules = {

  texture: {

    Straight: {
      whatWorks: [
        'Layered cuts that introduce movement and prevent the hair from lying completely flat',
        'Blunt bobs or lobs that use the natural sleekness to create a clean, intentional shape',
        'Sleek blowouts or glossy styles that lean into the texture rather than fighting it',
      ],
      why: 'Your hair tends to lie flat and smooth naturally, which means cuts with internal layering or deliberate shape may add the most dimension without requiring much effort to maintain.',
      avoid: [
        'Very heavy one-length styles with no layering, which can look flat rather than sleek',
        'Curling without the right products — styles tend to drop relatively quickly on straight hair',
        'Root-heavy volume styles that need significant product support to stay lifted',
      ],
      productTypes: [
        'Volumising mousse',
        'Lightweight heat protectant spray',
        'Shine-enhancing serum',
      ],
      routineNote: 'Straight hair tends to show oil build-up more quickly than other textures — washing every one to two days, or using a dry shampoo in between, can help maintain a fresh look.',
    },

    Wavy: {
      whatWorks: [
        'Wash-and-go styles that let the natural wave pattern emerge with minimal interference',
        'Layers that reduce bulk and encourage the wave to fall with more definition',
        'Diffusing on low heat rather than blow-drying straight — it tends to set the wave without creating frizz',
      ],
      why: 'Your hair tends to sit between straight and curly, with a natural texture that can range from gentle bends to defined S-waves — working with that pattern rather than against it often produces the most effortless results.',
      avoid: [
        'Brushing when dry, which can break up the wave and cause frizz',
        'Heavy creams or oils that weigh the wave down before it has a chance to form',
        'Very short blunt cuts without layering, which can make waves feel bushy rather than shaped',
      ],
      productTypes: [
        'Curl-enhancing cream or mousse',
        'Lightweight leave-in conditioner',
        'Diffuser attachment',
      ],
      routineNote: 'Scrunching product into damp hair and either air-drying or diffusing tends to give the most defined, frizz-free waves — avoid touching the hair while it dries to prevent disrupting the pattern.',
    },

    Curly: {
      whatWorks: [
        'Layered cuts that remove bulk and allow individual curls to spring into their natural shape',
        'Diffusing on low speed and heat rather than blow-drying straight',
        'Curl-friendly routines that prioritise moisture and gentle handling',
      ],
      why: 'Your hair tends to have a defined curl pattern that responds well to moisture and low-manipulation styling — the less it\'s disturbed while drying, the more consistently it may behave.',
      avoid: [
        'Brushing when dry, which tends to cause frizz and break up curl clumps',
        'Sulphate-heavy shampoos that can strip the moisture curly hair relies on',
        'Heat styling without a protectant, which can disrupt the curl pattern over time',
      ],
      productTypes: [
        'Curl-defining gel or cream',
        'Deep conditioning mask',
        'Microfibre towel or cotton T-shirt for drying',
      ],
      routineNote: 'Refreshing curls on non-wash days with a light mist of water and a small amount of product can significantly extend the life of a style — re-wetting and scrunching tends to revive shape without a full wash.',
    },

    Coily: {
      whatWorks: [
        'Protective styles like twists, braids, or updos that retain length and minimise daily manipulation',
        'Twist-outs or braid-outs for definition and stretch without heat',
        'Styles that embrace natural shrinkage rather than trying to counteract it',
      ],
      why: 'Your hair tends to have tight, springy coils that are naturally moisture-hungry — styles and routines built around hydration and gentle handling may produce the most consistent, healthy results.',
      avoid: [
        'Fine-tooth combs on dry hair, which can cause breakage',
        'Skipping moisture steps between washes — coily hair tends to dry out faster than other textures',
        'Styles with excessive tension at the roots, which can stress the hairline over time',
      ],
      productTypes: [
        'Heavy leave-in conditioner or hair butter',
        'Sealing oil',
        'Wide-tooth comb or fingers for detangling',
      ],
      routineNote: 'Applying product in layers on freshly washed, damp hair — starting with a liquid, then a cream or butter — can help lock in moisture more effectively than a single product step alone.',
    },

  },

  density: {

    Fine: {
      whatWorks: [
        'Blunt cuts or cuts with minimal layering that preserve the appearance of thickness',
        'Shorter styles — above the shoulder tends to feel fuller and more voluminous',
        'Volumising blowouts with a round brush that lift at the root',
      ],
      why: 'Your hair tends to have a fine strand width, which means individual strands may lack weight — styles that preserve or build perceived thickness at the ends tend to feel most flattering.',
      avoid: [
        'Very long, heavy one-length styles that can pull fine hair flat and make it look limp',
        'Heavy creams or oils applied at the root, which can weigh fine hair down quickly',
        'Excessive layering that thins the ends and makes the hair look sparse',
      ],
      productTypes: [
        'Volumising mousse',
        'Lightweight dry shampoo',
        'Texturising spray',
      ],
      routineNote: 'Applying products to the mid-lengths and ends rather than the roots can help avoid weighing fine hair down at the scalp — a small amount goes a long way.',
    },

    Medium: {
      whatWorks: [
        'Most cut styles tend to suit well — layers, blunt cuts, and textured finishes all work',
        'Versatile for both heat styling and air-drying without needing heavy product support',
        'A range of lengths tend to work, from shorter bobs to longer styles',
      ],
      why: 'Your hair tends to have a density that sits in a comfortable middle ground — enough body to hold styles without the weight that can make management challenging.',
      avoid: [
        'Skipping moisture balance — medium density hair can tip toward dryness or oiliness if the routine isn\'t calibrated to it',
        'Stacking chemical treatments too close together without adequate recovery time',
        'Neglecting regular trims, which can leave medium density hair looking uneven at the ends',
      ],
      productTypes: [
        'Balanced leave-in conditioner',
        'Lightweight styling cream',
        'Heat protectant',
      ],
      routineNote: 'Medium density hair tends to be relatively forgiving — regular trims every eight to twelve weeks and a consistent wash routine are usually enough to keep it looking its best.',
    },

    Thick: {
      whatWorks: [
        'Layered cuts that remove bulk and introduce movement — without layers, thick hair can feel heavy and shapeless',
        'Longer styles that use the natural weight to smooth and calm the surface',
        'Razor cuts or point cuts for texture and a lighter finish at the ends',
      ],
      why: 'Your hair tends to have a high density with a lot of strands — strategic layering and moisture-focused products can turn that natural volume into a genuine asset rather than a challenge.',
      avoid: [
        'Blunt one-length cuts with no layering, which can create a triangular or boxy silhouette',
        'Skipping deep conditioning — thick hair can become dry and prone to frizz without regular moisture',
        'Over-touching or over-brushing when styled, which tends to disrupt the shape and add frizz',
      ],
      productTypes: [
        'Smoothing serum or cream',
        'Deep conditioning mask',
        'Anti-frizz oil for finishing',
      ],
      routineNote: 'Sectioning hair before applying products or styling tends to make a significant difference with thick hair — working through it unsectioned can lead to uneven coverage and inconsistent results.',
    },

  },

  porosity: {

    Low: {
      whatWorks: [
        'Lightweight, liquid-based products that are less likely to sit on top of the cuticle',
        'Gentle heat during deep conditioning — a warm towel or heat cap can help open the cuticle and allow moisture in',
        'Regular clarifying washes to prevent product build-up, which low porosity hair is particularly prone to',
      ],
      why: 'Your hair tends to have a tightly closed cuticle, which means it can resist absorbing moisture and may be prone to product sitting on the surface rather than penetrating — lighter formulas and occasional clarifying tends to help most.',
      avoid: [
        'Heavy butters or dense creams that tend to layer on top rather than absorb',
        'Skipping clarifying washes — build-up is more common with low porosity hair and can leave it feeling coated',
        'Cold water rinses before products have had time to absorb, which can seal the cuticle prematurely',
      ],
      productTypes: [
        'Clarifying shampoo',
        'Lightweight leave-in mist or spray',
        'Liquid-based or water-first conditioner',
      ],
      routineNote: 'Applying a warm towel or using a heat cap during deep conditioning can help temporarily open the cuticle and allow moisture to penetrate — the heat step may make a noticeable difference in how well products absorb.',
    },

    Normal: {
      whatWorks: [
        'A straightforward wash and condition routine tends to be sufficient — most product types absorb well',
        'A balance of moisture and protein treatments maintains elasticity and shine effectively',
        'Flexibility to use a wider range of product weights and textures',
      ],
      why: 'Your hair tends to absorb and retain moisture at a balanced rate, which means it\'s generally responsive to a consistent routine without needing significant product adjustments.',
      avoid: [
        'Over-processing or overlapping chemical treatments without adequate recovery time between sessions',
        'Neglecting moisture over time — even normal porosity hair can drift toward dryness with repeated heat or colour',
        'Inconsistent routines, which can gradually shift the hair\'s moisture balance',
      ],
      productTypes: [
        'Balanced shampoo and conditioner',
        'Leave-in conditioner',
        'Occasional protein treatment',
      ],
      routineNote: 'A consistent routine tends to be the most effective approach — washing two to three times a week and conditioning each time generally keeps normal porosity hair in good condition without overcomplicating things.',
    },

    High: {
      whatWorks: [
        'Protein treatments to temporarily fill gaps in the cuticle and improve elasticity',
        'Heavier moisturisers and sealants that can compensate for the speed at which moisture is lost',
        'Layered moisture methods that add liquid, then cream, then a sealing oil or butter',
      ],
      why: 'Your hair tends to have a more open or porous cuticle, which means it absorbs moisture quickly but may lose it just as fast — sealing the moisture in after application tends to make the biggest difference.',
      avoid: [
        'Over-washing, which can strip what moisture high porosity hair manages to retain',
        'Skipping a sealant step after moisturising — without it, moisture tends to evaporate relatively quickly',
        'Excessive heat styling without a protectant, which can further lift and damage the cuticle over time',
      ],
      productTypes: [
        'Protein-based or strengthening conditioner',
        'Sealing oil or butter',
        'Deep conditioning mask for weekly use',
      ],
      routineNote: 'Finishing a wash with a cool or cold water rinse can help temporarily close the cuticle and seal in moisture — it\'s a simple step that can noticeably extend how long the hair stays hydrated between washes.',
    },

  },

}


// ── Haircut rules ──────────────────────────────────────────────────
// Sourced from: style_summary.face_shape
// Values: Oval | Round | Heart | Square | Diamond | Oblong
//
// textureNote cross-references hair_texture at display time — it is a
// plain string hint, not a structured lookup.

export const haircutRules = {

  Oval: {
    whatWorks: [
      'Most lengths and cuts tend to suit',
      'Long layers',
      'Bobs',
      'Pixie cuts',
    ],
    avoid: [
      'Styles so oversized they obscure the face shape',
    ],
    textureNote: 'Straight: any length works well. Wavy or curly: layers encourage movement. Coily: shape cuts that work with natural shrinkage.',
  },

  Round: {
    whatWorks: [
      'Longer styles',
      'Centre parts',
      'Long layers that frame the face',
      'Side-swept styles',
    ],
    avoid: [
      'Very short all-over cuts that sit wide at the sides',
    ],
    textureNote: 'Volume at the crown rather than the sides tends to elongate.',
  },

  Heart: {
    whatWorks: [
      'Side-swept fringe',
      'Chin-length bobs',
      'Styles with volume at the jaw',
    ],
    avoid: [
      'Very short styles above the jaw that expose the narrow chin',
    ],
    textureNote: 'Waves or curls from the jaw down can add welcome width.',
  },

  Square: {
    whatWorks: [
      'Soft layers around the face',
      'Side parts',
      'Waves or curls that soften the jaw',
    ],
    avoid: [
      'Very blunt straight styles that emphasise the jaw angle',
    ],
    textureNote: 'Texture and movement near the jaw tends to soften strong angles.',
  },

  Diamond: {
    whatWorks: [
      'Side-swept styles',
      'Chin-length or longer',
      'Volume at the forehead and jaw',
    ],
    avoid: [
      'Very short sides that emphasise cheekbone width',
    ],
    textureNote: 'Fringe or curtain bangs can add width at the forehead.',
  },

  Oblong: {
    whatWorks: [
      'Curtain bangs or fringe',
      'Styles with width at the sides',
      'Waves that add volume',
    ],
    avoid: [
      'Very long straight styles with no width',
    ],
    textureNote: 'Avoiding too much length and adding horizontal volume tends to suit best.',
  },

}
