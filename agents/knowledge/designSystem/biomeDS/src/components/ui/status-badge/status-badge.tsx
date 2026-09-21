import * as React from "react"

import { Badge, type BadgeProps } from "../badge"
import type { IconName } from "../icon"
export type StatusIntent = "success" | "warning" | "info" | "destructive" | "neutral"

const intentToVariant: Record<StatusIntent, NonNullable<BadgeProps["variant"]>> = {
  success:     "success",
  warning:     "warning",
  info:        "info",
  destructive: "danger",
  neutral:     "neutral",
}

function badgeVariantForIntent(intent: StatusIntent): NonNullable<BadgeProps["variant"]> {
  return intentToVariant[intent]
}

const defaultIcons: Record<StatusIntent, IconName> = {
  success:     "circle-check",
  warning:     "triangle-alert",
  info:        "info",
  destructive: "circle-x",
  neutral:     "info",
}
export interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  /** Semantic status intent — drives colors and default icon */
  intent: StatusIntent
  /** Text label rendered inside the badge */
  label: string
  /** Whether to show the leading status icon. Defaults to true */
  showIcon?: boolean
}
const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ intent, label, showIcon = true, icon, className, size = "sm", ...props }, ref) => (
    <Badge
      ref={ref}
      variant={badgeVariantForIntent(intent)}
      size={size}
      {...(showIcon ? { icon: icon ?? defaultIcons[intent] } : {})}
      className={className}
      {...props}
    >
      {label}
    </Badge>
  )
)

StatusBadge.displayName = "StatusBadge"

export { StatusBadge }
