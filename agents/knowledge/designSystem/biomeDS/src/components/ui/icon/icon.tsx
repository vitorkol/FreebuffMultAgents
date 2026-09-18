import * as React from "react"
import { cn } from "../../../utils/cn"
import { getIcon, type IconName } from "../../../icons/icon-registry"

export const ICON_SIZE_PRESETS = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "10xl",
] as const

export type IconPresetSize = (typeof ICON_SIZE_PRESETS)[number]
export type IconSize = IconPresetSize | number

const SIZE_MAP: Record<IconPresetSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 56,
  '5xl': 64,
  '6xl': 72,
  '7xl': 80,
  '8xl': 88,
  '9xl': 96,
  '10xl': 104,
}

export interface IconProps {
  /** Official Lucide kebab-case icon name (e.g. "arrow-right", "circle-user") */
  name: IconName
  /** Preset size token or numeric pixel value */
  size?: IconSize
  /** Icon color — defaults to currentColor */
  color?: string
  /** Stroke width — defaults to 2 */
  strokeWidth?: number
  /** Additional CSS classes */
  className?: string
  /** Accessible label — when provided, icon is treated as meaningful (role="img"). When omitted, icon is decorative (aria-hidden). */
  "aria-label"?: string
  /** Override automatic aria-hidden behavior */
  "aria-hidden"?: boolean
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = "md",
      color,
      strokeWidth = 2,
      className,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const IconComponent = getIcon(name)

    if (!IconComponent) {
      console.warn(
        `[Biome] Icon "${name}" not found. Browse available icons at lucide.dev/icons`
      )
      return null
    }

    const resolvedSize =
      typeof size === "number" ? size : (SIZE_MAP[size] ?? 20)
    const isDecorative = !ariaLabel

    return (
      <IconComponent
        ref={ref}
        size={resolvedSize}
        color={color}
        strokeWidth={strokeWidth}
        className={cn("shrink-0", className)}
        aria-hidden={isDecorative}
        aria-label={ariaLabel}
        role={ariaLabel ? "img" : undefined}
        {...props}
      />
    )
  }
)
Icon.displayName = "Icon"

export { Icon }
export type { IconName }
