import * as React from "react"

import { cn } from "../../../utils/cn"
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label rendered next to the control */
  label?: React.ReactNode
  /** Secondary hint or validation feedback displayed below the label */
  helperText?: string
  /** Activates error styling and ARIA attributes */
  hasError?: boolean
  wrapperClassName?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, wrapperClassName, label, helperText, hasError = false, id, disabled, ...props },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className={cn("flex items-start gap-3", wrapperClassName)}>
        <div className="relative flex size-4 shrink-0 translate-micro-y items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            disabled={disabled}
            aria-describedby={helperId}
            aria-invalid={hasError || undefined}
            className={cn(
              "peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {/* Outer ring */}
          <div
            aria-hidden="true"
            className={cn(
              "size-4 rounded-full border-2 transition-all",
              "border-input bg-background",
              "radio-ring-peer",
              hasError && "border-destructive"
            )}
          />
          {/* Inner dot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute size-2 rounded-full radio-indicator-dot transition-transform"
          />
        </div>

        {(label || helperText) && (
          <div className="flex min-w-0 flex-col gap-1">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer text-foreground"
                )}
              >
                {label}
              </label>
            )}
            {helperText && (
              <small
                id={helperId}
                role={hasError ? "alert" : undefined}
                className={cn(hasError ? "text-destructive" : "text-muted-foreground")}
              >
                {helperText}
              </small>
            )}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = "Radio"
export interface RadioGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  /** Group-level label (renders as a <legend>) */
  legend?: React.ReactNode
  /** Group-level validation feedback */
  helperText?: string
  /** Activates error styling on the group helper text */
  hasError?: boolean
  /** Arranges items in a row. Defaults to column layout */
  row?: boolean
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, legend, helperText, hasError = false, row = false, children, ...props }, ref) => {
    const helperId = helperText ? `radiogroup-${React.useId()}-helper` : undefined

    return (
      <fieldset
        ref={ref}
        aria-describedby={helperId}
        className={cn("border-0 p-0 m-0 min-w-0", className)}
        {...props}
      >
        {legend && (
          <legend className="mb-2 text-foreground">{legend}</legend>
        )}
        <div
          className={cn(
            "flex",
            row ? "flex-row flex-wrap gap-4" : "flex-col gap-3"
          )}
        >
          {children}
        </div>
        {helperText && (
          <small
            id={helperId}
            role={hasError ? "alert" : undefined}
            className={cn("mt-2 block", hasError ? "text-destructive" : "text-muted-foreground")}
          >
            {helperText}
          </small>
        )}
      </fieldset>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export { Radio, RadioGroup }
