import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"

export type AlertIntent =
  | "success"
  | "warning"
  | "info"
  | "destructive"
  | "neutral"

const intentIcons: Record<AlertIntent, IconName> = {
  success:     "circle-check",
  warning:     "triangle-alert",
  info:        "info",
  destructive: "circle-x",
  neutral:     "info",
}
const alertVariants = cva("relative w-full rounded-lg border p-4", {
  variants: {
    intent: {
      success: "bg-success-surface border-success-surface-border",
      warning: "bg-warning-surface border-warning-surface-border",
      info: "bg-info-surface border-info-surface-border",
      destructive: "bg-destructive-surface border-destructive-surface-border",
      neutral: "bg-neutral-surface border-neutral-surface-border",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
})

const alertIntentTextVariants = cva("", {
  variants: {
    intent: {
      success: "text-success-on-surface",
      warning: "text-warning-on-surface",
      info: "text-info-on-surface",
      destructive: "text-destructive-on-surface",
      neutral: "text-neutral-on-surface",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
})

const alertIntentDescriptionTextVariants = cva("", {
  variants: {
    intent: {
      success: "text-success-on-surface/80",
      warning: "text-warning-on-surface/80",
      info: "text-info-on-surface/80",
      destructive: "text-destructive-on-surface/80",
      neutral: "text-neutral-on-surface/80",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
})
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: AlertIntent
  title?: string
  icon?: IconName | null
  onDismiss?: () => void
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      intent = "neutral",
      title,
      icon,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedIcon: IconName | null =
      icon === null ? null : (icon ?? intentIcons[intent ?? "neutral"])

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ intent }), className)}
        {...props}
      >
        <div className="flex items-start gap-3">
          {resolvedIcon !== null && (
            <span className={cn("mt-1 shrink-0", alertIntentTextVariants({ intent }))}>
              <Icon name={resolvedIcon} size="md" className="size-5" aria-hidden />
            </span>
          )}

          <div className="min-w-0 flex-1">
            {title && (
              <p className={cn("mb-1 text-heading-s", alertIntentTextVariants({ intent }))}>
                {title}
              </p>
            )}
            {children && (
              <p
                className={cn(
                  "text-body-s",
                  title
                    ? alertIntentDescriptionTextVariants({ intent })
                    : alertIntentTextVariants({ intent })
                )}
              >
                {children}
              </p>
            )}
          </div>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className={cn(
                "-mr-1 -mt-1 ml-auto flex shrink-0 items-center justify-center rounded p-1 opacity-70 transition-opacity interactive-hit-hover-tonal-subtle hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current",
                alertIntentTextVariants({ intent })
              )}
              aria-label="Dismiss"
            >
              <Icon name="x" size="sm" aria-hidden />
            </button>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = "Alert"

export { Alert, alertVariants }
