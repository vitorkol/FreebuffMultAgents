/**
 * Biome Design System — Design Tokens
 *
 * All tokens reference CSS custom properties defined in styles.css.
 * Values are always resolved at runtime, enabling seamless dark-mode
 * switching without re-importing or re-computing anything in JavaScript.
 *
 * Token categories:
 *   colors        → semantic color roles + brand + feedback + surface
 *   typography    → font families, sizes, weights, line heights, letter spacing
 *   spacing       → 4px-base numeric scale + semantic aliases
 *   sizing        → component height scale (sm / md / lg / xl)
 *   radius        → border radius scale
 *   shadows       → elevation scale
 *   border        → width and style
 *   zIndex        → layering stack
 *   opacity       → interaction states
 *   layout        → header height, container width, padding
 *   breakpoints   → viewport breakpoints (reference — use Tailwind prefixes in JSX)
 *   animation     → transition durations, easing functions
 */


export const colors = {
  background: "var(--color-background)",
  foreground: "var(--color-foreground)",
  card: "var(--color-card)",
  cardForeground: "var(--color-card-foreground)",
  popover: "var(--color-popover)",
  popoverForeground: "var(--color-popover-foreground)",

  primary: "var(--color-primary)",
  primaryForeground: "var(--color-primary-foreground)",
  secondary: "var(--color-secondary)",
  secondaryForeground: "var(--color-secondary-foreground)",
  muted: "var(--color-muted)",
  mutedForeground: "var(--color-muted-foreground)",
  accent: "var(--color-accent)",
  accentForeground: "var(--color-accent-foreground)",

  // Feedback — solid fill (icon fills, solid buttons, badges)
  destructive: "var(--color-destructive)",
  destructiveForeground: "var(--color-destructive-foreground)",
  success: "var(--color-success)",
  successForeground: "var(--color-success-foreground)",
  warning: "var(--color-warning)",
  warningForeground: "var(--color-warning-foreground)",
  info: "var(--color-info)",
  infoForeground: "var(--color-info-foreground)",

  // Feedback — surface (tinted alert / status-badge backgrounds)
  // Pattern: bg-{intent}-surface  border-{intent}-surface-border  text-{intent}-on-surface
  successSurface: "var(--color-success-surface)",
  successSurfaceBorder: "var(--color-success-surface-border)",
  successOnSurface: "var(--color-success-on-surface)",

  warningSurface: "var(--color-warning-surface)",
  warningSurfaceBorder: "var(--color-warning-surface-border)",
  warningOnSurface: "var(--color-warning-on-surface)",

  infoSurface: "var(--color-info-surface)",
  infoSurfaceBorder: "var(--color-info-surface-border)",
  infoOnSurface: "var(--color-info-on-surface)",

  destructiveSurface: "var(--color-destructive-surface)",
  destructiveSurfaceBorder: "var(--color-destructive-surface-border)",
  destructiveOnSurface: "var(--color-destructive-on-surface)",

  neutralSurface: "var(--color-neutral-surface)",
  neutralSurfaceBorder: "var(--color-neutral-surface-border)",
  neutralOnSurface: "var(--color-neutral-on-surface)",

  border: "var(--color-border)",
  input: "var(--color-input)",
  inputFocus: "var(--color-input-focus)",
  inputError: "var(--color-input-error)",
  inputSuccess: "var(--color-input-success)",
  ring: "var(--color-ring)",
  label: "var(--color-label)",
  labelRequired: "var(--color-label-required)",

  textPrimary: "var(--color-text-primary)",
  textMuted: "var(--color-text-muted)",
  textPlaceholder: "var(--color-text-placeholder)",
  textDisabled: "var(--color-text-disabled)",
  textInverse: "var(--color-text-inverse)",
  link: "var(--color-link)",

  brandGreen: "var(--color-brand-green)",
  brandGreenDark: "var(--color-brand-green-dark)",
  brandGreenLight: "var(--color-brand-green-light)",
  brandLime: "var(--color-brand-lime)",
  mint: "var(--color-mint)",

  footerBg: "var(--color-footer-bg)",
  sectionGray: "var(--color-section-gray)",

  /** Badge marketing — sale (equiv. legacy red-600) */
  sale: "var(--color-sale)",
  saleForeground: "var(--color-sale-foreground)",
  /** Badge marketing — promo (equiv. legacy orange-500) */
  promo: "var(--color-promo)",
  promoForeground: "var(--color-promo-foreground)",
} as const

export type ColorToken = keyof typeof colors


export const typography = {
  fontFamily: {
    /** Roboto — body text, UI labels, inputs */
    sans: "var(--font-sans)",
    /** Poppins — headings, display text */
    display: "var(--font-display)",
  },

  fontSize: {
    "2xs": "var(--font-size-2xs)", /* 10px */
    xs:   "var(--font-size-xs)",   /* 12px */
    sm:   "var(--font-size-sm)",   /* 14px */
    base: "var(--font-size-base)", /* 16px */
    lg:   "var(--font-size-lg)",   /* 18px */
    xl:   "var(--font-size-xl)",   /* 20px */
    "2xl": "var(--font-size-2xl)", /* 24px */
    "3xl": "var(--font-size-3xl)", /* 30px */
    "4xl": "var(--font-size-4xl)", /* 36px */
    "5xl": "var(--font-size-5xl)", /* 48px */
    "6xl": "var(--font-size-6xl)", /* 60px */
    "7xl": "var(--font-size-7xl)", /* 72px */
  },

  fontWeight: {
    normal:   "var(--font-weight-regular)", /* 400 */
    regular:  "var(--font-weight-regular)", /* 400 */
    medium:   "var(--font-weight-medium)",   /* 500 */
    semibold: "var(--font-weight-semibold)", /* 600 */
    bold:     "var(--font-weight-bold)",     /* 700 */
  },

  lineHeight: {
    tight:   "var(--line-height-tight)",   /* 1.2  */
    snug:    "var(--line-height-snug)",    /* 1.3 */
    normal:  "var(--line-height-normal)",  /* 1.5   */
    relaxed: "var(--line-height-relaxed)", /* 1.625 */
    loose:   "var(--line-height-loose)",   /* 2     */
  },

  letterSpacing: {
    tight:  "var(--letter-spacing-tight)",  /* -0.01em */
    normal: "var(--letter-spacing-normal)", /*  0em      */
    wide:   "var(--letter-spacing-wide)",   /* +0.025em  */
    wider:  "var(--letter-spacing-wider)",  /* +0.05em   */
  },
} as const


export const spacing = {
  px: "var(--space-px)",  /* 1px  */
  0:  "var(--space-0)",   /* 0    */
  1:  "var(--space-1)",   /* 4px  */
  2:  "var(--space-2)",   /* 8px  */
  3:  "var(--space-3)",   /* 12px */
  4:  "var(--space-4)",   /* 16px */
  5:  "var(--space-5)",   /* 20px */
  6:  "var(--space-6)",   /* 24px */
  8:  "var(--space-8)",   /* 32px */
  10: "var(--space-10)",  /* 40px */
  12: "var(--space-12)",  /* 48px */
  14: "var(--space-14)",  /* 56px */
  16: "var(--space-16)",  /* 64px */

  // Semantic spacing
  sectionY:        "var(--space-section-y)",         /* 60px  — section vertical padding mobile   */
  sectionYDesktop: "var(--space-section-y-desktop)", /* 120px — section vertical padding desktop  */
} as const

export type SpacingToken = keyof typeof spacing

export const sizing = {
  sm: "var(--size-sm)", /* 32px */
  md: "var(--size-md)", /* 36px */
  lg: "var(--size-lg)", /* 40px */
  xl: "var(--size-xl)", /* 48px */
} as const

export type SizingToken = keyof typeof sizing


export const radius = {
  xs:   "var(--radius-xs)",   /* 4px    */
  sm:   "var(--radius-sm)",   /* 6px    */
  md:   "var(--radius-md)",   /* 8px    */
  lg:   "var(--radius-lg)",   /* 12px   */
  xl:   "var(--radius-xl)",   /* 16px   */
  "2xl": "var(--radius-2xl)", /* 24px   */
  full: "var(--radius-full)", /* 9999px */
} as const

export type RadiusToken = keyof typeof radius


export const shadows = {
  xs:     "var(--shadow-xs)",
  sm:     "var(--shadow-sm)",
  md:     "var(--shadow-md)",
  lg:     "var(--shadow-lg)",
  xl:     "var(--shadow-xl)",
  /** Matches the exact shadow used by the app header */
  header: "var(--shadow-header)",
} as const

export type ShadowToken = keyof typeof shadows


export const border = {
  width:  "var(--border-width)",   /* 1px */
  width2: "var(--border-width-2)", /* 2px */
  style:  "var(--border-style)",   /* solid */
} as const

export type BorderToken = keyof typeof border


export const zIndex = {
  dropdown: "var(--z-dropdown)", /* 100 */
  sticky:   "var(--z-sticky)",   /* 200 */
  overlay:  "var(--z-overlay)",  /* 300 */
  modal:    "var(--z-modal)",    /* 400 */
  popover:  "var(--z-popover)",  /* 500 */
  toast:    "var(--z-toast)",    /* 600 */
  tooltip:  "var(--z-tooltip)",  /* 700 */
} as const

export type ZIndexToken = keyof typeof zIndex


export const opacity = {
  disabled: "var(--opacity-disabled)", /* 0.5 */
  hover:    "var(--opacity-hover)",    /* 0.8 */
  muted:    "var(--opacity-muted)",    /* 0.7 */
  overlay:  "var(--opacity-overlay)",  /* 0.6 (light) / 0.7 (dark) */
  pressed:  "var(--opacity-pressed)",  /* 0.9 */
} as const

export type OpacityToken = keyof typeof opacity


export const layout = {
  /** App shell header height: 4rem (64px) on mobile */
  headerHeight: "var(--header-height)",
  /** App shell header height: 5rem (80px) on md+ */
  headerHeightDesktop: "var(--header-height-desktop)",
  /** Max content width: 80rem (1280px — max-w-7xl) */
  containerMaxWidth: "var(--container-max-width)",
  /** Select / dropdown lista — altura máxima do painel (equiv. Tailwind max-h-96 / 24rem) */
  selectContentMaxHeight: "var(--layout-select-content-max-height)",
} as const


export const breakpoints = {
  xs:   "23.4375rem", /* 375px  — custom small-phone min */
  sm:   "40rem",      /* 640px  */
  md:   "48rem",      /* 768px  */
  lg:   "64rem",      /* 1024px */
  xl:   "80rem",      /* 1280px */
  "2xl": "96rem",     /* 1536px */
} as const

export type BreakpointToken = keyof typeof breakpoints


export const animation = {
  transition: {
    fast:   "var(--transition-fast)",  /* 150ms ease */
    base:   "var(--transition-base)",  /* 200ms ease */
    slow:   "var(--transition-slow)",  /* 300ms ease */
  },
  easing: {
    default: "var(--easing-default)",  /* ease        */
    in:      "var(--easing-in)",       /* ease-in     */
    out:     "var(--easing-out)",      /* ease-out    */
    inOut:   "var(--easing-in-out)",   /* ease-in-out */
  },
} as const


/** Transforms / offsets estruturais — espelham utilitários semânticos em src/utilities/structural-utilities.css */
export const motion = {
  microOffsetY: "var(--motion-micro-offset-y)",
  anchorShiftHalf: "var(--motion-anchor-shift-half)",
  rotateQuarterTurn: "var(--motion-rotate-quarter-turn)",
  carouselInset: "var(--motion-carousel-inset)",
  popoverNudge: "var(--motion-popover-nudge)",
  switchThumbTravelX: "var(--motion-switch-thumb-travel-x)",
  durationFieldBorder: "var(--motion-duration-field-border)",
  radioDotScaleOff: "var(--motion-radio-dot-scale-off)",
  radioDotScaleOn: "var(--motion-radio-dot-scale-on)",
  accordionChevronOpenRotate: "var(--motion-accordion-chevron-open-rotate)",
} as const

export type MotionToken = keyof typeof motion


/** Slots de ícone — dimensões derivadas de tokens de tipo / espaço */
export const iconSlot = {
  size2xs: "var(--icon-slot-2xs-size)",
  sizeXs: "var(--icon-slot-xs-size)",
  sizeSm: "var(--icon-slot-sm-size)",
  sizeMd: "var(--icon-slot-md-size)",
} as const


/** Scrims de overlay — valores em :root (modal vs sheet) */
export const overlayScrim = {
  modal: "var(--overlay-scrim-modal)",
  sheet: "var(--overlay-scrim-sheet)",
} as const


export const tokens = {
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
  motion,
  iconSlot,
  overlayScrim,
} as const

export type Tokens = typeof tokens

export default tokens
