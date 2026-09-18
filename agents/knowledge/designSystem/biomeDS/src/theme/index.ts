/**
 * Biome Design System — Theme Entry Point
 *
 * Re-exports all token groups individually and as a unified `tokens` object.
 * Import what you need:
 *
 *   import tokens from "@biome/design-system/theme"
 *   import { colors, typography } from "@biome/design-system/theme"
 */

export {
  colors,
  typography,
  spacing,
  sizing,
  radius,
  shadows,
  border,
  zIndex,
  opacity,
  layout,
  breakpoints,
  animation,
  tokens,
  tokens as default,
} from "./tokens"

export type {
  ColorToken,
  SpacingToken,
  SizingToken,
  RadiusToken,
  ShadowToken,
  BorderToken,
  ZIndexToken,
  OpacityToken,
  BreakpointToken,
  Tokens,
} from "./tokens"
