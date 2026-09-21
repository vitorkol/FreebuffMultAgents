"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import { Icon } from "../icon"

/** Re-exports `@radix-ui/react-dialog` primitives under the same names (stable migration path). */
const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-overlay-scrim-modal dialog-overlay-motion",
        className
      )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/** Painel do modal: sem translate 50% (evita texto subpixel/embaçado). Centralização via wrapper flex no Portal. */
const dialogContentVariants = cva(
  [
    "relative z-50 w-full pointer-events-auto",
    "bg-background border shadow-xl rounded-xl",
    "flex flex-col max-h-modal-viewport",
    "duration-200",
    "dialog-content-fade-motion",
  ].join(" "),
  {
    variants: {
      size: {
        sm:   "max-w-sm",
        md:   "max-w-lg",
        lg:   "max-w-2xl",
        xl:   "max-w-3xl",
        full: "max-w-modal-full h-modal-sheet",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export type DialogContentSize = "sm" | "md" | "lg" | "xl" | "full"

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: DialogContentSize
  /** Hide the built-in close (×) button */
  hideClose?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size, hideClose = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    {/*
      Centralização por flex (evita -translate-x/y 50% + zoom/slide no painel — comum com escala de interface / HiDPI).
    */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-md p-1 text-muted-foreground",
              "opacity-70 transition-opacity hover:opacity-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none"
            )}
          >
            <Icon name="x" size="sm" aria-hidden />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a bottom border separator */
  divided?: boolean
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, divided = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 px-6 pt-6 pb-4 pr-12",
        divided && "border-b border-border",
        className
      )}
      {...props}
    />
  )
)
DialogHeader.displayName = "DialogHeader"

const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto min-h-0 px-6 py-4", className)}
    {...props}
  />
))
DialogBody.displayName = "DialogBody"

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a top border separator */
  divided?: boolean
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, divided = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col-reverse gap-2 px-6 pt-4 pb-6 sm:flex-row sm:justify-end",
        divided && "border-t border-border",
        className
      )}
      {...props}
    />
  )
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-heading-l text-foreground", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-m text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/**
 * Preset that wires trigger, content shell, header, body, and footer. Use primitives
 * individually when you need a non-standard modal layout.
 */
export interface DialogModalProps
  extends Omit<DialogContentProps, "children" | "title"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  /** Conteúdo do título (texto ou composição com ícone / ações). */
  title: React.ReactNode
  description?: string
  /** Footer content, typically action buttons */
  footer?: React.ReactNode
  children?: React.ReactNode
}

const DialogModal: React.FC<DialogModalProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  children,
  size,
  hideClose,
  className,
  ...props
}) => (
  <Dialog
    {...(open !== undefined ? { open } : {})}
    {...(onOpenChange !== undefined ? { onOpenChange } : {})}
  >
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogContent
      {...(size !== undefined ? { size } : {})}
      {...(hideClose !== undefined ? { hideClose } : {})}
      className={className}
      {...props}
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children && <DialogBody>{children}</DialogBody>}
      {footer && <DialogFooter>{footer}</DialogFooter>}
    </DialogContent>
  </Dialog>
)

DialogModal.displayName = "DialogModal"

export type DialogTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
export type DialogDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogModal,
}
