import * as React from "react"

import { cn } from "../../../utils/cn"
import { Icon, type IconName } from "../icon"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lucide icon name displayed above the title (e.g. "inbox", "search") */
  icon?: IconName
  title: string
  description?: string
  action?: React.ReactNode
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground">
            <Icon name={icon} size="xl" className="size-12" aria-hidden />
          </div>
        )}
        <h3 className="text-heading-m text-foreground">{title}</h3>
        {description && (
          <p className="mx-auto mt-1 max-w-md text-body-m text-muted-foreground">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
