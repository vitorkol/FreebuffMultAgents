"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"
const chipVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-full border cursor-pointer select-none",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-label-s !leading-tight icon-slot-2xs",
        md: "h-9 px-4 text-label-m !leading-snug icon-slot-xs",
        lg: "h-10 px-4 text-body-m !leading-snug icon-slot-sm",
      },
      checked: {
        true: "border-brand-green bg-brand-green text-text-inverse hover:bg-brand-green-light hover:border-brand-green-light active:bg-brand-green-dark active:border-brand-green-dark",
        false:
          "border-input bg-background text-foreground hover:border-brand-green hover:text-brand-green active:border-brand-green-dark active:text-brand-green-dark",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
)

export type ChipSize = "sm" | "md" | "lg"
export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  size?: ChipSize
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  /** Lucide icon name for the leading icon */
  iconLeft?: IconName
  /** Lucide icon name for the trailing icon */
  iconRight?: IconName
}
const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      size,
      label,
      checked = false,
      onChange,
      disabled,
      iconLeft,
      iconRight,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onChange?.(!checked)
      }
      onClick?.(e)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(chipVariants({ size, checked }), className)}
        {...props}
      >
        {iconLeft && (
          <span className="pointer-events-none" aria-hidden="true">
            <Icon name={iconLeft} size="xs" />
          </span>
        )}
        {label}
        {iconRight && (
          <span className="pointer-events-none" aria-hidden="true">
            <Icon name={iconRight} size="xs" />
          </span>
        )}
      </button>
    )
  }
)

Chip.displayName = "Chip"
export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        {label && (
          <small className="block text-meta-xs text-muted-foreground">{label}</small>
        )}
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
          {children}
        </div>
      </div>
    )
  }
)

ChipGroup.displayName = "ChipGroup"

export { Chip, ChipGroup, chipVariants }
