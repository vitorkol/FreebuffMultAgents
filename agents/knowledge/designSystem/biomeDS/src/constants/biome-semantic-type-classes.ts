/**
 * Classes utilitárias da escala tipográfica semântica do Biome (`text-display-*`, `text-body-*`, …).
 * Usadas pelo `tailwind-merge` para não serem tratadas como `text-color` (catch-all `text-*`).
 */
export const BIOME_SEMANTIC_TYPE_CLASSES = [
  "text-display-2xl",
  "text-display-xl",
  "text-display-l",
  "text-heading-xl",
  "text-heading-l",
  "text-heading-m",
  "text-heading-s",
  "text-heading-xs",
  "text-body-l",
  "text-body-m",
  "text-body-s",
  "text-body-xs",
  "text-label-m",
  "text-label-s",
  "text-meta-xs",
  "text-meta-2xs",
] as const

export type BiomeSemanticTypeClass = (typeof BIOME_SEMANTIC_TYPE_CLASSES)[number]
