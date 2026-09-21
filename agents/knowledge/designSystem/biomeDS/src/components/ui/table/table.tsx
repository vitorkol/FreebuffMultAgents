import * as React from "react"
import { cn } from "../../../utils/cn"

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Unique key used to read row values and identify column */
  key: string
  /** Header content */
  header: React.ReactNode
  /** Optional custom cell renderer */
  cell?: (row: T, index: number) => React.ReactNode
  /** Alignment helper */
  align?: "left" | "center" | "right"
  /** Additional class for header cell */
  headerClassName?: string
  /** Additional class for body cell */
  cellClassName?: string
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends React.HTMLAttributes<HTMLTableElement> {
  /** Declarative columns API (recommended). */
  columns?: Array<TableColumn<T>>
  /** Declarative rows API (recommended). */
  rows?: T[]
  /** Optional caption text/content for declarative mode. */
  caption?: React.ReactNode
  /** Resolve a stable key for each row in declarative mode. */
  rowKey?: keyof T | ((row: T, index: number) => React.Key)
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, columns, rows, caption, rowKey, children, ...props }, ref) => {
    const hasDeclarativeData = Array.isArray(columns) && Array.isArray(rows)

    const resolveAlignClass = (align?: "left" | "center" | "right") => {
      if (align === "center") return "text-center"
      if (align === "right") return "text-right"
      return "text-left"
    }

    return (
      <div className="table-scrollbar-harmonized relative w-full overflow-x-auto overflow-y-hidden rounded-xl bg-background">
        <table ref={ref} className={cn("min-w-full border-collapse bg-background caption-bottom", className)} {...props}>
          {hasDeclarativeData ? (
            <>
              {caption ? <TableCaption>{caption}</TableCaption> : null}
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={`head-${column.key}`}
                      className={cn(resolveAlignClass(column.align), column.headerClassName)}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, rowIndex) => {
                  const computedKey =
                    typeof rowKey === "function"
                      ? rowKey(row, rowIndex)
                      : typeof rowKey === "string"
                        ? (row[rowKey] as React.Key) ?? rowIndex
                        : rowIndex

                  return (
                    <TableRow key={computedKey}>
                      {columns.map((column) => (
                        <TableCell
                          key={`${String(computedKey)}-${column.key}`}
                          className={cn(resolveAlignClass(column.align), column.cellClassName)}
                        >
                          {column.cell
                            ? column.cell(row, rowIndex)
                            : (row[column.key] as React.ReactNode)}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })}
              </TableBody>
            </>
          ) : (
            children
          )}
        </table>
      </div>
    )
  }
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("table-head-rows-border", className)} {...props} />
  )
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("table-body-rows-last-border-none table-body-zebra-rows", className)} {...props} />
  )
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("table-footer-shell table-footer-rows-last-border-none", className)} {...props} />
  )
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("table-row-interactive", className)} {...props} />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 whitespace-nowrap bg-muted px-4 text-left align-middle text-heading-xs text-foreground table-cell-checkbox-layout",
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "h-12 whitespace-nowrap px-4 py-3 align-middle text-body-s text-foreground table-cell-checkbox-layout",
        className
      )}
      {...props}
    />
  )
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-muted-foreground", className)} {...props} />
  )
)
TableCaption.displayName = "TableCaption"

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>
export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>
export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
