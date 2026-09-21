import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../../utils/cn"
import type { IconName as BiomeIconName } from "../../../icons/icon-registry"
import { Icon, type IconProps } from "../icon"
import { Spinner, type SpinnerSize } from "../spinner"

/**
 * Nome de ícone no registro Biome (Lucide, kebab-case).
 * Mesma união que `IconName` do pacote — use em `centerIcon`, `iconLeft` e `iconRight`.
 */
export type ButtonIconName = BiomeIconName

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "icon-slot-base",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-brand-green text-text-inverse shadow-sm hover:bg-brand-green-light active:bg-brand-green-dark",
        secondary:
          "bg-secondary text-secondary-foreground border border-brand-green shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-secondary active:border-brand-green-dark",
        ghost:
          "text-brand-green hover:bg-secondary hover:text-brand-green-dark active:bg-accent",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:border-brand-green",
        danger:
          "border border-destructive bg-destructive text-text-inverse shadow-sm hover:bg-destructive-surface hover:text-destructive-on-surface hover:border-destructive-surface-border active:bg-destructive active:text-destructive-foreground active:border-destructive",
        link: "text-link underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-label-s !leading-tight icon-slot-xs",
        md: "h-9 rounded-lg px-4 text-label-m !leading-snug icon-slot-sm",
        lg: "h-10 rounded-lg px-5 text-body-m !leading-snug icon-slot-sm",
        xl: "h-12 rounded-lg px-6 text-heading-s !leading-snug icon-slot-md",
        icon: "h-9 w-9 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-md": "h-9 w-9 rounded-lg",
        "icon-lg": "h-10 w-10 rounded-lg",
        "icon-xl": "h-12 w-12 rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "link"

export type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon"
  | "icon-sm"
  | "icon-md"
  | "icon-lg"
  | "icon-xl"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  asChild?: boolean
  loading?: boolean
  /**
   * Botão só com ícone: glifo centralizado. Sem filhos, use esta prop (ou `iconLeft`) com `size` `icon-*`.
   * Evita o nome `icon`, reservado / ambíguo frente a atributos HTML.
   */
  centerIcon?: ButtonIconName
  /** Ícone à esquerda do rótulo — {@link ButtonIconName} do registro Biome. */
  iconLeft?: ButtonIconName
  /** Ícone à direita do rótulo — {@link ButtonIconName} do registro Biome. */
  iconRight?: ButtonIconName
}

function iconSizeForIconOnlyButton(
  size: ButtonSize | undefined
): NonNullable<IconProps["size"]> {
  switch (size) {
    case "icon-sm":
      return "md"
    case "icon-md":
      return "lg"
    case "icon-lg":
      return "xl"
    case "icon-xl":
      return "xl"
    case "icon":
      return "md"
    default:
      return "md"
  }
}

function spinnerSizeForIconOnlyButton(
  size: ButtonSize | undefined
): SpinnerSize {
  switch (size) {
    case "icon-sm":
      return "sm"
    case "icon-md":
      return "md"
    case "icon-lg":
      return "lg"
    case "icon-xl":
      return "lg"
    case "icon":
      return "md"
    default:
      return "sm"
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      asChild = false,
      disabled,
      children,
      centerIcon,
      iconLeft,
      iconRight,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading
    const isIconOnly =
      !children &&
      (centerIcon != null || iconLeft != null) &&
      !iconRight
    const soleIconName = isIconOnly ? (centerIcon ?? iconLeft) : undefined

    /** Radix `Slot` exige exatamente um elemento filho — não combinar com ícones/Spinner. */
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          aria-busy={loading || undefined}
          aria-disabled={isDisabled || undefined}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        ref={ref}
        {...props}
      >
        {loading ? (
          <Spinner
            size={
              isIconOnly ? spinnerSizeForIconOnlyButton(size) : "sm"
            }
            label="Loading..."
          />
        ) : isIconOnly && soleIconName ? (
          <Icon
            name={soleIconName}
            size={iconSizeForIconOnlyButton(size)}
            aria-hidden
          />
        ) : (
          iconLeft && <Icon name={iconLeft} aria-hidden />
        )}
        {children}
        {!loading && !isIconOnly && iconRight && (
          <Icon name={iconRight} aria-hidden />
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
