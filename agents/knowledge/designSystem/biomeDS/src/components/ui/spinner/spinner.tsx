import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../../utils/cn"
const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl"
export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  size?: SpinnerSize
  /** Accessible label announced to screen readers */
  label?: string
}
const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, label = "Loading...", ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={cn(spinnerVariants({ size }), className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
)

Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
