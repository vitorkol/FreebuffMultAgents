"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "../../../utils/cn"

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary text-primary-foreground px-3 py-2 text-body-xs",
        "tooltip-content-motion",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export interface TooltipProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>, "children"> {
  /** Recommended declarative API: trigger element */
  trigger?: React.ReactElement
  /** Recommended declarative API: tooltip body */
  content?: React.ReactNode
  /** Optional provider delay override */
  delayDuration?: number
  /** Forwarded to content slot */
  sideOffset?: number
  /** Forwarded to content slot */
  side?: "top" | "right" | "bottom" | "left"
  /** Forwarded to content slot */
  contentClassName?: string
  /** Advanced composition escape hatch */
  children?: React.ReactNode
}

const Tooltip = ({
  trigger,
  content,
  delayDuration,
  sideOffset = 4,
  side = "top",
  contentClassName,
  children,
  ...props
}: TooltipProps) => {
  const hasCustomChildren = children != null

  const wrapped = (
    <TooltipRoot {...props}>
      {hasCustomChildren ? (
        children
      ) : (
        <>
          {trigger ? <TooltipTrigger asChild>{trigger}</TooltipTrigger> : null}
          {content ? (
            <TooltipContent side={side} sideOffset={sideOffset} className={contentClassName}>
              {content}
            </TooltipContent>
          ) : null}
        </>
      )}
    </TooltipRoot>
  )

  return delayDuration !== undefined ? (
    <TooltipProvider delayDuration={delayDuration}>{wrapped}</TooltipProvider>
  ) : (
    wrapped
  )
}

export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>

export { Tooltip, TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider }
