"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex w-full items-end justify-start gap-6 border-b border-border bg-transparent px-0 py-0 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative -mb-px inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-0 pb-3 pt-0 ring-offset-background transition-colors",
      "gap-2 text-body-s text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:border-primary data-[state=active]:text-foreground",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-5 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export interface TabsDataItem {
  /** Unique tab value used by state handling. */
  value: string
  /** Label shown in trigger. */
  label: React.ReactNode
  /** Panel content rendered when tab is active. */
  content: React.ReactNode
  /** Optional icon shown before the label. */
  icon?: IconName
  /** Optional count badge shown next to the label (modal pattern). */
  count?: number
  /** Disables interaction for this tab trigger. */
  disabled?: boolean
}

export interface TabsProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "children"> {
  /**
   * Recommended declarative API.
   * If omitted, component works with advanced composition via children.
   */
  items?: TabsDataItem[]
  /** Advanced composition escape hatch. */
  children?: React.ReactNode
  /** Shared className for generated trigger items */
  triggerClassName?: string
  /** Shared className for generated content panels */
  contentClassName?: string
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ items, children, className, triggerClassName, contentClassName, ...props }, ref) => {
  const hasCustomChildren = children != null
  const fallbackDefault = items?.[0]?.value

  return (
    <TabsPrimitive.Root
      ref={ref}
      className={className}
      {...(props.defaultValue ? { defaultValue: props.defaultValue } : fallbackDefault ? { defaultValue: fallbackDefault } : {})}
      {...(props.value ? { value: props.value } : {})}
      {...(props.onValueChange ? { onValueChange: props.onValueChange } : {})}
      {...(props.dir ? { dir: props.dir } : {})}
      {...(props.orientation ? { orientation: props.orientation } : {})}
      {...(props.activationMode ? { activationMode: props.activationMode } : {})}
    >
      {hasCustomChildren ? (
        children
      ) : (
        <>
          <TabsList>
            {items?.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                {...(item.disabled ? { disabled: true } : {})}
                className={cn(item.icon && "gap-2", triggerClassName)}
              >
                {item.icon ? <Icon name={item.icon} size="sm" aria-hidden /> : null}
                {item.label}
                {typeof item.count === "number" ? (
                  <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-sm bg-success-surface px-1.5 text-meta-xs text-success-on-surface">
                    {item.count}
                  </span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>

          {items?.map((item) => (
            <TabsContent
              key={`${item.value}-content`}
              value={item.value}
              className={contentClassName}
            >
              {item.content}
            </TabsContent>
          ))}
        </>
      )}
    </TabsPrimitive.Root>
  )
})
Tabs.displayName = "Tabs"

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

export { Tabs, TabsList, TabsTrigger, TabsContent }
