"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import { assignRef } from "../../../utils/assign-ref"
import type { FieldSize } from "../../../types/field-size"
import { Icon, type IconName } from "../icon"

const ICON_SIZE_MAP: Record<FieldSize, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
}

const inputVariants = cva(
  [
    "w-full rounded-lg border bg-background text-foreground",
    "placeholder:text-text-placeholder",
    "transition-field-border outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-body-s",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-body-xs !leading-tight",
        md: "h-9 px-3 text-body-s !leading-snug",
        lg: "h-10 px-3 text-body-m !leading-snug",
        xl: "h-12 px-4 text-body-l !leading-normal",
      },
      hasError: {
        true: "border-destructive focus:border-destructive focus:ring-destructive",
        false: "border-input focus:border-ring focus:ring-ring",
      },
      hasStartIcon: {
        true: "pl-10",
        false: "",
      },
      hasEndAccessory: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      hasError: false,
      hasStartIcon: false,
      hasEndAccessory: false,
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

export type EndAction = "clear"

/** Same as {@link FieldSize} — kept named for Input-focused imports. */
export type InputSize = FieldSize

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual / density scale for the field (distinct from the native HTML size attribute). */
  size?: InputSize
  /** Visible label rendered above the field */
  label?: string
  /** Secondary hint or validation feedback displayed below the field */
  helperText?: string
  /** Activates error styling and ARIA attributes */
  hasError?: boolean
  /** Lucide icon name rendered on the left side of the input (e.g. "search") */
  startIcon?: IconName
  /** Lucide icon name rendered on the right side. Overridden when password toggle or clear action is shown. */
  endIcon?: IconName
  /** Renders a password visibility toggle on the right side. Only meaningful with type="password". Takes priority over endAction and endIcon. */
  passwordToggle?: boolean
  /** Renders a DS-defined action on the right side (e.g. "clear"). Overridden by passwordToggle when type="password". */
  endAction?: EndAction
  /** Called when the clear action button is clicked (endAction="clear") */
  onClear?: () => void
  /** Additional class names applied to the outer wrapper */
  wrapperClassName?: string
}

function AccessoryButton({
  size,
  disabled,
  onClick,
  ariaLabel,
  ariaPressed,
  iconName,
  iconSize,
}: {
  size: string
  disabled?: boolean
  onClick: () => void
  ariaLabel: string
  ariaPressed?: boolean
  iconName: IconName
  iconSize: "xs" | "sm" | "md"
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={cn(
        "absolute right-1 flex items-center justify-center rounded-md",
        "text-muted-foreground hover:text-foreground",
        "transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "pointer-events-none opacity-50",
        size === "sm" && "h-6 w-6",
        (size === "md" || size === "lg") && "h-8 w-8",
        size === "xl" && "h-8 w-8"
      )}
    >
      <Icon name={iconName} size={iconSize} />
    </button>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      size = "md",
      hasError = false,
      label,
      helperText,
      startIcon,
      endIcon,
      passwordToggle,
      endAction,
      onClear,
      id,
      disabled,
      type,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? React.useId()
    const internalRef = React.useRef<HTMLInputElement | null>(null)
    const [showPassword, setShowPassword] = React.useState(false)

    const isControlled = value !== undefined
    const [internalHasValue, setInternalHasValue] = React.useState(
      () => defaultValue != null && String(defaultValue).length > 0
    )

    const setRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node
        assignRef(ref, node)
      },
      [ref]
    )

    const isPasswordField = type === "password"
    const hasPasswordToggle = !!(passwordToggle && isPasswordField)
    const wantsClear = endAction === "clear" && !hasPasswordToggle
    const isSearchField = type === "search" && !hasPasswordToggle

    const inputHasValue = isControlled
      ? String(value ?? "").length > 0
      : internalHasValue

    const showClearButton =
      wantsClear && (!isSearchField || inputHasValue)

    const hasEndIcon =
      !!endIcon && !hasPasswordToggle && !showClearButton
    const hasEndAccessory =
      hasPasswordToggle || showClearButton || hasEndIcon

    const resolvedType =
      hasPasswordToggle && showPassword ? "text" : type
    const iconSize = ICON_SIZE_MAP[size ?? "md"] ?? "sm"

    const handlePasswordToggle = React.useCallback(() => {
      setShowPassword((prev) => !prev)
      internalRef.current?.focus()
    }, [])

    const handleClear = React.useCallback(() => {
      const input = internalRef.current
      if (input) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value"
        )?.set
        if (nativeSetter) {
          nativeSetter.call(input, "")
          input.dispatchEvent(new Event("input", { bubbles: true }))
        }
        input.focus()
      }
      if (!isControlled) {
        setInternalHasValue(false)
      }
      onClear?.()
    }, [isControlled, onClear])

    const mergedOnChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalHasValue(e.target.value.length > 0)
        }
        onChange?.(e)
      },
      [isControlled, onChange]
    )

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(labelVariants({ size, hasError }))}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <span
              className="pointer-events-none absolute left-3 flex items-center text-muted-foreground"
              aria-hidden="true"
            >
              <Icon name={startIcon} size={iconSize} />
            </span>
          )}

          <input
            id={inputId}
            ref={setRef}
            data-slot="input"
            type={resolvedType}
            disabled={disabled}
            {...(isControlled ? { value } : {})}
            {...(!isControlled && defaultValue !== undefined
              ? { defaultValue }
              : {})}
            onChange={mergedOnChange}
            aria-invalid={hasError || undefined}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            className={cn(
              inputVariants({
                size,
                hasError,
                hasStartIcon: !!startIcon,
                hasEndAccessory,
              }),
              "focus:ring-2",
              type === "search" &&
                "input-hide-webkit-search-cancel",
              className
            )}
            {...props}
          />

          {hasPasswordToggle && (
            <AccessoryButton
              size={size ?? "md"}
              {...(disabled !== undefined ? { disabled } : {})}
              onClick={handlePasswordToggle}
              ariaLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
              ariaPressed={showPassword}
              iconName={showPassword ? "eye-off" : "eye"}
              iconSize={iconSize}
            />
          )}

          {showClearButton && (
            <AccessoryButton
              size={size ?? "md"}
              {...(disabled !== undefined ? { disabled } : {})}
              onClick={handleClear}
              ariaLabel="Limpar campo"
              iconName="x"
              iconSize={iconSize}
            />
          )}

          {hasEndIcon && (
            <span
              className="pointer-events-none absolute right-3 flex items-center text-muted-foreground"
              aria-hidden="true"
            >
              <Icon name={endIcon!} size={iconSize} />
            </span>
          )}
        </div>

        {helperText && (
          <p
            id={`${inputId}-helper`}
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

Input.displayName = "Input"

export { Input, inputVariants }
