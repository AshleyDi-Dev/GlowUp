// Recommendations engine for Forme.
//
// Usage:
//   import { getRecommendations } from './recommendationsEngine'
//   const recs = getRecommendations(styleSummaryRow)
//
// Pass the style_summary row for the current user directly from Supabase.
// The function is pure — it does not fetch, mutate, or produce side effects.
// Any missing or unrecognised field returns null for that category rather
// than throwing, so it is safe to call with a partially complete summary.

import { garmentRules, colorRules, accessoryRules, hairRules, haircutRules } from './recommendations'

export function getRecommendations(styleSummary = {}) {
  const {
    body_type,
    face_shape,
    color_season,
    hair_texture,
    hair_density,
    hair_porosity,
  } = styleSummary

  // ── Garments ─────────────────────────────────────────────────────
  // Each category is keyed by body_type. Necklines use the body_type
  // base, with face_shape applied as a modifier where one exists.
  const faceNecklineOverride = garmentRules.necklineFaceModifiers?.[face_shape]?.[body_type]
  const necklines = faceNecklineOverride?.necklines ?? garmentRules.necklines?.[body_type] ?? null

  const garments = body_type ? {
    tops:      garmentRules.tops?.[body_type]      ?? null,
    jackets:   garmentRules.jackets?.[body_type]   ?? null,
    bottoms:   garmentRules.bottoms?.[body_type]   ?? null,
    dresses:   garmentRules.dresses?.[body_type]   ?? null,
    skirts:    garmentRules.skirts?.[body_type]    ?? null,
    outerwear: garmentRules.outerwear?.[body_type] ?? null,
    necklines,
  } : null

  // ── Colour ──────────────────────────────────────────────────────
  const color = colorRules?.[color_season] ?? null

  // ── Accessories ─────────────────────────────────────────────────
  const accessories = accessoryRules?.[face_shape] ?? null

  // ── Hair ────────────────────────────────────────────────────────
  const hair = {
    texture:  hairRules.texture?.[hair_texture]   ?? null,
    density:  hairRules.density?.[hair_density]   ?? null,
    porosity: hairRules.porosity?.[hair_porosity] ?? null,
  }

  // ── Haircuts ─────────────────────────────────────────────────────
  const haircuts = haircutRules?.[face_shape] ?? null

  return { garments, color, accessories, hair, haircuts }
}
