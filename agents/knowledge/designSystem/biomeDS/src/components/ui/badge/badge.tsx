import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        // Brand / Semantic
        primary:
          "bg-brand-green text-text-inverse",
        secondary:
          "bg-secondary text-secondary-foreground border border-input",
        neutral:
          "bg-neutral-surface text-neutral-on-surface border border-neutral-surface-border",
        // Status — uses surface token track from tokens.ts
        success:
          "bg-success-surface text-success-on-surface border border-success-surface-border",
        warning:
          "bg-warning-surface text-warning-on-surface border border-warning-surface-border",
        danger:
          "bg-destructive-surface text-destructive-on-surface border border-destructive-surface-border",
        info:
          "bg-info-surface text-info-on-surface border border-info-surface-border",
        // Commerce
        "on-sale":
          "bg-sale text-sale-foreground",
        new:
          "bg-brand-lime text-text-inverse",
        promo:
          "bg-promo text-promo-foreground",
      },
      size: {
        // Alturas e paddings somente com escala de tokens.
        xs: "h-4 min-h-4 px-1 text-meta-2xs",
        sm: "h-5 min-h-5 px-2 text-label-s",
        md: "h-6 min-h-6 px-2 text-label-m",
        lg: "h-8 min-h-8 px-3 text-body-s",
      },
      dot: {
        true: "gap-2",
        false: "",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "sm",
      dot: false,
    },
  }
)

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "on-sale"
  | "new"
  | "promo"

export type BadgeSize = "xs" | "sm" | "md" | "lg"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
  /** Lucide icon name for the leading icon (e.g. "check", "star") */
  icon?: IconName
  onDismiss?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, icon, onDismiss, children, ...props }, ref) => {
    const resolvedSize = size ?? "sm"

    return (
      <span
        ref={ref}
        data-ds-badge=""
        data-ds-badge-size={resolvedSize}
        className={cn(badgeVariants({ variant, size: resolvedSize, dot }), className)}
        {...props}
      >
        {dot && (
          <span
            className="size-1 rounded-full bg-current opacity-muted"
            aria-hidden="true"
          />
        )}
        {icon && (
          <span
            className="pointer-events-none flex items-center icon-slot-2xs"
            aria-hidden="true"
          >
            <Icon name={icon} size="xs" />
          </span>
        )}
        {children}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="ml-px -mr-px flex items-center rounded-full p-1 interactive-hit-hover-tonal-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
            aria-label="Remove badge"
          >
            <Icon name="x" size="xs" aria-hidden />
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
