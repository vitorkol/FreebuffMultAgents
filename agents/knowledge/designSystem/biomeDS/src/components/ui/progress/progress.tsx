"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "../../../utils/cn"

export type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  /** Cor do preenchimento (token semântico). Ex: `bg-destructive`, `bg-warning`. */
  indicatorClassName?: string
}

function progressIndicatorPseudoClasses(indicatorClassName?: string): string[] {
  const classes = indicatorClassName?.trim().split(/\s+/).filter(Boolean) ?? []
  const mapped = classes.flatMap((token) =>
    token.startsWith("bg-")
      ? [`[&::-webkit-progress-value]:${token}`, `[&::-moz-progress-bar]:${token}`]
      : []
  )

  if (mapped.length > 0) {
    return mapped
  }

  return ["[&::-webkit-progress-value]:bg-brand-green", "[&::-moz-progress-bar]:bg-brand-green"]
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  >
    <progress
      value={Math.min(100, Math.max(0, value ?? 0))}
      max={100}
      className={cn(
        "absolute inset-0 h-full w-full appearance-none overflow-hidden rounded-full",
        "[&::-webkit-progress-bar]:bg-muted",
        ...progressIndicatorPseudoClasses(indicatorClassName)
      )}
      aria-label="Progress"
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
