import type React from "react"

/**
 * Applies a DOM node ref without forcing call sites to widen `ForwardedRef`.
 * Same semantics as assigning to `MutableRefObject.current`.
 */
export function assignRef<T>(
  ref: React.Ref<T> | null | undefined,
  value: T | null,
): void {
  if (!ref) return
  if (typeof ref === "function") ref(value)
  else {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}
