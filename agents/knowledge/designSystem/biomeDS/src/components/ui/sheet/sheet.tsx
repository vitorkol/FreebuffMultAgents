"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"

import { cn } from "../../../utils/cn"
import { Icon } from "../icon"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-overlay-scrim-sheet sheet-overlay-motion",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva("sheet-panel-motion-base", {
  variants: {
    side: {
      top: "sheet-panel-top",
      bottom: "sheet-panel-bottom",
      left: "sheet-panel-left",
      right: "sheet-panel-right",
    },
  },
  defaultVariants: {
    side: "right",
  },
})

export type SheetSide = "top" | "bottom" | "left" | "right"

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: SheetSide
  /** Hide the built-in close (×) button */
  hideClose?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, hideClose = false, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {!hideClose && (
        <SheetPrimitive.Close
          className={cn(
            "absolute right-4 top-4 rounded-md p-1 text-muted-foreground",
            "opacity-70 transition-opacity hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none sheet-close-open-surface"
          )}
        >
          <Icon name="x" size="sm" aria-hidden />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
    {...props}
  />
))
SheetHeader.displayName = "SheetHeader"

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
      className
    )}
    {...props}
  />
))
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-heading-l text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-body-m text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

/**
 * Preset for common side-panel flows.
 * Use primitives only for advanced custom layouts.
 */
export interface SheetPanelProps
  extends Omit<SheetContentProps, "children" | "title"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: string
  footer?: React.ReactNode
  children?: React.ReactNode
}

const SheetPanel: React.FC<SheetPanelProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  children,
  side,
  hideClose,
  className,
  ...props
}) => (
  <Sheet
    {...(open !== undefined ? { open } : {})}
    {...(onOpenChange !== undefined ? { onOpenChange } : {})}
  >
    {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
    <SheetContent
      {...(side !== undefined ? { side } : {})}
      {...(hideClose !== undefined ? { hideClose } : {})}
      className={className}
      {...props}
    >
      <SheetHeader className="pr-10">
        <SheetTitle>{title}</SheetTitle>
        {description && <SheetDescription>{description}</SheetDescription>}
      </SheetHeader>
      {children}
      {footer && <SheetFooter>{footer}</SheetFooter>}
    </SheetContent>
  </Sheet>
)

SheetPanel.displayName = "SheetPanel"

export type SheetTitleProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
export type SheetDescriptionProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPanel,
}
