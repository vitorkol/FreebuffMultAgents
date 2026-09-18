"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import type { FieldSize } from "../../../types/field-size"
import { Icon } from "../icon"

const CHECKBOX_ICON_SIZE: Record<FieldSize, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "xs",
  lg: "sm",
  xl: "md",
}
const checkboxBoxVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center rounded border",
    "transition-all duration-150 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1",
    "peer-disabled-form-lock",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-4",
        lg: "size-5",
        xl: "size-6",
      },
      checked: {
        true: "border-brand-green bg-brand-green text-text-inverse",
        false: "border-input bg-background",
      },
      indeterminate: {
        true: "border-brand-green bg-brand-green text-text-inverse",
        false: "",
      },
      hasError: {
        true: "border-destructive",
        false: "",
      },
    },
    compoundVariants: [
      {
        checked: false,
        indeterminate: false,
        hasError: false,
        className: "hover:border-brand-green",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
      indeterminate: false,
      hasError: false,
    },
  }
)
const checkboxLabelVariants = cva("text-foreground cursor-pointer select-none", {
    variants: {
      size: {
        sm: "text-body-xs !leading-tight",
        md: "text-body-s !leading-snug",
        lg: "text-body-m !leading-snug",
        xl: "text-body-l !leading-normal",
      },
      hasError: {
        true: "text-destructive",
        false: "",
      },
    },
    defaultVariants: { size: "md", hasError: false },
  }
)
/** Same as {@link FieldSize}. */
export type CheckboxSize = FieldSize

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Box and label scale */
  size?: CheckboxSize
  /** Visible label rendered next to the checkbox. Supports React elements for rich content (e.g. links). */
  label?: React.ReactNode
  /** Secondary hint or validation feedback displayed below the label */
  helperText?: string
  /** Activates error styling and ARIA attributes */
  hasError?: boolean
  /** Renders the checkbox in an indeterminate (mixed) state */
  indeterminate?: boolean
  /** Additional class names applied to the outer wrapper */
  wrapperClassName?: string
}
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      wrapperClassName,
      size = "md",
      label,
      helperText,
      hasError = false,
      indeterminate = false,
      checked,
      disabled,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const internalRef = React.useRef<HTMLInputElement>(null)

    const combinedRef = (node: HTMLInputElement | null) => {
      internalRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    React.useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate && !checked
      }
    }, [indeterminate, checked])

    const isChecked = checked ?? false
    const showIndeterminate = indeterminate && !isChecked
    const iconSize = CHECKBOX_ICON_SIZE[size ?? "md"] ?? 12

    return (
      <div className={cn("flex flex-col gap-1", wrapperClassName)}>
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-center gap-2",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "cursor-pointer"
          )}
        >
          <input
            ref={combinedRef}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            className="peer sr-only"
            {...props}
          />

          <span
            className={cn(
              checkboxBoxVariants({
                size,
                checked: isChecked || showIndeterminate,
                indeterminate: showIndeterminate,
                hasError,
              }),
              className
            )}
            aria-hidden="true"
          >
            {showIndeterminate ? (
              <Icon name="minus" size={iconSize} strokeWidth={2} className="pointer-events-none" aria-hidden />
            ) : isChecked ? (
              <Icon name="check" size={iconSize} strokeWidth={2} className="pointer-events-none" aria-hidden />
            ) : null}
          </span>

          {label && (
            <span className={cn(checkboxLabelVariants({ size, hasError }))}>
              {label}
            </span>
          )}
        </label>

        {helperText && (
          <p
            id={`${inputId}-helper`}
            role={hasError ? "alert" : undefined}
            className={cn(
              "ml-6 text-body-xs",
              hasError ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox, checkboxBoxVariants }
