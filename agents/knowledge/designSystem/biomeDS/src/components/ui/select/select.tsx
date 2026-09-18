"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva } from "class-variance-authority"

import { cn } from "../../../utils/cn"
import type { FieldSize } from "../../../types/field-size"
import { Icon, type IconName } from "../icon"

const SELECT_ICON_SIZE_MAP: Record<string, "xs" | "sm" | "md"> = {
  sm: "xs",
  md: "sm",
  lg: "sm",
  xl: "md",
}

const selectTriggerBaseClasses =
  "flex w-full min-w-0 items-center justify-between rounded-lg border bg-background text-foreground transition-field-border outline-none cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 select-trigger-value-slot"

const selectTriggerVariants = cva(selectTriggerBaseClasses, {
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
    hasEndIcon: {
      true: "pr-14",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    hasError: false,
    hasStartIcon: false,
    hasEndIcon: false,
  },
})

const selectLabelVariants = cva("block text-foreground", {
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

const selectHelperTextVariants = cva("mt-2 text-body-xs", {
  variants: {
    hasError: {
      true: "text-destructive",
      false: "text-muted-foreground",
    },
  },
  defaultVariants: { hasError: false },
})

const SelectRoot = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      selectTriggerVariants({}),
      "select-trigger-placeholder-tone focus:ring-2",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon name="chevron-down" size="sm" className="opacity-50" aria-hidden />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <Icon name="chevron-up" size="sm" aria-hidden />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <Icon name="chevron-down" size="sm" aria-hidden />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-select-content min-w-dropdown-popover overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-md radix-popover-content-motion",
        position === "popper" && "select-popper-axis-nudge",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-select-trigger-sync min-w-select-trigger-sync w-full"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-2 text-heading-s", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-start rounded-sm py-2 pl-2 pr-8 text-body-s outline-none focus:bg-accent focus:text-accent-foreground radix-menu-item-disabled select-item-secondary-slot",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name="check" size="sm" aria-hidden />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export interface SelectOption {
  /** Submitted value for this option */
  value: string
  /** Visible option label. Supports ReactNode for rich labels */
  label: React.ReactNode
  /** Disables selecting this option */
  disabled?: boolean
}

/** Same as {@link FieldSize}. */
export type SelectSize = FieldSize

export interface SelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    "children"
  > {
  /** Trigger / field density scale */
  size?: SelectSize
  /** Optional id used for trigger/label association (auto-generated when omitted) */
  id?: string
  /** Visible label rendered above the field */
  label?: string
  /** Secondary hint or validation feedback displayed below the field */
  helperText?: string
  /** Activates error styling and ARIA attributes */
  hasError?: boolean
  /** Placeholder text shown when no value is selected */
  placeholder?: string
  /** Lucide icon name rendered on the left side of the trigger */
  startIcon?: IconName
  /** Lucide icon name rendered on the right side (before the chevron indicator) */
  endIcon?: IconName
  /** Select options rendered in the dropdown list */
  options?: SelectOption[]
  /** Alias declarativo para options. Se ambos forem passados, `items` tem prioridade. */
  items?: SelectOption[]
  /** Additional class names applied to the trigger */
  className?: string
  /** Additional class names applied to the outer wrapper */
  wrapperClassName?: string
  /** Additional class names applied to the trigger */
  triggerClassName?: string
  /** Additional class names applied to the dropdown content */
  contentClassName?: string
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      size = "md",
      helperText,
      hasError = false,
      placeholder = "Selecione uma opção",
      startIcon,
      endIcon,
      options,
      items,
      className,
      wrapperClassName,
      triggerClassName,
      contentClassName,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const triggerId = id ?? React.useId()
    const helperId = helperText ? `${triggerId}-helper` : undefined
    const iconSize = SELECT_ICON_SIZE_MAP[size ?? "md"] ?? "sm"
    const resolvedOptions = items ?? options ?? []

    return (
      <div className={cn("flex flex-col", wrapperClassName)}>
        {label && (
          <label
            htmlFor={triggerId}
            className={cn(selectLabelVariants({ size, hasError }))}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {startIcon && (
            <span
              className="pointer-events-none absolute left-3 z-10 flex items-center text-muted-foreground"
              aria-hidden="true"
            >
              <Icon name={startIcon} size={iconSize} />
            </span>
          )}

          <SelectRoot {...(disabled !== undefined ? { disabled } : {})} {...props}>
            <SelectTrigger
              ref={ref}
              id={triggerId}
              aria-invalid={hasError || undefined}
              aria-describedby={helperId}
              className={cn(
                selectTriggerVariants({
                  size,
                  hasError,
                  hasStartIcon: !!startIcon,
                  hasEndIcon: !!endIcon,
                }),
                "select-trigger-placeholder-tone focus:ring-2",
                className,
                triggerClassName
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClassName}>
              {resolvedOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  {...(option.disabled ? { disabled: true } : {})}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          {endIcon && (
            <span
              className="pointer-events-none absolute right-8 z-10 flex items-center text-muted-foreground"
              aria-hidden="true"
            >
              <Icon name={endIcon} size={iconSize} />
            </span>
          )}
        </div>

        {helperText && (
          <p
            id={helperId}
            role={hasError ? "alert" : undefined}
            className={cn(selectHelperTextVariants({ hasError }))}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = "Select"

export type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
