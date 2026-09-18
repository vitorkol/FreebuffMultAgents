"use client"

import * as React from "react"
import { Toaster as Sonner } from "sonner"

export type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast toast-host-surface",
          success: "toast-variant-success",
          error: "toast-variant-error",
          warning: "toast-variant-warning",
          info: "toast-variant-info",
          description: "toast-slot-description",
          actionButton:
            "toast-slot-action-primary",
          cancelButton:
            "toast-slot-cancel-muted",
        },
      }}
      {...props}
    />
  )
}
Toaster.displayName = "Toaster"

export { Toaster }
export { toast } from "sonner"
