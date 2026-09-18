import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../../utils/cn"
import type { FieldSize } from "../../../types/field-size"

const textareaVariants = cva(
  [
    "flex w-full rounded-lg border bg-background text-foreground",
    "placeholder:text-text-placeholder",
    "transition-field-border outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "resize-vertical",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "min-h-14 px-3 py-2 text-body-xs !leading-tight",
        md: "min-h-16 px-3 py-2 text-body-s !leading-snug",
        lg: "min-h-20 px-3 py-2 text-body-m !leading-snug",
        xl: "min-h-24 px-4 py-3 text-body-l !leading-normal",
      },
      hasError: {
        true: "border-destructive focus:border-destructive focus:ring-destructive",
        false: "border-input focus:border-ring focus:ring-ring",
      },
    },
    defaultVariants: {
      size: "md",
      hasError: false,
    },
  }
)

const labelVariants = cva("block text-foreground", {
  variants: {
    size: {
      sm: "mb-1 text-label-s",
      md: "mb-2 text-label-m",
      lg: "mb-2 text-body-m",
      xl: "mb-2 text-heading-xs",
    },
    hasError: {
      true: "text-destructive",
      false: "",
    },
  },
  defaultVariants: { size: "md", hasError: false },
})

const helperTextVariants = cva("mt-2 text-body-xs", {
  variants: {
    hasError: {
      true: "text-destructive",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: { hasError: false },
})

/** Same as {@link FieldSize}. */
export type TextareaSize = FieldSize

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size"> {
  /** Visual density scale (not the HTML cols/rows size model). */
  size?: TextareaSize
  /** Visible label rendered above the field */
  label?: string
  /** Secondary hint or validation feedback displayed below the field */
  helperText?: string
  /** Activates error styling and ARIA attributes */
  hasError?: boolean
  /** Additional class names applied to the outer wrapper */
  wrapperClassName?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      wrapperClassName,
      size = "md",
      label,
      helperText,
      hasError = false,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id ?? React.useId()
    const helperId = helperText ? `${textareaId}-helper` : undefined

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(labelVariants({ size, hasError }))}
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          data-slot="textarea"
          aria-invalid={hasError || undefined}
          aria-describedby={helperId}
          className={cn(
            textareaVariants({ size, hasError }),
            "focus:ring-2",
            className
          )}
          {...props}
        />

        {helperText && (
          <p
            id={helperId}
            role={hasError ? "alert" : undefined}
            className={cn(helperTextVariants({ hasError }))}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
