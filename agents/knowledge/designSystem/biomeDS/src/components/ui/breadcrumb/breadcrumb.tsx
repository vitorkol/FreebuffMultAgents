"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../../utils/cn"
import { Icon } from "../icon"

export interface BreadcrumbDataItem {
  id: string
  label: React.ReactNode
  href?: string
  current?: boolean
  ellipsis?: boolean
}

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /** Recommended declarative API for common usage */
  items?: BreadcrumbDataItem[]
  /** Custom separator element (defaults to chevron-right icon) */
  separator?: React.ReactNode
  /** Advanced composition escape hatch */
  children?: React.ReactNode
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, children, ...props }, ref) => {
    const declarativeItems = items ?? []

    return (
      <nav ref={ref} aria-label="breadcrumb" {...props}>
        {children ?? (
          <BreadcrumbList>
            {declarativeItems.map((item, index) => {
              const isLast = index === declarativeItems.length - 1
              const isCurrent = item.current ?? isLast
              const shouldRenderPage = item.ellipsis ? false : (isCurrent || !item.href)

              return (
                <React.Fragment key={item.id}>
                  <BreadcrumbItem>
                    {item.ellipsis ? (
                      <BreadcrumbEllipsis />
                    ) : shouldRenderPage ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
                  ) : null}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        )}
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex flex-wrap items-center gap-2 wrap-break-word text-body-m text-muted-foreground sm:gap-3", className)} {...props} />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />
  }
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-disabled="true" aria-current="page" className={cn("text-foreground", className)} {...props} />
  )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("breadcrumb-separator-icon-slot", className)} {...props}>
    {children ?? <Icon name="chevron-right" size="xs" aria-hidden />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span role="presentation" aria-hidden="true" className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <Icon name="ellipsis" size="sm" aria-hidden />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">
export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">
export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }
export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">
export type BreadcrumbSeparatorProps = React.ComponentProps<"li">
export type BreadcrumbEllipsisProps = React.ComponentProps<"span">

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
