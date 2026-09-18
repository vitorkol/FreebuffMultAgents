"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-between gap-3 py-4 text-left cursor-pointer transition-colors",
        "text-heading-xs text-foreground",
        "hover:text-primary data-[state=open]:text-primary",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "accordion-trigger-chevron",
        className
      )}
      {...props}
    >
      <span className="block text-heading-xs">{children}</span>
      <span className="accordion-chevron transition-transform duration-200">
        <Icon name="chevron-down" size="sm" className="text-muted-foreground" aria-hidden />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body-s text-muted-foreground accordion-content-motion"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export interface AccordionDataItem {
  /** Unique item value used by Radix state handling */
  value: string
  /** Question / title shown in the trigger */
  title: React.ReactNode
  /** Collapsible answer content */
  content: React.ReactNode
  /** Disables user interaction for this item */
  disabled?: boolean
}

interface AccordionBaseProps {
  /** Accordion behavior mode */
  type: "single" | "multiple"
  /** Initial open panel(s) */
  defaultValue?: string | string[]
  /** Controlled open panel(s) */
  value?: string | string[]
  /** Change callback for controlled usage */
  onValueChange?: (value: string | string[]) => void
  /** Single mode: allow closing currently open item */
  collapsible?: boolean
  /** Layout direction forwarded to Radix root */
  dir?: "ltr" | "rtl"
  /** Orientation forwarded to Radix root */
  orientation?: "horizontal" | "vertical"
  className?: string
  /**
   * Declarative API for product teams:
   * pass items and Biome renders trigger/content structure automatically.
   */
  items?: AccordionDataItem[]
  /**
   * Advanced composition escape hatch. If provided, `items` is ignored.
   */
  children?: React.ReactNode
  /** Shared class for each generated item when using `items` */
  itemClassName?: string
  /** Shared class for each generated trigger when using `items` */
  triggerClassName?: string
  /** Shared class for each generated content block when using `items` */
  contentClassName?: string
  /** Optional icon used in generated trigger rows. Defaults to chevron-down when omitted. */
  triggerIcon?: IconName
}
export interface AccordionProps extends AccordionBaseProps {}

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(
  (
    {
      items,
      children,
      className,
      itemClassName,
      triggerClassName,
      contentClassName,
      triggerIcon,
      ...props
    },
    ref
  ) => {
    const hasCustomChildren = children != null
    const renderedChildren = hasCustomChildren
      ? children
      : items?.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            {...(item.disabled ? { disabled: true } : {})}
            {...(itemClassName ? { className: itemClassName } : {})}
          >
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger
                className={cn(
                  "flex flex-1 items-start justify-between gap-3 py-4 text-left cursor-pointer transition-colors",
                  "text-heading-xs text-foreground",
                  "hover:text-primary data-[state=open]:text-primary",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  "accordion-trigger-chevron",
                  triggerClassName
                )}
              >
                <span className="block text-heading-xs">{item.title}</span>
                <span className="accordion-chevron transition-transform duration-200">
                  <Icon name={triggerIcon ?? "chevron-down"} size="sm" className="text-muted-foreground" aria-hidden />
                </span>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className={contentClassName}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))

    if (props.type === "single") {
      return (
        <AccordionPrimitive.Root
          ref={ref}
          type="single"
          className={cn("w-full", className)}
          collapsible={props.collapsible ?? true}
          {...(typeof props.defaultValue === "string"
            ? { defaultValue: props.defaultValue }
            : {})}
          {...(typeof props.value === "string"
            ? { value: props.value }
            : {})}
          {...(props.onValueChange
            ? { onValueChange: (next: string) => props.onValueChange?.(next) }
            : {})}
          {...(props.dir ? { dir: props.dir } : {})}
          {...(props.orientation ? { orientation: props.orientation } : {})}
        >
          {renderedChildren}
        </AccordionPrimitive.Root>
      )
    }

    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        className={cn("w-full", className)}
        {...(Array.isArray(props.defaultValue)
          ? { defaultValue: props.defaultValue }
          : {})}
        {...(Array.isArray(props.value) ? { value: props.value } : {})}
        {...(props.onValueChange
          ? { onValueChange: (next: string[]) => props.onValueChange?.(next) }
          : {})}
        {...(props.dir ? { dir: props.dir } : {})}
        {...(props.orientation ? { orientation: props.orientation } : {})}
      >
        {renderedChildren}
      </AccordionPrimitive.Root>
    )
  }
)
Accordion.displayName = "Accordion"

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
